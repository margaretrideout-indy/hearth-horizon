import React, { useState } from 'react';
import { Flame, Send, Users } from 'lucide-react';
import StickyNav from '@/components/StickyNav';

// Mock list of the Founding Forest stewards to make it feel "full"
const stewards = ["Sarah M.", "David K.", "Elena R.", "Marcus T.", "Jules P."];

export default function EmbersChatroom() {
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#08070A] text-zinc-300 font-sans selection:bg-amber-500/20">
      <StickyNav />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-10 grid grid-cols-12 gap-6 h-[90vh]">
        
        {/* The Lodge Feed (8 cols) */}
        <section className="col-span-9 flex flex-col h-full bg-[#0E0C10] rounded-2xl border border-zinc-800/50 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800/50 flex items-center gap-3">
            <Flame className="text-amber-700" size={20} />
            <h2 className="font-serif text-lg text-white">The Embers / Founding Forest</h2>
          </div>
          
          <div className="flex-1 p-8 overflow-y-auto space-y-8">
            {/* Example conversation thread */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-600">Sarah M. <span className="font-normal text-[10px] ml-1 opacity-50">10:45 AM</span></span>
              <p className="font-serif text-zinc-300 italic">"I finally finished my first stakeholder conflict management map—mapping my teacher experience to the PM role was way easier once I used that script."</p>
            </div>
          </div>

          {/* Chat Bar */}
          <div className="p-4 bg-[#0A080D] border-t border-zinc-800/50">
            <div className="flex items-center gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a thought with the Forest..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-serif italic text-white placeholder:text-zinc-700"
              />
              <button className="p-2 bg-amber-950/30 text-amber-600 rounded-lg hover:bg-amber-900/50 transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* The Presence List (3 cols) */}
        <aside className="col-span-3 h-full bg-[#0E0C10] rounded-2xl border border-zinc-800/50 p-6">
          <div className="flex items-center gap-2 mb-6 text-zinc-500">
            <Users size={14} />
            <h3 className="text-[10px] font-black uppercase tracking-widest">Forest Stewards</h3>
          </div>
          <ul className="space-y-4">
            {stewards.map((name) => (
              <li key={name} className="flex items-center gap-3 text-xs text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-teal-900 border border-teal-700" />
                {name}
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}