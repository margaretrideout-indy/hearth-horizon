import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StickyNav({ showBrigidCta = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    base44.auth.isAuthenticated().then(setIsAuthed);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/grove')}
          className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-zinc-400 transition-colors"
        >
          Hearth & Horizon
        </button>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <button
              onClick={() => navigate('/hearth')}
              className="flex items-center gap-2 px-4 py-1.5 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-400 transition-all"
            >
              <Flame size={10} /> Enter Hearth
            </button>
          ) : (
            <>
              <button
                onClick={() => base44.auth.redirectToLogin('/hearth')}
                className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-200 border border-white/10 rounded-lg hover:border-white/20 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => base44.auth.redirectToLogin('/hearth')}
                className="px-4 py-1.5 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-teal-400 transition-all"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}