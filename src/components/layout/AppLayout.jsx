import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { 
  Flame, Compass, MessageSquare, Library, Binoculars, Lock, LogIn, Globe, ArrowLeft, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';
  const isHearth = location.pathname === '/hearth';
  const isEmbers = location.pathname === '/embers';

  // Navigation items logic
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

  // 2. Mock Pull-to-Refresh Logic for PWA feel
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans flex flex-col overflow-hidden relative">
      
      {/* 1. TOP BRANDING BAR (With Smart Back Button) */}
      {!isGrove && (
        <header className="pt-[env(safe-area-inset-top)] px-6 flex items-center justify-between h-20 z-40">
          <div className="flex items-center gap-4">
            {/* Show back button if not on primary Hearth screen */}
            {!isHearth && (
              <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                className="p-2 -ml-2 rounded-full bg-white/5 text-zinc-400 hover:text-teal-400 transition-colors"
              >
                <ArrowLeft size={18} />
              </motion.button>
            )}
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                {location.pathname.replace('/', '') || 'Hearth & Horizon'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Pull to refresh visual trigger */}
            <button 
              onClick={handleRefresh}
              className={`p-2 rounded-full bg-white/5 text-zinc-500 transition-all ${isRefreshing ? 'animate-spin text-teal-400' : ''}`}
            >
              <RefreshCw size={14} />
            </button>
            
            <button 
              onClick={() => base44.auth.redirectToLogin(location.pathname)}
              className="p-2 rounded-full bg-white/5 text-zinc-500 hover:text-teal-400"
            >
              <LogIn size={16} />
            </button>
          </div>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA (Responsive & Overscroll aware) */}
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
            {/* Pull to Refresh Indicator Overlay */}
            {isRefreshing && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-teal-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                  Refreshing Grove...
                </div>
              </div>
            )}
            
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. NATIVE BOTTOM NAVIGATION */}
      {!isGrove && (
        <nav className="native-ui fixed bottom-0 left-0 right-0 bg-[#141118]/80 backdrop-blur-2xl border-t border-white/5 z-50 px-2">
          <div className="max-w-md mx-auto flex justify-around items-center h-16 mb-[env(safe-area-inset-bottom)]">
            
            {/* Grove/Home Link */}
            <button 
              onClick={() => navigate('/grove')} 
              className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === '/grove' ? 'text-teal-400' : 'text-zinc-500'}`}
            >
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
                    <motion.div 
                      layoutId="activeGlow" 
                      className="absolute -inset-2 bg-teal-500/10 blur-md rounded-full -z-10" 
                    />
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