import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RefreshCw, Compass, ArrowRight, Zap, Hammer,
  Sparkles, Wind, Map, Activity, CheckCircle2, Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import SMEFooter from '@/components/SMEFooter';

// ── ANIMATION PRESETS ─────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

// ── IDENTITY RESONANCE (HERO) ─────────────────────────────────────────────────
function ResonanceHero({ vault, navigate }) {
  const horizonTitle = vault?.hearthRecord?.horizon_title || vault?.archetype;
  const powerVerbs = vault?.hearthRecord?.power_verbs || [];
  const resonance = vault?.resonance || [];
  const ethics = vault?.ethics;

  if (!horizonTitle && !resonance.length) {
    return (
      <motion.div {...fadeUp}
        className="bg-[#110E16] border border-teal-500/10 rounded-[3rem] p-16 text-center space-y-8 backdrop-blur-xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-teal-500/5 border border-teal-500/10 flex items-center justify-center">
          <Wind className="text-teal-500/30" size={28} />
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-serif italic text-zinc-400">The hearth is waiting.</h3>
          <p className="text-sm font-serif italic text-zinc-600 max-w-sm mx-auto leading-relaxed">
            Your professional identity is still being forged. Visit the Library to begin the translation of your legacy.
          </p>
        </div>
        <Button
          onClick={() => navigate('/library')}
          className="rounded-full bg-teal-500 text-black font-black uppercase tracking-widest text-[10px] px-8 hover:bg-teal-400"
        >
          Begin the Forging
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div {...fadeUp}
      className="relative bg-gradient-to-b from-[#1A1525] to-[#0D0B10] border border-teal-500/10 rounded-[3rem] p-12 md:p-16 overflow-hidden shadow-2xl backdrop-blur-xl">

      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-8 right-10 opacity-[0.04]"><Sparkles size={160} /></div>

      <div className="relative z-10 space-y-10">
        {/* Title — Identity Authority */}
        <div className="space-y-3">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-teal-500/50 block">
            Your Horizon Identity
          </span>
          <h2 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight leading-tight">
            {horizonTitle}
          </h2>
        </div>

        {/* Power Verbs */}
        {powerVerbs.length > 0 && (
          <div className="space-y-3">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/50 flex items-center gap-2">
              <Zap size={10} /> Power Verbs
            </span>
            <div className="flex flex-wrap gap-2">
              {powerVerbs.map((v, i) => (
                <span key={i} className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 font-black text-[10px] rounded-full uppercase tracking-widest">
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reclaimed Strengths + Ethics — two-col inside hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-white/5">
          {resonance.length > 0 && (
            <div className="space-y-3">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500/50 flex items-center gap-2">
                <Sparkles size={10} /> Reclaimed Strengths
              </span>
              <div className="space-y-2">
                {resonance.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex items-center gap-3 text-[12px] font-serif italic text-zinc-400">
                    <span className="text-teal-500/30 text-[8px]">✦</span> {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {ethics && (
            <div className="space-y-3">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500/50 flex items-center gap-2">
                <Map size={10} /> Ethical Compass
              </span>
              <div className="space-y-2">
                {Object.entries(ethics).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-[11px] font-serif italic text-zinc-500 capitalize">{key}</span>
                    <span className="font-mono text-[11px] text-amber-500/70">{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── DAILY CALIBRATION (INTERNAL WEATHER) ─────────────────────────────────────
const PULSE_OPTIONS = [
  { icon: "🌱", label: "Growing" },
  { icon: "🔥", label: "Stretched" },
  { icon: "🌊", label: "Flowing" },
  { icon: "☁️", label: "Cloudy" },
  { icon: "💎", label: "Resilient" }
];

function DailyCalibration({ vault, onSync }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!selected) return;
    const pulse = { date: new Date().toISOString(), emoji: selected, text: note };
    await onSync({ ...vault, pulses: [pulse, ...(vault?.pulses || [])] });
    setSaved(true);
    setSelected(null);
    setNote('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}
      className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-10 space-y-8 backdrop-blur-xl">

      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-500 block">Daily Calibration</span>
          <p className="text-sm font-serif italic text-zinc-600">How does the migration feel today?</p>
        </div>
        <Activity size={16} className="text-rose-500/30" />
      </div>

      <div className="flex justify-between gap-2">
        {PULSE_OPTIONS.map((p) => (
          <button key={p.label} onClick={() => setSelected(selected === p.icon ? null : p.icon)}
            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all duration-500 ${selected === p.icon ? 'bg-teal-500/10 border-teal-500/30 shadow-[0_0_18px_rgba(20,184,166,0.12)]' : 'bg-white/[0.02] border-white/5 hover:bg-white/5'}`}>
            <span className="text-2xl">{p.icon}</span>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${selected === p.icon ? 'text-teal-300' : 'text-zinc-600'}`}>{p.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.6 }}
          className="space-y-4 overflow-hidden">
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="A note from the trail..."
            className="w-full bg-black/30 border border-white/5 rounded-2xl p-5 text-sm font-serif italic text-zinc-300 placeholder:text-zinc-700 resize-none focus:outline-none focus:border-teal-500/20 min-h-[100px]"
          />
          <button onClick={handleSave}
            className="w-full py-4 bg-teal-500 text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-teal-400 transition-all">
            {saved ? '✦ Sealed' : 'Seal the Pulse'}
          </button>
        </motion.div>
      )}

      {/* Recent pulse */}
      {vault?.pulses?.length > 0 && !selected && (
        <div className="pt-4 border-t border-white/5">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">Last Entry</p>
          <div className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
            <span className="text-xl">{vault.pulses[0].emoji}</span>
            <div className="flex-1 min-w-0">
              {vault.pulses[0].text && (
                <p className="text-[12px] font-serif italic text-zinc-400 leading-relaxed line-clamp-2">
                  "{vault.pulses[0].text}"
                </p>
              )}
              <p className="text-[9px] font-mono text-zinc-600 mt-1.5 uppercase">
                {new Date(vault.pulses[0].date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── MIGRATION ROADMAP ─────────────────────────────────────────────────────────
function MigrationRoadmap({ vault, navigate }) {
  const hasResume = !!(vault?.legacyResume || vault?.resume);
  const hasHorizon = !!vault?.hearthRecord?.horizon_title;
  const hasEthics = !!vault?.ethics;
  const hasLexicon = !!(vault?.lexicon?.length || vault?.hearthRecord?.power_verbs?.length);

  const steps = [
    { label: 'Legacy Archived', sublabel: 'Upload your resume for translation', done: hasResume, route: '/library' },
    { label: 'Horizon Title Set', sublabel: 'Brigid names your private-sector identity', done: hasHorizon, route: '/library' },
    { label: 'Lexicon Forged', sublabel: 'Power verbs reclaimed from your history', done: hasLexicon, route: '/library' },
    { label: 'Ethics Calibrated', sublabel: 'Your non-negotiables are mapped', done: hasEthics, route: '/library' },
  ];

  const completed = steps.filter(s => s.done).length;
  const pct = Math.round((completed / steps.length) * 100);
  const allDone = completed === steps.length;

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.35 }}
      className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-10 space-y-8 backdrop-blur-xl">

      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-500 block">The Pilgrimage</span>
          <p className="text-sm font-serif italic text-zinc-600">Migration progress through the forge.</p>
        </div>
        <span className="font-mono text-[11px] text-teal-400/70">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full" />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            onClick={() => !step.done && navigate(step.route)}
            className={`flex items-center gap-5 p-5 rounded-2xl border transition-all duration-500 ${step.done ? 'bg-teal-500/[0.04] border-teal-500/10' : 'bg-white/[0.01] border-white/5 cursor-pointer hover:border-teal-500/15'}`}>
            <div className="shrink-0">
              {step.done
                ? <CheckCircle2 size={18} className="text-teal-500" />
                : <Circle size={18} className="text-zinc-700" />}
            </div>
            <div className="flex-1 min-w-0">
              <span className={`text-[11px] font-black uppercase tracking-widest ${step.done ? 'text-teal-400' : 'text-zinc-500'}`}>{step.label}</span>
              <p className="text-[10px] font-serif italic text-zinc-600 mt-0.5">{step.sublabel}</p>
            </div>
            {!step.done && <ArrowRight size={13} className="text-zinc-700 shrink-0" />}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate(allDone ? '/horizon' : '/library')}
        className="w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 flex items-center justify-center gap-3"
        style={{
          background: allDone ? 'linear-gradient(135deg, #14b8a6, #a855f7)' : 'rgba(20,184,166,0.06)',
          color: allDone ? '#0A080D' : '#2dd4bf',
          border: allDone ? 'none' : '1px solid rgba(20,184,166,0.15)'
        }}>
        {allDone ? 'Enter the Horizon' : 'Continue in the Library'} <ArrowRight size={13} />
      </button>
    </motion.div>
  );
}

// ── QUICK NAVIGATION TILES ────────────────────────────────────────────────────
function NavTiles({ navigate }) {
  const tiles = [
    { label: 'The Smithy', sub: 'Refine your language', icon: Hammer, color: 'purple', route: '/library' },
    { label: 'The Horizon', sub: 'Survey the path ahead', icon: Compass, color: 'teal', route: '/horizon' },
  ];

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiles.map((t) => (
        <div key={t.label} onClick={() => navigate(t.route)}
          className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all duration-500 group
            ${t.color === 'purple'
              ? 'bg-purple-500/[0.02] border-purple-500/10 hover:border-purple-500/20'
              : 'bg-teal-500/[0.02] border-teal-500/10 hover:border-teal-500/20'}`}>
          <t.icon size={22} className={`mb-4 transition-transform duration-500 group-hover:scale-110 ${t.color === 'purple' ? 'text-purple-500/40' : 'text-teal-500/40'}`} />
          <h4 className="text-lg font-serif italic text-zinc-300">{t.label}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-1">{t.sub} →</p>
        </div>
      ))}
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function YourHearth({ vault, onSync, onRefresh }) {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A080D]">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-40 space-y-16">

        {/* ── PAGE HEADER ── */}
        <motion.header {...fadeUp}
          className="text-center space-y-6 py-8">
          <motion.button
            onClick={handleRefresh}
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
            className="mx-auto p-3 rounded-full bg-white/[0.03] border border-white/8 text-teal-500/40 hover:text-teal-400 transition-colors block">
            <RefreshCw size={18} />
          </motion.button>
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-serif italic text-purple-200 tracking-tighter">
              Your Hearth
            </h1>
            <p className="text-sm font-serif italic text-zinc-600">
              A private study. A sanctuary for the migrating soul.
            </p>
          </div>
        </motion.header>

        {/* ── IDENTITY RESONANCE HERO ── */}
        <ResonanceHero vault={vault} navigate={navigate} />

        {/* ── DAILY CALIBRATION ── */}
        <DailyCalibration vault={vault} onSync={onSync} />

        {/* ── MIGRATION ROADMAP ── */}
        <MigrationRoadmap vault={vault} navigate={navigate} />

        {/* ── QUICK NAV ── */}
        <NavTiles navigate={navigate} />

        {/* ── SME AUTHORITY SEAL ── */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.6 }}>
          <SMEFooter />
        </motion.div>

      </div>
    </div>
  );
}