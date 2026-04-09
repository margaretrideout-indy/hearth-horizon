import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { 
  Compass, Activity, Repeat, Zap, Binoculars, MessageSquare, Library, Layers, Lock 
} from 'lucide-react';

import GroveTiers from './pages/GroveTiers';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const isGrove = location.pathname === '/' || location.pathname === '/grove';

  const pathItems = [
    { name: "THE GROVE", icon: <Compass size={14} />, tier: "Seedling" },
    { name: "YOUR HEARTH", icon: <Activity size={14} />, tier: "Seedling" },
    { name: "THE BRIDGE", icon: <Repeat size={14} />, tier: "Hearthkeeper" },
    { name: "ECOSYSTEM ALIGNMENT", icon: <Zap size={14} />, tier: "Steward" },
    { name: "HORIZON SCAN", icon: <Binoculars size={14} />, tier: "Steward" },
  ];

  const collectiveItems = [
    { name: "EMBERS CHAT", icon: <MessageSquare size={14} />, tier: "Seedling" },
    { name: "THE LIBRARY", icon: <Library size={14} />, tier: "Seedling" },
    { name: "THE CANOPY", icon: <Layers size={14} />, tier: "Seedling" },
  ];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  return (
    <div className="min-h-screen bg-[#0F0A15]">
      {!isGrove && (
        <nav className="flex items-center justify-center py-4 bg-[#0F0A15]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6">
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase">The Path</span>
            {pathItems.map(item => (
              <div key={item.name} className={`flex items-center gap-2 group cursor-pointer ${isLocked(item.tier) ? 'opacity-25' : 'opacity-100'}`}>
                <span className="text-slate-500 group-hover:text-[#39D7B8]">{item.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{item.name}</span>
                {isLocked(item.tier) && <Lock size={10} className="text-slate-700" />}
              </div>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-10" />
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase">The Collective</span>
            {collectiveItems.map(item => (
              <div key={item.name} className={`flex items-center gap-2 group cursor-pointer ${isLocked(item.tier) ? 'opacity-25' : 'opacity-100'}`}>
                <span className="text-slate-500 group-hover:text-[#39D7B8]">{item.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{item.name}</span>
                {isLocked(item.tier) && <Lock size={10} className="text-slate-700" />}
              </div>
            ))}
          </div>
        </nav>
      )}
      <main className="w-full">{children}</main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<GroveTiers />} />
          <Route path="/grove" element={<GroveTiers />} />
          {/* Add other routes here */}
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;