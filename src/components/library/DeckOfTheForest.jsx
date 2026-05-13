import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Mountain, Compass, Sparkles, Lock, ExternalLink, ArrowRight } from 'lucide-react';

const NOTION_VAULT_URL = "https://disco-roast-38c.notion.site/horizon-archetypes?v=5827a0df8cab44c8bf283e16456cde78";
const GUMROAD_URL = "https://margaretpardy.gumroad.com/l/zuyjl";
const STRIPE_URL = "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03";

// ── ARCHETYPE DATA ────────────────────────────────────────────────────────────
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
  rose: { bg: 'bg-rose-500/8', border: 'border-rose-500/20', icon: 'text-rose-400', tag: 'bg-rose-500/10 text-rose-300 border-rose-500/15' },
  teal: { bg: 'bg-teal-500/8', border: 'border-teal-500/20', icon: 'text-teal-400', tag: 'bg-teal-500/10 text-teal-300 border-teal-500/15' },
  purple: { bg: 'bg-purple-500/8', border: 'border-purple-500/20', icon: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-300 border-purple-500/15' },
  amber: { bg: 'bg-amber-500/8', border: 'border-amber-500/20', icon: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-300 border-amber-500/15' },
};

// ── SINGLE ARCHETYPE CARD ────────────────────────────────────────────────────
function ArchetypeCard({ archetype, isHearthkeeper }) {
  const [flipped, setFlipped] = useState(false);
  const colors = COLOR_MAP[archetype.color];
  const Icon = archetype.icon;

  const handleClick = () => {
    if (isHearthkeeper) setFlipped(f => !f);
  };

  return (
    <div
      className="relative"
      style={{ perspective: '1200px', minHeight: '340px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
        onClick={handleClick}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 rounded-[2rem] border p-7 flex flex-col ${colors.bg} ${colors.border} transition-all duration-500`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Foggy overlay for Seedlings */}
          {!isHearthkeeper && (
            <div className="absolute inset-0 rounded-[2rem] z-10 flex flex-col items-center justify-end p-7 bg-gradient-to-t from-[#0A080D]/95 via-[#0A080D]/60 to-transparent backdrop-blur-[2px]">
              <div className="space-y-3 text-center">
                <Lock size={16} className="text-zinc-600 mx-auto" />
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600">Translation Locked</p>
                <div className="flex flex-col gap-2">
                  <a href={GUMROAD_URL} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-1.5">
                    Claim this Card — $9.99 <ExternalLink size={9} />
                  </a>
                  <a href={STRIPE_URL}
                    className="px-5 py-2.5 bg-white/5 border border-white/10 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:border-teal-500/20 hover:text-teal-400 transition-all flex items-center justify-center gap-1.5">
                    Upgrade to Hearthkeeper <ArrowRight size={9} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Card content */}
          <div className={`flex-1 space-y-5 ${!isHearthkeeper ? 'opacity-40 grayscale' : ''}`}>
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} border ${colors.border}`}>
                <Icon size={18} className={colors.icon} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${colors.tag}`}>
                {archetype.publicSector.split('/')[0].trim()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-serif italic text-white mb-1">{archetype.name}</h3>
              <p className="text-[11px] font-serif italic text-zinc-500 leading-relaxed">{archetype.tagline}</p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{archetype.publicSector}</p>
          </div>

          {isHearthkeeper && (
            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Tap to reveal translation</span>
            </div>
          )}
        </div>

        {/* ── BACK (Hearthkeeper only) ── */}
        <div
          className={`absolute inset-0 rounded-[2rem] border p-7 flex flex-col ${colors.bg} ${colors.border}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-500/60">Private-Sector Translation</span>
              <Icon size={14} className={`${colors.icon} opacity-40`} />
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

            <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
              <p className="text-[11px] font-serif italic text-zinc-400 leading-relaxed">"{archetype.insight}"</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-2">
            <a href={NOTION_VAULT_URL} target="_blank" rel="noopener noreferrer"
              className="w-full py-3 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2">
              Explore Full Archetype Vault <ExternalLink size={10} />
            </a>
            <button onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
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
export default function DeckOfTheForest({ isHearthkeeper }) {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-purple-400">Deck of the Forest</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif italic text-purple-200 leading-tight">
          The Forest Archetypes
        </h2>
        <p className="text-zinc-500 text-sm font-serif italic leading-relaxed max-w-lg">
          {isHearthkeeper
            ? 'Tap any card to reveal your private-sector translation and target roles.'
            : 'Four archetypes. Four migrations. Unlock the full translation by upgrading to Hearthkeeper.'}
        </p>
      </div>

      {/* Tier badge */}
      {!isHearthkeeper && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/15">
          <Lock size={13} className="text-amber-500/60 shrink-0" />
          <p className="text-[11px] font-serif italic text-zinc-500">
            You are viewing the <strong className="text-zinc-300">Seedling</strong> preview. Card translations are locked behind the Hearthkeeper tier.
          </p>
        </motion.div>
      )}

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARCHETYPES.map((archetype, i) => (
          <motion.div
            key={archetype.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ArchetypeCard archetype={archetype} isHearthkeeper={isHearthkeeper} />
          </motion.div>
        ))}
      </div>

      {/* Vault CTA for Hearthkeepers */}
      {isHearthkeeper && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="flex items-center justify-between gap-6 p-6 rounded-2xl bg-teal-500/[0.04] border border-teal-500/15">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-1">Full Archetype Vault</p>
            <p className="text-[11px] font-serif italic text-zinc-500">Explore all 12 archetypes, their role mappings, and salary benchmarks.</p>
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