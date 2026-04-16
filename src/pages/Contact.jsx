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

const marketComparison = [
    { public: "The Pay Grid", private: "Total Compensation", how: "Negotiate for base + bonus + RRSP match." },
    { public: "Collective Agreement", private: "Employment Standards", how: "Review your own contract for termination clauses." },
    { public: "Tenure/Seniority", private: "Impact/ROI", how: "Focus on results achieved, not years in seat." }
];

const outreachPhases = [
    { id: 'p1', title: "Phase 1: The 'Soft' Curiosity", goal: "LOW STAKES ENGAGEMENT.", script: "Subject: Insight on [Company Name]...\n\nHi [Name], I've been following your team's work..." },
    { id: 'p2', title: "Phase 2: The Value Exchange", goal: "OFFER A PERSPECTIVE.", script: "Hi [Name], I thought this resource might be useful..." },
    { id: 'p3', title: "Phase 3: The Request for Sponsorship", goal: "15-MINUTE CALL.", script: "Hi [Name], I'm currently architecting a transition..." },
    { id: 'p4', title: "Phase 4: The Closing Circle", goal: "THE 'THANK YOU' FOR REFERRALS.", script: "Thank you for the insight today, [Name]..." }
];

const Contact = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      {/* 1. RESTORED PAGE TITLE & INTRO */}
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4 text-center">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6 text-center">Provisions for the Path</h1>
        <p className="max-w-2xl mx-auto text-zinc-400 text-sm font-light italic leading-relaxed text-center">
          This is your tactical toolkit—a collection of frameworks, scripts, and blueprints designed 
          to translate your legacy experience into private-sector impact.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">Active Provisions</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
      </div>

      {/* 2. RESOURCE CARDS (All 5 verified present and unlocked) */}
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

              {/* 3. ACCORDION SUB-CONTENT */}
              {isOpen && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {/* Market Primer Content */}
                  {tool.id === 'market' && (
                    <div className="space-y-10">
                      <div className="relative p-10 bg-teal-500/5 border border-teal-500/20 rounded-[2.5rem]">
                        <div className="flex items-center gap-3 mb-4 text-teal-400"><Compass size={20} /><h4 className="text-[10px] font-black uppercase tracking-widest">Horizon Workshop</h4></div>
                        <h5 className="text-2xl font-serif italic text-white mb-3">Auditing Your Functional Legacy</h5>
                        <p className="text-sm text-zinc-300 italic mb-8">Download your baseline for sector transition.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit", "_blank")} className="px-8 h-14 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all">Launch Strategy</button>
                        </div>
                      </div>
                      <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem]">
                        <table className="w-full text-left text-xs italic">
                          <tbody className="text-zinc-300">
                            {marketComparison.map((row, i) => (
                              <tr key={i} className="border-t border-white/5 first:border-0">
                                <td className="py-4 pr-4 text-zinc-500 line-through">{row.public}</td>
                                <td className="py-4 pr-4 text-teal-400 font-black uppercase text-[10px] tracking-widest">{row.private}</td>
                                <td className="py-4 text-zinc-400 leading-relaxed">{row.how}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Lexicon Content */}
                  {tool.id === 'verbs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {powerVerbs.map((v, i) => (
                        <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-2xl">
                          <div className="text-[10px] text-zinc-600 line-through uppercase mb-2">{v.legacy}</div>
                          <div className="text-lg font-serif italic font-black text-teal-400 mb-2">{v.horizon}</div>
                          <p className="text-[10px] text-zinc-500 leading-tight">{v.use}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Outreach Content */}
                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {outreachPhases.map((phase) => (
                            <div key={phase.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)} className="w-full p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
                                    <div className="flex flex-col text-[10px] font-black uppercase tracking-widest text-white">
                                        {phase.title}
                                        <span className="text-xs text-zinc-400 italic mt-1 font-normal uppercase tracking-tighter">{phase.goal}</span>
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

      {/* 4. VOLUME TOGGLE (RESTORED) */}
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