import React from 'react';
import { ExternalLink, Book, ShoppingBag, Sparkles, Box } from 'lucide-react';

const Library = () => {
  return (
    <div className="min-h-screen bg-[#0f0a19] text-stone-200 py-16 px-6 font-sans selection:bg-[#00ffa3]/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 italic tracking-tight">The Library & Provisions</h1>
          <p className="text-xl text-stone-400 mb-4 font-light">Curated tools and blueprints to support your transition.</p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-[#00ffa3]"></div>
            <p className="text-[#00ffa3] font-medium italic text-sm tracking-wide">Transparently vetted by 13 years of leadership experience.</p>
          </div>
        </header>

        {/* Note on Reciprocity / Legal Disclosure */}
        <div className="bg-[#1a1425] border border-purple-900/20 rounded-2xl p-8 mb-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00ffa3] opacity-50"></div>
          <div className="flex items-center gap-2 text-[#00ffa3] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="animate-pulse" />
            <span>A Note on Reciprocity</span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
            I only recommend provisions I have personally used or verified. Some links below are affiliate links — at no cost to you — that help keep the <span className="text-[#00ffa3] font-bold">LINGUISTIC BRIDGE</span> free for all educators in transition. 
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-tighter text-stone-500 font-medium">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        {/* The Digital Workshop Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#00ffa3] uppercase text-[10px] font-black tracking-[0.2em]">The Digital Workshop</span>
            <div className="h-[1px] flex-grow bg-stone-800"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Sparkles size={24} className="text-[#00ffa3]" />}
              title="Teal Career Tracker"
              description="An AI-powered resume builder and job tracker that keeps your pivot organized and your applications intentional."
              link="https://www.tealhq.com"
              buttonText="EXPLORE TEAL"
              color="teal"
            />
            <ResourceCard 
              icon={<Box size={24} className="text-[#00ffa3]" />}
              title="Jobscan ATS Match"
              description="Compare your 'Linguistic Bridge' results against real job descriptions to ensure you pass through automated filters."
              link="https://www.jobscan.co"
              buttonText="EXPLORE JOBSCAN"
              color="teal"
            />
          </div>
        </div>

        {/* The Study Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-orange-500 uppercase text-[10px] font-black tracking-[0.2em]">The Study</span>
            <div className="h-[1px] flex-grow bg-stone-800"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Book size={24} className="text-orange-500" />}
              title="Bookshop.org List"
              description="Support local bookstores while building your professional library with my top-rated career transition reads."
              link="#" // Add your Bookshop link here
              buttonText="VIEW LIST"
              color="orange"
            />
            <ResourceCard 
              icon={<ShoppingBag size={24} className="text-orange-500" />}
              title="Amazon Starter Kit"
              description="Hand-picked workspace essentials, from ergonomic tech to the journals that kept me grounded during my 13-year tenure."
              link="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?tag=hearthandh0a6-20"
              buttonText="EXPLORE KIT"
              color="orange"
            />
          </div>
        </div>

        {/* Footer Accent */}
        <footer className="mt-32 text-center opacity-30">
          <p className="text-xs font-serif italic text-stone-500 italic">Est. 2026 — Hearth Horizon</p>
        </footer>
      </div>
    </div>
  );
};

// Reusable ResourceCard Component
const ResourceCard = ({ icon, title, description, link, buttonText, color }) => {
  const isOrange = color === 'orange';
  const accentClass = isOrange 
    ? 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20' 
    : 'bg-[#149184] hover:bg-[#1bb0a1] shadow-teal-900/20';
  const iconBg = isOrange ? 'bg-orange-900/10 border-orange-500/20' : 'bg-teal-900/10 border-teal-500/20';

  return (
    <div className="bg-[#161121] border border-stone-800/60 p-10 rounded-[2rem] flex flex-col h-full transition-all duration-300 hover:border-stone-600 hover:-translate-y-1 shadow-xl">
      <div className={`${iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border shadow-inner`}>
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
        className={`${accentClass} text-black font-black text-[10px] tracking-[0.2em] py-5 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg`}
      >
        {buttonText} <ExternalLink size={14} strokeWidth={3} />
      </a>
    </div>
  );
};

export default Library;