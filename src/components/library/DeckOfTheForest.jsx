import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Mountain, Compass, Sparkles, Lock, ExternalLink, ArrowRight, X, ShieldCheck } from 'lucide-react';

const NOTION_VAULT_URL = "https://disco-roast-38c.notion.site/horizon-archetypes?v=5827a0df8cab44c8bf283e16456cde78";
const GUMROAD_URL = "https://margaretpardy.gumroad.com/l/zuyjl";
const STRIPE_URL = "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03";
const STRIPE_CREDIT_URL = "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03?prefilled_promo_code=ARCHETYPECREDIT";

const ARCHETYPES = [
  {
    id: 'builder',
    icon: Flame,
    color: 'rose',
    name: 'The Builder',
    publicSector: 'Curriculum Designer / Program Manager',
    tagline: 'You engineer systems that outlive their architects.',
    translation: 'Learning Experience Architect → Head of L&D / Instructional Systems Director',
    roles: ['VP of Learning & Development', 'Chief People Officer', 'Head of Enablement'],
    insight: 'Your instinct to scaffold complex knowledge for others is a rare private-sector asset. You build cultures, not just content.',
  },
  {
    id: 'navigator',
    icon: Compass,
    color: 'teal',
    name: 'The Navigator',
    publicSector: 'Policy Analyst / Regulatory Specialist',
    tagline: 'You chart courses through institutional fog.',
    translation: 'Policy Architect → Director of Regulatory Affairs / Strategic Compliance Lead',
    roles: ['Head of Government Affairs', 'Chief Compliance Officer', 'Director of Public Policy'],
    insight: 'Private-sector firms pay a premium for the ability to read regulatory terrain. You have spent years living it.',
  },
  {
    id: 'steward',
    icon: Mountain,
    color: 'purple',
    name: 'The Steward',
    publicSector: 'Social Worker / Case Manager',
    tagline: 'You hold the weight of others with expertise.',
    translation: 'Human Systems Lead → Chief of Staff / People Operations Director',
    roles: ['Director of People Experience', 'VP of Community Partnerships', 'Head of DEI & Culture'],
    insight: 'You have spent years managing the most complex human dynamics. That skill set commands respect — and significant salary — in the private sector.',
  },
  {
    id: 'strategist',
    icon: Sparkles,
    color: 'amber',
    name: 'The Strategist',
    publicSector: 'Principal / Director of Education',
    tagline: 'You turn institutional vision into measurable outcomes.',
    translation: 'Organizational Leader → COO / VP of Operations & Culture',
    roles: ['Chief Operating Officer', 'VP of Organizational Development', 'Managing Director'],
    insight: 'Running a school is arguably more complex than running a mid-sized company. Your multi-stakeholder management experience is the rarest executive asset on the market.',
  },
];

