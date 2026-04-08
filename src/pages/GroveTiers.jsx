import React, { useState } from 'react';
import { Check, Sprout, Flame, Shield, Heart } from 'lucide-react';

const GroveTiers = () => {
  const [donation, setDonation] = useState('');

  const tiers = [
    {
      name: "Plant a Seed",
      icon: <Heart className="w-6 h-6 text-[#14F1C9]" />,
      price: "DONATE",
      subtext: "One-time contribution",
      description: "Support the ecosystem with a custom amount. Every bit helps the grove grow.",
      features: ["Community gratitude", "Supporter badge in Embers", "General ecosystem updates"],
      isDonation: true
    },
    {
      name: "Seedling",
      icon: <Sprout className="w-6 h-6 text-[#14F1C9]" />,
      price: "FREE",
      subtext: "Always free",
      description: "Start your journey and begin planting the seeds of your career transition.",
      features: ["Basic Library access", "Introductory Rootwork", "Community Embers access"]
    },
    {
      name: "Hearthkeeper",
      icon: <Flame className="w-6 h-6 text-[#14F1C9]" />,
      price: "$3",
      subtext: "First month, then $5",
      description: "Keep the fire burning with consistent tools and deeper community insights.",
      features: ["Full Linguistic Bridge", "Advanced Rootwork tools", "Weekly Embers sessions", "Priority Library access"],
      highlight: true
    },
    {
      name: "Steward",
      icon: <Shield className="w-6 h-6 text-[#14F1C9]" />,
      price: "$5",
      subtext: "First month, then $8",
      description: "Take ownership of the ecosystem and guide your transition with full support.",
      features: ["White-glove alignment", "Direct support in Embers", "Full ecosystem mastery", "Exclusive Steward resources"]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto text-white">
      <div className="mb-12">
        <h1 className="text-3xl font-black tracking-tighter mb-2 italic text-white/90">THE GROVE</h1>
        <p className="text-gray-400 uppercase text-[10px] tracking-widest font-bold">Cultivate your path</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
              tier.highlight 
                ? 'border-[#14F1C9] bg-[#2A1F3D] shadow-[0_0_30px_rgba(20,241,201,0.05)]' 
                : 'border-white/10 bg-[#1A1423]'
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#14F1C9] text-[#1A1423] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Highly Recommended
              </span>
            )}
            
            <div className="mb-6">{tier.icon}</div>
            <h3 className="text-xl font-bold mb-1 uppercase tracking-tight text-white">{tier.name}</h3>
            
            <div className="flex flex-col mb-4">
                <span className="text-3xl font-black text-[#14F1C9]">{tier.price}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{tier.subtext}</span>
            </div>
            
            {tier.isDonation ? (
              <div className="mb-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={donation}
                    onChange={(e) => setDonation(e.target.value)}
                    className="w-full bg-black/10 border border-white/5 rounded-xl py-3 pl-8 pr-4 text-white text-sm focus:outline-none focus:border-[#14F1C9] transition-colors"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-8 leading-relaxed italic">{tier.description}</p>
            )}
            
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-[#14F1C9] mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] font-medium uppercase tracking-tighter leading-tight">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              tier.highlight 
                ? 'bg-[#14F1C9] text-[#1A1423] hover:scale-[1.02] shadow-[0_0_15px_rgba(20,241,201,0.2)]' 
                : 'border border-white/20 text-white hover:bg-white/5'
            }`}>
              {tier.isDonation ? 'Plant Seed' : `Begin ${tier.name} Path`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroveTiers;