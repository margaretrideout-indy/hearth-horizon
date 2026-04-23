import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase, Loader2, ExternalLink, Globe, RefreshCw,
  Sparkles, Zap, Home, Wifi
} from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ─── Skeleton ────────────────────────────────────────────────────────────────
const JobCardSkeleton = () => (
  <div className="p-8 bg-[#110E16] border border-white/5 rounded-[2.5rem] animate-pulse space-y-6">
    <div className="w-12 h-12 bg-white/5 rounded-2xl" />
    <div className="space-y-2">
      <div className="h-5 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/3" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-5/6" />
    </div>
    <div className="h-12 bg-white/5 rounded-xl mt-6" />
  </div>
);

// ─── Match bar ───────────────────────────────────────────────────────────────
const MatchBar = ({ percent }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
    <span className="text-[10px] font-black text-teal-400 tabular-nums">{percent}%</span>
  </div>
);

// ─── Segmented control ───────────────────────────────────────────────────────
const SegmentedControl = ({ value, onChange, options }) => (
  <div className="flex bg-white/[0.04] border border-white/10 rounded-2xl p-1 gap-1">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        style={{ minHeight: 44 }}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
          value === opt.value
            ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <opt.icon size={13} />
        <span>{opt.label}</span>
      </button>
    ))}
  </div>
);

// ─── Discovery toggle ────────────────────────────────────────────────────────
const DiscoveryToggle = ({ value, onChange }) => (
  <div className="flex bg-white/[0.04] border border-white/10 rounded-2xl p-1 gap-1">
    {[
      { v: true, label: 'Personalized Sync', icon: Sparkles, activeClass: 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' },
      { v: false, label: 'Open Terrain', icon: Zap, activeClass: 'bg-zinc-700 text-white' },
    ].map(({ v, label, icon: Icon, activeClass }) => (
      <button
        key={String(v)}
        onClick={() => onChange(v)}
        style={{ minHeight: 44 }}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
          value === v ? activeClass : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Icon size={13} />
        <span className="hidden sm:inline">{label}</span>
      </button>
    ))}
  </div>
);

// ─── Main component ──────────────────────────────────────────────────────────
export default function Canopy({ vault, onSync, isAdmin }) {
  const [aiJobs, setAiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(null);

  // Controls
  const [workEnv, setWorkEnv] = useState('remote');        // 'remote' | 'onsite'
  const [personalized, setPersonalized] = useState(true);  // true = AI-matched, false = open

  const fetchRef = useRef(null);

  const fetchJobs = async () => {
    // Cancel any pending fetch
    clearTimeout(fetchRef.current);
    fetchRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const payload = {
          vault: personalized ? vault : null,
          workEnv,
          personalized,
        };
        const res = await base44.functions.invoke('smartJobSearch', payload);
        setAiJobs(res.data?.jobs || []);
        setMode(res.data?.mode || 'standalone');
      } catch (err) {
        console.error('Job search failed:', err);
        setAiJobs([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  // Re-fetch whenever controls change
  useEffect(() => { fetchJobs(); }, [workEnv, personalized]);

  const workEnvOptions = [
    { value: 'remote', label: 'Remote Sanctuary', icon: Wifi },
    { value: 'onsite', label: 'Local Presence', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-[#0A080D] text-white font-sans selection:bg-teal-500/30">
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 space-y-10">

        {/* ── HEADER ── */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
            <div className="flex items-center gap-3 text-teal-500/80">
              <Globe size={18} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Global Horizon</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
              Survey the <span className="text-zinc-400 font-sans not-italic font-extralight uppercase">World</span>
            </h1>
            {vault?.archetype && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                <Sparkles size={10} className="text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-300">
                  Searching as: {vault.archetype}
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Refresh + mode badge */}
          <div className="flex items-center gap-3">
            {mode && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                mode === 'personalized'
                  ? 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-500'
              }`}>
                {mode === 'personalized' ? <Sparkles size={9} /> : <Zap size={9} />}
                {mode === 'personalized' ? 'Personalized' : 'Discovery'}
              </div>
            )}
            <button
              onClick={fetchJobs}
              style={{ minHeight: 44, minWidth: 44 }}
              className="flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-teal-500/40 hover:text-teal-400 transition-all"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-700'} />
            </button>
          </div>
        </header>

        {/* ── CONTROLS PANEL ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 p-5 bg-[#0E0C14] border border-white/5 rounded-[2rem]"
        >
          {/* Work Environment */}
          <div className="flex-1 space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 block px-1">Work Environment</span>
            <SegmentedControl
              value={workEnv}
              onChange={setWorkEnv}
              options={workEnvOptions}
            />
          </div>

          {/* Discovery Mode */}
          <div className="flex-1 space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 block px-1">Discovery Mode</span>
            <DiscoveryToggle value={personalized} onChange={setPersonalized} />
          </div>
        </motion.div>

        {/* ── JOB GRID ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
            {[0, 1, 2, 3, 4, 5].map((i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : aiJobs.length > 0 ? (
          <motion.div
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32"
          >
            {aiJobs.map((job, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <Card className="group relative h-full p-8 bg-[#110E16] border border-white/5 hover:border-teal-500/20 rounded-[2.5rem] flex flex-col justify-between overflow-hidden transition-all duration-300">
                  <div className="space-y-5 relative z-10">
                    {/* Top row */}
                    <div className="flex justify-between items-start">
                      <div className="w-11 h-11 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl shrink-0">
                        <Briefcase size={18} className="text-zinc-500 group-hover:text-teal-400 transition-all" />
                      </div>
                      <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-[9px] font-black">
                        High Alignment
                      </Badge>
                    </div>

                    {/* Title + company */}
                    <div>
                      <h3 className="text-xl font-serif italic text-white/90 leading-snug">{job.title}</h3>
                      <p className="text-[10px] text-teal-500/50 font-black uppercase tracking-widest mt-1">{job.company}</p>
                    </div>

                    {/* Match bar */}
                    <MatchBar percent={job.match_percent || 85} />

                    {/* Hearth Insight blockquote */}
                    {job.hearth_insight && (
                      <blockquote className="border-l-2 border-purple-500/40 pl-4 py-1">
                        <p className="text-[11px] text-purple-300/70 italic leading-relaxed">
                          <span className="text-purple-400 font-black not-italic text-[9px] uppercase tracking-widest block mb-1">
                            Hearth Insight
                          </span>
                          {job.hearth_insight}
                        </p>
                      </blockquote>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-5 border-t border-white/5 space-y-3 relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-zinc-500 uppercase font-black">{job.location}</span>
                      <span className="text-[9px] text-zinc-600 uppercase font-black">
                        {workEnv === 'remote' ? '🌐 Remote' : '📍 On-site'}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full h-12 bg-white/5 hover:bg-teal-500 hover:text-black rounded-2xl text-[9px] uppercase font-black transition-all"
                    >
                      <a href={job.link || '#'} target="_blank" rel="noopener noreferrer">
                        View Deployment <ExternalLink size={12} className="ml-2" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="col-span-full py-24 text-center space-y-3">
            <p className="text-zinc-600 uppercase font-black text-xs tracking-widest">No openings found.</p>
            <button onClick={fetchJobs} className="text-teal-500/60 text-[10px] uppercase font-black hover:text-teal-400 transition-colors">
              Refresh terrain →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}