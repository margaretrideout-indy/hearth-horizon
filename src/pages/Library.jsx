import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ArrowRight, Mountain, Lock, MessageSquare, Zap, 
  Compass, Heart, Phone, Headphones, Mail, BookOpen, 
  ArrowLeft, FileText, Save, X
} from 'lucide-react';

// Import the Volume II content from your Contact.jsx file
import Provisions from './Contact';

const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/preview";
const IDENTITY_LEDGER_URL = "https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link";
const AUTHORITY_WORKSHEET_URL = "https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link";
const AMZ_PROVISIONS_URL = "https://www.amazon.ca/hz/wishlist/ls/2BZUUE2ZJL0EL?ref_=list_d_wl_lfu_nav_4";

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest transition-all ${className}`}>
    {children}
  </span>
);

const StandingModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;
  const isSteward = type === 'steward';
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#0A080D]/90 backdrop-blur-md" onClick={onClose} />
      <div className={`relative w-full max-w-lg bg-[#16121D] border ${isSteward ? 'border-purple-500/30' : 'border-teal-500/30'} rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-10">
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
  
  const userTier = isAdmin ? 'Steward' : (vault?.tier || 'Seedling');
  const isHearthkeeper = isAdmin || userTier === 'Hearthkeeper' || userTier === 'Steward';
  const isSteward = isAdmin || userTier === 'Steward';

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-4 sm:p-6 md:p-12 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <StandingModal isOpen={!!modalType} onClose={() => setModalType(null)} type={modalType} />
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.05),transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shrink-0">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight leading-none">
                The Library: {currentVolume === 1 ? 'Volume I' : 'Volume II'}
              </h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-zinc-400 font-light italic uppercase tracking-wider">
              {currentVolume === 1 
                ? "Curated tools and blueprints for the intentional professional migration."
                : "The Expansion Archives: Advanced frameworks and deep-dive resources."}
            </p>
          </div>

          <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-zinc-800 bg-[#16121D] backdrop-blur-md shadow-xl">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isSteward ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`} />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Current Standing</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none">{userTier}</span>
            </div>
          </div>
        </header>

        {currentVolume === 1 ? (
          <div className="animate-in fade-in duration-700">
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400/80 whitespace-nowrap">The Sanctuary</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#110E16] border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all flex flex-col shadow-xl">
                  <Heart className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif font-black italic mb-3">Burnout to Balance</h4>
                  <p className="text-[11px] text-zinc-400 italic mb-8 font-light leading-relaxed">A guided PDF roadmap for recovering your energy and finding equilibrium.</p>
                  <a href="https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-500/5 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-black">
                    VIEW PDF GUIDE <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
                <div className="bg-[#110E16] border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all flex flex-col shadow-xl">
                  <Headphones className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif font-black italic mb-3">Your Inner Advocate</h4>
                  <p className="text-[11px] text-zinc-400 italic mb-8 font-light leading-relaxed">Shifting your internal narrative during professional upheaval.</p>
                  <a href="https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987" target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all bg-purple-500/5 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-black">
                    LISTEN TO PODCAST <ExternalLink className="ml-2 w-3 h-3" />
                  </a>
                </div>
                <div className="bg-[#110E16] border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-purple-500/30 transition-all flex flex-col shadow-xl">
                  <Phone className="w-8 h-8 text-purple-400 mb-6" />
                  <h4 className="text-lg text-white font-serif font-black italic mb-3">Crisis Support</h4>
                  <p className="text-[11px] text-zinc-400 italic mb-8 font-light leading-relaxed">Immediate, confidential text-based support whenever you need it.</p>
                  <div className="mt-auto p-4 rounded-xl bg-black/40 border border-white/5 text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 block mb-2">Text 686868</span>
                    <p className="text-[9px] text-purple-400 font-bold tracking-widest uppercase">24/7 Availability</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/80 whitespace-nowrap">The Study</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-3">
                  <button onClick={() => setStudyTab('amazon')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'amazon' ? 'bg-teal-500/10 border-teal-500/50 shadow-lg' : 'bg-[#110E16] border-zinc-800 opacity-60'}`}>
                    <Package className={`w-5 h-5 mb-4 ${studyTab === 'amazon' ? 'text-teal-400' : 'text-zinc-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white block">Amazon Provisions</span>
                    <span className="text-[9px] text-zinc-500 italic">Workspace, Tech & Sanctuary.</span>
                  </button>
                  <button onClick={() => setStudyTab('reading')} className={`w-full p-6 rounded-2xl border text-left transition-all ${studyTab === 'reading' ? 'bg-teal-500/10 border-teal-500/50 shadow-lg' : 'bg-[#110E16] border-zinc-800 opacity-60'}`}>
                    <Book className={`w-5 h-5 mb-4 ${studyTab === 'reading' ? 'text-teal-400' : 'text-zinc-600'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white block">Literature</span>
                    <span className="text-[9px] text-zinc-500 italic">Identity & Resilience texts.</span>
                  </button>
                </div>
                <div className="lg:col-span-3 bg-[#110E16] border border-zinc-800/50 p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                   <div className="relative z-10">
                      {studyTab === 'amazon' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <h4 className="text-2xl text-white font-serif italic mb-3">The Wayfarer’s Provisions</h4>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6 italic opacity-70">
                            As an Amazon Associate I earn from qualifying purchases.
                          </p>
                          <p className="text-sm text-zinc-400 font-light leading-relaxed mb-10 max-w-xl">
                            A curated ecosystem of digital, analog, and ergonomic tools selected to support the physical and mental demands of a professional migration.
                          </p>
                          <a href={AMZ_PROVISIONS_URL} target="_blank" rel="noopener noreferrer" 
                             className="inline-flex items-center justify-center px-10 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all bg-teal-500 text-black hover:bg-teal-400 hover:scale-[1.02] active:scale-95 shadow-lg shadow-teal-500/10">
                            BROWSE THE COLLECTIONS <ExternalLink className="ml-2 w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                            <div className="max-w-md">
                              <h4 className="text-2xl text-white font-serif italic mb-3">Foundational Reading</h4>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                                Pivotal literature on career migration, resilience, and identity. Essential mental provisions for the journey ahead.
                              </p>
                            </div>
                            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 h-fit lowercase py-1 px-4">
                              Multinational Access
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Indigo - Coming Soon */}
                            <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 flex flex-col gap-4 group relative overflow-hidden">
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-teal-500/40 uppercase tracking-[0.2em]">For our Canadians</span>
                                <Lock size={14} className="text-zinc-700 opacity-50" />
                              </div>
                              <div>
                                <h5 className="text-zinc-500 font-serif italic text-lg mb-1">Indigo Collection</h5>
                                <p className="text-[11px] text-zinc-600 leading-relaxed italic font-light">
                                  Curating the best in domestic Canadian literature. Arriving shortly.
                                </p>
                              </div>
                              <div className="mt-2 h-1 w-12 bg-zinc-800/50 rounded-full" />
                            </div>

                            {/* Bookshop - Coming Soon */}
                            <div className="p-8 rounded-[2rem] bg-black/20 border border-white/5 flex flex-col gap-4 group relative overflow-hidden">
                              <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-purple-500/40 uppercase tracking-[0.2em]">Non-Canadian Friends</span>
                                <Lock size={14} className="text-zinc-700 opacity-50" />
                              </div>
                              <div>
                                <h5 className="text-zinc-500 font-serif italic text-lg mb-1">Bookshop.org Storefront</h5>
                                <p className="text-[11px] text-zinc-600 leading-relaxed italic font-light">
                                  Supporting independent US/UK shops. Finalizing the shelves.
                                </p>
                              </div>
                              <div className="mt-2 h-1 w-12 bg-zinc-800/50 rounded-full" />
                            </div>
                          </div>
                          
                          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.2em] mt-10 text-center italic">
                            *International users can find these titles on our Amazon List in the interim.
                          </p>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500 whitespace-nowrap">The Canopy Hub</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#16121D] to-[#0A080D] border border-teal-500/30 p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-2xl">
                  <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-6 w-fit italic">Foundational Gift</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Master Strategy Deck</h4>
                  <p className="text-[11px] text-zinc-300 font-light italic leading-relaxed mb-10">The primary map for your transition and resignation protocol.</p>
                  <button onClick={() => window.open(STRATEGY_DECK_URL, '_blank')} className="mt-auto h-14 bg-teal-500 hover:bg-teal-400 text-[#0A080D] font-black rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] text-[9px]">
                    Open Blueprint <ExternalLink size={14} />
                  </button>
                </div>
                <div className="bg-[#110E16] border border-teal-500/10 p-8 rounded-[2.5rem] relative group hover:border-teal-500/30 transition-all flex flex-col shadow-xl overflow-hidden">
                  {!isHearthkeeper && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-5 h-5 text-teal-500/40 mb-3" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500/90 mb-5">Hearthkeeper Required</p>
                      <button onClick={() => setModalType('hearthkeeper')} className="px-6 py-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-teal-400">View Requirements</button>
                    </div>
                  )}
                  <Badge className="bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-6 w-fit uppercase">Tactical Provisions</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Hearthkeeper Tools</h4>
                  <div className={`flex flex-col gap-3 p-4 rounded-xl border transition-all ${activeTool === 'ledger' ? 'bg-teal-500/10 border-teal-500/50' : 'bg-black/40 border-zinc-800'}`}>
                    <div onClick={() => setActiveTool('ledger')} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Compass size={14} className="text-teal-400" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Identity Ledger</span>
                      </div>
                      <ArrowRight size={12} className={activeTool === 'ledger' ? 'text-teal-400' : 'text-zinc-600'} />
                    </div>
                    <div className="pl-7 pt-1 border-t border-white/5 flex flex-col gap-2">
                      <a href={IDENTITY_LEDGER_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-teal-500/80 hover:text-teal-400 uppercase tracking-widest transition-colors"><Save size={10} /> Schematic</a>
                      <a href={AUTHORITY_WORKSHEET_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors"><FileText size={10} /> Worksheet (PDF)</a>
                    </div>
                  </div>
                </div>
                <div className="bg-[#110E16] border border-purple-500/10 p-8 rounded-[2.5rem] relative group hover:border-purple-500/30 transition-all flex flex-col shadow-xl overflow-hidden">
                  {!isSteward && (
                    <div className="absolute inset-0 z-20 bg-[#0A080D]/95 backdrop-blur-[6px] rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center">
                      <Lock className="w-5 h-5 text-purple-500/40 mb-3" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-500/90 mb-5">Steward Required</p>
                      <button onClick={() => setModalType('steward')} className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-[8px] font-black uppercase tracking-widest text-purple-400">View Requirements</button>
                    </div>
                  )}
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 w-fit uppercase">Strategic Intelligence</Badge>
                  <h4 className="text-xl text-white font-serif font-black italic mb-4">Steward Assets</h4>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-700 pb-20">
            <Provisions /> 
          </div>
        )}

        <div className="mt-12 pt-12 border-t border-white/5 flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 p-1.5 bg-[#16121D] rounded-2xl border border-white/5 shadow-2xl">
            <button 
              onClick={() => { setCurrentVolume(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Volume I
            </button>
            <button 
              onClick={() => { setCurrentVolume(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Volume II
            </button>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-teal-500/10 flex items-center justify-center"><Mountain size={12} className="text-teal-500" /></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Hearth Horizon © 2026</span>
          </div>
          <div className="flex gap-8">
            <button onClick={() => navigate('/grove')} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-colors">Grove Connect</button>
            <button onClick={() => navigate('/hearth')} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-teal-400 transition-colors">Return Home</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;