import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// IMPORTING FROM THE LAYOUT FOLDER
import Sidebar from './layout/Sidebar';

// PAGE IMPORTS
import Hearth from './pages/Hearth';
import Library from './pages/Library';
import HorizonAudit from './pages/HorizonAudit'; 
import SkillTranslator from './pages/SkillTranslator'; 
import CulturalFit from './pages/CulturalFit';

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1A1423] min-h-screen">
        {/* Persistent Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64">
          <Routes>
            {/* NAVIGATION */}
            <Route path="/hearth" element={<Hearth />} />
            <Route path="/library" element={<Library />} />

            {/* TRANSITION */}
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/cultural-fit" element={<CulturalFit />} />

            {/* REDIRECTS */}
            <Route path="/" element={<Navigate to="/hearth" replace />} />
            <Route path="*" element={<Navigate to="/hearth" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;