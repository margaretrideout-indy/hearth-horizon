import React, { useState } from 'react';
import { Check, Heart, Sprout, Flame, Shield } from 'lucide-react';

const GroveTiers = () => {
  const [donation, setDonation] = useState('');

  const tiers = [
    { 
      name: "Plant a Seed", 
      price: "Donate", 
      sub: "One-time", 
      icon: <Heart size={20} />, 
      desc: "Support the ecosystem.", 
      features: ["Community gratitude", "Supporter badge"], 
      isDonation: true,
      buttonText: "Plant Seed"
    },
    { 
      name: "Seedling", 
      price: "Free", 
      sub: "Always free", 
      icon: <Sprout size={20} />, 
      desc: "Start your journey.", 
      features: ["Basic Library", "Rootwork Audit"],
      buttonText: "Tend the fire" 
    },
    { 
      name: "Hearthkeeper", 
      price: "$3", 
      sub: "First mo, then $5", 
      icon: <Flame size={20} />, 
      desc: "Keep the sanctuary open.", 
      features: ["Linguistic Bridge", "Unlimited Uploads"], 
      highlight: true,
      buttonText: "Tend the fire" 
    },
    { 
      name: "Steward", 
      price: "$5", 
      sub: "First mo, then $8", 
      icon: <Shield size={20} />, 
      desc: "Sponsor a peer in transition.", 
      features: ["Reciprocity model", "Full alignment"], 
      highlight: true,
      buttonText: "Tend the fire" 
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[#1A1423]">
      <div className="mb-12">
        <h1 className="text-3xl font-serif italic text-white/90">The Grove</h1>
        <p className="text-gray-500 uppercase text-[10px] tracking-widest font-bold mt-2">Cultivate your path</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-[#2D2438] border border-white/5 rounded-[2rem] p-8 flex flex-col transition-transform hover:scale-[1.01]">
            <div className="text-[#0D9488] mb-6">{tier.icon}</div>
            <h3 className="text-xl font-serif text-white mb-1">{tier.name}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-white">{tier.price}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">{tier.sub}</span>
            </div>

            {tier.isDonation ? (
              <input 
                type="number" 
                placeholder="$ 0.00" 
                value={donation} 
                onChange={(e) => setDonation(e.target.value)} 
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white text-sm mb-6 focus:border-[#0D9488] outline-none" 
              />
            ) : <p className="text-sm text-gray-400 mb-8 italic leading-relaxed">{tier.desc}</p>}

            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-[11px] text-gray-300 uppercase tracking-tight">
                  <Check size={14} className="text-[#0D9488] mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {/* UNIFIED TEAL BUTTONS */}
            <button className="w-full py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all bg-[#0D9488] text-white shadow-lg shadow-[#0D9488]/10 hover:bg-[#0D9488]/80">
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
      <p className="text-center mt-12 text-gray-500 text-[10px] uppercase tracking-[0.2em]">Secured by Stripe • No pressure, ever</p>
    </div>
  );
};

export default GroveTiers;