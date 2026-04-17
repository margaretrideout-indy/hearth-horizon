import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Compass, DollarSign, FileDown, BookOpen, Sparkles,
  Download
} from 'lucide-react';

// --- EXPANDED LEXICON ---
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
    { legacy: "Made", horizon: "Architected", use: "Designing scalable frameworks." },
    { legacy: "Supported", horizon: "Sustained", use: "Ensuring operational continuity." },
    { legacy: "Checked", horizon: "Audited", use: "Verifying compliance standards." },
    { legacy: "Answered", horizon: "Resolved", use: "Closing complex ticket escalations." },
    { legacy: "Planned", horizon: "Strategized", use: "Mapping multi-year growth trajectories." },
    { legacy: "Showed", horizon: "Demonstrated", use: "Validating proof-of-concepts." },
    { legacy: "Met with", horizon: "Collaborated", use: "Syncing with cross-functional partners." }
];

// --- DYNAMIC SCRIPT GENERATOR ---
const generateDynamicScripts = (vault) => {
    const targetRole = vault?.selectedPath?.domain || "[Target Role]";
    const salaryRange = vault?.selectedPath?.salary || "$[X] to $[Y]";
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Top Skill]";

    return {
        salary: [
            { 
                label: "The 'Anchor' Avoidance", 
                context: "Pivot from current salary to market value.",
                script: `I am looking for a total compensation package that reflects the current market value for a ${targetRole} level of responsibility. Given my expertise in ${topSkill}, I am focusing on positions in the ${salaryRange} range. Does that align with your budget for this hire?` 
            },
            { 
                label: "The 'Total Rewards' Pivot", 
                context: "When the base salary is firm but you need more value.",
                script: `I understand the base is fixed at this level. Given my specialized background in ${topSkill}, can we discuss other levers such as a signing bonus, an accelerated performance review at 6 months, or flexible wellness credits to align the total rewards with my seniority in ${targetRole}?` 
            },
            { 
                label: "The 'Competing Offer' Closer", 
                context: "Using external leverage to finalize with your preferred company.",
                script: `I’ve received another competitive offer that is very strong on the base salary. However, your team remains my first choice. If we can get the base to the ${salaryRange.split(' - ')[1] || '$[Target]'} mark, I’m prepared to sign today and withdraw from all other processes.` 
            }
        ],
        outreach: [
            { 
                id: 'p1', title: "Phase 1: Soft Curiosity", goal: "LOW STAKES",
                script: `Subject: Question from a fellow lead\n\nHi [Name], I've been following your team's growth in ${targetRole}. As I transition my experience in ${topSkill} toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?` 
            },
            { 
                id: 'p2', title: "Phase 2: Value Exchange", goal: "OFFER PERSPECTIVE",
                script: `Hi [Name], following up on our exchange—I actually just drafted a brief analysis on how ${topSkill} impacts ${targetRole} outcomes regarding that 'unwritten' skill we discussed. Thought your team might find a fresh perspective useful. Here’s the link (no gates).` 
            },
            { 
                id: 'p3', title: "Phase 3: Sponsorship Request", goal: "15-MINUTE CALL",
                script: `Hi [Name], your insights have been instrumental. I'm currently architecting my move into ${targetRole} and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company]. Does [Day/Time] work for a quick sync?` 
            },
            { 
                id: 'p4', title: "Phase 4: The Stealth Referral", goal: "CLOSING THE CIRCLE",
                script: `Thank you for the talk, [Name]. Based on our discussion, it's clear my background in ${topSkill} solves a few of the bottlenecks we touched on. If you're comfortable, I'd love to stay on your radar for any upcoming roles. I've attached my resume for your records.` 
            }
        ]
    };
};

const trailKitProvisions = [
  { id: 'verbs', title: "The Power Verb Lexicon", desc: "Strategic verbs to replace legacy public-sector language.", type: "Interactive Glossary", icon: <Zap className="text-purple-400" />, isAccordion: true },
  { id: 'market', title: "Canadian Market Primer", desc: "The 'How-To' guide for sector translation and the Horizon Workshop.", type: "Interactive Guide", icon: <Map className="text-teal-400" />, isAccordion: true },
  { id: 'resume', title: "The Trailblazer's Blueprint", desc: "Clean, ATS-optimized layout designed for private sector applications.", type: "Digital Blueprint", icon: <FileText className="text-purple-400" />, isAccordion: true },
  { id: 'scripts', title: "Salary Negotiation Scripts", desc: "Tactical word-for-word scripts for high-stakes compensation talks.", type: "Interactive Tool", icon: <MessageSquare className="text-teal-400" />, isAccordion: true },
  { id: 'outreach', title: "Sponsorship Outreach", desc: "4-phase sequence to turn cold contacts into advocates.", type: "Communication Sequence", icon: <Mail className="text-purple-400" />, isAccordion: true }
];

