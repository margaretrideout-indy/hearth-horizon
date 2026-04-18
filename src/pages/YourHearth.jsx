import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  ArrowRight, RefreshCw, Activity, History,
  Lock, Globe, BookOpen, Trash2, AlertTriangle, ChevronUp, X
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

  // 1. NATIVE-STYLE REFRESH LOGIC
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) {
      await onRefresh();
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setIsRefreshing(false);
    triggerToast("Sanctuary synchronized with Cloud.");
  };

  // 2. SAVE PULSE LOGIC
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

  // 3. MANDATORY ACCOUNT WIPE LOGIC
  const handleExtinguishHearth = async () => {
    await onSync(null); // Triggers the wipe in App.jsx
    triggerToast("Hearth extinguished. Redirecting...");
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 animate-in fade-in duration-1000 relative px-4 md:px-0">
      
      {/* NATIVE TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-bold shadow-2xl flex items-center gap-2"
          >
            <CheckCircle2 size={14} className="text-teal-600" />
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GESTURE-STYLE PULL TO REFRESH UI */}
      <div className="flex justify-center h-4 relative">
        <motion.div 
          animate={isRefreshing ? { rotate: 360 } : { y: 0 }}
          transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          className="opacity-40 text-teal-500"
          onClick={handleRefresh}
        >
          <RefreshCw size={20} className={isRefreshing ? "" : "hover:scale-110 transition-transform cursor-pointer"} />
        </motion.div>
      </div>

      <header className="text-center space-y-3 pt-6">
        <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-sm font-light italic px-4">A sanctuary for your professional reflection and alignment.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: THE PULSE TRIGGER */}
        <div className="lg:col-span-5 space-y-6">
          <Card 
            onClick={() => setShowSheet(true)}
            className="bg-[#0D0B10] border-white/5 p-8 rounded-[2rem] relative overflow-hidden shadow-2xl cursor-pointer group hover:border-rose-500/20 transition-all active:scale-[0.98]"
          >
            <div className="absolute top-6 right-8 flex items-center gap-1.5 opacity-20">
              <Lock size={10} className="text-rose-400" />
              <span className="text-[7px] font-black uppercase tracking-widest text-rose-400">Cloud Sync Active</span>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-400">
                  <Activity size={18} />
                  <h3 className="text-lg font-bold tracking-tight">Etch a Pulse</h3>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold italic">Check internal weather</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ChevronUp className="text-rose-400" />
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-600 px-2">
              <History size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Hearth Records</span>
            </div>
            <div className="space-y-3">
              {vault.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-center animate-in slide-in-from-left duration-500">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-400 italic leading-relaxed truncate">{p.text || "Silent reflection."}</p>
                      <p className="text-[8px] text-zinc-700 font-bold uppercase mt-1.5 tracking-tighter">Verified Archive • {new Date(p.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-zinc-700 italic px-2">Your fire is waiting for its first spark.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ALIGNMENT & SYNC */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="p-8 bg-teal-500/5 border border-teal-500/20 rounded-[2rem]">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] text-teal-500 font-black uppercase tracking-widest">Alignment Ledger</span>
                <h4 className="text-white font-bold text-2xl tracking-tight">{vault.archetype || "Awaiting Calibration"}</h4>
              </div>
              <div className="text-right">
                <span className="text-4xl font-serif italic text-white">{vault.alignmentScore || "0"}%</span>
              </div>
            </div>
          </Card>

          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <FileText className="text-teal-500" size={20} />
                    <h3 className="text-xl font-bold text-white">Legacy Sync</h3>
                </div>
                {!vault.resume ? (
                    <label className="group flex flex-col items-center justify-center w-full h-40 border border-dashed border-white/10 hover:border-teal-500/40 rounded-2xl bg-black/40 cursor-pointer transition-all">
                        <Upload className="text-zinc-600 group-hover:text-teal-400 mb-2 transition-colors" size={24} />
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Upload Legacy Doc</p>
                        <input type="file" className="hidden" onChange={(e) => onResumeSync(e.target.files[0])} />
                    </label>
                ) : (
                    <div className="p-6 rounded-2xl bg-teal-500/5 border border-teal-500/20 flex items-center justify-between">
                        <span className="text-sm text-white font-medium truncate max-w-[200px]">{vault.resume.name}</span>
                        <CheckCircle2 size={20} className="text-teal-500" />
                    </div>
                )}
             </div>
          </Card>

          <button 
             onClick={onNavigateToHorizon}
             className="w-full p-8 rounded-[2.5rem] bg-teal-500 text-black flex items-center justify-between group active:scale-[0.98] transition-all shadow-xl shadow-teal-500/10"
          >
            <div className="flex items-center gap-4 text-left">
              <Globe size={24} />
              <p className="text-xl font-serif italic font-bold">The Horizon Board</p>
            </div>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>

          {/* DATA DELETION flow */}
          <div className="pt-12 text-center pb-20">
            {!isClosingHearth ? (
                <button onClick={() => setIsClosingHearth(true)} className="text-[10px] text-zinc-800 hover:text-red-500 font-bold uppercase tracking-widest transition-colors flex items-center gap-2 mx-auto">
                    <Trash2 size={12} /> Extinguish the Hearth
                </button>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex flex-col items-center gap-4 max-w-sm mx-auto">
                    <AlertTriangle className="text-red-500" size={20} />
                    <p className="text-[10px] text-red-400 font-bold uppercase text-center leading-relaxed">
                        Extinguishing the Hearth will permanently delete your legacy and pulses from the cloud.
                    </p>
                    <div className="flex gap-6 pt-2">
                        <button onClick={() => setIsClosingHearth(false)} className="text-[10px] text-zinc-500 font-bold uppercase">Keep Fire Burning</button>
                        <button onClick={handleExtinguishHearth} className="text-[10px] text-red-500 font-bold uppercase">Wipe All Records</button>
                    </div>
                </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET (NATIVE UX PATTERN) */}
      <AnimatePresence>
        {showSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSheet(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[120]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3rem] z-[130] p-8 pb-12"
            >
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-8 px-2">
                <h3 className="text-2xl font-serif italic text-white">Internal Weather</h3>
                <button onClick={() => setShowSheet(false)} className="p-2 bg-white/5 rounded-full text-zinc-500"><X size={20} /></button>
              </div>

              <div className="grid grid-cols-5 gap-3 mb-8">
                {pulseOptions.map((p) => (
                  <button 
                    key={p.label} 
                    onClick={() => setSelectedEmoji(p.icon)}
                    className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${
                      selectedEmoji === p.icon ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" : "bg-white/5 text-zinc-500 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <span className="text-[8px] font-black uppercase tracking-tighter">{p.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                 <Textarea 
                  placeholder="How does the journey feel today?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-black/40 border-white/5 rounded-2xl text-sm italic text-white p-5 min-h-[140px] focus:ring-1 focus:ring-rose-500/50 resize-none"
                />
                <Button 
                    onClick={handleSavePulse} 
                    disabled={!selectedEmoji && !reflection}
                    className="w-full h-16 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 disabled:opacity-30"
                >
                    Etch to Vault
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}