import React, { useState } from 'react';
import { Check, Heart, Sprout, Flame, Shield, Award } from 'lucide-react';

const GroveTiers = () => {
  const [donation, setDonation] = useState('');

  const tiers = [
    { 
      name: "Seedling", 
      price: "Free", 
      sub: "Always free", 
      icon: <Sprout size={18} />, 
      desc: "Lay the groundwork for your transition.", 
      features: ["Seedling Profile Badge", "Basic Library Access", "2 Free PDF Uploads/Analyses"],
      buttonText: "Tend the fire" 
    },
    { 
      name: "Hearthkeeper", 
      price: "$3", 
      sub: "First mo, then $5", 
      icon: <Flame size={18} />, 
      desc: "Deepen your practice and community ties.", 
      features: ["Hearthkeeper Badge", "Unlimited PDF Uploads", "Full Embers Chat Access", "Linguistic Bridge Tools"], 
      highlight: true,
      buttonText: "Tend the fire" 
    },
    { 
      name: "Steward", 
      price: "$5", 
      sub: "First mo, then $8", 
      icon: <Shield size={18} />, 
      desc: "Full ecosystem mastery and reciprocity.", 
      features: ["Steward Elite Badge", "Everything in Hearthkeeper", "Full Website & App Access", "Priority Support"], 
      highlight: true,
      buttonText: "Tend the fire" 
    },
    { 
      name: "Plant a Seed", 
      price: "Donate", 
      sub: "One-time", 
      icon: <Heart size={18} />, 
      desc: "Support the grove's continued growth.", 
      features: ["Ecosystem Supporter Badge", "Community Gratitude", "General Updates"], 
      isDonation: true,
      buttonText: "Plant Seed"
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-[#1A1423]">
      <div className="mb-10">
        <h1 className="text-2xl font-serif italic text-white/90">The Grove</h1>
        <p className="text-gray-500 uppercase text-[9px] tracking-[0.25em] font-bold mt-1">Cultivate your path</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <div key={tier.name} className={`bg-[#2D2438] border border-white/5 rounded-[1.5rem] p-6 flex flex-col transition-all hover:border-white/10 ${tier.highlight ? 'ring-1 ring-[#0D9488]/30' : ''}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="text-[#0D9488]">{tier.icon}</div>
              <Award size={14} className="text-gray-600" title="Tier Badge Included" />
            </div>
            
            <h3 className="text-lg font-serif text-white mb-1">{tier.name}</h3>
            
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-white">{tier.price}</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-wider">{tier.sub}</span>
            </div>

            {tier.isDonation ? (
              <div className="mb-6 h-[60px]">
                <input 
                  type="number" 
                  placeholder="$ 0.00" 
                  value={donation} 
                  onChange={(e) => setDonation(e.target.value)} 
                  className="w-full bg-black/20 border border-white/10 rounded-lg py-2 px-3 text-white text-xs focus:border-[#0D9488] outline-none" 
                />
              </div>
            ) : (
              <div className="h-[60px]">
                <p className="text-[12px] text-gray-400 italic leading-snug">{tier.desc}</p>
              </div>
            )}

            <ul className="space-y-3 mb-6 flex-1 border-t border-white/5 pt-4">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-[10px] text-gray-300 uppercase tracking-tight leading-tight">
                  <Check size={12} className="text-[#0D9488] mt-0.5 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button className="w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all bg-[#0D9488] text-white shadow-md hover:bg-[#0D9488]/90 active:scale-95">
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center mt-10 text-gray-600 text-[9px] uppercase tracking-[0.2em]">
        Every seed planted helps the entire ecosystem flourish.
      </p>
    </div>
  );
};

export default GroveTiers;