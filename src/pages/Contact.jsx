import React, { useState } from 'react';
import { Download, FileText, MessageSquare, Map, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export const libraryVolumeII = [
  {
    title: "The Horizon Resume Template",
    desc: "A clean, ATS-optimized layout. Click to create your own private, editable copy.",
    type: "Google Doc Template",
    icon: <FileText className="text-purple-400" />,
    action: "Create My Copy",
    url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy"
  },
  {
    title: "The Power Verb Lexicon",
    desc: "100+ corporate verbs to replace 'helped', 'taught', and 'organized'.",
    type: "Glossary",
    icon: <Download className="text-purple-400" />,
    action: "View List",
    url: "#"
  },
  {
    title: "Canadian Market Primer",
    desc: "Specific advice for RRSP negotiation and provincial license translation.",
    type: "Static PDF",
    icon: <Map className="text-teal-400" />,
    action: "Open Guide",
    url: "#"
  }
];

const Provisions = () => {
  const [openScript, setOpenScript] = useState(null);

  const negotiationScripts = [
    {
      id: 'anchor',
      situation: "The Early Inquiry (The 'Anchor')",
      context: "A recruiter asks in the first screening call: 'What are your salary expectations?'",
      script: "I’m quite flexible depending on the total compensation package and the growth opportunities. Based on my research for similar roles in the Canadian market, I’m looking for a range between $[Lower] and $[Upper]. Does that align with your budget for this position?"
    },
    {
      id: 'pivot',
      situation: "The Pivot (Transferable Value)",
      context: "They offer a low number because they see you as 'entry-level' in a new sector.",
      script: "I appreciate the offer. While I am transitioning sectors, I bring over a decade of high-stakes experience in leadership and project management. My ability to lead teams from day one will save significant onboarding time. Given that impact, I was hoping for a base closer to $[Target]."
    },
    {
      id: 'bridge',
      situation: "The Benefits Bridge",
      context: "They hit their hard limit on base salary. Use this to find value elsewhere.",
      script: "I understand the base salary is capped. If we can't move the needle there, would you be open to discussing a signing bonus, a higher RRSP matching percentage, or an additional week of vacation to bridge the gap?"
    }
  ];

  const handleAction = (url) => {
    if (url && url !== "#") {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#050406] text-slate-300 font-sans p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Wayfarer's Provisions</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            If the first page of the library is your <span className="text-teal-400 italic">Strategy</span>, 
            this page is your <span className="text-purple-400 italic">Gear</span>. Take what you need for the road ahead.
          </p>
        </div>

        {/* Interactive Accordion Section for Scripts */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif italic text-white mb-6 flex items-center gap-3">
            <MessageSquare className="text-teal-400" size={24} />
            Salary Negotiation Scripts
          </h2>
          <div className="space-y-3">
            {negotiationScripts.map((item) => (
              <div key={item.id} className="bg-[#0A080D] border border-white/5 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenScript(openScript === item.id ? null : item.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white">{item.situation}</span>
                  {openScript === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openScript === item.id && (
                  <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                    <p className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2">The Situation:</p>
                    <p className="text-slate-400 mb-4 italic text-sm">{item.context}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-500 mb-2">The Script:</p>
                    <div className="bg-[#110E16] p-4 rounded-xl border border-purple-500/20 text-white font-mono text-sm leading-relaxed">
                      "{item.script}"
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {libraryVolumeII.map((tool, idx) => (
            <div 
              key={idx}
              onClick={() => handleAction(tool.url)}
              className="group relative bg-[#0A080D] border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                      {tool.type}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-400 mt-1 max-w-md">{tool.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                  {tool.action}
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-teal-900/20 border border-white/5 text-center">
            <h3 className="text-white font-serif italic text-2xl mb-2">Need a custom provision?</h3>
            <p className="text-slate-400 mb-6">If you're looking for a specific template or guide that isn't here, let the Hearthkeepers know.</p>
            <button 
              onClick={() => window.location.href = 'mailto:support@hearthandhorizon.com'}
              className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-teal-400 transition-colors"
            >
                Contact Archive Support
            </button>
        </div>
      </div>
    </div>
  );
};

export default Provisions;