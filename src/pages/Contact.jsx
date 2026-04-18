import React, { useState } from 'react';
import { 
  FileText, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, DollarSign, Download, Copy, Lock,
  Fingerprint, ClipboardList, Presentation, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: THE FULL 50 VERB LEXICON ---
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
    { legacy: "Led", horizon: "Championed", use: "Advocating for cross-functional excellence." },
    { legacy: "Watched", horizon: "Monitored", use: "Ensuring real-time quality assurance." },
    { legacy: "Gave", horizon: "Administered", use: "Managing resource allocation." },
    { legacy: "Finished", horizon: "Finalized", use: "Closing high-value contract lifecycles." },
    { legacy: "Showed", horizon: "Demonstrated", use: "Presenting proof-of-concept to leadership." },
    { legacy: "Met", horizon: "Collaborated", use: "Driving consensus across departments." },
    { legacy: "Kept", horizon: "Maintained", use: "Upholding operational continuity." },
    { legacy: "Followed", horizon: "Aligned", use: "Synchronizing projects with corporate goals." },
    { legacy: "Checked", horizon: "Audited", use: "Validating regulatory compliance." },
    { legacy: "Added", horizon: "Integrated", use: "Consolidating disparate data streams." },
    { legacy: "Asked", horizon: "Queried", use: "Extracting actionable intelligence." },
    { legacy: "Built", horizon: "engineered", use: "Constructing robust technical solutions." },
    { legacy: "Cleaned", horizon: "Refined", use: "Polishing user-facing deliverables." },
    { legacy: "Cut", horizon: "Reduced", use: "Mitigating unnecessary overhead." },
    { legacy: "Decided", horizon: "Determined", use: "Establishing strategic direction." },
    { legacy: "Explained", horizon: "Articulated", use: "Clarifying complex value propositions." },
    { legacy: "Found", horizon: "Identified", use: "Detecting market opportunities." },
    { legacy: "Guarded", horizon: "Secured", use: "Protecting proprietary assets." },
    { legacy: "Hired", horizon: "Recruited", use: "Acquiring top-tier talent." },
    { legacy: "Ideas", horizon: "Conceptualized", use: "Ideating next-generation products." },
    { legacy: "Joined", horizon: "Merged", use: "Unifying organizational silos." },
    { legacy: "Lowered", horizon: "Decreased", use: "Minimizing churn rates." },
    { legacy: "Moved", horizon: "Transitioned", use: "Migrating legacy systems to cloud." },
    { legacy: "Noticed", horizon: "Observed", use: "Analyzing user behavior patterns." },
    { legacy: "Opened", horizon: "Launched", use: "Deploying market-ready solutions." },
    { legacy: "Planned", horizon: "Strategized", use: "Mapping long-term growth trajectories." },
    { legacy: "Quiet", horizon: "Suppressed", use: "Neutralizing security vulnerabilities." },
    { legacy: "Ran", horizon: "Directed", use: "Governing large-scale operations." },
    { legacy: "Saved", horizon: "Conserved", use: "Preserving budgetary resources." },
    { legacy: "Tested", horizon: "Evaluated", use: "Benchmarking performance metrics." },
    { legacy: "Updated", horizon: "Modernized", use: "Refreshing outdated workflows." },
    { legacy: "Verified", horizon: "Validated", use: "Confirming data integrity." },
    { legacy: "Wrote", horizon: "Authored", use: "Producing technical documentation." },
    { legacy: "Yielded", horizon: "Generated", use: "Producing measurable ROI." },
    { legacy: "Zoned", horizon: "Segmented", use: "Targeting niche demographics." },
    { legacy: "Pointed", horizon: "Indicated", use: "Forecasting industry trends." },
    { legacy: "Simplified", horizon: "Streamlined", use: "Expediting delivery timelines." },
    { legacy: "Expanded", horizon: "Amplified", use: "Scaling operational capacity." }
];

