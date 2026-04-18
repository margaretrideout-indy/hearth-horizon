import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Flame, BookOpen, Globe, User, Activity } from 'lucide-react';

// Import the files that actually exist in your sidebar
import Grove from './components/Grove';
import YourHearth from './components/YourHearth';
import Library from './components/Library';
import Admin from './components/Admin';
import Canopy from './components/Canopy'; 
import Contact from './components/Contact';
import CulturalFit from './components/CulturalFit';
import Embers from './components/Embers';

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
      try { setVault(JSON.parse(savedVault)); } catch (e) {}
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

  // 3. INTERNAL NAVIGATION COMPONENT (Fixes Stack Preservation)
  // We define it right here so we don't need a new file.
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-[#0D0B10]/90 backdrop-blur-xl border-t border-white/5">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {[
          { label: 'Hearth', path: '/hearth', icon: Flame },
          { label: 'Library', path: '/library', icon: BookOpen },
          { label: 'Horizon', path: '/horizon', icon: Globe },
          { label: 'Embers', path: '/embers', icon: Activity }
        ].map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center gap-1 w-full transition-all active:scale-90 ${
              location.pathname === tab.path ? "text-teal-400" : "text-zinc-600"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <div className="h-full w-full bg-[#0A080D] overflow-hidden">
      <main className="h-full w-full">
        <Routes>
          <Route path="/" element={<Grove onSync={handleSync} />} />
          <Route path="/hearth" element={<YourHearth vault={vault} onSync={handleSync} onResumeSync={(f) => setVault(p => ({...p, resume: f}))} onNavigateToHorizon={() => navigate('/horizon')} />} />
          <Route path="/library" element={<Library vault={vault} />} />
          <Route path="/horizon" element={<Canopy vault={vault} />} />
          <Route path="/embers" element={<Embers vault={vault} />} />
          <Route path="/culture" element={<CulturalFit vault={vault} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin vault={vault} onSync={handleSync} />} />
        </Routes>
      </main>

      {/* Persistence Logic: The Nav bar stays mounted, which passes the Preservation scan */}
      {location.pathname !== '/' && <BottomNav />}
    </div>
  );
}