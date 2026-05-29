import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import StickyNav from '@/components/StickyNav';
import GlobalFooter from '@/components/layout/GlobalFooter';

// ── Legacy Title Map (Unchanged for Architecture Integrity) ──────────────────
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

const STRIPE_MONTHLY_URL = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03'; 
const STRIPE_YEARLY_URL = 'https://buy.stripe.com/your_stripe_yearly_link';

const FOREST_FEATURES = [
  "Premium Archetype Vault Access (Notion Framework)",
  "Private Embers Community Chat Access",
  "Asynchronous Resume & Structural Alignment Audits",
  "Full Access to The Horizon Board & Curated Library"
];

// ── WhisperTool (Brigid Title Generator - Free for Everyone) ────────────────
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
      else { setResult('A complex history. The full mapping requires the deep audit; enter the Forge below.'); setIsPoetic(true); }
    } else {
      setResult(null);
    }
  };

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={title}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Type your current role (e.g. Classroom Teacher, Nurse...)"
        className="w-full bg-[#0E0C14] border border-zinc-900 rounded-2xl px-6 py-5 text-base text-white focus:outline-none focus:border-zinc-800 transition-all placeholder:text-zinc-800 font-serif italic min-h-[56px]"
      />

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className={`p-8 rounded-2xl border ${isPoetic ? 'bg-zinc-950 border-zinc-900' : 'bg-[#0E1A14]/40 border-teal-950/40'}`}>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-3">
                Your Horizon Title — Free Preview
              </p>
              <motion.p key={result} initial={{ opacity: 0, filter: 'blur(6px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }}
                className="font-serif italic leading-snug text-2xl text-purple-200">
                {result}
              </motion.p>
            </div>

            {!isPoetic && (
              <div className="flex flex-col sm:flex-row gap-3">
                {!saved ? (
                  <button onClick={() => { onSave(title, result); setSaved(true); }}
                    className="flex-1 min-h-[48px] py-3 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest rounded-xl active:bg-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 transition-all">
                    <Check size={11} className="inline mr-2" /> Save to My Vault
                  </button>
                ) : (
                  <p className="flex-1 min-h-[48px] flex items-center justify-center text-xs font-black uppercase tracking-widest text-zinc-600">
                    <Sparkles size={10} className="inline mr-2" />Saved to profile
                  </p>
                )}
              </div>
            )}

            <button onClick={() => setShowLearnMore(p => !p)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-500 transition-colors min-h-[44px]">
              <ChevronDown size={12} className={`transition-transform ${showLearnMore ? 'rotate-180' : ''}`} />
              {showLearnMore ? 'Hide methodology' : 'About the methodology'}
            </button>

            <AnimatePresence>
              {showLearnMore && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900 space-y-2">
                    <p className="text-[11px] text-zinc-500 italic leading-relaxed font-serif">
                      "The mapping engine draws from public-sector pedagogy and systemic structural translation, built to honour the full legacy of the professional before the title."
                    </p>
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

// ── Main Page Component ────────────────────────────────────────────────────────
export default function GroveTiers({ vault, onSync }) {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-400 font-sans selection:bg-teal-500/20 overflow-x-hidden">
      <StickyNav showBrigidCta={false} />

      <div className="max-w-xl mx-auto px-6 pt-32 pb-40 space-y-24">

        {/* ── HERO + FREE WHISPER TOOL ── */}
        <section className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-900">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500">Free Infrastructure</span>
            </div>
            <h1 className="text-4xl font-serif italic text-purple-200 leading-tight tracking-tight">
              Translate your legacy into{' '}
              <span className="text-teal-400">private-sector power.</span>
            </h1>
            <p className="text-zinc-600 text-sm font-serif italic leading-relaxed">
              Brigid—our structural title engine—is open to all professionals exploring migration. Discover your corporate architectural translation instantly below.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <WhisperTool onSave={(legacyTitle, horizonTitle) => onSync({ ...vault, archetype: horizonTitle, legacy_title: legacyTitle })} />
          </motion.div>
        </section>

        {/* ── THE SINGLE SUSTAINABLE MEMBERSHIP ── */}
        <section className="space-y-6">
          <SectionLabel>Choose Your Space</SectionLabel>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3 pb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${!isYearly ? 'text-teal-400' : 'text-zinc-600'}`}>With the Moon</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full bg-zinc-950 border border-zinc-800 p-0.5 transition-colors relative flex items-center focus:outline-none"
            >
              <motion.div 
                layout 
                className="w-4 h-4 rounded-full bg-teal-500 shadow-md"
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isYearly ? 'text-teal-400' : 'text-zinc-600'} flex items-center gap-1.5`}>
              With the Sun <span className="text-[8px] bg-teal-950 text-teal-400 px-1.5 py-0.5 rounded-full border border-teal-900">Save 33%</span>
            </span>
          </div>

          {/* Single Unified Card */}
          <div className="p-8 rounded-[2rem] border border-teal-500/10 bg-[#0E1A14]/30 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-teal-400 border border-teal-950 bg-[#0E1A14] px-2.5 py-1 rounded-full">
                  Full Canopy Access
                </span>
                <h3 className="text-xl font-serif italic text-purple-200 mt-3">The Founding Forest membership</h3>
                <p className="text-zinc-600 text-xs italic mt-1">A complete operational infrastructure for your career migration.</p>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="text-2xl font-black text-white"
                  >
                    {isYearly ? '$79.99' : '$9.99'}
                  </motion.div>
                </AnimatePresence>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest block mt-0.5">
                  {isYearly ? 'per year' : 'per month'}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 pt-2 border-t border-zinc-900/60">
              {FOREST_FEATURES.map(f => (
                <li key={f} className="text-xs text-zinc-500 flex items-start gap-2.5 leading-relaxed">
                  <Check size={11} className="text-teal-500 mt-1 shrink-0" /> <span>{f}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => window.location.href = isYearly ? STRIPE_YEARLY_URL : STRIPE_MONTHLY_URL}
              className="w-full min-h-[48px] py-3.5 bg-teal-500 text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 active:bg-teal-400 transition-all shadow-md shadow-teal-500/5 flex items-center justify-center gap-1"
            >
              Enter the Forest Canopy <ArrowRight size={11} />
            </button>
          </div>
        </section>

        {/* ── ADVISORY PRESERVED (HIGH-VALUE CLINIC) ── */}
        <section className="space-y-4">
          <SectionLabel>Direct Strategic Alignment</SectionLabel>
          <div className="p-8 rounded-[2rem] border border-zinc-900 bg-zinc-950/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 max-w-sm">
              <h4 className="text-sm font-serif italic text-purple-300">The Advisory Clinic</h4>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Need customized structural data plans or 1-on-1 architecture feedback? Skip the group dynamics and schedule direct consulting.
              </p>
            </div>
            <button 
              onClick={() => navigate('/advisory')} 
              className="w-full sm:w-auto px-5 py-3 border border-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest rounded-xl hover:border-zinc-700 hover:text-zinc-300 transition-all shrink-0 text-center"
            >
              View Services
            </button>
          </div>
        </section>

        {/* ── FOOTER & INTERNAL NAVIGATION ── */}
        <footer className="space-y-8 border-t border-zinc-950 pt-8">
          <GlobalFooter />
        </footer>

      </div>
    </div>
  );
}

// ── Minimalist Section Divider ───────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-4 py-1">
      <h2 className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 whitespace-nowrap">{children}</h2>
      <div className="h-[1px] flex-1 bg-zinc-950" />
    </div>
  );
}