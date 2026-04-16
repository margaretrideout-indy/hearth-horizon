import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronRight, 
  ChevronDown, ChevronUp, Zap, ShieldCheck,
  Mail, ExternalLink, Save, Lock, Crown, Info,
  Clock, Landmark, Target, HeartHandshake, TrendingUp
} from 'lucide-react';

const Contact = ({ vault, isAdmin: propIsAdmin }) => {
  const [openScriptId, setOpenScriptId] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openPhaseId, setOpenPhaseId] = useState(null);

  const devOverride = true; 
  const isAdmin = propIsAdmin || devOverride;
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const trailKitProvisions = [
    {
      id: 'verbs',
      title: "The Power Verb Lexicon",
      desc: "The 'Flip' dictionary. 50+ corporate verbs to replace legacy educational language.",
      type: "Interactive Glossary",
      tier: "Seedling",
      icon: <Zap className="text-purple-400" />,
      action: "Open Lexicon",
      isAccordion: true,
      allowed: true 
    },
    {
      id: 'market',
      title: "Canadian Market Primer",
      desc: "Vital 'translation' for the Canadian private sector—from benefits to credentialing.",
      type: "Interactive Guide",
      tier: "Seedling",
      icon: <Map className="text-teal-400" />,
      action: "Read Primer",
      isAccordion: true,
      allowed: true
    },
    {
      id: 'resume',
      title: "The Horizon Resume Template",
      desc: "A clean, ATS-optimized layout. Click to create your own private, editable copy.",
      type: "Digital Blueprint",
      tier: "Hearthkeeper",
      icon: <FileText className="text-purple-400" />,
      action: "Create My Copy",
      url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy",
      allowed: isHearthkeeper
    },
    {
      id: 'scripts',
      title: "Salary Negotiation Scripts",
      desc: "Interactive word-for-word scripts for the 'expectations' talk and counter-offers.",
      type: "Interactive Tool",
      tier: "Steward",
      icon: <MessageSquare className="text-teal-400" />,
      action: "View Scripts",
      isAccordion: true,
      allowed: isSteward
    },
    {
        id: 'outreach',
        title: "Sponsorship Outreach",
        desc: "The 4-phase sequence for turning cold contacts into professional advocates.",
        type: "Communication Sequence",
        tier: "Steward",
        icon: <Mail className="text-purple-400" />,
        action: "View Protocols",
        isAccordion: true,
        allowed: isSteward
    }
  ];

  const negotiationScripts = [
    { 
        id: 'anchor', 
        situation: "The Early Inquiry (The Anchor)", 
        context: "A recruiter asks: 'What are your salary expectations?' before an offer is made.", 
        script: "I'm looking for a total compensation package in the range of $[X] to $[Y]. However, my main priority is finding the right cultural fit, and I'm open to discussing the full range of benefits—including performance bonuses and professional development—once we've determined I'm the right match for the team." 
    },
    { 
        id: 'pivot', 
        situation: "The 'Experience' Pivot", 
        context: "They offer a lower number because they view you as 'transitioning' or 'new' to the sector.", 
        script: "While I am transitioning industries, I am not an entry-level professional. I bring 13 years of high-stakes program management and curriculum design, which directly translates to [Specific Job Goal]. I'm looking for a base salary that reflects that seniority. Can we move the offer to $[Target]?" 
    },
    { 
        id: 'pension', 
        situation: "The Pension Offset", 
        context: "When moving from a high-value public pension to a private RRSP model.", 
        script: "In my previous sector, my total compensation included a significant pension contribution. To maintain financial neutrality and match the market rate for this role, I’m looking for $[Amount] to account for the shift in retirement benefit structures." 
    }
  ];

  const outreachPhases = [
    {
        id: 'p1',
        title: "Phase 1: The 'Soft' Curiosity",
        goal: "Low stakes engagement. No ask, just visibility.",
        script: "Subject: Insight on [Company Name]'s approach to [Topic]\n\nHi [Name], I've been following your team's work on [Project] and was particularly struck by how you handled [Detail]. As someone coming from a heavy curriculum development background, I’d love to know—do you find that [Topic] is a major focus for your team this quarter?"
    },
    {
        id: 'p2',
        title: "Phase 2: The Value Exchange",
        goal: "Offer a perspective based on your 'Teacher-to-Tech' flip.",
        script: "Hi [Name], following up on our last note—I actually just finished a project on [Related Topic] and thought this resource might be useful for your team's current initiative. No response needed, just wanted to share!"
    },
    {
        id: 'p3',
        title: "Phase 3: The Request for Sponsorship",
        goal: "Asking for a 15-minute 'Bridge' call.",
        script: "Hi [Name], I'm currently architecting my transition into [Industry] and deeply admire your path. Would you be open to a 15-minute 'Bridge' call next Tuesday? I’m specifically looking for your perspective on how [Company] values [Your Skillset]—I'd love to learn from your expertise."
    },
    {
        id: 'p4',
        title: "Phase 4: The Closing Circle",
        goal: "The 'Thank You' that keeps the door open for referrals.",
        script: "Thank you for the time today, [Name]. Your insight on [Topic] was a game-changer for my strategy. If you happen to hear of any roles where a 'safe and contextually accurate' language expert is needed, I’d be honored if you kept me in mind."
    }
  ];

  const handleCardClick = (tool) => {
    if (!tool.allowed) return; 
    if (tool.isAccordion) {
      setExpandedCard(expandedCard === tool.id ? null : tool.id);
    } else if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  const Badge = ({ children, className }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <section className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">The Trail Kit</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {trailKitProvisions.map((tool) => (
            <div key={tool.id} className="flex flex-col gap-0 group">
              <div 
                onClick={() => handleCardClick(tool)}
                className={`relative bg-[#110E16] border p-8 transition-all duration-300 overflow-hidden shadow-xl ${
                  !tool.allowed ? 'opacity-40 cursor-not-allowed border-zinc-900' :
                  expandedCard === tool.id 
                    ? 'rounded-t-[2.5rem] border-teal-500/30 bg-teal-500/[0.02] cursor-pointer' 
                    : 'rounded-[2.5rem] border-zinc-800/50 hover:border-purple-500/30 cursor-pointer'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-transform group-hover:scale-105">
                      {tool.allowed ? tool.icon : <Lock className="text-zinc-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-zinc-800/50 text-zinc-500">{tool.type}</Badge>
                        {!tool.allowed && <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/10 flex gap-1"><Crown size={10}/> {tool.tier}</Badge>}
                      </div>
                      <h3 className="text-xl font-serif italic font-black text-white group-hover:text-teal-400 transition-colors">{tool.title}</h3>
                      <p className="text-zinc-400 mt-1 max-w-md text-xs font-light italic">{tool.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                    {tool.allowed ? tool.action : `Locked: ${tool.tier} Standing`}
                    {tool.isAccordion ? (expandedCard === tool.id ? <ChevronUp size={14} className="text-teal-400" /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                  </div>
                </div>
              </div>

              {expandedCard === tool.id && tool.isAccordion && tool.allowed && (
                <div className="bg-[#110E16]/50 border-x border-b border-teal-500/30 rounded-b-[2.5rem] p-8 pt-4 animate-in slide-in-from-top-4">
                  <div className="h-[1px] bg-white/5 mb-8 w-full" />
                  
                  {tool.id === 'scripts' && (
                    <div className="space-y-4">
                      {negotiationScripts.map((item) => (
                        <div key={item.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden transition-all">
                          <button onClick={() => setOpenScriptId(openScriptId === item.id ? null : item.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left text-[10px] font-black uppercase tracking-widest text-white">
                            {item.situation}
                            {openScriptId === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          {openScriptId === item.id && (
                            <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                              <p className="text-[9px] font-black uppercase tracking-widest text-teal-500 mt-6 mb-2 italic">The Strategy:</p>
                              <p className="text-zinc-400 mb-4 italic text-xs font-light">{item.context}</p>
                              <div className="bg-[#16121D] p-5 rounded-xl border border-teal-500/20 text-zinc-200 font-mono text-xs leading-relaxed italic relative">
                                "{item.script}"
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {tool.id === 'outreach' && (
                    <div className="space-y-4">
                        {outreachPhases.map((phase) => (
                            <div key={phase.id} className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)} className="w-full p-5 flex items-center justify-between hover:bg-white/5 transition-colors text-left">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{phase.title}</span>
                                        <span className="text-[9px] text-zinc-500 italic mt-1 font-light">{phase.goal}</span>
                                    </div>
                                    {openPhaseId === phase.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                {openPhaseId === phase.id && (
                                    <div className="p-6 pt-0 border-t border-white/5 bg-black/20 font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap italic">
                                        {phase.script}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                  )}

                  {/* Other sections remain the same (Verbs, Market) */}
                  {tool.id === 'verbs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {powerVerbs.map((verb, idx) => (
                        <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col hover:border-purple-500/30 transition-all group/verb">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-zinc-600 line-through uppercase tracking-tighter">{verb.legacy}</span>
                            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/10 text-[8px]">FLIP</Badge>
                          </div>
                          <div className="text-lg font-serif italic font-black text-teal-400 mb-2 group-hover/verb:text-white transition-colors">{verb.horizon}</div>
                          <p className="text-[10px] text-zinc-500 leading-tight italic font-light">{verb.use}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;