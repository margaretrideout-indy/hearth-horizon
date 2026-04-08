import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { BookOpen, Bookmark, Sparkles, ExternalLink, ArrowRight, PenTool, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Library() {
  const queryClient = useQueryClient();
  const [addingId, setAddingId] = useState(null);

  const { data: savedItems = [] } = useQuery({
    queryKey: ['savedResources'],
    queryFn: () => base44.entities.SavedResource.list(), 
  });

  const handleAddToMantle = async (toolName, toolDesc) => {
    setAddingId(toolName);
    try {
      await base44.entities.SavedResource.create({
        title: toolName,
        description: toolDesc,
      });
      queryClient.invalidateQueries({ queryKey: ['savedResources'] });
      setTimeout(() => setAddingId(null), 1500);
    } catch (e) {
      console.error(e);
      setAddingId(null);
    }
  };

  const scrollToProvisions = () => {
    const section = document.getElementById('curated-provisions');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-16 pb-24">
      
      <header className="space-y-2 ml-1">
        <h1 className="text-4xl font-black text-white tracking-tighter">Library & Provisions</h1>
        <p className="text-slate-500 text-sm font-medium">Curated tools for your transition and your personal mantle of progress.</p>
      </header>

      {/* 1. THE MANTLE */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
            <Bookmark className="w-4 h-4 text-teal-500" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-none">The Mantle</h2>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8">
          <AnimatePresence mode="wait">
            {savedItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-10 text-center space-y-4 border-2 border-dashed border-white/5 rounded-[1.5rem]"
              >
                <Sparkles className="w-5 h-5 text-slate-700" />
                <div className="space-y-1">
                  <p className="text-slate-300 text-sm font-medium">Your mantle is currently empty.</p>
                  <p className="text-slate-500 text-[11px] italic">Adopt a tool from the workshop below to see it here.</p>
                </div>
                <button 
                  onClick={scrollToProvisions} 
                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-teal-500 pt-2"
                >
                  Explore Provisions Below <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="p-5 bg-[#251D2F] rounded-2xl border border-teal-500/20 shadow-lg shadow-teal-500/5">
                    <h3 className="text-white font-bold text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-[10px] mt-1 italic">Active Tool</p>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div id="curated-provisions" className="pt-4" />

      {/* 2. DIGITAL WORKSHOP */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <PenTool className="w-4 h-4 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-none">Digital Workshop</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Teal', desc: 'Manage your job search and optimize applications.' },
            { name: 'Jobscan', desc: 'Match your resume against job descriptions.' }
          ].map((tool) => (
            <div key={tool.name} className="bg-[#251D2F] border border-white/5 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black text-white">{tool.name}</h3>
                <button 
                  onClick={() => handleAddToMantle(tool.name, tool.desc)}
                  className={`p-2 rounded-xl border transition-all ${addingId === tool.name ? 'bg-teal-500/20 border-teal-500 text-teal-400' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                >
                  {addingId === tool.name ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{tool.desc}</p>
              <button className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
                Explore Tool <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THE STUDY */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 ml-1">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <BookOpen className="w-4 h-4 text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight leading-none">The Study</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#251D2F] border border-white/5 p-8 rounded-[2.5rem] hover:border-orange-500/30 transition-all group">
            <h3 className="text-2xl font-black text-white mb-2">Bookshop.org List</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Support local bookstores while building your professional library with my top-rated reads.</p>
            <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
              View List <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#251D2F] border border-white/5 p-8 rounded-[2.5rem] hover:border-orange-500/30 transition-all group">
            <h3 className="text-2xl font-black text-white mb-2">Amazon Essentials</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Hand-picked workspace essentials and journals that kept me grounded during my 13-year tenure.</p>
            <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
              Explore Shop <ExternalLink className="w-3.5 h-3.5" />
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