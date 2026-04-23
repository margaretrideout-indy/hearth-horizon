import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CheckCircle2, RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Compass,
  Loader2, Circle, ArrowRight, FlaskConical, Zap,
  RotateCcw, Mountain, Hammer, Sparkles, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';

// ── THANK YOU OVERLAY ────────────────────────────────────────────────────────
const ThankYouOverlay = ({ tier, onClose }) => {
  const messages = {
    seedling: { title: "A Seed is Planted", body: "The gates to the Hearth are open. You are now a Seedling within our forest.", accent: "text-teal-400" },
    hearthkeeper: { title: "The Fire is Lit", body: "Your support keeps the sanctuary warm. Welcome as a Hearthkeeper.", accent: "text-amber-400" },
    steward: { title: "The Vow of the Steward", body: "You have taken oversight of the landscape. We are honored by your commitment.", accent: "text-purple-400" }
  };
  const content = messages[tier?.toLowerCase()] || messages.seedling;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0A080D]/90 backdrop-blur-xl">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full bg-[#110E16] border border-white/10 p-10 md:p-14 rounded-[3rem] text-center relative shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors"><X size={20} /></button>
        <div className="mb-8 flex justify-center opacity-50">
          {tier?.includes('steward') ? <Mountain size={40} className="text-purple-400" /> : <Flame size={40} className="text-amber-400" />}
        </div>
        <h2 className={`text-3xl font-serif italic mb-6 ${content.accent}`}>{content.title}</h2>
        <p className="text-zinc-400 font-serif leading-relaxed italic text-lg mb-10">"{content.body}"</p>
        <button onClick={onClose} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#39FFCA] hover:text-black transition-all">
          Enter The Study
        </button>
      </motion.div>
    </motion.div>
  );
};

