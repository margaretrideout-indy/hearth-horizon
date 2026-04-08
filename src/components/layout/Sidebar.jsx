import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Library, Anchor, Shuffle, Layers, 
  MessageSquare, Trees, Settings, LogOut, Menu, X 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'THE LIBRARY', path: '/library', icon: Library },
    { name: 'THE ROOTWORK', path: '/audit', icon: Anchor },
    { name: 'LINGUISTIC BRIDGE', path: '/translator', icon: Shuffle },
    { name: 'THE GROVE', path: '/grove', icon: Trees },
    { name: 'ECOSYSTEM ALIGNMENT', path: '/cultural-fit', icon: Layers },
    { name: 'THE EMBERS', path: '/embers', icon: MessageSquare },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-[70] p-3 bg-[#2DD4BF] text-[#1A1423] rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className={`
        fixed left-0 top-0 h-screen w-64 bg-[#1A1423] border-r border-white/5 flex flex-col p-6 z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
      `}>
        
        <div className="mb-10 px-4">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#2DD4BF" strokeWidth="1.5" className="filter drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>

        <nav className="flex-1 space-y-2 text-left overflow-y-auto">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 px-4 mb-4">NAVIGATION</h3>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-white/5 text-[#2DD4BF]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-[#2DD4BF]' : 'text-gray-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 text-left">
            <Settings className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-500/60 text-left">
            <LogOut className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">Log Out</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />
      )}
    </>
  );
};

export default Sidebar;