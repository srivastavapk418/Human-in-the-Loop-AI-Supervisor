import React, { useRef } from 'react';
import api from '../api';
import { Room } from 'livekit-client';

export default function LiveKitDemo() {
  const audioRef = useRef(null);

  const joinRoom = async () => {
    try {
      const identity = 'user-' + Math.floor(Math.random() * 100000);
      const { data } = await api.get('/livekit-token', { params: { room: 'demo-room', identity } });
      const { token, url } = data;

      const room = new Room();
      await room.connect(url, token, { audio: true, video: false });

      room.on('trackSubscribed', (track) => {
        if (track.kind === 'audio') track.attach(audioRef.current);
      });

      console.log('Connected to LiveKit room:', room.name);
    } catch (err) {
      console.error('[LIVEKIT] Connection failed:', err);
    }
  };

  return (
    <div className="card">
      <h3>LiveKit Demo</h3>
      <button onClick={joinRoom}>Join Room (User Gesture)</button>
      <audio ref={audioRef} autoPlay />
    </div>
  );
}
