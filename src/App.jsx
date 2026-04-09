import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import HearthV2 from './pages/Hearth'; // We keep the filename but rename the import
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

export default function App() {
  const [globalUser, setGlobalUser] = useState(() => {
    // New key 'hearth_final_v5' to bypass all previous browser memory
    const saved = localStorage.getItem('hearth_final_v5');
    return saved ? JSON.parse(saved) : {
      name: "Traveler",
      tier: "Free",
      journey: "Classroom to New Horizon",
      isAligned: false,
      pulses: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('hearth_final_v5', JSON.stringify(globalUser));
  }, [globalUser]);

  const sync = (updates) => setGlobalUser(prev => ({ ...prev, ...updates }));

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0A15] text-white selection:bg-teal-500/30">
        <Routes>
          <Route path="/" element={<Navigate to="/hearth" replace />} />
          
          {/* Using the renamed component reference */}
          <Route 
            path="/hearth" 
            element={<HearthV2 userData={globalUser} onSync={sync} />} 
          />
          
          <Route path="/alignment" element={<CulturalFit userData={globalUser} onSync={sync} />} />
          <Route path="/canopy" element={<Canopy userData={globalUser} onSync={sync} />} />
          <Route path="/library" element={<Library userData={globalUser} />} />
          <Route path="/grove" element={<GroveTiers userData={globalUser} onSync={sync} />} />
          
          <Route path="*" element={<Navigate to="/hearth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}