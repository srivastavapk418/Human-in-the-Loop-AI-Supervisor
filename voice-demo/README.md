
# Voice Demo for Frontdesk HITL

This folder is a minimal static demo that adds browser-based speech-to-text (STT) and text-to-speech (TTS)
so the AI can "talk" to the caller and create/help requests that a supervisor can resolve.

How to run:
1. Open `voice-demo/index.html` in a Chromium-based browser (Chrome, Edge).  
   - SpeechRecognition (STT) generally works in Chrome/Edge.
   - On first use the browser will ask for microphone permission.
2. Click **Start Simulated Call** to hear the AI greeting.
3. Click **Start Listening** and speak your question.  
   - If the demo knows the answer (from the Learned Answers), it will reply.
   - Otherwise it will create a pending help request and "text" the supervisor (logged).
4. In the Supervisor Panel, paste an answer and **Submit Answer**.
   - The AI will immediately follow up to the caller via TTS and the answer will be saved in the knowledge base.

Notes:
- This is a local demo designed to satisfy the "must talk to me" demo requirement without external APIs.
- For the full assignment (LiveKit, server token flow, DB, webhook simulation), integrate this frontend with your existing backend routes and LiveKit session logic.
