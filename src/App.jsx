import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GroveTiers from './pages/GroveTiers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1A1423]">
        <Routes>
          {/* 1. THE FRONT DOOR: The Grove is now the Home Page */}
          <Route path="/" element={<GroveTiers />} />

          {/* 2. THE TRAFFIC CONTROLLER: Redirects /grove back to the Home Page */}
          <Route path="/grove" element={<Navigate to="/" replace />} />

          {/* CATCH-ALL: If they type a broken URL, send them back to the Grove */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;