const generateDynamicScripts = (vault) => {
    const targetRole = vault?.selectedPath?.domain || "[Target Role]";
    const salaryRange = vault?.selectedPath?.salary || "$[X] to $[Y]";
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Top Skill]";

    return {
        outreach: [
            { title: "Phase 1: Soft Curiosity", script: `Hi [Name], I've been following your team's growth in ${targetRole}. As I transition my experience in ${topSkill} toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?` },
            { title: "Phase 2: The Value-Add", script: `Hi [Name], I saw the recent news about [Company Project]. It reminded me of a challenge we solved regarding ${topSkill}. Thought this insight might be useful for your team's current trajectory. No reply needed, just wanted to share!` },
            { title: "Phase 3: Sponsorship Request", script: `Hi [Name], your insights have been instrumental. I'm currently architecting my move into ${targetRole} and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company].` },
            { title: "Phase 4: The Closing Loop", script: `Hi [Name], thank you again for the sync. I’ve applied for the ${targetRole} opening and mentioned our conversation regarding their focus on ${topSkill}. I'd value any internal perspective you're able to share with the hiring lead.` }
        ],
        salary: [
            { label: "The 'Anchor' Avoidance", script: `I am looking for a total compensation package that reflects the current market value for a ${targetRole} level of responsibility. Given my expertise in ${topSkill}, I am focusing on positions in the ${salaryRange} range. Does that align with your budget?` },
            { label: "The 'Total Rewards' Pivot", script: `I understand the base is fixed. Given my specialized background in ${topSkill}, can we discuss other levers such as a signing bonus or an accelerated performance review to align the total rewards with the seniority of this ${targetRole} position?` },
            { label: "The 'Equity/Bonus' Bridge", script: `If we can't meet the ${salaryRange} base today, I'm open to structured performance bonuses or an equity stake that triggers upon reaching [Specific KPI] within my first 6 months.` }
        ]
    };
};

