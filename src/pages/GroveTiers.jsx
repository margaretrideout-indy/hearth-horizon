import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TreePine, Flame, Crown, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  
  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false 
  });

  const handleSubscribe = async (priceId) => {
    if (!user) {
      navigate('/hearth');
      return;
    }
    try {
      const { url } = await window.base44.payment.checkout(priceId, {
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
      });
      window.location.href = url;
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  const tiers = [
    {
      name: 'Seedling',
      price: 'Free',
      description: 'Plant your roots and begin observing the landscape.',
      icon: <TreePine className="w-6 h-6 text-teal-400" />,
      features: ['Daily Hearth Log', 'The Library Access', 'Embers Public Chat', 'The Canopy Job Board'],
      action: () => navigate('/hearth'),
      buttonText: 'Get Started',
      current: user?.subscription_tier === 'Free' || !user
    },
    {
      name: 'Hearthkeeper',
      price: '$15',
      period: '/mo',
      description: 'Tend the fire. Translate your expertise for the new world.',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      features: ['All Seedling Features', 'Linguistic Bridge (Skill Translator)', 'Private Embers Channels', 'Curated Career Artifacts'],
      action: () => handleSubscribe('price_hearthkeeper_id'),
      buttonText: 'Join the Hearth',
      popular: true,
      current: user?.subscription_tier === 'Hearthkeeper'
    },
    {
      name: 'Steward',
      price: '$40',
      period: '/mo',
      description: 'Master the ecosystem. High-level alignment for leaders.',
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
      features: ['All Hearthkeeper Features', 'Ecosystem Alignment Tool', 'Culture Stress-Test', '1:1 Technical Strategy Sync'],
      action: () => handleSubscribe('price_steward_id'),
      buttonText: 'Become a Steward',
      current: user?.subscription_tier === 'Steward'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4 text-teal-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Membership Grove</span>
          </div>
          <h1 className="text-5xl font-serif font-bold text-white mb-6">Choose your path.</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you are just beginning to scout the horizon or you're ready to align your 
            entire ecosystem, there is a place for you by the fire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-[2.5rem] p-10 transition-all duration-500 hover:translate-y-[-8px] ${
                tier.popular 
                ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-orange-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.4)]' 
                : 'bg-white/[0.03] border border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-[#1A1423] text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.popular ? 'bg-orange-500/20' : 'bg-white/5'}`}>
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  {tier.period && <span className="text-slate-500 text-sm">{tier.period}</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={tier.action}
                disabled={tier.current && tier.name === 'Seedling'}
                className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                  tier.popular 
                  ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-xl shadow-orange-500/20' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                } ${tier.current && tier.name === 'Seedling' ? 'opacity-50 cursor-default' : ''}`}
              >
                {tier.current ? 'Your Current Path' : tier.buttonText}
                {!tier.current && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">
            All tiers include access to the core Hearth community guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroveTiers;