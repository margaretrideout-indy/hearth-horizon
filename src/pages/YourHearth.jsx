import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, Map, Binoculars, FileText, Sparkles, BookOpen, 
  Activity, Zap, ShieldCheck, Box, Upload, Trash2, ChevronRight, Flame
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function YourHearth({ vault, onSync, onResumeSync, onNavigateToLibrary }) {
  const [isProtocolOpen, setIsProtocolOpen] = useState(true);
  const [sentiment, setSentiment] = useState(null);
  const [reflection, setReflection] = useState("");
  const fileInputRef = useRef(null);
  
  const [userLogs, setUserLogs] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('hearth_user_logs') : null;
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hearth_user_logs', JSON.stringify(userLogs));
  }, [userLogs]);

  const userTier = vault?.tier || 'Seedling';
  const canArchitect = userTier === 'Steward' || userTier === 'Sentinel';
  
  const hasResume = vault?.isAligned || !!vault?.resume;
  const blueprints = canArchitect ? (vault?.blueprints || []) : [];
  const moodStreak = vault?.moodStreak || 3; 
  
  const baseMaturity = hasResume ? 8 : 0;
  const maturityPulses = baseMaturity + (blueprints.length * 2); 
  const maturityTarget = 14;
  const syncPercentage = Math.min(Math.round((maturityPulses / maturityTarget) * 100), 100);

  const sentiments = [
    { emoji: '🌱', label: 'New', type: 'positive' },
    { emoji: '🌲', label: 'Steady', type: 'positive' },
    { emoji: '🏔️', label: 'Stretched', type: 'heavy' },
    { emoji: '🔥', label: 'Inspired', type: 'positive' },
    { emoji: '✨', label: 'Clear', type: 'positive' }
  ];

  const getDynamicLogs = () => {
    const baseLogs = [
      { date: "08.04.26", event: "First Light", desc: "Your personal Hearth is now established. The logs are open." }
    ];

    if (!hasResume) {
      return [
        { 
          date: "--.--.--", 
          event: "Awaiting Connection", 
          desc: "The logbook is quiet. Sync your current legacy to begin mapping the path ahead.",
          isPending: true 
        },
        ...baseLogs
      ];
    }

    const logs = [
      { date: "13.04.26", event: "Archetype Found", desc: "System detected a high-affinity match between your legacy skills and current market growth." },
      { date: "10.04.26", event: "Market Survey", desc: "New topography data synced for your target industries." },
      ...baseLogs
    ];

    if (blueprints.length > 0) {
      logs.unshift({ 
        date: "Today", 
        event: "Blueprint Sealed", 
        desc: `Strategic pivot for ${blueprints[0].title} added to your vault.` 
      });
    }

    return logs;
  };

  const activeLogs = [...userLogs, ...getDynamicLogs()];

  const handleSealObservation = () => {
    if (!sentiment && !reflection) return;

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const formattedDate = `${day}.${month}.${year}`;

    const newEntry = {
      date: formattedDate,
      event: sentiment ? `${sentiment.emoji} Reflection` : "Quiet Observation",
      desc: reflection || `Checked in feeling ${sentiment?.label || 'contemplative'}.`,
      isPending: false
    };

    setUserLogs([newEntry, ...userLogs]);
    setSentiment(null);
    setReflection("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 p-6 bg-[#0A080D] overflow-x-hidden selection:bg-teal-500/30">
      <header className="relative py-12 text-center space-y-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 italic">Operational Base</p>
          <h1 className="text-5xl font-serif italic text-white tracking-tight">The Hearth</h1>
          
          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-3 px-5 py-2 rounded-2xl border border-white/5 bg-[#110E16] shadow-2xl">
              <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)] ${
                userTier === 'Seedling' ? 'bg-emerald-500' : 
                userTier === 'Steward' ? 'bg-teal-400' : 'bg-purple-500'
              }`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                Standing: <span className="text-white ml-1">{userTier}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center items-center max-w-2xl mx-auto py-8">
          <div className="absolute h-[1px] w-full bg-white/5" />
          <div className="relative flex justify-between w-full px-4">
            {[
              { label: 'Discovery', sub: 'ROOTWERK', icon: Compass, active: true },
              { label: 'Alignment', sub: 'ECOSYSTEM', icon: Map, active: hasResume },
              { label: 'Launch', sub: 'HORIZON BOARD', icon: Binoculars, active: blueprints.length > 0 }
            ].map((node, i) => (
              <div key={i} className="flex flex-col items-center gap-4 z-10">
                <div className={`p-4 rounded-[1.5rem] border transition-all duration-700 ${
                  node.active 
                    ? 'bg-[#0A080D] border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] text-teal-400 scale-110' 
                    : 'bg-zinc-900/50 border-white/5 text-zinc-600'
                }`}>
                  <node.icon size={24} />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${node.active ? 'text-white' : 'text-zinc-600'}`}>
                    {node.label}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-700 mt-1 italic">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="bg-[#110E16] border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
            <div 
              className="p-8 flex items-center justify-between cursor-pointer group"
              onClick={() => setIsProtocolOpen(!isProtocolOpen)}
            >
              <div className="flex items-center gap-6">
                <div className={`p-3 rounded-2xl border transition-colors ${isProtocolOpen ? 'border-teal-500/50 bg-teal-500/10' : 'border-white/5 bg-zinc-900/50'}`}>
                  <Compass className={`w-5 h-5 ${isProtocolOpen ? 'text-teal-400' : 'text-zinc-500'}`} />
                </div>
                <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">Pathfinder's Protocol</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:block w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${syncPercentage}%` }}
                     className="h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" 
                   />
                </div>
                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">{syncPercentage}% Prepared</span>
                <ChevronRight className={`w-4 h-4 text-zinc-600 transition-transform duration-500 ${isProtocolOpen ? 'rotate-90' : ''}`} />
              </div>
            </div>

            <AnimatePresence>
              {isProtocolOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/5"
                >
                  <div className="p-8 space-y-6 bg-zinc-950/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Legacy History", status: hasResume ? "Mapped" : "Waiting", icon: BookOpen, color: hasResume ? "text-teal-500" : "text-zinc-700" },
                        { title: "Core Strengths", status: hasResume ? "Identified" : "Waiting", icon: Activity, color: hasResume ? "text-teal-500" : "text-zinc-700" },
                        { 
                          title: "Industry Pivot", 
                          status: canArchitect ? (blueprints.length > 0 ? "Architected" : (hasResume ? "Ready" : "Waiting")) : "Locked", 
                          icon: Sparkles, 
                          color: blueprints.length > 0 ? "text-purple-500" : "text-zinc-700" 
                        },
                        { title: "Horizon Placement", status: syncPercentage > 80 ? "Matched" : "Pending", icon: Zap, color: syncPercentage > 80 ? "text-teal-500" : "text-zinc-700" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-black/20 border border-white/5 hover:border-teal-500/20 transition-all">
                          <div className="flex items-center gap-4">
                            <item.icon className={`w-4 h-4 ${item.color}`} />
                            <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">{item.title}</p>
                          </div>
                          <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.status}</span>
                        </div>
                      ))}
                    </div>

                    {canArchitect && blueprints.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center gap-2 px-2">
                          <Box className="w-3 h-3 text-teal-500" />
                          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Stored Blueprints</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {blueprints.map((bp, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 hover:border-teal-500/30 transition-all group">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-tight">{bp.title}</span>
                                <span className="text-[8px] text-zinc-500 uppercase tracking-widest italic">{bp.tier} Level Strategy</span>
                              </div>
                              <Button variant="ghost" className="h-8 px-4 text-[8px] font-black text-teal-500/60 group-hover:text-teal-400 uppercase tracking-widest">
                                Open Schematic
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card className="p-10 bg-gradient-to-br from-[#110E16] to-[#0A080D] border-white/5 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onResumeSync) onResumeSync(file);
                e.target.value = '';
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500 italic">Alignment Engine</p>
                  <h2 className="text-3xl font-serif italic text-white leading-tight">Tend the Hearth.</h2>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-light mx-auto md:mx-0 italic">
                  By syncing your Résumé or CV, we can translate your background into the growth opportunities ahead.
                </p>
                {hasResume ? (
                  <div className="flex flex-col gap-3 items-center md:items-start">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 shadow-lg">
                      <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                      <span className="text-[11px] font-bold text-teal-300 truncate max-w-[180px]">
                        {vault?.resume?.name || "Synced Legacy Document"}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-transparent border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white font-black rounded-xl h-10 px-5 text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all"
                      >
                        <Upload className="w-3 h-3" /> Replace
                      </Button>
                      <Button
                        onClick={() => onSync && onSync({ isAligned: false, resume: null })}
                        className="bg-transparent border border-red-900/20 text-red-500/40 hover:bg-red-500/10 hover:text-red-400 font-black rounded-xl h-10 px-5 text-[9px] uppercase tracking-widest flex items-center gap-2 transition-all"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-transparent border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-black shadow-[0_0_30px_rgba(20,184,166,0.1)] font-black rounded-xl h-14 px-10 transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 mx-auto md:mx-0"
                  >
                    <FileText className="w-4 h-4" /> Sync Legacy for Translation
                  </Button>
                )}
              </div>
              <div className="w-56 h-56 rounded-[3rem] bg-black border border-white/5 flex items-center justify-center relative shadow-inner overflow-hidden">
                 <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent)] ${!hasResume ? "animate-pulse" : ""}`} />
                 <Flame className={`w-12 h-12 transition-all duration-1000 ${hasResume ? "text-teal-400 scale-110 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]" : "text-teal-500/20 group-hover:text-teal-400 group-hover:scale-125"}`} />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-[#110E16] border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <motion.div 
                animate={!hasResume ? { opacity: [0.3, 1, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,1)]" 
              />
              The Logbook
            </h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {activeLogs.map((log, i) => (
                  <motion.div 
                    key={log.event + log.date + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group cursor-default mb-6"
                  >
                    <div className="flex justify-between items-end mb-1">
                      <p className={`text-xs font-bold uppercase tracking-tighter transition-colors ${log.isPending ? 'text-zinc-600 italic' : 'text-white group-hover:text-teal-400'}`}>
                        {log.event}
                      </p>
                      <p className="text-[8px] font-black text-zinc-700 tracking-[0.2em]">{log.date}</p>
                    </div>
                    <p className={`text-[11px] leading-relaxed font-light border-l pl-4 mt-2 transition-colors ${
                      log.isPending 
                        ? 'text-zinc-700 border-zinc-900 italic' 
                        : 'text-zinc-500 italic border-white/5 group-hover:border-teal-500/50'
                    }`}>
                      {log.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          <Card className="bg-[#110E16] border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/5 blur-[50px] rounded-full" />
            
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <Sparkles className="w-3 h-3 text-purple-400" />
              Reflection
            </h3>

            <div className="space-y-8 relative z-10">
              <p className="text-[11px] text-zinc-400 italic">How does the path look today?</p>
              
              <div className="flex justify-between items-start">
                {sentiments.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setSentiment(item)}
                    className="flex flex-col items-center gap-3 group w-14"
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all duration-500 ${
                      sentiment?.label === item.label 
                        ? 'bg-teal-500/20 border border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.2)] scale-110' 
                        : 'bg-black border border-white/5 grayscale hover:grayscale-0'
                    }`}>
                      {item.emoji}
                    </div>
                    <span className={`text-[7px] font-black uppercase tracking-[0.2em] transition-colors ${
                      sentiment?.label === item.label ? 'text-teal-400' : 'text-zinc-700 group-hover:text-zinc-500'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {moodStreak >= 3 && sentiment?.type === 'heavy' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-teal-400">
                      <ShieldCheck size={12} />
                      <p className="text-[9px] font-black uppercase tracking-widest italic">Hearthkeeper's Note</p>
                    </div>
                    <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                      Transitioning is heavy work. Remember, the <strong>Sanctuary</strong> is open for a quiet moment of rest whenever the climb feels too steep.
                    </p>
                    <button 
                      onClick={onNavigateToLibrary}
                      className="text-[9px] text-teal-500 font-black hover:text-teal-300 uppercase tracking-widest pt-1 transition-colors"
                    >
                      Visit Sanctuary →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Record a thought or observation..."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-zinc-300 placeholder:text-zinc-800 focus:outline-none focus:border-teal-500/30 transition-all resize-none h-24 font-light italic"
                />
                <Button 
                  onClick={handleSealObservation}
                  className={`w-full text-[9px] font-black uppercase tracking-[0.3em] h-12 rounded-xl transition-all ${
                    sentiment || reflection 
                      ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500/20' 
                      : 'bg-zinc-900/50 text-zinc-700 border border-white/5'
                  }`}
                >
                  Seal Observation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}