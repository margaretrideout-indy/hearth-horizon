import React from 'react';
import { 
  Home, 
  Library, 
  Layers, 
  Wind, 
  GitBranch, 
  Anchor, 
  LogOut,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      group: "Overview",
      items: [
        { name: "The Hearth", path: "/", icon: <Home className="w-4 h-4" /> },
        { name: "The Library", path: "/library", icon: <Library className="w-4 h-4" /> },
      ]
    },
    {
      group: "Transition",
      items: [
        { name: "The Canopy", path: "/canopy", icon: <Wind className="w-4 h-4" /> },
        { name: "Linguistic Bridge", path: "/bridge", icon: <Layers className="w-4 h-4" /> },
        { name: "Ecosystem Alignment", path: "/alignment", icon: <GitBranch className="w-4 h-4" /> },
        { name: "The Rootwork", path: "/audit", icon: <Anchor className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className="w-64 h-screen bg-[#1A1423] border-r border-white/5 flex flex-col p-6 fixed left-0 top-0">
      {/* Brand / Identity */}
      <div className="mb-12 px-2">
        <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">
          Mycelium <span className="text-teal-400 not-italic">.</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-10">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-2">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                      isActive 
                        ? 'bg-teal-500/10 text-teal-400 font-bold' 
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={`${isActive ? 'text-teal-400' : 'text-gray-600 group-hover:text-gray-300'}`}>
                      {item.icon}
                    </span>
                    <span className="text-xs tracking-tight">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User / Settings Footer */}
      <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-3 text-gray-500 hover:text-white transition-colors">
          <User className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[9px]">Profile</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 text-red-400/60 hover:text-red-400 transition-colors">
          <LogOut className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest text-[9px]">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;