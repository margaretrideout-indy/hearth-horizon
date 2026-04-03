import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';


function PolicyModal({ title, content, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'hsla(280, 30%, 5%, 0.8)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 space-y-4"
        style={{
          background: 'hsl(280, 22%, 14%)',
          border: '1px solid hsla(280, 30%, 35%, 0.3)',
          boxShadow: '0 0 40px 0 hsla(280, 40%, 10%, 0.8)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
          {content}
        </div>
      </div>
    </div>
  );
}

const PRIVACY_CONTENT = (
  <>
    <p>Hearth & Horizon is committed to your privacy and the safety of your personal information.</p>
    <p><strong className="text-foreground">What we collect:</strong> Your email, name, and any profile or journal data you voluntarily provide.</p>
    <p><strong className="text-foreground">How we use it:</strong> To personalise your experience and support your career transition journey. We never sell your data.</p>
    <p><strong className="text-foreground">Your journal entries</strong> marked "private" are visible only to you and are never shared without your explicit consent.</p>
    <p><strong className="text-foreground">Contact:</strong> For any data requests, <Link to="/contact" className="text-secondary underline">contact us here</Link>.</p>
    <p className="text-xs text-muted-foreground/50">Last updated: April 2026</p>
  </>
);

const TERMS_CONTENT = (
  <>
    <p>By using Hearth & Horizon, you agree to engage with this platform in good faith and with care for fellow community members.</p>
    <p><strong className="text-foreground">Community standards:</strong> The Embers and Grove spaces are places of mutual support. Harmful, abusive, or discriminatory content will be removed.</p>
    <p><strong className="text-foreground">Subscriptions:</strong> Paid tiers are billed monthly via Stripe. You may cancel at any time from your account settings.</p>
    <p><strong className="text-foreground">Content ownership:</strong> Your journal entries and reflections remain yours. By sharing to the Embers, you grant the community a read-only view.</p>
    <p><strong className="text-foreground">Liability:</strong> Hearth & Horizon provides career transition tools and community support. We are not a licensed career counselling service.</p>
    <p className="text-xs text-muted-foreground/50">Last updated: April 2026</p>
  </>
);

export default function GlobalFooter() {
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <>
      <footer
        className="mt-16 py-6 border-t border-border/20 text-center space-y-2"
        style={{ position: 'relative' }}
      >
        <p
          className="text-xs text-muted-foreground/50"
          style={{ lineHeight: 1.6 }}
        >
          <span className="block sm:inline">Hearth &amp; Horizon</span>
          <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
          <span className="block sm:inline">Dartmouth, NS, Canada</span>
          <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
          <span className="block sm:inline">Built for the Caregivers of the World.</span>
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground/40">
          <Link to="/contact" className="hover:text-secondary transition-colors">Contact Support</Link>
          <span>·</span>
          <button onClick={() => setModal('privacy')} className="hover:text-secondary transition-colors">Privacy Policy</button>
          <span>·</span>
          <button onClick={() => setModal('terms')} className="hover:text-secondary transition-colors">Terms</button>
        </div>
      </footer>

      {modal === 'privacy' && (
        <PolicyModal title="Privacy Policy" content={PRIVACY_CONTENT} onClose={() => setModal(null)} />
      )}
      {modal === 'terms' && (
        <PolicyModal title="Terms of Use" content={TERMS_CONTENT} onClose={() => setModal(null)} />
      )}
    </>
  );
}