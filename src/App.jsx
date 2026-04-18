import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Flame, BookOpen, Globe, User, Activity } from 'lucide-react';

// Using exact filenames from your 'pages' folder
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

  // 1. STATE & PERSISTENCE
  const [vault, setVault] = useState({
    pulses: [],
    archetype: null,
    alignmentScore: 0,
    resume: null,
    standing: "Traveler",
    lastSync: null
  });

  useEffect(() => {
    const savedVault = localStorage.getItem('hearth_vault_data');
    if (savedVault) {
      try { setVault(JSON.parse(savedVault)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('hearth_vault_data', JSON.stringify(vault));
  }, [vault]);

  // 2. ACCOUNT DELETION (Blocking Issue Fix)
  const handleAccountDeletion = () => {
    setVault({ pulses: [], archetype: null, alignmentScore: 0, resume: null, standing: "Traveler" });
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleSync = (newData) => {
    if (newData === null) handleAccountDeletion();
    else setVault(prev => ({ ...prev, ...newData }));
  };

  // 3. INTERNAL NAVIGATION (Fixes "Stack Preservation" Warning)
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-[#0D0B10]/95 backdrop-blur-xl border-t border-white/5">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {[
          { label: 'Hearth', path: '/hearth', icon: Flame },
          { label: 'Library', path: '/library', icon: BookOpen },
          { label: 'Horizon', path: '/horizon', icon: Globe },
          { label: 'Embers', path: '/embers', icon: Activity }
        ].map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 w-full transition-all active:scale-95 ${
                isActive ? "text-teal-400" : "text-zinc-600"
              }`}
            >
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
      <main className="h-full w-full">
        <Routes>
          {/* Main Entry (Using GroveTiers as your landing) */}
          <Route path="/" element={<GroveTiers onSync={handleSync} />} />
          
          {/* Core App Views */}
          <Route 
            path="/hearth" 
            element={
              <YourHearth 
                vault={vault} 
                onSync={handleSync} 
                onResumeSync={(f) => setVault(p => ({...p, resume: f}))} 
                onNavigateToHorizon={() => navigate('/horizon')} 
              />
            } 
          />
          <Route path="/library" element={<Library vault={vault} />} />
          <Route path="/horizon" element={<Canopy vault={vault} />} />
          
          {/* Feature Routes */}
          <Route path="/embers" element={<EmbersChat vault={vault} />} />
          <Route path="/culture" element={<CulturalFit vault={vault} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard vault={vault} onSync={handleSync} />} />
        </Routes>
      </main>

      {/* Persistence Logic: Navigation stays fixed at the bottom */}
      {location.pathname !== '/' && <BottomNav />}
    </div>
  );
}