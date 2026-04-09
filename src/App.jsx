import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, TreePine, ArrowRightLeft, Library, MessageSquare, Layout, Activity, Compass, Download, ShieldAlert, Lock } from 'lucide-react';
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
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient();

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false 
  });

  const userTier = user?.subscription_tier || 'Seedling';
  const isAdmin = user?.email === 'your-actual-email@gmail.com'; // UPDATE THIS EMAIL

  const navLinks = [
    { name: 'The Grove', path: '/', icon: <TreePine className="w-4 h-4" />, public: true },
    { name: 'Library', path: '/library', icon: <Library className="w-4 h-4" />, public: true },
    { name: 'Your Hearth', path: '/hearth', icon: <Activity className="w-4 h-4" />, public: true },
    { name: 'The Bridge', path: '/bridge', icon: <ArrowRightLeft className="w-4 h-4" />, minTier: 'Hearthkeeper' },
    { name: 'Alignment', path: '/alignment', icon: <Compass className="w-4 h-4" />, minTier: 'Steward' },
    { name: 'Embers Chat', path: '/chat', icon: <MessageSquare className="w-4 h-4" />, public: true },
    { name: 'The Canopy', path: '/canopy', icon: <Layout className="w-4 h-4" />, public: true },
    { name: 'Admin', path: '/admin', icon: <ShieldAlert className="w-4 h-4" />, adminOnly: true },
  ];

  const checkAccess = (link) => {
    if (isAdmin || link.public) return true;
    if (link.adminOnly && !isAdmin) return false;
    
    const tiers = ['Seedling', 'Hearthkeeper', 'Steward', 'Sponsor'];
    return tiers.indexOf(userTier) >= tiers.indexOf(link.minTier);
  };

  const handleNavClick = (e, link) => {
    if (!checkAccess(link)) {
      e.preventDefault();
      alert(`The ${link.name} is reserved for ${link.minTier}s. Please upgrade in The Grove!`);
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1423]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.3)]">
            <TreePine className="text-[#1A1423] w-5 h-5" />
          </div>
          <span className="font-bold tracking-tighter text-slate-100 uppercase text-sm">Hearth & Horizon</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const hasAccess = checkAccess(link);
            if (link.adminOnly && !isAdmin) return null;

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  location.pathname === link.path ? 'text-teal-400 bg-white/5' : 'text-slate-400 hover:text-teal-400'
                } ${!hasAccess ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {link.icon}
                {link.name}
                {!hasAccess && <Lock className="w-3 h-3 ml-1 text-slate-500" />}
              </Link>
            );
          })}
        </div>

        <button className="md:hidden text-slate-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#251D2F] border-b border-white/5 p-6 flex flex-col gap-4">
          {navLinks.map((link) => {
             const hasAccess = checkAccess(link);
             if (link.adminOnly && !isAdmin) return null;
             return (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={(e) => { handleNavClick(e, link); setIsOpen(false); }} 
                className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-widest px-4 py-3 rounded-xl hover:bg-white/5"
              >
                <div className="flex items-center gap-3">{link.icon} {link.name}</div>
                {!hasAccess && <Lock className="w-4 h-4 text-slate-500" />}
              </Link>
             );
          })}
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
                <Route path="/admin" element={<AdminDashboard />} /> 
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;