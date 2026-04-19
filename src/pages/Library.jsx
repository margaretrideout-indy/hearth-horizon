import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, BookOpen, Compass, ExternalLink, 
  Lock, Package, ArrowRight, Mountain, 
  Sparkles, Layers, ShieldCheck, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Provisions from './Contact'; // Ensure this exists

const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1X-u9E_yH_yD0_vL8o_K4-Q4_jJ0z-H4/edit?usp=sharing";
const AMZ_PROVISIONS_URL = "https://www.amazon.ca/shop/margaretpardy";
const BOOKSHOP_URL = "https://bookshop.org/shop/hearthandhorizon";
const AMZ_LEGAL = "As an Amazon Associate I earn from qualifying purchases.";

const Library = ({ vault, onRefresh, isAdmin }) => {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);
  const [studyTab, setStudyTab] = useState('amazon');
  const [showLockSheet, setShowLockSheet] = useState(false);
  const [lockContext, setLockContext] = useState({ title: '', desc: '' });

  const currentTier = vault?.tier?.toLowerCase() || 'none';
  const isRegistered = currentTier !== 'none' && currentTier !== 'traveler';
  const isSeedlingPlus = isAdmin || isRegistered || currentTier === 'admin' || currentTier === 'steward';

  const handleResourceClick = (title, desc, isUnlocked) => {
    if (!isUnlocked) {
      setLockContext({ title, desc });
      setShowLockSheet(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/30 overflow-x-hidden relative">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-48 relative z-10">
        
        {/* HEADER */}
        <header className="mb-24 text-left">
          <div className="flex items-center gap-3 text-teal-500/80 mb-6">
            <BookOpen size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">The Reference Archives</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none mb-8">
            The <span className="text-zinc-800 font-sans not-italic font-extralight uppercase">Library</span>
          </h1>
          <p className="max-w-xl text-zinc-500 text-sm leading-relaxed italic border-l border-teal-500/20 pl-6">
            A curated collection of strategic blueprints, provisioned tools, and archival literature to support your professional migration.
          </p>
        </header>

        {currentVolume === 1 ? (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-32">
            
            {/* 1. THE STUDY */}
            <section>
              <div className="mb-12 flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">The Study</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="bg-[#110E16]/60 border border-white/5 rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-4 flex gap-4 md:flex-col">
                      <button 
                        onClick={() => setStudyTab('amazon')}
                        className={`p-6 rounded-2xl border transition-all text-left flex-1 ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-black/20 border-white/5 opacity-40'}`}
                      >
                        <Package size={24} className="mb-4 text-teal-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest block">Provisions</span>
                      </button>
                      <button 
                        onClick={() => setStudyTab('books')}
                        className={`p-6 rounded-2xl border transition-all text-left flex-1 ${studyTab === 'books' ? 'bg-purple-500/10 border-purple-500/30' : 'bg-black/20 border-white/5 opacity-40'}`}
                      >
                        <Book size={24} className="mb-4 text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest block">Archives</span>
                      </button>
                    </div>

                    <div className="lg:col-span-8">
                       <AnimatePresence mode="wait">
                        {studyTab === 'amazon' ? (
                          <motion.div key="amz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <h4 className="text-3xl text-white font-serif italic mb-4">Curated Gear</h4>
                            <p className="text-zinc-500 mb-8 max-w-lg">Hand-picked ergonomic and organizational tools specifically for professional migrants.</p>
                            <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-teal-500 text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-400 transition-all">
                              Visit Storefront <ExternalLink size={14} />
                            </a>
                            <p className="mt-8 text-[8px] text-zinc-700 uppercase italic font-bold">{AMZ_LEGAL}</p>
                          </motion.div>
                        ) : (
                          <motion.div key="books" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <h4 className="text-3xl text-white font-serif italic mb-4">The Bookshop</h4>
                            <p className="text-zinc-500 mb-8 max-w-lg">Literature and deep-dives into industry culture, ethics, and transition strategy.</p>
                            <a href={BOOKSHOP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-purple-500 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-400 transition-all">
                              View archives <ArrowRight size={14} />
                            </a>
                          </motion.div>
                        )}
                       </AnimatePresence>
                    </div>
                  </div>
              </div>
            </section>

            {/* 2. THE LOOKOUT */}
            <section className="pb-32">
              <div className="mb-12 flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">The Lookout</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <Card className="p-12 md:p-16 bg-gradient-to-br from-[#16121D] to-[#0D0B10] border-teal-500/20 rounded-[3.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Compass size={180} />
                </div>
                <div className="relative z-10 space-y-8">
                  <Badge className="bg-teal-500/10 text-teal-400 uppercase font-black px-4 py-1">Premium Resource</Badge>
                  <h4 className="text-4xl md:text-5xl text-white font-serif italic leading-tight max-w-lg">Master Strategy Deck</h4>
                  <p className="text-zinc-400 italic max-w-md">The complete architectural blueprint for career migration and resignation protocols.</p>
                  <Button 
                    onClick={() => handleResourceClick("Strategy Deck", "Unlock full oversight of your career migration path.", isSeedlingPlus)}
                    className="h-16 px-12 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20"
                  >
                    {isSeedlingPlus ? "Open Blueprint" : <><Lock size={14} className="mr-2" /> Unlock Blueprint</>}
                  </Button>
                </div>
              </Card>
            </section>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="pb-32">
             <Provisions vault={vault} isAdmin={isAdmin} isSeedlingPlus={isSeedlingPlus} />
          </motion.div>
        )}

        {/* VOLUME NAV */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-fit px-6">
          <div className="bg-[#16121D]/80 backdrop-blur-xl rounded-full border border-white/10 p-2 shadow-2xl flex gap-2">
            <button 
              onClick={() => setCurrentVolume(1)} 
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500'}`}
            >
              Volume I
            </button>
            <button 
              onClick={() => setCurrentVolume(2)} 
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500'}`}
            >
              Volume II
            </button>
          </div>
        </div>
      </div>

      {/* LOCK SHEET */}
      <AnimatePresence>
        {showLockSheet && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLockSheet(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[120]" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3rem] z-[130] p-10 shadow-2xl">
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8"><Lock className="text-purple-400" size={32} /></div>
                <h3 className="text-3xl font-serif italic text-white">{lockContext.title}</h3>
                <p className="text-sm text-zinc-500 italic leading-relaxed">{lockContext.desc}</p>
                <Button onClick={() => navigate('/grove')} className="w-full h-16 bg-purple-600 text-white font-black uppercase tracking-widest rounded-2xl">View Tiers</Button>
                <button onClick={() => setShowLockSheet(false)} className="text-[10px] font-black text-zinc-700 uppercase tracking-widest mt-4 block mx-auto">Keep Exploring</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;