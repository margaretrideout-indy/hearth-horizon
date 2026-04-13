import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag,
  Wind, Lock, Mountain, MessageSquare, Sparkles,
  Zap, Compass, Layers, HeartPulse, Search, PlusCircle, Copy, Check
} from 'lucide-react';

const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";

const DICTIONARY_DATA = [
  { sector: "Education", old: "Classroom Management", root: "Stakeholder Dynamics", new: "Conflict Resolution & Operational Flow" },
  { sector: "Education", old: "IEP Development", root: "Strategic Roadmap", new: "Specification Mapping" },
  { sector: "Healthcare", old: "Patient Triage", root: "Resource Prioritization", new: "Throughput Optimization" },
  { sector: "Healthcare", old: "Bedside Manner", root: "High-Stakes Communication", new: "Client Relations Management" },
  { sector: "Service", old: "Shift Scheduling", root: "Logistics", new: "Workforce Deployment" },
  { sector: "Service", old: "Inventory Management", root: "Supply Chain", new: "Asset Lifecycle Oversight" },
  { sector: "Public Sector", old: "Grant Writing", root: "Technical Storytelling", new: "Proposal Architecture" },
  { sector: "Public Sector", old: "Policy Adherence", root: "Governance", new: "Regulatory Compliance & Risk" },
];

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors ${className}`}>
    {children}
  </span>
);

const Library = ({ vault }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [copied, setCopied] = useState(false);

  // Mad Libs State (Steward Only)
  const [ml, setMl] = useState({
    recipient: "",
    originSector: "",
    targetIndustry: "",
    reframedSkill: ""
  });
  
  const userTier = vault?.tier || 'Seedling';
  const isHearthkeeper = userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = userTier === 'Steward';

  const openDeck = () => {
    window.open(STRATEGY_DECK_URL, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    const fullScript = `Hello ${ml.recipient || "[Name]"}, I’m currently transitioning from a decade in ${ml.originSector || "[Sector]"} into the ${ml.targetIndustry || "[Industry]"} space. My core expertise lies in ${ml.reframedSkill || "[Skill]"}—a skill set increasingly critical for teams like yours. Would you be open to a 15-minute virtual coffee?`;
    navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = DICTIONARY_DATA.filter(item => {
    const matchesSearch = item.old.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.new.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === "All" || item.sector === activeSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 p-4 sm:p-6 md:p-12 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight leading-none">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-zinc-500 font-light italic uppercase tracking-wider">
              Curated tools and blueprints for the intentional professional migration.
            </p>
          </div>

          <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-zinc-800 bg-[#110E16]/60 backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isSteward ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`} />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Current Standing</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{userTier}</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: THE STUDY */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group flex flex-col">
              <Book className="w-8 h-8 text-purple-400 mb-6" />
              <h4 className="text-lg text-white font-serif italic mb-3">Indigo.ca Curated List</h4>
              <p className="text-[11px] text-zinc-500 italic mb-8 font-light leading-relaxed">Pivotal literature on career migration and psychological resilience.</p>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white">
                SHOP CURATED LIST <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>

            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all group flex flex-col">
              <Package className="w-8 h-8 text-purple-400 mb-6" />
              <h4 className="text-lg text-white font-serif italic mb-2">Amazon Essentials</h4>
              <p className="text-[9px] text-zinc-600 font-medium uppercase tracking-tighter mb-4 italic">As an Amazon Associate I earn from qualifying purchases.</p>
              <p className="text-[11px] text-zinc-500 italic mb-8 font-light leading-relaxed">Grounding tools and ergonomic gear for your new workspace.</p>
              <a href="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE CANOPY HUB */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Canopy Hub</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#110E16] to-[#0A080D] border border-teal-500/30 p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-teal-500/5 group-hover:text-teal-500/10 transition-colors pointer-events-none">
                <Mountain size={180} />
              </div>
              <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 italic mb-6 w-fit">Foundational Gift</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Master Strategy Deck</h4>
              <p className="text-[11px] text-zinc-500 font-light italic leading-relaxed mb-10">The primary map for your transition and resignation protocol.</p>
              <button onClick={openDeck} className="mt-auto h-14 bg-teal-500 hover:bg-teal-400 text-[#0A080D] font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] text-[9px]">
                Open Blueprint <ExternalLink size={14} />
              </button>
            </div>

            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all flex flex-col">
              {!isHearthkeeper && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-5 h-5 text-teal-500/40 mb-3" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500/60 mb-5">Hearthkeeper Required</p>
                  <button onClick={() => navigate('/grove')} className="px-6 py-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-teal-400">Upgrade Standing</button>
                </div>
              )}
              <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-6 w-fit italic tracking-tighter">Tactical Provisions</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Hearthkeeper Tools</h4>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-teal-500/10 transition-all cursor-pointer" onClick={() => document.getElementById('dictionary').scrollIntoView({behavior: 'smooth'})}>
                  <Layers size={14} className="text-teal-500/50" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Identity Reframing Engine</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-teal-500/10 transition-all cursor-not-allowed opacity-50">
                  <MessageSquare size={14} className="text-teal-500/50" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Outreach Templates</span>
                </div>
              </div>
            </div>

            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] relative group hover:border-purple-500/30 transition-all flex flex-col">
              {!isSteward && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-5 h-5 text-purple-500/40 mb-3" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-500/60 mb-5">Steward Required</p>
                  <button onClick={() => navigate('/grove')} className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-purple-400">Upgrade Standing</button>
                </div>
              )}
              <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 w-fit italic tracking-tighter">Strategic Intelligence</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Steward Assets</h4>
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-purple-500/10 transition-all cursor-pointer" onClick={() => document.getElementById('architect').scrollIntoView({behavior: 'smooth'})}>
                  <Zap size={14} className="text-purple-500/50" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">The Script Architect</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 group-hover:border-purple-500/10 transition-all cursor-not-allowed opacity-50">
                  <Compass size={14} className="text-purple-500/50" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Sponsorship Framework</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: REFRAMING ENGINE (Hearthkeeper+) */}
        <section id="dictionary" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">Identity Reframing Engine</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>

          <div className={`bg-[#110E16]/60 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative ${!isHearthkeeper && 'opacity-40 pointer-events-none'}`}>
            {!isHearthkeeper && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-black/60 p-4 rounded-xl border border-teal-500/20 backdrop-blur-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-teal-400">Unlock at Hearthkeeper Tier</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="SEARCH SKILLS (E.G. 'TRIAGE')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-teal-500/40 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", "Education", "Healthcare", "Service", "Public Sector"].map((s) => (
                  <button key={s} onClick={() => setActiveSector(s)} className={`px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${activeSector === s ? 'bg-teal-500 text-black border-teal-500' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto mb-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="pb-6 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Old Soil</th>
                    <th className="pb-6 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Functional Root</th>
                    <th className="pb-6 text-[9px] font-black text-teal-500 uppercase tracking-[0.2em]">New Horizon</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.01]">
                      <td className="py-6 pr-4">
                        <div className="text-xs text-white font-serif italic">{item.old}</div>
                        <div className="text-[8px] text-zinc-600 uppercase mt-1 font-bold">{item.sector}</div>
                      </td>
                      <td className="py-6 pr-4">
                        <Badge className="bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 italic">{item.root}</Badge>
                      </td>
                      <td className="py-6">
                        <div className="text-xs text-teal-400 font-black uppercase tracking-wider group-hover:text-white transition-colors">{item.new}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-8 border-t border-zinc-800/50 flex flex-col items-center">
              <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-zinc-800 rounded-2xl hover:border-teal-500/40 transition-all">
                <PlusCircle className="w-4 h-4 text-teal-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Request a Reframe</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE SCRIPT ARCHITECT (Steward Only) */}
        <section id="architect" className="mb-16 scroll-mt-24 relative">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500/60 whitespace-nowrap">The Script Architect</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative">
            {!isSteward && (
                <div className="absolute inset-0 z-30 bg-[#0A080D]/60 backdrop-blur-[12px] rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 border border-purple-500/20">
                    <Lock className="w-8 h-8 text-purple-500 mb-6" />
                    <h4 className="text-xl text-white font-serif italic mb-4 tracking-tight">Access Restricted to Stewards</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest max-w-xs mb-8 leading-relaxed italic">Interactive outreach mad-libs and tactical communication blueprints are reserved for higher standing.</p>
                    <button onClick={() => navigate('/grove')} className="px-10 py-4 bg-purple-500 text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-purple-400 transition-all">Inquire About Standing</button>
                </div>
            )}
            
            {/* Input Panel */}
            <div className="space-y-6 bg-[#110E16]/40 border border-zinc-800 p-10 rounded-[2.5rem]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Recipient Name</label>
                  <input type="text" placeholder="e.g. Marcus" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] text-white focus:border-purple-500/40 outline-none" onChange={(e) => setMl({...ml, recipient: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Origin Sector</label>
                  <input type="text" placeholder="e.g. Public Education" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] text-white focus:border-purple-500/40 outline-none" onChange={(e) => setMl({...ml, originSector: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Target Industry</label>
                  <input type="text" placeholder="e.g. Change Management" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] text-white focus:border-purple-500/40 outline-none" onChange={(e) => setMl({...ml, targetIndustry: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-teal-500">Reframed Skill</label>
                  <input type="text" placeholder="e.g. Operational Flow" className="w-full bg-black/40 border border-zinc-800 p-4 rounded-xl text-[10px] text-teal-400 font-black uppercase tracking-widest focus:border-teal-500/40 outline-none" onChange={(e) => setMl({...ml, reframedSkill: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] relative flex flex-col min-h-[350px]">
                <div className="flex justify-between items-center mb-10">
                    <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 italic tracking-tighter uppercase">The Cold-Pivot Bridge</Badge>
                    <button onClick={handleCopy} className={`p-4 rounded-xl transition-all ${copied ? 'bg-teal-500 text-black' : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-700'}`}>
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
                <div className="flex-1 space-y-4 font-serif italic text-sm text-zinc-300 leading-relaxed">
                    <p>"Hello <span className={ml.recipient ? "text-white font-bold not-italic" : "text-zinc-700"}>{ml.recipient || "[Name]"}</span>,</p>
                    <p>I’m currently transitioning from a decade in <span className={ml.originSector ? "text-white font-bold not-italic" : "text-zinc-700"}>{ml.originSector || "[Sector]"}</span> into the <span className={ml.targetIndustry ? "text-white font-bold not-italic" : "text-zinc-700"}>{ml.targetIndustry || "[Industry]"}</span> space.</p>
                    <p>While my background is in {ml.originSector || "education"}, my core expertise lies in <span className={ml.reframedSkill ? "text-teal-400 font-black uppercase tracking-widest not-italic" : "text-zinc-700"}>{ml.reframedSkill || "[Reframed Skill]"}</span>—a skill set I’ve noticed is increasingly critical for teams like yours.</p>
                    <p>Would you be open to a 15-minute virtual coffee next week? I'd love to hear your perspective."</p>
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: THE SANCTUARY */}
        <section id="sanctuary" className="mb-20 pt-10 border-t border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#110E16]/60 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col relative group hover:border-teal-500/30 transition-all">
              <Badge className="absolute top-6 right-6 bg-teal-500/10 text-teal-400 border border-teal-500/20 italic">Support</Badge>
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-8 text-center shadow-inner mt-6">
                <p className="text-[8px] font-black text-teal-500 uppercase tracking-[0.2em] mb-1 opacity-60">Crisis Text (Canada)</p>
                <p className="text-2xl font-black text-white tracking-[0.2em]">686868</p>
              </div>
              <a href="https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                VISIT PORTAL <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all flex flex-col">
              <HeartPulse className="w-8 h-8 text-teal-400 mb-6" />
              <h4 className="text-white font-bold text-sm font-serif italic mb-2">Burnout Recovery</h4>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-8 italic">Strategies for professional renewal and nervous system regulation.</p>
              <a href="https://www.helpguide.org" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                READ GUIDE <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all flex flex-col">
              <Wind className="w-8 h-8 text-teal-400 mb-6" />
              <h4 className="text-white font-bold text-sm font-serif italic mb-2">The Inner Advocate</h4>
              <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-8 italic">Identity-shifting exercises built on self-compassion and polyvagal frameworks.</p>
              <a href="https://self-compassion.org" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                LISTEN TO SESSIONS <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center pb-12">
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-4 h-4 text-zinc-700" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600 italic max-w-sm text-center leading-relaxed">
              Affiliate Reciprocity: Support the Hearth scholarship program through your intentional purchases.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;