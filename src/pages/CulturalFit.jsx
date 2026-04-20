import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Repeat, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LEXICON_DATA = [
  {
    category: "The Pivot",
    instruction: "How do you translate your previous 'Core Output' into the Hearth vernacular?",
    options: [
      { old: "Managing Deliverables", new: "Stewarding Outcomes", value: "steward" },
      { old: "Executive Reporting", new: "Architecting Narratives", value: "hearthkeeper" },
      { old: "Task Execution", new: "Cultivating Flow", value: "seedling" }
    ]
  },
  {
    category: "The Value Alignment",
    instruction: "Select the frequency that best describes your professional North Star:",
    options: [
      { old: "Efficiency", new: "Reciprocity", value: "hearthkeeper" },
      { old: "Competition", new: "Collective Intelligence", value: "steward" },
      { old: "Consistency", new: "Adaptive Resilience", value: "seedling" }
    ]
  }
];

export default function CulturalFit({ onComplete }) {
  const [step, setStep] = useState(0);
  const [userLexicon, setUserLexicon] = useState([]);
  const [finalStanding, setFinalStanding] = useState(null);

  const handleSelection = (option) => {
    const updatedLexicon = [...userLexicon, option.new];
    setUserLexicon(updatedLexicon);

    if (step < LEXICON_DATA.length - 1) {
      setStep(step + 1);
    } else {
      // Determine standing based on the last selection for this demo 
      // (or logic based on total points)
      setFinalStanding(option.value);
    }
  };

  if (finalStanding) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto p-12 bg-[#0D0B14] border border-purple-500/20 rounded-[3rem] text-center shadow-2xl"
      >
        <div className="inline-flex p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-8">
          <Repeat className="text-teal-400" size={32} />
        </div>
        
        <h2 className="text-3xl font-serif italic text-white mb-6">Translation Complete</h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {userLexicon.map((word, i) => (
            <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-teal-400 text-xs font-black uppercase tracking-tighter">
              {word}
            </span>
          ))}
        </div>

        <p className="text-zinc-500 text-sm mb-10 leading-relaxed max-w-sm mx-auto">
          Your old world language has been shed. You are now prepared to view the <span className="text-white font-bold">Horizon Board</span> through a cleared lens.
        </p>

        <Button 
          onClick={() => onComplete(finalStanding)}
          className="w-full bg-teal-500 text-black font-black uppercase tracking-[0.2em] py-7 rounded-2xl hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.15)]"
        >
          View The Horizon
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <header className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-purple-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Alignment Engine</span>
        </div>
        <h1 className="text-4xl font-serif italic text-white mb-4">Language Translation</h1>
        <p className="text-zinc-500 text-lg font-light tracking-wide">{LEXICON_DATA[step].instruction}</p>
      </header>

      <div className="grid gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {LEXICON_DATA[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelection(opt)}
                className="w-full group flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-3xl transition-all hover:bg-purple-500/[0.05] hover:border-purple-500/30 text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors mb-2 italic line-through">
                    {opt.old}
                  </span>
                  <span className="text-xl font-serif italic text-zinc-300 group-hover:text-teal-400 transition-all">
                    {opt.new}
                  </span>
                </div>
                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-teal-500/50 transition-all">
                  <ArrowRight className="text-zinc-700 group-hover:text-teal-400 transition-all" size={20} />
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="mt-20 flex justify-between items-center opacity-30">
        <div className="flex gap-2">
          {[0, 1].map(i => (
            <div key={i} className={`h-1 w-8 rounded-full ${i === step ? 'bg-teal-500' : 'bg-white/10'}`} />
          ))}
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Lexicon Mapping v3.0</span>
      </footer>
    </div>
  );
}