import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain, Heart, RefreshCw, Reply, X, Ghost } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { format, getWeek } from 'date-fns';

const HEARTH_PROMPTS = [
  "What field are you coming from, and what is the one thing you're most looking forward to in your new horizon?",
  "Translation Challenge: How would you describe 'Classroom Management' in a tech interview without using the word 'student'?",
  "The winds are shifting. What is one 'transferable strength' you're leaning on today to stay grounded?",
  "Salary Transparency: Public sector pay scales are rigid, but tech is fluid. What's one question you have about negotiating your worth?",
  "Migration takes courage. Share a small win from your journey this week—no matter how tiny.",
  "Data Check: For those moving into Language Data—what’s a piece of linguistic nuance you think AI currently struggles with?",
  "The Gradebook Reframe: How do you translate 'Grading and Assessment' into 'Quality Assurance' or 'Data Validation'?",
  "Who in this forest can we support today? If you're feeling stuck on a 'translation', share it here."
];

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

// --- COMPONENT: INTENTIONAL REACTIONS ---
const EmberReactions = ({ msgId }) => {
  const [counts, setCounts] = useState({ sparkle: 0, leaf: 0, heart: 0 });
  const react = (type) => setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));

  const reactionConfigs = [
    { type: 'sparkle', icon: Sparkles, color: 'text-teal-400', glow: 'shadow-[0_0_10px_rgba(45,212,191,0.3)]', label: 'Inspired' },
    { type: 'leaf', icon: Leaf, color: 'text-emerald-500', glow: 'shadow-[0_0_10px_rgba(16,185,129,0.3)]', label: 'Growth' },
    { type: 'heart', icon: Heart, color: 'text-rose-500', glow: 'shadow-[0_0_10px_rgba(244,63,94,0.3)]', label: 'Love' },
  ];

  return (
    <div className="flex gap-2 mt-3 ml-1">
      {reactionConfigs.map(({ type, icon: Icon, color, glow, label }) => (
        <motion.button 
          key={type}
          whileTap={{ scale: 0.8 }}
          onClick={() => react(type)} 
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all ${counts[type] > 0 ? glow : ''}`}
          title={label}
        >
          <Icon size={11} className={counts[type] > 0 ? color : 'text-zinc-700'} strokeWidth={3} />
          {counts[type] > 0 && <span className="text-[9px] text-zinc-400 font-black">{counts[type]}</span>}
        </motion.button>
      ))}
    </div>
  );
};

const TierBadge = ({ tier }) => {
  const normalizedTier = tier?.toLowerCase();
  switch (normalizedTier) {
    case 'founder': return <span className="bg-purple-500/10 text-purple-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border border-purple-500/20 flex items-center gap-1.5"><Sparkles className="w-2.5 h-2.5" /> Founder</span>;
    case 'hearth': return <div className="flex items-center gap-1.5 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20"><Flame className="w-3 h-3 text-orange-500 animate-pulse" /> <span className="text-[8px] font-black text-orange-200 uppercase tracking-tighter">System</span></div>;
    case 'seedling': return <span className="bg-emerald-500/5 text-emerald-500/60 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border border-emerald-500/10 flex items-center gap-1"><Leaf className="w-2.5 h-2.5" /> Seedling</span>;
    case 'steward': return <span className="bg-teal-500/10 text-teal-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-lg border border-teal-500/20 flex items-center gap-1"><Mountain className="w-2.5 h-2.5" /> Steward</span>;
    default: return <span className="text-[8px] font-black text-zinc-700 uppercase">Traveler</span>;
  }
};

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
  const rotate = useTransform(y, [0, 100], [0, 360]);

  const B44_PROJECT_ID = window.BASE44_PROJECT_ID || ''; 
  const B44_TOKEN = window.BASE44_API_TOKEN || '';

  const FIXED_STARTERS = [
    {
      id: 'static-founder-welcome',
      author_name: 'Margaret',
      content: "Welcome to the Hearth. I built this because I know how hard the 'translation' is. You aren't alone here. Let's build.",
      subscription_tier: 'Founder',
      email: 'margaretpardy@gmail.com',
      created_date: new Date().toISOString()
    },
    {
      id: 'seasonal-h-prompt',
      author_name: 'The Hearth',
      content: HEARTH_PROMPTS[Math.floor(getWeek(new Date()) / 2) % HEARTH_PROMPTS.length],
      subscription_tier: 'Hearth',
      email: 'system@hearth',
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
        const mapped = data.documents.map(d => ({
          id: d.id,
          author_name: d.author_name || 'Traveler',
          content: d.message || d.content,
          subscription_tier: d.tier || 'Seedling',
          created_date: d.created_at || d.timestamp,
          email: d.email,
          reply_to: d.reply_to
        }));
        const sorted = mapped
          .filter(m => m.email !== 'system@hearth')
          .sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        setRemotePosts(sorted);
      }
    } catch (err) { console.error("Sync failed", err); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    
    setSending(true);
    const tempId = Date.now();
    const messageData = {
      author_name: vault?.name || 'Traveler',
      email: vault?.email || 'anonymous',
      message: input,
      tier: isAdmin ? 'Steward' : (vault?.tier || 'Seedling'),
      timestamp: new Date().toISOString(),
      reply_to: replyTarget ? { author: replyTarget.author_name, content: replyTarget.content } : null
    };

    setRemotePosts(prev => [...prev, { ...messageData, id: tempId, content: input, subscription_tier: messageData.tier, created_date: messageData.timestamp, isPending: true }]);
    setInput('');
    setReplyTarget(null);
    
    try {
      const response = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${B44_TOKEN}` },
        body: JSON.stringify(messageData)
      });
      if (!response.ok) throw new Error();
      setRemotePosts(prev => prev.map(m => m.id === tempId ? { ...m, isPending: false } : m));
    } catch (err) {
      setRemotePosts(prev => prev.filter(m => m.id !== tempId));
    } finally {
      setSending(false);
      setTimeout(scrollToBottom, 50);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const scrollToBottom = () => { 
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    } 
  };

  useEffect(() => { scrollToBottom(); }, [remotePosts]);

  return (
    <div className="flex flex-col h-full w-full bg-[#0D0B14] md:rounded-[3rem] border border-white/5 overflow-hidden relative shadow-2xl">
      
      {/* Pull-to-refresh Indicator */}
      <motion.div style={{ y, opacity }} className="absolute top-6 left-0 w-full flex justify-center z-50 pointer-events-none">
        <motion.div style={{ rotate }} className="bg-teal-500/20 p-3 rounded-full border border-teal-500/40 backdrop-blur-xl shadow-lg">
          <RefreshCw size={18} className={`text-teal-400 ${refreshing ? 'animate-spin' : ''}`} />
        </motion.div>
      </motion.div>

      <motion.div 
        ref={scrollRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={(e, info) => { if (info.offset.y > 100) onRefresh(); }}
        className="flex-1 overflow-y-auto px-6 py-10 space-y-12 scrollbar-hide z-10 touch-pan-y"
      >
        <div className="space-y-12 pb-24">
            {[...FIXED_STARTERS, ...remotePosts].map((msg, idx) => {
                const isOwn = msg.email === vault?.email;
                const isSystem = msg.subscription_tier === 'Hearth';
                
                return (
                    <motion.div 
                        key={msg.id || idx} 
                        initial={{ opacity: 0, x: isOwn ? 20 : -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className={`flex flex-col group ${isOwn ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`flex items-center gap-3 mb-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 ${isOwn ? 'flex-row-reverse' : ''}`}>
                            <span className={isOwn ? 'text-teal-500' : 'text-zinc-400'}>{isOwn ? 'Me' : msg.author_name}</span>
                            <TierBadge tier={msg.subscription_tier} />
                            {!isOwn && !isSystem && (
                              <button 
                                onClick={() => {
                                    setReplyTarget(msg);
                                    inputRef.current?.focus();
                                }} 
                                className="opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1.5 text-zinc-500 hover:text-teal-400"
                              >
                                <Reply size={10} /> <span className="tracking-tighter">REPLY</span>
                              </button>
                            )}
                        </div>

                        {msg.reply_to && (
                          <div className={`mb-2 px-4 py-2 border-l border-white/10 text-[10px] text-zinc-500 italic bg-white/[0.01] rounded-r-xl max-w-[80%] ${isOwn ? 'text-right mr-2' : 'ml-2'}`}>
                            <span className="font-bold text-zinc-600 mr-2">{msg.reply_to.author}</span>
                            <span className="opacity-60">"{msg.reply_to.content.substring(0, 50)}..."</span>
                          </div>
                        )}

                        <div className={`max-w-[85%] p-5 rounded-[1.8rem] border transition-all duration-500 ${
                            isOwn ? 'bg-teal-500/10 border-teal-500/30 text-zinc-100 shadow-[0_10px_30px_rgba(20,184,166,0.05)]' 
                            : isSystem ? 'bg-[#1C1622] border-orange-500/20 italic shadow-inner text-orange-100/80 leading-relaxed' 
                            : 'bg-white/[0.03] border-white/5 text-zinc-400'
                        } ${msg.isPending ? 'animate-pulse grayscale' : ''}`}>
                            <p className="text-[15px] leading-relaxed font-serif tracking-tight">{msg.content}</p>
                        </div>
                        
                        {!isSystem && <EmberReactions msgId={msg.id} />}
                        
                        <span className="text-[8px] text-zinc-800 mt-3 font-black uppercase tracking-[0.2em]">
                          {format(new Date(msg.created_date), 'h:mm a')}
                        </span>
                    </motion.div>
                );
            })}
        </div>
      </motion.div>

      {/* Input bar with Floating Reply Preview */}
      <footer className="p-6 md:p-10 bg-[#0D0B14]/95 backdrop-blur-3xl border-t border-white/5 relative z-30">
        <AnimatePresence>
          {replyTarget && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: 20, opacity: 0 }} 
                className="absolute bottom-full left-0 w-full p-6 bg-[#16121D] border-t border-teal-500/30 flex items-center justify-between shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400"><Reply size={14} /></div>
                <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-black tracking-widest text-teal-500/60">Responding to</span>
                    <span className="text-zinc-200 font-serif italic text-sm">{replyTarget.author_name}</span>
                </div>
              </div>
              <button 
                onClick={() => setReplyTarget(null)} 
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center gap-4 max-w-5xl mx-auto">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={replyTarget ? `Message ${replyTarget.author_name}...` : "Release an ember..."}
            className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] px-8 py-5 text-base text-white focus:outline-none focus:border-teal-500/30 transition-all placeholder:text-zinc-800 shadow-inner"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || sending} 
            className="w-16 h-16 shrink-0 bg-teal-500 text-black flex items-center justify-center rounded-[1.5rem] hover:bg-teal-400 active:scale-90 transition-all disabled:opacity-30 shadow-[0_10px_40px_rgba(20,184,166,0.3)]"
          >
            {sending ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
           <p className="text-[9px] text-zinc-800 italic text-center max-w-[320px] leading-relaxed uppercase tracking-[0.3em] font-bold border-t border-white/5 pt-4">
              {TOS_TEXT}
           </p>
        </div>
      </footer>
    </div>
  );
}