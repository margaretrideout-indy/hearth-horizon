import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import StickyNav from '@/components/StickyNav';

export default function EmbersCampfire() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans relative overflow-hidden">
      <StickyNav />

      {/* Ambient particles for 'smoke' effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500/10 rounded-full blur-md"
          animate={{ y: [0, -500], opacity: [0, 0.5, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 2 }}
          style={{ left: `${20 + i * 15}%`, bottom: 0 }}
        />
      ))}

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
        
        {/* The Hearth Title */}
        <div className="mb-16">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 4, repeat: Infinity }}
            className="text-amber-600/40 mb-6"
          >
            <Flame size={48} strokeWidth={1} />
          </motion.div>
          <h1 className="text-4xl font-serif text-white">The Embers</h1>
          <p className="mt-3 text-sm text-zinc-500 italic">Welcome to the sanctuary of the Founding Forest.</p>
        </div>

        {/* The Empty Ledger State (Warm, not hollow) */}
        <div className="w-full py-16 border-y border-zinc-900 border-dashed mb-16">
          <p className="text-zinc-700 font-serif italic text-sm">
            "The fire is waiting for the first story of the day."
          </p>
        </div>

        {/* The Composer (Tactile and Inviting) */}
        <div className="w-full">
          <textarea
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What’s on your mind, Steward?"
            className={`w-full bg-[#0E0C14] border rounded-2xl p-6 text-zinc-300 font-serif italic text-lg resize-none transition-all duration-500 placeholder:text-zinc-800 ${
              isFocused ? 'border-amber-900/50 shadow-[0_0_30px_-10px_rgba(180,83,9,0.2)]' : 'border-zinc-900'
            }`}
            rows={4}
          />
          <button className="mt-6 flex items-center justify-center gap-2 w-full text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-amber-500 transition-colors">
            <Sparkles size={12} /> Add your light to the fire
          </button>
        </div>
      </main>
    </div>
  );
}