import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Calculator, Search, Shield, Zap, RefreshCw, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', icon: Zap, description: 'Balancing extraction with contribution.' },
  { id: 'transparency', label: 'Transparency', icon: Search, description: 'Radical honesty in process and pay.' },
  { id: 'agency', label: 'Personal Agency', icon: Shield, description: 'Autonomy over the migration path.' },
];

export default function CulturalFit({ vault, onComplete }) {
  const [activeTab, setActiveTab] = useState('lexicon'); 
  const [inputPhrase, setInputPhrase] = useState('');
  const [savedTranslations, setSavedTranslations] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ethics, setEthics] = useState(vault?.ethics || { reciprocity: 50, transparency: 50, agency: 50 });

  // --- ALCHEMY LOGIC (Now strips original phrase entirely) ---
  const alchemize = (phrase) => {
    if (!phrase || phrase.length < 3) return [];
    
    // We provide pure translations based on the "intent" behind the jargon
    const library = [
      { 
        id: 'steward',
        title: "Outcome Stewardship", 
        desc: "Replacing 'Managing' with ownership of the final result.",
      },
      { 
        id: 'architect',
        title: "Structural Synthesis", 
        desc: "Replacing 'Execution' with the design of the path.",
      },
      { 
        id: 'cultivate',
        title: "Adaptive Growth", 
        desc: "Replacing 'Reporting' with the nurturing of health.",
      }
    ];

    return library.map(item => ({
      hearth: item.title,
      context: item.desc
    }));
  };

  const handleSaveTranslation = (text) => {
    if (!savedTranslations.includes(text)) {
      setSavedTranslations([...savedTranslations, text]);
    }
  };

  const handleFinalSync = async () => {
    setIsSyncing(true);
    try {
      // Saving the lexicon and ethics to the user's Vault in Base44
      await base44.entities.Vault.update(vault.id, {
        ethics: ethics,
        lexicon: savedTranslations,
        alignment_complete: true,
        last_alignment_date: new Date().toISOString()
      });
      
      if (onComplete) onComplete({ ethics, lexicon: savedTranslations });
    } catch (err) {
      console.error("Persistence Error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    handleSaveTranslation(text);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen">
      
      {/* TABS */}
      <div className="flex gap-8 mb-12 border-b border-white/5">
        <button onClick={() => setActiveTab('lexicon')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'lexicon' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-zinc-600'}`}>
          Lexicon Alchemist
        </button>
        <button onClick={() => setActiveTab('ethics')} className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${activeTab === 'ethics' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-zinc-600'}`}>
          Ethics Calculator
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lexicon' ? (
          <motion.div key="lexicon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif italic text-white tracking-tight">The Translation Engine</h2>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed">Enter your old-world responsibilities. Copy a translation to save it to your Hearth lexicon.</p>
              
              <div className="relative group max-w-xl">
                <Input value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="Type a corporate responsibility..." className="bg-white/[0.03] border-white/10 h-16 rounded-2xl pl-14 text-zinc-200 focus:border-teal-500/50" />
                <RefreshCw size={20} className="absolute left-5 top-5 text-teal-500/30 group-hover:rotate-180 transition-all duration-500" />
              </div>
            </div>

            <div className="grid gap-5">
              {alchemize(inputPhrase).map((s, i) => (
                <div key={i} className="group flex items-center justify-between p-8 bg-[#0D0B14] border border-white/5 rounded-[2rem] hover:border-teal-500/30 transition-all">
                  <div className="space-y-1">
                    <span className="text-teal-400 font-serif italic text-2xl">{s.hearth}</span>
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em]">{s.context}</p>
                  </div>
                  <button onClick={() => copyToClipboard(s.hearth, i)} className={`p-4 rounded-2xl transition-all ${copiedIndex === i ? 'bg-teal-500 text-black' : 'bg-white/5 text-zinc-500 hover:text-white'}`}>
                    {copiedIndex === i ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
            
            {savedTranslations.length > 0 && (
              <div className="pt-6">
                <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mb-3 block">Saved Lexicon</span>
                <div className="flex flex-wrap gap-2">
                  {savedTranslations.map((word, idx) => (
                    <span key={idx} className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] rounded-full uppercase font-bold tracking-tighter">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
                      <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20"><dim.icon size={20} className="text-purple-400" /></div>
                      <span className="text-xs font-black uppercase tracking-widest text-zinc-200 block">{dim.label}</span>
                    </div>
                    <span className="text-xs font-mono text-purple-400">{ethics[dim.id]}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={ethics[dim.id]} onChange={(e) => setEthics({...ethics, [dim.id]: e.target.value})} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-purple-500 cursor-pointer" />
                </div>
              ))}
            </div>

            <Button 
              onClick={handleFinalSync}
              disabled={isSyncing}
              className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.3em] py-8 rounded-[2rem] hover:bg-purple-500 shadow-2xl transition-all active:scale-[0.98]"
            >
              {isSyncing ? <RefreshCw className="animate-spin" /> : "Sync to Horizon Board"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}