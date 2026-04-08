import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sprout, Leaf, TreeDeciduous, Heart, Check } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();

  const tiers = [
    {
      title: "Seedling",
      price: "FREE",
      note: "ALWAYS OPEN",
      description: "Foundational access for those starting their journey.",
      perks: [
        "Foundational Badge",
        "2 Free PDF uploads/month",
        "Access to Library",
        "Access to Embers Chat"
      ],
      icon: <Sprout className="w-8 h-8 text-teal-400" />,
      link: "#", 
      color: "border-teal-500/20"
    },
    {
      title: "Hearthkeeper",
      price: "$3",
      note: "$5/mo after first month",
      description: "Removing limits to keep the fires burning bright.",
      perks: [
        "Everything in Seedling",
        "Unlimited PDF uploads",
        "Hearthkeeper Badge"
      ],
      icon: <TreeDeciduous className="w-8 h-8 text-teal-400" />,
      link: "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03",
      color: "border-teal-500/20"
    },
    {
      title: "Steward",
      price: "$5",
      note: "$8/mo after first month",
      description: "Full oversight and total access to the entire Grove.",
      perks: [
        "Everything in Hearthkeeper",
        "Full Website Access",
        "Ecosystem Alignment Tools",
        "The Canopy Resource Hub"
      ],
      icon: <Leaf className="w-8 h-8 text-teal-400" />,
      link: "https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04",
      color: "border-teal-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] py-12 md:py-20 px-4 relative font-sans">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {tiers.map((tier, index) => (
          <div key={index} className={`bg-[#251D2F] border ${tier.color} rounded-2xl p-8 flex flex-col hover:bg-[#2D243A] transition-all group`}>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="mb-4 p-3 bg-[#1A1423] rounded-full group-hover:scale-110 transition-transform">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-2">{tier.title}</h3>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-100">{tier.price}</span>
                <span className="text-[10px] text-teal-500/60 uppercase tracking-widest mt-1 font-semibold">{tier.note}</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-slate-300 text-sm mb-6 text-center italic">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.perks.map((perk, pIndex) => (
                  <li key={pIndex} className="flex items-start gap-3 text-slate-400 text-sm">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href={tier.link} 
              className={`w-full py-3 px-6 font-bold rounded-xl transition-colors text-center shadow-lg ${
                tier.price === "FREE" 
                ? "bg-[#3D3051] text-teal-400 border border-teal-500/30 hover:bg-[#4A3B63]" 
                : "bg-teal-600 text-slate-100 hover:bg-teal-500 shadow-teal-900/20"
              }`}
            >
              {tier.price === "FREE" ? "Get Started" : "Select Plan"}
            </a>
          </div>
        ))}
      </div>

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
          href="https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02" 
          className="whitespace-nowrap py-3 px-8 bg-[#3D3051] text-teal-400 border border-teal-500/30 font-bold rounded-xl hover:bg-[#4A3B63] hover:text-teal-300 transition-all w-full md:w-auto text-center"
        >
          Donate
        </a>
      </div>
    </div>
  );
};

export default GroveTiers;