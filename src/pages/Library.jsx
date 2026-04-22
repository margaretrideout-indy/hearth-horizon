import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  ExternalLink,
  Heart,
  Mic2,
  FileText,
  ShieldAlert,
  Package,
  Book,
  Compass,
  Lock,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import Contact from './Contact';

// --- CONFIGURATION ---
const MAIN_TAG = "hearthandh0a6-20";
const BOOKSHOP_URL = "https://bookshop.org/shop/hearthandhorizon";
const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/edit?slide=id.p1#slide=id.p1";
const AMZ_LEGAL = "As an Amazon Associate I earn from qualifying purchases.";

const AMZ_LISTS = [
  { label: "Horizon Library", id: "3MQJ7V1EQV93P", isFeatured: true },
  { label: "Curiosity Cabinet", id: "3QPCFSBBZX0LS" },
  { label: "Analog Wayfarers", id: "WUQBYPAD7FSN" },
  { label: "Digital Hub", id: "2WS5M8FIVKJBV" },
  { label: "Ergonomic Sanctuary", id: "2BZUUE2ZJL0EL" }
].map(list => ({
  ...list,
  url: `https://www.amazon.ca/hz/wishlist/ls/${list.id}?ref_=wl_share&tag=${MAIN_TAG}`
}));

export default function Library({ vault, onRefresh, isAdmin }) {
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

  const resources = [
    {
      title: "Sanctuary Lifeline",
      description: "A CMHA resource for nurturing mental health through adult life, paired with immediate crisis support.",
      type: "Priority Access",
      icon: PhoneCall,
      color: "text-rose-400",
      link: "https://cmha.ca/wp-content/uploads/2016/02/MH-for-Life-NTNL-brochure-2014-web.pdf",
      crisis: {
        line: "9-8-8",
        label: "Suicide Crisis Helpline — Call or text anytime"
      }
    },
    {
      title: "Burnout to Balance",
      description: "A comprehensive guide to reclaiming your energy and setting sustainable boundaries in a high-pressure world.",
      link: "https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf",
      type: "PDF Guide",
      icon: FileText,
      color: "text-orange-400"
    },
    {
      title: "Your Inner Advocate",
      description: "A podcast dedicated to changing the internal narrative and advocating for your own mental well-being.",
      link: "https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987",
      type: "Podcast",
      icon: Mic2,
      color: "text-teal-400"
    }
  ];

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

            {/* 1. THE SANCTUARY */}
            <section className="space-y-10">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                  <Heart size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-serif italic text-white">The Sanctuary</h2>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Mental Health & Resilience Resources</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className={`group relative p-8 bg-[#110E16] border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all h-full flex flex-col justify-between overflow-hidden ${item.crisis ? 'ring-1 ring-rose-500/20 shadow-lg shadow-rose-500/5' : ''}`}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${item.color}`}>
                            <item.icon size={24} />
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${item.crisis ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-zinc-600 bg-white/5'}`}>
                            {item.type}
                          </span>
                        </div>

                        <h3 className="text-2xl font-serif italic text-zinc-200">{item.title}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: '#686868' }}>
                          {item.description}
                        </p>

                        {item.crisis && (
                          <div className="mt-4 flex flex-col gap-2 px-5 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                            <span className="text-2xl font-black text-rose-500 whitespace-nowrap tracking-tight">
                              {item.crisis.line}
                            </span>
                            <span className="text-[9px] text-rose-200/70 font-bold uppercase tracking-widest leading-tight">
                              {item.crisis.label}
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        asChild
                        variant="ghost"
                        className={`mt-8 w-full rounded-xl border transition-all ${item.crisis ? 'bg-rose-500 text-white hover:bg-rose-600 border-transparent shadow-lg shadow-rose-500/10' : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'}`}
                      >
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          Open Resource <ExternalLink size={14} className="ml-2" />
                        </a>
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2.5rem] bg-teal-500/[0.02] border border-teal-500/10 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="text-teal-500 shrink-0">
                  <ShieldAlert size={32} />
                </div>
                <p className="text-xs text-zinc-400 italic font-serif text-center md:text-left leading-relaxed max-w-2xl">
                  "The Hearth is a tool for navigation, but your internal compass is the final authority. If the weight of the journey feels too heavy, please seek direct support from a licensed professional."
                </p>
              </motion.div>
            </section>

            {/* 2. THE STUDY — AFFILIATE LINKS */}
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
                      className={`p-6 rounded-2xl border transition-all text-left flex-1 ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/30 shadow-lg' : 'bg-black/20 border-white/5 opacity-40 hover:opacity-60'}`}
                    >
                      <Package size={24} className={`mb-4 ${studyTab === 'amazon' ? 'text-teal-400' : 'text-zinc-600'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest block">Provisions</span>
                    </button>
                    <button
                      onClick={() => setStudyTab('books')}
                      className={`p-6 rounded-2xl border transition-all text-left flex-1 ${studyTab === 'books' ? 'bg-purple-500/10 border-purple-500/30 shadow-lg' : 'bg-black/20 border-white/5 opacity-40 hover:opacity-60'}`}
                    >
                      <Book size={24} className={`mb-4 ${studyTab === 'books' ? 'text-purple-400' : 'text-zinc-600'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest block">Archives</span>
                    </button>
                  </div>

                  <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                      {studyTab === 'amazon' ? (
                        <motion.div key="amz" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h4 className="text-3xl text-white font-serif italic mb-4">Curated Gear</h4>
                          <p className="text-zinc-500 mb-6 max-w-lg italic">Hand-picked ergonomic and organizational tools specifically for professional migrants.</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {AMZ_LISTS.map((list) => (
                              <a 
                                key={list.label} 
                                href={list.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`flex items-center justify-between gap-3 bg-black/40 border border-white/10 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:border-teal-500/40 hover:text-teal-400 transition-all 
                                  ${list.isFeatured ? 'sm:col-span-2 border-teal-500/30 bg-teal-500/5 py-6' : ''}`}
                              >
                                <span className="flex items-center gap-2">
                                  {list.isFeatured ? (
                                    <BookOpen size={14} className="text-teal-500" />
                                  ) : (
                                    <Package size={12} className="text-zinc-500" />
                                  )}
                                  {list.label}
                                </span>
                                <ExternalLink size={12} />
                              </a>
                            ))}
                          </div>
                          
                          <p className="text-[8px] text-zinc-700 uppercase italic font-bold tracking-widest">{AMZ_LEGAL}</p>
                        </motion.div>
                      ) : (
                        <motion.div key="books" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                          <h4 className="text-3xl text-white font-serif italic mb-4">The Bookshop</h4>
                          <p className="text-zinc-500 mb-8 max-w-lg italic">Literature and deep-dives into industry culture, ethics, and transition strategy.</p>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <a href={BOOKSHOP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20">
                              Bookshop.org <ArrowRight size={14} />
                            </a>
                            <button disabled className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-zinc-600 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed opacity-50">
                              Indigo — Coming Soon
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. THE LOOKOUT — STRATEGY DECK */}
            <section className="pb-32">
              <div className="mb-12 flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">The Lookout</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="p-12 md:p-16 bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-teal-500/20 rounded-[3.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Compass size={180} />
                </div>
                <div className="relative z-10 space-y-8">
                  <Badge className="bg-teal-500/10 text-teal-400 uppercase font-black px-4 py-1 border-teal-500/20">Premium Resource</Badge>
                  <h4 className="text-4xl md:text-5xl text-white font-serif italic leading-tight max-w-lg">Master Strategy Deck</h4>
                  <p className="text-zinc-400 italic max-w-md text-sm leading-relaxed">The complete architectural blueprint for career migration and resignation protocols.</p>
                  <Button
                    onClick={() => handleResourceClick("Strategy Deck", "Unlock full oversight of your career migration path.", isSeedlingPlus)}
                    className="h-16 px-12 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20"
                  >
                    {isSeedlingPlus
                      ? <a href={STRATEGY_DECK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">Open Blueprint <ExternalLink size={14} /></a>
                      : <><Lock size={14} className="mr-2" /> Unlock Blueprint</>
                    }
                  </Button>
                </div>
              </div>
            </section>

          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="pb-32">
            <Contact vault={vault} isAdmin={isAdmin} isSeedlingPlus={isSeedlingPlus} />
          </motion.div>
        )}

        {/* VOLUME NAV */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-fit px-6">
          <div className="bg-[#16121D]/80 backdrop-blur-xl rounded-full border border-white/10 p-2 shadow-2xl flex gap-2">
            <button
              onClick={() => setCurrentVolume(1)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Volume I
            </button>
            <button
              onClick={() => setCurrentVolume(2)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
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
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed bottom-0 left-0 right-0 bg-[#0D0B10] border-t border-white/10 rounded-t-[3rem] z-[130] p-10 shadow-2xl">
              <div className="max-w-md mx-auto text-center space-y-6">
                <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><Lock className="text-purple-400" size={32} /></div>
                <h3 className="text-3xl font-serif italic text-white">{lockContext.title}</h3>
                <p className="text-sm text-zinc-500 italic leading-relaxed">{lockContext.desc}</p>
                <Button onClick={() => navigate('/grove')} className="w-full h-16 bg-purple-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-600/20">View Tiers</Button>
                <button onClick={() => setShowLockSheet(false)} className="text-[10px] font-black text-zinc-700 hover:text-zinc-500 uppercase tracking-widest mt-4 block mx-auto py-2 transition-colors">Keep Exploring</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}