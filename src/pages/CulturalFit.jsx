import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Calculator, Search, ArrowRight, Shield, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// --- ETHICS DIALS ---
const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', icon: Zap, description: 'Balancing extraction with contribution.' },
  { id: 'transparency', label: 'Transparency', icon: Search, description: 'Radical honesty in process and pay.' },
  { id: 'agency', label: 'Personal Agency', icon: Shield, description: 'Autonomy over the migration path.' },
];

export default function CulturalFit({ onComplete }) {
  const [activeTab, setActiveTab] = useState('lexicon'); // 'lexicon' or 'ethics'
  const [inputWord, setInputWord] = useState('');
  const [copied, setCopied] = useState(false);
  const [ethics, setEthics] = useState({ reciprocity: 50, transparency: 50, agency: 50 });

  // --- LEXICON GENERATOR LOGIC ---
  const getSuggestions = (word) => {
    if (!word) return [];
    // This would ideally be an API call, but here is the logic mockup:
    return [
      { hearth: `Stewarding ${word}`, context: "Focuses on responsibility over control." },
      { hearth: `Architecting ${word}`, context: "Focuses on design and structure." },
      { hearth: `Cultivating ${word}`, context: "Focuses on growth and long-term health." }
    ];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEthicsChange = (id, val) => {
    setEthics(prev => ({ ...prev, [id]: val }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {/* TABS HEADER */}
      <div className="flex gap-8 mb-12 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('lexicon')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'lexicon' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          Lexicon Alchemist
        </button>
        <button 
          onClick={() => setActiveTab('ethics')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'ethics' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-zinc-600 hover:text-zinc-400'}`}
        >
          Ethics Calculator
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lexicon' ? (
          <motion.div key="lexicon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif italic text-white">The Translation Engine</h2>
              <p className="text-zinc-500 text-sm max-w-lg">Enter a corporate phrase (e.g., "Project Manager") to see how it resonates in the Hearth.</p>
              
              <div className="relative group max-w-md">
                <Input 
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  placeholder="Type a corporate phrase..."
                  className="bg-white/5 border-white/10 h-14 rounded-2xl pl-12 focus:border-teal-500/50"
                />
                <Sparkles size={18} className="absolute left-4 top-4 text-teal-500/40 group-hover:text-teal-500 transition-colors" />
              </div>
            </div>

            <div className="grid gap-4">
              {getSuggestions(inputWord).map((s, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center justify-between p-6 bg-[#0D0B14] border border-white/5 rounded-2xl hover:border-teal-500/30 transition-all"
                >
                  <div>
                    <span className="text-teal-400 font-serif italic text-lg">{s.hearth}</span>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">{s.context}</p>
                  </div>
                  <button onClick={() => copyToClipboard(s.hearth)} className="p-3 bg-white/5 rounded-xl hover:bg-teal-500 hover:text-black transition-all">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="ethics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
             <div className="space-y-2">
              <h2 className="text-3xl font-serif italic text-white">Values Alignment</h2>
              <p className="text-zinc-500 text-sm">Tune your frequency. This will filter the <span className="text-purple-400">Horizon Board</span> to match your personal ethics.</p>
            </div>

            <div className="space-y-10">
              {VALUE_DIMENSIONS.map((dim) => (
                <div key={dim.id} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <dim.icon size={18} className="text-purple-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{dim.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-purple-400">{ethics[dim.id]}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={ethics[dim.id]} 
                    onChange={(e) => handleEthicsChange(dim.id, e.target.value)}
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-zinc-600 italic">{dim.description}</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => onComplete({ lexicon: userLexicon, ethics })}
              className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.2em] py-8 rounded-2xl hover:bg-purple-500 shadow-xl shadow-purple-500/10"
            >
              Sync to Horizon Board
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-40">
         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 italic">Old World Logic ➔ New World Legacy</span>
         <Calculator size={14} className="text-zinc-600" />
      </footer>
    </div>
  );
}