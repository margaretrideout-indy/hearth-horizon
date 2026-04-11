import React, { useState } from 'react';
import { 
  Library as LibraryIcon, Book, Package, Zap, BookOpen, ExternalLink, 
  ShieldCheck, FileText, Wind, ArrowRight, ShoppingBag, MessageSquare,
  Loader2, ClipboardCheck, Layout, Search, Languages, Map
} from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const provisions = {
    study: [
      {
        title: "The Indigo Library",
        desc: "A curated collection of literature and professional tools selected to support your transition and personal sanctuary.",
        links: [{ label: "View Library", url: "https://www.indigo.ca" }],
        icon: <Book className="w-5 h-5" />,
        footer: "Verified Indigo Partner Resource."
      },
      {
        title: "Amazon Starter Kit",
        desc: "A curated toolkit for the pivot: from essential connectivity hubs to focus-driven office tools.",
        links: [{ label: "Explore Kit", url: "https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share" }],
        icon: <Package className="w-5 h-5" />,
        footer: "As an Amazon Associate I earn from qualifying purchases."
      }
    ],
    dialects: [
      {
        title: "The Education-to-Ops Dictionary",
        desc: "Translate 'Curriculum Frameworks' into 'Product Roadmaps' and 'IEPs' into 'Stakeholder Requirements'.",
        links: [{ label: "Harvest Resource", url: "#" }],
        icon: <Languages className="w-5 h-5" />,
        badge: "Core Tool"
      },
      {
        title: "The Agile Navigator",
        desc: "A primer on Scrum and Kanban for those moving from academic timelines to sprint cycles.",
        links: [{ label: "Harvest Resource", url: "#" }],
        icon: <Map className="w-5 h-5" />,
        badge: "Market Gap"
      }
    ],
    templates: [
      {
        title: "The Beacon-Ready Blueprint",
        desc: "A structural resume layout designed to showcase your Narrative Beacon and 13-year expertise. Currently being refined.",
        status: "In Development",
        icon: <Layout className="w-5 h-5" />,
        badge: "Blueprint"
      },
      {
        title: "Launch Mission Control",
        desc: "A strategic tracking system to manage applications and align dialects across market trajectories.",
        status: "Finalizing",
        icon: <ClipboardCheck className="w-5 h-5" />,
        badge: "System"
      }
    ],
    workshop: [
      {
        title: "Teal HQ",
        desc: "An all-in-one platform to manage your job search, track applications, and optimize your resume.",
        links: [{ label: "Access Tool", url: "https://www.tealhq.com/" }],
        icon: <Zap className="w-5 h-5" />,
        badge: "Next Step"
      },
      {
        title: "Jobscan ATS",
        desc: "Check how well your resume matches specific job descriptions to bypass automated filters.",
        links: [{ label: "Access Tool", url: "https://www.jobscan.co/" }],
        icon: <BookOpen className="w-5 h-5" />
      }
    ],
    sanctuary: [
      {
        title: "Pivot Resilience Toolkit",
        desc: "Access the national mental health portal for 24/7 support and specialized counseling services across Canada.",
        links: [{ label: "Canada Mental Health Hub", url: "https://www.canada.ca/en/public-health/services/mental-health-services.html" }],
        emergencyInfo: "Text HOME to 686868",
        icon: <ShieldCheck className="w-5 h-5" />,
        badge: "24/7 Support",
        color: "teal"
      },
      {
        title: "Burnout to Balance",
        desc: "Vetted, free PDF workbooks designed to help regulate your nervous system after a career pivot.",
        links: [{ label: "Download PDF Guides", url: "https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself" }],
        icon: <FileText className="w-5 h-5" />,
        color: "slate"
      },
      {
        title: "The Inner Advocate",
        desc: "Guided audio sessions to help you quiet the inner critic during high-stakes transitions.",
        links: [{ label: "Listen to Sessions", url: "https://self-compassion.org/guided-self-compassion-meditations-mp3-2/" }],
        icon: <Wind className="w-5 h-5" />,
        color: "slate"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              Curated tools and blueprints to support your transition. Transparently vetted and selected to support the whole person.
            </p>
          </div>

          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600 group-hover:text-teal-500" />
            <input 
              type="text"
              placeholder="SEARCH ARCHIVES..."
              className="w-full bg-white/[0.02] border border-white/5 rounded-full py-3 pl-10 pr-4 text-[9px] font-black tracking-widest text-white focus:outline-none focus:border-teal-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* 1. THE STUDY (Affiliate Section - Now Priority #1) */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 whitespace-nowrap">The Study</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.study.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/[0.03] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-6 md:mb-8 border border-white/5 shadow-[0_0_15px_rgba(20,184,166,0.1)]">
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-3 font-serif italic">{item.title}</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 md:mb-8 italic">{item.desc}</p>
                <a href={item.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full h-14 bg-teal-600/10 border border-teal-500/20 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:bg-teal-600 hover:text-white transition-all mb-6">
                  {item.links[0].label} <ExternalLink className="ml-2 w-3 h-3" />
                </a>
                <p className="text-[8px] text-slate-600 uppercase tracking-tighter text-center italic">{item.footer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. DIALECTS & NAVIGATION */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Dialect & Navigation</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.dialects.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/[0.03] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-6 md:mb-8 border border-white/5">
                  {item.icon}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-bold text-lg font-serif italic">{item.title}</h4>
                  <span className="text-[7px] font-black text-teal-500/60 uppercase tracking-widest bg-teal-500/5 px-2 py-1 rounded-md border border-teal-500/10">{item.badge}</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 md:mb-8 italic">{item.desc}</p>
                <button className="inline-flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white transition-all group/btn">
                  {item.links[0].label} <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. THE TEMPLATE ARCHIVE */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Template Archive</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.templates.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-teal-500/5 flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/10">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-sm tracking-wide">{item.title}</h4>
                    <span className="text-[7px] font-black text-teal-500/40 uppercase tracking-tighter bg-teal-500/5 px-2 py-0.5 rounded-full border border-teal-500/10">{item.badge}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-4 italic">{item.desc}</p>
                  <div className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-600 italic">
                    <Loader2 className="w-3 h-3 animate-spin" /> {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. THE DIGITAL WORKSHOP */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 whitespace-nowrap">The Digital Workshop</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.workshop.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white/5 flex items-center justify-center text-slate-400 shrink-0 border border-white/5">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    {item.badge && <span className="text-[7px] font-black text-teal-500 uppercase tracking-tighter bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">{item.badge}</span>}
                  </div>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-4 italic">{item.desc}</p>
                  <a href={item.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors">
                    {item.links[0].label} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. THE SANCTUARY */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Sanctuary</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provisions.sanctuary.map((item, idx) => (
              <div key={idx} className="bg-[#1A1423] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col h-full shadow-2xl relative group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${
                  item.color === 'teal' ? 'bg-teal-400/5 text-teal-400 border-teal-400/10' : 'bg-white/5 text-slate-400 border-white/5'
                }`}>{item.icon}</div>
                <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6 italic">{item.desc}</p>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-col gap-3">
                    {item.links.map((link, lIdx) => (
                      <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2">
                        {link.label} <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                  {item.emergencyInfo && (
                    <div className="p-4 rounded-2xl bg-teal-500/10 border-2 border-teal-500/30 flex items-start gap-3 mt-4">
                      <MessageSquare className="w-4 h-4 text-teal-300 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-300 mb-1">Immediate Crisis Support</p>
                        <p className="text-[11px] font-bold text-white tracking-wide">{item.emergencyInfo}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-20 md:mt-32 pt-12 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-3 h-3 text-slate-600" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-600">Note on Reciprocity: We only recommend provisions we have personally verified.</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Library;