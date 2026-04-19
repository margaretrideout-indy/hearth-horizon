import React, { useState } from 'react';
import { 
  FileText, ChevronDown, Zap, 
  Mail, ExternalLink, DollarSign, Download, Copy, Lock,
  Fingerprint, ClipboardList, Presentation, Check,
  Sword, Shield, BookOpen
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
    const salaryRange = vault?.selectedPath?.salary || "[Market Range]";
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Core Expertise]";

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

const Contact = ({ vault, isAdmin, isSeedlingPlus }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // --- ACCESS LOGIC OVERRIDE ---
  const normalizedTier = vault?.tier?.toLowerCase() || 'none';
  
  // SEEDLING CONTENT (LEXICON) IS ALWAYS UNLOCKED
  const canAccessVerbs = true; 
  
  // FIXED HIGH TIER LOGIC: If isAdmin is true, this is ALWAYS true.
  const canAccessHighTier = isAdmin || ['hearthkeeper', 'steward', 'founding steward', 'admin'].includes(normalizedTier);

  const dynamicContent = generateDynamicScripts(vault);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const trailKitResources = [
    { id: 'verbs', title: "Power Verb Lexicon", desc: "Strategic verbs to replace legacy language.", type: "Public Access", icon: <Zap className="text-teal-400" />, isUnlocked: canAccessVerbs },
    { id: 'ledger', title: "The Identity Ledger", desc: "Workbook & Deck to decouple your worth.", type: "Hearthkeepers+", icon: <Fingerprint className="text-teal-400" />, isUnlocked: canAccessHighTier },
    { id: 'resume', title: "Trailblazer's Blueprint", desc: "ATS-optimized resume layout.", type: "Hearthkeepers+", icon: <FileText className="text-purple-400" />, isUnlocked: canAccessHighTier },
    { id: 'outreach', title: "Sponsorship Outreach", desc: "Turn contacts into advocates.", type: "Stewards Only", icon: <Mail className="text-teal-400" />, isUnlocked: canAccessHighTier },
    { id: 'scripts', title: "Salary Negotiations", desc: "Tactical word-for-word scripts.", type: "Stewards Only", icon: <DollarSign className="text-purple-400" />, isUnlocked: canAccessHighTier }
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-32 px-4 md:px-0 max-w-4xl mx-auto">
      
      <header className="mb-16 border-b border-white/5 pb-16 pt-8">
        <div className="flex items-center gap-4 mb-6">
          <Sword size={16} className="text-teal-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-500/70 italic">
            Volume II: Tactical Arsenal
          </span>
          {isAdmin && (
             <span className="text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
               Founder Access
             </span>
          )}
        </div>
        <h2 className="text-5xl md:text-7xl text-white font-serif italic mb-6 tracking-tighter">
          The Trail <span className="text-zinc-800 font-sans not-italic font-extralight uppercase">Kit</span>
        </h2>
        <p className="max-w-xl text-zinc-500 text-sm leading-relaxed font-light italic border-l border-teal-500/20 pl-6">
          Strategic assets for the transition. From shifting your lexicon to 
          securing your market value—these are the tools for planting new roots in foreign soil.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {trailKitResources.map((tool, idx) => {
          
          const isOpen = expandedCard === tool.id && tool.isUnlocked;
          const isLocked = !tool.isUnlocked;

          return (
            <motion.div 
              key={tool.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group"
            >
              <button 
                onClick={() => !isLocked && setExpandedCard(isOpen ? null : tool.id)}
                disabled={isLocked}
                className={`relative w-full text-left bg-[#16121D]/40 backdrop-blur-sm border transition-all duration-500 ${
                  isLocked ? 'opacity-40 cursor-not-allowed border-white/5' : 'cursor-pointer hover:border-teal-500/30'
                } ${isOpen ? 'rounded-t-[2.5rem] border-teal-500/40 bg-[#1C1622]' : 'rounded-[2.5rem] border-white/5'}`}
              >
                <div className="p-8 md:p-10 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-8">
                    <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-black/40 border border-white/10 group-hover:border-teal-500/30 transition-all overflow-hidden relative">
                        {isLocked ? (
                          <Lock size={20} className="text-zinc-700" />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {tool.icon}
                          </>
                        )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${isLocked ? 'border-zinc-800 text-zinc-700' : 'border-teal-500/20 text-teal-500/60'}`}>
                            {tool.type}
                        </span>
                        {isLocked && <Lock size={10} className="text-zinc-800" />}
                      </div>
                      <h3 className="text-xl md:text-2xl text-white font-serif italic tracking-tight">{tool.title}</h3>
                    </div>
                  </div>
                  {!isLocked && (
                    <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-teal-500' : 'text-zinc-700 group-hover:text-white'}`}>
                      <ChevronDown size={24} strokeWidth={1} />
                    </div>
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#1C1622] border-x border-b border-teal-500/40 rounded-b-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div className="p-8 md:p-12 pt-4 space-y-10">
                      
                      {tool.id === 'verbs' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 9)).map((v, i) => (
                                    <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-teal-500/20 transition-all group/verb">
                                        <div className="text-[9px] text-zinc-700 line-through uppercase tracking-widest mb-2 group-hover:text-zinc-500 transition-colors">{v.legacy}</div>
                                        <div className="text-2xl font-serif italic text-teal-400 mb-4 tracking-tighter">{v.horizon}</div>
                                        <div className="text-[10px] text-zinc-500 italic opacity-80 leading-relaxed border-t border-white/5 pt-4">"{v.use}"</div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowAllVerbs(!showAllVerbs); }} 
                                className="w-full h-16 border border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-teal-400 hover:border-teal-500/30 transition-all"
                            >
                                {showAllVerbs ? "Collapse Lexicon" : "Reveal Full Lexicon (50 Verbs)"}
                            </button>
                        </div>
                      )}

                      {tool.id === 'ledger' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <a href="https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="group/btn bg-black/40 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-teal-500/40 transition-all">
                                <div className="mb-10">
                                    <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-500 mb-6"><Presentation size={20} /></div>
                                    <h4 className="text-white font-serif italic text-xl mb-2 tracking-tight">The Identity Ledger</h4>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Master Class Slide Deck</p>
                                </div>
                                <div className="w-full h-14 bg-teal-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3">Open Presentation <ExternalLink size={14} /></div>
                            </a>
                            <a href="https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="group/btn bg-black/40 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-white/20 transition-all">
                                <div className="mb-10">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 mb-6"><ClipboardList size={20} /></div>
                                    <h4 className="text-white font-serif italic text-xl mb-2 tracking-tight">Implementation Guide</h4>
                                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Personal Workbook (PDF)</p>
                                </div>
                                <div className="w-full h-14 border border-zinc-800 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3"><Download size={14} /> Download Ledger</div>
                            </a>
                        </div>
                      )}

                      {tool.id === 'resume' && (
                        <div className="bg-black/40 border border-white/5 p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 blur-[100px]" />
                            <a href="https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 px-12 h-16 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-500 transition-all relative z-10"><FileText size={16} /> Secure Blueprint</a>
                        </div>
                      )}

                      {(tool.id === 'outreach' || tool.id === 'scripts') && (
                        <div className="space-y-4">
                          {(tool.id === 'outreach' ? dynamicContent.outreach : dynamicContent.salary).map((item, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-8 rounded-[2.5rem] group/script relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                          <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{item.title || item.label}</h4>
                                        </div>
                                        <button onClick={() => handleCopy(item.script, `${tool.id}-${i}`)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-600 hover:text-teal-400 transition-all">{copiedIndex === `${tool.id}-${i}` ? <Check size={18} className="text-teal-500" /> : <Copy size={18} />}</button>
                                    </div>
                                    <div className="font-mono text-[13px] text-zinc-400 italic leading-relaxed pl-6 border-l border-teal-500/20 py-2">"{item.script}"</div>
                                </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Contact;