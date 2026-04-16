import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, ExternalLink, Lock, 
  Heart, Phone, Headphones, 
  Package, Book, Mountain, Compass, ArrowRight
} from 'lucide-react';

import Provisions from './Contact';

// --- CONFIGURATION ---
const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";
const AMZ_PROVISIONS_URL = "https://www.amazon.ca/hz/wishlist/ls/2BZUUE2ZJL0EL?ref_=list_d_wl_lfu_nav_4";
const AMZ_LEGAL = "As an Amazon Associate I earn from qualifying purchases.";

const Library = ({ vault, isAdmin }) => {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);
  const [studyTab, setStudyTab] = useState('amazon');

  // TIER LOGIC
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                <LibraryIcon size={20} />
              </div>
              <h1 className="text-2xl md:text-3xl font-serif italic text-white tracking-tight">
                The Library: Vol. {currentVolume === 1 ? 'I' : 'II'}
              </h1>
            </div>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] italic">
              {currentVolume === 1 ? 'Sanctuary, Basecamp & The Lookout' : 'Trail Kit: Tactical Assets'}
            </p>
          </div>
          <div className="px-5 py-2 rounded-2xl border border-zinc-800 bg-[#16121D] flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">{userTier} Standing</span>
          </div>
        </header>

        {currentVolume === 1 ? (
          <div className="animate-in fade-in duration-700">
            
            {/* 1. THE SANCTUARY (All Tiers) */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 whitespace-nowrap">The Sanctuary</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
            </div>
            <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col">
                   <Heart className="text-purple-400 mb-6" />
                   <h4 className="text-lg text-white font-serif italic mb-2">Burnout to Balance</h4>
                   <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">A guided roadmap for recovering energy during transition.</p>
                   <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20">View PDF Resource</a>
                </div>
                <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col">
                   < Headphones className="text-purple-400 mb-6" />
                   <h4 className="text-lg text-white font-serif italic mb-2">Inner Advocate</h4>
                   <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">Podcast series: Navigating professional upheaval.</p>
                   <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20">Listen on Apple</a>
                </div>

                <div className="relative overflow-hidden bg-rose-500/5 border-2 border-rose-500/20 p-8 rounded-[2.5rem] flex flex-col group shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                   <div className="absolute top-0 right-0 p-4 opacity-20">
                       <Phone size={40} className="text-rose-500" />
                   </div>
                   <div className="flex items-center gap-2 mb-6">
                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Urgent Support</span>
                   </div>
                   <h4 className="text-lg text-white font-serif italic mb-2">Crisis Support</h4>
                   <p className="text-[11px] text-zinc-400 italic mb-6 leading-relaxed">Confidential text-based support available 24/7 for mental health emergencies.</p>
                   <div className="mt-auto bg-rose-500 text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-all">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-1 opacity-80 text-center">Text to Connect</span>
                       <span className="text-2xl font-black tracking-[0.2em]">686868</span>
                   </div>
                </div>
            </section>

            {/* 2. THE BASECAMP (All Tiers) */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Basecamp</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                 <div className="space-y-3">
                   <button onClick={() => setStudyTab('amazon')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                     <Package className="w-5 h-5 mb-4 text-teal-400" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white block">Wayfarer Provisions</span>
                   </button>
                   <button onClick={() => setStudyTab('reading')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'reading' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                     <Book className="w-5 h-5 mb-4 text-teal-400" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white block">Reading List</span>
                   </button>
                 </div>
                 <div className="lg:col-span-3 bg-[#110E16] border border-zinc-800 p-10 md:p-14 rounded-[2.5rem] shadow-2xl min-h-[300px] flex flex-col">
                   {studyTab === 'amazon' ? (
                     <div className="flex-1 flex flex-col">
                       <h4 className="text-3xl text-white font-serif italic mb-4">Wayfarer’s Provisions</h4>
                       <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 italic">Curated ergonomic and analog tools selected to support the mental demands of professional migration.</p>
                       <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center px-10 h-16 rounded-xl text-[10px] font-black uppercase tracking-widest bg-teal-500 text-black hover:bg-teal-400 transition-all w-fit">BROWSE STOREFRONT <ExternalLink className="ml-2 w-4 h-4" /></a>
                       <p className="mt-auto pt-10 text-[9px] text-zinc-600 font-medium italic uppercase tracking-tighter">{AMZ_LEGAL}</p>
                     </div>
                   ) : (
                     <div>
                       <h4 className="text-3xl text-white font-serif italic mb-4">Foundational Reading</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                         <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50">
                            <h5 className="text-[9px] font-black text-teal-500 uppercase tracking-widest mb-4">Domestic</h5>
                            <p className="text-xl text-white font-serif italic mb-2">Indigo Collection</p>
                            <p className="text-[11px] text-zinc-500 italic">Arriving shortly.</p>
                         </div>
                         <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50">
                            <h5 className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-4">International</h5>
                            <p className="text-xl text-white font-serif italic mb-2">Bookshop.org</p>
                            <p className="text-[11px] text-zinc-500 italic">Finalizing the shelves.</p>
                         </div>
                       </div>
                     </div>
                   )}
                 </div>
            </section>

            {/* 3. THE LOOKOUT (Hearthkeeper & Steward Only) */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Lookout</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <section className="mb-20">
                <div className="relative w-full max-w-2xl bg-[#16121D] border border-teal-500/30 p-10 md:p-14 rounded-[3rem] overflow-hidden shadow-2xl">
                  {!isHearthkeeper && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                      <Lock size={32} className="text-teal-500/40 mb-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">Hearthkeeper standing required</span>
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase w-fit mb-8 italic border border-teal-500/20">Member Gift</div>
                    <h4 className="text-3xl text-white font-serif italic mb-6 leading-tight">Master Strategy Deck</h4>
                    <p className="text-sm text-zinc-400 italic mb-10 leading-relaxed max-w-md">The primary blueprint for your career migration and resignation protocol. A tactical guide to leaving the public sector with grace.</p>
                    <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="h-16 px-10 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-2xl flex items-center gap-4 transition-all uppercase text-[10px] tracking-widest">Open Blueprint <Compass size={18} /></button>
                  </div>
                </div>
            </section>
          </div>
        ) : (
          /* THE TRAIL KIT (Volume II) */
          <div className="relative animate-in slide-in-from-right duration-500">
             {!isSteward && (
                <div className="absolute inset-0 z-50 bg-[#0A080D]/95 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center min-h-[60vh]">
                   <Mountain size={48} className="text-purple-500/20 mb-6" />
                   <h2 className="text-2xl font-serif italic text-white mb-4">The Trail Kit is for Stewards</h2>
                   <p className="text-sm text-zinc-500 mb-8 max-w-sm">Advanced tactical assets, scripts, and templates are reserved for our $5/month supporters.</p>
                   <button onClick={() => navigate('/upgrade')} className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Upgrade to Steward</button>
                </div>
             )}
             <Provisions 
               vault={vault} 
               isAdmin={isAdmin} 
               onNavigate={(target) => setCurrentVolume(target === 'library' ? 1 : 2)} 
             />
          </div>
        )}

        {/* VOLUME NAV */}
        <div className="mt-12 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic">Navigate the Archives</p>
          <div className="flex gap-4 p-2 bg-[#16121D] rounded-3xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setCurrentVolume(1)} 
              className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              Volume I: Basecamp
            </button>
            <button 
              onClick={() => setCurrentVolume(2)} 
              className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              Volume II: Trail Kit
            </button>
          </div>
        </div>

        <footer className="mt-20 opacity-30 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Mountain size={14} className="text-teal-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Hearth & Horizon 2026</span>
            </div>
            <button onClick={() => navigate('/hearth')} className="text-[9px] font-black uppercase tracking-widest hover:text-teal-400 transition-colors">Exit Library</button>
        </footer>
      </div>
    </div>
  );
};

export default Library;