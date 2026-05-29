import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hammer, ArrowRight, CheckCircle2, Upload, FileText, Target, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesis, setSynthesis] = useState(null);
  const [ethics, setEthics] = useState({ transparency: 75, equity: 75, community: 75 });
  const [lexiconDone, setLexiconDone] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setHasUploaded(true);
    }
  };

  const runSynthesis = async () => {
    setIsSynthesizing(true);
    // Simulate API call to "alchemize" the resume
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSynthesis({
      roles: ["Steward of Data", "Architect of Learning Systems", "Cultivator of Community"],
      translatedSummary: "Transforming complex stakeholder requirements into scalable pedagogical infrastructure."
    });
    setLexiconDone(true);
    setIsSynthesizing(false);
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Ignition */}
        {!hasUploaded ? (
          <div className="border-2 border-dashed border-teal-800 rounded-[2.5rem] p-16 text-center hover:border-teal-500 transition-colors bg-white/[0.02]">
            <input type="file" onChange={handleUpload} className="hidden" id="resume" />
            <label htmlFor="resume" className="cursor-pointer block">
              <Upload className="mx-auto mb-6 text-teal-500" size={48} />
              <h2 className="text-2xl font-serif italic text-white">Upload your resume to begin the Alchemy</h2>
            </label>
          </div>
        ) : (
          <div className="p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl flex items-center gap-4">
            <FileText className="text-teal-400" />
            <span className="text-teal-400 uppercase tracking-widest text-sm font-bold">Resume Ignited</span>
          </div>
        )}

        {/* Synthesis & Calibration */}
        {hasUploaded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Lexicon Alchemist */}
              <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Lexicon Alchemist</h3>
                {!synthesis ? (
                  <Button onClick={runSynthesis} disabled={isSynthesizing} className="w-full">
                    {isSynthesizing ? "Synthesizing..." : "Run Synthesis"}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {synthesis.roles.map(role => <div key={role} className="p-3 bg-white/5 rounded-lg text-sm">{role}</div>)}
                    <p className="text-xs text-zinc-500">{synthesis.translatedSummary}</p>
                  </div>
                )}
              </div>

              {/* Ethics Calibration */}
              <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><Target className="text-teal-500"/> Ethics Calculator</h3>
                {Object.keys(ethics).map((key) => (
                  <div key={key} className="mb-4">
                    <label className="text-xs uppercase tracking-widest text-zinc-500">{key}</label>
                    <input 
                      type="range" min="0" max="100" value={ethics[key]} 
                      onChange={(e) => setEthics({...ethics, [key]: e.target.value})}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* The Smithy Reveal */}
            {lexiconDone && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button onClick={() => navigate('/horizon')} className="w-full h-20 rounded-3xl bg-teal-500 hover:bg-teal-400 font-black uppercase tracking-widest">
                  Enter the Smithy <Hammer className="ml-3" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}