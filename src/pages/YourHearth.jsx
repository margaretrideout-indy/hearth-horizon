import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clipboard, Check, Upload, BrainCircuit, Target, RefreshCw, BookOpen, Compass, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper for clipboard
const copyToClipboard = (text, setCopied) => {
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

export default function Hearth({ vault }) {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [copiedStates, setCopiedStates] = useState({});
  const [alchemyData, setAlchemyData] = useState(null);

  const runAlchemy = () => {
    setAlchemyData({
      headline: "STRATEGIC OPERATIONS & SYSTEMS ARCHITECT",
      summary: "I translate complex legacy processes into scalable, high-fidelity infrastructure.",
      bullets: [
        "Architected enterprise-level systems, improving throughput by 40%.",
        "Led cross-functional stewardship of data integrity and security protocols.",
        "Cultivated community-centric workflows across distributed operations."
      ]
    });
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* ── BASECAMP HEADER ── */}
        <header className="space-y-2 border-b border-zinc-900 pb-8">
          <h1 className="text-3xl font-serif italic text-purple-200">The Hearth</h1>
          <p className="text-sm text-zinc-600">Your Basecamp for career transformation.</p>
        </header>

        {/* ── ALCHEMY SUITE ── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif italic text-white flex items-center gap-2">
              <BrainCircuit className="text-teal-500"/> Alchemy Suite
            </h2>
            {hasUploaded && (
              <Button variant="ghost" size="sm" onClick={() => {setHasUploaded(false); setAlchemyData(null);}} className="text-zinc-600 hover:text-red-400">
                <Trash2 size={14} className="mr-2" /> Reset
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
              {/* ANALYZER VIEW */}
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Analyzer</h3>
                {!alchemyData ? (
                  <Button onClick={runAlchemy} className="w-full bg-teal-900/30 border border-teal-500/30 text-teal-400 hover:bg-teal-500/10">
                    <RefreshCw size={14} className="mr-2" /> Run Alchemy Analysis
                  </Button>
                ) : (
                  <div className="space-y-4">
                     <p className="text-sm italic">"{alchemyData.summary}"</p>
                  </div>
                )}
              </div>

              {/* GENERATOR VIEW */}
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Generated Assets</h3>
                {alchemyData && (
                  <div className="space-y-4">
                    <AssetItem label="Headline" text={alchemyData.headline} copied={copiedStates.headline} onCopy={() => copyToClipboard(alchemyData.headline, () => setCopiedStates({headline: true}))} />
                    <AssetItem label="Bullet Points" text={alchemyData.bullets.join('\n')} copied={copiedStates.bullets} onCopy={() => copyToClipboard(alchemyData.bullets.join('\n'), () => setCopiedStates({bullets: true}))} />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ── NAVIGATION ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavigationCard title="The Library" description="Refine your templates and scripts." icon={<BookOpen />} onClick={() => navigate('/library')} />
          <NavigationCard title="The Horizon" description="Sync your work to the job board." icon={<Compass />} onClick={() => navigate('/horizon')} />
        </section>
      </div>
    </div>
  );
}

// Sub-components to keep the main code clean
const AssetItem = ({ label, text, copied, onCopy }) => (
  <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 flex justify-between items-start">
    <div className="text-[11px]">
      <p className="text-teal-500 font-bold mb-1">{label}</p>
      <p className="text-zinc-300">{text.length > 50 ? text.substring(0, 50) + '...' : text}</p>
    </div>
    <button onClick={onCopy} className="text-zinc-600 hover:text-white">
      {copied ? <Check size={14} /> : <Clipboard size={14} />}
    </button>
  </div>
);

const NavigationCard = ({ title, description, icon, onClick }) => (
  <div onClick={onClick} className="p-8 border border-zinc-900 rounded-3xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group">
    <div className="mb-4 text-purple-400 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="font-serif italic text-zinc-300">{title}</h3>
    <p className="text-xs text-zinc-600 mt-1">{description}</p>
  </div>
);