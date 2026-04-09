import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  Mountain, 
  Sparkles, 
  Loader2, 
  Binoculars, 
  TreePine,
  ArrowRight,
  Info
} from 'lucide-react';

export default function CulturalFit() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);

  const handleAlignNarrative = () => {
    setIsAligning(true);
    // Simulating the Linguistic Bridge synthesis
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 1800);
  };

  const handleSurveyLandscape = () => {
    // Logic to redirect back to Canopy or show market results
    console.log("Navigating to Market Topography...");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      
      {/* --- TOP NAVIGATION BREADCRUMBS --- */}
      <nav className="flex justify-center items-center gap-12 md:gap-16 pb-8 border-b border-white/5">
        
        {/* Step 01: The Clearing */}
        <button 
          onClick={() => setActiveStep(1)}
          className={`flex flex-col items-center gap-2 transition-all group ${activeStep === 1 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border transition-colors ${activeStep === 1 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <div className="flex items-center justify-center h-full">
              <TreePine className={activeStep === 1 ? 'text-teal-400' : 'text-white'} size={20} />
            </div>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 1 ? 'text-teal-400' : 'text-gray-500'}`}>01. The Clearing</span>
        </button>

        <div className="h-px w-8 bg-white/5 hidden md:block" />

        {/* Step 02: The Compass */}
        <button 
          onClick={() => setActiveStep(2)}
          className={`flex flex-col items-center gap-2 transition-all group ${activeStep === 2 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border transition-colors ${activeStep === 2 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <div className="flex items-center justify-center h-full">
              <Compass className={activeStep === 2 ? 'text-teal-400' : 'text-white'} size={20} />
            </div>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 2 ? 'text-teal-400' : 'text-gray-500'}`}>02. The Compass</span>
        </button>

        <div className="h-px w-8 bg-white/5 hidden md:block" />

        {/* Step 03: The Wilds */}
        <button 
          onClick={() => setActiveStep(3)}
          className={`flex flex-col items-center gap-2 transition-all group ${activeStep === 3 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border transition-colors ${activeStep === 3 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <div className="flex items-center justify-center h-full">
              <Mountain className={activeStep === 3 ? 'text-teal-400' : 'text-white'} size={20} />
            </div>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 3 ? 'text-teal-400' : 'text-gray-500'}`}>03. The Wilds</span>
        </button>
      </nav>

      {/* --- DYNAMIC CONTENT AREA --- */}
      <main className="min-h-[450px]">
        
        {/* STEP 1: THE CLEARING */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white italic">Establish Your Baseline</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">Review your decoded legacy experience before testing it against the market topography.</p>
            </header>
            <Card className="p-10 bg-white/[0.02] border-white/5 border-dashed flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Info className="text-gray-500" />
              </div>
              <p className="text-gray-500 italic mb-8 max-w-xs">Your core linguistic bridges are ready. Ready to test a specific professional bearing?</p>
              <Button 
                onClick={() => setActiveStep(2)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold gap-2 px-8"
              >
                Enter The Compass <ArrowRight size={16} />
              </Button>
            </Card>
          </div>
        )}

        {/* STEP 2: THE COMPASS */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="p-8 bg-[#1C1622]/60 border-white/5 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Compass size={120} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                  <h4 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Market Bearing: Cloud Engineer</h4>
                  <p className="text-gray-300 leading-relaxed italic text-lg">
                    "National average salary: $100,290 per year. Primary duties include assessing tech infrastructures, 
                    optimizing workflows, and transferring processes to cloud-based environments."
                  </p>
                </div>

                <Button 
                  onClick={handleAlignNarrative}
                  disabled={isAligning}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black h-16 rounded-2xl transition-all shadow-lg"
                >
                  {isAligning ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="animate-spin" /> SYNTESIZING NARRATIVE...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles size={20} /> ALIGN NARRATIVE
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {/* STEP 3: THE WILDS */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700">
            <Card className="p-12 bg-[#1C1622]/90 border-teal-500/20 backdrop-blur-2xl text-center relative">
              <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.1)]">
                <Mountain className="w-10 h-10 text-teal-400" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-2 italic font-heading">Market Topography</h2>
              <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-black mb-12">
                Identifying Landscapes that Match Your Bearing
              </p>
              
              <Button 
                onClick={handleSurveyLandscape}
                className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all transform hover:scale-105"
              >
                <Binoculars size={20} /> SURVEY THE LANDSCAPE
              </Button>

              <p className="mt-8 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                Alignment Complete • 03 of 03
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}