import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame, BookOpen, LayoutDashboard, Activity } from 'lucide-react';

export default function StickyNav({ showBrigidCta = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: 'Hearth', path: '/hearth', icon: Flame },
    { label: 'Library', path: '/library', icon: BookOpen },
    { label: 'Horizon', path: '/horizon', icon: LayoutDashboard },
    { label: 'Embers', path: '/embers', icon: Activity },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/grove')}
          className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-zinc-400 transition-colors"
        >
          Hearth & Horizon
        </button>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  isActive ? 'text-teal-400 bg-teal-500/10' : 'text-zinc-600 hover:text-zinc-300'
                }`}
              >
                <link.icon size={11} />
                <span className="hidden sm:inline">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {showBrigidCta && (
          <button
            onClick={() => navigate('/hearth')}
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-400 transition-all"
          >
            <Flame size={10} /> Enter Hearth
          </button>
        )}
      </div>
    </header>
  );
}