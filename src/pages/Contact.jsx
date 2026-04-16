import React, { useState } from 'react';
import { 
  FileText, 
  MessageSquare, 
  Map, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck,
  Mail,
  ExternalLink,
  Save
} from 'lucide-react';

const libraryVolumeII = [
  {
    id: 'resume',
    title: "The Horizon Resume Template",
    desc: "A clean, ATS-optimized layout. Click to create your own private, editable copy.",
    type: "Digital Blueprint",
    icon: <FileText className="text-purple-400" />,
    action: "Create My Copy",
    url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy"
  },
  {
    id: 'scripts',
    title: "Salary Negotiation Scripts",
    desc: "Interactive word-for-word scripts for the 'expectations' talk. Click to expand.",
    type: "Interactive Tool",
    icon: <MessageSquare className="text-teal-400" />,
    action: "View Scripts",
    isAccordion: true
  },
  {
    id: 'verbs',
    title: "The Power Verb Lexicon",
    desc: "The 'Flip' dictionary. 50+ corporate verbs to replace legacy language.",
    type: "Interactive Glossary",
    icon: <Zap className="text-purple-400" />,
    action: "Open Lexicon",
    isAccordion: true
  },
  {
    id: 'market',
    title: "Canadian Market Primer",
    desc: "The truth about RRSPs, vacation time, and provincial credential 'translation'.",
    type: "Interactive Guide",
    icon: <Map className="text-teal-400" />,
    action: "Read Primer",
    isAccordion: true
  }
];

const negotiationScripts = [
  { id: 'anchor', situation: "The Early Inquiry (The 'Anchor')", context: "A recruiter asks: 'What are your salary expectations?'", script: "I’m quite flexible depending on the total compensation package. Based on my research for similar roles in Canada, I’m looking for a range between $[Lower] and $[Upper]." },
  { id: 'pivot', situation: "The Pivot (Transferable Value)", context: "They offer a low number because they see you as 'entry-level'.", script: "While I am transitioning sectors, I bring a decade of high-stakes leadership. My ability to lead from day one saves significant onboarding time. I was hoping for a base closer to $[Target]." },
  { id: 'bridge', situation: "The Benefits Bridge", context: "Base salary is capped. Use this to find value elsewhere.", script: "I understand the base is capped. Would you be open to discussing a signing bonus, higher RRSP matching, or an additional week of vacation to bridge the gap?" }
];

const powerVerbs = [
  { legacy: "Led/Managed", horizon: "Spearheaded", use: "For projects you initiated." },
  { legacy: "Taught", horizon: "Facilitated", use: "For high-level workshops/training." },
  { legacy: "Improved", horizon: "Optimized", use: "For making systems more efficient." },
  { legacy: "Organized", horizon: "Orchestrated", use: "For complex, multi-part logistics." },
  { legacy: "Talked to", horizon: "Consulted", use: "For expert advice to stakeholders." },
  { legacy: "Made", horizon: "Architected", use: "For building new frameworks." }
];

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
    {children}
  </span>
);

const Provisions = () => {
  const [openScriptId, setOpenScriptId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (tool) => {
    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url && tool.url !== "#") {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80 whitespace-nowrap">Wayfarer's Provisions</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>
        
        <div className="mb-12 max-w-2xl">
          <p className="text-sm text-zinc-400 leading-relaxed italic font-light">
            If Volume I is your <span className="text-white font-serif italic">Foundation</span>, 
            this volume is your <span className="text-white font-serif italic">Momentum</span>. 
            Specialized tactical assets designed for the active professional climb.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-6">
          {libraryVolumeII.map((tool) => (
            <div key={tool.id} className="flex flex-col gap-0 group">
              <div 
                onClick={() => handleCardClick(tool)}
                className={`relative bg-[#110E16] border border-zinc-800/50 p-8 transition-all duration-300 cursor-pointer overflow-hidden shadow-xl ${
                  expandedCard === tool.id 
                    ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02]' 
                    : 'rounded-[2.5rem] hover:border-purple-500/30'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform group-hover:scale-105`}>
                      {tool.icon}
                    </div>
                    <div>
                      <Badge className="bg-zinc-800/50 text-zinc-500 mb-2">{tool.type}</Badge>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic">{tool.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-all">
                    {tool.action}
                    {tool.isAccordion ? (
                      expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />
                    ) : (
                      <ExternalLink size={14} />
                    )}
                  </div>
                </div>
              </div>

              {/* Accordion Content Areas */}
              {expandedCard === tool.id && tool.isAccordion && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {/* Salary Scripts Content */}
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                      {negotiationScripts.map((item) => (
                        <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
                          <button 
                            onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} 
                            className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.situation}</span>
                            {openScriptId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {openScriptId === item.id && (
                            <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                              <p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mt-6 mb-2 italic">The Situation:</p>
                              <p className="text-zinc-400 mb-4 italic text-xs font-light">{item.context}</p>
                              <div className="bg-[#16121D] p-5 rounded-xl border border-teal-500/20 text-zinc-200 font-mono text-xs leading-relaxed italic relative">
                                <div className="absolute top-2 right-3 opacity-20"><MessageSquare size={12}/></div>
                                "{item.script}"
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Power Verbs Content */}
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

                  {/* Canadian Market Content */}
                  {tool.id === 'market' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                          <ShieldCheck size={20}/>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">The "Golden Handcuffs" Bridge</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light italic">
                            Public pensions are high-value. If a private role doesn't offer RRSP matching, you must negotiate a <strong className="text-teal-500">5-8% higher base salary</strong> to stay financially neutral.
                          </p>
                        </div>
                      </div>
                      <div className="p-6 bg-black/40 border border-white/5 rounded-2xl flex flex-col gap-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                          <Save size={20}/>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Provincial Credential Translation</h4>
                          <p className="text-xs text-zinc-400 leading-relaxed font-light italic">
                            Don't list provincial licenses as "Teaching Certificates." List them as <strong className="text-purple-400">"Provincial Regulatory Compliance & Standards Certification"</strong> to appeal to corporate HR scanners.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="mt-20">
        <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#16121D] to-[#0A080D] border border-white/5 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center mb-8">
                <Mail className="text-teal-400" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic text-white mb-4">Request a Specific Provision</h3>
              <p className="text-sm text-zinc-400 mb-10 max-w-lg mx-auto leading-relaxed font-light italic">
                If there is a script, template, or guide you need for your unique migration path, 
                reach out. The Librarians are constantly expanding the archives.
              </p>
              <button 
                onClick={() => window.location.href = 'mailto:support@hearthandhorizon.com'} 
                className="h-14 px-12 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-teal-400 hover:scale-105 transition-all duration-300 shadow-xl shadow-white/5"
              >
                Message the Librarians
              </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Provisions;