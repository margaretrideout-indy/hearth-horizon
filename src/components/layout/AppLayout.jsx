import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Flame, Compass, MessageSquare, Library, Rocket, Lock 
} from 'lucide-react';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isGrove = location.pathname === '/' || location.pathname === '/grove';
  const isEmbers = location.pathname === '/embers';

  const journeyItems = [
    { name: "Hearth", path: "/hearth", icon: <Flame size={14} />, tier: "Seedling" },
    { name: "Alignment", path: "/alignment", icon: <Compass size={14} />, tier: "Seedling" },
    { name: "Launch", path: "/launch", icon: <Rocket size={14} />, tier: "Seedling" },
  ];

  const communityItems = [
    { name: "Embers", path: "/embers", icon: <MessageSquare size={14} />, tier: "Seedling" },
    { name: "Library", path: "/library", icon: <Library size={14} />, tier: "Seedling" },
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
        className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all duration-500 group whitespace-nowrap border ${
          locked ? 'opacity-20 cursor-not-allowed border-transparent' : 'opacity-100 hover:bg-white/5 border-transparent'
        } ${isActive ? 'bg-teal-500/10 border-teal-500/20 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.1)]' : 'text-zinc-400'}`}
      >
        <span className={`${isActive ? 'text-teal-400' : 'text-zinc-500 group-hover:text-teal-400'}`}>
          {item.icon}
        </span>
        <span className="hidden sm:inline text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em]">
          {item.name}
        </span>
        {locked && <Lock size={10} className="text-zinc-700 ml-1" />}
      </button>
    );
  };

  return (
    <div className="h-[100dvh] bg-[#0A080D] text-white selection:bg-teal-500/30 font-sans flex flex-col overflow-hidden">
      
      {!isGrove && (
        <nav className="fixed top-3 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
          <div className="flex items-center gap-1 md:gap-2 p-1.5 bg-[#141118]/80 backdrop-blur-2xl border border-white/5 rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-full overflow-x-auto no-scrollbar">
            
            <div className="flex items-center gap-1">
              <div className="hidden lg:block pr-4 mr-2 border-r border-white/5 pl-4">
                <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">The Path</p>
              </div>
              {journeyItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>

            <div className="w-1 h-1 rounded-full bg-teal-500/20 shrink-0 mx-2" />

            <div className="flex items-center gap-1">
              <div className="hidden lg:block pr-4 mr-2 border-r border-white/5">
                <p className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.3em]">The Commons</p>
              </div>
              {communityItems.map(item => <NavItem key={item.path} item={item} />)}
            </div>
          </div>
        </nav>
      )}

      {/* The Main Fix:
          On Embers page, we use h-full to fill the remaining space exactly.
          Removed the excessive top padding for Embers on tablet to keep the input in view.
      */}
      <main className={`flex-1 w-full transition-all duration-700 overflow-hidden flex flex-col ${
        !isGrove ? (isEmbers ? "pt-16 md:pt-24 lg:pt-32" : "pt-20 md:pt-36") : ""
      }`}>
        <div className={`w-full mx-auto flex-1 flex flex-col min-h-0 ${
          isEmbers 
            ? "max-w-full h-full px-0 pb-0" 
            : "max-w-7xl px-4 md:px-8 overflow-y-auto pb-10"
        }`}>
          {children}
        </div>
      </main>

    </div>
  );
};

export default AppLayout;