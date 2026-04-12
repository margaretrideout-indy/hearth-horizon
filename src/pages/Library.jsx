import React, { useState } from 'react';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag,
  Search, Languages, Wind, Lock, Globe,
  Mountain, FileDown, MessageSquare
} from 'lucide-react';

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);

  // Actions for the Master Provision buttons
  const handleDownload = () => {
    // Replace with actual direct PDF download link when ready
    window.open('#', '_blank');
  };

  const handleOpenDeck = () => {
    // Replace with your actual Google Slides / Canva link
    window.open('#', '_blank');
  };
  
  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              A curated ecosystem of tools and blueprints for the intentional professional migration.
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

        {/* SECTION 1: THE STUDY (AFFILIATE LINKS) */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500/60 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INDIGO */}
            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10">
                <Book className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Indigo.ca Curated List</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">
                Literature on professional pivots and psychological resilience, specifically curated for the Canadian landscape.
              </p>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                SHOP CURATED LIST <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>

            {/* AMAZON - LINK UPDATED */}
            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Amazon Essentials</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-4 italic">
                Workspace gear and grounding tools that support the mental and physical demands of a career shift.
              </p>
              <p className="text-[9px] text-slate-600 leading-tight mb-8 font-light italic uppercase tracking-tighter">Associate Disclosure: Supports the Hearth platform.</p>
              <a href="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE MASTER PROVISION (BLUEPRINT HERO) */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">Master Provision</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          
          <div className="bg-gradient-to-br from-[#1A1423] to-[#0F0A15] border border-teal-500/30 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-teal-500/5 group-hover:text-teal-500/10 transition-colors pointer-events-none">
              <Mountain size={300} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20 italic">Blueprint v1.0</Badge>
                <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">The Horizon Provisions:<br/>Master Strategy Deck</h2>
                <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed italic">
                  One comprehensive blueprint containing the ROE Roadmap, LIRA Conversion, Skill Translation frameworks, and high-conversion networking scripts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={handleDownload}
                    className="h-16 px-10 bg-teal-600 hover:bg-teal-500 active:scale-95 text-black font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-500/10 uppercase tracking-widest text-[11px] group/btn"
                  >
                    Download Provisions <FileDown size={18} className="group-hover/btn:translate-y-0.5 transition-transform" />
                  </button>
                  <button 
                    onClick={handleOpenDeck}
                    className="h-16 px-10 bg-white/5 border border-white/10 active:scale-95 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all uppercase tracking-widest text-[11px]"
                  >
                    Open Slide Deck <Globe size={18} />
                  </button>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="aspect-video rounded-2xl bg-black/40 border border-white/5 p-8 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3 text-teal-400">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest font-sans">Canadian Compliance & ROE</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-400">
                    <Wind size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest font-sans">LIRA / Pension Shielding</span>
                  </div>
                  <div className="flex items-center gap-3 text-orange-400">
                    <Lock size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest font-sans">High-Conversion Networking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DIALECT & ECOSYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Dialect</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group">
              <Languages className="w-5 h-5 text-teal-400 mb-6" />
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Universal Pivot Dictionary</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6 italic font-sans">Translate legacy experience into high-impact corporate operations value.</p>
              <button 
                onClick={() => setShowDictionary(!showDictionary)}
                className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2 transition-colors"
              >
                {showDictionary ? "CLOSE DICTIONARY" : "HARVEST RESOURCE"} <ArrowRight className={`w-3 h-3 transition-transform ${showDictionary ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 whitespace-nowrap font-sans">Ecosystem</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/5 to-transparent" />
            </div>
            <div className="bg-[#1A1423]/50 border border-white/5 p-8 rounded-[2.5rem]">
              <ul className="space-y-4 font-sans">
                {ECOSYSTEM_LINKS.map((link) => (
                  <li key={link.name} className="flex items-center justify-between text-[9px] font-bold text-slate-400 hover:text-teal-400 cursor-pointer border-b border-white/5 pb-3">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex justify-between w-full">
                       {link.name.toUpperCase()} <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* SECTION 4: THE SANCTUARY (EMERGENCY 686868) */}
        <section className="mt-20 border-t border-white/5 pt-20 pb-32">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CRISIS CARD WITH SHORTCODE */}
            <div className="bg-[#1A1423] border border-teal-500/20 p-8 rounded-[2.5rem] flex flex-col relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-transparent opacity-50"></div>
              <Badge className="absolute top-6 right-6 bg-teal-500/10 text-teal-500 border-teal-500/20 italic">24/7 Support</Badge>
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Crisis Text Line</h4>
              <p className="text-[10px] text-slate-400 font-light font-sans leading-relaxed mb-4 italic">
                Free, confidential support via text for anyone in Canada experiencing emotional distress.
              </p>
              
              <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6 text-center">
                <p className="text-[8px] font-black text-teal-500 uppercase tracking-[0.2em] mb-1">Text CONNECT to</p>
                <p className="text-2xl font-black text-white tracking-[0.1em]">686868</p>
              </div>

              <div className="mt-auto">
                <a href="https://www.crisistextline.ca/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  VISIT PORTAL <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Burnout to Balance</h4>
              <p className="text-[10px] text-slate-500 font-light font-sans leading-relaxed mb-8 italic">A recovery guide using goal-hierarchy mapping to reverse professional cynicism.</p>
              <div className="mt-auto">
                <a href="https://campusmentalhealth.ca/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  DOWNLOAD RECOVERY <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Inner Advocate</h4>
              <p className="text-[10px] text-slate-500 font-light font-sans leading-relaxed mb-8 italic">Guided sessions tailored for identity shifts and quieting the inner critic.</p>
              <div className="mt-auto">
                <a href="https://self-compassion.org/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  LISTEN TO SESSIONS <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center pb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-600 italic">Affiliate Reciprocity: We only recommend tools that provide genuine leverage.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;

const TRANSLATIONS = [
  { edu: "Front-line Delivery", ops: "Personalized User Experience (UX) & Scalable Execution" },
  { edu: "Project Individualization", ops: "Custom Stakeholder Requirements & Targeted KPI Development" },
  { edu: "Workflow Planning", ops: "Strategic Product Roadmapping & Lifecycle Management" },
  { edu: "Conflict Resolution", ops: "High-Stakes Stakeholder Facilitation & Resource Optimization" },
  { edu: "Client/Peer Relations", ops: "Cross-Functional Relationship Management (CRM)" },
  { edu: "Continuous Assessment", ops: "Iterative Feedback Loops & Real-time Data Analysis" },
  { edu: "Literary/Social Analysis", ops: "Qualitative Data Synthesis & Sentiment Mapping" }
];

const ECOSYSTEM_LINKS = [
  { name: 'Invest in Canada', url: 'https://www.investcanada.ca' },
  { name: 'Canada Job Bank', url: 'https://www.jobbank.gc.ca' },
  { name: 'MaRS Discovery District', url: 'https://www.marsdd.com' }
];