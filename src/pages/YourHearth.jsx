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

  const teal = "#2DD4BF";

  return (
    <div className="min-h-screen bg-[#1A1423] pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        <div className="bg-[#251D2F] rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl text-center relative overflow-hidden">
          {/* Forced Teal Top Glow */}
          <div 
            style={{ backgroundColor: teal, boxShadow: `0 0 20px ${teal}` }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1" 
          />
          
          <div 
            style={{ backgroundColor: `${teal}20`, borderColor: `${teal}40` }}
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 border shadow-lg"
          >
            <Activity style={{ color: teal }} className="w-5 h-5" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 tracking-tight">Your Hearth</h1>
          <p style={{ color: teal }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 italic opacity-90">
            "Internal Weather Check-In"
          </p>

          {/* Emoji Selection Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-10">
            {emojis.map((e) => (
              <button
                key={e.label}
                onClick={() => setSelectedEmoji(e.icon)}
                style={{ 
                  backgroundColor: selectedEmoji === e.icon ? teal : '#1A1423',
                  borderColor: selectedEmoji === e.icon ? teal : 'rgba(255,255,255,0.05)',
                  boxShadow: selectedEmoji === e.icon ? `0 0 15px ${teal}60` : 'none'
                }}
                className="group flex flex-col items-center gap-2 p-2 rounded-xl transition-all border relative"
              >
                {/* Hover Glow Effect */}
                <div 
                  style={{ backgroundColor: `${teal}30` }}
                  className={`absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity`} 
                />
                
                <span className={`text-2xl transition-all z-10 ${selectedEmoji === e.icon ? 'scale-110' : ''}`}>
                  {e.icon}
                </span>
                <span 
                  style={{ color: selectedEmoji === e.icon ? '#1A1423' : '#94a3b8' }}
                  className="text-[7px] font-black tracking-tighter z-10"
                >
                  {e.label}
                </span>
              </button>
            ))}
          </div>

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
                    <CheckCircle2 style={{ color: teal, filter: `drop-shadow(0 0 5px ${teal})` }} className="w-5 h-5" />
                </div>
              )}
            </div>
            
            {/* THE FORCED TEAL BUTTON */}
            <button
              disabled={!selectedEmoji}
              type="submit"
              style={{ 
                backgroundColor: selectedEmoji ? teal : 'rgba(255,255,255,0.05)',
                color: selectedEmoji ? '#1A1423' : '#475569',
                boxShadow: selectedEmoji ? `0 10px 25px ${teal}40` : 'none'
              }}
              className="px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 mx-auto active:scale-95"
            >
              <Send className="w-4 h-4" /> LOG TO HEARTH
            </button>
          </form>
        </div>

        {/* History Log */}
        {logs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 px-2">
              <History style={{ color: teal }} className="w-3 h-3 opacity-50" />
              <h3 style={{ color: teal }} className="text-[9px] font-black uppercase tracking-[0.4em] opacity-50">Hearth Logbook</h3>
              <div style={{ backgroundColor: `${teal}20` }} className="h-px flex-grow" />
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="bg-[#251D2F] border border-white/5 rounded-2xl p-5 flex items-center gap-6 hover:border-[#2DD4BF]/30 transition-all shadow-lg group">
                  <div className="text-2xl bg-[#1A1423] w-14 h-14 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-[#2DD4BF]/40 transition-colors shadow-inner">
                    <span style={{ filter: `drop-shadow(0 0 5px ${teal}40)` }}>{log.emoji}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ color: teal }} className="text-[8px] font-black uppercase tracking-widest opacity-60">{log.date}</span>
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
      </div>
    </div>
  );
};

export default YourHearth;