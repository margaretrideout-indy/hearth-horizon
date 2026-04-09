import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flame, Compass, Upload, LogOut, Sun, Lock, RefreshCw, Check } from 'lucide-react';

export default function Hearth({ userData, onSync }) {
  const [reflection, setReflection] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        onSync({ isAligned: true });
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 pt-12 space-y-10">
      {/* BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A2E2C] to-[#141B1A] border border-white/10 p-12 shadow-2xl">
        <div className="relative z-10 flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-[0.3em] text-gray-500 uppercase">HEARTH ACCESS</h3>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Welcome home, <span className="text-teal-400">{userData.name}.</span>
            </h1>
            <p className="text-lg text-gray-400 italic font-medium">Your horizon is waiting.</p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-600 hover:text-white transition-colors">
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* JOURNEY STAGES */}
          <Card className="p-8 bg-[#1C1622]/40 border-white/5">
            <div className="flex justify-between items-center mb-10">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">CURRENT TRACK: {userData.journey}</p>
              <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase"><Sun size={14} /> Stage 1 of 4</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {['Discovery', 'Translation', 'Bridging', 'Launching'].map((s, i) => (
                <div key={s} className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${i === 0 ? 'border-teal-500 text-teal-400 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-white/10 text-gray-700'}`}>
                    {i === 0 ? <Compass size={20}/> : <Lock size={18}/>}
                  </div>
                  <span className={`text-[10px] font-black uppercase ${i === 0 ? 'text-white' : 'text-gray-700'}`}>{s}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* ROOTWORK (This replaces the old mapped network box) */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
              <Flame size={16} className="text-teal-500" /> The Rootwork
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-8 bg-[#1C1622]/40 border-white/5 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${userData.isAligned ? 'bg-teal-500/10 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                  {isUploading ? <RefreshCw className="animate-spin" /> : userData.isAligned ? <Check /> : <Upload size={24} />}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-teal-400">Linguistic Intake</p>
                  <p className="text-[11px] text-gray-600 italic">Upload your resume for alignment</p>
                </div>
                <input type="file" id="h-up" className="hidden" onChange={handleUpload} />
                <Button asChild variant="outline" className="text-[9px] font-black uppercase border-white/10 h-8 cursor-pointer hover:bg-white/5">
                  <label htmlFor="h-up">{userData.isAligned ? "Aligned" : "Select PDF"}</label>
                </Button>
              </Card>

              <Card className="p-6 bg-[#1C1622]/40 border-white/5 space-y-4">
                <p className="text-[10px] font-black uppercase text-gray-500">Your Reflection</p>
                <Textarea 
                  placeholder="Enter your pulse check..."
                  className="bg-transparent border-none text-sm italic p-0 min-h-[100px] text-gray-400 focus-visible:ring-0 resize-none"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <Button onClick={() => setReflection("")} className="h-7 text-[9px] font-black uppercase bg-white/5 hover:bg-white/10 border border-white/5">Bank Note</Button>
              </Card>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          <Card className="p-8 bg-[#1C1622]/40 border-white/5 space-y-6">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest italic">Maturing Status</p>
            <p className="text-xs text-gray-500 italic leading-relaxed">Complete 14 more pulses to unlock your network.</p>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-teal-500" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}