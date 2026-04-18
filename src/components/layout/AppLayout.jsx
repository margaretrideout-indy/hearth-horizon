import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { 
  Flame, Compass, MessageSquare, Library, Binoculars, Lock, LogIn, Globe 
} from 'lucide-react';
import { motion } from 'framer-motion';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';
  const isEmbers = location.pathname === '/embers';

  const journeyItems = [
    { name: "Hearth", path: "/hearth", icon: <Flame size={18} />, tier: "Seedling" },
    { name: "Alignment", path: "/alignment", icon: <Compass size={18} />, tier: "Seedling" },
    { name: "Horizon", path: "/horizon", icon: <Binoculars size={18} />, tier: "Seedling" },
  ];

  const communityItems = [
    { name: "Library", path: "/library", icon: <Library size={18} />, tier: "Seedling" },
    { name: "Embers", path: "/embers", icon: <MessageSquare size={18} />, tier: "Seedling" },
  ];

  const allNavItems = [...journeyItems, ...communityItems];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans flex flex-col overflow-hidden relative">
      
      {/* 1. TOP BRANDING BAR (Minimalist & respects the Notch) */}
      {!isGrove && (
        <header className="pt-[env(safe-area-inset-top)] px-6 flex justify-between items-center h-20 z-40">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Hearth & Horizon</span>
           </div>
           <button 
             onClick={() => base44.auth.redirectToLogin(location.pathname)}
             className="p-2 rounded-full bg-white/5 text-zinc-500 hover:text-teal-400"
           >
             <LogIn size={16} />
           </button>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 w-full overflow-hidden flex flex-col ${isEmbers ? '' : 'pb-24'}`}>
        <div className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${
          isEmbers 
            ? "max-w-full h-full" 
            : "max-w-7xl px-4 md:px-8 overflow-y-auto embers-scroll"
        }`}>
          {children}
        </div>
      </main>

      {/* 3. NATIVE BOTTOM NAVIGATION (The Scan Fix) */}
      {!isGrove && (
        <nav className="native-ui fixed bottom-0 left-0 right-0 bg-[#141118]/80 backdrop-blur-2xl border-t border-white/5 z-50 px-2">
          <div className="max-w-md mx-auto flex justify-around items-center h-16 mb-[env(safe-area-inset-bottom)]">
            
            {/* Grove/Home Link */}
            <button onClick={() => navigate('/grove')} className="flex flex-col items-center gap-1 text-zinc-500">
              <Globe size={18} />
              <span className="text-[7px] font-black uppercase tracking-tighter">Grove</span>
            </button>

            <div className="w-[1px] h-6 bg-white/5 mx-1" />

            {/* Dynamic Items */}
            {allNavItems.map((item) => {
              const locked = isLocked(item.tier);
              const isActive = location.pathname === item.path || (item.name === "Horizon" && location.pathname === "/launch");

              return (
                <button
                  key={item.path}
                  onClick={() => !locked && navigate(item.path)}
                  disabled={locked}
                  className={`flex flex-col items-center justify-center gap-1 relative transition-all duration-300 ${
                    locked ? 'opacity-20' : isActive ? 'text-teal-400' : 'text-zinc-500'
                  }`}
                >
                  <motion.div whileTap={!locked ? { scale: 0.8 } : {}}>
                    {item.icon}
                  </motion.div>
                  <span className="text-[7px] font-black uppercase tracking-tighter">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div layoutId="activeGlow" className="absolute -inset-2 bg-teal-500/10 blur-md rounded-full -z-10" />
                  )}
                  {locked && <Lock size={8} className="absolute -top-1 -right-1 text-zinc-700" />}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default AppLayout;