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
    <div className="min-h-screen bg-[#1A1423] p-8 md:p-12 text-white font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Anchor className="w-5 h-5 text-[#FF6B35]" />
          <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-[0.3em]">
            The Rootwork
          </span>
        </div>
        
        <h1 className="text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-[0_2px_15px_rgba(255,255,255,0.05)]">
          Identity Anchors
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
          Align your 13-year legacy in education with your next move. These anchors ensure your transition is built on bedrock, not shifting sand.
        </p>
      </div>

      {/* REFLECTION CARDS */}
      <div className="space-y-12 max-w-4xl">
        {reflections.map((item) => (
          <div key={item.id} className="group">
            <div className="flex items-start gap-6 mb-4">
              <span className="text-2xl font-black italic text-[#FF6B35] leading-none pt-1">
                {item.id}
              </span>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-teal-400 transition-colors">
                  {item.question}
                </h3>
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
                  {item.hint}
                </p>
              </div>
            </div>

            <div className="relative">
              <textarea 
                placeholder={item.placeholder}
                className="w-full h-48 bg-[#0F0A15]/50 border border-white/5 rounded-3xl p-8 text-gray-300 placeholder:text-gray-700 focus:outline-none focus:border-teal-500/30 focus:ring-4 focus:ring-teal-500/5 transition-all resize-none shadow-inner"
              />
              <div className="absolute bottom-6 right-8 flex items-center gap-2 text-gray-600 group-focus-within:text-teal-500/50 transition-colors">
                <PenLine className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Drafting</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER ACTION */}
      <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-gray-500 italic text-sm">
          <Sparkles className="w-4 h-4 text-teal-500" />
          Anchoring your career history...
        </div>
        
        <button className="flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white rounded-2xl text-xs font-black uppercase tracking-[0.15em] hover:bg-[#FF6B35]/90 hover:scale-[1.02] transition-all shadow-xl shadow-[#FF6B35]/20 group">
          Lock In Anchors
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HorizonAudit;