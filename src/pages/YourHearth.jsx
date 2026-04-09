import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flame, Compass, Upload, LogOut, Sun, Lock, RefreshCw, Check } from 'lucide-react';

export default function Hearth({ vault, onSync }) {
  const [reflection, setReflection] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setIsUploading(true);
      // Simulate the sync process
      setTimeout(() => {
        setIsUploading(false);
        onSync({ isAligned: true });
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 pt-12 pb-20">
      {/* SANCTUARY BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1A2E2C] to-[#141B1A] border border-white/10 p-12 mb-10 shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-[0.3em] text-gray-500 uppercase italic">THE HEARTH</h3>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Welcome home, <span className="text-teal-400">{vault.name}.</span>
            </h1>
            <p className="text-lg text-gray-400 italic">Your transition ecosystem is active.</p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-600 hover:text-white transition-colors">
            <LogOut size={14} /> End Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* JOURNEY PATH */}
          <Card className="p-8 bg-[#1C1622]/40 border-white/5">
            <div className="flex justify-between items-center mb-10">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">CURRENT TRACK: {vault.journey}</p>
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase">
                <Sun size={14} /> Stage 1 of 4
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {['Discovery', 'Translation', 'Bridging', 'Launching'].map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${i === 0 ? 'border-teal-500 text-teal-400 bg-teal-500/10' : 'border-white/10 text-gray-700'}`}>
                    {i === 0 ? <Compass size={20}/> : <Lock size={18}/>}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${i === 0 ? 'text-white' : 'text-gray-700'}`}>{s}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* ROOTWORK SECTION */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
              <Flame size={16} className="text-teal-500" /> The Rootwork
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RESUME UPLOAD */}
              <Card className="p-8 bg-[#1C1622]/40 border-white/5 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${vault.isAligned ? 'bg-teal-500/10 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                  {isUploading ? <RefreshCw className="animate-spin" /> : vault.isAligned ? <Check /> : <Upload size={24} />}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-teal-400 tracking-widest">Linguistic Intake</p>
                  <p className="text-[11px] text-gray-600 italic">Sync your history</p>
                </div>
                <input type="file" id="h-up" className="hidden" onChange={handleUpload} />
                <Button asChild variant="outline" className="text-[9px] font-black uppercase border-white/10 h-8 cursor-pointer hover:bg-white/5">
                  <label htmlFor="h-up">{vault.isAligned ? "Synced" : "Select PDF"}</label>
                </Button>
              </Card>

              {/* PULSE CHECK */}
              <Card className="p-6 bg-[#1C1622]/40 border-white/5 space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-500">Logbook Entry</p>
                <Textarea 
                  placeholder="Record today's pulse check..."
                  className="bg-transparent border-none text-sm italic p-0 min-h-[100px] text-gray-400 focus-visible:ring-0 resize-none"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <Button className="h-7 text-[9px] font-black uppercase bg-white/5 hover:bg-white/10 border border-white/5 px-4">Save Reflection</Button>
              </Card>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="p-8 bg-[#1C1622]/40 border border-white/5 rounded-2xl self-start space-y-6">
          <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Ecosystem Status</p>
          <p className="text-xs text-gray-500 italic leading-relaxed">
            {vault.isAligned ? "Your intake is complete. Pulse daily to unlock new insights." : "Complete your intake to activate the mycelium network."}
          </p>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 transition-all duration-1000" 
              style={{ width: vault.isAligned ? '25%' : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}