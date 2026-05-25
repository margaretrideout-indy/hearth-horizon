import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wind, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import SMEFooter from '@/components/SMEFooter';
import DeleteAccountDialog from '@/components/hearth/DeleteAccountDialog';

// ── ANIMATION PRESETS ─────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
};

// ── MIGRATION SEASON DATELINE ─────────────────────────────────────────────────
function getMigrationSeason() {
  const month = new Date().getMonth(); // 0-indexed
  if (month >= 2 && month <= 4) return 'Season of Emergence';
  if (month >= 5 && month <= 7) return 'Season of Cultivation';
  if (month >= 8 && month <= 10) return 'Season of Harvest';
  return 'Season of Stillness';
}

// ── IDENTITY RESONANCE (HERO) ─────────────────────────────────────────────────
function ResonanceHero({ vault, navigate }) {
  const horizonTitle = vault?.hearthRecord?.horizon_title || vault?.archetype;
  const powerVerbs = vault?.hearthRecord?.power_verbs || [];
  const resonance = vault?.resonance || [];
  const ethics = vault?.ethics;

  if (!horizonTitle && !resonance.length) {
    return (
      <motion.div {...fadeUp}
        className="bg-[#110E16] border border-teal-500/10 rounded-[3rem] p-16 text-center space-y-8">
        <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/5 border border-teal-500/10 flex items-center justify-center">
          <Wind className="text-teal-500/30" size={22} />
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
      className="relative bg-gradient-to-b from-[#1A1525] to-[#0D0B10] border border-teal-500/10 rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-2xl">

      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 space-y-12">
        {/* Title — Identity Authority */}
        <div className="space-y-4">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-teal-500/40 block">
            Your Horizon Identity
          </span>
          <h2 className="text-6xl md:text-8xl font-serif italic text-white tracking-tight leading-none">
            {horizonTitle}
          </h2>
        </div>

        {/* Power Verbs */}
        {powerVerbs.length > 0 && (
          <div className="space-y-3">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-500/40 block">
              Power Verbs
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

        {/* Reclaimed Strengths + Ethics */}
        {(resonance.length > 0 || ethics) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6 border-t border-white/5">
            {resonance.length > 0 && (
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500/40 block">
                  Reclaimed Strengths
                </span>
                <div className="space-y-3">
                  {resonance.slice(0, 3).map((s, i) => (
                    <div key={i} className="text-[13px] font-serif italic text-zinc-400 border-l border-zinc-800 pl-4">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ethics && (
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500/40 block">
                  Ethical Compass
                </span>
                <div className="space-y-3">
                  {Object.entries(ethics).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-[12px] font-serif italic text-zinc-500 capitalize">{key}</span>
                      <span className="font-mono text-[11px] text-amber-500/60">{val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── THE DAILY RITUAL ──────────────────────────────────────────────────────────
const PULSE_OPTIONS = [
  { icon: "🌱", label: "Growing" },
  { icon: "🔥", label: "Stretched" },
  { icon: "🌊", label: "Flowing" },
  { icon: "☁️", label: "Cloudy" },
  { icon: "💎", label: "Resilient" }
];

function DailyRitual({ vault, onSync }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selected) return;
    const pulse = { date: new Date().toISOString(), emoji: selected, text: note };
    // Optimistic update — UI responds instantly
    setSaved(true);
    setSelected(null);
    setNote('');
    onSync({ ...vault, pulses: [pulse, ...(vault?.pulses || [])] });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}
      className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-10 md:p-14 space-y-10">

      <div className="border-b border-white/5 pb-8 space-y-2">
        <span className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-600 block">The Daily Ritual</span>
        <p className="text-base font-serif italic text-zinc-500 leading-relaxed">
          How does the migration feel today?
        </p>
      </div>

      <div className="flex justify-between gap-3">
        {PULSE_OPTIONS.map((p) => (
          <button key={p.label} onClick={() => setSelected(selected === p.icon ? null : p.icon)}
            className={`flex-1 flex flex-col items-center gap-3 py-5 rounded-2xl border transition-all duration-500 ${selected === p.icon ? 'bg-teal-500/10 border-teal-500/20' : 'bg-transparent border-white/5 hover:border-white/10'}`}>
            <span className="text-2xl">{p.icon}</span>
            <span className={`text-[8px] font-black uppercase tracking-widest ${selected === p.icon ? 'text-teal-400' : 'text-zinc-700'}`}>{p.label}</span>
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
            className="w-full bg-black/20 border border-white/5 rounded-2xl p-6 text-sm font-serif italic text-zinc-300 placeholder:text-zinc-700 resize-none focus:outline-none focus:border-teal-500/20 min-h-[100px]"
          />
          <button onClick={handleSave}
            className="w-full py-4 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-teal-500 hover:text-black transition-all">
            {saved ? '✦ Sealed' : 'Seal the Pulse'}
          </button>
        </motion.div>
      )}

      {vault?.pulses?.length > 0 && !selected && (
        <div className="pt-2 border-t border-white/5">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-4">Last Entry</p>
          <div className="flex items-start gap-5">
            <span className="text-xl mt-0.5">{vault.pulses[0].emoji}</span>
            <div className="flex-1 min-w-0">
              {vault.pulses[0].text && (
                <p className="text-sm font-serif italic text-zinc-500 leading-relaxed line-clamp-2">
                  "{vault.pulses[0].text}"
                </p>
              )}
              <p className="text-[9px] font-mono text-zinc-700 mt-2 uppercase">
                {new Date(vault.pulses[0].date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── MIGRATION PATH ────────────────────────────────────────────────────────────
function MigrationPath({ vault, navigate }) {
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

  const firstIncompleteIdx = steps.findIndex(s => !s.done);
  const allDone = firstIncompleteIdx === -1;

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.35 }}
      className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-10 md:p-14 space-y-10">

      <div className="border-b border-white/5 pb-8 space-y-2">
        <span className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-600 block">Migration Path</span>
        <p className="text-base font-serif italic text-zinc-500 leading-relaxed">
          {allDone ? 'The path is complete. The horizon awaits.' : 'Your journey, one threshold at a time.'}
        </p>
      </div>

      <div className="space-y-0">
        {steps.map((step, i) => {
          const isCurrent = !step.done && (i === 0 || steps[i - 1].done);
          return (
            <div key={i} className="flex gap-6 group">
              {/* Vertical line + marker */}
              <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full mt-6 shrink-0 transition-all ${step.done ? 'bg-teal-500' : isCurrent ? 'bg-teal-500/40 ring-4 ring-teal-500/10' : 'bg-zinc-800'}`} />
                {i < steps.length - 1 && (
                  <div className={`w-[1px] flex-1 mt-1 mb-0 ${step.done ? 'bg-teal-500/20' : 'bg-zinc-900'}`} style={{ minHeight: 32 }} />
                )}
              </div>

              {/* Content */}
              <div
                onClick={() => !step.done && navigate(step.route)}
                className={`flex-1 py-5 transition-all ${!step.done ? 'cursor-pointer' : ''}`}
              >
                <span className={`text-[11px] font-black uppercase tracking-widest block ${step.done ? 'text-teal-400/70' : isCurrent ? 'text-white' : 'text-zinc-700'}`}>
                  {step.label}
                </span>
                <p className={`text-[11px] font-serif italic mt-0.5 ${isCurrent ? 'text-zinc-500' : 'text-zinc-700'}`}>
                  {step.sublabel}
                </p>
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 mt-2 text-[9px] font-black uppercase tracking-widest text-teal-500/60">
                    Continue <ArrowRight size={10} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate(allDone ? '/horizon' : '/library')}
        className="w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 flex items-center justify-center gap-3 border border-teal-500/15 text-teal-400 hover:bg-teal-500 hover:text-black hover:border-transparent"
        style={{ background: allDone ? 'linear-gradient(135deg, #14b8a6, #a855f7)' : 'transparent', color: allDone ? '#0A080D' : undefined, border: allDone ? 'none' : undefined }}>
        {allDone ? 'Enter the Horizon' : 'Continue in the Library'} <ArrowRight size={13} />
      </button>
    </motion.div>
  );
}

// ── QUICK NAVIGATION TILES ────────────────────────────────────────────────────
function NavTiles({ navigate }) {
  const tiles = [
    { label: 'The Smithy', sub: 'Refine your language', color: 'purple', route: '/library' },
    { label: 'The Horizon', sub: 'Survey the path ahead', color: 'teal', route: '/horizon' },
  ];

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tiles.map((t) => (
        <div key={t.label} onClick={() => navigate(t.route)}
          className={`p-10 rounded-[2.5rem] border cursor-pointer transition-all duration-500 group
            ${t.color === 'purple'
              ? 'bg-purple-500/[0.02] border-purple-500/10 hover:border-purple-500/20'
              : 'bg-teal-500/[0.02] border-teal-500/10 hover:border-teal-500/20'}`}>
          <h4 className="text-xl font-serif italic text-zinc-300 mb-1">{t.label}</h4>
          <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${t.color === 'purple' ? 'text-purple-500/40' : 'text-teal-500/40'}`}>{t.sub} →</p>
        </div>
      ))}
    </motion.div>
  );
}

// ── SETTINGS SECTION ─────────────────────────────────────────────────────────
function HearthSettings() {
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.7 }}
      className="border-t border-white/5 pt-10 space-y-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-3 text-zinc-600 hover:text-zinc-400 active:text-zinc-400 transition-colors min-h-[44px]"
      >
        <Settings size={14} />
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Settings</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden space-y-4"
        >
          <div className="p-6 rounded-2xl bg-[#110E16] border border-white/5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-[0.45em] text-zinc-600">Account</p>
            <p className="text-xs font-serif italic text-zinc-600 leading-relaxed">
              Permanently remove your account data from Hearth & Horizon. This action cannot be undone.
            </p>
            <DeleteAccountDialog />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function YourHearth({ vault, onSync, onRefresh }) {
  const navigate = useNavigate();
  const season = getMigrationSeason();
  const today = new Date().toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0A080D]">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-40 space-y-16">

        {/* ── PAGE HEADER ── */}
        <motion.header {...fadeUp}
          className="text-center space-y-4 py-8">
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">{season} · {today}</p>
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

        {/* ── THE DAILY RITUAL ── */}
        <DailyRitual vault={vault} onSync={onSync} />

        {/* ── MIGRATION PATH ── */}
        <MigrationPath vault={vault} navigate={navigate} />

        {/* ── QUICK NAV ── */}
        <NavTiles navigate={navigate} />

        {/* ── SME AUTHORITY SEAL ── */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.6 }}>
          <SMEFooter />
        </motion.div>

        {/* ── SETTINGS ── */}
        <HearthSettings />

      </div>
    </div>
  );
}