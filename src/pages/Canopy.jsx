import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Zap, FileText, Map, MessageSquare, Briefcase
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const LINK_STEWARD = 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const hasSession = vault?.isAligned || !!localStorage.getItem('base44_auth_session');

  const handleMemberLogin = () => {
    base44.auth.redirectToLogin('/hearth');
  };

  const handleSeedling = () => {
    onSync({ tier: 'Seedling' });
    if (hasSession) {
      navigate('/hearth');
    } else {
      base44.auth.redirectToLogin('/hearth');
    }
  };

  const handlePaid = (stripeUrl, tierName) => {
    onSync({ tier: tierName });
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
      onSync({ tier: 'Seedling' }); 
      setRequestStatus('success');
    } catch (error) {
      console.error("Seat request failed", error);
      setRequestStatus('error');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    setTimeout(() => setContactStatus('success'), 1500);
  };

  const tiers = [
    {
      name: "Seedling",
      price: "FREE",
      period: "ALWAYS OPEN",
      desc: '"A quiet space for those beginning to look toward a new horizon."',
      features: [
        "Foundational Badge", 
        "Community Resources", 
        "Wayfarer's Provisions",
        "Standard Alignment Preview"
      ],
      button: "GET STARTED",
      onClick: handleSeedling,
      icon: <Leaf className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Hearthkeeper",
      price: "$3",
      period: "$5/MO AFTER FIRST MONTH",
      desc: '"Removing the noise to keep your creative fires burning bright."',
      features: [
        "Everything in Seedling", 
        "Hearthkeeper Badge", 
        "Unlimited Digital Tools", 
        "Financial Transition Guides",
        "Full Market Topography"
      ],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_HEARTHKEEPER, 'Hearthkeeper'),
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
        "Steward's Mantle Badge",
        "Ecosystem Alignment", 
        "The Canopy Hub",
        "Sponsors 1 Hearthkeeper Seat"
      ],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_STEWARD, 'Steward'),
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
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.08),rgba(147,51,234,0.03)_40%,transparent_80%)] pointer-events-none" />
      
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
        <header className="mb-16 md:mb-24 text-center">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Welcome to the Sanctuary</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-5xl mx-auto">
            Transition with Intention.
          </h1>

          <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-[3rem] bg-[#110E16]/60 backdrop-blur-xl border border-zinc-800/50 shadow-2xl relative overflow-hidden mb-16">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-[60px]" />
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-8 italic text-center">
              "As an Indigenous educator with 13 years in the classroom and a Master of Education in Indigenous Studies, 
              my approach is rooted in the Psychology and Sociology of belonging. I have spent my career 
              learning how we anchor ourselves in community and identity during times of upheaval. 
              I realized that a professional shift is more than a move—it's a migration of the self. 
              Hearth & Horizon is the sanctuary for those ready to write their next chapter."
            </p>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-2xl">— Margaret, Founder | BA, BEd, MEd</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Hearth & Horizon</span>
            </div>
          </div>
        </header>

        {/* --- THE WAYFARER'S CACHE SECTION --- */}
        <section className="mb-24 md:mb-48">
          <div className="text-center mb-16">
            <h2 className="text-white font-serif italic text-4xl mb-4">The Wayfarer’s Cache</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Essential Provisions for the Wayfarer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div whileHover={{ y: -5 }} className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-teal-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">The Reframing Engine</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Flip public-sector jargon into the outcome-based language corporate recruiters value most.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-purple-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Wayfarer's Provisions</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                ATS-optimized resume templates and word-for-word salary negotiation scripts designed for Canada.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-teal-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="text-teal-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Market Topography</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                Navigate RRSP matching, vacation negotiation, and provincial credential translation with confidence.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div whileHover={{ y: -5 }} className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-purple-500/30 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="text-purple-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Horizon Job Board</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    Location-specific career leads curated for those pivoting from the public sector.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-teal-500/30 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="text-teal-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Embers Chat</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">
                    A private sanctuary for real-time strategy, peer support, and collective wisdom.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-24 p-1 border-t border-b border-teal-500/10"
        >
          <div className="py-12 px-6 space-y-8 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent">
            <div className="space-y-3 text-center">
              <div className="flex justify-center gap-6 text-teal-500/40 mb-4">
                <Sprout size={18} />
                <Heart size={18} />
                <Globe size={18} />
              </div>
              <h3 className="text-white font-serif italic text-3xl">The Reciprocity Model</h3>
              <p className="text-zinc-400 text-sm max-w-xl mx-auto font-light leading-relaxed italic">
                Hearth & Horizon is nourished by the principle of reciprocity. Your contribution directly funds scholarship seats for those in transition. 
              </p>
              <div className="pt-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-teal-400 font-black uppercase tracking-[0.2em] text-[10px] py-2 px-4 rounded-full bg-teal-500/10 border border-teal-500/20">
                  <Sparkles className="w-3 h-3" /> Lightkeeper Gift Included
                </div>
                <p className="text-[11px] text-zinc-500 font-medium italic">
                  Donators receive immediate access to the <strong>Embers Chat</strong> and the <strong>Lightkeeper</strong> badge.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => window.open(LINK_DONATION, '_blank')}
                className="px-10 py-5 rounded-2xl bg-teal-500 text-[#0A080D] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#4df7d5] hover:scale-105 transition-all shadow-[0_0_30px_rgba(20,184,166,0.3)] flex items-center gap-3 group"
              >
                <Heart size={16} className="group-hover:fill-current" /> Plant A Seed
              </button>
              <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-teal-900" /> Secure Reciprocity via Stripe
              </div>
            </div>
          </div>
        </motion.div>

        <section className="mb-24 md:mb-48">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-white font-serif italic text-4xl">Choose Your Path</h2>
             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Structured Support Options</p>
          </div>

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
        </section>

        <section className="mb-24 md:mb-48 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white font-serif italic text-4xl mb-4">Questions?</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Reach out to the Hearth</p>
          </div>
          
          <div className="bg-[#110E16]/40 border border-zinc-800/50 p-8 md:p-12 rounded-[3rem] backdrop-blur-sm shadow-2xl">
            {contactStatus === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif italic text-white mb-2">Message Received</h3>
                <p className="text-zinc-500 text-sm italic">The embers are carrying your message to Margaret. We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                  <input required type="text" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all text-white placeholder:text-zinc-700 shadow-inner" placeholder="How should we address you?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                  <input required type="email" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all text-white placeholder:text-zinc-700 shadow-inner" placeholder="your@email.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                  <textarea required rows="4" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all resize-none text-white placeholder:text-zinc-700 shadow-inner" placeholder="What's on your mind?" />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button type="submit" disabled={contactStatus === 'sending'} className="w-full md:w-auto px-10 py-4 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-3">
                    {contactStatus === 'sending' ? "SENDING..." : <><Send size={14} /> SEND MESSAGE</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <section className="max-w-4xl mx-auto border-t border-zinc-900 pt-16 pb-24">
          <div className="p-8 sm:p-12 rounded-[3rem] bg-[#110E16]/40 border border-zinc-800/50">
            <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="p-4 rounded-3xl bg-teal-500/10 text-teal-400">
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-white font-serif italic text-2xl">Keep the Sanctuary Close</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">
                  For a native experience during your transition, add Hearth & Horizon to your home screen.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400">
                    <Share2 size={12} className="text-teal-500" /> iOS: Share &gt; Add to Home
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400">
                    <PlusSquare size={12} className="text-teal-500" /> Android: Menu &gt; Install
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