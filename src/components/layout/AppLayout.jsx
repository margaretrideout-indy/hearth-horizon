import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Compass, Activity, Repeat, Zap, Binoculars, MessageSquare, Library, Layers, Lock 
} from 'lucide-react';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  
  // 1. Logic to hide the nav on the Grove/Landing page
  const isGrove = location.pathname === '/' || location.pathname === '/grove';

  // 2. The Path Data (The 5)
  const pathItems = [
    { name: "The Grove", icon: <Compass size={14} />, tier: "Seedling" },
    { name: "Your Hearth", icon: <Activity size={14} />, tier: "Seedling" },
    { name: "The Bridge", icon: <Repeat size={14} />, tier: "Hearthkeeper" },
    { name: "Ecosystem Alignment", icon: <Zap size={14} />, tier: "Steward" },
    { name: "Horizon Scan", icon: <Binoculars size={14} />, tier: "Steward" },
  ];

  // 3. The Collective Data (The 3)
  const collectiveItems = [
    { name: "Embers Chat", icon: <MessageSquare size={14} />, tier: "Seedling" },
    { name: "The Library", icon: <Library size={14} />, tier: "Seedling" },
    { name: "The Canopy", icon: <Layers size={14} />, tier: "Seedling" },
  ];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  return (
    <div className="min-h-screen bg-[#0F0A15]">
      
      {/* THE TOP NAV - Only shows if NOT on The Grove */}
      {!isGrove && (
        <nav className="flex items-center justify-center py-4 bg-[#0F0A15]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6">
          
          {/* THE PATH GROUP */}
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase mr-1">The Path</span>
            {pathItems.map(item => {
              const locked = isLocked(item.tier);
              return (
                <div key={item.name} className={`flex items-center gap-2 group cursor-pointer ${locked ? 'opacity-25' : 'opacity-100'}`}>
                  <span className="text-slate-500 group-hover:text-[#39D7B8]">{item.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">
                    {item.name}
                  </span>
                  {locked && <Lock size={10} className="text-slate-700" />}
                </div>
              );
            })}
          </div>

          {/* THE DIVIDER */}
          <div className="h-4 w-[1px] bg-white/10 mx-10" />

          {/* THE COLLECTIVE GROUP */}
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase mr-1">The Collective</span>
            {collectiveItems.map(item => {
              const locked = isLocked(item.tier);
              return (
                <div key={item.name} className={`flex items-center gap-2 group cursor-pointer ${locked ? 'opacity-25' : 'opacity-100'}`}>
                  <span className="text-slate-500 group-hover:text-[#39D7B8]">{item.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">
                    {item.name}
                  </span>
                  {locked && <Lock size={10} className="text-slate-700" />}
                </div>
              );
            })}
          </div>
        </nav>
      )}

      {/* PAGE CONTENT */}
      <main className="w-full">
        {children}
      </main>

    </div>
  );
};

export default AppLayout;