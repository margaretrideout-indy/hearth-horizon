import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Compass, Loader2, 
  Binoculars, ArrowRight, 
  TrendingUp,
  Copy, Check, AlertCircle, Pickaxe,
  Layers, Target, CheckCircle2, Microscope,
  Languages, ShieldCheck, Leaf, Home, Users, Flame,
  Lock
} from 'lucide-react';

const HearthIcon = ({ isSelected }) => (
  <motion.div
    animate={{ 
      scale: isSelected ? [1, 1.15, 1] : 1,
      opacity: isSelected ? [0.7, 1, 0.7] : 0.5
    }}
    transition={{ duration: 3, repeat: Infinity }}
    className={`p-4 rounded-2xl transition-colors ${isSelected ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-slate-500'}`}
  >
    <Flame size={24} className={isSelected ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" : ""} />
  </motion.div>
);

export default function CulturalFit({ vault, onSync, isAdmin }) {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [manualInput, setManualInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [bridgeData, setBridgeData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);
  const [ethicalPriorities, setEthicalPriorities] = useState(vault?.ethics || []);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  // --- TIER GATING ---
  const tiers = { 'traveler': 0, 'seedling': 1, 'hearthkeeper': 2, 'steward': 3 };
  const userRank = isAdmin ? 3 : (tiers[vault?.tier?.toLowerCase()] || 0);

  const universalPlaceholders = [
    "e.g., Managed a team of 15 in a fast-paced retail environment...",
    "e.g., Designed a sustainable irrigation system for a local farm...",
    "e.g., Coordinated logistical operations for a regional non-profit...",
    "e.g., Developed technical documentation for a proprietary software...",
    "e.g., Taught 30+ students in a high-pressure environment..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % universalPlaceholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ethicsOptions = [
    { id: 'eco', label: 'Eco-Conscious', desc: 'Prioritizes sustainability & green tech.', icon: Leaf },
    { id: 'remote', label: 'Remote-First', desc: 'Values async work and location freedom.', icon: Home },
    { id: 'equity', label: 'Equity-Driven', desc: 'Focuses on DEI and social impact.', icon: Users },
    { id: 'balance', label: 'The Quiet Hearth', desc: 'Strict boundaries on burnout & overwork.', icon: Flame },
  ];

  const toggleEthic = (id) => {
    setEthicalPriorities(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      const core = manualInput.trim().toLowerCase()
        .replace(/^(managed|led|taught|designed|created|organized|facilitated|coordinated|developed|ran)\s+/i, "");
      
      setBridgeData({
        pm: `Strategic orchestration of ${core}, focusing on milestone delivery, resource allocation, and cross-functional stakeholder alignment.`,
        data: `Quantitative and qualitative analysis of ${core} to derive data-driven insights and optimize future organizational outcomes.`,
        ops: `Architecting scalable systems for ${core} to minimize operational friction and maximize institutional efficiency.`,
        exec: `High-level visioning and governance of ${core} to drive enterprise value and long-term organizational sustainability.`,
        creative: `Narrative-driven reimagining of ${core}, blending aesthetic innovation with core functional objectives.`
      });
      setIsGenerating(false);
    }, 1400);
  };

  const gapData = [
    { skill: "Agile/Scrum Methodology", status: "missing", effort: "2 weeks", category: "Knowledge", url: "https://www.scrum.org/" },
    { skill: "Stakeholder Management", status: "aligned", effort: "sync'd", category: "Leadership", url: null },
    { skill: "SaaS CRM Tools", status: "missing", effort: "3 weeks", category: "Technical", url: "https://trailhead.salesforce.com/" },
    { skill: "Public Speaking & Training", status: "aligned", effort: "sync'd", category: "Soft Skills", url: null },
  ];

  const trajectories = [
    { domain: "Operations & Systems", salary: "$85k - $120k", fit: 94, velocity: "High", desc: "Optimizing workflows and scaling efficiency." },
    { domain: "Project & Delivery", salary: "$90k - $130k", fit: 91, velocity: "Stable", desc: "Lifecycle management and complex deadlines." },
    { domain: "Strategy & Implementation", salary: "$95k - $145k", fit: 88, velocity: "Emerging", desc: "Translating visions into actionable roadmaps." }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canNavigateTo = (step) => {
    if (step === 1) return true;
    if (step === 2) return bridgeData !== null;
    if (step === 3) return ethicalPriorities.length > 0;
    if (step === 4) return selectedPath !== null;
    return false;
  };

  return (
    <div className="relative min-h-screen selection:bg-teal-500/30 pb-20">
      
      {/* Sub-Nav Pill */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto bg-[#0D0B14]/80 backdrop-blur-3xl border border-white/10 rounded-full p-1.5 shadow-2xl flex items-center gap-1 md:gap-2">
          {[
            { id: 1, label: "TRANSLATING", icon: Languages },
            { id: 2, label: "VALUES", icon: ShieldCheck },
            { id: 3, label: "TOPOGRAPHY", icon: Compass },
            { id: 4, label: "HARVEST", icon: Pickaxe }
          ].map((step, idx, arr) => {
            const isAccessible = canNavigateTo(step.id);
            const isActive = activeStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <button 
                  disabled={!isAccessible}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-teal-500 text-black shadow-lg scale-105' : isAccessible ? 'text-zinc-400 hover:text-white' : 'opacity-20 cursor-not-allowed'
                  }`}
                >
                  <step.icon size={14} />
                  <span className={`hidden md:block text-[8px] font-black tracking-[0.2em] ${isActive ? 'text-black' : 'text-zinc-500'}`}>
                    {step.label}
                  </span>
                </button>
                {idx < arr.length - 1 && <div className="w-3 h-px bg-white/10" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 md:px-6 mt-20">
        
        <main className="relative z-10">
          {/* STEP 1: TRANSLATION */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="lg:col-span-4 space-y-4 text-center lg:text-left pt-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 mx-auto lg:mx-0">
                  <Microscope size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif italic text-white leading-tight">Legacy<br/>Translation</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed">Reframing institutional achievements for the open market.</p>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-6 md:p-8 bg-[#1C1622]/60 border-white/5 rounded-[2.5rem] relative overflow-hidden">
                  <div className="relative z-10 space-y-8">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60 ml-2">Source Achievement</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Input 
                          placeholder={universalPlaceholders[placeholderIdx]}
                          className="bg-black/40 border-white/5 text-white h-16 rounded-2xl italic px-6 focus:ring-1 focus:ring-teal-500/30 outline-none transition-all"
                          value={manualInput}
                          onChange={(e) => setManualInput(e.target.value)}
                        />
                        <Button onClick={handleDecode} disabled={isGenerating || !manualInput} className="h-16 bg-teal-600 hover:bg-teal-500 text-black px-10 font-black rounded-2xl transition-all shadow-lg active:scale-95 shrink-0">
                          {isGenerating ? <Loader2 className="animate-spin" /> : "TRANSLATE"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {['pm', 'data', 'ops', 'exec', 'creative'].map((key, i) => {
                        const labels = { pm: 'Project Management', data: 'Data & Strategy', ops: 'Operations', exec: 'Executive Leadership', creative: 'Creative Strategy' };
                        const text = bridgeData?.[key];
                        return (
                          <motion.div key={i} animate={{ opacity: text ? 1 : 0.4 }} className={`p-6 rounded-3xl border transition-all ${text ? 'bg-teal-500/5 border-teal-500/20' : 'border-white/5 bg-transparent'}`}>
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-2 flex-1">
                                <span className="text-[8px] font-black text-teal-500/60 uppercase tracking-widest">{labels[key]} Dialect</span>
                                <p className="text-sm text-slate-300 font-serif italic leading-relaxed">{text || "Waiting for your story..."}</p>
                              </div>
                              {text && (
                                <Button variant="ghost" size="icon" onClick={() => handleCopy(text)} className="text-slate-500 hover:text-teal-400">
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
                <Button onClick={() => setActiveStep(2)} disabled={!bridgeData} className="w-full h-16 bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white font-black rounded-2xl uppercase tracking-widest transition-all">
                  Define Values <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: VALUES */}
          {activeStep === 2 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000">
              <header className="text-center max-w-2xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mx-auto"><ShieldCheck size={24} /></div>
                <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">The Hearth Values</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Define your non-negotiables and human priorities</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {ethicsOptions.map((opt) => {
                  const isSelected = ethicalPriorities.includes(opt.id);
                  return (
                    <Card key={opt.id} onClick={() => toggleEthic(opt.id)} className={`p-8 rounded-[2.5rem] cursor-pointer transition-all duration-500 border-2 ${isSelected ? 'bg-teal-500/10 border-teal-500/40 shadow-xl' : 'bg-[#1C1622]/40 border-white/5 hover:border-white/10'}`}>
                      <div className="flex items-start gap-6 relative z-10">
                        {opt.id === 'balance' ? <HearthIcon isSelected={isSelected} /> : (
                          <div className={`p-4 rounded-2xl ${isSelected ? 'bg-teal-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                            <opt.icon size={24} />
                          </div>
                        )}
                        <div className="space-y-2">
                          <h4 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-300'}`}>{opt.label}</h4>
                          <p className="text-[11px] text-slate-500 italic leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Button onClick={() => { onSync({ ethics: ethicalPriorities }); setActiveStep(3); }} disabled={ethicalPriorities.length === 0} className="w-full max-w-4xl mx-auto h-20 bg-teal-600 hover:bg-teal-500 text-black font-black rounded-[2rem] gap-4 uppercase tracking-[0.2em] shadow-2xl flex">
                Establish Topography <ArrowRight size={18} />
              </Button>
            </div>
          )}

          {/* STEP 3: TOPOGRAPHY */}
          {activeStep === 3 && (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <header className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">Market Topography</h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Mapping your skills to current economic climates</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {trajectories.map((path, idx) => {
                  const isSelected = selectedPath?.domain === path.domain;
                  const canSeeData = userRank >= 3; // Steward Only
                  return (
                    <Card key={idx} onClick={() => setSelectedPath(path)} className={`group cursor-pointer p-8 bg-[#1C1622]/40 border-white/5 transition-all duration-500 rounded-[2.5rem] relative ${isSelected ? 'ring-1 ring-teal-500/50 shadow-2xl border-teal-500/40' : 'hover:border-white/10'}`}>
                      <div className="space-y-6 relative z-10">
                        <div className="flex justify-between items-start">
                           <Badge className={`${isSelected ? 'bg-teal-500 text-black' : 'bg-teal-500/10 text-teal-400'} border-transparent text-[9px] font-black px-3 py-1`}>{path.fit}% MATCH</Badge>
                           {canSeeData ? <TrendingUp size={16} className="text-teal-400" /> : <Lock size={14} className="text-slate-800" />}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg text-white leading-tight">{path.domain}</h4>
                          <p className="text-[10px] text-slate-500 italic leading-relaxed font-light">{path.desc}</p>
                        </div>
                        <div className="pt-6 border-t border-white/5">
                          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic mb-1">Est. Range</p>
                          <p className={`text-xl font-black italic ${canSeeData ? 'text-white' : 'text-slate-400 blur-[4px]'}`}>{canSeeData ? path.salary : "$100k - $150k"}</p>
                          {!canSeeData && <p className="text-[7px] text-teal-500/50 uppercase font-bold tracking-tighter mt-1">Requires Steward Tier</p>}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Button onClick={() => setActiveStep(4)} disabled={!selectedPath} className="w-full h-20 bg-teal-600 hover:bg-teal-500 text-black font-black rounded-[2rem] gap-4 uppercase tracking-[0.2em] shadow-2xl transition-all">
                {selectedPath ? `Identify Gaps for ${selectedPath.domain}` : "Select a Path"}
                <Pickaxe size={18} className={selectedPath ? 'animate-bounce ml-2' : 'ml-2'} />
              </Button>
            </div>
          )}

          {/* STEP 4: HARVEST */}
          {activeStep === 4 && (
            <div className="animate-in slide-in-from-right-8 duration-700 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-8">
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 mx-auto lg:mx-0"><Target size={24} /></div>
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">The Harvest</h2>
                  </div>
                  <Card className="p-8 bg-teal-500/5 border-teal-500/20 rounded-[2.5rem] relative overflow-hidden group">
                    <p className="text-[9px] font-black text-teal-500/60 uppercase tracking-[0.3em] mb-4 italic relative z-10">Alignment Secured</p>
                    <div className="flex items-end gap-3 mb-4 relative z-10">
                       <span className="text-5xl font-black italic text-white">82%</span>
                       <span className="text-[9px] text-slate-500 uppercase pb-2 font-bold tracking-widest italic">Ready</span>
                    </div>
                    <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "82%" }} transition={{ duration: 1.5 }} className="absolute h-full bg-teal-500" />
                    </div>
                  </Card>
                </div>
                <div className="lg:col-span-8 space-y-4">
                  {gapData.map((item, i) => (
                    <Card key={i} className="p-6 bg-[#1C1622]/40 border-white/5 rounded-2xl hover:border-teal-500/20 transition-all group">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.status === 'aligned' ? 'bg-teal-500/5 text-teal-400 border-teal-500/10' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                             {item.status === 'aligned' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                          </div>
                          <div>
                            <h4 className="text-sm text-white font-bold group-hover:text-teal-400 transition-colors">{item.skill}</h4>
                            <div className="flex gap-3 items-center">
                              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.category}</span>
                              <span className="text-[8px] font-bold text-teal-500/40 italic uppercase">{item.effort} Required</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card className="p-12 bg-[#0D0B14] border border-teal-500/20 rounded-[3rem] relative shadow-2xl text-center">
                  <div className="max-w-2xl mx-auto space-y-8">
                      <h3 className="text-3xl font-serif italic text-white tracking-tight">Finalized Blueprint</h3>
                      <div className="bg-black/40 p-8 rounded-3xl border border-white/5 text-slate-300 italic font-serif text-sm shadow-inner leading-relaxed">
                        {bridgeData?.[selectedPath?.domain === 'Operations & Systems' ? 'ops' : (selectedPath?.domain === 'Strategy & Implementation' ? 'data' : 'pm')]}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button variant="ghost" onClick={() => handleCopy(bridgeData?.[selectedPath?.domain === 'Operations & Systems' ? 'ops' : (selectedPath?.domain === 'Strategy & Implementation' ? 'data' : 'pm')])} className="h-16 px-10 text-white font-black rounded-2xl uppercase tracking-widest border border-white/10 gap-3">
                          {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? "Copied" : "Copy Translation"}
                        </Button>
                        <Button onClick={() => { onSync({ isAligned: true }); navigate('/launch'); }} className="h-16 px-10 bg-teal-600 hover:bg-teal-500 text-black font-black rounded-2xl uppercase tracking-widest gap-3 shadow-xl">
                          Enter Launch Mode <Binoculars size={18} />
                        </Button>
                      </div>
                  </div>
              </Card>
            </div>
          )}
        </main>

        <footer className="text-center pt-16 relative z-10 pb-8">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] italic">Synchronized with Hearth Horizon Ledger</p>
          </div>
        </footer>
      </div>
    </div>
  );
}