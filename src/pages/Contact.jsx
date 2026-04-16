import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Compass, Target, FileDown
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
    desc: "Interactive word-for-word scripts for the 'expectations' talk and counter-offers.",
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
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." },
    { legacy: "Fixed", horizon: "Remediated", use: "Identifying and resolving systemic bottlenecks." }
];

const salaryScripts = [
    { label: "The Initial Inquiry", script: "My research for this role in the Canadian market indicates a range of [X] to [Y]. Does that align with your current budget for this position?" },
    { label: "The Pivot (If too low)", script: "I understand the budget is fixed at [X]. Given my 13 years of expertise in curriculum management, can we discuss a signing bonus or an accelerated performance review?" },
    { label: "Closing the Gap", script: "I’m very excited about the mission at [Company]. If we can get the base to [Z], I’m prepared to sign today." }
];

const outreachPhases = [
    { 
        id: 'p1', 
        title: "Phase 1: The 'Soft' Curiosity", 
        goal: "LOW STAKES ENGAGEMENT", 
        script: "Subject: Insight on [Company Name] growth\n\nHi [Name], I've been following [Company]'s recent move into [Industry Sector]. As someone pivoting from a decade in public-sector program management, I'm curious about how your team handles [Specific Challenge]. Would you be open to a 5-minute email exchange or a quick coffee?" 
    },
    { 
        id: 'p2', 
        title: "Phase 2: The Value Exchange", 
        goal: "OFFER A PERSPECTIVE", 
        script: "Hi [Name], I noticed you mentioned [Challenge] in our last chat. I actually just finished a brief audit of [Related Topic] and thought this framework might be useful for your team. Happy to discuss if it resonates!" 
    },
    { 
        id: 'p3', 
        title: "Phase 3: The Request for Sponsorship", 
        goal: "THE 15-MINUTE CALL", 
        script: "Hi [Name], I'm currently architecting my transition into [Specific Private Sector Role]. Given your experience, I'd value your 'internal' lens on whether my background in [Skill] translates well to your current roadmap. Do you have 15 minutes next Tuesday?" 
    },
    { 
        id: 'p4', 
        title: "Phase 4: The Closing Circle", 
        goal: "REFERRAL & GRATITUDE", 
        script: "Thank you for the insight today, [Name]. Based on our talk, it sounds like [Department] is the place to be. If you're comfortable, I'd love to stay on your radar for any upcoming 'Stealth' roles that might fit this profile." 
    }
];

const Contact = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      {/* 1. PAGE TITLE & INTRO SECTION */}
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6 text-center">Provisions for the Path</h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light italic leading-relaxed text-center">
          Tactical tools designed to help Hearth & Horizon members translate public-sector skills into private-sector impact.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">Active Provisions</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
      </div>

      {/* 2. RESOURCE CARDS GRID */}
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
                  
                  {/* LEXICON SUB-CONTENT */}
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

                  {/* MARKET PRIMER / WORKSHEET SUB-CONTENT */}
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

                  {/* SALARY SCRIPTS SUB-CONTENT */}
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                        {salaryScripts.map((s, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-xl">
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-teal-400 mb-3">{s.label}</h4>
                                <p className="font-mono text-[11px] text-zinc-300 leading-relaxed italic">"{s.script}"</p>
                            </div>
                        ))}
                    </div>
                  )}

                  {/* OUTREACH SUB-CONTENT */}
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
                                {openPhaseId === phase.id && <div className="p-6 pt-0 border-t border-white/5 bg-black/20 font-mono text-[11px] text-zinc-300 italic whitespace-pre-wrap leading-relaxed">{phase.script}</div>}
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

      {/* 3. PERSISTENT VOLUME TOGGLE */}
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