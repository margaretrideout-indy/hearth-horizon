import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Heart, X, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

// ... (imports remain the same)

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

// --- DATA: THE SPARK'S WEEKLY PROMPTS ---
const WEEKLY_SPARKS = [
  "Week 1: What is one legacy skill you are officially 'retiring' this month?",
  "Week 2: Identify one person in this room you can advocate for today. Who is it?",
  "Week 3: If your career was a 'migration', are you currently in the storm or the sun?",
  "Week 4: What is the 'unwritten rule' in your target industry that surprised you most?",
  // ... you can add up to 52 for the full year
];

// Helper to get the current week index
const getWeekIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) % WEEKLY_SPARKS.length;
};

// ... (EmberReactions and TierBadge remain the same)

export default function EmbersChat({ vault, isAdmin }) {
  // ... (existing states)

  const FIXED_STARTER = {
    id: 'static-founder-welcome',
    author_name: 'Margaret',
    content: "Welcome to the Hearth. This is our shared space to navigate the shifting winds of career migration.",
    subscription_tier: 'Founder',
    author_email: 'founder@hearth.io',
    created_date: new Date(0).toISOString()
  };

  // --- NEW: THE SPARK BOT LOGIC ---
  const THE_SPARK = {
    id: 'weekly-spark-bot',
    author_name: 'The Spark',
    content: WEEKLY_SPARKS[getWeekIndex()],
    subscription_tier: 'Steward', // Or a custom 'Bot' tier
    author_email: 'spark@hearth.io',
    is_bot: true,
    created_date: new Date().toISOString()
  };

  // ... (fetchPosts and useEffects remain the same)

  // Merge everything: Welcome message -> The Spark -> User Posts
  const allPosts = [FIXED_STARTER, THE_SPARK, ...posts];

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] overflow-hidden relative border border-white/5 shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-36">
        {allPosts.map((msg, idx) => {
          const isOwn = msg.author_email === vault?.email;
          const isSpark = msg.author_email === 'spark@hearth.io';

          return (
            <motion.div 
              key={msg.id || idx} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isSpark ? 'text-teal-400 animate-pulse' : 'text-zinc-500'}`}>
                   {isSpark && <Zap size={8} className="inline mr-1 mb-0.5" />}
                   {msg.author_name}
                </span>
                <TierBadge tier={msg.subscription_tier} />
              </div>

              <div className={`max-w-[80%] p-4 rounded-2xl border transition-all ${
                isOwn ? 'bg-teal-500/10 border-teal-500/20 text-white' : 
                isSpark ? 'bg-gradient-to-br from-teal-500/20 to-purple-500/20 border-teal-500/30 text-teal-50 shadow-[0_0_20px_rgba(20,184,166,0.1)]' :
                'bg-white/5 border-white/5 text-zinc-300'
              }`}>
                <p className={`text-sm leading-relaxed ${isSpark ? 'font-medium italic' : ''}`}>
                  {msg.content}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <button onClick={() => setReplyTarget(msg)} className="text-[9px] font-black text-zinc-600 hover:text-teal-400 uppercase tracking-widest transition-colors">Reply</button>
                <EmberReactions />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ... (Footer code remains the same) */}
    </div>
  );
}