import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TreePine, 
  Flame, 
  Compass, 
  Mountain, 
  Sparkles, 
  PhoneCall, 
  Heart,
  ExternalLink, 
  Package, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';

// Unified Active Archetype Data
const ARCHETYPES = [
  { id: 'builder', label: 'The Builder', role: 'Curriculum Designer', subtitle: 'You engineer systems that outlive their architects.', icon: Flame, color: 'text-purple-400', bg: 'bg-purple-500/10', translation: 'Curriculum Designer / Program Manager' },
  { id: 'navigator', label: 'The Navigator', role: 'Policy Analyst', subtitle: 'You chart courses through institutional fog.', icon: Compass, color: 'text-teal-400', bg: 'bg-teal-500/10', translation: 'Policy Analyst / Regulatory Specialist' },
  { id: 'steward', label: 'The Steward', role: 'Social Worker', subtitle: 'You hold the weight of others with expertise.', icon: Mountain, color: 'text-purple-400', bg: 'bg-purple-500/10', translation: 'Social Worker / Case Manager' },
  { id: 'strategist', label: 'The Strategist', role: 'Principal', subtitle: 'You turn institutional vision into outcomes.', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10', translation: 'Principal / Director of Education' }
];

// Active Amazon Curated Lists Only
const AMZ_LISTS = [
  { label: "Curiosity Cabinet", url: "https://www.amazon.ca" },
  { label: "Analog Wayfarers", url: "https://www.amazon.ca" },
  { label: "Digital Hub", url: "https://www.amazon.ca" },
  { label: "Ergonomic Sanctuary", url: "https://www.amazon.ca" }
];

export default function Library() {
  const [activeArchetype, setActiveArchetype] = useState('builder');
  const currentArch = ARCHETYPES.find(a => a.id === activeArchetype);
  const IconComponent = currentArch.icon;

  return (
    <div className="min-h-screen bg-[#050409] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 pb-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TreePine size={14} className="text-teal-500/40" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">The Ecosystem</span>
          </div>
          <h1 className="text-3xl font-serif text-zinc-100 tracking-tight">The Library</h1>
        </div>
        
        <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
          <ShieldCheck size={12} className="text-teal-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400">Margaret Rideout, M.Ed.</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
        
        {/* ─── ZONE 1: ECO-SYSTEM TRANSLATION WORKBENCH ───────────────────── */}
        <section className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden">
          
          {/* Left Column: Selector Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 block mb-2">Deck of the Forest</span>
              <h2 className="text-xl font-serif text-zinc-200">The Forest Archetypes</h2>
            </div>
            
            <div className="space-y-2">
              {ARCHETYPES.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setActiveArchetype(arch.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between ${
                    activeArchetype === arch.id 
                      ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' 
                      : 'text-zinc-500 hover:text-zinc-400 border border-transparent'
                  }`}
                >
                  {arch.label}
                  <ChevronRight size={12} className={activeArchetype === arch.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Archetype Card */}
          <div className="md:col-span-8 bg-[#050409]/60 border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between min-h-[200px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className={`p-2.5 ${currentArch.bg} rounded-xl ${currentArch.color}`}>
                  <IconComponent size={16} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 ${currentArch.color} rounded-full border border-white/5`}>
                  Institutional Focus: {currentArch.role}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-serif italic text-zinc-100">{currentArch.label}</h4>
                <p className="text-xs text-zinc-400 font-serif italic mt-1 leading-relaxed">{currentArch.subtitle}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                Private Sector Realignment: {currentArch.translation}
              </span>
            </div>
          </div>
        </section>

        {/* ─── ZONE 2: WELL-BEING & CURATED OUTFITTER TOOLS ───────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Well-being Grove Crisis Support */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                  <Heart size={14} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-zinc-200">The Well-being Grove</h3>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">Resilience Resource</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Nurturing mental health through major career changes. If the internal weight becomes too heavy to navigate alone, priority crisis support is always open.
              </p>
            </div>

            <div className="bg-red-950/20 border border-red-500/10 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-black tracking-tight text-red-400 block">9-8-8</span>
                <span className="text-[8px] font-mono uppercase tracking-wide text-zinc-500">Suicide Crisis Helpline (Call or Text)</span>
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded">24/7 Toll-Free</span>
            </div>
          </div>

          {/* Right: The Outfitter Lists */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
                  <Package size={14} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-zinc-200">The Outfitter</h3>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">Curated Workspaces & Tools</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Affiliate logs featuring reliable analog accessories, work-from-home gear, and software configurations built for remote professionals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {AMZ_LISTS.map((list) => (
                <a 
                  key={list.label} 
                  href={list.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-teal-400 hover:border-teal-500/20 transition-all"
                >
                  <span>{list.label}</span>
                  <ExternalLink size={10} className="text-zinc-600" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ─── AMZ ASSOCIATE LEGAL DISCLAIMER ──────────────────────────────── */}
        <div className="text-center">
          <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>

      </main>
    </div>
  );
}