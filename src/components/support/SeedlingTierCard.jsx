import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import RequestSeatModal from './RequestSeatModal';

export default function SeedlingTierCard({ isActive, onClick }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
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
          Peer-sponsored access. Includes 2 PDF uploads/month and access to The Embers community chat.
        </p>
        {isActive && (
          <div className="mt-3 pt-3 border-t border-border/40">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="w-full gap-2 text-xs border-secondary/30 text-secondary hover:bg-secondary/10"
              onClick={e => { e.stopPropagation(); setModalOpen(true); }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Request a Seat
            </Button>
          </div>
        )}
      </motion.button>

      <RequestSeatModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}