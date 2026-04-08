import React from 'react';
import { ExternalLink, Book, ShoppingBag, Sparkles, Box } from 'lucide-react';

const LibraryAndProvisions = () => {
  return (
    <div className="min-h-screen bg-[#0f0a19] text-stone-200 py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2 italic">The Library & Provisions</h1>
          <p className="text-xl text-stone-400 mb-4">Curated tools and blueprints to support your transition.</p>
          <p className="text-[#00ffa3] font-medium italic text-sm">Transparently vetted by 13 years of leadership experience.</p>
        </header>

        {/* Note on Reciprocity */}
        <div className="bg-[#1a1425] border border-purple-900/30 rounded-xl p-6 mb-16">
          <div className="flex items-center gap-2 text-[#00ffa3] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles size={14} />
            <span>A Note on Reciprocity</span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed">
            I only recommend provisions I have personally used or verified. Some links below are affiliate links — at no cost to you — that help keep the <span className="text-[#00ffa3] font-bold">LINGUISTIC BRIDGE</span> free for all educators in transition. 
            <span className="block mt-2 opacity-70 text-[10px]">As an Amazon Associate, I earn from qualifying purchases.</span>
          </p>
        </div>

        {/* The Digital Workshop Section (Teal/Jobscan) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-b border-stone-800 pb-2">
            <span className="text-[#00ffa3] uppercase text-xs font-bold tracking-tighter">The Digital Workshop</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ResourceCard 
              icon={<Sparkles className="text-[#00ffa3]" />}
              title="Teal Career Tracker"
              description="An AI-powered resume builder and job tracker that keeps your pivot organized."
              link="https://www.tealhq.com" // Update with your actual affiliate link if you have one
              buttonText="EXPLORE TEAL"
              color="teal"
            />
            <ResourceCard 
              icon={<Box className="text-[#00ffa3]" />}
              title="Jobscan ATS Match"
              description="Compare your 'Linguistic Bridge' results against real job descriptions to ensure you pass the filters."
              link="https://www.jobscan.co"
              buttonText="EXPLORE JOBSCAN"
              color="teal"
            />
          </div>
        </div>

        {/* The Study Section (Bookshop/Amazon) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 border-b border-stone-800 pb-2">
            <span className="text-orange-500 uppercase text-xs font-bold tracking-tighter">The Study</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <ResourceCard 
              icon={<Book className="text-orange-500" />}
              title="Bookshop.org List"
              description="Support local bookstores while building your professional library with my top-rated career transition reads."
              link="YOUR_BOOKSHOP_LINK_HERE"
              buttonText="VIEW LIST"
              color="orange"
            />
            <ResourceCard 
              icon={<ShoppingBag className="text-orange-500" />}
              title="Amazon Starter Kit"
              description="Hand-picked workspace essentials, from ergonomic tech to the journals that kept me grounded during my 13-year tenure."
              link="https://www.amazon.ca/hz/wishlist/ls/5VU3W7XP4CZD?tag=hearthandh0a6-20"
              buttonText="EXPLORE KIT"
              color="orange"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Card Component to keep the code clean
const ResourceCard = ({ icon, title, description, link, buttonText, color }) => {
  const isOrange = color === 'orange';
  const accentClass = isOrange ? 'bg-orange-600 hover:bg-orange-500' : 'bg-[#149184] hover:bg-[#1bb0a1]';
  const iconBg = isOrange ? 'bg-orange-900/20' : 'bg-teal-900/20';

  return (
    <div className="bg-[#1a1425] border border-stone-800 p-8 rounded-2xl flex flex-col h-full transition-all hover:border-stone-700">
      <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${accentClass} text-black font-bold text-xs tracking-widest py-4 rounded-md flex items-center justify-center gap-2 transition-colors`}
      >
        {buttonText} <ExternalLink size={14} />
      </a>
    </div>
  );
};

export default LibraryAndProvisions;