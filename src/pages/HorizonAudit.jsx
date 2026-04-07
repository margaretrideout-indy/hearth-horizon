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
      
      {/* HEADER SECTION */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Anchor className="w-4 h-4 text-teal-500/60" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
            The Rootwork
          </span>
        </div>
        
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-white">
          Identity Anchors
        </h1>
        
        <p className="text-base text-gray-400 max-w-xl leading-relaxed italic">
          Align your 13-year legacy in education with your next move.
        </p>
      </div>

      {/* REFLECTION CARDS */}
      <div className="space-y-10 max-w-3xl">
        {reflections.map((item) => (
          <div key={item.id} className="group">
            <div className="flex items-start gap-4 mb-3">
              <span className="text-lg font-black italic text-teal-500/80">
                {item.id}
              </span>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  {item.question}
                </h3>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest italic">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-40 bg-[#1A1423] border border-white/5 rounded-2xl p-6 text-gray-300 placeholder:text-gray-800 focus:outline-none focus:border-teal-500/20 focus:ring-1 focus:ring-teal-500/10 transition-all resize-none shadow-2xl shadow-black/40"
              />
              <div className="absolute bottom-4 right-6 flex items-center gap-2 text-gray-700">
                <PenLine className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest italic">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-600 italic text-xs">
          <Sparkles className="w-4 h-4 text-teal-900" />
          Anchoring your career history...
        </div>
        
        <button className="flex items-center gap-3 px-6 py-3 bg-[#FF6B35] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 transition-all shadow-lg shadow-[#FF6B35]/10">
          Lock In Anchors
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;