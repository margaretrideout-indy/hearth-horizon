import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, BrainCircuit, Target, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  // State for the entire process
  const [hasUploaded, setHasUploaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });

  const handleFileUpload = async (e) => {
    if (e.target.files[0]) {
      // Logic to actually parse the resume goes here
      setHasUploaded(true);
    }
  };

  const runSynthesis = () => {
    setProfile({
      headline: "Strategic Operations & Systems Architect",
      summary: "I translate complex legacy processes into scalable, high-fidelity infrastructure. My approach balances rigorous operational integrity with empathetic stakeholder stewardship.",
      pillars: ["Stewardship of Data Integrity", "Systematic Architectural Flow", "Community-Centric Cultivation"]
    });
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* ALWAYS SHOW UPLOAD UNTIL ACTIVE */}
        {!hasUploaded ? (
          <div className="border-2 border-dashed border-teal-800 rounded-[2.5rem] p-16 text-center hover:border-teal-500 transition-colors bg-white/[0.02]">
            <input type="file" onChange={handleFileUpload} className="hidden" id="resume" />
            <label htmlFor="resume" className="cursor-pointer block">
              <Upload className="mx-auto mb-6 text-teal-500" size={48} />
              <h2 className="text-2xl font-serif italic text-white">Upload your resume to begin the Alchemy</h2>
            </label>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
            <FileText className="text-teal-400" />
            <span className="text-teal-400 font-bold uppercase tracking-wider text-sm">Resume Ignited — Alchemy Active</span>
          </motion.div>
        )}

        {/* ALWAYS SHOW TOOLS IF UPLOADED */}
        {hasUploaded && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
              <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Lexicon Alchemist</h3>
              {!profile ? (
                <Button onClick={runSynthesis} className="w-full">Generate Professional Profile</Button>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-teal-400 font-bold uppercase text-xs tracking-widest">{profile.headline}</h4>
                  <p className="text-sm italic text-zinc-400">"{profile.summary}"</p>
                </div>
              )}
            </div>

            <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
              <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><Target className="text-teal-500"/> Ethics Calibration</h3>
              {Object.entries(ethics).map(([label, val]) => (
                <div key={label} className="mb-6">
                  <div className="flex justify-between text-xs uppercase text-zinc-500 mb-2"><span>{label}</span><span>{val}%</span></div>
                  <input type="range" className="w-full accent-teal-500" value={val} onChange={(e) => setEthics({...ethics, [label]: e.target.value})} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* THE FINAL GATE */}
        {profile && (
          <Button onClick={() => navigate('/horizon')} className="w-full h-20 rounded-3xl bg-teal-500 font-black uppercase tracking-widest hover:bg-teal-400 transition-colors">
            Enter The Smithy <Hammer className="ml-3" />
          </Button>
        )}
      </div>
    </div>
  );
}