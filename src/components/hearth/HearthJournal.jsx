import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { BookOpen, Flame, Loader2, TreePine, Wind, Sun, Sprout } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const SENTIMENT_TAGS = [
  { value: 'Rooted', icon: TreePine, color: 'hsl(152, 55%, 45%)', bg: 'hsla(152, 55%, 45%, 0.12)', border: 'hsla(152, 55%, 45%, 0.25)' },
  { value: 'Reaching', icon: Sun, color: 'hsl(200, 70%, 55%)', bg: 'hsla(200, 70%, 55%, 0.12)', border: 'hsla(200, 70%, 55%, 0.25)' },
  { value: 'Weathering', icon: Wind, color: 'hsl(38, 80%, 60%)', bg: 'hsla(38, 80%, 60%, 0.12)', border: 'hsla(38, 80%, 60%, 0.25)' },
  { value: 'Blooming', icon: Sprout, color: 'hsl(330, 65%, 65%)', bg: 'hsla(330, 65%, 65%, 0.12)', border: 'hsla(330, 65%, 65%, 0.25)' },
];

const SENTIMENT_MAP = Object.fromEntries(SENTIMENT_TAGS.map(s => [s.value, s]));

const DAILY_PROMPTS = [
  { day: 'Sunday',    theme: 'Rest & Reciprocity',    prompt: 'Indigenous methodologies remind us to rest as part of the cycle. What did you do today to tend to your own internal hearth?' },
  { day: 'Monday',    theme: 'The Curriculum of Life', prompt: 'If your years of public-sector experience were a Masterclass for the private sector, what would the title of the first module be?' },
  { day: 'Tuesday',   theme: 'Ecosystem Mapping',      prompt: 'Which kind of organization in your new territory felt most like "home" today — and what made it feel that way?' },
  { day: 'Wednesday', theme: 'The Bridge Phrase',      prompt: 'Take one task you did today and translate it into private-sector language. How does it feel to say it that way?' },
  { day: 'Thursday',  theme: 'Schedule Sovereignty',   prompt: 'What would "sovereignty" look like in your workday next year? Describe a morning where you truly own your time.' },
  { day: 'Friday',    theme: 'Community Embers',       prompt: 'What is one piece of unspoken wisdom you gathered this week that a fellow Seedling or Hearthkeeper might need to hear?' },
  { day: 'Saturday',  theme: 'The Horizon View',       prompt: 'Step away from the resume for a moment. When you look at your new career horizon, what is the one thing you are most excited to learn — not just do?' },
];

function getDailyPrompt() {
  return DAILY_PROMPTS[new Date().getDay()];
}

