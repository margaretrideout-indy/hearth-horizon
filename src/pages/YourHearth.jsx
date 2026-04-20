import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  ArrowRight, RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Sparkles, Compass,
  Loader2, PencilLine
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
  const [isExpandingPulse, setIsExpandingPulse] = useState(false); 
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
    setIsExpandingPulse(false);
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
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COL: INLINE PULSE CHECK-IN */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            className="bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 border border-rose-500/10"><Activity size={20} /></div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Etch a Pulse</h3>
                </div>
                <Lock size={12} className="text-rose-400 opacity-40" />
              </div>

              <div className="grid grid-cols-5 gap-2">
                {pulseOptions.map((p) => (
                  <button 
                    key={p.label} 
                    onClick={() => { setSelectedEmoji(p.icon); setIsExpandingPulse(true); }}
                    className={`flex flex-col items-center gap-2 py-3 rounded-2xl transition-all border ${selectedEmoji === p.icon ? 'bg-rose-500/20 border-rose-500 text-white shadow-lg' : 'bg-white/5 border-transparent text-zinc-500 hover:bg-white/10'}`}
                  >
                    <span className="text-xl">{p.icon}</span>
                    <span className="text-[7px] font-black uppercase tracking-tighter">{p.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {isExpandingPulse && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
                    <Textarea 
                      placeholder="Add a reflection? (Optional)" 
                      value={reflection} 
                      onChange={(e) => setReflection(e.target.value)} 
                      className="bg-black/40 border-white/5 rounded-xl p-4 text-white text-xs italic min-h-[100px] outline-none"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSavePulse} className="flex-1 h-12 bg-teal-500 text-black font-black uppercase text-[10px] rounded-xl shadow-lg">Seal Pulse</Button>
                      <Button onClick={() => { setIsExpandingPulse(false); setSelectedEmoji(null); }} variant="ghost" className="h-12 px-4 text-zinc-500 uppercase text-[10px] font-black"><X size={16} /></Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2 text-zinc-500">
                <div className="flex items-center gap-2">
                    <History size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Hearth Records</span>
                </div>
            </div>
            <div className="space-y-4">
              {vault.pulses?.length > 0 ? (
                vault.pulses.slice(0, 3).map((p, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex gap-5 items-center">
                    <div className="text-2xl">{p.emoji}</div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-300 italic line-clamp-2">{p.text || "A quiet moment of reflection."}</p>
                      <p className="text-[8px] text-zinc-500 uppercase font-black mt-2">{new Date(p.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border border-dashed border-white/5 rounded-[2rem] text-zinc-700 uppercase font-black text-[10px]">No pulses captured yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COL: ALIGNMENT & LEGACY */}
        <div className="lg:col-span-7 space-y-8">
          <Card className={`p-10 rounded-[3rem] border transition-all ${vault.archetype ? 'bg-teal-500/[0.07] border-teal-500/20' : 'bg-[#0D0B10] border-white/5'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-left">
              <div className="space-y-4 flex-1">
                <Badge className="bg-teal-500/10 text-teal-400 uppercase">Alignment Ledger</Badge>
                <h4 className="text-white font-bold text-3xl">{vault.archetype || "Calibrating..."}</h4>
                <p className="text-xs text-zinc-500 italic leading-relaxed">{vault.archetype ? "Path clear. View trajectory on the Horizon Board." : "Complete alignment to unlock."}</p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-6xl font-serif italic text-white mb-4">{vault.alignmentScore || 0}%</div>
                <Button onClick={() => navigate(vault.archetype ? '/horizon' : '/culture')} className="bg-teal-500 text-black font-black uppercase rounded-xl px-8 h-14 shadow-lg shadow-teal-500/10">
                  {vault.archetype ? "Horizon Board" : "Begin Alignment"} <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* LEGACY ARCHIVE CARD - REFRESHED WITH "REPLACE/DELETE" UI */}
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] relative overflow-hidden">
            <div className="flex flex-col gap-8 text-left relative z-10">
              <div className="flex items-center gap-3">
                <FileText className="text-teal-500" size={24} />
                <h3 className="text-xl font-bold text-white">Legacy Archive</h3>
              </div>
              
              {!vault.resume ? (
                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-white/5 hover:border-teal-500/20 rounded-[2rem] bg-black/40 cursor-pointer group transition-all relative overflow-hidden">
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="text-teal-500 animate-spin" size={32} />
                      <span className="text-[10px] font-black uppercase text-teal-500 animate-pulse">Archiving...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-teal-500/10 transition-colors">
                        <Upload className="text-zinc-600 group-hover:text-teal-500" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-zinc-500">Upload Resume / CV</span>
                      <p className="text-[8px] text-zinc-700 uppercase mt-2 font-black tracking-[0.2em]">Secure PDF or DOCX</p>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileChange} disabled={isUploading} />
                </label>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-[2.5rem] bg-teal-500/[0.03] border border-teal-500/20">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-black">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg leading-tight">Legacy Secured</h4>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1">{vault.resume.name}</p>
                      </div>
                    </div>
                    <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 uppercase">Archived</Badge>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <label className="flex items-center justify-center gap-2 h-12 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest cursor-pointer transition-all">
                      <RefreshCw size={12} className="text-teal-400" /> Replace
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <button 
                      onClick={() => setConfirmZone('archive')}
                      className="flex items-center justify-center gap-2 h-12 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 text-rose-400 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>

          {/* DANGER ZONES: CONDITIONAL MODALS */}
          <div className="pt-20">
            <AnimatePresence mode="wait">
              {!confirmZone ? (
                <motion.button 
                  key="trigger" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setConfirmZone('all')} 
                  className="text-[10px] text-zinc-500 hover:text-rose-500 uppercase font-black tracking-widest flex items-center gap-2 mx-auto transition-colors"
                >
                  <Trash2 size={12} /> Extinguish Hearth
                </motion.button>
              ) : (
                <motion.div 
                  key="confirm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="p-10 bg-rose-500/[0.02] border border-rose-500/20 rounded-[2.5rem] max-w-sm mx-auto space-y-6"
                >
                  <AlertTriangle className="text-rose-500 mx-auto" size={32} />
                  <div className="space-y-2 text-center">
                    <h5 className="text-white font-black uppercase text-xs tracking-tighter">
                      {confirmZone === 'archive' ? "Clear Legacy Archive?" : "Extinguish the Hearth?"}
                    </h5>
                    <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                      {confirmZone === 'archive' 
                        ? "This will remove your Resume. You can re-upload at any time." 
                        : "This will wipe EVERYTHING. Your alignment, your pulses, and your archive will be lost to the wind."}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={confirmZone === 'archive' 
                        ? () => { onSync({ ...vault, resume: null }); setConfirmZone(null); triggerToast("Archive cleared."); } 
                        : handleFullWipe
                      } 
                      className="bg-rose-500 text-white font-black uppercase w-full rounded-xl"
                    >
                      {confirmZone === 'archive' ? "Confirm Delete" : "Wipe Everything"}
                    </Button>
                    <button onClick={() => setConfirmZone(null)} className="text-zinc-500 uppercase text-[10px] font-black py-2">Cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const Badge = ({ children, className }) => (
  <span className={`text-[9px] font-black tracking-widest px-3 py-1 rounded-full border ${className}`}>{children}</span>
);