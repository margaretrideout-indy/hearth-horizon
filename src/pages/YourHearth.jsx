import React, { useState, useEffect } from 'react';
import { Download, TabletSmartphone } from 'lucide-react';

const YourHearth = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 pt-24 text-center">
      <div className="max-w-2xl mx-auto bg-[#251D2F] rounded-[2.5rem] p-12 border border-white/5 shadow-2xl">
        <h1 className="text-4xl font-serif font-bold text-white mb-6">Your Hearth</h1>
        <p className="text-slate-400 mb-10 italic">Your personal logbook and foundational workspace.</p>
        
        {/* Functional Install Button */}
        {deferredPrompt && (
          <button 
            onClick={handleInstall}
            className="flex items-center gap-3 mx-auto px-6 py-4 bg-teal-500 text-[#1A1423] rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
          >
            <Download className="w-5 h-5" />
            Install Hearth App
          </button>
        )}
        
        {!deferredPrompt && (
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
            App is already installed or browser is in Incognito mode.
          </p>
        )}
      </div>
    </div>
  );
};

export default YourHearth;