export default function HearthJournal({ user }) {
  const [entryBody, setEntryBody] = useState('');
  const [sentimentTag, setSentimentTag] = useState('Rooted');
  const dailyPrompt = getDailyPrompt();
  const [isPrivate, setIsPrivate] = useState(true);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const { data: logs = [] } = useQuery({
    queryKey: ['rootwerkLogs', user?.id],
    queryFn: () => base44.entities.RootwerkLog.filter({ user_id: user.id }, '-created_date', 20),
    enabled: !!user?.id,
  });

  const saveEntry = async (publicEntry) => {
    if (!entryBody.trim() || !user) return;
    setSaving(true);

    await base44.entities.RootwerkLog.create({
      user_id: user.id,
      user_email: user.email,
      entry_body: entryBody.trim(),
      sentiment_tag: sentimentTag,
      is_private: !publicEntry,
    });

    if (publicEntry) {
      await base44.entities.EmberPost.create({
        author_name: user.full_name || user.email.split('@')[0],
        author_email: user.email,
        content: entryBody.trim(),
        is_pinned: false,
        is_bot: false,
        subscription_tier: user.subscription_tier || 'Seedling',
        sentiment_tag: sentimentTag,
      });
      queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
      toast.success('Your words have been offered to the Embers.');
    } else {
      toast.success('Your thoughts are safe in the Hearth.');
    }

    queryClient.invalidateQueries({ queryKey: ['rootwerkLogs', user.id] });
    setEntryBody('');
    setSaving(false);
  };

  const activeSentiment = SENTIMENT_MAP[sentimentTag];

  return (
    <div>
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-5">
        <Flame className="w-4 h-4 text-secondary" />
        <h2 className="font-heading font-semibold text-xl">The Rootwork</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT — Journal Input (hearthstone aesthetic) */}
        <div
          className="rounded-2xl p-6 flex flex-col gap-5"
          style={{
            background: 'linear-gradient(160deg, hsla(280, 30%, 12%, 0.85) 0%, hsla(280, 25%, 16%, 0.9) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid ${activeSentiment.border}`,
            boxShadow: `inset 0 0 40px 0 hsla(280, 40%, 8%, 0.5), 0 0 20px 0 ${activeSentiment.bg}`,
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <label className="text-xs uppercase tracking-widest text-muted-foreground/60">Your reflection</label>
              <span className="text-[10px] text-muted-foreground/35 italic">{dailyPrompt.day} · {dailyPrompt.theme}</span>
            </div>
            <Textarea
              placeholder={dailyPrompt.prompt}
              value={entryBody}
              onChange={e => setEntryBody(e.target.value)}
              className="min-h-[160px] text-base resize-none border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/25 text-foreground/90 leading-relaxed"
              style={{
                background: 'hsla(280, 20%, 8%, 0.4)',
                borderRadius: '0.75rem',
                padding: '14px',
                boxShadow: 'inset 0 2px 12px 0 hsla(280, 40%, 5%, 0.6)',
              }}
            />
          </div>

          {/* Sentiment + Private toggle */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[160px]">
              <label className="text-xs uppercase tracking-widest text-muted-foreground/50 mb-1.5 block">How does this feel?</label>
              <Select value={sentimentTag} onValueChange={setSentimentTag}>
                <SelectTrigger
                  className="h-9 border-0"
                  style={{
                    background: 'hsla(280, 20%, 10%, 0.6)',
                    color: activeSentiment.color,
                    boxShadow: `inset 0 0 0 1px ${activeSentiment.border}`,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SENTIMENT_TAGS.map(s => {
                    const Icon = s.icon;
                    return (
                      <SelectItem key={s.value} value={s.value}>
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                          {s.value}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Switch
                checked={isPrivate}
                onCheckedChange={setIsPrivate}
                id="private-toggle"
              />
              <label htmlFor="private-toggle" className="text-xs text-muted-foreground/60 cursor-pointer">
                Keep Private
              </label>
            </div>
          </div>

          {/* Submit button */}
          <Button
            onClick={() => saveEntry(!isPrivate)}
            disabled={!entryBody.trim() || saving}
            className="w-full gap-2"
            style={{
              background: activeSentiment.bg,
              border: `1px solid ${activeSentiment.border}`,
              color: activeSentiment.color,
              boxShadow: `0 0 12px 0 ${activeSentiment.bg}`,
            }}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
            {isPrivate ? 'Ignite the Entry' : 'Offer to the Embers'}
          </Button>
        </div>

        {/* RIGHT — Logbook Display */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground/60" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground/50 font-medium">Your Logbook</span>
          </div>

          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground/50 italic pt-2">Your journal entries will appear here once you begin writing.</p>
          ) : (
            <div className="grid gap-3 overflow-y-auto pr-1" style={{ maxHeight: '420px' }}>
              {logs.map((log, i) => {
                const s = SENTIMENT_MAP[log.sentiment_tag];
                const Icon = s?.icon;
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-xl p-4"
                    style={{
                      background: 'hsla(280, 35%, 15%, 0.4)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: `1px solid ${s ? s.border : 'hsla(280, 30%, 40%, 0.12)'}`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-muted-foreground/50">
                        {log.created_date ? format(new Date(log.created_date), 'MMM d, yyyy') : ''}
                      </span>
                      {s && Icon && (
                        <span
                          className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                        >
                          <Icon className="w-3 h-3" />
                          {log.sentiment_tag}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">{log.entry_body}</p>
                    {log.is_private === false && (
                      <p className="text-[10px] text-muted-foreground/30 mt-2">Shared to Embers</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}