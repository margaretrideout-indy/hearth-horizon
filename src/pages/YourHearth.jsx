import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flame, Compass, Heart, MessageSquare, Lock, Sparkles, Zap, BarChart, Clock } from 'lucide-react';

export default function Hearth({ vault, onSync }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [pulses, setPulses] = useState([]);

  const emojis = [
    { icon: "🌱", label: "Growing" },
    { icon: "🔥", label: "Ignited" },
    { icon: "🌊", label: "Flowing" },
    { icon: "🏔️", label: "Grounded" },
    { icon: "🌪️", label: "Shifting" },
    { icon: "✨", label: "Inspired" }
  ];

  const loadPulses = async () => {
    try {
      if (window.base44?.entities?.RootwerkLog) {
        const history = await window.base44.entities.RootwerkLog.list();
        if (history) {
          setPulses([...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadPulses(); }, []);

  const calculateStreak = () => {
    if (pulses.length === 0) return 0;
    const dates = pulses.map(p => new Date(p.timestamp).toDateString());
    const uniqueDates = [...new Set(dates)];
    let streak = 0;
    let today = new Date();
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      if (uniqueDates.includes(checkDate.toDateString())) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const handleLogPulse = async () => {
    if (!selectedEmoji && !reflection) return;
    setIsLogging(true);
    const newPulse = { 
      emoji: selectedEmoji || "Pulse", 
      reflection, 
      timestamp: new Date().toISOString() 
    };
    
    setPulses(prev => [newPulse, ...prev]);

    try {
      if (window.base44?.entities?.RootwerkLog) {
        await window.base44.entities.RootwerkLog.create(newPulse);
      }
      setSelectedEmoji(null);
      setReflection("");
      if (onSync) onSync();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogging(false);
    }
  };

  const streakCount = calculateStreak();
  const pulseCount = pulses.length;
  const showPreview = pulseCount >= 3;
  const isUnlocked = pulseCount >= 14;
  const hasLoggedToday = pulses.some(p => 
    new Date(p.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white font-sans selection:bg-teal-500/30 pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        <Card className="bg-[#1C1622]/40 border-white/10 p-6 md:p-10 mb-12 rounded-[2.5rem] shadow-2xl relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
            <div className="flex gap-6 items-center">
              <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20">
                <Compass size={28} className="text-teal-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-teal-500/50 tracking-[0.4em] mb-1">INTENTIONAL PATH</p>
                <h2 className="text-3xl font-serif italic tracking-tight">Professional Transition</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
               {streakCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <Flame size={14} className="text-orange-500 fill-orange-500" />
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{streakCount} DAY STREAK</span>
                </div>
               )}
               <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Stage 1 of 4
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {['Discovery', 'Translation', 'Bridging', 'Launching'].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-5 relative z-10">
                <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${i === 0 ? 'border-teal-500 bg-teal-500/20 text-teal-400 shadow-[0_0_30px_rgba(20,184,166,0.2)]' : 'border-white/5 bg-white/5 text-slate-800'}`}>
                  {i === 0 ? <Compass size={28} /> : <Lock size={22} />}
                </div>
                <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${i === 0 ? 'text-white' : 'text-slate-800'}`}>{step}</p>
              </div>
            ))}
            <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-teal-500/50 via-white/5 to-white/5 -z-0" />
          </div>
        </Card>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
               <h3 className="text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-3 italic text-teal-500">
                <Flame size={18} className="fill-teal-500/20" /> THE ROOTWORK
              </h3>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <Card className="bg-[#251D2D] border-white/10 p-8 space-y-10 shadow-xl rounded-[2rem]">
                <div className="space-y-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1. THE EMOJI PULSE</p>
                  <div className="grid grid-cols-6 gap-3">
                    {emojis.map((e) => (
                      <button 
                        key={e.label}
                        disabled={hasLoggedToday}
                        onClick={() => setSelectedEmoji(e.label === selectedEmoji ? null : e.label)}
                        className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${selectedEmoji === e.label ? 'bg-teal-500/20 border-teal-500 text-2xl scale-110' : 'bg-white/5 border-white/5 grayscale hover:grayscale-0 hover:bg-white/10'} ${hasLoggedToday ? 'opacity-20 cursor-not-allowed' : ''}`}
                      >
                        <span>{e.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2. DAILY REFLECTION</p>
                  <div className={`bg-black/20 rounded-[1.5rem] p-6 min-h-[120px] border border-white/5 transition-all ${hasLoggedToday ? 'opacity-50' : 'focus-within:border-teal-500/30'}`}>
                    <Textarea 
                      placeholder={hasLoggedToday ? "Resting..." : "What felt resonant today?"}
                      disabled={hasLoggedToday}
                      className="bg-transparent border-none p-0 focus-visible:ring-0 text-sm text-white italic resize-none leading-relaxed placeholder:text-slate-700"
                      value={reflection}
                      onChange={(e) => setReflection(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleLogPulse}
                    disabled={isLogging || hasLoggedToday || (!selectedEmoji && !reflection)}
                    className={`w-full text-[11px] font-black uppercase tracking-[0.2em] h-16 rounded-2xl transition-all ${
                      hasLoggedToday 
                        ? "bg-white/5 text-slate-600 border border-white/10 cursor-not-allowed" 
                        : "bg-teal-500 hover:bg-teal-400 text-black shadow-lg shadow-teal-500/20"
                    }`}
                  >
                    {isLogging ? "Logging..." : hasLoggedToday ? "Hearth is Resting" : "Log the Pulse"}
                  </Button>
                  {hasLoggedToday && (
                    <p className="text-[9px] text-center text-slate-600 italic animate-pulse">
                      Your pulse is recorded. Return tomorrow to continue the journey.
                    </p>
                  )}
                </div>
              </Card>

              <div className="space-y-6">
                <div className="flex items-center gap-3 px-2 text-slate-600">
                  <MessageSquare size={16} />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">LOGBOOK</p>
                </div>
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {pulses.length > 0 ? pulses.map((entry, i) => (
                    <Card key={i} className="p-6 bg-[#1C1622]/60 border border-white/5 rounded-2xl">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase block">
                            {new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <div className="flex items-center gap-1.5 text-slate-600">
                             <Clock size={10} />
                             <span className="text-[9px] font-medium uppercase tracking-tighter">
                                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </span>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-[9px] font-black uppercase italic border border-teal-500/20">
                          {entry.emoji}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed italic">"{entry.reflection}"</p>
                    </Card>
                  )) : (
                    <p className="text-[10px] text-slate-700 uppercase tracking-widest text-center py-10 italic">No entries yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <Card className="bg-[#1C1622]/40 border-white/5 p-10 space-y-8 rounded-[2rem]">
              <div className="flex items-center justify-between text-slate-600">
                <div className="flex items-center gap-3">
                  <Lock size={14} />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">MATURITY</p>
                </div>
                <span className="text-[10px] font-black text-teal-500">{Math.min(100, Math.round((pulseCount / 14) * 100))}%</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                Feed the hearth <span className="text-white font-bold underline decoration-teal-500/50">{Math.max(0, 14 - pulseCount)} more times</span> to unlock the Nexus Reveal.
              </p>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (pulseCount / 14) * 100)}%` }}
                />
              </div>
            </Card>

            {showPreview && !isUnlocked && (
              <Card className="bg-gradient-to-br from-teal-500/10 to-transparent border-teal-500/20 p-8 rounded-[2rem] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={16} className="text-teal-400 fill-teal-400" />
                  <p className="text-[10px] font-black uppercase text-teal-400 tracking-[0.3em]">Translation Preview</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-tighter">Classroom Management</p>
                    <p className="text-xs text-white italic">→ Operations & Logistics</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase mb-2 font-bold tracking-tighter">Curriculum Design</p>
                    <p className="text-xs text-white italic">→ Program Architecture</p>
                  </div>
                </div>
              </Card>
            )}

            {isUnlocked ? (
              <Card className="bg-teal-500 p-1 rounded-[2rem] shadow-[0_0_40px_rgba(20,184,166,0.3)]">
                <Button className="w-full bg-[#1C1622] hover:bg-black text-white h-24 rounded-[1.8rem] flex flex-col items-center justify-center gap-1 border-none">
                  <Sparkles size={20} className="text-teal-400 mb-1" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">REVEAL THE NEXUS</span>
                </Button>
              </Card>
            ) : (
              <Card className="bg-[#1C1622]/20 border border-white/5 p-10 space-y-6 rounded-[2rem] text-center grayscale opacity-40">
                <div className="flex items-center justify-center gap-3 text-slate-500">
                  <BarChart size={18} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">NEXUS MAP</p>
                </div>
                <p className="text-[10px] text-slate-600 italic leading-relaxed">
                  A high-fidelity visualization of your professional sentiment and keyword translation.
                </p>
              </Card>
            )}

            <Card className="bg-transparent border-2 border-dashed border-white/5 p-10 space-y-6 rounded-[2rem] opacity-50 text-center">
              <div className="flex items-center justify-center gap-3 text-white">
                <Heart size={14} className="text-teal-500 fill-teal-500" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">RECIPROCITY</p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                One seat purchased sponsors a peer in professional transition.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}