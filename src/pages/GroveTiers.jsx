import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SanctuaryTransition from '../components/SanctuaryTransition';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';
import {
  Check, Flame, Sparkles,
  LogIn, ChevronDown, Heart, Star, Coffee
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

// ── Legacy → Horizon mapping ─────────────────────────────────────────────────
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
  { triggers: ['military', 'army', 'navy', 'air force', 'forces'], horizon: 'Strategic Operations & High-Stakes Execution Leader' },
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

const POETIC_FALLBACK = "A complex history. The full mapping requires the deep audit — enter the Forge below.";

function mapLegacy(input) {
  if (!input || input.trim().length < 2) return null;
  const lower = input.toLowerCase();
  for (const entry of LEGACY_MAP) {
    if (entry.triggers.some(t => lower.includes(t))) return entry.horizon;
  }
  return null;
}

// ── SECTION 1: Hero + Whisper Tool ──────────────────────────────────────────
function WhisperTool({ onSave }) {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [isPoetic, setIsPoetic] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  const handleInput = (val) => {
    setTitle(val);
    setSaved(false);
    if (val.length >= 3) {
      const mapped = mapLegacy(val);
      if (mapped) { setResult(mapped); setIsPoetic(false); }
      else { setResult(POETIC_FALLBACK); setIsPoetic(true); }
    } else {
      setResult(null);
      setIsPoetic(false);
    }
  };

  const handleSave = () => { onSave(title, result); setSaved(true); };

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="e.g. Special Education Teacher, Charge Nurse, Policy Analyst..."
          className="w-full bg-[#0E0C14] border border-zinc-800 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700 font-serif italic"
        />
      </div>

      {/* Free result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className={`p-8 rounded-2xl border ${isPoetic ? 'bg-zinc-900/40 border-zinc-800' : 'bg-[#0E1A14] border-zinc-700/60'}`}>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">
                {isPoetic ? "A Note from the Forge" : "Your Horizon Title — Free Preview"}
              </p>
              <motion.p
                key={result}
                initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
                className={`font-serif italic leading-snug ${isPoetic ? 'text-sm text-zinc-500' : 'text-2xl text-purple-200'}`}
              >
                {result}
              </motion.p>
            </div>

            {!isPoetic && (
              <div className="flex flex-col sm:flex-row gap-3">
                {!saved ? (
                  <button onClick={handleSave}
                    className="flex-1 py-3 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all">
                    <Check size={11} className="inline mr-2" /> Save to My Hearth — Free
                  </button>
                ) : (
                  <p className="flex-1 py-3 text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    <Sparkles size={10} className="inline mr-2" />Saved to vault
                  </p>
                )}
                <button
                  onClick={() => window.location.href = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03'}
                  className="flex-1 py-3 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
                  Get the Full Audit Report →
                </button>
              </div>
            )}

            {/* Learn More toggle for lore */}
            <div>
              <button
                onClick={() => setShowLearnMore(p => !p)}
                className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors mx-auto"
              >
                <ChevronDown size={12} className={`transition-transform ${showLearnMore ? 'rotate-180' : ''}`} />
                {showLearnMore ? 'Hide' : 'Learn More'} about the methodology
              </button>
              <AnimatePresence>
                {showLearnMore && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-3">
                      <p className="text-[11px] text-zinc-500 italic leading-relaxed font-serif">
                        "The Hearth & Horizon mapping engine draws from 13 years of Indigenous curriculum architecture and public-sector pedagogy. Each archetype is a distillation of the 12 professional identities most transferable to private-sector leadership — built to honour the full legacy of the professional before the title."
                      </p>
                      <p className="text-[9px] text-zinc-700 uppercase font-black tracking-widest">— Margaret, M.Ed. | BA, BEd | Indigenous Studies</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SECTION 2: Digital Goods ─────────────────────────────────────────────────
const GOODS = [];

function GoodCard({ good }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      className="flex flex-col p-8 md:p-10 rounded-[2rem] bg-[#0E0C14] border border-zinc-800">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">{good.tag}</span>
        <span className="text-2xl font-black text-white">{good.price}</span>
      </div>
      <h3 className="text-2xl font-serif italic text-purple-300 mb-3">{good.title}</h3>
      <p className="text-zinc-500 text-sm italic leading-relaxed mb-4">{good.description}</p>

      {/* Progressive disclosure */}
      <button onClick={() => setExpanded(p => !p)}
        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors mb-4 w-fit">
        <ChevronDown size={11} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Less detail' : "What's included"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-2 mb-6 flex-1">
            {good.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[11px] text-zinc-500">
                <span className="text-zinc-700 mt-0.5">—</span> {f}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="flex-1" />
      <button onClick={() => window.location.href = good.stripeUrl}
        className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 mt-4">
        {good.cta} →
      </button>
    </motion.div>
  );
}

function DigitalGoods() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {GOODS.map((good) => <GoodCard key={good.id} good={good} />)}
    </div>
  );
}

// ── SECTION 3: About Footer ──────────────────────────────────────────────────
function AboutFooter() {
  return (
    <div className="pt-8 border-t border-zinc-900 flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-800">
      <button onClick={() => window.location.href = '/about'} className="hover:text-zinc-500 transition-colors">About</button>
      <button onClick={() => window.location.href = '/contact-us'} className="hover:text-zinc-500 transition-colors">Contact</button>
      <a href="mailto:hello@hearthandhorizon.ca" className="hover:text-zinc-500 transition-colors">hello@hearthandhorizon.ca</a>
    </div>
  );
}

// ── Bridge Credit CTA ─────────────────────────────────────────────────────────
// $24.99 standard | $15.00 with archetype card credit
const STRIPE_FULL = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';
const STRIPE_CREDIT = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03?prefilled_promo_code=ARCHETYPECREDIT';

function HearthkeeperCTA({ hasPurchasedCard }) {
  const [showTip, setShowTip] = useState(false);

  if (hasPurchasedCard) {
    return (
      <div className="space-y-3">
        {/* Bridge credit notice */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/[0.06] border border-teal-500/15">
          <Sparkles size={12} className="text-teal-400 shrink-0" />
          <p className="text-[10px] font-serif italic text-zinc-400 flex-1">
            Your Archetype purchase has been credited.
          </p>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTip(true)}
              onMouseLeave={() => setShowTip(false)}
              onFocus={() => setShowTip(true)}
              onBlur={() => setShowTip(false)}
              className="text-[9px] font-black uppercase tracking-widest text-teal-500/60 hover:text-teal-400 transition-colors"
            >
              ?
            </button>
            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  className="absolute bottom-full right-0 mb-2 w-56 p-3 rounded-xl bg-[#1C1622] border border-teal-500/20 text-[10px] font-serif italic text-zinc-400 leading-relaxed z-50 shadow-2xl"
                >
                  "We've applied your Archetype credit to your 6-month season."
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button onClick={() => window.location.href = STRIPE_CREDIT}
          className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
          <Flame size={11} />
          Complete the Migration —{' '}
          <span className="line-through text-black/40 ml-1">$24.99</span>
          <span className="ml-1 flex items-center gap-1">
            $15.00 <Sparkles size={9} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => window.location.href = STRIPE_FULL}
      className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
      <Flame size={11} className="inline mr-2" /> Join the Founding Forest →
    </button>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function GroveTiers({ vault, onSync }) {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  const handleBrigidSave = (legacyTitle, horizonTitle) => {
    onSync({ ...vault, archetype: horizonTitle, legacy_title: legacyTitle });
  };

  const handleEnter = () => {
    const hasSession = vault?.isAligned || !!localStorage.getItem('base44_auth_session');
    if (hasSession) { setShowTransition(true); }
    else { base44.auth.redirectToLogin('/hearth'); }
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/20 overflow-x-hidden">
      <AnimatePresence>
        {showTransition && <SanctuaryTransition onComplete={() => navigate('/hearth')} />}
      </AnimatePresence>

      {/* ── NAV ── */}
      <StickyNav showBrigidCta={false} />

      {/* ── CONTENT ── */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-40 space-y-40">

        {/* ── SECTION 1: Hero + Tool ── */}
        <section className="space-y-16">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Free Tool</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-purple-200 leading-tight tracking-tight">
              Translate your public-sector legacy into{' '}
              <span className="text-teal-400">private-sector power.</span>
            </h1>
            <div className="space-y-3 max-w-lg">
              <p className="text-zinc-500 text-sm font-serif italic leading-relaxed">
                Type your current title below. Brigid — our mapping engine built on 13 years of curriculum expertise — reveals your private-sector identity instantly.
              </p>
              <p className="text-zinc-600 text-xs font-serif italic leading-relaxed">
                No account required. Free to use. Your result is yours to keep.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WhisperTool onSave={handleBrigidSave} />
          </motion.div>
        </section>



        {/* ── SECTION 2: Tiers ── */}
        <section className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">Join the Grove</h2>
              <div className="h-[1px] flex-1 bg-zinc-900" />
            </div>
            <p className="text-zinc-600 text-xs font-serif italic leading-relaxed max-w-lg">
              Start free with Brigid and the Library. Go deeper with a seat in the Founding Forest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FREE SEEDLING */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-col p-8 rounded-[2rem] bg-[#0E0C14] border border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">Free Forever</span>
                <span className="text-2xl font-black text-white">$0</span>
              </div>
              <h3 className="text-2xl font-serif italic text-purple-300 mb-2">Seedling</h3>
              <p className="text-zinc-600 text-xs italic leading-relaxed mb-6">Begin your journey. The Whisper Tool, your Horizon title, and a seat at the fire — no card required.</p>
              <ul className="space-y-2 mb-8 flex-1">
                {["Free Horizon Title Mapping", "Access the full Library resource grid", "Save your result to My Hearth", "Weekly reflection prompts"].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[11px] text-zinc-500">
                    <Check size={11} className="text-teal-500 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => base44.auth.redirectToLogin('/hearth')}
                className="w-full py-4 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all">
                <LogIn size={11} className="inline mr-2" /> Enter Free →
              </button>
            </motion.div>

            {/* HEARTHKEEPER */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="flex flex-col p-8 rounded-[2rem] bg-[#0E1A14] border border-teal-500/30 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-teal-400 border border-teal-500/30 px-3 py-1 rounded-full bg-teal-500/10">Community</span>
              </div>
              <div className="flex items-center justify-between mb-6 pr-28">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">Full Access</span>
                <span className="text-2xl font-black text-white">$9<span className="text-sm font-normal text-zinc-500">/mo</span></span>
              </div>
              <h3 className="text-2xl font-serif italic text-teal-300 mb-2">The Founding Forest</h3>
              <p className="text-zinc-500 text-xs italic leading-relaxed mb-6">A private community for public-sector professionals in transition. Live sessions, peer cohorts, and direct access to Margaret's frameworks.</p>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  "Private community of peers in transition",
                  "Live group sessions with Margaret",
                  "Full AI tool suite — Brigid, Rite of Renaming, Soul Compass",
                  "Master Strategy Deck & Horizon board",
                  "Early access to new frameworks & resources",
                  "Direct feedback on your Horizon title"
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[11px] text-zinc-500">
                    <Check size={11} className="text-teal-500 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <HearthkeeperCTA hasPurchasedCard={!!vault?.hasPurchasedCard} />
            </motion.div>
          </div>

          {/* KO-FI */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Coffee size={16} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Support the Fire</p>
                <p className="text-[11px] text-zinc-600 italic mt-0.5">A one-time contribution keeps this platform alive for those who need it most.</p>
              </div>
            </div>
            <a href="https://ko-fi.com/hearthandhorizon" target="_blank" rel="noopener noreferrer"
              className="shrink-0 px-6 py-3 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap">
              <Heart size={11} className="inline mr-1.5" /> Buy a Coffee →
            </a>
          </motion.div>
        </section>

        {/* ── SECTION 3: About Footer ── */}
        <section className="border-t border-zinc-900 pt-24 space-y-20">
          <SMEFooter />
          <AboutFooter />
        </section>

      </div>
    </div>
  );
}