import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import GroveTiers from './pages/GroveTiers';
import Library from './pages/Library';
import EmbersChat from './pages/EmbersChat';
import Canopy from './pages/Canopy';

const AppLayout = () => (
  <div className="flex min-h-screen bg-[#1A1423]">
    <Sidebar />
    <main className="flex-1 overflow-y-auto">
      <Outlet /> 
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GroveTiers />} />

        <Route element={<AppLayout />}>
          <Route path="/library" element={<Library />} />
          <Route path="/embers" element={<EmbersChat />} />
          <Route path="/canopy" element={<Canopy />} />
        </Route>

        <Route path="/grove" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;