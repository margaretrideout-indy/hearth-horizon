import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ArrowRight, ShoppingBag, Wind, Lock, Mountain, 
  MessageSquare, Sparkles, Zap, Compass, Layers, 
  HeartPulse, Search, PlusCircle, Copy, Check, Save,
  Database, ShieldCheck
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

const KINDLING_SCRIPTS = [
  {
    title: "The Mutual Connect",
    desc: "For when you have a contact in common.",
    text: "Hi [Name], I saw we are both connected to [Contact]. I'm currently pivoting from Education into [Industry] and would love to hear about your journey at [Company]."
  },
  {
    title: "The Project Deep-Dive",
    desc: "Highlighting a specific piece of their work.",
    text: "Hi [Name], I recently followed your work on [Project]. As I transition into [Industry], your approach to [Specific Skill] really resonated with my background in curriculum architecture."
  },
  {
    title: "The Reconnection",
    desc: "For someone you haven't spoken to in years.",
    text: "Hi [Name], it's been a while! I've been watching your growth in [Industry] from afar. I'm stepping away from the classroom this year and would love to catch up for 15 minutes."
  }
];

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
    {children}
  </span>
);

const Library = ({ vault, onSaveBlueprint }) => {
  const navigate = useNavigate();
  const scriptRef = useRef(null);
  
  // State for Navigation/Clean View
  const [activeTool, setActiveTool] = useState(null);
  
  // Existing States
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [ml, setMl] = useState({
    recipient: "",
    originSector: "Education",
    targetIndustry: "",
    reframedSkill: ""
  });
  
  const userTier = vault?.tier || 'Seedling';
  const isHearthkeeper = userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = userTier === 'Steward';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async () => {
    const element = scriptRef.current;
    const canvas = await html2canvas(element, { 
      backgroundColor: '#0A080D', 
      scale: 2 
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save(`Hearth-Strategy-${ml.targetIndustry || 'Pivot'}.pdf`);
  };

  const saveToHearth = () => {
    setIsSaving(true);
    if (onSaveBlueprint) onSaveBlueprint(ml);
    setTimeout(() => setIsSaving(false), 1200);
  };

  const filteredData = DICTIONARY_DATA.filter(item => {
    const matchesSearch = item.old.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.new.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === "All" || item.sector === activeSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(168,85,247,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight leading-none">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-zinc-400 font-light italic uppercase tracking-wider">
              Curated tools and blueprints for the intentional professional migration.
            </p>
          </div>

          <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-zinc-800 bg-[#16121D] backdrop-blur-md shadow-xl">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isSteward ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`} />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Current Standing</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{userTier}</span>
            </div>
          </div>
        </header>

        {/* SECTION 1: THE STUDY (Indigo & Amazon) */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/60 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#16121D] border border-purple-500/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] hover:border-purple-500/40 transition-all group flex flex-col shadow-[0_0_30px_rgba(168,85,247,0.02)]">
              <Book className="w-8 h-8 text-purple-400 mb-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <h4 className="text-lg text-white font-serif italic mb-3">Indigo.ca Curated List</h4>
              <p className="text-[11px] text-zinc-300 italic mb-8 font-light leading-relaxed">Pivotal literature on career migration and psychological resilience.</p>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white shadow-lg">
                SHOP CURATED LIST <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>

            <div className="bg-[#16121D] border border-purple-500/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] hover:border-purple-500/40 transition-all group flex flex-col shadow-[0_0_30px_rgba(168,85,247,0.02)]">
              <Package className="w-8 h-8 text-purple-400 mb-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
              <h4 className="text-lg text-white font-serif italic mb-2">Amazon Essentials</h4>
              <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter mb-4 italic">As an Amazon Associate I earn from qualifying purchases.</p>
              <p className="text-[11px] text-zinc-300 italic mb-8 font-light leading-relaxed">Grounding tools and ergonomic gear for your new workspace.</p>
              <a href="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white shadow-lg">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE CANOPY HUB (Interactive Grid) */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Canopy Hub</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#16121D] to-[#0A080D] border border-teal-500/30 p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 text-teal-500/5 group-hover:text-teal-500/10 transition-colors pointer-events-none">
                <Mountain size={180} />
              </div>
              <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 italic mb-6 w-fit">Foundational Gift</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Master Strategy Deck</h4>
              <p className="text-[11px] text-zinc-300 font-light italic leading-relaxed mb-10">The primary map for your transition and resignation protocol.</p>
              <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="mt-auto h-14 bg-teal-500 hover:bg-teal-400 text-[#0A080D] font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] text-[9px] shadow-[0_10px_20px_rgba(20,184,166,0.2)]">
                Open Blueprint <ExternalLink size={14} />
              </button>
            </div>

            {/* HEARTHKEEPER PROVISIONS CARD */}
            <div className="bg-[#16121D] border border-teal-500/10 p-8 rounded-2xl md:rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all flex flex-col shadow-xl">
              {!isHearthkeeper && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[6px] rounded-2xl md:rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-5 h-5 text-teal-500/40 mb-3" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500/60 mb-5">Hearthkeeper Required</p>
                  <button onClick={() => navigate('/grove')} className="px-6 py-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-teal-400">Upgrade Standing</button>
                </div>
              )}
              <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-6 w-fit italic tracking-tighter uppercase">Tactical Provisions</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Hearthkeeper Tools</h4>
              <div className="space-y-3 mt-4">
                <div onClick={() => setActiveTool('reframing')} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${activeTool === 'reframing' ? 'bg-teal-500/20 border-teal-500/50' : 'bg-black/40 border-teal-500/10 group-hover:border-teal-500/30'}`}>
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-teal-500/50" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">Identity Reframing Engine</span>
                  </div>
                  {activeTool === 'reframing' && <ArrowRight size={12} className="text-teal-400" />}
                </div>
                <div onClick={() => setActiveTool('kindling')} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${activeTool === 'kindling' ? 'bg-teal-500/20 border-teal-500/50' : 'bg-black/40 border-teal-500/10 group-hover:border-teal-500/30'}`}>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="text-teal-500/50" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">Kindling (Outreach)</span>
                  </div>
                  {activeTool === 'kindling' && <ArrowRight size={12} className="text-teal-400" />}
                </div>
              </div>
            </div>

            {/* STEWARD ASSETS CARD */}
            <div className="bg-[#16121D] border border-purple-500/10 p-8 rounded-2xl md:rounded-[2.5rem] relative group hover:border-purple-500/30 transition-all flex flex-col shadow-xl">
              {!isSteward && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[6px] rounded-2xl md:rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-5 h-5 text-purple-500/40 mb-3" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-500/60 mb-5">Steward Required</p>
                  <button onClick={() => navigate('/grove')} className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-purple-400">Upgrade Standing</button>
                </div>
              )}
              <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 w-fit italic tracking-tighter uppercase">Strategic Intelligence</Badge>
              <h4 className="text-xl text-white font-serif italic mb-4">Steward Assets</h4>
              <div className="space-y-3 mt-4">
                <div onClick={() => setActiveTool('architect')} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${activeTool === 'architect' ? 'bg-purple-500/20 border-purple-500/50' : 'bg-black/40 border-purple-500/10 group-hover:border-purple-500/30'}`}>
                  <div className="flex items-center gap-3">
                    <Zap size={14} className="text-purple-500/50" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">The Script Architect</span>
                  </div>
                  {activeTool === 'architect' && <ArrowRight size={12} className="text-purple-400" />}
                </div>
                <div onClick={() => setActiveTool('sponsorship')} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${activeTool === 'sponsorship' ? 'bg-purple-500/20 border-purple-500/50' : 'bg-black/40 border-purple-500/10 group-hover:border-purple-500/30'}`}>
                  <div className="flex items-center gap-3">
                    <Compass size={14} className="text-purple-500/50" />
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-tighter">Sponsorship Framework</span>
                  </div>
                  {activeTool === 'sponsorship' && <ArrowRight size={12} className="text-purple-400" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVE TOOL STAGE */}
        <section className="mb-20 min-h-[400px]">
          {activeTool ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                <button 
                  onClick={() => setActiveTool(null)}
                  className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" /> Back to Canopy
                </button>
                <Badge className={`${activeTool === 'reframing' || activeTool === 'kindling' ? 'bg-teal-500/10 text-teal-400' : 'bg-purple-500/10 text-purple-400'} px-4 py-1.5`}>
                  {activeTool.replace(/([A-Z])/g, ' $1')} Active
                </Badge>
              </div>

              {/* REFRAMING ENGINE VIEW */}
              {activeTool === 'reframing' && (
                <div className="bg-[#110E16]/60 border border-teal-500/10 rounded-[2.5rem] p-6 md:p-12">
                   <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <div className="relative flex-1">
                      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                      <input 
                        type="text"
                        placeholder="SEARCH SKILLS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-teal-500/40 transition-all shadow-inner"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["All", "Education", "Healthcare", "Service", "Public Sector"].map((s) => (
                        <button key={s} onClick={() => setActiveSector(s)} className={`px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${activeSector === s ? 'bg-teal-500 text-black border-teal-500' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="pb-6 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Old Soil</th>
                          <th className="pb-6 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Functional Root</th>
                          <th className="pb-6 text-[9px] font-black text-teal-500 uppercase tracking-[0.2em]">New Horizon</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, i) => (
                          <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.01]">
                            <td className="py-6 pr-4">
                              <div className="text-xs text-white font-serif italic">{item.old}</div>
                              <div className="text-[8px] text-zinc-500 uppercase mt-1 font-bold">{item.sector}</div>
                            </td>
                            <td className="py-6 pr-4">
                              <Badge className="bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 italic font-medium">{item.root}</Badge>
                            </td>
                            <td className="py-6">
                              <div className="text-xs text-teal-400 font-black uppercase tracking-wider group-hover:text-white transition-colors">{item.new}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* KINDLING VIEW */}
              {activeTool === 'kindling' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {KINDLING_SCRIPTS.map((script, i) => (
                    <div key={i} className="bg-[#110F15] border border-teal-500/10 p-8 rounded-[2rem] flex flex-col hover:border-teal-500/40 transition-all group shadow-xl">
                      <div className="flex justify-between items-start mb-6">
                        <MessageSquare className="text-teal-500/40 group-hover:text-teal-500 transition-colors" size={20} />
                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Kindling {i + 1}</span>
                      </div>
                      <h4 className="text-sm font-serif italic text-white mb-2">{script.title}</h4>
                      <p className="text-[10px] text-zinc-500 mb-8 leading-relaxed italic">{script.desc}</p>
                      <button 
                        onClick={() => handleCopy(script.text)}
                        className="mt-auto w-full py-4 rounded-xl bg-teal-500/5 border border-teal-500/20 text-[9px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-2"
                      >
                        <Copy size={12} /> {copied ? 'Copied' : 'Copy Kindling'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* SCRIPT ARCHITECT VIEW */}
              {activeTool === 'architect' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-6 bg-[#16121D] border border-purple-500/10 p-6 md:p-10 rounded-[2.5rem] shadow-xl">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Recipient Name</label>
                        <input type="text" placeholder="e.g. Marcus" className="w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-[10px] text-white focus:border-purple-500/40 outline-none transition-all shadow-inner" onChange={(e) => setMl({...ml, recipient: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Target Industry</label>
                        <input type="text" placeholder="e.g. Change Management" className="w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-[10px] text-white focus:border-purple-500/40 outline-none transition-all shadow-inner" onChange={(e) => setMl({...ml, targetIndustry: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black uppercase tracking-widest text-teal-500">The Reframed Skill</label>
                        <select className="w-full bg-black/60 border border-zinc-800 p-4 rounded-xl text-[10px] text-teal-400 font-black uppercase tracking-widest focus:border-teal-500/40 outline-none appearance-none cursor-pointer shadow-inner" onChange={(e) => setMl({...ml, reframedSkill: e.target.value})}>
                          <option value="">Select a Strength</option>
                          <option value="Curriculum Architecture">Curriculum Architecture</option>
                          <option value="Stakeholder Orchestration">Stakeholder Orchestration</option>
                          <option value="Operational Strategy">Operational Strategy</option>
                          <option value="Agile Knowledge Management">Agile Knowledge Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#16121D] border border-purple-500/10 p-6 md:p-10 rounded-[2.5rem] relative flex flex-col min-h-[400px] shadow-xl">
                      <div className="flex justify-between items-center mb-10">
                        <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 italic tracking-tighter uppercase px-3 py-1">The Cold-Pivot Bridge</Badge>
                        <div className="flex gap-2">
                            <button onClick={() => handleCopy(scriptRef.current?.innerText)} className="p-4 rounded-xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-all">
                                <Copy size={18} />
                            </button>
                            <button onClick={downloadPDF} className="p-4 rounded-xl bg-zinc-800/80 text-zinc-300 hover:text-white transition-all">
                                <ExternalLink size={18} />
                            </button>
                        </div>
                      </div>
                      <div ref={scriptRef} className="flex-1 space-y-4 font-serif italic text-sm text-zinc-300 leading-relaxed p-6 bg-[#0A080D] rounded-2xl border border-white/5 shadow-inner">
                          <p>"Hello {ml.recipient || "[Name]"},</p>
                          <p>I’m currently transitioning from a decade in <span className="text-white font-bold not-italic">{ml.originSector}</span> into the {ml.targetIndustry || "[Industry]"} space.</p>
                          <p>While my background is in {ml.originSector}, my core expertise lies in <span className="text-teal-400 font-black uppercase tracking-widest not-italic">{ml.reframedSkill || "[Reframed Skill]"}</span>—a skill set I’ve noticed is increasingly critical for teams like yours.</p>
                          <p>Would you be open to a 15-minute virtual coffee next week?"</p>
                      </div>
                      <button onClick={saveToHearth} className="mt-8 w-full py-4 rounded-xl flex items-center justify-center gap-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 hover:bg-teal-500 hover:text-black transition-all">
                        <Save size={16} /> <span className="text-[9px] font-black uppercase tracking-widest">{isSaving ? 'Storing...' : 'Store in my Hearth'}</span>
                      </button>
                  </div>
                </div>
              )}

              {/* SPONSORSHIP VIEW */}
              {activeTool === 'sponsorship' && (
                <div className="text-center py-24 bg-[#110F15] rounded-[3rem] border border-purple-500/10 animate-pulse shadow-inner">
                  <Compass size={40} className="text-purple-500/20 mx-auto mb-6" />
                  <h3 className="text-xl font-serif italic text-white mb-2">Sponsorship Framework</h3>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-[0.4em] font-black">Strategic Advocate Modules Initializing...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-white/5 rounded-[3rem]">
              <Database size={24} className="text-zinc-800 mx-auto mb-6" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Select a Provision Above to Populate the Stage</p>
            </div>
          )}
        </section>

        {/* SECTION 3: THE SANCTUARY */}
        <section id="sanctuary" className="mb-20 pt-10 border-t border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#16121D] border border-teal-500/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col relative group hover:border-teal-500/30 transition-all shadow-xl">
              <Badge className="absolute top-6 right-6 bg-teal-500/10 text-teal-400 border border-teal-500/20 italic uppercase font-bold tracking-tighter px-2">Support</Badge>
              <div className="bg-black/60 rounded-2xl p-6 border border-white/5 mb-8 text-center shadow-inner mt-6">
                <p className="text-[8px] font-black text-teal-500 uppercase tracking-[0.2em] mb-1 opacity-60">Crisis Text (Canada)</p>
                <p className="text-2xl font-black text-white tracking-[0.2em]">686868</p>
              </div>
              <a href="https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                VISIT PORTAL <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-[#16121D] border border-teal-500/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] hover:border-teal-500/30 transition-all flex flex-col shadow-xl">
              <HeartPulse className="w-8 h-8 text-teal-400 mb-6 drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]" />
              <h4 className="text-white font-bold text-sm font-serif italic mb-2">Burnout Recovery</h4>
              <p className="text-[10px] text-zinc-300 font-light leading-relaxed mb-8 italic">Strategies for professional renewal.</p>
              <a href="https://www.helpguide.org" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                READ GUIDE <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            <div className="bg-[#16121D] border border-teal-500/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] hover:border-teal-500/30 transition-all flex flex-col shadow-xl">
              <Wind className="w-8 h-8 text-teal-400 mb-6 drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]" />
              <h4 className="text-white font-bold text-sm font-serif italic mb-2">The Inner Advocate</h4>
              <p className="text-[10px] text-zinc-300 font-light leading-relaxed mb-8 italic">Identity-shifting exercises.</p>
              <a href="https://self-compassion.org" target="_blank" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2">
                LISTEN TO SESSIONS <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center pb-12">
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-[2rem] bg-white/[0.02] border border-white/5 shadow-inner">
            <ShoppingBag className="w-4 h-4 text-zinc-600" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 italic max-w-sm text-center leading-relaxed">
              Affiliate Reciprocity: Support the Hearth scholarship program through your intentional purchases.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;