import React, { useState } from 'react';
import { 
  Library as LibraryIcon, Book, Package, Zap, BookOpen, ExternalLink, 
  ShieldCheck, FileText, Wind, ArrowRight, ShoppingBag, MessageSquare,
  Loader2, ClipboardCheck, Layout, Search, Languages, Map
} from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const provisions = {
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
        links: [
          { label: "Canada Mental Health Hub", url: "https://www.canada.ca/en/public-health/services/mental-health-services.html" }
        ],
        emergencyInfo: "Text HOME to 686868",
        icon: <ShieldCheck className="w-5 h-5" />,
        badge: "24/7 Support",
        color: "teal"
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
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
                <LibraryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-serif italic text-white tracking-tight">The Library & Provisions</h1>
            </div>
            <p className="max-w-xl text-[10px] md:text-xs leading-relaxed text-slate-500 font-light italic">
              Curated tools and blueprints to support your transition.
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

        {/* DIALECTS SECTION (Matches your Screenshot Layout) */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">The Dialect & Navigation</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.dialects.map((item, idx) => (
              <div key={idx} className="bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/[0.03] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 mb-6 md:mb-8 border border-white/5 shadow-[0_0_15px_rgba(20,184,166,0.05)]">
                  {item.icon}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-bold text-lg font-serif italic">{item.title}</h4>
                  <span className="text-[7px] font-black text-teal-500/60 uppercase tracking-widest bg-teal-500/5 px-2 py-1 rounded-md border border-teal-500/10">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed mb-6 md:mb-8 italic">{item.desc}</p>
                <button className="inline-flex items-center justify-start text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white transition-all group/btn">
                  {item.links[0].label} <ArrowRight className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* REUSE SECTIONS FOR STUDY, TEMPLATES, WORKSHOP, SANCTUARY (as seen in screenshot) */}
        {/* ... (Mapping logic remains same, ensuring the bg-white/[0.01] matches your screenshot's subtle transparency) */}

      </div>
    </div>
  );
};

export default Library;