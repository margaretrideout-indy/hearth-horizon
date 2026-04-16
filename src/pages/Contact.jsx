import React, { useState } from 'react';
import { 
  FileText, MessageSquare, Map, ChevronDown, ChevronUp, Zap, 
  Mail, ExternalLink, Lock, Crown, Compass, Target, FileDown
} from 'lucide-react';

// Definitions for the data mapping
const trailKitProvisions = [
  { id: 'verbs', title: "The Power Verb Lexicon", tier: "Seedling", icon: <Zap className="text-purple-400" />, action: "Open Lexicon", isAccordion: true },
  { id: 'market', title: "Canadian Market Primer", tier: "Seedling", icon: <Map className="text-teal-400" />, action: "Read Primer", isAccordion: true },
  { id: 'resume', title: "The Horizon Resume Template", tier: "Hearthkeeper", icon: <FileText className="text-purple-400" />, action: "Create My Copy", url: "https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/copy" },
  { id: 'scripts', title: "Salary Negotiation Scripts", tier: "Steward", icon: <MessageSquare className="text-teal-400" />, action: "View Scripts", isAccordion: true },
  { id: 'outreach', title: "Sponsorship Outreach", tier: "Steward", icon: <Mail className="text-purple-400" />, action: "View Protocols", isAccordion: true }
];

const Contact = ({ vault, isAdmin }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  // LOGIC: These MUST match the parent's logic exactly
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const checkAccess = (id) => {
    if (id === 'verbs' || id === 'market') return true;
    if (id === 'resume') return isHearthkeeper;
    if (id === 'scripts' || id === 'outreach') return isSteward;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 px-4">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/80">Active Provisions</h3>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {trailKitProvisions.map((tool) => {
          const isAllowed = checkAccess(tool.id);
          
          return (
            <div key={tool.id} className="flex flex-col">
              <div 
                onClick={() => isAllowed && tool.isAccordion ? setExpandedCard(expandedCard === tool.id ? null : tool.id) : isAllowed && tool.url && window.open(tool.url, '_blank')}
                className={`relative bg-[#110E16] border p-8 rounded-[2.5rem] transition-all duration-300 ${
                  !isAllowed ? 'opacity-40 cursor-not-allowed border-zinc-900' : 'border-zinc-800/50 hover:border-teal-500/30 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5">{isAllowed ? tool.icon : <Lock className="text-zinc-600" />}</div>
                    <div>
                        <div className="flex gap-2 mb-1">
                            {!isAllowed && <span className="text-[8px] font-black uppercase bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full flex items-center gap-1"><Crown size={8}/> {tool.tier}</span>}
                        </div>
                        <h3 className="text-xl font-serif italic text-white">{tool.title}</h3>
                    </div>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    {isAllowed ? tool.action : `Requires ${tool.tier}`}
                    {tool.isAccordion ? (expandedCard === tool.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : <ExternalLink size={14} />}
                  </div>
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {expandedCard === tool.id && isAllowed && (
                <div className="p-8 bg-black/20 border-x border-b border-teal-500/20 rounded-b-[2.5rem] -mt-6 pt-10 animate-in slide-in-from-top-4">
                  {tool.id === 'market' && (
                    <div className="space-y-6">
                      <div className="p-8 bg-teal-500/5 border border-teal-500/20 rounded-3xl">
                        <h4 className="text-white font-serif italic mb-4">Horizon Strategy Deck</h4>
                        <button onClick={() => window.open("https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit", "_blank")} className="px-6 py-3 bg-teal-500 text-black font-black uppercase text-[10px] rounded-xl">Open Blueprint</button>
                      </div>
                    </div>
                  )}
                  {tool.id === 'verbs' && <p className="text-zinc-400 italic text-sm">Lexicon loading...</p>}
                  {/* ... other content pieces ... */}
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