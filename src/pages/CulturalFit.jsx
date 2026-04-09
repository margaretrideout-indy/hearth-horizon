import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ClipboardCheck, ArrowRightLeft, Search, Sparkles
} from 'lucide-react';

export default function CulturalFit({ userAnalysis, targetJob }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [manualResult, setManualResult] = useState(null);

  const handleManualGenerate = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      setManualResult({
        pm: "Directed complex lifecycle initiatives, ensuring strategic alignment across multi-disciplinary stakeholders.",
        data: "Synthesized high-volume performance metrics into actionable intelligence for executive decision-making.",
        ops: "Optimized systemic resource allocation to maintain 100% operational continuity in high-pressure environments."
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      
      {/* NARRATIVE TRACKER */}
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
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'opacity-100 scale-105 text-teal-400' : 'opacity-30 text-white'} ${(!userAnalysis && step.id > 1) ? 'cursor-not-allowed' : 'hover:opacity-50'}`}
          >
            <step.icon size={18} />
            <span className="text-[10px] font-black tracking-[0.2em]">{step.label}</span>
          </button>
        ))}
      </nav>

      <main className="min-h-[500px]">
        {activeStep === 1 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 01: Identity & Translation</p>
            </header>

            {/* SECTION A: THE DEEP ANALYSIS (Visible only if resume uploaded) */}
            {userAnalysis && (
              <Card className="p-8 bg-teal-500/[0.03] border-teal-500/30 backdrop-blur-xl space-y-6 shadow-2xl border-dashed">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge className="bg-teal-500 text-black font-black uppercase text-[8px] tracking-widest px-2 py-0.5">Resume Anchored</Badge>
                    <h3 className="text-white font-bold text-lg italic">Hearth Synthesis</h3>
                  </div>
                  <Sparkles className="text-teal-400" size={20} />
                </div>
                <p className="text-xl text-gray-200 italic leading-relaxed font-medium">
                  "{userAnalysis.identityStatement}"
                </p>
                <div className="flex gap-4">
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-gray-400">
                    <span className="text-teal-500 font-bold tracking-tighter mr-2">LEGACY:</span> {userAnalysis.legacyDomain}
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-gray-400">
                    <span className="text-teal-500 font-bold tracking-tighter mr-2">EQUIVALENT:</span> {userAnalysis.corporateEquivalent}
                  </div>
                </div>
              </Card>
            )}

            {/* SECTION B: LINGUISTIC BRIDGE (Always Functional) */}
            <Card className="p-8 bg-[#1C1622]/60 border-white/5 space-y-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-teal-500">
                  <ArrowRightLeft size={16} />
                  <h3 className="text-white font-bold text-sm tracking-wide">Linguistic Bridge Generator</h3>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Paste a legacy bullet point to see its market value..."
                    className="bg-black/40 border-white/10 italic h-12"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                  />
                  <Button onClick={handleManualGenerate} className="bg-teal-600 hover:bg-teal-500 font-black px-8">
                    {isGenerating ? <Loader2 className="animate-spin" /> : "DECODE"}
                  </Button>
                </div>
              </div>

              {/* GENERATED RESULTS TABLE */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                {[
                  { title: 'Project Management', text: manualResult?.pm || (userAnalysis ? userAnalysis.variations?.pm : null) },
                  { title: 'Data Analysis', text: manualResult?.data || (userAnalysis ? userAnalysis.variations?.data : null) },
                  { title: 'Operations', text: manualResult?.ops || (userAnalysis ? userAnalysis.variations?.ops : null) }
                ].map((v, i) => (
                  <div key={i} className={`group p-5 bg-white/[0.02] rounded-2xl border border-white/5 transition-all hover:border-teal-500/30 flex justify-between items-center ${!v.text && 'opacity-20 italic'}`}>
                    <div className="space-y-1 pr-4">
                      <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter mb-1">{v.title}</p>
                      <p className="text-sm text-gray-400 italic">"{v.text || "Awaiting professional input..."}"</p>
                    </div>
                    {v.text && (
                      <button 
                        onClick={() => navigator.clipboard.writeText(v.text)}
                        className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-teal-400"
                      >
                        <ClipboardCheck size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {userAnalysis ? (
                <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3">
                  ESTABLISH A BEARING <ArrowRight size={20} />
                </Button>
              ) : (
                <div className="text-center pt-4 border-t border-white/5">
                  <p className="text-[10px] text-gray-600 italic uppercase tracking-[0.2em]">Anchor your resume in the hearth to unlock narrative alignment</p>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* STAGES 02 & 03 REMAIN AS IS */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <header className="text-center text-white italic">
              <h1 className="text-4xl font-bold">The Compass</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 02: Market Bearing</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/80 border-white/10 space-y-8">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest font-sans">Target Context</span>
                  <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-black tracking-widest">$100,290 Avg.</Badge>
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed">
                  "This bearing rewards your background in 
                  **{userAnalysis?.legacyDomain || "Strategic Strategy"}** re-positioned as **{userAnalysis?.corporateEquivalent || "Operations Strategy"}**."
                </p>
              </div>

              <Button onClick={handleAlign} disabled={isAligning} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl shadow-lg">
                {isAligning ? <Loader2 className="animate-spin" /> : <><Zap size={18} className="mr-2" /> ALIGN NARRATIVE</>}
              </Button>
            </Card>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic tracking-tight">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 03: Surveying Opportunities</p>
            </header>

            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white italic underline decoration-teal-500/50 underline-offset-8">Your Bearing is Fixed.</h2>
                <p className="text-gray-500 italic max-w-sm mx-auto text-sm leading-relaxed">
                  The crossing is complete. Your narrative is now aligned with the current market topography.
                </p>
              </div>
              <Button onClick={() => window.location.href='/canopy'} className="bg-teal-600 hover:bg-teal-500 text-white px-12 h-16 rounded-2xl font-black gap-3 shadow-lg">
                <Binoculars /> SURVEY THE LANDSCAPE
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}