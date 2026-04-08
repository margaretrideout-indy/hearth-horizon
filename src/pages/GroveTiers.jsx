import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sprout, Leaf, TreeDeciduous, Heart } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      title: "Sprout",
      price: "$5",
      description: "Plant a seed in the community and gain foundational access.",
      icon: <Sprout className="w-8 h-8 text-emerald-400" />,
      link: "#", 
      color: "border-emerald-500/20"
    },
    {
      title: "Sapling",
      price: "$15",
      description: "Expand your reach with deeper resources and community insights.",
      icon: <Leaf className="w-8 h-8 text-teal-400" />,
      link: "#",
      color: "border-teal-500/20"
    },
    {
      title: "Ancient Oak",
      price: "$50",
      description: "The full canopy of support for a complete career transition.",
      icon: <TreeDeciduous className="w-8 h-8 text-sky-400" />,
      link: "#",
      color: "border-sky-500/20"
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {tiers.map((tier, index) => (
          <div key={index} className={`bg-[#251D2F] border ${tier.color} rounded-2xl p-8 flex flex-col items-center text-center hover:bg-[#2D243A] transition-all`}>
            <div className="mb-4 p-3 bg-[#1A1423] rounded-full">
              {tier.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">{tier.title}</h3>
            <div className="text-3xl font-bold text-slate-100 mb-4">{tier.price}</div>
            <p className="text-slate-400 mb-8 flex-1">{tier.description}</p>
            <a href={tier.link} className="w-full py-3 px-6 bg-slate-100 text-[#1A1423] font-bold rounded-xl hover:bg-white transition-colors">
              Get Started
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-[#251D2F]/50 border border-pink-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-pink-500/10 rounded-full">
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold text-slate-100">Plant a Seed</h4>
          <p className="text-slate-400 text-sm">Every contribution helps keep these resources free and accessible for all educators.</p>
        </div>
        <a href="#" className="whitespace-nowrap py-3 px-8 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-500 transition-colors w-full md:w-auto text-center">
          Donate
        </a>
      </div>
    </div>
  );
};

export default GroveTiers;