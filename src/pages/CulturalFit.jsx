import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, Shield, Zap, RefreshCw, Search, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', icon: Zap, description: 'Balancing extraction with contribution.' },
  { id: 'transparency', label: 'Transparency', icon: Search, description: 'Radical honesty in process and pay.' },
  { id: 'agency', label: 'Personal Agency', icon: Shield, description: 'Autonomy over the migration path.' },
];

const ResultSkeleton = () => (
  <div className="space-y-4">
    {[0, 1, 2].map(i => (
      <div key={i} className="p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] animate-pulse">
        <div className="h-6 bg-white/5 rounded-xl w-3/4 mb-3" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const Toast = ({ message, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        initial={{ y: 50, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        exit={{ y: 20, opacity: 0, x: '-50%' }}
        className="fixed bottom-28 left-1/2 z-[300] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3"
      >
        <CheckCircle2 size={14} className="text-teal-600" />
        {message}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function CulturalFit({ vault, onComplete, onSync }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('lexicon');
  const [inputPhrase, setInputPhrase] = useState('');
  const [isAlchemizing, setIsAlchemizing] = useState(false);
  const [results, setResults] = useState([]);
  const [savedLexicon, setSavedLexicon] = useState(vault?.lexicon || []);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [ethics, setEthics] = useState(vault?.ethics || { reciprocity: 50, transparency: 50, agency: 50 });
  const [toast, setToast] = useState(null);
  const autoSaveTimer = useRef(null);

  const resumeContext = vault?.bridge_analysis || vault?.resume?.name || null;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Debounced LLM alchemy
  useEffect(() => {
    if (!inputPhrase || inputPhrase.length < 3) {
      setResults([]);
      return;
    }
    setIsAlchemizing(true);
    const handler = setTimeout(async () => {
      try {
        const res = await base44.functions.invoke('alchemizeLexicon', {
          phrase: inputPhrase,
          resumeContext,
          ethics,
        });
        setResults(res.data?.identities || []);
      } catch {
        // fallback to local mapping
        setResults(localAlchemize(inputPhrase));
      } finally {
        setIsAlchemizing(false);
      }
    }, 800);
    return () => clearTimeout(handler);
  }, [inputPhrase]);

  // Auto-save lexicon + ethics debounced
  useEffect(() => {
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      if (savedLexicon.length === 0 && !vault?.ethics) return;
      try {
        await base44.auth.updateMe({ lexicon: savedLexicon, ethics });
        if (onSync) onSync({ ...vault, lexicon: savedLexicon, ethics });
      } catch { /* silent */ }
    }, 2000);
    return () => clearTimeout(autoSaveTimer.current);
  }, [savedLexicon, ethics]);

  const localAlchemize = (phrase) => {
    const p = phrase.toLowerCase();
    const mappings = [
      { triggers: ['data', 'code', 'audit', 'iep', 'legal', 'safety', 'analysis'], steward: "Orchestrating High-Fidelity Integrity", architect: "Designing Logic-Bound Frameworks", cultivate: "Nurturing Precision-led Accuracy" },
      { triggers: ['client', 'student', 'patient', 'guest', 'user', 'team', 'teaching'], steward: "Stewarding Transformative Human Experiences", architect: "Architecting Empathy-Driven Pathways", cultivate: "Cultivating Relational Reciprocity" },
      { triggers: ['inventory', 'schedule', 'budget', 'managed', 'process', 'project'], steward: "Owning the Vitality of the Operational Arc", architect: "Synthesizing Efficiency into Sustainable Flow", cultivate: "Nurturing Ecosystem Resiliency" },
    ];
    const match = mappings.find(m => m.triggers.some(t => p.includes(t)));
    return [
      { type: "Steward", hearth: match?.steward || "Stewarding Purpose-Led Outcomes", context: "Replacing 'doing tasks' with ownership of impact." },
      { type: "Architect", hearth: match?.architect || "Architecting Systematic Clarity", context: "Replacing 'executing' with designing the path." },
      { type: "Cultivator", hearth: match?.cultivate || "Cultivating Sustainable Growth", context: "Replacing 'reporting' with nurturing health." },
    ];
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    if (!savedLexicon.includes(text)) {
      setSavedLexicon(prev => [...prev, text]);
      showToast("Added to your Lexicon.");
    }
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFinalSync = async () => {
    setIsSyncing(true);
    try {
      await base44.auth.updateMe({ lexicon: savedLexicon, ethics, alignment_complete: true });
      if (onSync) onSync({ ...vault, lexicon: savedLexicon, ethics, alignment_complete: true });
      showToast("Alignment synced to Hearth.");
      setTimeout(() => navigate('/horizon'), 1200);
    } catch (err) {
      console.error("Vault Sync Error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const identityColors = { Steward: 'teal', Architect: 'purple', Cultivator: 'amber' };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen selection:bg-teal-500/30">
      <Toast message={toast} visible={!!toast} />

      {/* PRE-POPULATE NOTICE */}
      {resumeContext && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-10 px-5 py-3 rounded-2xl bg-teal-500/5 border border-teal-500/15 flex items-center gap-3">
          <Sparkles size={14} className="text-teal-400 shrink-0" />
          <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">
            Resume detected — Alchemy will draw from your Legacy Archive.
          </p>
        </motion.div>
      )}

      {/* TABS */}
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
          <motion.div key="lexicon" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12 pb-20">
            <div className="space-y-4">
              <h2 className="text-5xl font-serif italic text-white tracking-tight leading-tight">Lexicon Alchemist</h2>
              <p className="text-zinc-500 text-sm font-light italic">Enter your old-world responsibilities. The AI will synthesize your Steward, Architect, and Cultivator identities.</p>
              <div className="relative group max-w-2xl mt-8">
                <Input
                  value={inputPhrase}
                  onChange={(e) => setInputPhrase(e.target.value)}
                  placeholder="e.g. Managed IEPs for 25 students..."
                  className="bg-white/[0.03] border-white/10 h-20 rounded-3xl pl-16 text-xl text-zinc-200 focus:border-teal-500/40"
                />
                <RefreshCw size={24} className={`absolute left-6 top-7 text-teal-500/30 transition-all duration-700 ${isAlchemizing ? 'animate-spin text-teal-400' : 'group-hover:rotate-180'}`} />
              </div>
            </div>

            {isAlchemizing ? (
              <ResultSkeleton />
            ) : results.length > 0 ? (
              <div className="grid gap-6">
                {results.map((s, i) => {
                  const colorKey = identityColors[s.type] || 'teal';
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className={`group flex items-center justify-between p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] hover:border-${colorKey}-500/30 transition-all`}>
                      <div className="space-y-2 flex-1">
                        <span className={`text-[9px] font-black uppercase tracking-[0.4em] text-${colorKey}-500/60`}>{s.type}</span>
                        <span className={`text-${colorKey}-400 font-serif italic text-2xl leading-tight block`}>{s.hearth}</span>
                        <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.25em]">{s.context}</p>
                      </div>
                      <button onClick={() => handleCopy(s.hearth, i)} className={`p-5 rounded-2xl ml-4 transition-all shrink-0 ${copiedIndex === i ? 'bg-teal-500 text-black shadow-[0_0_20px_#14b8a666]' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}`}>
                        {copiedIndex === i ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="p-20 text-center border border-dashed border-white/5 rounded-[3rem]">
                <p className="text-zinc-700 font-black uppercase tracking-[0.5em] text-[10px]">Awaiting Synthesis...</p>
              </div>
            )}

            {savedLexicon.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/5">
                <span className="text-[10px] font-black uppercase text-teal-500/60 tracking-[0.4em] block">Your Lexicon ({savedLexicon.length} phrases)</span>
                <div className="flex flex-wrap gap-3">
                  {savedLexicon.slice(0, 10).map((word, idx) => (
                    <span key={idx} className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs rounded-full font-bold">
                      {word.length > 30 ? word.substring(0, 30) + '…' : word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={() => setActiveTab('ethics')} className="group bg-white/5 border border-white/10 hover:border-purple-500/50 text-white font-black uppercase tracking-[0.2em] px-10 h-16 rounded-3xl transition-all">
                Next: Ethics Calculator <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ethics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-16 max-w-2xl pb-20">
            <div className="space-y-2">
              <h2 className="text-5xl font-serif italic text-white tracking-tight">Ethics Calculator</h2>
              <p className="text-zinc-500 text-sm font-light italic">Auto-saving as you calibrate.</p>
            </div>
            <div className="space-y-14">
              {VALUE_DIMENSIONS.map((dim) => (
                <div key={dim.id} className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20"><dim.icon size={24} className="text-purple-400" /></div>
                      <div>
                        <span className="text-sm font-black uppercase tracking-widest text-zinc-200 block">{dim.label}</span>
                        <span className="text-[10px] text-zinc-600 italic">{dim.description}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-purple-400">{ethics[dim.id]}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100"
                    value={ethics[dim.id]}
                    onChange={(e) => setEthics({ ...ethics, [dim.id]: Number(e.target.value) })}
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handleFinalSync}
              disabled={isSyncing}
              className="w-full bg-purple-600 text-white font-black uppercase tracking-[0.2em] py-9 rounded-[2.5rem] hover:bg-purple-500 shadow-[0_20px_50px_#a855f726] transition-all active:scale-[0.98]"
            >
              {isSyncing
                ? <><Loader2 className="animate-spin mr-3" size={20} />Syncing to Hearth...</>
                : <>Sync & Navigate to Horizon <ArrowRight size={18} className="ml-3" /></>
              }
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}