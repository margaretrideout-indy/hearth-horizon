import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, ExternalLink, ArrowRight, Lock, 
  MessageSquare, Zap, Compass, Heart, Phone, Headphones, 
  Package, Book, FileText, X, Check, Copy, Layers, Mountain
} from 'lucide-react';

// Volume II Content Component
import Provisions from './Contact';

// --- CONFIGURATION & LINKS ---
const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";
const IDENTITY_LEDGER_URL = "https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link";
const AMZ_PROVISIONS_URL = "https://www.amazon.ca/hz/wishlist/ls/2BZUUE2ZJL0EL?ref_=list_d_wl_lfu_nav_4";

const StandingModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  const isSteward = type === 'steward';
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0A080D]/95 backdrop-blur-md" onClick={onClose} />
      <div className={`relative w-full max-w-lg bg-[#1a1625] border ${isSteward ? 'border-purple-500/30' : 'border-teal-500/30'} rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${isSteward ? 'bg-purple-500/10 text-purple-400' : 'bg-teal-500/10 text-teal-400'}`}>
          <Lock size={24} />
        </div>
        <h3 className="text-2xl font-serif italic text-white mb-4">Elevating Your Standing</h3>
        <p className="text-sm text-zinc-400 leading-relaxed italic mb-8 font-light">
          The {isSteward ? 'Steward' : 'Hearthkeeper'} provisions contain high-leverage strategic assets. Access is granted through verified professional migration milestones.
        </p>
        <button onClick={onClose} className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all">
          Return to Canopy
        </button>
      </div>
    </div>
  );
};

