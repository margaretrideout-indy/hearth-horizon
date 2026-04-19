import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ExternalLink, 
  Heart, 
  Wind, 
  Mic2, 
  FileText,
  ShieldAlert
} from 'lucide-react';

export default function Library() {
  const resources = [
    {
      title: "From Burnout to Balance",
      description: "A comprehensive guide to reclaiming your energy and setting sustainable boundaries in a high-pressure world.",
      link: "https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf",
      type: "PDF Guide",
      icon: FileText,
      color: "text-orange-400"
    },
    {
      title: "Your Inner Advocate",
      description: "A podcast dedicated to changing the internal narrative and advocating for your own mental well-being.",
      link: "https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987",
      type: "Podcast",
      icon: Mic2,
      color: "text-teal-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A080D] text-white pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-20 space-y-20">
        
        {/* HEADER */}
        <header className="space-y-6 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-teal-500/80"
          >
            <BookOpen size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Archive</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">
            Knowledge <span className="text-zinc-800 not-italic uppercase font-sans font-thin">Vault</span>
          </h1>
        </header>

        {/* SANCTUARY SECTION */}
        <section className="space-y-10">
          <div className="flex items-center gap-4 border-b border-white/5 pb-6">
            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
              <Heart size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif italic">The Sanctuary</h2>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Mental Health & Resilience Resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group relative p-8 bg-[#110E16] border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all h-full flex flex-col justify-between overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${item.color}`}>
                        <item.icon size={24} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-600 bg-white/5 px-3 py-1 rounded-full">
                        {item.type}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif italic text-zinc-200">{item.title}</h3>
                    
                    {/* REQUESTED COLOR #686868 */}
                    <p className="text-sm leading-relaxed" style={{ color: '#686868' }}>
                      {item.description}
                    </p>
                  </div>

                  <Button 
                    asChild 
                    variant="ghost" 
                    className="mt-8 w-full group-hover:bg-white/5 rounded-xl border border-white/5 text-zinc-400 hover:text-white transition-all"
                  >
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      Open Resource <ExternalLink size={14} className="ml-2" />
                    </a>
                  </Button>

                  {/* Subtle Background Glow */}
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-teal-500/10 transition-all duration-700" />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GUIDANCE NOTE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-[2rem] bg-teal-500/5 border border-teal-500/10 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="text-teal-500">
            <ShieldAlert size={32} />
          </div>
          <p className="text-xs text-zinc-400 italic font-serif text-center md:text-left">
            "The Hearth is a tool for navigation, but your internal compass is the final authority. If the weight of the journey feels too heavy, please seek direct support from a licensed professional."
          </p>
        </motion.div>

      </div>
    </div>
  );
}