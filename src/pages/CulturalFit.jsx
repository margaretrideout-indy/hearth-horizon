import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, BrainCircuit, Target, CheckCircle2, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [synthesis, setSynthesis] = useState(null);
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });

  const runSynthesis = () => {
    setSynthesis("Transforming complex instructional design and stakeholder management into scalable, human-centric data infrastructure.");
  };

  const handleFinalize = async () => {
    // Sync the alignment to the Hearth
    await base44.auth.updateMe({ 
        alignment_complete: true, 
        synthesis, 
        ethics 
    });
    // Jump straight to the mission
    navigate('/horizon');
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {!hasUploaded ? (
          <div className="border-2 border-dashed border-teal-800 rounded-[2.5rem] p-16 text-center hover:border-teal-500 transition-colors bg-white/[0.02]">
            <input type="file" onChange={() => setHasUploaded(true)} className="hidden" id="resume" />
            <label htmlFor="resume" className="cursor-pointer block">
              <Upload className="mx-auto mb-6 text-teal-500" size={48} />
              <h2 className="text-2xl font-serif italic text-white">Upload your resume to begin the Alchemy</h2>
            </label>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-8">
            {/* Alchemist Output */}
            <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
              <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><BrainCircuit className="text-teal-500"/> Lexicon Alchemist</h3>
              {!synthesis ? (
                <Button onClick={runSynthesis} className="w-full">Synthesize My Legacy</Button>
              ) : (
                <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20 text-sm leading-relaxed italic">
                  "{synthesis}"
                </div>
              )}
            </div>

            {/* Ethics Calibration */}
            <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
              <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><Target className="text-teal-500"/> Ethics Calibration</h3>
              {Object.entries(ethics).map(([label, val]) => (
                <div key={label} className="mb-6">
                  <div className="flex justify-between text-xs uppercase tracking-widest mb-2 text-zinc-500">
                    <span>{label}</span><span>{val}%</span>
                  </div>
                  <input type="range" className="w-full accent-teal-500" value={val} 
                    onChange={(e) => setEthics({...ethics, [label]: e.target.value})} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* The Final Act: Sync and Go */}
        {synthesis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button onClick={handleFinalize} className="w-full h-20 rounded-3xl bg-teal-500 hover:bg-teal-400 font-black uppercase tracking-widest">
              Enter The Smithy <Hammer className="ml-3" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}