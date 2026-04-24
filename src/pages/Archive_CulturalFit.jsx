// ARCHIVED — Component preserved but removed from active routes.
// Original path: pages/CulturalFit.jsx
// Archived: 2026-04-24
// Reason: Identity calibration tools consolidated into Library > High Forge.
//
// To restore: import this file in App.jsx and add a Route for /culture.

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

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  useEffect(() => {
    if (!inputPhrase || inputPhrase.length < 3) { setResults([]); return; }
    setIsAlchemizing(true);
    const handler = setTimeout(async () => {
      try {
        const res = await base44.functions.invoke('alchemizeLexicon', { phrase: inputPhrase, resumeContext, ethics });
        const newIdentities = res.data?.identities || [];
        setResults(newIdentities);
        if (newIdentities.length > 0) {
          const phrasesToSave = newIdentities.map(item => item.hearth);
          setSavedLexicon(prev => { const uniqueNew = phrasesToSave.filter(p => !prev.includes(p)); return [...prev, ...uniqueNew]; });
        }
      } catch {
        const fallbacks = localAlchemize(inputPhrase);
        setResults(fallbacks);
        const phrasesToSave = fallbacks.map(item => item.hearth);
        setSavedLexicon(prev => { const uniqueNew = phrasesToSave.filter(p => !prev.includes(p)); return [...prev, ...uniqueNew]; });
      } finally { setIsAlchemizing(false); }
    }, 800);
    return () => clearTimeout(handler);
  }, [inputPhrase]);

  useEffect(() => {
    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      if (savedLexicon.length === 0 && !vault?.ethics) return;
      try {
        await base44.auth.updateMe({ lexicon: savedLexicon, ethics });
        if (onSync) onSync({ ...vault, lexicon: savedLexicon, ethics });
        showToast("Data synced to Hearth.");
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
    showToast("Copied to clipboard.");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFinalSync = async () => {
    setIsSyncing(true);
    try {
      await base44.auth.updateMe({ lexicon: savedLexicon, ethics, alignment_complete: true });
      if (onSync) onSync({ ...vault, lexicon: savedLexicon, ethics, alignment_complete: true });
      showToast("✦ Alignment mirrored to your Hearth.");
      setTimeout(() => navigate('/horizon'), 1400);
    } catch (err) { console.error("Vault Sync Error:", err); }
    finally { setIsSyncing(false); }
  };

  const identityColors = { Steward: 'teal', Architect: 'purple', Cultivator: 'amber' };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen selection:bg-teal-500/30">
      <Toast message={toast} visible={!!toast} />
      {resumeContext && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-10 px-5 py-3 rounded-2xl bg-teal-500/5 border border-teal-500/15 flex items-center gap-3">
          <Sparkles size={14} className="text-teal-400 shrink-0" />
          <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Resume detected — Alchemy will draw from your Legacy Archive.</p>
        </motion.div>
      )}
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
      {/* Full body content preserved but omitted from active routing */}
    </div>
  );
}