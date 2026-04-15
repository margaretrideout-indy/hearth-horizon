import React from 'react';
import { Download, FileText, MessageSquare, Map, ExternalLink, ChevronRight } from 'lucide-react';

// This exported array resolves the "does not provide an export named 'libraryVolumeII'" error
export const libraryVolumeII = [
  {
    title: "The Horizon Resume Template",
    desc: "A clean, ATS-optimized layout designed to strip away academic jargon.",
    type: "Downloadable Doc",
    icon: <FileText className="text-purple-400" />,
    action: "Get Template"
  },
  {
    title: "Salary Negotiation Scripts",
    desc: "Exact word-for-word scripts to use during the 'What are your expectations?' talk.",
    type: "Reference Guide",
    icon: <MessageSquare className="text-teal-400" />,
    action: "Read Scripts"
  },
  {
    title: "The Power Verb Lexicon",
    desc: "100+ corporate verbs to replace 'helped', 'taught', and 'organized'.",
    type: "Glossary",
    icon: <Download className="text-purple-400" />,
    action: "View List"
  },
  {
    title: "Canadian Market Primer",
    desc: "Specific advice for RRSP negotiation and provincial license translation.",
    type: "Static PDF",
    icon: <Map className="text-teal-400" />,
    action: "Open Guide"
  }
];

const Provisions = () => {
  return (
    <div className="min-h-screen bg-[#050406] text-slate-300 font-sans p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-4">Wayfarer's Provisions</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            If the first page of the library is your <span className="text-teal-400 italic">Strategy</span>, 
            this page is your <span className="text-purple-400 italic">Gear</span>. Take what you need for the road ahead.
          </p>
        </div>

        {/* The Tools Grid */}
        <div className="grid gap-4">
          {libraryVolumeII.map((tool, idx) => (
            <div 
              key={idx}
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

        {/* Help Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-teal-900/20 border border-white/5 text-center">
            <h3 className="text-white font-serif italic text-2xl mb-2">Need a custom provision?</h3>
            <p className="text-slate-400 mb-6">If you're looking for a specific template or guide that isn't here, let the Hearthkeepers know.</p>
            <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-teal-400 transition-colors">
                Contact Archive Support
            </button>
        </div>
      </div>
    </div>
  );
};

export default Provisions;