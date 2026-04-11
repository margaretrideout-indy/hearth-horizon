import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Library as LibraryIcon, Book, Package, Zap, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag, MessageSquare,
  Search, Languages, Download, Gift, Cpu, Wind, Phone
} from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);

  const translations = [
    { edu: "Front-line Delivery", ops: "Personalized User Experience (UX) & Scalable Execution" },
    { edu: "Project Individualization", ops: "Custom Stakeholder Requirements & Targeted KPI Development" },
    { edu: "Workflow Planning", ops: "Strategic Product Roadmapping & Lifecycle Management" },
    { edu: "Conflict Resolution", ops: "High-Stakes Stakeholder Facilitation & Resource Optimization" },
    { edu: "Client/Peer Relations", ops: "Cross-Functional Relationship Management (CRM)" },
    { edu: "Continuous Assessment", ops: "Iterative Feedback Loops & Real-time Data Analysis" }
  ];

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              A curated ecosystem of tools, blueprints, and resilience resources.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
            <input 
              type="text"
              placeholder="SEARCH..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-full py-3 pl-10 pr-4 text-[9px] font-black tracking-widest text-white focus:outline-none focus:border-teal-500/50 uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* 1. THE STUDY (Affiliate Links) */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500/60 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <Book className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">The Indigo Library</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">
                A curated collection of literature and professional tools selected to support your career transition and personal sanctuary.
              </p>
              <a href="https://www.indigo.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all mb-6 bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                VIEW LIBRARY <ExternalLink className="ml-2 w-3 h-3" />
              </a>
              <p className="text-[8px] text-slate-600 uppercase tracking-tighter text-center italic font-black">Verified Indigo Partner Resource.</p>
            </div>

            <div className="bg-white/[0.01] border border-orange-500/20 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.03] transition-all group relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/5 flex items-center justify-center text-orange-400 mb-8 border border-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Amazon Essentials</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">
                Hand-picked workspace essentials, from ergonomic tech to the journals that kept me grounded during my 13-year tenure.
              </p>
              <a href="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-all mb-6 bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600 hover:text-white">
                EXPLORE SHOP <ExternalLink className="ml-2 w-3 h-3" />
              </a>
              <p className="text-[8px] text-slate-600 uppercase tracking-tighter text-center italic font-black">As an Amazon Associate I earn from qualifying purchases.</p>
            </div>
          </div>
        </section>

        {/* 2. THE DIGITAL WORKSHOP */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Digital Workshop</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-400/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group relative">
              <Badge className="absolute top-8 right-8 bg-teal-500/10 text-teal-500 border-teal-500/20 text-[7px] font-black px-2 uppercase tracking-widest">Next Step</Badge>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-8 border border-white/5 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Teal HQ</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">An all-in-one platform to manage your job search, track applications, and optimize your resume.</p>
              <a href="https://www.tealhq.com" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white flex items-center gap-2 transition-colors">
                ACCESS TOOL <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-8 border border-white/5">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg mb-3 font-serif italic">Jobscan ATS</h4>
              <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">Check how well your resume matches specific job descriptions to bypass automated filters.</p>
              <a href="https://www.jobscan.co" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white flex items-center gap-2 transition-colors">
                ACCESS TOOL <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* 3. THE SANCTUARY */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#1A1423] border-2 border-red-500/20 p-8 rounded-[2.5rem] flex flex-col relative group shadow-[0_0_30px_rgba(239,68,68,0.05)]">
              <div className="flex flex-col gap-2 absolute top-6 right-6 items-end">
                 <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] font-black px-3 py-1 uppercase tracking-widest flex items-center gap-2 animate-pulse">
                   <Phone size={10} /> TEXT 686868
                 </Badge>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-400/5 text-red-400 flex items-center justify-center mb-6 border border-red-400/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Pivot Resilience Toolkit</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">Immediate 24/7 support. If the transition feels heavy, reach out to verified Canadian support networks instantly.</p>
              <div className="mt-auto space-y-3">
                <a href="https://www.wellnesstogether.ca" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  WELLNESS TOGETHER CANADA <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
                <a href="sms:686868" className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 group/link">
                  CONNECT WITH CRISIS LINE <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">Burnout to Balance</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">Vetted workbooks designed to regulate your nervous system and help you exit "survival mode" during your pivot.</p>
              <div className="mt-auto">
                <a href="https://www.coursecorrectioncoaching.com/lawyer-career-coaching/" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  VIEW COACHING FRAMEWORK <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col group">
              <div className="w-10 h-10 rounded-xl bg-teal-400/5 text-teal-400 flex items-center justify-center mb-6 border border-teal-400/10">
                <Wind className="w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Inner Advocate</h4>
              <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">Audio sessions and coaching methodologies to help you separate your professional identity from your personal value.</p>
              <div className="mt-auto">
                <a href="https://www.theinneradvocate.com/method" target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                  EXPLORE AUDIO & SESSIONS <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DIALECTS & PROVISIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
           <section>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Dialect</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-teal-400 border border-white/5">
                    <Languages className="w-5 h-5" />
                  </div>
                  <Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20 text-[7px] font-black px-2 uppercase tracking-widest">Core Tool</Badge>
                </div>
                <h4 className="text-white font-bold text-sm font-serif italic mb-2 tracking-tight">The Universal Pivot Dictionary</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6 italic">A framework for translating industry-specific language into high-impact corporate dialects.</p>
                <button 
                  onClick={() => setShowDictionary(!showDictionary)}
                  className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white flex items-center gap-2 transition-colors"
                >
                  {showDictionary ? "CLOSE DICTIONARY" : "HARVEST RESOURCE"} <ArrowRight className={`w-3 h-3 transition-transform ${showDictionary ? 'rotate-90' : ''}`} />
                </button>
              </div>
           </section>

           <section>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">Provisions</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>
              <div className="space-y-4">
                {[
                  { title: "Pivot Resume Template", type: "PDF", icon: <FileText size={14}/> },
                  { title: "Interview De-Coder", type: "PDF", icon: <MessageSquare size={14}/> }
                ].map((item, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.04] transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="text-teal-400 opacity-40">{item.icon}</div>
                      <span className="text-xs font-serif italic text-white">{item.title}</span>
                    </div>
                    <Download size={12} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                  </div>
                ))}
              </div>
           </section>
        </div>

        {showDictionary && (
          <div className="mb-20 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-[#1A1423] border border-teal-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl divide-y divide-white/5">
              {translations.map((t, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-white/[0.02] transition-colors gap-4">
                  <div>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter block mb-1">Legacy Sector</span>
                    <p className="text-sm text-slate-300 font-medium">{t.edu}</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-teal-600 uppercase tracking-tighter block mb-1">Corporate Ops Value</span>
                    <p className="text-sm text-white font-serif italic">{t.ops}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-20 md:mt-32 pt-12 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-600 italic">Affiliate Reciprocity: We only recommend tools that provide genuine leverage for professional pivots.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;