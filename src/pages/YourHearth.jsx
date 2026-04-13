import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Flame, Compass, Heart, MessageSquare, Lock, Sparkles,
  Zap, BarChart, Clock, Upload, Loader2, CheckCircle2, RefreshCw, ArrowRight, Star, LocateFixed,
  FileUp, Circle, ChevronDown, ChevronUp, Info, Trees, Map, Binoculars, ShieldCheck
} from 'lucide-react';

const ProtocolMilestone = ({ icon: Icon, title, description, isCompleted }) => (
  <div 
    className={`flex items-start gap-3 md:gap-4 p-4 rounded-2xl border transition-all duration-700 ${
      isCompleted 
      ? 'bg-teal-500/5 border-teal-500/20 opacity-60 shadow-[inset_0_0_20px_rgba(20,184,166,0.02)]' 
      : 'bg-white/[0.02] border-white/5'
    }`}
  >
    <div className={`mt-1 shrink-0 ${isCompleted ? 'text-teal-500' : 'text-slate-700'}`}>
      {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} className="opacity-20" />}
    </div>
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2">
        <Icon size={12} className={isCompleted ? 'text-teal-500' : 'text-slate-500'} />
        <h4 className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-teal-200/50' : 'text-slate-400'}`}>
          {title}
        </h4>
      </div>
      <p className="text-[9px] md:text-[10px] text-slate-500 font-light italic leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const PathfinderProtocol = ({ vault, pulses }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasResume = !!vault?.resume;
  const hasPulses = pulses && pulses.length > 0;
  
  const milestones = [
    { id: 'resume', icon: FileUp, isCompleted: hasResume, title: "Ground Your Story", description: "Optional: Uploading your resume allows for personalized alignment." },
    { id: 'checkin', icon: Compass, isCompleted: hasPulses, title: "Take the Pulse", description: "Invitation: Document your daily weather to map your trajectory." },
    { id: 'alignment', icon: Map, isCompleted: false, title: "Find Your North", description: "Exploration: Visit Ecosystem Alignment to sync your values." },
    { id: 'canopy', icon: Trees, isCompleted: false, title: "Take Flight", description: "Vision: Survey pathways in The Canopy for a higher view." },
    { id: 'embers', icon: Flame, isCompleted: false, title: "Share the Spark", description: "Community: Embers Chat is here for reciprocity whenever ready." }
  ];

  const completedCount = milestones.filter(m => m.isCompleted).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="w-full mb-8 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="bg-[#1A1423]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-5 md:p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left group"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)] group-hover:scale-110 transition-transform duration-500">
              <Compass size={20} />
            </div>
            <div>
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white">Pathfinder's Protocol</h3>
              <p className="hidden xs:block text-[8px] md:text-[9px] text-slate-500 italic font-light tracking-wide mt-1">Non-linear integration for professional migration.</p>
            </div>
          </div>
          <div className="flex items-center gap-6 md:gap-10">
            <div className="hidden sm:flex flex-col items-end gap-1.5">
              <div className="w-32 md:w-40 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-teal-600 to-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                  transition={{ duration: 1.5, ease: "circOut" }}
                />
              </div>
              <span className="text-[7px] md:text-[8px] font-black text-teal-500/40 uppercase tracking-[0.2em]">{progress}% Synced</span>
            </div>
            {isOpen ? <ChevronUp size={18} className="text-slate-600" /> : <ChevronDown size={18} className="text-slate-600" />}
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 md:p-8 pt-0 space-y-4">
                <div className="h-[1px] w-full bg-gradient-to-r from-white/5 via-white/5 to-transparent mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {milestones.map((m) => (
                    <ProtocolMilestone key={m.id} {...m} />
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-3 text-slate-600 opacity-40">
                  <Info size={12} />
                  <p className="text-[8px] md:text-[9px] font-black italic uppercase tracking-widest text-center">
                    The path is circular, not linear. Return to any node as your weather shifts.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Constellation = ({ pulses = [] }) => {
  const stars = useMemo(() => {
    return pulses.map((pulse, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      size: pulse.reflection?.length > 50 ? 5 : 3,
      opacity: 0.4 + (i / pulses.length) * 0.6,
      ...pulse
    }));
  }, [pulses]);

  return (
    <div className="relative w-full aspect-square bg-[#0F0A15] rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 overflow-hidden group shadow-inner">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.08),transparent_70%)]" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      <div className="relative h-full w-full">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.map((star, i) => {
            if (i === 0) return null;
            const prev = stars[i - 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${prev.x}%`} y1={`${prev.y}%`}
                x2={`${star.x}%`} y2={`${star.y}%`}
                stroke="rgba(20, 184, 166, 0.15)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            );
          })}
        </svg>

        {stars.map((star, idx) => (
          <motion.div
            key={star.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: star.opacity }}
            whileHover={{ scale: 1.5, opacity: 1, zIndex: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute cursor-help"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <Star
                size={star.size * 3}
                className="text-teal-400 fill-teal-400/20 hover:fill-teal-400 transition-all duration-500 shadow-[0_0_15px_rgba(20,184,166,0.6)]"
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-4 bg-[#1A1423]/95 backdrop-blur-xl border border-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-50 shadow-2xl scale-90 group-hover:scale-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[7px] font-black text-teal-500 uppercase tracking-widest">{new Date(star.timestamp).toLocaleDateString()}</span>
                  <span className="text-[10px]">{star.emoji}</span>
                </div>
                <p className="text-[10px] text-slate-300 italic leading-relaxed font-light">"{star.reflection?.substring(0, 80)}..."</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-8 left-8 flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <LocateFixed size={12} className="text-teal-400" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Temporal Map: {pulses.length} Nodes</span>
        </div>
      </div>
    </div>
  );
};

export default function Hearth({ vault, onSync, onResumeSync }) {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [pulses, setPulses] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [fileName, setFileName] = useState('');

  const emojis = [
    { icon: "🌱", label: "Growing" },
    { icon: "🔥", label: "Ignited" },
    { icon: "🌊", label: "Flowing" },
    { icon: "🏔️", label: "Grounded" },
    { icon: "🌪️", label: "Shifting" },
    { icon: "✨", label: "Inspired" }
  ];

  useEffect(() => {
    const initializeHearth = async () => {
      try {
        if (window.base44?.entities?.RootwerkLog) {
          const history = await window.base44.entities.RootwerkLog.list();
          if (history) {
            setPulses([...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
          }
        }
      } catch (err) {
        console.error("Error loading pulses:", err);
      }
      if (vault?.resume) {
        setFileName(vault.resume.name || 'Synced Resume');
        setUploadStatus('success');
      }
    };
    initializeHearth();
  }, [vault]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
        if (onResumeSync) onResumeSync(file);
      }, 2800);
    }
  };

  const calculateStreak = () => {
    if (pulses.length === 0) return 0;
    const dates = pulses.map(p => new Date(p.timestamp).toDateString());
    const uniqueDates = [...new Set(dates)];
    let streak = 0;
    let today = new Date();
    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      if (uniqueDates.includes(checkDate.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const handleLogPulse = async () => {
    if (!selectedEmoji && !reflection) return;
    setIsLogging(true);
    const newPulse = {
      emoji: selectedEmoji || "Pulse",
      reflection,
      timestamp: new Date().toISOString()
    };
    try {
      if (window.base44?.entities?.RootwerkLog) {
        await window.base44.entities.RootwerkLog.create(newPulse);
      }
      setPulses(prev => [newPulse, ...prev]);
      setSelectedEmoji(null);
      setReflection("");
      if (onSync) onSync();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogging(false);
    }
  };

  const streakCount = calculateStreak();
  const pulseCount = pulses.length;
  const hasLoggedToday = pulses.some(p =>
    new Date(p.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <header className="mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
            <div className="flex gap-5 md:gap-8 items-center">
              <div className="p-4 md:p-5 bg-teal-500/10 rounded-3xl border border-teal-500/20 shadow-[0_0_25px_rgba(20,184,166,0.1)]">
                <Compass size={32} className="text-teal-400" />
              </div>
              <div>
                <p className="text-[9px] md:text-[11px] font-black uppercase text-teal-500/60 tracking-[0.5em] mb-2">OPERATIONAL BASE</p>
                <h2 className="text-3xl md:text-5xl font-serif italic tracking-tight leading-none">The Hearth</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
               {streakCount > 0 && (
                <div className="flex items-center gap-2.5 px-4 py-2.5 md:px-6 md:py-3 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <Flame size={14} className="text-orange-500 fill-orange-500" />
                  <span className="text-[9px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest">{streakCount} DAY STREAK</span>
                </div>
               )}
               <div className="px-4 py-2.5 md:px-6 md:py-3 bg-white/[0.03] border border-white/10 rounded-full flex items-center gap-3 text-slate-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]" /> Active Session
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-20 relative px-4 md:px-12 mb-16">
            {[
              { label: 'Discovery', icon: <Compass size={22} />, active: true, desc: "Rootwerk" },
              { label: 'Alignment', icon: <Map size={18} />, active: false, desc: "Ecosystem" },
              { label: 'Launch', icon: <Trees size={18} />, active: false, desc: "Canopy" }
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-4 md:gap-6 relative z-10 group">
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-3xl border-2 flex items-center justify-center transition-all duration-1000 ${step.active ? 'border-teal-500 bg-teal-500/20 text-teal-400 shadow-[0_0_40px_rgba(20,184,166,0.15)]' : 'border-white/5 bg-white/[0.02] text-slate-800'}`}>
                  {step.icon}
                </div>
                <div className="text-center">
                  <p className={`text-[9px] md:text-[12px] font-black uppercase tracking-[0.2em] ${step.active ? 'text-white' : 'text-slate-800'}`}>{step.label}</p>
                  <p className="hidden md:block text-[8px] font-bold text-slate-700 uppercase tracking-widest mt-1 italic">{step.desc}</p>
                </div>
              </div>
            ))}
            <div className="absolute top-7 md:top-10 left-0 w-full h-[1px] bg-gradient-to-r from-teal-500/40 via-white/5 to-white/5 -z-0" />
          </div>

          <PathfinderProtocol vault={vault} pulses={pulses} />
        </header>

        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-6 mb-10 md:mb-12">
            <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-4 italic text-teal-500 shrink-0">
              <Zap size={16} className="fill-teal-500/20" /> ALIGNMENT ENGINE
            </h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          
          <Card className={`relative group overflow-hidden rounded-[2.5rem] md:rounded-[4rem] border-2 border-dashed transition-all duration-700 ${uploadStatus === 'success' ? 'border-teal-500/50 bg-teal-500/5 shadow-[inset_0_0_50px_rgba(20,184,166,0.05)]' : 'border-white/10 bg-[#1C1622]/40 hover:border-teal-500/30'}`}>
            {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
              <input type="file" onChange={handleResumeUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".pdf,.doc,.docx" />
            )}
            <div className="p-10 md:p-20 flex flex-col items-center text-center">
              {uploadStatus === 'idle' && (
                <div className="flex flex-col items-center max-w-lg">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-teal-500/10 flex items-center justify-center text-teal-400 mb-8 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                    <FileUp size={32} />
                  </div>
                  <h3 className="text-white font-serif italic text-2xl md:text-3xl mb-4">Integrate Professional History</h3>
                  <p className="text-[10px] md:text-[12px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed mb-8">Drop your resume to synthesize your background into the current ecosystem dialect.</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <ShieldCheck size={14} className="text-teal-500/50" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Encrypted Local Substrate</span>
                  </div>
                </div>
              )}
              {uploadStatus === 'uploading' && (
                <div className="flex flex-col items-center">
                  <div className="relative mb-8">
                    <Loader2 className="w-16 h-16 md:w-20 md:h-20 text-teal-500 animate-spin" />
                    <Sparkles size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-400 animate-pulse" />
                  </div>
                  <h3 className="text-white font-serif italic text-2xl md:text-3xl mb-3">Extracting Value...</h3>
                  <p className="text-[10px] md:text-[12px] text-teal-500 animate-pulse uppercase tracking-[0.3em] font-bold">Bridging Past and Potential</p>
                </div>
              )}
              {uploadStatus === 'success' && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-8 border border-teal-500/30">
                    <CheckCircle2 className="w-10 h-10 text-teal-400" />
                  </div>
                  <h3 className="text-white font-serif italic text-2xl md:text-3xl mb-2">History Synchronized</h3>
                  <p className="text-[10px] md:text-[11px] text-teal-500/70 font-black mb-10 uppercase tracking-[0.3em] bg-teal-500/5 px-4 py-2 rounded-full border border-teal-500/10">{fileName}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Button onClick={() => navigate('/alignment')} className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-[0.3em] text-[11px] h-16 px-14 rounded-2xl shadow-xl shadow-teal-500/20 group transition-all hover:-translate-y-1 active:translate-y-0">
                      Begin Alignment <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    <button onClick={() => setUploadStatus('idle')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-white transition-colors group">
                      <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Re-Sync Substrate
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="col-span-12 lg:col-span-7 space-y-16">
            <div className="flex items-center gap-6">
              <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] flex items-center gap-4 italic text-teal-500 shrink-0">
                <Flame size={16} className="fill-teal-500/20" /> THE ROOTWORK
              </h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>

            <Card className="bg-[#1A1423]/60 backdrop-blur-md border-white/10 p-8 md:p-12 space-y-12 md:space-y-16 shadow-2xl rounded-[3rem] relative overflow-hidden">
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]" />
               
               <div className="space-y-8 relative z-10">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">1. THE EMOJI PULSE</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-5">
                  {emojis.map((e) => (
                    <button
                      key={e.label}
                      disabled={hasLoggedToday}
                      onClick={() => setSelectedEmoji(e.label === selectedEmoji ? null : e.label)}
                      className={`aspect-square flex items-center justify-center rounded-[1.5rem] border transition-all duration-500 ${selectedEmoji === e.label ? 'bg-teal-500/20 border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.2)] scale-110' : 'bg-white/[0.03] border-white/5 grayscale hover:grayscale-0 hover:bg-white/[0.08] hover:scale-105'} ${hasLoggedToday ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-2xl md:text-3xl">{e.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8 relative z-10">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">2. DAILY REFLECTION</p>
                <div className={`bg-black/40 rounded-[2rem] p-8 min-h-[180px] border transition-all duration-500 ${hasLoggedToday ? 'opacity-50 border-white/5' : 'border-white/5 focus-within:border-teal-500/30 focus-within:shadow-[0_0_30px_rgba(20,184,166,0.03)]'}`}>
                  <Textarea
                    placeholder={hasLoggedToday ? "Hearth is resting. Your pulse is recorded." : "What shifted in your internal weather today?"}
                    disabled={hasLoggedToday}
                    className="bg-transparent border-none p-0 focus-visible:ring-0 text-lg md:text-xl text-white italic resize-none leading-relaxed placeholder:text-slate-800 min-h-[120px]"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleLogPulse}
                  disabled={isLogging || hasLoggedToday || (!selectedEmoji && !reflection)}
                  className={`w-full text-[11px] font-black uppercase tracking-[0.3em] h-16 md:h-20 rounded-2xl transition-all duration-500 ${hasLoggedToday ? "bg-white/5 text-slate-700 border border-white/10" : "bg-teal-600 hover:bg-teal-500 text-black shadow-2xl shadow-teal-500/20 hover:-translate-y-1"}`}
                >
                  {isLogging ? <Loader2 className="animate-spin" /> : hasLoggedToday ? "Next Sync Available Tomorrow" : "Commit Pulse to Substrate"}
                </Button>
              </div>
            </Card>

            <div className="space-y-8">
              <div className="flex items-center gap-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-600">
                  <MessageSquare size={14} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">TEMPORAL LOGBOOK</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pulses.length > 0 ? pulses.map((entry, i) => (
                  <Card key={i} className="p-6 md:p-8 border border-white/5 rounded-[2rem] bg-[#1A1423]/40 hover:bg-[#1A1423]/60 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <span className="text-2xl">{entry.emoji}</span>
                    </div>
                    <div className="space-y-4">
                      <span className="text-[9px] font-black text-teal-500/50 uppercase tracking-[0.2em] block">{new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      <p className="text-sm leading-relaxed italic text-slate-400 group-hover:text-slate-200 transition-colors font-light">"{entry.reflection}"</p>
                    </div>
                  </Card>
                )) : <div className="col-span-2 text-center py-20 opacity-20 italic text-sm tracking-widest uppercase">The log is waiting for its first spark.</div>}
              </div>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-5 space-y-10 lg:sticky lg:top-12">
            <Card className="bg-[#1C1622]/60 backdrop-blur-md border-white/5 p-10 space-y-10 rounded-[3rem] shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400">
                    <Compass size={18} />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">MATURITY</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-serif italic text-white">{Math.min(100, Math.round((pulseCount / 14) * 100))}%</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-500 leading-relaxed italic font-light">
                  Professional transitions require consistent grounding. Feed the hearth <span className="text-teal-400 font-bold underline decoration-teal-500/30 underline-offset-4">{Math.max(0, 14 - pulseCount)} more times</span> to fully resolve the Constellation.
                </p>
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (pulseCount / 14) * 100)}%` }}
                    className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                    transition={{ duration: 2, ease: "anticipate" }}
                  />
                </div>
              </div>
            </Card>

            {pulseCount >= 3 ? (
              <Constellation pulses={pulses} />
            ) : (
              <Card className="bg-[#1C1622]/20 border border-white/5 p-12 text-center grayscale opacity-40 rounded-[3rem] space-y-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart size={24} className="text-slate-600" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">THE CONSTELLATION</p>
                <p className="text-xs text-slate-700 italic leading-relaxed max-w-[200px] mx-auto">Gather 3 daily pulses to begin visual mapping of your professional trajectory.</p>
              </Card>
            )}

            <Card className="bg-transparent border-2 border-dashed border-white/10 p-10 space-y-6 rounded-[3rem] opacity-40 text-center hover:opacity-60 transition-opacity group cursor-help">
              <div className="flex items-center justify-center gap-4">
                <Heart size={16} className="text-teal-500 group-hover:scale-125 transition-transform" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white">RECIPROCITY</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic font-light">Every seat secured at the Hearth sponsors a peer navigating professional transition without resources.</p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}