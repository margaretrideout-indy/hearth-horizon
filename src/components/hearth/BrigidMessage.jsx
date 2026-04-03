import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export default function BrigidMessage({ message, profileId }) {
  const queryClient = useQueryClient();

  const dismiss = async () => {
    await base44.entities.UserProfile.update(profileId, { brigid_checkin_message: '' });
    queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl p-5"
      style={{
        background: 'hsla(280, 40%, 18%, 0.35)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid hsla(280, 30%, 50%, 0.2)',
        boxShadow: '0 0 20px hsla(280, 50%, 40%, 0.12)',
      }}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium tracking-widest uppercase mb-1.5" style={{ color: 'hsla(280, 60%, 72%, 0.8)', fontSize: '0.65rem' }}>
            A word from Brigid
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">{message}</p>
        </div>
        <button
          onClick={dismiss}
          className="text-muted-foreground/40 hover:text-muted-foreground transition-colors mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}