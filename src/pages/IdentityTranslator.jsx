import React from 'react';
import { Book, Sparkles, FileText, ShoppingBag, ExternalLink, GraduationCap, PenTool } from 'lucide-react';

const PARTNERS = [
  {
    category: "The Digital Workshop",
    items: [
      {
        title: "Teal Career Tracker",
        desc: "An AI-powered resume builder and job tracker that keeps your pivot organized.",
        btn: "Explore Teal",
        icon: Sparkles,
        link: "#" 
      },
      {
        title: "Jobscan ATS Match",
        desc: "Compare your 'Linguistic Bridge' results against real job descriptions to ensure you pass the filters.",
        btn: "Check Your Score",
        icon: FileText,
        link: "#" 
      }
    ]
  },
  {
    category: "Professional Growth",
    items: [
      {
        title: "Coursera Certifications",
        desc: "Bridge specific skill gaps with recognized certificates in Project Management or Data.",
        btn: "View Courses",
        icon: GraduationCap,
        link: "#" 
      },
      {
        title: "Creative Market Templates",
        desc: "High-aesthetic resume and portfolio templates for a modern tech look.",
        btn: "Browse Designs",
        icon: PenTool,
        link: "#" 
      }
    ]
  }
];

const THE_STUDY = [
  {
    title: "Bookshop.org List",
    desc: "Support local bookstores while building your professional library.",
    icon: Book,
    link: "#" 
  },
  {
    title: "Amazon Essentials",
    desc: "A curated list of my favorite hardware, ergonomic tools, and quick-ship resources.",
    icon: ShoppingBag,
    link: "#" 
  }
];

export default function IdentityTranslator() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16 min-h-screen">
      <div className="space-y-6 border-b border-gray-800 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white font-heading italic">The Library & Provisions</h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Curated tools and blueprints to support your transition. 
            <span className="block mt-2 text-sm italic text-teal-500/80 font-medium">
              Transparently vetted by 13 years of leadership experience.
            </span>
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-teal-500/5 border border-teal-500/20 max-w-3xl">
          <p className="text-xs text-gray-300 leading-relaxed">
            <strong className="text-teal-400 font-bold tracking-wider uppercase mr-2">A Note on Reciprocity:</strong> 
            I only recommend provisions I have personally used or verified. Some links below are affiliate links, meaning I may earn a small commission—at no cost to you—if you find them useful. As an Amazon Associate, I earn from qualifying purchases. This support allows me to keep the <strong>Linguistic Bridge</strong> free for all educators in transition.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {PARTNERS.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-bold text-teal-500">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, i) => (
                  <div key={i} className="p-6 rounded-xl bg-[#2D2438]/40 border border-gray-800 hover:border-teal-500/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="p-2 w-fit rounded-lg bg-teal-500/10 text-teal-500">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-white text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center gap-2 py-2 px-4 rounded-md border border-teal-500/30 text-teal-400 text-sm font-bold hover:bg-teal-500/10 transition-colors"
                    >
                      {item.btn} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-yellow-500">The Study</h2>
          <div className="space-y-4">
            {THE_STUDY.map((shelf, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#1C1622] border border-gray-800 hover:border-yellow-500/50 transition-all">
                <div className="space-y-4">
                   <div className="p-3 w-fit rounded-full bg-yellow-500/10 text-yellow-500">
                    <shelf.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white">{shelf.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{shelf.desc}</p>
                  <a 
                    href={shelf.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-bold transition-colors"
                  >
                    View List <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-dashed border-gray-800 mt-8">
            <p className="text-[10px] text-gray-500 text-center leading-tight uppercase tracking-widest">
              Every provision supports the Hearth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}