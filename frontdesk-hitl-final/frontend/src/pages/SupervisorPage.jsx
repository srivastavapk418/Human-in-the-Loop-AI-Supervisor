import React, { useEffect, useState } from 'react';
import api from '../api';

export default function SupervisorPage() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('pending');

  const load = async (status = filter) => {
    try {
      const resp = await api.get('/requests' + (status ? '?status=' + status : ''));
      setRequests(resp.data);
    } catch (e) { alert('Failed to load: ' + (e.message || e)); }
  };

  useEffect(() => { load('pending'); }, []);

  const resolve = async (id, answer) => {
    if (!answer) return alert('Please enter answer');
    try {
      const resp = await api.post('/requests/' + id + '/resolve', { answer });
      if (resp.data.ok) {
        alert('Resolved — KB updated and caller texted (server console).');
        load('pending');
      }
    } catch (e) { alert('Error: ' + (e.response?.data?.error || e.message)); }
  };

  return (
    <div>
      <div className="card">
        <h3>Supervisor Panel</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => load('pending')}>Pending</button>
          <button onClick={() => load('resolved')}>Resolved</button>
          <button onClick={() => load('timed_out')}>Timed Out</button>
          <button onClick={() => load('')}>All</button>
        </div>
      </div>

      <div>
        {requests.length === 0 && <div className="card">No requests</div>}
        {requests.map(r => (
          <div className="card" key={r._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Request: {r._id}</strong><span>{r.status}</span>
            </div>
            <div><em>From:</em> {r.caller}</div>
            <div><em>Question:</em> {r.question}</div>
            <div><em>Created:</em> {new Date(r.createdAt).toLocaleString()}</div>
            <div style={{ marginTop: 8 }}>
              <textarea id={'ans-' + r._id} placeholder="Type answer here...">{r.answer || ''}</textarea>
              <div style={{ marginTop: 6 }}>
                <button onClick={() => { const v = document.getElementById('ans-' + r._id).value; resolve(r._id, v); }}>Resolve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
