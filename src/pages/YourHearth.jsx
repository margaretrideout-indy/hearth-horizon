import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, BrainCircuit, Target, BookOpen, Compass, FileText, Trash2, RefreshCw } from 'lucide-react';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { Button } from '@/components/ui/button';

export default function Hearth({ vault, onSync }) {
  const navigate = useNavigate();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });

  const runAlchemy = () => {
    setProfile({
      headline: "STRATEGIC OPERATIONS & SYSTEMS ARCHITECT",
      summary: "I translate complex legacy processes into scalable infrastructure.",
      pillars: ["Data Integrity", "Architectural Flow", "Community Cultivation"]
    });
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* ── HEADER: BASECAMP ── */}
        <header className="space-y-2">
          <h1 className="text-3xl font-serif italic text-purple-200">The Hearth</h1>
          <p className="text-sm text-zinc-600">Your central command for career alignment and transition.</p>
        </header>

        {/* ── ALCHEMY SUITE ── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif italic text-white flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Alchemy Suite</h2>
            {hasUploaded && (
              <Button variant="ghost" size="sm" onClick={() => setHasUploaded(false)} className="text-zinc-600 hover:text-red-400">
                <Trash2 size={14} className="mr-2" /> Reset Resume
              </Button>
            )}
          </div>

          {!hasUploaded ? (
            <div className="border-2 border-dashed border-zinc-800 rounded-[2rem] p-16 text-center hover:border-teal-500 transition-colors cursor-pointer" onClick={() => setHasUploaded(true)}>
              <Upload className="mx-auto mb-4 text-zinc-700" size={32} />
              <p className="text-sm">Upload your resume for sync and analysis</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5 space-y-6">
                {!profile ? (
                  <Button onClick={runAlchemy} className="w-full bg-teal-900/30 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                    <RefreshCw size={14} className="mr-2" /> Run Alchemy Analysis
                  </Button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <p className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">{profile.headline}</p>
                    <p className="text-sm italic text-zinc-400">"{profile.summary}"</p>
                  </motion.div>
                )}
              </div>

              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5">
                <h3 className="text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-2"><Target size={14} className="text-teal-500"/> Ethics Calibration</h3>
                {Object.entries(ethics).map(([label, val]) => (
                  <div key={label} className="mb-6">
                    <div className="flex justify-between text-[10px] uppercase text-zinc-500 mb-2"><span>{label}</span><span>{val}%</span></div>
                    <input type="range" className="w-full accent-teal-500" value={val} onChange={(e) => setEthics({...ethics, [label]: e.target.value})} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── NAVIGATION ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div onClick={() => navigate('/library')} className="p-8 border border-zinc-900 rounded-3xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group">
            <BookOpen className="mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif italic text-zinc-300">The Library</h3>
            <p className="text-xs text-zinc-600 mt-1">Refine your templates and scripts.</p>
          </div>
          <div onClick={() => navigate('/horizon')} className="p-8 border border-zinc-900 rounded-3xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group">
            <Compass className="mb-4 text-teal-400 group-hover:scale-110 transition-transform" />
            <h3 className="font-serif italic text-zinc-300">The Horizon</h3>
            <p className="text-xs text-zinc-600 mt-1">Sync your work to the job board.</p>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </div>
  );
}