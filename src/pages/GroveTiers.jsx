import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SanctuaryTransition from '../components/SanctuaryTransition';
import {
  Check, Leaf, Mountain, UserPlus, Flame, Sparkles,
  LogIn, ChevronDown, BookOpen, Code2, FileText, Package
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
            <div className={`p-6 rounded-2xl border ${isPoetic ? 'bg-zinc-900/40 border-zinc-800' : 'bg-[#0E1A14] border-zinc-700'}`}>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">
                {isPoetic ? "Brigid's Note" : "Your Horizon Title — Free Preview"}
              </p>
              <motion.p
                key={result}
                initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
                className={`font-serif italic leading-snug ${isPoetic ? 'text-sm text-zinc-500' : 'text-2xl text-white'}`}
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
const GOODS = [
  {
    id: 'audit',
    tag: 'Instant PDF Report',
    title: 'The Full Audit',
    price: '$9',
    description: 'Your complete Institutional-to-Private Sector Mapping Report. Built on 13 years of curriculum expertise. No call required.',
    features: ['Full sector archetype profile', 'Top 5 transferable competencies', 'Horizon title + power verb set', 'Private-sector keyword map'],
    cta: 'Get the Audit',
    stripeUrl: 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03',
    accent: 'teal',
  },
  {
    id: 'framework',
    tag: 'Digital Template',
    title: 'The Archetype Vault',
    price: '$19',
    description: 'The complete framework Margaret uses to map public-sector identities. A Notion-ready template you can apply to your own clients or career.',
    features: ['12 archetype identity profiles', 'Translation lexicon (150+ verb pairs)', 'Ethics Compass calibration guide', 'Sector-by-sector mapping matrix'],
    cta: 'Buy the Framework',
    stripeUrl: 'https://buy.stripe.com/aFafZhfG8aebdqI4hIdAk04',
    accent: 'teal',
  },
];

function DigitalGoods() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {GOODS.map((good) => (
        <motion.div key={good.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col p-8 md:p-10 rounded-[2rem] bg-[#0E0C14] border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 border border-zinc-800 px-3 py-1 rounded-full">{good.tag}</span>
            <span className="text-2xl font-black text-white">{good.price}</span>
          </div>
          <h3 className="text-2xl font-serif italic text-white mb-3">{good.title}</h3>
          <p className="text-zinc-500 text-sm italic leading-relaxed mb-6">{good.description}</p>
          <ul className="space-y-2 mb-8 flex-1">
            {good.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-[11px] text-zinc-500">
                <span className="text-zinc-700 mt-0.5">—</span> {f}
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.href = good.stripeUrl}
            className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
            {good.cta} →
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// ── SECTION 3: About Footer ──────────────────────────────────────────────────
const TECHNICAL_PROOF = [
  { icon: BookOpen, label: 'Atsanik Selene', sub: 'Narrative Design' },
  { icon: Code2, label: 'Archetype Vault', sub: 'Technical Build' },
  { icon: FileText, label: 'Mapping Engine', sub: 'AI Architecture' },
  { icon: Package, label: 'Hearth & Horizon', sub: 'Full-Stack Product' },
];

function AboutFooter() {
  return (
    <div className="space-y-16">
      {/* Credentials */}
      <div className="text-center space-y-4">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">Built by</p>
        <h3 className="text-2xl font-serif italic text-zinc-300">Margaret Pardy</h3>
        <p className="text-zinc-600 text-sm font-serif italic max-w-md mx-auto leading-relaxed">
          BA, BEd, MEd in Indigenous Studies & Curriculum. 13 years in public education. The tools work because the expertise is real.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {['M.Ed. Curriculum & Pedagogy', '13 Yrs Public Education', 'Indigenous Studies', 'AI-Assisted Career Tools'].map(c => (
            <span key={c} className="text-[8px] font-black uppercase tracking-widest text-zinc-700 border border-zinc-800 px-3 py-1 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      {/* Technical proof row */}
      <div>
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-800 text-center mb-5">Technical Proof</p>
        <div className="flex flex-wrap justify-center gap-6">
          {TECHNICAL_PROOF.map((p) => (
            <div key={p.label} className="flex items-center gap-2 text-zinc-700 hover:text-zinc-500 transition-colors">
              <p.icon size={13} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest leading-none">{p.label}</p>
                <p className="text-[8px] text-zinc-800">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal footer links */}
      <div className="pt-8 border-t border-zinc-900 flex flex-wrap justify-center gap-6 text-[9px] font-black uppercase tracking-widest text-zinc-800">
        <button onClick={() => window.location.href = '/about'} className="hover:text-zinc-500 transition-colors">About</button>
        <button onClick={() => window.location.href = '/contact-us'} className="hover:text-zinc-500 transition-colors">Contact</button>
        <a href="mailto:hello@hearthandhorizon.ca" className="hover:text-zinc-500 transition-colors">hello@hearthandhorizon.ca</a>
      </div>
    </div>
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
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0A080D]/95 backdrop-blur-xl border-b border-zinc-900" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Hearth & Horizon</span>
          <div className="flex items-center gap-4">
            <button onClick={handleEnter} className="text-zinc-600 hover:text-zinc-300 text-[9px] font-black uppercase tracking-widest transition-colors">
              <LogIn size={14} className="inline mr-1" /> Enter Sanctuary
            </button>
          </div>
        </div>
      </nav>

      {/* ── CONTENT ── */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-40 space-y-32">

        {/* ── SECTION 1: Hero + Tool ── */}
        <section className="space-y-12">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Free Tool</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight tracking-tight">
              Translate your public-sector legacy into{' '}
              <span className="text-teal-400">private-sector power.</span>
            </h1>
            <p className="text-zinc-600 text-sm font-serif italic leading-relaxed max-w-lg">
              Type your current title below. Brigid — our AI engine, trained on 13 years of curriculum expertise — will reveal your horizon identity instantly.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WhisperTool onSave={handleBrigidSave} />
          </motion.div>
        </section>

        {/* ── SECTION 2: Digital Goods ── */}
        <section className="space-y-10">
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">The Digital Goods</p>
            <h2 className="text-3xl font-serif italic text-zinc-200">Go deeper. No call required.</h2>
            <p className="text-zinc-600 text-sm italic">Everything you need is packaged. Buy it, use it, keep it.</p>
          </div>
          <DigitalGoods />
        </section>

        {/* ── SECTION 3: About Footer ── */}
        <section className="border-t border-zinc-900 pt-20">
          <AboutFooter />
        </section>

      </div>
    </div>
  );
}