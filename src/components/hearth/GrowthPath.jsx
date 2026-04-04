import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const DEFAULT_STEPS = [
  { id: 1, label: 'Complete your Identity Translator worksheet', done: false },
  { id: 2, label: 'Run your Horizon Audit to surface your values alignment', done: false },
  { id: 3, label: 'Review the Forest Guide to map your next 90 days', done: false },
];

export default function GrowthPath() {
  const [steps, setSteps] = useState(DEFAULT_STEPS);

  const toggle = (id) =>
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );

  return (
    <section
      className="rounded-2xl border border-border/50 p-6 space-y-4"
      style={{ background: 'hsla(280, 20%, 16%, 0.85)' }}
    >
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground">The Canopy</h2>
        <p className="text-sm text-muted-foreground mt-0.5">My Current Growth Path</p>
      </div>

      <ul className="space-y-3">
        {steps.map((step, i) => (
          <motion.li
            key={step.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            onClick={() => toggle(step.id)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {step.done ? (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary/60 shrink-0 transition-colors" />
            )}
            <span
              className={`text-sm transition-colors ${
                step.done ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {step.label}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}