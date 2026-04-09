import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { 
  Compass, ShieldCheck, ArrowRight, Zap, Target, 
  AlertTriangle, CheckCircle2, Globe, ChevronRight,
  Sparkles, Binary, Trees, Mountain, Binoculars, Database
} from 'lucide-react';

export default function EcosystemAlignment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('compass');
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sync with the Hearth (UserProfile)
  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list() 
  });
  const profile = profiles?.[0];

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async Operations', icon: Globe },
    { id: 'mission', label: 'Equity-Focused / Social Impact', icon: ShieldCheck },
    { id: 'balance', label: 'Work-Life Equilibrium', icon: Zap },
    { id: 'autonomy', label: 'High Individual Autonomy', icon: Binary },
    { id: 'transparency', label: 'Radical Role Transparency', icon: CheckCircle2 }
  ];

  const getDynamicSectors = () => {
    const baseSectors = [
      { name: 'EdTech & Learning Platforms', base: 65, modifiers: ['mission', 'remote'], vibe: 'Growth-focused, mission-driven' },
      { name: 'Language Data & AI Training', base: 60, modifiers: ['remote', 'autonomy'], vibe: 'Iterative, data-centric' },
      { name: 'Public Sector Innovation', base: 50, modifiers: ['mission', 'transparency'], vibe: 'Stable, high-impact' },
      { name: 'Sustainability & B-Corps', base: 45, modifiers: ['balance', 'mission'], vibe: 'Purpose-led, agile' }
    ];

    return baseSectors.map(sector => {
      const bonus = sector.modifiers.filter(m => selectedEthics.includes(m)).length * 15;
      return {
        ...sector,
        match: Math.min(98, sector.base + bonus)
      };
    }).sort((a, b) => b.match - a.match);
  };

  const sectors = getDynamicSectors();

  const runScanner = () => {
    if (jobText.length < 10) return { compatibility: null, friction: null };
    const lowercase = jobText.toLowerCase();
    const frictionKeywords = ['fast-paced', 'high-pressure', 'hustle', 'urgent', 'always-on'];
    const hasFriction = frictionKeywords.some(k => lowercase.includes(k));
    
    return {
      compatibility: "Identity Audit: Aligning provided text with selected Clearing values.",
      friction: hasFriction ? "Friction Alert: High-velocity language detected." : "No cultural red flags detected."
    };
  };

  const results = runScanner();

  const steps = [
    { id: 'compass', label: '01. The Clearing', icon: <Trees className="w-4 h-4" /> },
    { id: 'scout', label: '02. The Wilds', icon: <Mountain className="w-4 h-4" /> },
    { id: 'translator', label: '03. The Compass', icon: <Compass className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-12 text-slate-200 pb-32">
      {/* Header Area */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-3 text-teal-400">
          <Target className="w-4 h-4 shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Validation Layer</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight text-white">Ecosystem Alignment</h1>
        
        {/* Connection Status Sub-bar */}
        <div className="mt-6 flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl w-fit">
          <Database className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Hearth Connection: {profile?.resume_url ? 'Active' : 'Offline'}
          </span>
          {profile?.resume_url && <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />}
        </div>
      </div>

      {/* Navigation flow */}
      <div className="flex items-center justify-center mb-20 max-w-4xl mx-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <button 
              onClick={() => setActiveTab(s.id)}
              className="flex flex-col items-center gap-4 px-6 transition-all group"
            >
              <div className={`w-16 h-16 rounded-[1.5rem] border flex items-center justify-center transition-all duration-500 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/10 text-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.2)]' : 'border-white/5 bg-white/[0.02] text-slate-700 hover:border-white/10'}`}>
                {s.icon}
              </div>
              <span className={`text-[9px] uppercase tracking-[0.3em] font-black transition-colors ${activeTab === s.id ? 'text-teal-400' : 'text-slate-600'}`}>
                {s.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div className="flex-1 flex justify-center items-center opacity-10">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {activeTab === 'compass' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 bg-[#251D2F] border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">The Clearing</h3>
                  <p className="text-xs text-slate-500 mb-10 font-light italic leading-relaxed">Choose the non-negotiables that will ground your transition from Education.</p>
                  
                  <div className="space-y-3">
                    {ethicsOptions.map(option => {
                      const isSelected = selectedEthics.includes(option.id);
                      return (
                        <button 
                          key={option.id}
                          onClick={() => {
                            const updated = isSelected ? selectedEthics.filter(e => e !== option.id) : [...selectedEthics, option.id];
                            setSelectedEthics(updated);
                          }}
                          className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${isSelected ? 'bg-teal-500/10 border-teal-400/30' : 'bg-[#1A1423] border-white/5 hover:border-white/10'}`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-teal-400 text-[#1A1423]' : 'bg-white/5 text-slate-600'}`}>
                              <option.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-white' : 'text-slate-500'}`}>{option.label}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6 p-12 border border-white/5 bg-white/[0.01] rounded-[3rem]">
                <Sparkles className="w-6 h-6 text-teal-500/30" />
                <p className="text-sm text-slate-500 italic leading-relaxed font-light">
                  "The Clearing is where your values act as a filtration system—keeping your next landscape from becoming a repetition of the last."
                </p>
                <button onClick={() => setActiveTab('scout')} className="w-full h-16 bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all shadow-lg shadow-orange-950/20 flex items-center justify-center gap-3">
                  Analyze The Wilds <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-4">
            {sectors.map(sector => (
              <div key={sector.name} className="bg-[#251D2F] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between group hover:border-teal-500/20 transition-all shadow-xl">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * sector.match) / 100} className="text-teal-400" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{sector.match}%</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold group-hover:text-teal-400 transition-colors">{sector.name}</h4>
                    <p className="text-[10px] text-slate-500 italic uppercase tracking-widest mt-1">{sector.vibe}</p>
                  </div>
                </div>
                <button className="text-[9px] font-black uppercase tracking-widest text-slate-600 hover:text-teal-400 transition-colors flex items-center gap-3 mt-6 md:mt-0">
                  <Binoculars className="w-4 h-4" /> View Topography
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'translator' && (
          <div className="animate-in zoom-in-95 duration-700 bg-[#251D2F] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
             <div className="flex items-center gap-5 mb-10">
               <div className="w-14 h-14 rounded-2xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-400">
                 <Compass className="w-7 h-7" />
               </div>
               <div>
                 <h3 className="text-xl font-bold tracking-tight text-white">The Compass</h3>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Stress-testing your next narrative</p>
               </div>
             </div>
             <textarea 
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste a job description or values statement here..."
                className="w-full h-64 bg-[#1A1423] border border-white/5 rounded-[2rem] p-8 text-sm text-slate-300 focus:outline-none focus:border-teal-400/20 transition-all mb-8 font-light resize-none leading-relaxed"
              />
              {jobText.length > 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                  <div className="bg-teal-500/5 border border-teal-500/10 p-6 rounded-2xl">
                    <div className="flex gap-2 text-teal-500 text-[9px] font-black uppercase mb-3 tracking-widest">Compatibility Scan</div>
                    <p className="text-xs italic text-slate-400">{results.compatibility}</p>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl">
                    <div className="flex gap-2 text-red-400 text-[9px] font-black uppercase mb-3 tracking-widest">Friction Pulse</div>
                    <p className="text-xs italic text-slate-400">{results.friction}</p>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}