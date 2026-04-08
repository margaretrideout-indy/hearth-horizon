import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Flame, Leaf, Sprout, ArrowRight, Check, Info } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const tiers = [
    {
      id: 'seedling',
      name: 'Seedling',
      price: 'Free',
      unit: 'ALWAYS FREE',
      description: 'Lay the groundwork for your transition.',
      icon: <Sprout className="w-6 h-6 text-teal-400" />,
      features: ['SEEDLING PROFILE BADGE', 'BASIC LIBRARY ACCESS', '2 FREE PDF UPLOADS/ANALYSES'],
      buttonText: 'START FREE PATH',
      link: null,
      highlight: false
    },
    {
      id: 'hearthkeeper',
      name: 'Hearthkeeper',
      price: '$3',
      unit: 'FIRST MONTH',
      nextPrice: '$5',
      description: 'Tend the fire and sustain the community.',
      icon: <Flame className="w-6 h-6 text-teal-400" />,
      features: ['FULL LIBRARY ACCESS', 'POST TO EMBERS CHAT', 'EXCLUSIVE HEARTH UPDATES'],
      buttonText: 'TEND THE FIRE',
      link: 'https://buy.stripe.com/5kA02o7U3gyu86s6op',
      highlight: true
    },
    {
      id: 'steward',
      name: 'Steward',
      price: '$5',
      unit: 'FIRST MONTH',
      nextPrice: '$8',
      description: 'A Founding Wayfarer role for deep growth.',
      icon: <MapPin className="w-6 h-6 text-teal-400" />,
      features: ['ALL HEARTHKEEPER PERKS', 'BETA FEATURE ACCESS', 'FOUNDING WAYFARER BADGE'],
      buttonText: 'GUIDE THE WAY',
      link: 'https://buy.stripe.com/14kdRcb2fbem3QccMO',
      highlight: false
    }
  ];

  const handleCheckout = (e, id, link) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!link) { navigate('/library'); return; }
    setLoading(id);
    try { window.location.href = link; } catch (err) { setLoading(null); }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] py-10 md:py-20 px-4">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 px-2">
          Cultivate Your Path
        </h1>
        <p className="text-slate-400 italic text-sm md:text-lg">
          Join the Grove as a Founding Wayfarer.
        </p>
      </div>

      {/* TIERS GRID - Forces 1 col on mobile, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`flex flex-col p-8 md:p-10 rounded-[2rem] border transition-all duration-300 ${
              tier.highlight 
              ? 'bg-[#2D2338] border-teal-500/40 shadow-xl md:scale-105 z-10' 
              : 'bg-[#241C2E] border-slate-800'
            }`}
          >
            <div className="flex justify-between mb-6">
              <div className="p-3 bg-[#1A1423] rounded-xl">{tier.icon}</div>
              <Leaf className="w-5 h-5 text-slate-700" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">{tier.name}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-slate-100">{tier.price}</span>
                <span className="text-[10px] font-bold text-teal-400 tracking-widest">{tier.unit}</span>
              </div>
              {tier.nextPrice && (
                <div className="flex items-start gap-1.5 mt-2 text-slate-500 text-[10px] font-bold tracking-wider uppercase">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Standard rate of {tier.nextPrice}/mo applies after month 1</span>
                </div>
              )}
            </div>

            <p className="text-slate-400 mb-8 italic text-sm md:text-base leading-relaxed">
              {tier.description}
            </p>
            
            <div className="w-full h-px bg-slate-800/50 mb-8" />

            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-bold text-[10px] tracking-widest uppercase">
                  <Check className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              disabled={loading !== null}
              className={`w-full py-4 rounded-xl font-black text-[10px] tracking-widest flex items-center justify-center gap-2 transition-all ${
                tier.highlight || tier.id === 'seedling'
                ? 'bg-teal-600 hover:bg-teal-500 text-white'
                : 'bg-[#2D2338] border border-slate-700 text-slate-100'
              } uppercase`}
            >
              {loading === tier.id ? 'WAITING...' : tier.buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroveTiers;