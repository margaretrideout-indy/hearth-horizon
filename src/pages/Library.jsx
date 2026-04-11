import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag, MessageSquare,
  Search, Languages, Download, Cpu, Wind, Lock, Globe, Zap
} from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  
  const userTier = "Seedling"; 

  const filteredProvisions = PROVISIONS.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              A curated ecosystem of tools and blueprints for the Canadian professional transition.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
            <input 
              type="text"
              placeholder="SEARCH RESOURCES..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-full py-3 pl-10 pr-4 text-[9px] font-black tracking-widest text-white focus:outline-none focus:border-teal-500/50 uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500/60 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10">
                <Book className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Indigo.ca Curated List</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">
                Literature on professional pivots and psychological resilience, specifically curated for the Canadian landscape.
              </p>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                SHOP INDIGO <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>

            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Amazon Essentials</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-4 italic">
                Workspace gear and grounding tools that support the mental and physical demands of a career shift.
              </p>
              <p className="text-[9px] text-slate-600 leading-tight mb-8 font-light italic">Associate Disclosure: Supports the Hearth platform.</p>
              <a href="https://www.amazon.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
           <section>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Dialect</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 border border-white/5">
                    <Languages className="w-5 h-5" />
                  </div>
                  <Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20 text-[7px] font-black px-2 uppercase tracking-widest italic">Seedling Access</Badge>
                </div>
                <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Universal Pivot Dictionary</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6 italic">Translate your legacy experience into high-impact corporate operations value.</p>
                <button 
                  onClick={() => setShowDictionary(!showDictionary)}
                  className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                  {showDictionary ? "CLOSE DICTIONARY" : "HARVEST RESOURCE"} <ArrowRight className={`w-3 h-3 transition-transform ${showDictionary ? 'rotate-90' : ''}`} />
                </button>
              </div>
              
              <div className="mt-8 bg-[#1A1423]/50 border border-white/5 p-6 rounded-[2rem]">
                 <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-4 h-4 text-slate-500" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Canadian Ecosystem</h4>
                 </div>
                 <p className="text-[10px] text-slate-500 italic mb-4">Resources for navigating the Canadian job market and tech landscapes.</p>
                 <ul className="space-y-2">
                    {ECOSYSTEM_LINKS.map((link) => (
                      <li key={link.name} className="flex items-center justify-between text-[9px] font-bold text-slate-400 hover:text-teal-400 cursor-pointer border-b border-white/5 pb-2">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex justify-between w-full">
                           {link.name.toUpperCase()} <ExternalLink size={10} />
                        </a>
                      </li>
                    ))}
                 </ul>
              </div>
           </section>

           <section>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">Provisions</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="space-y-3">
                {filteredProvisions.map((item, i) => {
                  const isLocked = item.tier !== "Seedling" && userTier === "Seedling";
                  return (
                    <div key={i} className={`bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.04] transition-all ${isLocked ? 'opacity-50' : 'cursor-pointer'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`${isLocked ? 'text-slate-600' : 'text-teal-400'} opacity-60`}>{item.icon}</div>
                        <div>
                          <p className="text-xs font-serif italic text-white flex items-center gap-2">
                            {item.title}
                            {isLocked && <Lock size={10} className="text-orange-500/70" />}
                          </p>
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest">{item.description}</p>
                        </div>
                      </div>
                      {isLocked ? (
                        <span className="text-[7px] font-black text-orange-500/60 uppercase tracking-tighter">{item.tier}</span>
                      ) : (
                        item.type === "EXT" ? <ExternalLink size={12} className="text-slate-600 group-hover:text-teal-400 transition-colors" /> : <Download size={12} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                      )}
                    </div>
                  );
                })}
              </div>
           </section>
        </div>

        {showDictionary && (
          <div className="mb-32 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-[#1A1423] border border-teal-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl divide-y divide-white/5">
              {TRANSLATIONS.map((t, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-white/[0.02] transition-colors gap-4">
                  <div>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter block mb-1">Legacy Sector</span>
                    <p className="text-sm text-slate-300 font-medium">{t.edu}</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-teal-600 uppercase tracking-tighter block mb-1">Corporate Ops Value</span>
                    <p className="text-sm text-white font-serif italic">{t.ops}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="mt-20 border-t border-white/5 pt-20 pb-32">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1423] border border-white/5 p-8 rounded-[2.5rem] flex flex-col relative group">
              <Badge className="absolute top-6 right-6 bg-teal-500/10 text-teal-500 border-teal-500/20 text-[7px] font-black px-2 uppercase tracking-widest italic">24/7 Support</Badge>
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Canadian Resource Portal</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">The CMHA provides nationwide support and tools for managing mental health during life shifts.</p>
              <div className="mt-auto space-y-4">
                <a href="https://cmha.ca/find-help/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  ACCESS CMHA HELP <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Crisis Line: 9-8-8</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Burnout to Balance</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">A recovery guide using goal-hierarchy mapping to reverse professional cynicism.</p>
              <div className="mt-auto">
                <a href="https://campusmentalhealth.ca/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  DOWNLOAD RECOVERY GUIDE <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Inner Advocate</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">Guided sessions tailored for identity shifts and quieting the inner critic.</p>
              <div className="mt-auto">
                <a href="https://self-compassion.org/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  LISTEN TO SESSIONS <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center pb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-600 italic">Affiliate Reciprocity: We only recommend tools that provide genuine leverage for professional pivots.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;

// --- DATA REPOSITORY ---

const TRANSLATIONS = [
  { edu: "Front-line Delivery", ops: "Personalized User Experience (UX) & Scalable Execution" },
  { edu: "Project Individualization", ops: "Custom Stakeholder Requirements & Targeted KPI Development" },
  { edu: "Workflow Planning", ops: "Strategic Product Roadmapping & Lifecycle Management" },
  { edu: "Conflict Resolution", ops: "High-Stakes Stakeholder Facilitation & Resource Optimization" },
  { edu: "Client/Peer Relations", ops: "Cross-Functional Relationship Management (CRM)" },
  { edu: "Continuous Assessment", ops: "Iterative Feedback Loops & Real-time Data Analysis" },
  { edu: "Literary/Social Analysis", ops: "Qualitative Data Synthesis & Sentiment Mapping" }
];

const PROVISIONS = [
  { 
    title: "Community Resilience Guide", 
    tier: "Seedling", 
    type: "PDF", 
    icon: <ShieldCheck size={14}/>,
    description: "Foundational Canadian resources for career transitions."
  },
  { 
    title: "Basic Professional Template", 
    tier: "Seedling", 
    type: "DOCX", 
    icon: <FileText size={14}/>,
    description: "A clean, ATS-friendly baseline for immediate use."
  },
  { 
    title: "Teal HQ Search Tracker", 
    tier: "Seedling", 
    type: "EXT", 
    icon: <Zap size={14}/>,
    description: "External: Managed job application tracking platform."
  },
  { 
    title: "The Tech-Stack Translator", 
    tier: "Hearthkeeper", 
    type: "TOOL", 
    icon: <Cpu size={14}/>,
    description: "Mapping classroom software to industry-standard tools."
  },
  { 
    title: "LinkedIn Outreach Embers", 
    tier: "Hearthkeeper", 
    type: "DOC", 
    icon: <MessageSquare size={14}/>,
    description: "High-conversion scripts for networking across Canada."
  },
  { 
    title: "Jobscan ATS Analyzer", 
    tier: "Hearthkeeper", 
    type: "EXT", 
    icon: <Search size={14}/>,
    description: "External: Audit your resume against specific job IDs."
  },
  { 
    title: "Executive Presence Framework", 
    tier: "Steward", 
    type: "STRATEGY", 
    icon: <Globe size={14}/>,
    description: "Leadership communication for senior corporate pivots."
  }
];

const ECOSYSTEM_LINKS = [
  { name: 'Invest in Canada', url: 'https://www.investcanada.ca' },
  { name: 'Canada Job Bank', url: 'https://www.jobbank.gc.ca' },
  { name: 'MaRS Discovery District', url: 'https://www.marsdd.com' }
];