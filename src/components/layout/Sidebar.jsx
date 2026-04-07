import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Anchor, 
  ArrowRightLeft, 
  Wind, 
  GitBranch, 
  LayoutDashboard 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'rootwork', 
      label: 'The Rootwork', 
      icon: Anchor, 
      path: '/rootwork',
      category: 'TRANSITION' 
    },
    { 
      id: 'bridge', 
      label: 'Linguistic Bridge', 
      icon: ArrowRightLeft, 
      path: '/translator',
      category: 'TRANSITION' 
    },
    { 
      id: 'alignment', 
      label: 'Ecosystem Alignment', 
      icon: GitBranch, 
      path: '/alignment',
      category: 'TRANSITION' 
    },
    { 
      id: 'canopy', 
      label: 'The Canopy', 
      icon: Wind, 
      path: '/canopy',
      category: 'TRANSITION' 
    }
  ];

  return (
    <div className="w-72 min-h-screen bg-[#1A1423] border-r border-white/5 p-8 flex flex-col fixed left-0 top-0 z-50">
      
      {/* BRANDING */}
      <div className="mb-12 flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]">
          <LayoutDashboard className="w-5 h-5 text-teal-400" />
        </div>
        <div>
          <h2 className="text-white font-serif font-bold tracking-tight text-lg leading-none">Hearth</h2>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Horizon</span>
        </div>
      </div>

      {/* NAVIGATION CATEGORY */}
      <div className="space-y-1">
        <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-6 ml-2">Transition</h3>
        
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative ${
                isActive 
                ? 'bg-teal-500/5 border border-teal-500/10' 
                : 'hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${
                isActive ? 'text-teal-400' : 'text-gray-600 group-hover:text-gray-400'
              }`} />
              
              <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-300'
              }`}>
                {item.label}
              </span>

              {isActive && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* FOOTER / IDENTITY ANCHOR */}
      <div className="mt-auto pt-10 border-t border-white/5">
        <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">System Status</span>
          </div>
          <p className="text-[10px] text-gray-400 font-light leading-relaxed italic">
            "Your 13-year legacy is the foundation of your next syntax."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;