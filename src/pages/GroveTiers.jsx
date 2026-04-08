import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Flame, Leaf, Sprout, ArrowRight, Check, Info, Heart, X } from 'lucide-react';

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
    if (e) { e.preventDefault(); e.stopPropagation(); }
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
    <div className="fixed inset-0 z-[100] bg-[#1A1423] overflow-y-auto touch-manipulation">
      
      {/* Back Button for users who aren't ready to commit */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-[110]"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="min-h-screen py-12 md:py-20 px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mb-4 tracking-tight">
            Cultivate Your Path
          </h1>
          <p className="text-slate-400 italic text-sm md:text-xl max-w-2xl mx-auto leading-relaxed">
            Choose your level of support and join the Grove as a Founding Wayfarer.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`flex flex-col p-8 md:p-10 rounded-[2rem] border transition-all duration-500 ${
                tier.highlight 
                ? 'bg-[#2D2338] border-teal-500/40 shadow-2xl lg:scale-105 z-10' 
                : 'bg-[#241C2E] border-slate-800/50'
              }`}
            >
              <div className="flex justify-between mb-8">
                <div className="p-3 bg-[#1A1423] rounded-xl">{tier.icon}</div>
                <Leaf className="w-5 h-5 text-slate-700" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">{tier.name}</h3>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-5xl font-black text-slate-100">{tier.price}</span>
                  <span className="text-[10px] md:text-xs font-bold text-teal-400 tracking-[0.2em] uppercase">{tier.unit}</span>
                </div>
                {tier.nextPrice && (
                  <div className="flex items-start gap-2 mt-2 text-slate-500 text-[10px] md:text-xs font-bold tracking-wider uppercase leading-tight text-left">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" />
                    <span>Standard {tier.nextPrice}/mo after month 1</span>
                  </div>
                )}
              </div>

              <p className="text-slate-400 mb-8 italic text-sm md:text-lg leading-relaxed text-left">
                {tier.description}
              </p>
              
              <div className="w-full h-px bg-slate-800/50 mb-8" />

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 font-bold text-[10px] md:text-xs tracking-widest uppercase text-left">
                    <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={(e) => handleCheckout(e, tier.id, tier.link)}
                disabled={loading !== null}
                className="w-full py-4 md:py-6 rounded-2xl font-black text-xs md:text-sm tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95 bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/40 uppercase disabled:opacity-50"
              >
                {loading === tier.id ? 'CONNECTING...' : tier.buttonText}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Large Plant A Seed Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#241C2E]/80 border border-teal-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-teal-500/40 transition-all shadow-xl">
            <div className="flex items-center gap-6 text-left">
              <div className="p-5 bg-[#1A1423] rounded-2xl hidden sm:block">
                <Heart className="w-10 h-10 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-bold text-teal-400 tracking-[0.3em] uppercase">Ethical Support</span>
                  <div className="h-px w-12 bg-teal-500/30"></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-1">Plant a Seed</h3>
                <p className="text-slate-400 text-sm md:text-base italic">One-time contribution of your choice. No recurring fees.</p>
              </div>
            </div>
            
            <button 
              onClick={() => window.open('https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02', '_blank')}
              className="w-full md:w-auto px-12 py-5 bg-[#2D2338] hover:bg-[#362b44] border border-slate-700 text-slate-100 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3 group shadow-lg"
            >
              Plant a Seed
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroveTiers;