import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Library, 
  Anchor,
  Shuffle, 
  Layers, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navSections = [
    {
      title: "NAVIGATION",
      items: [
        { name: 'THE HEARTH', path: '/hearth', icon: Home },
        { name: 'THE LIBRARY', path: '/library', icon: Library },
      ]
    },
    {
      title: "TRANSITION",
      items: [
        { name: 'THE ROOTWORK', path: '/audit', icon: Anchor },
        { name: 'LINGUISTIC BRIDGE', path: '/translator', icon: Shuffle },
        { name: 'ECOSYSTEM ALIGNMENT', path: '/cultural-fit', icon: Layers },
      ]
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1A1423] border-r border-white/5 flex flex-col p-6 z-50">
      
      {/* THE GLOWING ARCH LOGO */}
      <div className="mb-10 px-4">
        <svg 
          width="42" 
          height="42" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#2DD4BF" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="filter drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>

      <nav className="flex-1 space-y-8 text-left">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 px-4 mb-4">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                      isActive ? 'text-[#2DD4BF]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${isActive ? 'text-[#2DD4BF]' : 'text-gray-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-1">
        <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-all text-left">
          <Settings className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">Settings</span>
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 text-red-500/60 hover:text-red-500 transition-all text-left">
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;