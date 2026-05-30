import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clipboard, Check, Upload, BrainCircuit, Target, BookOpen, Compass, Trash2, RefreshCw, ChevronRight } from 'lucide-react';
import GlobalFooter from '@/components/layout/GlobalFooter';
import { Button } from '@/components/ui/button';

export default function Hearth({ vault }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Progression Stages: 'upload' -> 'ethics' -> 'alchemy'
  const [stage, setStage] = useState('upload'); 
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });
  const [alchemyData, setAlchemyData] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files?.length > 0) setStage('ethics');
  };

  const runAlchemy = () => {
    setAlchemyData({
      headline: "STRATEGIC OPERATIONS & SYSTEMS ARCHITECT",
      summary: "I translate complex legacy processes into scalable, high-fidelity infrastructure.",
      bullets: ["Architected enterprise-level systems, improving throughput by 40%.", "Led cross-functional stewardship of data integrity."]
    });
    setStage('alchemy');
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="space-y-2 border-b border-zinc-900 pb-8">
          <h1 className="text-3xl font-serif italic text-purple-200">The Hearth</h1>
          <p className="text-sm text-zinc-600">Your Basecamp for mapping your career transition.</p>
        </header>

        {/* ── STAGE 1: UPLOAD ── */}
        {stage === 'upload' && (
          <div className="text-center py-12">
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            <div className="border-2 border-dashed border-zinc-800 rounded-[2rem] p-16 hover:border-teal-500 transition-colors cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <Upload className="mx-auto mb-4 text-zinc-700" size={32} />
              <p className="text-sm">Upload your resume for sync and analysis</p>
            </div>
          </div>
        )}

        {/* ── STAGE 2: ETHICS CALIBRATION ── */}
        {stage !== 'upload' && (
          <section className="space-y-8">
            <h2 className="text-lg font-serif italic text-white flex items-center gap-2">
              <Target className="text-teal-500"/> Ethics Calibration
            </h2>
            <div className="bg-[#0D0B14] p-8 rounded-2xl border border-white/5 grid md:grid-cols-3 gap-8">
              {Object.entries(ethics).map(([label, val]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs uppercase mb-2"><span>{label}</span><span>{val}%</span></div>
                  <input type="range" className="w-full accent-teal-500" value={val} onChange={(e) => setEthics({...ethics, [label]: e.target.value})} />
                </div>
              ))}
            </div>
            
            {stage === 'ethics' && (
              <Button onClick={runAlchemy} className="w-full bg-teal-500 text-black hover:bg-teal-400">
                Run Alchemy Analysis <ChevronRight size={16} className="ml-2"/>
              </Button>
            )}
          </section>
        )}

        {/* ── STAGE 3: ALCHEMY SUITE (UNLOCKED) ── */}
        {stage === 'alchemy' && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-serif italic text-white flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Alchemy Suite</h2>
              <Button variant="ghost" size="sm" onClick={() => setStage('upload')} className="text-zinc-600 hover:text-red-400">
                <Trash2 size={14} className="mr-2" /> Reset
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Analyzer</h3>
                <p className="text-sm italic text-zinc-400">"{alchemyData.summary}"</p>
              </div>
              <div className="p-8 bg-[#0D0B14] rounded-2xl border border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Generated Assets</h3>
                <div className="space-y-4">
                  <AssetItem label="Headline" text={alchemyData.headline} />
                  <AssetItem label="Impact Points" text={alchemyData.bullets.join('\n\n')} />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavigationCard title="The Library" description="Refine your templates." icon={<BookOpen />} onClick={() => navigate('/library')} />
          <NavigationCard title="The Horizon" description="Sync your work to the job board." icon={<Compass />} onClick={() => navigate('/horizon')} />
        </section>
      </div>
    </div>
  );
}

// Sub-components remain similar to previous draft
const AssetItem = ({ label, text }) => (
  <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
    <p className="text-teal-500 text-[10px] font-bold uppercase mb-1">{label}</p>
    <p className="text-[11px] text-zinc-300">{text}</p>
  </div>
);

const NavigationCard = ({ title, description, icon, onClick }) => (
  <div onClick={onClick} className="p-8 border border-zinc-900 rounded-3xl cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/20 transition-all group">
    <div className="mb-4 text-purple-400">{icon}</div>
    <h3 className="font-serif italic text-zinc-300">{title}</h3>
    <p className="text-xs text-zinc-600 mt-1">{description}</p>
  </div>
);