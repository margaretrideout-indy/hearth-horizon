import React from 'react';
import { 
  Home, Library, Layers, Wind, GitBranch, 
  Anchor, LogOut, User, Zap
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isTransitionPage = ['/canopy', '/translator', '/alignment', '/audit'].includes(location.pathname);

  const menuItems = [
    { 
      group: "Overview",
      items: [
        { name: "The Hearth", path: "/dashboard", icon: <Home className="w-4 h-4" /> },
        { name: "The Library", path: "/library", icon: <Library className="w-4 h-4" /> },
      ]
    },
    {
      group: "Transition",
      items: [
        { name: "The Canopy", path: "/canopy", icon: <Wind className="w-4 h-4" /> },
        { name: "Linguistic Bridge", path: "/translator", icon: <Layers className="w-4 h-4" /> },
        { name: "Ecosystem Alignment", path: "/alignment", icon: <GitBranch className="w-4 h-4" /> },
        { name: "The Rootwork", path: "/audit", icon: <Anchor className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-[#1A1423] border-r border-white/5 flex flex-col p-8 fixed left-0 top-0">
      
      <div className="mb-12 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500/20 rounded-xl flex items-center justify-center border border-teal-500/30">
            {isTransitionPage ? (
              <Zap className="w-4 h-4 text-teal-400 fill-teal-400" />
            ) : (
              <Home className="w-4 h-4 text-teal-400 fill-teal-400" />
            )}
          </div>
          <span className="text-lg font-black italic tracking-tighter text-white uppercase">
            {isTransitionPage ? "Horizon" : "Hearth"}
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-12">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em] px-2 italic">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-all group ${
                      isActive 
                        ? 'bg-teal-500/10 text-teal-400 font-bold border border-teal-500/20' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${isActive ? 'text-teal-400' : 'text-gray-600 group-hover:text-gray-300'}`}>
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-bold tracking-tight uppercase">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-4 px-3 py-3 text-gray-500 hover:text-white transition-colors group">
          <User className="w-4 h-4 text-gray-600 group-hover:text-teal-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Profile</span>
        </button>
        <button className="w-full flex items-center gap-4 px-3 py-3 text-red-400/40 hover:text-red-400 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;