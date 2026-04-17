import React, { useState } from 'react';
import { 
  FileText, MessageSquare, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, DollarSign, Download, Copy
} from 'lucide-react';

// --- VOL 2 DATA ONLY ---
const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardizing delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex logistics." },
    { legacy: "Fixed", horizon: "Remediated", use: "Resolving systemic bottlenecks." },
    { legacy: "Helped", horizon: "Advocated", use: "Championing client-centric solutions." },
    { legacy: "Worked on", horizon: "Executed", use: "Delivering high-impact project milestones." },
    { legacy: "Started", horizon: "Pioneered", use: "Launching first-to-market initiatives." },
    { legacy: "Used", horizon: "Leveraged", use: "Utilizing data-driven insights for growth." },
    { legacy: "Changed", horizon: "Transformed", use: "Modernizing legacy architectures." },
    { legacy: "Made", horizon: "Architected", use: "Designing scalable frameworks." }
];

const generateDynamicScripts = (vault) => {
    const targetRole = vault?.selectedPath?.domain || "[Target Role]";
    const salaryRange = vault?.selectedPath?.salary || "$[X] to $[Y]";
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Top Skill]";

    return {
        salary: [
            { label: "The 'Anchor' Avoidance", script: `I am looking for a total compensation package that reflects the market value for a ${targetRole}. Given my expertise in ${topSkill}, I am focusing on the ${salaryRange} range.` },
            { label: "The 'Total Rewards' Pivot", script: `Given my background in ${topSkill}, can we discuss other levers like a signing bonus to align with the seniority of this ${targetRole} position?` }
        ],
        outreach: [
            { id: 'p1', title: "Phase 1: Soft Curiosity", script: `Hi [Name], I've been following your team's growth in ${targetRole}. As I transition my experience in ${topSkill} toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most?` },
            { id: 'p3', title: "Phase 3: Sponsorship Request", script: `Hi [Name], I'm currently architecting my move into ${targetRole} and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company].` }
        ]
    };
};

const Contact = ({ vault }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);
  const dynamicContent = generateDynamicScripts(vault);

  // VOLUME 2 RESOURCES ONLY
  const trailKitResources = [
    { id: 'verbs', title: "Power Verb Lexicon", desc: "Available for Seedlings+. Strategic sector-agnostic verbs.", type: "Glossary", icon: <Zap className="text-purple-400" /> },
    { id: 'resume', title: "Trailblazer's Blueprint", desc: "Available for Hearthkeepers+. ATS-optimized resume layout.", type: "Blueprint", icon: <FileText className="text-teal-400" /> },
    { id: 'outreach', title: "Sponsorship Outreach", desc: "Available for Stewards. 4-phase outreach sequence.", type: "Tactical", icon: <Mail className="text-purple-400" /> },
    { id: 'scripts', title: "Salary Negotiations", desc: "Available for Stewards. Dynamic compensation scripts.", type: "Tactical", icon: <DollarSign className="text-teal-400" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6">Volume II: The Trail Kit</h1>
        {vault?.selectedPath && (
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-teal-500/20 bg-teal-500/5">
                <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest italic animate-pulse">Kit calibrated for {vault.selectedPath.domain}</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 mb-20">
        {trailKitResources.map((tool) => {
          const isOpen = expandedCard === tool.id;
          return (
            <div key={tool.id} className="flex flex-col group">
              <div 
                onClick={() => setExpandedCard(isOpen ? null : tool.id)}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 ${
                  isOpen ? 'rounded-t-[2.5rem] border-teal-500/30' : 'rounded-[2.5rem] border-zinc-800/50 hover:border-teal-500/30'
                } cursor-pointer`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-teal-500/10 transition-colors">{tool.icon}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500 mb-2">{tool.type}</span>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-zinc-500 group-hover:text-white">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4">
                  {tool.id === 'verbs' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 6)).map((v, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl animate-in zoom-in-95">
                                <div className="text-[10px] text-zinc-600 line-through uppercase mb-1">{v.legacy}</div>
                                <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                <div className="text-[9px] text-zinc-500 mt-2 italic opacity-60">"{v.use}"</div>
                            </div>
                        ))}
                        </div>
                        <button onClick={() => setShowAllVerbs(!showAllVerbs)} className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-all">
                            {showAllVerbs ? "Collapse Lexicon" : "View Full Lexicon (50+ Verbs)"}
                        </button>
                    </div>
                  )}

                  {tool.id === 'resume' && (
                    <div className="bg-purple-500/5 border border-purple-500/20 p-6 rounded-3xl">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy")} className="flex-1 bg-purple-500 text-white px-8 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-400 transition-all flex items-center justify-center gap-2">
                                <ExternalLink size={14} /> Use Google Doc
                            </button>
                            <button onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/export?format=docx")} className="flex-1 border border-purple-500/30 text-purple-400 px-8 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2">
                                <Download size={14} /> Download .DOCX
                            </button>
                        </div>
                    </div>
                  )}

                  {(tool.id === 'outreach' || tool.id === 'scripts') && (
                    <div className="space-y-4">
                      {(tool.id === 'outreach' ? dynamicContent.outreach : dynamicContent.salary).map((phase, i) => (
                        <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-xl group/script relative">
                           <h4 className="text-[10px] font-black uppercase text-white mb-3 tracking-widest">{phase.title || phase.label}</h4>
                           <div className="p-4 bg-black/60 rounded-lg border border-white/5 font-mono text-[11px] text-zinc-300 italic select-all leading-relaxed whitespace-pre-wrap">"{phase.script}"</div>
                           <div className="absolute top-4 right-4 opacity-0 group-hover/script:opacity-100 transition-opacity"><Copy size={12} className="text-zinc-600" /></div>
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