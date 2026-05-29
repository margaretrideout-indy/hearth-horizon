import React from 'react';
import { Flame, Compass, Hammer } from 'lucide-react';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';
import ExpertiseBadge from '../components/ExpertiseBadge';

export default function EmbersCommunity() {
  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans selection:bg-teal-500/20">
      <StickyNav />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 grid grid-cols-12 gap-16">
        
        {/* Left Side: Collective Status */}
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
            
            {/* Quick link to the Smithy for resume translation */}
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

          {/* Ledger Stream: A clean, observation-only chronicle */}
          <div className="space-y-12">
            {/* 
              This area remains empty until your Stewards populate it. 
              It is designed to be a silent, observant chronicle. 
            */}
            <div className="py-20 text-center border-y border-zinc-900/50 border-dashed">
              <p className="text-zinc-800 text-xs italic font-serif">The ledger is quiet today.</p>
            </div>
          </div>
        </section>
      </main>

      <SMEFooter />
      <ExpertiseBadge />
    </div>
  );
}