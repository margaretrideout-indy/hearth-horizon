import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const personas = [
  {
    sector: 'Education',
    emoji: '🎓',
    jargon: ['IEPs', 'Pedagogy', 'Classroom Management'],
    value: ['Data Customization', 'Stakeholder Alignment'],
  },
  {
    sector: 'Healthcare',
    emoji: '🏥',
    jargon: ['Patient Care', 'Triage', 'EHR/EMR Systems'],
    value: ['User Experience (UX)', 'Crisis Ops', 'Data Integrity'],
  },
  {
    sector: 'Non-Profit',
    emoji: '🤝',
    jargon: ['Donor Stewardship', 'Grant Writing', 'Volunteers'],
    value: ['Revenue Gen', 'Proposal Dev', 'Relationship Mgmt'],
  },
  {
    sector: 'Government',
    emoji: '🏛️',
    jargon: ['Briefings', 'Policy Implementation', 'Compliance'],
    value: ['Strategic Comms', 'Regulatory Ops', 'Project Lifecycle'],
  },
];

export default function TargetUsers() {
  return (
    <div>
      <h2 className="font-heading font-semibold text-xl mb-1">Who This Is For</h2>
      <p className="text-sm text-muted-foreground mb-4">Your public-sector experience already has private-sector value — it just needs translation.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {personas.map((p, i) => (
          <motion.div
            key={p.sector}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border/60 bg-card p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{p.emoji}</span>
              <span className="font-heading font-semibold text-foreground">{p.sector}</span>
            </div>
            <div className="flex items-start gap-2">
              {/* Jargon */}
              <div className="flex-1 space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">You Say</p>
                <div className="flex flex-wrap gap-1">
                  {p.jargon.map(j => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">{j}</span>
                  ))}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-secondary mt-5 shrink-0" />
              {/* Value */}
              <div className="flex-1 space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-secondary font-medium">They Hear</p>
                <div className="flex flex-wrap gap-1">
                  {p.value.map(v => (
                    <span key={v} className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">{v}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}