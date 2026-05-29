import React, { useState } from 'react';
import { FlaskConical, CheckCircle2 } from 'lucide-react';

export default function LexiconAlchemistSection({ onComplete }) {
  const [done, setDone] = useState(false);

  const handleComplete = () => {
    setDone(true);
    onComplete();
  };

  return (
    <div className="p-6 rounded-[2rem] border border-zinc-800 bg-zinc-950/40 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
          <FlaskConical size={16} />
        </div>
        <h3 className="text-sm font-serif italic text-zinc-200">Lexicon Alchemist</h3>
      </div>
      <p className="text-xs text-zinc-500 font-serif italic leading-relaxed">
        Translate your public-sector vocabulary into private-sector language that resonates.
      </p>
      {!done ? (
        <button
          onClick={handleComplete}
          className="w-full py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest hover:bg-purple-500/20 transition-all"
        >
          Alchemize Lexicon
        </button>
      ) : (
        <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-widest">
          <CheckCircle2 size={14} /> Complete
        </div>
      )}
    </div>
  );
}