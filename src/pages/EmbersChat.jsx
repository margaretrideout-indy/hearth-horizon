import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Heart, X, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

// --- THE GLOW'S WEEKLY PROMPTS ---
const WEEKLY_GLOWS = [
  "What is one legacy skill you are officially 'retiring' this month?",
  "Identify one person in this room you can advocate for today. Who is it?",
  "If your career was a 'migration', are you currently in the storm or the sun?",
  "What is the 'unwritten rule' in your target industry that surprised you most?",
  "What is one 'small win' from the last 48 hours that felt bigger than it was?",
  "Who in your network is currently 'stuck', and how can you nudge them today?",
  "Describe your ideal work-day in 2027 using only three power verbs."
];

const getWeekIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek) % WEEKLY_GLOWS.length;
};

const EmberReactions = () => {
  const [counts, setCounts] = useState({ sparkle: 0, leaf: 0, heart: 0 });
  const react = (type) => setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  const reactionConfigs = [
    { type: 'sparkle', icon: Sparkles, color: 'text-teal-400', label: 'Inspired' },
    { type: 'leaf', icon: Leaf, color: 'text-green-500', label: 'Growth' },
    { type: 'heart', icon: Heart, color: 'text-rose-500', label: 'Love' }
  ];
  return (
    <div className="flex gap-2 mt-2 ml-1">
      {reactionConfigs.map(({ type, icon: Icon, color, label }) => (
        <button key={type} onClick={() => react(type)} className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/5 hover:border-white/10 transition-all active:scale-90" title={label}>
          <Icon size={10} className={counts[type] > 0 ? color : 'text-zinc-600'} />
          {counts[type] > 0 && <span className="text-[9px] text-zinc-400 font-bold">{counts[type]}</span>}
        </button>
      ))}
    </div>
  );
};

const TierBadge = ({ tier }) => {
  const t = tier?.toLowerCase();
  const configs = {
    founder: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    steward: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    hearthkeeper: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    // Add this one for the bot
    kindling: 'bg-yellow-400/10 text-yellow-500 border-yellow-500/20 animate-pulse', 
  };
  const style = configs[t] || 'bg-zinc-800 text-zinc-500 border-white/5';
  const label = t ? (t.charAt(0).toUpperCase() + t.slice(1)) : 'Seedling';
  return <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${style}`}>{label}</span>;
};

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const scrollRef = useRef(null);

  const FIXED_STARTER = {
    id: 'static-founder-welcome',
    author_name: 'Margaret',
    content: "Welcome to the Hearth. This is our shared space to navigate the shifting winds of career migration.",
    subscription_tier: 'Founder',
    author_email: 'founder@hearth.io',
    created_date: new Date(0).toISOString()
  };

  const THE_GLOW = {
    id: 'weekly-spark-bot',
    author_name: 'The Glow',
    content: WEEKLY_GLOWS[getWeekIndex()],
    subscription_tier: 'Kindling', // This maps to the TierBadge
    author_email: 'spark@hearth.io',
    is_bot: true,
    created_date: new Date().toISOString()
};

  const fetchPosts = async () => {
    try {
      const data = await base44.entities.EmberPost.list('-created_date', 50);
      setPosts(data.reverse());
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchPosts();
    const unsubscribe = base44.entities.EmberPost.subscribe((event) => {
      if (event.type === 'create') setPosts(prev => [...prev, event.data]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [posts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await base44.entities.EmberPost.create({
        author_name: vault?.email?.split('@')[0] || 'Traveler',
        author_email: vault?.email || 'anonymous',
        content: replyTarget
          ? `↩ @${replyTarget.author_name}: "${replyTarget.content.substring(0, 40)}..." — ${input}`
          : input,
        subscription_tier: isAdmin ? 'Founder' : (vault?.standing || 'Seedling'),
        is_bot: false,
      });
      setInput('');
      setReplyTarget(null);
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const allPosts = [FIXED_STARTER, THE_SPARK, ...posts];

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] overflow-hidden relative border border-white/5 shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-36">
        {allPosts.map((msg, idx) => {
          const isOwn = msg.author_email === vault?.email;
          const isSpark = msg.author_email === 'spark@hearth.io';

          return (
            <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isSpark ? 'text-teal-400 animate-pulse' : 'text-zinc-500'}`}>
                   {isSpark && <Zap size={8} className="inline mr-1 mb-0.5" />}
                   {msg.author_name}
                </span>
                <TierBadge tier={msg.subscription_tier} />
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl border transition-all ${
                isOwn ? 'bg-teal-500/10 border-teal-500/20 text-white' : 
                isSpark ? 'bg-gradient-to-br from-teal-500/20 to-purple-500/20 border-teal-500/30 text-teal-50 shadow-[0_0_20px_rgba(20,184,166,0.15)]' :
                'bg-white/5 border-white/5 text-zinc-300'
              }`}>
                <p className={`text-sm leading-relaxed ${isSpark ? 'font-medium italic' : ''}`}>{msg.content}</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button onClick={() => setReplyTarget(msg)} className="text-[9px] font-black text-zinc-600 hover:text-teal-400 uppercase tracking-widest transition-colors">Reply</button>
                <EmberReactions />
              </div>
            </motion.div>
          );
        })}
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5 z-50">
        <AnimatePresence>
          {replyTarget && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-3 p-3 bg-teal-500/5 border border-teal-500/20 rounded-xl flex justify-between items-center">
              <div className="text-xs text-zinc-400 italic">Replying to <span className="text-teal-400 font-bold">{replyTarget.author_name}</span></div>
              <button onClick={() => setReplyTarget(null)}><X size={14} className="text-zinc-500" /></button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add to the glow..."
            className="flex-1 bg-white/5 border-white/10 h-14 rounded-2xl text-white"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input.trim() || sending} className="w-14 h-14 bg-teal-500 text-black rounded-2xl shadow-lg shadow-teal-500/20">
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
        <p className="text-[8px] text-center text-zinc-700 font-bold uppercase tracking-[0.3em] mt-3">{TOS_TEXT}</p>
      </footer>
    </div>
  );
}