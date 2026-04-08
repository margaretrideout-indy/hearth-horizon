import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sprout, Leaf, TreeDeciduous, Heart } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      title: "Wayfarer",
      price: "$5",
      note: "One-time contribution",
      description: "For those just starting their journey into the tech landscape.",
      icon: <Sprout className="w-8 h-8 text-teal-400" />,
      link: "https://buy.stripe.com/test_wayfarer", 
      color: "border-teal-500/20"
    },
    {
      title: "Steward",
      price: "$15",
      note: "$8/month after first month",
      description: "For dedicated explorers seeking deeper community roots and guidance.",
      icon: <Leaf className="w-8 h-8 text-teal-400" />,
      link: "https://buy.stripe.com/test_steward",
      color: "border-teal-500/20"
    },
    {
      title: "Hearthkeeper",
      price: "$50",
      note: "$5/month after first month",
      description: "Full access to the canopy and a seat at the heart of the Grove.",
      icon: <TreeDeciduous className="w-8 h-8 text-teal-400" />,
      link: "https://buy.stripe.com/test_hearthkeeper",
      color: "border-teal-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] py-12 md:py-20 px-4 relative font-sans">
      {/* Functional Close Button */}
      <button 
        onClick={() => navigate('/library')} 
        className="fixed top-4 right-4 md:top-10 md:right-10 p-2 text-slate-500 hover:text-teal-400 transition-all active:scale-90 z-50"
      >
        <X className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-4 tracking-tight">
          Cultivate Your Path
        </h1>
        <p className="text-teal-400/80 italic text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
          Join the Grove as a Founding Wayfarer.
        </p>
      </div>

      {/* Main Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {tiers.map((tier, index) => (
          <div key={index} className={`bg-[#251D2F] border ${tier.color} rounded-2xl p-8 flex flex-col items-center text-center hover:bg-[#2D243A] transition-all group`}>
            <div className="mb-4 p-3 bg-[#1A1423] rounded-full group-hover:scale-110 transition-transform">
              {tier.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">{tier.title}</h3>
            <div className="flex flex-col mb-4">
              <span className="text-3xl font-bold text-slate-100">{tier.price}</span>
              <span className="text-xs text-teal-500/60 uppercase tracking-widest mt-1 font-semibold">{tier.note}</span>
            </div>
            <p className="text-slate-400 mb-8 flex-1 leading-relaxed text-sm">
              {tier.description}
            </p>
            <a 
              href={tier.link} 
              className="w-full py-3 px-6 bg-teal-600 text-slate-100 font-bold rounded-xl hover:bg-teal-500 transition-colors text-center shadow-lg shadow-teal-900/20"
            >
              Get Started
            </a>
          </div>
        ))}
      </div>

      {/* Re-Styled Donation Card (No Pink) */}
      <div className="max-w-2xl mx-auto bg-[#251D2F] border border-teal-500/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-teal-500/5 rounded-full">
          <Heart className="w-8 h-8 text-teal-500/70" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Plant a Seed</h4>
          <p className="text-slate-500 text-sm mt-1">
            Every contribution helps keep these resources free and accessible for all educators.
          </p>
        </div>
        <a 
          href="https://donate.stripe.com/test_donation" 
          className="whitespace-nowrap py-3 px-8 bg-[#3D3051] text-teal-400 border border-teal-500/30 font-bold rounded-xl hover:bg-[#4A3B63] hover:text-teal-300 transition-all w-full md:w-auto text-center"
        >
          Donate
        </a>
      </div>
    </div>
  );
};

export default GroveTiers;