import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Library, 
  Shuffle, 
  Anchor, 
  Layers, 
  Compass, 
  Zap,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navSections = [
    {
      title: "Navigation",
      items: [
        { name: 'THE HEARTH', path: '/hearth', icon: Home },
        { name: 'THE LIBRARY', path: '/library', icon: Library },
      ]
    },
    {
      title: "Transition",
      items: [
        { name: 'LINGUISTIC BRIDGE', path: '/bridge', icon: Shuffle },
        { 
          name: 'THE ROOTWORK', 
          path: '/audit', // UPDATED DESTINATION
          icon: Anchor 
        },
        { name: 'MYCELIUM MAP', path: '/mycelium', icon: Layers },
      ]
    },
    {
      title: "Intelligence",
      items: [
        { name: 'HORIZON SCAN', path: '/scan', icon: Compass },
        { name: 'LABORATORY', path: '/lab', icon: Zap },
      ]
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-[#140F1A] border-r border-white/5 flex flex-col p-8 z-50">
      {/* Branding */}
      <div className="mb-12 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#2DD4BF]/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-[#1A1423]" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-white">Vesta</span>
        </div>
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Identity Ecosystem</p>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 space-y-10 text-left">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 px-4">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                      isActive 
                      ? 'bg-[#2DD4BF]/10 text-[#2DD4BF]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#2DD4BF]' : 'text-gray-500 group-hover:text-gray-300'
                    }`} />
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                      isActive ? 'translate-x-1' : ''
                    }`}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:text-white transition-all">
          <Settings className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Settings</span>
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400/60 hover:text-red-400 transition-all">
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;