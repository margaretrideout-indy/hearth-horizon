import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, ArrowRightLeft, Library, MessageSquare, Layout, Activity, Compass, Download } from 'lucide-react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/AuthContext';
import PaymentSuccess from './pages/PaymentSuccess';
import GroveTiers from './pages/GroveTiers';
import LinguisticBridge from './pages/SkillTranslator';
import LibraryView from './pages/Library';
import EmbersChat from './pages/EmbersChat';
import CanopyView from './pages/Canopy';
import YourHearth from './pages/YourHearth';
import EcosystemAlignment from './pages/CulturalFit';

const queryClient = new QueryClient();

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    }
  };

  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false 
  });

  const tier = user?.subscription_tier;

  const allLinks = [
    { name: 'The Grove', path: '/', icon: <TreePine className="w-4 h-4" />, public: true },
    { name: 'Library', path: '/library', icon: <Library className="w-4 h-4" />, public: true },
    { name: 'Your Hearth', path: '/hearth', icon: <Activity className="w-4 h-4" />, public: true },
    { name: 'The Bridge', path: '/bridge', icon: <ArrowRightLeft className="w-4 h-4" />, member: true },
    { name: 'Alignment', path: '/alignment', icon: <Compass className="w-4 h-4" />, steward: true },
    { name: 'Embers Chat', path: '/chat', icon: <MessageSquare className="w-4 h-4" />, public: true },
    { name: 'The Canopy', path: '/canopy', icon: <Layout className="w-4 h-4" />, public: true },
  ];

  const navLinks = allLinks.filter(link => {
    if (link.public) return true;
    if (!user) return false;
    if (link.steward) return tier === 'Steward' || tier === 'Sponsor';
    if (link.member) return tier === 'Hearthkeeper' || tier === 'Steward' || tier === 'Sponsor';
    return false;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1423]/90 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            <TreePine className="text-[#1A1423] w-5 h-5" />
          </div>
          <span className="font-bold tracking-tighter text-slate-100 uppercase text-sm">Hearth Horizon</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === link.path ? 'text-teal-400 bg-white/5' : 'text-slate-400 hover:text-teal-400'
              }`}
            >
              <div className="flex items-center gap-2">{link.icon}{link.name}</div>
            </Link>
          ))}
          {deferredPrompt && (
            <button onClick={handleInstall} className="ml-2 p-2 text-teal-400 hover:bg-teal-400/10 rounded-lg" title="Install App">
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
        <button className="md:hidden text-slate-100" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#251D2F] p-6 flex flex-col gap-4 border-b border-white/5">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-xs font-bold text-slate-300 uppercase px-4 py-3 rounded-xl hover:bg-white/5">
              {link.icon} {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#1A1423]">
            <Navigation />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<GroveTiers />} />
                <Route path="/hearth" element={<YourHearth />} />
                <Route path="/bridge" element={<LinguisticBridge />} />
                <Route path="/library" element={<LibraryView />} />
                <Route path="/chat" element={<EmbersChat />} />
                <Route path="/canopy" element={<CanopyView />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/alignment" element={<EcosystemAlignment />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;