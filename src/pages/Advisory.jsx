import React, { useState } from 'react';
import { Sparkles, PenTool } from 'lucide-react';
import StickyNav from '@/components/StickyNav';

export default function EmbersCommunity() {
  const [logs, setLogs] = useState([]); // Empty state: clean, intentional, no fake users
  const [content, setContent] = useState('');

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans selection:bg-teal-500/20">
      <StickyNav />

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        {/* Header: Grounded, not loud */}
        <header className="mb-16">
          <h1 className="text-2xl font-serif text-white mb-2">The Forest Ledger</h1>
          <p className="text-sm italic font-serif text-zinc-600 border-l border-teal-900/50 pl-4">
            A quiet space for the Founding Forest. Asynchronous. Reflective. Grounded.
          </p>
        </header>

        {/* The Stream: Clean lines, no boxes */}
        <div className="space-y-12">
          {logs.length === 0 ? (
            <div className="py-20 text-center border-y border-zinc-900/50 border-dashed">
              <p className="text-zinc-700 text-sm italic font-serif">The ledger is quiet today.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="group flex gap-6">
                <div className="w-16 text-[10px] text-zinc-700 font-mono pt-1">{log.time}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-300">{log.author}</span>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-800 italic">{log.tag}</span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-serif">{log.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* The Composer: Minimalist entry */}
        <div className="mt-20 pt-10 border-t border-zinc-900/50">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share a reflection or a blueprint..."
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-zinc-800 text-lg font-serif italic resize-none"
            rows={2}
          />
          <button 
            className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-400 transition-colors"
            onClick={() => {/* Logic to add log */}}
          >
            <PenTool size={12} /> Add to Ledger
          </button>
        </div>
      </main>
    </div>
  );
}