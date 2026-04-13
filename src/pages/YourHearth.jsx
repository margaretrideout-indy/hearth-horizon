import React, { useState, useEffect } from 'react';
import { 
  Compass, Map, Trees, FileText, Sparkles, BookOpen, 
  ChevronRight, Activity, Zap, MessageSquare 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function YourHearth({ vault, onResumeSync }) {
  const [isProtocolOpen, setIsProtocolOpen] = useState(true);
  
  // Checking if the resume exists in the vault to trigger the state change
  const hasResume = vault?.isAligned || !!vault?.resume;
  
  const maturityPulses = vault?.pulses || (hasResume ? 8 : 0); 
  const maturityTarget = 14;
  const syncPercentage = Math.round((maturityPulses / maturityTarget) * 100);

  // Dynamic Log Logic
  const getDynamicLogs = () => {
    const baseLogs = [
      { date: "08.04.26", event: "First Light", desc: "Your personal Hearth is now established and ready for sync." }
    ];

    if (!hasResume) {
      return [
        { 
          date: "--.--.--", 
          event: "Awaiting Connection", 
          desc: "The logbook is quiet. Tend the hearth by uploading your resume to begin your journey.",
          isPending: true 
        },
        ...baseLogs
      ];
    }

    return [
      { date: "13.04.26", event: "New Growth Found", desc: "Your background in education is an 88% match for 'L&D Operations'." },
      { date: "10.04.26", event: "Surveying the Land", desc: "Detected hiring surges across the Canadian tech corridor." },
      ...baseLogs
    ];
  };

  const activeLogs = getDynamicLogs();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 p-6 bg-[#0A080D]">
      {/* Top Nav: The Path */}
      <header className="relative py-12 text-center space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60">Operational Base</p>
          <h1 className="text-5xl font-bold text-white font-heading italic tracking-tight">The Hearth</h1>
        </div>

        <div className="relative flex justify-center items-center max-w-2xl mx-auto py-8">
          <div className="absolute h-[1px] w-full bg-zinc-800" />
          
          <div className="relative flex justify-between w-full px-4">
            {[
              { label: 'Discovery', sub: 'ROOTWERK', icon: Compass, active: true },
              { label: 'Alignment', sub: 'ECOSYSTEM', icon: Map, active: hasResume },
              { label: 'Launch', sub: 'CANOPY', icon: Trees, active: hasResume }
            ].map((node, i) => (
              <div key={i} className="flex flex-col items-center gap-4 z-10">
                <div className={`p-4 rounded-[1.5rem] border transition-all duration-700 ${
                  node.active 
                    ? 'bg-[#0A080D] border-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.3)] text-teal-400 scale-110' 
                    : 'bg-zinc-900/50 border-zinc-800 text-zinc-600'
                }`}>
                  <node.icon size={24} />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${node.active ? 'text-white' : 'text-zinc-600'}`}>
                    {node.label}
                  </p>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-700 mt-1">{node.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Pathfinder's Protocol */}
          <Card className="bg-[#110E16] border-zinc-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
            <div 
              className="p-8 flex items-center justify-between cursor-pointer group"
              onClick={() => setIsProtocolOpen(!isProtocolOpen)}
            >
              <div className="flex items-center gap-6">
                <div className={`p-3 rounded-2xl border transition-colors ${isProtocolOpen ? 'border-teal-500/50 bg-teal-500/10' : 'border-zinc-800 bg-zinc-900/50'}`}>
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
                  className="border-t border-zinc-800/30"
                >
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/20">
                    {[
                      { title: "Experience History", status: hasResume ? "Mapped" : "Waiting", icon: BookOpen, color: hasResume ? "text-teal-500" : "text-zinc-700" },
                      { title: "Core Strengths", status: hasResume ? "Identified" : "Waiting", icon: Activity, color: hasResume ? "text-teal-500" : "text-zinc-700" },
                      { title: "Industry Pivot", status: hasResume ? "Translating" : "Waiting", icon: Sparkles, color: hasResume ? "text-purple-500" : "text-zinc-700" },
                      { title: "Pathway Readiness", status: "Pending", icon: Zap, color: "text-zinc-700" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 hover:border-teal-500/20 transition-all">
                        <div className="flex items-center gap-4">
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                          <p className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">{item.title}</p>
                        </div>
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Alignment Engine - The Resume Section */}
          <Card className="p-10 bg-gradient-to-br from-[#110E16] to-[#0A080D] border-zinc-800/50 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500">Alignment Engine</p>
                  <h2 className="text-3xl font-bold text-white font-serif italic leading-tight">Tend the Hearth.</h2>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-light mx-auto md:mx-0">
                  By syncing your resume, we can translate your leadership and educational legacy into the new growth opportunities ahead.
                </p>
                <Button 
                  onClick={onResumeSync}
                  className={`bg-transparent border-2 font-black rounded-xl h-14 px-10 transition-all uppercase text-[10px] tracking-widest flex items-center gap-3 mx-auto md:mx-0 ${
                    hasResume 
                      ? "border-zinc-700 text-zinc-500 cursor-default" 
                      : "border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-[#0A080D] shadow-[0_0_20px_rgba(20,184,166,0.1)]"
                  }`}
                >
                  <FileText className="w-4 h-4" /> {hasResume ? "Resume Synced" : "Upload Resume for Sync"}
                </Button>
              </div>
              <div className="w-56 h-56 rounded-[3rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center relative shadow-inner overflow-hidden">
                 <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15),transparent)] ${!hasResume ? "animate-pulse" : ""}`} />
                 <Sparkles className={`w-12 h-12 transition-all duration-1000 ${hasResume ? "text-teal-400 scale-110" : "text-teal-500/20 group-hover:text-teal-400 group-hover:scale-125"}`} />
              </div>
            </div>
          </Card>
        </div>

        {/* The Logbook */}
        <div className="space-y-8">
          <Card className="bg-[#110E16] border-zinc-800/50 rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
              <motion.div 
                animate={!hasResume ? { opacity: [0.3, 1, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,1)]" 
              />
              The Logbook
            </h3>
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {activeLogs.map((log, i) => (
                  <motion.div 
                    key={log.event}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-default"
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
                        : 'text-zinc-500 italic border-zinc-800 group-hover:border-teal-500/50'
                    }`}>
                      {log.desc}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}