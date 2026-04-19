import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain, Heart, RefreshCw, Reply, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { format, getWeek } from 'date-fns';

const HEARTH_PROMPTS = [
  "What field are you coming from, and what is the one thing you're most looking forward to in your new horizon?",
  "Translation Challenge: How would you describe your most complex daily task in your current role to someone in tech?",
  "The winds are shifting. What is one 'transferable strength' you're leaning on today to stay grounded?",
  "Salary Transparency: Transitioning often means shifting pay structures. What's one question you have about negotiating your worth?",
  "Migration takes courage. Share a small win from your journey this week—no matter how tiny.",
  "Data Check: How do you think your industry's specific knowledge could improve the way AI handles problems?",
  "The Role Reframe: How do you translate your current job title into 'Solutions Architecture' or 'Project Management'?",
  "Who in this forest can we support today? If you're feeling stuck on a 'translation', share it here."
];

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

const EmberReactions = ({ msgId }) => {
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
  const normalizedTier = tier?.toLowerCase();
  switch (normalizedTier) {
    case 'founder': return <Badge color="bg-purple-500/20 text-purple-400 border-purple-500/30">Founder</Badge>;
    case 'steward': return <Badge color="bg-teal-500/20 text-teal-400 border-teal-500/30">Steward</Badge>;
    case 'hearthkeeper': return <Badge color="bg-orange-500/20 text-orange-400 border-orange-500/30">Hearthkeeper</Badge>;
    default: return <Badge color="bg-zinc-800 text-zinc-500 border-white/5">Seedling</Badge>;
  }
};

const Badge = ({ children, color }) => (
  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${color}`}>{children}</span>
);

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [remotePosts, setRemotePosts] = useState([]);
  const [replyTarget, setReplyTarget] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 60], [0, 1]);

  const B44_PROJECT_ID = import.meta.env.VITE_BASE44_PROJECT_ID || window.BASE44_PROJECT_ID;
  const B44_TOKEN = import.meta.env.VITE_BASE44_API_TOKEN || window.BASE44_API_TOKEN;

  const FIXED_STARTERS = [
    {
      id: 'static-founder-welcome',
      author_name: 'Margaret',
      content: "Welcome to the Hearth. This is our shared space to navigate the shifting winds of career migration.",
      subscription_tier: 'Founder',
      email: 'founder@hearth.io',
      created_date: new Date().toISOString()
    }
  ];

  const fetchMessages = async () => {
    try {
      const res = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
        headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
      });
      if (res.ok) {
        const data = await res.json();
        const mapped = data.documents.map((d) => ({
          id: d.id,
          author_name: d.author_name || 'Traveler',
          content: d.message || d.content,
          subscription_tier: d.tier || 'Seedling',
          created_date: d.created_at || d.timestamp || new Date().toISOString(),
          email: d.email,
          reply_to: d.reply_to
        }));
        setRemotePosts(mapped.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
      }
    } catch (err) { console.error("Sync failed", err); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    const messageData = {
      author_name: vault?.email?.split('@')[0] || 'Traveler',
      email: vault?.email || 'anonymous',
      message: input,
      tier: isAdmin ? 'Steward' : vault?.tier || 'Seedling',
      timestamp: new Date().toISOString(),
      reply_to: replyTarget ? { author: replyTarget.author_name, content: replyTarget.content } : null
    };

    try {
      const response = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${B44_TOKEN}` },
        body: JSON.stringify(messageData)
      });
      if (response.ok) {
        setInput('');
        setReplyTarget(null);
        fetchMessages();
      }
    } catch (err) { console.error(err); }
    finally { setSending(false); }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] md:rounded-t-[2.5rem] overflow-hidden relative border border-white/5 shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-32">
        {[...FIXED_STARTERS, ...remotePosts].map((msg, idx) => {
          const isOwn = msg.email === vault?.email;
          return (
            <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{msg.author_name}</span>
                <TierBadge tier={msg.subscription_tier} />
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl border ${isOwn ? 'bg-teal-500/10 border-teal-500/20 text-white' : 'bg-white/5 border-white/5 text-zinc-300'}`}>
                {msg.reply_to && (
                  <div className="mb-2 p-2 bg-black/20 rounded-lg border-l-2 border-teal-500/50 text-[10px] italic text-zinc-500">
                    {msg.reply_to.author}: {msg.reply_to.content.substring(0, 30)}...
                  </div>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button onClick={() => setReplyTarget(msg)} className="text-[9px] font-black text-zinc-600 hover:text-teal-400 uppercase tracking-widest transition-colors">Reply</button>
                <EmberReactions msgId={msg.id} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-4 bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5 z-50">
        <AnimatePresence>
          {replyTarget && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-4 p-3 bg-teal-500/5 border border-teal-500/20 rounded-xl flex justify-between items-center">
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
            className="flex-1 bg-white/5 border-white/10 h-14 rounded-2xl" 
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input.trim() || sending} className="w-14 h-14 bg-teal-500 text-black rounded-2xl shadow-lg shadow-teal-500/20">
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </Button>
        </div>
        <p className="text-[8px] text-center text-zinc-700 font-bold uppercase tracking-[0.3em] mt-4">{TOS_TEXT}</p>
      </footer>
    </div>
  );
}