const COLOR_MAP = {
  rose:   { bg: 'bg-rose-500/[0.06]',   border: 'border-rose-500/20',   icon: 'text-rose-400',   tag: 'bg-rose-500/10 text-rose-300 border-rose-500/20' },
  teal:   { bg: 'bg-teal-500/[0.06]',   border: 'border-teal-500/20',   icon: 'text-teal-400',   tag: 'bg-teal-500/10 text-teal-300 border-teal-500/20' },
  purple: { bg: 'bg-purple-500/[0.06]', border: 'border-purple-500/20', icon: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  amber:  { bg: 'bg-amber-500/[0.06]',  border: 'border-amber-500/20',  icon: 'text-amber-400',  tag: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
};

// ── GLIMMER MODAL (Wayfarer upgrade prompt) ───────────────────────────────────
function GlimmerModal({ archetype, onClose, hasPurchasedCard }) {
  const Icon = archetype.icon;
  const colors = COLOR_MAP[archetype.color];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full max-w-md rounded-[2.5rem] border p-10 space-y-6 relative ${colors.bg} ${colors.border} bg-[#0A080D]`}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-600 hover:text-zinc-300 transition-colors">
          <X size={18} />
        </button>

        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors.bg} border ${colors.border}`}>
            <Icon size={22} className={colors.icon} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">Archetype Locked</p>
            <h3 className="text-xl font-serif italic text-white">{archetype.name}</h3>
          </div>
        </div>

        <p className="text-sm font-serif italic text-zinc-400 leading-relaxed border-l-2 border-white/5 pl-4">
          "This archetype contains your professional translation. Upgrade to Hearthkeeper to see how your skills map to the tech horizon."
        </p>

        <div className="space-y-3 pt-2">
          {hasPurchasedCard ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/[0.06] border border-teal-500/15">
                <Sparkles size={12} className="text-teal-400 shrink-0" />
                <p className="text-[10px] font-serif italic text-zinc-400">
                  "We've applied your Archetype credit to your 6-month season."
                </p>
              </div>
              <a href={STRIPE_CREDIT_URL}
                className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                Complete the Migration —{' '}
                <span className="line-through text-black/40 ml-1">$24.99</span>
                <span className="ml-1 flex items-center gap-1">$15.00 <Sparkles size={9} /></span>
              </a>
            </>
          ) : (
            <>
              <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer"
                className="w-full py-4 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20">
                Claim this Card — $9.99 <ExternalLink size={11} />
              </a>
              <a href={STRIPE_URL}
                className="w-full py-4 bg-white/[0.03] border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:border-teal-500/20 hover:text-teal-400 transition-all flex items-center justify-center gap-2">
                <ShieldCheck size={11} /> Upgrade to Hearthkeeper ($24.99 / 180 days)
              </a>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── SINGLE CARD ───────────────────────────────────────────────────────────────
function ArchetypeCard({ archetype, isHearthkeeper, onGlimmerClick, hasPurchasedCard }) {
  const [flipped, setFlipped] = useState(false);
  const colors = COLOR_MAP[archetype.color];
  const Icon = archetype.icon;

  const handleClick = () => {
    if (isHearthkeeper) setFlipped(f => !f);
    else onGlimmerClick({ archetype, hasPurchasedCard });
  };

  return (
    <div style={{ perspective: '1200px', minHeight: '360px' }} className="relative cursor-pointer" onClick={handleClick}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 rounded-[2rem] border p-8 flex flex-col ${colors.bg} ${colors.border}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Glimmer state for Wayfarers */}
          {!isHearthkeeper && (
            <div className="absolute inset-0 rounded-[2rem] z-10 backdrop-blur-md bg-black/40 flex items-center justify-center">
              <div className="text-center space-y-3 px-6">
                <Lock size={20} className="text-zinc-500 mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-zinc-500">Tap to unlock</p>
              </div>
            </div>
          )}

          <div className="flex-1 space-y-5">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colors.bg} ${colors.border}`}>
                <Icon size={20} className={colors.icon} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${colors.tag}`}>
                {archetype.publicSector.split('/')[0].trim()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-serif italic text-white mb-1.5">{archetype.name}</h3>
              <p className="text-[11px] font-serif italic text-zinc-500 leading-relaxed">{archetype.tagline}</p>
            </div>
            <p className="text-[10px] font-mono uppercase text-zinc-600 tracking-widest">{archetype.publicSector}</p>
          </div>

          {isHearthkeeper && (
            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Tap to reveal translation</span>
            </div>
          )}
        </div>

        {/* ── BACK (Hearthkeepers only) ── */}
        <div
          className={`absolute inset-0 rounded-[2rem] border p-8 flex flex-col ${colors.bg} ${colors.border}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60">Private-Sector Translation</span>
              <Icon size={13} className={`${colors.icon} opacity-40`} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">New Identity</p>
              <p className="text-lg font-serif italic text-white leading-snug">{archetype.translation}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">Target Roles</p>
              <div className="flex flex-col gap-1.5">
                {archetype.roles.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-zinc-400">
                    <span className={`text-[8px] ${colors.icon}`}>✦</span> {r}
                  </div>
                ))}
              </div>
            </div>
            <div className={`p-4 rounded-xl border ${colors.bg} ${colors.border}`}>
              <p className="text-[11px] font-serif italic text-zinc-400 leading-relaxed">"{archetype.insight}"</p>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-2">
            <a href={NOTION_VAULT_URL} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="w-full py-3 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
              Full Archetype Vault <ExternalLink size={10} />
            </a>
            <button onClick={e => { e.stopPropagation(); setFlipped(false); }}
              className="text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-500 transition-colors text-center py-1">
              ← Flip Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── DECK OF THE FOREST ────────────────────────────────────────────────────────
export default function DeckOfTheForest({ isHearthkeeper, hasPurchasedCard }) {
  const [glimmerTarget, setGlimmerTarget] = useState(null); // { archetype, hasPurchasedCard }

  return (
    <section className="space-y-8">
      <AnimatePresence>
        {glimmerTarget && (
          <GlimmerModal
            archetype={glimmerTarget.archetype}
            hasPurchasedCard={glimmerTarget.hasPurchasedCard}
            onClose={() => setGlimmerTarget(null)}
          />
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-purple-400">Deck of the Forest</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif italic text-purple-200 leading-tight">The Forest Archetypes</h2>
        <p className="text-zinc-500 text-sm font-serif italic leading-relaxed max-w-lg">
          {isHearthkeeper
            ? 'Tap any card to reveal your private-sector translation and target roles.'
            : 'Four archetypes. Four migrations. Each card holds a professional translation — unlock yours.'}
        </p>
      </div>

      {!isHearthkeeper && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/15">
          <Lock size={13} className="text-amber-500/60 shrink-0" />
          <p className="text-[11px] font-serif italic text-zinc-500">
            You are in <strong className="text-zinc-300">Wayfarer</strong> mode. Tap any card to see upgrade options.
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARCHETYPES.map((archetype, i) => (
          <motion.div key={archetype.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ArchetypeCard
              archetype={archetype}
              isHearthkeeper={isHearthkeeper}
              hasPurchasedCard={hasPurchasedCard}
              onGlimmerClick={setGlimmerTarget}
            />
          </motion.div>
        ))}
      </div>

      {isHearthkeeper && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="flex items-center justify-between gap-6 p-6 rounded-2xl bg-teal-500/[0.04] border border-teal-500/15">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-1">Full Archetype Vault</p>
            <p className="text-[11px] font-serif italic text-zinc-500">All 12 archetypes, role mappings, and salary benchmarks.</p>
          </div>
          <a href={NOTION_VAULT_URL} target="_blank" rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2">
            Open Vault <ExternalLink size={11} />
          </a>
        </motion.div>
      )}
    </section>
  );
}