import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RESOURCES = [
  {
    emoji: '🌉',
    title: 'The Linguistic Bridge',
    subtitle: 'Translate your expertise into Tech-speak.',
    to: '/translator',
  },
  {
    emoji: '🌲',
    title: 'The Canopy',
    subtitle: 'Align your values with your next career move.',
    to: '/canopy',
  },
  {
    emoji: '📚',
    title: 'The Library',
    subtitle: 'Curated provisions for your professional pivot.',
    to: '/library',
  },
];

export default function GroveGrid() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground">The Grove</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Resources rooted in your transition journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {RESOURCES.map((resource, i) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 p-6 flex flex-col gap-4 hover:border-amber-400/40 transition-all shadow-xl backdrop-blur-sm"
            style={{ background: 'hsla(280, 25%, 12%, 0.80)' }}
          >
            {/* Subtle glow accent */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: 'hsl(183, 80%, 38%)' }} />

            <span className="text-4xl">{resource.emoji}</span>

            <div className="flex-1 space-y-1">
              <h3 className="font-heading text-base font-semibold text-foreground">{resource.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{resource.subtitle}</p>
            </div>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 gap-2 transition-all"
            >
              <Link to={resource.to}>
                <ArrowRight className="w-3 h-3" />
                View Resource
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}