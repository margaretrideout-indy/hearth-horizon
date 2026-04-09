import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Hearth from './pages/Hearth';
import CulturalFit from './pages/CulturalFit';
import Canopy from './pages/Canopy';

function App() {
  const [userAnalysis, setUserAnalysis] = useState(null);

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