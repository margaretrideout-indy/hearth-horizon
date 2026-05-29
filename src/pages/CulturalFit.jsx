import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hammer, ArrowRight, CheckCircle2, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('alchemy');
  const [isTempering, setIsTempering] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  
  // Logic states
  const [lexiconDone, setLexiconDone] = useState(false);
  const [ethicsDone, setEthicsDone] = useState(false);

  const handleUpload = async (e) => {
    if (e.target.files[0]) {
      // Simulate file processing/parsing
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUploaded(true);
    }
  };

  const handleFinalize = async () => {
    setIsTempering(true);
    await base44.auth.updateMe({ alignment_complete: true });
    setIsTempering(false);
    setPhase('smithy');
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-20 px-6">
      <AnimatePresence mode="wait">
        {phase === 'alchemy' ? (
          <motion.div key="alchemy" className="max-w-3xl mx-auto space-y-12">
            
            {/* 1. Ignition */}
            {!hasUploaded ? (
              <div className="border-2 border-dashed border-teal-800 rounded-[2.5rem] p-16 text-center hover:border-teal-500 transition-colors bg-white/[0.02]">
                <input type="file" onChange={handleUpload} className="hidden" id="resume" />
                <label htmlFor="resume" className="cursor-pointer block">
                  <Upload className="mx-auto mb-6 text-teal-500" size={48} />
                  <h2 className="text-2xl font-serif italic text-white">Upload your resume to begin the Alchemy</h2>
                  <p className="text-zinc-600 text-sm mt-3 uppercase tracking-widest">PDF OR WORD - CLICK TO BROWSE</p>
                </label>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 p-6 bg-teal-500/5 border border-teal-500/10 rounded-2xl">
                <FileText className="text-teal-400" />
                <span className="text-teal-400 font-bold uppercase tracking-wider text-sm">Resume Ignited — Alchemy Active</span>
              </motion.div>
            )}

            {/* 2. Synthesis (Only revealed after upload) */}
            {hasUploaded && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                    <h3 className="text-xl font-serif italic mb-4">Lexicon Alchemist</h3>
                    <p className="text-zinc-500 text-sm mb-6">Translating your legacy into tech-ready value.</p>
                    <Button variant="outline" onClick={() => setLexiconDone(true)} className="w-full">
                      {lexiconDone ? <CheckCircle2 className="mr-2 text-teal-500" /> : "Run Synthesis"}
                    </Button>
                  </div>
                  <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
                    <h3 className="text-xl font-serif italic mb-4">Ethics Calculator</h3>
                    <p className="text-zinc-500 text-sm mb-6">Aligning your values with the new path.</p>
                    <Button variant="outline" onClick={() => setEthicsDone(true)} className="w-full">
                      {ethicsDone ? <CheckCircle2 className="mr-2 text-teal-500" /> : "Calibrate"}
                    </Button>
                  </div>
                </div>

                {/* The Smithy Trigger */}
                {lexiconDone && ethicsDone && (
                  <Button onClick={handleFinalize} className="w-full h-20 rounded-3xl bg-teal-500 hover:bg-teal-400 font-black tracking-widest uppercase">
                    {isTempering ? "Tempering..." : "Enter the Smithy"}
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* 3. The Smithy Reveal */
          <motion.div key="smithy" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto text-center space-y-8">
            <div className="p-10 border border-teal-500/20 rounded-[3rem] bg-teal-500/5">
              <CheckCircle2 size={64} className="text-teal-400 mx-auto mb-6" />
              <h2 className="text-4xl font-serif italic text-white mb-4">Identity Tempered</h2>
              <p className="text-zinc-400">Your legacy has been synthesized. You are ready for the Horizon.</p>
            </div>
            <Button onClick={() => navigate('/horizon')} className="w-full h-20 rounded-3xl bg-white text-black font-black hover:bg-zinc-200 uppercase tracking-widest">
              Proceed to the Horizon <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}