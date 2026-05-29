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
  TreePine,
  ExternalLink,
  Info
} from 'lucide-react';

export default function Contact() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    setCopiedId(null);
  };

  const handleCopy = (text, elementId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(elementId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const SMITHY_ITEMS = [
    {
      id: 'identity-ledger',
      label: 'The Identity Ledger',
      sublabel: 'Worksheet PDF & Identity Slides — decouple your worth.',
      icon: ClipboardList,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      content: {
        type: 'mixed',
        text: 'Before you can structurally rewrite a resume, you must untangle your human value from institutional systems. The public sector trains us to tie our identity to a rigid grid; the private sector requires us to treat our experience as an independent infrastructure.',
        modules: [
          {
            title: "Core Framework: Deconstruction of the Grid",
            description: "A comprehensive internal audit template designed to help you strip out institutional titles and map your raw operational capacity across complex project cycles."
          },
          {
            title: "Slides: Decoupling Your Human Value",
            description: "Visual anchor slides built to ground your psychological focus during intense migration phases, ensuring your confidence remains absolute when communicating with private sector stakeholders."
          }
        ],
        actionLabel: 'Access Identity Ledger & Slides',
        url: 'https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=sharing'
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
        type: 'blueprint-details',
        text: 'A clean, single-column framework designed explicitly for technical parsing engines (ATS). By removing structural vulnerabilities like complex tables, sidebars, and embedded icons, this template ensures your translated skill metrics achieve maximum algorithmic visibility.',
        translationMatrix: [
          { public: "Classroom Management / Lesson Planning", private: "Caseload Logistics / Curriculum Program Architecture / Learning Experience Design" },
          { public: "Individualized Education Plans (IEPs)", private: "Individualized Data Plans / Regulatory Compliance Mapping / High-Friction Stakeholder Alignment" },
          { public: "Parent-Teacher Conferences / Department Meetings", private: "Cross-Functional Cross-Examination / Multi-Tiered Stakeholder Reporting" }
        ],
        actionLabel: 'Download ATS-Engine Resume Blueprint',
        url: 'https://drive.google.com/file/d/1EowCecu8aWhcul8oe8im0I8HhGUTgnwp/view?usp=drive_link'
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
        type: 'script-vault',
        text: 'Cold outreach fails because it feels like a transaction. These communication blueprints are designed to build clean, peer-level rapport within technical and data communities without a shred of corporate pretense.',
        scripts: [
          {
            phase: "Phase 1: The Collective Passage (Initial Connection)",
            scenario: "Send this to operations managers or language data leads at remote tech ecosystems whose work you genuinely respect.",
            body: "“Hi [Name], I’ve been following your updates regarding your team’s recent milestones in language data annotation, and I deeply respect the clean infrastructure you are building. I recently migrated out of a 13-year chapter managing complex institutional programs to focus full-time on curriculum architectures, language models, and user operations. I’m quietly expanding my circle of peers in this space. If you ever have a brief window for an asynchronous text exchange about the ecosystem, I’d be honored to connect. If not, I’ll look forward to learning from your insights here.”"
          },
          {
            phase: "Phase 2: The Virtual Hearth (Following up after connection acceptance)",
            scenario: "Use this to transition a connection into a brief, high-value conversation once they respond warmly.",
            body: "“Thank you for connecting, [Name]. I know your sprint cycles are demanding right now. I’m currently documenting how systemic educational designs translate into modern AI instruction sets. I’d love to hear your perspective on where traditional educators typically drop the ball when transitioning into data pipeline training. No formal meeting needed—even a voice note or short reply here when you have a free moment is incredibly valuable to my research.”"
          }
        ]
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
        type: 'script-vault',
        text: 'The public sector uses rigid steps; the private sector uses dynamic valuation pools. Use these exact scripts to claim your space at the negotiation table with quiet, unshakeable dignity.',
        scripts: [
          {
            phase: "Scenario A: Navigating the Initial Recruiter Screen",
            scenario: "Deploy this word-for-word text when a corporate recruiter asks, “What are your salary expectations for this role?” during your initial call.",
            body: "“Based on my deep background engineering complex instructional architectures, managing large-scale stakeholder variables, and navigating high-stakes regulatory compliance, I am looking for a total compensation package in the range of $85,000 to $95,000. However, I view professional compensation holistically. I am completely open to discussing performance-based bonuses, remote operational flexibility, and professional advancement allocations to ensure we find an arrangement that mirrors the structural impact I’ll be delivering to your team.”"
          },
          {
            phase: "Scenario B: Deflecting the Historical Footprint Inquiry",
            scenario: "Deploy this text if they press you on what you earned previously in your public sector or teaching position.",
            body: "“In the public sector, compensation is tied exclusively to standardized institutional tenure grids rather than free-market operational scale or specialized technical skill deployment. Because of that structural difference, my historical compensation isn't an accurate tool for mapping this position. I prefer to focus on the private market parameters of this specific role and the comprehensive, 13-year programmatic expertise I am anchoring within your execution pipeline.”"
          }
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#050409] text-zinc-100 font-sans relative overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200 pb-20">
      {/* Ambient Atmospheric Glows */}
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
        
        {/* Grounded, Non-Robotic Identity Badge */}
        <div className="px-4 py-2 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center gap-2">
          <ShieldCheck size={12} className="text-amber-500/60" />
          <span className="text-[8px] font-mono uppercase tracking-wider text-amber-400">Margaret Rideout, M.Ed.</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-8">
        
        {/* ─── CONTEXT INTRO BLOCK ────────────────────────────────────────── */}
        <div className="p-6 rounded-3xl bg-[#09070E] border border-amber-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] blur-2xl rounded-full pointer-events-none" />
          <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
            "Your provisions are laid out. Your identity is translated. Now, step up to the anvil. This is the workshop where abstract experience is hammered into sharp, concrete professional agency."
          </p>
        </div>

        {/* ─── ACTIVE WORKBENCH ACCORDIONS ─────────────────────────────────── */}
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
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} border border-white/5`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-sm font-serif font-medium tracking-wide text-zinc-200 group-hover:text-zinc-100 transition-colors">
                        {item.label}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-500 tracking-tight mt-0.5">
                        {item.sublabel}
                      </p>
                    </div>
                  </div>
                  <div className={`text-zinc-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-400' : 'group-hover:text-zinc-400'}`}>
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
                      <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-black/20 space-y-5">
                        
                        {/* ── TYPE 1: MIXED / LEDGERS ── */}
                        {item.content.type === 'mixed' && (
                          <div className="space-y-5 pt-2">
                            <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                              {item.content.text}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {item.content.modules.map((mod, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
                                  <h4 className="text-[11px] font-mono uppercase tracking-wide text-purple-300">{mod.title}</h4>
                                  <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">{mod.description}</p>
                                </div>
                              ))}
                            </div>
                            <div className="pt-2">
                              <a
                                href={item.content.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                              >
                                <span>{item.content.actionLabel}</span>
                                <ExternalLink size={10} />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* ── TYPE 2: BLUEPRINT DETAILS ── */}
                        {item.content.type === 'blueprint-details' && (
                          <div className="space-y-5 pt-2">
                            <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                              {item.content.text}
                            </p>
                            
                            {/* Jargon Translation Preview Grid */}
                            <div className="rounded-xl border border-white/5 overflow-hidden bg-black/40">
                              <div className="grid grid-cols-2 p-2.5 bg-white/[0.02] border-b border-white/5 text-[8px] font-mono uppercase tracking-widest text-zinc-500">
                                <div>Institutional Title Jargon</div>
                                <div className="pl-4 border-l border-white/5">Private Sector Realignment</div>
                              </div>
                              <div className="divide-y divide-white/5">
                                {item.content.translationMatrix.map((matrix, idx) => (
                                  <div key={idx} className="grid grid-cols-2 p-3 text-xs font-serif italic text-zinc-400">
                                    <div className="pr-2">{matrix.public}</div>
                                    <div className="pl-4 border-l border-white/5 text-teal-300/90 font-sans text-[11px] not-italic">{matrix.private}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2">
                              <a
                                href={item.content.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 text-teal-300 hover:text-teal-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                              >
                                <span>{item.content.actionLabel}</span>
                                <ExternalLink size={10} />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* ── TYPE 3: SCRIPTS VAULT ── */}
                        {item.content.type === 'script-vault' && (
                          <div className="space-y-6 pt-2">
                            <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                              {item.content.text}
                            </p>
                            
                            <div className="space-y-4">
                              {item.content.scripts.map((scr, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Info size={10} className="text-amber-500/60" />
                                    <span className="text-[9px] font-mono uppercase tracking-wide text-zinc-400 font-bold">{scr.phase}</span>
                                  </div>
                                  <p className="text-[10px] font-sans text-zinc-500 leading-relaxed max-w-2xl bg-white/[0.01] px-3 py-1.5 rounded-lg border border-white/5">
                                    <span className="text-amber-500/80 uppercase font-mono font-black tracking-widest text-[8px] mr-1">Context:</span> 
                                    {scr.scenario}
                                  </p>
                                  
                                  <div className="relative p-4 rounded-xl bg-black/50 border border-white/5 font-serif italic text-xs leading-relaxed text-zinc-200 group/script">
                                    <button
                                      onClick={() => handleCopy(scr.body, `${item.id}-${idx}`)}
                                      className="absolute top-2.5 right-2.5 px-2 py-1 bg-zinc-900 border border-white/10 rounded-md text-[8px] font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-300 hover:border-amber-500/30 transition-all flex items-center gap-1 opacity-60 group-hover/script:opacity-100"
                                    >
                                      {copiedId === `${item.id}-${idx}` ? (
                                        <>
                                          <Check size={9} className="text-emerald-400" />
                                          <span className="text-emerald-400">Copied</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy size={9} />
                                          <span>Copy Blueprint</span>
                                        </>
                                      )}
                                    </button>
                                    <p className="pr-16 select-all">{scr.body}</p>
                                  </div>
                                </div>
                              ))}
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

        {/* ─── FOOTER ────────────────────────────────────────────────────── */}
        <div className="text-center pt-6">
          <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-600">
            Hearth & Horizon Sanctuary Environment • Active Execution Blueprints.
          </p>
        </div>

      </main>
    </div>
  );
}