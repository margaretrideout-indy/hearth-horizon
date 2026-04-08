import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar'; 
import GroveTiers from './pages/GroveTiers';
import Library from './pages/Library';
import EmbersChat from './pages/EmbersChat';
import Canopy from './pages/Canopy';

// This layout only applies to internal pages (Library, Chat, etc.)
const AppLayout = () => (
  <div className="flex min-h-screen bg-[#1A1423]">
    {/* Sidebar is fixed/present ONLY for these routes */}
    <Sidebar />
    <main className="flex-1 md:ml-64 overflow-y-auto">
      <Outlet /> 
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* GroveTiers is RENDERED ALONE - No Sidebar, Full Screen, App/Web Ready */}
        <Route path="/" element={<GroveTiers />} />

        {/* These routes will have the Sidebar */}
        <Route element={<AppLayout />}>
          <Route path="/library" element={<Library />} />
          <Route path="/embers" element={<EmbersChat />} />
          <Route path="/canopy" element={<Canopy />} />
        </Route>

        {/* Redirects */}
        <Route path="/grove" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;