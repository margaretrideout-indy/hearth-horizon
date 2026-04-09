import React from 'react';
import { 
  Compass, Library, Activity, Repeat, Zap, Binoculars, MessageSquare, Layers, Lock 
} from 'lucide-react';

const Sidebar = ({ currentTier = "Seedling", activePage = "The Grove" }) => {
  
  const movements = [
    {
      label: "The Path",
      items: [
        { name: "The Grove", icon: <Compass size={16} />, minTier: "Seedling" },
        { name: "Your Hearth", icon: <Activity size={16} />, minTier: "Seedling" },
        { name: "The Bridge", icon: <Repeat size={16} />, minTier: "Hearthkeeper" },
        { name: "Ecosystem Alignment", icon: <Zap size={16} />, minTier: "Steward" },
        { name: "Horizon Scan", icon: <Binoculars size={16} />, minTier: "Steward" },
      ]
    },
    {
      label: "The Collective",
      items: [
        { name: "Embers Chat", icon: <MessageSquare size={16} />, minTier: "Seedling" },
        { name: "The Library", icon: <Library size={16} />, minTier: "Seedling" },
        { name: "The Canopy", icon: <Layers size={16} />, minTier: "Seedling" },
      ]
    }
  ];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  return (
    <div className="w-64 h-screen bg-[#0F0A15] border-r border-white/5 flex flex-col p-6 font-sans sticky top-0">
      {/* BRANDING */}
      <div className="mb-12 px-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#39D7B8] rounded-lg flex items-center justify-center">
          <Compass className="text-[#0F0A15]" size={20} />
        </div>
        <h2 className="text-white font-serif italic text-lg tracking-tight leading-tight">Hearth & Horizon</h2>
      </div>

      {/* NAVIGATION MOVEMENTS */}
      <nav className="flex-1 space-y-10 overflow-y-auto pr-2">
        {movements.map((movement) => (
          <div key={movement.label}>
            <h3 className="px-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4">
              {movement.label}
            </h3>
            <div className="space-y-1">
              {movement.items.map((item) => {
                const locked = isLocked(item.minTier);
                const isActive = activePage === item.name;

                return (
                  <div 
                    key={item.name} 
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group cursor-pointer ${
                      isActive ? 'bg-[#39D7B8]/10 text-[#39D7B8] border border-[#39D7B8]/20' : 'text-slate-500 hover:text-slate-300'
                    } ${locked ? 'opacity-30' : 'opacity-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#39D7B8]' : 'text-slate-600'}>{item.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                    </div>
                    {locked && <Lock size={12} className="text-slate-700" />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* USER FOOTER */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[10px] font-bold text-teal-400 uppercase">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white font-bold uppercase tracking-wider">Margaret</span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-500/60">{currentTier}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;