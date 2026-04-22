import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Compass,
  Loader2, Circle, ArrowRight, FlaskConical, Zap,
  Sparkles, Copy, Search, RotateCcw, Leaf, Mountain
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

// ── THANK YOU OVERLAY COMPONENT ─────────────────────────────────────────────
const ThankYouOverlay = ({ tier, onClose }) => {
  const messages = {
    seedling: {
      title: "A Seed is Planted",
      body: "The gates to the Hearth are open. You are now a Seedling within our forest.",
      accent: "text-teal-400"
    },
    hearthkeeper: {
      title: "The Fire is Lit",
      body: "Your support keeps the sanctuary warm. Welcome as a Hearthkeeper.",
      accent: "text-amber-400"
    },
    steward: {
      title: "The Vow of the Steward",
      body: "You have taken oversight of the landscape. We are honored by your commitment.",
      accent: "text-purple-400"
    }
  };

  const content = messages[tier?.toLowerCase()] || messages.seedling;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0A080D]/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full bg-[#110E16] border border-white/10 p-10 md:p-14 rounded-[3rem] text-center relative shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors">
          <X size={20} />
        </button>
        <div className="mb-8 flex justify-center opacity-50">
           {tier?.includes('steward') ? <Mountain size={40} className="text-purple-400"/> : <Flame size={40} className="text-amber-400"/>}
        </div>
        <h2 className={`text-3xl font-serif italic mb-6 ${content.accent}`}>{content.title}</h2>
        <p className="text-zinc-400 font-serif leading-relaxed italic text-lg mb-10">"{content.body}"</p>
        <button 
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#39FFCA] hover:text-black transition-all"
        >
          Enter The Study
        </button>
      </motion.div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function YourHearth({ vault, onSync, onRefresh, onResumeSync }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showSheet, setShowSheet] = useState(false); 
  const [confirmZone, setConfirmZone] = useState(null); 
  const [showToast, setShowToast] = useState(false);
  
  // New: Payment Success State
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successTier, setSuccessTier] = useState('');

  // ── STRIPE REDIRECT LISTENER ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('session');
    const tier = params.get('tier');

    if (status === 'success' && tier) {
      setSuccessTier(tier.toLowerCase());
      setShowSuccessOverlay(true);

      // Clean the URL so refreshing doesn't trigger it again
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

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

  const handleFileChange = async ( e) => {
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
      
      {/* PAYMENT SUCCESS OVERLAY */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <ThankYouOverlay 
            tier={successTier} 
            onClose={() => setShowSuccessOverlay(false)} 
          />
        )}
      </AnimatePresence>

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
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest text-center px-4">Upload Resume / CV for Analysis</span>
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

// ... (Sub-components LexiconArtifacts, ArtifactResonance, AlignmentRoadmap stay the same as your provided code)