const Library = ({ vault, isAdmin }) => {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);
  const [activeTool, setActiveTool] = useState(null);
  const [studyTab, setStudyTab] = useState('amazon');
  const [modalType, setModalType] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isSteward = isAdmin || userTier === 'Steward';

  // --- CONTENT REPOSITORY ---
  const protocols = {
    sponsorship: [
      {
        id: 'sp_1',
        label: 'Phase 1: The Curiosity Gap',
        text: "I've been following your work in [Field] and noticed your transition from [Previous Sector]. As I'm currently navigating a similar migration, I'd love to hear the one thing you wish you knew during your first 90 days. Would you be open to a 15-minute sync?",
        desc: "Best for initial LinkedIn or Email outreach."
      },
      {
        id: 'sp_2',
        label: 'Phase 2: The Strategic Ask',
        text: "I’ve spent the last month refining my portfolio based on our talk. I’m now targeting [Specific Company/Role]. Given your standing, would you feel comfortable sharing my profile with the hiring team? I've attached a brief 'blurb' to make a forward easy.",
        desc: "The pivot from advice to advocacy."
      }
    ],
    negotiation: [
      {
        id: 'neg_1',
        label: 'The Anchoring Script',
        text: "Based on the specialized nature of this role and my 13 years of expertise, I’m looking for a total compensation package in the range of [X] to [Y]. This reflects the immediate ROI I bring in translating complex frameworks for your models.",
        desc: "Use during the first mention of salary."
      }
    ]
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans overflow-x-hidden">
      <StandingModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-serif italic text-white tracking-tight">
                The Library: {currentVolume === 1 ? 'Volume I' : 'Volume II'}
              </h1>
            </div>
            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-[0.2em] italic">
              {currentVolume === 1 ? "Sanctuary, Study, and Foundational Frameworks" : "Advanced Execution Archives"}
            </p>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-zinc-800 bg-[#16121D] shadow-xl">
            <div className={`w-2 h-2 rounded-full ${isSteward ? 'bg-purple-500' : 'bg-teal-500'} animate-pulse`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">{userTier} Standing</span>
          </div>
        </header>

        {currentVolume === 1 ? (
          <div className="animate-in fade-in duration-700">
            
            {/* SECTION 1: THE SANCTUARY (Mental Health) */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400 whitespace-nowrap">The Sanctuary</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#16121D] border border-zinc-800/50 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
                  <Heart className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-xl text-white font-serif font-black italic mb-3">Burnout to Balance</h4>
                  <p className="text-[12px] text-zinc-400 italic mb-8 font-light leading-relaxed">A guided PDF roadmap for recovering your energy during transition.</p>
                  <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-black transition-all">
                    VIEW PDF GUIDE <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
                <div className="bg-[#16121D] border border-zinc-800/50 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
                  <Headphones className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-xl text-white font-serif font-black italic mb-3">Inner Advocate</h4>
                  <p className="text-[12px] text-zinc-400 italic mb-8 font-light leading-relaxed">Shifting your internal narrative during professional upheaval.</p>
                  <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-black transition-all">
                    LISTEN TO PODCAST <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
                <div className="bg-[#16121D] border border-zinc-800/50 p-8 rounded-[2.5rem] flex flex-col shadow-xl">
                  <Phone className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-xl text-white font-serif font-black italic mb-3">Crisis Support</h4>
                  <p className="text-[12px] text-zinc-400 italic mb-8 font-light leading-relaxed">Immediate, confidential text-based support whenever you need it.</p>
                  <div className="mt-auto p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">Text 686868</span>
                    <p className="text-[9px] text-purple-400 font-bold uppercase">24/7 Availability</p>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: THE STUDY (Affiliate Links) */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Study</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <button onClick={() => setStudyTab('amazon')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                    <Package className="w-5 h-5 mb-4 text-teal-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white block">Provisions</span>
                  </button>
                  <button onClick={() => setStudyTab('reading')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'reading' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-[#16121D] border-zinc-800 opacity-60'}`}>
                    <Book className="w-5 h-5 mb-4 text-teal-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white block">Literature</span>
                  </button>
                </div>
                <div className="lg:col-span-3 bg-[#110E16] border border-zinc-800 p-8 md:p-14 rounded-[3rem] shadow-2xl">
                  {studyTab === 'amazon' ? (
                    <div>
                      <h4 className="text-3xl text-white font-serif italic mb-4">Wayfarer’s Provisions</h4>
                      <p className="text-base text-zinc-300 font-light leading-relaxed mb-10 italic">
                        Curated ergonomic and analog tools selected to support the mental demands of a professional migration.
                      </p>
                      <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-12 h-16 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-teal-500 text-black hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
                        BROWSE COLLECTIONS <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-3xl text-white font-serif italic mb-6">Foundational Reading</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 rounded-2xl bg-[#1a1625] border border-white/5 opacity-50">
                          <span className="text-[9px] font-black text-teal-500/60 uppercase block mb-2">Indigo Storefront</span>
                          <p className="text-sm italic text-zinc-400">Arriving shortly for Canadian members.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#1a1625] border border-white/5 opacity-50">
                          <span className="text-[9px] font-black text-purple-500/60 uppercase block mb-2">Bookshop.org</span>
                          <p className="text-sm italic text-zinc-400">Supporting independent shops. Curating now.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 3: THE CANOPY HUB (Frameworks & Scripts) */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Canopy Hub</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Master Strategy Deck */}
                <div className="bg-[#16121D] border border-teal-500/30 p-8 rounded-[2.5rem] flex flex-col shadow-2xl">
                  <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full mb-6 w-fit">Gift</span>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Master Strategy Deck</h4>
                  <p className="text-[12px] text-zinc-300 font-light italic mb-10 leading-relaxed">The primary map for your transition and resignation protocol.</p>
                  <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="mt-auto h-14 bg-teal-500 hover:bg-teal-400 text-black font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] text-[9px]">
                    Open Blueprint <ExternalLink size={14} />
                  </button>
                </div>

                {/* Steward Protocols (Sequences) */}
                <div className="bg-[#16121D] border border-zinc-800 p-8 rounded-[2.5rem] relative lg:col-span-2 flex flex-col shadow-xl overflow-hidden">
                  {!isSteward && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-6 h-6 text-purple-500/40 mb-3" />
                      <button onClick={() => setModalType('steward')} className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-purple-400 hover:bg-purple-500 hover:text-black transition-all">Steward Standing Required</button>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 inline-block">Premium Sequence</span>
                      <h4 className="text-2xl text-white font-serif font-black italic">Migration Protocols</h4>
                    </div>
                    <Layers className="text-zinc-800" size={32} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sponsorship Column */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap size={16} className="text-purple-400" />
                        <h5 className="text-[11px] font-black text-zinc-100 uppercase tracking-widest">Sponsorship Outreach</h5>
                      </div>
                      {protocols.sponsorship.map((item) => (
                        <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-black text-purple-500/60 uppercase">{item.label}</span>
                            <button onClick={() => copyToClipboard(item.text, item.id)} className="text-zinc-500 hover:text-white transition-colors">
                              {copiedId === item.id ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                          <p className="text-[12px] text-zinc-100 font-medium italic leading-relaxed mb-2">"{item.text}"</p>
                          <p className="text-[10px] text-zinc-500 italic">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Negotiation Column */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <MessageSquare size={16} className="text-purple-400" />
                        <h5 className="text-[11px] font-black text-zinc-100 uppercase tracking-widest">Negotiation Scripts</h5>
                      </div>
                      {protocols.negotiation.map((item) => (
                        <div key={item.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[9px] font-black text-purple-500/60 uppercase">{item.label}</span>
                            <button onClick={() => copyToClipboard(item.text, item.id)} className="text-zinc-500 hover:text-white transition-colors">
                              {copiedId === item.id ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                          <p className="text-[12px] text-zinc-100 font-medium italic leading-relaxed mb-2">"{item.text}"</p>
                          <p className="text-[10px] text-zinc-500 italic">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* VOLUME II ARCHIVE */
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 pb-20">
            <Provisions /> 
          </div>
        )}

        {/* VOLUME NAVIGATION */}
        <div className="mt-12 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 p-2 bg-[#16121D] rounded-[2rem] border border-white/10 shadow-2xl">
            <button 
              onClick={() => { setCurrentVolume(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`px-10 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg scale-105' : 'text-zinc-400 hover:text-white'}`}
            >
              Volume I
            </button>
            <button 
              onClick={() => { setCurrentVolume(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`px-10 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.15em] transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg scale-105' : 'text-zinc-400 hover:text-white'}`}
            >
              Volume II
            </button>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <div className="flex items-center gap-3">
            <Mountain size={14} className="text-teal-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Hearth & Horizon © 2026</span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => navigate('/hearth')} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-colors">Return Home</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;