import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Flame, Compass, MessageSquare, Library, Layers, Lock, Sparkles, MoveRight
} from 'lucide-react';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';

  // Group 1: Your Journey
  const journeyItems = [
    { name: "Your Hearth", path: "/hearth", icon: <Flame size={16} />, tier: "Seedling" },
    { name: "Ecosystem Alignment", path: "/alignment", icon: <Compass size={16} />, tier: "Seedling" },
  ];

  // Group 2: Community
  const communityItems = [
    { name: "Embers Chat", path: "/embers", icon: <MessageSquare size={16} />, tier: "Seedling" },
    { name: "The Canopy", path: "/canopy", icon: <Layers size={16} />, tier: "Seedling" },
    { name: "The Library", path: "/library", icon: <Library size={16} />, tier: "Seedling" },
  ];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  const NavItem = ({ item }) => {
    const locked = isLocked(item.tier);
    const isActive = location.pathname === item.path;

    return (
      <button
        onClick={() => !locked && navigate(item.path)}
        disabled={locked}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-500 group whitespace-nowrap ${
          locked ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/5'
        } ${isActive ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400' : 'text-slate-400'}`}
      >
        <span className={`${isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-teal-500'}`}>
          {item.icon}
        </span>
        <span className="hidden sm:inline text-[9px] font-black uppercase tracking-[0.2em]">
          {item.name}
        </span>
        {locked && <Lock size={10} className="text-slate-700 ml-1" />}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white selection:bg-teal-500/30 font-sans">
      
      {!isGrove && (
        <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
          <div className="flex items-center gap-2 md:gap-4 p-1.5 md:p-2 bg-[#1C1622]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full shadow-2xl max-w-full overflow-x-auto no-scrollbar">
            
            {/* JOURNEY GROUP */}
            <div className="flex items-center gap-1 pl-1 md:pl-2">
              <div className="hidden lg:block pr-3 mr-2 border-r border-white/5">
                <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">Your Journey</p>
              </div>
              {journeyItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>

            {/* MYCELIUM NODE */}
            <div className="w-1 h-1 rounded-full bg-teal-500/30 shrink-0 mx-1 animate-pulse" />

            {/* COMMUNITY GROUP */}
            <div className="flex items-center gap-1 pr-1 md:pr-2">
              <div className="hidden lg:block pr-3 mr-2 border-r border-white/5">
                <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">Community</p>
              </div>
              {communityItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>
          </div>
        </nav>
      )}

      {/* PAGE CONTENT */}
      <main className={`w-full ${!isGrove ? "pt-24 md:pt-32" : ""}`}>
        {children}
      </main>

    </div>
  );
};

export default AppLayout;