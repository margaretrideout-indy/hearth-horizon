import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Flame, Sparkles, LogIn, Heart, Coffee } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SanctuaryTransition from '../components/SanctuaryTransition';
import StickyNav from '@/components/StickyNav';
import GlobalFooter from '@/components/layout/GlobalFooter';

// ── Simplified Data ──────────────────────────────────────────────────────────
const TIERS = [
  {
    id: 'seedling',
    title: "Seedling",
    price: "$0",
    tag: "Free Forever",
    desc: "Your entry into the ecosystem. Begin your journey with the core tools.",
    features: ["Horizon Title Mapping", "Library Resource Access", "Personal Vault Storage"],
    cta: "Enter Free",
    action: () => base44.auth.redirectToLogin('/hearth'),
    style: "bg-[#0E0C14] border-zinc-800"
  },
  {
    id: 'forest',
    title: "The Founding Forest",
    price: "$9/mo",
    tag: "Community",
    desc: "Direct access to frameworks, live sessions, and peer cohorts.",
    features: ["Live Group Sessions", "Full AI Suite (Brigid, Rite, Soul)", "Direct Title Feedback"],
    cta: "Join The Forest",
    action: () => window.location.href = 'https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03',
    style: "bg-[#0E1A14] border-teal-500/30"
  }
];

// ── Main Component ──────────────────────────────────────────────────────────
export default function GroveTiers({ vault, onSync }) {
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/20 overflow-x-hidden">
      <AnimatePresence>
        {showTransition && <SanctuaryTransition onComplete={() => navigate('/hearth')} />}
      </AnimatePresence>

      <StickyNav showBrigidCta={false} />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-40 space-y-32">
        
        {/* Hero Section */}
        <section className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-serif italic text-purple-200 leading-tight">
            Translate your legacy into <span className="text-teal-400">private-sector power.</span>
          </h1>
          <p className="text-zinc-500 text-sm font-serif italic max-w-lg">
            Type your title below. Brigid—our mapping engine—reveals your private-sector identity instantly. No account required.
          </p>
          
          {/* Note: Insert your WhisperTool logic here as needed */}
        </section>

        {/* Tiers Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TIERS.map((tier) => (
            <div key={tier.id} className={`p-8 rounded-[2rem] border ${tier.style} flex flex-col`}>
              <div className="flex justify-between items-start mb-6">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">{tier.tag}</span>
                <span className="text-2xl font-black text-white">{tier.price}</span>
              </div>
              <h3 className="text-xl font-serif italic text-purple-300 mb-2">{tier.title}</h3>
              <p className="text-zinc-500 text-xs italic mb-8">{tier.desc}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="text-[11px] text-zinc-400 flex items-center gap-3">
                    <Check size={12} className="text-teal-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={tier.action}
                className="w-full py-4 bg-zinc-800 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-zinc-700 transition-all"
              >
                {tier.cta} →
              </button>
            </div>
          ))}
        </section>

        {/* Support CTA */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800">
          <div className="flex items-center gap-4">
            <Coffee size={16} className="text-amber-400" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Support the Fire</p>
          </div>
          <a href="https://ko-fi.com/hearthandhorizon" className="text-[10px] font-black uppercase tracking-widest text-amber-500 hover:text-amber-400">
            Buy a Coffee →
          </a>
        </div>

        {/* Unified Footer */}
        <footer className="pt-20 border-t border-zinc-900 space-y-12">
          <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-700">
            <button onClick={() => navigate('/about')} className="hover:text-zinc-500">About</button>
            <button onClick={() => navigate('/contact-us')} className="hover:text-zinc-500">Contact</button>
            <a href="mailto:hello@hearthandhorizon.ca" className="hover:text-zinc-500">hello@hearthandhorizon.ca</a>
          </div>
          <GlobalFooter />
        </footer>
      </div>
    </div>
  );
}