import React, { useState } from 'react';
import { 
  FileText, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, DollarSign, Download, Copy, Lock,
  Fingerprint, ClipboardList
} from 'lucide-react';

// --- DATA: POWER VERBS ---
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
    { legacy: "Used", horizon: "Leveraged", use: "Utilizing data-driven insights for growth." }
];

// --- LOGIC: SCRIPT GENERATOR (SYNCCED TO VAULT) ---
const generateDynamicScripts = (vault) => {
    const targetRole = vault?.selectedPath?.domain || "[Target Role]";
    const salaryRange = vault?.selectedPath?.salary || "$[X] to $[Y]";
    const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Your Top Skill]";

    return {
        salary: [
            { label: "The 'Anchor' Avoidance", script: `I am looking for a total compensation package that reflects the current market value for a ${targetRole} level of responsibility. Given my expertise in ${topSkill}, I am focusing on positions in the ${salaryRange} range. Does that align with your budget?` },
            { label: "The 'Total Rewards' Pivot", script: `I understand the base is fixed. Given my specialized background in ${topSkill}, can we discuss other levers such as a signing bonus or an accelerated performance review to align the total rewards with the seniority of this ${targetRole} position?` }
        ],
        outreach: [
            { id: 'p1', title: "Phase 1: Soft Curiosity", script: `Hi [Name], I've been following your team's growth in ${targetRole}. As I transition my experience in ${topSkill} toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?` },
            { id: 'p3', title: "Phase 3: Sponsorship Request", script: `Hi [Name], your insights have been instrumental. I'm currently architecting my move into ${targetRole} and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company].` }
        ]
    };
};

const Contact = ({ vault, isAdmin }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllVerbs, setShowAllVerbs] = useState(false);

  const tiers = { 'free': 0, 'seedling': 1, 'hearthkeeper': 2, 'steward': 3 };
  const userRank = tiers[vault?.tier?.toLowerCase()] || 0;
  
  // GOD MODE ACTIVE
  const godMode = true; 

  const dynamicContent = generateDynamicScripts(vault);

  // CORRECTED ORDER: Ledger -> Verbs -> Resume -> Outreach -> Scripts
  const trailKitResources = [
    { id: 'ledger', title: "The Identity Ledger", desc: "Decouple your worth from your legacy title.", type: "Stewards Only", icon: <Fingerprint className="text-teal-400" />, requiredTier: 3 },
    { id: 'verbs', title: "Power Verb Lexicon", desc: "Strategic verbs to replace legacy language.", type: "Seedlings+", icon: <Zap className="text-purple-400" />, requiredTier: 1 },
    { id: 'resume', title: "Trailblazer's Blueprint", desc: "ATS-optimized resume layout.", type: "Hearthkeepers+", icon: <FileText className="text-teal-400" />, requiredTier: 2 },
    { id: 'outreach', title: "Sponsorship Outreach", desc: "4-phase sequence to turn contacts into advocates.", type: "Stewards Only", icon: <Mail className="text-purple-400" />, requiredTier: 3 },
    { id: 'scripts', title: "Salary Negotiations", desc: "Tactical word-for-word scripts.", type: "Stewards Only", icon: <DollarSign className="text-teal-400" />, requiredTier: 3 }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {godMode && (
        <div className="mb-8 flex justify-center">
          <span className="px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[9px] font-black text-teal-400 uppercase tracking-widest italic">
            God Mode Active: All Archives Unlocked
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 mb-20">
        {trailKitResources.map((tool) => {
          const isLocked = !godMode && userRank < tool.requiredTier;
          const isOpen = expandedCard === tool.id && !isLocked;

          return (
            <div key={tool.id} className={`flex flex-col group ${isLocked ? 'opacity-50' : ''}`}>
              <div 
                onClick={() => !isLocked && setExpandedCard(isOpen ? null : tool.id)}
                className={`relative bg-[#16121D] border transition-all duration-300 ${
                  isLocked ? 'cursor-not-allowed border-zinc-800' : 'cursor-pointer hover:border-teal-500/30 shadow-lg'
                } ${isOpen ? 'rounded-t-[2.5rem] border-teal-500/30' : 'rounded-[2.5rem] border-zinc-800'}`}
              >
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-teal-500/10 transition-colors">
                        {isLocked ? <Lock size={20} className="text-zinc-600" /> : tool.icon}
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-zinc-800/50 text-zinc-500 mb-2">
                          {isLocked ? "Upgrade Required" : tool.type}
                      </span>
                      <h3 className="text-xl text-white font-serif italic font-black">{tool.title}</h3>
                      <p className="text-zinc-500 mt-1 max-w-md text-[11px] font-light italic leading-relaxed">{tool.desc}</p>
                    </div>
                  </div>
                  {!isLocked && <div className="text-zinc-600 group-hover:text-white transition-colors">{isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</div>}
                </div>
              </div>

              {isOpen && (
                <div className="bg-[#110E16] border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-2">
                  
                  {/* 1. IDENTITY LEDGER */}
                  {tool.id === 'ledger' && (
                    <div className="bg-teal-500/5 border border-teal-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1">
                            <h4 className="text-lg text-white font-serif italic mb-2">Internal Re-Alignment Worksheet</h4>
                            <p className="text-[11px] text-zinc-500 italic mb-6">A digital workbook designed to translate public service achievements into private sector value propositions.</p>
                            <button onClick={() => window.open("https://docs.google.com/document/d/1Zt-f6O0vY-MreC9_Kq7-8vY6D6L0vK-O/copy")} className="w-full md:w-auto px-10 h-14 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
                                <ClipboardList size={14} /> Claim My Ledger
                            </button>
                        </div>
                    </div>
                  )}

                  {/* 2. VERBS */}
                  {tool.id === 'verbs' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(showAllVerbs ? powerVerbs : powerVerbs.slice(0, 6)).map((v, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-xl">
                                    <div className="text-[10px] text-zinc-600 line-through uppercase tracking-tighter">{v.legacy}</div>
                                    <div className="text-lg font-serif italic text-teal-400">{v.horizon}</div>
                                    <div className="text-[9px] text-zinc-500 mt-2 font-mono italic opacity-60">"{v.use}"</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowAllVerbs(!showAllVerbs)} className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-all">
                            {showAllVerbs ? "Collapse List" : "View Full Lexicon (50+ Verbs)"}
                        </button>
                    </div>
                  )}

                  {/* 3. RESUME */}
                  {tool.id === 'resume' && (
                    <div className="bg-purple-500/5 border border-purple-500/20 p-6 rounded-3xl flex flex-col sm:flex-row gap-4">
                        <button onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy")} className="flex-1 bg-purple-500 text-white px-8 h-14 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
                            <ExternalLink size={14} /> Open Google Doc
                        </button>
                        <button onClick={() => window.open("https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/export?format=docx")} className="flex-1 border border-purple-500/30 text-purple-400 px-8 h-14 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2">
                            <Download size={14} /> Download .DOCX
                        </button>
                    </div>
                  )}

                  {/* 4. SCRIPTS (SYNCED) */}
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