const Contact = ({ vault, isAdmin }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // --- UPDATED TIER MAPPING ---
  const tiers = { 'traveler': 0, 'seedling': 1, 'hearthkeeper': 2, 'steward': 3 };
  const userRank = isAdmin ? 3 : (tiers[vault?.tier?.toLowerCase()] || 0);

  const dynamicContent = generateDynamicScripts(vault);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const trailKitResources = [
    { id: 'verbs', title: "Power Verb Lexicon", desc: "Strategic verbs to replace legacy language.", type: "Seedlings+", icon: <Zap className="text-purple-400" />, requiredTier: 1 },
    { id: 'ledger', title: "The Identity Ledger", desc: "Psychological framework & workbook to decouple worth.", type: "Hearthkeepers+", icon: <Fingerprint className="text-teal-400" />, requiredTier: 2 },
    { id: 'resume', title: "Trailblazer's Blueprint", desc: "ATS-optimized resume layout.", type: "Hearthkeepers+", icon: <FileText className="text-purple-400" />, requiredTier: 2 },
    { id: 'outreach', title: "Sponsorship Outreach", desc: "4-phase sequence to turn contacts into advocates.", type: "Stewards Only", icon: <Mail className="text-teal-400" />, requiredTier: 3 },
    { id: 'scripts', title: "Salary Negotiations", desc: "Tactical word-for-word scripts.", type: "Stewards Only", icon: <DollarSign className="text-purple-400" />, requiredTier: 3 }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-1 gap-4">
        {trailKitResources.map((tool) => {
          const isLocked = userRank < tool.requiredTier;
          const isOpen = expandedCard === tool.id && !isLocked;

          return (
            <div key={tool.id} className="flex flex-col group">
              <div 
                onClick={() => !isLocked && setExpandedCard(isOpen ? null : tool.id)}
                className={`relative bg-[#16121D] border transition-all duration-300 ${
                  isLocked ? 'opacity-40 cursor-not-allowed border-zinc-800' : 'cursor-pointer hover:border-teal-500/30 shadow-lg'
                } ${isOpen ? 'rounded-t-[2.5rem] border-teal-500/30' : 'rounded-[2.5rem] border-zinc-800'}`}
              >
                <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-teal-500/10 transition-colors">
                        {isLocked ? <Lock size={20} className="text-zinc-600" /> : tool.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isLocked ? 'bg-zinc-800 text-zinc-500' : 'bg-teal-500/10 text-teal-500'}`}>
                            {tool.type}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl text-white font-serif italic">{tool.title}</h3>
                      <p className="hidden md:block text-zinc-500 mt-1 max-w-md text-[11px] font-light italic leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                  {!isLocked && (
                    <div className="text-zinc-600 group-hover:text-white transition-colors">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#110E16] border-x border-b border-teal-500/30 rounded-b-[2.5rem]"
                  >
                    <div className="p-6 md:p-8 pt-0 space-y-6">
                      
                      {/* 1. POWER VERBS CONTENT */}
                      {tool.id === 'verbs' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 9)).map((v, i) => (
                                    <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-teal-500/20 transition-colors">
                                        <div className="text-[9px] text-zinc-600 line-through uppercase tracking-tighter mb-1">{v.legacy}</div>
                                        <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                        <div className="text-[10px] text-zinc-500 mt-2 italic opacity-70 leading-relaxed">"{v.use}"</div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowAllVerbs(!showAllVerbs); }} 
                                className="w-full py-4 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 hover:border-teal-500/30 transition-all"
                            >
                                {showAllVerbs ? "Collapse List" : "View Full Lexicon (50 Verbs)"}
                            </button>
                        </div>
                      )}

                      {/* 2. IDENTITY LEDGER CONTENT */}
                      {tool.id === 'ledger' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-teal-500/5 border border-teal-500/10 p-6 rounded-[2rem] flex flex-col justify-between">
                                <div>
                                    <h4 className="text-white font-serif italic text-lg mb-1">The Identity Ledger</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">Master Class Slide Deck</p>
                                </div>
                                <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=sharing")} className="w-full h-12 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Presentation size={14} /> Open Presentation
                                </button>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between">
                                <div>
                                    <h4 className="text-white font-serif italic text-lg mb-1">The Implementation Ledger</h4>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">Personal Workbook (PDF)</p>
                                </div>
                                <button onClick={() => window.open("https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=sharing")} className="w-full h-12 border border-zinc-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <ClipboardList size={14} /> Download Ledger
                                </button>
                            </div>
                        </div>
                      )}

                      {/* 3. RESUME BLUEPRINT CONTENT */}
                      {tool.id === 'resume' && (
                        <div className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-[2rem] text-center">
                            <p className="text-sm text-zinc-400 italic mb-6">An ATS-optimized template designed specifically for public-to-private sector pivots.</p>
                            <button onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/edit?usp=sharing")} className="px-10 h-14 bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-400 active:scale-95 transition-all inline-flex items-center gap-2 shadow-xl shadow-purple-500/20">
                                <ExternalLink size={14} /> Get Blueprint (Google Doc)
                            </button>
                        </div>
                      )}

                      {/* 4. SCRIPTS CONTENT (OUTREACH & SALARY) */}
                      {(tool.id === 'outreach' || tool.id === 'scripts') && (
                        <div className="space-y-4">
                          {(tool.id === 'outreach' ? dynamicContent.outreach : dynamicContent.salary).map((item, i) => {
                            const uniqueKey = `${tool.id}-${i}`;
                            return (
                                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl group/script relative">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="text-[10px] font-black uppercase text-teal-500 tracking-widest">{item.title || item.label}</h4>
                                        <button 
                                            onClick={() => handleCopy(item.script, uniqueKey)}
                                            className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"
                                        >
                                            {copiedIndex === uniqueKey ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                    <div className="font-mono text-[11px] text-zinc-300 italic select-all leading-relaxed whitespace-pre-wrap">
                                        "{item.script}"
                                    </div>
                                    {copiedIndex === uniqueKey && (
                                        <div className="absolute top-2 right-12 text-[8px] font-black uppercase text-teal-500 animate-in fade-in slide-in-from-right-2">
                                            Copied to Clipboard
                                        </div>
                                    )}
                                </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;