import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag,
  Wind, Lock, Mountain, MessageSquare, Sparkles,
  Zap, Compass, Layers
} from 'lucide-react';

const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors ${className}`}>
    {children}
  </span>
);

const Library = ({ vault }) => {
  const navigate = useNavigate();
  
  const userTier = vault?.tier || 'Seedling';
  const isHearthkeeper = userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = userTier === 'Steward';

  const openDeck = () => {
    window.open(STRATEGY_DECK_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 p-4 sm:p-6 md:p-12 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10 md:pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight leading-none">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-zinc-500 font-light italic">
              A curated ecosystem of tools and blueprints for the intentional professional migration.
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

        {/* Master Provision Section */}
        <section className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">Core Provision</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          
          <div className="bg-gradient-to-br from-[#110E16] to-[#0A080D] border border-teal-500/30 p-8 sm:p-10 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 text-teal-500/5 group-hover:text-teal-500/10 transition-colors pointer-events-none">
              <Mountain size={400} className="w-64 h-64 md:w-96 md:h-96" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 italic">
                  <Sparkles size={10} className="mr-1.5" /> Foundational Gift
                </Badge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-white leading-tight">The Horizon Provisions:<br/>Master Strategy Deck</h2>
                <button 
                  onClick={openDeck}
                  className="h-16 px-12 bg-teal-500 hover:bg-teal-400 active:scale-95 text-[#0A080D] font-black rounded-2xl flex items-center justify-center gap-4 transition-all shadow-lg shadow-teal-500/20 uppercase tracking-[0.2em] text-[10px] group/btn w-full sm:w-auto"
                >
                  Open Blueprint <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform shrink-0" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <ShieldCheck size={18} />, label: "Canadian Compliance & ROE", color: "text-teal-400" },
                  { icon: <Wind size={18} />, label: "LIRA / Pension Shielding", color: "text-purple-400" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-black/40 border border-white/5 p-5 rounded-2xl">
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Canopy Hub - Balanced Two-Card Layout */}
        <section className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500/60 whitespace-nowrap">The Canopy Hub</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Hearthkeeper Provisions Card */}
            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all flex flex-col min-h-[450px]">
              {!isHearthkeeper && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[8px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-6 h-6 text-teal-500/50 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500 mb-6 font-sans">Hearthkeeper Stand Required</p>
                  <button onClick={() => navigate('/grove')} className="px-8 py-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-[9px] font-black uppercase tracking-widest text-teal-400 hover:bg-teal-500 hover:text-black transition-all">Upgrade Standing</button>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/5 text-teal-400 flex items-center justify-center border border-teal-500/10">
                  <Zap size={24} />
                </div>
                <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20">Tactical Survival Kit</Badge>
              </div>

              <h4 className="text-2xl text-white font-serif italic mb-4 leading-tight">Hearthkeeper Provisions</h4>
              <p className="text-xs text-zinc-500 font-light italic leading-relaxed mb-10">Operational tools designed for the immediate demands of professional pivoting.</p>

              <div className="space-y-3">
                {[
                  { title: "Tactical Outreach Scripts", type: "PDF / Template", icon: <MessageSquare size={14} /> },
                  { title: "Identity Reframing Dictionary", type: "Reference Guide", icon: <Layers size={14} /> },
                  { title: "The Coffee Chat Protocol", type: "System", icon: <Compass size={14} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-teal-500/20 cursor-pointer group/item transition-all">
                    <div className="flex items-center gap-3">
                      <div className="text-teal-500/40 group-hover/item:text-teal-400">{item.icon}</div>
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{item.title}</span>
                    </div>
                    <span className="text-[8px] font-black text-zinc-600 group-hover/item:text-teal-500 uppercase">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steward Provisions Card */}
            <div className="bg-[#110E16]/40 border border-zinc-800 p-8 rounded-[2.5rem] relative group hover:border-purple-500/30 transition-all flex flex-col min-h-[450px]">
              {!isSteward && (
                <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-[8px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center transition-all">
                  <Lock className="w-6 h-6 text-purple-500/50 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 mb-6 font-sans">Steward Standing Required</p>
                  <button onClick={() => navigate('/grove')} className="px-8 py-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-[9px] font-black uppercase tracking-widest text-purple-400 hover:bg-purple-500 hover:text-black transition-all">Upgrade Standing</button>
                </div>
              )}
              
              <div className="flex justify-between items-start mb-10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/5 text-purple-400 flex items-center justify-center border border-purple-500/10">
                  <Mountain size={24} />
                </div>
                <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20">Strategic Intelligence</Badge>
              </div>

              <h4 className="text-2xl text-white font-serif italic mb-4 leading-tight">Steward Provisions</h4>
              <p className="text-xs text-zinc-500 font-light italic leading-relaxed mb-10">High-level ecosystem topography for long-term industry mastery and sponsorship.</p>

              <div className="space-y-3">
                {[
                  { title: "Ecosystem Topography Map", type: "Intelligence", icon: <Layers size={14} /> },
                  { title: "The Sponsorship Framework", type: "Leadership", icon: <Sparkles size={14} /> },
                  { title: "Market Alignment Ledger", type: "Data", icon: <ShieldCheck size={14} /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/20 cursor-pointer group/item transition-all">
                    <div className="flex items-center gap-3">
                      <div className="text-purple-500/40 group-hover/item:text-purple-400">{item.icon}</div>
                      <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{item.title}</span>
                    </div>
                    <span className="text-[8px] font-black text-zinc-600 group-hover/item:text-purple-500 uppercase">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* The Study Section */}
        <section className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#110E16]/40 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative">
              <Book className="w-8 h-8 text-purple-400 mb-8" />
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Indigo.ca Curated List</h4>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white">
                SHOP CURATED LIST <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>

            <div className="bg-[#110E16]/40 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-purple-500/30 transition-all group relative">
              <Package className="w-8 h-8 text-purple-400 mb-8" />
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Amazon Essentials</h4>
              <a href="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-600/10 text-purple-400 border border-purple-500/20 hover:bg-purple-600 hover:text-white">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* The Sanctuary Section */}
        <section id="sanctuary" className="border-t border-white/5 pt-16 pb-20 md:pb-32">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#110E16]/60 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col relative group overflow-hidden hover:border-teal-500/30 transition-all">
              <Badge className="absolute top-6 right-6 bg-teal-500/10 text-teal-400 border border-teal-500/20 italic">Crisis Support</Badge>
              <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-8 text-center shadow-inner mt-8">
                <p className="text-[8px] font-black text-teal-500 uppercase tracking-[0.2em] mb-1 opacity-60">Text Support (Canada)</p>
                <p className="text-2xl font-black text-white tracking-[0.2em]">686868</p>
              </div>
              <a href="https://www.canada.ca/en/public-health/topics/improving-your-mental-health.html" target="_blank" rel="noopener noreferrer" className="mt-auto text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2 group/link">
                VISIT PORTAL <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center pb-12">
          <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-4 h-4 text-zinc-700" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-600 italic max-w-sm text-center">
              Affiliate Reciprocity: We only recommend tools that provide genuine leverage. Contributions support the Scholarship Seat program.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;