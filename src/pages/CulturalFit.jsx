import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, Mountain, Sparkles, Loader2, Binoculars } from 'lucide-react';

// --- SUB-COMPONENT: THE COMPASS (Step 02) ---
const CompassStep = ({ onAlign, isAligning }) => (
  <Card className="p-8 bg-[#1C1622]/60 border-white/5 backdrop-blur-xl animate-in fade-in duration-500">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-teal-500/10 rounded-xl">
        <Compass className="w-6 h-6 text-teal-400" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">The Compass</h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Testing a Specific Bearing</p>
      </div>
    </div>

    <div className="p-6 bg-black/40 rounded-2xl border border-white/5 mb-8">
      <p className="text-gray-300 leading-relaxed italic">
        Cloud engineer. National average salary: $100,290 per year. 
        Primary duties include assessing tech infrastructures and transferring processes to cloud-based environments...
      </p>
    </div>

    <Button 
      onClick={onAlign}
      disabled={isAligning}
      className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black h-14 rounded-2xl transition-all shadow-lg"
    >
      {isAligning ? (
        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Synthesizing Narrative...</>
      ) : (
        <><Sparkles className="w-5 h-5 mr-2" /> ALIGN NARRATIVE</>
      )}
    </Button>
  </Card>
);

// --- SUB-COMPONENT: THE WILDS (Step 03) ---
const WildsStep = () => (
  <Card className="p-12 bg-[#1C1622]/90 border-teal-500/20 backdrop-blur-2xl text-center animate-in zoom-in-95 duration-700">
    <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/20">
      <Mountain className="w-10 h-10 text-teal-400" />
    </div>
    <h2 className="text-4xl font-bold text-white mb-2 italic font-heading">Market Topography</h2>
    <p className="text-gray-400 uppercase tracking-widest text-[10px] font-black mb-10">
      Identifying Landscapes that Match Your Bearing
    </p>
    
    <Button className="bg-teal-600 hover:bg-teal-500 text-white px-10 h-14 rounded-2xl font-bold gap-3 shadow-[0_0_30px_rgba(20,184,166,0.2)]">
      <Binoculars className="w-5 h-5" /> SURVEY THE LANDSCAPE
    </Button>
  </Card>
);

// --- MAIN CONTAINER ---
export default function EcosystemAlignment() {
  const [activeStep, setActiveStep] = useState(2); // Start at Compass for this demo
  const [isAligning, setIsAligning] = useState(false);

  const handleAlignNarrative = () => {
    setIsAligning(true);
    // Simulate the "Linguistic Bridge" processing the match
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3); // Navigate to The Wilds
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      {/* NAV HEADER (Visualizing your screenshot top nav) */}
      <div className="flex justify-center items-center gap-16 pb-8 border-b border-white/5">
        <div className={`flex flex-col items-center gap-2 opacity-${activeStep === 1 ? '100' : '30'}`}>
          <div className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center">01</div>
          <span className="text-[10px] font-black uppercase tracking-tighter">The Clearing</span>
        </div>
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${activeStep === 2 ? 'scale-110' : 'opacity-30'}`}>
          <div className={`w-12 h-12 rounded-xl border ${activeStep === 2 ? 'border-teal-500 bg-teal-500/10' : 'border-white/20'} flex items-center justify-center`}>
            <Compass className={activeStep === 2 ? 'text-teal-400' : 'text-white'} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-tighter ${activeStep === 2 ? 'text-teal-400' : ''}`}>02. The Compass</span>
        </div>
        <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${activeStep === 3 ? 'scale-110' : 'opacity-30'}`}>
          <div className={`w-12 h-12 rounded-xl border ${activeStep === 3 ? 'border-teal-500 bg-teal-500/10' : 'border-white/20'} flex items-center justify-center`}>
            <Mountain className={activeStep === 3 ? 'text-teal-400' : 'text-white'} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-tighter ${activeStep === 3 ? 'text-teal-400' : ''}`}>03. The Wilds</span>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <main>
        {activeStep === 2 && (
          <CompassStep onAlign={handleAlignNarrative} isAligning={isAligning} />
        )}
        
        {activeStep === 3 && (
          <WildsStep />
        )}
      </main>
    </div>
  );
}