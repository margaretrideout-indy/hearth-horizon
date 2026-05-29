import React, { useState } from 'react';
import { Flame, Hammer, Compass, PenTool } from 'lucide-react';
import StickyNav from '@/components/StickyNav';

export default function EmbersCommunity() {
  const [presence, setPresence] = useState('kindling');

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/20">
      <StickyNav />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 grid grid-cols-12 gap-12">
        
        {/* Left Side: The "Steward" Context */}
        <aside className="col-span-3 space-y-8">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Current Presence</h2>
            <div className="space-y-3">
              <button 
                onClick={() => setPresence('kindling')}
                className={`flex items-center gap-3 text-xs ${presence === 'kindling' ? 'text-amber-400' : 'text-zinc-600'}`}
              >
                <Compass size={14} /> Gathering Kindling
              </button>
              <button 
                onClick={() => setPresence('anvil')}
                className={`flex items-center gap-3 text-xs ${presence === 'anvil' ? 'text-purple-400' : 'text-zinc-600'}`}
              >
                <Hammer size={14} /> Striking the Anvil
              </button>
            </div>
          </div>
        </aside>

        {/* Right Side: The Ledger */}
        <section className="col-span-9 border-l border-zinc-900 pl-10">
          <header className="mb-12">
            <h1 className="text-3xl font-serif text-white flex items-center gap-3">
              The Forest Ledger <Flame size={20} className="text-amber-600/50" />
            </h1>
            <p className="text-sm italic font-serif text-zinc-500 mt-2">
              A workspace for the Founding Forest. Collective progress, one entry at a time.
            </p>
          </header>

          {/* Example Entry showing the "warm" aesthetic */}
          <div className="space-y-10">
            <div className="relative">
              <div className="absolute -left-[43px] mt-1 w-2 h-2 rounded-full bg-zinc-800" />
              <p className="text-sm font-serif leading-relaxed text-zinc-300 italic">
                "Spent the morning cross-walking my classroom management strategies with the new language data annotation rubric. The structural parallels are much stronger than I anticipated."
              </p>
              <div className="mt-2 text-[10px] font-medium text-teal-700 uppercase tracking-widest">
                — Elena R. / 10:45 AM
              </div>
            </div>

            {/* Input area remains clean but anchored */}
            <div className="pt-10 border-t border-zinc-900/50">
              <textarea
                placeholder="Log your progress..."
                className="w-full bg-zinc-950/30 border border-zinc-900 rounded-lg p-4 text-sm font-serif italic text-zinc-300 focus:border-teal-900/50 focus:ring-0 transition-colors"
                rows={3}
              />
              <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-400 flex items-center gap-2">
                <PenTool size={10} /> Add to Ledger
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}