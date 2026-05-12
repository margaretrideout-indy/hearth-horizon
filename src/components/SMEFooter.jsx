import React from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

/**
 * Reusable SME authority seal — credential strip for Margaret Rideout.
 * Positioned as a quality mark at the bottom of tool pages.
 */
export default function SMEFooter() {
  const credentials = [
    { label: 'Master of Education (M.Ed.)', note: 'Curriculum & Pedagogy' },
    { label: '13+ Years Leadership', note: 'Program Management & Curriculum Development' },
    { label: 'BA, BEd', note: 'Foundational Academic Training' },
    { label: 'Indigenous Studies', note: 'Specialist Focus' },
  ];

  return (
    <div className="py-16 px-8 md:px-12 border border-zinc-800/60 rounded-[2rem] bg-zinc-950/60 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
          <GraduationCap size={15} className="text-teal-400" />
        </div>
        <div>
          <p className="text-[8px] font-black uppercase tracking-[0.45em] text-zinc-600">Quality Seal</p>
          <p className="text-base font-serif italic text-zinc-300 leading-none mt-0.5">Margaret Rideout, M.Ed.</p>
        </div>
      </div>

      {/* Credential list */}
      <ul className="space-y-3">
        {credentials.map((c) => (
          <li key={c.label} className="flex items-start gap-3">
            <CheckCircle2 size={13} className="text-teal-500/60 mt-0.5 shrink-0" />
            <div>
              <span className="text-[11px] font-black text-zinc-300 uppercase tracking-wide">{c.label}</span>
              <span className="text-[10px] text-zinc-600 italic ml-2">— {c.note}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Closing statement */}
      <p className="text-[11px] text-zinc-600 italic font-serif border-l-2 border-zinc-800 pl-4 leading-relaxed">
        Every tool and framework in this platform is built on lived expertise — not theory.
        The methodology works because it was developed inside the systems it now helps people leave.
      </p>
    </div>
  );
}