import React from 'react';
import { GraduationCap } from 'lucide-react';

/**
 * Reusable SME authority footer strip showing Margaret's credentials.
 */
export default function SMEFooter() {
  const credentials = [
    'M.Ed. Curriculum & Pedagogy',
    '13+ Yrs Program Management',
    'BA, BEd',
    'Indigenous Studies',
  ];

  return (
    <div className="py-10 border-t border-zinc-900 space-y-5 text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
          <GraduationCap size={14} className="text-teal-400" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Frameworks curated by</p>
      </div>
      <p className="text-lg font-serif italic text-zinc-400">Margaret Rideout, M.Ed.</p>
      <div className="flex flex-wrap justify-center gap-2">
        {credentials.map((c) => (
          <span
            key={c}
            className="text-[8px] font-black uppercase tracking-widest text-zinc-700 border border-zinc-800 px-3 py-1 rounded-full"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}