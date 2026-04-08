import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sprout, TreePine, CheckCircle2 } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  
  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false 
  });

  const handleSubscribe = async (priceId) => {
    if (!user) { navigate('/hearth'); return; }
    try {
      const { url } = await window.base44.payment.checkout(priceId, {
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
      });
      window.location.href = url;
    } catch (err) { console.error('Subscription error:', err); }
  };

  const tiers = [
    {
      name: 'Seedling',
      price: 'FREE',
      subtext: 'ALWAYS OPEN',
      description: 'Foundational access for those starting their journey.',
      icon: <Sprout className="w-8 h-8 text-teal-400" />,
      features: ['Foundational Badge', '2 Free PDF uploads/month', 'Access to Library', 'Access to Embers Chat'],
      action: () => navigate('/hearth'),
      buttonText: 'Get Started',
      current: user?.subscription_tier === 'Free' || !user
    },
    {
      name: 'Hearthkeeper',
      price: '$3',
      subtext: '$5/MO AFTER FIRST MONTH',
      description: 'Removing limits to keep the fires burning bright.',
      icon: <TreePine className="w-8 h-8 text-teal-400" />,
      features: ['Everything in Seedling', 'Unlimited PDF uploads', 'Hearthkeeper Badge'],
      action: () => handleSubscribe('price_hearthkeeper_id'),
      buttonText: 'Select Plan',
      current: user?.subscription_tier === 'Hearthkeeper'
    },
    {
      name: 'Steward',
      price: '$5',
      subtext: '$8/MO AFTER FIRST MONTH',
      description: 'Full oversight and total access to the entire Grove.',
      icon: <TreePine className="w-8 h-8 text-teal-400" />,
      features: ['Everything in Hearthkeeper', 'Full Website Access', 'Ecosystem Alignment Tools', 'The Canopy Resource Hub'],
      action: () => handleSubscribe('price_steward_id'),
      buttonText: 'Select Plan',
      current: user?.subscription_tier === 'Steward'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className="relative rounded-[2.5rem] p-10 bg-[#251D2F] border border-white/5 flex flex-col items-center text-center shadow-xl"
          >
            <div className="w-20 h-20 rounded-full bg-[#1A1423] flex items-center justify-center mb-6 shadow-inner">
              {tier.icon}
            </div>
            
            <h3 className="text-3xl font-serif font-bold text-white mb-2">{tier.name}</h3>
            <div className="text-5xl font-black text-white">{tier.price}</div>
            <div className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] mt-2 mb-6">
              {tier.subtext}
            </div>

            <p className="text-slate-400 text-sm italic font-light leading-relaxed max-w-sm mb-10">
              "{tier.description}"
            </p>

            <div className="w-full space-y-4 mb-10 text-left border-t border-white/5 pt-10 max-w-sm">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={tier.action}
              disabled={tier.current && tier.name === 'Seedling'}
              className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center max-w-sm ${
                tier.name === 'Seedling' 
                ? 'bg-[#3D2B52] text-teal-400 border border-teal-400/20' 
                : 'bg-teal-500 text-[#1A1423] hover:bg-teal-400 shadow-lg shadow-teal-500/10'
              } ${tier.current && tier.name === 'Seedling' ? 'opacity-30' : ''}`}
            >
              {tier.current && tier.name === 'Seedling' ? 'Current Path' : tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroveTiers;