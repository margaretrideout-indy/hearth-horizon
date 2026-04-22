import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Compass,
  Loader2, Circle, ArrowRight, FlaskConical, Zap,
  Sparkles, Copy, Search
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function YourHearth({ vault, onSync, onRefresh, onResumeSync }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showSheet, setShowSheet] = useState(false); 
  const [confirmZone, setConfirmZone] = useState(null); 
  const [showToast, setShowToast] = useState(false);

  const pulseOptions = [
    { icon: "🌱", label: "Growing" },
    { icon: "🔥", label: "Stretched" },
    { icon: "🌊", label: "Flowing" },
    { icon: "☁️", label: "Cloudy" },
    { icon: "💎", label: "Resilient" }
  ];

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await onResumeSync?.(file);
      triggerToast("Professional Legacy Secured.");
    } catch (error) {
      triggerToast("Sync failed. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    else await new Promise(resolve => setTimeout(resolve, 1200));
    setIsRefreshing(false);
    triggerToast("Sanctuary synchronized.");
  };

  const handleSavePulse = async () => {
    if (!reflection && !selectedEmoji) return;
    const newPulse = { date: new Date().toISOString(), emoji: selectedEmoji, text: reflection };
    await onSync({ ...vault, pulses: [newPulse, ...(vault.pulses || [])] });
    setReflection("");
    setSelectedEmoji(null);
    setShowSheet(false);
    triggerToast("Hearth-Pulse captured.");
  };

  const handleFullWipe = async () => {
    await onSync({ ...vault, pulses: [], resume: null, archetype: null, alignmentScore: 0, lexicon: [], ethics: null }); 
    triggerToast("Hearth extinguished.");
    setConfirmZone(null);
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-1000 relative px-4 md:px-6">
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0, x: "-50%" }} animate={{ y: 0, opacity: 1, x: "-50%" }} exit={{ y: 20, opacity: 0, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-[300] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                <CheckCircle2 size={12} className="text-white" />
            </div>
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* REFRESH CONTROL */}
      <div className="flex justify-center h-4 relative pt-4">
        <motion.div 
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          className="text-teal-500/40 hover:text-teal-500 transition-colors"
          onClick={handleRefresh}
        >
          <RefreshCw size={22} className="cursor-pointer active:scale-90" />
        </motion.div>
      </div>

      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-2">
            <Flame size={12} className="text-orange-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-200">Fire is Lit</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-sm font-light italic max-w-md mx-auto">A digital sanctuary for reflection, legacy archiving, and internal alignment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COL: THE IDENTITY */}
        <div className="lg:col-span-5 space-y-10 text-left">
          
          {/* INTERNAL WEATHER */}
          <section className="bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="flex justify-between items-start px-2">
                <div className="flex items-center gap-2">
                    <Activity size={18} className="text-rose-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Internal Weather</span>
                </div>
                <Lock size={12} className="text-rose-400 opacity-40" />
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {pulseOptions.map((p) => (
                <button 
                  key={p.label} 
                  onClick={() => { setSelectedEmoji(p.icon); setShowSheet(true); }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border ${
                    selectedEmoji === p.icon 
                      ? 'bg-rose-500/20 border-rose-500 text-white' 
                      : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 group'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</span>
                  <span className="text-[7px] font-black uppercase tracking-tighter">{p.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* HEARTH RECORDS */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-2 text-zinc-500">
                <History size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Hearth Records</span>
            </div>
            <div className="space-y-4">
              {vault?.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-5 items-center">
                    <div className="text-2xl">{p.emoji}</div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-300 italic line-clamp-2">"{p.text}"</p>
                      <p className="text-[8px] text-zinc-500 uppercase font-black mt-2">{new Date(p.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border border-dashed border-white/5 rounded-[2rem] text-zinc-600 uppercase font-black text-[10px]">No pulses captured.</div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem]">
              <div className="flex flex-col gap-6 text-left">
                <div className="flex items-center gap-3"><FileText className="text-teal-500" size={20} /><h3 className="text-lg font-bold text-white">Legacy Archive</h3></div>
                
                {!vault?.resume ? (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/5 hover:border-teal-500/20 rounded-[2rem] bg-black/40 cursor-pointer group transition-all relative overflow-hidden">
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="text-teal-500 animate-spin" size={24} />
                        <span className="text-[10px] font-black uppercase text-teal-500 animate-pulse">Archiving...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-zinc-600 mb-2 group-hover:text-teal-500" size={20} />
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest text-center px-4">Upload Resume / CV</span>
                        <p className="text-[8px] text-zinc-600 uppercase mt-2 font-black">PDF, DOCX supported</p>
                      </>
                    )}
                    <input type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} />
                  </label>
                ) : (
                  <div className="p-6 rounded-[2rem] bg-teal-500/5 border border-teal-500/20 text-center">
                    <CheckCircle2 className="text-teal-500 mx-auto mb-3" size={28} />
                    <h4 className="text-white font-bold uppercase text-[10px] tracking-widest">Legacy Secured</h4>
                    <p className="text-[9px] text-zinc-500 mt-1 italic line-clamp-1">{vault.resume.name}</p>
                    <div className="mt-6 flex justify-center gap-2">
                      <label className="inline-flex items-center gap-2 text-[8px] font-black uppercase text-zinc-300 hover:text-white cursor-pointer border border-white/10 px-3 py-2 rounded-full">
                        <RefreshCw size={10} /> Replace
                        <input type="file" className="hidden" onChange={handleFileChange} />
                      </label>
                      <button onClick={() => setConfirmZone('archive')} className="inline-flex items-center gap-2 text-[8px] font-black uppercase text-zinc-500 hover:text-rose-400 border border-white/5 px-3 py-2 rounded-full">
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <ArtifactResonance vault={vault} />
            <LexiconArtifacts vault={vault} triggerToast={triggerToast} />
          </div>
        </div>

        {/* RIGHT COL: THE DIRECTION */}
        <div className="lg:col-span-7 space-y-8">
          <AlignmentRoadmap vault={vault} navigate={navigate} onSync={onSync} triggerToast={triggerToast} />

          {/* DANGER ZONES */}
          <div className="pt-20">
            <AnimatePresence mode="wait">
              {!confirmZone ? (
                <motion.button 
                  key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setConfirmZone('all')} 
                  className="text-[10px] text-zinc-600 hover:text-rose-500 uppercase font-black tracking-widest flex items-center gap-2 mx-auto transition-colors"
                >
                  <Trash2 size={12} /> Delete Account
                </motion.button>
              ) : confirmZone === 'all' && (
                <motion.div 
                  key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-10 bg-rose-500/[0.02] border border-rose-500/20 rounded-[2.5rem] max-w-sm mx-auto space-y-6 text-center"
                >
                  <AlertTriangle className="text-rose-500 mx-auto" size={32} />
                  <div className="space-y-2">
                    <h5 className="text-white font-black uppercase text-xs tracking-tighter">Delete Account?</h5>
                    <p className="text-[10px] text-zinc-500 italic">Wipe EVERYTHING. This cannot be undone.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button onClick={handleFullWipe} className="bg-rose-500 text-white font-black uppercase w-full rounded-xl">Confirm Destruction</Button>
                    <Button onClick={() => setConfirmZone(null)} variant="ghost" className="text-zinc-500 uppercase text-[10px] font-black">Cancel</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* PULSE SHEET */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSheet(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3.5rem] z-[210] p-8 pb-16 shadow-2xl">
              <div className="max-w-xl mx-auto space-y-10 text-center">
                <div className="space-y-2">
                    <span className="text-5xl">{selectedEmoji}</span>
                    <h3 className="text-3xl font-serif italic text-white">Adding Depth</h3>
                </div>
                <Textarea placeholder="How does the journey feel?" value={reflection} onChange={(e) => setReflection(e.target.value)} className="bg-black/40 border-white/5 rounded-2xl p-6 text-white italic min-h-[150px] outline-none" />
                <Button onClick={handleSavePulse} className="w-full h-16 bg-teal-500 text-black font-black uppercase rounded-2xl shadow-xl">Seal Pulse</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LexiconArtifacts({ vault, triggerToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!vault?.lexicon || vault.lexicon.length === 0) return null;

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    triggerToast("Artifact copied to clipboard.");
  };

  const filteredLexicon = vault.lexicon.filter(phrase => 
    phrase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-zinc-500">
            <Zap size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Alchemized Phrases</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative group px-2">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-teal-500 transition-colors" size={12} />
        <input 
          type="text"
          placeholder="Search artifacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-9 pr-4 text-[10px] text-zinc-300 focus:outline-none focus:border-teal-500/30 transition-all placeholder:text-zinc-700"
        />
      </div>

      <div className="grid gap-3">
        {filteredLexicon.map((phrase, i) => (
          <div key={i} className="group relative p-5 bg-white/[0.02] border border-white/5 rounded-[1.5rem] hover:border-teal-500/20 transition-all">
            <div className="flex justify-between items-start gap-4">
              <p className="text-[11px] text-zinc-300 italic leading-relaxed pr-8">"{phrase}"</p>
              <button 
                onClick={() => copy(phrase)}
                className="shrink-0 p-2 bg-zinc-900 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:text-teal-400 text-zinc-500"
              >
                <Copy size={12} />
              </button>
            </div>

            {/* RESUME BRIDGE: Dynamic logic based on vault data */}
            {vault?.resume && (
               <div className="mt-4 pt-4 border-t border-white/[0.03] space-y-2">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-amber-500/60">
                    <FileText size={10} />
                    <span>Bridge to Legacy</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-snug">
                    This resonance bridges your experience in <span className="text-zinc-300 font-medium">"{vault.resume.name}"</span> to modern organizational needs. Use it in interview loops to anchor your value.
                  </p>
               </div>
            )}
          </div>
        ))}

        {filteredLexicon.length === 0 && (
          <p className="text-[10px] text-zinc-600 italic text-center py-4">No matching phrases found.</p>
        )}
      </div>
    </div>
  );
}

function ArtifactResonance({ vault }) {
  if (!vault?.resume) return null;

  const resonance = vault?.artifact_synthesis || {
    archetype: "The Systems Oracle",
    translations: [
      { old: "Command & Control", new: "Strategic Operations" },
      { old: "Multi-Theater Logistics", new: "Global Supply Chain" }
    ],
    runes: ["Cloud Architecture", "Agile Flow"]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#121016] to-[#08070B] border border-teal-500/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl text-left"
    >
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/5 blur-[80px] rounded-full" />
      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-teal-400/60"><FlaskConical size={14} /><span className="text-[10px] font-black uppercase tracking-[0.2em]">Resonance</span></div>
          <span className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full border bg-teal-500/10 text-teal-400 border-teal-500/20">Synthesized</span>
        </div>
        <div>
          <h3 className="text-2xl font-serif italic text-white leading-tight">{resonance.archetype}</h3>
          <p className="text-[8px] text-zinc-500 uppercase font-black mt-2 tracking-widest flex items-center gap-2"><Circle size={4} className="fill-teal-500 text-teal-500" /> Identity Extracted</p>
        </div>
        <div className="space-y-3">
           {resonance.translations.map((t, i) => (
             <div key={i} className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                <span className="text-[8px] text-rose-400/40 line-through uppercase font-black">{t.old}</span>
                <ArrowRight size={10} className="text-zinc-700" />
                <span className="text-[9px] text-teal-400 uppercase font-black">{t.new}</span>
             </div>
           ))}
        </div>
        <div className="pt-2 flex flex-wrap gap-2">
          {resonance.runes.map((rune, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <div className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[7px] text-purple-300 font-black uppercase tracking-widest">{rune}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AlignmentRoadmap({ vault, navigate, onSync, triggerToast }) {
  const hasLexicon = !!(vault?.archetype || (vault?.lexicon && vault.lexicon.length > 0));
  const hasEthics = !!vault?.ethics;
  const hasHorizon = hasLexicon && hasEthics;
  const progressPct = Math.round(([hasLexicon, hasEthics, hasHorizon].filter(Boolean).length / 3) * 100);

  const topLexicon = vault?.lexicon?.slice(0, 3) || [];
  const ethicsEntries = vault?.ethics ? Object.entries(vault.ethics).sort(([, a], [, b]) => b - a).slice(0, 3) : [];

  const steps = [
    { id: 'lexicon', label: 'Lexicon Alchemy', description: 'Translate your experience into private-sector language.', icon: FlaskConical, complete: hasLexicon, route: '/culture', summary: hasLexicon && topLexicon.length > 0 ? (
      <div className="flex flex-wrap gap-1.5 mt-2">{topLexicon.map((phrase, i) => <span key={i} className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/15 text-teal-300 text-[9px] rounded-full font-semibold">{phrase}</span>)}</div>
    ) : null },
    { id: 'ethics', label: 'Ethical Compass', description: 'Calibrate your non-negotiables and values profile.', icon: Compass, complete: hasEthics, route: '/culture', summary: hasEthics && ethicsEntries.length > 0 ? (
      <div className="flex gap-3 mt-2">{ethicsEntries.map(([key, val]) => <div key={key} className="text-center"><div className="text-[10px] font-black" style={{ color: '#39FFCA' }}>{val}%</div><div className="text-[8px] text-zinc-600 uppercase font-black capitalize">{key}</div></div>)}</div>
    ) : null },
    { id: 'horizon', label: 'Horizon Activation', description: 'Unlock your personalized job intelligence board.', icon: Zap, complete: hasHorizon, route: '/horizon' },
  ];

  const nextStep = steps.find(s => !s.complete);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between px-2 text-left">
        <div className="flex items-center gap-2"><Compass size={14} className="text-purple-400" /><span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Alignment Snapshot</span></div>
        <span className="text-[10px] font-black tabular-nums" style={{ color: progressPct === 100 ? '#39FFCA' : '#71717a' }}>
          {progressPct === 100 ? <span className="flex items-center gap-1.5"><Zap size={10} className="fill-current" /> SYSTEM PRIMED</span> : `${progressPct}% complete`}
        </span>
      </div>

      <div className="bg-[#0D0B14] border border-white/5 rounded-[2.5rem] p-8 space-y-8 text-left">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #14b8a6, #39FFCA)' }} />
        </div>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className={`flex items-start gap-5 p-5 rounded-[1.5rem] border transition-all ${step.complete ? 'bg-teal-500/[0.04] border-teal-500/15' : 'bg-white/[0.02] border-white/5'}`}>
              <div className="shrink-0 mt-0.5">{step.complete ? <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center"><CheckCircle2 size={15} className="text-teal-400" /></div> : <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Circle size={13} className="text-zinc-600" /></div>}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5"><step.icon size={12} className={step.complete ? 'text-teal-400' : 'text-zinc-600'} /><span className={`text-[10px] font-black uppercase tracking-widest ${step.complete ? 'text-teal-300' : 'text-zinc-500'}`}>{step.label}</span></div>
                <p className="text-[10px] text-zinc-600 italic leading-relaxed">{step.description}</p>
                {step.summary}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => navigate(hasHorizon ? '/horizon' : nextStep.route)} className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all shadow-xl active:scale-95" style={{ background: hasHorizon ? 'linear-gradient(135deg, #14b8a6, #39FFCA)' : 'rgba(20,184,166,0.08)', color: hasHorizon ? '#0A080D' : '#39FFCA', border: hasHorizon ? 'none' : '1px solid rgba(20,184,166,0.2)' }}>
          {hasHorizon ? 'Enter the Horizon' : 'Continue the Ritual'}<ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}