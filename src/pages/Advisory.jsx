import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import StickyNav from '@/components/StickyNav';

export default function EmbersClearing() {
  return (
    <div className="min-h-screen bg-[#050406] text-zinc-300 font-serif selection:bg-amber-500/20">
      <StickyNav />

      {/* The Ambient Hearth - A non-interactive focal point */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-amber-900/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative z-10 max-w-lg mx-auto px-6 pt-40 pb-20 flex flex-col items-center">
        
        {/* The Echoes - Past wisdom that gives the space history */}
        <div className="space-y-20 mb-32 opacity-70">
          <p className="text-xl italic">"The transition is a slow turning, like the seasons."</p>
          <p className="text-xl italic text-right">— "We carry our past into the new language."</p>
        </div>

        {/* The Spark Input - Minimal, tactile, and warm */}
        <div className="w-full relative group">
          <input 
            type="text"
            placeholder="Add your light to the fire..."
            className="w-full bg-transparent border-b border-zinc-800 py-6 text-center text-xl italic text-amber-100 placeholder:text-zinc-700 focus:border-amber-700 outline-none transition-all duration-700 group-hover:border-zinc-600"
          />
          <motion.div 
            className="absolute -bottom-10 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Sparkles size={16} className="text-amber-700" />
          </motion.div>
        </div>
      </main>
    </div>
  );
}