import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Check: If your folder is "Layout", change 'layout' to 'Layout' below
import Sidebar from './components/layout/Sidebar';

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
            {/* THIS IS THE KEY: '/hearth' now specifically renders the Dashboard component */}
            <Route path="/hearth" element={<Dashboard />} />
            
            <Route path="/library" element={<Library />} />
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/cultural-fit" element={<CulturalFit />} />

            <Route path="/" element={<Navigate to="/hearth" replace />} />
            <Route path="*" element={<Navigate to="/hearth" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;