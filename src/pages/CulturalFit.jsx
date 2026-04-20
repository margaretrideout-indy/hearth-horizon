import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Calculator, Search, Shield, Zap, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', icon: Zap, description: 'Balancing extraction with contribution.' },
  { id: 'transparency', label: 'Transparency', icon: Search, description: 'Radical honesty in process and pay.' },
  { id: 'agency', label: 'Personal Agency', icon: Shield, description: 'Autonomy over the migration path.' },
];

export default function CulturalFit({ onComplete }) {
  const [activeTab, setActiveTab] = useState('lexicon'); 
  const [inputPhrase, setInputPhrase] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [ethics, setEthics] = useState({ reciprocity: 50, transparency: 50, agency: 50 });

  // --- REFINED ALCHEMY LOGIC ---
  const alchemize = (phrase) => {
    if (!phrase || phrase.length < 3) return [];

    // Map of "Old World" triggers to "Hearth" concepts
    const library = [
      { 
        title: "Stewarding the Outcome", 
        desc: "Shifts from 'managing tasks' to 'owning results'.",
        transform: (p) => p.replace(/managing|doing|handling|ieps for/gi, "Stewarding") 
      },
      { 
        title: "Architecting the Path", 
        desc: "Shifts from 'executing' to 'designing systems'.",
        transform: (p) => p.replace(/managing|doing|handling|ieps for/gi, "Architecting")
      },
      { 
        title: "Cultivating the Ecosystem", 
        desc: "Shifts from 'reporting' to 'nurturing growth'.",
        transform: (p) => p.replace(/managing|doing|handling|ieps for/gi, "Cultivating")
      }
    ];

    // If we don't find a keyword, we provide a more abstract translation 
    // instead of just appending the word.
    return library.map(item => {
      let result = item.transform(phrase);
      // If the phrase didn't change (no keyword found), we provide a thematic replacement
      if (result.toLowerCase() === phrase.toLowerCase()) {
        const themes = {
          Stewarding: "Outcome Stewardship",
          Architecting: "Structural Synthesis",
          Cultivating: "Adaptive Growth"
        };
        result = themes[item.title.split(' ')[0]];
      }
      return { hearth: result, context: item.desc };
    });
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen">
      
      {/* TABS HEADER */}
      <div className="flex gap-8 mb-12 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('lexicon')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'lexicon' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-600'}`}
        >
          Lexicon Alchemist
        </button>
        <button 
          onClick={() => setActiveTab('ethics')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'ethics' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-zinc-600'}`}
        >
          Ethics Calculator
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lexicon' ? (
          <motion.div key="lexicon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif italic text-white tracking-tight">The Translation Engine</h2>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed">Enter your corporate responsibilities. We will strip the jargon and reveal the legacy underneath.</p>
              
              <div className="relative group max-w-xl">
                <Input 
                  value={inputPhrase}
                  onChange={(e) => setInputPhrase(e.target.value)}
                  placeholder="e.g. Managing IEPs for 25 students..."
                  className="bg-white/[0.03] border-white/10 h-16 rounded-2xl pl-14 text-zinc-200 focus:border-teal-500/50 transition-all"
                />
                <RefreshCw size={20} className="absolute left-5 top-5 text-teal-500/30 group-hover:rotate-180 transition-all duration-500" />
              </div>
            </div>

            <div className="grid gap-5">
              {alchemize(inputPhrase).map((s, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="group flex items-center justify-between p-8 bg-[#0D0B14] border border-white/5 rounded-[2rem] hover:border-teal-500/30 transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-teal-400 font-serif italic text-2xl group-hover:text-teal-300 transition-colors">{s.hearth}</span>
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em]">{s.context}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(s.hearth, i)} 
                    className={`p-4 rounded-2xl transition-all ${copiedIndex === i ? 'bg-teal-500 text-black' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}`}
                  >
                    {copiedIndex === i ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="ethics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16 max-w-2xl">
             <div className="space-y-4">
              <h2 className="text-4xl font-serif italic text-white">Values Alignment</h2>
              <p className="text-zinc-500 text-sm">Tune your frequency. This weighting will calibrate your personalized <span className="text-purple-400 font-bold">Horizon Board</span>.</p>
            </div>

            <div className="space-y-12">
              {VALUE_DIMENSIONS.map((dim) => (
                <div key={dim.id} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <dim.icon size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-200 block">{dim.label}</span>
                        <span className="text-[10px] text-zinc-600 italic">{dim.description}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-purple-400 bg-purple-500/5 px-3 py-1 rounded-full border border-purple-500/10">{ethics[dim.id]}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="100" 
                    value={ethics[dim.id]} 
                    onChange={(e) => setEthics({...ethics, [dim.id]: e.target.value})}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none accent-purple-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <Button 
              onClick={() => onComplete({ ethics })}
              className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.3em] py-8 rounded-[2rem] hover:bg-purple-500 shadow-2xl shadow-purple-500/20 transition-all active:scale-[0.98]"
            >
              Sync to Horizon Board
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}