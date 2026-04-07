import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, ShieldCheck, SearchCode, 
  ArrowRight, Zap, Target, AlertTriangle, 
  CheckCircle2, Globe, Building2, ChevronRight,
  ShieldAlert, Sparkles, Binary, Info, Download
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

  // Trigger simulated analysis when jobText changes
  useEffect(() => {
    if (jobText.length > 10) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 2500); 
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

  const handleDownloadReport = () => {
    const reportContent = `
ECOSYSTEM ALIGNMENT REPORT
Generated on: ${new Date().toLocaleDateString()}

01. VERIFIED NON-NEGOTIABLES
${selectedEthics.map(id => `- ${ethicsOptions.find(e => e.id === id)?.label}`).join('\n')}

02. TOP ECOSYSTEM MATCH
- ${sectors[0].name} (${sectors[0].match}% Alignment)
- Vibe: ${sectors[0].vibe}

03. CULTURAL STRESS TEST SUMMARY
- Compatibility: High alignment with ${getEthicLabel(0)}
- Friction Alert: Review required for ${getEthicLabel(selectedEthics.length - 1)}

-----------------------------------------
This report is a digital artifact of the Hearth Ecosystem.
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hearth_Alignment_Report.txt`;
    link.click();
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

  const getEthicLabel = (index) => {
    const id = selectedEthics[index];
    const option = ethicsOptions.find(e => e.id === id);
    return option ? option.label : "Core Values";
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2 text-teal-400">
          <Target className="w-4 h-4 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Validation Layer</span>
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Ecosystem Alignment</h1>
      </div>

      {/* STEP PROGRESS TRACKER */}
      <div className="flex justify-between mb-16 max-w-2xl mx-auto relative pt-4">
        <div className="absolute top-[2.25rem] left-0 w-full h-[1px] bg-white/5 -z-10" />
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <button 
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
            {idx < steps.length - 1 && (
              <div className="hidden md:flex items-center pt-2 opacity-10">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* STEP 1: COMPASS */}
        {activeTab === 'compass' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
              <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-bold mb-2 text-white">The Ethics Compass</h3>
                <p className="text-xs text-gray-500 mb-8 font-light italic">Define your operational non-negotiables.</p>
                
                <div className="space-y-3">
                  {ethicsOptions.map(option => (
                    <button 
                      key={option.id}
                      onClick={() => toggleEthic(option.id)}
                      className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${selectedEthics.includes(option.id) ? 'bg-teal-500/10 border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.05)]' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
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
              </div>
              <div className="lg:col-span-5 p-8 border border-dashed border-white/5 rounded-3xl flex flex-col justify-center text-center italic text-gray-500 text-sm">
                "Your ethics aren't just values—they're constraints that protect your focus."
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => setActiveTab('scout')}
                className={`flex items-center gap-4 px-10 py-5 rounded-full bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/20 ${selectedEthics.length === 0 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                disabled={selectedEthics.length === 0}
              >
                Continue to Sector Scouting <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCOUTING */}
        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {sectors.map(sector => (
                <div 
                  key={sector.name} 
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.04] hover:border-teal-500/40 transition-all duration-500 cursor-default"
                >
                  <div className="flex items-center gap-8 mb-4 md:mb-0">
                    <div className="relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * sector.match) / 100} className="text-teal-400" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{sector.match}%</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white mb-1 group-hover:text-teal-400 transition-colors">{sector.name}</h4>
                      <p className="text-xs text-gray-500 italic mb-3">{sector.vibe}</p>
                      <div className="flex gap-2">
                        {sector.tags.map(tag => (
                          <span key={tag} className="text-[8px] font-bold bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/5 uppercase tracking-tighter">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => navigate('/canopy')} className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FF6B35] transition-colors flex items-center gap-2 group/btn">
                    Explore Market <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setActiveTab('translator')}
                className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white/10 hover:border-teal-500/40"
              >
                Proceed to Stress Test <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TRANSLATOR */}
        {activeTab === 'translator' && (
          <div className="animate-in zoom-in-95 duration-700 lg:px-20">
            {selectedEthics.length === 0 && (
              <div className="mb-8 flex items-center gap-4 p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                <Info className="w-5 h-5 text-orange-400" />
                <p className="text-[10px] font-bold text-orange-200 uppercase tracking-widest leading-relaxed">
                  No Ethics detected. <button onClick={() => setActiveTab('compass')} className="underline">Define your Compass</button> in Step 01 to begin.
                </p>
              </div>
            )}

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
                  className="w-full h-56 bg-black/40 border border-white/5 rounded-3xl p-8 text-sm text-gray-300 focus:outline-none focus:border-orange-500/20 transition-all mb-8 font-light shadow-inner resize-none"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                  {isAnalyzing && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#1A1423]/90 backdrop-blur-md rounded-[2.5rem] animate-in fade-in duration-300">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <Binary className="w-10 h-10 text-teal-400 animate-pulse" />
                        <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Scanning Cultural Syntax</p>
                      </div>
                    </div>
                  )}

                  {/* SIGNALS */}
                  <div className="bg-teal-500/[0.03] border border-teal-500/10 rounded-[2rem] p-8 group transition-all hover:bg-teal-500/[0.05]">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      <span className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em]">Compatibility Signals</span>
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed font-light italic">
                      {jobText.length > 5 ? (
                        <div className="flex gap-3 text-white/80">
                          <Zap className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" /> 
                          <span>Alignment detected with <span className="text-teal-400 font-bold uppercase tracking-tighter">"{getEthicLabel(0)}"</span>. The operational language matches your requirements.</span>
                        </div>
                      ) : "Awaiting analysis input..."}
                    </div>
                  </div>

                  {/* FRICTION */}
                  <div className="bg-red-500/[0.03] border border-red-500/10 rounded-[2rem] p-8 group transition-all hover:bg-red-500/[0.05]">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Operational Friction</span>
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed font-light italic">
                      {jobText.length > 5 ? (
                        <div className="flex gap-3 text-white/80">
                          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>Possible conflict with <span className="text-red-400 font-bold uppercase tracking-tighter">"{getEthicLabel(selectedEthics.length - 1)}"</span>. Terms like "fast-paced" may indicate boundary issues.</span>
                        </div>
                      ) : "Waiting for narrative..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DOWNLOAD & NEXT STEP SECTION */}
            {jobText.length > 5 && !isAnalyzing && (
              <div className="mt-16 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="w-24 h-[1px] bg-white/10 mb-8" />
                
                <div className="text-center mb-10">
                  <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mb-3">Validation Cycle Complete</p>
                  <h4 className="text-lg font-serif italic text-gray-400">Your alignment artifacts are ready.</h4>
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                  <button 
                    onClick={handleDownloadReport}
                    className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all group"
                  >
                    <Download className="w-4 h-4 text-teal-400 group-hover:translate-y-0.5 transition-transform" />
                    Download Alignment Report
                  </button>

                  <button 
                    onClick={() => navigate('/bridge')}
                    className="flex items-center gap-4 px-10 py-5 rounded-2xl bg-[#FF6B35] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                  >
                    Enter Linguistic Bridge
                    <ArrowRight className="w-4 h-4" />
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