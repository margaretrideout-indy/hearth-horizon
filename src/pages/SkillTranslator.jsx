import React, { useState, useEffect } from 'react';
import { 
  BookOpenText, Sparkles, ArrowRightLeft, 
  Terminal, ArrowRight, Save, Copy, 
  CheckCircle2, Hash, Zap
} from 'lucide-react';

const LinguisticBridge = () => {
  const [vaultData, setVaultData] = useState({});
  const [activeTranslation, setActiveTranslation] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // Load the Rootwork data directly from the vault
  useEffect(() => {
    const saved = localStorage.getItem('rootwork_logs_v3');
    if (saved) {
      setVaultData(JSON.parse(saved));
    }
  }, []);

  // Simple dictionary for the "Translation Engine"
  const translate = (text) => {
    if (!text) return "Awaiting input from The Rootwork...";
    let translated = text.toLowerCase();
    
    const glossary = [
      { find: /teacher|instructor/g, replace: "Subject Matter Expert (SME)" },
      { find: /classroom|students/g, replace: "User Ecosystem" },
      { find: /lesson plan|curriculum/g, replace: "Product Roadmap" },
      { find: /grading|assessment/g, replace: "KPI Tracking & Metrics" },
      { find: /managed/g, replace: "Orchestrated" },
      { find: /parents|stakeholders/g, replace: "External Stakeholders" }
    ];

    glossary.forEach(item => {
      translated = translated.replace(item.find, item.replace);
    });

    return translated.charAt(0).toUpperCase() + translated.slice(1);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <ArrowRightLeft className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Linguistic Bridge</span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white">Semantic Translator</h1>
          <p className="text-sm text-gray-500 italic mt-1">Converting education legacy into tech-industry syntax.</p>
        </div>

        <div className="flex items-center gap-3">
            <div className="text-[9px] font-bold text-teal-500/50 uppercase tracking-widest bg-teal-500/5 px-3 py-2 rounded-lg border border-teal-500/10">
                Engine Status: Online
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: THE SOURCE (Vault Entries) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-4 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" /> Source Material (The Vault)
          </h2>
          
          {Object.keys(vaultData).length > 0 ? Object.entries(vaultData).map(([key, value]) => (
            value && (
              <button 
                key={key}
                onClick={() => setActiveTranslation({ key, value })}
                className={`w-full text-left p-6 rounded-2xl border transition-all group ${activeTranslation?.key === key ? 'bg-white/[0.05] border-teal-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
              >
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-bold text-teal-400/40 uppercase tracking-widest">{key.toUpperCase()}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activeTranslation?.key === key ? 'translate-x-1 text-teal-400' : 'text-gray-700'}`} />
                </div>
                <p className="text-xs text-gray-400 font-light italic line-clamp-2 leading-relaxed">
                  "{value}"
                </p>
              </button>
            )
          )) : (
            <div className="p-8 border border-dashed border-white/5 rounded-2xl text-center">
                <p className="text-xs text-gray-600 italic">No Rootwork logs detected. Complete an audit to begin.</p>
            </div>
          )}
        </div>

        {/* RIGHT: THE TRANSLATOR (The Laboratory) */}
        <div className="lg:col-span-7">
          <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-10 sticky top-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 opacity-[0.02] pointer-events-none">
                <Zap className="w-80 h-80" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight">Translation Engine</h3>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Refining Professional Narrative</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* INPUT SECTION */}
                    <div>
                        <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-3 ml-1">Legacy Input</label>
                        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-gray-400 leading-relaxed font-light italic">
                            {activeTranslation?.value || "Select a source entry from your Vault to begin translation."}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-px h-8 bg-gradient-to-b from-teal-500/50 to-transparent" />
                    </div>

                    {/* OUTPUT SECTION */}
                    <div>
                        <label className="text-[9px] font-black text-teal-500 uppercase tracking-widest block mb-3 ml-1">Tech Syntax Output</label>
                        <div className="bg-teal-500/[0.03] border border-teal-500/20 rounded-2xl p-8 relative group">
                            <p className="text-base font-medium text-white leading-relaxed mb-6">
                                {translate(activeTranslation?.value)}
                            </p>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-teal-500/10">
                                <div className="flex gap-2">
                                    <span className="text-[8px] font-bold bg-teal-500/10 text-teal-400 px-2 py-1 rounded uppercase tracking-widest">#SME</span>
                                    <span className="text-[8px] font-bold bg-teal-500/10 text-teal-400 px-2 py-1 rounded uppercase tracking-widest">#Roadmap</span>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => copyToClipboard(translate(activeTranslation?.value))}
                                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all flex items-center gap-2"
                                    >
                                        {isCopied ? <CheckCircle2 className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4" />}
                                        <span className="text-[9px] font-bold uppercase tracking-widest">Copy</span>
                                    </button>
                                    <button className="p-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white transition-all flex items-center gap-2">
                                        <Save className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Save Draft</span>
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