import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './layout/Sidebar';

// PAGE IMPORTS
import Hearth from './pages/Hearth';
import Library from './pages/Library';
import HorizonAudit from './pages/HorizonAudit'; // The Rootwork
import SkillTranslator from './pages/SkillTranslator'; // Linguistic Bridge
import CulturalFit from './pages/CulturalFit'; // Ecosystem Alignment

const App = () => {
  return (
    <Router>
      <div className="flex bg-[#1A1423] min-h-screen">
        {/* Sidebar stays persistent on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 ml-64">
          <Routes>
            {/* NAVIGATION SECTION */}
            <Route path="/hearth" element={<Hearth />} />
            <Route path="/library" element={<Library />} />

            {/* TRANSITION SECTION */}
            <Route path="/audit" element={<HorizonAudit />} />
            <Route path="/translator" element={<SkillTranslator />} />
            <Route path="/cultural-fit" element={<CulturalFit />} />

            {/* DEFAULT REDIRECT */}
            <Route path="/" element={<Navigate to="/hearth" replace />} />
            
            {/* CATCH-ALL FOR ERRORS */}
            <Route path="*" element={<Navigate to="/hearth" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;