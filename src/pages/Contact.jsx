import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, ShieldCheck,
  Mail, ExternalLink, Save, Lock, Crown, Info, Clock, Landmark, Compass, Target,
  FileDown
} from 'lucide-react';

// --- DATA STRUCUTRE ---
const trailKitProvisions = [
  {
    id: 'verbs',
    title: "The Power Verb Lexicon",
    desc: "The 'Flip' dictionary. 50+ corporate verbs to replace legacy educational language.",
    type: "Interactive Glossary",
    tier: "Seedling",
    icon: <Zap className="text-purple-400" />,
    action: "Open Lexicon",
    isAccordion: true,
  },
  {
    id: 'market',
    title: "Canadian Market Primer",
    desc: "The 'How-To' guide for sector translation, including the Horizon Workshop.",
    type: "Interactive Guide",
    tier: "Seedling",
    icon: <Map className="text-teal-400" />,
    action: "Read Primer",
    isAccordion: true,
  },
  {
    id: 'resume',
    title: "The Horizon Resume Template",
    desc: "A clean, ATS-optimized layout. Click to create your own private, editable copy.",
    type: "Digital Blueprint",
    tier: "Hearthkeeper",
    icon: <FileText className="text-purple-400" />,
    action: "Create My Copy",
    url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy",
  },
  {
    id: 'scripts',
    title: "Salary Negotiation Scripts",
    desc: "Interactive word-for-word scripts for the 'expectations' talk and counter-offers.",
    type: "Interactive Tool",
    tier: "Steward",
    icon: <MessageSquare className="text-teal-400" />,
    action: "View Scripts",
    isAccordion: true,
  },
  {
      id: 'outreach',
      title: "Sponsorship Outreach",
      desc: "The 4-phase sequence for turning cold contacts into professional advocates.",
      type: "Communication Sequence",
      tier: "Steward",
      icon: <Mail className="text-purple-400" />,
      action: "View Protocols",
      isAccordion: true,
  }
];

const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardized delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Made", horizon: "Architected", use: "Building frameworks from the ground up." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to cross-functional teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." },
    { legacy: "Helper", horizon: "Enabler", use: "Removing friction for technical teams." },
    { legacy: "Wrote", horizon: "Authored", use: "Producing high-impact documentation." },
    { legacy: "Planned", horizon: "Strategized", use: "Aligning project milestones with business goals." },
    { legacy: "Used", horizon: "Leveraged", use: "Utilizing internal assets to drive results." },
    { legacy: "Fixed", horizon: "Remediated", use: "Identifying and resolving systemic bottlenecks." },
    { legacy: "Checked", horizon: "Audited", use: "Ensuring compliance protocols." }
];

const marketComparison = [
    { public: "The Pay Grid", private: "Total Compensation", how: "Negotiate for base + bonus + RRSP match." },
    { public: "Collective Agreement", private: "Employment Standards", how: "Review your own contract for termination clauses." },
    { public: "Tenure/Seniority", private: "Impact/ROI", how: "Focus on results achieved, not years in seat." },
    { public: "Consensus-Driven", private: "Direct/Explicit", how: "Adopt concise, value-first communication styles." }
];

const negotiationScripts = [
    { 
        id: 'anchor', 
        situation: "The Early Inquiry (The Anchor)", 
        context: "A recruiter asks: 'What are your salary expectations?' before an offer is made.", 
        script: "I'm looking for a total compensation package in the range of $[X] to $[Y]. However, my main priority is finding the right cultural fit, and I'm open to discussing the full range of benefits once we've determined I'm the right match." 
    },
    { 
        id: 'pivot', 
        situation: "The 'Experience' Pivot", 
        context: "Addressing the 'transitioning' label to maintain seniority levels.", 
        script: "While I am transitioning industries, I bring 13 years of high-stakes management. I'm looking for a base salary that reflects that seniority. Can we move the offer to $[Target]?" 
    }
];

const outreachPhases = [
    {
        id: 'p1',
        title: "Phase 1: The 'Soft' Curiosity",
        goal: "Low stakes engagement. No ask, just visibility.",
        script: "Subject: Insight on [Company Name]'s approach to [Topic]\n\nHi [Name], I've been following your team's work on [Project] and was struck by [Detail]. As someone from [Your Field], do you find that [Topic] is a major focus for your team this quarter?"
    },
    {
        id: 'p2',
        title: "Phase 2: The Value Exchange",
        goal: "Offer a perspective based on your 'Public-to-Private' flip.",
        script: "Hi [Name], I actually just finished a project on [Related Topic] and thought this resource might be useful for your team's initiative. No response needed, just wanted to share!"
    },
    {
        id: 'p3',
        title: "Phase 3: The Request for Sponsorship",
        goal: "Asking for a 15-minute 'Bridge' call.",
        script: "Hi [Name], I'm currently architecting a transition into the private sector. Given your expertise in [Industry], would you be open to a 15-minute call to discuss how my legacy in [Public Field] might best serve a team like yours?"
    },
    {
        id: 'p4',
        title: "Phase 4: The Closing Circle",
        goal: "The 'Thank You' that keeps the door open for referrals.",
        script: "Thank you for the insight today, [Name]. Our conversation regarding [Topic] was incredibly helpful. I'll be sure to keep you updated on my progress, and please let me know if there's ever a way I can return the favor."
    }
];

