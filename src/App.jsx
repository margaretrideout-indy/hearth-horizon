import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Flame, BookOpen, Globe, Activity, Compass, LayoutDashboard } from 'lucide-react';

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

  const mainTabs = ['/hearth', '/library', '/horizon', '/embers'];
  const isMainTab = mainTabs.includes(location.pathname);

  // --- RESPONSIVE NAVIGATION ENGINE ---
  
  const NavLinks = ({ isDesktop = false }) => {
    // Definitive Navigation List based on your pillars
    const allLinks = [
      { label: 'Hearth', path: '/hearth', icon: Flame },
      { label: 'Alignment', path: '/culture', icon: Compass },
      { label: 'Horizon Board', path: '/horizon', icon: LayoutDashboard },
      { label: 'Library', path: '/library', icon: BookOpen },
      { label: 'Embers', path: '/embers', icon: Activity }
    ];

    return (
      <div className={`flex ${isDesktop ? 'flex-col gap-2' : 'justify-around items-center h-full'}`}>
        {allLinks.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button 
              key={tab.label} 
              onClick={() => navigate(tab.path)} 
              className={`flex transition-all active:scale-95 ${
                isDesktop 
                  ? `items-center gap-4 px-6 py-4 rounded-xl mx-2 ${isActive ? 'bg-zinc-800 text-teal-400 font-bold' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}` 
                  : `flex-col items-center gap-1 w-full justify-center ${isActive ? 'text-teal-400' : 'text-zinc-600'}`
              }`}
            >
              <tab.icon size={isDesktop ? 22 : 18} strokeWidth={isActive ? 2.5 : 2} />
              <span className={isDesktop ? 'text-sm tracking-wide' : 'text-[7px] font-black uppercase tracking-tighter'}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-[#0A080D] flex overflow-hidden">
      
      {/* PC SIDEBAR */}
      {location.pathname !== '/' && (
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#08070B] pt-8">
          <div className="px-8 mb-10 text-xs font-black uppercase tracking-[0.3em] text-zinc-700">
            Hearth Horizon
          </div>
          <div className="flex-1 overflow-y-auto">
            <NavLinks isDesktop />
          </div>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full relative overflow-y-auto custom-scrollbar flex flex-col">
        <div className="flex-1 w-full relative">
          
          {/* NATIVE STACK LAYERS */}
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

          {/* TRADITIONAL ROUTES (Includes Alignment) */}
          {!isMainTab && (
            <Routes>
              <Route path="/" element={<GroveTiers onSync={handleSync} />} />
              <Route path="/culture" element={<CulturalFit vault={vault} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard vault={vault} onSync={handleSync} />} />
            </Routes>
          )}
        </div>

        {location.pathname !== '/' && <div className="h-24 shrink-0 md:hidden" />}
      </main>

      {/* MOBILE BOTTOM NAV */}
      {location.pathname !== '/' && (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5 md:hidden">
          <div className="w-full h-20">
            <NavLinks />
          </div>
        </nav>
      )}
    </div>
  );
}