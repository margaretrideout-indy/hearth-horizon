import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Compass, Target, FileDown, DollarSign, TrendingUp
} from 'lucide-react';

const trailKitProvisions = [
  {
    id: 'verbs',
    title: "The Power Verb Lexicon",
    desc: "The 'Flip' dictionary. Strategic verbs to replace legacy public-sector language.",
    type: "Interactive Glossary",
    icon: <Zap className="text-purple-400" />,
    action: "Open Lexicon",
    isAccordion: true,
  },
  {
    id: 'market',
    title: "Canadian Market Primer",
    desc: "The 'How-To' guide for sector translation, including the Horizon Workshop.",
    type: "Interactive Guide",
    icon: <Map className="text-teal-400" />,
    action: "Read Primer",
    isAccordion: true,
  },
  {
    id: 'resume',
    title: "The Horizon Resume Template",
    desc: "A clean, ATS-optimized layout. Click to create your own private, editable copy.",
    type: "Digital Blueprint",
    icon: <FileText className="text-purple-400" />,
    action: "Create My Copy",
    url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy",
  },
  {
    id: 'scripts',
    title: "Salary Negotiation Scripts",
    desc: "Tactical word-for-word scripts for the 'expectations' talk and high-stakes counter-offers.",
    type: "Interactive Tool",
    icon: <MessageSquare className="text-teal-400" />,
    action: "View Scripts",
    isAccordion: true,
  },
  {
      id: 'outreach',
      title: "Sponsorship Outreach",
      desc: "The 4-phase sequence for turning cold contacts into professional advocates.",
      type: "Communication Sequence",
      icon: <Mail className="text-purple-400" />,
      action: "View Protocols",
      isAccordion: true,
  }
];

const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardized delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to cross-functional teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." }
];

const salaryScripts = [
    { 
        label: "The 'Anchor' Avoidance", 
        context: "When a recruiter asks for your current salary (which is likely lower than market).",
        script: "I'm looking for a total compensation package that reflects the current market value for this level of responsibility in [City/Sector]. Given my 13 years of curriculum architecture and project leadership, I’m focused on roles in the $[X] to $[Y] range. Does that align with your budget?" 
    },
    { 
        label: "The 'Total Rewards' Counter", 
        context: "When the base salary is lower than your target but the benefits are strong.",
        script: "I appreciate the offer and the comprehensive benefits package. However, based on the specialized nature of the [Role Name] and my background in [Skill], I was expecting the base to be closer to $[Target]. If we can close that gap, I’m prepared to sign the offer immediately." 
    },
    { 
        label: "Negotiating Non-Monetary Assets", 
        context: "When the budget is strictly capped.",
        script: "Since there is no flexibility on the base salary, I'd like to discuss other levers that reflect my seniority. Can we look at an additional week of PTO, a guaranteed professional development stipend of $[Amount], or a performance-based review at the 6-month mark instead of 12?" 
    },
    { 
        label: "The 'Competing Offer' Pivot", 
        context: "Using leverage to speed up a decision or increase an offer.",
        script: "I’ve just received another offer that is very competitive regarding the base salary. However, [Company Name] remains my first choice because of your mission in [Sector]. If you can match the $[X] base of the other offer, I will withdraw from the other process today." 
    }
];

const outreachPhases = [
    { 
        id: 'p1', 
        title: "Phase 1: The 'Soft' Curiosity", 
        goal: "LOW STAKES ENGAGEMENT", 
        script: "Subject: Question from a fellow [Industry] lead\n\nHi [Name], I've been closely following how [Company] is scaling its [Specific Department]. As I transition my decade of experience in public sector curriculum management toward [Private Sector], I'm curious: what is the one 'unwritten' skill your team values most right now? No need for a long reply—just looking for a professional pulse-check." 
    },
    { 
        id: 'p2', 
        title: "Phase 2: The Value Exchange", 
        goal: "OFFER A PERSPECTIVE", 
        script: "Hi [Name], following up on our last exchange—I actually just drafted a brief analysis on [Relevant Topic] that addresses that 'unwritten' skill we discussed. I thought your team might find the public-to-private perspective useful. Here’s the link (no gates). Hope it helps with the [Current Project]!" 
    },
    { 
        id: 'p3', 
        title: "Phase 3: The Request for Sponsorship", 
        goal: "THE 15-MINUTE VIRTUAL COFFEE", 
        script: "Hi [Name], your insights have been instrumental in how I'm framing my transition. I'm currently architecting my move into [Specific Role] and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company]. I promise to be brief and respectful of your schedule. Does next Thursday work?" 
    },
    { 
        id: 'p4', 
        title: "Phase 4: The Closing Circle", 
        goal: "THE 'STEALTH' REFERRAL", 
        script: "Thank you for the call, [Name]. Based on what you shared about [Company]'s growth, it's clear my background in [Specific Skill] would solve a few of the bottlenecks we discussed. If you're comfortable, I'd love to stay on your radar for any upcoming roles—even those not yet public. I've attached my Horizon-formatted resume for your records." 
    }
];

