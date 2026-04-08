import React from 'react';
import { ExternalLink, Book, ShoppingBag, Sparkles, Box } from 'lucide-react';

const Library = () => {
  return (
    <div className="min-h-screen bg-[#0f0a19] text-stone-300 py-16 px-6 font-sans selection:bg-[#4c1d95]/40">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 italic tracking-tight">The Library & Provisions</h1>
          <p className="text-xl text-stone-400 mb-4 font-light">Curated tools and blueprints to support your transition.</p>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-[#6366f1]"></div>
            <p className="text-[#a78bfa] font-medium italic text-sm tracking-wide">Transparently vetted by 13 years of leadership experience.</p>
          </div>
        </header>

        {/* Note on Reciprocity / Legal Disclosure */}
        <div className="bg-[#1a1425] border border-[#4c1d95]/30 rounded-2xl p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#6d28d9] opacity-50"></div>
          <div className="flex items-center gap-2 text-[#a78bfa] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            <span>A Note on Reciprocity</span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed max-w-3xl">
            I only recommend provisions I have personally used or verified. Some links below are affiliate links — at no cost to you — that help keep the <span className="text-[#a78bfa] font-bold uppercase tracking-tighter">Hearth Horizon</span> resources free for all educators in transition. 
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-tighter text-stone-500 font-medium italic">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>

        {/* The Digital Workshop Section - Teal/Plum Accents */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-stone-500 uppercase text-[10px] font-black tracking-[0.2em]">The Digital Workshop</span>
            <div className="h-[1px] flex-grow bg-stone-800/50"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Sparkles size={24} className="text-[#2dd4bf]" />}
              title="Teal Career Tracker"
              description="An AI-powered resume builder and job tracker that keeps your pivot organized and your applications intentional."
              link="https://www.tealhq.com"
              buttonText="EXPLORE TEAL"
              color="plum"
            />
            <ResourceCard 
              icon={<Box size={24} className="text-[#2dd4bf]" />}
              title="Jobscan ATS Match"
              description="Compare your results against real job descriptions to ensure you pass through automated filters during your transition."
              link="https://www.jobscan.co"
              buttonText="EXPLORE JOBSCAN"
              color="plum"
            />
          </div>
        </div>

        {/* The Study Section - Plum/Grey Accents */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[#a78bfa] uppercase text-[10px] font-black tracking-[0.2em]">The Study</span>
            <div className="h-[1px] flex-grow bg-stone-800/50"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ResourceCard 
              icon={<Book size={24} className="text-[#a78bfa]" />}
              title="Bookshop.org List"
              description="Support local bookstores while building your professional library with my top-rated career transition reads."
              link="#" 
              buttonText="VIEW LIST"
              color="plum"
            />
            <ResourceCard 
              icon={<ShoppingBag size={24} className="text-[#a78bfa]" />}
              title="Amazon Starter Kit"
              description="Hand-picked workspace essentials, from ergonomic tech to the journals that kept me grounded during my 13-year tenure."
              link="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?tag=hearthandh0a6-20"
              buttonText="EXPLORE KIT"
              color="plum"
            />
          </div>
        </div>

        <footer className="mt-32 text-center opacity-30">
          <p className="text-xs font-serif italic text-stone-600">Est. 2026 — Hearth Horizon</p>
        </footer>
      </div>
    </div>
  );
};

// Reusable ResourceCard Component
const ResourceCard = ({ icon, title, description, link, buttonText }) => {
  return (
    <div className="bg-[#161121] border border-stone-800/40 p-10 rounded-[2rem] flex flex-col h-full transition-all duration-300 hover:border-[#4c1d95]/40 hover:-translate-y-1 shadow-xl group">
      <div className="bg-[#2e1065]/20 border border-[#4c1d95]/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-colors group-hover:bg-[#2e1065]/40">
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
        className="bg-[#581c87] hover:bg-[#6b21a8] text-[#e9d5ff] font-black text-[10px] tracking-[0.2em] py-5 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-black/40"
      >
        {buttonText} <ExternalLink size={14} strokeWidth={3} />
      </a>
    </div>
  );
};

export default Library;