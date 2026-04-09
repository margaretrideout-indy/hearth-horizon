import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Hearth from './pages/Hearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

export default function App() {
  const [sanctuaryState, setSanctuaryState] = useState(() => {
    // Changing the key to 'vault_reset_final' wipes the old data cache
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
          <Route path="/" element={<Navigate to="/hearth" replace />} />
          
          {/* We are now passing the 'vault' prop instead of 'userData' */}
          <Route 
            path="/hearth" 
            element={<Hearth vault={sanctuaryState} onSync={forceSync} />} 
          />
          
          <Route path="/alignment" element={<CulturalFit vault={sanctuaryState} onSync={forceSync} />} />
          <Route path="/canopy" element={<Canopy vault={sanctuaryState} onSync={forceSync} />} />
          <Route path="/library" element={<Library vault={sanctuaryState} />} />
          <Route path="/grove" element={<GroveTiers vault={sanctuaryState} onSync={forceSync} />} />
          
          <Route path="*" element={<Navigate to="/hearth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}