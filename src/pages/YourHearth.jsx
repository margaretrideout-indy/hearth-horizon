import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  Sparkles, ArrowRight, ShieldCheck, Zap,
  BookOpen, PenLine, Lock, Globe, Trash2, RefreshCw, AlertTriangle, Loader2
} from 'lucide-react';

export default function YourHearth({ vault, onResumeSync, onSync, onNavigateToHorizon }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isClosingHearth, setIsClosingHearth] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const pulses = [
    { icon: "🌱", label: "Positive" },
    { icon: "🔥", label: "Stretched" },
    { icon: "🌊", label: "Flowing" },
    { icon: "🌪️", label: "Cloudy" },
    { icon: "💎", label: "Resilient" }
  ];

  // 1. PULL TO REFRESH LOGIC
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate a spring refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
    triggerToast("The Spring has been refreshed.");
  };

  // 2. OPTIMISTIC UI: RESUME SYNC (The "Ghost" State)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optimistically update the UI to show we are working on it
    setIsUploading(true);
    
    // Create a temporary "Ghost Sync" state
    const ghostResume = { name: file.name, isOptimistic: true };
    onSync({ resume: ghostResume });

    setTimeout(() => {
      onResumeSync(file); // Real file sync
      setIsUploading(false);
      triggerToast("Legacy document successfully etched.");
    }, 2000);
  };

  // 3. OPTIMISTIC UI: REFLECTIONS
  const handleSaveReflection = () => {
    if (!reflection && !selectedEmoji) return;
    
    const newPulse = {
      date: new Date().toISOString(),
      emoji: selectedEmoji,
      text: reflection
    };

    // Push to state immediately
    onSync({ pulses: [newPulse, ...(vault.pulses || [])] });
    
    // Clear inputs immediately
    setReflection("");
    setSelectedEmoji(null);
    triggerToast("Reflection added to the Logbook.");
  };

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePurgeResume = () => {
    if (confirm("Are you sure you wish to purge this legacy document?")) {
      onSync({ resume: null });
      triggerToast("Legacy purged.");
    }
  };

  const handleFinalExtinguish = () => {
    console.log("Hearth extinguished.");
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in fade-in duration-1000 relative">
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-teal-500 text-black px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PULL TO REFRESH INDICATOR */}
      <div className="flex justify-center -mb-8">
        <button onClick={handleRefresh} className="group flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
          <RefreshCw size={14} className={`${isRefreshing ? 'animate-spin text-teal-400' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
          <span className="text-[7px] font-black uppercase tracking-[0.2em]">Refresh Spring</span>
        </button>
      </div>

      <header className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400 mb-2">
          <Flame size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Eternal Flame</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto font-light italic leading-relaxed">
          Fuel the flame with your <strong>Résumé/CV</strong> and document your internal weather.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: REFLECTION */}
        <div className="lg:col-span-5 space-y-8">
          <Card className="bg-[#0D0B10] border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-teal-400">
                <PenLine size={18} />
                <h3 className="text-lg font-bold tracking-tight">Internal Weather</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-2 bg-black/40 p-2 rounded-2xl border border-white/5">
                {pulses.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setSelectedEmoji(p.icon)}
                    className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300 ${
                      selectedEmoji === p.icon 
                      ? "bg-teal-500/20 border-teal-500/40 scale-105 shadow-[0_0_15px_rgba(20,184,166,0.2)]" 
                      : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="text-xl">{p.icon}</span>
                    <span className={`text-[7px] font-black uppercase tracking-tighter ${selectedEmoji === p.icon ? 'text-teal-400' : 'text-zinc-600'}`}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>

              <Textarea 
                placeholder="How does the journey feel today?"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="bg-black/40 border-white/5 rounded-2xl text-xs italic placeholder:text-zinc-800 min-h-[100px] focus:border-teal-500/30 transition-all resize-none text-white"
              />

              <Button 
                onClick={handleSaveReflection}
                className="w-full bg-white/5 hover:bg-teal-500 hover:text-black border border-white/10 text-[10px] font-black uppercase tracking-widest h-12 rounded-xl transition-all"
              >
                Etch into Hearth
              </Button>
            </div>
          </Card>

          {/* LOGBOOK */}
          <div className="space-y-4 px-2">
            <div className="flex items-center gap-2 text-zinc-500">
              <BookOpen size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">The Logbook</span>
            </div>
            {vault.pulses?.slice(0, 3).map((p, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-lg">{p.emoji}</span>
                <p className="text-[11px] text-zinc-400 italic line-clamp-1">{p.text || "A quiet reflection..."}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SYNC */}
        <div className="lg:col-span-7 space-y-8">
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">Sync Your Legacy</h3>
                <p className="text-sm text-zinc-500 font-light">Provide your latest <strong>Résumé/CV</strong> (PDF/Docx) to begin translation.</p>
              </div>

              {!vault.resume ? (
                <label className="group flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-white/10 hover:border-teal-500/40 rounded-[2.5rem] bg-black/40 cursor-pointer transition-all duration-500">
                  <div className="flex flex-col items-center">
                    <div className="p-6 bg-zinc-900 rounded-3xl mb-4 group-hover:scale-110 group-hover:bg-teal-500/10 transition-all duration-500 shadow-xl">
                      <Upload className="text-zinc-600 group-hover:text-teal-400" size={36} />
                    </div>
                    <p className="text-sm font-bold text-zinc-500 group-hover:text-white">Drop Legacy Document</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className={`p-8 border rounded-[2.5rem] flex items-center justify-between group animate-in zoom-in-95 transition-all duration-500 ${
                    vault.resume.isOptimistic 
                      ? "bg-zinc-900/50 border-zinc-800 border-dashed" 
                      : "bg-teal-500/5 border-teal-500/20"
                  }`}>
                    <div className="flex items-center gap-6">
                      <div className={`p-4 rounded-2xl shadow-xl transition-all ${
                        vault.resume.isOptimistic ? "bg-zinc-800 text-zinc-500" : "bg-teal-500 text-black"
                      }`}>
                        {vault.resume.isOptimistic ? <Loader2 size={28} className="animate-spin" /> : <FileText size={28} />}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white line-clamp-1">{vault.resume.name}</h4>
                        <p className="text-xs text-teal-500/60 font-black uppercase tracking-widest italic">
                          {vault.resume.isOptimistic ? "Mapping to Horizon..." : "Legacy Document Synced"}
                        </p>
                      </div>
                    </div>
                    {!vault.resume.isOptimistic && <CheckCircle2 className="text-teal-500" size={32} />}
                  </div>

                  <div className="flex gap-3 justify-end px-2">
                    <Button onClick={handlePurgeResume} className="bg-red-500/5 hover:bg-red-500/20 text-red-500/60 border border-red-500/10 text-[9px] font-black h-10 rounded-xl">
                      <Trash2 size={12} className="mr-2" /> Purge Legacy
                    </Button>
                    <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-zinc-400 border border-white/5 px-4 flex items-center text-[9px] font-black h-10 rounded-xl">
                      <RefreshCw size={12} className="mr-2" /> Replace Sync
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-start gap-3">
                  <ShieldCheck size={20} className="text-teal-500/40" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Privacy Locked</h5>
                    <p className="text-[10px] text-zinc-600 italic">Data remains local.</p>
                  </div>
                </div>
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-start gap-3">
                  <Sparkles size={20} className="text-teal-500/40" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AI Translation</h5>
                    <p className="text-[10px] text-zinc-600 italic">Mapping your wisdom.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* NEXT STEP ACTION */}
          <div className="pt-4">
            <button 
              onClick={() => vault.resume && !vault.resume.isOptimistic && onNavigateToHorizon()}
              className={`w-full p-8 rounded-[2.5rem] border flex items-center justify-between transition-all duration-700 group relative overflow-hidden ${
                vault.resume && !vault.resume.isOptimistic
                ? "bg-teal-500 text-black border-teal-400 hover:shadow-[0_0_50px_rgba(20,184,166,0.3)] hover:scale-[1.01]" 
                : "bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed opacity-40"
              }`}
            >
              <div className="relative z-10 flex items-center gap-6 text-left">
                <div className="p-4 rounded-2xl bg-black/10 border border-black/20">
                  <Globe size={28} className={vault.resume ? "animate-pulse" : ""} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">
                    {vault.resume ? "Expedition Ready" : "Expedition Locked"}
                  </p>
                  <p className="text-2xl font-serif italic font-bold tracking-tight">The Horizon Board</p>
                </div>
              </div>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}