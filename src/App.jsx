import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Branches from './pages/Branches';

export default function App() {
  return (
    <Router>
      <div style={{ padding: 12 }}>
        <nav style={{ marginBottom: 12 }}>
          <Link to="/branches">Branches</Link>
        </nav>
        <Routes>
          <Route path="/branches" element={<Branches />} />
        </Routes>
      </div>
    </Router>
  );
}
