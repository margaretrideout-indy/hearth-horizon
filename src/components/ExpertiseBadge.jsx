import React from 'react';
import { GraduationCap } from 'lucide-react';

/**
 * A small, fixed-bottom credential strip shown on tool pages.
 * Keeps Margaret's SME authority visible throughout the user journey.
 */
export default function ExpertiseBadge() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] pointer-events-none md:left-auto md:right-6 md:bottom-6 md:max-w-xs">
      <div className="bg-[#0E0C14]/95 backdrop-blur-xl border border-zinc-800 px-5 py-3 md:rounded-2xl flex items-center gap-3 shadow-2xl">
        <div className="w-7 h-7 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
          <GraduationCap size={13} className="text-teal-400" />
        </div>
        <div className="min-w-0">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 leading-none mb-0.5">Frameworks curated by</p>
          <p className="text-[10px] font-serif italic text-zinc-300 leading-none truncate">Margaret Rideout, M.Ed. · 13+ Yrs Program Management & Curriculum</p>
        </div>
      </div>
    </div>
  );
}