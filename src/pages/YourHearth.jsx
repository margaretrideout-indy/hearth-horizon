import React, { useState } from 'react';
import { Activity, History, Send } from 'lucide-react';

const YourHearth = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: '2026-04-08', emoji: '🌱', text: 'Started the Grove migration. Core tiers established.' },
    { id: 2, date: '2026-04-07', emoji: '✨', text: 'Finalized Stripe integration and Plum/Teal theme.' }
  ]);

  const emojis = [
    { icon: '🌱', label: 'GROWING' }, { icon: '🔥', label: 'ENERGIZED' },
    { icon: '🍃', label: 'PEACEFUL' }, { icon: '🪵', label: 'GROUNDED' },
    { icon: '✨', label: 'INSPIRED' }, { icon: '☁️', label: 'DREAMY' },
    { icon: '🌊', label: 'FLUID' }, { icon: '🌙', label: 'REFLECTIVE' }
  ];

  const teal = "#2DD4BF";

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
    <div className="min-h-screen bg-[#1A1423] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Main Entry Card */}
        <div className="bg-[#251D2F] rounded-[2rem] p-8 border border-white/5 shadow-2xl text-center relative overflow-hidden">
          
          {/* TOP TEAL ACCENT - FORCED STYLE */}
          <div style={{ backgroundColor: teal, boxShadow: `0 0 20px ${teal}`, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '4px' }} />
          
          <div style={{ backgroundColor: 'rgba(45, 212, 191, 0.1)', borderColor: 'rgba(45, 212, 191, 0.3)' }} className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6 border">
            <Activity style={{ color: teal }} className="w-5 h-5" />
          </div>

          <h1 className="text-3xl font-serif font-bold text-white mb-2">Your Hearth</h1>
          <p style={{ color: teal }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 italic">
            "INTERNAL WEATHER CHECK-IN"
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
                className="flex flex-col items-center gap-2 p-3 rounded-xl border transition-all"
              >
                <span className="text-2xl">{e.icon}</span>
                <span style={{ color: selectedEmoji === e.icon ? '#1A1423' : '#64748b' }} className="text-[7px] font-black uppercase tracking-tighter">
                  {e.label}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Add a reflection to your log..."
              className="w-full bg-[#1A1423] border border-white/10 rounded-2xl p-6 text-slate-300 text-sm italic focus:outline-none min-h-[120px]"
            />
            
            {/* THE LOG BUTTON - ABSOLUTE OVERRIDE */}
            <button
              disabled={!selectedEmoji}
              type="submit"
              style={{ 
                backgroundColor: selectedEmoji ? teal : '#334155', 
                color: selectedEmoji ? '#1A1423' : '#94a3b8',
                boxShadow: selectedEmoji ? `0 10px 25px ${teal}40` : 'none',
                opacity: selectedEmoji ? 1 : 0.5,
                transition: 'all 0.2s ease-in-out'
              }}
              className="px-10 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] mx-auto flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> LOG TO HEARTH
            </button>
          </form>
        </div>

        {/* Logbook History */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 px-2">
            <History style={{ color: teal }} className="w-3 h-3 opacity-50" />
            <h3 style={{ color: teal }} className="text-[9px] font-black uppercase tracking-[0.4em] opacity-50">Hearth Logbook</h3>
            <div style={{ backgroundColor: teal, opacity: 0.2 }} className="h-px flex-grow" />
          </div>

          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="bg-[#251D2F] border border-white/5 rounded-2xl p-5 flex items-center gap-6 shadow-lg">
                <div className="text-2xl bg-[#1A1423] w-14 h-14 rounded-xl flex items-center justify-center border border-white/5">
                  {log.emoji}
                </div>
                <div className="flex-grow">
                  <span style={{ color: teal }} className="text-[8px] font-black uppercase tracking-widest opacity-60">{log.date}</span>
                  <p className="text-slate-300 text-xs italic font-light">{log.text || "A quiet moment of reflection."}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourHearth;