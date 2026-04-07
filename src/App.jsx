import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';

// PAGE IMPORTS
import Dashboard from './pages/Dashboard'; 
import Library from './pages/Library';
import HorizonAudit from './pages/HorizonAudit'; 
import SkillTranslator from './pages/SkillTranslator'; 
import CulturalFit from './pages/CulturalFit';

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1A1423] min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64">
          <Routes>
            {/* THE HEARTH now maps directly to Dashboard to remove redundancy */}
            <Route path="/hearth" element={<Dashboard />} />
            
            <Route path="/library" element={<Library />} />
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/cultural-fit" element={<CulturalFit />} />

            {/* DEFAULT REDIRECT */}
            <Route path="/" element={<Navigate to="/hearth" replace />} />
            <Route path="*" element={<Navigate to="/hearth" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;