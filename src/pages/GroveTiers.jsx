import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Wind, Zap, Lock, 
  TrendingUp, MessagesSquare, Compass, Check, Leaf, Mountain, Heart, UserPlus,
  Smartphone, Share2, PlusSquare 
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

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
      icon: <UserPlus className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A080D] text-slate-300 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* 1. Luminous Header with dynamic Arvâni Glow */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),rgba(147,51,234,0.03)_40%,transparent_70%)] pointer-events-none" />
      
      <div className="absolute top-8 right-8 z-20">
        <button 
          onClick={handleMemberLogin}
          className="group flex items-center gap-2 text-zinc-600 hover:text-teal-400 transition-all duration-300"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline">Already a member?</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border border-zinc-800 rounded-full group-hover:border-teal-500/50 group-hover:bg-teal-500/5 transition-all">
            Log In
          </span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        
        <header className="mb-24 md:mb-32 text-center">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Welcome to the Sanctuary</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-5xl mx-auto">
            Transition with Intention.
          </h1>

          {/* 3. The Founder's Message Card with Twilight Pulse */}
          <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-[3rem] bg-[#110E16]/80 backdrop-blur-lg border border-zinc-800 shadow-[0_20px_60px_rgba(147,51,234,0.02)] relative overflow-hidden group mb-16 md:mb-20">
            {/* Soft background pulse */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px]" />
            
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-10 italic">
              "As an Indigenous educator with 13 years in the classroom and a Master of Education in Indigenous Studies, 
              my approach is rooted in the Psychology and Sociology of belonging. I have spent my career 
              learning how we anchor ourselves in community and identity during times of upheaval. 
              I realized that a professional shift is more than a move—it's a migration of the self. 
              Hearth & Horizon is the sanctuary for those ready to write their next chapter."
            </p>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-2xl">
                — Margaret, Founder | BA, BEd, MEd
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 italic">
                Hearth & Horizon
              </span>
            </div>
          </div>
        </header>

        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] border transition-all duration-500 bg-[#110E16]/60 backdrop-blur-sm ${
                tier.highlight ? 'border-teal-500/30 shadow-[0_20px_60px_rgba(20,184,166,0.1)]' : 
                tier.isSpecial ? 'border-purple-500/20 hover:border-purple-500/40' : 'border-zinc-800 hover:border-zinc-700'
              }`}>
                <div className="mb-6 sm:mb-8">{tier.icon}</div>
                <h4 className="text-white font-bold text-xl sm:text-2xl mb-1 tracking-tight">{tier.name}</h4>
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-white tracking-tighter">{tier.price}</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-6 sm:mb-8">{tier.period}</p>
                <p className="text-[12px] text-zinc-400 mb-8 sm:mb-10 leading-relaxed italic min-h-[48px]">{tier.desc}</p>
                
                <div className="h-[1px] w-full bg-zinc-800 mb-8 sm:mb-10" />
                
                <ul className="space-y-4 mb-10 sm:mb-16 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${tier.isSpecial ? 'text-purple-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.onClick}
                  disabled={tier.isSpecial && requestStatus === 'success'}
                  className={`w-full py-4 sm:py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${
                    tier.isSpecial 
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
                      : 'bg-[#39D7B8] text-[#0A080D] hover:bg-[#4df7d5]'
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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-500/10 transition-all shadow-[0_0_20px_rgba(20,184,166,0.1)] group"
            >
              <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}><Heart className="w-4 h-4 text-teal-500" /></motion.div> Plant A Seed (Donate)
            </button>
          </div>
        </section>

        {/* mobile app section... (kept generic for structure) */}
      </div>
    </div>
  );
};

export default GroveTiers;