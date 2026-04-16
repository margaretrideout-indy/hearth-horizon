import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Compass, DollarSign, FileDown, BookOpen, Sparkles
} from 'lucide-react';

// --- GENERALIZED DATA FOR ALL USERS ---

const powerVerbs = [
    { legacy: "Taught", horizon: "Facilitated", use: "Standardizing delivery for stakeholders." },
    { legacy: "Improved", horizon: "Optimized", use: "Refining workflows for maximum efficiency." },
    { legacy: "Managed", horizon: "Spearheaded", use: "Leading high-stakes initiatives." },
    { legacy: "Talked to", horizon: "Consulted", use: "Providing expert advisory to cross-functional teams." },
    { legacy: "Organized", horizon: "Orchestrated", use: "Handling complex, multi-layered logistics." },
    { legacy: "Fixed", horizon: "Remediated", use: "Identifying and resolving systemic bottlenecks." }
];

const salaryScripts = [
    { 
        label: "The 'Anchor' Avoidance", 
        context: "When a recruiter asks for your current salary. Use this to pivot to market value.",
        script: "I am looking for a total compensation package that reflects the current market value for this role's level of responsibility. Given my [X] years of expertise in [Field] and [Specific Skillset], I am focusing on positions in the $[X] to $[Y] range. Does that align with the budget for this hire?" 
    },
    { 
        label: "The 'Total Rewards' Pivot", 
        context: "When the base salary is firm but you need to increase the overall value.",
        script: "I understand the base is fixed at $[X]. Given my specialized background in [Target Skill], can we discuss other levers such as a signing bonus, an accelerated performance review at 6 months, or [Benefit/PTO] to align the total rewards with my seniority?" 
    },
    { 
        label: "The 'Competing Offer' Closer", 
        context: "Using external leverage to finalize with your preferred company.",
        script: "I’ve received another competitive offer that is very strong on the base salary. However, [Company Name] remains my first choice. If we can get the base to $[Target Number], I’m prepared to sign the offer today and withdraw from all other processes immediately." 
    }
];

const outreachPhases = [
    { id: 'p1', title: "Phase 1: Soft Curiosity", goal: "LOW STAKES ENGAGEMENT", script: "Subject: Question from a fellow [Current Sector] lead\n\nHi [Name], I've been following [Company]'s growth in [Specific Area]. As I transition my experience in [Current Function] toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?" },
    { id: 'p2', title: "Phase 2: Value Exchange", goal: "OFFER PERSPECTIVE", script: "Hi [Name], following up on our exchange—I actually just drafted a brief analysis on [Topic] regarding that 'unwritten' skill we discussed. I thought your team might find a fresh perspective on this useful. Here’s the link (no gates). Hope it adds value!" },
    { id: 'p3', title: "Phase 3: Sponsorship Request", goal: "15-MINUTE CALL", script: "Hi [Name], your insights have been instrumental in how I'm framing my transition. I'm currently architecting my move into [Target Role] and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company]. Does [Day/Time] work?" },
    { id: 'p4', title: "Phase 4: The Stealth Referral", goal: "CLOSING THE CIRCLE", script: "Thank you for the talk, [Name]. Based on our discussion, it's clear my background in [Skill A] and [Skill B] solves a few of the bottlenecks we touched on. If you're comfortable, I'd love to stay on your radar for any upcoming roles. I've attached my resume for your records." }
];

const trailKitProvisions = [
  { id: 'verbs', title: "The Power Verb Lexicon", desc: "Strategic verbs to replace legacy public-sector language.", type: "Interactive Glossary", icon: <Zap className="text-purple-400" />, isAccordion: true },
  { id: 'market', title: "Canadian Market Primer", desc: "The 'How-To' guide for sector translation and the Horizon Workshop.", type: "Interactive Guide", icon: <Map className="text-teal-400" />, isAccordion: true },
  { id: 'resume', title: "The Horizon Resume Template", desc: "Clean, ATS-optimized layout for private sector applications.", type: "Digital Blueprint", icon: <FileText className="text-purple-400" />, url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy" },
  { id: 'scripts', title: "Salary Negotiation Scripts", desc: "Tactical word-for-word scripts for high-stakes compensation talks.", type: "Interactive Tool", icon: <MessageSquare className="text-teal-400" />, isAccordion: true },
  { id: 'outreach', title: "Sponsorship Outreach", desc: "4-phase sequence to turn cold contacts into advocates.", type: "Communication Sequence", icon: <Mail className="text-purple-400" />, isAccordion: true }
];

const basecampProvisions = [
    { id: 'welcome', title: "The Founding Member Guide", desc: "Mission overview for Hearth & Horizon Stewards.", type: "Welcome Kit", icon: <BookOpen className="text-teal-400" /> },
    { id: 'intro', title: "Public-to-Private 101", desc: "Overview of the psychological shift for a successful pivot.", type: "Mindset Workshop", icon: <Sparkles className="text-purple-400" /> }
];

const Contact = () => {
  const [currentVolume, setCurrentVolume] = useState(2);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  const activeResources = currentVolume === 1 ? basecampProvisions : trailKitProvisions;

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="mb-16 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-400 mb-4">The Library Archives</h2>
        <h1 className="text-4xl md:text-5xl font-serif italic font-black text-white mb-6">
            {currentVolume === 1 ? "Volume I: Basecamp" : "Volume II: Trail Kit"}
        </h1>
      </div>

      {/* RESOURCE GRID */}
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
                    {tool.action}
                    {isOpen ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4">
                  
                  {/* LEXICON SECTION */}
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
                        <button className="w-full py-4 border border-dashed border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 hover:border-teal-400/30 transition-all">
                            View Full List (50+ Verbs)
                        </button>
                    </div>
                  )}

                  {/* MARKET PRIMER WITH FIXED PDF LINK */}
                  {tool.id === 'market' && (
                    <div className="bg-teal-500/5 border border-teal-500/20 p-8 rounded-[2rem]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-2">Horizon Workshop</h4>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit", "_blank")} className="bg-teal-500 text-black px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition-colors">Launch Slide Deck</button>
                            <button onClick={() => window.open("https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link", "_blank")} className="flex items-center justify-center gap-2 border border-teal-500/30 px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500/10 transition-colors">
                                <FileDown size={14} /> Download PDF Worksheet
                            </button>
                        </div>
                    </div>
                  )}

                  {/* NEGOTIATION SCRIPTS - GENERALIZED */}
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                        {salaryScripts.map((s, i) => (
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

                  {/* OUTREACH SEQUENCE - GENERALIZED */}
                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {outreachPhases.map((phase) => (
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
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PERSISTENT VOLUME TOGGLE */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">Navigate the Archives</h4>
        <div className="flex p-1.5 bg-[#110E16] border border-zinc-800/50 rounded-full">
          <button 
            onClick={() => {setCurrentVolume(1); setExpandedCard(null);}} 
            className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? "bg-teal-500 text-black shadow-lg shadow-teal-500/20" : "text-zinc-500 hover:text-white"}`}
          >
            Volume I: Basecamp
          </button>
          <button 
            onClick={() => {setCurrentVolume(2); setExpandedCard(null);}} 
            className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? "bg-teal-500 text-black shadow-lg shadow-teal-500/20" : "text-zinc-500 hover:text-white"}`}
          >
            Volume II: Trail Kit
          </button>
        </div>
      </div>

    </div>
  );
};

export default Contact;