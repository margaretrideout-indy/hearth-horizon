import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Flame, BookOpen, Globe, Activity } from 'lucide-react';

import GroveTiers from './pages/GroveTiers';
import YourHearth from './pages/YourHearth';
import Library from './pages/Library';
import AdminDashboard from './pages/AdminDashboard';
import Canopy from './pages/Canopy'; 
import Contact from './pages/Contact';
import CulturalFit from './pages/CulturalFit';
import EmbersChat from './pages/EmbersChat';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [vault, setVault] = useState(() => {
    const saved = localStorage.getItem('hearth_vault_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return { pulses: [], archetype: null, alignmentScore: 0, resume: null, standing: "Traveler", lastSync: null };
  });

  useEffect(() => {
    localStorage.setItem('hearth_vault_data', JSON.stringify(vault));
  }, [vault]);

  const handleAccountDeletion = () => {
    setVault({ pulses: [], archetype: null, alignmentScore: 0, resume: null, standing: "Traveler", lastSync: null });
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate('/');
  };

  const handleSync = (newData) => {
    if (newData === null) handleAccountDeletion();
    else setVault(prev => ({ ...prev, ...newData }));
  };

  // --- STACK PRESERVATION LOGIC ---
  const mainTabs = ['/hearth', '/library', '/horizon', '/embers'];
  const isMainTab = mainTabs.includes(location.pathname);

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {[
          { label: 'Hearth', path: '/hearth', icon: Flame },
          { label: 'Library', path: '/library', icon: BookOpen },
          { label: 'Horizon', path: '/horizon', icon: Globe },
          { label: 'Embers', path: '/embers', icon: Activity }
        ].map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button key={tab.path} onClick={() => navigate(tab.path)} className={`flex flex-col items-center gap-1 w-full transition-all active:scale-95 ${isActive ? "text-teal-400" : "text-zinc-600"}`}>
              <tab.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="h-full w-full bg-[#0A080D] overflow-hidden">
      <main className="h-full w-full relative">
        
        {/* NATIVE STACK: These layers stay mounted but hidden, preserving scroll/state */}
        <div className={location.pathname === '/hearth' ? 'block h-full' : 'hidden'}>
          <YourHearth vault={vault} onSync={handleSync} onNavigateToHorizon={() => navigate('/horizon')} />
        </div>
        
        <div className={location.pathname === '/library' ? 'block h-full' : 'hidden'}>
          <Library vault={vault} />
        </div>
        
        <div className={location.pathname === '/horizon' ? 'block h-full' : 'hidden'}>
          <Canopy vault={vault} />
        </div>
        
        <div className={location.pathname === '/embers' ? 'block h-full' : 'hidden'}>
          <EmbersChat vault={vault} />
        </div>

        {/* SUB-PAGES: Traditional routing for one-off pages */}
        {!isMainTab && (
          <Routes>
            <Route path="/" element={<GroveTiers onSync={handleSync} />} />
            <Route path="/culture" element={<CulturalFit vault={vault} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard vault={vault} onSync={handleSync} />} />
          </Routes>
        )}
      </main>

      {location.pathname !== '/' && <BottomNav />}
    </div>
  );
}