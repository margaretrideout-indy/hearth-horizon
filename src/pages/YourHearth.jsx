import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Settings, MessageSquare, Compass, Library, Shield, Upload, BrainCircuit, Target, Award } from 'lucide-react';
import GlobalFooter from '@/components/layout/GlobalFooter';
import DeleteAccountDialog from '@/components/hearth/DeleteAccountDialog';
import { Button } from '@/components/ui/button';

const fadeIn = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const PULSES = [
  { icon: "🌱", label: "Growing" }, { icon: "🔥", label: "Stretched" },
  { icon: "🌊", label: "Flowing" }, { icon: "☁️", label: "Cloudy" },
  { icon: "💎", label: "Resilient" }
];

export default function Hearth({ vault, onSync }) {
  const navigate = useNavigate();
  // Alchemy State
  const [hasUploaded, setHasUploaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });
  
  // Hearth State
  const [selectedPulse, setSelectedPulse] = useState(null);

  const runAlchemy = () => {
    setProfile({
      headline: "STRATEGIC OPERATIONS & SYSTEMS ARCHITECT",
      summary: "I translate complex legacy processes into scalable infrastructure.",
      pillars: ["Data Integrity", "Architectural Flow", "Community Cultivation"]
    });
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans p-6 md:p-16">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* ── HEADER: THE PULSE ── */}
        <header className="border-b border-zinc-900/60 pb-8 space-y-6">
          <h1 className="text-3xl font-serif italic text-purple-200">The Hearth</h1>
          <div className="flex gap-2">
            {PULSES.map((p) => (
              <button key={p.label} onClick={() => setSelectedPulse(p.icon)} className={`w-12 h-12 rounded-xl border ${selectedPulse === p.icon ? 'bg-teal-500/10 border-teal-500' : 'border-zinc-900'}`}>
                {p.icon}
              </button>
            ))}
          </div>
        </header>

        {/* ── ALCHEMY SUITE (FORMERLY CULTURALFIT) ── */}
        <section className="space-y-8">
          <h2 className="text-lg font-serif italic text-white flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Alchemy Suite</h2>
          {!hasUploaded ? (
            <div className="border-2 border-dashed border-teal-800 rounded-[2rem] p-12 text-center cursor-pointer" onClick={() => setHasUploaded(true)}>
              <Upload className="mx-auto mb-4 text-teal-500" />
              <p>Upload legacy profile to begin</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Alchemy */}
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5">
                {!profile ? <Button onClick={runAlchemy}>Generate Profile</Button> : (
                  <div className="space-y-4">
                    <p className="text-teal-400 text-xs font-bold uppercase">{profile.headline}</p>
                    <p className="text-sm italic">"{profile.summary}"</p>
                  </div>
                )}
              </div>
              {/* Ethics Calibration */}
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5">
                <h3 className="flex items-center gap-2 mb-6"><Target size={16}/> Ethics Calibration</h3>
                {Object.entries(ethics).map(([label, val]) => (
                  <div key={label} className="mb-4">
                    <div className="flex justify-between text-[10px] uppercase">{label}<span>{val}%</span></div>
                    <input type="range" className="w-full accent-teal-500" value={val} onChange={(e) => setEthics({...ethics, [label]: e.target.value})} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── THRESHOLDS ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={() => navigate('/library')} className="p-6 border border-zinc-900 rounded-2xl cursor-pointer hover:border-zinc-700">
            <Library className="mb-2 text-purple-400" />
            <h3 className="font-serif italic text-zinc-300">The Library</h3>
          </div>
          <div onClick={() => navigate('/horizon')} className="p-6 border border-zinc-900 rounded-2xl cursor-pointer hover:border-zinc-700">
            <Compass className="mb-2 text-teal-400" />
            <h3 className="font-serif italic text-zinc-300">The Horizon</h3>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </div>
  );
}