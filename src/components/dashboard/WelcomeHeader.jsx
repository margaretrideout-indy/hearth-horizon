import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function WelcomeHeader({ profile }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMessage = () => {
    if (!profile) return "A sanctuary for public-sector professionals to anchor years of wisdom and find a high-autonomy ecosystem—without losing who they are.";
    const stage = profile.roadmap_stage || 'discovery';
    const messages = {
      discovery: "Your roots run deep. Let's map the terrain ahead.",
      translation: "Your language is shifting. The world is starting to hear you.",
      bridging: "You're crossing the threshold. The horizon is within reach.",
      launching: "The fire is tended. Step into the open field."
    };
    return messages[stage];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-4 h-4 text-secondary" />
        <p className="text-sm text-secondary font-medium">{getGreeting()}</p>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
        Ground your history. Map your horizon.
      </h1>
      <p className="text-muted-foreground text-lg max-w-xl">
        {getMessage()}
      </p>
    </motion.div>
  );
}