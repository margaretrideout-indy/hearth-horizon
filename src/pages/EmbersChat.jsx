import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2, Leaf, Heart, X, MessageSquare, Flame, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

const GLOW_PROMPTS = [
  "What is one small boundary you set this week that protected your peace?",
  "Identify a 'ghost' in your current role—a task or expectation that no longer serves you.",
  "If your career migration had a soundtrack right now, what's the tempo?",
  "Who is one person in your circle that consistently adds 'logs' to your fire?",
  "What does 'enough' look like for you this month? Not 'more,' just 'enough.'",
  "Where is your physical sanctuary when the digital world gets too loud?",
  "Recall a moment this week where you chose yourself over a deadline."
];

const getWeeklyPrompt = () => {
  const now = new Date();
  const weekNumber = Math.floor(now.getDate() / 7);
  return GLOW_PROMPTS[weekNumber % GLOW_PROMPTS.length];
};

const EmberReactions = () => {
  const [counts, setCounts] = useState({ sparkle: 0, leaf: 0, heart: 0 });
  const react = (type) => setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  
  const configs = [
    { type: 'sparkle', icon: Sparkles, color: 'text-teal-400' },
    { type: 'leaf', icon: Leaf, color: 'text-green-500' },
    { type: 'heart', icon: Heart, color: 'text-rose-500' }
  ];

  return (
    <div className="flex gap-1.5 mt-2">
      {configs.map(({ type, icon: Icon, color }) => {
        const hasVotes = counts[type] > 0;
        return (
          <button 
            key={type} 
            onClick={(e) => { e.stopPropagation(); react(type); }} 
            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all active:scale-90 group"
          >
            <Icon 
              size={10} 
              className={`transition-all duration-300 ${
                hasVotes ? `${color} opacity-100 scale-110` : 'text-zinc-400 opacity-30 group-hover:opacity-70'
              }`} 
            />
            {hasVotes && <span className={`text-[9px] font-bold ${color}`}>{counts[type]}</span>}
          </button>
        );
      })}
    </div>
  );
};

const TierBadge = ({ tier }) => {
  const t = tier?.toLowerCase();
  const isAdminTier = t === 'founder' || t === 'admin' || t === 'hearth';
  return (
    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${
      isAdminTier ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-zinc-800 text-zinc-500 border-white/5'
    }`}>
      {isAdminTier && <Crown size={8} />}
      {t || 'Seedling'}
    </span>
  );
};

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const scrollRef = useRef(null);

  const fetchPosts = async () => {
    try {
      // Ensure your base44 entity name is exactly "EmberPost"
      const data = await base44.entities.EmberPost.list('-created_date', 50);
      setPosts(data.reverse());
    } catch (err) { 
      console.error("Base44 Fetch Error:", err); 
    }
  };

  useEffect(() => {
    fetchPosts();
    // Real-time subscription
    try {
      const unsubscribe = base44.entities.EmberPost.subscribe((e) => {
        if (e.type === 'create') setPosts(prev => [...prev, e.data]);
      });
      return unsubscribe;
    } catch (err) {
      console.error("Base44 Subscription Error:", err);
    }
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
        created_date: new Date().toISOString()
      });
      setInput('');
      setReplyTarget(null);
    } catch (err) { 
      console.error("Base44 Send Error:", err); 
    } finally { 
      setSending(false); 
    }
  };

  const STATIC_POSTS = [
    { id: 'glow', is_glow: true, content: getWeeklyPrompt(), author_name: 'The Glow', subscription_tier: 'Prompt' },
    { id: 'welcome', author_name: 'Margaret', subscription_tier: 'Founder', content: "Welcome to the Embers Chat. This is our shared space to navigate the shifting winds of career migration. How are you arriving today?", author_email: 'founder@hearth.io' }
  ];

  const allMessages = [...STATIC_POSTS, ...posts];

  return (
    <div className="flex flex-col h-full w-full bg-[#070508] border border-white/5 overflow-hidden relative">
      
      {/* HEADER & LEGEND */}
      <div className="p-4 border-b border-white/5 bg-[#0A080D]/80 backdrop-blur-md shrink-0 z-20">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Embers Feed</span>
          </div>
          <Flame size={14} className="text-orange-500" />
        </div>
        <div className="flex items-center gap-4 border-t border-white/5 pt-3">
          <div className="flex items-center gap-1.5 opacity-50">
            <Sparkles size={10} className="text-teal-400" />
            <span className="text-[9px] uppercase font-bold tracking-tighter text-zinc-400">Inspiration</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-50">
            <Leaf size={10} className="text-green-500" />
            <span className="text-[9px] uppercase font-bold tracking-tighter text-zinc-400">Growth</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-50">
            <Heart size={10} className="text-rose-500" />
            <span className="text-[9px] uppercase font-bold tracking-tighter text-zinc-400">Connection</span>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-40">
        {allMessages.map((msg, idx) => {
          const isHearth = msg.subscription_tier?.toLowerCase() === 'hearth';
          const isFounder = msg.subscription_tier?.toLowerCase() === 'founder';
          const isOwn = msg.author_email === vault?.email;

          return (
            <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
              
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isFounder ? 'text-purple-400' : isHearth ? 'text-orange-400' : 'text-zinc-500'}`}>
                  {msg.author_name}
                </span>
                <TierBadge tier={msg.subscription_tier} />
              </div>

              <div className={`relative max-w-[85%] p-4 rounded-2xl transition-all border ${
                isHearth ? 'bg-orange-500/[0.03] border-orange-500/20 text-orange-50' :
                isFounder ? 'bg-purple-500/[0.03] border-purple-500/20 text-zinc-200' :
                isOwn ? 'bg-teal-500/[0.07] border-teal-500/20 text-white' : 
                'bg-white/[0.03] border-white/10 text-zinc-300'
              }`}>
                {msg.reply_to_name && (
                  <div className="mb-2 pl-2 border-l border-teal-500/30 opacity-60 text-[11px] italic">
                    <span className="font-bold not-italic text-teal-400">@{msg.reply_to_name}:</span> {msg.reply_to_content}
                  </div>
                )}
                <p className={`text-sm leading-relaxed ${isHearth ? 'font-serif italic' : ''}`}>
                  {msg.content}
                </p>
              </div>

              <div className={`flex items-center gap-3 mt-1 px-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setReplyTarget(msg)} className="text-[9px] font-black text-zinc-600 hover:text-teal-400 uppercase tracking-widest transition-colors flex items-center gap-1">
                  <MessageSquare size={10} /> Reply
                </button>
                <EmberReactions />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 bg-[#070508]/95 backdrop-blur-xl border-t border-white/5 z-50">
        <AnimatePresence>
          {replyTarget && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-3 p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center text-xs">
              <span className="text-zinc-500 italic">Replying to <b className="text-teal-500 not-italic">@{replyTarget.author_name}</b></span>
              <button onClick={() => setReplyTarget(null)}><X size={14} className="text-zinc-600"/></button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2 max-w-5xl mx-auto">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={replyTarget ? `Reply to ${replyTarget.author_name}...` : "Add to the embers..."} 
            className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-0 focus-visible:border-teal-500/50" 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
          />
          <Button onClick={handleSend} disabled={!input.trim() || sending} className="h-12 w-12 bg-teal-500 text-black rounded-xl hover:bg-teal-400 transition-all">
            {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </Button>
        </div>
        <p className="text-[8px] text-center text-zinc-700 font-bold uppercase tracking-[0.4em] mt-5 opacity-40">{TOS_TEXT}</p>
      </footer>
    </div>
  );
}