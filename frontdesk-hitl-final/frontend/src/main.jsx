import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AgentPage from './pages/AgentPage';
import SupervisorPage from './pages/SupervisorPage';
import LiveKitDemo from './pages/LiveKitDemo';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20, fontFamily: 'system-ui, Arial' }}>
        <h2>Frontdesk HITL Demo</h2>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/">Agent</Link> | <Link to="/supervisor">Supervisor</Link>
        </nav>
        <LiveKitDemo />
        <Routes>
          <Route path="/" element={<AgentPage />} />
          <Route path="/supervisor" element={<SupervisorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
