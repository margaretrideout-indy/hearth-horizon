import React from 'react';
import { ExternalLink, Sparkles, Book, Box, Briefcase } from 'lucide-react';

const Library = () => {
  const provisions = [
    {
      title: "Teal Career Tracker",
      category: "THE DIGITAL WORKSHOP",
      desc: "An AI-powered resume builder and job tracker that keeps your pivot organized.",
      link: "https://www.tealhq.com",
      icon: <Sparkles className="w-5 h-5 text-teal-400" />
    },
    {
      title: "Jobscan ATS Match",
      category: "THE DIGITAL WORKSHOP",
      desc: "Compare your 'Linguistic Bridge' results against real job descriptions to ensure you pass the filters.",
      link: "https://www.jobscan.co",
      icon: <Box className="w-5 h-5 text-teal-400" />
    }
  ];

  return (
    <div className="flex-1 p-6 md:p-10 bg-[#1A1423] min-h-screen font-sans">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-100 italic tracking-tight mb-2">
          The Library & Provisions
        </h1>
        <p className="text-slate-400 text-lg mb-4">
          Curated tools and blueprints to support your transition.
        </p>
        <p className="text-teal-400 font-medium italic text-sm">
          Transparently vetted by 13 years of leadership experience.
        </p>
      </header>

      {/* Reciprocity Note with Founder Glow */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="bg-[#2D243A] border border-purple-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.08)]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h2 className="text-xs font-bold text-teal-400 uppercase tracking-widest">
              A Note on Reciprocity
            </h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
            I only recommend provisions I have personally used or verified. Some links below are affiliate links — at no cost to you — that help keep the <span className="text-teal-400 font-semibold">Linguistic Bridge</span> free for all educators in transition.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Columns: Digital Workshop */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold text-teal-500 uppercase tracking-[0.2em] mb-6">The Digital Workshop</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provisions.map((item, idx) => (
              <div key={idx} className="bg-[#251D2F] border border-white/5 rounded-2xl p-8 hover:border-teal-500/30 hover:bg-[#2D243A] transition-all group">
                <div className="mb-6 p-3 bg-[#1A1423] rounded-xl w-fit group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed italic">{item.desc}</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 border border-teal-500/20 rounded-lg text-teal-400 font-bold text-xs uppercase tracking-widest hover:bg-teal-500 hover:text-slate-100 transition-all active:scale-95"
                >
                  Explore {item.title.split(' ')[0]} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: The Study */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-bold text-amber-500 uppercase tracking-[0.2em] mb-6">The Study</h3>
          <div className="bg-[#251D2F] border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-all">
            <div className="mb-6 p-3 bg-amber-500/10 rounded-xl w-fit text-amber-500">
              <Book className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-3">Bookshop.org List</h4>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Support local bookstores while building your professional library with my top-rated career transition reads.
            </p>
            <button className="w-full py-4 bg-amber-600 text-[#1A1423] font-bold rounded-lg hover:bg-amber-500 transition-all flex items-center justify-center gap-2 active:scale-95">
              View List <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-6 bg-[#251D2F] border border-white/5 rounded-2xl p-6 flex items-center gap-4 hover:border-orange-500/30 transition-all group">
            <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500 group-hover:rotate-12 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h5 className="text-slate-100 font-bold text-sm uppercase tracking-wide">Amazon Essentials</h5>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-600" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Library;