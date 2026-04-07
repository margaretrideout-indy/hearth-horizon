import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Anchor, 
  ArrowRightLeft, 
  Wind, 
  GitBranch, 
  Home,
  Library,
  LayoutGrid
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const overviewItems = [
    { id: 'hearth', label: 'The Hearth', icon: Home, path: '/' },
    { id: 'library', label: 'The Library', icon: Library, path: '/library' }
  ];

  const transitionItems = [
    { id: 'rootwork', label: 'The Rootwork', icon: Anchor, path: '/rootwork' },
    { id: 'bridge', label: 'Linguistic Bridge', icon: ArrowRightLeft, path: '/translator' },
    { id: 'alignment', label: 'Ecosystem Alignment', icon: GitBranch, path: '/alignment' },
    { id: 'canopy', label: 'The Canopy', icon: Wind, path: '/canopy' }
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;
    
    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative ${
          isActive 
          ? 'bg-teal-500/5 border border-teal-500/10' 
          : 'hover:bg-white/[0.02] border border-transparent'
        }`}
      >
        <Icon className={`w-4 h-4 transition-colors ${
          isActive ? 'text-teal-400' : 'text-gray-600 group-hover:text-gray-400'
        }`} />
        
        <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors ${
          isActive ? 'text-teal-400' : 'text-gray-500 group-hover:text-gray-300'
        }`}>
          {item.label}
        </span>

        {isActive && (
          <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
        )}
      </button>
    );
  };

  return (
    <div className="w-72 min-h-screen bg-[#1A1423] border-r border-white/5 p-8 flex flex-col fixed left-0 top-0 z-50">
      
      {/* BRANDING RESTORED */}
      <div className="mb-12 flex items-center gap-4 px-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-transparent border border-white/10 flex items-center justify-center shadow-inner">
          <div className="text-teal-400 font-serif text-2xl font-bold">H</div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white font-serif font-bold text-lg leading-tight tracking-tight">Hearth</h2>
          <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">Horizon</span>
        </div>
      </div>

      <nav className="space-y-10">
        {/* OVERVIEW SECTION */}
        <div>
          <h3 className="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] mb-6 ml-5">Overview</h3>
          <div className="space-y-1">
            {overviewItems.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>

        {/* TRANSITION SECTION - NEW ORDER */}
        <div>
          <h3 className="text-[9px] font-black text-gray-700 uppercase tracking-[0.4em] mb-6 ml-5">Transition</h3>
          <div className="space-y-1">
            {transitionItems.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>
      </nav>

      {/* FOOTER ANCHOR */}
      <div className="mt-auto pt-10 border-t border-white/5">
        <div className="bg-black/20 rounded-2xl p-5 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500/40" />
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Legacy Verified</span>
          </div>
          <p className="text-[10px] text-gray-500 font-light italic leading-relaxed">
            13 years of expertise as the raw data for your next chapter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;