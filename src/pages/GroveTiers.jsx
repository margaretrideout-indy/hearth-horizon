import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Flame, Leaf, Sprout, ArrowRight } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const tiers = [
    {
      id: 'seedling',
      name: 'Seedling',
      price: 'Free',
      description: 'Begin your journey into the grove.',
      icon: <Sprout className="w-6 h-6 text-emerald-400" />,
      features: ['Access to Public Library', 'Community Embers View', 'Basic Canopy Access'],
      buttonText: 'Start Free Path',
      link: null,
      highlight: false
    },
    {
      id: 'hearthkeeper',
      name: 'Hearthkeeper',
      price: '$3',
      unit: '/month',
      description: 'Tend the fire and sustain the community.',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      features: ['Full Library Access', 'Post to Embers Chat', 'Exclusive Hearth Updates'],
      buttonText: 'Tend the Fire',
      link: 'https://buy.stripe.com/5kA02o7U3gyu86s6op',
      highlight: true
    },
    {
      id: 'steward',
      name: 'Steward',
      price: '$5',
      unit: '/month',
      description: 'A Founding Wayfarer role for deep growth.',
      icon: <MapPin className="w-6 h-6 text-purple-400" />,
      features: ['All Hearthkeeper Perks', 'Beta Feature Access', 'Founding Wayfarer Badge'],
      buttonText: 'Guide the Way',
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
        <p className="text-lg text-slate-400">Join the Grove as a Founding Wayfarer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`relative p-8 rounded-2xl border transition-all duration-300 ${
              tier.highlight 
              ? 'bg-[#2D2338] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)] scale-105 z-10' 
              : 'bg-[#241C2E] border-slate-700/50 hover:border-slate-600'
            }`}
          >
            <div className="mb-6">{tier.icon}</div>
            <h3 className="text-2xl font-bold text-slate-100 mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-slate-100">{tier.price}</span>
              {tier.unit && <span className="text-slate-400 font-medium">{tier.unit}</span>}
            </div>
            <p className="text-slate-400 mb-8 leading-relaxed">{tier.description}</p>
            
            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                  <Leaf className="w-4 h-4 text-emerald-500/70" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              disabled={loading !== null}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                tier.highlight
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
              } disabled:opacity-50`}
            >
              {loading === tier.id ? 'Connecting...' : tier.buttonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <button 
          onClick={() => window.open('https://buy.stripe.com/14kbRcb2fbem3QccMP', '_blank')}
          className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 mx-auto text-sm group"
        >
          Want to simply plant a seed? <span className="underline italic decoration-slate-600 group-hover:decoration-emerald-400">Donate here.</span>
        </button>
      </div>
    </div>
  );
};

export default GroveTiers;