import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Compass, ShieldCheck, SearchCode, ArrowRight, Zap, Target, 
  AlertTriangle, CheckCircle2, Globe, Building2, ChevronRight,
  ShieldAlert, Sparkles, Binary, Download, Trees, Mountain, Binoculars
} from 'lucide-react';

const EcosystemAlignment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('compass');
  const [jobText, setJobText] = useState('');
  const [selectedEthics, setSelectedEthics] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AUTHENTICATION & STEWARD GATE
  const { data: user, isLoading } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false
  });

  // DEVELOPER OVERRIDE: Gate is currently set to 'true' for unrestricted access.
  const isAuthorized = true; 
  /*
  const userEmail = user?.email?.toLowerCase() || '';
  const isAdmin = userEmail === 'margaretpardy@gmail.com'; 
  const isAuthorized = isAdmin || user?.subscription_tier === 'Steward' || user?.subscription_tier === 'Hearthkeeper';
  */

  const ethicsOptions = [
    { id: 'remote', label: 'Remote-First / Async Operations', icon: Globe },
    { id: 'mission', label: 'Equity-Focused / Social Impact', icon: ShieldCheck },
    { id: 'balance', label: 'Hard Work-Life Equilibrium', icon: Zap },
    { id: 'autonomy', label: 'High Individual Autonomy', icon: Binary },
    { id: 'transparency', label: 'Radical Salary/Role Transparency', icon: CheckCircle2 }
  ];

  // DYNAMIC SECTOR LOGIC: Reacts to client choices in Stage 01
  const getDynamicSectors = () => {
    const baseSectors = [
      { name: 'EdTech / Learning Platforms', base: 65, modifiers: ['mission', 'remote'], vibe: 'Growth-focused, mission-driven' },
      { name: 'Language Data / AI Training', base: 60, modifiers: ['remote', 'autonomy'], vibe: 'Highly technical, iterative' },
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

  useEffect(() => {
    const saved = localStorage.getItem('alignment_ethics_v1');
    if (saved) setSelectedEthics(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (jobText.length > 20) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => setIsAnalyzing(false), 2000); 
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

  const runScanner = () => {
    if (jobText.length < 10) return { compatibility: null, friction: null };
    const lowercase = jobText.toLowerCase();
    const activeEthics = ethicsOptions.filter(o => selectedEthics.includes(o.id));
    const matched = activeEthics.find(o => o.label.toLowerCase().includes(lowercase) || lowercase.includes('remote') || lowercase.includes('impact'));
    const frictionKeywords = ['fast-paced', 'high-pressure', 'hustle', 'urgent', 'always-on'];
    const hasFriction = frictionKeywords.some(k => lowercase.includes(k));

    return {
      compatibility: matched ? `Alignment detected with your Clearing values.` : "General ecosystem alignment detected.",
      friction: hasFriction ? "Operational Friction: High-velocity keywords detected." : "No significant cultural red flags found."
    };
  };

  const results = runScanner();

  const handleDownloadReport = () => {
    const reportContent = `ECOSYSTEM ALIGNMENT REPORT\nGenerated: ${new Date().toLocaleDateString()}\n\n01. THE CLEARING\n${selectedEthics.map(id => `- ${ethicsOptions.find(e => e.id === id)?.label}`).join('\n')}\n\n02. COMPASS RESULTS\n- ${results.compatibility}\n- ${results.friction}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Hearth_Alignment_Report.txt`;
    link.click();
  };

  const steps = [
    { id: 'compass', label: '01. The Clearing', icon: <Trees className="w-4 h-4" /> },
    { id: 'scout', label: '02. The Wilds', icon: <Mountain className="w-4 h-4" /> },
    { id: 'translator', label: '03. The Compass', icon: <Compass className="w-4 h-4" /> }
  ];

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2 text-teal-400">
          <Target className="w-4 h-4" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Validation Layer</span>
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Ecosystem Alignment</h1>
      </div>

      {/* Navigation flow with Sequence Arrows */}
      <div className="flex items-center justify-center mb-16 max-w-4xl mx-auto">
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <button 
              onClick={() => setActiveTab(s.id)}
              className="flex flex-col items-center gap-3 px-6 transition-all group"
            >
              <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-700 ${activeTab === s.id ? 'border-teal-400 bg-teal-400/20 text-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.3)]' : 'border-white/5 bg-white/[0.02] text-gray-700'}`}>
                {s.icon}
              </div>
              <span className={`text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${activeTab === s.id ? 'text-teal-400' : 'text-gray-700'}`}>
                {s.label}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div className="flex-1 flex justify-center items-center opacity-20">
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
              <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-[3rem] p-10 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">The Clearing</h3>
                <p className="text-xs text-gray-500 mb-8 font-light italic">Identify the core values that will ground your transition.</p>
                <div className="space-y-4">
                  {ethicsOptions.map(option => (
                    <button 
                      key={option.id}
                      onClick={() => toggleEthic(option.id)}
                      className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${selectedEthics.includes(option.id) ? 'bg-teal-500/10 border-teal-400/40' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedEthics.includes(option.id) ? 'bg-teal-400 text-black' : 'bg-white/5 text-gray-600'}`}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${selectedEthics.includes(option.id) ? 'text-white' : 'text-gray-500'}`}>{option.label}</span>
                      </div>
                      {selectedEthics.includes(option.id) && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 flex items-center justify-center p-12 border border-dashed border-white/5 rounded-[3rem] italic text-gray-500 text-sm text-center leading-relaxed font-light">
                "Finding your Clearing is about establishing the non-negotiables that protect your energy during the crossing."
              </div>
            </div>
            <div className="mt-16 flex justify-center">
              <button onClick={() => setActiveTab('scout')} className="flex items-center gap-4 px-12 py-6 rounded-full bg-[#FF6B35] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all">
                Step into The Wilds <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'scout' && (
          <div className="animate-in fade-in duration-700 space-y-6">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.4em] text-teal-400 font-black mb-2">Market Topography</p>
              <p className="text-xs text-gray-500 italic">Alignment results based on your Clearing choices:</p>
            </div>
            {sectors.map(sector => (
              <div key={sector.name} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-8">
                  <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 - (175.9 * sector.match) / 100} className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black">{sector.match}%</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold group-hover:text-teal-400 transition-colors">{sector.name}</h4>
                    <p className="text-xs text-gray-500 italic font-light">{sector.vibe}</p>
                  </div>
                </div>
                <button className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#FF6B35] transition-colors flex items-center gap-3 mt-6 md:mt-0">
                  <Binoculars className="w-4 h-4" /> Scout Landscape
                </button>
              </div>
            ))}
            <div className="flex justify-center pt-12">
              <button onClick={() => setActiveTab('translator')} className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                Consult The Compass <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'translator' && (
          <div className="animate-in zoom-in-95 duration-700">
            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 relative">
               <div className="flex items-center gap-5 mb-10">
                 <div className="w-14 h-14 rounded-2xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                   <Compass className="w-7 h-7" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold tracking-tight">The Compass</h3>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tactical Stress-Test of Sector Narratives</p>
                 </div>
               </div>
               <textarea 
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  placeholder="Paste a job description or company values statement here..."
                  className="w-full h-64 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-sm text-gray-300 focus:outline-none focus:border-teal-400/30 transition-all mb-8 font-light resize-none leading-relaxed"
                />
                {jobText.length > 5 && !isAnalyzing && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
                    <div className="bg-teal-500/5 border border-teal-500/20 p-6 rounded-2xl">
                      <div className="flex gap-2 text-teal-400 text-[10px] font-black uppercase mb-3"><CheckCircle2 className="w-3 h-3"/> Compatibility</div>
                      <p className="text-xs italic text-gray-300">{results.compatibility}</p>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
                      <div className="flex gap-2 text-red-400 text-[10px] font-black uppercase mb-3"><AlertTriangle className="w-3 h-3"/> Potential Friction</div>
                      <p className="text-xs italic text-gray-300">{results.friction}</p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemAlignment;