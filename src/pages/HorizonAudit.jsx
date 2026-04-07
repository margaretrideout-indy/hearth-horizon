import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Cloud, Waves, 
  Flame, Anchor, 
  ArrowRight, History, LayoutDashboard,
  CheckCircle2, Loader2
} from 'lucide-react';

const Rootwork = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // HIGH-CONTRAST LUMINOUS PALETTE
  const emotionalStates = [
    { id: 'hopeful', label: 'Hopeful', icon: Sprout, color: 'text-[#2DD4BF]', bg: 'bg-[#2DD4BF]/20' },
    { id: 'anxious', label: 'Anxious', icon: Waves, color: 'text-blue-300', bg: 'bg-blue-400/20' },
    { id: 'uncertain', label: 'Uncertain', icon: Cloud, color: 'text-gray-100', bg: 'bg-gray-400/20' },
    { id: 'driven', label: 'Driven', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/20' },
    { id: 'grounded', label: 'Grounded', icon: Anchor, color: 'text-amber-400', bg: 'bg-amber-600/20' }
  ];

  // Logic for the dual-sync "Commit"
  const handleCommit = () => {
    if (!selectedEmoji || !reflection) return;
    setIsSubmitting(true);
    
    // Simulate data traveling to both the Mycelium Map and the Growth Log
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmitted(true);
      setReflection('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setHasSubmitted(false);
        setSelectedEmoji(null);
      }, 3000);
    }, 1500);
  };

  const recentPulses = [
    { date: 'APR 7', status: 'Hopeful', note: 'Feeling like I finally found a path forward.', icon: Sprout },
    { date: 'APR 7', status: 'Anxious', note: 'Navigating the technical shift feels heavy today.', icon: Waves },
    { date: 'APR 6', status: 'Uncertain', note: 'Questioning the bridge between curriculum and data.', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 md:p-12 text-white font-sans pb-32">
      
      {/* HEADER SECTION */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-3 text-[#2DD4BF]">
          <History className="w-4 h-4 shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Identity Foundation</span>
        </div>
        <h1 className="text-4xl font-serif font-bold tracking-tight text-white">Rootwork</h1>
        <p className="text-gray-400 text-xs mt-3 italic font-light">"The growth is invisible before it is inevitable."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        
        {/* LEFT: THE PULSE INPUT & CHECK-IN */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-300 mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              Daily Pulse Check
            </h3>
            
            {/* BRIGHTER EMOJI SELECTOR GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
              {emotionalStates.map((state) => (
                <button
                  key={state.id}
                  disabled={isSubmitting}
                  onClick={() => setSelectedEmoji(state.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 transform ${
                    selectedEmoji === state.id 
                    ? `bg-[#2DD4BF]/20 border-[#2DD4BF]/60 shadow-[0_0_25px_rgba(45,212,191,0.15)] scale-105` 
                    : 'bg-black/40 border-white/10 hover:border-[#2DD4BF]/30 hover:bg-[#2DD4BF]/5'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedEmoji === state.id ? state.bg : 'bg-white/5'
                  }`}>
                    <state.icon className={`w-5 h-5 transition-colors ${
                      selectedEmoji === state.id ? state.color : 'text-gray-400'
                    }`} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                    selectedEmoji === state.id ? 'text-white' : 'text-gray-500'
                  }`}>
                    {state.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={reflection}
                disabled={isSubmitting}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What shifted in your legacy narrative today?"
                className="w-full h-48 bg-black/60 border border-white/10 rounded-[2rem] p-8 text-sm text-gray-100 focus:outline-none focus:border-[#2DD4BF]/30 transition-all mb-8 font-light shadow-inner resize-none placeholder:text-gray-600 disabled:opacity-50"
              />
            </div>

            <button 
              onClick={handleCommit}
              disabled={isSubmitting || !selectedEmoji || !reflection}
              className={`group flex items-center gap-4 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                hasSubmitted 
                ? 'bg-green-500/20 border-green-500/40 text-green-400' 
                : 'bg-[#2DD4BF]/10 border-[#2DD4BF]/30 text-[#2DD4BF] hover:bg-[#2DD4BF]/20'
              } disabled:opacity-30 disabled:grayscale`}
            >
              {isSubmitting ? (
                <>Synthesizing... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : hasSubmitted ? (
                <>Pulse Mapped <CheckCircle2 className="w-4 h-4" /></>
              ) : (
                <>Commit Pulse to Mycelium <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </div>

          {/* RECENT REFLECTIONS FEED */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Growth Log</h3>
              
              {/* SYNC FEEDBACK INDICATOR */}
              {isSubmitting ? (
                <span className="text-[8px] font-bold text-[#2DD4BF] uppercase tracking-widest animate-pulse flex items-center gap-2">
                  <Loader2 className="w-2 h-2 animate-spin" /> Syncing with Mycelium & Log...
                </span>
              ) : hasSubmitted ? (
                <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-2 h-2" /> Log Updated Successfully
                </span>
              ) : (
                <span className="text-[8px] font-bold text-gray-700 uppercase tracking-widest">Repository Synced</span>
              )}
            </div>
            
            <div className="space-y-3">
              {recentPulses.map((pulse, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex items-center justify-between group hover:bg-white/[0.04] transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center w-12 text-center">
                      <pulse.icon className="w-5 h-5 text-gray-400 mb-2 group-hover:text-[#2DD4BF] transition-colors" />
                      <span className="text-[7px] font-black text-gray-500 uppercase tracking-tighter">{pulse.status}</span>
                    </div>
                    <div className="max-w-md">
                      <p className="text-xs text-gray-200 font-light leading-relaxed italic">"{pulse.note}"</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-gray-600 tracking-[0.2em]">{pulse.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: ECOSYSTEM PERSPECTIVE */}
        <div className="lg:col-span-5">
          <div className="sticky top-12">
            <div className="bg-gradient-to-br from-[#2DD4BF]/10 via-transparent to-transparent border border-[#2DD4BF]/20 rounded-[3.5rem] p-12 overflow-hidden relative shadow-2xl">
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#2DD4BF]/20 border border-[#2DD4BF]/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  <LayoutDashboard className="w-7 h-7 text-[#2DD4BF]" />
                </div>
                
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2DD4BF] mb-2">Network Intelligence</h4>
                <h2 className="text-3xl font-serif font-bold text-white leading-tight">Mycelium Status: <br/>Active</h2>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 mb-10 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-gray-300">
                    <span>Stability Index</span>
                    <span className="text-[#2DD4BF]">88%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2DD4BF] w-[88%] shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
                  </div>
                  <p className="text-[10px] text-gray-400 italic leading-relaxed">
                    Identity Audit: Reflecting a sustained "Hopeful" trend over recent cycles.
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/mycelium')}
                  className="group w-full py-6 rounded-2xl bg-[#2DD4BF] text-[#1A1423] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-3"
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

export default Rootwork;