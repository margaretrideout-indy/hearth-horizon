import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, ShieldCheck, SearchCode, 
  ArrowRight, Zap, Target, AlertTriangle, 
  CheckCircle2, Globe, Building2, ChevronRight,
  ShieldAlert, Sparkles, Binary
} from 'lucide-react';

const EcosystemAlignment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('compass');
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);

  // Load ethics from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('alignment_ethics_v1');
    if (saved) setSelectedEthics(JSON.parse(saved));
  }, []);

  const toggleEthic = (id) => {
    const updated = selectedEthics.includes(id) 
      ? selectedEthics.filter(e => e !== id) 
      : [...selectedEthics, id];
    setSelectedEthics(updated);
    localStorage.setItem('alignment_ethics_v1', JSON.stringify(updated));
  };

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async Operations', icon: Globe },
    { id: 'mission', label: 'Equity-Focused / Social Impact', icon: ShieldCheck },
    { id: 'balance', label: 'Hard Work-Life Equilibrium', icon: Zap },
    { id: 'autonomy', label: 'High Individual Autonomy', icon: Binary },
    { id: 'transparency', label: 'Radical Salary/Role Transparency', icon: CheckCircle2 }
  ];

  const sectors = [
    { name: 'EdTech / Learning Platforms', match: 95, vibe: 'Growth-focused, mission-driven', tags: ['High Autonomy', 'Mission Alignment'] },
    { name: 'Language Data / AI Training', match: 82, vibe: 'Highly technical, iterative', tags: ['Async Heavy', 'Data-Driven'] },
    { name: 'Public Sector Innovation', match: 74, vibe: 'Stable, high-impact, slower pace', tags: ['Stable', 'Community Impact'] },
    { name: 'Early-Stage SaaS', match: 45, vibe: 'High-risk, intense hours', tags: ['Fast-Paced', 'Equity-Heavy'] }
  ];

  const steps = [
    { id: 'compass', label: '01. Define Ethics' },
    { id: 'scout', label: '02. Scout Sectors' },
    { id: 'translator', label: '03. Stress Test' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <Target className="w-4 h-4 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Validation Layer</span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Ecosystem Alignment</h1>
          <p className="text-sm text-gray-500 italic mt-1 font-light">Validating your professional syntax against cultural realities.</p>
        </div>
      </div>

      {/* STEP PROGRESS TRACKER */}
      <div className="flex justify-between mb-16 max-w-2xl mx-auto relative pt-4">
        <div className="absolute top-[2.25rem] left-0 w-full h-[1px] bg-white/5 -z-10" />
        {steps.map((s) => (
          <button 
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className="flex flex-col items-center gap-3 bg-[#1A1423] px-6 transition-all group"
          >
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-black transition-all duration-500 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/20 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'border-white/10 text-gray-700 group-hover:border-white/20'}`}>
              {s.id === 'compass' ? <Compass className="w-4 h-4" /> : s.id === 'scout' ? <Building2 className="w-4 h-4" /> : <SearchCode className="w-4 h-4" />}
            </div>
            <span className={`text-[8px] uppercase tracking-[0.25em] font-black transition-colors ${activeTab === s.id ? 'text-teal-400' : 'text-gray-700'}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* STEP 1: ETHICS COMPASS */}
        {activeTab === 'compass' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-bold mb-2">The Ethics Compass</h3>
              <p className="text-xs text-gray-500 mb-8 font-light italic tracking-wide">Select your operational non-negotiables to filter the market.</p>
              
              <div className="space-y-3">
                {ethicsOptions.map(option => (
                  <button 
                    key={option.id}
                    onClick={() => toggleEthic(option.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${selectedEthics.includes(option.id) ? 'bg-teal-500/10 border-teal-500/30' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedEthics.includes(option.id) ? 'bg-teal-400 text-black shadow-[0_0_10px_rgba(45,212,191,0.5)]' : 'bg-white/5 text-gray-600'}`}>
                        <option.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-widest ${selectedEthics.includes(option.id) ? 'text-white' : 'text-gray-500'}`}>{option.label}</span>
                    </div>
                    {selectedEthics.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setActiveTab('scout')}
                className="mt-10 w-full py-4 bg-[#FF6B35] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg"
              >
                Continue to Sector Scouting <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
                <div className="p-8 border border-dashed border-white/5 rounded-3xl relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                    <ShieldCheck className="w-40 h-40" />
                  </div>
                  <h4 className="text-lg font-serif italic text-gray-400 leading-relaxed mb-4">
                    "Your legacy is built on values. Transitioning to tech shouldn't mean leaving them behind."
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-teal-500/30" />
                    <span className="text-[8px] font-black text-teal-500/50 uppercase tracking-widest">Identity Philosophy</span>
                  </div>
                </div>
            </div>
          </div>
        )}

        {/* STEP 2: SECTOR SCOUTING */}
        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-4">
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-lg font-bold">Recommended Ecosystems</h3>
              <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Based on {selectedEthics.length} Non-Negotiables</div>
            </div>
            
            {sectors.map(sector => (
              <div key={sector.name} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.04] transition-all border-l-4 border-l-transparent hover:border-l-teal-500/50">
                <div className="flex items-center gap-8 mb-4 md:mb-0">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * sector.match) / 100} className="text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{sector.match}%</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{sector.name}</h4>
                    <p className="text-xs text-gray-500 italic mb-3">{sector.vibe}</p>
                    <div className="flex gap-2">
                      {sector.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-bold bg-white/5 text-gray-400 px-2 py-1 rounded uppercase tracking-tighter border border-white/5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/canopy')}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:bg-teal-500/10 hover:border-teal-500/20 transition-all"
                >
                  View Market <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* STEP 3: CULTURE TRANSLATOR */}
        {activeTab === 'translator' && (
          <div className="animate-in zoom-in-95 duration-700 lg:px-20">
            <div className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden">
               <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                  <SearchCode className="w-80 h-80" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#FF6B35]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Culture Translator</h3>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Stress-Testing Job Narrative</p>
                  </div>
                </div>

                <textarea 
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  placeholder="Paste a job description or company values statement here..."
                  className="w-full h-56 bg-black/40 border border-white/5 rounded-3xl p-8 text-sm text-gray-300 focus:outline-none focus:border-orange-500/20 transition-all mb-8 font-light leading-relaxed shadow-inner"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-teal-500/[0.03] border border-teal-500/10 rounded-[2rem] p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em]">Compatibility Signals</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-light italic">
                      {jobText.length > 0 ? "Analyzing text for alignment with your 'Remote-First' and 'Autonomy' non-negotiables..." : "Paste a description to begin cultural analysis."}
                    </p>
                  </div>

                  <div className="bg-red-500/[0.03] border border-red-500/10 rounded-[2rem] p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Operational Friction</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-light italic">
                      {jobText.length > 0 ? "Scanning for hidden red flags (e.g., 'crunch culture' terminology or lack of flexibility)." : "Waiting for input..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EcosystemAlignment;