import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flame, Compass, ArrowRight, Heart, Sun, Smile, MessageSquare, Lock, Infinity } from 'lucide-react';

export default function Hearth({ vault, onSync }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [reflection, setReflection] = useState("");

  const emojis = [
    { icon: "🌱", label: "Growing" },
    { icon: "🔥", label: "Ignited" },
    { icon: "🌊", label: "Flowing" },
    { icon: "🏔️", label: "Grounded" },
    { icon: "🌪️", label: "Shifting" },
    { icon: "✨", label: "Inspired" }
  ];

  const logEntries = [
    { date: "Apr 9, 2026", status: "Ignited", text: "Translated 'Curriculum Management' into 'Product Operations' today. It feels more accurate than I expected." },
    { date: "Apr 8, 2026", status: "Grounded", text: "Successfully navigated the first Bridge Crossing." },
  ];

  const isSeedling = vault?.tier === "Seedling" || vault?.tier === "Free" || !vault?.tier;

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8 font-sans text-white bg-[#0F0A15] min-h-screen">
      
      {/* 1. TOP JOURNEY TRACKER */}
      <Card className="bg-[#1C1622]/40 border-white/10 p-8 mb-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-start mb-10">
          <div className="flex gap-5 items-center">
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
              <Compass size={24} className="text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">CURRENT PATH</p>
              <h2 className="text-2xl font-bold tracking-tight">{vault?.journey || "Classroom to New Horizon"}</h2>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <Sun size={14} className="text-orange-400" /> Stage 1 of 4
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 relative">
          {['Discovery', 'Translation', 'Bridging', 'Launching'].map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-4 relative z-10">
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${i === 0 ? 'border-teal-500 bg-teal-500/20 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.3)]' : 'border-white/5 bg-white/5 text-gray-700'}`}>
                {i === 0 ? <Compass size={24} /> : <Lock size={20} />}
              </div>
              <div className="text-center">
                <p className={`text-[11px] font-black uppercase tracking-widest ${i === 0 ? 'text-white' : 'text-gray-700'}`}>{step}</p>
                <p className="text-[9px] text-gray-600 italic mt-1">{i === 0 ? "Analyzing Ecosystem" : "Locked"}</p>
              </div>
            </div>
          ))}
          <div className="absolute top-7 left-0 w-full h-[2px] bg-white/5 -z-0" />
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT & CENTER: THE ROOTWORK & LOGBOOK */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3 italic text-teal-500">
            <Flame size={18} className="fill-teal-500/20" /> The Rootwork
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#251D2D] border-white/10 p-8 space-y-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Smile size={80} />
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">1. THE EMOJI PULSE</p>
                <div className="grid grid-cols-6 gap-2">
                  {emojis.map((e) => (
                    <button 
                      key={e.label}
                      onClick={() => setSelectedEmoji(e.label)}
                      className={`aspect-square flex flex-col items-center justify-center rounded-xl border transition-all ${selectedEmoji === e.label ? 'bg-teal-500/20 border-teal-500 text-2xl scale-110 shadow-lg shadow-teal-500/10' : 'bg-white/5 border-white/5 grayscale hover:grayscale-0 hover:bg-white/10'}`}
                    >
                      <span>{e.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">2. THE REFLECTION</p>
                <div className="bg-black/20 rounded-xl p-5 min-h-[140px] border border-white/5">
                  <Textarea 
                    placeholder="How did your professional identity shift today? Did you feel more like an educator or an architect of data?"
                    className="bg-transparent border-none p-0 focus-visible:ring-0 text-sm text-gray-300 italic resize-none leading-relaxed"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  />
                </div>
                <Button className="w-full bg-teal-500 hover:bg-teal-400 text-black text-[11px] font-black uppercase tracking-[0.2em] h-14 rounded-xl shadow-lg shadow-teal-500/20">
                  <Flame size={16} className="mr-2 fill-black" /> Ignite the Entry
                </Button>
              </div>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2 text-gray-500">
                <MessageSquare size={16} />
                <p className="text-[10px] font-black uppercase tracking-widest">RECENT PULSES</p>
              </div>
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                {logEntries.map((entry, i) => (
                  <Card key={i} className="p-5 bg-[#1C1622]/60 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{entry.date}</span>
                      <span className="px-2 py-1 rounded bg-teal-500/10 text-teal-400 text-[9px] font-black uppercase italic tracking-widest">{entry.status}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed italic">"{entry.text}"</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: CREDITS & RECOGNITION */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {isSeedling ? (
            <Card className="bg-gradient-to-br from-[#1C1622] to-[#120D16] border-white/10 p-8 space-y-6 rounded-2xl">
              <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em]">SEEDLING CREDITS</p>
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                    <ArrowRight size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase text-white tracking-widest">BRIDGE CROSSINGS</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">2 PER MONTH</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white tracking-tighter">2/2</span>
              </div>
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest h-14 rounded-xl border border-white/10">
                OPEN THE BRIDGE <ArrowRight size={14} className="ml-2" />
              </Button>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-[#1C1622] to-[#120D16] border-teal-500/20 p-8 space-y-6 rounded-2xl shadow-lg shadow-teal-500/5">
              <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">{vault?.tier} ACCESS</p>
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20">
                    <Infinity size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase text-white tracking-widest">BRIDGE CROSSINGS</p>
                    <p className="text-[9px] text-teal-500/60 font-bold uppercase mt-1">UNLIMITED ACCESS</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest h-14 rounded-xl border border-teal-500/30 transition-all">
                OPEN THE BRIDGE <ArrowRight size={14} className="ml-2" />
              </Button>
            </Card>
          )}

          <Card className="bg-[#1C1622]/40 border-white/5 p-8 space-y-6 rounded-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-500">
                <Lock size={14} />
                <p className="text-[10px] font-black uppercase tracking-widest">ECOSYSTEM MATURITY</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              Feed the hearth <span className="text-white font-bold underline decoration-teal-500/50">14 more times</span> to visualize your transition's hidden network.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase">
                <span>0 / 14 PULSES</span>
                <span>0%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full w-0 bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-1000" />
              </div>
            </div>
          </Card>

          <Card className="bg-transparent border-2 border-dashed border-white/5 p-8 space-y-4 rounded-2xl opacity-60">
            <div className="flex items-center gap-2 text-white">
              <Heart size={14} className="text-teal-500 fill-teal-500" />
              <p className="text-[10px] font-black uppercase tracking-widest">RECIPROCITY MODEL</p>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed italic">
              One seat purchased sponsors a peer in financial transition. No one gets left behind.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}