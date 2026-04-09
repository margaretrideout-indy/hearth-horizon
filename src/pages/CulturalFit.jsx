import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ClipboardCheck, Lock, ArrowRightLeft, Search
} from 'lucide-react';

export default function CulturalFit({ userAnalysis, targetJob }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [manualResult, setManualResult] = useState(null);

  // Fallback data in case the resume hasn't been uploaded yet
  const displayIdentity = userAnalysis?.identityStatement || "Ready to decode your professional legacy.";
  const displayPM = userAnalysis?.variations?.pm || manualResult?.pm;
  const displayData = userAnalysis?.variations?.data || manualResult?.data;
  const displayOps = userAnalysis?.variations?.ops || manualResult?.ops;

  const handleManualGenerate = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    // This simulates the "magic" of the bridge for manual users
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
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'opacity-100 scale-105 text-teal-400' : 'opacity-30 text-white hover:opacity-50'}`}
          >
            <step.icon size={18} />
            <span className="text-[10px] font-black tracking-[0.2em]">{step.label}</span>
          </button>
        ))}
      </nav>

      <main className="min-h-[500px]">
        {/* STAGE 01: THE CLEARING (The Bridge) */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 01: Identity & Language</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/60 border-teal-500/20 backdrop-blur-xl space-y-10 shadow-2xl">
              <div className="space-y-4">
                <Badge className="bg-teal-500/10 text-teal-400 border-none uppercase text-[10px] tracking-widest px-3 py-1">Synthesis</Badge>
                <p className="text-2xl text-gray-100 italic leading-relaxed font-medium">"{displayIdentity}"</p>
              </div>

              {/* MANUAL INPUT (Only shows if no resume is uploaded) */}
              {!userAnalysis && !manualResult && (
                <div className="space-y-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manual Decoder</p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Paste a bullet point from your old job..."
                      className="bg-black/20 border-white/10 italic"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                    />
                    <Button onClick={handleManualGenerate} className="bg-teal-600 font-black">
                      {isGenerating ? <Loader2 className="animate-spin" /> : "DECODE"}
                    </Button>
                  </div>
                </div>
              )}

              {/* LINGUISTIC BRIDGE RESULTS */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 text-teal-500">
                  <ArrowRightLeft size={16} />
                  <h3 className="text-white font-bold text-sm">Linguistic Bridge Generator</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: 'Project Management', text: displayPM },
                    { title: 'Data Analysis', text: displayData },
                    { title: 'Operations', text: displayOps }
                  ].map((v, i) => (
                    <div key={i} className={`p-5 bg-white/[0.02] rounded-2xl border border-white/5 transition-all ${!v.text && 'opacity-20'}`}>
                      <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter mb-1">{v.title}</p>
                      <p className="text-sm text-gray-400 italic">"{v.text || "Awaiting professional input..."}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 shadow-lg">
                ESTABLISH A BEARING <ArrowRight size={20} />
              </Button>
            </Card>
          </div>
        )}

        {/* STAGE 02: THE COMPASS (Alignment) */}
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
                  "Analyzing the **Market Opportunity** landscape. This bearing rewards your deep background in 
                  **{userAnalysis?.legacyDomain || "Strategic Implementation"}** re-positioned as **{userAnalysis?.corporateEquivalent || "Operations Management"}**."
                </p>
              </div>

              <Button onClick={handleAlign} disabled={isAligning} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl shadow-lg">
                {isAligning ? <Loader2 className="animate-spin" /> : <><Zap size={18} className="mr-2" /> ALIGN NARRATIVE</>}
              </Button>
            </Card>
          </div>
        )}

        {/* STAGE 03: THE WILDS (Survey) */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 03: Surveying Opportunities</p>
            </header>

            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white italic underline decoration-teal-500/50 underline-offset-8">Your Bearing is Fixed.</h2>
                <p className="text-gray-500 italic max-w-sm mx-auto text-sm">
                  The crossing is complete. Your legacy is now translated into the modern market topography.
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