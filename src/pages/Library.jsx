import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Library as LibraryIcon, ExternalLink, Lock,
  Heart, Phone, Headphones, RefreshCw, X,
  Package, Book, Mountain, Compass, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Provisions from './Contact';

// --- CONFIGURATION ---
const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";
const AMZ_PROVISIONS_URL = "https://www.amazon.ca/hz/wishlist/ls/2BZUUE2ZJL0EL?ref_=list_d_wl_lfu_nav_4";
const BOOKSHOP_URL = "https://bookshop.org/shop/hearthandhorizon";
const AMZ_LEGAL = "As an Amazon Associate I earn from qualifying purchases.";

const Library = ({ vault, isAdmin, onRefresh }) => {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);
  const [studyTab, setStudyTab] = useState('amazon');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLockSheet, setShowLockSheet] = useState(false);

  // --- TIER & ACCESS LOGIC ---
  const isRegistered = !!vault; 
  const userTier = isAdmin ? 'Steward' : (isRegistered ? vault.tier : 'Traveler');
  const isHearthkeeper = isAdmin || (isRegistered && (userTier === 'Hearthkeeper' || userTier === 'Steward'));
  const isSteward = isAdmin || (isRegistered && userTier === 'Steward');

  // --- NATIVE REFRESH LOGIC ---
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* GESTURE REFRESH UI */}
        <div className="flex justify-center h-4 mb-4">
          <motion.div 
            animate={isRefreshing ? { rotate: 360 } : { y: 0 }}
            transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
            className="opacity-40 text-teal-500 cursor-pointer"
            onClick={handleRefresh}
          >
            <RefreshCw size={20} className={isRefreshing ? "" : "hover:scale-110 transition-transform"} />
          </motion.div>
        </div>

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
             <div className={`w-2 h-2 rounded-full ${isRegistered ? 'bg-teal-500 animate-pulse' : 'bg-zinc-600'}`} />
             <span className="text-[10px] font-black uppercase tracking-widest text-white">{userTier} Standing</span>
          </div>
        </header>

        {currentVolume === 1 ? (
          <div className="animate-in fade-in duration-700">
            
            {/* 1. THE SANCTUARY */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 whitespace-nowrap">The Sanctuary</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
            </div>
            <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
                   <Heart className="text-purple-400 mb-6" />
                   <h4 className="text-lg text-white font-serif italic mb-2">Burnout to Balance</h4>
                   <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">A guided roadmap for recovering energy during transition.</p>
                   <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" rel="noreferrer" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20 active:scale-95 transition-transform">View PDF Resource</a>
                </div>
                <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
                   <Headphones className="text-purple-400 mb-6" />
                   <h4 className="text-lg text-white font-serif italic mb-2">Inner Advocate</h4>
                   <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">Podcast series: Navigating professional upheaval.</p>
                   <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" rel="noreferrer" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20 active:scale-95 transition-transform">Listen on Apple</a>
                </div>

                <div className="relative overflow-hidden bg-rose-500/5 border-2 border-rose-500/20 p-8 rounded-[2.5rem] flex flex-col group shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                   <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                       <Phone size={40} className="text-rose-500" />
                   </div>
                   <div className="flex items-center gap-2 mb-6">
                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Urgent Support</span>
                   </div>
                   <h4 className="text-lg text-white font-serif italic mb-2">Crisis Support</h4>
                   <p className="text-[11px] text-zinc-400 italic mb-6 leading-relaxed">Confidential text-based support available 24/7 for mental health emergencies.</p>
                   <div className="mt-auto bg-rose-500 text-white p-5 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-[0.98]">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-1 opacity-80 text-center">Text to Connect</span>
                       <span className="text-2xl font-black tracking-[0.2em]">686868</span>
                   </div>
                </div>
            </section>

            {/* 2. THE BASECAMP */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Basecamp</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <section className="mb-16 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                  <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    <button onClick={() => setStudyTab('amazon')} className={`flex-1 min-w-[140px] p-6 rounded-2xl border text-left transition-all ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                      <Package className="w-5 h-5 mb-4 text-teal-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white block">Wayfarer Provisions</span>
                    </button>
                    <button onClick={() => setStudyTab('reading')} className={`flex-1 min-w-[140px] p-6 rounded-2xl border text-left transition-all ${studyTab === 'reading' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                      <Book className="w-5 h-5 mb-4 text-teal-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white block">Reading List</span>
                    </button>
                  </div>
                  <div className="lg:col-span-3 bg-[#110E16] border border-zinc-800 p-8 md:p-14 rounded-[2.5rem] shadow-2xl min-h-[300px] flex flex-col">
                    {studyTab === 'amazon' ? (
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-3xl text-white font-serif italic mb-4">Wayfarer’s Provisions</h4>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 italic">Curated ergonomic and analog tools selected to support the mental demands of professional migration.</p>
                        <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center px-10 h-16 rounded-xl text-[10px] font-black uppercase tracking-widest bg-teal-500 text-black hover:bg-teal-400 active:scale-95 transition-all w-fit shadow-xl shadow-teal-500/20">BROWSE STOREFRONT <ExternalLink className="ml-2 w-4 h-4" /></a>
                        <p className="mt-auto pt-10 text-[9px] text-zinc-600 font-medium italic uppercase tracking-tighter">{AMZ_LEGAL}</p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-3xl text-white font-serif italic mb-4">Foundational Reading</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                          <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50 flex flex-col">
                             <h5 className="text-[9px] font-black text-teal-500 uppercase tracking-widest mb-4">Domestic</h5>
                             <p className="text-xl text-white font-serif italic mb-2">Indigo Collection</p>
                             <p className="text-[11px] text-zinc-500 italic">Arriving shortly.</p>
                          </div>
                          <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50 flex flex-col">
                             <h5 className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-4">International</h5>
                             <p className="text-xl text-white font-serif italic mb-2">Bookshop.org</p>
                             <p className="text-[11px] text-zinc-500 italic mb-6">Curated shelves for the global migration.</p>
                             <a href={BOOKSHOP_URL} target="_blank" rel="noreferrer" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20 flex items-center justify-center gap-2 hover:bg-purple-500/20 active:scale-95 transition-all">Visit Shop <ExternalLink size={12} /></a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
            </section>

            {/* 3. THE LOOKOUT */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Lookout</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <section className="mb-20">
                <div 
                  onClick={() => !isHearthkeeper && setShowLockSheet(true)}
                  className={`relative w-full max-w-2xl bg-[#16121D] border ${isHearthkeeper ? 'border-teal-500/30' : 'border-white/5'} p-10 md:p-14 rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer group`}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase w-fit italic border border-teal-500/20">Member Gift</div>
                      {!isHearthkeeper && <Lock size={16} className="text-zinc-700" />}
                    </div>
                    <h4 className="text-3xl text-white font-serif italic mb-6 leading-tight">Master Strategy Deck</h4>
                    <p className="text-sm text-zinc-400 italic mb-10 leading-relaxed max-w-md">The primary blueprint for your career migration and resignation protocol.</p>
                    <button 
                      onClick={(e) => {
                        if(isHearthkeeper) {
                          e.stopPropagation();
                          window.open(STRATEGY_DECK_URL, '_blank');
                        }
                      }}
                      className={`h-16 px-10 rounded-2xl flex items-center gap-4 transition-all uppercase text-[10px] tracking-widest font-black ${isHearthkeeper ? 'bg-teal-500 text-black hover:bg-teal-400 active:scale-95' : 'bg-zinc-800 text-zinc-600'}`}
                    >
                      Open Blueprint <Compass size={18} />
                    </button>
                  </div>
                </div>
            </section>
          </div>
        ) : (
          /* THE TRAIL KIT */
          <div className="relative animate-in slide-in-from-right duration-500 pb-20">
             <Provisions 
               vault={vault} 
               isAdmin={isAdmin} 
               currentVolume={currentVolume}
               onRefresh={onRefresh} // Passing refresh logic to Vol II
             />
          </div>
        )}

        {/* VOLUME NAV - STICKY FOR MOBILE THUMB */}
        <div className="fixed bottom-8 left-0 right-0 z-50 px-4 md:static md:bottom-auto md:px-0 md:mt-12 md:pb-12">
          <div className="max-w-md mx-auto flex flex-col items-center gap-4">
            <p className="hidden md:block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic">Navigate the Archives</p>
            <div className="flex w-full gap-2 p-1.5 bg-[#16121D]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
              <button 
                onClick={() => { setCurrentVolume(1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500'}`}
              >
                Volume I
              </button>
              <button 
                onClick={() => {
                  if (isSteward) {
                    setCurrentVolume(2);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  } else {
                    setShowLockSheet(true);
                  }
                }} 
                className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500'}`}
              >
                Volume II {!isSteward && <Lock size={12} />}
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-20 opacity-30 flex justify-between items-center pb-32 md:pb-12">
            <div className="flex items-center gap-2">
                <Mountain size={14} className="text-teal-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Hearth & Horizon 2026</span>
            </div>
            <button onClick={() => navigate(isRegistered ? '/hearth' : '/grove')} className="text-[9px] font-black uppercase tracking-widest hover:text-teal-400 transition-colors">Exit Library</button>
        </footer>
      </div>

      {/* NATIVE LOCK SHEET (Universal Bottom Sheet) */}
      <AnimatePresence>
        {showLockSheet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLockSheet(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[120]"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3rem] z-[130] p-8 pb-12 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-8 px-2">
                <div className="space-y-1">
                  <h3 className="text-2xl font-serif italic text-white leading-tight">Elevated Standing Required</h3>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Master Strategy & Trail Kit Access</p>
                </div>
                <button onClick={() => setShowLockSheet(false)} className="p-2 bg-white/5 rounded-full text-zinc-500"><X size={20} /></button>
              </div>

              <div className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-[2.5rem] mb-8 text-center">
                 <Lock className="mx-auto text-purple-400 mb-4" size={32} />
                 <p className="text-sm text-zinc-300 italic leading-relaxed mb-6">
                   Advanced tactical assets, scripts, and resignation blueprints are reserved for our Steward-tier supporters.
                 </p>
                 <button 
                  onClick={() => navigate('/grove')}
                  className="w-full h-16 rounded-2xl bg-purple-500 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-500/20 active:scale-[0.98]"
                 >
                   Become a Steward
                 </button>
              </div>

              <p className="text-[9px] text-zinc-700 text-center font-bold uppercase tracking-widest">
                Support the Sanctuary for $5 / Month
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;