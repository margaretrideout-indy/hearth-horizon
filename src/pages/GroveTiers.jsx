import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Zap, FileText, Map, MessageSquare, Briefcase,
  MoreVertical, Star, Library as LibraryIcon, Compass
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
      await window.base44.entities.VoucherPool.create({
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
      await window.base44.entities.ContactMessages.create({
        sender_name: formData.name,
        sender_email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'unread'
      });
      setContactStatus('success');
    } catch (error) {
      window.location.href = `mailto:margaretpardy@gmail.com?subject=Hearth Inquiry&body=${formData.message}`;
      setContactStatus('success');
    }
  };

  const tiers = [
    {
      name: "Seedling",
      price: "FREE",
      period: "ALWAYS OPEN",
      desc: '"A quiet space for those beginning to look toward a new horizon."',
      features: [
        "Seedling Badge", 
        "The Hearth: 1 Analysis/Mo", 
        "The Horizon Job Board", 
        "The Embers Community Chat",
        "Public Library Access"
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
        "Hearthkeeper Badge", 
        "Unlimited Hearth Syncing", 
        "Full Ecosystem Alignment", 
        "Unlimited Horizon Analysis",
        "The Embers Community Chat"
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
        "Founding Forest Badge", 
        "Everything in Hearthkeeper", 
        "Sponsors 1 Scholarship Seat", 
        "The Embers Community Chat",
        "Priority Resource Requests"
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
      features: [
        "Full Hearthkeeper Access", 
        "Community Support", 
        "Equity Focused",
        "The Embers Community Chat"
      ],
      button: requestStatus === 'success' ? "REQUESTED" : (requestStatus === 'sending' ? "SENDING..." : "REQUEST SEAT"),
      onClick: handleRequestSeat,
      isSpecial: true,
      icon: <UserPlus className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A080D] text-slate-300 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-[70vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.08),rgba(147,51,234,0.03)_40%,transparent_80%)] pointer-events-none" />

      {/* NAVIGATION BAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#0A080D]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/library')} className="group flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all">
              <LibraryIcon size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">The Library</span>
            </button>
            
            <button onClick={() => navigate('/horizon')} className="group flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all">
              <Compass size={14} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Horizon Job Board</span>
            </button>
          </div>
          
          <button onClick={handleMemberLogin} className="group flex items-center gap-2 text-zinc-600 hover:text-teal-400 transition-all duration-300">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] hidden sm:inline">Already a member?</span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 border border-zinc-800 rounded-full group-hover:border-teal-500/50 group-hover:bg-teal-500/5 transition-all">Log In</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <header className="mb-16 md:mb-24 text-center">
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Welcome to the Sanctuary</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-5xl mx-auto">Transition with Intention.</h1>
          <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-[3rem] bg-[#110E16]/60 backdrop-blur-xl border border-zinc-800/50 shadow-2xl relative overflow-hidden mb-16">
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-8 italic text-center">
              "As an Indigenous educator with 13 years in the classroom and a Master of Education in Indigenous Studies, my approach is rooted in the Psychology and Sociology of belonging. I have spent my career learning how we anchor ourselves in community and identity during times of upheaval. I realized that a professional shift is more than a move- it's a migration of the self. Hearth & Horizon is the sanctuary for those ready to write their next chapter."
            </p>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-2xl">— Margaret, Founder | BA, BEd, MEd</span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Hearth & Horizon</span>
            </div>
          </div>
        </header>

        <section className="mb-24 md:mb-48">
          <div className="text-center mb-16">
            <h2 className="text-white font-serif italic text-4xl mb-4">Provisions from the Hearth</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Essential Resources for your Journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-teal-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6"><Zap className="text-teal-400" size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-4">The Reframing Engine</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">Flip public-sector jargon into the outcome-based language corporate recruiters value most.</p>
            </div>
            <div className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-purple-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6"><FileText className="text-purple-400" size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-4">Wayfarer's Tools</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">ATS-optimized resume templates and salary negotiation scripts designed for the Canadian market.</p>
            </div>
            <div className="group p-8 rounded-[2.5rem] bg-[#110E16]/40 border border-zinc-800/50 hover:border-teal-500/30 transition-all duration-500">
              <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6"><Map className="text-teal-400" size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-4">Market Topography</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">Navigate RRSP matching, vacation negotiation, and provincial credential translation with confidence.</p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16 space-y-4">
             <h2 className="text-white font-serif italic text-4xl">Choose Your Path</h2>
             <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Structured Support Options</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative flex flex-col p-8 sm:p-10 rounded-[2.5rem] border transition-all duration-500 bg-[#110E16]/60 backdrop-blur-sm ${tier.highlight ? 'border-teal-500/30 shadow-[0_20px_60px_rgba(20,184,166,0.1)]' : tier.isSpecial ? 'border-purple-500/20' : 'border-zinc-800'}`}>
                <div className="mb-6">{tier.icon}</div>
                <h4 className="text-white font-bold text-xl mb-1 tracking-tight">{tier.name}</h4>
                <div className="mb-2"><span className="text-3xl font-bold text-white tracking-tighter">{tier.price}</span></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-6">{tier.period}</p>
                <p className="text-[12px] text-zinc-400 mb-8 italic min-h-[48px]">{tier.desc}</p>
                <div className="h-[1px] w-full bg-zinc-800 mb-8" />
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-[11px] text-zinc-400 font-medium">
                      <Check className={`w-4 h-4 shrink-0 ${tier.isSpecial ? 'text-purple-500' : 'text-teal-500'}`} /> {feat}
                    </li>
                  ))}
                </ul>
                <button onClick={tier.onClick} disabled={tier.isSpecial && requestStatus === 'success'} className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tier.isSpecial ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-[#39D7B8] text-[#0A080D]'}`}>
                  {tier.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 md:mb-48 max-w-4xl mx-auto">
          <div className="relative p-1 bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-teal-500/20 rounded-[3rem]">
            <div className="bg-[#0A080D] rounded-[2.9rem] px-8 py-12 md:p-16 text-center relative overflow-hidden">
              <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)] pointer-events-none" 
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="text-teal-400 fill-teal-400/20" size={16} />
                  <h2 className="text-white font-serif italic text-3xl">Luminary Registry</h2>
                  <Star className="text-teal-400 fill-teal-400/20" size={16} />
                </div>
                
                <div className="mb-16 md:mb-20 flex flex-col items-center">
                  <div className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 italic mb-6 w-fit flex gap-2 items-center text-[10px] font-black uppercase tracking-widest">
                    <Star size={10} className="fill-teal-400"/> Founder's Gratitude
                  </div>
                  <p className="text-slate-400 text-sm md:text-base italic font-light max-w-lg leading-relaxed border-l border-white/10 pl-5 py-2">
                    "To Matthew—thank you for holding the map while I figured out which way my horizon was shifting, and for believing in this sanctuary before the first stone was even laid."
                  </p>
                </div>

                <div className="mt-16 pt-12 border-t border-white/5 space-y-4 text-center max-w-xl mx-auto mb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Luminary Registry Fund</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light italic">
                    Contributions to the Registry are directly reinvested into the growth of the Grove—fueling new tool development, app optimizations, and the expansion of our resource archives.
                  </p>
                </div>

                <div className="flex justify-center">
                    <button 
                      onClick={() => window.location.href = LINK_DONATION}
                      className="px-10 py-4 bg-[#39D7B8] text-[#0A080D] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-teal-500/20 hover:scale-105"
                    >
                        Invest in the Hearth
                    </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-24 md:mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white font-serif italic text-4xl mb-4">Questions?</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Reach out to the Hearth</p>
          </div>
          <div className="bg-[#110E16]/40 border border-zinc-800/50 p-8 md:p-12 rounded-[3rem] backdrop-blur-sm shadow-2xl">
            {contactStatus === 'success' ? (
              <div className="text-center py-12">
                <Sparkles className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-serif italic text-white mb-2">Message Received</h3>
                <p className="text-zinc-500 text-sm italic">The embers are carrying your message to Margaret.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-teal-500/30" placeholder="How should we address you?" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-teal-500/30" placeholder="your@email.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                  <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 text-sm text-white outline-none focus:border-teal-500/30 resize-none" placeholder="What's on your mind?" />
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

        <footer className="max-w-4xl mx-auto pb-24 selection:bg-teal-500/30">
          <div className="bg-[#110E16]/40 border border-zinc-800/50 rounded-[2.5rem] p-10 md:p-12 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 text-teal-500/5">
              <Smartphone size={160} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 space-y-5 text-center md:text-left">
                <h3 className="text-2xl font-serif italic text-white leading-tight">Bring the Sanctuary Home</h3>
                <p className="text-[12px] text-zinc-500 uppercase tracking-widest font-black max-w-[280px]">Add Hearth & Horizon to your mobile homescreen</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
                <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center gap-4 group hover:border-teal-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-2 border border-teal-500/20">
                    <Share2 size={20} />
                  </div>
                  <h4 className="text-[12px] font-black uppercase tracking-widest text-white">iOS / Safari</h4>
                  <p className="text-[12px] text-zinc-300 leading-relaxed font-light italic px-2">
                    Tap the Share button below, then select <span className="text-white italic">'Add to Home Screen'</span>.
                  </p>
                </div>

                <div className="flex-1 bg-black/40 border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center gap-4 group hover:border-purple-500/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2 border border-purple-500/20">
                    <MoreVertical size={20} />
                  </div>
                  <h4 className="text-[12px] font-black uppercase tracking-widest text-white">Android / Chrome</h4>
                  <p className="text-[12px] text-zinc-300 leading-relaxed font-light italic px-2">
                    Tap the three dots in the corner, then select <span className="text-white italic">'Install App'</span> or <span className="text-white italic">'Add to Home Screen'</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center opacity-30 group">
             <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-[1px] w-8 bg-zinc-800 group-hover:w-12 transition-all" />
                <Mountain size={14} className="text-zinc-500" />
                <div className="h-[1px] w-8 bg-zinc-800 group-hover:w-12 transition-all" />
             </div>
             <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500 leading-none">Hearth & Horizon © 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GroveTiers;