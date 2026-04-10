import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Wind, Zap, Lock, 
  TrendingUp, MessagesSquare, Compass, Check, Leaf, Mountain, Heart 
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const LINK_STEWARD = 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const hasSession = vault?.isAligned || !!localStorage.getItem('base44_auth_session');

  const handleMemberLogin = () => {
    base44.auth.redirectToLogin('/hearth');
  };

  const handleSeedling = () => {
    if (hasSession) {
      navigate('/hearth');
    } else {
      base44.auth.redirectToLogin('/hearth');
    }
  };

  const handlePaid = (stripeUrl) => {
    if (hasSession) {
      navigate('/hearth');
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
      desc: '"A quiet space for those beginning to look toward a new horizon."',
      features: ["Foundational Badge", "Community Resources", "Access to Library", "Embers Chat"],
      button: "GET STARTED",
      onClick: handleSeedling,
      icon: <Leaf className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Hearthkeeper",
      price: "$3",
      period: "$5/MO AFTER FIRST MONTH",
      desc: '"Removing the noise to keep your creative fires burning bright."',
      features: ["Everything in Seedling", "Unlimited Digital Tools", "Hearthkeeper Badge"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_HEARTHKEEPER),
      highlight: true,
      icon: <Flame className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Steward",
      price: "$5",
      period: "$8/MO AFTER FIRST MONTH",
      desc: '"Full oversight and total access to the entire landscape."',
      features: ["Everything in Hearthkeeper", "Ecosystem Alignment", "The Canopy Hub"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_STEWARD),
      icon: <Mountain className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Plant A Seed",
      price: "DONATE",
      period: "SUPPORT THE GROVE",
      desc: '"Pay it forward to keep the Sanctuary accessible for all."',
      features: ["Sponsor Badge", "Supports Open Access", "Community Vitality"],
      button: "GIVE A SEED",
      onClick: () => window.open(LINK_DONATION, '_blank'),
      isDonation: true,
      icon: <Heart className="w-5 h-5 text-rose-500" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0F0A15] text-slate-300 font-sans selection:bg-teal-500/30">
      
      <div className="absolute top-8 right-8 z-10">
        <button 
          onClick={handleMemberLogin}
          className="group flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-all duration-300"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline">Already a member?</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border border-white/10 rounded-full group-hover:border-teal-500/50 group-hover:bg-teal-500/5 transition-all">
            Log In
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-20 py-12 md:py-24">
        
        <header className="mb-20 md:mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8 md:mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Welcome to the Sanctuary</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-8 md:mb-12 tracking-tight leading-tight">
            Transition with Intention.
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-xl text-slate-400 font-light leading-relaxed mb-10 md:mb-16 italic px-4">
            "After a long tenure in my field and a Master's spent studying the deep roots of community and identity, I realized that a professional shift is more than a move—it's a migration of the self. Hearth & Horizon is the sanctuary for those ready to redesign their story."
          </p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-white font-serif italic text-2xl">— Margaret</span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600">Founder</span>
          </div>
        </header>

        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] border transition-all duration-500 bg-[#1A1423]/40 ${
                tier.highlight ? 'border-teal-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]' : 'border-white/5 hover:border-white/10'
              }`}>
                <div className="mb-6 sm:mb-8">{tier.icon}</div>
                <h4 className="text-white font-bold text-xl sm:text-2xl mb-1 tracking-tight">{tier.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">{tier.price}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 sm:mb-8">{tier.period}</p>
                <p className="text-[12px] text-slate-400 mb-8 sm:mb-10 leading-relaxed italic min-h-[48px]">{tier.desc}</p>
                
                <div className="h-[1px] w-full bg-white/5 mb-8 sm:mb-10" />
                
                <ul className="space-y-4 mb-10 sm:mb-16 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${tier.isDonation ? 'text-rose-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.onClick}
                  className={`w-full py-4 sm:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
                    tier.isDonation 
                      ? 'bg-[#FF4D6D] text-white hover:bg-[#FF758F] shadow-[0_0_20px_rgba(255,77,109,0.2)]'
                      : 'bg-[#39D7B8] text-[#0F0A15] hover:bg-[#4df7d5] hover:shadow-[0_0_30px_rgba(57,215,184,0.15)]'
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 border-t border-white/5 pt-16 md:pt-24">
          {navigationItems.map((item, idx) => (
            <div key={idx} className={`p-6 rounded-[2rem] border flex flex-col items-center text-center group transition-all ${
              item.status === 'unlocked' 
              ? 'bg-white/[0.02] border-white/5 hover:border-teal-500/30' 
              : 'bg-black/40 border-white/[0.01] opacity-20'
            }`}>
              <div className={`mb-4 ${item.status === 'unlocked' ? 'text-slate-400 group-hover:text-teal-400' : 'text-slate-800'}`}>
                {item.icon}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${item.status === 'unlocked' ? 'text-white' : 'text-slate-800'}`}>
                {item.title}
              </span>
              {item.status === 'locked' && <Lock className="w-3 h-3 mt-3 text-slate-800" />}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default GroveTiers;