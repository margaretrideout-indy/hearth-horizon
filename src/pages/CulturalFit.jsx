import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, BrainCircuit, Target, Hammer, Award, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  const [hasUploaded, setHasUploaded] = useState(false);
  const [profile, setProfile] = useState(null); // Now stores a full object
  const [ethics, setEthics] = useState({ Reciprocity: 50, Transparency: 50, Agency: 50 });

  const runSynthesis = () => {
    // This now generates a full professional identity object
    setProfile({
      headline: "Strategic Operations & Systems Architect",
      summary: "I translate complex legacy processes into scalable, high-fidelity infrastructure. My approach balances rigorous operational integrity with empathetic stakeholder stewardship.",
      pillars: ["Stewardship of Data Integrity", "Systematic Architectural Flow", "Community-Centric Cultivation"]
    });
  };

  const handleFinalize = async () => {
    await base44.auth.updateMe({ alignment_complete: true, profile, ethics });
    navigate('/horizon');
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {!hasUploaded ? (
            /* Upload UI remains same */
            <div className="border-2 border-dashed border-teal-800 rounded-[2.5rem] p-16 text-center hover:border-teal-500 cursor-pointer" onClick={() => setHasUploaded(true)}>
                <Upload className="mx-auto mb-6 text-teal-500" size={48} />
                <h2 className="text-2xl font-serif italic text-white">Upload resume to ignite your Profile Engine</h2>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Professional Profile Engine */}
            <div className="p-8 border border-white/5 bg-[#0D0B14] rounded-[2.5rem]">
              <h3 className="text-xl font-serif italic mb-6 flex items-center gap-2"><Briefcase className="text-teal-500"/> Professional Identity</h3>
              {!profile ? (
                <Button onClick={runSynthesis} className="w-full">Generate Professional Profile</Button>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <h4 className="text-teal-400 font-bold uppercase tracking-widest text-xs">{profile.headline}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed italic">"{profile.summary}"</p>
                    <div className="space-y-2">
                        {profile.pillars.map((p, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                                <Award size={14} className="text-teal-500"/> {p}
                            </div>
                        ))}
                    </div>
                </motion.div>
              )}
            </div>

            {/* Ethics Calibration */}
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

        {profile && (
            <Button onClick={handleFinalize} className="w-full h-20 rounded-3xl bg-teal-500 font-black uppercase tracking-widest">
                Enter The Smithy <Hammer className="ml-3" />
            </Button>
        )}
      </div>
    </div>
  );
}