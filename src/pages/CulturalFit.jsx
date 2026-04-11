import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from "@/components/ui/progress";
import { 
  Compass, Mountain, Loader2, 
  Binoculars, TreePine, ArrowRight, 
  Zap, ArrowRightLeft, Sparkles, TrendingUp,
  Copy, Check, ClipboardCheck, AlertCircle, Pickaxe,
  Layers, Target, CheckCircle2, History, Microscope,
  Briefcase
} from 'lucide-react';

export default function CulturalFit({ vault, onSync }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

  // UNIVERSAL PLACEHOLDERS: These rotate to show the app is for everyone
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const universalPlaceholders = [
    "e.g., Managed a team of 15 in a fast-paced retail environment...",
    "e.g., Designed a sustainable irrigation system for a local farm...",
    "e.g., Coordinated logistical operations for a regional non-profit...",
    "e.g., Developed technical documentation for a proprietary software..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % universalPlaceholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // DYNAMIC GAP DATA: In a real app, this would be calculated. 
  // For now, it represents universal business gaps.
  const gapData = [
    { skill: "Industry-Standard Frameworks", status: "missing", impact: "high", effort: "2 weeks", category: "Knowledge" },
    { skill: "Stakeholder Management", status: "aligned", impact: "critical", effort: "sync'd", category: "Leadership" },
    { skill: "Domain-Specific Technicals", status: "missing", impact: "medium", effort: "1 month", category: "Technical" },
    { skill: "Cross-Functional Communication", status: "aligned", impact: "high", effort: "sync'd", category: "Soft Skills" },
  ];

  const trajectories = [
    { domain: "Operations & Systems", salary: "$85k - $120k", fit: 94, velocity: "High", desc: "For those who enjoy optimizing workflows and scaling organizational efficiency." },
    { domain: "Project & Delivery", salary: "$90k - $130k", fit: 91, velocity: "Stable", desc: "For those who excel at lifecycle management and meeting complex deadlines." },
    { domain: "Strategy & Implementation", salary: "$95k - $145k", fit: 88, velocity: "Emerging", desc: "For those who translate high-level visions into actionable roadmaps." }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    // UNIVERSAL DECODER: Uses "The Input" as the core variable
    setTimeout(() => {
      setBridgeData({
        pm: `Synthesized key deliverables for ${manualInput} while ensuring alignment with broader organizational milestones.`,
        data: `Derived quantitative insights from ${manualInput} to facilitate evidence-based decision making.`,
        ops: `Architected a repeatable protocol for ${manualInput} to minimize friction and maximize output.`
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700 selection:bg-teal-500/30">
      
      {/* NAVIGATION - Universal */}
      <nav className="flex justify-between items-center bg-[#1A1423]/60 border border-white/5 rounded-full px-8 py-4 backdrop-blur-xl sticky top-4 z-50">
        {[
          { id: 1, label: "THE DECODING", icon: ArrowRightLeft },
          { id: 2, label: "THE TOPOGRAPHY", icon: Compass },
          { id: 3, label: "THE HARVEST", icon: Pickaxe },
          { id: 4, label: "THE SUMMIT", icon: Mountain }
        ].map((step) => (
          <button 
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`flex items-center gap-3 transition-all ${activeStep === step.id ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <div className={`p-2 rounded-lg ${activeStep === step.id ? 'bg-teal-500/20' : 'bg-transparent'}`}>
              <step.icon size={16} />
            </div>
            <span className="text-[9px] font-black tracking-[0.3em] hidden lg:block uppercase">{step.label}</span>
          </button>
        ))}
      </nav>

      <main className="min-h-[600px]">
        {activeStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                <Microscope size={24} />
              </div>
              <h1 className="text-4xl font-serif italic text-white leading-tight">Linguistic<br/>Transcoding</h1>
              <p className="text-slate-500 text-[11px] leading-relaxed italic font-light">
                "Regardless of your origin, extract the raw value from your history and translate it into the operational dialect of your next domain."
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <Card className="p-8 bg-[#1A1423]/60 border-white/5 shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                <div className="relative z-10 space-y-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60">Source Achievement</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder={universalPlaceholders[placeholderIdx]}
                        className="bg-black/40 border-white/5 text-white h-16 rounded-2xl italic px-6 focus:ring-1 focus:ring-teal-500/30 outline-none transition-all duration-500"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                      />
                      <Button 
                        onClick={handleDecode}
                        disabled={isGenerating || !manualInput}
                        className="h-16 bg-teal-600 hover:bg-teal-500 text-black px-10 font-black rounded-2xl transition-all"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" /> : "TRANSCODE"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {['Project Lead', 'Data/Strategy', 'Operations'].map((dialect, i) => {
                      const key = dialect === 'Project Lead' ? 'pm' : dialect === 'Data/Strategy' ? 'data' : 'ops';
                      const text = bridgeData?.[key];
                      return (
                        <div key={i} className={`p-6 rounded-[2rem] border transition-all duration-700 ${text ? 'bg-teal-500/5 border-teal-500/20' : 'bg-white/[0.01] border-white/5 opacity-40'}`}>
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2">
                              <span className="text-[8px] font-black text-teal-500/60 uppercase tracking-widest">{dialect} Dialect</span>
                              <p className="text-sm text-slate-300 font-serif italic leading-relaxed">
                                {text || "Establish any source experience to transcode..."}
                              </p>
                            </div>
                            {text && (
                              <Button variant="ghost" size="icon" onClick={() => handleCopy(text)} className="text-slate-500 hover:text-teal-400">
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
              <Button onClick={() => setActiveStep(2)} className="w-full h-16 bg-white/[0.02] border border-white/10 text-slate-400 font-black rounded-2xl gap-3 uppercase tracking-widest">
                Map Market Topography <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: TOPOGRAPHY - Universalized */}
        {activeStep === 2 && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <header className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-4xl font-serif italic text-white tracking-tight">Market Topography</h2>
              <p className="text-slate-500 text-[11px] font-light italic uppercase tracking-widest">Mapping paths for any professional background</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trajectories.map((path, idx) => (
                <Card 
                  key={idx} 
                  onClick={() => setSelectedPath(path)}
                  className={`group cursor-pointer p-8 bg-[#1A1423]/40 border-white/5 transition-all duration-500 rounded-[2.5rem]
                    ${selectedPath?.domain === path.domain ? 'ring-1 ring-teal-500/50 border-teal-500/40' : 'hover:border-white/10'}`}
                >
                  <div className="space-y-6">
                    <Badge className="bg-teal-500/10 text-teal-400 border-transparent text-[9px] font-black px-3 py-1">
                      {path.fit}% POTENTIAL MATCH
                    </Badge>
                    <div className="space-y-2">
                      <h4 className="font-bold text-lg text-white">{path.domain}</h4>
                      <p className="text-[10px] text-slate-500 italic leading-relaxed">{path.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setActiveStep(3)} 
              disabled={!selectedPath}
              className={`w-full h-20 font-black rounded-[2rem] gap-4 uppercase tracking-[0.2em] transition-all
                ${selectedPath ? 'bg-teal-600 text-black' : 'bg-white/[0.01] text-slate-700'}`}
            >
              {selectedPath ? `Analyze Gaps for ${selectedPath.domain}` : "Select a Path"}
              <Pickaxe size={18} />
            </Button>
          </div>
        )}

        {/* STEP 3: THE HARVEST - Logic Link */}
        {activeStep === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
               <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20">
                    <Target size={24} />
                  </div>
                  <h2 className="text-4xl font-serif italic text-white tracking-tight">The Harvest</h2>
                  <p className="text-slate-500 text-xs italic">
                    Universal gap analysis for <span className="text-teal-400 font-bold">{selectedPath?.domain}</span>.
                  </p>
               </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
               {gapData.map((item, i) => (
                  <Card key={i} className="p-6 bg-[#1A1423]/40 border-white/5 rounded-2xl group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.status === 'aligned' ? 'bg-teal-500/5 text-teal-400' : 'bg-orange-500/5 text-orange-400'}`}>
                           {item.status === 'aligned' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm text-white font-bold">{item.skill}</h4>
                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                      
                      {item.status === 'missing' && (
                        <button 
                          onClick={() => navigate('/library', { state: { scrollToSkill: item.skill } })} 
                          className="text-[9px] font-black uppercase text-slate-500 hover:text-teal-400 transition-colors tracking-widest border-b border-transparent hover:border-teal-400/50"
                        >
                          Link Provision
                        </button>
                      )}
                    </div>
                  </Card>
               ))}
               
               <Button onClick={() => setActiveStep(4)} className="w-full h-20 bg-teal-600 hover:bg-teal-500 text-black font-black rounded-[2rem] gap-4 uppercase mt-8">
                  <Sparkles size={24} /> Finalize The Blueprint
               </Button>
            </div>
          </div>
        )}

        {/* STEP 4: SUMMIT - Final */}
        {activeStep === 4 && (
          <div className="max-w-3xl mx-auto text-center space-y-10 py-20">
            <Mountain size={40} className="text-teal-400 mx-auto" />
            <h1 className="text-5xl font-serif italic text-white uppercase">The Summit</h1>
            <Card className="p-12 bg-white/[0.01] border border-white/5 rounded-[3rem]">
              <p className="text-slate-400 italic text-xl">"The distance to your new domain has been charted."</p>
              <Button onClick={() => navigate('/canopy')} className="mt-8 h-16 px-12 bg-teal-600 text-black font-black rounded-2xl uppercase">
                Enter The Canopy
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}