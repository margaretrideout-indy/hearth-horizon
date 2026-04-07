import React from 'react';
import { Anchor, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Rootwork() {
  return (
    <div className="min-h-screen bg-[#1A1423] text-white p-6 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-[#E2776F]">
            <Anchor className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Rootwork</span>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter">Identity Anchors</h1>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl">
            Align your 13-year legacy in education with your next move. These anchors ensure your transition is built on bedrock, not shifting sand.
          </p>
        </header>

        {/* Reflection Questions */}
        <div className="space-y-12">
          {[
            { 
              id: "01", 
              q: "What is your ideal daily rhythm?", 
              sub: "Consider deep focus blocks, flexible hours, or collaborative energy." 
            },
            { 
              id: "02", 
              q: "Which core skills from your 13 years feel most energizing?", 
              sub: "Focus on the work that makes time disappear." 
            },
            { 
              id: "03", 
              q: "What kind of impact must your work have to feel 'right'?", 
              sub: "Define the values that are non-negotiable for your next chapter." 
            }
          ].map((item) => (
            <section key={item.id} className="space-y-4 group">
              <div className="flex items-center gap-4">
                <span className="text-[#E2776F] font-black italic text-xl">{item.id}.</span>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-200 group-hover:text-[#E2776F] transition-colors">
                  {item.q}
                </h2>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest pl-10">
                {item.sub}
              </p>
              <div className="pl-10">
                <textarea 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-gray-300 text-sm focus:border-[#E2776F]/40 focus:bg-white/[0.04] transition-all min-h-[180px] italic outline-none resize-none"
                  placeholder="Record your reflection here..."
                />
              </div>
            </section>
          ))}
        </div>

        {/* Footer Insight */}
        <footer className="pt-8">
          <Card className="p-8 bg-[#E2776F]/5 border-[#E2776F]/10 rounded-[3rem] flex gap-6 items-start">
            <div className="p-3 bg-[#E2776F]/10 rounded-2xl">
              <Target className="w-6 h-6 text-[#E2776F]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-black text-[#E2776F] uppercase tracking-[0.2em]">Librarian's Note</span>
              <p className="text-xs text-gray-400 leading-relaxed font-medium italic">
                "Rootwork isn't about looking back at where you were; it's about identifying the parts of yourself that stay constant while everything else changes."
              </p>
            </div>
          </Card>
        </footer>

      </div>
    </div>
  );
}