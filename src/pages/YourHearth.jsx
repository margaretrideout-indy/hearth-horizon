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
    <div className="min-h-screen bg-[#1A1423] pt-21 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Main Entry Card */}
        <div className="bg-[#251D2F] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl text-center relative overflow-hidden">
          {/* Direct Teal Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#2DD4BF] shadow-[0_0_20px_#2DD4BF]" />
          
          <div className="w-12 h-12 bg-[#2DD4BF]/10 rounded-xl flex items-center justify-center mx-auto mb-6 border border-[#2DD4BF]/20">
            <Activity className="text-[#2DD4BF] w-5 h-5" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 tracking-tight">Your Hearth</h1>
          <p className="text-[#2DD4BF] text-[10px] font-black uppercase tracking-[0.3em] mb-10 italic opacity-80">
            "Internal Weather Check-In"
          </p>

          {/* Emoji Selection Grid with Teal Glows */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-10">
            {emojis.map((e) => (
              <button
                key={e.label}
                onClick={() => setSelectedEmoji(e.icon)}
                className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition-all border relative ${
                  selectedEmoji === e.icon 
                  ? 'bg-[#2DD4BF] border-[#2DD4BF] shadow-[0_0_15px_rgba(45,212,191,0.4)]' 
                  : 'bg-[#1A1423] border-white/5 hover:border-[#2DD4BF]/40'
                }`}
              >
                <div className={`absolute inset-0 rounded-xl bg-[#2DD4BF]/5 blur-md opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <span className={`text-2xl transition-all z-10 ${selectedEmoji === e.icon ? 'scale-110' : 'grayscale-0'}`}>
                  {e.icon}
                </span>
                <span className={`text-[7px] font-black tracking-tighter transition-colors z-10 ${
                  selectedEmoji === e.icon ? 'text-[#1A1423]' : 'text-slate-500 group-hover:text-[#2DD4BF]'
                }`}>
                  {e.label}
                </span>
              </button>
            ))}
          </div>

          {/* Optional Reflection */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Add a reflection to your log..."
                className="w-full bg-[#1A1423] border border-white/10 rounded-2xl p-6 text-slate-300 text-sm italic focus:outline-none focus:border-[#2DD4BF] focus:ring-1 focus:ring-[#2DD4BF]/20 transition-all resize-none shadow-inner min-h-[120px]"
              />
              {selectedEmoji && (
                <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-5 h-5 text-[#2DD4BF] drop-shadow-[0_0_8px_#2DD4BF]" />
                </div>
              )}
            </div>
            
            <button
              disabled={!selectedEmoji}
              type="submit"
              className={`px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl ${
                selectedEmoji 
                ? 'bg-[#2DD4BF] text-[#1A1423] hover:bg-[#26bba8] hover:scale-[1.02] active:scale-95 shadow-[#2DD4BF]/30' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Send className="w-4 h-4" /> LOG TO HEARTH
            </button>
          </form>
        </div>

        {/* Logbook History */}
        {logs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 px-2">
              <History className="w-3 h-3 text-[#2DD4BF]" />
              <h3 className="text-[#2DD4BF]/70 text-[9px] font-black uppercase tracking-[0.4em]">Hearth Logbook</h3>
              <div className="h-px bg-[#2DD4BF]/10 flex-grow" />
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="bg-[#251D2F] border border-white/5 rounded-2xl p-5 flex items-center gap-6 hover:border-[#2DD4BF]/30 transition-all shadow-lg group">
                  <div className="text-2xl bg-[#1A1423] w-14 h-14 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-[#2DD4BF]/40 transition-colors shadow-inner">
                    <span className="drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]">{log.emoji}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] font-black text-[#2DD4BF] uppercase tracking-widest opacity-60">{log.date}</span>
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
              className="px-5 py-2.5 bg-[#251D2F] border border-[#2DD4BF]/30 rounded-lg text-[8px] text-[#2DD4BF] font-bold uppercase tracking-[0.3em] hover:bg-[#2DD4BF] hover:text-[#1A1423] transition-all flex items-center gap-2 shadow-xl"
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