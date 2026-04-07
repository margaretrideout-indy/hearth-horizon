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
      
      {/* HEADER SECTION - Matched to Alignment Theme */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-4 text-teal-400">
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

      {/* REFLECTION CARDS - Using the 'Alignment' Card Style */}
      <div className="space-y-10 max-w-4xl">
        {reflections.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.07] transition-all group">
            <div className="flex items-start gap-5 mb-6">
              <span className="text-lg font-black italic text-teal-400/80 leading-none">
                {item.id}
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white mb-1">
                  {item.question}
                </h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-44 bg-black/20 border border-white/5 rounded-2xl p-6 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-teal-500/30 transition-all resize-none"
              />
              <div className="absolute bottom-5 right-6 flex items-center gap-2 text-gray-600">
                <PenLine className="w-3.5 h-3.5" />
                <span className="text-[9px] font-bold uppercase tracking-widest italic">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-500 italic text-sm">
          <Sparkles className="w-4 h-4 text-teal-500/50" />
          Anchoring your history...
        </div>
        
        <button className="flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 hover:scale-[1.02] transition-all shadow-xl shadow-[#FF6B35]/20 group">
          Lock In Anchors
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;