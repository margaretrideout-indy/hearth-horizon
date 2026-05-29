import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  MessageSquare, 
  Hammer, 
  Compass, 
  Send, 
  Filter, 
  Users, 
  Clock, 
  ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';
import ExpertiseBadge from '../components/ExpertiseBadge';

// Mock Initial Feed Data for the Founding Forest Cohort
const INITIAL_LOGS = [
  {
    id: 1,
    steward: "Sarah M.",
    role: "Former Elementary Educator",
    state: "kindling", // kindling = Gathering Kindling, anvil = Striking the Anvil
    tag: "presence", // presence, blueprint, glow
    timestamp: "10:14 AM",
    date: "Today — May 29, 2026",
    content: "Stepped away from the computer for an hour to walk down by the ocean. My brain needed a moment to let the technical lexicon translation settle in. If you're feeling application fatigue today, this is your sign to go breathe some salt air."
  },
  {
    id: 2,
    steward: "David K.",
    role: "Transitioning Administrator",
    state: "anvil",
    tag: "blueprint",
    timestamp: "Yesterday",
    date: "May 28, 2026",
    content: "Just deployed my Phase 1 Sponsorship Outreach script to three language data operations on LinkedIn. Modified the baseline layout we found in the Library to emphasize my stakeholder conflict management metrics. Will report back when the screens are booked!"
  },
  {
    id: 3,
    steward: "Elena R.",
    role: "M.Ed. / Curriculum Developer",
    state: "kindling",
    tag: "glow",
    timestamp: "Yesterday",
    date: "May 28, 2026",
    content: "Deep in the workflow tracking data annotation models this morning. It is absolutely fascinating how much overlap there is between systemic lesson sequencing and training large language models. We aren't changing our capacity, we're just shifting the ecosystem."
  }
];

