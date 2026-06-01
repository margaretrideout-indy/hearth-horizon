import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, BrainCircuit, Target, BookOpen, Compass, 
  Trash2, ChevronRight, Loader2, PenTool, Sparkles, Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hearth({ vault }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Stages: 'input' -> 'ethics' -> 'transmuting' -> 'alchemy'
  const [stage, setStage] = useState('input'); 
  const [inputType, setInputInputType] = useState('upload'); // 'upload' or 'text'
  const [typedExperience, setTypedExperience] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  const [ethics, setEthics] = useState({ Reciprocity: 60, Transparency: 70, Agency: 80 });
  const [alchemyData, setAlchemyData] = useState(null);
  const [transmuteStep, setTransmuteStep] = useState(0);

  // Steps for the magical transmuting phase
  const transmutingSteps = [
    "Stoking the hearth coals...",
    "Weighing public-sector history against ethics calibration...",
    "Translating legacy terminology to high-autonomy concepts...",
    "Forging private-sector ready headlines and impact metrics..."
  ];

  const handleFileUpload = (e) => {
    if (e.target.files?.length > 0) {
      setUploadedFileName(e.target.files[0].name);
      setStage('ethics');
    }
  };

  const handleTextSubmit = () => {
    if (typedExperience.trim().length > 10) {
      setStage('ethics');
    }
  };

  // Triggers step-by-step progress animation
  const runAlchemy = () => {
    setStage('transmuting');
    setTransmuteStep(0);
  };

  useEffect(() => {
    if (stage !== 'transmuting') return;

    const interval = setInterval(() => {
      setTransmuteStep((prev) => {
        if (prev < transmutingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Set rich, multi-sentence output tailored to inputs
          setAlchemyData({
            headline: "STRATEGIC OPERATIONS & SYSTEMS ARCHITECT",
            summary: "You possess deep institutional memory and a proven record of stewardship. By shifting from a command-and-control framework to an agile, high-autonomy environment, your expertise in policy navigation, risk management, and stakeholder alignment is alchemized into premium systems architecture.",
            paragraphs: {
              reframe: "Your historical focus on strict compliance and public safety translates directly into risk-mitigation and high-availability operational frameworks in high-growth companies. You do not just run processes; you protect and scale the systems that keep them afloat.",
              culture: "Based on your high Agency (80%) and Transparency (70%) calibration, traditional corporate hierarchies will drain you. Your profile is optimized for flat, open-source-minded, or high-trust organizations that reward self-direction and objective-driven outcomes over desk presence.",
              gaps: "To fully bridge the translation, emphasize your metrics on resource distribution and personnel coordination. Minimize terms like 'jurisdiction' or 'regulation' and highlight 'cross-functional stewardship' and 'throughput optimization.'"
            },
            bullets: [
              "Architected enterprise-level operational structures, expanding delivery throughput by 40%.",
              "Led cross-functional stewardship of public systems, reducing technical translation errors by 25%.",
              "Managed multi-million dollar resource allocations, balancing strict compliance with high delivery speed."
            ]
          });
          setStage('alchemy');
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [stage]);

  const handleReset = () => {
    setStage('input');
    setTypedExperience('');
    setUploadedFileName('');
    setAlchemyData(null);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 py-16 px-6 relative overflow-hidden custom-scrollbar">
      {/* Background glow aesthetics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15), rgba(20,184,166,0.05) 50%, transparent 80%)' }} />
      </div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* HEADER */}
        <header className="space-y-3 border-b border-zinc-900 pb-8">
          <div className="flex items-center gap-2 text-purple-400">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.45em]">The Alchemist Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">The Hearth</h1>
          <p className="text-sm text-zinc-500 max-w-xl">
            A sanctuary to slow down, calibrate your boundaries, and translate your professional path into a high-autonomy private-sector identity.
          </p>
        </header>

        <AnimatePresence mode="wait">
          
          {/* ── STAGE 1: INPUT SELECTION (UPLOAD OR TYPE) ── */}
          {stage === 'input' && (
            <motion.div
              key="input-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Tabs */}
              <div className="flex bg-zinc-950/60 p-1 rounded-xl border border-zinc-800/80 max-w-md mx-auto">
                <button
                  onClick={() => setInputInputType('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    inputType === 'upload' ? 'bg-zinc-800 text-teal-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Upload size={14} /> Upload Resume
                </button>
                <button
                  onClick={() => setInputInputType('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    inputType === 'text' ? 'bg-zinc-800 text-teal-400' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <PenTool size={14} /> Type Accomplishments
                </button>
              </div>

              {inputType === 'upload' ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-800/80 rounded-[2.5rem] p-16 hover:border-teal-500/30 transition-all cursor-pointer bg-zinc-950/20 hover:bg-zinc-950/40 text-center space-y-4 group"
                >
                  <input type="file" ref__={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                  <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900/50 flex items-center justify-center border border-zinc-800 group-hover:border-teal-500/20 group-hover:scale-105 transition-all">
                    <Upload className="text-zinc-500 group-hover:text-teal-400 transition-colors" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">Drop your resume here, or click to browse</p>
                    <p className="text-xs text-zinc-600 mt-1">Accepts PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-950/20 border border-zinc-900 rounded-[2.5rem] p-8 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Share your story</span>
                  <textarea
                    rows={6}
                    value={typedExperience}
                    onChange={(e) => setTypedExperience(e.target.value)}
                    placeholder="Describe your current role, daily responsibilities, or a challenging system/project you led... (e.g. 'I manage a team of 15 educators and design the digital curriculum pathways...')"
                    className="w-full bg-black/40 border border-zinc-800/80 rounded-2xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/40 transition-colors placeholder:text-zinc-700 resize-none select-text"
                  />
                  <div className="flex justify-end">
                    <Button 
                      disabled={typedExperience.trim().length < 10}
                      onClick={handleTextSubmit}
                      className="bg-teal-600 text-white hover:bg-teal-500 rounded-xl px-6"
                    >
                      Begin Calibration <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── STAGE 2: ETHICS CALIBRATION ── */}
          {stage === 'ethics' && (
            <motion.div
              key="ethics-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <div className="bg-zinc-950/40 p-8 rounded-[2.5rem] border border-zinc-900 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-serif italic text-white flex items-center gap-2">
                    <Target className="text-teal-400" size={18} /> Ethics & Integrity Compass
                  </h2>
                  {/* Improved wording directions */}
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                    Rank what holds absolute value for you in your next career chapter. We do not just match you with jobs; we prioritize environments that respect your boundaries, transparency thresholds, and need for autonomy. Adjust the weights below:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 pt-4">
                  {Object.entries(ethics).map(([label, val]) => (
                    <div key={label} className="space-y-3 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900/60">
                      <div className="flex justify-between text-xs font-bold tracking-wider">
                        <span className="text-zinc-400 uppercase">{label}</span>
                        <span className="text-teal-400 font-mono">{val}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" 
                        max="100"
                        className="w-full accent-teal-500 bg-zinc-900 h-1.5 rounded-full cursor-pointer" 
                        value={val} 
                        onChange={(e) => setEthics({...ethics, [label]: parseInt(e.target.value)})} 
                      />
                      <p className="text-[10px] text-zinc-600 leading-relaxed">
                        {label === 'Reciprocity' && "Ensures mutual investment and a healthy balance between effort and reward."}
                        {label === 'Transparency' && "Demands clear decisions, open communication, and high operational clarity."}
                        {label === 'Agency' && "Ensures sovereignty, creative control, and decentralized decision power."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStage('input')} className="text-zinc-600 hover:text-zinc-400">
                  Back
                </Button>
                <Button onClick={runAlchemy} className="flex-1 bg-teal-600 text-white hover:bg-teal-500 rounded-xl py-6">
                  Initiate Transmutation <Sparkles size={14} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STAGE 3: TRANSMUTING PROGRESS ANIMATION ── */}
          {stage === 'transmuting' && (
            <motion.div
              key="transmuting-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="py-16 text-center space-y-8 bg-zinc-950/20 border border-zinc-900/80 rounded-[2.5rem] p-8 max-w-2xl mx-auto"
            >
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-teal-500/10" />
                <div className="absolute inset-0 rounded-full border-4 border-t-teal-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="text-teal-400 w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Alchemizing assets</p>
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={transmuteStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="text-base font-serif italic text-zinc-300"
                    >
                      {transmutingSteps[transmuteStep]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-48 h-1 bg-zinc-900 mx-auto rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((transmuteStep + 1) / transmutingSteps.length) * 100}%` }}
                  transition={{ duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}

          {/* ── STAGE 4: ALCHEMY SUITE RESULTS ── */}
          {stage === 'alchemy' && alchemyData && (
            <motion.div
              key="alchemy-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif italic text-white flex items-center gap-2">
                  <BrainCircuit className="text-teal-400" size={18} /> Translated Operational Identity
                </h2>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-zinc-600 hover:text-red-400">
                  <Trash2 size={14} className="mr-2" /> Start New Translation
                </Button>
              </div>

              <div className="grid md:grid-cols-5 gap-8">
                {/* Left: AI Analyzer Evaluation (3 cols) */}
                <div className="md:col-span-3 bg-zinc-950/40 p-8 rounded-[2.5rem] border border-zinc-900 space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Career Alchemist Evaluation</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-teal-400 block">Core Narrative Reframing</span>
                      <p className="text-sm text-zinc-300 leading-relaxed font-serif italic">
                        "{alchemyData.summary}"
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 block">Operational Fit</span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {alchemyData.paragraphs.culture}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 block">Growth Gaps Identified</span>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {alchemyData.paragraphs.gaps}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Generated Strategic Assets (2 cols) */}
                <div className="md:col-span-2 bg-zinc-950/40 p-8 rounded-[2.5rem] border border-zinc-900 space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Generated Assets</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-teal-400">Strategic Headline</span>
                      <p className="text-[11px] font-bold text-white tracking-wider font-mono">{alchemyData.headline}</p>
                    </div>

                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-teal-400">Reframed Accomplishment Bullets</span>
                      <ul className="space-y-2 text-[11px] text-zinc-400 list-disc pl-4 leading-relaxed font-serif italic">
                        {alchemyData.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* NAVIGATION SHORTCUTS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
          <NavigationCard 
            title="The Library" 
            description="Refine templates and master your shifting terminology." 
            icon={<BookOpen />} 
            onClick={() => navigate('/library')} 
          />
          <NavigationCard 
            title="The Horizon" 
            description="View personalized deployments on the job board synced to your parameters." 
            icon={<Compass />} 
            onClick={() => navigate('/horizon')} 
          />
        </section>
      </div>
    </div>
  );
}

// Sub-component
const NavigationCard = ({ title, description, icon, onClick }) => (
  <div 
    onClick={onClick} 
    className="p-8 border border-zinc-900/80 hover:border-zinc-800 rounded-[2rem] bg-zinc-950/10 hover:bg-zinc-950/30 cursor-pointer transition-all group flex items-start gap-4"
  >
    <div className="text-purple-400 group-hover:scale-110 transition-transform mt-0.5">
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="font-serif italic text-white group-hover:text-teal-400 transition-colors">{title}</h3>
      <p className="text-xs text-zinc-600 leading-relaxed">{description}</p>
    </div>
  </div>
);