## Frontdesk Voice AI – Full-Stack Voice-Enabled Helpdesk

This is a fully voice-enabled helpdesk demo built for Frontdesk’s HITL (Human-in-the-Loop) coding assessment. Users can talk to the AI, which responds via voice, checks a backend knowledge base, and creates supervisor-assisted help requests when needed.


### Features:
Voice Interaction: Speech-to-text (STT) and text-to-speech (TTS) in real time.
Knowledge Base Integration: AI answers queries from MongoDB (KnowledgeModel).
Help Requests: Unanswered questions are logged for supervisor resolution (RequestModel).
Supervisor Panel: Resolve pending requests; AI automatically updates KB and responds.
LiveKit Ready: Backend prepared for future real-time voice/video streaming.


### Setup:
#### Backend:

##### Navigate to backend folder:
cd backend
npm install

##### Create .env file:
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
SUPERVISOR_TIMEOUT_SECONDS=300
CLIENT_URL=http://127.0.0.1:5500
LIVEKIT_API_KEY=<your-livekit-key>
LIVEKIT_API_SECRET=<your-livekit-secret>
LIVEKIT_URL=<your-livekit-url>


### Start server:
npm run dev

### Frontend:
Open index.html in Chrome/Edge


### Buttons:
#### Button	Action:
Start Simulated Call - 	Activates mic, greets user, starts listening
Start Listening	-  Start/stop voice recognition manually
Speak Status - 	Announces system readiness
Simulate Help Request -  Generate test help request


### Usage:
Click Start Simulated Call.
Speak your question.
AI replies via TTS if known.
If unknown → creates help request in backend.
Use Supervisor Panel to answer pending requests.
AI updates knowledge and responds automatically.


### Notes:
CORS: Backend allows all origins for local testing.
Browser Support: STT/TTS works best in Chromium browsers.
Database: MongoDB must be connected for full functionality.
Extensible: Can integrate LiveKit for real-time calls.


### Credits
Built by Prateek Kumar Srivastava for Frontdesk HITL assessment.
Uses Node.js, Express, MongoDB.