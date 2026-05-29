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
  FileText, 
  Mic, 
  ExternalLink, 
  BookOpen, 
  Package, 
  ShieldCheck, 
  CheckCircle2,
  Hammer,
  ChevronRight
} from 'lucide-react';

// ─── AMZ_LISTS DATA STRUCTURE ────────────────────────────────────────────────
const AMZ_LISTS = [
  { label: "Horizon Library", url: "#", isFeatured: true },
  { label: "Curiosity Cabinet", url: "#", isFeatured: false },
  { label: "Analog Wayfarers", url: "#", isFeatured: false },
  { label: "Digital Hub", url: "#", isFeatured: false },
  { label: "Ergonomic Sanctuary", url: "#", isFeatured: false }
];

// ─── SUB-COMPONENT: THE PORCH ───────────────────────────────────────────────
function ThePorch({ vault, isHearthkeeper, hasPurchasedCard, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-20 pb-24"
    >
      {/* Introduction Sub-Header */}
      <div className="border-l border-purple-500/30 pl-6 space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-purple-400">Page 1 — The Porch</p>
        <h2 className="text-5xl font-serif italic text-zinc-100 tracking-tight">The Library</h2>
        <p className="text-sm font-serif text-zinc-500 italic">A public gathering place. Open to all wayfarers.</p>
      </div>

      {/* SECTION 1: DECK OF THE FOREST ARCHETYPES */}
      <section className="space-y-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Deck of the Forest</span>
          <h3 className="text-3xl font-serif text-zinc-200 mt-1">The Forest Archetypes</h3>
          <p className="text-xs text-zinc-500 font-serif italic mt-1">Tap any card to reveal your private-sector translation and target roles.</p>
        </div>

        {/* Archetype Responsive Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: The Builder */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative p-8 rounded-[2rem] bg-[#0A0810] border border-zinc-800/60 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[280px]"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                  <Flame size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-purple-900/20 text-purple-300 rounded-full border border-purple-500/20">
                  Curriculum Designer
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif italic text-purple-100">The Builder</h4>
                <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">
                  You engineer systems that outlive their architects.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
                Curriculum Designer / Program Manager
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-purple-400/80 group-hover:text-purple-300 flex items-center gap-1 transition-colors">
                Tap to Reveal
              </span>
            </div>
          </motion.div>

          {/* Card 2: The Navigator */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative p-8 rounded-[2rem] bg-[#0A0810] border border-zinc-800/60 hover:border-teal-500/20 hover:border-teal-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[280px]"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
                  <Compass size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-teal-900/20 text-teal-300 rounded-full border border-teal-500/20">
                  Policy Analyst
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif italic text-teal-100">The Navigator</h4>
                <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">
                  You chart courses through institutional fog.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
                Policy Analyst / Regulatory Specialist
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-teal-400/80 group-hover:text-teal-300 flex items-center gap-1 transition-colors">
                Tap to Reveal
              </span>
            </div>
          </motion.div>

          {/* Card 3: The Steward */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative p-8 rounded-[2rem] bg-[#0A0810] border border-zinc-800/60 hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[280px]"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                  <Mountain size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-purple-900/20 text-purple-300 rounded-full border border-purple-500/20">
                  Social Worker
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif italic text-purple-100">The Steward</h4>
                <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">
                  You hold the weight of others with expertise.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
                Social Worker / Case Manager
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-purple-400/80 group-hover:text-purple-300 flex items-center gap-1 transition-colors">
                Tap to Reveal
              </span>
            </div>
          </motion.div>

          {/* Card 4: The Strategist */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative p-8 rounded-[2rem] bg-[#0A0810] border border-zinc-800/60 hover:border-amber-500/20 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[280px]"
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center w-full">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                  <Sparkles size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-4 py-1.5 bg-amber-900/20 text-amber-300 rounded-full border border-amber-500/20">
                  Principal
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-serif italic text-amber-100">The Strategist</h4>
                <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">
                  You turn institutional vision into measurable outcomes.
                </p>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase">
                Principal / Director of Education
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-amber-400/80 group-hover:text-amber-300 flex items-center gap-1 transition-colors">
                Tap to Reveal
              </span>
            </div>
          </motion.div>
        </div>

        {/* Global Action Link to Full Vault infrastructure */}
        <div className="p-6 bg-gradient-to-r from-teal-950/20 to-transparent border border-teal-500/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest text-teal-400">Full Archetype Vault</h5>
            <p className="text-xs text-zinc-500 font-serif italic mt-0.5">All 12 archetypes, role mappings, and salary benchmarks.</p>
          </div>
          <button className="px-6 py-3 bg-teal-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(20,184,166,0.15)] flex items-center justify-center gap-2 shrink-0">
            Open Vault <ExternalLink size={12} />
          </button>
        </div>
      </section>

      {/* SECTION 2: THE WELL-BEING GROVE */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            <Flame size={16} />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-zinc-200">The Well-being Grove</h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Mental Health & Resilience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Sanctuary Lifeline */}
          <div className="bg-[#0A0810] border border-red-500/10 rounded-3xl p-6 flex flex-col justify-between min-h-[340px]">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-red-500/10 rounded-xl text-red-400 border border-red-500/20">
                  <PhoneCall size={16} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest bg-red-500 text-white px-2.5 py-1 rounded-md">
                  Priority Access
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif italic text-zinc-200">Sanctuary Lifeline</h4>
                <p className="text-xs text-zinc-500 font-serif italic leading-relaxed">
                  A CMHA resource for nurturing mental health through adult life, paired with immediate crisis support.
                </p>
              </div>
              {/* Highlight Hotline Block */}
              <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4 space-y-1">
                <span className="text-2xl font-black tracking-tight text-red-400">9-8-8</span>
                <p className="text-[8px] font-mono uppercase tracking-wide text-red-400/80 leading-tight">
                  Suicide Crisis Helpline — Call or Text Anytime
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5">
              Open Resource <ExternalLink size={11} />
            </button>
          </div>

          {/* Card 2: Burnout to Balance */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-3xl p-6 flex flex-col justify-between min-h-[340px]">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-zinc-800/40 rounded-xl text-amber-500/80 border border-zinc-700/30">
                  <FileText size={16} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest bg-zinc-800/60 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-700/40">
                  PDF Guide
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif italic text-zinc-200">Burnout to Balance</h4>
                <p className="text-xs text-zinc-500 font-serif italic leading-relaxed">
                  A comprehensive guide to reclaiming your energy and setting sustainable boundaries.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-1.5">
              Open Resource <ExternalLink size={11} />
            </button>
          </div>

          {/* Card 3: Your Inner Advocate */}
          <div className="bg-[#0A0810] border border-zinc-800/60 rounded-3xl p-6 flex flex-col justify-between min-h-[340px]">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-zinc-800/40 rounded-xl text-teal-400 border border-zinc-700/30">
                  <Mic size={16} />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest bg-zinc-800/60 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-700/40">
                  Podcast
                </span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif italic text-zinc-200">Your Inner Advocate</h4>
                <p className="text-xs text-zinc-500 font-serif italic leading-relaxed">
                  A podcast dedicated to changing the internal narrative and advocating for your own mental well-being.
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-1.5">
              Open Resource <ExternalLink size={11} />
            </button>
          </div>
        </div>

        {/* Dynamic Warning Alert Banner */}
        <div className="p-5 bg-[#070B0E] border border-teal-500/10 rounded-2xl flex gap-4 items-start">
          <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400 mt-0.5 shrink-0">
            <ShieldCheck size={14} />
          </div>
          <p className="text-[11px] font-serif italic text-zinc-500 leading-relaxed">
            "The Hearth is a tool for navigation, but your internal compass is the final authority. If the weight feels too heavy, please seek direct support from a licensed professional."
          </p>
        </div>
      </section>

      {/* SECTION 3: THE OUTFITTER */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
            <Package size={16} />
          </div>
          <div>
            <h3 className="text-2xl font-serif text-zinc-200">The Outfitter</h3>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Curated Tools & Reading</p>
          </div>
        </div>

        {/* Affiliate Asset Matrix Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AMZ_LISTS.map((list) => (
            <a 
              key={list.label} 
              href={list.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group flex items-center justify-between gap-4 bg-[#0A0810] border border-zinc-800/60 px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:border-teal-500/40 hover:text-teal-400 transition-all duration-200 ${
                list.isFeatured ? 'md:col-span-2 border-teal-500/20 bg-teal-500/[0.02] py-6' : ''
              }`}
            >
              <span className="flex items-center gap-3">
                {list.isFeatured ? (
                  <BookOpen size={14} className="text-teal-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Package size={14} className="text-zinc-600 group-hover:text-teal-500/60 transition-colors" />
                )}
                {list.label}
              </span>
              <ExternalLink size={12} className="text-zinc-600 group-hover:text-teal-400 transition-colors shrink-0" />
            </a>
          ))}
        </div>
        <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
          As an Amazon Associate I earn from qualifying purchases.
        </p>
      </section>

      {/* SECTION 4: GATEWAY TRAIL TO THE SMITHY */}
      <section className="pt-8 flex flex-col items-center text-center relative">
        {/* Decorative Down Arrow Timeline Line */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-800 to-teal-500/40 mb-4" />
        
        <button 
          onClick={() => navigate('smithy')}
          className="mb-12 px-5 py-2.5 bg-black/40 border border-teal-500/20 hover:border-teal-500/40 text-teal-400 text-[9px] font-black uppercase tracking-widest rounded-full transition-all flex items-center gap-2 group backdrop-blur-sm"
        >
          <Hammer size={12} className="text-teal-500/60 group-hover:rotate-12 transition-transform" />
          Step Into The Smithy
          <span className="text-zinc-600 font-serif normal-case italic ml-1">Templates & Blueprints</span>
        </button>

        {/* Dynamic Gate Card Context Check */}
        <div className="w-full max-w-3xl p-10 rounded-[2.5rem] bg-gradient-to-b from-[#0B1110] to-[#06080D] border border-teal-500/10 relative overflow-hidden flex flex-col items-center">
          <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 text-zinc-400 pointer-events-none hidden md:block">
            <TreePine size={140} />
          </div>

          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400">Hearthkeeper Access</span>
          <h4 className="text-3xl font-serif mt-3 text-zinc-100 max-w-lg leading-snug">
            The trail goes deeper. <br />
            <span className="italic text-teal-400">Step into the Smithy.</span>
          </h4>
          <p className="text-xs text-zinc-500 font-serif italic max-w-md mt-4 leading-relaxed">
            Resume templates, salary scripts, tactical blueprints, and Brigid's full AI counsel — locked behind the Smithy door.
          </p>

          <button 
            onClick={() => navigate('smithy')}
            className="mt-8 px-8 py-3.5 bg-teal-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-[0_4px_25px_rgba(20,184,166,0.15)] flex items-center gap-2"
          >
            Enter The Smithy <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

// ─── SUB-COMPONENT: SMITHY GATE (LOCKED PLACEHOLDER) ────────────────────────
function SmithyGate() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 text-center max-w-md mx-auto space-y-6"
    >
      <div className="p-4 bg-purple-500/10 text-purple-400 rounded-2xl inline-block border border-purple-500/20">
        <Lock size={24} />
      </div>
      <h3 className="text-2xl font-serif text-purple-100">The Forge is Closed</h3>
      <p className="text-xs font-serif text-zinc-500 italic leading-relaxed">
        Access to the Inner Smithy requires an active Hearthkeeper Tier or Steward clearance code. 
        Sync your credentials or upgrade your membership to unlock the core blueprints.
      </p>
      <button className="px-6 py-3 bg-purple-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-purple-600 transition-all">
        Upgrade Tier Access
      </button>
    </motion.div>
  );
}

// ─── SUB-COMPONENT: THE SMITHY VIEW PAGE (SECURED STAGE) ─────────────────────
function TheSmithyPage({ vault, onSync, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-12 pb-24"
    >
      <div className="border-l border-teal-500/30 pl-6 space-y-2">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-400">Page 2 — The Inner Smithy</p>
        <h2 className="text-4xl font-serif italic text-zinc-100">Tactical Blueprints & Forges</h2>
        <p className="text-sm font-serif text-zinc-500 italic">Secure production dashboard. Forged out of lived professional transitions.</p>
      </div>

      {/* Production tools placeholder */}
      <div className="p-12 border border-zinc-800/80 rounded-[2rem] bg-[#0A0810] text-center space-y-4">
        <div className="p-3 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-xl inline-block">
          <Hammer size={20} />
        </div>
        <h3 className="text-xl font-serif text-zinc-300">The Forge Dashboard is Active</h3>
        <p className="text-xs font-serif text-zinc-500 max-w-sm mx-auto italic leading-relaxed">
          Your credentials match our Steward profiles. Resume components, data re-mapping prompts, and tactical execution guides are synchronized.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <button onClick={() => onSync?.()} className="px-5 py-2.5 bg-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-colors">
            Sync Notion Engine
          </button>
          <button onClick={() => navigate('porch')} className="px-5 py-2.5 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-colors">
            Return to Porch
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SUB-COMPONENT: GLOBAL QUALITY SEAL FOOTER ───────────────────────────────
function SMEFooter() {
  return (
    <footer className="max-w-4xl mx-auto px-6 pb-20 mt-12">
      <section className="p-8 md:p-10 rounded-[2.5rem] bg-[#0A0810] border border-zinc-800/80 relative overflow-hidden">
        {/* Large Decorative Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-[0.02] text-teal-400 pointer-events-none">
          <BookOpen size={200} />
        </div>

        {/* Header Block with Meta Details */}
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
          <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400">Quality Seal</h4>
            <h3 className="text-xl font-serif italic text-purple-200">Margaret Rideout, M.Ed.</h3>
          </div>
        </div>

        {/* Experience Timeline Rows */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={14} className="text-teal-500/60 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200 font-bold uppercase tracking-wide text-[9px] mr-1">Master of Education (M.Ed.):</strong> 
              Curriculum & Pedagogy Focus
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={14} className="text-teal-500/60 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200 font-bold uppercase tracking-wide text-[9px] mr-1">13+ Years Leadership:</strong> 
              Program Management, Curriculum Development & Ecosystem Architecture
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={14} className="text-teal-500/60 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200 font-bold uppercase tracking-wide text-[9px] mr-1">BA, B.Ed.:</strong> 
              Foundational Academic Training in English, Psychology, and Elementary Methods
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 size={14} className="text-teal-500/60 mt-0.5 shrink-0" />
            <p className="text-xs text-zinc-400">
              <strong className="text-zinc-200 font-bold uppercase tracking-wide text-[9px] mr-1">Indigenous Studies:</strong> 
              Specialist Focus
            </p>
          </div>
        </div>

        {/* Bottom Epilogue Quote */}
        <p className="text-[11px] font-serif text-zinc-500 italic mt-8 border-l border-purple-500/20 pl-4 leading-relaxed">
          "Every tool and framework in this platform is built on lived expertise, not industry trends. The methodology works because it was designed inside the institutional structures it now helps folks safely navigate and exit."
        </p>
      </section>

      {/* Small Inline Micro Floating Indicator */}
      <div className="mt-6 flex justify-end">
        <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2 text-zinc-500">
          <ShieldCheck size={12} className="text-teal-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400">
            Frameworks Curated By Margaret Rideout, M.Ed. • 13+ Yrs Program Management
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN ECOSYSTEM COMPONENT: LIBRARY ───────────────────────────────────────
export default function Library({ vault, onRefresh, onSync, isAdmin }) {
  // 'porch' = Public View, 'smithy' = Locked Forge View
  const [page, setPage] = useState('porch');

  // Determine user status smoothly from the vault infrastructure state
  const isHearthkeeper = vault?.tier?.tier_level >= 2 || isAdmin || false;
  const hasPurchasedCard = vault?.purchased_cards?.length > 0 || false;

  // Handles smooth sub-route style page shifting within the Library ecosystem view
  const handleNavigation = (targetPage) => {
    if (targetPage === 'smithy') {
      setPage('smithy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPage('porch');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050409] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-teal-900/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Internal Navigation Header */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TreePine size={14} className="text-teal-500/40" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">The Library Sub-Ecosystem</span>
          </div>
          <h1 className="text-3xl font-serif text-zinc-100">
            {page === 'porch' ? "The Sanctuary Library" : "The Inner Smithy"}
          </h1>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex p-1 bg-black/60 border border-white/5 rounded-xl shrink-0">
          <button
            onClick={() => handleNavigation('porch')}
            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
              page === 'porch'
                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            The Porch
          </button>
          <button
            onClick={() => handleNavigation('smithy')}
            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
              page === 'smithy'
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            {!isHearthkeeper && <Lock size={9} className="text-zinc-600" />}
            The Smithy
          </button>
        </div>
      </header>

      {/* Main Adaptive Stage */}
      <main className="max-w-4xl mx-auto px-6 pt-12">
        <AnimatePresence mode="wait">
          {page === 'porch' ? (
            <ThePorch
              key="porch-view"
              vault={vault}
              isHearthkeeper={isHearthkeeper}
              hasPurchasedCard={hasPurchasedCard}
              navigate={handleNavigation}
            />
          ) : (
            // Secure Gate Check for The Smithy page view
            isHearthkeeper ? (
              <TheSmithyPage
                key="smithy-view"
                vault={vault}
                onSync={onSync}
                navigate={handleNavigation}
              />
            ) : (
              <SmithyGate key="smithy-gate" />
            )
          )}
        </AnimatePresence>
      </main>

      {/* Grounding Global Footer Verification Stamp */}
      <SMEFooter />
    </div>
  );
}