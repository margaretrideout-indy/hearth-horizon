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
      icon: <Sprout className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />,
      features: ['SEEDLING PROFILE BADGE', 'BASIC LIBRARY ACCESS', '2 FREE PDF ANALYSES'],
      buttonText: 'START FREE PATH',
      link: null,
      highlight: false
    },
    {
      id: 'hearthkeeper',
      name: 'Hearthkeeper',
      price: '$3',
      unit: '1ST MONTH',
      nextPrice: '$5',
      description: 'Tend the fire and sustain the community.',
      icon: <Flame className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />,
      features: ['FULL LIBRARY ACCESS', 'POST TO EMBERS CHAT', 'HEARTH UPDATES'],
      buttonText: 'TEND THE FIRE',
      link: 'https://buy.stripe.com/5kA02o7U3gyu86s6op',
      highlight: true
    },
    {
      id: 'steward',
      name: 'Steward',
      price: '$5',
      unit: '1ST MONTH',
      nextPrice: '$8',
      description: 'A Founding Wayfarer role for deep growth.',
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />,
      features: ['ALL HEARTHKEEPER PERKS', 'BETA FEATURE ACCESS', 'FOUNDING BADGE'],
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
    <div className="min-h-screen bg-[#1A1423] py-8 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
          Cultivate Your Path
        </h1>
        <p className="text-slate-400 italic text-xs md:text-lg">
          Join the Grove as a Founding Wayfarer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`flex flex-col p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 ${
              tier.highlight 
              ? 'bg-[#2D2338] border-teal-500/40 shadow-lg md:scale-105 z-10' 
              : 'bg-[#241C2E] border-slate-800'
            }`}
          >
            <div className="flex justify-between mb-4 md:mb-8">
              <div className="p-2 bg-[#1A1423] rounded-lg">{tier.icon}</div>
              <Leaf className="w-4 h-4 text-slate-700" />
            </div>

            <h3 className="text-xl md:text-3xl font-bold text-slate-100 mb-1">{tier.name}</h3>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-4xl font-black text-slate-100">{tier.price}</span>
                <span className="text-[9px] md:text-[10px] font-bold text-teal-400 tracking-widest">{tier.unit}</span>
              </div>
              {tier.nextPrice && (
                <div className="flex items-start gap-1.5 mt-1 text-slate-500 text-[9px] md:text-[10px] font-bold tracking-wider uppercase">
                  <Info className="w-2.5 h-2.5 mt-0.5 shrink-0" />
                  <span>Standard {tier.nextPrice}/mo after month 1</span>
                </div>
              )}
            </div>

            <p className="text-slate-400 mb-6 italic text-xs md:text-base leading-relaxed">
              {tier.description}
            </p>
            
            <div className="w-full h-px bg-slate-800/50 mb-6" />

            <ul className="space-y-3 mb-8 flex-grow">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 font-bold text-[9px] md:text-[10px] tracking-widest uppercase">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              disabled={loading !== null}
              className={`w-full py-3 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
                tier.highlight || tier.id === 'seedling'
                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20'
                : 'bg-[#2D2338] hover:bg-[#362b44] text-slate-100 border border-slate-700'
              } uppercase`}
            >
              {loading === tier.id ? 'WAITING...' : tier.buttonText}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* DONATION SECTION - Works on all devices */}
      <div className="mt-12 text-center">
        <button 
          onClick={() => window.open('https://buy.stripe.com/14kbRcb2fbem3QccMP', '_blank')}
          className="text-slate-500 hover:text-teal-400 transition-colors flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 mx-auto text-[9px] md:text-[10px] font-bold tracking-widest uppercase group"
        >
          <span>Want to simply plant a seed?</span>
          <span className="underline italic group-hover:decoration-teal-400">Donate here.</span>
        </button>
      </div>
    </div>
  );
};

export default GroveTiers;