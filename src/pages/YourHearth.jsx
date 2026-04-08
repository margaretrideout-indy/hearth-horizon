import React, { useState, useEffect } from 'react';
import { Download, Activity, Plus, History, BookOpen } from 'lucide-react';

const YourHearth = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, date: '2026-04-08', text: 'Started the Grove migration. Core tiers established.' },
    { id: 2, date: '2026-04-07', text: 'Finalized Stripe integration and Plum/Teal theme.' }
  ]);

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

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!checkIn.trim()) return;
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      text: checkIn
    };
    setLogs([newLog, ...logs]);
    setCheckIn('');
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mx-auto border border-teal-500/20 shadow-lg shadow-teal-500/5">
            <Activity className="text-teal-400 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Your Hearth</h1>
          <p className="text-slate-400 italic">"The foundational space for your daily rhythm."</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Check-In Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#251D2F] rounded-3xl p-6 border border-white/5 shadow-xl">
              <h3 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Plus className="w-3 h-3" /> New Check-In
              </h3>
              <form onSubmit={handleAddLog} className="space-y-4">
                <textarea 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="What's on your mind today?"
                  className="w-full h-32 bg-[#1A1423] border border-white/5 rounded-2xl p-4 text-slate-300 text-sm focus:outline-none focus:border-teal-500/50 transition-all resize-none"
                />
                <button 
                  type="submit"
                  className="w-full py-4 bg-teal-500 text-[#1A1423] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-400 transition-all active:scale-95"
                >
                  Log Entry
                </button>
              </form>
            </div>

            {/* Install Button (Sidecard) */}
            {deferredPrompt && (
              <div className="bg-teal-500/5 rounded-3xl p-6 border border-teal-500/20">
                <h3 className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Native Access</h3>
                <button 
                  onClick={handleInstall}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-teal-400/30 rounded-xl text-teal-400 text-[9px] font-black uppercase tracking-widest hover:bg-teal-400 hover:text-[#1A1423] transition-all"
                >
                  <Download className="w-3 h-3" /> Install App
                </button>
              </div>
            )}
          </div>

          {/* Logbook Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#251D2F] rounded-3xl p-8 border border-white/5 shadow-xl min-h-[400px]">
              <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <History className="w-3 h-3" /> Recent History
              </h3>
              
              <div className="space-y-6">
                {logs.map(log => (
                  <div key={log.id} className="group relative pl-6 border-l border-white/5">
                    <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-teal-500/30 group-hover:bg-teal-500 transition-all" />
                    <div className="text-[10px] text-slate-500 font-bold mb-1">{log.date}</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>

              {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-600">
                  <BookOpen className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-xs italic">The logbook is empty. Write your first entry.</p>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="text-center py-12 opacity-30">
          <p className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-medium">
            Personal Workspace • Secure & Encrypted
          </p>
        </div>

      </div>
    </div>
  );
};

export default YourHearth;