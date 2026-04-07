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
    <div className="min-h-screen bg-[#0F0A15] p-8 md:p-12 text-white font-sans">
      
      {/* REFINED HEADER SECTION */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Anchor className="w-3.5 h-3.5 text-teal-500/50" />
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
            The Rootwork
          </span>
        </div>
        
        <h1 className="text-3xl font-black italic tracking-tight uppercase mb-3 text-white">
          Identity Anchors
        </h1>
        
        <p className="text-sm text-gray-500 max-w-lg leading-relaxed italic">
          Align your 13-year legacy in education with your next move.
        </p>
      </div>

      {/* COMPACT REFLECTION CARDS */}
      <div className="space-y-8 max-w-2xl">
        {reflections.map((item) => (
          <div key={item.id} className="group">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-sm font-black italic text-teal-500/60">
                {item.id}
              </span>
              <div>
                <h3 className="text-md font-bold uppercase tracking-tight text-gray-200 group-hover:text-teal-400 transition-colors">
                  {item.question}
                </h3>
                <p className="text-[8px] font-bold text-gray-700 uppercase tracking-widest italic mt-0.5">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-32 bg-[#1A1423]/60 border border-white/5 rounded-xl p-5 text-sm text-gray-300 placeholder:text-gray-800 focus:outline-none focus:border-teal-500/20 transition-all resize-none shadow-xl shadow-black/20"
              />
              <div className="absolute bottom-3 right-4 flex items-center gap-1.5 text-gray-800">
                <PenLine className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest italic">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-700 italic text-[10px]">
          <Sparkles className="w-3.5 h-3.5 text-teal-900" />
          Anchoring your history...
        </div>
        
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B35] text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 transition-all shadow-md">
          Lock In Anchors
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;