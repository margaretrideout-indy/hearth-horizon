import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function CulturalFit({ vault, onComplete }) {
  const navigate = useNavigate();
  // phase: 'alchemy' (Lexicon/Ethics) -> 'smithy' (Final Review)
  const [phase, setPhase] = useState('alchemy'); 
  const [isTempering, setIsTempering] = useState(false);

  const handleFinalize = async () => {
    setIsTempering(true);
    // Sync the final aligned persona to the Hearth
    await base44.auth.updateMe({ alignment_complete: true });
    setIsTempering(false);
    setPhase('smithy');
  };

  return (
    <div className="bg-[#08070B] min-h-screen text-zinc-300">
      <AnimatePresence mode="wait">
        {phase === 'alchemy' ? (
          <motion.div key="alchemy" className="max-w-3xl mx-auto py-20 px-6">
            {/* TODO: UploadSection, LexiconAlchemistSection, EthicsCalculatorSection */}
            
            <Button onClick={handleFinalize} className="w-full h-20 rounded-3xl bg-teal-500 hover:bg-teal-400">
              {isTempering ? "Tempering..." : "Enter the Smithy"}
            </Button>
          </motion.div>
        ) : (
          <motion.div key="smithy" className="max-w-xl mx-auto py-20 px-6 text-center">
            {/* The Smithy: The final reflection of their new self */}
            <h2 className="text-4xl font-serif italic text-white mb-6">Identity Tempered</h2>
            <p className="mb-10 text-zinc-500">Your legacy has been synthesized. You are ready for the Horizon.</p>
            
            <Button onClick={() => navigate('/horizon')} className="w-full h-20 rounded-3xl bg-white text-black">
              Proceed to the Horizon <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}