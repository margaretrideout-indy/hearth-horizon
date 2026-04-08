import React from 'react';
import { ExternalLink, Book, ShoppingBag, Sparkles, Box } from 'lucide-react';

const Library = () => {
  return (
    <div className="min-h-screen bg-[#1a1425] text-stone-300 py-16 px-6 font-sans selection:bg-[#149184]/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 italic tracking-tight uppercase text-stone-100">The Library & Provisions</h1>
          <p className="text-xl text-stone-400 mb-4 font-light italic">Curated tools and blueprints to support your transition.</p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-[#149184]"></div>
            <p className="text-[#149184] font-medium italic text-sm tracking-wide">Transparently vetted by 13 years of leadership experience.</p>
          </div>
        </header>

        {/* Note on Reciprocity */}
        <div className="bg-[#130f1c] border border-stone-800/60 rounded-xl p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-[#149184] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Sparkles size={14} />
            <span>A Note on Reciprocity</span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed max-w-3xl font-light">
            I only recommend provisions I have personally used or verified. Some links below are affiliate links — at no cost to you — that help keep the <span className="text-[#149184] font-bold">HEARTH HORIZON</span> resources free for all educators in transition. 
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-tighter text-stone-600 font-medium italic">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        {/* THE DIGITAL WORKSHOP SECTION */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#149184] uppercase text-[10px] font-black tracking-[0.2em]">The Digital Workshop</span>
            <div className="h-[1px] flex-grow bg-stone-800/40"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Sparkles size={24} className="text-[#149184]" />}
              title="Teal Career Tracker"
              description="An AI-powered resume builder and job tracker that keeps your pivot organized and your applications intentional."
              link="https://www.tealhq.com"
              buttonText="EXPLORE TEAL"
            />
            <ResourceCard 
              icon={<Box size={24} className="text-[#149184]" />}
              title="Jobscan ATS Match"
              description="Compare your 'Linguistic Bridge' results against real job descriptions to ensure you pass through automated filters."
              link="https://www.jobscan.co"
              buttonText="EXPLORE JOBSCAN"
            />
          </div>
        </div>

        {/* THE STUDY SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#149184] uppercase text-[10px] font-black tracking-[0.2em]">The Study</span>
            <div className="h-[1px] flex-grow bg-stone-800/40"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Book size={24} className="text-[#149184]" />}
              title="Bookshop.org List"
              description="Support local bookstores while building your professional library with top-rated career transition reads."
              link="#" 
              buttonText="VIEW LIST"
            />
            <ResourceCard 
              icon={<ShoppingBag size={24} className="text-[#149184]" />}
              title="Amazon Starter Kit"
              description="A curated 10-item toolkit for the educator's pivot: from essential connectivity hubs to the focus-driven tools that bridge the gap."
              link="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?ref_=wl_share"
              buttonText="EXPLORE KIT"
            />
          </div>
        </div>

        {/* Footer Accent */}
        <footer className="mt-32 text-center opacity-20">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold">Hearth Horizon • 2026</p>
        </footer>
      </div>
    </div>
  );
};

// Reusable ResourceCard Component
const ResourceCard = ({ icon, title, description, link, buttonText }) => {
  return (
    <div className="bg-[#130f1c] border border-stone-800/40 p-10 rounded-[1.5rem] flex flex-col h-full transition-all duration-300 hover:border-[#149184]/40 hover:-translate-y-1 shadow-lg group">
      <div className="bg-[#149184]/5 border border-[#149184]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-inner transition-colors group-hover:bg-[#149184]/10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-stone-400 text-sm leading-relaxed mb-10 flex-grow font-light">
        {description}
      </p>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#149184] hover:bg-[#1bb0a1] text-black font-black text-[10px] tracking-[0.2em] py-5 rounded-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md shadow-black/20 uppercase"
      >
        {buttonText} <ExternalLink size={14} strokeWidth={3} />
      </a>
    </div>
  );
};

export default Library;