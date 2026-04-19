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
  Lock, Sparkles 
} from 'lucide-react';

const HearthIcon = ({ isSelected }) => (
  <motion.div 
    animate={{
      scale: isSelected ? [1, 1.15, 1] : 1,
      filter: isSelected ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "none"
    }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    className={`p-5 rounded-[1.5rem] transition-all duration-700 ${isSelected ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-white/5 text-zinc-700 border border-transparent'}`}
  >
    <Flame size={28} className={isSelected ? "drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]" : ""} />
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
    { id: 'remote', label: 'Remote-First', desc: 'Values async work and digital freedom.', icon: Home },
    { id: 'equity', label: 'Equity-Driven', desc: 'Focuses on DEI and intentional impact.', icon: Users },
    { id: 'balance', label: 'The Quiet Hearth', desc: 'Strict boundaries on burnout & overreach.', icon: Flame }
  ];

  const handleDecode = () => {
    if (!manualInput) return;
    setIsGenerating(true);
    setTimeout(() => {
      const core = manualInput.trim().toLowerCase()
        .replace(/^(managed|led|taught|designed|created|organized|facilitated|coordinated|developed|ran)\s+/i, "");

      setBridgeData({
        pm: `Strategic orchestration of ${core}, focusing on high-velocity milestone delivery and cross-functional stakeholder alignment.`,
        data: `Quantitative synthesis of ${core} ecosystems to derive actionable, data-driven intelligence for leadership.`,
        ops: `Architecting scalable, resilient systems for ${core} to maximize operational efficiency and reduce overhead.`,
        exec: `High-level visioning and governance of ${core} initiatives to drive long-term enterprise value and growth.`,
        creative: `Narrative-driven reimagining of ${core}, blending aesthetic innovation with user-centric functionality.`
      });
      setIsGenerating(false);
    }, 1800);
  };

  const trajectories = [
    { domain: "Operations & Systems", salary: "$85k - $125k", fit: 94, velocity: "High", desc: "Optimizing organizational workflows.", key: 'ops' },
    { domain: "Project & Delivery", salary: "$90k - $135k", fit: 91, velocity: "Stable", desc: "End-to-end lifecycle management.", key: 'pm' },
    { domain: "Strategy & Implementation", salary: "$95k - $155k", fit: 88, velocity: "Emerging", desc: "Translating complex visions into reality.", key: 'data' }
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
    <div className="relative min-h-screen bg-[#0D0B14] selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* RITUAL NAVIGATION */}
      <div className="w-full pt-12 pb-16 flex justify-center sticky top-0 z-[60]">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#16121D]/80 backdrop-blur-3xl border border-white/5 rounded-full p-2 flex items-center gap-2 shadow-2xl">
          {[
            { id: 1, label: "TRANSLATE", icon: Languages },
            { id: 2, label: "VALUES", icon: ShieldCheck },
            { id: 3, label: "MAP", icon: Compass },
            { id: 4, label: "HARVEST", icon: Pickaxe }
          ].map((step, idx) => (
            <React.Fragment key={step.id}>
              <button 
                disabled={!canNavigateTo(step.id)}
                onClick={() => setActiveStep(step.id)}
                className={`group flex items-center gap-3 px-6 py-3.5 rounded-full transition-all duration-500 ${
                  activeStep === step.id ? 'bg-teal-500 text-black shadow-lg scale-105' : canNavigateTo(step.id) ? 'text-zinc-500 hover:text-white hover:bg-white/5' : 'opacity-20 cursor-not-allowed'
                }`}
              >
                <step.icon size={16} strokeWidth={activeStep === step.id ? 3 : 2} />
                <span className="hidden md:block text-[10px] font-black tracking-widest">{step.label}</span>
              </button>
              {idx < 3 && <div className="w-4 h-[1px] bg-white/5" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <main className="relative z-10 pb-48">
          
          {/* STEP 1: TRANSLATE */}
          {activeStep === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-6 pt-10 text-left">
                <div className="w-16 h-16 rounded-[2rem] bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20"><Microscope size={32} /></div>
                <h1 className="text-5xl md:text-6xl font-serif italic text-white leading-tight tracking-tighter">Legacy<br /><span className="text-zinc-800 not-italic uppercase font-sans font-black">Reframed</span></h1>
                <p className="text-[11px] text-zinc-600 uppercase tracking-[0.4em] font-bold border-l border-teal-500/30 pl-6">Refining the lexicon of the past into the currency of the future.</p>
              </div>
              <div className="lg:col-span-8 space-y-8">
                <Card className="p-8 md:p-10 bg-[#16121D] border-white/5 rounded-[3rem]">
                  <div className="space-y-10">
                    <div className="space-y-4 text-left">
                      <label className="text-[10px] font-black uppercase tracking-widest text-teal-500/50 ml-4">Achievement Origin</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <Input 
                          placeholder={universalPlaceholders[placeholderIdx]}
                          className="h-20 bg-black/40 border-white/5 text-white italic px-8 rounded-[1.5rem]"
                          value={manualInput}
                          onChange={(e) => setManualInput(e.target.value)}
                        />
                        <Button onClick={handleDecode} disabled={isGenerating || !manualInput} className="h-20 bg-teal-500 text-black px-10 rounded-[1.5rem] font-black uppercase">
                          {isGenerating ? <Loader2 className="animate-spin" /> : "Translate"}
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {['pm', 'data', 'ops'].map((key) => (
                        <div key={key} className={`p-6 rounded-[2rem] border transition-all ${bridgeData ? 'border-teal-500/30 bg-teal-500/5' : 'border-white/5 opacity-40'} text-left`}>
                          <span className="text-[9px] font-black text-teal-500/60 uppercase tracking-widest">{key === 'pm' ? 'Strategy' : key === 'data' ? 'Analysis' : 'Operations'}</span>
                          <p className="text-zinc-300 italic font-serif mt-2">{bridgeData ? bridgeData[key] : 'Waiting for input...'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
                <Button onClick={() => setActiveStep(2)} disabled={!bridgeData} className="w-full h-20 bg-white/5 border border-white/10 text-zinc-500 hover:text-white uppercase font-black tracking-widest rounded-[2rem]">Define Values <ArrowRight size={20} className="ml-4" /></Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: VALUES */}
          {activeStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16 py-10">
              <div className="text-center max-w-2xl mx-auto space-y-6">
                <div className="w-20 h-20 rounded-[2.5rem] bg-orange-500/10 flex items-center justify-center text-orange-400 border border-orange-500/20 mx-auto"><ShieldCheck size={32} /></div>
                <h2 className="text-5xl font-serif italic text-white">The Hearth <span className="text-zinc-800 not-italic uppercase font-black">Ethics</span></h2>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Declare your non-negotiables</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {ethicsOptions.map((opt) => (
                  <Card key={opt.id} onClick={() => toggleEthic(opt.id)} className={`p-10 rounded-[3rem] cursor-pointer transition-all duration-700 border-2 text-left ${ethicalPriorities.includes(opt.id) ? 'bg-teal-500/10 border-teal-500/50 scale-[1.02]' : 'bg-[#16121D] border-white/5'}`}>
                    <div className="flex items-center gap-6">
                      <div className={`p-5 rounded-2xl ${ethicalPriorities.includes(opt.id) ? 'bg-teal-500 text-black' : 'bg-white/5 text-zinc-700'}`}><opt.icon size={28} /></div>
                      <div>
                        <h4 className="font-black uppercase tracking-tight text-xl text-zinc-200">{opt.label}</h4>
                        <p className="text-xs text-zinc-500 italic mt-1">{opt.desc}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center pt-8">
                <Button onClick={() => setActiveStep(3)} disabled={ethicalPriorities.length === 0} className="h-20 px-16 bg-teal-500 text-black font-black uppercase tracking-widest rounded-full shadow-2xl">Map Topography</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MAP */}
          {activeStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="text-left space-y-4">
                <Badge className="bg-teal-500/10 text-teal-400">Pathfinder Mode</Badge>
                <h2 className="text-5xl font-serif italic text-white">High-Probability <span className="text-zinc-800 not-italic uppercase font-black">Paths</span></h2>
              </div>
              <div className="grid gap-6">
                {trajectories.map((path) => (
                  <Card key={path.key} onClick={() => setSelectedPath(path)} className={`p-8 rounded-[2.5rem] cursor-pointer border-2 transition-all text-left ${selectedPath?.key === path.key ? 'border-teal-500 bg-teal-500/5' : 'border-white/5 bg-[#16121D]'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-serif italic text-white">{path.domain}</h3>
                        <p className="text-zinc-500 text-sm mt-2">{path.desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-teal-400 font-black text-2xl">{path.fit}%</div>
                        <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Alignment Fit</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center pt-8">
                <Button onClick={() => setActiveStep(4)} disabled={!selectedPath} className="h-20 px-16 bg-white text-black font-black uppercase tracking-widest rounded-full">Harvest Blueprint</Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: HARVEST */}
          {activeStep === 4 && selectedPath && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-4xl mx-auto">
              <Card className="p-12 md:p-16 bg-[#1C1622] border-teal-500/50 border-2 rounded-[4rem] text-center space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-teal-500" />
                <div className="space-y-4">
                  <Badge className="bg-teal-500 text-black">Blueprint Finalized</Badge>
                  <h3 className="text-5xl font-serif italic text-white">Your New <span className="text-zinc-800 not-italic uppercase font-black">Architecture</span></h3>
                </div>
                <div className="p-10 bg-black/40 rounded-[2rem] border border-white/5 text-left italic font-serif text-2xl text-zinc-300">
                   "{bridgeData[selectedPath.key]}"
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => handleCopy(bridgeData[selectedPath.key])} className="h-20 flex-1 bg-white/5 text-white font-black uppercase rounded-2xl gap-3">
                    {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy Translation"}
                  </Button>
                  <Button 
                    onClick={() => {
                      onSync({ isAligned: true, selectedPath, ethics: ethicalPriorities });
                      navigate('/horizon');
                    }}
                    className="h-20 flex-1 bg-teal-500 text-black font-black uppercase rounded-2xl gap-3 shadow-xl"
                  >
                    Enter Horizon <Binoculars />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}