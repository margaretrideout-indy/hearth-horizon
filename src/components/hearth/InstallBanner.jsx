import React, { useState } from 'react';
import { X, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function InstallBanner() {
  const [dismissed, setDismissed] = useState(() => {
    // Check if user has dismissed this banner in the past 7 days
    const dismissTime = localStorage.getItem('installBannerDismissed');
    if (!dismissTime) return false;
    const daysSinceDismiss = (Date.now() - parseInt(dismissTime)) / (1000 * 60 * 60 * 24);
    return daysSinceDismiss < 7;
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem('installBannerDismissed', Date.now().toString());
    setDismissed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Link
        to="/install-app"
        className="block relative overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-4 hover:border-primary/50 transition-all group"
      >
        <div className="flex items-center gap-3 pr-8">
          <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              📱 Take the Hearth with you. Click here to learn how to add this app to your phone.
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDismiss();
          }}
          className="absolute top-3 right-3 p-1 rounded hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </Link>
    </motion.div>
  );
}