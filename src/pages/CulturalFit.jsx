import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hammer, ArrowRight, Upload, FileText, BrainCircuit, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  // We use phase to gate the flow: 'alchemy' -> 'smithy'
  const [phase, setPhase] = useState('alchemy');
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [lexiconDone, setLexiconDone] = useState(false);
  const [ethicsDone, setEthicsDone] = useState(false);
  const [ethics, setEthics] = useState({ transparency: 75, equity: 75, community: 75 });

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setHasUploaded(true);
    }
  };

  // Logic to move to the Smithy screen
  const enterSmithy = async () => {
    await base44.auth.updateMe({ alignment_complete: true });
    setPhase('smithy');
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-20 px-6">
      <AnimatePresence mode="wait">
        {phase === 'alchemy' ? (
          <motion.div key="alchemy" className="max-w-3xl mx-auto space-y-12">
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
                <span className="text-teal-400 font-bold uppercase tracking-wider text-sm">Resume Ignited — Alchemy Active</span>
              </div>
            )}

            {hasUploaded && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                  <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Lexicon Alchemist</h3>
                  <Button variant="outline" className="w-full" onClick={() => setLexiconDone(true)}>
                    {lexiconDone ? <CheckCircle2 className="mr-2 text-teal-500"/> : "Run Synthesis"}
                  </Button>
                </div>
                <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                  <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><Target className="text-teal-500"/> Ethics Calibration</h3>
                  {Object.keys(ethics).map((key) => (
                    <input key={key} type="range" className="w-full mb-4 accent-teal-500" onChange={() => setEthicsDone(true)}/>
                  ))}
                </div>
              </div>
            )}

            {lexiconDone && ethicsDone && (
              <Button onClick={enterSmithy} className="w-full h-20 rounded-3xl bg-teal-500 hover:bg-teal-400 font-black uppercase tracking-widest">
                Enter the Smithy <Hammer className="ml-3" />
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div key="smithy" className="max-w-xl mx-auto text-center space-y-8 pt-20">
            <h2 className="text-4xl font-serif italic text-white">Identity Tempered</h2>
            <p className="text-zinc-500">Your legacy is aligned. The Horizon awaits.</p>
            <Button onClick={() => navigate('/horizon')} className="w-full h-20 rounded-3xl bg-white text-black font-black uppercase">
              Proceed to the Horizon <ArrowRight className="ml-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}