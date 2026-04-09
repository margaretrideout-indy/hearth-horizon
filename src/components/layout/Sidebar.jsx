import React from 'react';
import { 
  Compass, 
  Flame, 
  Wind, 
  BookOpen, 
  Zap, 
  MessagesSquare, 
  Layers,
  Lock
} from 'lucide-react';

const Sidebar = ({ currentTier = "Seedling", activePage = "The Grove" }) => {
  
  const menuItems = [
    { name: "The Grove", icon: <Compass size={18} />, path: "/grove", minTier: "Seedling" },
    { name: "Your Hearth", icon: <Flame size={18} />, path: "/hearth", minTier: "Seedling" },
    { name: "The Bridge", icon: <Wind size={18} />, path: "/bridge", minTier: "Hearthkeeper" },
    { name: "The Library", icon: <BookOpen size={18} />, path: "/library", minTier: "Seedling" },
    { name: "Alignment", icon: <Zap size={18} />, path: "/alignment", minTier: "Steward" },
    { name: "Embers Chat", icon: <MessagesSquare size={18} />, path: "/embers", minTier: "Seedling" },
    { name: "The Canopy", icon: <Layers size={18} />, path: "/canopy", minTier: "Seedling" }
  ];

  const isLocked = (itemTier) => {
    const tierWeight = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return tierWeight[itemTier] > tierWeight[currentTier];
  };

  return (
    <div className="w-64 h-screen bg-[#0F0A15] border-r border-white/5 flex flex-col p-6 sticky top-0 font-sans">
      
      {/* BRANDING */}
      <div className="mb-12 px-2">
        <h2 className="text-white font-serif italic text-xl tracking-tight">Hearth & Horizon</h2>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60 mt-2">The Migration</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const locked = isLocked(item.minTier);
          const isActive = activePage === item.name;

          return (
            <div 
              key={item.name}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                isActive 
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                : 'text-slate-500 hover:bg-white/[0.02] hover:text-slate-300'
              } ${locked ? 'opacity-40 grayscale' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-teal-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  {item.icon}
                </span>
                <span className="text-xs font-medium tracking-wide">
                  {item.name}
                </span>
              </div>
              
              {locked && <Lock size={12} className="text-slate-700" />}
            </div>
          );
        })}
      </nav>

      {/* USER CONTEXT FOOTER */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-[10px] font-bold text-teal-400">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white font-bold">Margaret</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-teal-500/60">{currentTier} Tier</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;