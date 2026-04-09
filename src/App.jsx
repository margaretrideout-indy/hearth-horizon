import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { 
  Compass, Activity, Repeat, Zap, Binoculars, MessageSquare, Library, Layers, Lock 
} from 'lucide-react';

import GroveTiers from './pages/GroveTiers';
import YourHearth from './pages/YourHearth'; 
import Gateway from './pages/Gateway'; 
import GapAnalyzer from './pages/GapAnalyzer';
import HorizonAudit from './pages/HorizonAudit';
import EmbersChat from './pages/EmbersChat';
import LibraryPage from './pages/Library';
import CanopyIndex from './pages/Canopy';

const AppLayout = ({ children, currentTier = "Seedling" }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/grove';

  const pathItems = [
    { name: "THE GROVE", icon: <Compass size={14} />, path: "/grove", tier: "Seedling" },
    { name: "YOUR HEARTH", icon: <Activity size={14} />, path: "/hearth", tier: "Seedling" },
    { name: "THE BRIDGE", icon: <Repeat size={14} />, path: "/bridge", tier: "Hearthkeeper" },
    { name: "ECOSYSTEM ALIGNMENT", icon: <Zap size={14} />, path: "/alignment", tier: "Steward" },
    { name: "HORIZON SCAN", icon: <Binoculars size={14} />, path: "/horizon", tier: "Steward" },
  ];

  const collectiveItems = [
    { name: "EMBERS CHAT", icon: <MessageSquare size={14} />, path: "/embers", tier: "Seedling" },
    { name: "THE LIBRARY", icon: <Library size={14} />, path: "/library", tier: "Seedling" },
    { name: "THE CANOPY", icon: <Layers size={14} />, path: "/canopy", tier: "Seedling" },
  ];

  const isLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[currentTier];
  };

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white">
      {!isLandingPage && (
        <nav className="flex items-center justify-center py-4 bg-[#0F0A15]/95 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6">
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase">The Path</span>
            {pathItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex items-center gap-2 group cursor-pointer no-underline ${isLocked(item.tier) ? 'opacity-25' : 'opacity-100'}`}
              >
                <span className="text-slate-500 group-hover:text-[#39D7B8] transition-colors">{item.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                {isLocked(item.tier) && <Lock size={10} className="text-slate-700" />}
              </Link>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-10" />
          <div className="flex items-center gap-6">
            <span className="text-[8px] font-black tracking-[0.3em] text-slate-600 uppercase">The Collective</span>
            {collectiveItems.map(item => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex items-center gap-2 group cursor-pointer no-underline ${isLocked(item.tier) ? 'opacity-25' : 'opacity-100'}`}
              >
                <span className="text-slate-500 group-hover:text-[#39D7B8] transition-colors">{item.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{item.name}</span>
                {isLocked(item.tier) && <Lock size={10} className="text-slate-700" />}
              </Link>
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
          <Route path="/hearth" element={<YourHearth />} />
          <Route path="/bridge" element={<Gateway />} />
          <Route path="/alignment" element={<GapAnalyzer />} />
          <Route path="/horizon" element={<HorizonAudit />} />
          <Route path="/embers" element={<EmbersChat />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/canopy" element={<CanopyIndex />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;