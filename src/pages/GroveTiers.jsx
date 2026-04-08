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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!link) {
      navigate('/library');
      return;
    }
    setLoading(id);
    try {
      window.location.href = link;
    } catch (err) {
      console.error("Redirect error:", err);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Cultivate Your Path</h1>
        <p className="text-lg text-slate-400 italic">Join the Grove as a Founding Wayfarer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`relative p-10 rounded-[2.5rem] border transition-all duration-300 flex flex-col ${
              tier.highlight 
              ? 'bg-[#2D2338] border-teal-500/30 shadow-[0_0_40px_rgba(32,178,170,0.1)] scale-105 z-10' 
              : 'bg-[#241C2E] border-slate-800/50 hover:border-teal-500/20'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-[#1A1423] rounded-xl">{tier.icon}</div>
              <Leaf className="w-5 h-5 text-slate-700" />
            </div>

            <h3 className="text-3xl font-bold text-slate-100 mb-3">{tier.name}</h3>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-100">{tier.price}</span>
                <span className="text-xs font-bold text-teal-400 tracking-widest uppercase">{tier.unit}</span>
              </div>
              {tier.nextPrice && (
                <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-[10px] font-bold tracking-wider uppercase">
                  <Info className="w-3 h-3" />
                  <span>Standard rate of {tier.nextPrice}/mo applies after month 1</span>
                </div>
              )}
            </div>

            <p className="text-slate-400 mb-8 italic text-lg leading-relaxed">
              {tier.description}
            </p>
            
            <div className="w-full h-px bg-slate-800/50 mb-10" />

            <ul className="space-y-6 mb-12 flex-grow">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-300 font-bold text-[10px] tracking-widest uppercase">
                  <Check className="w-4 h-4 text-teal-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              disabled={loading !== null}
              className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 ${
                tier.highlight || tier.id === 'seedling'
                ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20'
                : 'bg-[#2D2338] hover:bg-[#362b44] text-slate-100 border border-slate-700'
              } disabled:opacity-50 uppercase`}
            >
              {loading === tier.id ? 'CONNECTING...' : tier.buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
        <button 
          onClick={() => window.open('https://buy.stripe.com/14kbRcb2fbem3QccMP', '_blank')}
          className="text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-2 mx-auto text-[10px] font-bold tracking-[0.2em] group"
        >
          WANT TO SIMPLY PLANT A SEED? <span className="underline italic decoration-slate-700 group-hover:decoration-teal-400">DONATE HERE.</span>
        </button>
      </div>
    </div>
  );
};

export default GroveTiers;