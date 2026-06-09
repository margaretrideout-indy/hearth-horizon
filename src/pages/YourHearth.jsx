import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Target, BookOpen, Compass, 
  Trash2, ChevronRight, Loader2, Sparkles, ClipboardPaste,
  Copy, Check, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import LogbookPanel from '@/components/hearth/LogbookPanel';

export default function Hearth({ vault }) {
  const navigate = useNavigate();
  
  // Stages: 'input' -> 'ethics' -> 'transmuting' -> 'alchemy'
  const [stage, setStage] = useState('input'); 
  const [typedExperience, setTypedExperience] = useState('');
  const [ethics, setEthics] = useState({ Reciprocity: 60, Transparency: 70, Agency: 80 });
  const [alchemyData, setAlchemyData] = useState(null);
  const [transmuteStep, setTransmuteStep] = useState(0);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [savedToVault, setSavedToVault] = useState(false);

  const transmutingSteps = [
    "Stoking the hearth coals...",
    "Weighing public-sector history against ethics calibration...",
    "Translating legacy terminology to high-autonomy concepts...",
    "Forging private-sector ready headlines and impact metrics..."
  ];

  // Animate through steps, then call real backend
  useEffect(() => {
    if (stage !== 'transmuting') return;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setTransmuteStep(step);
      if (step >= transmutingSteps.length - 1) {
        clearInterval(interval);
      }
    }, 1400);

    // Fire the real AI call in parallel
    base44.functions.invoke('alchemizeHearth', { experience: typedExperience, ethics })
      .then((res) => {
        setAlchemyData(res.data.data);
        setStage('alchemy');
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again.');
        setStage('input');
      });

    return () => clearInterval(interval);
  }, [stage]);

  const handleReset = () => {
    setStage('input');
    setTypedExperience('');
    setAlchemyData(null);
    setError(null);
    setSavedToVault(false);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToVault = async () => {
    if (!alchemyData) return;
    await base44.auth.updateMe({
      alchemist_headline: alchemyData.headline,
      alchemist_bullets: alchemyData.bullets,
      alchemist_summary: alchemyData.summary,
    });
    setSavedToVault(true);
    toast.success('Saved to your Vault!');
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 py-16 px-6 relative overflow-hidden custom-scrollbar">
      {/* Background glow */}
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

        {/* LOGBOOK */}
        <LogbookPanel />

        {error && (
          <div className="bg-red-950/30 border border-red-900/60 text-red-400 text-xs rounded-2xl px-5 py-4">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* ── STAGE 1: PASTE ACCOMPLISHMENTS ── */}
          {stage === 'input' && (
            <motion.div
              key="input-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-zinc-950/20 border border-zinc-900 rounded-[2.5rem] p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <ClipboardPaste size={16} className="text-teal-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Paste or describe your career story
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Copy your resume text, paste a LinkedIn summary, or write a few sentences describing your current role and key responsibilities. The more specific you are, the richer your translation.
                </p>
                <textarea
                  rows={7}
                  value={typedExperience}
                  onChange={(e) => setTypedExperience(e.target.value)}
                  placeholder="e.g. 'I'm a Grade 7 curriculum lead with 12 years experience designing instructional frameworks for 3 schools, managing a team of 18 educators, and coordinating district-wide digital adoption initiatives...'"
                  className="w-full bg-black/40 border border-zinc-800/80 rounded-2xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/40 transition-colors placeholder:text-zinc-700 resize-none select-text"
                />
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono ${typedExperience.length < 10 ? 'text-zinc-700' : 'text-teal-600'}`}>
                    {typedExperience.length} characters
                  </span>
                  <Button 
                    disabled={typedExperience.trim().length < 10}
                    onClick={() => setStage('ethics')}
                    className="bg-teal-600 text-white hover:bg-teal-500 rounded-xl px-6"
                  >
                    Begin Calibration <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
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
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
                    Rank what holds absolute value for you in your next career chapter. We prioritize environments that respect your boundaries, transparency thresholds, and need for autonomy.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-4">
                  {Object.entries(ethics).map(([label, val]) => (
                    <div key={label} className="space-y-3 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-900/60">
                      <div className="flex justify-between text-xs font-bold tracking-wider">
                        <span className="text-zinc-400 uppercase">{label}</span>
                        <span className="text-teal-400 font-mono">{val}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="10" max="100"
                        className="w-full accent-teal-500 bg-zinc-900 h-1.5 rounded-full cursor-pointer" 
                        value={val} 
                        onChange={(e) => setEthics({...ethics, [label]: parseInt(e.target.value)})} 
                      />
                      <p className="text-[10px] text-zinc-600 leading-relaxed">
                        {label === 'Reciprocity' && "Mutual investment between effort and reward."}
                        {label === 'Transparency' && "Open decisions, clear communication, operational clarity."}
                        {label === 'Agency' && "Creative control, sovereignty, decentralized power."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setStage('input')} className="text-zinc-600 hover:text-zinc-400">
                  Back
                </Button>
                <Button onClick={() => { setTransmuteStep(0); setStage('transmuting'); }} className="flex-1 bg-teal-600 text-white hover:bg-teal-500 rounded-xl py-6">
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
                      {transmutingSteps[Math.min(transmuteStep, transmutingSteps.length - 1)]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              <div className="w-48 h-1 bg-zinc-900 mx-auto rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-teal-400"
                  animate={{ width: `${((Math.min(transmuteStep, transmutingSteps.length - 1) + 1) / transmutingSteps.length) * 100}%` }}
                  transition={{ duration: 1.4, ease: "linear" }}
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
                  <Trash2 size={14} className="mr-2" /> Start New
                </Button>
              </div>

              <div className="grid md:grid-cols-5 gap-8">
                {/* Left: AI Evaluation (3 cols) */}
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
                      <p className="text-xs text-zinc-400 leading-relaxed">{alchemyData.cultureFit}</p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 block">Growth Gaps Identified</span>
                      <p className="text-xs text-zinc-400 leading-relaxed">{alchemyData.growthGaps}</p>
                    </div>
                  </div>
                </div>

                {/* Right: Generated Assets (2 cols) */}
                <div className="md:col-span-2 bg-zinc-950/40 p-8 rounded-[2.5rem] border border-zinc-900 space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Generated Assets</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-teal-400">Strategic Headline</span>
                        <button
                          onClick={() => handleCopy(alchemyData.headline, 'headline')}
                          className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-zinc-600 hover:text-teal-400 transition-colors"
                        >
                          {copiedId === 'headline' ? <><Check size={9} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={9} />Copy</>}
                        </button>
                      </div>
                      <p className="text-[11px] font-bold text-white tracking-wider font-mono">{alchemyData.headline}</p>
                    </div>
                    <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-teal-400">Reframed Accomplishments</span>
                        <button
                          onClick={() => handleCopy(alchemyData.bullets?.join('\n'), 'bullets')}
                          className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-zinc-600 hover:text-teal-400 transition-colors"
                        >
                          {copiedId === 'bullets' ? <><Check size={9} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={9} />Copy All</>}
                        </button>
                      </div>
                      <ul className="space-y-2 text-[11px] text-zinc-400 list-disc pl-4 leading-relaxed font-serif italic">
                        {alchemyData.bullets?.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={handleSaveToVault}
                      disabled={savedToVault}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all disabled:opacity-60 ${
                        savedToVault
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-teal-500/30 hover:text-teal-400 text-zinc-500'
                      }`}
                    >
                      {savedToVault ? <><Check size={10} /> Saved to Vault</> : <><Save size={10} /> Save to Vault</>}
                    </button>
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

const NavigationCard = ({ title, description, icon, onClick }) => (
  <div 
    onClick={onClick} 
    className="p-8 border border-zinc-900/80 hover:border-zinc-800 rounded-[2rem] bg-zinc-950/10 hover:bg-zinc-950/30 cursor-pointer transition-all group flex items-start gap-4"
  >
    <div className="text-purple-400 group-hover:scale-110 transition-transform mt-0.5">{icon}</div>
    <div className="space-y-1">
      <h3 className="font-serif italic text-white group-hover:text-teal-400 transition-colors">{title}</h3>
      <p className="text-xs text-zinc-600 leading-relaxed">{description}</p>
    </div>
  </div>
);