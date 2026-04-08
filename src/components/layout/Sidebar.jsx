import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Library, Anchor, Shuffle, Layers, MessageSquare, Trees, Settings, LogOut, Menu, X } from 'lucide-react';

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

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed top-4 right-4 z-[70] p-3 bg-[#0D9488] text-white rounded-full shadow-lg">
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={`fixed left-0 top-0 h-screen w-64 bg-[#1E1926] border-r border-white/5 flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 px-4">
          <div className="w-10 h-10 bg-[#0D9488]/20 rounded-xl flex items-center justify-center border border-[#0D9488]/30">
            <Trees className="text-[#0D9488] w-6 h-6" />
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 px-4 mb-4">NAVIGATION</h3>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.path); setIsOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                    isActive ? 'bg-white/5 text-[#0D9488]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.02]'
                  }`}
                >
                  <item.icon size={18} className={isActive ? 'text-[#0D9488]' : 'text-gray-500 group-hover:text-gray-400'} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gray-300 transition-colors">
            <Settings size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Settings</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400/60 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="text-[11px] font-bold uppercase tracking-widest">Log Out</span>
          </button>
        </div>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />}
    </>
  );
};

export default Sidebar;