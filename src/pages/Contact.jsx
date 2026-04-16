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
  BookOpen,
  ArrowLeft
} from 'lucide-react';

export const libraryVolumeII = [
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
    <div className="min-h-screen bg-[#050406] text-slate-300 font-sans p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Wayfarer's Provisions</h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            If Volume I is your <span className="text-teal-400 italic font-medium">Foundation</span>, 
            this volume is your <span className="text-purple-400 italic font-medium">Momentum</span>. 
            Specialized assets designed for the active climb.
          </p>
        </div>

        <div className="grid gap-4">
          {libraryVolumeII.map((tool) => (
            <div key={tool.id} className="flex flex-col gap-0">
              <div 
                onClick={() => handleCardClick(tool)}
                className={`group relative bg-[#0A080D] border border-white/5 p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                  expandedCard === tool.id 
                    ? 'rounded-t-2xl border-b-0 border-teal-500/30 shadow-[0_-10px_40px_rgba(20,184,166,0.1)]' 
                    : 'rounded-2xl hover:border-purple-500/30'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-1">{tool.type}</div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-slate-400 mt-1 max-w-md text-sm">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                    {tool.action}
                    {expandedCard === tool.id ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
              </div>

              {/* Salary Scripts Accordion */}
              {tool.id === 'scripts' && expandedCard === 'scripts' && (
                <div className="bg-[#0A080D] border-x border-b border-white/5 rounded-b-2xl p-6 pt-0 space-y-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div className="h-px bg-white/5 mb-6 w-full" />
                  {negotiationScripts.map((item) => (
                    <div key={item.id} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                      <button onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
                        <span className="text-sm font-semibold text-white">{item.situation}</span>
                        {openScriptId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {openScriptId === item.id && (
                        <div className="p-4 pt-0 border-t border-white/5 bg-black/20">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-teal-500 mt-4 mb-1">The Situation:</p>
                          <p className="text-slate-400 mb-3 italic text-xs">{item.context}</p>
                          <div className="bg-[#110E16] p-4 rounded-lg border border-purple-500/20 text-white font-mono text-xs leading-relaxed italic">"{item.script}"</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Power Verbs Accordion */}
              {tool.id === 'verbs' && expandedCard === 'verbs' && (
                <div className="bg-[#0A080D] border-x border-b border-white/5 rounded-b-2xl p-6 pt-0 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div className="h-px bg-white/5 mb-6 w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                    {powerVerbs.map((verb, idx) => (
                      <div key={idx} className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500 line-through">{verb.legacy}</span>
                          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter italic">Flip to</span>
                        </div>
                        <div className="text-lg font-bold text-teal-400 mb-1">{verb.horizon}</div>
                        <p className="text-[11px] text-slate-500 leading-tight">{verb.use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Canadian Market Primer Accordion */}
              {tool.id === 'market' && expandedCard === 'market' && (
                <div className="bg-[#0A080D] border-x border-b border-white/5 rounded-b-2xl p-6 pt-0 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <div className="h-px bg-white/5 mb-6 w-full" />
                  <div className="space-y-6 pb-4">
                    <div className="flex gap-4">
                      <div className="mt-1 p-2 bg-teal-500/10 rounded-lg"><ShieldCheck className="text-teal-400" size={20}/></div>
                      <div>
                        <h4 className="text-white font-bold mb-1">The "Golden Handcuffs" Bridge</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Public pensions are high-value. If a private role doesn't offer RRSP matching, you must negotiate a **5-8% higher base salary** to stay financially neutral.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="mt-1 p-2 bg-purple-500/10 rounded-lg"><Map className="text-purple-400" size={20}/></div>
                      <div>
                        <h4 className="text-white font-bold mb-1">Provincial Credential Translation</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Don't list provincial licenses as "Teaching Certificates." List them as **"Provincial Regulatory Compliance & Standards Certification"** to appeal to corporate HR scanners.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 p-12 rounded-[2.5rem] bg-gradient-to-br from-purple-900/10 via-[#0A080D] to-teal-900/10 border border-white/5 text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Mail className="text-teal-400" size={24} />
              </div>
              <h3 className="text-white font-serif italic text-3xl mb-3">Looking for a specific provision?</h3>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
                If there is a script, template, or guide you need for your unique path, 
                reach out. The Librarians are constantly expanding the archives.
              </p>
              <button 
                onClick={() => window.location.href = 'mailto:support@hearthandhorizon.com'} 
                className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-teal-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-white/5"
              >
                  Message the Librarians
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none" />
        </div>

        {/* VOLUME NAVIGATION TOGGLE */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <button 
            onClick={() => window.location.href = '/library'} 
            className="group p-6 bg-[#0A080D] border border-teal-500/20 rounded-2xl flex flex-col items-center gap-3 hover:border-teal-400 transition-all active:scale-95"
          >
            <div className="p-3 bg-teal-500/10 rounded-full text-teal-400 group-hover:bg-teal-400 group-hover:text-black transition-colors">
              <ArrowLeft size={20} />
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Back to</div>
              <div className="text-white font-serif italic text-lg">Library Vol. I</div>
            </div>
          </button>

          <div className="p-6 bg-[#0A080D] border border-white/5 rounded-2xl flex flex-col items-center gap-3 opacity-50 cursor-default">
            <div className="p-3 bg-purple-500/10 rounded-full text-purple-400">
              <BookOpen size={20} />
            </div>
            <div className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Currently Reading</div>
              <div className="text-white font-serif italic text-lg">Library Vol. II</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provisions;