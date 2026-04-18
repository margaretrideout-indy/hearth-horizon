import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain, Heart, RefreshCw } from 'lucide-react';
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

const TierBadge = ({ tier }) => {
  const normalizedTier = tier?.toLowerCase();
  switch (normalizedTier) {
    case 'founder': return <span className="bg-purple-900/40 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1"><Sparkles className="w-2.5 h-2.5" /> Founder</span>;
    case 'hearth': return <Flame className="w-3.5 h-3.5 text-amber-500/90 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />;
    case 'seedling': return <span className="bg-green-900/10 text-green-500/60 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-green-500/10 flex items-center gap-1"><Leaf className="w-2.5 h-2.5" /> Seedling</span>;
    case 'steward': return <span className="bg-slate-800/50 text-slate-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1"><Mountain className="w-2.5 h-2.5 text-teal-500" /> Steward</span>;
    default: return null;
  }
};

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [remotePosts, setRemotePosts] = useState([]);
  const scrollRef = useRef(null);

  // Gesture Values for Pull-to-Refresh
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 60], [0, 1]);
  const rotate = useTransform(y, [0, 100], [0, 360]);

  const B44_PROJECT_ID = window.BASE44_PROJECT_ID || ''; 
  const B44_TOKEN = window.BASE44_API_TOKEN || '';

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
          email: d.email
        }));
        setRemotePosts(mapped.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
      }
    } catch (err) { console.error("Sync failed", err); }
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    
    const tempId = Date.now();
    const messageData = {
      author_name: vault?.name || 'Traveler',
      email: vault?.email || 'anonymous',
      message: input,
      tier: isAdmin ? 'Steward' : (vault?.tier || 'Seedling'),
      timestamp: new Date().toISOString()
    };

    // --- OPTIMISTIC UPDATE ---
    // Instantly add to UI before server confirms
    const optimisticMessage = {
        ...messageData,
        id: tempId,
        content: input,
        subscription_tier: messageData.tier,
        created_date: messageData.timestamp,
        isPending: true
    };

    setRemotePosts(prev => [...prev, optimisticMessage]);
    setInput('');
    scrollToBottom();

    try {
        const response = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${B44_TOKEN}` },
            body: JSON.stringify(messageData)
        });

        if (!response.ok) throw new Error("Failed to send");
        
        // Finalize the message (remove pending state)
        setRemotePosts(prev => prev.map(m => m.id === tempId ? { ...m, isPending: false } : m));
    } catch (err) {
        // Rollback on error
        setRemotePosts(prev => prev.filter(m => m.id !== tempId));
        console.error("Ember flickered out", err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => { scrollToBottom(); }, [remotePosts]);

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] md:rounded-t-[2.5rem] border-white/5 overflow-hidden relative">
      
      {/* PULL TO REFRESH INDICATOR */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute top-4 left-0 w-full flex justify-center z-50 pointer-events-none"
      >
        <motion.div style={{ rotate }} className="bg-teal-500/20 p-2 rounded-full border border-teal-500/40 backdrop-blur-md">
          <RefreshCw size={16} className={`text-teal-400 ${refreshing ? 'animate-spin' : ''}`} />
        </motion.div>
      </motion.div>

      {/* MESSAGES AREA */}
      <motion.div 
        ref={scrollRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={(e, info) => {
            if (info.offset.y > 80) onRefresh();
        }}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scrollbar-hide z-10"
      >
        <div className="space-y-8 pb-10">
            {remotePosts.map((msg) => {
                const isOwn = msg.email === vault?.email;
                return (
                    <motion.div 
                        key={msg.id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 ${isOwn ? 'flex-row-reverse' : ''}`}>
                            {isOwn ? 'You' : msg.author_name}
                            <TierBadge tier={msg.subscription_tier} />
                        </div>
                        <div className={`max-w-[85%] p-4 rounded-2xl border transition-all ${
                            isOwn 
                            ? 'bg-teal-500/10 border-teal-500/20 text-white' 
                            : 'bg-white/[0.03] border-white/5 text-zinc-300'
                        } ${msg.isPending ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                            <p className="text-sm leading-relaxed font-light">{msg.content}</p>
                        </div>
                        <span className="text-[9px] text-zinc-700 mt-2 font-bold">{format(new Date(msg.created_date), 'h:mm a')}</span>
                    </motion.div>
                );
            })}
        </div>
      </motion.div>

      {/* INPUT BAR */}
      <div className="p-4 pb-8 md:pb-12 bg-[#0A080D]/90 backdrop-blur-xl border-t border-white/5">
        <div className="relative flex items-center gap-3 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share an ember..."
            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-teal-500/40 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="bg-teal-500 text-black p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}