import React, { useState } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';

export default function EthicsCalculatorSection({ onComplete }) {
  const [done, setDone] = useState(false);

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  return (
    <div className="p-6 rounded-[2rem] border border-zinc-800 bg-zinc-950/40 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-500/10 rounded-xl text-teal-400">
          <Compass size={16} />
        </div>
        <h3 className="text-sm font-serif italic text-zinc-200">Ethics Compass</h3>
      </div>
      <p className="text-xs text-zinc-500 font-serif italic leading-relaxed">
        Calculate your ethical alignment score against target company archetypes.
      </p>
      {!done ? (
        <button
          onClick={handleComplete}
          className="w-full py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest hover:bg-teal-500/20 transition-all"
        >
          Calculate Alignment
        </button>
      ) : (
        <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-widest">
          <CheckCircle2 size={14} /> Complete
        </div>
      )}
    </div>
  );
}