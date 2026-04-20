import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Compass,
  Loader2 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import AlignmentWidgets from '@/components/hearth/AlignmentWidgets';

export default function YourHearth({ vault, onSync, onRefresh, onResumeSync }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showSheet, setShowSheet] = useState(false); 
  const [confirmZone, setConfirmZone] = useState(null); // 'archive' or 'all'
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
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    setIsRefreshing(false);
    triggerToast("Sanctuary synchronized.");
  };

  const handleSavePulse = async () => {
    if (!reflection && !selectedEmoji) return;
    const newPulse = {
      date: new Date().toISOString(),
      emoji: selectedEmoji,
      text: reflection
    };
    await onSync({ ...vault, pulses: [newPulse, ...(vault.pulses || [])] });
    setReflection("");
    setSelectedEmoji(null);
    setShowSheet(false);
    triggerToast("Hearth-Pulse captured.");
  };

  const handleFullWipe = async () => {
    await onSync({ ...vault, pulses: [], resume: null, archetype: null, alignmentScore: 0 }); 
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
        
        {/* LEFT COL: PULSES & WEATHER */}
        <div className="lg:col-span-5 space-y-8">
          {/* IMMEDIATE INTERNAL WEATHER SELECTION */}
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
                  onClick={() => {
                    setSelectedEmoji(p.icon);
                    setShowSheet(true);
                  }}
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
            <p className="text-center text-[9px] text-zinc-600 font-black uppercase tracking-widest italic">Tap to etch a pulse</p>
          </section>

          {/* HEARTH RECORDS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2 text-zinc-500">
                <div className="flex items-center gap-2">
                    <History size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Hearth Records</span>
                </div>
            </div>
            <div className="space-y-4">
              {vault?.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-5 items-center">
                    <div className="text-2xl">{p.emoji}</div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-300 italic line-clamp-2">{p.text}</p>
                      <p className="text-[8px] text-zinc-500 uppercase font-black mt-2">{new Date(p.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border border-dashed border-white/5 rounded-[2rem] text-zinc-600 uppercase font-black text-[10px]">No pulses captured yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COL: LEGACY & SNAPSHOT */}
        <div className="lg:col-span-7 space-y-8">

          {/* LEGACY ARCHIVE CARD (DELETE/REPLACE INCLUDED) */}
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem]">
            <div className="flex flex-col gap-8 text-left">
              <div className="flex items-center gap-3"><FileText className="text-teal-500" size={24} /><h3 className="text-xl font-bold text-white">Legacy Archive</h3></div>
              
              {!vault?.resume ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/5 hover:border-teal-500/20 rounded-[2rem] bg-black/40 cursor-pointer group transition-all relative overflow-hidden">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="text-teal-500 animate-spin" size={32} />
                      <span className="text-[10px] font-black uppercase text-teal-500 animate-pulse">Archiving...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="text-zinc-600 mb-3 group-hover:text-teal-500" />
                      <span className="text-[10px] font-black uppercase text-zinc-500">Upload Resume / CV</span>
                      <p className="text-[8px] text-zinc-600 uppercase mt-2 font-black">PDF, DOCX supported</p>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} />
                </label>
              ) : (
                <div className="p-8 rounded-[2rem] bg-teal-500/5 border border-teal-500/20 text-center">
                  <CheckCircle2 className="text-teal-500 mx-auto mb-4" size={32} />
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest">Legacy Secured</h4>
                  <p className="text-[10px] text-zinc-500 mt-2 italic">"{vault.resume.name}" is archived.</p>
                  
                  {/* DELETE & REPLACE OPTIONS */}
                  <div className="mt-6 flex justify-center gap-3">
                    <label className="inline-flex items-center gap-2 text-[9px] font-black uppercase text-zinc-300 hover:text-white cursor-pointer transition-colors border border-white/10 px-4 py-2 rounded-full">
                      <RefreshCw size={10} /> Replace
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <button 
                      onClick={() => setConfirmZone('archive')} 
                      className="inline-flex items-center gap-2 text-[9px] font-black uppercase text-zinc-500 hover:text-rose-400 transition-colors border border-white/5 px-4 py-2 rounded-full"
                    >
                      <Trash2 size={10} /> Delete Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* ALIGNMENT SNAPSHOT — single source of truth for cultural profile */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Compass size={14} className="text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Alignment Snapshot</span>
              </div>
              <button
                onClick={() => navigate((vault?.alignment_complete || vault?.ethics) ? '/horizon' : '/culture')}
                className="text-[9px] font-black uppercase tracking-widest text-teal-500/60 hover:text-teal-400 transition-colors"
              >
                {(vault?.alignment_complete || vault?.ethics) ? 'Horizon →' : 'Begin →'}
              </button>
            </div>
            <AlignmentWidgets vault={vault} />
          </div>

      {/* DANGER ZONES */}
          <div className="pt-20">
            <AnimatePresence mode="wait">
              {!confirmZone ? (
                <motion.button 
                  key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setConfirmZone('all')} 
                  className="text-[10px] text-zinc-600 hover:text-rose-500 uppercase font-black tracking-widest flex items-center gap-2 mx-auto transition-colors"
                >
                  <Trash2 size={12} /> Delete Account
                </motion.button>
              ) : (
                <motion.div 
                  key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="p-10 bg-rose-500/[0.02] border border-rose-500/20 rounded-[2.5rem] max-w-sm mx-auto space-y-6 text-center"
                >
                  <AlertTriangle className="text-rose-500 mx-auto" size={32} />
                  <div className="space-y-2">
                    <h5 className="text-white font-black uppercase text-xs tracking-tighter">
                      {confirmZone === 'archive' ? "Delete Resume?" : "Delete Account?"}
                    </h5>
                    <p className="text-[10px] text-zinc-500 italic">
                      {confirmZone === 'archive' 
                        ? "This removes your CV artifact. Alignment remains safe." 
                        : "Wipe EVERYTHING. This cannot be undone."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={confirmZone === 'archive' 
                        ? () => { onSync({ ...vault, resume: null }); setConfirmZone(null); triggerToast("Resume deleted."); } 
                        : handleFullWipe
                      } 
                      className="bg-rose-500 text-white font-black uppercase w-full rounded-xl"
                    >
                      {confirmZone === 'archive' ? "Delete Resume" : "Delete Account"}
                    </Button>
                    <Button onClick={() => setConfirmZone(null)} variant="ghost" className="text-zinc-500 uppercase text-[10px] font-black">Cancel</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* PULSE REFLECTION SHEET (NOW OPTIONAL) */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowSheet(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] cursor-pointer" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3.5rem] z-[210] p-8 pb-16 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="w-10" /> <div className="w-12 h-1.5 bg-zinc-800 rounded-full" />
                <button onClick={() => setShowSheet(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
              </div>
              <div className="max-w-xl mx-auto space-y-10 text-center">
                <div className="space-y-2">
                    <span className="text-5xl">{selectedEmoji}</span>
                    <h3 className="text-3xl font-serif italic text-white">Adding Depth</h3>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Detail the pulse (Optional)</p>
                </div>
                <Textarea placeholder="How does the journey feel?" value={reflection} onChange={(e) => setReflection(e.target.value)} className="bg-black/40 border-white/5 rounded-2xl p-6 text-white italic min-h-[150px] outline-none" />
                <div className="flex flex-col gap-4">
                  <Button onClick={handleSavePulse} className="w-full h-16 bg-teal-500 text-black font-black uppercase rounded-2xl shadow-xl">Seal Pulse</Button>
                  <button onClick={() => setShowSheet(false)} className="text-[10px] text-zinc-500 uppercase font-black tracking-widest py-2 hover:text-zinc-400 transition-colors">Cancel</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const Badge = ({ children, className }) => (
  <span className={`text-[9px] font-black tracking-widest px-3 py-1 rounded-full border ${className}`}>{children}</span>
);