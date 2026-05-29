import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import StickyNav from '@/components/StickyNav';

export default function EmbersCampfire() {
  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans flex flex-col items-center pt-32">
      <StickyNav />

      {/* The Fire: The heart of the sanctuary */}
      <div className="relative mb-16 flex flex-col items-center">
        <div className="w-32 h-32 bg-amber-950/20 rounded-full blur-[60px] animate-pulse" />
        <Flame className="absolute text-amber-600/60" size={64} strokeWidth={1} />
        <h1 className="mt-8 text-4xl font-serif text-white italic">The Embers</h1>
        <p className="mt-2 text-zinc-600 italic text-sm">Waiting for the first spark of the day.</p>
      </div>

      {/* The Ledger: Drifting entries */}
      <div className="max-w-xl w-full px-6 space-y-16 mb-24">
        <div className="text-center py-10">
          <p className="text-zinc-800 font-serif italic text-sm">The forest is quiet. The fire is warm.</p>
        </div>
      </div>

      {/* Share a Spark: The Composer */}
      <div className="max-w-lg w-full px-6 mb-24">
        <div className="group relative">
          <textarea
            placeholder="Share a spark..."
            className="w-full bg-transparent border-b border-zinc-900 focus:border-amber-900 text-center text-lg font-serif italic text-zinc-400 focus:outline-none transition-all placeholder:text-zinc-800"
            rows={2}
          />
          <button className="mt-6 w-full text-[10px] font-black uppercase tracking-widest text-zinc-700 hover:text-amber-700 transition-colors flex justify-center items-center gap-2">
            <Sparkles size={12} /> Add to the Fire
          </button>
        </div>
      </div>
    </div>
  );
}