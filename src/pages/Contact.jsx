import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronRight, 
  ChevronDown, ChevronUp, Zap, ShieldCheck,
  Mail, ExternalLink, Save, Lock, Crown, Info
} from 'lucide-react';

const Contact = ({ vault, isAdmin }) => {
  const [openScriptId, setOpenScriptId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  // TIER LOGIC - This ensures YOU (the Admin) see everything
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const trailKitProvisions = [
    {
      id: 'verbs',
      title: "The Power Verb Lexicon",
      desc: "The 'Flip' dictionary. Replace legacy educational terms with corporate high-impact language.",
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
      desc: "Vital 'translation' for the Canadian private sector—from benefits to credentialing.",
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

  const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardized delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Made", horizon: "Architected", use: "Building frameworks from the ground up." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to cross-functional teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." }
  ];

  const handleCardClick = (tool) => {
    if (!tool.allowed) return; 
    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const Badge = ({ children, className }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">The Trail Kit</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trailKitProvisions.map((tool) => (
            <div key={tool.id} className="flex flex-col gap-0 group">
              <div 
                onClick={() => handleCardClick(tool)}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${
                  !tool.allowed ? 'opacity-40 cursor-not-allowed border-zinc-900' :
                  expandedCard === tool.id 
                    ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02] cursor-pointer' 
                    : 'rounded-[2.5rem] border-zinc-800/50 hover:border-purple-500/30 cursor-pointer'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
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
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    {tool.allowed ? tool.action : `Locked: ${tool.tier} Standing`}
                    {tool.isAccordion ? (expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                  </div>
                </div>
              </div>

              {expandedCard === tool.id && tool.isAccordion && tool.allowed && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {/* LEXICON CONTENT */}
                  {tool.id === 'verbs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {powerVerbs.map((verb, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col hover:border-purple-500/30 transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-zinc-600 line-through uppercase tracking-tighter">{verb.legacy}</span>
                            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/10 text-[8px]">FLIP TO</Badge>
                          </div>
                          <div className="text-lg font-serif italic font-black text-teal-400 mb-2">{verb.horizon}</div>
                          <p className="text-[10px] text-zinc-500 leading-tight italic font-light">{verb.use}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* MARKET PRIMER CONTENT */}
                  {tool.id === 'market' && (
                    <div className="space-y-6">
                      <div className="p-6 bg-teal-500/[0.03] border border-teal-500/20 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Info size={18} className="text-teal-400" />
                            <h4 className="text-[10px] font-black uppercase text-white tracking-widest">Why This Matters</h4>
                        </div>
                        <p className="text-xs text-zinc-400 italic leading-relaxed">
                            Canadian private sector HR functions differently than public ministries. If you don't "translate" your value into their language (RRSPs, base salary vs total comp, provincial standards), you risk being under-leveled or ignored by ATS filters.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                          <ShieldCheck className="text-teal-400" size={20}/>
                          <h4 className="text-[10px] font-black uppercase text-white tracking-widest">RRSP vs Pension</h4>
                          <p className="text-xs text-zinc-400 italic font-light leading-relaxed">Public pensions are high-value. If a private role doesn't offer matching, you must negotiate a <strong className="text-teal-400">5-8% higher base salary</strong> to stay financially neutral. Don't leave money on the table.</p>
                        </div>
                        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                          {!isHearthkeeper && <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20"><Lock size={16} className="text-zinc-600"/></div>}
                          <Save className="text-purple-400" size={20}/>
                          <h4 className="text-[10px] font-black uppercase text-white tracking-widest">Credential Translation</h4>
                          <p className="text-xs text-zinc-400 italic font-light leading-relaxed">List provincial licenses as <strong className="text-purple-400">"Provincial Regulatory Compliance & Standards Certification"</strong> to trigger corporate HR compliance matches.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FALLBACK FOR WIP CONTENT */}
                  {(tool.id === 'scripts' || tool.id === 'outreach' || tool.id === 'resume') && (
                    <div className="p-12 text-center bg-black/20 rounded-3xl border border-dashed border-white/10">
                        <Crown className="text-teal-500/20 mx-auto mb-4" size={32} />
                        <h4 className="text-white font-serif italic text-lg mb-2">{tool.title}</h4>
                        <p className="text-xs text-zinc-500 italic max-w-xs mx-auto">This tactical provision is being formatted for the digital archive. {isAdmin ? "As Admin, you can see this placeholder; users will see their tier requirements." : ""}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;