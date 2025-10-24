const mongoose = require('mongoose');
const RequestSchema = new mongoose.Schema({
  caller: String,
  question: String,
  normalizedQuestion: String,
  status: String,
  answer: String,
  createdAt: Number,
  resolvedAt: Number
});
const RequestModel = mongoose.model('Request', RequestSchema);
module.exports = { RequestModel };

