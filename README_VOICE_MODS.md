
# Frontdesk HITL — Voice Additions (auto-generated)

I added a simple browser-based voice demo at `voice-demo/` that:
- Provides TTS (text-to-speech) and STT (speech-to-text) using the browser Web Speech API.
- Simulates the help-request lifecycle and a supervisor panel.
- Stores learned answers in-memory and demonstrates immediate follow-up behavior.

Files added:
- voice-demo/index.html
- voice-demo/README.md

Why:
- The original project did not include a working voice demo; the assessment requires the AI to "talk" to the caller.
- This local demo works offline in a browser and is easy to integrate into your existing project.

Next steps you may want to take (suggestions in README):
- Integrate with LiveKit voice streams to handle real calls.
- Persist help requests and KB to a lightweight DB (Firebase/DynamoDB/SQLite).
- Hook supervisor UI to backend APIs.

