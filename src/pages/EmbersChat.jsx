import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain, Heart, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, getWeek } from 'date-fns';

// --- STEWARDSHIP: BI-WEEKLY SEASONAL PROMPTS ---
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

// --- COMPONENT: EMBER REACTIONS ---
const EmberReactions = ({ postId }) => {
  const [reactions, setReactions] = useState({ flame: 0, leaf: 0, heart: 0 });

  const addReaction = (type) => {
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <div className="flex gap-2 mt-3 ml-1">
      <button 
        onClick={() => addReaction('flame')} 
        className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 hover:border-orange-500/30 transition-colors group"
      >
        <Flame className={`w-3 h-3 ${reactions.flame > 0 ? 'text-orange-500' : 'text-zinc-600'} group-hover:text-orange-400`} />
        {reactions.flame > 0 && <span className="text-[10px] text-zinc-400 font-bold">{reactions.flame}</span>}
      </button>
      <button 
        onClick={() => addReaction('leaf')} 
        className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 hover:border-green-500/30 transition-colors group"
      >
        <Leaf className={`w-3 h-3 ${reactions.leaf > 0 ? 'text-green-500' : 'text-zinc-600'} group-hover:text-green-400`} />
        {reactions.leaf > 0 && <span className="text-[10px] text-zinc-400 font-bold">{reactions.leaf}</span>}
      </button>
      <button 
        onClick={() => addReaction('heart')} 
        className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors group"
      >
        <Heart className={`w-3 h-3 ${reactions.heart > 0 ? 'text-purple-500' : 'text-zinc-600'} group-hover:text-purple-400`} />
        {reactions.heart > 0 && <span className="text-[10px] text-zinc-400 font-bold">{reactions.heart}</span>}
      </button>
    </div>
  );
};

