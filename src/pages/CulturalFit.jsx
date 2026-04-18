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

  const tiers = { 'traveler': 0, 'seedling': 1, 'hearthkeeper': 2, 'steward': 3 };
  const userRank = (isAdmin || vault?.tier?.toLowerCase() === 'steward') ? 3 : (tiers[vault?.tier?.toLowerCase()] || 0);

  const universalPlaceholders = [
    "e.g., Managed a team of 15...",
    "e.g., Designed a sustainable system...",
    "e.g., Coordinated logistical operations...",
    "e.g., Developed technical documentation...",
    "e.g., Taught 30+ students..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % universalPlaceholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ethicsOptions = [
    { id: 'eco', label: 'Eco-Conscious', desc: 'Prioritizes sustainability & green tech.', icon: Leaf },
    { id: 'remote', label: 'Remote-First', desc: 'Values async work and freedom.', icon: Home },
    { id: 'equity', label: 'Equity-Driven', desc: 'Focuses on DEI and social impact.', icon: Users },
    { id: 'balance', label: 'The Quiet Hearth', desc: 'Strict boundaries on burnout.', icon: Flame },
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
        pm: `Strategic orchestration of ${core}, focusing on milestone delivery and stakeholder alignment.`,
        data: `Quantitative analysis of ${core} to derive data-driven insights.`,
        ops: `Architecting scalable systems for ${core} to maximize efficiency.`,
        exec: `High-level visioning and governance of ${core} to drive enterprise value.`,
        creative: `Narrative-driven reimagining of ${core}, blending aesthetic innovation.`
      });
      setIsGenerating(false);
    }, 1400);
  };

  const gapData = [
    { skill: "Agile/Scrum Methodology", status: "missing", effort: "2 weeks", category: "Knowledge", url: "https://www.scrum.org/" },
    { skill: "Stakeholder Management", status: "aligned", effort: "sync'd", category: "Leadership", url: null },
    { skill: "SaaS CRM Tools", status: "missing", effort: "3 weeks", category: "Technical", url: "https://trailhead.salesforce.com/" },
  ];

  const trajectories = [
    { domain: "Operations & Systems", salary: "$85k - $120k", fit: 94, velocity: "High", desc: "Optimizing workflows.", key: 'ops' },
    { domain: "Project & Delivery", salary: "$90k - $130k", fit: 91, velocity: "Stable", desc: "Lifecycle management.", key: 'pm' },
    { domain: "Strategy & Implementation", salary: "$95k - $145k", fit: 88, velocity: "Emerging", desc: "Translating visions.", key: 'data' }
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
    <div className="relative min-h-screen selection:bg-teal-500/30">
      
      {/* NATIVE STEP NAVIGATION: Enlarged for Accessibility */}
      <div className="w-full pt-12 pb-12 flex justify-center sticky top-0 z-[60]">
        <div className="bg-[#0D0B14]/90 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center gap-1 md:gap-3">
          {[
            { id: 1, label: "TRANSLATE", icon: Languages },
            { id: 2, label: "VALUES", icon: ShieldCheck },
            { id: 3, label: "MAP", icon: Compass },
            { id: 4, label: "HARVEST", icon: Pickaxe }
          ].map((step, idx, arr) => {
            const isAccessible = canNavigateTo(step.id);
            const isActive = activeStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <button 
                  disabled={!isAccessible}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-teal-500 text-black shadow-lg scale-105' : isAccessible ? 'text-zinc-400 hover:text-white' : 'opacity-20 cursor-not-allowed'
                  }`}
                >
                  <step.icon size={18} />
                  <span className={`hidden md:block text-xs font-black tracking-widest ${isActive ? 'text-black' : 'text-zinc-500'}`}>
                    {step.label}
                  </span>
                </button>
                {idx < arr.length - 1 && <div className="w-2 h-px bg-white/10" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <main className="relative z-10 pb-32">
          {activeStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-8 duration-700">
              <div className="lg:col-span-4 space-y-4 pt-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                  <Microscope size={28} />
                </div>
                <h1 className="text-4xl font-serif italic text-white leading-tight">Legacy<br/>Translation</h1>
                <p className="text-xs text-slate-500 uppercase tracking-widest leading-relaxed">Reframing achievements for the open market.</p>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <Card className="p-8 bg-[#1C1622]/60 border-white/5 shadow-2xl rounded-[2.5rem]">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[11px] font-black uppercase tracking-[0.4em] text-teal-500/60 ml-2">Source Achievement</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Input 
                          placeholder={universalPlaceholders[placeholderIdx]}
                          className="bg-black/40 border-white/5 text-white h-16 rounded-2xl italic px-6 text-base focus:ring-2 focus:ring-teal-500/30"
                          value={manualInput}
                          onChange={(e) => setManualInput(e.target.value)}
                        />
                        <Button onClick={handleDecode} disabled={isGenerating || !manualInput} className="h-16 bg-teal-600 hover:bg-teal-500 text-black px-10 font-black rounded-2xl shadow-lg active:scale-95 shrink-0">
                          {isGenerating ? <Loader2 className="animate-spin" /> : "TRANSLATE"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {['pm', 'data', 'ops'].map((key, i) => {
                        const labels = { pm: 'Project Management', data: 'Data & Strategy', ops: 'Operations' };
                        const text = bridgeData?.[key];
                        return (
                          <motion.div key={i} animate={{ opacity: text ? 1 : 0.4 }} className={`p-6 rounded-3xl border transition-all duration-700 ${text ? 'bg-teal-500/5 border-teal-500/20' : 'border-white/5 bg-transparent'}`}>
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-2 flex-1">
                                <span className="text-[11px] font-black text-teal-500/60 uppercase tracking-widest">{labels[key]} Dialect</span>
                                <p className="text-base text-slate-300 font-serif italic leading-relaxed">{text || "Waiting for your story..."}</p>
                              </div>
                              {text && (
                                <Button variant="ghost" size="icon" onClick={() => handleCopy(text)} className="text-slate-500 hover:text-teal-400">
                                  {copied ? <Check size={20} /> : <Copy size={20} />}
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
                <Button onClick={() => setActiveStep(2)} disabled={!bridgeData} className="w-full h-20 bg-white/[0.02] border border-white/10 text-slate-400 font-black rounded-2xl uppercase tracking-widest">
                  Define Values <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <header className="text-center max-w-2xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mx-auto"><ShieldCheck size={28} /></div>
                <h2 className="text-4xl font-serif italic text-white tracking-tight">The Hearth Values</h2>
                <p className="text-xs text-slate-500 uppercase tracking-[0.3em]">Define your non-negotiables</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {ethicsOptions.map((opt) => {
                  const isSelected = ethicalPriorities.includes(opt.id);
                  return (
                    <Card key={opt.id} onClick={() => toggleEthic(opt.id)} className={`p-10 rounded-[3rem] cursor-pointer transition-all duration-500 border-2 ${isSelected ? 'bg-teal-500/10 border-teal-500/40' : 'bg-[#1C1622]/40 border-white/5'}`}>
                      <div className="flex items-start gap-6">
                        {opt.id === 'balance' ? <HearthIcon isSelected={isSelected} /> : (
                          <div className={`p-4 rounded-2xl ${isSelected ? 'bg-teal-500 text-black' : 'bg-white/5 text-slate-500'}`}>
                            <opt.icon size={28} />
                          </div>
                        )}
                        <div className="space-y-2">
                          <h4 className={`font-bold text-xl ${isSelected ? 'text-white' : 'text-slate-300'}`}>{opt.label}</h4>
                          <p className="text-xs text-slate-500 italic leading-relaxed">{opt.desc}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Button onClick={() => { onSync({ ethics: ethicalPriorities }); setActiveStep(3); }} disabled={ethicalPriorities.length === 0} className="w-full max-w-4xl mx-auto h-24 bg-teal-600 text-black font-black rounded-[2.5rem] gap-4 uppercase tracking-[0.2em] shadow-2xl">
                Establish Topography <ArrowRight size={20} />
              </Button>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <header className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-4xl font-serif italic text-white tracking-tight">Market Topography</h2>
                <p className="text-xs text-slate-500 uppercase tracking-[0.3em]">Mapping your skills</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trajectories.map((path, idx) => {
                  const isSelected = selectedPath?.domain === path.domain;
                  const canSeeData = userRank >= 3; 
                  return (
                    <Card key={idx} onClick={() => setSelectedPath(path)} className={`group cursor-pointer p-8 bg-[#1C1622]/40 border-white/5 transition-all rounded-[3rem] ${isSelected ? 'ring-2 ring-teal-500 shadow-2xl border-teal-500' : 'hover:bg-[#1C1622]/60'}`}>
                      <div className="space-y-6">
                        <Badge className={`${isSelected ? 'bg-teal-500 text-black' : 'bg-teal-500/10 text-teal-400'} text-[11px] font-black px-4 py-1.5`}>{path.fit}% MATCH</Badge>
                        <div className="space-y-2">
                          <h4 className={`font-bold text-xl transition-colors ${isSelected ? 'text-white' : 'text-slate-300'}`}>{path.domain}</h4>
                          <p className="text-xs text-slate-500 italic">{path.desc}</p>
                        </div>
                        <div className="pt-6 border-t border-white/5">
                          <p className="text-[11px] font-black text-slate-600 uppercase tracking-widest italic">Est. Range</p>
                          <p className={`text-2xl font-black italic transition-colors ${isSelected ? 'text-white' : 'text-slate-400'} ${!canSeeData ? 'blur-md' : ''}`}>{canSeeData ? path.salary : "$110k - $160k"}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <Button onClick={() => setActiveStep(4)} disabled={!selectedPath} className="w-full h-24 bg-teal-600 text-black font-black rounded-[2.5rem] uppercase tracking-[0.2em] shadow-2xl">
                Identify Gaps <Pickaxe size={24} className="ml-4" />
              </Button>
            </div>
          )}

          {activeStep === 4 && (
            <div className="animate-in slide-in-from-right-8 duration-700 space-y-12 pb-96">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20"><Target size={28} /></div>
                      <h2 className="text-4xl font-serif italic text-white tracking-tight">The Harvest</h2>
                    </div>
                    <Card className="p-8 bg-teal-500/5 border-teal-500/20 rounded-[2.5rem]">
                      <p className="text-xs font-black text-teal-500/60 uppercase tracking-[0.3em] mb-4 italic">Alignment Secured</p>
                      <div className="flex items-end gap-3 mb-4">
                         <span className="text-6xl font-black italic text-white">82%</span>
                         <span className="text-xs text-slate-500 uppercase pb-2 font-bold tracking-widest italic">Ready</span>
                      </div>
                    </Card>
                </div>
                <div className="lg:col-span-8 space-y-4">
                    {gapData.map((item, i) => (
                      <Card key={i} className="p-8 bg-[#1C1622]/40 border-white/5 rounded-[2rem] hover:border-teal-500/20 transition-all">
                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 ${item.status === 'aligned' ? 'bg-teal-500/5 text-teal-400 border-teal-500/10' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                               {item.status === 'aligned' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg text-white font-bold">{item.skill}</h4>
                              <div className="flex gap-4 items-center">
                                <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{item.category}</span>
                                <span className="text-xs font-bold text-teal-500/40 italic uppercase">{item.effort} Required</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>

              {/* NATIVE STYLE BOTTOM SELECTION SHEET: Final Polish Version */}
              <motion.div 
                initial={{ y: "90%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-[env(safe-area-inset-bottom)] mb-4"
              >
                <Card className="p-10 bg-[#0D0B14] border-t-2 border-teal-500/40 rounded-t-[3.5rem] shadow-[0_-40px_100px_rgba(0,0,0,0.9)] max-w-5xl mx-auto">
                    {/* Native Grabber Handle: Enlarged for visibility */}
                    <div className="w-16 h-2 bg-white/20 rounded-full mx-auto mb-10" />
                    
                    <div className="space-y-8 max-w-2xl mx-auto text-center">
                        <h3 className="text-3xl font-serif italic text-white tracking-tight">Finalized Blueprint</h3>
                        <div className="bg-black/60 p-8 rounded-[2rem] border border-white/5 text-slate-200 italic font-serif text-lg leading-relaxed shadow-inner">
                          {bridgeData?.[selectedPath?.key]}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4 pb-4">
                          <Button onClick={() => handleCopy(bridgeData?.[selectedPath?.key])} className="h-20 px-10 bg-white/[0.03] text-white font-black rounded-2xl uppercase tracking-widest border border-white/10 gap-3 hover:bg-white/[0.08]">
                            {copied ? <Check size={24} /> : <Copy size={24} />} {copied ? "Copied" : "Copy Translation"}
                          </Button>
                          <Button 
                            onClick={() => { 
                              onSync({ isAligned: true }); 
                              navigate('/horizon');
                            }} 
                            className="h-20 px-10 bg-teal-600 text-black font-black rounded-2xl uppercase tracking-[0.2em] gap-3 shadow-2xl shadow-teal-500/40"
                          >
                            Enter Horizon <Binoculars size={24} />
                          </Button>
                        </div>
                    </div>
                </Card>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}