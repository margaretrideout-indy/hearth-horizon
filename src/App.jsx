import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Hearth from './pages/Hearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

function App() {
  // --- PERSISTENT ECOSYSTEM STATE ---
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('hearth_vault');
    return saved ? JSON.parse(saved) : {
      name: "Traveler",
      tier: "Free", 
      journey: "Classroom to New Horizon",
      isAligned: false,
      pulses: [],
      analysis: {
        identityStatement: "Awaiting ecosystem synthesis...",
        legacyDomain: "",
        corporateEquivalent: "",
        variations: { pm: "", data: "", ops: "" }
      }
    };
  });

  // Sync state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('hearth_vault', JSON.stringify(userData));
  }, [userData]);

  // Global Sync Function passed to all children
  const syncEcosystem = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30">
        <Routes>
          {/* ENTRY POINT */}
          <Route path="/" element={<Navigate to="/hearth" replace />} />
          
          {/* YOUR HEARTH (The Sanctuary / Intake / Logbook) */}
          <Route 
            path="/hearth" 
            element={<Hearth userData={userData} onSync={syncEcosystem} />} 
          />

          {/* ECOSYSTEM ALIGNMENT (The Clearing / Compass / Trek Report) */}
          <Route 
            path="/alignment" 
            element={<CulturalFit userData={userData} onSync={syncEcosystem} />} 
          />

          {/* THE CANOPY (High-Ground Opportunities / Market Search) */}
          <Route 
            path="/canopy" 
            element={<Canopy userData={userData} onSync={syncEcosystem} />} 
          />

          {/* THE LIBRARY (Research / Non-Fiction / Learning) */}
          <Route 
            path="/library" 
            element={<Library userData={userData} />} 
          />

          {/* GROVE TIERS (Membership / Reciprocity Model) */}
          <Route 
            path="/grove" 
            element={<GroveTiers userData={userData} onSync={syncEcosystem} />} 
          />

          {/* CATCH-ALL REDIRECT */}
          <Route path="*" element={<Navigate to="/hearth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;