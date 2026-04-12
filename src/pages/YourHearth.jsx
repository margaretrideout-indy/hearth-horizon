import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Flame, Compass, Heart, MessageSquare, Lock, Sparkles,
  Zap, BarChart, Clock, Upload, Loader2, CheckCircle2, RefreshCw, ArrowRight, Star, LocateFixed,
  FileUp, Circle, ChevronDown, ChevronUp, Info, Trees, Map
} from 'lucide-react';

const ProtocolMilestone = ({ icon: Icon, title, description, isCompleted }) => (
  <div 
    className={`flex items-start gap-3 md:gap-4 p-4 rounded-2xl border transition-all duration-700 ${
      isCompleted 
      ? 'bg-teal-500/5 border-teal-500/20 opacity-60' 
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
      <div className="bg-[#1A1423] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-5 md:p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white">Pathfinder's Protocol</h3>
              <p className="hidden xs:block text-[8px] md:text-[9px] text-slate-500 italic">No steps are mandatory—just invitations to integrate.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex flex-col items-end gap-1">
              <div className="w-24 md:w-32 h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500/40 transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[7px] md:text-[8px] font-black text-teal-500/40 uppercase tracking-widest">Progress</span>
            </div>
            {isOpen ? <ChevronUp size={18} className="text-slate-600" /> : <ChevronDown size={18} className="text-slate-600" />}
          </div>
        </button>

        {isOpen && (
          <div className="p-5 md:p-6 pt-0 space-y-3">
            <div className="h-[1px] w-full bg-white/5 mb-4 md:mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {milestones.map((m) => (
                <ProtocolMilestone key={m.id} {...m} />
              ))}
            </div>
            <div className="mt-4 md:mt-6 flex items-center justify-center gap-2 text-slate-600 opacity-50">
              <Info size={10} />
              <p className="text-[8px] md:text-[9px] italic uppercase tracking-tighter text-center">
                Hearth and Horizon honors your pace. There is no right way to migrate, only your way.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Constellation = ({ pulses = [] }) => {
  const stars = useMemo(() => {
    return pulses.map((pulse, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      size: pulse.reflection?.length > 50 ? 4 : 2,
      opacity: 0.4 + (i / pulses.length) * 0.6,
      ...pulse
    }));
  }, [pulses]);

  return (
    <div className="relative w-full aspect-square bg-[#0F0A15] rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.1),transparent_70%)]" />
      <div className="absolute inset-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative h-full w-full">
        {stars.map((star, idx) => (
          <motion.div
            key={star.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: star.opacity }}
            transition={{ delay: idx * 0.1, duration: 1 }}
            className="absolute cursor-help"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <div className="relative">
              <Star
                size={star.size * 3}
                className="text-teal-400 fill-teal-400/20 hover:fill-teal-400 transition-colors shadow-[0_0_10px_rgba(20,184,166,0.5)]"
              />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 md:w-48 p-3 md:p-4 bg-[#1A1423] border border-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                <p className="text-[7px] md:text-[8px] font-black text-teal-500 uppercase tracking-tighter mb-1">{new Date(star.timestamp).toLocaleDateString()}</p>
                <p className="text-[9px] md:text-[10px] text-white italic leading-relaxed">"{star.reflection?.substring(0, 60)}..."</p>
              </div>
            </div>
          </motion.div>
        ))}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {stars.map((star, i) => {
            if (i === 0) return null;
            const prev = stars[i - 1];
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${prev.x}%`} y1={`${prev.y}%`}
                x2={`${star.x}%`} y2={`${star.y}%`}
                stroke="rgba(20, 184, 166, 0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            );
          })}
        </svg>
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <LocateFixed size={12} className="text-teal-500" />
          <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500">Nodes: {pulses.length}</span>
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
      }, 2500);
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
    <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
            <div className="flex gap-4 md:gap-6 items-center">
              <div className="p-3 md:p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20">
                <Compass size={24} className="text-teal-400 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase text-teal-500/50 tracking-[0.4em] mb-1">INTENTIONAL PATH</p>
                <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight">Professional Transition</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
               {streakCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <Flame size={12} className="text-orange-500 fill-orange-500" />
                  <span className="text-[8px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest">{streakCount} DAY STREAK</span>
                </div>
               )}
               <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 md:gap-3 text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Stage 1 of 3
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-12 relative px-2 md:px-4 mb-12">
            {[
              { label: 'Discovery', icon: <Compass size={20} />, active: true },
              { label: 'Alignment', icon: <Lock size={16} />, active: false },
              { label: 'Launch', icon: <Lock size={16} />, active: false }
            ].map((step, i) => (
              <div key={step.label} className="flex flex-col items-center gap-3 md:gap-5 relative z-10">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${step.active ? 'border-teal-500 bg-teal-500/20 text-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.2)]' : 'border-white/5 bg-white/5 text-slate-800'}`}>
                  {step.icon}
                </div>
                <p className={`text-[8px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] ${step.active ? 'text-white' : 'text-slate-800'}`}>{step.label}</p>
              </div>
            ))}
            <div className="absolute top-6 md:top-8 left-0 w-full h-[1px] bg-gradient-to-r from-teal-500/50 via-white/5 to-white/5 -z-0" />
          </div>

          <PathfinderProtocol vault={vault} pulses={pulses} />
        </header>

        <section className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3 italic text-teal-500 shrink-0">
              <Zap size={14} className="fill-teal-500/20 md:w-4 md:h-4" /> ALIGNMENT ENGINE
            </h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <Card className={`relative group overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed transition-all duration-500 ${uploadStatus === 'success' ? 'border-teal-500/50 bg-teal-500/5' : 'border-white/10 bg-[#1C1622]/40 hover:border-teal-500/30'}`}>
            {uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
              <input type="file" onChange={handleResumeUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept=".pdf,.doc,.docx" />
            )}
            <div className="p-8 md:p-12 flex flex-col items-center text-center">
              {uploadStatus === 'idle' && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
                    <Upload size={28} />
                  </div>
                  <h3 className="text-white font-serif italic text-lg md:text-xl mb-2">Upload Your Resume</h3>
                  <p className="text-[9px] md:text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-sm">Connect your professional history for ecosystem mapping</p>
                </div>
              )}
              {uploadStatus === 'uploading' && (
                <>
                  <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-teal-500 animate-spin mb-6" />
                  <h3 className="text-white font-serif italic text-lg md:text-xl mb-2">Analyzing Mycelium...</h3>
                  <p className="text-[9px] md:text-[11px] text-teal-500 animate-pulse uppercase tracking-widest">Scanning professional foundations</p>
                </>
              )}
              {uploadStatus === 'success' && (
                <div className="animate-in fade-in zoom-in duration-500 flex flex-col items-center">
                  <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-teal-400 mb-6" />
                  <h3 className="text-white font-serif italic text-lg md:text-xl mb-1">Ecosystem Synced</h3>
                  <p className="text-[9px] md:text-[11px] text-teal-500 font-black mb-6 md:mb-8 uppercase tracking-tighter">{fileName}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                    <Button onClick={() => navigate('/alignment')} className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-[11px] h-12 md:h-14 px-8 md:px-12 rounded-2xl shadow-lg shadow-teal-500/20 group">
                      Begin Alignment <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <button onClick={() => setUploadStatus('idle')} className="flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                      <RefreshCw size={12} /> Re-Sync
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-3 italic text-teal-500 shrink-0">
                <Flame size={14} className="fill-teal-500/20 md:w-4 md:h-4" /> THE ROOTWORK
              </h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <Card className="bg-[#251D2D] border-white/10 p-6 md:p-10 space-y-8 md:space-y-10 shadow-xl rounded-[2rem] md:rounded-[3rem]">
              <div className="space-y-6">
                <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">1. THE EMOJI PULSE</p>
                <div className="grid grid-cols-3 xs:grid-cols-6 gap-3 md:gap-4">
                  {emojis.map((e) => (
                    <button
                      key={e.label}
                      disabled={hasLoggedToday}
                      onClick={() => setSelectedEmoji(e.label === selectedEmoji ? null : e.label)}
                      className={`aspect-square flex items-center justify-center rounded-2xl border transition-all duration-300 ${selectedEmoji === e.label ? 'bg-teal-500/20 border-teal-500 text-3xl scale-110' : 'bg-white/5 border-white/5 grayscale hover:grayscale-0 hover:bg-white/10'} ${hasLoggedToday ? 'opacity-20 cursor-not-allowed' : ''}`}
                    >
                      <span className="text-xl md:text-2xl">{e.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">2. DAILY REFLECTION</p>
                <div className={`bg-black/20 rounded-2xl md:rounded-[2rem] p-6 md:p-8 min-h-[140px] md:min-h-[160px] border border-white/5 transition-all ${hasLoggedToday ? 'opacity-50' : 'focus-within:border-teal-500/30'}`}>
                  <Textarea
                    placeholder={hasLoggedToday ? "Resting..." : "What felt resonant today?"}
                    disabled={hasLoggedToday}
                    className="bg-transparent border-none p-0 focus-visible:ring-0 text-base md:text-lg text-white italic resize-none leading-relaxed placeholder:text-slate-700 min-h-[100px]"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleLogPulse}
                  disabled={isLogging || hasLoggedToday || (!selectedEmoji && !reflection)}
                  className={`w-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] h-14 md:h-16 rounded-2xl transition-all ${hasLoggedToday ? "bg-white/5 text-slate-600 border border-white/10" : "bg-teal-500 hover:bg-teal-400 text-black shadow-lg shadow-teal-500/20"}`}
                >
                  {isLogging ? "Logging..." : hasLoggedToday ? "Hearth is Resting" : "Log the Pulse"}
                </Button>
              </div>
            </Card>
            <div className="space-y-6">
              <div className="flex items-center gap-3 px-2 text-slate-600">
                <MessageSquare size={14} />
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">LOGBOOK</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {pulses.length > 0 ? pulses.map((entry, i) => (
                  <Card key={i} className="p-5 md:p-6 border border-white/5 rounded-2xl bg-[#1C1622]/60">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">{new Date(entry.timestamp).toLocaleDateString()}</span>
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase italic border bg-white/5 text-slate-400 border-white/10">{entry.emoji}</span>
                    </div>
                    <p className="text-[11px] md:text-xs leading-relaxed italic text-slate-400">"{entry.reflection}"</p>
                  </Card>
                )) : <div className="col-span-2 text-center py-12 opacity-30 italic text-sm">No entries yet.</div>}
              </div>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-5 space-y-8">
            <Card className="bg-[#1C1622]/40 border-white/5 p-8 md:p-10 space-y-6 md:space-y-8 rounded-[2rem] md:rounded-[3rem]">
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-3"><Lock size={14} /><p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">MATURITY</p></div>
                <span className="text-[10px] md:text-[11px] font-black text-teal-500">{Math.min(100, Math.round((pulseCount / 14) * 100))}%</span>
              </div>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed italic">Feed the hearth <span className="text-white font-bold underline decoration-teal-500/50">{Math.max(0, 14 - pulseCount)} more times</span> to unlock the Constellation.</p>
              <div className="h-2.5 md:h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all duration-1000" style={{ width: `${Math.min(100, (pulseCount / 14) * 100)}%` }} />
              </div>
            </Card>

            {pulseCount >= 3 ? (
              <Constellation pulses={pulses} />
            ) : (
              <Card className="bg-[#1C1622]/20 border border-white/5 p-8 md:p-10 space-y-6 rounded-[2rem] md:rounded-[3rem] text-center grayscale opacity-40">
                <div className="flex items-center justify-center gap-3 text-slate-500"><BarChart size={18} /><p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]">THE CONSTELLATION</p></div>
                <p className="text-[9px] md:text-[10px] text-slate-600 italic leading-relaxed">Gather 3 pulses to begin mapping your trajectory.</p>
              </Card>
            )}

            <Card className="bg-transparent border-2 border-dashed border-white/5 p-8 md:p-10 space-y-6 rounded-[2rem] md:rounded-[3rem] opacity-50 text-center">
              <div className="flex items-center justify-center gap-3 text-white"><Heart size={14} className="text-teal-500 fill-teal-500" /><p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em]">RECIPROCITY</p></div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">One seat purchased sponsors a peer in professional transition.</p>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}