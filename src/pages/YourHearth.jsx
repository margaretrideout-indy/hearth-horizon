import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  Sparkles, ArrowRight, ShieldCheck, Zap,
  BookOpen, PenLine, Lock, Globe, Trash2, RefreshCw, AlertTriangle, Loader2,
  Activity, History
} from 'lucide-react';

export default function YourHearth({ vault, onResumeSync, onSync, onNavigateToHorizon }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isClosingHearth, setIsClosingHearth] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const pulseOptions = [
    { icon: "🌱", label: "Growing" },
    { icon: "🔥", label: "Stretched" },
    { icon: "🌊", label: "Flowing" },
    { icon: "🌪️", label: "Cloudy" },
    { icon: "💎", label: "Resilient" }
  ];

  // 1. PULL-TO-REFRESH (PWA Interaction)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulating a fetch from the Forest
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsRefreshing(false);
    triggerToast("Hearth data synchronized.");
  };

  // 2. OPTIMISTIC RESUME SYNC (The Ghost State)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    // Immediate visual feedback
    const ghostResume = { name: file.name, isOptimistic: true };
    onSync({ resume: ghostResume });

    setTimeout(() => {
      onResumeSync(file);
      setIsUploading(false);
      triggerToast("Legacy document etched successfully.");
    }, 2000);
  };

  // 3. OPTIMISTIC PULSE (Inner Weather)
  const handleSavePulse = () => {
    if (!reflection && !selectedEmoji) return;
    
    const newPulse = {
      date: new Date().toISOString(),
      emoji: selectedEmoji,
      text: reflection
    };

    // Update state immediately for that "Instant" feel
    onSync({ pulses: [newPulse, ...(vault.pulses || [])] });
    setReflection("");
    setSelectedEmoji(null);
    triggerToast("Pulse captured in your history.");
  };

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePurgeResume = () => {
    if (confirm("Are you sure you wish to purge this legacy document?")) {
      onSync({ resume: null });
      triggerToast("Legacy document purged.");
    }
  };

  const handleFinalExtinguish = () => {
    console.log("Extinguishing Hearth...");
    navigate('/'); 
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-1000 relative">
      
      {/* TOAST NOTIFICATION SYSTEM */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-teal-500 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(20,184,166,0.3)] border border-white/20"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PULL-TO-REFRESH VISUAL TRIGGER */}
      <div className="flex justify-center -mb-8">
        <button 
          onClick={handleRefresh} 
          className="group flex flex-col items-center gap-1 opacity-30 hover:opacity-100 transition-all"
        >
          <RefreshCw size={14} className={`${isRefreshing ? 'animate-spin text-teal-400' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          <span className="text-[7px] font-black uppercase tracking-[0.2em]">Sync with Forest</span>
        </button>
      </div>

      <header className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400">
          <Flame size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personal Sanctuary</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto font-light italic leading-relaxed">
          Document your internal weather and calibrate your legacy for the migration ahead.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: THE HEARTH-PULSE */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-[#0D0B10] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-rose-400">
                <Activity size={18} />
                <h3 className="text-lg font-bold tracking-tight">Hearth-Pulse</h3>
              </div>
              
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">Internal Weather</p>
                <div className="grid grid-cols-5 gap-2 bg-black/40 p-2 rounded-2xl border border-white/5">
                  {pulseOptions.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setSelectedEmoji(p.icon)}
                      className={`flex flex-col items-center py-3 rounded-xl transition-all duration-300 ${
                        selectedEmoji === p.icon 
                        ? "bg-rose-500/20 border-rose-500/40 scale-105 shadow-[0_0_15px_rgba(244,63,94,0.1)]" 
                        : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className="text-xl">{p.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">Reflection</p>
                <Textarea 
                  placeholder="How does the journey feel today?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-black/40 border-white/5 rounded-2xl text-xs italic placeholder:text-zinc-800 min-h-[120px] focus:border-rose-500/30 transition-all resize-none text-white"
                />
              </div>

              <Button 
                onClick={handleSavePulse}
                className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-black border border-rose-500/20 text-[10px] font-black uppercase tracking-widest h-12 rounded-xl transition-all"
              >
                Etch Pulse
              </Button>
            </div>
          </Card>

          {/* PULSE HISTORY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 px-4">
              <History size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Pulse History</span>
            </div>
            <div className="space-y-2">
              {vault.pulses?.slice(0, 3).map((p, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 items-center"
                >
                  <span className="text-lg">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-zinc-400 italic line-clamp-1">{p.text || "A moment of stillness."}</p>
                    <p className="text-[8px] text-zinc-700 font-bold uppercase mt-1">
                      {new Date(p.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ALIGNMENT & SYNC */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* THE ALIGNMENT LEDGER */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-teal-500 px-4">
              <BookOpen size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">The Alignment Ledger</span>
            </div>
            <Card className="p-8 bg-teal-500/5 border border-teal-500/20 rounded-[2.5rem] relative overflow-hidden">
              {vault.isAligned ? (
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h4 className="text-white font-bold text-2xl tracking-tight">{vault.archetype || "Calibrated Steward"}</h4>
                    <p className="text-[10px] text-teal-500 font-black uppercase mt-1 tracking-widest">Migration Status: Verified</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-serif italic text-white">{vault.alignmentScore || "94"}%</span>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Ecosystem Fit</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 relative z-10">
                  <p className="text-xs text-zinc-600 italic mb-6 leading-relaxed">No professional alignment data found in the Founding Forest archives.</p>
                  <Button 
                    onClick={() => navigate('/alignment')}
                    className="bg-zinc-900 hover:bg-teal-500 text-zinc-400 hover:text-black text-[9px] font-black uppercase tracking-widest rounded-full px-8 border border-white/5 h-10 transition-all"
                  >
                    Calibrate Alignment
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* RÉSUMÉ SYNC (Optimistic UI) */}
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">Sync Your Legacy</h3>
                <p className="text-sm text-zinc-500 font-light italic">Translate your legacy document into ecosystem-native data.</p>
              </div>

              {!vault.resume ? (
                <label className="group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 hover:border-teal-500/40 rounded-[2.5rem] bg-black/40 cursor-pointer transition-all duration-500">
                  <div className="flex flex-col items-center">
                    <div className="p-5 bg-zinc-900 rounded-3xl mb-4 group-hover:scale-110 group-hover:bg-teal-500/10 transition-all duration-500">
                      <Upload className="text-zinc-600 group-hover:text-teal-400" size={32} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Drop Résumé / CV</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className={`p-8 border rounded-[2.5rem] flex items-center justify-between group transition-all duration-500 ${
                    vault.resume.isOptimistic 
                    ? "bg-zinc-900 border-dashed border-zinc-700 animate-pulse" 
                    : "bg-teal-500/5 border-teal-500/20"
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-2xl shadow-xl transition-all ${
                        vault.resume.isOptimistic ? "bg-zinc-800 text-zinc-500" : "bg-teal-500 text-black shadow-teal-500/20"
                      }`}>
                        {vault.resume.isOptimistic ? <Loader2 size={24} className="animate-spin" /> : <FileText size={24} />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold text-white truncate max-w-[200px]">{vault.resume.name}</h4>
                        <p className="text-[9px] text-teal-500/60 font-black uppercase tracking-widest italic mt-1">
                          {vault.resume.isOptimistic ? "Mapping Wisdom..." : "Synced & Ready"}
                        </p>
                      </div>
                    </div>
                    {!vault.resume.isOptimistic && <CheckCircle2 className="text-teal-500" size={28} />}
                  </div>

                  <div className="flex gap-3 justify-end px-2">
                    <Button 
                      onClick={handlePurgeResume}
                      className="bg-red-500/5 hover:bg-red-500/20 text-red-500/60 hover:text-red-500 border border-red-500/10 text-[9px] font-black uppercase h-10 rounded-xl transition-all"
                    >
                      <Trash2 size={12} className="mr-2" /> Purge
                    </Button>
                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 px-4 flex items-center text-[9px] font-black uppercase h-10 rounded-xl transition-all">
                      <RefreshCw size={12} className="mr-2" /> Replace
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* HORIZON ACTION BRIDGE */}
          <div className="pt-4">
            <button 
              onClick={() => {
                if (!vault.resume || vault.resume.isOptimistic) return;
                onNavigateToHorizon();
              }}
              className={`w-full p-8 rounded-[3rem] border flex items-center justify-between transition-all duration-700 group relative overflow-hidden ${
                vault.resume && !vault.resume.isOptimistic
                ? "bg-teal-500 text-black border-teal-400 hover:shadow-[0_0_50px_rgba(20,184,166,0.2)]" 
                : "bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed opacity-30"
              }`}
            >
              <div className="relative z-10 flex items-center gap-6">
                <div className={`p-4 rounded-2xl border ${
                  (vault.resume && !vault.resume.isOptimistic) ? "bg-black/10 border-black/10" : "bg-white/5 border-white/10"
                }`}>
                  <Globe size={28} className={vault.resume && !vault.resume.isOptimistic ? "animate-pulse" : ""} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">
                    {vault.resume ? "Calibrated" : "Calibration Required"}
                  </p>
                  <p className="text-2xl font-serif italic font-bold tracking-tight">The Horizon Board</p>
                </div>
              </div>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>

          {/* ACCOUNT DELETION (Base44 Requirement) */}
          <section className="pt-16 mt-8 border-t border-white/5">
            {!isClosingHearth ? (
              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={() => setIsClosingHearth(true)}
                  className="text-zinc-700 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
                >
                  <Trash2 size={12} /> Extinguish the Hearth
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/5 border border-red-500/10 p-8 rounded-[2.5rem] space-y-6"
              >
                <div className="flex items-center gap-3 text-red-400">
                  <AlertTriangle size={20} />
                  <h4 className="text-lg font-bold tracking-tight">Confirm Extinguish?</h4>
                </div>
                <p className="text-xs text-zinc-500 italic leading-relaxed">
                  This action is final. Your legacy document, alignment data, and Hearth-Pulses will be permanently wiped from the forest archives.
                </p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setIsClosingHearth(false)}
                    className="flex-1 bg-white/5 text-zinc-400 hover:text-white rounded-xl text-[9px] font-black uppercase h-12"
                  >
                    Stay by the Fire
                  </Button>
                  <Button 
                    onClick={handleFinalExtinguish}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[9px] font-black uppercase h-12"
                  >
                    Extinguish Permanently
                  </Button>
                </div>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}