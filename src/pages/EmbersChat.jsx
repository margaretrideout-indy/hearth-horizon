import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

// Mock base44 for standalone preview
const base44 = {
  auth: { me: async () => ({ full_name: 'Margaret (Founder)', email: 'margaret@thehearth.com', subscription_tier: 'Founder' }) },
  entities: { EmberPost: { list: async () => [], create: async () => ({}) } }
};

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

const FIXED_STARTERS = [
  {
    id: 'static-1',
    author_name: 'Margaret (Founder)',
    content: "Welcome to the Hearth. I built this because I know how hard the 'translation' is. You aren't alone here.",
    subscription_tier: 'Founder'
  },
  {
    id: 'static-2',
    author_name: 'The Hearth',
    content: "What field are you coming from, and what is the one thing you're most looking forward to in your new horizon?",
    subscription_tier: 'Seedling'
  }
];

const TierBadge = ({ tier }) => {
  switch (tier) {
    case 'Founder':
      return (
        <span className="bg-purple-900/40 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <Sparkles className="w-2.5 h-2.5" /> Founder
        </span>
      );
    case 'Lightkeeper':
      return (
        <div className="flex flex-col items-start gap-1">
          <span className="bg-teal-500/20 text-teal-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-400/40 flex items-center gap-1 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Heart className="w-2.5 h-2.5 fill-current" /> Lightkeeper
          </span>
          <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest ml-1 hidden sm:inline">Reciprocity Partner</span>
        </div>
      );
    case 'Steward':
      return (
        <span className="bg-slate-800/50 text-slate-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
          <Mountain className="w-2.5 h-2.5 text-teal-500" /> Steward
        </span>
      );
    case 'Hearthkeeper':
      return (
        <span className="bg-teal-900/20 text-teal-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1">
          <Flame className="w-2.5 h-2.5" /> Hearthkeeper
        </span>
      );
    case 'Seedling':
      return (
        <span className="bg-green-900/10 text-green-500/60 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-green-500/10 flex items-center gap-1">
          <Leaf className="w-2.5 h-2.5" /> Seedling
        </span>
      );
    default:
      return null;
  }
};

export default function EmbersChat() {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [remotePosts, setRemotePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [remotePosts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    setTimeout(() => {
      setRemotePosts(prev => [...prev, {
        id: Date.now(),
        author_name: 'You',
        author_email: 'user@example.com',
        content: input,
        subscription_tier: 'Seedling',
        created_date: new Date().toISOString()
      }]);
      setInput('');
      setSending(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0A080D] md:rounded-t-[2.5rem] md:border-x md:border-t border-white/5 overflow-hidden shadow-2xl relative min-h-0 flex-1">
      
      {/* Aurora Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-10%,rgba(20,184,166,0.05),transparent_60%)] pointer-events-none" />
      
      {/* Messages Container */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 space-y-6 md:space-y-8 scroll-smooth scrollbar-hide relative z-10 overscroll-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {FIXED_STARTERS.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start opacity-90">
            <div className="flex items-center gap-2 mb-2 ml-1">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                {formatAuthorName(msg.author_name)}
              </span>
              <TierBadge tier={msg.subscription_tier} />
            </div>
            <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl border ${msg.subscription_tier === 'Founder' ? 'bg-[#1A1423] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]' : 'bg-white/[0.02] border-white/5'}`}>
              <p className="text-zinc-300 text-sm leading-relaxed font-light italic">{msg.content}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 py-4 opacity-30">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
          <Flame className="w-3 h-3 text-teal-500 animate-pulse" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>

        <AnimatePresence initial={false}>
          {remotePosts.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-8 md:py-12 text-center flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <Flame className="w-5 h-5 text-zinc-600 animate-pulse" />
              </div>
              <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 px-4 text-center">
                The hearth is warm... be the first to share a spark.
              </p>
            </motion.div>
          ) : (
            remotePosts.map((msg) => {
              const isOwn = msg.author_name === 'You';
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-2 px-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    {formatAuthorName(msg.author_name)}
                    <TierBadge tier={msg.subscription_tier} />
                  </div>
                  <div className={`max-w-[90%] md:max-w-[85%] p-4 rounded-2xl border transition-all ${isOwn ? 'bg-teal-500/10 border-teal-500/30 text-white shadow-[0_4px_20px_rgba(20,184,166,0.05)]' : 'bg-[#110E16] border-white/5'}`}>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light">{msg.content}</p>
                  </div>
                  <span className="text-[9px] text-zinc-700 mt-2 px-1 uppercase tracking-tighter">
                    {msg.created_date ? format(new Date(msg.created_date), 'h:mm a') : 'Now'}
                  </span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 pb-6 md:pb-8 lg:pb-10 bg-[#0A080D]/95 backdrop-blur-xl border-t border-white/5 shrink-0 z-20">
        <div className="relative flex items-center gap-2 md:gap-3 max-w-7xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share an ember..."
            className="w-full bg-[#110E16] border border-zinc-800 rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 text-base md:text-sm text-zinc-300 focus:outline-none focus:border-teal-500/40 transition-all placeholder:text-zinc-700 font-light"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || sending} 
            className="bg-teal-500 hover:bg-teal-400 text-[#0A080D] p-3 md:p-4 rounded-xl md:rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-teal-500/10 flex items-center justify-center min-w-[48px] md:min-w-[56px]"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex flex-col items-center mt-3 md:mt-4 space-y-1">
          <span className="text-[8px] md:text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Reciprocity is the fuel</span>
          <p className="text-[7px] md:text-[8px] text-zinc-700 italic text-center leading-tight max-w-[200px] md:max-w-[250px]">{TOS_TEXT}</p>
        </div>
      </div>
    </div>
  );
}