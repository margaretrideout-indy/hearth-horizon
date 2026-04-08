import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Cloud, Waves, 
  Flame, Anchor, 
  ArrowRight, History, LayoutDashboard,
  CheckCircle2, Loader2, Sparkles
} from 'lucide-react';

const HorizonAudit = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const emotionalStates = [
    { id: 'hopeful', label: 'Hopeful', icon: Sprout, color: 'text-teal-400', bg: 'bg-teal-400/20' },
    { id: 'anxious', label: 'Anxious', icon: Waves, color: 'text-blue-300', bg: 'bg-blue-400/20' },
    { id: 'uncertain', label: 'Uncertain', icon: Cloud, color: 'text-slate-400', bg: 'bg-slate-400/20' },
    { id: 'driven', label: 'Driven', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/20' },
    { id: 'grounded', label: 'Grounded', icon: Anchor, color: 'text-amber-400', bg: 'bg-amber-600/20' }
  ];

  const handleCommit = () => {
    if (!selectedEmoji || !reflection) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      setReflection('');
      
      setTimeout(() => {
        setHasSubmitted(false);
        setSelectedEmoji(null);
      }, 4000);
    }, 1500);
  };

  const recentPulses = [
    { date: 'APR 7', status: 'Hopeful', note: 'Feeling like I finally found a path forward.', icon: Sprout },
    { date: 'APR 7', status: 'Anxious', note: 'Navigating the technical shift feels heavy today.', icon: Waves },
    { date: 'APR 6', status: 'Uncertain', note: 'Questioning the bridge between curriculum and data.', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 md:p-12 text-slate-100 font-sans pb-32">
      
      {/* HEADER SECTION */}
      <div className="mb-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-3 text-teal-400">
          <History className="w-4 h-4 shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Identity Foundation</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold italic tracking-tight text-slate-100">The Rootwork</h1>
        <p className="text-slate-400 text-sm mt-3 italic font-light max-w-xl leading-relaxed">
          "The growth is invisible before it is inevitable."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        
        {/* LEFT: THE PULSE INPUT */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-[#251D2F] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-teal-500/80 mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Daily Pulse Check
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
              {emotionalStates.map((state) => (
                <button
                  key={state.id}
                  disabled={isSubmitting}
                  onClick={() => setSelectedEmoji(state.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 transform ${
                    selectedEmoji === state.id 
                    ? `bg-teal-400/10 border-teal-500/40 shadow-[0_0_25px_rgba(45,212,191,0.1)] scale-105` 
                    : 'bg-[#1A1423] border-white/5 hover:border-teal-500/20'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedEmoji === state.id ? state.bg : 'bg-white/5'
                  }`}>
                    <state.icon className={`w-5 h-5 transition-colors ${
                      selectedEmoji === state.id ? state.color : 'text-slate-500'
                    }`} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${
                    selectedEmoji === state.id ? 'text-slate-100' : 'text-slate-600'
                  }`}>
                    {state.label}
                  </span>
                </button>
              ))}
            </div>

            <textarea 
              value={reflection}
              disabled={isSubmitting}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What shifted in your legacy narrative today?"
              className="w-full h-48 bg-[#1A1423] border border-white/10 rounded-2xl p-6 text-sm text-slate-200 focus:outline-none focus:border-teal-500/30 transition-all mb-8 font-light resize-none placeholder:text-slate-700 disabled:opacity-50 shadow-inner"
            />

            <button 
              onClick={handleCommit}
              disabled={isSubmitting || !selectedEmoji || !reflection}
              className={`w-full md:w-auto flex items-center justify-center gap-4 px-10 py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                hasSubmitted 
                ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
                : 'bg-teal-600 text-slate-100 hover:bg-teal-500 shadow-lg shadow-teal-900/20'
              } disabled:opacity-30 active:scale-95`}
            >
              {isSubmitting ? (
                <>Synthesizing... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : hasSubmitted ? (
                <>Pulse Synced <CheckCircle2 className="w-4 h-4" /></>
              ) : (
                <>Sync Pulse <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* GROWTH LOG */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-4">Growth Log</h3>
            <div className="space-y-3">
              {recentPulses.map((pulse, idx) => (
                <div key={idx} className="bg-[#251D2F] border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-teal-500/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center w-10">
                      <pulse.icon className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <p className="text-xs text-slate-300 font-light italic leading-relaxed">"{pulse.note}"</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 tracking-widest">{pulse.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: ECOSYSTEM STATUS */}
        <div className="lg:col-span-5">
          <div className="sticky top-12">
            <div className="bg-[#2D243A] border border-purple-500/20 rounded-[2.5rem] p-10 shadow-2xl relative group overflow-hidden">
              {/* Founder Glow Effect */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-teal-500/5 transition-all duration-1000" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1423] border border-teal-500/20 flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  <LayoutDashboard className="w-7 h-7 text-teal-400" />
                </div>
                
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 mb-2">Network Intelligence</h4>
                <h2 className="text-3xl font-extrabold italic text-slate-100 leading-tight mb-8">Mycelium Status: <br/>Active</h2>

                <div className="p-6 rounded-xl bg-[#1A1423] border border-white/5 mb-8 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                    <span>Stability Index</span>
                    <span className="text-teal-400">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 w-[88%] shadow-[0_0_15px_rgba(45,212,191,0.4)]" />
                  </div>
                  <div className="flex items-start gap-2 text-[10px] text-slate-500 italic">
                    <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                    <p>Identity Audit: Reflections currently align with "Mission-Driven" sector profiles.</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/mycelium')}
                  className="group w-full py-5 rounded-xl bg-teal-600 text-slate-100 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-500 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-teal-900/20"
                >
                  Enter The Map
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizonAudit;