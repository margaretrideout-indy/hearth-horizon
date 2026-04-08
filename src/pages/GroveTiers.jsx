import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Flame, Leaf, Sprout, ArrowRight, Check, Info, Heart } from 'lucide-react';

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
      link: 'https://buy.stripe.com/00w00jdy0gCz0DWaG6dAk00',
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
      link: 'https://buy.stripe.com/eVq14n2Tm4TR4UcaG6dAk01',
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
      window.location.assign(link);
    } catch (err) {
      window.location.href = link;
    }
  };

  return (
    /* REMOVED md:ml-64 so content fills the screen when sidebar is hidden */
    <div className="min-h-screen bg-[#1A1423] py-8 md:py-16 px-4 touch-manipulation">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-2 tracking-tight">
          Cultivate Your Path
        </h1>
        <p className="text-slate-400 italic text-xs md:text-lg">
          Join the Grove as a Founding Wayfarer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 md:mb-12">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`flex flex-col p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-300 ${
              tier.highlight 
              ? 'bg-[#2D2338] border-teal-500/40 shadow-lg lg:scale-105 z-10' 
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
                <span className="text-[9px] md:text-[10px] font-bold text-teal-400 tracking-widest uppercase">{tier.unit}</span>
              </div>
              {tier.nextPrice && (
                <div className="flex items-start gap-1.5 mt-1 text-slate-500 text-[9px] md:text-[10px] font-bold tracking-wider uppercase leading-tight">
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
                <li key={i} className="flex items-center gap-2 text-slate-300 font-bold text-[9px] md:text-[10px] tracking-widest uppercase text-left">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              disabled={loading !== null}
              className="w-full py-3 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20 uppercase disabled:opacity-50"
            >
              {loading === tier.id ? 'WAITING...' : tier.buttonText}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-[#241C2E]/50 border border-teal-500/20 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-teal-500/40 transition-all">
          <div className="flex items-center gap-6 text-left w-full md:w-auto">
            <div className="p-4 bg-[#1A1423] rounded-2xl hidden sm:block">
              <Heart className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-teal-400 tracking-[0.2em] uppercase">Ethical Support</span>
                <div className="h-px w-8 bg-teal-500/30"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">Plant a Seed</h3>
              <p className="text-slate-400 text-sm italic">One-time contribution of your choice. No recurring fees.</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.open('https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02', '_blank')}
            className="w-full md:w-auto px-10 py-4 bg-[#2D2338] hover:bg-[#362b44] border border-slate-700 text-slate-100 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 group"
          >
            Plant a Seed
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroveTiers;