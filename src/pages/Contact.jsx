import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hammer, 
  ShieldCheck, 
  ClipboardList, 
  FileText, 
  Mail, 
  Coins, 
  ChevronDown, 
  Copy, 
  Check,
  TreePine
} from 'lucide-react';

export default function Contact() {
  // State to track which accordion section is expanded
  const [expandedSection, setExpandedSection] = useState(null);
  // State to track clipboard copy confirmation
  const [copiedText, setCopiedText] = useState(false);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setCopiedText(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // The 4 Core Active Smithy Tools (with Provisions for the Path completely removed)
  const SMITHY_ITEMS = [
    {
      id: 'identity-ledger',
      label: 'The Identity Ledger',
      sublabel: 'Worksheet PDF & Identity Slides — decouple your worth.',
      icon: ClipboardList,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      content: {
        type: 'download',
        text: 'Before you can rewrite a resume, you have to disconnect your human value from institutional systems. Download the tracking frameworks and decoupling slides below to begin isolating your raw operational metrics.',
        actionLabel: 'Access Ledger Assets',
        url: '#' // Tie to your internal document path or Gumroad download link
      }
    },
    {
      id: 'blueprint',
      label: 'The Blueprint',
      sublabel: 'ATS-optimized resume template — ready to deploy.',
      icon: FileText,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
      content: {
        type: 'download',
        text: 'A clean, single-column markdown and documents template built entirely for technical parsing engines. Strips out tables and visual noise to ensure your translated skills score maximum structural alignment.',
        actionLabel: 'Download Resume Blueprint',
        url: '#'
      }
    },
    {
      id: 'sponsorship',
      label: 'Sponsorship Outreach',
      sublabel: '4-phase scripts to turn contacts into advocates.',
      icon: Mail,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      content: {
        type: 'script',
        text: '“Hi [Name], I recently completed a 13-year chapter managing complex institutional frameworks and caseload logistics in the public sector. I am expanding my technical circle as I align full-time into remote language data operations. I noticed your work with data pipelines and would love to follow your updates here. If you ever have a brief window for an async text chat about the ecosystem, I would be honored to connect.”',
        instructions: 'Send this to mid-level operations or data managers on LinkedIn. Keep your tone grounded, not desperate.'
      }
    },
    {
      id: 'salary',
      label: 'Salary Negotiations',
      sublabel: 'Tactical scripts for the negotiation table.',
      icon: Coins,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      content: {
        type: 'script',
        text: '“I view compensation holistically. Given my deep background directing cross-functional stakeholder groups and optimizing high-stakes communication compliance, I am looking for a base alignment between $85,000 and $95,000. I am entirely open to looking at total equity packages, target bonuses, and remote operational flexibility to ensure a mutually beneficial fit.”',
        instructions: 'Deliver this with absolute calm inflection when a talent advisor asks for your target compensation historical footprint.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#050409] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200 pb-20">
      {/* Deep Sanctuary Atmosphere Lights */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-teal-900/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── HEADER ──────────────────────────────────────────────────────── */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TreePine size={14} className="text-amber-500/40" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Workspace Execution</span>
          </div>
          <h1 className="text-3xl font-serif text-zinc-100 tracking-tight">The Smithy</h1>
        </div>
        
        <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-xl flex items-center gap-2">
          <Hammer size={12} className="text-amber-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-wider text-zinc-400">File: Contact.jsx</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
        
        {/* ─── NEW: ATMOSPHERIC INTRO BLOCK ────────────────────────────────── */}
        <div className="p-6 rounded-3xl bg-[#09070E] border border-amber-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] blur-2xl rounded-full pointer-events-none" />
          <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
            "Your provisions are laid out. Your identity is translated. Now, step up to the anvil. This is the workshop where abstract experience is hammered into sharp, concrete professional agency."
          </p>
        </div>

        {/* ─── ACCORDION REFACTOR MODULE ───────────────────────────────────── */}
        <section className="space-y-3">
          {SMITHY_ITEMS.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedSection === item.id;

            return (
              <div 
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? 'bg-[#0B0810] border-zinc-700/60 shadow-xl shadow-black/40' 
                    : 'bg-[#09070C]/60 border-zinc-800/40 hover:border-zinc-800'
                }`}
              >
                {/* Accordion Trigger Row */}
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} border border-white/5`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-medium tracking-wide text-zinc-200 group-hover:text-zinc-100">
                        {item.label}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500 tracking-tight mt-0.5">
                        {item.sublabel}
                      </p>
                    </div>
                  </div>
                  <div className={`text-zinc-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-400' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Accordion Body Reveal */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-black/20">
                        {item.content.type === 'download' ? (
                          /* View Style for Downloads (Ledger, Blueprint) */
                          <div className="space-y-4">
                            <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                              {item.content.text}
                            </p>
                            <a
                              href={item.content.url}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 hover:border-teal-500/30 text-zinc-300 hover:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              <span>{item.content.actionLabel}</span>
                            </a>
                          </div>
                        ) : (
                          /* View Style for Deployable Scripts (Outreach, Salary) */
                          <div className="space-y-4">
                            <div className="relative p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-serif italic text-zinc-300 leading-relaxed">
                              <button
                                onClick={() => handleCopy(item.content.text)}
                                className="absolute top-2.5 right-2.5 p-1.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-500 hover:text-amber-400 transition-colors"
                                title="Copy blueprint script"
                              >
                                {copiedText ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                              </button>
                              <p className="pr-10 select-all text-zinc-300">
                                {item.content.text}
                              </p>
                            </div>
                            <div className="text-[9px] font-mono tracking-tight text-zinc-500">
                              <span className="text-amber-500/80 uppercase font-black tracking-widest block mb-0.5">Deployment Guidance:</span>
                              {item.content.instructions}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

        {/* ─── LEGAL ASSOCIATE FOOTER NOTE ─────────────────────────────────── */}
        <div className="text-center pt-6">
          <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">
            Hearth & Horizon Sanctuary Environment • All Scripts Active.
          </p>
        </div>

      </main>
    </div>
  );
}