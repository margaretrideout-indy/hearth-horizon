import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Compass, 
  Mountain, 
  Sparkles, 
  Loader2, 
  Binoculars, 
  TreePine,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function CulturalFit({ userBridgeData }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);

  // Fallback data for the UI if props aren't passed yet
  const decodedIdentity = userBridgeData?.identityStatement || 
    "Your background is not just a list of previous duties—it is the high-level management of human capital, complex data pipelines, and organizational strategy.";
  
  const legacyDomain = userBridgeData?.legacyDomain || "Legacy Professional Domain";
  const corporateEquivalent = userBridgeData?.corporateEquivalent || "Strategic Market Equivalent";

  const handleAlignNarrative = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      
      {/* --- TOP NAVIGATION BREADCRUMBS --- */}
      <nav className="flex justify-center items-center gap-8 md:gap-16 pb-8 border-b border-white/5">
        <button 
          onClick={() => setActiveStep(1)}
          className={`flex flex-col items-center gap-2 transition-all ${activeStep === 1 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${activeStep === 1 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <TreePine className={activeStep === 1 ? 'text-teal-400' : 'text-white'} size={20} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 1 ? 'text-teal-400' : 'text-gray-500'}`}>01. The Clearing</span>
        </button>

        <button 
          onClick={() => setActiveStep(2)}
          className={`flex flex-col items-center gap-2 transition-all ${activeStep === 2 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${activeStep === 2 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <Compass className={activeStep === 2 ? 'text-teal-400' : 'text-white'} size={20} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 2 ? 'text-teal-400' : 'text-gray-500'}`}>02. The Compass</span>
        </button>

        <button 
          onClick={() => setActiveStep(3)}
          className={`flex flex-col items-center gap-2 transition-all ${activeStep === 3 ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-60'}`}
        >
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${activeStep === 3 ? 'border-teal-500 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/20'}`}>
            <Mountain className={activeStep === 3 ? 'text-teal-400' : 'text-white'} size={20} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === 3 ? 'text-teal-400' : 'text-gray-500'}`}>03. The Wilds</span>
        </button>
      </nav>

      {/* --- DYNAMIC CONTENT AREA --- */}
      <main className="min-h-[450px]">
        
        {/* STEP 1: THE CLEARING (Dynamic Summary) */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white italic">Your Professional Baseline</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">This is how the Bridge has decoded your legacy experience into market value.</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/60 border-teal-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="space-y-8 relative z-10">
                <div className="space-y-4">
                  <Badge variant="outline" className="text-teal-500 border-teal-500/30 bg-teal-500/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase">
                    Decoded Identity
                  </Badge>
                  <p className="text-gray-200 leading-relaxed italic text-xl">
                    "{decodedIdentity}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-black uppercase mb-2 tracking-tighter">Legacy Domain</p>
                    <p className="text-white font-bold">{legacyDomain}</p>
                  </div>
                  <div className="p-5 bg-teal-500/10 rounded-2xl border border-teal-500/20 shadow-inner">
                    <p className="text-[10px] text-teal-400 font-black uppercase mb-2 tracking-tighter">Corporate Equivalent</p>
                    <p className="text-white font-bold">{corporateEquivalent}</p>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => setActiveStep(2)}
                    className="bg-teal-600 hover:bg-teal-500 text-white font-black px-12 h-14 rounded-2xl gap-2 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                  >
                    Enter The Compass <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
              <ShieldCheck className="absolute -bottom-6 -right-6 w-32 h-32 text-white/5 rotate-12" />
            </Card>
          </div>
        )}

        {/* STEP 2: THE COMPASS */}
        {activeStep === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             <Card className="p-8 bg-[#1C1622]/60 border-white/5 backdrop-blur-xl">
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5 mb-8">
                  <h4 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Current Bearing: Market Opportunity</h4>
                  <p className="text-gray-300 leading-relaxed italic text-lg">
                    Analyze specific roles to see how your decoded baseline intersects with national salary averages and operational duties.
                  </p>
                </div>

                <Button 
                  onClick={handleAlignNarrative}
                  disabled={isAligning}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black h-16 rounded-2xl shadow-lg transition-all"
                >
                  {isAligning ? (
                    <span className="flex items-center gap-3 italic"><Loader2 className="animate-spin" /> SYNTHESIZING NARRATIVE...</span>
                  ) : (
                    <span className="flex items-center gap-3"><Sparkles size={20} /> ALIGN NARRATIVE</span>
                  )}
                </Button>
             </Card>
          </div>
        )}
        
        {/* STEP 3: THE WILDS */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700">
            <Card className="p-12 bg-[#1C1622]/90 border-teal-500/20 backdrop-blur-2xl text-center relative overflow-hidden">
              <Zap className="absolute top-4 right-4 text-teal-500/20 w-12 h-12" />
              <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/20">
                <Mountain className="w-10 h-10 text-teal-400" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-2 italic font-heading">Market Topography</h2>
              <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-black mb-12">Identifying Landscapes that Match Your Bearing</p>
              
              <Button 
                onClick={() => console.log("Final Survey Triggered")}
                className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all transform hover:scale-105"
              >
                <Binoculars size={20} /> SURVEY THE LANDSCAPE
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}