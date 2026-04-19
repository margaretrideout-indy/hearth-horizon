import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Flame, BookOpen, Activity, Compass, LayoutDashboard, LogOut } from 'lucide-react';
import { base44 } from '@/api/base44Client'; 

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
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const [vault, setVault] = useState(() => {
    const saved = localStorage.getItem('hearth_vault_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return { 
      pulses: [], 
      archetype: null, 
      alignmentScore: 0, 
      resume: null, 
      standing: "Traveler", 
      tier: "none", 
      email: null,
      lastSync: null 
    };
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        if (user) {
          // 1. Hard-code the Founder Identity with safety normalization
          const userEmail = user.email ? user.email.toLowerCase().trim() : '';
          const isSystemAdmin = user.role === 'admin' || userEmail === 'margaretpardy@gmail.com'; 
          
          setIsAdmin(isSystemAdmin);
          
          // 2. Normalize Tier Strings
          const rawTier = user.tier ? user.tier.trim() : "Traveler";
          const normalizedTier = rawTier.toLowerCase();
          
          setVault(prev => ({ 
            ...prev, 
            email: user.email,
            tier: normalizedTier,
            standing: isSystemAdmin ? 'Admin' : rawTier
          }));
        }
      } catch (e) {
        console.warn("Guest session active.");
      } finally {
        setIsInitializing(false);
      }
    };
    checkAuth();
  }, []);

  // Persistent storage sync
  useEffect(() => {
    if (!isInitializing) {
      localStorage.setItem('hearth_vault_data', JSON.stringify(vault));
    }
  }, [vault, isInitializing]);

  const handleSync = (newData) => {
    if (newData === null) {
      setVault({ pulses: [], standing: "Traveler", tier: "none", email: null });
      localStorage.clear();
      navigate('/grove');
    } else {
      setVault(prev => ({ ...prev, ...newData }));
    }
  };

  const mainTabs = ['/hearth', '/library', '/horizon', '/embers'];
  const isMainTab = mainTabs.includes(location.pathname);

  const NavLinks = ({ isDesktop = false }) => {
    const allLinks = [
      { label: 'Hearth', path: '/hearth', icon: Flame },
      { label: 'Alignment', path: '/culture', icon: Compass },
      { label: 'Horizon Board', path: '/horizon', icon: LayoutDashboard },
      { label: 'Library', path: '/library', icon: BookOpen },
      { label: 'Embers', path: '/embers', icon: Activity }
    ];

    return (
      <div className={`flex ${isDesktop ? 'flex-col h-full pb-8' : 'justify-around items-center h-full px-2'}`}>
        <div className={`flex ${isDesktop ? 'flex-col gap-2' : 'w-full flex-row justify-around'}`}>
          {allLinks.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button 
                key={tab.label} 
                onClick={() => navigate(tab.path)} 
                className={`flex transition-all active:scale-95 ${
                  isDesktop 
                    ? `items-center gap-4 px-6 py-4 rounded-xl mx-2 ${isActive ? 'bg-zinc-800 text-teal-400 font-bold' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}` 
                    : `flex-col items-center gap-1 min-w-[64px] justify-center ${isActive ? 'text-teal-400' : 'text-zinc-600'}`
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

        <div className={isDesktop ? 'mt-auto pt-4 border-t border-white/5' : 'hidden'}>
            {isAdmin && (
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-4 px-6 py-4 rounded-xl mx-2 w-[calc(100%-16px)] text-purple-400 hover:bg-purple-400/5 transition-all mb-2"
              >
                <LayoutDashboard size={20} />
                <span className="text-sm tracking-wide font-medium">Registry Admin</span>
              </button>
            )}
            <button 
              onClick={() => navigate('/grove')}
              className="flex items-center gap-4 px-6 py-4 rounded-xl mx-2 w-[calc(100%-16px)] text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm tracking-wide font-medium">Exit to Grove</span>
            </button>
        </div>
      </div>
    );
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full bg-[#0A080D] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_#39FFCA]" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0A080D] flex overflow-hidden">
      
      {location.pathname !== '/grove' && location.pathname !== '/' && (
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#08070B] pt-8">
          <div className="px-8 mb-10 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">Hearth Horizon</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <NavLinks isDesktop />
          </div>
        </aside>
      )}

      <main className="flex-1 h-full relative overflow-y-auto custom-scrollbar flex flex-col">
        <div className="flex-1 w-full relative">
          
          <div className={location.pathname === '/hearth' ? 'block h-full' : 'hidden'}>
            <YourHearth vault={vault} onSync={handleSync} isAdmin={isAdmin} onNavigateToHorizon={() => navigate('/horizon')} />
          </div>
          
          <div className={location.pathname === '/library' ? 'block h-full' : 'hidden'}>
            <Library vault={vault} onSync={handleSync} isAdmin={isAdmin} />
          </div>
          
          <div className={location.pathname === '/horizon' ? 'block h-full' : 'hidden'}>
            <Canopy vault={vault} onSync={handleSync} isAdmin={isAdmin} />
          </div>
          
          <div className={location.pathname === '/embers' ? 'block h-full' : 'hidden'}>
            <EmbersChat vault={vault} isAdmin={isAdmin} />
          </div>

          {!isMainTab && (
            <Routes>
              <Route path="/grove" element={<GroveTiers vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
              <Route path="/culture" element={<CulturalFit vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
              <Route path="/contact" element={<Contact vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
              <Route path="/admin" element={<AdminDashboard vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
              <Route path="/" element={<Navigate to="/grove" replace />} />
            </Routes>
          )}
        </div>
      </main>

      {location.pathname !== '/grove' && location.pathname !== '/' && (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] pb-[env(safe-area-inset-bottom)] bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5 md:hidden">
          <div className="w-full h-20">
            <NavLinks />
          </div>
        </nav>
      )}
    </div>
  );
}