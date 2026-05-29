import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hammer, ArrowRight, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import ResumeUpload from '@/components/culture/ResumeUpload';
import LexiconAlchemistSection from '@/components/culture/LexiconAlchemistSection';
import EthicsCalculatorSection from '@/components/culture/EthicsCalculatorSection';

export default function CulturalFit({ vault }) {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [lexiconDone, setLexiconDone] = useState(false);
  const [ethicsDone, setEthicsDone] = useState(false);

  // Auto-trigger Alchemy on upload
  const handleUpload = async (file) => {
    // 1. Parse resume
    // 2. Invoke base44.functions.invoke('alchemizeLexicon', { resume: file })
    // 3. Set state to show results
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-[#08070B] min-h-screen">
      <div className="space-y-12">
        {/* Ignition */}
        <ResumeUpload onUpload={handleUpload} />

        {/* Synthesis: These two sections only reveal after upload */}
        {resumeData && (
          <div className="grid md:grid-cols-2 gap-8">
            <LexiconAlchemistSection onComplete={() => setLexiconDone(true)} />
            <EthicsCalculatorSection onComplete={() => setEthicsDone(true)} />
          </div>
        )}

        {/* The Smithy: Only appears when both tasks are finished */}
        <AnimatePresence>
          {lexiconDone && ethicsDone && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-teal-500/20 rounded-[2.5rem] bg-teal-500/5 text-center"
            >
              <h2 className="text-2xl font-serif italic mb-6">Identity Tempered</h2>
              <button 
                onClick={() => navigate('/horizon')}
                className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center justify-center"
              >
                Proceed to the Horizon <ArrowRight className="ml-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}