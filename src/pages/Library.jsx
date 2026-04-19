import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Library as LibraryIcon, ExternalLink, Lock,
  Heart, Phone, Headphones, RefreshCw, X,
  Package, Book, Mountain, Compass, ChevronUp, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component import for Volume II content
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
  const [lockContext, setLockContext] = useState({ title: '', desc: '', target: 'Seedling' });

  // --- REBUILT ACCESS LOGIC ---
  const normalizedTier = vault?.tier?.toLowerCase() || 'none';
  const isRegistered = !!vault && normalizedTier !== 'none';
  
  // MASTER BYPASS: If you are Admin or Founder, all gates open.
  const isMasterAdmin = isAdmin === true || normalizedTier === 'admin' || vault?.standing === 'Founder';
  
  // Tier Check for Volume 2
  const isSeedlingPlus = isMasterAdmin || isRegistered; 

  const userTierLabel = isMasterAdmin ? 'Founder' : (isRegistered ? vault.tier : 'Traveler');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const triggerLock = (type) => {
    setLockContext({
      title: 'Higher Standing Required',
      desc: 'This specific tactical asset is reserved for our Hearthkeeper and Steward community members.',
      target: type === 'steward' ? 'Steward' : 'Hearthkeeper'
    });
    setShowLockSheet(true);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 relative z-10 text-left">

        {/* REFRESH ICON */}
        <div className="flex justify-center h-8 mb-4">
          <motion.div 
            animate={isRefreshing ? { rotate: 360 } : { y: 0 }}
            transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
            className="text-teal-500/40 cursor-pointer"
            onClick={handleRefresh}
          >
            <RefreshCw size={24} className={isRefreshing ? "" : "hover:scale-110 transition-transform active:rotate-180"} />
          </motion.div>
        </div>

        {/* HEADER */}
        <header className="mb-12 border-b border-white/5 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/5 flex items-center justify-center text-teal-400 border border-teal-500/10 shadow-inner">
                <LibraryIcon size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-serif italic text-white tracking-tight leading-none mb-1">
                  The Library
                </h1>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] italic">
                  Volume {currentVolume === 1 ? 'I' : 'II'}: {currentVolume === 1 ? 'Sanctuary & Basecamp' : 'Tactical Assets'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-2 rounded-2xl border border-white/5 bg-[#16121D]/50 backdrop-blur-sm flex items-center gap-3">
             <div className={`w-2 h-2 rounded-full ${isMasterAdmin || isRegistered ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'bg-zinc-600'}`} />
             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{userTierLabel} Standing</span>
          </div>
        </header>

        {currentVolume === 1 ? (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-20">
            {/* 1. THE SANCTUARY */}
            <section>
              <div className="mb-8 flex items-center gap-4 text-left">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 whitespace-nowrap">The Sanctuary</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#16121D] border border-white/5 p-8 rounded-[2.5rem] flex flex-col group hover:border-purple-500/20 transition-all">
                   <Heart className="text-purple-400/50 group-hover:text-purple-400 transition-colors mb-6" size={24} />
                   <h4 className="text-xl text-white font-serif italic mb-2">Burnout to Balance</h4>
                   <p className="text-xs text-zinc-500 italic mb-8 leading-relaxed">A guided roadmap for recovering energy during transition.</p>
                   <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" rel="noreferrer" className="mt-auto py-4 bg-white/5 text-purple-400 rounded-2xl text-[9px] font-black uppercase text-center border border-purple-500/10 hover:bg-purple-500/10 transition-all">View PDF Resource</a>
                </div>
                <div className="bg-[#16121D] border border-white/5 p-8 rounded-[2.5rem] flex flex-col group hover:border-purple-500/20 transition-all">
                   <Headphones className="text-purple-400/50 group-hover:text-purple-400 transition-colors mb-6" size={24} />
                   <h4 className="text-xl text-white font-serif italic mb-2">Inner Advocate</h4>
                   <p className="text-xs text-zinc-500 italic mb-8 leading-relaxed">Podcast series: Navigating professional upheaval and self-worth.</p>
                   <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" rel="noreferrer" className="mt-auto py-4 bg-white/5 text-purple-400 rounded-2xl text-[9px] font-black uppercase text-center border border-purple-500/10 hover:bg-purple-500/10 transition-all">Listen on Apple</a>
                </div>
                <div className="relative overflow-hidden bg-rose-500/[0.03] border border-rose-500/20 p-8 rounded-[2.5rem] flex flex-col group shadow-lg shadow-rose-500/5">
                   <div className="flex items-center gap-2 mb-6">
                       <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Crisis Support</span>
                   </div>
                   <h4 className="text-xl text-white font-serif italic mb-2">Mental Health Safe-Space</h4>
                   <p className="text-xs text-zinc-400 italic mb-8 leading-relaxed">Confidential text support available 24/7 for emergencies.</p>
                   <div className="mt-auto bg-rose-500 text-white p-6 rounded-2xl flex flex-col items-center justify-center transition-all active:scale-95 shadow-xl shadow-rose-500/20">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-1 opacity-70">Text to Connect</span>
                       <span className="text-3xl font-black tracking-widest leading-none">686868</span>
                   </div>
                </div>
              </div>
            </section>

            {/* 2. THE BASECAMP */}
            <section>
              <div className="mb-8 flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Basecamp</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="flex lg:flex-col gap-2 p-1.5 bg-[#16121D] border border-white/5 rounded-3xl overflow-x-auto scrollbar-hide">
                    <button onClick={() => setStudyTab('amazon')} className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl transition-all ${studyTab === 'amazon' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/10' : 'text-zinc-500 hover:bg-white/5'}`}>
                      <Package size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Wayfarer Provisions</span>
                    </button>
                    <button onClick={() => setStudyTab('reading')} className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl transition-all ${studyTab === 'reading' ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/10' : 'text-zinc-500 hover:bg-white/5'}`}>
                      <Book size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Reading List</span>
                    </button>
                  </div>
                  <div className="lg:col-span-3 bg-gradient-to-br from-[#110E16] to-[#0A080D] border border-white/5 p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden min-h-[400px]">
                    <div className="absolute top-0 right-0 p-12 text-teal-500/5 rotate-12 pointer-events-none">
                        {studyTab === 'amazon' ? <Package size={180} /> : <Book size={180} />}
                    </div>
                    <AnimatePresence mode="wait">
                      {studyTab === 'amazon' ? (
                        <motion.div key="amz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-10 flex flex-col h-full">
                          <h4 className="text-4xl text-white font-serif italic mb-6 leading-tight">Provisions</h4>
                          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 italic max-w-lg">Curated ergonomic tools and analog systems selected to support professional migration.</p>
                          <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-teal-500 text-black hover:bg-teal-400 active:scale-95 transition-all w-fit shadow-2xl shadow-teal-500/20">
                            Visit Storefront <ExternalLink className="ml-3 w-4 h-4" />
                          </a>
                          <p className="mt-12 text-[8px] text-zinc-600 font-bold uppercase tracking-widest max-w-xs">{AMZ_LEGAL}</p>
                        </motion.div>
                      ) : (
                        <motion.div key="book" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="relative z-10">
                          <h4 className="text-4xl text-white font-serif italic mb-8 leading-tight">Archives</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 group">
                               <p className="text-xs text-teal-500 font-black uppercase tracking-widest mb-2">Domestic</p>
                               <p className="text-xl text-white font-serif italic mb-4">Indigo Collection</p>
                               <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Cataloging In Progress</span>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 group hover:border-purple-500/30 transition-all">
                               <p className="text-xs text-purple-500 font-black uppercase tracking-widest mb-2">Global</p>
                               <p className="text-xl text-white font-serif italic mb-4">Bookshop.org</p>
                               <a href={BOOKSHOP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] text-purple-400 font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                                 View Shop <ArrowRight size={14} />
                               </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
              </div>
            </section>

            {/* 3. THE LOOKOUT */}
            <section className="pb-32">
              <div className="mb-8 flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Lookout</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative w-full max-w-2xl bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-teal-500/20 p-10 md:p-16 rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer group"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="bg-teal-500/10 text-teal-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic border border-teal-500/20 shadow-lg">Strategic Resource</div>
                  </div>
                  <h4 className="text-4xl text-white font-serif italic mb-6 leading-tight">Master Strategy Deck</h4>
                  <p className="text-sm text-zinc-400 italic mb-12 leading-relaxed max-w-md">The primary blueprint for your career migration and resignation protocol.</p>
                  <button 
                    onClick={() => window.open(STRATEGY_DECK_URL, '_blank')}
                    className="h-16 px-10 rounded-2xl flex items-center gap-4 transition-all uppercase text-[10px] tracking-widest font-black bg-teal-500 text-black shadow-xl shadow-teal-500/20"
                  >
                    Open Blueprint <Compass size={18} />
                  </button>
                </div>
              </motion.div>
            </section>
          </motion.div>
        ) : (
          /* VOLUME II CONTENT */
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="pb-32">
             <Provisions 
               vault={vault} 
               isAdmin={isAdmin} 
               isSeedlingPlus={isSeedlingPlus}
               onRefresh={onRefresh}
             />
          </motion.div>
        )}

        {/* VOLUME NAV */}
        <div className="fixed bottom-6 left-0 right-0 z-[110] px-6 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <div className="flex p-2 bg-[#16121D]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <button 
                onClick={() => { setCurrentVolume(1); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
                className={`flex-1 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Volume I
              </button>
              <button 
                onClick={() => {
                  setCurrentVolume(2);
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }} 
                className={`flex-1 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Volume II
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-20 opacity-30 flex flex-col md:flex-row gap-6 justify-between items-center pb-20">
            <div className="flex items-center gap-3">
                <Mountain size={16} className="text-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Hearth & Horizon © 2026</span>
            </div>
            <button onClick={() => navigate(isRegistered ? '/hearth' : '/grove')} className="text-[10px] font-black uppercase tracking-widest px-6 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all">Exit Library</button>
        </footer>
      </div>

      <AnimatePresence>
        {showLockSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLockSheet(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3rem] z-[130] p-8 pb-16 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
              <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-10" />
              <div className="max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/20 shadow-inner">
                  <Lock className="text-purple-400" size={32} />
                </div>
                <h3 className="text-3xl font-serif italic text-white mb-4">{lockContext.title}</h3>
                <p className="text-sm text-zinc-400 italic leading-relaxed mb-10 px-4">{lockContext.desc}</p>
                <button onClick={() => navigate('/grove')} className="w-full py-6 rounded-2xl bg-purple-500 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/30 active:scale-95 transition-all mb-8">
                  Check Standing
                </button>
                <button onClick={() => setShowLockSheet(false)} className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors">Keep Exploring</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;