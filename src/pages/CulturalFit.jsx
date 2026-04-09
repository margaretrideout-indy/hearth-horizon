import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ClipboardCheck, ArrowRightLeft, Sparkles, Lock, Map
} from 'lucide-react';

export default function CulturalFit({ userAnalysis, targetJob }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);

  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      setBridgeData({
        pm: `Managed lifecycle deliverables for "${manualInput}", ensuring cross-functional alignment and milestone adherence.`,
        data: `Translated core objectives of "${manualInput}" into measurable performance indicators and success metrics.`,
        ops: `Optimized resource workflows surrounding "${manualInput}" to maintain operational continuity and excellence.`
      });
      setIsGenerating(false);
    }, 1000);
  };

  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => {
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      {/* THE TREK TRACKER */}
      <nav className="flex justify-center items-center gap-8 md:gap-16 border-b border-white/5 pb-10">
        {[
          { id: 1, label: "01. THE CLEARING", icon: TreePine }, // Updated from DECODE
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
        
        {/* STAGE 01: THE CLEARING */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight uppercase">THE CLEARING</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Equipping the Traveler</p>
            </header>

            {/* CARD 1: THE LINGUISTIC BRIDGE */}
            <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-2xl space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-500">
                  <ArrowRightLeft size={18} />
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">The Linguistic Bridge</h3>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight italic">Translate your local achievements into the dialects of the new world</p>
              </div>

              <div className="flex gap-3">
                <Input 
                  placeholder="Recall a moment from your journey..."
                  className="bg-black/40 border-white/10 text-gray-200 h-14 italic"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
                <Button 
                  onClick={handleDecode}
                  className="h-14 bg-teal-600 hover:bg-teal-500 px-10 font-black tracking-widest text-xs"
                >
                  {isGenerating ? <Loader2 className="animate-spin" /> : "DECODE"}
                </Button>
              </div>

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
                        {v.text ? `"${v.text}"` : "Awaiting the translation of your experience..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* CARD 2: THE NARRATIVE BEACON */}
            <Card className={`p-8 border-dashed backdrop-blur-xl transition-all duration-500 ${userAnalysis ? 'bg-teal-500/[0.03] border-teal-500/30' : 'bg-white/[0.02] border-white/10'}`}>
              {userAnalysis ? (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-teal-500">
                        <Sparkles size={18} />
                        <h3 className="text-white font-black text-sm uppercase tracking-widest">The Narrative Beacon</h3>
                      </div>
                      <Badge className="bg-teal-500 text-black font-black text-[9px] tracking-widest px-2">HEARTH SYNTHESIS ACTIVE</Badge>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed">
                    "{userAnalysis.identityStatement}"
                  </h2>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4 text-gray-500 italic text-xs">
                  Anchor your history in The Hearth to light your Narrative Beacon.
                </div>
              )}
            </Card>

            {userAnalysis && (
              <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3">
                ESTABLISH A BEARING <ArrowRight size={20} />
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}