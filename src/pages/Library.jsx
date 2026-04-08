import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { BookOpen, Bookmark, Sparkles, ExternalLink, ArrowRight, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Library() {
  const { data: savedItems = [], isLoading } = useQuery({
    queryKey: ['savedResources'],
    queryFn: () => base44.entities.SavedResource.list(), 
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16 pb-24">
      
      {/* SECTION: THE MANTLE (User's Personal Collection) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
            <Bookmark className="w-4 h-4 text-teal-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-none">The Mantle</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Your Saved Collection</p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8">
          <AnimatePresence mode="wait">
            {savedItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-10 text-center space-y-4 border-2 border-dashed border-white/5 rounded-[1.5rem]"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A1423] flex items-center justify-center border border-white/10">
                  <Sparkles className="w-5 h-5 text-slate-700" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-300 text-sm font-medium">Your mantle is currently empty.</p>
                  <p className="text-slate-500 text-[11px] italic">Visit the Canopy to gather the tools that speak to your journey.</p>
                </div>
                <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-teal-500 pt-2">
                  Go to Canopy <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="p-5 bg-[#251D2F] rounded-2xl border border-white/5 hover:border-teal-500/30 transition-all">
                    <h3 className="text-white font-bold text-sm">{item.title}</h3>
                    <button className="mt-3 text-[10px] text-teal-500 font-bold uppercase flex items-center gap-1">
                      View Resource <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION: DIGITAL WORKSHOP (Curated Action Tools) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <PenTool className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-none">Digital Workshop</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Foundational Tools</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#251D2F] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all group">
            <h3 className="text-2xl font-black text-white mb-2">Teal</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Manage your job search and optimize your applications in one place.</p>
            <button className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#251D2F] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all group">
            <h3 className="text-2xl font-black text-white mb-2">Jobscan</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Match your resume against job descriptions to pass the ATS filters.</p>
            <button className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div className="bg-teal-900/10 border border-teal-500/20 p-8 rounded-[2rem]">
        <p className="text-[11px] text-teal-200/60 leading-relaxed italic text-center max-w-2xl mx-auto">
          "A note on reciprocity: These tools are vetted by 13 years of leadership experience. Use them to build your horizon, then share what you find back at the Hearth."
        </p>
      </div>

    </div>
  );
}