const Contact = ({ vault, isAdmin }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openScriptId, setOpenScriptId] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);

  // LOGIC: These determine if a tool is "unlocked"
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  // HELPER: Check permissions for a specific tool ID
  const checkAccess = (id) => {
    if (id === 'verbs' || id === 'market') return true;
    if (id === 'resume') return isHearthkeeper;
    if (id === 'scripts' || id === 'outreach') return isSteward;
    return false;
  };

  const handleCardClick = (tool) => {
    if (!checkAccess(tool.id)) return; 

    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url) {
      window.open(tool.url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 px-4 sm:px-6">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">Active Provisions</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {trailKitProvisions.map((tool) => {
          const isAllowed = checkAccess(tool.id);
          
          return (
            <div key={tool.id} className="flex flex-col gap-0 group">
              <div 
                onClick={() => handleCardClick(tool)} 
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${
                  !isAllowed ? 'opacity-40 cursor-not-allowed border-zinc-900' : 
                  expandedCard === tool.id ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02] cursor-pointer' : 
                  'rounded-[2.5rem] border-zinc-800/50 hover:border-purple-500/30 cursor-pointer'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      {isAllowed ? tool.icon : <Lock className="text-zinc-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500">
                          {tool.type}
                        </span>
                        {!isAllowed && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-500 border border-purple-500/10 flex gap-1">
                              <Crown size={10}/> {tool.tier}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">
                          {tool.title}
                      </h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    {isAllowed ? tool.action : `Locked: ${tool.tier} Standing`}
                    {tool.isAccordion ? (expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                  </div>
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {expandedCard === tool.id && tool.isAccordion && isAllowed && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {tool.id === 'market' && (
                    <div className="space-y-10">
                      <div className="relative group/workshop overflow-hidden p-10 bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20 rounded-[2.5rem] flex flex-col items-start gap-8">
                         <div className="max-w-2xl relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <Compass className="text-teal-400" size={24} />
                              <h4 className="text-[10px] font-black uppercase text-white tracking-[0.3em]">The Horizon Workshop</h4>
                            </div>
                            <h5 className="text-2xl font-serif italic text-white mb-3">Auditing Your Functional Legacy</h5>
                            <p className="text-sm text-zinc-300 italic leading-relaxed mb-8">Map your career history against corporate Strategic Pillars before you begin your outreach.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                              <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link", "_blank")} className="px-8 h-14 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">1. Strategy Deck <ExternalLink size={12} /></button>
                              <button onClick={() => window.open("https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link", "_blank")} className="px-8 h-14 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">2. Worksheet <FileDown size={14} className="text-teal-400" /></button>
                            </div>
                         </div>
                      </div>
                      <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem]">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="text-[9px] text-teal-500 uppercase font-black tracking-tighter italic">
                              <th className="pb-4 pr-4">Legacy</th>
                              <th className="pb-4 pr-4">Flip</th>
                              <th className="pb-4">Strategy</th>
                            </tr>
                          </thead>
                          <tbody className="text-xs text-zinc-300 font-light italic">
                            {marketComparison.map((row, i) => (
                              <tr key={i} className="border-t border-white/5">
                                <td className="py-4 pr-4 text-zinc-500 line-through">{row.public}</td>
                                <td className="py-4 pr-4 text-teal-400 font-black tracking-widest uppercase text-[10px]">{row.private}</td>
                                <td className="py-4 text-zinc-400 leading-relaxed">{row.how}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {tool.id === 'verbs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 8)).map((verb, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col hover:border-purple-500/30 transition-all">
                          <div className="flex items-center justify-between mb-3 text-[10px] text-zinc-600 line-through uppercase">{verb.legacy}</div>
                          <div className="text-lg font-serif italic font-black text-teal-400 mb-2">{verb.horizon}</div>
                          <p className="text-[10px] text-zinc-500 italic">{verb.use}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                      {negotiationScripts.map((item) => (
                        <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                          <button onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 text-[10px] font-black uppercase text-white">
                              {item.situation}{openScriptId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {openScriptId === item.id && (
                              <div className="p-6 pt-0 font-mono text-xs text-zinc-200 italic leading-relaxed">"{item.script}"</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {outreachPhases.map((phase) => (
                            <div key={phase.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
                                    <div className="flex flex-col text-[10px] font-black uppercase tracking-widest text-white">
                                        {phase.title}
                                        <span className="text-sm text-zinc-300 italic mt-1 font-normal leading-relaxed">{phase.goal}</span>
                                    </div>
                                    {openPhaseId === phase.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {openPhaseId === phase.id && <div className="p-6 pt-0 border-t border-white/5 bg-black/20 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap italic">{phase.script}</div>}
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
    </div>
  );
};

export default Contact;