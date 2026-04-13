import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Mountain, Loader2, 
  Binoculars, ArrowRight, 
  Sparkles, TrendingUp,
  Copy, Check, AlertCircle, Pickaxe,
  Layers, Target, CheckCircle2, Microscope,
  Languages
} from 'lucide-react';

export default function CulturalFit({ vault, onSync, userTier = "Seedling" }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isAligning, setIsAligning] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

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

  const gapData = [
    { skill: "Industry-Standard Frameworks", status: "missing", effort: "2 weeks", category: "Knowledge", provisionId: "frameworks" },
    { skill: "Stakeholder Management", status: "aligned", effort: "sync'd", category: "Leadership" },
    { skill: "Domain-Specific Technicals", status: "missing", effort: "1 month", category: "Technical", provisionId: "tech-deep-dive" },
    { skill: "Cross-Functional Communication", status: "aligned", effort: "sync'd", category: "Soft Skills" },
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
    
    setTimeout(() => {
      const verbBuffer = manualInput
        .trim()
        .replace(/^(managed|developed|designed|coordinated|led|created|organized|overlooked|ran|built|orchestrated|transformed|standardized)\s+/i, "")
        .replace(/^\w/, (c) => c.toLowerCase());

      setBridgeData({
        pm: `Synthesized key deliverables for ${verbBuffer} while ensuring alignment with broader organizational milestones.`,
        data: `Derived quantitative insights from ${verbBuffer} to facilitate evidence-based decision making.`,
        ops: `Architected a repeatable protocol for ${verbBuffer} to minimize friction and maximize output.`
      });
      setIsGenerating(false);
    }, 1200);
  };

  const canNavigateTo = (step) => {
    if (step === 1) return true;
    if (step === 2) return bridgeData !== null;
    if (step === 3) return selectedPath !== null;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 md:px-6 space-y-8 md:space-y-12 animate-in fade-in duration-700 selection:bg-teal-500/30 overflow-x-hidden">
      
      <nav className="flex justify-center items-center bg-[#1C1622]/60 border border-white/5 rounded-2xl md:rounded-full px-4 md:px-12 py-3 md:py-4 backdrop-blur-xl sticky top-4 z-50 shadow-2xl gap-8 md:gap-16">
        {[
          { id: 1, label: "THE TRANSLATING", icon: Languages },
          { id: 2, label: "THE TOPOGRAPHY", icon: Compass },
          { id: 3, label: "THE HARVEST", icon: Pickaxe }
        ].map((step) => {
          const isAccessible = canNavigateTo(step.id);
          const isActive = activeStep === step.id;
          return (
            <button 
              key={step.id}
              disabled={!isAccessible}
              onClick={() => setActiveStep(step.id)}
              className={`relative flex flex-col md:flex-row items-center gap-1 md:gap-3 transition-all px-3 py-1 rounded-xl ${isActive ? 'text-teal-400' : isAccessible ? 'text-slate-500 hover:text-slate-300' : 'text-slate-800 cursor-not-allowed'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-teal-500/5 blur-md rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'bg-transparent'}`}>
                <step.icon size={16} />
              </div>
              <span className="text-[7px] md:text-[9px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase">{isActive || isAccessible ? step.label : ""}</span>
            </button>
          );
        })}
      </nav>

      <main className="min-h-[500px] md:min-h-[600px]">
        {activeStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="lg:col-span-4 space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 mx-auto lg:mx-0">
                <Microscope size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">Legacy<br/>Translation</h1>
              <p className="text-slate-500 text-[10px] md:text-[11px] leading-relaxed italic font-light max-w-sm mx-auto lg:mx-0">
                "Extract the raw value from your history and translate it into the operational dialect of your next domain."
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <Card className="p-5 md:p-8 bg-[#1C1622]/60 border-white/5 shadow-2xl relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
                   <Layers size={240} />
                </div>
                
                <div className="relative z-10 space-y-8 md:space-y-10">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60">Source Achievement</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder={universalPlaceholders[placeholderIdx]}
                        className="bg-black/40 border-white/5 text-white h-14 md:h-16 rounded-2xl italic px-6 focus:ring-1 focus:ring-teal-500/30 outline-none transition-all duration-500"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                      />
                      <Button 
                        onClick={handleDecode}
                        disabled={isGenerating || !manualInput}
                        className="h-14 md:h-16 bg-teal-600 hover:bg-teal-500 text-black px-10 font-black rounded-2xl transition-all shadow-lg shadow-teal-500/10 active:scale-95 shrink-0"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" /> : "TRANSLATE"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {['Project Lead', 'Data/Strategy', 'Operations'].map((dialect, i) => {
                      const key = dialect === 'Project Lead' ? 'pm' : dialect === 'Data/Strategy' ? 'data' : 'ops';
                      const text = bridgeData?.[key];
                      return (
                        <motion.div 
                          key={i} 
                          initial={false}
                          animate={{ 
                            opacity: text ? 1 : 0.4,
                            backgroundColor: text ? "rgba(20, 184, 166, 0.05)" : "rgba(255, 255, 255, 0.01)"
                          }}
                          className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-700 ${text ? 'border-teal-500/20 shadow-[0_0_20px_rgba(20, 184, 166, 0.05)]' : 'border-white/5'}`}
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black text-teal-500/60 uppercase tracking-widest">{dialect} Dialect</span>
                                {text && <Sparkles size={10} className="text-teal-400 animate-pulse" />}
                              </div>
                              <p className="text-sm text-slate-300 font-serif italic leading-relaxed">{text || "Waiting for input..."}</p>
                            </div>
                            {text && (
                              <Button variant="ghost" size="icon" onClick={() => handleCopy(text)} className="text-slate-500 hover:text-teal-400 shrink-0 hover:bg-teal-500/10 rounded-full">
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </Card>
              <Button 
                onClick={() => setActiveStep(2)} 
                disabled={!bridgeData}
                className="w-full h-16 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white font-black rounded-2xl gap-3 uppercase tracking-widest transition-all active:scale-[0.99]"
              >
                Map Market Topography <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <header className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">Market Topography</h2>
              <p className="text-slate-500 text-[10px] md:text-[11px] font-light italic uppercase tracking-widest px-4">Select a trajectory to begin the deep-scan</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {trajectories.map((path, idx) => {
                const isSelected = selectedPath?.domain === path.domain;
                const canSeeData = userTier !== "Seedling";
                return (
                  <Card 
                    key={idx} 
                    onClick={() => setSelectedPath(path)}
                    className={`group cursor-pointer p-6 md:p-8 bg-[#1C1622]/40 border-white/5 transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden
                      ${isSelected ? 'ring-1 ring-teal-500/50 shadow-[0_0_40px_rgba(20,184,166,0.1)] border-teal-500/40' : 'hover:border-white/10 hover:bg-[#1C1622]/60'}`}
                  >
                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                         <Badge className={`${isSelected ? 'bg-teal-500 text-black' : 'bg-teal-500/10 text-teal-400'} border-transparent text-[9px] font-black px-3 py-1`}>
                           {path.fit}% POTENTIAL MATCH
                         </Badge>
                         {canSeeData ? (
                            <TrendingUp size={16} className={path.velocity === 'High' ? 'text-teal-400 animate-pulse' : 'text-slate-700'} />
                         ) : (
                            <Target size={14} className="text-slate-800" />
                         )}
                      </div>
                      <div className="space-y-2">
                        <h4 className={`font-bold text-lg leading-tight transition-colors ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {path.domain}
                        </h4>
                        <p className="text-[10px] text-slate-500 italic leading-relaxed font-light">{path.desc}</p>
                      </div>
                      <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Est. Range</p>
                          <p className={`text-xl font-black italic transition-colors ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                            {canSeeData ? path.salary : "••••••••"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            <Button 
              onClick={() => setActiveStep(3)} 
              disabled={!selectedPath}
              className={`w-full h-20 font-black rounded-[1.5rem] md:rounded-[2rem] gap-4 uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 active:scale-[0.98]
                ${selectedPath 
                  ? 'bg-teal-600 hover:bg-teal-500 text-black shadow-teal-500/20' 
                  : 'bg-white/[0.01] text-slate-700 border border-white/5 cursor-not-allowed'}`}
            >
              {selectedPath ? `Identify Gaps for ${selectedPath.domain}` : "Select a Path"}
              <Pickaxe size={18} className={selectedPath ? 'animate-bounce' : ''} />
            </Button>
          </div>
        )}

        {activeStep === 3 && (
          <div className="animate-in slide-in-from-right-8 duration-700 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
              <div className="lg:col-span-4 space-y-6 md:space-y-8">
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 mx-auto lg:mx-0">
                      <Target size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">The Harvest</h2>
                    <p className="text-slate-500 text-xs italic">
                      Mapping the distance between current state and <span className="text-teal-400 font-bold">{selectedPath?.domain}</span>.
                    </p>
                  </div>

                  <Card className="p-6 md:p-8 bg-teal-500/5 border-teal-500/20 rounded-[2rem] relative overflow-hidden group">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-50"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <p className="text-[9px] font-black text-teal-500/60 uppercase tracking-[0.3em] mb-4 italic relative z-10">Analysis Depth</p>
                    <div className="flex items-end gap-3 mb-4 relative z-10">
                       <span className="text-5xl font-black italic text-white">82%</span>
                       <span className="text-[9px] text-slate-500 uppercase pb-2 font-bold tracking-widest italic">Ready</span>
                    </div>
                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "82%" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-0 left-0 h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                      />
                    </div>
                  </Card>
              </div>

              <div className="lg:col-span-8 space-y-4">
                  {gapData.map((item, i) => (
                    <Card key={i} className="p-5 md:p-6 bg-[#1C1622]/40 border-white/5 rounded-2xl hover:border-teal-500/20 transition-all group">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${item.status === 'aligned' ? 'bg-teal-500/5 text-teal-400 border-teal-500/10' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                             {item.status === 'aligned' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm text-white font-bold group-hover:text-teal-400 transition-colors">{item.skill}</h4>
                            <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{item.category}</span>
                              <div className="hidden md:block w-1 h-1 rounded-full bg-slate-800" />
                              <span className="text-[8px] font-bold text-teal-500/40 italic uppercase">{item.effort} Required</span>
                            </div>
                          </div>
                        </div>
                        
                        {item.status === 'missing' && (
                          <button onClick={() => navigate('/library')} className="text-[9px] font-black uppercase text-slate-500 hover:text-teal-400 transition-colors tracking-widest border-b border-transparent hover:border-teal-400/50 pb-1 w-fit">
                            Link Provision
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            {/* THE FINALIZED BLUEPRINT CARD */}
            <Card className="p-8 md:p-12 bg-white/[0.01] border border-teal-500/20 rounded-[2.5rem] md:rounded-[3rem] relative backdrop-blur-3xl overflow-hidden mt-12 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
               <div className="absolute top-0 right-0 p-8 opacity-10"><Sparkles size={60} className="text-teal-400" /></div>
               
               <div className="space-y-8 relative z-10 max-w-2xl mx-auto text-center">
                  <div className="space-y-2">
                    <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.5em] italic">Alignment Secured</p>
                    <h3 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight underline decoration-teal-500/30 underline-offset-8">Finalized Blueprint</h3>
                  </div>

                  <p className="text-slate-400 italic text-lg leading-relaxed font-light">
                    "The distance to <span className="text-white font-bold">{selectedPath?.domain}</span> has been charted. Your narrative is ready for the market."
                  </p>

                  <div className="bg-black/40 p-6 md:p-8 rounded-2xl border border-white/5 text-slate-300 italic font-serif leading-relaxed text-sm md:text-base shadow-inner">
                    {bridgeData?.[selectedPath?.domain === 'Operations & Systems' ? 'ops' : (selectedPath?.domain === 'Data/Strategy' ? 'data' : 'pm')]}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                    <Button 
                      onClick={() => handleCopy(bridgeData?.[selectedPath?.domain === 'Operations & Systems' ? 'ops' : (selectedPath?.domain === 'Data/Strategy' ? 'data' : 'pm')])}
                      className="h-16 px-10 bg-white/[0.03] hover:bg-white/[0.08] text-white font-black rounded-2xl uppercase tracking-widest border border-white/10 flex items-center gap-3 transition-all"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? "Copied" : "Copy to Resume"}
                    </Button>

                    <Button 
                      onClick={() => {
                        onSync({ isAligned: true });
                        navigate('/launch');
                      }} 
                      className="h-16 px-10 bg-teal-600 hover:bg-teal-500 text-black font-black rounded-2xl uppercase tracking-widest flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
                    >
                      Enter Launch Mode <Binoculars size={18} />
                    </Button>
                  </div>
               </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="text-center pt-8 md:pt-12">
        <div className="inline-flex items-center gap-3 bg-black/20 px-6 py-2 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,1)]" />
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">
            Synchronized with Hearth Horizon Ledger
          </p>
        </div>
      </footer>
    </div>
  );
}