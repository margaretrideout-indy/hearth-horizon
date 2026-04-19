import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Zap, FileText, Map, MessageSquare, Briefcase,
  MoreVertical, Star, Library as LibraryIcon, Compass, ArrowRight, LogIn 
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
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      await base44.entities.VoucherPool.create({
        claimed_by: user.email,
        status: 'available'
      });
      onSync({ tier: 'Seedling' });
      setRequestStatus('success');
    } catch (error) {
      setRequestStatus('error');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await base44.entities.SeatRequest.create({
        name: formData.name,
        email: formData.email,
        field: 'Other',
        status: 'pending'
      });
      setContactStatus('success');
    } catch (error) {
      window.location.href = `mailto:margaretpardy@gmail.com?subject=Hearth Inquiry&body=${encodeURIComponent(formData.message)}`;
      setContactStatus('success');
    }
  };

  const tiers = [
    {
      name: "Seedling",
      price: "FREE",
      period: "ALWAYS OPEN",
      desc: "A quiet space for those beginning to look toward a new horizon.",
      features: ["Seedling Badge", "1 Horizon Analysis/Mo", "Horizon Job Board", "Embers Community Chat", "Public Library"],
      button: "GET STARTED",
      onClick: handleSeedling,
      icon: <Leaf className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Hearthkeeper",
      price: "$3",
      period: "$5/MO AFTER FIRST MONTH",
      desc: "Removing the noise to keep your creative fires burning bright.",
      features: ["Hearthkeeper Badge", "Unlimited Hearth Syncing", "Full Ecosystem Alignment", "Unlimited Horizon Analysis"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_HEARTHKEEPER, 'Hearthkeeper'),
      highlight: true,
      icon: <Flame className="w-5 h-5 text-amber-400" />
    },
    {
      name: "Steward",
      price: "$5",
      period: "$8/MO AFTER FIRST MONTH",
      desc: "Full oversight and total access to the entire landscape.",
      features: ["Founding Forest Badge", "Scholarship Sponsorship", "Priority Resource Requests", "Everything in Hearthkeeper"],
      button: "SELECT PLAN",
      onClick: () => handlePaid(LINK_STEWARD, 'Steward'),
      icon: <Mountain className="w-5 h-5 text-teal-400" />
    },
    {
      name: "Scholarship",
      price: "WAITLIST",
      period: "EQUITY BASIS",
      desc: "For those in deep transition seeking support and sanctuary.",
      features: ["Full Hearthkeeper Access", "Community Support", "Direct Navigation Aid"],
      button: requestStatus === 'success' ? "REQUESTED" : "REQUEST SEAT",
      onClick: handleRequestSeat,
      isSpecial: true,
      icon: <UserPlus className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A080D] text-slate-300 font-sans selection:bg-teal-500/30 overflow-x-hidden pb-20 text-left">
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),rgba(147,51,234,0.03)_40%,transparent_80%)] pointer-events-none" />

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => navigate('/library')} className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all p-2">
              <LibraryIcon size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Library</span>
            </button>
            <button onClick={() => navigate('/horizon')} className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all p-2">
              <Compass size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Horizon</span>
            </button>
          </div>
          <button onClick={handleMemberLogin} className="flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-teal-500/50 transition-all">
            <LogIn size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Log In</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12 relative z-10">
        <header className="mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">The Hearth & Horizon Sanctuary</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-4xl mx-auto">
            Transition with <span className="text-teal-400">Intention.</span>
          </h1>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-b from-[#110E16] to-[#0D0B12] border border-white/5 shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-10 italic">
              "As an Indigenous educator with 13 years in the classroom, I’ve learned that a professional shift is more than a move—it's a migration of the self. This is the sanctuary for those ready to anchor themselves in community while they write their next chapter."
            </p>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-xl"> Margaret, Founder </span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">BA, BEd, MEd | Indigenous Studies</span>
            </div>
          </motion.div>
        </header>

        {/* FEATURES GRID */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "The Reframing Engine", color: "text-teal-400", text: "Flip your current experience into the outcome-based language recruiters value most." },
              { icon: FileText, title: "Wayfarer's Tools", color: "text-purple-400", text: "ATS-optimized resume templates and salary negotiation scripts designed for the Canadian market." },
              { icon: Map, title: "Market Topography", color: "text-amber-400", text: "Navigate RRSP matching, vacation negotiation, and provincial credential translation." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#110E16]/40 border border-white/5 hover:border-teal-500/20 transition-all">
                <item.icon className={`${item.color} mb-6`} size={28} />
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING GRID */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-white font-serif italic text-4xl mb-4">Choose Your Path</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Structured Support Options</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`flex flex-col p-8 rounded-[2rem] border transition-all relative overflow-hidden ${tier.highlight ? 'bg-teal-500/[0.02] border-teal-500/30' : 'bg-[#110E16]/60 border-zinc-800'}`}>
                {tier.highlight && <div className="absolute top-0 right-0 px-4 py-1 bg-teal-500 text-[#0A080D] text-[8px] font-black uppercase rounded-bl-xl">Most Aligned</div>}
                <div className="mb-6">{tier.icon}</div>
                <h4 className="text-white font-bold text-xl mb-1">{tier.name}</h4>
                <div className="text-3xl font-bold text-white mb-1">{tier.price}</div>
                <p className="text-[9px] font-black uppercase text-zinc-400 mb-8">{tier.period}</p>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-[11px] text-zinc-400">
                      <Check className="w-4 h-4 text-teal-400 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <button onClick={tier.onClick} className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${tier.highlight ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'bg-white/5 text-white border border-white/10'}`}>
                  {tier.button}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* LUMINARY REGISTRY */}
        <section className="mb-32 max-w-4xl mx-auto text-center">
          <div className="p-[1px] bg-gradient-to-b from-teal-500/20 to-purple-500/20 rounded-[3rem]">
            <div className="bg-[#0D0B12] rounded-[2.9rem] p-12 md:p-16">
              <Star className="text-teal-400 mx-auto mb-6 animate-pulse" size={32} />
              <h2 className="text-white font-serif italic text-3xl mb-4">Luminary Registry</h2>
              <p className="text-zinc-400 text-sm font-light mb-8">Hearth & Horizon is built on reciprocity. Your contributions help keep this sanctuary accessible for all travellers.</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12 opacity-40">
                {['Matthew R.', 'Joining Soon...', 'Joining Soon...'].map((name, i) => (
                  <span key={i} className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/10 pb-1">{name}</span>
                ))}
              </div>
              <button onClick={() => window.location.href = LINK_DONATION} className="px-10 py-4 bg-teal-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-teal-500/20">Choose Your Contribution</button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="mb-32 max-w-4xl mx-auto">
          <div className="bg-[#110E16]/40 border border-white/5 p-10 md:p-16 rounded-[3.5rem] text-center">
            <h2 className="text-white font-serif italic text-3xl mb-10">Questions?</h2>
            {contactStatus === 'success' ? (
              <div className="py-10 text-teal-400 font-serif italic">Your message has been carried to the Hearth.</div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50" />
                </div>
                <textarea required rows="4" placeholder="Your inquiry..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-teal-500/50" />
                <button type="submit" className="w-full py-5 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase hover:bg-teal-500 hover:text-black transition-all">
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* MOBILE APP INSTRUCTIONS */}
        <footer className="max-w-4xl mx-auto text-center border-t border-white/5 pt-20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-zinc-500"><Smartphone size={32} /></div>
            <h3 className="text-white font-serif italic text-xl">Take the Sanctuary With You</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Share2 size={18} className="text-teal-400" />
                <div className="text-[10px] text-left">
                  <p className="text-white font-bold">iOS / Safari</p>
                  <p className="text-zinc-500">Tap Share → 'Add to Home Screen'</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <MoreVertical size={18} className="text-purple-400" />
                <div className="text-[10px] text-left">
                  <p className="text-white font-bold">Android / Chrome</p>
                  <p className="text-zinc-500">Tap Menu → 'Install App'</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GroveTiers;