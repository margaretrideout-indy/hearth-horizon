import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  Compass, ShieldCheck, ArrowRight, Zap, Target, 
  CheckCircle2, Globe, ChevronRight,
  Sparkles, Binary, Trees, Mountain, Binoculars, Database, Loader2
} from 'lucide-react';

export default function EcosystemAlignment() {
  const [activeTab, setActiveTab] = useState('compass');
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);
  const [dynamicSectors, setDynamicSectors] = useState(null);
  const [isScouting, setIsScouting] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sync with the client's unique background from the Hearth
  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list() 
  });
  const profile = profiles?.[0];

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async', icon: Globe },
    { id: 'mission', label: 'Equity-Focused Impact', icon: ShieldCheck },
    { id: 'balance', label: 'Work-Life Equilibrium', icon: Zap },
    { id: 'autonomy', label: 'Individual Autonomy', icon: Binary },
    { id: 'transparency', label: 'Radical Transparency', icon: CheckCircle2 }
  ];

  // STEP 02 LOGIC: AI scouts the market specifically for this user's profile
  const handleMarketScout = async () => {
    if (!profile) return;
    setIsScouting(true);
    try {
      const activeValues = ethicsOptions.filter(o => selectedEthics.includes(o.id)).map(o => o.label).join(', ');
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Based on this client's background (${profile.bio}) and their non-negotiable values [${activeValues}], identify 3 high-growth market sectors where they would have the most "cultural resonance." For each sector, provide a match percentage (0-100) and a short 'vibe' description. Format as a JSON-style list.`,
      });
      // Parse result or set as text depending on LLM output
      setDynamicSectors(result);
    } finally {
      setIsScouting(false);
    }
  };

  // STEP 03 LOGIC: Deep Stress-test of a specific JD
  const handleDeepScan = async () => {
    if (!jobText.trim() || !profile) return;
    setIsAnalyzing(true);
    try {
      const activeValues = ethicsOptions.filter(o => selectedEthics.includes(o.id)).map(o => o.label).join(', ');
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Client Background: ${profile.bio}. Values: [${activeValues}]. Analyze this Job Description: "${jobText}". Provide a Compatibility Score and identify specific "Cultural Friction" points.`,
      });
      setAnalysis(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const steps = [
    { id: 'compass', label: '01. The Clearing', icon: <Trees className="w-4 h-4" /> },
    { id: 'scout', label: '02. The Wilds', icon: <Mountain className="w-4 h-4" /> },
    { id: 'translator', label: '03. The Compass', icon: <Compass className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0F0A15] p-6 md:p-12 text-slate-200 pb-32">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3 text-teal-400">
            <Target className="w-4 h-4 shadow-[0_0_15px_rgba(45,212,191,0.4)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Validation Layer</span>
          </div>
          <h1 className="text-4xl font-serif font-bold italic text-white tracking-tight">Ecosystem Alignment</h1>
        </div>
        
        {/* Sync Status Badge */}
        <div className={`px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${profile?.resume_url ? 'bg-teal-500/5 border-teal-500/20 text-teal-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
           <Database className="w-3 h-3" />
           {profile?.resume_url ? 'Client Roots Synced' : 'Sync Required at Hearth'}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center mb-20 max-w-4xl mx-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <button 
              onClick={() => setActiveTab(s.id)}
              className="flex flex-col items-center gap-4 px-6 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/10 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'border-white/5 bg-white/[0.02] text-slate-700'}`}>
                {s.icon}
              </div>
              <span className={`text-[9px] uppercase tracking-[0.3em] font-black ${activeTab === s.id ? 'text-teal-400' : 'text-slate-600'}`}>
                {s.label}
              </span>
            </button>
            {idx < steps.length - 1 && <div className="flex-1 h-[1px] bg-white/5 mx-4" />}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* TAB 1: THE CLEARING */}
        {activeTab === 'compass' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-lg font-bold text-white mb-6">Defining the Clearing</h3>
              {ethicsOptions.map(option => {
                const isSelected = selectedEthics.includes(option.id);
                return (
                  <button 
                    key={option.id}
                    onClick={() => setSelectedEthics(prev => isSelected ? prev.filter(e => e !== option.id) : [...prev, option.id])}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${isSelected ? 'bg-teal-500/10 border-teal-400/40 shadow-inner' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <option.icon className={`w-5 h-5 ${isSelected ? 'text-teal-400' : 'text-slate-600'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-slate-500'}`}>{option.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                  </button>
                );
              })}
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center text-center p-12 bg-[#1A1423] rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
               <p className="italic text-slate-500 text-sm font-light leading-relaxed mb-10">
                 "Alignment begins by defining the values that act as your filtration system."
               </p>
               <button onClick={() => setActiveTab('scout')} className="h-14 bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-500 transition-all shadow-lg shadow-teal-900/20 active:scale-95">
                 Scout the Market
               </button>
            </div>
          </div>
        )}

        {/* TAB 2: THE WILDS (DYNAMIC MARKET SCOUTING) */}
        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] text-center">
              <h3 className="text-lg font-bold text-white mb-4">Market Topography</h3>
              <p className="text-xs text-slate-500 mb-8 max-w-md mx-auto italic">Analyzing the client's unique roots against current market sectors.</p>
              
              {!dynamicSectors ? (
                <button 
                  onClick={handleMarketScout}
                  disabled={isScouting || !profile}
                  className="px-10 h-14 bg-teal-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 mx-auto transition-all"
                >
                  {isScouting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Binoculars className="w-4 h-4" />}
                  Generate Landscape Analysis
                </button>
              ) : (
                <div className="text-left text-sm leading-relaxed text-slate-300 font-light italic whitespace-pre-wrap bg-black/20 p-8 rounded-2xl border border-white/5">
                  {dynamicSectors}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: THE COMPASS (JD STRESS TEST) */}
        {activeTab === 'translator' && (
          <div className="animate-in fade-in space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <Compass className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-bold text-white">The Narrative Compass</h3>
              </div>
              <textarea 
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the target job description or mission statement here..."
                className="w-full h-48 bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-slate-300 focus:outline-none focus:border-teal-500/30 transition-all resize-none mb-6 font-light"
              />
              <button 
                onClick={handleDeepScan}
                disabled={isAnalyzing || !jobText.trim()}
                className="w-full h-14 bg-teal-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-teal-900/20"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Analyze Alignment
              </button>
            </div>

            {analysis && (
              <div className="bg-[#251D2F] border border-teal-500/20 p-10 rounded-[3rem] animate-in slide-in-from-top-4 shadow-2xl">
                <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-light italic">
                  {analysis}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}