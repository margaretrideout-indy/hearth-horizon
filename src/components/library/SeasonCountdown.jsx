import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ShieldCheck } from 'lucide-react';

const STRIPE_URL = "https://buy.stripe.com/eVqdR9bpScmj86ocOedAk03";
const SEASON_DAYS = 180;
const WARNING_DAYS = 150;

/**
 * Reads the hearthkeeper_start date from vault user metadata.
 * Shows a countdown and "Season's End" warning when approaching Day 150.
 */
export default function SeasonCountdown({ vault }) {
  const startDate = vault?.hearthkeeper_start;
  if (!startDate) return null;

  const start = new Date(startDate);
  const now = new Date();
  const elapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const remaining = Math.max(0, SEASON_DAYS - elapsed);
  const pct = Math.min(100, Math.round((elapsed / SEASON_DAYS) * 100));
  const isWarning = elapsed >= WARNING_DAYS;

  if (remaining === 0) return null; // expired — handled elsewhere

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className={`rounded-[2rem] border p-6 space-y-4 ${isWarning ? 'bg-amber-500/[0.04] border-amber-500/20' : 'bg-teal-500/[0.03] border-teal-500/10'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isWarning
            ? <Flame size={16} className="text-amber-400 animate-pulse" />
            : <ShieldCheck size={16} className="text-teal-500/60" />
          }
          <div>
            <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${isWarning ? 'text-amber-400' : 'text-teal-500/60'}`}>
              {isWarning ? "Season's End Approaching" : "Hearthkeeper Season"}
            </p>
            <p className="text-[10px] font-serif italic text-zinc-500 mt-0.5">
              {isWarning
                ? `${remaining} days remain — renew to keep your fire lit.`
                : `${remaining} days remaining in your season.`}
            </p>
          </div>
        </div>
        <span className="font-mono text-[11px] text-zinc-500 shrink-0">Day {elapsed}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${isWarning ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-teal-500 to-purple-500'}`}
        />
      </div>

      {isWarning && (
        <a href={STRIPE_URL}
          className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all">
          Renew Your Season — $24.99
        </a>
      )}
    </motion.div>
  );
}