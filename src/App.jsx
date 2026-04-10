import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import YourHearth from './pages/YourHearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

export default function App() {
  const [sanctuaryState, setSanctuaryState] = useState(() => {
    const saved = localStorage.getItem('vault_reset_final');
    return saved ? JSON.parse(saved) : {
      name: "Traveler",
      tier: "Free",
      journey: "Classroom to New Horizon",
      isAligned: false,
      pulses: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('vault_reset_final', JSON.stringify(sanctuaryState));
  }, [sanctuaryState]);

  const forceSync = (updates) => setSanctuaryState(prev => ({ ...prev, ...updates }));

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0A15] text-white selection:bg-teal-500/30 font-sans">
        <Routes>
          <Route path="/" element={<Navigate to="/grove" replace />} />
          
          <Route 
            path="/hearth" 
            element={<YourHearth vault={sanctuaryState} onSync={forceSync} />} 
          />
          
          <Route path="/alignment" element={<CulturalFit vault={sanctuaryState} onSync={forceSync} />} />
          <Route path="/canopy" element={<Canopy vault={sanctuaryState} onSync={forceSync} />} />
          <Route path="/library" element={<Library vault={sanctuaryState} />} />
          <Route path="/grove" element={<GroveTiers vault={sanctuaryState} onSync={forceSync} />} />
          
          <Route path="*" element={<Navigate to="/grove" replace />} />
        </Routes>
      </div>
    </Router>
  );
}