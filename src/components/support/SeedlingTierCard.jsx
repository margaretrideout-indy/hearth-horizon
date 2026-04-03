import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function SeedlingTierCard({ isActive, onClick }) {
  const handleGetRooted = (e) => {
    e.stopPropagation();
    base44.auth.redirectToLogin();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-5 rounded-2xl border-2 text-left transition-all w-full ${
        isActive ? 'border-secondary bg-secondary/15' : 'border-border bg-card'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Sprout className={`w-5 h-5 ${isActive ? 'text-secondary' : 'text-muted-foreground'}`} />
        <Badge className="bg-secondary/10 text-secondary border-none text-xs">Free</Badge>
      </div>
      <div className="font-heading font-semibold text-foreground">The Seedling</div>
      <div className="text-xl font-semibold text-secondary mt-0.5 mb-2">Free</div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        A complimentary seat for public service professionals on the move. Includes full access to The Embers community chat and 2 complimentary Bridge Builder crossings (PDF uploads) per month.
      </p>
      {isActive && (
        <div className="mt-3 pt-3 border-t border-border/40">
          <Button
            type="button"
            size="sm"
            className="w-full gap-2 text-xs"
            onClick={handleGetRooted}
          >
            <Sprout className="w-3.5 h-3.5" />
            Get Rooted (Free)
          </Button>
        </div>
      )}
    </motion.button>
  );
}