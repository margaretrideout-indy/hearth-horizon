import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ArrowRightLeft, Sparkles, TrendingUp,
  Copy, Check, ClipboardCheck
} from 'lucide-react';

export default function CulturalFit({ vault, onSync }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);
  const [copied, setCopied] = useState(false);

  const [beacon, setBeacon] = useState("");
  const [trajectories, setTrajectories] = useState([]);

  useEffect(() => {
    if (vault) {
      setBeacon(vault.resume?.summary || "A strategic professional bridging expertise across high-impact sectors.");
      
      const paths = vault.marketPaths || [
        { domain: "Strategic Operations", salary: "$95,000+", fit: "94%", desc: "Focus on cross-functional alignment and organizational scaling." },
        { domain: "Project Leadership", salary: "$102,000+", fit: "91%", desc: "Focus on lifecycle management and delivery optimization." },
        { domain: "Implementation Strategy", salary: "$98,000+", fit: "88%", desc: "Focus on translating complex goals into executable frameworks." }
      ];
      setTrajectories(paths);
    }
  }, [vault]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      setBridgeData({
        pm: `Orchestrated ${manualInput} by streamlining workflows and managing cross-functional delivery timelines.`,
        data: `Transformed ${manualInput} into actionable metrics to drive measurable performance improvements.`,
        ops: `Standardized the operational framework for ${manualInput} to maximize organizational efficiency.`
      });
      setIsGenerating(false);
    }, 1200);
  };

  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => {
      onSync({ isAligned: true });
      setIsAligning(false);
      setActiveStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      <nav className="flex justify-center items-center gap-8 md:gap-16 border-b border-white/5 pb-10">
        {[
          { id: 1, label: "01. THE CLEARING", icon: TreePine },
          { id: 2, label: "02. THE COMPASS", icon: Compass },
          { id: 3, label: "03. TREK REPORT", icon: ClipboardCheck }
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

      <main className="min-h-[600px] space-y-8">
        
        {activeStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-white italic tracking-tight uppercase">THE CLEARING</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Equipping the Traveler</p>
            </header>

            <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-2xl space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-500">
                  <ArrowRightLeft size={18} />
                  <h3 className="text-white font-black text-sm uppercase tracking-widest text-teal-400">The Linguistic Bridge</h3>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight italic">Translate your achievements into professional dialects</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end px-1 text-[10px] font-black uppercase tracking-[0.2em]">
                  <label className="text-teal-500">Your Local Dialect</label>
                  <span className="text-gray-600 italic">(The raw achievement)</span>
                </div>
                <div className="flex gap-3">
                  <Input 
                    placeholder="Describe a project or responsibility..."
                    className="bg-black/40 border-white/10 text-gray-200 h-14 italic"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                  />
                  <Button 
                    onClick={handleDecode}
                    disabled={isGenerating || !manualInput}
                    className="h-14 bg-teal-600 hover:bg-teal-500 px-10 font-black tracking-widest text-xs uppercase transition-all"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" /> : "CROSS THE BRIDGE"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: 'Project Management Dialect', text: bridgeData?.pm },
                  { title: 'Data Strategy Dialect', text: bridgeData?.data },
                  { title: 'Operations Dialect', text: bridgeData?.ops }
                ].map((v, i) => (
                  <div key={i} className={`group p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex justify-between items-center transition-all ${!v.text && 'opacity-20'}`}>
                    <div className="space-y-1 pr-4">
                      <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter mb-1">{v.title}</p>
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        {v.text ? `"${v.text}"` : "Waiting for input..."}
                      </p>
                    </div>
                    {v.text && (
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(v.text)} className="text-gray-500 hover:text-teal-400 shrink-0">
                        <Copy size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-dashed border-teal-500/30 bg-teal-500/[0.03] backdrop-blur-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center text-teal-500">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} />
                    <h3 className="text-white font-black text-sm uppercase tracking-widest">The Narrative Beacon</h3>
                  </div>
                  <Badge className="bg-teal-500 text-black font-black text-[9px] tracking-widest px-2 uppercase">Synthesis Active</Badge>
                </div>
                <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed">
                  "{beacon}"
                </h2>
              </div>
            </Card>

            <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 uppercase shadow-lg shadow-teal-900/20">
              ESTABLISH A BEARING <ArrowRight size={20} />
            </Button>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 text-center">
             <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">THE COMPASS</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Market Topography</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trajectories.map((path, idx) => (
                <Card key={idx} className={`p-6 bg-[#1C1622]/80 border-white/10 hover:border-teal-500/40 transition-all group ${idx === 0 ? 'ring-2 ring-teal-500/50' : ''}`}>
                  <div className="space-y-4 text-left">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-[9px] font-black uppercase">{path.fit} Match</Badge>
                      <TrendingUp size={16} className="text-teal-500 opacity-50" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Trajectory</p>
                      <h4 className="text-white font-bold text-lg leading-tight">{path.domain}</h4>
                    </div>
                    <div className="py-3 border-y border-white/5">
                      <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Target Compensation</p>
                      <p className="text-xl text-white font-black italic">{path.salary}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 italic leading-relaxed">{path.desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-black/40 border border-white/5">
                <p className="text-gray-400 italic text-sm leading-relaxed max-w-lg mx-auto">
                  "The Compass reveals multiple viable paths based on your unique skill translation. Select the bearing that aligns with your intended impact."
                </p>
            </Card>

            <Button onClick={handleAlign} disabled={isAligning} className="w-full h-20 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl text-lg uppercase tracking-widest shadow-xl">
              {isAligning ? <Loader2 className="animate-spin mr-3" size={24} /> : <><Zap size={22} className="mr-3" /> ALIGN NARRATIVE</>}
            </Button>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">TREK REPORT</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Crossing Complete</p>
            </header>

            <Card className="p-12 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10 border-double border-4 relative overflow-hidden text-center">
              <Mountain className="absolute -right-8 -bottom-8 w-48 h-48 text-teal-500/5 rotate-12" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-20 h-20 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20 shadow-[0_0_30px_rgba(20,184,166,0.05)]">
                  <ClipboardCheck className="w-10 h-10 text-teal-400" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white italic">Your Bearing is Fixed.</h2>
                  <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">Strategic Synthesis Finalized</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-4">
                  <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-2">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Primary Trajectory</p>
                    <p className="text-white font-bold italic">{trajectories[0]?.domain}</p>
                  </div>
                  <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-2">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Market Value</p>
                    <p className="text-white font-bold italic">{trajectories[0]?.salary}</p>
                  </div>
                  
                  <div className="p-6 bg-black/40 rounded-xl border border-teal-500/20 space-y-4 md:col-span-2 relative">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                       <p className="text-[9px] font-black text-teal-500 uppercase tracking-widest">Your Narrative Beacon</p>
                       <Button 
                         variant="ghost" 
                         size="sm" 
                         onClick={() => handleCopy(beacon)} 
                         className="h-7 text-[9px] font-black uppercase tracking-tighter text-teal-400/60 hover:text-teal-400"
                       >
                         {copied ? <><Check size={12} className="mr-1" /> COPIED</> : <><Copy size={12} className="mr-1" /> COPY TO CLIPBOARD</>}
                       </Button>
                    </div>
                    <p className="text-sm text-gray-300 italic leading-relaxed pt-2">
                      "{beacon}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 relative z-10">
                <Button onClick={() => window.location.href='/canopy'} className="bg-teal-600 hover:bg-teal-500 text-white px-16 h-20 rounded-2xl font-black gap-3 shadow-2xl text-lg uppercase tracking-widest transition-transform hover:scale-105">
                  <Binoculars size={24} /> ENTER THE CANOPY
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}