// ── RESONANCE DISPLAY ────────────────────────────────────────────────────────
function ResonanceDisplay({ vault, navigate }) {
  const hasLexicon = vault?.lexicon && vault.lexicon.length > 0;
  const hasResume = !!vault?.resume;
  const hasEthics = !!vault?.ethics;
  const archetype = vault?.archetype || (hasResume ? "The Systems Oracle" : null);
  const topVerbs = vault?.lexicon?.slice(0, 3) || [];

  const isFoggy = !hasLexicon && !hasResume && !hasEthics && !archetype;

  if (isFoggy) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0F0D16] to-[#08070B] border border-white/5 rounded-[2.5rem] p-8 space-y-6 text-center">
        {/* Pulsing glow where archetype badge will be */}
        <div className="relative mx-auto w-fit">
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-10 mx-auto rounded-full bg-teal-500/10 border border-teal-500/10 shadow-[0_0_30px_rgba(20,184,166,0.08)] flex items-center justify-center"
          >
            <FlaskConical size={12} className="text-teal-500/30 mr-2" />
            <span className="text-[9px] font-black uppercase tracking-widest text-teal-500/25">Archetype Forming</span>
          </motion.div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-serif italic text-zinc-500">The trail is yet to be blazed.</h3>
          <p className="text-[11px] text-zinc-600 italic font-serif">Your identity awaits in the Smithy.</p>
        </div>
        <button onClick={() => navigate('/library')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-teal-500/20 transition-all">
          <Hammer size={12} /> Enter the Smithy
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#121016] to-[#08070B] border border-teal-500/15 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl space-y-6">
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Archetype */}
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/50 mb-2 flex items-center gap-1">
            <FlaskConical size={9} /> Current Archetype
          </p>
          {archetype ? (
            <h3 className="text-2xl font-serif italic text-white leading-tight">{archetype}</h3>
          ) : (
            <p className="text-sm font-serif italic text-zinc-600">Identity forming...</p>
          )}
        </div>

        {/* Lexicon Mirror */}
        {topVerbs.length > 0 && (
          <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/50 flex items-center gap-1">
              <Zap size={9} /> Lexicon Mirror
            </p>
            <div className="space-y-2">
              {topVerbs.map((phrase, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-teal-950/30 border border-teal-500/10 rounded-xl shadow-[0_0_12px_rgba(20,184,166,0.04)] hover:shadow-[0_0_20px_rgba(20,184,166,0.08)] transition-shadow">
                  <span className="text-[9px] font-black text-teal-500/30 mt-0.5 shrink-0">✦</span>
                  <p className="font-mono text-[11px] text-teal-300 leading-snug italic">
                    {phrase.length > 45 ? phrase.slice(0, 45) + '…' : phrase}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ethics snapshot */}
        {hasEthics && (
          <div className="flex gap-4 pt-2 border-t border-white/5">
            {Object.entries(vault.ethics).slice(0, 3).map(([key, val]) => (
              <div key={key} className="text-center flex-1">
                <div className="text-sm font-black" style={{ color: '#a855f7' }}>{val}%</div>
                <div className="text-[8px] text-zinc-700 uppercase font-black capitalize mt-0.5">{key}</div>
              </div>
            ))}
          </div>
        )}

        {/* Resume status */}
        {hasResume && (
          <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-black uppercase tracking-widest pt-1 border-t border-white/5">
            <CheckCircle2 size={10} className="text-teal-500/60" />
            <span>Legacy archived: <span className="text-zinc-500">{vault.resume.name}</span></span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── EMBERS INDICATOR ─────────────────────────────────────────────────────────
function EmbersIndicator({ navigate }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    base44.entities.EmberPost.list('-created_date', 50).then((posts) => {
      setCount(posts?.length || 0);
    }).catch(() => setCount(0));
  }, []);

  return (
    <button onClick={() => navigate('/embers')}
      className="w-full flex items-center justify-between p-5 bg-orange-500/[0.03] border border-orange-500/10 rounded-2xl hover:border-orange-500/25 transition-all group">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_6px_#f97316]" />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
          {count !== null
            ? `The Embers are glowing with ${count} other${count !== 1 ? 's' : ''}`
            : 'The Embers are glowing...'}
        </span>
      </div>
      <Flame size={14} className="text-orange-500/40 group-hover:text-orange-400 transition-colors" />
    </button>
  );
}

// ── ALIGNMENT ROADMAP ────────────────────────────────────────────────────────
function AlignmentRoadmap({ vault, navigate, onSync, triggerToast }) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const hasLexicon = !!(vault?.archetype || (vault?.lexicon && vault.lexicon.length > 0));
  const hasEthics = !!vault?.ethics;
  const hasHorizon = hasLexicon && hasEthics;
  const progressPct = Math.round(([hasLexicon, hasEthics, hasHorizon].filter(Boolean).length / 3) * 100);
  const topLexicon = vault?.lexicon?.slice(0, 3) || [];
  const ethicsEntries = vault?.ethics ? Object.entries(vault.ethics).sort(([, a], [, b]) => b - a).slice(0, 3) : [];

  const handleResetAlignment = async () => {
    await onSync({ ...vault, archetype: null, ethics: null, lexicon: [], artifact_synthesis: null, alignment_complete: false });
    setShowResetConfirm(false);
    triggerToast("Alignment reset.");
    navigate('/library');
  };

  const steps = [
    {
      id: 'smithy', label: 'Identity Smithy', description: 'Upload your CV and calibrate your values in the Library.',
      icon: Hammer, complete: hasLexicon || !!vault?.resume, route: '/library',
      summary: hasLexicon && topLexicon.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {topLexicon.map((phrase, i) => <span key={i} className="px-2 py-0.5 bg-teal-500/10 border border-teal-500/15 text-teal-300 text-[9px] rounded-full font-semibold">{phrase.length > 22 ? phrase.slice(0, 22) + '…' : phrase}</span>)}
        </div>
      ) : null
    },
    {
      id: 'ethics', label: 'Ethical Compass', description: 'Calibrate your non-negotiables in the Smithy.',
      icon: Compass, complete: hasEthics, route: '/library',
      summary: hasEthics && ethicsEntries.length > 0 ? (
        <div className="flex gap-3 mt-2">
          {ethicsEntries.map(([key, val]) => (
            <div key={key} className="text-center">
              <div className="text-[10px] font-black" style={{ color: '#39FFCA' }}>{val}%</div>
              <div className="text-[8px] text-zinc-600 uppercase font-black capitalize">{key}</div>
            </div>
          ))}
        </div>
      ) : null
    },
    { id: 'horizon', label: 'Horizon Activation', description: 'Unlock your personalized job intelligence board.', icon: Zap, complete: hasHorizon, route: '/horizon' },
  ];

  const nextStep = steps.find(s => !s.complete);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2"><Compass size={14} className="text-purple-400" /><span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Pilgrimage Progress</span></div>
        <span className="text-[10px] font-black tabular-nums" style={{ color: progressPct === 100 ? '#39FFCA' : '#71717a' }}>
          {progressPct === 100 ? <span className="flex items-center gap-1.5"><Zap size={10} className="fill-current" /> SYSTEM PRIMED</span> : `${progressPct}% complete`}
        </span>
      </div>

      <div className="bg-[#0D0B14] border border-white/5 rounded-[2.5rem] p-8 space-y-8">
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #14b8a6, #39FFCA)' }} />
        </div>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className={`flex items-start gap-5 p-5 rounded-[1.5rem] border transition-all ${step.complete ? 'bg-teal-500/[0.04] border-teal-500/15' : 'bg-white/[0.02] border-white/5'}`}>
              <div className="shrink-0 mt-0.5">
                {step.complete
                  ? <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center"><CheckCircle2 size={15} className="text-teal-400" /></div>
                  : <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Circle size={13} className="text-zinc-600" /></div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <step.icon size={12} className={step.complete ? 'text-teal-400' : 'text-zinc-600'} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${step.complete ? 'text-teal-300' : 'text-zinc-500'}`}>{step.label}</span>
                </div>
                <p className="text-[10px] text-zinc-600 italic leading-relaxed">{step.description}</p>
                {step.summary}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <button onClick={() => navigate(hasHorizon ? '/horizon' : (nextStep?.route || '/library'))}
            className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest transition-all active:scale-95"
            style={{ background: hasHorizon ? 'linear-gradient(135deg, #14b8a6, #39FFCA)' : 'rgba(20,184,166,0.08)', color: hasHorizon ? '#0A080D' : '#39FFCA', border: hasHorizon ? 'none' : '1px solid rgba(20,184,166,0.2)' }}>
            {hasHorizon ? 'Enter the Horizon' : 'Continue in the Smithy'} <ArrowRight size={14} />
          </button>

          {!showResetConfirm ? (
            <button onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 text-[9px] text-zinc-600 hover:text-amber-500/60 uppercase font-black tracking-widest flex items-center justify-center gap-2 transition-colors border border-white/5 rounded-xl bg-white/[0.01]">
              <RotateCcw size={10} /> Reset Pilgrimage
            </button>
          ) : (
            <div className="p-4 bg-amber-500/[0.02] border border-amber-500/20 rounded-xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <p className="text-[9px] text-zinc-500 text-center uppercase font-black">Reset cultural data?</p>
              <div className="flex gap-2">
                <button onClick={handleResetAlignment} className="flex-1 py-2 bg-amber-500/20 text-amber-500 text-[9px] font-black uppercase rounded-lg hover:bg-amber-500/30 transition-all">Yes, Reset</button>
                <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2 bg-zinc-800 text-zinc-400 text-[9px] font-black uppercase rounded-lg">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN HEARTH COMPONENT ────────────────────────────────────────────────────
export default function YourHearth({ vault, onSync, onRefresh, onResumeSync }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showSheet, setShowSheet] = useState(false);
  const [confirmZone, setConfirmZone] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successTier, setSuccessTier] = useState('');

  // Stripe & admin notification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('session');
    const urlTier = params.get('tier');
    if (status === 'success' && urlTier) {
      setSuccessTier(urlTier.toLowerCase());
      setShowSuccessOverlay(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    if (vault && vault.notification) {
      setSuccessTier(vault.notification.toLowerCase());
      setShowSuccessOverlay(true);
      const clearFlag = async () => {
        try { await onSync({ ...vault, notification: null }); } catch {}
      };
      clearFlag();
    }
  }, [vault?.notification, onSync]);

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
    <div className="max-w-6xl mx-auto space-y-12 pb-32 page-fade-in relative px-4 md:px-6">

      <AnimatePresence>
        {showSuccessOverlay && <ThankYouOverlay tier={successTier} onClose={() => setShowSuccessOverlay(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ y: 50, opacity: 0, x: "-50%" }} animate={{ y: 0, opacity: 1, x: "-50%" }} exit={{ y: 20, opacity: 0, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-[300] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 border border-white/20">
            <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
              <CheckCircle2 size={12} className="text-white" />
            </div>
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center h-4 relative pt-4">
        <motion.div animate={isRefreshing ? { rotate: 360 } : {}} transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          className="text-teal-500/40 hover:text-teal-500 transition-colors" onClick={handleRefresh} aria-label="Synchronize Hearth">
          <RefreshCw size={22} className="cursor-pointer active:scale-90" />
        </motion.div>
      </div>

      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-2">
          <Flame size={12} className="text-orange-500 animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-200">Fire is Lit</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-sm font-light italic max-w-md mx-auto">Your sanctuary. Reflect, check your resonance, and survey the path ahead.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT: Weather + Pulses */}
        <div className="lg:col-span-5 space-y-10 text-left">

          {/* Internal Weather */}
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
                <button key={p.label} onClick={() => { setSelectedEmoji(p.icon); setShowSheet(true); }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border ${selectedEmoji === p.icon ? 'bg-rose-500/20 border-rose-500 text-white' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10 group'}`}>
                  <span className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</span>
                  <span className="text-[7px] font-black uppercase tracking-tighter">{p.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Hearth Records */}
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

          {/* Embers Indicator */}
          <EmbersIndicator navigate={navigate} />
        </div>

        {/* RIGHT: Resonance + Roadmap */}
        <div className="lg:col-span-7 space-y-8">

          {/* Resonance Display */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Identity Resonance</span>
            </div>
            <ResonanceDisplay vault={vault} navigate={navigate} />
          </div>

          {/* Return to Smithy CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <button onClick={() => navigate('/library')}
              className="w-full flex items-center justify-between px-6 py-4 bg-[#0F0C18] border border-purple-500/10 rounded-2xl hover:border-purple-500/30 transition-all group">
              <div className="flex items-center gap-3">
                <Hammer size={13} className="text-purple-400/50 group-hover:text-purple-400 transition-colors" />
                <span className="text-[11px] font-serif italic text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  Need to sharpen your steel? <span className="text-purple-400">Return to the Smithy.</span>
                </span>
              </div>
              <ArrowRight size={13} className="text-purple-400/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>
          </motion.div>

          {/* Alignment Roadmap */}
          <AlignmentRoadmap vault={vault} navigate={navigate} onSync={onSync} triggerToast={triggerToast} />

          {/* Delete Account */}
          <div className="pt-16">
            <AnimatePresence mode="wait">
              {!confirmZone ? (
                <motion.button key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setConfirmZone('all')}
                  className="text-[10px] text-zinc-600 hover:text-rose-500 uppercase font-black tracking-widest flex items-center gap-2 mx-auto transition-colors">
                  <Trash2 size={12} /> Delete Account
                </motion.button>
              ) : confirmZone === 'all' && (
                <motion.div key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-10 bg-rose-500/[0.02] border border-rose-500/20 rounded-[2.5rem] max-w-sm mx-auto space-y-6 text-center">
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

      {/* Pulse Sheet */}
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