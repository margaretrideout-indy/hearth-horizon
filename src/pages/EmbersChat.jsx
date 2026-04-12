import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles, Loader2, Leaf, Mountain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

// Mock base44 for standalone preview - in production this uses your actual client
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
        <span className="bg-purple-900/30 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> Founder
        </span>
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
  const [user, setUser] = useState(null);
  const [remotePosts, setRemotePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Clean name logic
  const formatAuthorName = (name) => name?.replace(/\s*\(Founder\)\s*/gi, '') || 'Unknown';

  // Scroll to bottom helper with safety check
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
    // Simulation of send logic
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
    <div className="flex flex-col h-screen max-h-[100dvh] bg-[#1A1423] md:rounded-[2.5rem] md:border border-white/5 overflow-hidden shadow-2xl relative">
      
      {/* Message Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8 scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {FIXED_STARTERS.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start opacity-90">
            <div className="flex items-center gap-2 mb-2 ml-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {formatAuthorName(msg.author_name)}
              </span>
              <TierBadge tier={msg.subscription_tier} />
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl border ${msg.subscription_tier === 'Founder' ? 'bg-[#2D243A] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]' : 'bg-white/[0.03] border-white/10'}`}>
              <p className="text-slate-200 text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 py-2 opacity-10">
          <div className="flex-1 h-px bg-white" />
          <Flame className="w-3 h-3 text-white" />
          <div className="flex-1 h-px bg-white" />
        </div>

        <AnimatePresence initial={false}>
          {remotePosts.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-12 text-center flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <Flame className="w-5 h-5 text-slate-600 animate-pulse" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                The hearth is warm... be the first to share a spark.
              </p>
            </motion.div>
          ) : (
            remotePosts.map((msg) => {
              const isOwn = msg.author_name === 'You';
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-2 px-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {formatAuthorName(msg.author_name)}
                    <TierBadge tier={msg.subscription_tier} />
                  </div>
                  <div className={`max-w-[85%] p-4 rounded-2xl border transition-all ${isOwn ? 'bg-teal-600/10 border-teal-500/30 text-white shadow-[0_4px_20px_rgba(20,184,166,0.05)]' : 'bg-[#251D2F] border-white/5'}`}>
                    <p className="text-slate-200 text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="text-[9px] text-slate-700 mt-2 px-1 uppercase tracking-tighter">
                    {msg.created_date ? format(new Date(msg.created_date), 'h:mm a') : 'Now'}
                  </span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-[#251D2F]/80 backdrop-blur-xl border-t border-white/5 shrink-0">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share an ember..."
            className="w-full bg-[#1A1423] border border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-slate-800"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || sending} 
            className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-teal-900/20 flex items-center justify-center min-w-[56px]"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex flex-col items-center mt-4 space-y-1">
          <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">Reciprocity is the fuel</span>
          <p className="text-[8px] text-slate-700 italic text-center leading-tight max-w-[250px]">{TOS_TEXT}</p>
        </div>
      </div>
    </div>
  );
}