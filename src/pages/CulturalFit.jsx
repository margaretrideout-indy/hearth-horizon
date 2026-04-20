import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Calculator, Search, Shield, Zap, RefreshCw, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom'; // Base44 usually pairs with React Router

const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', icon: Zap, description: 'Balancing extraction with contribution.' },
  { id: 'transparency', label: 'Transparency', icon: Search, description: 'Radical honesty in process and pay.' },
  { id: 'agency', label: 'Personal Agency', icon: Shield, description: 'Autonomy over the migration path.' },
];

export default function CulturalFit({ vault, onComplete }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lexicon'); 
  const [inputPhrase, setInputPhrase] = useState('');
  const [savedLexicon, setSavedLexicon] = useState(vault?.lexicon || []);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ethics, setEthics] = useState(vault?.ethics || { reciprocity: 50, transparency: 50, agency: 50 });

  const alchemize = (phrase) => {
    if (!phrase || phrase.length < 3) return [];
    const p = phrase.toLowerCase();
    const mappings = [
      {
        type: "Technical/Precision",
        triggers: ['data', 'code', 'math', 'iep', 'audit', 'legal', 'safety', 'analysis'],
        steward: "Orchestrating High-Fidelity Integrity",
        architect: "Designing Logic-Bound Frameworks",
        cultivate: "Nurturing Precision-led Accuracy"
      },
      {
        type: "Human/Service",
        triggers: ['client', 'customer', 'student', 'patient', 'guest', 'user', 'team', 'teaching'],
        steward: "Stewarding Transformative Human Experiences",
        architect: "Architecting Empathy-Driven Pathways",
        cultivate: "Cultivating Relational Reciprocity"
      },
      {
        type: "Logistical/Operations",
        triggers: ['inventory', 'schedule', 'flow', 'budget', 'managed', 'process', 'project'],
        steward: "Owning the Vitality of the Operational Arc",
        architect: "Synthesizing Efficiency into Sustainable Flow",
        cultivate: "Nurturing Ecosystem Resiliency"
      }
    ];
    const match = mappings.find(m => m.triggers.some(t => p.includes(t)));
    return [
      { hearth: match ? match.steward : "Stewarding Purpose-Led Outcomes", context: "REPLACING 'DOING TASKS' WITH OWNERSHIP OF IMPACT." },
      { hearth: match ? match.architect : "Architecting Systematic Clarity", context: "REPLACING 'EXECUTING' WITH DESIGNING THE PATH." },
      { hearth: match ? match.cultivate : "Cultivating Sustainable Growth", context: "REPLACING 'REPORTING' WITH NURTURING HEALTH." }
    ];
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    if (!savedLexicon.includes(text)) setSavedLexicon(prev => [...prev, text]);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFinalSync = async () => {
    setIsSyncing(true);
    try {
      // PERSIST TO BASE44 VAULT
      await base44.entities.Vault.update(vault.id, {
        ethics: ethics,
        lexicon: savedLexicon,
        alignment_complete: true,
        last_alignment_date: new Date().toISOString()
      });

      if (onComplete) onComplete({ ethics, lexicon: savedLexicon });

      // TRIGGER NAVIGATION TO HORIZON BOARD
      navigate("/horizon-board"); 

    } catch (err) {
      console.error("Vault Sync Error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen selection:bg-teal-500/30">
      
      {/* TABS HEADER */}
      <div className="flex gap-10 mb-16 border-b border-white/5 relative">
        <button onClick={() => setActiveTab('lexicon')} className={`pb-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === 'lexicon' ? 'text-teal-400' : 'text-zinc-600 hover:text-zinc-400'}`}>
          Lexicon Alchemist
          {activeTab === 'lexicon' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_10px_#14b8a6]" />}
        </button>
        <button onClick={() => setActiveTab('ethics')} className={`pb-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all relative ${activeTab === 'ethics' ? 'text-purple-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
          Ethics Calculator
          {activeTab === 'ethics' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 shadow-[0_0_10px_#a855f7]" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'lexicon' ? (
          <motion.div key="lexicon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-serif italic text-white tracking-tight leading-tight text-glow">The Translation Engine</h2>
              <div className="relative group max-w-2xl mt-8">
                <Input value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="e.g. Managed IEPs for high-schoolers..." className="bg-white/[0.03] border-white/10 h-20 rounded-3xl pl-16 text-xl text-zinc-200 focus:border-teal-500/40" />
                <RefreshCw size={24} className="absolute left-6 top-7 text-teal-500/30 group-hover:rotate-180 transition-all duration-700" />
              </div>
            </div>

            <div className="grid gap-6">
              {alchemize(inputPhrase).map((s, i) => (
                <div key={i} className="group flex items-center justify-between p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] hover:border-teal-500/30 hover:bg-white/[0.03] transition-all">
                  <div className="space-y-2">
                    <span className="text-teal-400 font-serif italic text-2xl leading-tight block">{s.hearth}</span>
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.25em]">{s.context}</p>
                  </div>
                  <button onClick={() => handleCopy(s.hearth, i)} className={`p-5 rounded-2xl transition-all ${copiedIndex === i ? 'bg-teal-500 text-black shadow-[0_0_20px_#14b8a666]' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}`}>
                    {copiedIndex === i ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              ))}
            </div>

            {savedLexicon.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 p-8 bg-teal-500/[0.02] border border-teal-500/10 rounded-[3rem]">
                <span className="text-[10px] font-black uppercase text-teal-500/60 tracking-[0.4em] mb-6 block">Your Synthesized Identity</span>
                <div className="flex flex-wrap gap-3">
                  {savedLexicon.map((word, idx) => (
                    <span key={idx} className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs rounded-full font-bold">{word}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div key="ethics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-16 max-w-2xl">
            <h2 className="text-5xl font-serif italic text-white tracking-tight">Values Alignment</h2>
            <div className="space-y-14">
              {VALUE_DIMENSIONS.map((dim) => (
                <div key={dim.id} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20"><dim.icon size={24} className="text-purple-400" /></div>
                      <span className="text-sm font-black uppercase tracking-widest text-zinc-200">{dim.label}</span>
                    </div>
                    <span className="text-xs font-mono text-purple-400">{ethics[dim.id]}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={ethics[dim.id]} onChange={(e) => setEthics({...ethics, [dim.id]: e.target.value})} className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer" />
                </div>
              ))}
            </div>

            <Button 
              onClick={handleFinalSync}
              disabled={isSyncing}
              className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.3em] py-9 rounded-[2.5rem] hover:bg-purple-500 shadow-[0_20px_50px_#a855f726] transition-all active:scale-[0.98]"
            >
              {isSyncing ? <RefreshCw className="animate-spin" size={24} /> : "Sync and go to Horizon Board"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}