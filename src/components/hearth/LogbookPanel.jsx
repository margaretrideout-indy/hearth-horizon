import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookHeart, ChevronDown, Check, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const MOODS = [
  { value: 'hopeful', label: 'Hopeful', emoji: '🌱' },
  { value: 'motivated', label: 'Motivated', emoji: '🔥' },
  { value: 'confident', label: 'Confident', emoji: '✨' },
  { value: 'anxious', label: 'Anxious', emoji: '🌊' },
  { value: 'uncertain', label: 'Uncertain', emoji: '🌫️' },
  { value: 'grieving', label: 'Grieving', emoji: '🍂' },
];

export default function LogbookPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | saved
  const [recentEntries, setRecentEntries] = useState([]);

  useEffect(() => {
    if (isOpen) {
      base44.entities.DailyCheckIn.list('-created_date', 3)
        .then(setRecentEntries)
        .catch(() => {});
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!selectedMood) return;
    setStatus('saving');
    await base44.entities.DailyCheckIn.create({
      mood: selectedMood,
      reflection,
      gratitude_note: gratitude,
      prompt_used: "How are you navigating your journey today?",
    });
    setStatus('saved');
    setSelectedMood(null);
    setReflection('');
    setGratitude('');
    // Refresh recent entries
    const fresh = await base44.entities.DailyCheckIn.list('-created_date', 3);
    setRecentEntries(fresh);
    setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <div className="bg-zinc-950/40 border border-zinc-900 rounded-[2.5rem] overflow-hidden">
      <button
        onClick={() => setIsOpen(p => !p)}
        className="w-full flex items-center justify-between px-8 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <BookHeart size={16} className="text-rose-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Daily Logbook</span>
        </div>
        <ChevronDown size={14} className={`text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-6 border-t border-zinc-900/80">

              {/* Recent entries strip */}
              {recentEntries.length > 0 && (
                <div className="flex gap-2 pt-4 flex-wrap">
                  {recentEntries.map((e) => {
                    const m = MOODS.find(x => x.value === e.mood);
                    return (
                      <div key={e.id} className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-[9px] text-zinc-500 font-mono">
                        <span>{m?.emoji}</span>
                        <span>{m?.label}</span>
                      </div>
                    );
                  })}
                  <span className="text-[9px] text-zinc-700 font-mono self-center">recent check-ins</span>
                </div>
              )}

              {/* Mood selector */}
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">How are you navigating today?</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setSelectedMood(m.value)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all text-center ${
                        selectedMood === m.value
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                          : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-500 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xl">{m.emoji}</span>
                      <span className="text-[8px] font-black uppercase tracking-wider">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection */}
              <textarea
                rows={3}
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder="A brief reflection on your journey today..."
                className="w-full bg-black/40 border border-zinc-800/80 rounded-2xl p-4 text-xs text-zinc-300 focus:outline-none focus:border-rose-500/30 transition-colors placeholder:text-zinc-700 resize-none select-text"
              />

              {/* Gratitude */}
              <input
                type="text"
                value={gratitude}
                onChange={e => setGratitude(e.target.value)}
                placeholder="One thing I value about my journey right now..."
                className="w-full bg-black/40 border border-zinc-800/80 rounded-2xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-rose-500/30 transition-colors placeholder:text-zinc-700 select-text"
              />

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={!selectedMood || status === 'saving' || status === 'saved'}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-40 ${
                  status === 'saved'
                    ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20'
                }`}
              >
                {status === 'saving' && <Loader2 size={10} className="animate-spin" />}
                {status === 'saved' && <Check size={10} />}
                {status === 'saved' ? 'Logged to the Hearth' : status === 'saving' ? 'Saving...' : 'Log Entry'}
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}