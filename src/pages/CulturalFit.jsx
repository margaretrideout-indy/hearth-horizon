import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  Compass, ShieldCheck, ArrowRight, Zap, Target, 
  CheckCircle2, Globe, ChevronRight,
  Sparkles, Trees, Mountain, Binoculars, Database, Loader2
} from 'lucide-react';

export default function EcosystemAlignment() {
  const [activeTab, setActiveTab] = useState('clearing'); 
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dynamicSectors, setDynamicSectors] = useState(null);
  const [isScouting, setIsScouting] = useState(false);

  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list() 
  });
  const profile = profiles?.[0];

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async', icon: Globe },
    { id: 'mission', label: 'Equity-Focused Impact', icon: ShieldCheck },
    { id: 'balance', label: 'Work-Life Equilibrium', icon: Zap },
    { id: 'autonomy', label: 'Individual Autonomy', icon: CheckCircle2 },
    { id: 'transparency', label: 'Radical Transparency', icon: Target }
  ];

  const handleDeepScan = async () => {
    if (!jobText.trim() || !profile) return;
    setIsAnalyzing(true);
    try {
      const activeValues = ethicsOptions.filter(o => selectedEthics.includes(o.id)).map(o => o.label).join(', ');
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Client Context: ${profile.bio}. Values: [${activeValues}]. Analyze this specific Narrative/Job Description: "${jobText}". Provide a Resilience Score (0-100), identify Cultural Resonance (strengths), and pinpoint Friction Points (conflicts).`,
      });
      setAnalysis(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMarketScout = async () => {
    if (!profile) return;
    setIsScouting(true);
    try {
      const activeValues = ethicsOptions.filter(o => selectedEthics.includes(o.id)).map(o => o.label).join(', ');
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Based on a transition from ${profile.bio} and non-negotiable values [${activeValues}], identify 3 market sectors or specific ecosystem roles for exploration. Include a brief rationale for why they fit.`,
      });
      setDynamicSectors(result);
    } finally {
      setIsScouting(false);
    }
  };

  const steps = [
    { id: 'clearing', label: '01. The Clearing', icon: <Trees className="w-4 h-4" /> },
    { id: 'compass', label: '02. The Compass', icon: <Compass className="w-4 h-4" /> },
    { id: 'wilds', label: '03. The Wilds', icon: <Mountain className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0F0A15] p-6 md:p-12 text-slate-200 pb-32">
      <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold italic text-white tracking-tight">Ecosystem Alignment</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-teal-500/60 mt-2 font-black">Validation Layer</p>
        </div>
        <div className={`px-4 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${profile?.resume_url ? 'border-teal-500/30 text-teal-400 bg-teal-500/5' : 'border-red-500/30 text-red-400 bg-red-500/5'}`}>
          <Database className="w-3 h-3" />
          {profile?.resume_url ? 'Roots Synced' : 'Sync Required at Hearth'}
        </div>
      </div>

      <div className="flex items-center justify-center mb-24 max-w-3xl mx-auto relative">
        <div className="absolute top-7 left-0 w-full h-[1px] bg-white/5 -z-10" />
        {steps.map((s) => (
          <button 
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className="flex flex-col items-center gap-4 px-8 transition-all relative group"
          >
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-700 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/10 text-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.2)]' : 'border-white/5 bg-[#1A1423] text-slate-700 group-hover:border-white/20'}`}>
              {s.icon}
            </div>
            <span className={`text-[8px] uppercase tracking-[0.3em] font-black whitespace-nowrap transition-colors ${activeTab === s.id ? 'text-teal-400' : 'text-slate-600'}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* 01. THE CLEARING */}
        {activeTab === 'clearing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 px-2">Define Your Clearing</h3>
              {ethicsOptions.map(option => {
                const isSelected = selectedEthics.includes(option.id);
                return (
                  <button 
                    key={option.id}
                    onClick={() => setSelectedEthics(prev => isSelected ? prev.filter(e => e !== option.id) : [...prev, option.id])}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${isSelected ? 'bg-teal-500/10 border-teal-400/40' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-5">
                      <option.icon className={`w-4 h-4 ${isSelected ? 'text-teal-400' : 'text-slate-600'}`} />
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isSelected ? 'text-white' : 'text-slate-500'}`}>{option.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                  </button>
                );
              })}
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] text-center shadow-2xl">
               <p className="italic text-slate-500 text-xs font-light leading-relaxed mb-12">"Before the crossing, we define the non-negotiables that protect your energy."</p>
               <button 
                 onClick={() => setActiveTab('compass')} 
                 className="h-16 bg-teal-600 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-teal-500 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-teal-900/20"
               >
                 Calibrate The Compass <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        )}

        {/* 02. THE COMPASS */}
        {activeTab === 'compass' && (
          <div className="animate-in fade-in zoom-in-95 duration-700 max-w-4xl mx-auto">
            <div className="bg-[#1A1423] border border-white/5 rounded-[3rem] p-12 shadow-2xl">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-400/10 flex items-center justify-center text-teal-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Compass</h3>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Testing a specific direction</p>
                </div>
              </div>
              <textarea 
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the job description or mission statement here..."
                className="w-full h-56 bg-black/40 border border-white/5 rounded-3xl p-8 text-xs text-slate-300 focus:outline-none focus:border-teal-500/20 transition-all mb-8 font-light leading-relaxed resize-none"
              />
              <button 
                onClick={handleDeepScan} 
                disabled={isAnalyzing || !jobText.trim()} 
                className="w-full h-16 bg-teal-600 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:bg-teal-500 disabled:opacity-30 shadow-lg shadow-teal-900/20"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Align Narrative
              </button>
            </div>
            {analysis && (
              <div className="mt-8 bg-[#251D2F] border border-teal-500/20 p-10 rounded-[3rem] animate-in slide-in-from-top-4 shadow-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-6">Alignment Matrix Results</div>
                <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap font-light italic mb-10">{analysis}</div>
                <button 
                  onClick={() => setActiveTab('wilds')} 
                  className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 hover:text-teal-300 transition-colors mx-auto group"
                >
                  Step into The Wilds <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 03. THE WILDS */}
        {activeTab === 'wilds' && (
          <div className="animate-in fade-in duration-700 max-w-3xl mx-auto">
            <div className="bg-[#1A1423] border border-white/5 p-12 rounded-[3rem] text-center shadow-2xl">
              <div className="w-16 h-16 bg-teal-400/10 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-400">
                <Mountain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Market Topography</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-10 italic font-light">Identifying landscapes that match your bearing</p>
              {!dynamicSectors ? (
                <button 
                  onClick={handleMarketScout} 
                  disabled={isScouting || !profile} 
                  className="px-12 h-16 bg-teal-600 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto transition-all hover:bg-teal-500 disabled:opacity-30 shadow-lg shadow-teal-900/20"
                >
                  {isScouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Binoculars className="w-4 h-4" />}
                  Survey The Landscape
                </button>
              ) : (
                <div className="text-left text-xs leading-relaxed text-slate-400 font-light italic bg-black/40 p-10 rounded-3xl border border-white/5 shadow-inner whitespace-pre-wrap">
                  {dynamicSectors}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}