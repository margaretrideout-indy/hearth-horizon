import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check, Flame, Coffee, ChevronDown, Sparkles,
  BookOpen, CalendarDays, Users, Mail,
  GraduationCap, CheckCircle2, ArrowRight
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SanctuaryTransition from '../components/SanctuaryTransition';
import StickyNav from '@/components/StickyNav';
import GlobalFooter from '@/components/layout/GlobalFooter';

// ── Constants ─────────────────────────────────────────────────────────────────
const STRIPE_URL = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03';

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

const TIERS = [
  {
    id: 'seedling',
    title: 'Seedling',
    price: '$0',
    tag: 'Free Forever',
    desc: 'Your entry into the ecosystem. Begin your journey with the core tools.',
    features: ['Horizon Title Mapping', 'Library Resource Access', 'Personal Vault Storage'],
    cta: 'Enter Free',
    action: () => base44.auth.redirectToLogin('/hearth'),
    style: 'bg-[#0E0C14] border-zinc-800',
    btnStyle: 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
  },
  {
    id: 'forest',
    title: 'The Founding Forest',
    price: '$9/mo',
    tag: 'Community',
    desc: 'Direct access to frameworks, live sessions, and peer cohorts.',
    features: ['Live Group Sessions', 'Full AI Suite (Brigid, Rite, Soul)', 'Direct Title Feedback'],
    cta: 'Join The Forest',
    action: () => { window.location.href = STRIPE_URL; },
    style: 'bg-[#0E1A14] border-teal-500/30',
    btnStyle: 'bg-teal-500 text-black hover:bg-teal-400 shadow-lg shadow-teal-500/20',
  },
];

const LINKTREE = [
  { label: 'The Library', sub: 'Tools & Resources', icon: BookOpen, action: (navigate) => navigate('/library'), color: 'border-purple-500/20 hover:border-purple-500/40' },
  { label: 'Book a Session', sub: 'Work with Margaret', icon: CalendarDays, action: () => { window.location.href = 'https://calendly.com/hearthandhorizon'; }, color: 'border-teal-500/20 hover:border-teal-500/40' },
  { label: 'Community Forum', sub: 'The Founding Forest', icon: Users, action: () => { window.location.href = STRIPE_URL; }, color: 'border-zinc-700 hover:border-zinc-500' },
  { label: 'Newsletter', sub: 'Dispatches from the Forge', icon: Mail, action: () => { window.location.href = 'https://hearthandhorizon.substack.com'; }, color: 'border-amber-500/20 hover:border-amber-500/40' },
];

const CREDENTIALS = [
  { label: 'Master of Education (M.Ed.)', note: 'Curriculum & Pedagogy' },
  { label: '13+ Years Leadership', note: 'Program Management & Curriculum Development' },
  { label: 'BA, BEd', note: 'Foundational Academic Training' },
  { label: 'Indigenous Studies', note: 'Specialist Focus' },
];

