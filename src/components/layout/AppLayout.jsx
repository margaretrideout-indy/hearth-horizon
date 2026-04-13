import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Flame, Compass, MessageSquare, Library, Rocket, Lock 
} from 'lucide-react';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';

  const journeyItems = [
    { name: "Hearth", path: "/hearth", icon: <Flame size={16} />, tier: "Seedling" },
    { name: "Alignment", path: "/alignment", icon: <Compass size={16} />, tier: "Seedling" },
  ];

  const communityItems = [
    { name: "Embers", path: "/embers", icon: <MessageSquare size={16} />, tier: "Seedling" },
    { name: "Launch", path: "/launch", icon: <Rocket size={16} />, tier: "Seedling" },
    { name: "Library", path: "/library", icon: <Library size={16} />, tier: "Seedling" },
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
        className={`flex items-center gap-2 px-2.5 py-2 md:px-4 md:py-2 rounded-xl transition-all duration-500 group whitespace-nowrap border ${
          locked ? 'opacity-20 cursor-not-allowed border-transparent' : 'opacity-100 hover:bg-white/5 border-transparent'
        } ${isActive ? 'bg-teal-500/10 border-teal-500/20 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]' : 'text-slate-400'}`}
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
    <div className="min-h-screen bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans">
      
      {!isGrove && (
        <nav className="fixed top-2 md:top-6 left-0 right-0 z-50 flex justify-center px-2 md:px-4">
          <div className="flex items-center gap-1 md:gap-3 p-1.5 bg-[#1C1622]/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full shadow-2xl max-w-[95vw] overflow-x-auto no-scrollbar">
            
            <div className="flex items-center gap-1">
              <div className="hidden lg:block pr-3 mr-2 border-r border-white/5 pl-2">
                <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">Your Journey</p>
              </div>
              {journeyItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>

            <div className="w-1 h-1 rounded-full bg-teal-500/30 shrink-0 mx-1 animate-pulse" />

            <div className="flex items-center gap-1">
              <div className="hidden lg:block pr-3 mr-2 border-r border-white/5">
                <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">Community</p>
              </div>
              {communityItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>
          </div>
        </nav>
      )}

      <main className={`w-full px-4 md:px-0 ${!isGrove ? "pt-28 md:pt-36" : ""}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;