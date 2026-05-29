import React, { useState } from 'react';
import { Flame, Compass, Hammer, PenTool } from 'lucide-react';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';
import ExpertiseBadge from '../components/ExpertiseBadge';

export default function EmbersCommunity() {
  const [log, setLog] = useState('');

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans selection:bg-teal-500/20">
      <StickyNav />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 grid grid-cols-12 gap-16">
        
        {/* Left Side: Static Context */}
        <aside className="col-span-3 pt-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-[9px] font-black uppercase tracking-widest text-zinc-700 mb-6">Collective Presence</h2>
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <Compass size={14} className="text-amber-700" /> Gathering Kindling
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <Hammer size={14} className="text-purple-900" /> Striking the Anvil
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-zinc-900">
              <a href="/library/smithy" className="text-[9px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-400 transition-colors">
                Go to The Smithy →
              </a>
            </div>
          </div>
        </aside>

        {/* Right Side: The Ledger */}
        <section className="col-span-9 border-l border-zinc-900 pl-12">
          <header className="mb-16">
            <h1 className="text-3xl font-serif text-white flex items-center gap-3">
              The Forest Ledger <Flame size={20} className="text-amber-800" />
            </h1>
            <p className="text-sm italic font-serif text-zinc-600 mt-2">
              A workspace for the Founding Forest. Collective progress, one entry at a time.
            </p>
          </header>

          <div className="space-y-12">
            {/* Ledger content will appear here */}
            <div className="py-20 text-center border-y border-zinc-900/50 border-dashed">
              <p className="text-zinc-800 text-xs italic font-serif">The ledger is quiet today.</p>
            </div>
          </div>

          {/* Re-introduced Composer: Intentional, Ledger-Style */}
          <div className="mt-20 pt-10 border-t border-zinc-900/50">
            <textarea
              value={log}
              onChange={(e) => setLog(e.target.value)}
              placeholder="Log your progress or share a milestone..."
              className="w-full bg-zinc-950/30 border border-zinc-900 rounded-lg p-4 text-sm font-serif italic text-zinc-300 focus:border-teal-900/50 focus:ring-0 transition-colors"
              rows={3}
            />
            <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-400 transition-colors">
              <PenTool size={10} /> Add to Ledger
            </button>
          </div>
        </section>
      </main>

      <SMEFooter />
      <ExpertiseBadge />
    </div>
  );
}