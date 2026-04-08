import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, Terminal, ArrowRight, Save, Copy, 
  CheckCircle2, Sparkles, BookOpen, Search, Zap, Repeat
} from 'lucide-react';

const LinguisticBridge = () => {
  const [viewMode, setViewMode] = useState('vault'); 
  const [vaultData, setVaultData] = useState({});
  const [activeTranslation, setActiveTranslation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [jargonInput, setJargonInput] = useState('');

  const jargonLibrary = {
    "customer service": "Experience Optimization & Conflict Resolution",
    "team management": "Operational Orchestration & Resource Allocation",
    "project planning": "Strategic Roadmap Design & Execution",
    "training staff": "Internal Capability Building & Knowledge Transfer",
    "budgeting": "Fiscal Governance & Capital Optimization",
    "scheduling": "Logistical Synchronization",
    "problem solving": "Root Cause Analysis & Solution Architecture",
    "public speaking": "High-Impact Stakeholder Communication",
    "inventory management": "Supply Chain Integrity & Asset Oversight"
  };

  useEffect(() => {
    const saved = localStorage.getItem('rootwork_logs_v3');
    if (saved) setVaultData(JSON.parse(saved));
  }, []);

  const translate = (text) => {
    if (!text) return "Awaiting input...";
    let translated = text.toLowerCase();
    
    const glossary = [
      { find: /helped|assisted/g, replace: "facilitated" },
      { find: /did|worked on/g, replace: "executed" },
      { find: /started|made/g, replace: "pioneered" },
      { find: /managed|led/g, replace: "orchestrated" },
      { find: /watched|checked/g, replace: "audited" },
      { find: /customers|clients|people/g, replace: "end-users" },
      { find: /problem|issue/g, replace: "operational friction" },
      { find: /plan|schedule/g, replace: "strategic roadmap" },
      { find: /meeting|talk/g, replace: "stakeholder alignment" },
      { find: /rules|policy/g, replace: "governance framework" },
      { find: /trained|showed/g, replace: "upskilled" }
    ];

    glossary.forEach(item => {
      translated = translated.replace(item.find, item.replace);
    });
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };

  const getJargonValue = (input) => {
    const key = input.toLowerCase().trim();
    return jargonLibrary[key] || "Optimization logic ready. Try terms like 'management' or 'planning'.";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-12 text-slate-100 font-sans pb-32">
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-3 text-teal-400">
            <ArrowRightLeft className="w-4 h-4 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">The Bridge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight text-slate-100">Semantic Translator</h1>
        </div>

        <div className="flex bg-[#251D2F] p-1.5 rounded-2xl border border-white/5 shadow-xl">
          <button 
            onClick={() => setViewMode('vault')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${viewMode === 'vault' ? 'bg-[#FF6B35] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Repeat className="w-3.5 h-3.5" /> Vault Transformer
          </button>
          <button 
            onClick={() => setViewMode('jargon')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${viewMode === 'jargon' ? 'bg-[#FF6B35] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Jargon Engine
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
        
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 px-2 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" /> Source Material
          </h2>
          
          {viewMode === 'vault' ? (
            <div className="space-y-3">
              {Object.keys(vaultData).length > 0 ? (
                Object.entries(vaultData).map(([key, value]) => value && (
                  <button 
                    key={key}
                    onClick={() => setActiveTranslation({ key, value })}
                    className={`w-full text-left p-6 rounded-2xl border transition-all active:scale-[0.98] group ${activeTranslation?.key === key ? 'bg-[#2D243A] border-teal-500/40 shadow-lg' : 'bg-[#251D2F] border-white/5 hover:border-teal-500/20'}`}
                  >
                    <span className="text-[9px] font-bold text-teal-400 uppercase tracking-[0.2em] mb-2 block">{key}</span>
                    <p className="text-xs text-slate-400 font-light italic line-clamp-2 leading-relaxed group-hover:text-slate-200 transition-colors">"{value}"</p>
                  </button>
                ))
              ) : (
                <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center">
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">No Logs Found in Rootwork</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#251D2F] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
              <input 
                type="text"
                value={jargonInput}
                onChange={(e) => setJargonInput(e.target.value)}
                placeholder="Ex: Team Management..."
                className="w-full bg-[#1A1423] border border-white/10 rounded-xl p-5 text-sm text-slate-200 focus:outline-none focus:border-teal-500/30 transition-all mb-6 placeholder:text-slate-700"
              />
              <div className="space-y-3">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest ml-1">Universal Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(jargonLibrary).slice(0, 5).map(k => (
                    <button 
                      key={k} 
                      onClick={() => setJargonInput(k)} 
                      className="text-[9px] font-bold bg-[#1A1423] text-slate-500 border border-white/5 px-3 py-2 rounded-lg hover:text-teal-400 hover:border-teal-500/30 transition-all uppercase tracking-tighter"
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[#2D243A] border border-purple-500/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl min-h-[500px]">
            <div className="absolute -right-20 -top-20 opacity-[0.05] pointer-events-none text-teal-400">
                <Zap className="w-96 h-96" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1423] border border-teal-500/20 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold italic text-slate-100">The Lab</h3>
                  <p className="text-[9px] font-black text-teal-500/60 uppercase tracking-[0.3em]">Processing Logic: Active</p>
                </div>
              </div>

              <div className="space-y-12 flex-grow">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800 rounded-full" />
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-4">Legacy Syntax</label>
                  <div className="bg-[#1A1423] border border-white/5 rounded-2xl p-6 text-sm text-slate-500 font-light italic min-h-[80px]">
                    {viewMode === 'vault' ? (activeTranslation?.value || "Select material to optimize...") : (jargonInput || "Enter professional context...")}
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
                  <label className="text-[9px] font-black text-teal-500 uppercase tracking-widest block mb-4">Optimized Capability</label>
                  <div className="bg-[#1A1423]/60 border border-teal-500/20 rounded-[2rem] p-8 transition-all">
                    <p className="text-2xl font-bold italic text-slate-100 leading-snug mb-8">
                      {viewMode === 'vault' ? translate(activeTranslation?.value) : getJargonValue(jargonInput)}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
                      <div className="flex gap-2">
                        <span className="text-[8px] font-black bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full uppercase tracking-widest border border-teal-500/20">Market-Aligned</span>
                        <span className="text-[8px] font-black bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full uppercase tracking-widest border border-purple-500/20">Scalable</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => copyToClipboard(viewMode === 'vault' ? translate(activeTranslation?.value) : getJargonValue(jargonInput))}
                          className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-teal-400 transition-colors uppercase tracking-widest active:scale-95"
                        >
                          {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {isCopied ? "Synced" : "Copy"}
                        </button>
                        <button className="flex items-center gap-3 bg-[#FF6B35] px-6 py-4 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-[#ff8255] transition-all active:scale-95 shadow-lg shadow-orange-900/20">
                          <Save className="w-4 h-4" /> Save to Resume
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