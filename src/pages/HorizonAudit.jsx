import React from 'react';
import { Anchor, Sparkles, ChevronRight, PenLine } from 'lucide-react';

const HorizonAudit = () => {
  const reflections = [
    {
      id: "01.",
      question: "What is your ideal daily rhythm?",
      hint: "CONSIDER DEEP FOCUS BLOCKS, FLEXIBLE HOURS, OR COLLABORATIVE ENERGY.",
      placeholder: "Record your reflection here..."
    },
    {
      id: "02.",
      question: "Which core skills from your 13 years feel most energizing?",
      hint: "FOCUS ON THE WORK THAT MAKES TIME DISAPPEAR.",
      placeholder: "Record your reflection here..."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 md:p-14 text-white font-sans">
      
      {/* HEADER SECTION - Precise Alignment Match */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3 text-teal-400">
          <Anchor className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">The Rootwork</span>
        </div>
        
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-4 text-white">
          Identity Anchors
        </h1>
        
        <p className="text-base text-gray-400 max-w-2xl leading-relaxed">
          Align your 13-year legacy in education with your next move. These anchors ensure your transition is built on bedrock, not shifting sand.
        </p>
      </div>

      {/* REFLECTION CARDS - Using Soft Alignment Palette */}
      <div className="space-y-8 max-w-5xl">
        {reflections.map((item) => (
          <div key={item.id} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xl font-bold italic text-teal-400 leading-none">
                {item.id}
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {item.question}
                </h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-48 bg-black/20 border border-white/5 rounded-2xl p-7 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-teal-500/20 transition-all resize-none font-light leading-relaxed"
              />
              <div className="absolute bottom-6 right-8 flex items-center gap-2 text-gray-700 group-hover:text-gray-600 transition-colors">
                <PenLine className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest italic">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-600 italic text-sm">
          <Sparkles className="w-4 h-4 text-teal-900" />
          Anchoring your history...
        </div>
        
        <button className="flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 hover:scale-[1.02] transition-all shadow-xl shadow-[#FF6B35]/10 group">
          Lock In Anchors
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;