import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Settings, ChevronDown, MessageSquare, Compass, Library, Shield } from 'lucide-react';
import GlobalFooter from '@/components/layout/GlobalFooter';
import DeleteAccountDialog from '@/components/hearth/DeleteAccountDialog';

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
};

const PULSES = [
  { icon: "🌱", label: "Growing (Stepping into new skills)" },
  { icon: "🔥", label: "Stretched (High load / Near capacity)" },
  { icon: "🌊", label: "Flowing (In alignment and rhythm)" },
  { icon: "☁️", label: "Cloudy (Processing / Needs pause)" },
  { icon: "💎", label: "Resilient (Grounded and protected)" }
];

export default function YourHearth({ vault, onSync }) {
  const navigate = useNavigate();
  const [selectedPulse, setSelectedPulse] = useState(null);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [note, setNote] = useState('');
  const [pulseSaved, setPulseSaved] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const horizonTitle = vault?.hearthRecord?.horizon_title || vault?.archetype;
  const powerVerbs = vault?.hearthRecord?.power_verbs || [];
  const isSubscriber = vault?.tier === 'founding_forest' || vault?.is_subscribed;
  const today = new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });

  const handlePulseSave = () => {
    if (!selectedPulse) return;
    const pulse = { 
      date: new Date().toISOString(), 
      emoji: selectedPulse, 
      label: PULSES.find(p => p.icon === selectedPulse)?.label.split(' (')[0],
      text: note 
    };
    setPulseSaved(true);
    setSelectedPulse(null);
    setHoveredLabel(null);
    setNote('');
    onSync({ ...vault, pulses: [pulse, ...(vault?.pulses || [])] });
    setTimeout(() => setPulseSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans antialiased selection:bg-teal-500/10">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-32 space-y-16">

        {/* ── ZONE 1: THE PULSE (HEADER & RITUAL COMBINED) ── */}
        <motion.header {...fadeIn} className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900/60 pb-8">
          <div className="space-y-1">
            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">{today}</p>
            <h1 className="text-3xl font-serif italic text-purple-200">Your Hearth</h1>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center md:justify-end gap-3 min-h-[18px]">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">The Daily Trail</p>
              <AnimatePresence mode="wait">
                {hoveredLabel && (
                  <motion.span 
                    initial={{ opacity: 0, x: 3 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -3 }}
                    className="text-[9px] font-mono text-teal-400 bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/10"
                  >
                    {hoveredLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-1.5">
              {PULSES.map((p) => {
                const isSelected = selectedPulse === p.icon;
                return (
                  <button 
                    key={p.label} 
                    onClick={() => {
                      setSelectedPulse(isSelected ? null : p.icon);
                      setHoveredLabel(isSelected ? null : p.label);
                    }}
                    onMouseEnter={() => setHoveredLabel(p.label)}
                    onMouseLeave={() => setHoveredLabel(selectedPulse ? PULSES.find(f => f.icon === selectedPulse)?.label : null)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base border transition-all duration-300 ${isSelected ? 'bg-teal-500/10 border-teal-500/30 text-scale-110 shadow-sm shadow-teal-500/5' : 'bg-transparent border-zinc-900 hover:border-zinc-800'}`}
                  >
                    {p.icon}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.header>

        {/* ── EXPANDABLE PULSE NOTE ── */}
        <AnimatePresence>
          {selectedPulse && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="bg-[#110E16]/40 border border-zinc-900 rounded-2xl p-4 space-y-3">
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Contextualize this state... (e.g., legacy translation friction, interview fatigue)"
                  className="w-full bg-transparent text-xs font-serif italic text-zinc-300 placeholder:text-zinc-700 resize-none focus:outline-none min-h-[70px]"
                />
                <button onClick={handlePulseSave} className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-teal-400 font-black uppercase text-[9px] tracking-widest rounded-lg transition-all">
                  {pulseSaved ? '✦ Sealed to Vault' : 'Seal Entry'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ZONE 2: THE MIRROR ── */}
        {horizonTitle ? (
          <motion.section {...fadeIn} transition={{ delay: 0.1 }} className="space-y-4">
            <div className="p-8 rounded-2xl border border-zinc-900 bg-gradient-to-b from-[#0E0C14] to-[#0A080D]">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-teal-500/50 block mb-2">Your Structural Translation</span>
              <h2 className="text-3xl md:text-4xl font-serif italic text-white leading-snug">
                {horizonTitle}
              </h2>
              
              {powerVerbs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {powerVerbs.slice(0, 4).map((v, i) => (
                    <span key={i} className="px-2.5 py-1 bg-zinc-950 border border-zinc-900/60 text-purple-300 font-mono text-[9px] rounded uppercase tracking-wider">
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.section>
        ) : (
          <motion.section {...fadeIn} transition={{ delay: 0.1 }} className="p-8 text-center border border-dashed border-zinc-900 rounded-2xl space-y-3">
            <p className="text-xs font-serif italic text-zinc-600">Your legacy architectural profile is still open.</p>
            <button onClick={() => navigate('/library')} className="text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1">
              Begin Free Translation <ArrowRight size={10} />
            </button>
          </motion.section>
        )}

        {/* ── ZONE 3: THE THRESHOLDS ── */}
        <motion.section {...fadeIn} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div onClick={() => navigate('/library')} className="p-6 rounded-2xl border border-zinc-900 bg-[#110E16]/20 hover:border-zinc-800 transition-all cursor-pointer group space-y-3">
            <div className="w-7 h-7 rounded-lg bg-purple-950/20 border border-purple-900/30 flex items-center justify-center text-purple-400">
              <Library size={13} />
            </div>
            <div>
              <h3 className="text-sm font-serif italic text-zinc-300">The Library</h3>
              <p className="text-[11px] text-zinc-600 font-serif italic mt-0.5">Refine your resume files and alignment models.</p>
            </div>
          </div>

          <div onClick={() => navigate('/horizon')} className="p-6 rounded-2xl border border-zinc-900 bg-[#110E16]/20 hover:border-zinc-800 transition-all cursor-pointer group space-y-3">
            <div className="w-7 h-7 rounded-lg bg-teal-950/20 border border-teal-900/30 flex items-center justify-center text-teal-400">
              <Compass size={13} />
            </div>
            <div>
              <h3 className="text-sm font-serif italic text-zinc-300">The Horizon</h3>
              <p className="text-[11px] text-zinc-600 font-serif italic mt-0.5">Explore curated, vetted language data & tech roles.</p>
            </div>
          </div>

          <div 
            onClick={() => isSubscriber ? window.open("https://discord.gg/your_invite", "_blank") : navigate('/grove')} 
            className="p-6 rounded-2xl border border-zinc-900 bg-[#110E16]/20 hover:border-zinc-800 transition-all cursor-pointer group space-y-3"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-950/20 border border-amber-900/30 flex items-center justify-center text-amber-400">
              <MessageSquare size={13} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-serif italic text-zinc-300">The Embers</h3>
                {!isSubscriber && <Shield size={9} className="text-zinc-700" />}
              </div>
              <p className="text-[11px] text-zinc-600 font-serif italic mt-0.5">
                {isSubscriber ? "Enter the private council chat server." : "Unlock access to the Steward cohort."}
              </p>
            </div>
          </div>

        </motion.section>

        {/* ── FOOTER FRAMEWORK ── */}
        <footer className="space-y-8 border-t border-zinc-950 pt-8">
          <GlobalFooter />
        </footer>

        {/* ── SETTINGS UTILITY ── */}
        <motion.section {...fadeIn} transition={{ delay: 0.3 }} className="border-t border-zinc-950 pt-6">
          <button onClick={() => setShowSettings(!showSettings)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors">
            <Settings size={11} className={`transition-transform ${showSettings ? 'rotate-90' : ''}`} /> Settings
          </button>
          
          <AnimatePresence>
            {showSettings && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Data Management</p>
                  <p className="text-[11px] font-serif italic text-zinc-600 leading-relaxed max-w-md">
                    To permanently erase your translated legacy parameters from the database, use the structural deletion protocol below.
                  </p>
                  <div className="pt-2"><DeleteAccountDialog /></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

      </div>
    </div>
  );
}