import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, ExternalLink, Lock, 
  MessageSquare, Zap, Heart, Phone, Headphones, 
  Package, Book, Check, Copy, Layers, Mountain
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
  const [copiedId, setCopiedId] = useState(null);

  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isSteward = isAdmin || userTier === 'Steward';

  const protocols = {
    sponsorship: [
      { id: 'sp_1', label: 'PHASE 1: THE CURIOSITY GAP', text: "I've been following your work in [Field] and noticed your transition from [Previous Sector]. As I'm currently navigating a similar migration, I'd love to hear the one thing you wish you knew during your first 90 days. Would you be open to a 15-minute sync?", desc: "Initial cold outreach to establish a peer-to-peer connection." },
      { id: 'sp_2', label: 'PHASE 2: THE "GHOSTED" FOLLOW-UP', text: "I imagine your week is at capacity, so I wanted to surface this one last time. If a sync isn't possible, I'd still value any quick thought on [Specific Industry Trend]. Regardless, I'll keep following your work at [Company]!", desc: "Low-pressure nudge 7 days after no response." },
      { id: 'sp_3', label: 'PHASE 3: THE STRATEGIC ASK', text: "I’ve spent the last month refining my portfolio based on our talk. I’m now targeting [Specific Company/Role]. Given your standing, would you feel comfortable sharing my profile with the hiring team? I've attached a brief 'blurb' to make a forward easy.", desc: "The pivot from seeking advice to seeking advocacy." },
      { id: 'sp_4', label: 'PHASE 4: THE READY-TO-SHIP BLURB', text: "[Name] is a curriculum expert with 13 years of experience currently specializing in AI data alignment. They have a unique ability to translate complex pedagogy into technical datasets. Here is their portfolio for the [Role]—I highly recommend a look.", desc: "Give this to your sponsor so they can copy/paste it into an email." }
    ],
    negotiation: [
      { id: 'neg_1', label: 'THE ANCHORING SCRIPT', text: "Based on the specialized nature of this role and my 13 years of expertise, I’m looking for a total compensation package in the range of [X] to [Y]. This reflects the immediate ROI I bring in translating complex frameworks for your models.", desc: "Setting the floor during the first mention of numbers." },
      { id: 'neg_2', label: 'THE TOTAL REWARDS PIVOT', text: "I understand the base salary is firm at [Amount]. To align with the market rate for this level of expertise, I’d like to discuss an accelerated 6-month review, an increased signing bonus, or a dedicated professional development stipend.", desc: "Used when the base salary budget is strictly capped." },
      { id: 'neg_3', label: 'THE "SPECIFICITY" LEVER', text: "The opportunity at [Company] is my top choice. However, I am currently in the final stages with another firm at a [Amount] price point. If we can reach [Desired Amount], I am prepared to sign the offer today and withdraw from other loops.", desc: "High-leverage script for closing the deal with multiple offers." },
      { id: 'neg_4', label: 'THE EQUITY / BONUS BRIDGE', text: "Since this is a transition role for me, I am willing to be flexible on the base salary if we can bridge the gap via [Performance Bonus/Equity/Options] tied to [Specific Milestone]. This ensures our incentives are perfectly aligned from Day 1.", desc: "Trading guaranteed cash for performance-based upside." }
    ]
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
              <h1 className="text-2xl md:text-3xl font-serif italic text-white tracking-tight">The Library: Vol. I</h1>
            </div>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em] italic">Sanctuary, Study & Strategic Provisions</p>
          </div>
          <div className="px-5 py-2 rounded-2xl border border-zinc-800 bg-[#16121D] flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
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
               <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col">
                  <Heart className="text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif italic mb-2">Burnout to Balance</h4>
                  <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">A guided roadmap for recovering energy during transition.</p>
                  <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20">View PDF Resource</a>
               </div>
               <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col">
                  <Headphones className="text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif italic mb-2">Inner Advocate</h4>
                  <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">Podcast series: Navigating professional upheaval.</p>
                  <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" className="mt-auto py-3 bg-purple-500/10 text-purple-400 rounded-xl text-[9px] font-black uppercase text-center border border-purple-500/20">Listen on Apple</a>
               </div>
               <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col">
                  <Phone className="text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif italic mb-2">Crisis Support</h4>
                  <p className="text-[11px] text-zinc-500 italic mb-6 leading-relaxed">Confidential text-based support 24/7.</p>
                  <div className="mt-auto py-4 bg-black/40 rounded-xl text-[10px] font-black text-center text-zinc-500 border border-white/5 tracking-[0.2em]">TEXT 686868</div>
               </div>
            </section>

            {/* 2. THE STUDY */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Study</h3>
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
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                          <h4 className="text-3xl text-white font-serif italic">Foundational Reading</h4>
                          <p className="text-sm text-zinc-500 italic mt-2">Pivotal literature on career migration, resilience, and identity.</p>
                        </div>
                        <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-purple-500/20">multinational access</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50 relative overflow-hidden group">
                           <div className="absolute top-6 right-8 text-zinc-700"><Lock size={16}/></div>
                           <h5 className="text-[9px] font-black text-teal-500 uppercase tracking-widest mb-4">For our Canadians</h5>
                           <p className="text-xl text-white font-serif italic mb-2">Indigo Collection</p>
                           <p className="text-[11px] text-zinc-500 leading-relaxed italic">Curating the best in domestic Canadian literature. Arriving shortly.</p>
                           <div className="mt-6 w-12 h-1 bg-zinc-800 rounded-full" />
                        </div>
                        <div className="p-8 rounded-[2rem] bg-[#16121D] border border-zinc-800/50 relative overflow-hidden group">
                           <div className="absolute top-6 right-8 text-zinc-700"><Lock size={16}/></div>
                           <h5 className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-4">Non-Canadian Friends</h5>
                           <p className="text-xl text-white font-serif italic mb-2">Bookshop.org Storefront</p>
                           <p className="text-[11px] text-zinc-500 leading-relaxed italic">Supporting independent US/UK shops. Finalizing the shelves.</p>
                           <div className="mt-6 w-12 h-1 bg-zinc-800 rounded-full" />
                        </div>
                      </div>
                      <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.2em] mt-10 text-center italic">*International users can find these titles on our Amazon list in the interim.</p>
                    </div>
                  )}
                </div>
            </section>

            {/* 3. THE CANOPY HUB */}
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Canopy Hub</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
            </div>
            <section className="flex flex-col lg:flex-row gap-6 items-start mb-20">
                {/* Fixed Strategy Deck Width & Height */}
                <div className="w-full lg:w-[320px] max-w-md bg-[#16121D] border border-teal-500/30 p-8 rounded-[2.5rem] flex flex-col shadow-2xl shrink-0 self-start">
                  <div className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full text-[9px] font-black uppercase w-fit mb-6 italic">Member Gift</div>
                  <h4 className="text-2xl text-white font-serif italic mb-4 leading-tight">Master Strategy Deck</h4>
                  <p className="text-[12px] text-zinc-400 italic mb-8 leading-relaxed">The primary blueprint for your career migration and resignation protocol.</p>
                  <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="h-14 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase text-[9px] tracking-widest shadow-lg shadow-teal-500/20">Open Blueprint <ExternalLink size={14} /></button>
                </div>

                {/* Migration Protocols */}
                <div className="flex-1 bg-[#16121D] border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] relative shadow-xl overflow-hidden">
                  {!isSteward && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                      <Lock size={24} className="text-purple-500/40 mb-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-4">Steward standing required</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-purple-500 italic">Advanced Sequence</span>
                      <h4 className="text-2xl text-white font-serif italic mt-2">Strategic Migration Protocols</h4>
                    </div>
                    <Layers className="text-zinc-800 hidden sm:block" size={32} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-purple-500/20"><Zap size={16} className="text-purple-400" /><h5 className="text-[11px] font-black text-white uppercase tracking-widest">Sponsorship Outreach</h5></div>
                      {protocols.sponsorship.map((item) => (
                        <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/40 transition-all group">
                          <div className="flex justify-between items-center mb-3"><span className="text-[8px] font-black text-purple-500/70 tracking-widest">{item.label}</span><button onClick={() => copyToClipboard(item.text, item.id)} className="text-zinc-500 hover:text-white transition-all transform active:scale-90">{copiedId === item.id ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}</button></div>
                          <p className="text-[12px] text-zinc-100 font-medium italic leading-relaxed mb-3">"{item.text}"</p>
                          <p className="text-[10px] text-zinc-600 italic font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-purple-500/20"><MessageSquare size={16} className="text-purple-400" /><h5 className="text-[11px] font-black text-white uppercase tracking-widest">Negotiation scripts</h5></div>
                      {protocols.negotiation.map((item) => (
                        <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/40 transition-all group">
                          <div className="flex justify-between items-center mb-3"><span className="text-[8px] font-black text-purple-500/70 tracking-widest">{item.label}</span><button onClick={() => copyToClipboard(item.text, item.id)} className="text-zinc-500 hover:text-white transition-all transform active:scale-90">{copiedId === item.id ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}</button></div>
                          <p className="text-[12px] text-zinc-100 font-medium italic leading-relaxed mb-3">"{item.text}"</p>
                          <p className="text-[10px] text-zinc-600 italic font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </section>
          </div>
        ) : (
          <Provisions />
        )}

        {/* VOLUME NAV */}
        <div className="mt-12 pt-12 border-t border-white/5 flex justify-center">
          <div className="flex gap-4 p-2 bg-[#16121D] rounded-3xl border border-white/10 shadow-2xl">
            <button onClick={() => setCurrentVolume(1)} className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Volume I</button>
            <button onClick={() => setCurrentVolume(2)} className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>Volume II</button>
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