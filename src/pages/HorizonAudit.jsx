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
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans">
      
      {/* COMPACT HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2 text-teal-400">
          <Anchor className="w-3.5 h-3.5" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]">The Rootwork</span>
        </div>
        
        <h1 className="text-2xl font-serif font-bold tracking-tight mb-2 text-white">
          Identity Anchors
        </h1>
        
        <p className="text-sm text-gray-400 max-w-xl leading-relaxed">
          Align your 13-year legacy in education with your next move.
        </p>
      </div>

      {/* REFINED REFLECTION CARDS */}
      <div className="space-y-6 max-w-4xl">
        {reflections.map((item) => (
          <div key={item.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-base font-bold italic text-teal-400 leading-none">
                {item.id}
              </span>
              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  {item.question}
                </h3>
                <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-32 bg-black/20 border border-white/5 rounded-xl p-5 text-sm text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-teal-500/20 transition-all resize-none font-light"
              />
              <div className="absolute bottom-4 right-5 flex items-center gap-1.5 text-gray-700">
                <PenLine className="w-3 h-3" />
                <span className="text-[8px] font-bold uppercase tracking-widest italic">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-600 italic text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-teal-900" />
          Anchoring your history...
        </div>
        
        <button className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 transition-all shadow-lg shadow-[#FF6B35]/10 group">
          Lock In Anchors
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;