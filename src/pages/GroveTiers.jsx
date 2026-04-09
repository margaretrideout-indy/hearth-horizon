import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Sprout, TreePine, Heart, CheckCircle2, TabletSmartphone, X } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me(),
    retry: false 
  });

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  const tiers = [
    {
      name: 'Seedling',
      price: 'FREE',
      subtext: 'ALWAYS OPEN',
      description: 'Foundational access for those starting their journey.',
      icon: <Sprout className="w-6 h-6 text-teal-400" />,
      features: ['Foundational Badge', '2 Free PDFs/mo', 'Access to Library', 'Embers Chat'],
      action: () => navigate('/hearth'),
      buttonText: 'Get Started',
      current: user?.subscription_tier === 'Free' 
    },
    {
      name: 'Hearthkeeper',
      price: '$3',
      subtext: '$5/MO AFTER FIRST MONTH',
      description: 'Removing limits to keep the fires burning bright.',
      icon: <TreePine className="w-6 h-6 text-teal-400" />,
      features: ['Everything in Seedling', 'Unlimited PDF uploads', 'Hearthkeeper Badge'],
      action: () => handleExternalLink('https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03'),
      buttonText: 'Select Plan',
      current: user?.subscription_tier === 'Hearthkeeper'
    },
    {
      name: 'Steward',
      price: '$5',
      subtext: '$8/MO AFTER FIRST MONTH',
      description: 'Full oversight and total access to the entire Grove.',
      icon: <TreePine className="w-6 h-6 text-teal-400" />,
      features: ['Everything in Hearthkeeper', 'Ecosystem Alignment', 'The Canopy Hub'],
      action: () => handleExternalLink('https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04'),
      buttonText: 'Select Plan',
      current: user?.subscription_tier === 'Steward'
    },
    {
      name: 'Plant A Seed',
      price: 'DONATE',
      subtext: 'SUPPORT THE GROVE',
      description: 'Pay it forward to keep the Hearth accessible.',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      features: ['Sponsor Badge', 'Supports Open Access', 'Warm Fuzzies'],
      action: () => handleExternalLink('https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02'),
      buttonText: 'Give a Seed',
      isDonation: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] pb-12 overflow-x-hidden">
      {/* PWA Install Banner */}
      {deferredPrompt && showBanner && (
        <div className="bg-[#251D2F] border-b border-white/10 px-6 py-3 flex items-center justify-between animate-in fade-in slide-in-from-top duration-500 relative z-50">
          <button 
            onClick={handleInstall}
            className="flex items-center gap-3 text-slate-200 hover:text-teal-400 transition-colors group text-left"
          >
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-teal-500/10">
              <TabletSmartphone className="w-4 h-4 text-teal-400" />
            </div>
            <span className="text-xs font-bold tracking-wide">
              📱 Take the Hearth with you. 
              <span className="hidden md:inline"> Click here to install.</span>
              <span className="md:hidden ml-1"> Tap 'Share' then 'Add to Home Screen' on iPhone.</span>
            </span>
          </button>
          <button 
            onClick={() => setShowBanner(false)}
            className="p-2 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-[2rem] p-6 bg-[#251D2F] border flex flex-col shadow-xl transition-all hover:scale-[1.02] ${
                tier.isDonation ? 'border-rose-500/20' : 'border-white/5'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1A1423] flex items-center justify-center mb-6 shadow-inner">
                {tier.icon}
              </div>
              
              <h3 className="text-xl font-serif font-bold text-white mb-1">{tier.name}</h3>
              <div className="text-3xl font-black text-white">{tier.price}</div>
              <div className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 mb-4 ${tier.isDonation ? 'text-rose-400' : 'text-teal-400'}`}>
                {tier.subtext}
              </div>

              <p className="text-slate-400 text-xs italic font-light leading-relaxed mb-6 min-h-[3rem]">
                "{tier.description}"
              </p>

              <div className="flex-grow space-y-3 mb-8 text-left border-t border-white/5 pt-6">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${tier.isDonation ? 'text-rose-500' : 'text-teal-500'}`} />
                    <span className="text-[11px] text-slate-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={tier.action}
                disabled={tier.current && tier.name === 'Seedling'}
                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center ${
                  tier.name === 'Seedling' 
                  ? 'bg-[#3D2B52] text-teal-400 border border-teal-400/20' 
                  : tier.isDonation
                  ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg'
                  : 'bg-teal-500 text-[#1A1423] hover:bg-teal-400 shadow-lg shadow-teal-500/10'
                } ${tier.current && tier.name === 'Seedling' ? 'opacity-30' : ''}`}
              >
                {tier.current && tier.name === 'Seedling' ? 'Current Path' : tier.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        {/* Footer Branding */}
        <div className="mt-12 text-center opacity-40">
           <p className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-medium">
             Hearth & Horizon Ecosystem Tiers
           </p>
        </div>

        {/* The Login Link (Now safely inside the container) */}
        <div className="text-center mt-16 mb-12">
          <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">
            Already a member of the forest? 
            <button 
              onClick={() => import('@/api/base44Client').then(m => m.base44.auth.redirectToLogin('/hearth'))}
              style={{ color: '#2DD4BF' }} 
              className="font-black hover:underline ml-2 transition-all bg-transparent border-none cursor-pointer"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroveTiers;