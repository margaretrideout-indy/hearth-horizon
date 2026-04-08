import React, { useState, useEffect } from 'react';
import { Download, Activity, History, Send, CheckCircle2 } from 'lucide-react';

const YourHearth = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: '2026-04-08', emoji: '🌱', text: 'Started the Grove migration. Core tiers established.' },
    { id: 2, date: '2026-04-07', emoji: '✨', text: 'Finalized Stripe integration and Plum/Teal theme.' }
  ]);

  const emojis = [
    { icon: '🌱', label: 'GROWING' },
    { icon: '🔥', label: 'ENERGIZED' },
    { icon: '🍃', label: 'PEACEFUL' },
    { icon: '🪵', label: 'GROUNDED' },
    { icon: '✨', label: 'INSPIRED' },
    { icon: '☁️', label: 'DREAMY' },
    { icon: '🌊', label: 'FLUID' },
    { icon: '🌙', label: 'REFLECTIVE' }
  ];

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmoji) return;
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-CA'),
      emoji: selectedEmoji,
      text: reflection
    };
    
    setLogs([newEntry, ...logs]);
    setSelectedEmoji(null);
    setReflection('');
  };

  return (
    <div className="min-h-screen bg-[#1A1423] pt-20 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Main Entry Card - Tightened Scaling */}
        <div className="bg-[#251D2F] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl text-center relative overflow-hidden">
          {/* Subtle Teal Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
          
          <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-teal-500/20">
            <Activity className="text-teal-400 w-5 h-5" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 tracking-tight">Your Hearth</h1>
          <p className="text-teal-400/60 text-[10px] font-black uppercase tracking-[0.3em] mb-10 italic">
            "Internal Weather Check-In"
          </p>

          {/* Emoji Selection Grid - High Contrast Teal */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-10">
            {emojis.map((e) => (
              <button
                key={e.label}
                onClick={() => setSelectedEmoji(e.icon)}
                className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition-all border ${
                  selectedEmoji === e.icon 
                  ? 'bg-teal-500 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.2)]' 
                  : 'bg-[#1A1423] border-white/5 hover:border-teal-500/30'
                }`}
              >
                <span className={`text-xl transition-all ${selectedEmoji === e.icon ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                  {e.icon}
                </span>
                <span className={`text-[7px] font-black tracking-tighter transition-colors ${
                  selectedEmoji === e.icon ? 'text-[#1A1423]' : 'text-slate-500'
                }`}>
                  {e.label}
                </span>
              </button>
            ))}
          </div>

          {/* Optional Reflection - Sharper Integration */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Add a reflection to your log..."
                className="w-full bg-[#1A1423] border border-white/10 rounded-2xl p-5 text-slate-300 text-sm italic focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all resize-none shadow-inner min-h-[100px]"
              />
              {selectedEmoji && <CheckCircle2 className="absolute top-4 right-4 w-4 h-4 text-teal-500 animate-in fade-in scale-in" />}
            </div>
            
            <button
              disabled={!selectedEmoji}
              type="submit"
              className={`px-8 py-3.5 rounded-xl font-black uppercase tracking-[0.2em] text-[9px] transition-all flex items-center gap-2 mx-auto shadow-xl ${
                selectedEmoji 
                ? 'bg-teal-500 text-[#1A1423] hover:bg-teal-400 hover:scale-[1.02]' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Send className="w-3 h-3" /> Log to Hearth
            </button>
          </form>
        </div>

        {/* Logbook History - Restored List View */}
        {logs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 px-2">
              <History className="w-3 h-3 text-teal-500/50" />
              <h3 className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em]">Hearth Logbook</h3>
              <div className="h-px bg-white/5 flex-grow" />
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="bg-[#251D2F] border border-white/5 rounded-2xl p-5 flex items-center gap-6 hover:border-teal-500/20 transition-all group">
                  <div className="text-2xl bg-[#1A1423] w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-teal-500/30 transition-colors">
                    {log.emoji}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-black text-teal-400/40 uppercase tracking-widest">{log.date}</span>
                    </div>
                    <p className="text-slate-300 text-xs italic font-light leading-relaxed">
                      {log.text || "A quiet moment of reflection."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Install Button */}
        {deferredPrompt && (
          <div className="pt-8 flex justify-center">
            <button 
              onClick={handleInstall}
              className="px-4 py-2 bg-[#251D2F] border border-teal-500/20 rounded-lg text-[8px] text-teal-400 uppercase tracking-[0.3em] hover:bg-teal-500/10 transition-all flex items-center gap-2 shadow-lg"
            >
              <Download className="w-3 h-3" /> System: Native PWA Ready
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourHearth;