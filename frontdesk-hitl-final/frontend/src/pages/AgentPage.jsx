import React, { useState, useRef } from 'react';
import api from '../api';
import { Room, LocalAudioTrack } from 'livekit-client';

export default function AgentPage() {
  const [caller, setCaller] = useState('+1-555-0123');
  const [question, setQuestion] = useState('What are your hours?');
  const [log, setLog] = useState([]);
  const roomRef = useRef(null);
  const audioRef = useRef(null);

  const append = (s) => setLog((l) => [...l, s]);

  const simulate = async () => {
    append('[CALL] ' + caller + ': "' + question + '"');
    try {
      const resp = await api.post('/call', { caller, question });
      if (resp.data.handled) {
        append('[AI] Answered: ' + resp.data.answer);
      } else {
        append('[AI] Said to caller: ' + resp.data.message + ' (requestId=' + resp.data.requestId + ')');
        append('[AI] Notified supervisor (server console).');
      }
    } catch (e) {
      append('[ERROR] ' + (e.response?.data?.error || e.message));
    }
  };

  const startVoice = async () => {
    try {
      const identity = 'agent-' + Math.floor(Math.random() * 100000);
      const { data } = await api.get('/livekit-token', { params: { room: 'demo-room', identity } });
      const { token, url } = data;

      const room = new Room();
      roomRef.current = room;

      await room.connect(url, token, { audio: true, video: false });

      const localTrack = await LocalAudioTrack.create();
      await room.localParticipant.publishTrack(localTrack);

      room.on('trackSubscribed', (track) => {
        if (track.kind === 'audio') track.attach(audioRef.current);
      });

      append('[LIVEKIT] Connected to room and ready to receive audio!');
    } catch (err) {
      append('[LIVEKIT] Connection failed: ' + err);
    }
  };

  return (
    <div>
      <div className="card">
        <h3>LiveKit (voice)</h3>
        <button onClick={startVoice}>Talk to AI via Microphone</button>
        <audio ref={audioRef} autoPlay />
      </div>

      <div className="card">
        <h3>Simulate Call (text)</h3>
        <input value={caller} onChange={e => setCaller(e.target.value)} placeholder="Caller" />
        <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Question" />
        <button onClick={simulate}>Simulate Call</button>
      </div>

      <div className="card">
        <h4>Log</h4>
        <div style={{ whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto', background: '#f7f7f7', padding: 10 }}>
          {log.map((l, i) => (<div key={i}>{l}</div>))}
        </div>
      </div>
    </div>
  );
}
