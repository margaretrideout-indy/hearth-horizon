import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SanctuaryTransition from '../components/SanctuaryTransition';
import {
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Zap, FileText, Map, MessageSquare, Briefcase,
  MoreVertical, Star, Library as LibraryIcon, Compass, ArrowRight, LogIn, ChevronRight
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Legacy title → Horizon title mapping
const LEGACY_MAP = [
  { triggers: ['teacher', 'elementary teacher', 'secondary teacher', 'high school teacher', 'classroom teacher'], horizon: 'Learning & Development Architect' },
  { triggers: ['police officer', 'police', 'constable', 'rcmp officer', 'military officer', 'army officer', 'navy officer', 'soldier', 'veteran', 'armed forces'], horizon: 'Operational Risk & Strategic Lead' },
  { triggers: ['paramedic', 'first responder', 'firefighter', 'fire fighter', 'emt', 'emergency responder'], horizon: 'Crisis Management & Resilience Director' },
  { triggers: ['educator', 'instructor', 'tutor', 'professor', 'lecturer', 'pedagog'], horizon: 'Human Capital Development Strategist' },
  { triggers: ['principal', 'vice principal', 'superintendent', 'head of school', 'dean'], horizon: 'Organizational Leadership & Culture Executive' },
  { triggers: ['curriculum', 'instructional design', 'learning design', 'e-learning'], horizon: 'Learning Experience Architect' },
  { triggers: ['special education', 'resource teacher', 'iep', 'inclusion'], horizon: 'Adaptive Systems & Equity Specialist' },
  { triggers: ['librarian', 'information', 'archivist'], horizon: 'Knowledge Management & Intelligence Lead' },
  { triggers: ['nurse', 'rn ', 'lpn ', 'nursing'], horizon: 'Clinical Operations & Continuity Specialist' },
  { triggers: ['doctor', 'physician', 'md ', 'surgeon', 'gp '], horizon: 'Health Systems & Diagnostic Strategist' },
  { triggers: ['pharmacist', 'pharmacy'], horizon: 'Regulatory Compliance & Product Governance Lead' },
  { triggers: ['physiotherap', 'occupational therap', 'rehab'], horizon: 'Performance Recovery & Workforce Wellness Consultant' },
  { triggers: ['health care aide', 'pca ', 'personal support', 'care aide'], horizon: 'Human-Centered Service Delivery Specialist' },
  { triggers: ['mental health', 'psychiatr', 'psycholog'], horizon: 'Behavioural Insights & Workforce Resilience Advisor' },
  { triggers: ['social worker', 'caseworker', 'case manager', 'child welfare'], horizon: 'Risk Assessment & Stakeholder Resource Strategist' },
  { triggers: ['counsellor', 'counselor', 'therapist', 'life coach'], horizon: 'Human Capital Resilience & Development Consultant' },
  { triggers: ['probation', 'corrections', 'justice', 'parole'], horizon: 'Compliance Governance & Behaviour Change Lead' },
  { triggers: ['shelter', 'housing', 'homeless', 'transitional'], horizon: 'Crisis Infrastructure & Resource Allocation Manager' },
  { triggers: ['addictions', 'substance', 'recovery', 'harm reduction'], horizon: 'Health Risk Mitigation & Community Continuity Advisor' },
  { triggers: ['policy', 'policy analyst', 'legislative', 'regulatory'], horizon: 'Policy Architecture & Regulatory Intelligence Lead' },
  { triggers: ['bylaw', 'enforcement', 'compliance officer', 'inspector'], horizon: 'Regulatory Compliance & Risk Enforcement Strategist' },
  { triggers: ['civil servant', 'public servant', 'government', 'municipal'], horizon: 'Public Sector Operations & Strategic Delivery Lead' },
  { triggers: ['fire', 'firefighter', 'fire chief', 'fire marshal'], horizon: 'Emergency Risk Mitigation & Operational Safety Lead' },
  { triggers: ['police', 'officer', 'constable', 'rcmp', 'opp '], horizon: 'Security Operations & Organizational Risk Manager' },
  { triggers: ['military', 'army', 'navy', 'air force', 'veteran', 'forces'], horizon: 'Strategic Operations & High-Stakes Execution Leader' },
  { triggers: ['manager', 'supervisor', 'team lead', 'foreman'], horizon: 'Operational Excellence & Team Performance Lead' },
  { triggers: ['director', 'executive director', 'vp ', 'vice president'], horizon: 'Strategic Direction & Organizational Growth Executive' },
  { triggers: ['coordinator', 'administrator', 'admin'], horizon: 'Systems Coordination & Operational Flow Specialist' },
  { triggers: ['program manager', 'project manager', 'project coordinator'], horizon: 'Strategic Program Delivery & Stakeholder Alignment Lead' },
  { triggers: ['hr ', 'human resources', 'talent acquisition', 'recruiter'], horizon: 'Human Capital Strategy & Talent Pipeline Architect' },
  { triggers: ['analyst', 'data analyst', 'business analyst', 'systems analyst'], horizon: 'Business Intelligence & Decision Enablement Specialist' },
  { triggers: ['researcher', 'research coordinator', 'evaluator', 'epidemiol'], horizon: 'Evidence Synthesis & Strategic Insights Lead' },
  { triggers: ['statistician', 'data scientist', 'quantitative'], horizon: 'Predictive Intelligence & Analytics Architect' },
  { triggers: ['community', 'outreach', 'liaison'], horizon: 'Stakeholder Mobilization & Trust-Building Lead' },
  { triggers: ['communications', 'public relations', 'media relations', 'pr '], horizon: 'Narrative Strategy & Brand Reputation Manager' },
  { triggers: ['fundrais', 'grant', 'development officer'], horizon: 'Revenue Strategy & Mission-Aligned Capital Lead' },
  { triggers: ['volunteer', 'event coordinator', 'events'], horizon: 'Experience Design & Community Activation Strategist' },
];

const BRIGID_POETIC_FALLBACK = "A complex history, indeed. Let us sit by the fire in the Smithy to find its true horizon.";

function mapLegacyToHorizon(input) {
  if (!input || input.trim().length < 2) return null;
  const lower = input.toLowerCase();
  for (const entry of LEGACY_MAP) {
    if (entry.triggers.some(t => lower.includes(t))) return entry.horizon;
  }
  return null;
}

function BrigidSampler({ onSave }) {
  const [legacyTitle, setLegacyTitle] = useState('');
  const [horizonTitle, setHorizonTitle] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showBrigidToast, setShowBrigidToast] = useState(false);
  const inputRef = useRef(null);
  const [isPoetic, setIsPoetic] = useState(false);

  const handleInput = (val) => {
    setLegacyTitle(val);
    setSaved(false);
    if (val.length >= 3) {
      const mapped = mapLegacyToHorizon(val);
      if (mapped) {
        setHorizonTitle(mapped);
        setIsPoetic(false);
        setTimeout(() => {
          setShowBrigidToast(true);
          setTimeout(() => setShowBrigidToast(false), 4000);
        }, 700);
      } else {
        setHorizonTitle(BRIGID_POETIC_FALLBACK);
        setIsPoetic(true);
      }
    } else {
      setHorizonTitle(null);
      setIsPoetic(false);
    }
  };

  const handleSave = () => {
    if (!horizonTitle) return;
    onSave(legacyTitle, horizonTitle);
    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      className="max-w-2xl mx-auto mb-24"
    >
      <AnimatePresence>
        {showBrigidToast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#1A1225] border border-purple-500/30 shadow-2xl shadow-purple-500/10 max-w-xs w-full"
          >
            <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Sparkles size={11} className="text-purple-400" />
            </div>
            <p className="text-[10px] font-serif italic text-purple-200/80 leading-snug">
              "A strong foundation. Choose your gear below to begin the deep work."
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#14101C] to-[#0D0B12] border border-purple-500/20 shadow-[0_0_60px_rgba(168,85,247,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.04),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-purple-500/70">Initial Spark — Brigid is Listening</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif italic text-white">Whisper your legacy title to Brigid.</h3>
          <p className="text-[11px] text-zinc-500 italic">She will translate it into the language of your next horizon — instantly.</p>

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={legacyTitle}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="e.g. Special Education Teacher, Charge Nurse..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-purple-500/40 transition-all placeholder:text-zinc-700 font-serif italic"
            />
          </div>

          <AnimatePresence>
            {horizonTitle && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-purple-500/40">Brigid's Reading</span>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-purple-500/20 to-transparent" />
                </div>
                <motion.div
                  className={`p-5 rounded-2xl border ${isPoetic ? 'bg-amber-500/[0.03] border-amber-500/20' : 'bg-purple-500/[0.04] border-purple-500/20'}`}
                >
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-2 ${isPoetic ? 'text-amber-500/50' : 'text-purple-500/50'}`}>
                    {isPoetic ? "Brigid Speaks" : "Your Horizon Title"}
                  </p>
                  <motion.p
                    key={horizonTitle}
                    initial={{ opacity: 0, y: 4, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    className={`font-serif italic leading-snug ${isPoetic ? 'text-base text-amber-200/80' : 'text-xl text-white'}`}
                  >
                    {isPoetic ? `"${horizonTitle}"` : horizonTitle}
                  </motion.p>
                </motion.div>
                {!isPoetic && (!saved ? (
                  <button onClick={handleSave} className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-purple-500/30 transition-all">
                    <Check size={12} /> Save to My Hearth
                  </button>
                ) : (
                  <p className="text-[10px] text-teal-400 font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                    <Sparkles size={11} /> Saved to your Hearth vault
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showTransition, setShowTransition] = useState(false);

  const handleBrigidSave = (legacyTitle, horizonTitle) => {
    onSync({ ...vault, archetype: horizonTitle, legacy_title: legacyTitle });
  };

  const hasSession = vault?.isAligned || !!localStorage.getItem('base44_auth_session');

  const handleSeedling = () => {
    onSync({ tier: 'Seedling' });
    if (hasSession) { setShowTransition(true); } 
    else { base44.auth.redirectToLogin('/hearth'); }
  };

  const handlePaid = (stripeUrl, tierName) => {
    onSync({ tier: tierName });
    if (hasSession) { setShowTransition(true); } 
    else { window.location.href = stripeUrl; }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await base44.entities.SeatRequest.create({
        name: formData.name, email: formData.email, field: 'Other', status: 'pending'
      });
      setContactStatus('success');
    } catch (error) {
      window.location.href = `mailto:margaretpardy@gmail.com?subject=Hearth Inquiry&body=${encodeURIComponent(formData.message)}`;
      setContactStatus('success');
    }
  };

  const tiers = [
    { name: "Seedling", price: "FREE", period: "ALWAYS OPEN", desc: "A quiet space for those beginning to look toward a new horizon.", features: ["Seedling Badge", "1 Horizon Analysis/Mo", "Horizon Job Board", "Embers Community Chat", "Public Library"], button: "GET STARTED", onClick: handleSeedling, icon: <Leaf className="w-5 h-5 text-teal-400" /> },
    { name: "Hearthkeeper", price: "$3", period: "$5/MO AFTER FIRST MONTH", desc: "Removing the noise to keep your creative fires burning bright.", features: ["Everything in Seedling, plus:", "Hearthkeeper Badge", "Unlimited Hearth Syncing", "Full Ecosystem Alignment", "Unlimited Horizon Analysis"], button: "SELECT PLAN", onClick: () => handlePaid('https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03', 'Hearthkeeper'), highlight: true, icon: <Flame className="w-5 h-5 text-amber-400" /> },
    { name: "Steward", price: "$5", period: "$8/MO AFTER FIRST MONTH", desc: "Full oversight and total access to the entire landscape.", features: ["Everything in Hearthkeeper, plus:", "Founding Forest Badge", "Scholarship Sponsorship", "Priority Resource Requests"], button: "SELECT PLAN", onClick: () => handlePaid('https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04', 'Steward'), icon: <Mountain className="w-5 h-5 text-teal-400" /> },
    { name: "Scholarship", price: "WAITLIST", period: "EQUITY BASIS", desc: "For those in deep transition seeking support and sanctuary.", features: ["Full Hearthkeeper Access", "Community Support", "Direct Navigation Aid"], button: requestStatus === 'success' ? "REQUESTED" : "REQUEST SEAT", onClick: () => {}, isSpecial: true, icon: <UserPlus className="w-5 h-5 text-purple-400" /> }
  ];

  return (
    <div className="relative min-h-screen bg-[#0A080D] text-slate-300 font-sans selection:bg-teal-500/30 overflow-x-hidden pb-20 text-left">
      <AnimatePresence>
        {showTransition && <SanctuaryTransition onComplete={() => navigate('/hearth')} />}
      </AnimatePresence>
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),rgba(147,51,234,0.03)_40%,transparent_80%)] pointer-events-none" />

      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-6">
            <button onClick={() => navigate('/library')} className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all p-2">
              <LibraryIcon size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Library</span>
            </button>
            <button onClick={() => navigate('/horizon')} className="flex items-center gap-2 text-zinc-400 hover:text-teal-400 transition-all p-2">
              <Compass size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest hidden md:block">Horizon</span>
            </button>
          </div>
          <button onClick={() => base44.auth.redirectToLogin('/hearth')} className="flex items-center gap-2 text-white bg-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 hover:border-teal-500/50 transition-all">
            <LogIn size={14} className="text-teal-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Log In</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12 relative z-10">
        <header className="mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">The Hearth & Horizon Sanctuary</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif italic text-white mb-12 tracking-tight leading-tight max-w-4xl mx-auto text-center">
            Transition with <span className="text-teal-400">Intention.</span>
          </h1>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-b from-[#110E16] to-[#0D0B12] border border-white/5 shadow-2xl relative overflow-hidden text-center">
            <p className="relative z-10 text-base md:text-lg text-zinc-300 font-light leading-relaxed mb-10 italic">
              "As an Indigenous educator with 13 years in the classroom, I’ve learned that a professional shift is more than a move- it's a migration of the self."
            </p>
            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-white font-serif italic text-xl"> Margaret, Founder </span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">BA, BEd, MEd | Indigenous Studies</span>
            </div>
          </motion.div>
        </header>

        {/* BRIGID SAMPLER */}
        <BrigidSampler onSave={handleBrigidSave} />

        {/* PRICING GRID */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-white font-serif italic text-4xl mb-4">Deepen the Translation</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">Choose your level of support</p>
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
              <div className="mb-12">
                <p className="text-[10px] text-teal-400/50 font-light tracking-wide italic max-w-xs mx-auto">
                  To Matt: Thank you for holding the map steady while I found my way through the trees.
                </p>
              </div>
              <button onClick={() => window.location.href = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02'} className="px-10 py-4 bg-teal-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-teal-500/20">Choose Your Contribution</button>
            </div>
          </div>
        </section>

        {/* KO-FI SECTION - STABLE VERSION */}
        <section className="mb-32 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#110E16] to-[#0D0B12] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400/70">Fuel the Forge</span>
              </div>
              <h3 className="text-xl font-serif italic text-white mb-2">Buy the Architect a Coffee</h3>
              <p className="text-sm text-zinc-500 font-light max-w-sm italic">
                I build in solitude to keep the vision pure. Your support keeps the lights on and the ideas flowing from the woods.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center gap-2">
              <a href='https://ko-fi.com/I2I51EFK95' target='_blank' rel='noreferrer'>
                <img height='36' style={{border: '0px', height: '36px'}} src='https://storage.ko-fi.com/cdn/kofi4.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' />
              </a>
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Direct via Ko-fi</span>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION */}
        <section className="mb-32 max-w-4xl mx-auto">
          <div className="bg-[#110E16]/40 border border-white/5 p-10 md:p-16 rounded-[3.5rem] text-center">
            <h2 className="text-white font-serif italic text-3xl mb-10">Questions?</h2>
            {contactStatus === 'success' ? (
              <div className="py-10 text-teal-400 font-serif italic">Your message has been carried to the Hearth.</div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <input required placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50" />
                  <input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50" />
                </div>
                <textarea required rows="4" placeholder="Your inquiry..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-teal-500/50 text-left" />
                <button type="submit" className="w-full py-5 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase hover:bg-teal-500 hover:text-black transition-all">
                  {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer className="max-w-4xl mx-auto text-center border-t border-white/5 pt-20">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-zinc-500"><Smartphone size={32} /></div>
            <h3 className="text-white font-serif italic text-xl">Take the Sanctuary With You</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <Share2 size={18} className="text-teal-400" />
                <div className="text-[10px] text-left">
                  <p className="text-white font-bold">iOS / Safari</p>
                  <p className="text-zinc-500 font-light">Tap Share → 'Add to Home Screen'</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <MoreVertical size={18} className="text-purple-400" />
                <div className="text-[10px] text-left">
                  <p className="text-white font-bold">Android / Chrome</p>
                  <p className="text-zinc-500 font-light">Tap Menu → 'Install App'</p>
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