const Contact = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6">Provisions for the Path</h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light italic leading-relaxed">
          Tactical frameworks, negotiation scripts, and communication protocols for the public-to-private transition.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">Active Provisions</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
      </div>

      {/* RESOURCE GRID */}
      <div className="grid grid-cols-1 gap-6 mb-20">
        {trailKitProvisions.map((tool) => {
          const isOpen = expandedCard === tool.id;
          return (
            <div key={tool.id} className="flex flex-col group">
              <div 
                onClick={() => {
                  if (tool.isAccordion) setExpandedCard(isOpen ? null : tool.id);
                  else if (tool.url) window.open(tool.url, '_blank');
                }}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${
                  isOpen ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02]' : 'rounded-[2.5rem] border-zinc-800/50 hover:border-teal-500/30'
                } cursor-pointer`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-teal-500/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500 mb-2">
                        {tool.type}
                      </span>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    {tool.action}
                    {tool.isAccordion ? (isOpen ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4">
                  
                  {/* LEXICON SECTION */}
                  {tool.id === 'verbs' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {powerVerbs.map((v, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl">
                                <div className="text-[10px] text-zinc-600 line-through uppercase mb-1">{v.legacy}</div>
                                <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                <p className="text-[10px] text-zinc-500 italic mt-1">{v.use}</p>
                            </div>
                        ))}
                        </div>
                        <button className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 hover:border-teal-400/30 transition-all">
                            Open Full List (50+ Verbs)
                        </button>
                    </div>
                  )}

                  {/* MARKET PRIMER / WORKSHEET SECTION */}
                  {tool.id === 'market' && (
                    <div className="bg-teal-500/5 border border-teal-500/20 p-8 rounded-[2rem]">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-2">Horizon Workshop</h4>
                                <h5 className="text-2xl font-serif italic text-white mb-4">Auditing Your Functional Legacy</h5>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-6 max-w-lg">
                                    Use this worksheet to identify which 20% of your current duties generate 80% of your market value.
                                </p>
                                <button 
                                    onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit", "_blank")}
                                    className="bg-teal-500 text-black px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors"
                                >
                                    Launch Strategy
                                </button>
                            </div>
                            <Compass className="text-teal-500/20 hidden md:block" size={80} />
                        </div>
                    </div>
                  )}

                  {/* BEEFED UP SALARY SCRIPTS */}
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                        <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                            <p className="text-[11px] text-teal-400 italic">Pro-Tip: In the private sector, everything is a data point. Use these scripts to pivot from 'asking' to 'collaborating' on a fair price.</p>
                        </div>
                        {salaryScripts.map((s, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <DollarSign size={12} className="text-teal-400" />
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-white">{s.label}</h4>
                                </div>
                                <p className="text-[10px] text-zinc-500 italic mb-3">{s.context}</p>
                                <div className="p-4 bg-black/60 rounded-lg border border-white/5">
                                    <p className="font-mono text-[11px] text-zinc-300 leading-relaxed italic">"{s.script}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                  )}

                  {/* BEEFED UP OUTREACH SEQUENCE */}
                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {outreachPhases.map((phase) => (
                            <div key={phase.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{phase.title}</span>
                                        <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter mt-1">{phase.goal}</span>
                                    </div>
                                    {openPhaseId === phase.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />}
                                </button>
                                {openPhaseId === phase.id && (
                                    <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                                        <div className="p-4 bg-black/40 rounded-xl mt-4 font-mono text-[11px] text-zinc-300 italic whitespace-pre-wrap leading-relaxed border border-white/5">
                                            {phase.script}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* VOLUME TOGGLE */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">Navigate the Archives</h4>
        <div className="flex p-1.5 bg-[#110E16] border border-zinc-800/50 rounded-full shadow-2xl">
          <button className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all text-zinc-500 hover:text-white">
            Volume I: Basecamp
          </button>
          <button className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-teal-500 text-black shadow-lg shadow-teal-500/20">
            Volume II: Trail Kit
          </button>
        </div>
      </div>

    </div>
  );
};

export default Contact;