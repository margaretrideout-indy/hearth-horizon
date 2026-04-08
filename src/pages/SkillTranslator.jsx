import React, { useState } from 'react';
import { Upload, Sparkles, ChevronRight, ArrowRightLeft, FileText, Zap, RefreshCcw } from 'lucide-react';

const SkillTranslator = ({ userTier = 'Seedling' }) => {
  const [activeTool, setActiveTool] = useState('refiner');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleRefine = () => {
    setIsProcessing(true);
    // Logic for jargon-to-value transformation
    setTimeout(() => {
      setResult({
        type: 'refiner',
        output: [
          "Strategized and executed complex program logistics for high-occupancy environments.",
          "Managed multi-stakeholder communications and conflict resolution protocols.",
          "Analyzed performance data to iterate on engagement strategies and curriculum delivery."
        ]
      });
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = (e) => {
    setIsProcessing(true);
    // Logic for PDF Resume Analysis
    setTimeout(() => {
      setResult({
        type: 'analyzer',
        score: 82,
        gaps: ["Agile Methodology", "SaaS Ecosystems", "Product Lifecycle Management"],
        jargonHits: ["Pedagogy", "IEP", "Differentiated Instruction"]
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0810] text-stone-300 font-sans selection:bg-[#149184]/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-[1px] w-8 bg-[#149184]"></div>
              <span className="text-[#149184] text-[10px] font-black uppercase tracking-[0.3em]">The Forge</span>
            </div>
            <h1 className="text-5xl font-bold text-white italic tracking-tighter uppercase">Linguistic Bridge</h1>
            <p className="text-stone-500 italic mt-2 font-light">Transforming academic experience into industry value.</p>
          </div>
          <div className="bg-[#130f1c] border border-stone-800/60 px-6 py-3 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">Current Tier</p>
              <p className="text-[#149184] font-black text-xs uppercase italic">{userTier}</p>
            </div>
            <div className="h-8 w-[1px] bg-stone-800"></div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-stone-500 font-bold">Crossings</p>
              <p className="text-white font-black text-xs uppercase italic">{userTier === 'Seedling' ? '2 / 2' : 'Unlimited'}</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL: INPUT */}
          <div className="bg-[#130f1c] border border-stone-800/40 rounded-[2.5rem] p-8 md:p-10 shadow-2xl flex flex-col min-h-[600px]">
            
            {/* Tool Tabs */}
            <div className="flex gap-8 mb-10 border-b border-stone-800/40">
              <button 
                onClick={() => {setActiveTool('refiner'); setResult(null);}}
                className={`pb-4 text-[10px] tracking-[0.2em] font-black uppercase transition-all flex items-center gap-2 ${activeTool === 'refiner' ? 'text-[#149184] border-b-2 border-[#149184]' : 'text-stone-500 hover:text-stone-300'}`}
              >
                <RefreshCcw size={14} /> Phrase Refiner
              </button>
              <button 
                onClick={() => {setActiveTool('analyzer'); setResult(null);}}
                className={`pb-4 text-[10px] tracking-[0.2em] font-black uppercase transition-all flex items-center gap-2 ${activeTool === 'analyzer' ? 'text-[#149184] border-b-2 border-[#149184]' : 'text-stone-500 hover:text-stone-300'}`}
              >
                <FileText size={14} /> Resume Analyzer
              </button>
            </div>

            <div className="flex-grow flex flex-col">
              {activeTool === 'refiner' ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#149184] font-black mb-4 flex items-center gap-2">
                    <Zap size={12} /> Raw Experience
                  </label>
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full flex-grow bg-[#0a0810] border border-stone-800/60 rounded-2xl p-6 text-stone-300 focus:border-[#149184]/50 focus:ring-0 transition-all resize-none font-light leading-relaxed placeholder:text-stone-700"
                    placeholder="Describe a classroom task, leadership moment, or administrative duty in your own words..."
                  />
                  <button 
                    onClick={handleRefine}
                    disabled={!inputText || isProcessing}
                    className="w-full mt-8 bg-[#149184] hover:bg-[#1bb0a1] disabled:bg-stone-800 disabled:text-stone-600 text-black font-black text-[10px] tracking-[0.2em] py-6 rounded-xl uppercase transition-all shadow-lg shadow-black/40 flex items-center justify-center gap-3"
                  >
                    {isProcessing ? 'Forging...' : 'Refine to Value'} <Sparkles size={16} />
                  </button>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-full">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#149184] font-black mb-4 flex items-center gap-2">
                    <FileText size={12} /> Document Upload
                  </label>
                  <div className="flex-grow border-2 border-dashed border-stone-800/60 rounded-[2rem] flex flex-col items-center justify-center p-12 group hover:border-[#149184]/40 transition-all cursor-pointer bg-[#0a0810]/50 relative overflow-hidden">
                    <input 
                      type="file" 
                      accept=".pdf" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileUpload}
                      disabled={isProcessing}
                    />
                    <div className="bg-[#149184]/5 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Upload className="text-[#149184]" size={40} />
                    </div>
                    <p className="text-white font-bold tracking-tight">Drop your Resume PDF</p>
                    <p className="text-[10px] text-stone-500 mt-2 uppercase tracking-[0.1em]">Analyze for linguistic alignment</p>
                  </div>
                  <div className="mt-8 p-6 bg-[#149184]/5 border border-[#149184]/10 rounded-2xl">
                    <p className="text-xs text-stone-400 leading-relaxed italic text-center font-light">
                      "The Analyzer scans for academic jargon and suggests high-impact corporate equivalents based on your specific background."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: OUTPUT / FORGE */}
          <div className="bg-[#130f1c] border border-stone-800/40 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[600px]">
            
            {!result && !isProcessing && (
              <div className="text-center opacity-40 py-20">
                <ArrowRightLeft size={48} className="mx-auto mb-6 text-stone-700" />
                <h3 className="text-lg font-bold text-stone-600 uppercase tracking-widest">Waiting for Input</h3>
                <p className="text-xs text-stone-700 mt-2 max-w-[240px] mx-auto uppercase tracking-tighter">Enter text or upload a document to begin the crossing.</p>
              </div>
            )}

            {isProcessing && (
              <div className="text-center py-20">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-[#149184]/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#149184] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-[#149184] font-black uppercase tracking-[0.3em] text-sm animate-pulse">Striking the Anvil</h3>
              </div>
            )}

            {result && result.type === 'refiner' && (
              <div className="animate-in zoom-in-95 fade-in duration-700">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#149184] font-black mb-8">Refined Value Statements</h3>
                <div className="space-y-6">
                  {result.output.map((text, i) => (
                    <div key={i} className="group relative bg-[#0a0810] border border-stone-800/40 p-6 rounded-2xl hover:border-[#149184]/30 transition-all">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#149184] opacity-0 group-hover:opacity-100 transition-all"></div>
                      <p className="text-stone-200 font-light leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-12 text-[10px] text-stone-500 hover:text-[#149184] uppercase tracking-widest font-black transition-colors flex items-center gap-2">
                  Copy All to Clipboard <ChevronRight size={14} />
                </button>
              </div>
            )}

            {result && result.type === 'analyzer' && (
              <div className="animate-in zoom-in-95 fade-in duration-700">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#149184] font-black">Bridge Analysis</h3>
                    <p className="text-3xl font-bold text-white italic mt-1 uppercase tracking-tighter">Alignment: {result.score}%</p>
                  </div>
                  <div className="bg-[#149184] text-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter">Strong Match</div>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-black mb-4">Competency Gaps Detected</p>
                    <div className="flex flex-wrap gap-2">
                      {result.gaps.map((gap, i) => (
                        <span key={i} className="bg-red-500/5 border border-red-500/20 text-red-400 text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-tighter">{gap}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-black mb-4">Linguistic Shifts Needed</p>
                    <div className="space-y-3">
                      {result.jargonHits.map((word, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs">
                          <span className="text-stone-500 line-through decoration-red-500/50">{word}</span>
                          <ChevronRight size={12} className="text-[#149184]" />
                          <span className="text-[#149184] font-bold uppercase tracking-widest">Industry Equivalent Found</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Background Texture for Forge */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Sparkles size={200} />
            </div>
          </div>

        </div>

        {/* Footer Guidance */}
        <footer className="mt-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-700 font-bold">Forge your path • Bridge the gap</p>
        </footer>
      </div>
    </div>
  );
};

export default SkillTranslator;