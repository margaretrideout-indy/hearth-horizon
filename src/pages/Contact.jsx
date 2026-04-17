import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Compass, DollarSign, FileDown, BookOpen, Sparkles
} from 'lucide-react';

const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardizing delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to cross-functional teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." },
    { legacy: "Fixed", horizon: "Remediated", use: "Identifying and resolving systemic bottlenecks." }
];

// --- DYNAMIC SCRIPT GENERATOR ---
// This function takes the vault data and injects it into the templates
const generateDynamicScripts = (vault) => {
    const targetRole = vault?.selectedPath?.domain || "[Target Role]";
    const salaryRange = vault?.selectedPath?.salary || "$[X] to $[Y]";
    
    // Grabbing the first "aligned" skill we found in the Harvest
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Top Skill]";

    return {
        salary: [
            { 
                label: "The 'Anchor' Avoidance", 
                context: "Pivot from current salary to market value.",
                script: `I am looking for a total compensation package that reflects the current market value for a ${targetRole} level of responsibility. Given my expertise in ${topSkill}, I am focusing on positions in the ${salaryRange} range. Does that align with your budget?` 
            },
            { 
                label: "The 'Total Rewards' Pivot", 
                context: "When the base salary is firm but you need more value.",
                script: `I understand the base is fixed. Given my specialized background in ${topSkill}, can we discuss other levers such as a signing bonus or an accelerated performance review to align the total rewards with the seniority of this ${targetRole} position?` 
            }
        ],
        outreach: [
            { 
                id: 'p1', title: "Phase 1: Soft Curiosity", 
                script: `Subject: Question from a fellow lead\n\nHi [Name], I've been following your team's growth. As I transition my experience in ${topSkill} toward a ${targetRole} focus in the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?` 
            },
            { 
                id: 'p3', title: "Phase 3: Sponsorship Request", 
                script: `Hi [Name], your insights have been instrumental. I'm currently architecting my move into ${targetRole} roles and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company]. Does [Day/Time] work?` 
            }
        ]
    };
};

const trailKitProvisions = [
  { id: 'verbs', title: "The Power Verb Lexicon", desc: "Strategic verbs to replace legacy public-sector language.", type: "Interactive Glossary", icon: <Zap className="text-purple-400" />, isAccordion: true },
  { id: 'market', title: "Canadian Market Primer", desc: "The 'How-To' guide for sector translation.", type: "Interactive Guide", icon: <Map className="text-teal-400" />, isAccordion: true },
  { id: 'resume', title: "The Horizon Resume Template", desc: "ATS-optimized layout.", type: "Digital Blueprint", icon: <FileText className="text-purple-400" />, url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy" },
  { id: 'scripts', title: "Salary Negotiation Scripts", desc: "Tactical word-for-word scripts.", type: "Interactive Tool", icon: <MessageSquare className="text-teal-400" />, isAccordion: true },
  { id: 'outreach', title: "Sponsorship Outreach", desc: "4-phase sequence to turn contacts into advocates.", type: "Communication Sequence", icon: <Mail className="text-purple-400" />, isAccordion: true }
];

const basecampProvisions = [
    { id: 'welcome', title: "The Founding Member Guide", desc: "Mission overview for Stewards.", type: "Welcome Kit", icon: <BookOpen className="text-teal-400" /> },
    { id: 'intro', title: "Public-to-Private 101", desc: "Psychological shift for a successful pivot.", type: "Mindset Workshop", icon: <Sparkles className="text-purple-400" /> }
];

const Contact = ({ currentVolume, vault }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  const dynamicContent = generateDynamicScripts(vault);
  const activeResources = currentVolume === 1 ? basecampProvisions : trailKitProvisions;

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6">
            {currentVolume === 1 ? "Volume I: Basecamp" : "Volume II: Trail Kit"}
        </h1>
        {vault?.selectedPath && (
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-teal-500/20 bg-teal-500/5">
                <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest italic">Kit calibrated for {vault.selectedPath.domain}</span>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 mb-20">
        {activeResources.map((tool) => {
          const isOpen = expandedCard === tool.id;
          return (
            <div key={tool.id} className="flex flex-col group">
              <div 
                onClick={() => {
                  if (tool.isAccordion) setExpandedCard(isOpen ? null : tool.id);
                  else if (tool.url) window.open(tool.url, '_blank');
                }}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 ${
                  isOpen ? 'rounded-t-[2.5rem] border-teal-500/30' : 'rounded-[2.5rem] border-zinc-800/50 hover:border-teal-500/30'
                } cursor-pointer`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">{tool.icon}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500 mb-2">{tool.type}</span>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    {isOpen ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4">
                  
                  {tool.id === 'verbs' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {powerVerbs.map((v, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl">
                                    <div className="text-[10px] text-zinc-600 line-through uppercase mb-1">{v.legacy}</div>
                                    <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                  )}

                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                        {dynamicContent.salary.map((s, i) => (
                            <div key={i} className="bg-black/40 border border-white/5 p-5 rounded-xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <DollarSign size={12} className="text-teal-400" />
                                    <h4 className="text-[9px] font-black uppercase text-white">{s.label}</h4>
                                </div>
                                <p className="text-[10px] text-zinc-500 italic mb-3">{s.context}</p>
                                <div className="p-4 bg-black/60 rounded-lg border border-white/5 font-mono text-[11px] text-zinc-300 italic leading-relaxed">
                                    "{s.script}"
                                </div>
                            </div>
                        ))}
                    </div>
                  )}

                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {dynamicContent.outreach.map((phase) => (
                            <div key={phase.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <span className="text-[10px] font-black uppercase text-white">{phase.title}</span>
                                    {openPhaseId === phase.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />}
                                </button>
                                {openPhaseId === phase.id && (
                                    <div className="p-6 pt-0 bg-black/20">
                                        <div className="p-4 bg-black/40 rounded-xl mt-4 font-mono text-[11px] text-zinc-300 italic whitespace-pre-wrap leading-relaxed border border-white/5">
                                            {phase.script}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                  )}
                  {/* ... other tool IDs (market, etc) remain same as your previous version ... */}
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