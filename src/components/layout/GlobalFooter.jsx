import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// ── Policy Modal ──────────────────────────────────────────────────────────────
function PolicyModal({ title, content, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'hsla(280, 30%, 5%, 0.85)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-2xl p-8 space-y-4"
        style={{ background: 'hsl(280, 22%, 14%)', border: '1px solid hsla(280, 30%, 35%, 0.3)' }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-base font-serif italic text-purple-200">{title}</h2>
        <div className="text-sm text-zinc-500 leading-relaxed space-y-3">{content}</div>
      </div>
    </div>
  );
}

// ── Policy Content ────────────────────────────────────────────────────────────
const PRIVACY_CONTENT = (
  <>
    <p>Hearth & Horizon is committed to your privacy and the safety of your personal information.</p>
    <p><strong className="text-zinc-300">What we collect:</strong> Your email, name, and any profile or journal data you voluntarily provide.</p>
    <p><strong className="text-zinc-300">How we use it:</strong> To personalise your experience. We never sell your data.</p>
    <p><strong className="text-zinc-300">Private journal entries</strong> are visible only to you and never shared without explicit consent.</p>
    <p className="text-xs text-zinc-700">Last updated: April 2026</p>
  </>
);

const TERMS_CONTENT = (
  <>
    <p>By using Hearth & Horizon, you agree to engage in good faith and with care for fellow community members.</p>
    <p><strong className="text-zinc-300">Community standards:</strong> Harmful or abusive content will be removed.</p>
    <p><strong className="text-zinc-300">Subscriptions:</strong> Billed monthly via Stripe. Cancel anytime.</p>
    <p><strong className="text-zinc-300">Liability:</strong> Hearth & Horizon provides career transition tools, not licensed career counselling.</p>
    <p className="text-xs text-zinc-700">Last updated: April 2026</p>
  </>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECT_LINKS = [
  { label: 'Atsanik Selene', href: 'https://www.atsanik-selene.base44.app' },
  { label: 'Indigenized Curriculum Engine', href: 'https://indigenizedcurriculumengine.base44.app' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function GlobalFooter() {
  const [modal, setModal] = useState(null);

  return (
    <>
      <footer className="space-y-8 text-center">

        {/* Brand */}
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-700">Hearth & Horizon</p>
          <p className="text-[10px] text-zinc-700 italic">Dartmouth, NS - Built for the Caregivers of the World.</p>
        </div>

        {/* Two-column groups */}
        <div className="grid grid-cols-2 gap-8 text-left max-w-sm mx-auto">

          {/* System */}
          <div className="space-y-2">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-3">System</p>
            <a href="/about#reach-out" className="block text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">Contact</a>
            <button onClick={() => setModal('privacy')} className="block text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">Privacy Policy</button>
            <button onClick={() => setModal('terms')} className="block text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">Terms of Use</button>
            <button
              onClick={() => import('@/api/base44Client').then(m => m.base44.auth.redirectToLogin(window.location.href))}
              className="block text-[10px] text-zinc-600 hover:text-teal-400 transition-colors">
              Member Login
            </button>
          </div>

          {/* Ecosystem */}
          <div className="space-y-2">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-700 mb-3">Ecosystem</p>
            <Link to="/about" className="block text-[10px] text-zinc-600 hover:text-teal-400 transition-colors">About</Link>
            <Link to="/advisory" className="block text-[10px] text-zinc-600 hover:text-teal-400 transition-colors">Advisory</Link>
            {PROJECT_LINKS.map(({ label, href }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                className="block text-[10px] text-zinc-600 hover:text-teal-400 transition-colors">
                {label}
              </a>
            ))}
          </div>

        </div>



      </footer>

      {modal === 'privacy' && <PolicyModal title="Privacy Policy" content={PRIVACY_CONTENT} onClose={() => setModal(null)} />}
      {modal === 'terms' && <PolicyModal title="Terms of Use" content={TERMS_CONTENT} onClose={() => setModal(null)} />}
    </>
  );
}