import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function SanctuaryTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[2000] bg-[#0A080D] flex flex-col items-center justify-center gap-8"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.06),transparent_65%)] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 blur-[40px] rounded-full bg-teal-500/20 scale-150"
        />
        <Flame size={40} className="text-teal-400 relative z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center space-y-3"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-teal-500/60">
          Leaving the legacy behind...
        </p>
        <h2 className="text-2xl md:text-3xl font-serif italic text-white">
          Entering the Sanctuary.
        </h2>
      </motion.div>

      {/* Progress line */}
      <motion.div className="w-48 h-[1px] bg-white/5 rounded-full overflow-hidden mt-4">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-teal-500/40 to-teal-400"
        />
      </motion.div>
    </motion.div>
  );
}