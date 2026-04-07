import React from 'react';
import { Heart, Anchor, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Rootwork() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-4 px-4">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-orange-400">
          <Heart className="w-5 h-5 fill-orange-400/20" />
          <span className="text-xs font-bold uppercase tracking-widest">The Rootwork</span>
        </div>
        <h1 className="text-4xl font-bold text-white font-heading italic leading-tight">
          Identity Anchors
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Align your values with your next career move. Take a moment to reflect honestly on where you've been and who you are becoming.
        </p>
      </header>

      <div className="space-y-8">
        {[
          {
            id: 1,
            q: "What is your ideal daily rhythm? (e.g., deep focus blocks, flexible hours, collaborative mornings)",
          },
          {
            id: 2,
            q: "Which of your 13-year skills feels most energizing to you right now?",
          },
          {
            id: 3,
            q: "What kind of impact do you most want your work to have in the world?",
          },
          {
            id: 4,
            q: "What does financial and professional autonomy look like for you in 3 years?",
          },
        ].map((item) => (
          <div key={item.id} className="space-y-3">
            <h3 className="text-orange-400 font-medium flex gap-2">
              <span className="opacity-70">{item.id}.</span> {item.q}
            </h3>
            <Card className="bg-[#2D2438]/40 border-white/5 overflow-hidden rounded-2xl">
              <Textarea 
                placeholder="Your reflection..." 
                className="bg-transparent border-none text-gray-300 min-h-[120px] focus-visible:ring-0 focus-visible:ring-offset-0 resize-none italic text-lg p-6"
              />
            </Card>
          </div>
        ))}

        <div className="pt-6 flex justify-end">
          <Button className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-6 rounded-2xl font-bold text-lg shadow-lg shadow-orange-900/20 transition-all hover:-translate-y-1">
            Anchor My Reflections
          </Button>
        </div>
      </div>
    </div>
  );
}