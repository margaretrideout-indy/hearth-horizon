import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, ShieldCheck,
  Mail, ExternalLink, Save, Lock, Crown, Info, Clock, Landmark, Compass, Target,
  FileDown
} from 'lucide-react';

const trailKitProvisions = [
  {
    id: 'verbs',
    title: "The Power Verb Lexicon",
    desc: "The 'Flip' dictionary. Strategic verbs to replace legacy public-sector language.",
    type: "Interactive Glossary",
    tier: "Seedling",
    icon: <Zap className="text-purple-400" />,
    action: "Open Lexicon",
    isAccordion: true,
    allowed: true 
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
    allowed: true
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
    allowed: false 
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
    allowed: false
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
      allowed: false
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
  { id: 'anchor', situation: "The Early Inquiry", context: "Handling salary expectations early.", script: "I'm looking for total compensation in the range of $[X] to $[Y], pending a full review of the benefits package." },
  { id: 'pivot', situation: "The Experience Pivot", context: "Addressing the 'transitioning' label.", script: "I bring 13 years of high-stakes management. I'm looking for a salary that reflects that seniority." }
];

const outreachPhases = [
  { id: 'p1', title: "Phase 1: Soft Curiosity", goal: "Low stakes visibility.", script: "Hi [Name], loved your work on [Project]. Curious about your focus this quarter?" }
];

const Contact = ({ vault, isAdmin: propIsAdmin }) => {
  const [openScriptId, setOpenScriptId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);

  const devOverride = true; 
  const isAdmin = propIsAdmin || devOverride;
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const handleCardClick = (tool) => {
    const isAllowed = tool.id === 'verbs' || tool.id === 'market' || (tool.id === 'resume' && isHearthkeeper) || ((tool.id === 'scripts' || tool.id === 'outreach') && isSteward);
    if (!isAllowed) return; 
    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url) {
      window.open(tool.url, '_blank');
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">The Trail Kit</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trailKitProvisions.map((tool) => {
            const isAllowed = tool.id === 'verbs' || tool.id === 'market' || (tool.id === 'resume' && isHearthkeeper) || ((tool.id === 'scripts' || tool.id === 'outreach') && isSteward);
            return (
              <div key={tool.id} className="flex flex-col gap-0 group">
                <div onClick={() => handleCardClick(tool)} className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${!isAllowed ? 'opacity-40 cursor-not-allowed border-zinc-900' : expandedCard === tool.id ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02] cursor-pointer' : 'rounded-[2.5rem] border-zinc-800/50 hover:border-purple-500/30 cursor-pointer'}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">{isAllowed ? tool.icon : <Lock className="text-zinc-600" />}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500">{tool.type}</span>
                          {!isAllowed && <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-500 border border-purple-500/10 flex gap-1"><Crown size={10}/> {tool.tier}</span>}
                        </div>
                        <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                        <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic">{tool.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                      {isAllowed ? tool.action : `Locked: ${tool.tier} Standing`}
                      {tool.isAccordion ? (expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                    </div>
                  </div>
                </div>

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
                              <p className="text-xs text-zinc-400 italic leading-relaxed mb-8">This two-part toolkit is your baseline for sector transition. Map your career history against corporate Strategic Pillars before you begin your outreach.</p>
                              
                              <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link", "_blank")} className="px-8 h-14 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group/btn">
                                  1. Launch Strategy Deck <ExternalLink size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                <button onClick={() => window.open("https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link", "_blank")} className="px-8 h-14 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                                  2. Download Worksheet <FileDown size={14} className="group-hover/btn:translate-y-1 transition-transform text-teal-400" />
                                </button>
                              </div>
                           </div>
                           <div className="absolute right-0 bottom-0 p-10 opacity-5 pointer-events-none">
                              <Target size={200} className="text-teal-400" />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                           <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem]">
                              <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-6 border-b border-white/5 pb-4">Market Comparison & Strategy</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                  <thead>
                                    <tr className="text-[9px] text-teal-500 uppercase font-black tracking-tighter italic">
                                      <th className="pb-4 pr-4">Legacy Concept</th>
                                      <th className="pb-4 pr-4">Market Flip</th>
                                      <th className="pb-4">Strategic Action</th>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                            <ShieldCheck className="text-teal-400" size={20}/>
                            <h4 className="text-[10px] font-black uppercase text-white tracking-widest">Financial Neutrality</h4>
                            <p className="text-[11px] text-zinc-400 italic leading-relaxed">Public pensions are a massive hidden asset. Negotiate for a <strong className="text-teal-400">20-25% salary increase</strong> in the private sector to account for the loss of a defined-benefit plan.</p>
                          </div>
                          <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                            {!isHearthkeeper && <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20"><Lock size={16} className="text-zinc-600"/></div>}
                            <Landmark className="text-purple-400" size={20}/>
                            <h4 className="text-[10px] font-black uppercase text-white tracking-widest">Compliance Keywords</h4>
                            <p className="text-[11px] text-zinc-400 italic leading-relaxed">Ensure regulatory licenses are listed as <strong className="text-purple-400">"Regulatory Compliance & Standards Certification"</strong> to trigger automated recruiter searches.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {tool.id === 'verbs' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 8)).map((verb, idx) => (
                            <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col hover:border-purple-500/30 transition-all group/verb">
                              <div className="flex items-center justify-between mb-3"><span className="text-[10px] text-zinc-600 line-through uppercase">{verb.legacy}</span><span className="bg-purple-500/10 text-purple-400 border border-purple-500/10 text-[8px] px-2 py-0.5 rounded-full uppercase font-black">FLIP</span></div>
                              <div className="text-lg font-serif italic font-black text-teal-400 mb-2 group-hover/verb:text-white transition-colors">{verb.horizon}</div>
                              <p className="text-[10px] text-zinc-500 leading-tight italic font-light">{verb.use}</p>
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setShowAllVerbs(!showAllVerbs)} className="w-full p-6 border border-dashed border-white/10 rounded-2xl text-center group/more hover:border-teal-500/30 transition-colors"><p className="text-[10px] text-zinc-500 group-hover/more:text-teal-400 font-black uppercase tracking-widest">{showAllVerbs ? "Close Archive" : "View Extended Lexicon"}</p></button>
                      </div>
                    )}

                    {tool.id === 'scripts' && (
                      <div className="space-y-4">
                        {negotiationScripts.map((item) => (
                          <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                            <button onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 text-left text-[10px] font-black uppercase tracking-widest text-white">{item.situation}{openScriptId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
                            {openScriptId === item.id && <div className="p-6 pt-0 border-t border-white/5 bg-black/20"><p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mt-6 mb-2 italic">The Strategy:</p><p className="text-zinc-400 mb-4 italic text-xs font-light">{item.context}</p><div className="bg-[#16121D] p-5 rounded-xl border border-teal-500/20 text-zinc-200 font-mono text-xs leading-relaxed italic relative">"{item.script}"</div></div>}
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
      </section>
    </div>
  );
};

export default Contact;