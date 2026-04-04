import React from 'react';
import { motion } from 'framer-motion';

export default function HearthWelcome({ user }) {
  const firstName = user?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Seedling';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-border/40 p-8"
      style={{
        background: `linear-gradient(135deg, hsl(280, 25%, 16%) 0%, hsl(183, 40%, 18%) 100%)`,
      }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(183, 80%, 38%)' }} />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(35, 85%, 65%)' }} />

      <div className="relative space-y-1">
        <p className="text-xs font-medium tracking-widest uppercase text-primary/70">Your Hearth</p>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-snug">
          Welcome home, <span style={{ color: 'hsl(183, 80%, 55%)' }}>{firstName}</span>.
        </h1>
        <p className="text-muted-foreground text-base mt-1">Your horizon is waiting.</p>
      </div>
    </motion.div>
  );
}