import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronRight, 
  ChevronDown, ChevronUp, Zap, ShieldCheck,
  Mail, ExternalLink, Save, Lock, Crown
} from 'lucide-react';

const Contact = ({ vault, isAdmin }) => {
  const [openScriptId, setOpenScriptId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  // TIER LOGIC
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const trailKitProvisions = [
    {
      id: 'verbs',
      title: "The Power Verb Lexicon",
      desc: "The 'Flip' dictionary. 50+ corporate verbs to replace legacy language.",
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
      desc: "The truth about RRSPs, vacation time, and provincial credential 'translation'.",
      type: "Interactive Guide",
      tier: "Seedling", // Market basics are free
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
      allowed: isHearthkeeper
    },
    {
      id: 'scripts',
      title: "Salary Negotiation Scripts",
      desc: "Interactive word-for-word scripts for the 'expectations' talk.",
      type: "Interactive Tool",
      tier: "Steward",
      icon: <MessageSquare className="text-teal-400" />,
      action: "View Scripts",
      isAccordion: true,
      allowed: isSteward
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
        allowed: isSteward
    }
  ];

  const negotiationScripts = [
    { id: 'anchor', situation: "The Early Inquiry (The 'Anchor')", context: "A recruiter asks: 'What are your salary expectations?'", script: "I’m quite flexible depending on the total compensation package. Based on my research for similar roles in Canada, I’m looking for a range between $[Lower] and $[Upper]." },
    { id: 'pivot', situation: "The Pivot (Transferable Value)", context: "They offer a low number because they see you as 'entry-level'.", script: "While I am transitioning sectors, I bring a decade of high-stakes leadership. My ability to lead from day one saves significant onboarding time. I was hoping for a base closer to $[Target]." }
  ];

  const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "For high-level workshops/training." },
    { legacy: "Improved", horizon: "Optimized", use: "For making systems more efficient." },
    { legacy: "Made", horizon: "Architected", use: "For building new frameworks." }
  ];

  const Badge = ({ children, className }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
      {children}
    </span>
  );

  const handleCardClick = (tool) => {
    if (!tool.allowed) return; // Prevent interaction for locked tiers
    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80 whitespace-nowrap">The Trail Kit</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>
        
        <div className="mb-12 max-w-2xl">
          <p className="text-sm text-zinc-400 leading-relaxed italic font-light">
            If Volume I is your <span className="text-white font-serif italic">Foundation</span>, 
            this kit is your <span className="text-white font-serif italic">Momentum</span>. 
            Tactical assets for the active professional climb.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trailKitProvisions.map((tool) => (
            <div key={tool.id} className="flex flex-col gap-0 group">
              <div 
                onClick={() => handleCardClick(tool)}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${
                  !tool.allowed ? 'opacity-50 cursor-not-allowed border-zinc-900' :
                  expandedCard === tool.id 
                    ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02] cursor-pointer' 
                    : 'rounded-[2.5rem] border-zinc-800/50 hover:border-purple-500/30 cursor-pointer'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform group-hover:scale-105">
                      {tool.allowed ? tool.icon : <Lock className="text-zinc-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-zinc-800/50 text-zinc-500">{tool.type}</Badge>
                        {!tool.allowed && <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/10 flex gap-1"><Crown size={10}/> {tool.tier}</Badge>}
                      </div>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic">{tool.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">
                    {tool.allowed ? tool.action : `Requires ${tool.tier} Standing`}
                    {tool.isAccordion ? (
                      expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />
                    ) : (
                      <ExternalLink size={14} />
                    )}
                  </div>
                </div>
              </div>

              {expandedCard === tool.id && tool.isAccordion && tool.allowed && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                      {negotiationScripts.map((item) => (
                        <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
                          <button onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.situation}</span>
                            {openScriptId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {openScriptId === item.id && (
                            <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                              <p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mt-6 mb-2 italic">The Situation:</p>
                              <p className="text-zinc-400 mb-4 italic text-xs font-light">{item.context}</p>
                              <div className="bg-[#16121D] p-5 rounded-xl border border-teal-500/20 text-zinc-200 font-mono text-xs leading-relaxed italic relative">
                                "{item.script}"
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {tool.id === 'verbs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {powerVerbs.map((verb, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col group/verb hover:border-purple-500/30 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-zinc-600 line-through uppercase tracking-tighter">{verb.legacy}</span>
                            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/10">FLIP TO</Badge>
                          </div>
                          <div className="text-lg font-serif italic font-black text-teal-400 mb-2">{verb.horizon}</div>
                          <p className="text-[10px] text-zinc-500 leading-tight italic font-light">{verb.use}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {tool.id === 'market' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                         <ShieldCheck className="text-teal-400" size={20}/>
                         <h4 className="text-[10px] font-black uppercase text-white mb-2">RRSP & Vacation Bridges</h4>
                         <p className="text-xs text-zinc-400 italic">Public pensions are high-value. Negotiate a 5-8% higher base salary in private roles to stay neutral.</p>
                       </div>
                       {!isHearthkeeper ? (
                          <div className="p-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center">
                            <Lock size={16} className="text-zinc-600 mb-2"/>
                            <p className="text-[9px] text-zinc-500 uppercase font-black">Credential Translation Locked</p>
                          </div>
                       ) : (
                        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                          <Save className="text-purple-400" size={20}/>
                          <h4 className="text-[10px] font-black uppercase text-white mb-2">Credential Translation</h4>
                          <p className="text-xs text-zinc-400 italic">List provincial licenses as "Provincial Regulatory Compliance" for corporate HR scanners.</p>
                        </div>
                       )}
                    </div>
                  )}

                  {tool.id === 'outreach' && (
                    <div className="p-8 bg-black/40 border border-white/5 rounded-2xl text-center">
                        <p className="text-xs text-zinc-400 italic leading-relaxed">Protocols are being finalized in the archives. Check back for Phase 1: The Soft Inquiry script.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#16121D] to-[#0A080D] border border-white/5 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col items-center">
              <Mail className="text-teal-400 mb-8" size={24} />
              <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-4">Request a Specific Provision</h3>
              <p className="text-sm text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed font-light italic">
                The Librarians are constantly expanding the archives.
              </p>
              <button onClick={() => window.location.href = 'mailto:support@hearthandhorizon.com'} className="h-14 px-12 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-400 transition-all">
                Message the Librarians
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;