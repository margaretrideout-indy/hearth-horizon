import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Compass, Mountain, Sparkles, Loader2, 
  Binoculars, TreePine, ArrowRight, ShieldCheck,
  Zap, MoveRight, ChevronRight
} from 'lucide-react';

export default function CulturalFit({ userAnalysis }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);

  const hasData = !!userAnalysis;

  // Synthesis Handler
  const handleSynthesis = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      {/* --- THE BREADCRUMB TRACKER --- */}
      <div className="flex items-center justify-center gap-4 mb-4">
        {[1, 2, 3].map((num) => (
          <React.Fragment key={num}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all
              ${activeStep === num ? 'bg-teal-500 border-teal-500 text-black shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'border-white/10 text-gray-500'}`}
            >
              0{num}
            </div>
            {num < 3 && <div className="w-12 h-px bg-white/5" />}
          </React.Fragment>
        ))}
      </div>

      <main className="min-h-[550px]">
        
        {/* --- STAGE 01: THE CLEARING (DECODE) --- */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 01: Baseline Decoded</p>
            </div>

            <Card className="p-10 bg-[#1C1622]/80 border-teal-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-teal-500">
                    <Sparkles size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Synthesis Output</span>
                  </div>
                  <p className="text-2xl text-gray-100 italic leading-relaxed font-medium">
                    "{userAnalysis?.identityStatement || "Please anchor your resume in the Hearth to generate your baseline identity."}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-500 font-black uppercase">Legacy Domain</span>
                    <p className="text-white font-bold text-lg italic">{userAnalysis?.legacyDomain || "Locked"}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-teal-500 font-black uppercase">Market Equivalent</span>
                    <p className="text-white font-bold text-lg italic">{userAnalysis?.corporateEquivalent || "Pending"}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => setActiveStep(2)}
                  disabled={!hasData}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black h-16 rounded-2xl gap-3 shadow-lg"
                >
                  ESTABLISH A BEARING <ArrowRight size={20} />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* --- STAGE 02: THE COMPASS (ALIGN) --- */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight">The Compass</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 02: Narrative Alignment</p>
            </div>

            <Card className="p-8 bg-[#1C1622]/80 border-white/10">
              <div className="space-y-8">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                  <h4 className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Compass size={12} /> Target Context
                  </h4>
                  <p className="text-gray-300 italic text-lg leading-relaxed">
                    You are currently testing your bearing against roles in **Cloud Infrastructure**. 
                    The market values your background in **Operational Strategy** and **Compliance Management**.
                  </p>
                </div>

                <Button 
                  onClick={handleSynthesis}
                  disabled={isAligning}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black h-16 rounded-2xl transition-all"
                >
                  {isAligning ? (
                    <span className="flex items-center gap-3 italic"><Loader2 className="animate-spin" /> ALIGNING NARRATIVE...</span>
                  ) : (
                    <span className="flex items-center gap-3"><Zap size={20} /> ALIGN NARRATIVE</span>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* --- STAGE 03: THE WILDS (SURVEY) --- */}
        {activeStep === 3 && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 03: Market Entry</p>
            </div>

            <Card className="p-12 bg-[#1C1622]/90 border-teal-500/20 text-center shadow-2xl">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-500/20">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Bearing is Set.</h2>
              <p className="text-gray-500 italic mb-10 max-w-sm mx-auto">
                Your narrative has been recoded. You are ready to survey the Canadian landscape for opportunities that match your value.
              </p>
              <Button 
                className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-[0_0_30px_rgba(20,184,166,0.3)]"
              >
                <Binoculars /> SURVEY THE LANDSCAPE
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}