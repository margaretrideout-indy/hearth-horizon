import React from 'react';
import { Heart, Anchor } from 'lucide-react'; // Add these imports
// ... keep your other imports

export default function Rootwork() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-4 px-4">
      {/* Updated Header Section */}
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

      {/* Your existing Form/Cards below stay exactly the same */}
      <div className="mt-10">
        {/* ... keep all your reflection questions and input fields here ... */}
      </div>
    </div>
  );
}