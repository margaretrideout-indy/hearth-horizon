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
    // Translating legacy experience into modern professional dialects
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
        
        {/* STAGE 01: THE CLEARING */}
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight uppercase">The Clearing</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Equipping the Traveler</p>
            </header>

            {/* CARD 1: THE LINGUISTIC BRIDGE (The Dialect Tool) */}
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
                  placeholder="Recall a moment from your journey (e.g. 'Coordinated team efforts')..."
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
                    {v.text && (
                      <button onClick={() => navigator.clipboard.writeText(v.text)} className="p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:text-teal-400">
                        <ClipboardCheck size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* CARD 2: THE NARRATIVE BEACON (The Traveler's Light) */}
            <Card className={`p-8 border-dashed backdrop-blur-xl transition-all duration-500 ${userAnalysis ? 'bg-teal-500/[0.03] border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.05)]' : 'bg-white/[0.02] border-white/10'}`}>
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
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight pt-1">Your overarching signal to the world; use this to tell your story</p>
                  </div>
                  
                  <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed">
                    "{userAnalysis.identityStatement}"
                  </h2>
                  
                  <div className="flex gap-6 pt-2 border-t border-white/5">
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-2">
                      <Map size={12} className="text-teal-500" /> Legacy Domain: <span className="text-gray-300 ml-1 font-black underline decoration-teal-500/30 underline-offset-4">{userAnalysis.legacyDomain}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-2">
                      <ArrowRight size={12} className="text-teal-500" /> Equivalent: <span className="text-gray-300 ml-1 font-black underline decoration-teal-500/30 underline-offset-4">{userAnalysis.corporateEquivalent}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/10">
                    <Lock className="text-gray-600" size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold italic tracking-wide">The Beacon is Dim</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto italic">Anchor your history in The Hearth to light your professional narrative.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href='/hearth'}
                    className="border-teal-500/30 text-teal-500 hover:bg-teal-500/10 font-black text-[10px] tracking-widest h-10 px-8 rounded-xl"
                  >
                    RETURN TO HEARTH
                  </Button>
                </div>
              )}
            </Card>

            {userAnalysis && (
              <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 shadow-[0_10px_40px_rgba(20,184,166,0.2)] transition-transform hover:scale-[1.01]">
                ESTABLISH A BEARING <ArrowRight size={20} />
              </Button>
            )}
          </div>
        )}

        {/* STAGES 02 & 03 MAINTAIN THE THEME */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 text-center">
             <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">The Compass</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 02: Narrative Alignment</p>
            </header>
            <Card className="p-8 bg-[#1C1622]/80 border-white/10 space-y-8 shadow-2xl">
              <div className="p-10 bg-black/40 rounded-2xl border border-white/5 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Market Topography</span>
                  <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 font-black tracking-widest italic">$100,290 Avg. Target</Badge>
                </div>
                <p className="text-gray-300 italic text-xl leading-relaxed max-w-2xl mx-auto">
                  "Mapping your expertise in **{userAnalysis?.legacyDomain}** against the high-value terrain of **{userAnalysis?.corporateEquivalent}**. This is your most viable path through the wild."
                </p>
              </div>
              <Button onClick={handleAlign} disabled={isAligning} className="w-full h-20 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl text-lg tracking-widest shadow-xl">
                {isAligning ? <Loader2 className="animate-spin mr-3" size={24} /> : <><Zap size={22} className="mr-3" /> ALIGN NARRATIVE</>}
              </Button>
            </Card>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">The Wilds</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em]">Stage 03: Surveying Opportunities</p>
            </header>
            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10 border-double border-4">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20 shadow-[0_0_60px_rgba(20,184,166,0.1)]">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white italic decoration-teal-500 underline underline-offset-[12px]">Your Bearing is Fixed.</h2>
                <p className="text-gray-500 italic max-w-sm mx-auto text-sm pt-4 leading-relaxed">Your professional crossing is complete. The new world is open to you.</p>
              </div>
              <Button onClick={() => window.location.href='/canopy'} className="bg-teal-600 hover:bg-teal-500 text-white px-16 h-20 rounded-2xl font-black gap-3 shadow-2xl text-lg hover:scale-105 transition-transform">
                <Binoculars size={24} /> SURVEY THE LANDSCAPE
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}