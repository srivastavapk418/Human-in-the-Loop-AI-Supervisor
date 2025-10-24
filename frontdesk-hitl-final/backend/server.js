// backend/server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { RequestModel } = require('./models/Request');
const { KnowledgeModel } = require('./models/Knowledge');
const normalizeQuestion = require('./utils/normalizeQuestion');
const { issueLiveKitToken } = require('./utils/livekitToken');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

const PORT = process.env.PORT || 5000;
const SUPERVISOR_TIMEOUT = parseInt(process.env.SUPERVISOR_TIMEOUT_SECONDS || '300', 10);

async function start() {
  const uri = process.env.MONGO_URI;
  if (uri) {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } else {
    console.warn('MONGO_URI not set.');
  }

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  app.post('/api/call', async (req, res) => {
    const { caller, question } = req.body || {};
    if (!caller || !question) return res.status(400).json({ error: 'caller and question required' });

    const normalized = normalizeQuestion(question);
    const kbEntry = await KnowledgeModel.findOne({ key: normalized }).lean();
    if (kbEntry) return res.json({ handled: true, answer: kbEntry.answer });

    const reqDoc = new RequestModel({
      caller,
      question,
      normalizedQuestion: normalized,
      status: 'pending',
      createdAt: Date.now()
    });
    await reqDoc.save();

    console.log(`[NOTIFY] Supervisor needed: "${question}" (request id: ${reqDoc._id})`);
    res.json({ handled: false, message: "Let me check with my supervisor and get back to you.", requestId: reqDoc._id });
  });

  // LiveKit token endpoint
  app.get('/api/livekit-token', async (req, res) => {
    try {
      const { room = 'demo-room', identity } = req.query;
      if (!identity) return res.status(400).json({ error: 'Missing identity' });

      const tokenObj = await issueLiveKitToken({ room, identity });
      if (!tokenObj) return res.status(500).json({ error: 'Token generation failed' });

      res.json(tokenObj);
    } catch (err) {
      console.error('[LIVEKIT] Token generation error', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Supervisor timeout handling
  setInterval(async () => {
    const cutoff = Date.now() - (SUPERVISOR_TIMEOUT * 1000);
    await RequestModel.updateMany({ status: 'pending', createdAt: { $lt: cutoff } }, { status: 'timed_out', resolvedAt: Date.now() });
  }, 10000);

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
