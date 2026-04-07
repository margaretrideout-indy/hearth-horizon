import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const DEFAULT_STEPS = [
  { id: 1, label: 'Complete your Linguistic Bridge worksheet', done: false },
  { id: 2, label: 'Run your Canopy Audit to surface your alignment', done: false },
  { id: 3, label: 'Review the Library provisions to map your next 90 days', done: false },
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

      <div className="space-y-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggle(step.id)}
            className="flex items-center gap-3 w-full text-left group"
          >
            {step.done ? (
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground group-hover:text-teal-400/50 transition-colors" />
            )}
            <span className={`text-sm transition-all ${step.done ? 'text-muted-foreground line-through opacity-50' : 'text-foreground'}`}>
              {step.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}