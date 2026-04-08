import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GroveTiers from './pages/GroveTiers';
// Import your other components here (e.g., Dashboard, Profile, etc.)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1A1423]">
        <Routes>
          {/* THE NEW HOMEPAGE: The Grove is now the first thing people see */}
          <Route path="/" element={<GroveTiers />} />

          {/* REDIRECT: If someone types /grove, it sends them to the homepage (/) */}
          <Route path="/grove" element={<Navigate to="/" replace />} />

          {/* ADDITIONAL ROUTES: 
            As you build out the rest of the app, add them here. 
            Example: <Route path="/dashboard" element={<Dashboard />} />
          */}

          {/* FALLBACK: Sends any broken links back to the Grove */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;