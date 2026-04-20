import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2, Leaf, Heart, X, Quote, MessageSquare, Flame } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

// --- THE GLOW ARCHIVE ---
const GLOW_PROMPTS = [
  "What is one small boundary you set this week that protected your peace?",
  "Identify a 'ghost' in your current role—a task or expectation that no longer serves you. How do we exorcise it?",
  "If your career migration had a soundtrack right now, what's the tempo? Fast and frantic, or a slow, steady climb?",
  "Who is one person in your professional circle that consistently adds 'logs' to your fire? Acknowledge their warmth today.",
  "What does 'enough' look like for you this month? Not 'more,' just 'enough.'",
  "Migration is tiring. Where is your physical sanctuary when the digital world gets too loud?",
  "Recall a moment this week where you chose yourself over a deadline. How did that feel in your body?"
];

// Helper to get a stable prompt based on the week of the year
const getWeeklyPrompt = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek);
  return GLOW_PROMPTS[weekNumber % GLOW_PROMPTS.length];
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
    <div className="flex gap-1.5 mt-2">
      {reactionConfigs.map(({ type, icon: Icon, color, label }) => (
        <button key={type} onClick={(e) => { e.stopPropagation(); react(type); }} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all active:scale-90 group">
          <Icon size={11} className={counts[type] > 0 ? color : 'text-zinc-600 group-hover:text-zinc-400'} />
          {counts[type] > 0 && <span className="text-[10px] text-zinc-400 font-bold">{counts[type]}</span>}
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
    admin: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  };
  const style = configs[t] || 'bg-zinc-800 text-zinc-500 border-white/5';
  const label = t ? (t.charAt(0).toUpperCase() + t.slice(1)) : 'Seedling';
  return <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border tracking-tighter ${style}`}>{label}</span>;
};

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const scrollRef = useRef(null);

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
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [posts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await base44.entities.EmberPost.create({
        author_name: vault?.email?.split('@')[0] || 'Traveler',
        author_email: vault?.email || 'anonymous',
        content: input,
        reply_to_name: replyTarget?.author_name || null,
        reply_to_content: replyTarget?.content || null,
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

  // Injecting the weekly Glow Prompt at the top of the feed
  const activeGlow = {
    id: 'dynamic-glow',
    author_name: 'The Hearth',
    content: getWeeklyPrompt(),
    subscription_tier: 'Admin',
    is_glow: true
  };

  const allPosts = [activeGlow, ...posts];

  return (
    <div className="flex flex-col h-full w-full bg-[#070508] overflow-hidden relative border border-white/5">
      
      {/* CHAT HEADER */}
      <div className="shrink-0 px-6 py-4 border-b border-white/5 bg-[#0A080D]/50 backdrop-blur-md flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Live Collective</span>
        </div>
        <div className="flex items-center gap-2 text-orange-500/80">
          <Flame size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest italic">The Glow is Active</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-44">
        {allPosts.map((msg, idx) => {
          const isOwn = msg.author_email === vault?.email;
          const isGlow = msg.is_glow;

          return (
            <motion.div 
              key={msg.id || idx} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className={`flex flex-col ${isGlow ? 'items-center my-12' : isOwn ? 'items-end' : 'items-start'}`}
            >
              {!isGlow && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{msg.author_name}</span>
                  <TierBadge tier={msg.subscription_tier} />
                </div>
              )}

              <div className={`relative group max-w-[85%] md:max-w-[70%] transition-all ${
                isGlow 
                  ? 'bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 p-8 rounded-[2.5rem] text-center shadow-2xl shadow-orange-500/5' 
                  : isOwn 
                    ? 'bg-teal-500/[0.07] border border-teal-500/20 p-5 rounded-2xl rounded-tr-none text-white' 
                    : 'bg-white/[0.03] border border-white/10 p-5 rounded-2xl rounded-tl-none text-zinc-300'
              }`}>
                {msg.reply_to_name && (
                  <div className="mb-3 pl-3 border-l-2 border-teal-500/30 py-1 opacity-60">
                    <p className="text-[10px] font-bold text-teal-400 uppercase tracking-tighter">@{msg.reply_to_name}</p>
                    <p className="text-[11px] line-clamp-1 italic text-zinc-500">{msg.reply_to_content}</p>
                  </div>
                )}

                {isGlow && <Quote size={20} className="text-orange-500/40 mb-4 mx-auto" />}
                
                <p className={`${isGlow ? 'text-lg font-serif italic text-orange-100' : 'text-sm'} leading-relaxed`}>
                  {msg.content}
                </p>

                {isGlow && (
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="h-[1px] w-12 bg-orange-500/20" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500/60">Weekly Archive</span>
                    <div className="h-[1px] w-12 bg-orange-500/20" />
                  </div>
                )}
              </div>

              {!isGlow && (
                <div className={`flex items-center gap-4 mt-1 px-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                  <button onClick={() => setReplyTarget(msg)} className="flex items-center gap-1 text-[9px] font-black text-zinc-600 hover:text-teal-400 uppercase tracking-widest transition-colors group">
                    <MessageSquare size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    Reply
                  </button>
                  <EmberReactions />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* INPUT FOOTER */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 bg-[#070508]/95 backdrop-blur-2xl border-t border-white/5 z-50">
        <AnimatePresence>
          {replyTarget && (
            <motion.div initial={{ height: 0, opacity: 0, y: 10 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: 10 }} className="mb-4 p-4 bg-teal-500/5 border border-teal-500/20 rounded-2xl flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Replying to {replyTarget.author_name}</span>
                <p className="text-xs text-zinc-500 italic line-clamp-1 max-w-md">"{replyTarget.content}"</p>
              </div>
              <button onClick={() => setReplyTarget(null)} className="p-2 hover:bg-white/5 rounded-full"><X size={16} className="text-zinc-500" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 max-w-5xl mx-auto items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={replyTarget ? "Write your reply..." : "Add to the glow..."}
            className="flex-1 bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-sm min-h-[56px] max-h-32 focus:outline-none focus:border-teal-500/50 transition-all resize-none overflow-hidden"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button onClick={handleSend} disabled={!input.trim() || sending} className="w-14 h-14 shrink-0 bg-teal-500 text-black rounded-2xl shadow-xl shadow-teal-500/10 hover:bg-teal-400">
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
        <p className="text-[8px] text-center text-zinc-600 font-bold uppercase tracking-[0.4em] mt-5 opacity-50">{TOS_TEXT}</p>
      </footer>
    </div>
  );
}