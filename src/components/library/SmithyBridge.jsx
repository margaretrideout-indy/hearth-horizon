import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Hammer } from 'lucide-react';

const STRIPE_URL = "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03";

export default function SmithyBridge({ isHearthkeeper, onNavigate }) {
  const handleClick = () => {
    if (isHearthkeeper) {
      onNavigate('smithy');
    } else {
      window.location.href = STRIPE_URL;
    }
  };

  return (
    <div className="flex flex-col items-center gap-0 pt-4 pb-2 select-none">
      {/* Vertical descent line */}
      <div className="w-[1px] h-24 bg-gradient-to-b from-teal-500/50 to-transparent" />

      {/* Pulsing arrow indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="text-teal-500/50 -mt-1 mb-6"
      >
        <ArrowDown size={18} strokeWidth={1.5} />
      </motion.div>

      {/* CTA Portal */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group flex items-center gap-4 px-8 py-5 rounded-full border border-teal-500/20 bg-[#0A080D]/80 backdrop-blur-md shadow-[0_0_40px_rgba(20,184,166,0.08)] hover:border-teal-500/40 hover:shadow-[0_0_60px_rgba(20,184,166,0.14)] transition-all duration-500"
      >
        <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:bg-teal-500/15 transition-colors duration-500">
          <Hammer size={15} className="text-teal-400" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-teal-400 leading-none mb-1">
            {isHearthkeeper ? 'Step into the Smithy' : 'Unlock the Smithy'}
          </p>
          <p className="text-[10px] font-serif italic text-zinc-600 leading-none">
            {isHearthkeeper ? 'Templates & Blueprints' : '180-Day Season Pass'}
          </p>
        </div>
      </motion.button>

      {/* Continuation line below */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-teal-500/20 to-transparent mt-6" />
    </div>
  );
}