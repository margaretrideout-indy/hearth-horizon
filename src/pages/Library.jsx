import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Wind, 
  Zap, 
  ExternalLink, 
  ShoppingBag,
  ArrowRight,
  Heart
} from 'lucide-react';

const Library = () => {
  const provisions = {
    sanctuary: [
      {
        title: "Pivot Resilience Toolkit",
        desc: "Free, 24/7 counseling and mental health support for Canadians navigating major life shifts.",
        links: [
          { label: "Wellness Together Canada", url: "https://www.wellnesstogether.ca/" },
          { label: "Crisis Text Line (Text HOME to 686868)", url: "https://www.crisistextline.ca/" }
        ],
        icon: <ShieldCheck className="w-5 h-5" />,
        badge: "24/7 Support",
        color: "teal"
      },
      {
        title: "Burnout to Balance",
        desc: "Vetted, free PDF workbooks designed to help regulate your nervous system after leaving a draining environment.",
        links: [{ label: "Download PDF Guides", url: "https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Stress" }],
        icon: <FileText className="w-5 h-5" />,
        color: "slate"
      },
      {
        title: "The Inner Advocate",
        desc: "Guided audio sessions to help you quiet the inner critic during high-stakes career transitions.",
        links: [{ label: "Listen to Sessions", url: "https://self-compassion.org/guided-self-compassion-meditations-mp3-2/" }],
        icon: <Wind className="w-5 h-5" />,
        color: "slate"
      }
    ],
    workshop: [
      {
        title: "Teal HQ",
        desc: "An all-in-one platform to manage your job search, track applications, and optimize your resume.",
        links: [{ label: "Explore Teal", url: "https://www.tealhq.com/" }],
        icon: <Zap className="w-5 h-5" />,
        badge: "Next Step"
      },
      {
        title: "Jobscan ATS",
        desc: "Check how well your resume matches specific job descriptions to bypass automated filters.",
        links: [{ label: "Scan Resume", url: "https://www.jobscan.co/" }],
        icon: <BookOpen className="w-5 h-5" />
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-8 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-serif italic text-white">The Library</h1>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-slate-500 font-light">
            A curated collection of provisions for the journey. From technical tools to mental 
            sanctuary, these resources are selected to support the whole person through the pivot.
          </p>
        </header>

        {/* SECTION: THE SANCTUARY */}
        <section className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60 whitespace-nowrap">
              The Sanctuary
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provisions.sanctuary.map((item, idx) => (
              <div key={idx} className="bg-[#1A1423] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/20 transition-all flex flex-col h-full shadow-2xl group">
                {item.badge && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-400/20 backdrop-blur-md">
                    <span className="text-[7px] font-black uppercase tracking-widest text-teal-400">{item.badge}</span>
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-colors ${
                  item.color === 'teal' ? 'bg-teal-400/5 text-teal-400 border-teal-400/10' : 'bg-white/5 text-slate-400 border-white/5'
                }`}>
                  {item.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-6 italic">
                  {item.desc}
                </p>
                <div className="mt-auto pt-4 flex flex-col gap-3">
                  {item.links.map((link, lIdx) => (
                    <a 
                      key={lIdx}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[9px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: THE WORKSHOP */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 whitespace-nowrap">
              The Digital Workshop
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.workshop.map((item, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/[0.04] transition-all flex gap-8 items-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    {item.badge && (
                      <span className="text-[7px] font-black text-teal-500 uppercase tracking-tighter bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <a href={item.links[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                    Access Tool <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER NOTE */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/5">
            <ShoppingBag className="w-3 h-3 text-slate-500" />
            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Note on Reciprocity: Some links may be affiliate-based.
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Library;