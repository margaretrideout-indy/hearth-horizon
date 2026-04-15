import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Mail, MessageSquare
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const LINK_STEWARD = 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null); // 'sending', 'success'
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
    // For now, we simulate a successful send. 
    // You can connect this to a Base44 entity named 'Inquiries' later!
    setTimeout(() => setContactStatus('success'), 1500);
  };

  const tiers = [
    {
      name: "Seedling",
      price: "FREE",
      period: "ALWAYS OPEN",
      desc: '"A quiet space for those beginning to look toward a new horizon."',
      features: ["Foundational Badge", "Community Resources", "Access to Library (Basic)", "Standard Alignment Preview"],
      button: "GET STARTED",
      onClick: handleSeedling,
      icon: <Leaf className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Hearthkeeper",
      price: "$3",
      period: "$5/MO AFTER FIRST MONTH",
      desc: '"Removing the noise to keep your creative fires burning bright."',
      features: ["Everything in Seedling", "Hearthkeeper Badge", "Unlimited Digital Tools", "Financial Transition Guides", "Full Market Topography"],
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
      features: ["Everything in Hearthkeeper", "Steward's Mantle Badge", "Ecosystem Alignment", "The Canopy Hub", "Sponsors 1 Hearthkeeper Seat"],
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
        <button onClick={handleMemberLogin} className="group flex items-center gap-2 text-zinc-600 hover:text-teal-400 transition-all duration-300">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden sm:inline">Already a member?</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border border-zinc-800 rounded-full group-hover:border-teal-500/50 group-hover:bg-teal-500/5 transition-all">Log In</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-10">
        <header className="mb-16 md:mb-24 text-center">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Welcome to the Sanctuary</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-5xl mx-auto">Transition with Intention.</h1>
          <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-[3rem] bg-[#110E16]/60 backdrop-blur-xl border border-zinc-800/50 shadow-2xl relative overflow-hidden mb-16">
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-8 italic">
              "As an Indigenous educator with 13 years in the classroom... Hearth & Horizon is the sanctuary for those ready to write their next chapter."
            </p>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-2xl">— Margaret, Founder</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Hearth & Horizon</span>
            </div>
          </div>
        </header>

        {/* TIERS SECTION */}
        <section className="mb-24 md:mb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500 bg-[#110E16]/60 backdrop-blur-sm ${tier.highlight ? 'border-teal-500/30 shadow-[0_20px_60px_rgba(20,184,166,0.1)]' : tier.isSpecial ? 'border-purple-500/20 hover:border-purple-500/40' : 'border-zinc-800 hover:border-zinc-700'}`}>
                <div className="mb-6">{tier.icon}</div>
                <h4 className="text-white font-bold text-xl mb-1">{tier.name}</h4>
                <div className="mb-2"><span className="text-3xl font-bold text-white tracking-tighter">{tier.price}</span></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-6">{tier.period}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${tier.isSpecial ? 'text-purple-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>
                <button onClick={tier.onClick} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tier.isSpecial ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#39D7B8] text-[#0A080D]'}`}>{tier.button}</button>
              </div>
            ))}
          </div>
        </section>

        {/* NEW: CONTACT SECTION */}
        <section className="mb-24 md:mb-48 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white font-serif italic text-4xl mb-4">Questions?</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Reach out to the Hearth</p>
          </div>
          
          <div className="bg-[#110E16]/40 border border-zinc-800/50 p-8 md:p-12 rounded-[3rem] backdrop-blur-sm">
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
                  <input required type="text" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all" placeholder="How should we address you?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                  <input required type="email" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all" placeholder="your@email.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                  <textarea required rows="4" className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/30 transition-all resize-none" placeholder="What's on your mind?" />
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

        {/* MOBILE / INSTALL SECTION */}
        <section className="max-w-4xl mx-auto border-t border-zinc-900 pt-16">
          <div className="p-8 sm:p-12 rounded-[3rem] bg-[#110E16]/40 border border-zinc-800/50">
            <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="p-4 rounded-3xl bg-teal-500/10 text-teal-400"><Smartphone className="w-8 h-8" /></div>
              <div className="flex-1 space-y-4">
                <h3 className="text-white font-serif italic text-2xl">Keep the Sanctuary Close</h3>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">For a native experience during your transition, add Hearth & Horizon to your home screen.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400"><Share2 size={12} className="text-teal-500" /> iOS: Share &gt; Add to Home</div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-400"><PlusSquare size={12} className="text-teal-500" /> Android: Menu &gt; Install</div>
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