import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Wind, Zap, Lock, 
  TrendingUp, MessagesSquare, Compass, Check, Leaf, Mountain, Heart, UserPlus,
  Smartphone, Share2, PlusSquare 
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const LINK_STEWARD = 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(null);
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

  const handleRequestSeat = async () => {
    if (!hasSession) {
      base44.auth.redirectToLogin('/grove');
      return;
    }

    setRequestStatus('sending');
    try {
      const user = await base44.auth.me();
      // Removed 'notes' to prevent Base44 validation errors
      await window.base44.entities.VoucherPool.create({
        claimed_by: user.email,
        status: 'available'
      });
      setRequestStatus('success');
    } catch (error) {
      console.error("Seat request failed", error);
      setRequestStatus('error');
    }
  };

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
      features: [
        "Everything in Hearthkeeper", 
        "Ecosystem Alignment", 
        "The Canopy Hub",
        "Sponsors 1 Hearthkeeper Seat"
      ],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_STEWARD),
      icon: <Mountain className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Request A Seat",
      price: "WAITLIST",
      period: "SCHOLARSHIP BASIS",
      desc: '"For those in deep transition seeking support and sanctuary."',
      features: ["Full Access Opportunity", "Community Support", "Equity Focused"],
      button: requestStatus === 'success' ? "REQUESTED" : (requestStatus === 'sending' ? "SENDING..." : "REQUEST SEAT"),
      onClick: handleRequestSeat,
      isSpecial: true,
      icon: <UserPlus className="w-5 h-5 text-amber-400" />
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
                tier.highlight ? 'border-teal-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]' : 
                tier.isSpecial ? 'border-amber-500/20 hover:border-amber-500/40' : 'border-white/5 hover:border-white/10'
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
                      <Check className={`w-4 h-4 shrink-0 ${tier.isSpecial ? 'text-amber-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.onClick}
                  disabled={tier.isSpecial && requestStatus === 'success'}
                  className={`w-full py-4 sm:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${
                    tier.isSpecial 
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      : 'bg-[#39D7B8] text-[#0F0A15] hover:bg-[#4df7d5]'
                  }`}
                >
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <button 
              onClick={() => window.open(LINK_DONATION, '_blank')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-rose-500/20 bg-rose-500/5 text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-rose-500/10 transition-all"
            >
              <Heart className="w-4 h-4" /> Plant A Seed (Donate)
            </button>
          </div>
        </section>

        {/* Mobile App Instruction Card */}
        <section className="max-w-4xl mx-auto border-t border-white/5 pt-16">
          <div className="p-8 sm:p-12 rounded-[3rem] bg-gradient-to-br from-[#1A1423] to-[#0F0A15] border border-white/5 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-1000">
              <Smartphone size={240} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="p-4 rounded-3xl bg-teal-500/10 text-teal-400">
                <Smartphone className="w-8 h-8" />
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="text-white font-serif italic text-2xl">Keep the Sanctuary Close</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xl">
                  For the best experience during your transition, add Hearth & Horizon to your mobile or tablet home screen. It functions just like a native app.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                      <Share2 className="w-3 h-3 text-teal-500" /> iOS / Safari
                    </div>
                    <p className="text-[11px] text-slate-500">Tap the 'Share' icon in your browser toolbar and select 'Add to Home Screen'.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                      <PlusSquare className="w-3 h-3 text-teal-500" /> Android / Chrome
                    </div>
                    <p className="text-[11px] text-slate-500">Tap the 'three-dot menu' in the top right and select 'Install app' or 'Add to Home screen'.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default GroveTiers;