// ── WhisperTool ───────────────────────────────────────────────────────────────
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
      const lower = val.toLowerCase();
      const match = LEGACY_MAP.find(e => e.triggers.some(t => lower.includes(t)));
      if (match) { setResult(match.horizon); setIsPoetic(false); }
      else { setResult("A complex history. The full mapping requires the deep audit — enter the Forge below."); setIsPoetic(true); }
    } else {
      setResult(null);
      setIsPoetic(false);
    }
  };

  const handleSave = () => { onSave(title, result); setSaved(true); };

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={title}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="e.g. Special Education Teacher, Charge Nurse, Policy Analyst..."
        className="w-full bg-[#0E0C14] border border-zinc-800 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700 font-serif italic"
      />

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className={`p-8 rounded-2xl border ${isPoetic ? 'bg-zinc-900/40 border-zinc-800' : 'bg-[#0E1A14] border-zinc-700/60'}`}>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">
                {isPoetic ? 'A Note from the Forge' : 'Your Horizon Title — Free Preview'}
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
                  onClick={() => { window.location.href = STRIPE_URL; }}
                  className="flex-1 py-3 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
                  Get the Full Audit Report →
                </button>
              </div>
            )}

            <button
              onClick={() => setShowLearnMore(p => !p)}
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors"
            >
              <ChevronDown size={12} className={`transition-transform ${showLearnMore ? 'rotate-180' : ''}`} />
              {showLearnMore ? 'Hide' : 'Learn More'} about the methodology
            </button>

            <AnimatePresence>
              {showLearnMore && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 space-y-2">
                    <p className="text-[11px] text-zinc-500 italic leading-relaxed font-serif">
                      "The Hearth & Horizon mapping engine draws from 13 years of Indigenous curriculum architecture and public-sector pedagogy. Each archetype is a distillation of the professional identities most transferable to private-sector leadership — built to honour the full legacy of the professional before the title."
                    </p>
                    <p className="text-[9px] text-zinc-700 uppercase font-black tracking-widest">— Margaret, M.Ed. | BA, BEd | Indigenous Studies</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function GroveTiers({ vault, onSync }) {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  const handleBrigidSave = (legacyTitle, horizonTitle) => {
    onSync({ ...vault, archetype: horizonTitle, legacy_title: legacyTitle });
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/20 overflow-x-hidden">
      <AnimatePresence>
        {showTransition && <SanctuaryTransition onComplete={() => navigate('/hearth')} />}
      </AnimatePresence>

      <StickyNav showBrigidCta={false} />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-40 space-y-24">

        {/* ── HERO + WHISPER TOOL ── */}
        <section className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Free Tool</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-purple-200 leading-tight tracking-tight">
              Translate your public-sector legacy into{' '}
              <span className="text-teal-400">private-sector power.</span>
            </h1>
            <p className="text-zinc-500 text-sm font-serif italic leading-relaxed max-w-lg">
              Type your title below. Brigid—our mapping engine—reveals your private-sector identity instantly. No account required.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WhisperTool onSave={handleBrigidSave} />
          </motion.div>
        </section>

        {/* ── TIERS ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">Join the Grove</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIERS.map((tier) => (
              <div key={tier.id} className={`p-8 rounded-[2rem] border ${tier.style} flex flex-col`}>
                <div className="flex justify-between items-start mb-5">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">{tier.tag}</span>
                  <span className="text-2xl font-black text-white">{tier.price}</span>
                </div>
                <h3 className="text-xl font-serif italic text-purple-300 mb-1">{tier.title}</h3>
                <p className="text-zinc-600 text-xs italic mb-6">{tier.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="text-[11px] text-zinc-500 flex items-center gap-3">
                      <Check size={11} className="text-teal-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={tier.action}
                  className={`w-full py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${tier.btnStyle}`}>
                  {tier.cta} →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── LINKTREE 2×2 ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">Explore the Ecosystem</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {LINKTREE.map((item) => (
              <button key={item.label} onClick={() => item.action(navigate)}
                className={`group p-6 rounded-[1.5rem] bg-[#0E0C14] border ${item.color} flex flex-col items-start gap-3 text-left transition-all`}>
                <item.icon size={18} className="text-zinc-500 group-hover:text-teal-400 transition-colors" />
                <div>
                  <p className="text-sm font-serif italic text-zinc-300">{item.label}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mt-0.5">{item.sub}</p>
                </div>
                <ArrowRight size={12} className="text-zinc-700 group-hover:text-teal-400 transition-colors mt-auto" />
              </button>
            ))}
          </div>
        </section>

        {/* ── KO-FI ── */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
          <div className="flex items-center gap-3">
            <Coffee size={16} className="text-amber-400" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Support the Fire</p>
              <p className="text-[10px] text-zinc-600 italic">A one-time contribution keeps this platform alive.</p>
            </div>
          </div>
          <a href="https://ko-fi.com/hearthandhorizon" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all whitespace-nowrap">
            Buy a Coffee →
          </a>
        </div>

        {/* ── UNIFIED FOOTER ── */}
        <footer className="border-t border-zinc-900 pt-16 space-y-12">

          {/* SME Authority Seal */}
          <div className="py-10 px-8 border border-zinc-800/60 rounded-[2rem] bg-zinc-950/60 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                <GraduationCap size={15} className="text-teal-400" />
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.45em] text-zinc-600">Quality Seal</p>
                <p className="text-base font-serif italic text-zinc-300 leading-none mt-0.5">Margaret Rideout, M.Ed.</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CREDENTIALS.map((c) => (
                <li key={c.label} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-teal-500/60 mt-0.5 shrink-0" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wide">
                    {c.label} <span className="font-normal text-zinc-600 normal-case">— {c.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-zinc-600 italic font-serif border-l-2 border-zinc-800 pl-4 leading-relaxed">
              Every tool and framework in this platform is built on lived expertise — not theory.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-700">
            <button onClick={() => navigate('/about')} className="hover:text-zinc-500 transition-colors">About</button>
            <button onClick={() => navigate('/contact-us')} className="hover:text-zinc-500 transition-colors">Contact</button>
            <a href="mailto:hello@hearthandhorizon.ca" className="hover:text-zinc-500 transition-colors">hello@hearthandhorizon.ca</a>
          </div>

          {/* Global Footer (affiliate links, policies) */}
          <GlobalFooter />
        </footer>

      </div>
    </div>
  );
}