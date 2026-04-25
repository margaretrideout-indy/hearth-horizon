import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Flame, BookOpen, Activity, Compass, LayoutDashboard, Trees, ShieldCheck } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Hearth & Horizon Ecosystem Components
import GroveTiers from './pages/GroveTiers';
import YourHearth from './pages/YourHearth';
import Library from './pages/Library';
import AdminDashboard from './pages/AdminDashboard';
import Canopy from './pages/Canopy';
import Contact from './pages/Contact';
// CulturalFit archived — tools consolidated into Library > High Forge
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
      lastSync: null,
      lexicon: [],
      currentDraft: null,
      legacyResume: null,
      hearthRecord: null,
      resonance: []
    };
  });

  const currentTier = vault?.tier?.toLowerCase() || 'none';
  const isRegistered = currentTier !== 'none' && currentTier !== 'traveler';
  const isSeedlingPlus = isAdmin || isRegistered || currentTier === 'admin' || currentTier === 'steward';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        if (user) {
          const userEmail = user.email ? user.email.toLowerCase().trim() : '';
          const isSystemAdmin = user.role === 'admin' || userEmail === 'margaretpardy@gmail.com';
          setIsAdmin(isSystemAdmin);

          const rawTier = user.tier ? user.tier.trim() : "Traveler";
          const normalizedTier = rawTier.toLowerCase();

          const tierMapping = {
            "seedling": "Seedling",
            "seedling free": "Seedling",
            "hearthkeeper": "Hearthkeeper",
            "steward": "Steward",
            "founding steward": "Steward",
            "traveler": "Traveler"
          };

          let displayStanding = tierMapping[normalizedTier] || rawTier;
          if (isSystemAdmin) displayStanding = "Founder";

          setVault((prev) => ({
            ...prev,
            email: user.email,
            tier: isSystemAdmin ? "steward" : normalizedTier,
            standing: displayStanding,
            archetype: user.archetype || prev.archetype,
            resume: user.resume_metadata || prev.resume,
            lexicon: user.lexicon || prev.lexicon || [] // Sync lexicon from cloud
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

  useEffect(() => {
    if (!isInitializing) {
      localStorage.setItem('hearth_vault_data', JSON.stringify(vault));
    }
  }, [vault, isInitializing]);

  const handleSync = async (updatedData = null) => {
    try {
      if (updatedData) {
        setVault(updatedData);
      } else {
        const user = await base44.auth.me();
        if (user) {
          setVault((prev) => ({
            ...prev,
            ...user,
            lastSync: new Date().toISOString()
          }));
        }
      }
    } catch (e) {
      console.error("Sync failed", e);
    }
  };

  const handleResumeSync = async (file) => {
    const resumeData = {
      name: file.name,
      lastModified: new Date().toISOString(),
      size: file.size
    };

    setVault(prev => ({
      ...prev,
      resume: resumeData
    }));

    try {
      await base44.entities.Vault.update(vault.id, {
        resume_metadata: resumeData 
      });
    } catch (e) {
      console.error("Cloud sync failed.", e);
    }
  };

  const showNav = !['/grove', '/', '/contact'].includes(location.pathname);

  const NavLinks = ({ isDesktop = false }) => {
    const mainLinks = [
      { label: 'Hearth', path: '/hearth', icon: Flame },
      { label: 'Library', path: '/library', icon: BookOpen },
      { label: 'Horizon', path: '/horizon', icon: LayoutDashboard },
      { label: 'Embers', path: '/embers', icon: Activity }
    ];

    if (isDesktop) {
      return (
        <div className="flex flex-col h-full pb-8 justify-between">
          <div className="flex flex-col gap-2">
            {mainLinks.map((tab) => {
              const isActive = location.pathname === tab.path;
              return (
                <button
                  key={tab.label}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-xl mx-2 transition-all active:scale-95 ${isActive ? 'bg-zinc-800 text-teal-400 font-bold' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}
                >
                  <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 px-2 pb-4 border-t border-white/5 pt-4 mt-4">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className={`flex items-center gap-4 px-6 py-3 rounded-xl transition-all active:scale-95 ${location.pathname === '/admin' ? 'bg-zinc-800 text-amber-400 font-bold' : 'text-zinc-600 hover:text-amber-400 hover:bg-zinc-900/50'}`}
              >
                <ShieldCheck size={18} strokeWidth={2} />
                <span className="text-xs tracking-wide">Admin</span>
              </button>
            )}
            <button
              onClick={() => navigate('/grove')}
              className="flex items-center gap-4 px-6 py-3 rounded-xl transition-all active:scale-95 text-zinc-600 hover:text-teal-400 hover:bg-zinc-900/50"
            >
              <Trees size={18} strokeWidth={2} />
              <span className="text-xs tracking-wide">Return to Grove</span>
            </button>
          </div>
        </div>
      );
    }

    const mobileLinks = [
      ...mainLinks,
      { label: 'Grove', path: '/grove', icon: Trees },
      ...(isAdmin ? [{ label: 'Admin', path: '/admin', icon: ShieldCheck }] : []),
    ];

    return (
      <>
        {mobileLinks.map((tab) => {
          const isActive = location.pathname === tab.path;
          const accentColor = tab.path === '/admin'
            ? (isActive ? 'text-amber-400' : 'text-zinc-600')
            : (isActive ? 'text-teal-400' : 'text-zinc-600');
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center min-w-[48px] flex-1 py-2 transition-all active:scale-90 ${accentColor}`}
            >
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {/* Labels only show on screens larger than mobile (sm:block) */}
              <span className="text-[8px] font-black uppercase tracking-tighter mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="h-screen w-full bg-[#0A080D] flex overflow-hidden font-sans text-zinc-200">
      {showNav &&
        <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#08070B] pt-8">
          <div className="px-8 mb-10 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-700">Hearth & Horizon</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <NavLinks isDesktop />
          </div>
        </aside>
      }

      <main className="flex-1 h-full relative overflow-y-auto custom-scrollbar flex flex-col">
        <div className="flex-1 w-full relative">
          <Routes>
            <Route path="/hearth" element={<YourHearth vault={vault} onSync={handleSync} onResumeSync={handleResumeSync} isAdmin={isAdmin} />} />
            <Route path="/library" element={<Library vault={vault} onRefresh={handleSync} onSync={handleSync} isAdmin={isAdmin} />} />
            <Route path="/horizon" element={<Canopy vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
            <Route path="/embers" element={<EmbersChat vault={vault} isAdmin={isAdmin} />} />
            {/* /culture archived — identity tools now in /library High Forge */}
            <Route path="/grove" element={<GroveTiers vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
            <Route path="/contact" element={<Contact vault={vault} onRefresh={handleSync} isAdmin={isAdmin} isSeedlingPlus={isSeedlingPlus} />} />
            <Route path="/admin" element={<AdminDashboard vault={vault} onSync={handleSync} isAdmin={isAdmin} />} />
            <Route path="/" element={<Navigate to="/grove" replace />} />
            <Route path="*" element={<Navigate to="/grove" replace />} />
          </Routes>
        </div>
        {/* Adds padding at bottom so main content doesn't get hidden behind the floating nav */}
        {showNav && <div className="h-24 md:hidden flex-shrink-0" />}
      </main>

      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="bg-[#0A080D]/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-center h-16 px-1">
              <NavLinks />
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}