const Contact = ({ currentVolume, vault }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);

  const dynamicContent = generateDynamicScripts(vault);
  
  const basecampProvisions = [
    { id: 'welcome', title: "The Founding Member Guide", desc: "Mission overview for Hearth & Horizon Stewards.", type: "Welcome Kit", icon: <BookOpen className="text-teal-400" /> },
    { id: 'intro', title: "Public-to-Private 101", desc: "Overview of the psychological shift for a successful pivot.", type: "Mindset Workshop", icon: <Sparkles className="text-purple-400" /> }
  ];

  const activeResources = currentVolume === 1 ? basecampProvisions : trailKitProvisions;

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6">
            {currentVolume === 1 ? "Volume I: Basecamp" : "Volume II: Trail Kit"}
        </h1>
        {vault?.selectedPath && (
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 animate-pulse">
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
                onClick={() => tool.isAccordion && setExpandedCard(isOpen ? null : tool.id)}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 ${
                  isOpen ? 'rounded-t-[2.5rem] border-teal-500/30 shadow-[0_10px_30px_rgba(20,184,166,0.05)]' : 'rounded-[2.5rem] border-zinc-800/50 hover:border-teal-500/30'
                } cursor-pointer`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-teal-500/10 group-hover:border-teal-500/20 transition-colors">{tool.icon}</div>
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
                            {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 6)).map((v, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl animate-in fade-in zoom-in-95">
                                    <div className="text-[10px] text-zinc-600 line-through uppercase mb-1">{v.legacy}</div>
                                    <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                    <div className="text-[9px] text-zinc-500 mt-2 font-mono italic opacity-60">"{v.use}"</div>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setShowAllVerbs(!showAllVerbs)}
                            className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                        >
                            {showAllVerbs ? "Collapse Lexicon" : "View Full Lexicon (50+ Verbs)"}
                        </button>
                    </div>
                  )}

                  {tool.id === 'resume' && (
                    <div className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-[2rem]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-6 italic">The Trailblazer's Blueprint</h4>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy", "_blank")} 
                                className="flex-1 bg-purple-500 text-white px-8 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                                <ExternalLink size={14} /> Use Google Doc Template
                            </button>
                            <button 
                                onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/export?format=docx", "_blank")} 
                                className="flex-1 border border-purple-500/30 text-purple-400 px-8 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <Download size={14} /> Download .DOCX
                            </button>
                        </div>
                    </div>
                  )}

                  {tool.id === 'market' && (
                    <div className="bg-teal-500/5 border border-teal-500/20 p-8 rounded-[2rem]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-2">Horizon Workshop Assets</h4>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit", "_blank")} className="flex-1 bg-teal-500 text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                                <Compass size={14} /> Launch Slide Deck
                            </button>
                            <button onClick={() => window.open("https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link", "_blank")} className="flex-1 border border-teal-500/30 text-teal-400 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-500/10 transition-colors flex items-center justify-center gap-2">
                                <FileDown size={14} /> PDF Worksheet
                            </button>
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
                                <div className="p-4 bg-black/60 rounded-lg border border-white/5 font-mono text-[11px] text-zinc-300 italic leading-relaxed select-all">
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
                                    <div className="flex items-center gap-3 text-left">
                                        <span className="text-[10px] font-black uppercase text-white">{phase.title}</span>
                                        <span className="text-[8px] font-bold text-teal-500/40 uppercase tracking-tighter">{phase.goal}</span>
                                    </div>
                                    {openPhaseId === phase.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />}
                                </button>
                                {openPhaseId === phase.id && (
                                    <div className="p-6 pt-0 bg-black/20">
                                        <div className="p-4 bg-black/40 rounded-xl mt-4 font-mono text-[11px] text-zinc-300 italic whitespace-pre-wrap leading-relaxed border border-white/5 select-all">
                                            {phase.script}
                                        </div>
                                    </div>
                                )}
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