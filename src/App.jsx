import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hearth from './pages/Hearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';

function App() {
  const [userAnalysis, setUserAnalysis] = useState({
    identityStatement: "A strategic architect of human capital with 13 years of expertise in curriculum scaling and educational operations.",
    legacyDomain: "Education & Pedagogy",
    corporateEquivalent: "Human Capital & L&D Strategy",
    variations: {
      pm: "Managed complex lifecycle projects for diverse stakeholder groups, ensuring 100% compliance with provincial standards.",
      data: "Analyzed longitudinal performance metrics across 13 years to iterate on curriculum delivery and student success rates.",
      ops: "Oversaw daily operational logistics and resource allocation for multi-faceted educational environments."
    }
  });

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30">
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/hearth" replace />} 
          />
          
          <Route 
            path="/hearth" 
            element={<Hearth onAnalysisComplete={setUserAnalysis} />} 
          />

          <Route 
            path="/alignment" 
            element={<CulturalFit userAnalysis={userAnalysis} />} 
          />

          <Route 
            path="/canopy" 
            element={<Canopy userAnalysis={userAnalysis} />} 
          />

          <Route 
            path="*" 
            element={<Navigate to="/hearth" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;