// --- COMPONENT: TIER BADGES ---
const TierBadge = ({ tier }) => {
  const normalizedTier = tier?.toLowerCase();
  switch (normalizedTier) {
    case 'founder':
      return (
        <span className="bg-purple-900/40 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Sparkles className="w-2.5 h-2.5" /> Founder
        </span>
      );
    case 'hearth':
      return (
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.12, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-5 h-5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500/90 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <div className="absolute inset-0 rounded-full border border-amber-500/20 bg-amber-500/5 shadow-[inset_0_0_4px_rgba(245,158,11,0.1)]" />
          </motion.div>
        </div>
      );
    case 'seedling':
      return (
        <span className="bg-green-900/10 text-green-500/60 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-green-500/10 flex items-center gap-1">
          <Leaf className="w-2.5 h-2.5" /> Seedling
        </span>
      );
    case 'steward':
      return (
        <span className="bg-slate-800/50 text-slate-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
          <Mountain className="w-2.5 h-2.5 text-teal-500" /> Steward
        </span>
      );
    default:
      return null;
  }
};

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [remotePosts, setRemotePosts] = useState([]);
  const scrollRef = useRef(null);

  const B44_PROJECT_ID = window.BASE44_PROJECT_ID || ''; 
  const B44_TOKEN = window.BASE44_API_TOKEN || '';

  // Maintenance: Prompt shifts automatically every 2 weeks
  const promptIndex = Math.floor(getWeek(new Date()) / 2) % HEARTH_PROMPTS.length;
  const currentPrompt = HEARTH_PROMPTS[promptIndex];

  const FIXED_STARTERS = [
    {
      id: 'static-1',
      author_name: 'Margaret (Founder)',
      content: "Welcome to the Hearth. I built this because I know how hard the 'translation' is. You aren't alone here.",
      subscription_tier: 'Founder'
    },
    {
      id: 'seasonal-h-prompt',
      author_name: 'The Hearth',
      content: currentPrompt,
      subscription_tier: 'Hearth'
    }
  ];

  const formatAuthorName = (name) => name?.replace(/\s*\(Founder\)\s*/gi, '') || 'Unknown';

  const scrollToBottom = () => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      });
    }
  };

  // Fetch real messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
          headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Map to match your UI's expected keys
          const mapped = data.documents.map(d => ({
            id: d.id,
            author_name: d.author_name || 'Traveler',
            content: d.message || d.content,
            subscription_tier: d.tier || 'Seedling',
            created_date: d.created_at || d.timestamp,
            email: d.email
          }));
          setRemotePosts(mapped);
        }
      } catch (err) {
        console.error("Chat Load Error:", err);
      }
    };

    fetchMessages();
  }, [B44_PROJECT_ID, B44_TOKEN]);

  useEffect(() => {
    scrollToBottom();
  }, [remotePosts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);

    const messageData = {
        author_name: vault?.name || 'Traveler',
        email: vault?.email || 'anonymous',
        message: input,
        tier: isAdmin ? 'Steward' : (vault?.tier || 'Seedling'),
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${B44_TOKEN}`
            },
            body: JSON.stringify(messageData)
        });

        if (response.ok) {
            setRemotePosts(prev => [...prev, {
                ...messageData,
                id: Date.now(),
                content: input,
                subscription_tier: messageData.tier,
                created_date: messageData.timestamp
            }]);
            setInput('');
        }
    } catch (err) {
        console.error("Ember Failed to Light:", err);
    } finally {
        setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] md:rounded-t-[2.5rem] md:border-x md:border-t border-white/5 overflow-hidden shadow-2xl relative min-h-0 flex-1">
      
      {/* Aurora Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.05),transparent_60%)] pointer-events-none" />
      
      {/* Messages Scroll Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 scrollbar-hide relative z-10 overscroll-contain"
        style={{ scrollbarWidth: 'none' }}
      >
        {FIXED_STARTERS.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start opacity-95 group">
            <div className="flex items-center gap-2 mb-2 ml-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                {formatAuthorName(msg.author_name)}
              </span>
              <TierBadge tier={msg.subscription_tier} />
            </div>
            <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl border transition-all duration-500 ${msg.subscription_tier === 'Founder' ? 'bg-[#1A1423] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]' : 'bg-white/[0.02] border-white/5'}`}>
              <p className="text-zinc-300 text-sm leading-relaxed font-light italic">{msg.content}</p>
            </div>
            <EmberReactions postId={msg.id} />
          </div>
        ))}

        {/* Visual Warmth Divider */}
        <div className="flex items-center gap-4 py-4 opacity-30">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
          <Flame className="w-3 h-3 text-teal-500 animate-pulse" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        {/* Dynamic Posts */}
        <AnimatePresence initial={false}>
          {remotePosts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <Flame className="w-5 h-5 text-zinc-700 animate-pulse" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">The hearth is warm... share a spark.</p>
            </motion.div>
          ) : (
            remotePosts.map((msg) => {
              const isOwn = msg.email === vault?.email;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-2 px-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest ${isOwn ? 'flex-row-reverse' : ''}`}>
                    {isOwn ? 'You' : formatAuthorName(msg.author_name)}
                    <TierBadge tier={msg.subscription_tier} />
                  </div>
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl border transition-all ${isOwn ? 'bg-teal-500/10 border-teal-500/30 text-white shadow-[0_4px_20px_rgba(20,184,166,0.05)]' : 'bg-[#110E16] border-white/5'}`}>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light">{msg.content}</p>
                  </div>
                  <EmberReactions postId={msg.id} />
                  <span className={`text-[9px] text-zinc-700 mt-2 px-1 uppercase tracking-tighter ${isOwn ? 'text-right' : 'text-left'}`}>
                    {msg.created_date ? format(new Date(msg.created_date), 'h:mm a') : 'Now'}
                  </span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Input Bar */}
      <div className="p-4 pb-6 md:pb-10 bg-[#0A080D]/98 backdrop-blur-2xl border-t border-white/5 shrink-0 z-20">
        <div className="relative flex items-center gap-3 max-w-7xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share an ember..."
            className="w-full bg-[#110E16] border border-zinc-800 rounded-2xl px-5 py-4 text-sm text-zinc-300 focus:outline-none focus:border-teal-500/40 transition-all placeholder:text-zinc-700 font-light"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || sending} 
            className="bg-teal-500 hover:bg-teal-400 text-[#0A080D] p-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-teal-500/10 flex items-center justify-center min-w-[56px]"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex flex-col items-center mt-4 space-y-1">
          <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Reciprocity is the fuel</span>
          <p className="text-[8px] text-zinc-700 italic text-center leading-tight max-w-[280px]">{TOS_TEXT}</p>
        </div>
      </div>
    </div>
  );
}