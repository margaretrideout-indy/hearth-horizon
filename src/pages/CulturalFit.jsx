import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, Mountain, Sparkles, Loader2, 
  Binoculars, TreePine, ArrowRight, ShieldCheck,
  Zap, ClipboardCheck, Lock, MoveRight
} from 'lucide-react';

export default function CulturalFit({ userAnalysis, targetJob }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);

  // 1. ANCHOR CHECK: If no resume was parsed in The Hearth
  if (!userAnalysis) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-6 text-center space-y-8 animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
          <Lock className="text-gray-600" size={32} />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white italic">Ecosystem Alignment is Locked</h2>
          <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
            Your legacy professional baseline has not been established. Please anchor your resume in The Hearth to unlock this crossing.
          </p>
        </div>
        <Button 
          onClick={() => window.location.href = '/hearth'}
          className="bg-teal-600 hover:bg-teal-500 text-white font-black px-10 h-14 rounded-2xl shadow-lg"
        >
          Go to Your Hearth
        </Button>
      </div>
    );
  }

  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      
      {/* NARRATIVE PROGRESSION TRACKER */}
      <nav className="flex justify-center items-center gap-8 md:gap-16 border-b border-white/5 pb-10">
        {[
          { id: 1, label: "01. DECODE", icon: TreePine },
          { id: 2, label: "02. ALIGN", icon: Compass },
          { id: 3, label: "03. SURVEY", icon: Mountain }
        ].map((step) => (
          <button 
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-50'}`}
          >
            <div className={`p-2 rounded-lg ${activeStep === step.id ? 'bg-teal-500/10' : ''}`}>
              <step.icon size={18} className={activeStep === step.id ? 'text-teal-400' : 'text-white'} />
            </div>
            <span className={`text-[10px] font-black tracking-[0.2em] ${activeStep === step.id ? 'text-teal-400' : 'text-white'}`}>
              {step.label}
            </span>
          </button>
        ))}
      </nav>

      <main className="min-h-[500px]">
        {/* STAGE 1: THE CLEARING (Integrated Linguistic Bridge) */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Clearing</h1>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Baseline Identity Synthesis</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/60 border-teal-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <Badge className="bg-teal-500/10 text-teal-400 border-none uppercase text-[10px] tracking-widest px-3 py-1">Decoded Identity</Badge>
                  <p className="text-2xl text-gray-100 italic leading-relaxed font-medium">
                    "{userAnalysis.identityStatement}"
                  </p>
                </div>

                {/* THE GENERATOR: Jargon-to-Value Variations */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    <Zap size={14} className="text-teal-500" /> Linguistic Bridge Variations
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { type: 'Project Management', val: userAnalysis.variations?.pm },
                      { type: 'Data Analysis', val: userAnalysis.variations?.data },
                      { type: 'Operations', val: userAnalysis.variations?.ops }
                    ].map((v, i) => (
                      <div key={i} className="p-4 bg-white/[0.03] rounded-xl border border-white/5 flex justify-between items-center group hover:border-teal-500/30 transition-all">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter">{v.type}</p>
                          <p className="text-sm text-gray-400 italic">"{v.val || 'Analyzing market value...'}"</p>
                        </div>
                        <button onClick={() => navigator.clipboard.writeText(v.val)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-teal-500/10 rounded-lg">
                          <ClipboardCheck size={16} className="text-teal-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => setActiveStep(2)} 
                  className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 shadow-lg transition-transform hover:scale-[1.01]"
                >
                  ESTABLISH A BEARING <ArrowRight size={20} />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STAGE 2: THE COMPASS (Strategic Alignment) */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Compass</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 02: Narrative Alignment</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/80 border-white/10 relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Target Context</span>
                    <Badge variant="outline" className="border-teal-500/30 text-teal-400 text-[10px]">$100,290 Avg.</Badge>
                  </div>
                  <p className="text-gray-300 italic text-lg leading-relaxed">
                    Analyzing the **{targetJob?.title || 'Market Opportunity'}** landscape. 
                    This bearing rewards your background in **Operational Strategy** and **Resource Management**.
                  </p>
                </div>

                <Button 
                  onClick={handleAlign} 
                  disabled={isAligning} 
                  className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl shadow-[0_0_25px_rgba(20,184,166,0.2)]"
                >
                  {isAligning ? (
                    <span className="flex items-center gap-3"><Loader2 className="animate-spin" /> ALIGNING NARRATIVE...</span>
                  ) : (
                    <span className="flex items-center gap-3"><Zap size={20} /> ALIGN NARRATIVE</span>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STAGE 3: THE WILDS (Market Entry) */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 03: Surveying Opportunities</p>
            </header>

            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl relative">
              <div className="relative z-10 space-y-10">
                <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20 shadow-[0_0_40px_rgba(20,184,166,0.1)]">
                  <Mountain className="w-12 h-12 text-teal-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Your Bearing is Fixed.</h2>
                  <p className="text-gray-500 italic max-w-sm mx-auto text-sm">
                    The crossing is complete. Your narrative is now aligned with the current market topography.
                  </p>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-lg transform transition-hover hover:scale-105">
                  <Binoculars /> SURVEY THE LANDSCAPE
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}