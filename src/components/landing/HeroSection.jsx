import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection({ onCTA }) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient background with forest/earth tones */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(135deg, 
            hsl(280, 25%, 15%) 0%,
            hsl(183, 40%, 20%) 50%,
            hsl(35, 50%, 18%) 100%)`,
        }}
      />

      {/* Subtle organic shapes for depth */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(183, 80%, 38%)' }} />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(35, 85%, 65%)' }} />

      <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 space-y-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Ground your history.
            <br />
            <span style={{ color: 'hsl(183, 80%, 55%)' }}>Map your horizon.</span>
          </h1>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed max-w-3xl"
        >
          You've spent years building your expertise, but now you're standing at a crossroads. Welcome to Hearth & Horizon—a sanctuary designed for professionals ready to transition from institutional roles into the modern landscapes of tech and remote work.
        </motion.p>

        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-foreground/80 leading-relaxed max-w-2xl"
        >
          This is a space for those who want to move forward without losing their sense of purpose. Whether you are here to explore the Grove or find your seat in the Founding Forest, you are exactly where you need to be.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4"
        >
          <Button
            onClick={onCTA}
            size="lg"
            className="gap-2 h-12 px-8 text-base font-medium"
          >
            Enter the Forest
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Founder Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs text-muted-foreground/60 italic pt-8"
          style={{ borderTop: '1px solid hsl(280, 15%, 26%)' }}
        >
          Founded by Margaret, M.Ed. | 13 Years of Curriculum & Program Leadership
        </motion.p>
      </div>
    </div>
  );
}