export default function EmbersCommunity() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [presenceState, setPresenceState] = useState('kindling'); // Personal baseline state
  const [newLogContent, setNewLogContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('presence');
  
  const streamEndRef = useRef(null);

  const handlePostLog = (e) => {
    e.preventDefault();
    if (!newLogContent.trim()) return;

    const newLog = {
      id: Date.now(),
      steward: "Margaret Pardy", // Context personalization anchor
      role: "Founder & Lead Architect",
      state: presenceState,
      tag: selectedTag,
      timestamp: "Just now",
      date: "Today — May 29, 2026",
      content: newLogContent
    };

    setLogs([newLog, ...logs]); // Unfolds down the timeline
    setNewLogContent('');
  };

  const filteredLogs = logs.filter(log => {
    if (activeFilter === 'all') return true;
    return log.tag === activeFilter;
  });

  // Calculate quick stats for the Stewards panel
  const activeAnvils = logs.filter(l => l.state === 'anvil').length + (presenceState === 'anvil' ? 1 : 0);
  const totalGathering = 25; // Founding Forest baseline cap

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      <StickyNav />

      {/* Ambient Micro-Glow Accent */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-purple-900/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* ── HEADER ── */}
        <header className="mb-12 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-500/80">
            <Flame size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Embers Workspace</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            The Shared <span className="text-purple-300 italic">Lodge Journal</span>
          </h1>
          <p className="text-xs text-zinc-500 max-w-xl font-serif italic">
            A single, slow-burning stream for the 25 Stewards of the Founding Forest. No immediate responses required. Share blueprints, log transitions, and track collective momentum asynchronously.
          </p>
        </header>

        {/* ── TWO-COLUMN COZY GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: CONTEXT PANEL (4 COLS) */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            
            {/* TENDING COUNTER CARD */}
            <div className="p-6 rounded-[2rem] bg-[#0E0C14] border border-zinc-800/60 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-teal-400" />
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Founding Forest</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-600">Cohort 01</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <Compass size={12} className="text-amber-500/50" /> Gathering Kindling
                  </span>
                  <span className="font-mono text-zinc-300">{totalGathering - activeAnvils} / {totalGathering}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <Hammer size={12} className="text-purple-400/50" /> Striking the Anvil
                  </span>
                  <span className="font-mono text-zinc-300">{activeAnvils} Active</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-purple-500 h-full transition-all duration-500" 
                    style={{ width: `${(activeAnvils / totalGathering) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* GLOBAL FEED STREAM FILTERS */}
            <div className="p-4 rounded-2xl bg-[#0E0C14]/40 border border-zinc-900 flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 px-2 mb-2 flex items-center gap-1.5">
                <Filter size={10} /> Filter Timeline
              </span>
              {[
                { id: 'all', label: 'All Collective Logs' },
                { id: 'presence', label: 'Shared Presence (Wood)' },
                { id: 'blueprint', label: 'Blueprints & Assets (Spark)' },
                { id: 'glow', label: 'Technical Curiosity (Glow)' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between ${
                    activeFilter === btn.id 
                      ? 'bg-zinc-900 text-teal-400 border border-white/5 font-medium' 
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
                  }`}
                >
                  {btn.label}
                  {activeFilter === btn.id && <div className="w-1 h-1 rounded-full bg-teal-400" />}
                </button>
              ))}
            </div>

            {/* RETURN LINK ANCHOR */}
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 pl-2 transition-colors"
            >
              <ArrowLeft size={12} /> View Framework Blueprint
            </Link>

          </aside>

          {/* RIGHT MAIN FEED: THE CHRONICLE (8 COLS) */}
          <main className="lg:col-span-8 space-y-6">

            {/* ── TENDING THE FIRE: ACTIONABLE LOG INPUT ── */}
            <div className="p-6 md:p-8 rounded-[2.5rem] bg-gradient-to-b from-[#0E0C14] to-[#0A080D] border border-zinc-800/80 space-y-6 shadow-xl">
              
              {/* OPERATIONAL PRESENCE STATE SELECTOR */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">
                  How are you approaching the ecosystem today?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPresenceState('kindling')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                      presenceState === 'kindling'
                        ? 'bg-amber-500/5 border-amber-500/30 text-amber-300 shadow-md shadow-amber-500/[0.02]'
                        : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-serif italic font-medium">
                      <Compass size={13} className={presenceState === 'kindling' ? 'text-amber-400' : ''} />
                      Gathering Kindling
                    </div>
                    <p className="text-[10px] opacity-70 font-sans">Quiet study, reading resources, or processing calibration</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPresenceState('anvil')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-0.5 ${
                      presenceState === 'anvil'
                        ? 'bg-purple-500/5 border-purple-500/30 text-purple-300 shadow-md shadow-purple-500/[0.02]'
                        : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-serif italic font-medium">
                      <Hammer size={13} className={presenceState === 'anvil' ? 'text-purple-400' : ''} />
                      Striking the Anvil
                    </div>
                    <p className="text-[10px] opacity-70 font-sans">Executing outreach scripts, modifying blueprints, sending applications</p>
                  </button>
                </div>
              </div>

              {/* LOG COMPOSER FORM */}
              <form onSubmit={handlePostLog} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={3}
                    value={newLogContent}
                    onChange={(e) => setNewLogContent(e.target.value)}
                    placeholder={
                      presenceState === 'kindling' 
                        ? "What resources are you settling your focus on today...?" 
                        : "What specific asset or script are you building right now...?"
                    }
                    className="w-full bg-zinc-950/80 border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white placeholder:text-zinc-700 focus:outline-none focus:border-purple-500/40 resize-none font-sans leading-relaxed transition-colors"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                  
                  {/* TAGGING MECHANISM */}
                  <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-white/5 w-fit">
                    {[
                      { id: 'presence', label: 'Presence', color: 'text-amber-400' },
                      { id: 'blueprint', label: 'Blueprint', color: 'text-teal-400' },
                      { id: 'glow', label: 'Technical', color: 'text-purple-400' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTag(t.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all ${
                          selectedTag === t.id 
                            ? 'bg-zinc-900 text-white' 
                            : 'text-zinc-600 hover:text-zinc-400'
                        }`}
                      >
                        <span className={`inline-block mr-1 ${t.color}`}>·</span>{t.label}
                      </button>
                    ))}
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="h-9 px-5 bg-teal-500 text-black font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Send size={10} /> Add to Ledger
                  </button>
                </div>
              </form>
            </div>

            {/* ── THE LIVE LOG TIMELINE FEED ── */}
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {filteredLogs.map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`p-6 rounded-[2rem] bg-[#0E0C14] border flex flex-col gap-4 relative overflow-hidden transition-all ${
                      log.tag === 'blueprint' ? 'border-teal-950/50 hover:border-teal-900/50' :
                      log.tag === 'glow' ? 'border-purple-950/50 hover:border-purple-900/50' :
                      'border-zinc-900 hover:border-zinc-800'
                    }`}
                  >
                    {/* Meta Stripe Header */}
                    <div className="flex items-start justify-between border-b border-zinc-950 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-400 shrink-0">
                          {log.state === 'anvil' ? (
                            <Hammer size={14} className="text-purple-400/80" />
                          ) : (
                            <Compass size={14} className="text-amber-400/80" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-serif font-medium text-zinc-200">{log.steward}</h4>
                            <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                              log.tag === 'blueprint' ? 'bg-teal-500/5 text-teal-400 border border-teal-500/10' :
                              log.tag === 'glow' ? 'bg-purple-500/5 text-purple-400 border border-purple-500/10' :
                              'bg-zinc-900 text-zinc-500'
                            }`}>
                              {log.tag}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-sans">{log.role}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-600 font-mono">
                        <Clock size={10} />
                        {log.timestamp}
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed whitespace-pre-line">
                      {log.content}
                    </p>

                    {/* Subtle Date Ribbon Layer */}
                    <div className="text-[9px] font-mono text-zinc-700 pt-1 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-zinc-800" />
                      {log.date}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredLogs.length === 0 && (
                <div className="p-12 text-center rounded-2xl bg-zinc-950/20 border border-dashed border-zinc-900">
                  <p className="text-zinc-600 font-serif italic text-sm">The timeline is perfectly quiet under this tag selection.</p>
                </div>
              )}
            </div>

          </main>
        </div>

        {/* ── SME FOOTER ── */}
        <div className="pt-20">
          <SMEFooter />
        </div>
      </div>

      <ExpertiseBadge />
    </div>
  );
}