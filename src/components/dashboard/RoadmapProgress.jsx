import React from 'react';
import { Building2, ArrowRight, Compass, Target, Rocket, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const stages = [
  { id: 'discovery', label: 'Discovery', icon: Compass, description: 'Know yourself' },
  { id: 'translation', label: 'Translation', icon: ArrowRight, description: 'Reframe your skills' },
  { id: 'bridging', label: 'Bridging', icon: Target, description: 'Close the gaps' },
  { id: 'launching', label: 'Launching', icon: Rocket, description: 'Enter your new path' },
];

export default function RoadmapProgress({ currentStage = 'discovery' }) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Your Journey</p>
            <p className="font-heading font-semibold text-foreground">From Classroom to New Horizon</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Sun className="w-4 h-4 text-secondary" />
          <span>Stage {currentIndex + 1} of 4</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute top-5 left-6 right-6 h-0.5 bg-border" />
        <motion.div
          className="absolute top-5 left-6 h-0.5 bg-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ maxWidth: 'calc(100% - 48px)' }}
        />

        {stages.map((stage, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isFuture = i > currentIndex;

          return (
            <div key={stage.id} className="relative flex flex-col items-center z-10" style={{ width: '25%' }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all border-2",
                  isPast && "bg-secondary border-secondary text-white",
                  isCurrent && "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20",
                  isFuture && "bg-card border-border text-muted-foreground"
                )}
              >
                <stage.icon className="w-4 h-4" />
              </motion.div>
              <p className={cn(
                "text-xs font-medium mt-2 text-center",
                isCurrent ? "text-foreground" : "text-muted-foreground"
              )}>{stage.label}</p>
              <p className="text-[10px] text-muted-foreground/70 text-center hidden sm:block">{stage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}