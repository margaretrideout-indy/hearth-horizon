import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports - Ensure these files exist in your src/pages folder
import Hearth from './pages/Hearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';
import Library from './pages/Library';
import GroveTiers from './pages/GroveTiers';

function App() {
  // --- PERSISTENT ECOSYSTEM STATE ---
  // This replaces the old 'userAnalysis' with a full 'userData' vault
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('hearth_vault');
    return saved ? JSON.parse(saved) : {
      name: "Traveler", // Dynamic name for your users
      tier: "Free", 
      journey: "Classroom to New Horizon",
      isAligned: false,
      pulses: [], // This will store the "Recent Reflections" seen in your screenshots
      analysis: {
        identityStatement: "Awaiting ecosystem synthesis...",
        legacyDomain: "",
        corporateEquivalent: "",
        variations: { pm: "", data: "", ops: "" }
      }
    };
  });

  // Save the vault to the browser so data isn't lost on refresh
  useEffect(() => {
    localStorage.setItem('hearth_vault', JSON.stringify(userData));
  }, [userData]);

  // Global Function to update the sanctuary from any page
  const syncEcosystem = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30">
        <Routes>
          {/* THE ENTRY POINT */}
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

          {/* THE GROVE (Membership / Reciprocity Model) */}
          <Route 
            path="/grove" 
            element={<GroveTiers userData={userData} onSync={syncEcosystem} />} 
          />

          {/* CATCH-ALL REDIRECT (Prevents broken links) */}
          <Route path="*" element={<Navigate to="/hearth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;