import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Flame, Map, Compass, 
  Upload, FileText, Smartphone,
  X, LogOut, Sun, Lock, RefreshCw, Check
} from 'lucide-react';

export default function Hearth({ userName = "Traveler", journeyTitle = "Classroom to New Horizon" }) {
  const [reflection, setReflection] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const stages = [
    { id: 'discovery', label: 'Discovery', sub: 'Know yourself', icon: Compass, active: true },
    { id: 'translation', label: 'Translation', sub: 'Reframe your skills', icon: Map, active: false },
    { id: 'bridging', label: 'Bridging', sub: 'Close the gaps', icon: Compass, active: false },
    { id: 'launching', label: 'Launching', sub: 'Enter your new path', icon: Flame, active: false }
  ];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setIsUploading(true);
      // Simulate Ecosystem Synthesis
      setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0A13] text-gray-200 font-sans pb-20">
      
      {/* APP INSTALL BANNER */}
      <div className="bg-black border-b border-white/10 p-3 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <Smartphone size={16} className="text-gray-400" />
          <p className="text-[11px] font-medium tracking-tight">
            📱 <span className="text-gray-400 font-bold">Take the Hearth with you.</span> Add this ecosystem to your home screen for daily pulses.
          </p>
        </div>
        <X size={14} className="text-gray-600 cursor-pointer hover:text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-12 space-y-10">
        
        {/* DYNAMIC WELCOME BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1A2E2C] to-[#141B1A] border border-white/10 p-12 shadow-2xl">
          <div className="relative z-10 flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">HEARTH ACCESS</h3>
              <h1 className="text-5xl font-bold text-white tracking-tight">
                Welcome home, <span className="text-teal-400">{userName}.</span>
              </h1>
              <p className="text-lg text-gray-400 italic">Your transition environment is live.</p>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
              <LogOut size={14} /> End Session
            </button>
          </div>
          <p className="absolute bottom-6 left-12 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 uppercase">Ecosystem Stability: Optimal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MAIN WORKSPACE */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* JOURNEY PROGRESSION */}
            <Card className="p-8 bg-[#1C1622]/40 border-white/5">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-gray-400"><Compass size={18}/></div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">CURRENT TRACK</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">{journeyTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Sun size={14} className="animate-spin-slow" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Stage 1: Discovery</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {stages.map((stage) => (
                  <div key={stage.id} className="flex flex-col items-center text-center space-y-3 group transition-all">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${stage.active ? 'border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)]' : 'border-white/10 text-gray-600'}`}>
                      <stage.icon size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${stage.active ? 'text-white' : 'text-gray-600'}`}>{stage.label}</p>
                      <p className="text-[9px] text-gray-700 italic font-medium">{stage.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* THE ROOTWORK */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
                <Flame size={16} className="text-teal-500" /> User Rootwork
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LINGUISTIC INTAKE */}
                <Card className="relative p-8 bg-[#1C1622]/40 border-white/5 flex flex-col items-center justify-center text-center space-y-4 min-h-[240px] group transition-all hover:border-teal-500/20">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-700 ${uploadComplete ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/5 text-gray-500'}`}>
                      {isUploading ? <RefreshCw className="animate-spin" /> : uploadComplete ? <Check /> : <Upload size={24} />}
                   </div>
                   <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">Linguistic Intake</p>
                     <p className="text-[11px] text-gray-500 italic">Upload resume for synthesis</p>
                   </div>
                   <input type="file" id="h-upload" className="hidden" onChange={handleFileChange} />
                   <Button asChild variant="outline" className="text-[9px] font-black uppercase tracking-widest h-8 border-white/10 hover:bg-white/5 cursor-pointer">
                      <label htmlFor="h-upload">{uploadComplete ? "Resume Synced" : "Select File"}</label>
                   </Button>
                </Card>

                {/* PULSE CHECK / LOGBOOK */}
                <Card className="p-6 bg-[#1C1622]/40 border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pulse Check</p>
                    <span className="text-[9px] font-mono text-gray-700 uppercase tracking-tighter">Frequency: Unset</span>
                  </div>
                  <Textarea 
                    placeholder="Enter today's reflection..."
                    className="bg-transparent border-none focus-visible:ring-0 text-sm italic p-0 min-h-[100px] text-gray-400 placeholder:text-gray-700 resize-none"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                     <div className="flex gap-3">
                        {["🌱", "🔥", "🌪️", "✨"].map(e => (
                          <button key={e} className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all text-xl">{e}</button>
                        ))}
                     </div>
                     <Button className="h-7 text-[9px] font-black uppercase bg-white/5 hover:bg-white/10 border border-white/5 px-4">Bank Pulse</Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* SIDEBAR: ECOSYSTEM STATUS */}
          <div className="space-y-8">
            <Card className="p-8 bg-[#1C1622]/40 border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <Lock size={16} className="text-gray-600" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Maturing Status</p>
              </div>
              <p className="text-xs text-gray-500 italic leading-relaxed">
                Log 14 pulses to unlock the full <span className="text-white font-bold">Mycelium Network Map</span>.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-gray-600">
                  <span>PULSE PROGRESS</span>
                  <span>0%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-teal-500 transition-all duration-1000" />
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-[#1C1622]/40 border-white/5 space-y-4 border-l-2 border-l-teal-500/30">
              <div className="flex items-center gap-2">
                <div className="text-teal-500 text-xs">◆</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white">Reciprocity Model</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                Your presence supports the collective. One seat purchased sponsors a peer in transition.
              </p>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest h-10 border border-white/10">
                View The Grove
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}