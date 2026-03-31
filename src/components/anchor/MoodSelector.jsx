import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const moods = [
  { id: 'hopeful', emoji: '🌱', label: 'Hopeful' },
  { id: 'motivated', emoji: '🔥', label: 'Motivated' },
  { id: 'confident', emoji: '☀️', label: 'Confident' },
  { id: 'uncertain', emoji: '🌫️', label: 'Uncertain' },
  { id: 'anxious', emoji: '🌊', label: 'Anxious' },
  { id: 'grieving', emoji: '🍂', label: 'Grieving' },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {moods.map(mood => (
        <motion.button
          key={mood.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(mood.id)}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
            selected === mood.id
              ? "border-secondary bg-secondary/10 shadow-md"
              : "border-transparent bg-accent/50 hover:border-border"
          )}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-xs font-medium">{mood.label}</span>
        </motion.button>
      ))}
    </div>
  );
}