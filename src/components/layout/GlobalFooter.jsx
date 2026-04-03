import React from 'react';
import { Link } from 'react-router-dom';

export default function GlobalFooter() {
  return (
    <footer className="mt-16 py-6 border-t border-border/20 text-center space-y-2">
      <p className="text-xs text-muted-foreground/50">
        Hearth &amp; Horizon &nbsp;·&nbsp; Dartmouth, NS, Canada &nbsp;·&nbsp; Built for the Caregivers of the World.
      </p>
      <div className="flex justify-center gap-4 text-xs text-muted-foreground/40">
        <a href="mailto:support@hearthandhorizon.ca" className="hover:text-secondary transition-colors">Contact Support</a>
        <span>·</span>
        <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
      </div>
    </footer>
  );
}