import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  ArrowRight, RefreshCw, Activity, History,
  Lock, Globe, BookOpen, Trash2, AlertTriangle, X, Sparkles, Compass
} from 'lucide-react';

export default function YourHearth({ vault, onSync, onRefresh, onResumeSync, onNavigateToHorizon }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [showSheet, setShowSheet] = useState(false); 
  const [isClosingHearth, setIsClosingHearth] = useState(false);
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

  const handleRefresh = async () => {
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
    
    await onSync({ pulses: [newPulse, ...(vault.pulses || [])] });
    
    setReflection("");
    setSelectedEmoji(null);
    setShowSheet(false);
    triggerToast("Hearth-Pulse captured.");
  };

  const handleExtinguishHearth = async () => {
    await onSync(null); 
    triggerToast("Hearth extinguished.");
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-1000 relative px-4 md:px-6">
      
      {/* NATIVE TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0, x: "-50%" }} 
            animate={{ y: 0, opacity: 1, x: "-50%" }} 
            exit={{ y: 20, opacity: 0, x: "-50%" }}
            className="fixed bottom-24 left-1/2 z-[200] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 border border-white/20"
          >
            <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                <CheckCircle2 size={12} className="text-white" />
            </div>
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYNC INDICATOR */}
      <div className="flex justify-center h-4 relative pt-4">
        <motion.div 
          animate={isRefreshing ? { rotate: 360 } : { y: 0 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          className="text-teal-500/40 hover:text-teal-500 transition-colors"
          onClick={handleRefresh}
        >
          <RefreshCw size={22} className={isRefreshing ? "" : "cursor-pointer active:scale-90 transition-transform"} />
        </motion.div>
      </div>

      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-2">
            <Flame size={12} className="text-orange-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-200">Fire is Lit</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter">Your Hearth</h1>
        <p className="text-zinc-500 text-sm font-light italic max-w-md mx-auto">A digital sanctuary for reflection, legacy archiving, and internal alignment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT: THE PULSE & RECORDS */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSheet(true)}
            className="bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl cursor-pointer group"
          >
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/10">
                    <Activity size={28} />
                </div>
                <div className="flex items-center gap-1.5 opacity-40">
                  <Lock size={10} className="text-rose-400" />
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-rose-400">Encrypted</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Etch a Pulse</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black italic">Check your internal weather</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-zinc-500">
                <History size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Hearth Records</span>
              </div>
              <span className="text-[9px] font-bold text-zinc-700 italic">Showing last 3</span>
            </div>
            
            <div className="space-y-4">
              {vault.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-5 items-center group hover:bg-white/[0.04] transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-black/40 flex items-center justify-center text-2xl shadow-inner border border-white/5">
                        {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-300 italic leading-relaxed line-clamp-2">{p.text || "Silent reflection captured."}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <div className="w-1 h-1 rounded-full bg-teal-500/50" />
                         <p className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">{new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 text-center border border-dashed border-white/5 rounded-[2rem]">
                    <Sparkles className="mx-auto text-zinc-800 mb-3" size={20} />
                    <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">No pulses etched yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: ALIGNMENT & LEGACY */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Dynamic Alignment / Horizon CTA */}
          <Card className={`p-10 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all border ${vault.archetype ? 'bg-teal-500/[0.07] border-teal-500/20' : 'bg-[#0D0B10] border-white/5'}`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                <Compass size={120} className="text-teal-500" />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="space-y-3">
                <div className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full w-fit">
                    <span className="text-[9px] text-teal-400 font-black uppercase tracking-widest">Alignment Ledger</span>
                </div>
                <h4 className="text-white font-bold text-3xl tracking-tight leading-none">
                  {vault.archetype || "Calibrating..."}
                </h4>
                <p className="text-[11px] text-zinc-500 italic max-w-xs leading-relaxed">
                  {vault.archetype 
                    ? "Your path is clear. View your full trajectory and current standings on the Horizon Board."
                    : "Your internal weather is still shifting. Complete your Alignment to unlock your trajectory."}
                </p>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
                <div className="text-6xl font-serif italic text-white drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">
                  {vault.alignmentScore || "0"}%
                </div>
                <button 
                  onClick={() => navigate(vault.archetype ? '/horizon' : '/culture')}
                  className="w-full md:w-auto px-8 py-4 rounded-2xl bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-teal-500/10"
                >
                  {vault.archetype ? "Horizon Board" : "Begin Alignment"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Card>

          {/* Legacy Sync (Resume) with Success State */}
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] shadow-2xl">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText className="text-teal-500" size={24} />
                        <h3 className="text-xl font-bold text-white tracking-tight">Legacy Archive</h3>
                    </div>
                </div>

                {!vault.resume ? (
                    <label className="group flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-white/5 hover:border-teal-500/30 rounded-[2rem] bg-black/40 cursor-pointer transition-all hover:bg-teal-500/[0.02]">
                        <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="text-zinc-600 group-hover:text-teal-400" size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white">Upload Professional Legacy</p>
                        <p className="text-[8px] text-zinc-700 mt-2 font-bold uppercase">PDF, DOCX up to 5MB</p>
                        <input type="file" className="hidden" onChange={(e) => onResumeSync(e.target.files[0])} />
                    </label>
                ) : (
                    <div className="p-10 rounded-[2rem] bg-teal-500/[0.03] border border-teal-500/20 flex flex-col items-center text-center group animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-6 border border-teal-500/30">
                          <CheckCircle2 size={40} className="text-teal-400" />
                        </div>
                        <h4 className="text-white font-bold text-lg uppercase tracking-widest">Legacy Secured</h4>
                        <p className="text-zinc-500 text-xs mt-2 italic max-w-[200px]">
                          "{vault.resume.name}" has been successfully etched into the vault.
                        </p>
                        <label className="mt-8 cursor-pointer text-[10px] text-zinc-600 font-black uppercase tracking-widest hover:text-white transition-colors border-b border-white/10 pb-1">
                          Update Record
                          <input type="file" className="hidden" onChange={(e) => onResumeSync(e.target.files[0])} />
                        </label>
                    </div>
                )}
              </div>
          </Card>

          {/* DANGER ZONE */}
          <div className="pt-20 text-center pb-10">
            {!isClosingHearth ? (
                <button 
                  onClick={() => setIsClosingHearth(true)} 
                  className="text-[10px] text-zinc-800 hover:text-rose-500 font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 mx-auto px-6 py-3 rounded-full hover:bg-rose-500/5"
                >
                    <Trash2 size={14} /> Extinguish the Hearth
                </button>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-rose-500/[0.02] border border-rose-500/20 p-10 rounded-[2.5rem] flex flex-col items-center gap-6 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-2">
                        <AlertTriangle size={32} />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm text-white font-bold uppercase tracking-widest">Permanent Deletion</p>
                        <p className="text-xs text-zinc-500 italic leading-relaxed">
                            This action will permanently wipe your legacy docs and pulse records from the cloud. This cannot be undone.
                        </p>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                        <button onClick={handleExtinguishHearth} className="w-full py-4 rounded-2xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20">Wipe All Records</button>
                        <button onClick={() => setIsClosingHearth(false)} className="w-full py-4 rounded-2xl bg-white/5 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Keep Fire Burning</button>
                    </div>
                </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* PULSE SHEET (BOTTOM SHEET) */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSheet(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3.5rem] z-[210] p-8 pb-16 shadow-[0_-20px_80px_rgba(0,0,0,1)]"
            >
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-10" />
              
              <div className="max-w-xl mx-auto">
                  <div className="flex justify-between items-center mb-10 px-4">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-serif italic text-white tracking-tight">Internal Weather</h3>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest italic leading-none">Capture this moment in time</p>
                    </div>
                    <button onClick={() => setShowSheet(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><X size={24} /></button>
                  </div>

                  <div className="grid grid-cols-5 gap-3 mb-10">
                    {pulseOptions.map((p) => (
                      <button 
                        key={p.label} 
                        onClick={() => setSelectedEmoji(p.icon)}
                        className={`flex flex-col items-center gap-3 py-6 rounded-3xl transition-all active:scale-90 ${
                          selectedEmoji === p.icon ? "bg-rose-500 text-white shadow-2xl shadow-rose-500/40 scale-105" : "bg-white/[0.03] text-zinc-500 hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="text-3xl">{p.icon}</span>
                        <span className="text-[7px] font-black uppercase tracking-widest">{p.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6 px-2">
                    <Textarea 
                      placeholder="How does the journey feel today? (Optional)"
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                      className="bg-black/60 border-white/10 rounded-3xl text-base italic text-white p-6 min-h-[160px] focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/30 resize-none transition-all placeholder:text-zinc-700"
                    />
                    <Button 
                        onClick={handleSavePulse} 
                        disabled={!selectedEmoji && !reflection}
                        className="w-full h-20 rounded-[2rem] bg-rose-500 hover:bg-rose-600 text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-rose-500/20 disabled:opacity-20 transition-all active:scale-[0.98]"
                    >
                        Etch to Vault
                    </Button>
                  </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}