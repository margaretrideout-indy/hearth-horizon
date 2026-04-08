import React, { useState, useEffect } from 'react';
import { Download, Activity, History, Send } from 'lucide-react';

const YourHearth = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: '2026-04-08', emoji: '🌲', text: 'Feeling grounded as the Grove comes together.' },
    { id: 2, date: '2026-04-07', emoji: '✨', text: 'Finalized the Plum & Teal aesthetic. It feels right.' }
  ]);

  const emojis = [
    { icon: '🌱', label: 'Growing' },
    { icon: '🔥', label: 'Energized' },
    { icon: '🍃', label: 'Peaceful' },
    { icon: '🪵', label: 'Grounded' },
    { icon: '✨', label: 'Inspired' },
    { icon: '☁️', label: 'Dreamy' },
    { icon: '🌊', label: 'Fluid' },
    { icon: '🌙', label: 'Reflective' }
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
    <div className="min-h-screen bg-[#1A1423] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Main Entry Card */}
        <div className="bg-[#251D2F] rounded-[3rem] p-10 md:p-16 border border-white/5 shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#1A1423] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/5">
            <Activity className="text-teal-400 w-6 h-6" />
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight">Your Hearth</h1>
          <p className="text-slate-400 italic mb-12">How is your internal weather today?</p>

          {/* Emoji Selection Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-10 max-w-2xl mx-auto">
            {emojis.map((e) => (
              <button
                key={e.label}
                onClick={() => setSelectedEmoji(e.icon)}
                className={`group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  selectedEmoji === e.icon ? 'bg-teal-500/20 scale-110 ring-1 ring-teal-500/50' : 'hover:bg-white/5'
                }`}
              >
                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{e.icon}</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:text-teal-400 transition-colors">
                  {e.label}
                </span>
              </button>
            ))}
          </div>

          {/* Optional Reflection */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Add an optional reflection..."
              className="w-full bg-[#1A1423]/50 border border-white/5 rounded-3xl p-6 text-slate-300 text-center italic focus:outline-none focus:border-teal-500/30 transition-all resize-none shadow-inner"
            />
            
            <button
              disabled={!selectedEmoji}
              type="submit"
              className={`px-10 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center gap-3 mx-auto shadow-lg ${
                selectedEmoji 
                ? 'bg-teal-500 text-[#1A1423] hover:bg-teal-400 shadow-teal-500/10' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            >
              <Send className="w-3 h-3" /> Log Entry
            </button>
          </form>
        </div>

        {/* Logbook History */}
        {logs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-6">
              <History className="w-4 h-4 text-slate-500" />
              <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Hearth Logbook</h3>
              <div className="h-px bg-white/5 flex-grow" />
            </div>

            <div className="grid gap-4">
              {logs.map((log) => (
                <div key={log.id} className="bg-[#251D2F]/50 border border-white/5 rounded-3xl p-6 flex items-start gap-6 hover:bg-[#251D2F] transition-colors group">
                  <div className="text-3xl bg-[#1A1423] w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {log.emoji}
                  </div>
                  <div className="flex-grow pt-1">
                    <div className="text-[9px] font-black text-teal-500/50 uppercase tracking-widest mb-2">{log.date}</div>
                    <p className="text-slate-300 italic font-light leading-relaxed">
                      {log.text || "No reflection added."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discrete Install Button */}
        {deferredPrompt && (
          <div className="pt-12 flex justify-center">
            <button 
              onClick={handleInstall}
              className="text-[9px] text-slate-600 uppercase tracking-[0.5em] hover:text-teal-400 transition-colors flex items-center gap-2"
            >
              <Download className="w-3 h-3" /> System: Native Install Ready
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourHearth;