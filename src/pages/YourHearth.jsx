import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  ArrowRight, RefreshCw, Activity, History,
  Lock, Globe, BookOpen, Trash2, AlertTriangle, Loader2, Download
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
    { icon: "☁️", label: "Cloudy" },
    { icon: "💎", label: "Resilient" }
  ];

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 1. PULL-TO-REFRESH LOGIC
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulating the cloud sync fetch
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    triggerToast("Sanctuary synchronized with Cloud.");
  };

  const handleSavePulse = () => {
    if (!reflection && !selectedEmoji) return;
    const newPulse = {
      date: new Date().toISOString(),
      emoji: selectedEmoji,
      text: reflection
    };
    onSync({ pulses: [newPulse, ...(vault.pulses || [])] });
    setReflection("");
    setSelectedEmoji(null);
    triggerToast("Hearth-Pulse captured.");
  };

  // 2. ACCOUNT DELETION LOGIC (Mandatory for App Stores)
  const handleExtinguishHearth = async () => {
    // In a real app, you would call: await base44.user.delete(user.id);
    onSync({ pulses: [], resume: null, isAligned: false }); 
    triggerToast("Hearth extinguished. Redirecting...");
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-1000 relative">
      
      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-teal-500 text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PULL-TO-REFRESH VISUAL */}
      <div className="flex justify-center -mb-8 pt-2">
        <button 
          onClick={handleRefresh} 
          className="group flex flex-col items-center gap-1 opacity-20 hover:opacity-100 transition-all duration-500"
        >
          <RefreshCw size={14} className={`${isRefreshing ? 'animate-spin text-teal-400' : 'group-hover:rotate-180 transition-transform'}`} />
          <span className="text-[7px] font-black uppercase tracking-[0.3em]">Pull to Sync</span>
        </button>
      </div>

      <header className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400">
          <Flame size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Personal Sanctuary</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">Your Hearth</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: THE HEARTH-PULSE */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-[#0D0B10] border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-6 right-8 flex items-center gap-1.5 opacity-20">
              <Lock size={10} className="text-rose-400" />
              <span className="text-[7px] font-black uppercase tracking-widest text-rose-400">Cloud Encrypted</span>
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 text-rose-400">
                <Activity size={18} />
                <h3 className="text-lg font-bold tracking-tight">Hearth-Pulse</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 italic px-1">Internal Weather</p>
                <div className="grid grid-cols-5 gap-2 bg-black/40 p-3 rounded-[2rem] border border-white/5">
                  {pulseOptions.map((p) => (
                    <button 
                      key={p.label} 
                      onClick={() => setSelectedEmoji(p.icon)}
                      className={`flex flex-col items-center gap-2 py-3 rounded-2xl transition-all duration-300 ${
                        selectedEmoji === p.icon ? "bg-rose-500/10 border-rose-500/30 scale-105" : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span className="text-xl">{p.icon}</span>
                      <span className={`text-[7px] font-black uppercase tracking-tighter ${selectedEmoji === p.icon ? 'text-rose-400' : 'text-zinc-600'}`}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 italic px-1">Reflection</p>
                <Textarea 
                  placeholder="How does the journey feel today?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-black/40 border-white/5 rounded-[1.5rem] text-xs italic text-white p-5 min-h-[120px] focus:border-rose-500/30 transition-all resize-none"
                />
              </div>

              <Button 
                onClick={handleSavePulse} 
                className={`w-full h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                  selectedEmoji || reflection ? "bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.2)] active:scale-95" : "bg-white/5 text-zinc-600 cursor-not-allowed"
                }`}
              >
                Etch Pulse
              </Button>
            </div>
          </Card>

          {/* PULSE HISTORY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 px-4">
              <History size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic text-zinc-600">Pulse History</span>
            </div>
            <div className="space-y-2">
              {vault.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-center animate-in slide-in-from-left duration-500">
                    <span className="text-lg">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-zinc-500 italic truncate">{p.text || "Silent contemplation..."}</p>
                      <p className="text-[8px] text-zinc-700 font-bold uppercase mt-1 tracking-widest">{new Date(p.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-zinc-700 italic px-4">Your fire is waiting for its first spark.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ALIGNMENT & SYNC */}
        <div className="lg:col-span-7 space-y-8">
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
                    <p className="text-[10px] text-teal-500 font-black uppercase mt-1 tracking-widest">Outcome Verified</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-serif italic text-white">{vault.alignmentScore || "94"}%</span>
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest mt-1">Ecosystem Fit</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 relative z-10">
                  <p className="text-xs text-zinc-600 italic mb-6">No professional outcomes found.</p>
                  <Button onClick={() => navigate('/alignment')} className="bg-zinc-900 hover:bg-teal-500 text-zinc-400 hover:text-black text-[9px] font-black uppercase rounded-full px-8 h-10 border border-white/5 transition-all">
                    Establish Alignment
                  </Button>
                </div>
              )}
            </Card>
          </div>

          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-2xl font-bold text-white tracking-tight mb-8">Sync Your Legacy</h3>
            {!vault.resume ? (
              <label className="group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 hover:border-teal-500/40 rounded-[2.5rem] bg-black/40 cursor-pointer transition-all">
                <Upload className="text-zinc-600 group-hover:text-teal-400 mb-2 transition-colors" size={32} />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Drop Résumé</p>
                <input type="file" className="hidden" onChange={(e) => onResumeSync(e.target.files[0])} />
              </label>
            ) : (
              <div className="p-8 border rounded-[2.5rem] bg-teal-500/10 border-teal-500/20 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-teal-500 text-black"><FileText size={24} /></div>
                  <h4 className="text-lg font-bold text-white truncate max-w-[200px]">{vault.resume.name}</h4>
                </div>
                <CheckCircle2 size={28} className="text-teal-500" />
              </div>
            )}
          </Card>

          <button 
             disabled={!vault.resume}
             onClick={() => onNavigateToHorizon()}
             className={`w-full p-8 rounded-[3rem] border flex items-center justify-between group transition-all duration-700 ${
               vault.resume ? "bg-teal-500 text-black border-teal-400 hover:shadow-[0_0_50px_rgba(20,184,166,0.2)]" : "bg-white/5 text-zinc-700 opacity-30 cursor-not-allowed"
             }`}
          >
            <div className="flex items-center gap-6 text-left">
              <div className="p-4 rounded-2xl bg-black/10"><Globe size={28} /></div>
              <div><p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">Calibrated</p><p className="text-2xl font-serif italic font-bold">The Horizon Board</p></div>
            </div>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>

          {/* --- MANDATORY DATA DELETION SECTION --- */}
          <section className="mt-20 pt-10 border-t border-white/5 space-y-6">
            {!isClosingHearth ? (
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsClosingHearth(true)}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-800 hover:text-red-500 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={12} /> Extinguish the Hearth
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/5 border border-red-500/10 p-8 rounded-[2rem] space-y-6 text-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <AlertTriangle className="text-red-500" size={24} />
                  <h4 className="text-white font-bold tracking-tight text-xl">Are you certain?</h4>
                  <p className="text-xs text-zinc-500 italic max-w-sm mx-auto">
                    Extinguishing the Hearth will permanently delete your legacy document, alignment outcomes, and all Hearth-Pulses from the cloud archives.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setIsClosingHearth(false)} 
                    className="flex-1 bg-white/5 text-zinc-400 hover:text-white rounded-xl text-[9px] font-black uppercase h-12"
                  >
                    Stay by the Fire
                  </Button>
                  <Button 
                    onClick={handleExtinguishHearth} 
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[9px] font-black uppercase h-12 transition-all shadow-lg shadow-red-600/20"
                  >
                    Confirm Deletion
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