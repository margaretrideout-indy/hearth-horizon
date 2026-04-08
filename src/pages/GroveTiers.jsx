import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sprout, Leaf, TreeDeciduous, Heart } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1423] py-12 md:py-20 px-4 relative">
      <button 
        onClick={() => navigate('/library')} 
        className="fixed top-4 right-4 md:top-10 md:right-10 p-2 text-slate-500 hover:text-slate-100 transition-all active:scale-90 z-50"
      >
        <X className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mb-4 tracking-tight">
          Cultivate Your Path
        </h1>
        <p className="text-slate-400 italic text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join the Grove as a Founding Wayfarer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Tiers would go here */}
      </div>
    </div>
  );
};

export default GroveTiers;