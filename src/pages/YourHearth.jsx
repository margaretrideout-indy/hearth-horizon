import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Flame, Upload, CheckCircle2, FileText, 
  Sparkles, ArrowRight, ShieldCheck, Zap,
  BookOpen, PenLine, Lock, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function YourHearth({ vault, onResumeSync, onSync, onNavigateToHorizon }) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [reflection, setReflection] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const pulses = ["🌱", "🔥", "🌊", "🌪️", "💎"];

  const handleFileChange = (e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    // Simulate the "Hearth" processing the legacy data
    setTimeout(() => {
      onResumeSync(file);
      setIsUploading(false);
    }, 2000);
  };

  const handleSaveReflection = () => {
    if (!reflection && !selectedEmoji) return;
    const newPulse = {
      date: new Date().toISOString(),
      emoji: selectedEmoji,
      text: reflection
    };
    // Sync to vault
    onSync({ pulses: [newPulse, ...(vault.pulses || [])] });
    setReflection("");
    setSelectedEmoji(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-1000">
      
      {/* --- HERO SECTION --- */}
      <header className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/5 border border-teal-500/20 text-teal-400 mb-2">
          <Flame size={14} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Eternal Flame</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight">Your Hearth</h1>
        <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto font-light italic">
          Fuel the flame with your <strong>Résumé/CV</strong> and document your internal weather.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* --- LEFT COLUMN: REFLECTION & LOGBOOK --- */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* DAILY CHECK-IN (Optional) */}
          <Card className="bg-[#0D0B10] border-white/5 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-teal-400">
                <PenLine size={18} />
                <h3 className="text-lg font-bold tracking-tight">Internal Weather</h3>
              </div>
              
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">Optional Pulse</p>
                <div className="flex justify-between bg-black/40 p-2 rounded-2xl border border-white/5">
                  {pulses.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-2xl w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                        selectedEmoji === emoji 
                        ? "bg-teal-500/20 border-teal-500/40 scale-110 shadow-[0_0_15px_rgba(20,184,166,0.2)]" 
                        : "hover:bg-white/5"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 italic">Optional Reflection</p>
                <Textarea 
                  placeholder="How does the journey feel today?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="bg-black/40 border-white/5 rounded-2xl text-xs italic placeholder:text-zinc-800 min-h-[100px] focus:border-teal-500/30 transition-all resize-none"
                />
              </div>

              <Button 
                onClick={handleSaveReflection}
                className="w-full bg-white/5 hover:bg-teal-500 hover:text-black border border-white/10 text-[10px] font-black uppercase tracking-widest h-12 rounded-xl transition-all"
              >
                Etch into Hearth
              </Button>
            </div>
          </Card>

          {/* THE LOGBOOK (Ecosystem Alignment Info) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-500 px-4">
              <BookOpen size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest italic">The Logbook: Alignment Record</span>
            </div>

            {vault.isAligned ? (
              <Card className="p-6 bg-teal-500/5 border border-teal-500/20 rounded-[2rem] space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-bold text-lg leading-tight">{vault.archetype || "Calibrated Traveler"}</h4>
                    <p className="text-[10px] text-teal-500 font-black uppercase tracking-widest mt-1">Standing Calibrated</p>
                  </div>
                  <div className="bg-teal-500 text-black text-[10px] font-black px-2 py-1 rounded-md">
                    {vault.alignmentScore || "94"}% FIT
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 italic leading-relaxed font-light">
                  "Your frequency is currently aligned with {vault.journey || "impact-driven territories"}."
                </p>
                <Button 
                  onClick={() => navigate('/alignment')}
                  variant="link" 
                  className="p-0 h-auto text-[9px] text-teal-400 font-black uppercase tracking-[0.2em]"
                >
                  View Full Alignment Details →
                </Button>
              </Card>
            ) : (
              <div className="p-8 bg-white/[0.02] border border-dashed border-white/10 rounded-[2rem] text-center">
                <p className="text-[11px] text-zinc-600 italic mb-4">No ecosystem data found in the Logbook.</p>
                <Button 
                  onClick={() => navigate('/alignment')}
                  className="bg-zinc-900 hover:bg-teal-500/10 text-zinc-400 hover:text-teal-400 text-[9px] font-black uppercase tracking-widest rounded-full px-6 border border-white/5"
                >
                  Begin Ecosystem Alignment
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: RÉSUMÉ/CV SYNC --- */}
        <div className="lg:col-span-7 space-y-8">
          
          <Card className="bg-[#0D0B10] border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2 text-left">
                <h3 className="text-2xl font-bold text-white tracking-tight">Sync Your Legacy</h3>
                <p className="text-sm text-zinc-500 font-light">Provide your latest <strong>Résumé/CV</strong> (PDF/Docx) to begin the translation.</p>
              </div>

              {!vault.resume ? (
                <label className="group flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-white/10 hover:border-teal-500/40 rounded-[2.5rem] bg-black/40 cursor-pointer transition-all duration-500 hover:bg-teal-500/[0.01]">
                  <div className="flex flex-col items-center">
                    <div className="p-6 bg-zinc-900 rounded-3xl mb-4 group-hover:scale-110 group-hover:bg-teal-500/10 transition-all duration-500 shadow-xl">
                      {isUploading ? <Zap className="text-teal-400 animate-bounce" size={36} /> : <Upload className="text-zinc-600 group-hover:text-teal-400" size={36} />}
                    </div>
                    <p className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Drop Résumé/CV here</p>
                    <p className="text-[9px] text-zinc-700 mt-2 uppercase tracking-widest font-black">Max file size: 5MB</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </label>
              ) : (
                <div className="p-8 bg-teal-500/5 border border-teal-500/20 rounded-[2.5rem] flex items-center justify-between group animate-in zoom-in-95 shadow-inner">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-teal-500 text-black rounded-2xl shadow-[0_0_20px_rgba(20,184,166,0.3)]">
                      <FileText size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white line-clamp-1">{vault.resume.name}</h4>
                      <p className="text-xs text-teal-500/60 font-black uppercase tracking-widest italic">Legacy Document Synced</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-teal-500" size={32} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-start gap-3">
                  <ShieldCheck size={20} className="text-teal-500/40" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Privacy Locked</h5>
                    <p className="text-[10px] text-zinc-600 leading-tight mt-1 italic">Data remains local for your calculations.</p>
                  </div>
                </div>
                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-start gap-3">
                  <Sparkles size={20} className="text-teal-500/40" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">AI Translation</h5>
                    <p className="text-[10px] text-zinc-600 leading-tight mt-1 italic">Mapping skills to the Horizon ecosystem.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/[0.03] blur-[100px] -z-0" />
          </Card>

          {/* NEXT STEP ACTION */}
          <div className="pt-4">
            <button 
              onClick={onNavigateToHorizon}
              disabled={!vault.resume}
              className={`w-full p-8 rounded-[2.5rem] border flex items-center justify-between transition-all duration-700 group relative overflow-hidden ${
                vault.resume 
                ? "bg-teal-500 text-black border-teal-400 hover:shadow-[0_0_50px_rgba(20,184,166,0.3)] hover:scale-[1.01]" 
                : "bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed opacity-40"
              }`}
            >
              <div className="relative z-10 flex items-center gap-6">
                <div className={`p-4 rounded-2xl border ${vault.resume ? "bg-black/10 border-black/20" : "bg-white/5 border-white/10"}`}>
                  <Globe size={28} className={vault.resume ? "animate-pulse" : ""} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-1">Proceed to Expedition</p>
                  <p className="text-2xl font-serif italic font-bold">The Horizon Board</p>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                {!vault.resume ? <Lock size={20} /> : <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}