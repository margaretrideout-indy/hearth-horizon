import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ArrowRightLeft, Sparkles, TrendingUp
} from 'lucide-react';

export default function CulturalFit({ userAnalysis }) {
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
        pm: `Lead strategic delivery for "${manualInput}", aligning resources with provincial standards.`,
        data: `Derived success metrics from "${manualInput}" to optimize curriculum performance.`,
        ops: `Managed operational logistics for "${manualInput}" across multi-faceted environments.`
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

  const marketTrajectories = [
    { domain: "L&D Strategy", salary: "$100,290", fit: "98%", desc: "Focus on curriculum scaling and educational operations." },
    { domain: "Project Management", salary: "$95,500", fit: "92%", desc: "Focus on lifecycle deliverables and cross-functional alignment." },
    { domain: "Data Operations", salary: "$108,000", fit: "85%", desc: "Focus on measurable performance indicators and success metrics." }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      {/* TREK NAVIGATION */}
      <nav className="flex justify-center items-center gap-8 md:gap-16 border-b border-white/5 pb-10">
        {[
          { id: 1, label: "01. THE CLEARING", icon: TreePine },
          { id: 2, label: "02. THE COMPASS", icon: Compass },
          { id: 3, label: "03. THE WILDS", icon: Mountain }
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

            <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-2xl space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-teal-500">
                  <ArrowRightLeft size={18} />
                  <h3 className="text-white font-black text-sm uppercase tracking-widest text-teal-400">The Linguistic Bridge</h3>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight italic">Translate your achievements into professional dialects</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] font-black text-teal-500 uppercase tracking-[0.2em]">Your Local Dialect</label>
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest italic">(What you did in your previous role)</span>
                </div>
                <div className="flex gap-3">
                  <Input 
                    placeholder="e.g., 'I managed the classroom budget'..."
                    className="bg-black/40 border-white/10 text-gray-200 h-14 italic focus:border-teal-500/50 transition-colors"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                  />
                  <Button 
                    onClick={handleDecode}
                    disabled={isGenerating || !manualInput}
                    className="h-14 bg-teal-600 hover:bg-teal-500 px-10 font-black tracking-widest text-xs uppercase transition-all active:scale-95 shadow-lg shadow-teal-900/20"
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
                  <div key={i} className={`group p-6 bg-white/[0.02] rounded-2xl border border-white/5 flex justify-between items-center transition-all hover:border-teal-400/20 ${!v.text && 'opacity-20'}`}>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-teal-500 uppercase tracking-tighter mb-1">{v.title}</p>
                      <p className="text-sm text-gray-400 italic leading-relaxed">
                        {v.text ? `"${v.text}"` : "Waiting for you to input your experience..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-dashed border-teal-500/30 bg-teal-500/[0.03] backdrop-blur-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-teal-500">
                    <Sparkles size={18} />
                    <h3 className="text-white font-black text-sm uppercase tracking-widest">The Narrative Beacon</h3>
                  </div>
                  <Badge className="bg-teal-500 text-black font-black text-[9px] tracking-widest px-2 uppercase">Hearth Synthesis Active</Badge>
                </div>
                <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed">
                  "A strategic architect of human capital with <span className="text-teal-400 font-bold">13 years</span> of expertise in <span className="text-teal-400 font-bold">curriculum scaling</span> and <span className="text-teal-400 font-bold">educational operations</span>."
                </h2>
              </div>
            </Card>

            <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl gap-3 uppercase shadow-lg shadow-teal-900/20 transition-transform hover:scale-[1.01]">
              ESTABLISH A BEARING <ArrowRight size={20} />
            </Button>
          </div>
        )}

        {/* STAGE 02: THE COMPASS */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 text-center">
             <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">THE COMPASS</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Market Topography</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketTrajectories.map((path, idx) => (
                <Card key={idx} className={`p-6 bg-[#1C1622]/80 border-white/10 hover:border-teal-500/40 transition-all cursor-pointer group ${idx === 0 ? 'ring-2 ring-teal-500/50' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-[9px] font-black">{path.fit} MATCH</Badge>
                      <TrendingUp size={16} className="text-teal-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Trajectory</p>
                      <h4 className="text-white font-bold text-lg leading-tight">{path.domain}</h4>
                    </div>
                    <div className="text-left py-3 border-y border-white/5">
                      <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Avg. Target</p>
                      <p className="text-xl text-white font-black italic">{path.salary}</p>
                    </div>
                    <p className="text-[11px] text-gray-400 italic text-left leading-relaxed">
                      {path.desc}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-black/40 border border-white/5">
                <p className="text-gray-400 italic text-sm leading-relaxed max-w-lg mx-auto">
                  "The Compass reveals multiple viable paths through the Canadian landscape. While <span className="text-teal-400 font-bold">Human Capital & L&D</span> is your strongest bearing, your expertise in <span className="text-teal-400 font-bold">Operations</span> and <span className="text-teal-400 font-bold">Project Management</span> remains highly valuable."
                </p>
            </Card>

            <Button onClick={handleAlign} disabled={isAligning} className="w-full h-20 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl text-lg uppercase tracking-widest transition-all shadow-xl">
              {isAligning ? <Loader2 className="animate-spin mr-3" size={24} /> : <><Zap size={22} className="mr-3" /> ALIGN NARRATIVE</>}
            </Button>
          </div>
        )}

        {/* STAGE 03: THE WILDS */}
        {activeStep === 3 && (
          <div className="animate-in zoom-in-95 duration-700 text-center space-y-8">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold text-white italic uppercase tracking-tight">THE WILDS</h1>
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Crossing Complete</p>
            </header>
            <Card className="p-16 bg-[#1C1622]/90 border-teal-500/20 shadow-2xl space-y-10 border-double border-4">
              <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto border border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.1)]">
                <Mountain className="w-12 h-12 text-teal-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white italic underline underline-offset-[12px] decoration-teal-500">Your Bearing is Fixed.</h2>
                <p className="text-gray-500 italic max-w-sm mx-auto text-sm pt-4 leading-relaxed">
                  You have successfully traversed the Horizon. Your narrative is ready for the Canadian market.
                </p>
              </div>
              <Button onClick={() => window.location.href='/canopy'} className="bg-teal-600 hover:bg-teal-500 text-white px-16 h-20 rounded-2xl font-black gap-3 shadow-2xl text-lg uppercase tracking-widest transition-transform hover:scale-105">
                <Binoculars size={24} /> ENTER THE CANOPY
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}