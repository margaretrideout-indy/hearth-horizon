import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Library as LibraryIcon, Book, Package, Zap, BookOpen, ExternalLink, 
  ShieldCheck, FileText, Wind, ArrowRight, ShoppingBag, MessageSquare,
  Loader2, ClipboardCheck, Layout, Search, Languages, Map, Sparkles,
  Trophy, Clock, Download, Gift
} from 'lucide-react';

const Library = ({ vault, onUpdateVault }) => {
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

  const categories = {
    study: [
      {
        title: "The Indigo Library",
        desc: "A curated collection of literature and professional tools selected to support your career transition and personal sanctuary.",
        links: [{ label: "View Library", url: "https://www.indigo.ca" }],
        icon: <Book className="w-5 h-5" />,
        footer: "Verified Indigo Partner Resource.",
        highlight: true
      },
      {
        title: "Amazon Starter Kit",
        desc: "A curated toolkit for the professional pivot: from essential connectivity hubs to focus-driven office tools.",
        links: [{ label: "Explore Kit", url: "https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share" }],
        icon: <Package className="w-5 h-5" />,
        footer: "As an Amazon Associate I earn from qualifying purchases.",
        highlight: true
      }
    ],
    common: [
      {
        title: "The Pivot Resume Template",
        desc: "A clean, ATS-optimized layout designed to highlight transferable skills over industry-specific titles.",
        type: "PDF / DOCX",
        icon: <FileText className="w-5 h-5" />,
        badge: "Free"
      },
      {
        title: "Interview De-Coder",
        desc: "A 1-page cheat sheet for translating corporate 'vibe' questions into evidence-based achievement answers.",
        type: "PDF",
        icon: <MessageSquare className="w-5 h-5" />,
        badge: "Free"
      }
    ],
    dialects: [
      {
        title: "The Universal Pivot Dictionary",
        desc: "A framework for translating industry-specific language into high-impact corporate operations and management dialects.",
        links: [{ label: "Harvest Resource", url: "#" }],
        icon: <Languages className="w-5 h-5" />,
        badge: "Core Tool"
      }
    ],
    sanctuary: [
      {
        title: "Pivot Resilience Toolkit",
        desc: "Access a national mental health portal for 24/7 support and specialized counseling services for those in transition.",
        links: [{ label: "Canada Mental Health Hub", url: "https://www.canada.ca/en/public-health/services/mental-health-services.html" }],
        emergencyInfo: "Text HOME to 686868",
        icon: <ShieldCheck className="w-5 h-5" />,
        badge: "24/7 Support",
        color: "teal"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              A curated ecosystem of tools, blueprints, and resilience resources. Open to all; optimized for the pivot.
            </p>
          </div>

          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600 group-hover:text-teal-500" />
            <input 
              type="text"
              placeholder="SEARCH PROVISIONS..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-full py-3 pl-10 pr-4 text-[9px] font-black tracking-widest text-white focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-slate-700 uppercase"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* PRIMARY STUDY (Affiliate Links Front & Center) */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-2">
              <ShoppingBag size={14} className="text-white/40" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 whitespace-nowrap font-sans">The Study</h3>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.study.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] hover:bg-white/[0.03] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Sparkles className="text-teal-400 w-12 h-12" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-8 border border-white/5 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-3 font-serif italic tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">{item.desc}</p>
                <a href={item.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 bg-teal-600/10 border border-teal-500/20 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:bg-teal-600 hover:text-white transition-all mb-6">
                  {item.links[0].label} <ExternalLink className="ml-2 w-3 h-3" />
                </a>
                <p className="text-[8px] text-slate-600 uppercase tracking-tighter text-center italic font-black">{item.footer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMMON GROUNDS (Universal Free Tier) */}
        <section className="mb-20 animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center gap-2">
              <Gift size={14} className="text-teal-400" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400 whitespace-nowrap font-sans">Common Grounds</h3>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-400/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.common.map((item, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] flex flex-col sm:flex-row gap-6 items-start sm:items-center group hover:bg-white/[0.04] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/5 flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/10">
                  {item.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white font-bold text-sm tracking-wide font-serif italic tracking-tight">{item.title}</h4>
                    <span className="text-[7px] font-black text-teal-500 uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">{item.type}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic leading-relaxed">{item.desc}</p>
                  <button className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-[0.2em] mt-2 group-hover:text-teal-400 transition-colors">
                    Download <Download size={12} className="group-hover:translate-y-0.5 transition-transform"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DIALECTS */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Dialect & Navigation</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {categories.dialects.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] hover:bg-white/[0.03] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-8 border border-white/5">
                  {item.icon}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-bold text-lg font-serif italic tracking-tight">{item.title}</h4>
                  <Badge className="bg-teal-500/10 text-teal-500 border-teal-500/20 text-[7px] font-black px-2 uppercase tracking-widest">{item.badge}</Badge>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-8 italic">{item.desc}</p>
                <button 
                  onClick={() => idx === 0 && setShowDictionary(!showDictionary)}
                  className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white transition-all group/btn"
                >
                  {showDictionary && idx === 0 ? "Close Dictionary" : item.links[0].label} 
                  <ArrowRight className={`ml-2 w-3 h-3 transition-transform ${showDictionary && idx === 0 ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>

          {showDictionary && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-[#1A1423] border border-teal-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-6 bg-teal-500/5 border-b border-white/5 flex justify-between items-center">
                  <p className="text-[9px] font-black text-teal-400 uppercase tracking-widest font-sans">Universal Translation Guide</p>
                  <Trophy size={14} className="text-teal-500/40" />
                </div>
                <div className="divide-y divide-white/5">
                  {translations.map((t, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 p-6 hover:bg-white/[0.02] transition-colors gap-4">
                      <div>
                        <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter block mb-1">Industry-Specific Experience</span>
                        <p className="text-sm text-slate-300 font-medium leading-relaxed">{t.edu}</p>
                      </div>
                      <div>
                        <span className="text-[8px] font-black text-teal-600 uppercase tracking-tighter block mb-1 font-sans">Cross-Functional Market Value</span>
                        <p className="text-sm text-white font-serif italic leading-relaxed">{t.ops}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SANCTUARY */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap font-sans">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.sanctuary.map((item, idx) => (
              <div key={idx} className="bg-[#1A1423] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col h-full shadow-2xl group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 border bg-teal-400/5 text-teal-400 border-teal-400/10">{item.icon}</div>
                <h4 className="text-white font-bold text-lg font-serif italic mb-2 tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-8 italic">{item.desc}</p>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-col gap-3">
                    {item.links.map((link, lIdx) => (
                      <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2 group/link">
                        {link.label} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 md:mt-32 pt-12 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5 font-sans">
            <ShoppingBag className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-600 italic">Affiliate Reciprocity: We only recommend tools that provide genuine leverage for professional pivots.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;