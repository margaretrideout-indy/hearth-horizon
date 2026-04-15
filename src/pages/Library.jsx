import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ArrowRight, Mountain, Lock, MessageSquare, Zap, 
  Compass, Layers, Search, Copy, Save, FileText, X,
  ChevronRight
} from 'lucide-react';
import { libraryVolumeII } from './Contact';

const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";
const IDENTITY_LEDGER_URL = "https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link";
const AUTHORITY_WORKSHEET_URL = "https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link";
const AMZ_WISHLIST_URL = "https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD";
const INDIGO_LIST_URL = "https://www.indigo.ca"; 

const DICTIONARY_DATA = [
  { sector: "Education", old: "Classroom Management", root: "Operational Flow", new: "Agile Project Oversight" },
  { sector: "Education", old: "Curriculum Development", root: "Information Architecture", new: "Content Strategy & Taxonomy" },
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
    text: "Hi [Name], I saw we are both connected to [Contact]. I'm currently pivoting from [Current Sector] into [Industry] and would love to hear about your journey at [Company]."
  },
  {
    title: "The Project Deep-Dive",
    desc: "Highlighting a specific piece of their work.",
    text: "Hi [Name], I recently followed your work on [Project]. As I transition into [Industry], your approach to [Specific Skill] really resonated with my background in [Your Field]."
  },
  {
    title: "The Reconnection",
    desc: "For someone you haven't spoken to in years.",
    text: "Hi [Name], it's been a while! I've been watching your growth in [Industry] from afar. I'm stepping away from my current role this year and would love to catch up for 15 minutes."
  }
];

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
    {children}
  </span>
);

const StandingModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  const isSteward = type === 'steward';
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#0A080D]/90 backdrop-blur-md" onClick={onClose} />
      <div className={`relative w-full max-w-lg bg-[#16121D] border ${isSteward ? 'border-purple-500/30' : 'border-teal-500/30'} rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10">
          <X size={20} />
        </button>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${isSteward ? 'bg-purple-500/10 text-purple-400' : 'bg-teal-500/10 text-teal-400'}`}>
          <Lock size={24} />
        </div>
        <h3 className="text-2xl font-serif italic text-white mb-4">Elevating Your Standing</h3>
        <p className="text-sm text-zinc-400 leading-relaxed italic mb-8">
          The {isSteward ? 'Steward' : 'Hearthkeeper'} provisions contain high-leverage strategic assets. Access is granted through verified professional migration milestones or direct mentorship.
        </p>
        <div className="space-y-4">
          <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
            <h4 className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isSteward ? 'text-purple-400' : 'text-teal-400'}`}>How to progress</h4>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">Reach out to the Hearthkeeper via the <span className="text-white">Grove Connect</span> to discuss your current project scope and alignment with these advanced protocols.</p>
          </div>
          <button onClick={onClose} className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all">
            Return to Canopy
          </button>
        </div>
      </div>
    </div>
  );
};

const Library = ({ vault, isAdmin }) => {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);
  const [activeTool, setActiveTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [copied, setCopied] = useState(false);
  const [modalType, setModalType] = useState(null);
  
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredData = DICTIONARY_DATA.filter(item => {
    const matchesSearch = item.old.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.new.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = activeSector === "All" || item.sector === activeSector;
    return matchesSearch && matchesSector;
  });

  const isResourceLocked = (itemTier) => {
    const weights = { "Seedling": 1, "Hearthkeeper": 2, "Steward": 3 };
    return weights[itemTier] > weights[userTier];
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <StandingModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />
      
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.05),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight leading-none">
                The Library: {currentVolume === 1 ? 'Volume I' : 'Volume II'}
              </h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-zinc-400 font-light italic uppercase tracking-wider">
              {currentVolume === 1 
                ? "Curated tools and blueprints for the intentional professional migration."
                : "The Expansion Archives: Advanced frameworks and deep-dive resources."}
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

        {currentVolume === 1 ? (
          <div className="animate-in fade-in duration-700">
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/80 whitespace-nowrap">The Study</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#110E16] border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-teal-500/40 transition-all group flex flex-col shadow-xl">
                  <Book className="w-8 h-8 text-teal-400 mb-6" />
                  <h4 className="text-lg text-white font-serif font-black italic mb-3">Indigo Curated List</h4>
                  <p className="text-[11px] text-zinc-400 italic mb-8 font-light leading-relaxed">Pivotal literature on career migration, identity, and resilience.</p>
                  <button 
                    disabled
                    className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-zinc-900/50 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                  >
                    ARRIVING IN THE GROVE SOON <Lock className="ml-2 w-3 h-3" />
                  </button>
                </div>

                <div className="bg-[#110E16] border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-teal-500/40 transition-all group flex flex-col shadow-xl">
                  <Package className="w-8 h-8 text-teal-400 mb-6" />
                  <h4 className="text-lg text-white font-serif font-black italic mb-2">Amazon Essentials</h4>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter mb-4 italic">As an Amazon Associate I earn from qualifying purchases.</p>
                  <p className="text-[11px] text-zinc-400 italic mb-8 font-light leading-relaxed">Grounding tools, tech, and workspace gear for your new chapter.</p>
                  <a href={AMZ_WISHLIST_URL} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-teal-500/5 text-teal-400 border border-teal-500/20 hover:bg-teal-500 hover:text-black">
                    EXPLORE THE SHOP <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500/80 whitespace-nowrap">The Canopy Hub</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#16121D] to-[#0A080D] border border-teal-500/30 p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden group shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 text-teal-500/5 pointer-events-none">
                    <Mountain size={180} />
                  </div>
                  <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 italic mb-6 w-fit">Foundational Gift</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Master Strategy Deck</h4>
                  <p className="text-[11px] text-zinc-300 font-light italic leading-relaxed mb-10">The primary map for your transition and resignation protocol.</p>
                  <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="mt-auto h-14 bg-teal-500 hover:bg-teal-400 text-[#0A080D] font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] text-[9px]">
                    Open Blueprint <ExternalLink size={14} />
                  </button>
                </div>

                <div className="bg-[#110E16] border border-teal-500/10 p-8 rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all flex flex-col shadow-xl overflow-hidden">
                  {!isHearthkeeper && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-5 h-5 text-teal-500/40 mb-3" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500/90 mb-5">Hearthkeeper Required</p>
                      <button onClick={() => setModalType('hearthkeeper')} className="px-6 py-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-teal-400">View Requirements</button>
                    </div>
                  )}
                  <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-6 w-fit italic tracking-tighter uppercase">Tactical Provisions</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Hearthkeeper Tools</h4>
                  <div className="space-y-3 mt-4">
                    <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-all ${activeTool === 'ledger' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-black/40 border-zinc-800'}`}>
                      <div onClick={() => setActiveTool('ledger')} className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Compass size={14} className="text-teal-400" />
                          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Identity Ledger</span>
                        </div>
                        <ArrowRight size={12} className={activeTool === 'ledger' ? 'text-teal-400' : 'text-zinc-600'} />
                      </div>
                      <div className="pl-7 pt-1 border-t border-white/5 flex flex-col gap-2">
                        <a href={IDENTITY_LEDGER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-teal-500/80 hover:text-teal-400 uppercase tracking-widest transition-colors">
                          <Save size={10} /> View Schematic
                        </a>
                        <a href={AUTHORITY_WORKSHEET_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
                          <FileText size={10} /> Authority Worksheet (PDF)
                        </a>
                      </div>
                    </div>
                    <div onClick={() => setActiveTool('alignment')} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${activeTool === 'alignment' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-black/40 border-zinc-800'}`}>
                      <div className="flex items-center gap-3">
                        <Layers size={14} className="text-teal-400/50" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter">Alignment Engine</span>
                      </div>
                      {activeTool === 'alignment' && <ArrowRight size={12} className="text-teal-400" />}
                    </div>
                    <div onClick={() => setActiveTool('kindling')} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${activeTool === 'kindling' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-black/40 border-zinc-800'}`}>
                      <div className="flex items-center gap-3">
                        <MessageSquare size={14} className="text-teal-400/50" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter">Kindling Scripts</span>
                      </div>
                      {activeTool === 'kindling' && <ArrowRight size={12} className="text-teal-400" />}
                    </div>
                  </div>
                </div>

                <div className="bg-[#110E16] border border-purple-500/10 p-8 rounded-[2.5rem] relative group hover:border-purple-500/30 transition-all flex flex-col shadow-xl overflow-hidden">
                  {!isSteward && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-5 h-5 text-purple-500/40 mb-3" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-500/90 mb-5">Steward Required</p>
                      <button onClick={() => setModalType('steward')} className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-purple-400">View Requirements</button>
                    </div>
                  )}
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 w-fit italic tracking-tighter uppercase">Strategic Intelligence</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Steward Assets</h4>
                  <div className="space-y-3 mt-4">
                    <div onClick={() => setActiveTool('architect')} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${activeTool === 'architect' ? 'bg-purple-500/10 border-purple-500/50' : 'bg-black/40 border-zinc-800'}`}>
                      <div className="flex items-center gap-3">
                        <Zap size={14} className="text-purple-500/50" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter">Cold Bridge Gallery</span>
                      </div>
                      {activeTool === 'architect' && <ArrowRight size={12} className="text-purple-400" />}
                    </div>
                    <div onClick={() => setActiveTool('sponsorship')} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${activeTool === 'sponsorship' ? 'bg-purple-500/10 border-purple-500/50' : 'bg-black/40 border-zinc-800'}`}>
                      <div className="flex items-center gap-3">
                        <Compass size={14} className="text-purple-500/50" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-tighter">Council of Allies</span>
                      </div>
                      {activeTool === 'sponsorship' && <ArrowRight size={12} className="text-purple-400" />}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-20 min-h-[400px]">
              {activeTool ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <button onClick={() => setActiveTool(null)} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 rotate-180" /> Back to Canopy
                    </button>
                  </div>

                  {activeTool === 'alignment' && (
                    <div className="bg-[#110E16]/60 border border-teal-500/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl backdrop-blur-sm">
                       <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="relative flex-1">
                          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                          <input 
                            type="text"
                            placeholder="SEARCH SKILLS..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/60 border border-zinc-800 rounded-2xl py-5 pl-14 pr-6 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-teal-500/40 shadow-inner"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Education", "Healthcare", "Service", "Public Sector"].map((s) => (
                            <button key={s} onClick={() => setActiveSector(s)} className={`px-5 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest border transition-all ${activeSector === s ? 'bg-teal-500 text-black border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-transparent text-zinc-400 border-zinc-800'}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-zinc-800">
                              <th className="pb-6 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Legacy Soil</th>
                              <th className="pb-6 text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">Functional Core</th>
                              <th className="pb-6 text-[9px] font-black text-teal-500 uppercase tracking-[0.2em]">The New Horizon</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredData.map((item, i) => (
                              <tr key={i} className="group border-b border-white/[0.02] hover:bg-white/[0.01]">
                                <td className="py-6 pr-4"><div className="text-xs text-white font-serif font-black italic">{item.old}</div></td>
                                <td className="py-6 pr-4"><Badge className="bg-zinc-900 text-zinc-400 border border-zinc-800 italic">{item.root}</Badge></td>
                                <td className="py-6"><div className="text-xs text-teal-400 font-black uppercase tracking-wider group-hover:text-white transition-colors">{item.new}</div></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTool === 'kindling' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {KINDLING_SCRIPTS.map((script, i) => (
                        <div key={i} className="bg-[#110E16] border border-teal-500/10 p-8 rounded-[2rem] flex flex-col hover:border-teal-500/40 transition-all shadow-xl group">
                          <h4 className="text-sm font-serif font-black italic text-white mb-2">{script.title}</h4>
                          <p className="text-[10px] text-zinc-500 mb-6 leading-relaxed italic">{script.desc}</p>
                          <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-[10px] text-zinc-400 font-serif font-black italic leading-relaxed mb-6 relative group-hover:border-teal-500/20 transition-all">
                            {script.text}
                          </div>
                          <button 
                            onClick={() => handleCopy(script.text)}
                            className="mt-auto flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-teal-500/5 border border-teal-500/20 text-[8px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500 hover:text-black transition-all"
                          >
                            {copied ? 'Copied to Ledger' : <><Copy size={12} /> Copy Script</>}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {(activeTool === 'architect' || activeTool === 'sponsorship') && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <Zap className="w-12 h-12 text-purple-500/20 mb-6" />
                      <h4 className="text-xl text-white font-serif font-black italic mb-2">High-Stakes Intelligence</h4>
                      <p className="text-xs text-zinc-500 font-light italic">These assets are currently being provisioned for your specific migration path.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/5 rounded-[3rem]">
                  <Compass className="w-12 h-12 text-zinc-800 mb-6" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Select a tool from the Canopy to begin</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 pb-20">
            <div className="flex items-center gap-4 mb-12">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/80 whitespace-nowrap">Expansion Archives</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraryVolumeII.map((item, idx) => {
                const locked = isResourceLocked(item.tier);
                return (
                  <div key={idx} className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 bg-[#110E16]/40 backdrop-blur-sm ${locked ? 'border-zinc-900 opacity-60' : 'border-zinc-800 hover:border-teal-500/30 hover:bg-teal-500/5'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl ${locked ? 'bg-zinc-800 text-zinc-600' : 'bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform'}`}>
                        {item.icon}
                      </div>
                      {locked ? (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                          <Lock size={10} className="text-zinc-500" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{item.tier}</span>
                        </div>
                      ) : (
                        <span className="text-[8px] font-black uppercase tracking-widest text-teal-500/50">{item.category}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-8">{item.desc}</p>
                    <button disabled={locked} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${locked ? 'text-zinc-700' : 'text-teal-400 hover:gap-4'}`}>
                      {locked ? 'Restricted Access' : 'Open Resource'} {!locked && <ChevronRight size={14} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 p-1.5 bg-[#16121D] rounded-2xl border border-white/5 shadow-2xl">
            <button 
              onClick={() => { setCurrentVolume(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Volume I
            </button>
            <button 
              onClick={() => { setCurrentVolume(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Volume II
            </button>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Mountain size={12} className="text-teal-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Hearth Horizon © 2026</span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => navigate('/grove')} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-colors">Grove Connect</button>
            <button onClick={() => navigate('/hearth')} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-colors">Return Home</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;