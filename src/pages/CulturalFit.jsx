import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Compass, ShieldCheck, SearchCode, 
  ArrowRight, Zap, Target, AlertTriangle, 
  CheckCircle2, Globe, Building2, ChevronRight,
  ShieldAlert, Sparkles, Binary, Info, Download, Lock
} from 'lucide-react';

const EcosystemAlignment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('compass');
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('alignment_ethics_v1');
    if (saved) setSelectedEthics(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (jobText.length > 20) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [jobText]);

  const toggleEthic = (id) => {
    const updated = selectedEthics.includes(id) 
      ? selectedEthics.filter(e => e !== id) 
      : [...selectedEthics, id];
    setSelectedEthics(updated);
    localStorage.setItem('alignment_ethics_v1', JSON.stringify(updated));
  };

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async Operations', icon: Globe, keywords: ['remote', 'async', 'distributed', 'work from home'] },
    { id: 'mission', label: 'Equity-Focused / Social Impact', icon: ShieldCheck, keywords: ['impact', 'purpose', 'social', 'equity', 'diversity'] },
    { id: 'balance', label: 'Hard Work-Life Equilibrium', icon: Zap, keywords: ['flexible', 'balance', 'sustainable', 'well-being'] },
    { id: 'autonomy', label: 'High Individual Autonomy', icon: Binary, keywords: ['self-starter', 'independent', 'autonomous', 'ownership'] },
    { id: 'transparency', label: 'Radical Salary/Role Transparency', icon: CheckCircle2, keywords: ['transparent', 'open', 'salary', 'clarity'] }
  ];

  const runScanner = () => {
    if (jobText.length < 10) return { compatibility: null, friction: null };
    const lowercase = jobText.toLowerCase();
    const activeEthics = ethicsOptions.filter(o => selectedEthics.includes(o.id));
    const matched = activeEthics.find(o => o.keywords.some(k => lowercase.includes(k)));
    const frictionKeywords = ['fast-paced', 'high-pressure', 'hustle', 'urgent', 'always-on', 'tight deadlines'];
    const hasFriction = frictionKeywords.some(k => lowercase.includes(k));

    return {
      compatibility: matched ? `Alignment detected with "${matched.label}"` : "General ecosystem alignment detected.",
      friction: hasFriction ? "Operational Friction: High-velocity keywords detected." : "No significant cultural red flags found."
    };
  };

  const results = runScanner();

  const handleDownloadReport = () => {
    const reportContent = `ECOSYSTEM ALIGNMENT REPORT\nGenerated: ${new Date().toLocaleDateString()}\n\n01. NON-NEGOTIABLES\n${selectedEthics.map(id => `- ${ethicsOptions.find(e => e.id === id)?.label}`).join('\n')}\n\n02. STRESS TEST RESULTS\n- ${results.compatibility}\n- ${results.friction}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Hearth_Alignment_Report.txt`;
    link.click();
  };

  const sectors = [
    { name: 'EdTech / Learning Platforms', match: 95, vibe: 'Growth-focused, mission-driven' },
    { name: 'Language Data / AI Training', match: 82, vibe: 'Highly technical, iterative' },
    { name: 'Public Sector Innovation', match: 74, vibe: 'Stable, high-impact' }
  ];

  const steps = [
    { id: 'compass', label: '01. Define Ethics', icon: <Compass className="w-4 h-4" /> },
    { id: 'scout', label: '02. Scout Sectors', icon: <Building2 className="w-4 h-4" /> },
    { id: 'translator', label: '03. Stress Test', icon: <SearchCode className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2 text-teal-400">
          <Target className="w-4 h-4" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Validation Layer</span>
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Ecosystem Alignment</h1>
      </div>

      <div className="flex justify-between mb-16 max-w-2xl mx-auto relative pt-4">
        <div className="absolute top-[2.25rem] left-0 w-full h-[1px] bg-white/5 -z-10" />
        {steps.map((s, idx) => (
          <button 
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className="flex flex-col items-center gap-3 bg-[#1A1423] px-6 transition-all group"
          >
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-black transition-all duration-500 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/20 text-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.4)]' : 'border-white/10 text-gray-700'}`}>
              {s.icon}
            </div>
            <span className={`text-[8px] uppercase tracking-[0.25em] font-black transition-colors ${activeTab === s.id ? 'text-teal-400' : 'text-gray-700'}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {activeTab === 'compass' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
              <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-bold mb-2">The Ethics Compass</h3>
                <p className="text-xs text-gray-500 mb-8 font-light italic">Define your operational non-negotiables.</p>
                <div className="space-y-3">
                  {ethicsOptions.map(option => (
                    <button 
                      key={option.id}
                      onClick={() => toggleEthic(option.id)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${selectedEthics.includes(option.id) ? 'bg-teal-500/10 border-teal-500/30' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedEthics.includes(option.id) ? 'bg-teal-400 text-black' : 'bg-white/5 text-gray-600'}`}>
                          <option.icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${selectedEthics.includes(option.id) ? 'text-white' : 'text-gray-500'}`}>{option.label}</span>
                      </div>
                      {selectedEthics.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 p-8 border border-dashed border-white/5 rounded-3xl flex flex-col justify-center text-center italic text-gray-500 text-sm leading-relaxed font-light">
                "Your ethics aren't just values—they're constraints that protect your focus."
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => setActiveTab('scout')}
                disabled={selectedEthics.length === 0}
                className={`flex items-center gap-4 px-10 py-5 rounded-full bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 ${selectedEthics.length === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
              >
                Continue to Sector Scouting <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-6">
            {sectors.map(sector => (
              <div key={sector.name} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * sector.match) / 100} className="text-teal-400" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">{sector.match}%</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold group-hover:text-teal-400 transition-colors">{sector.name}</h4>
                    <p className="text-xs text-gray-500 italic">{sector.vibe}</p>
                  </div>
                </div>
                <button onClick={() => navigate('/canopy')} className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FF6B35] transition-colors flex items-center gap-2 mt-4 md:mt-0">
                  Explore Market <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
            <div className="flex justify-center pt-8">
              <button onClick={() => setActiveTab('translator')} className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                Proceed to Stress Test <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'translator' && (
          <div className="animate-in zoom-in-95 duration-700 lg:px-20">
            <div className={`bg-white/[0.03] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden transition-all duration-500 ${selectedEthics.length === 0 ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Sparkles className={`w-6 h-6 text-[#FF6B35] ${isAnalyzing ? 'animate-spin' : ''}`} />
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
                  className="w-full h-56 bg-black/40 border border-white/5 rounded-3xl p-8 text-sm text-gray-300 focus:outline-none focus:border-orange-500/20 transition-all mb-8 font-light resize-none shadow-inner"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  {isAnalyzing && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#1A1423]/90 backdrop-blur-md rounded-[2.5rem]">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <Binary className="w-10 h-10 text-teal-400 animate-pulse" />
                        <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Scanning Cultural Syntax</p>
                      </div>
                    </div>
                  )}
                  <div className="bg-teal-500/[0.03] border border-teal-500/10 rounded-[2rem] p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em]">Compatibility Signals</span>
                    </div>
                    <div className="text-xs text-gray-400 font-light italic leading-relaxed">
                      {jobText.length > 5 ? (
                        <div className="flex gap-3 text-white/80">
                          <Zap className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" /> 
                          <span>{results.compatibility}</span>
                        </div>
                      ) : "Awaiting analysis input..."}
                    </div>
                  </div>
                  <div className="bg-red-500/[0.03] border border-red-500/10 rounded-[2rem] p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Operational Friction</span>
                    </div>
                    <div className="text-xs text-gray-400 font-light italic leading-relaxed">
                      {jobText.length > 5 ? (
                        <div className="flex gap-3 text-white/80">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{results.friction}</span>
                        </div>
                      ) : "Waiting for narrative..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {jobText.length > 5 && !isAnalyzing && (
              <div className="mt-16 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex flex-col md:flex-row gap-5">
                  <button onClick={handleDownloadReport} className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    <Download className="w-4 h-4 text-teal-400" /> Download Report
                  </button>
                  <button onClick={() => navigate('/bridge')} className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-[#FF6B35] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-orange-500/20">
                    Enter Linguistic Bridge <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemAlignment;