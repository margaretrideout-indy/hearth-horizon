import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Cloud, Waves, 
  Flame, Anchor, 
  ArrowRight, History, LayoutDashboard,
  CheckCircle2
} from 'lucide-react';

const Rootwork = () => {
  const navigate = useNavigate();
  const [reflection, setReflection] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // The Emotional Metadata for the Emoji Check-in
  const emotionalStates = [
    { id: 'hopeful', label: 'Hopeful', icon: Sprout, color: 'text-green-400', bg: 'bg-green-400/10' },
    { id: 'anxious', label: 'Anxious', icon: Waves, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { id: 'uncertain', label: 'Uncertain', icon: Cloud, color: 'text-gray-400', bg: 'bg-gray-400/10' },
    { id: 'driven', label: 'Driven', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { id: 'grounded', label: 'Grounded', icon: Anchor, color: 'text-amber-600', bg: 'bg-amber-600/10' }
  ];

  // Mock data for the "Past Pulses"
  const recentPulses = [
    { date: 'APR 7', status: 'Hopeful', note: 'Feeling like I finally found a path forward.', icon: Sprout },
    { date: 'APR 7', status: 'Anxious', note: 'Navigating the technical shift feels heavy today.', icon: Waves },
    { date: 'APR 6', status: 'Uncertain', note: 'Questioning the bridge between curriculum and data.', icon: Cloud }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 md:p-12 text-white font-sans pb-32">
      
      {/* HEADER SECTION - RESTORED TITLING */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-3 text-teal-400">
          <History className="w-4 h-4 shadow-[0_0_10px_rgba(45,212,191,0.3)]" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Identity Foundation</span>
        </div>
        <h1 className="text-4xl font-serif font-bold tracking-tight text-white">Rootwork</h1>
        <p className="text-gray-500 text-xs mt-3 italic font-light">"The growth is invisible before it is inevitable."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        
        {/* LEFT: THE PULSE INPUT & CHECK-IN */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/5 blur-[50px] -z-10" />
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-8 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              Daily Pulse Check
            </h3>
            
            {/* EMOJI SELECTOR GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
              {emotionalStates.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedEmoji(state.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    selectedEmoji === state.id 
                    ? `bg-white/10 border-teal-500/40 shadow-[0_0_20px_rgba(45,212,191,0.1)]` 
                    : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedEmoji === state.id ? state.bg : 'bg-white/5'}`}>
                    <state.icon className={`w-4 h-4 ${selectedEmoji === state.id ? state.color : 'text-gray-600'}`} />
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${selectedEmoji === state.id ? 'text-white' : 'text-gray-600'}`}>
                    {state.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What shifted in your legacy narrative today?"
                className="w-full h-48 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-sm text-gray-300 focus:outline-none focus:border-teal-500/20 transition-all mb-8 font-light shadow-inner resize-none placeholder:text-gray-700"
              />
            </div>

            <button className="group flex items-center gap-4 px-10 py-5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-500/20 transition-all">
              Commit Pulse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* RECENT REFLECTIONS FEED */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Growth Log</h3>
              <span className="text-[8px] font-bold text-gray-800 uppercase tracking-widest italic">Viewing Last 3 Cycles</span>
            </div>
            
            <div className="space-y-3">
              {recentPulses.map((pulse, idx) => (
                <div key={idx} className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 flex items-center justify-between group hover:bg-white/[0.03] transition-all duration-500">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center w-12 text-center">
                      <pulse.icon className="w-5 h-5 text-gray-600 mb-2 group-hover:text-teal-400 transition-colors" />
                      <span className="text-[7px] font-black text-gray-700 uppercase tracking-tighter">{pulse.status}</span>
                    </div>
                    <div className="max-w-md">
                      <p className="text-xs text-gray-400 font-light leading-relaxed italic">"{pulse.note}"</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-gray-700 tracking-[0.2em]">{pulse.date}</span>
                    <div className="flex justify-end mt-1">
                       <CheckCircle2 className="w-3 h-3 text-teal-500/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: ECOSYSTEM PERSPECTIVE */}
        <div className="lg:col-span-5">
          <div className="sticky top-12">
            <div className="bg-gradient-to-br from-teal-500/10 via-transparent to-transparent border border-teal-500/20 rounded-[3.5rem] p-12 overflow-hidden relative group shadow-2xl">
              
              {/* Background Glow */}
              <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
                <LayoutDashboard className="w-80 h-80 text-teal-400" />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-400/20 border border-teal-400/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  <LayoutDashboard className="w-7 h-7 text-teal-400" />
                </div>
                
                <div className="space-y-2 mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Network Intelligence</h4>
                  <h2 className="text-3xl font-serif font-bold text-white leading-tight">Mycelium Status: <br/>Active</h2>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 mb-10 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                    <span className="text-gray-500">Stability Index</span>
                    <span className="text-teal-400">88%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 w-[88%] shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic leading-relaxed">
                    "Your reflections are aligning with the 'High Autonomy' ecosystem match found in your last scan."
                  </p>
                </div>
                
                <button 
                  onClick={() => navigate('/mycelium')}
                  className="group w-full py-6 rounded-2xl bg-teal-400 text-[#1A1423] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-teal-400/20 hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  Enter The Map
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Extra Contextual Tip */}
            <div className="mt-8 px-10 py-6 border border-dashed border-white/10 rounded-3xl">
              <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed text-center font-bold">
                Identity Audit: Use the 'Driven' pulse when finalizing resume translations to track confidence levels.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Rootwork;