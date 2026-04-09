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

  // Function to handle manual jargon-to-value generation
  const handleManualGenerate = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setManualResult({
        pm: "Transformed legacy operational workflows into scalable project frameworks...",
        data: "Synthesized qualitative stakeholder feedback into actionable performance metrics...",
        ops: "Managed cross-functional resource allocation across high-pressure environments..."
      });
      setIsGenerating(false);
    }, 1500);
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
            disabled={!userAnalysis && step.id > 1}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'opacity-100 scale-105' : 'opacity-30'} ${(!userAnalysis && step.id > 1) ? 'cursor-not-allowed' : 'hover:opacity-50'}`}
          >
            <step.icon size={18} className={activeStep === step.id ? 'text-teal-400' : 'text-white'} />
            <span className={`text-[10px] font-black tracking-[0.2em] ${activeStep === step.id ? 'text-teal-400' : 'text-white'}`}>
              {step.label}
            </span>
          </button>
        ))}
      </nav>

      <main className="min-h-[500px]">
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Stage 01: Decoded Identity</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/60 border-teal-500/20 backdrop-blur-xl space-y-10 shadow-2xl">
              
              {/* IF USER HAS UPLOADED: Show Analysis */}
              {userAnalysis ? (
                <div className="space-y-4">
                  <Badge className="bg-teal-500/10 text-teal-400 border-none uppercase text-[10px] tracking-widest px-3 py-1">Identity Synthesis</Badge>
                  <p className="text-2xl text-gray-100 italic leading-relaxed font-medium">"{userAnalysis.identityStatement}"</p>
                </div>
              ) : (
                /* IF USER HAS NOT UPLOADED: Show "Manual Mode" */
                <div className="space-y-6">
                  <div className="p-6 bg-teal-500/5 border border-teal-500/20 rounded-2xl text-center space-y-2">
                    <h3 className="font-bold text-white">Manual Decoder Mode</h3>
                    <p className="text-xs text-gray-500 italic">No resume found. Paste a bullet point below to see its market value.</p>
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="e.g. Managed a classroom of 30 students..." 
                      className="bg-white/5 border-white/10 h-14 rounded-xl italic"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                    />
                    <Button onClick={handleManualGenerate} className="h-14 bg-teal-600 px-6 rounded-xl font-black">
                      {isGenerating ? <Loader2 className="animate-spin" /> : <Search />}
                    </Button>
                  </div>
                </div>
              )}

              {/* SHARED JARGON-TO-VALUE DISPLAY */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft size={16} className="text-teal-500" />
                  <h3 className="text-white font-bold text-sm tracking-wide">Linguistic Bridge Generator</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { type: 'Project Management', val: userAnalysis?.variations?.pm || manualResult?.pm },
                    { type: 'Data Analysis', val: userAnalysis?.variations?.data || manualResult?.data },
                    { type: 'Operations', val: userAnalysis?.variations?.ops || manualResult?.ops }
                  ].map((v, i) => (
                    <div key={i} className={`group p-5 bg-white/[0.02] rounded-2xl border border-white/5 flex justify-between items-center transition-all ${!v.val && 'opacity-20 italic'}`}>
                      <div className="space-y-1">
                        <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter">{v.type}</p>
                        <p className="text-sm text-gray-400 leading-relaxed italic">
                          "{v.val || "Awaiting input..."}"
                        </p>
                      </div>
                      {v.val && (
                        <button onClick={() => navigator.clipboard.writeText(v.val)} className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-teal-400">
                          <ClipboardCheck size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Only show Proceed button if userAnalysis is present */}
              {userAnalysis && (
                <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3">
                  ESTABLISH A BEARING <ArrowRight size={20} />
                </Button>
              )}
            </Card>
          </div>
        )}

        {/* ... (Stages 2 and 3 remain the same) ... */}
      </main>
    </div>
  );
}