import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, Terminal, ArrowRight, Save, Copy, 
  CheckCircle2, Sparkles, BookOpen, Search, Zap, Repeat
} from 'lucide-react';

const LinguisticBridge = () => {
  const [viewMode, setViewMode] = useState('vault'); // 'vault' or 'jargon'
  const [vaultData, setVaultData] = useState({});
  const [activeTranslation, setActiveTranslation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [jargonInput, setJargonInput] = useState('');

  // Jargon-to-Value Dictionary
  const jargonLibrary = {
    "differentiated instruction": "User-Centric Personalization & Adaptive Strategy",
    "classroom management": "Operational Orchestration & Conflict Resolution",
    "lesson planning": "Iterative Product Roadmap Design",
    "parent-teacher conferences": "External Stakeholder Alignment",
    "standardized testing": "KPI Benchmarking & Data Validation",
    "iep development": "Tailored Solutions Architecture",
    "professional development": "Internal Capability Building",
    "curriculum design": "Strategic Content Frameworks",
    "student engagement": "User Retention & Experience Optimization"
  };

  useEffect(() => {
    const saved = localStorage.getItem('rootwork_logs_v3');
    if (saved) setVaultData(JSON.parse(saved));
  }, []);

  const translate = (text) => {
    if (!text) return "Awaiting input...";
    let translated = text.toLowerCase();
    
    const glossary = [
      { find: /teacher|instructor/g, replace: "SME (Subject Matter Expert)" },
      { find: /classroom|students/g, replace: "User Ecosystem" },
      { find: /lesson plan|curriculum/g, replace: "Product Roadmap" },
      { find: /grading|assessment/g, replace: "Performance Metrics" },
      { find: /managed/g, replace: "Orchestrated" }
    ];

    glossary.forEach(item => {
      translated = translated.replace(item.find, item.replace);
    });
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };

  const getJargonValue = (input) => {
    const key = input.toLowerCase().trim();
    return jargonLibrary[key] || "No direct match in the current syntax library. Try 'Curriculum Design' or 'Lesson Planning'.";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      
      {/* HEADER & TOGGLE */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">The Bridge</span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Semantic Translator</h1>
        </div>

        <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          <button 
            onClick={() => setViewMode('vault')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'vault' ? 'bg-[#FF6B35] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Repeat className="w-3.5 h-3.5" /> Vault Transformer
          </button>
          <button 
            onClick={() => setViewMode('jargon')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'jargon' ? 'bg-[#FF6B35] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Jargon Engine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: INPUT SOURCE */}
        <div className="lg:col-span-5 space-y-4">
          {viewMode === 'vault' ? (
            <>
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> Source Material (The Vault)
              </h2>
              {Object.entries(vaultData).map(([key, value]) => value && (
                <button 
                  key={key}
                  onClick={() => setActiveTranslation({ key, value })}
                  className={`w-full text-left p-6 rounded-2xl border transition-all group ${activeTranslation?.key === key ? 'bg-white/[0.05] border-teal-500/30' : 'bg-white/[0.02] border-white/5'}`}
                >
                  <span className="text-[9px] font-bold text-teal-400/40 uppercase tracking-widest mb-2 block">{key}</span>
                  <p className="text-xs text-gray-400 font-light italic line-clamp-2 leading-relaxed">"{value}"</p>
                </button>
              ))}
            </>
          ) : (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-6 flex items-center gap-2">
                <Search className="w-3.5 h-3.5" /> Jargon Lookup
              </h2>
              <input 
                type="text"
                value={jargonInput}
                onChange={(e) => setJargonInput(e.target.value)}
                placeholder="Ex: Differentiated Instruction..."
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-teal-500/30 transition-all mb-4"
              />
              <div className="space-y-2 opacity-40">
                <p className="text-[9px] font-bold text-gray-500 uppercase">Popular Terms:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(jargonLibrary).slice(0, 4).map(k => (
                    <button key={k} onClick={() => setJargonInput(k)} className="text-[9px] bg-white/5 px-2 py-1 rounded hover:bg-white/10">{k}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: THE TRANSLATOR */}
        <div className="lg:col-span-7">
          <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                <Zap className="w-80 h-80" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Translation Laboratory</h3>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">Semantic Power: High</p>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* INPUT SECTION */}
                    <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-800 to-transparent rounded-full" />
                        <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-4 ml-2">Legacy Context</label>
                        <div className="bg-black/20 border border-white/5 rounded-2xl p-6 text-sm text-gray-500 font-light italic">
                            {viewMode === 'vault' ? (activeTranslation?.value || "Select a Vault entry...") : (jargonInput || "Enter education jargon...")}
                        </div>
                    </div>

                    {/* OUTPUT SECTION */}
                    <div className="relative">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-transparent rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                        <label className="text-[9px] font-black text-teal-500 uppercase tracking-widest block mb-4 ml-2">Tech-Speak Result</label>
                        <div className="bg-teal-500/[0.04] border border-teal-500/20 rounded-3xl p-8 transition-all">
                            <p className="text-xl font-medium text-white leading-relaxed mb-8">
                                {viewMode === 'vault' ? translate(activeTranslation?.value) : getJargonValue(jargonInput)}
                            </p>
                            
                            <div className="flex items-center justify-between pt-8 border-t border-teal-500/10">
                                <div className="flex gap-2">
                                    <span className="text-[9px] font-bold bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg uppercase tracking-widest">#SME</span>
                                    <span className="text-[9px] font-bold bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg uppercase tracking-widest">#Product</span>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                      onClick={() => copyToClipboard(viewMode === 'vault' ? translate(activeTranslation?.value) : getJargonValue(jargonInput))}
                                      className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
                                    >
                                        {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        {isCopied ? "Copied" : "Copy Syntax"}
                                    </button>
                                    <button className="flex items-center gap-2 bg-[#FF6B35] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                                        <Save className="w-3.5 h-3.5" /> Save to Resume
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinguisticBridge;