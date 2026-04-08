import React, { useState } from 'react';
import { Check, Heart, Sprout, Flame, Shield, Award, Loader2 } from 'lucide-react';

// Live Stripe Links
const PAYMENT_LINKS = {
  HEARTHKEEPER: 'https://buy.stripe.com/eVq14n2Tm4TR4UcaG6dAk01',
  STEWARD: 'https://buy.stripe.com/00w00jdy0gCz0DWaG6dAk00',
  DONATION: 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02'
};

const GroveTiers = () => {
  const [loading, setLoading] = useState(null);

  const handleCheckout = (e, id, link) => {
    // This stops the app from trying to refresh or navigate internally
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!link) {
      console.log("Starting Free Path");
      return;
    }
    
    setLoading(id);

    // Hard redirect to Stripe
    try {
      window.location.href = link;
    } catch (err) {
      console.error("Redirect error:", err);
      setLoading(null);
    }
  };

  const tiers = [
    { 
      id: 'seedling',
      name: "Seedling", 
      price: "Free", 
      sub: "Always free", 
      icon: <Sprout size={18} />, 
      desc: "Lay the groundwork for your transition.", 
      features: ["Seedling Profile Badge", "Basic Library Access", "2 Free PDF Uploads/Analyses"],
      buttonText: "Start Free Path",
      link: null
    },
    { 
      id: 'hearthkeeper',
      name: "Founding Wayfarer: Hearthkeeper", 
      price: "$3", 
      sub: "First mo, then $5", 
      icon: <Flame size={18} />, 
      desc: "Deepen your practice and community ties.", 
      features: ["Founding Wayfarer Badge", "Unlimited PDF Uploads", "Full Embers Chat Access", "Linguistic Bridge Tools"], 
      highlight: true,
      buttonText: "Tend the fire",
      link: PAYMENT_LINKS.HEARTHKEEPER
    },
    { 
      id: 'steward',
      name: "Founding Wayfarer: Steward", 
      price: "$5", 
      sub: "First mo, then $8", 
      icon: <Shield size={18} />, 
      desc: "Full ecosystem mastery and reciprocity.", 
      features: ["Steward Elite Badge", "Everything in Hearthkeeper", "Full Website & App Access", "Priority Support"], 
      highlight: true,
      buttonText: "Tend the fire",
      link: PAYMENT_LINKS.STEWARD
    },
    { 
      id: 'donation',
      name: "Plant a Seed", 
      price: "Donate", 
      sub: "One-time", 
      icon: <Heart size={18} />, 
      desc: "Support the grove's continued growth.", 
      features: ["Ecosystem Supporter Badge", "Community Gratitude", "General Updates"], 
      isDonation: true,
      buttonText: "Plant Seed",
      link: PAYMENT_LINKS.DONATION
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-[#1A1423]">
      <div className="mb-10 text-left">
        <h1 className="text-2xl font-serif italic text-white/90">The Grove</h1>
        <p className="text-gray-500 uppercase text-[9px] tracking-[0.25em] font-bold mt-1">Cultivate your path</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiers.map((tier) => (
          <div 
            key={tier.id} 
            className={`bg-[#2D2438] border border-white/5 rounded-[1.5rem] p-6 flex flex-col transition-all hover:border-white/10 ${
              tier.highlight ? 'ring-1 ring-[#0D9488]/30 shadow-[0_0_20px_rgba(13,148,136,0.05)]' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-4 text-[#0D9488]">
              {tier.icon}
              <Award size={14} className="text-gray-600" />
            </div>
            
            <h3 className="text-[16px] font-serif text-white mb-1 leading-tight">{tier.name}</h3>
            
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-white">{tier.price}</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-wider">{tier.sub}</span>
            </div>

            <div className="h-[60px] mb-6 border-b border-white/5 pb-4 text-left">
              <p className="text-[12px] text-gray-400 italic leading-snug">{tier.desc}</p>
            </div>

            <ul className="space-y-3 mb-6 flex-1 text-left">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] text-gray-300 uppercase tracking-tight leading-tight">
                  <Check size={12} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={loading === tier.id}
              onClick={(e) => handleCheckout(e, tier.id, tier.link)}
              className="w-full py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all bg-[#0D9488] text-white shadow-md hover:bg-[#11B1A3] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading === tier.id ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                tier.buttonText
              )}
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-center mt-12 text-gray-600 text-[9px] uppercase tracking-[0.2em] max-w-md mx-auto">
        Secure Stripe Checkout • Every seed planted helps the entire ecosystem flourish.
      </p>
    </div>
  );
};

export default GroveTiers;