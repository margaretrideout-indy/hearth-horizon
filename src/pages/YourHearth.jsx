import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, CheckCircle2, RefreshCw, Activity, History,
  Lock, Trash2, AlertTriangle, X, Compass,
  Loader2, Circle, ArrowRight, FlaskConical, Zap,
  RotateCcw, Mountain, Hammer, Sparkles, Users, ExternalLink,
  Wind, Map
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpertiseBadge from '../components/ExpertiseBadge';
import SMEFooter from '@/components/SMEFooter';

// ── STREAMLINED RESONANCE (THE LIVING RECORD) ────────────────────────────────
function ResonanceDisplay({ vault, navigate }) {
  const { hearthRecord, resonance, lexicon } = vault || {};
  const horizonTitle = hearthRecord?.horizon_title || vault?.archetype;
  
  // If no data exists, we show the "Gathering Wood" state
  if (!horizonTitle && !lexicon?.length) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-12 text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/5 flex items-center justify-center border border-teal-500/10">
          <Wind className="text-teal-500/40" size={24} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif italic text-zinc-400">The hearth is waiting.</h3>
          <p className="text-xs text-zinc-500 font-serif italic max-w-xs mx-auto">
            Your professional identity is still being forged. Visit the Library to begin your migration.
          </p>
        </div>
        <Button onClick={() => navigate('/library')} variant="outline" className="rounded-full border-teal-500/20 text-teal-400 hover:bg-teal-500/10 uppercase tracking-widest text-[10px]">
          Begin the Forging
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#16131F] to-[#0D0B10] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={120} /></div>
      
      <div className="relative z-10 space-y-8">
        <div>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-500/60 block mb-3">Current Horizon</span>
          <h2 className="text-4xl font-serif italic text-white tracking-tight">{horizonTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-4">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-500/60 flex items-center gap-2">
              <Zap size={12} /> Reclaimed Strengths
            </span>
            <div className="flex flex-wrap gap-2">
              {resonance?.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[10px] italic rounded-full">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500/60 flex items-center gap-2">
              <Map size={12} /> Ethical Compass
            </span>
            <div className="space-y-2">
              {vault?.ethics && Object.entries(vault.ethics).slice(0, 2).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500 font-serif italic capitalize">{key}</span>
                  <span className="text-amber-500/80 font-mono">{val}% Match</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN HEARTH ─────────────────────────────────────────────────────────────
export default function YourHearth({ vault, onSync, onRefresh }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-32 space-y-16">
      <ExpertiseBadge />

      {/* Header Section */}
      <header className="flex flex-col items-center text-center space-y-6 pt-12">
        <motion.div 
          onClick={handleRefresh}
          animate={isRefreshing ? { rotate: 360 } : {}}
          className="cursor-pointer p-3 rounded-full bg-white/5 border border-white/10 text-teal-500/50 hover:text-teal-400 transition-colors"
        >
          <RefreshCw size={20} />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter">Your Hearth</h1>
          <p className="text-zinc-500 font-serif italic text-lg">A sanctuary for the migrating soul.</p>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: The Records (Internal Weather & History) */}
        <div className="lg:col-span-4 space-y-12">
          <section className="space-y-6">
             <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Internal Weather</span>
                <Activity size={14} className="text-rose-500/40" />
             </div>
             {/* Pulse Logic here... simplified for UI clarity */}
             <div className="bg-[#110E16] rounded-[2rem] p-6 border border-white/5 italic font-serif text-zinc-400 text-sm">
                "Today the migration feels like a rising tide. Slow, but inevitable."
             </div>
          </section>

          <section className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block border-b border-white/5 pb-4">Community Embers</span>
            <button 
              onClick={() => navigate('/embers')}
              className="w-full group p-6 rounded-[2rem] bg-orange-500/[0.02] border border-orange-500/10 hover:border-orange-500/30 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Flame size={18} className="text-orange-500" />
                <span className="text-xs font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-200">The forest is gathering...</span>
              </div>
              <ArrowRight size={16} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
            </button>
          </section>
        </div>

        {/* Right: The Horizon (Resonance & Roadmap) */}
        <div className="lg:col-span-8 space-y-12">
          <ResonanceDisplay vault={vault} navigate={navigate} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div 
              onClick={() => navigate('/library')}
              className="p-8 rounded-[2.5rem] bg-purple-500/[0.03] border border-purple-500/10 hover:border-purple-500/20 cursor-pointer transition-all group"
            >
              <Hammer className="text-purple-500/40 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h4 className="text-lg font-serif italic text-zinc-300">The Smithy</h4>
              <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest mt-2">Refine Your Language →</p>
            </div>

            <div 
              onClick={() => navigate('/horizon')}
              className="p-8 rounded-[2.5rem] bg-teal-500/[0.03] border border-teal-500/10 hover:border-teal-500/20 cursor-pointer transition-all group"
            >
              <Compass className="text-teal-500/40 mb-4 group-hover:scale-110 transition-transform" size={24} />
              <h4 className="text-lg font-serif italic text-zinc-300">The Horizon</h4>
              <p className="text-[11px] text-zinc-500 uppercase font-black tracking-widest mt-2">Survey the Path →</p>
            </div>
          </div>
        </div>
      </div>

      <SMEFooter />
    </div>
  );
}