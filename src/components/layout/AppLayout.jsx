import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { 
  Flame, Compass, MessageSquare, Library, Binoculars, Lock, LogIn, Globe, ArrowLeft, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = ({ children, currentTier = "Seedling", onTabClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';
  const isHearth = location.pathname === '/hearth';
  const isEmbers = location.pathname === '/embers';

  const journeyItems = [
    { name: "Hearth", path: "/hearth", icon: <Flame size={20} />, tier: "Seedling" },
    { name: "Alignment", path: "/alignment", icon: <Compass size={20} />, tier: "Seedling" },
    { name: "Horizon", path: "/horizon", icon: <Binoculars size={20} />, tier: "Seedling" },
  ];

  const communityItems = [
    { name: "Library", path: "/library", icon: <Library size={20} />, tier: "Seedling" },
    { name: "Embers", path: "/embers", icon: <MessageSquare size={20} />, tier: "Seedling" },
  ];

  const allNavItems = [...journeyItems, ...communityItems];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    const userWeight = weights[currentTier] || 1;
    const requiredWeight = weights[itemTier] || 1;
    return requiredWeight > userWeight;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans flex flex-col overflow-hidden relative">
      
      {/* 1. TOP BRANDING BAR (Enlarged Hit Targets) */}
      {!isGrove && (
        <header className="pt-[env(safe-area-inset-top)] px-6 flex items-center justify-between h-20 z-40">
          <div className="flex items-center gap-4">
            {!isHearth && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-teal-400 transition-colors"
              >
                <ArrowLeft size={20} />
              </motion.button>
            )}
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
                {location.pathname.replace('/', '') || 'Hearth & Horizon'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 transition-all ${isRefreshing ? 'animate-spin text-teal-400' : ''}`}
            >
              <RefreshCw size={16} />
            </button>
            
            <button 
              onClick={() => base44.auth.redirectToLogin(location.pathname)}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-teal-400"
            >
              <LogIn size={20} />
            </button>
          </div>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={`flex-1 w-full overflow-hidden flex flex-col ${isEmbers ? '' : 'pb-24'}`}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${
              isEmbers 
                ? "max-w-full h-full" 
                : "max-w-7xl px-4 md:px-8 overflow-y-auto embers-scroll"
            }`}
          >
            {isRefreshing && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-teal-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  Refreshing Grove...
                </div>
              </div>
            )}
            
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. NATIVE BOTTOM NAVIGATION (Optimized Hit Targets) */}
      {!isGrove && (
        <nav className="native-ui fixed bottom-0 left-0 right-0 bg-[#0D0B14]/95 backdrop-blur-2xl border-t border-white/5 z-50 px-2">
          <div className="max-w-md mx-auto flex justify-around items-center h-16 mb-[env(safe-area-inset-bottom)]">
            
            {/* Grove Button */}
            <button 
              onClick={() => onTabClick('/grove')} 
              className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors ${location.pathname === '/grove' ? 'text-teal-400' : 'text-zinc-500'}`}
            >
              <Globe size={20} />
              <span className="text-[10px] font-black uppercase tracking-tighter">Grove</span>
            </button>

            <div className="w-[1px] h-6 bg-white/5" />

            {allNavItems.map((item) => {
              const locked = isLocked(item.tier);
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => !locked && onTabClick(item.path)}
                  disabled={locked}
                  className={`flex-1 h-full flex flex-col items-center justify-center gap-1 relative transition-all duration-300 ${
                    locked ? 'opacity-20' : isActive ? 'text-teal-400' : 'text-zinc-500'
                  }`}
                >
                  <motion.div whileTap={!locked ? { scale: 0.85 } : {}}>
                    {item.icon}
                  </motion.div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow" 
                      className="absolute inset-x-2 inset-y-1 bg-teal-500/5 blur-md rounded-xl -z-10" 
                    />
                  )}
                  {locked && <Lock size={10} className="absolute top-2 right-4 text-zinc-700" />}
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