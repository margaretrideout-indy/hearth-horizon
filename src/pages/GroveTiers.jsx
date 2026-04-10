import React from 'react';
import { 
  Flame, Wind, Zap, Lock, 
  TrendingUp, MessagesSquare, Compass, Check, Leaf, Mountain, Heart 
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const LINK_STEWARD = 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

const GroveTiers = ({ vault, onSync }) => {
  const hasSession = vault?.isAligned || !!localStorage.getItem('base44_auth_session');

  const handleSeedling = () => {
    if (hasSession) {
      window.location.href = '/hearth';
    } else {
      base44.auth.redirectToLogin('/hearth');
    }
  };

  const handlePaid = (stripeUrl) => {
    if (hasSession) {
      window.location.href = '/hearth';
    } else {
      window.location.href = stripeUrl;
    }
  };

  const navigationItems = [
    { title: "The Grove", status: "unlocked", icon: <Compass className="w-5 h-5" /> },
    { title: "Your Hearth", status: "unlocked", icon: <Flame className="w-5 h-5" /> },
    { title: "The Bridge", status: "locked", icon: <Wind className="w-5 h-5" /> },
    { title: "Alignment", status: "locked", icon: <Zap className="w-5 h-5" /> },
    { title: "Horizon Scan", status: "locked", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Embers Chat", status: "unlocked", icon: <MessagesSquare className="w-5 h-5" /> },
    { title: "The Canopy", status: "unlocked", icon: <Compass className="w-5 h-5" /> }
  ];

  const tiers = [
    {
      name: "Seedling",
      price: "FREE",
      period: "ALWAYS OPEN",
      desc: '"Foundational access for those starting their journey."',
      features: ["Foundational Badge", "2 Free PDFs/mo", "Access to Library", "Embers Chat"],
      button: "GET STARTED",
      onClick: handleSeedling,
      icon: <Leaf className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Hearthkeeper",
      price: "$3",
      period: "$5/MO AFTER FIRST MONTH",
      desc: '"Removing limits to keep the fires burning bright."',
      features: ["Everything in Seedling", "Unlimited PDF uploads", "Hearthkeeper Badge"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_HEARTHKEEPER),
      highlight: true,
      icon: <Flame className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Steward",
      price: "$5",
      period: "$8/MO AFTER FIRST MONTH",
      desc: '"Full oversight and total access to the entire Grove."',
      features: ["Everything in Hearthkeeper", "Ecosystem Alignment", "The Canopy Hub"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_STEWARD),
      icon: <Mountain className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Plant A Seed",
      price: "DONATE",
      period: "SUPPORT THE GROVE",
      desc: '"Pay it forward to keep the Hearth accessible."',
      features: ["Sponsor Badge", "Supports Open Access", "Warm Fuzzies"],
      button: "GIVE A SEED",
      onClick: () => window.open(LINK_DONATION, '_blank'),
      isDonation: true,
      icon: <Heart className="w-5 h-5 text-rose-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 font-sans selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 md:py-16">
        
        <header className="mb-16 md:mb-28 text-center animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/10 mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">Welcome to the Grove</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6 md:mb-10 tracking-tight leading-tight">
            A migration of the self.
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed mb-8 md:mb-12 italic px-2">
            "After thirteen years in the classroom and a Master's spent studying the deep roots of community and identity, I realized that a career pivot is more than a strategy—it's a migration of the self. Hearth & Horizon is the sanctuary I wish I had."
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-serif italic text-xl sm:text-2xl">— Margaret</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Founder</span>
          </div>
        </header>

        <section className="mb-20 md:mb-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative flex flex-col p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border transition-all duration-500 bg-[#1A1423]/40 ${
                tier.highlight ? 'border-teal-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'border-white/5'
              }`}>
                <div className="mb-4 sm:mb-6">{tier.icon}</div>
                <h4 className="text-white font-bold text-lg sm:text-xl mb-1 tracking-tight">{tier.name}</h4>
                <div className="mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">{tier.price}</span>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4 sm:mb-6">{tier.period}</p>
                <p className="text-[11px] text-slate-400 mb-6 sm:mb-8 leading-relaxed italic min-h-[36px]">{tier.desc}</p>
                
                <div className="h-[1px] w-full bg-white/5 mb-6 sm:mb-8" />
                
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[10px] text-slate-400">
                      <Check className={`w-3.5 h-3.5 shrink-0 ${tier.isDonation ? 'text-rose-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.onClick}
                  className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
                    tier.isDonation 
                      ? 'bg-[#FF4D6D] text-white hover:bg-[#FF758F] shadow-[0_0_20px_rgba(255,77,109,0.2)]'
                      : 'bg-[#39D7B8] text-[#0F0A15] hover:bg-[#4df7d5]'
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 border-t border-white/5 pt-12 md:pt-20">
          {navigationItems.map((item, idx) => (
            <div key={idx} className={`p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border flex flex-col items-center text-center group transition-all ${
              item.status === 'unlocked' 
              ? 'bg-white/[0.02] border-white/5 hover:border-teal-500/30' 
              : 'bg-black/40 border-white/[0.01] opacity-20'
            }`}>
              <div className={`mb-3 sm:mb-4 ${item.status === 'unlocked' ? 'text-slate-400 group-hover:text-teal-400' : 'text-slate-800'}`}>
                {item.icon}
              </div>
              <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${item.status === 'unlocked' ? 'text-white' : 'text-slate-800'}`}>
                {item.title}
              </span>
              {item.status === 'locked' && <Lock className="w-2.5 h-2.5 mt-2 sm:mt-3 text-slate-800" />}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GroveTiers;