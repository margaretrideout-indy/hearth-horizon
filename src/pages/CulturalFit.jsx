import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ClipboardCheck, ArrowRightLeft, Sparkles, Lock
} from 'lucide-react';

export default function CulturalFit({ userAnalysis, targetJob }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);

  /**
   * HANDLER: Linguistic Bridge Logic
   * This allows the "DECODE" button to function regardless of resume status.
   */
  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    
    // Simulating the AI-driven Linguistic Bridge translation
    setTimeout(() => {
      setBridgeData({
        pm: `Orchestrated complex lifecycle deliverables for "${manualInput}", ensuring cross-functional alignment and milestone adherence.`,
        data: `Translated core objectives of "${manualInput}" into measurable performance indicators and success metrics.`,
        ops: `Optimized resource workflows surrounding "${manualInput}" to maintain operational continuity and excellence.`
      });
      setIsGenerating(false);
    }, 1000);
  };

  /**
   * HANDLER: Narrative Alignment
   * Triggers the transition to the final survey stage.
   */
  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      {/* NARRATIVE TRACKER: PROGRESSION UI */}
      <nav className="flex justify-center items-center gap-8 md:gap-16 border-b border-white/5 pb-10">
        {[
          { id: 1, label: "01. DECODE", icon: TreePine },
          { id: 2, label: "02. ALIGN", icon: Compass },
          { id: 3, label: "03. SURVEY", icon: Mountain }
        ].map((step) => (
          <button 
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            disabled={!userAnalysis && step.id > 1}
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'opacity-100 scale-105 text-teal-400' : 'opacity-30 text-white hover:opacity-50'}`}
          >
            <step.icon size={18} />
            <span className="text-[10px] font-black tracking-[0.2em]">{step.label}</span>
          </button>
        ))}
      </nav>

      <main className="min-h-[600px] space-y-8">
        
        {/* STAGE 01: THE CLEARING (Language & Baseline Identity) */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 01: Identity & Translation</p>
            </header>

            {/* PART A: THE LINGUISTIC BRIDGE (Persistent Tool) */}
            <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-2xl space-y-8">
              <div className="flex items-center gap-2 text-teal-500">
                <ArrowRightLeft size={18} />
                <h3 className="text-white font-black text-sm uppercase tracking-widest">Linguistic Bridge Generator</h3>
              </div>

              <div className="flex gap-3">
                <Input 
                  placeholder="Describe a professional experience..."
                  className="bg-black/40 border-white/10 text-gray-200 h-14 italic focus:ring-teal-500/50"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
                <Button 
                  onClick={handleDecode}
                  className="h-14 bg-teal-600 hover:bg-teal-500 px-10 font-black tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-teal-900/20"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : "DECODE"}
                </Button>
              </div>

              {/* TRANSLATION GRID */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Project Management', text: bridgeData?.pm || (userAnalysis?.variations?.pm) },
                  { title: 'Data Analysis', text: bridgeData?.data || (userAnalysis?.variations?.data) },
                  { title: 'Operations', text: bridgeData?.ops || (userAnalysis?.variations?.ops) }
                ].map((v, i) => (
                  <div key={i} className={`group p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex justify-between items-center transition-all hover:border-teal-500/30 ${!v.text && 'opacity-20'}`}>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter mb-1">{v.title}</p>
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        {v.text ? `"${v.text}"` : "Input experience to generate market value..."}
                      </p>
                    </div>
                    {v.text && (
                      <button 
                        onClick={() => navigator.clipboard.writeText(v.text)} 
                        className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-teal-400"
                        title="Copy to clipboard"
                      >
                        <ClipboardCheck size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* PART B: HEARTH SYNTHESIS (Deep Analysis Card) */}
            <Card className={`p-8 border-dashed backdrop-blur-xl transition-all duration-500 ${userAnalysis ? 'bg-teal-500/[0.03] border-teal-500/30' : 'bg-white/[0.02] border-white/10'}`}>
              {userAnalysis ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Badge className="bg-teal-500 text-black font-black text-[9px] tracking-widest px-2">RESUME SYNTHESIS ACTIVE</Badge>
                    <Sparkles className="text-teal-500" size={18} />
                  </div>
                  <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed">
                    "{userAnalysis.identityStatement}"
                  </h2>
                  <div className="flex gap-6 pt-2 border-t border-white/5">
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                      Legacy Domain: <span className="text-gray-300 ml-1">{userAnalysis.legacyDomain}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                      Corporate Equivalent: <span className="text-gray-300 ml-1">{userAnalysis.corporateEquivalent}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/10">
                    <Lock className="text-gray-600" size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold italic">Identity Synthesis Locked</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">Upload your resume in The Hearth to unlock your high-level professional narrative.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href='/hearth'}
                    className="border-teal-500/30 text-teal-500 hover:bg-teal-500/10 font-black text-[10px] tracking-widest h-10 px-6 rounded-xl transition-all"
                  >
                    RETURN TO HEARTH
                  </Button>
                </div>
              )}
            </Card>

            {/* NAVIGATION BUTTON */}
            {userAnalysis && (
              <Button 
                onClick={() => setActiveStep(2)} 
                className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-transform hover:scale-[1.01]"
              >
                ESTABLISH A BEARING <ArrowRight size={20} />
              </Button>
            )}
          </div>
        )}

        {/* STAGE 02: THE COMPASS (Alignment) */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <header className="text-center text-white italic">
              <h1 className="text-4xl font-bold">The Compass</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 02: Narrative Alignment</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/80 border-white/10 space-y-8 shadow-2xl">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Target Context</span>
                  <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-black tracking-widest">$100,290 Avg.</Badge>
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed">
                  "Testing your bearing against the **Market Opportunity** landscape. 
                  This path rewards your foundational expertise in **{userAnalysis?.legacyDomain || "Strategic Implementation"}** re-positioned as **{userAnalysis?.corporateEquivalent || "Operations Management"}**."
                </p>
              </div>

              <Button 
                onClick={handleAlign} 
                disabled={isAligning} 
                className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl shadow-lg transition-all"
              >
                {isAligning ? (
                  <span className="flex items-center gap-3"><Loader2 className="animate-spin" /> SYNTHESIZING ALIGNMENT...</span>
                ) : (
                  <span className="flex items-center gap-3"><Zap size={18} /> ALIGN NARRATIVE</span>
                )}
              </Button>
            </Card>
          </div>
        )}

        {/* STAGE 03: THE WILDS (Final Readiness) */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic tracking-tight">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 03: Surveying Opportunities</p>
            </header>

            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10 border-double border-4">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.1)]">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white italic decoration-teal-500 underline underline-offset-8">Your Bearing is Fixed.</h2>
                <p className="text-gray-500 italic max-w-sm mx-auto text-sm leading-relaxed pt-4">
                  The crossing is complete. Your professional narrative is now fully translated into the modern market topography.
                </p>
              </div>
              <Button 
                onClick={() => window.location.href='/canopy'} 
                className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-lg hover:scale-105 transition-transform"
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