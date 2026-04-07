import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';

// PAGE IMPORTS
import Dashboard from './pages/Dashboard'; 
import Library from './pages/Library';
import HorizonAudit from './pages/HorizonAudit'; 
import SkillTranslator from './pages/SkillTranslator'; 
import CulturalFit from './pages/CulturalFit';
import EmbersChat from './pages/EmbersChat';
import GroveTiers from './pages/GroveTiers'; // Make sure this matches your file name!

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1A1423] min-h-screen">
        <Sidebar />

        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/cultural-fit" element={<CulturalFit />} />
            <Route path="/embers" element={<EmbersChat />} />
            <Route path="/grove" element={<GroveTiers />} /> 

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;