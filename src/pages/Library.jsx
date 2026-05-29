import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TreePine, 
  Lock, 
  Flame, 
  Compass, 
  Mountain, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Heart,
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Hammer,
  ChevronRight
} from 'lucide-react';

// Unified Archetype Data
const ARCHETYPES = [
  { id: 'builder', label: 'The Builder', role: 'Curriculum Designer', subtitle: 'You engineer systems that outlive their architects.', icon: Flame, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/30', translation: 'Curriculum Designer / Program Manager' },
  { id: 'navigator', label: 'The Navigator', role: 'Policy Analyst', subtitle: 'You chart courses through institutional fog.', icon: Compass, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'hover:border-teal-500/30', translation: 'Policy Analyst / Regulatory Specialist' },
  { id: 'steward', label: 'The Steward', role: 'Social Worker', subtitle: 'You hold the weight of others with expertise.', icon: Mountain, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'hover:border-purple-500/30', translation: 'Social Worker / Case Manager' },
  { id: 'strategist', label: 'The Strategist', role: 'Principal', subtitle: 'You turn institutional vision into outcomes.', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/30', translation: 'Principal / Director of Education' }
];

export default function Library({ vault, onSync, isAdmin }) {
  const [activeArchetype, setActiveArchetype] = useState('builder');
  const isHearthkeeper = vault?.tier?.tier_level >= 2 || isAdmin || false;

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
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">The Library</span>
          </div>
          <h1 className="text-3xl font-serif text-zinc-100 tracking-tight">The Sanctuary Library</h1>
        </div>
        
        <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
          <ShieldCheck size={12} className="text-teal-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400">Verified Curriculum Framework</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-16">
        
        {/* ─── ZONE 1: ECO-SYSTEM TRANSLATION WORKBENCH ───────────────────── */}
        <section className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 relative overflow-hidden">
          
          {/* Left Column: Minimal Selector Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400 block mb-2">The Deck of the Forest</span>
              <h2 className="text-xl font-serif text-zinc-200">Archetype Translation</h2>
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

          {/* Right Column: Dynamic Stage Card */}
          <div className="md:col-span-8 bg-[#050409]/60 border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className={`p-2.5 ${currentArch.bg} rounded-xl ${currentArch.color}`}>
                  <IconComponent size={16} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 ${currentArch.color} rounded-full border border-white/5`}>
                  {currentArch.role}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-serif italic text-zinc-100">{currentArch.label}</h4>
                <p className="text-xs text-zinc-400 font-serif italic mt-1 leading-relaxed">{currentArch.subtitle}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                Corporate Alignment: {currentArch.translation}
              </span>
              <button className="text-[9px] font-black uppercase tracking-widest text-teal-400 flex items-center gap-1.5 self-end sm:self-auto hover:text-teal-300 transition-colors">
                Explore Core Metrics <ArrowRight size={10} />
              </button>
            </div>
          </div>
        </section>

        {/* ─── ZONE 2: COALESCED WELL-BEING & OUTFITTER GRID ──────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Grounded Well-being Panel */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                  <Heart size={14} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-zinc-200">The Well-being Grove</h3>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">Resilience Hub</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Nurturing mental clarity through institutional decompression. If the internal weight feels too heavy to navigate alone, priority help is permanently open.
              </p>
            </div>

            <div className="space-y-3">
              <div className="bg-red-950/20 border border-red-500/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xl font-black tracking-tight text-red-400 block">9-8-8</span>
                  <span className="text-[8px] font-mono uppercase tracking-wide text-zinc-500">Suicide Crisis Helpline (Call/Text)</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-1 rounded">24/7 Access</span>
              </div>
              <a href="#" className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-teal-400 hover:border-teal-500/20 transition-all">
                <span>Download Decompression Guides</span>
                <ExternalLink size={10} className="text-zinc-600" />
              </a>
            </div>
          </div>

          {/* Right: Curated Outfitter Gear */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-[2rem] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
                  <BookOpen size={14} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-zinc-200">The Outfitter</h3>
                  <p className="text-[8px] font-mono uppercase tracking-wider text-zinc-500">Curated Workspaces & Reading</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Hand-selected analog accessories, professional reading materials, ergonomic setups, and digital framework systems built for remote data workers.
              </p>
            </div>

            <div className="space-y-2">
              <a href="#" className="flex items-center justify-between px-4 py-3 bg-teal-500/[0.02] border border-teal-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500/10 transition-all">
                <span className="flex items-center gap-2">Horizon Public Reading Library</span>
                <ExternalLink size={10} />
              </a>
              <div className="flex items-center justify-between p-3 text-[8px] font-mono uppercase tracking-wider text-zinc-600 border-t border-white/5 mt-2">
                <span>Amazon Associate Qualifier Program</span>
              </div>
            </div>
          </div>

        </div>

        {/* ─── ZONE 3: ONE-PIECE INTEGRATED CALL TO THE SMITHY ────────────── */}
        <section className="p-8 rounded-[2rem] bg-gradient-to-b from-[#0B1110] to-[#06080D] border border-teal-500/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400">Hearthkeeper Access Portal</span>
            </div>
            <h3 className="text-xl font-serif text-zinc-100">Ready to forge your functional documentation?</h3>
            <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
              Unlock resume templates built for human review systems, specific salary negotiation scripts, and advanced organizational frameworks inside the Inner Smithy.
            </p>
          </div>

          <button className="px-6 py-3.5 bg-teal-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-[0_4px_20px_rgba(20,184,166,0.15)] flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center">
            Enter The Smithy <ArrowRight size={12} />
          </button>
        </section>

      </main>
    </div>
  );
}