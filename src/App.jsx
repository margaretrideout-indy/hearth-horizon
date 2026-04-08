import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';

import Dashboard from './pages/Dashboard'; 
import Library from './pages/Library';
import HorizonAudit from './pages/HorizonAudit'; 
import SkillTranslator from './pages/SkillTranslator'; 
import CulturalFit from './pages/CulturalFit';
import EmbersChat from './pages/EmbersChat';
import GroveTiers from './pages/GroveTiers';

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1A1423] min-h-screen">
        <Sidebar />
        {/* Added lg:ml-64 so the margin ONLY exists on big screens */}
        <main className="flex-1 lg:ml-64 w-full min-h-screen overflow-x-hidden">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<Library />} />
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/grove" element={<GroveTiers />} /> 
            <Route path="/cultural-fit" element={<CulturalFit />} />
            <Route path="/embers" element={<EmbersChat />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;