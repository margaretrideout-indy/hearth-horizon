import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Flame, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

const PINNED_MESSAGES = [
  {
    id: 'founder-welcome',
    author_name: 'Margaret (Founder)',
    content: "Welcome to the Hearth. I built this because I know how hard the 'translation' is. You aren't alone here.",
    subscription_tier: 'Founder',
    is_pinned: true
  },
  {
    id: 'hearth-prompt',
    author_name: 'The Hearth',
    content: "What field are you coming from, and what is the one thing you're most looking forward to in your new horizon?",
    subscription_tier: 'Seedling',
    is_pinned: true
  }
];

export default function EmbersChat() {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  
  const { data: remotePosts = [], isLoading } = useQuery({
    queryKey: ['emberPosts'],
    queryFn: () => base44.entities.EmberPost.list('created_date', 50),
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [remotePosts, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || !user || sending) return;
    setSending(true);
    try {
      await base44.entities.EmberPost.create({
        author_name: user.full_name || user.email.split('@')[0],
        author_email: user.email,
        content: input.trim(),
        subscription_tier: user.subscription_tier || 'Seedling',
        is_founding_member: user.is_founding_member || false,
      });
      queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
      setInput('');
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1423] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Pinned Essentials */}
        {PINNED_MESSAGES.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start opacity-90">
            <div className="flex items-center gap-2 mb-2 ml-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{msg.author_name}</span>
              {msg.subscription_tier === 'Founder' && (
                <span className="bg-purple-900/30 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Founder
                </span>
              )}
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl border ${msg.subscription_tier === 'Founder' ? 'bg-[#2D243A] border-purple-500/30' : 'bg-white/[0.03] border-white/10'}`}>
              <p className="text-slate-200 text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 py-2 opacity-20">
          <div className="flex-1 h-px bg-white" />
          <Flame className="w-3 h-3 text-white" />
          <div className="flex-1 h-px bg-white" />
        </div>

        {/* Live Feed */}
        <AnimatePresence initial={false}>
          {remotePosts.map((msg) => {
            const isOwn = msg.author_email === user?.email;
            const isFounder = msg.subscription_tier === 'Founder';
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-2 px-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {msg.author_name}
                  {!isFounder && <span className="text-teal-500/50">· {msg.subscription_tier}</span>}
                </div>
                <div className={`max-w-[85%] p-4 rounded-2xl border transition-all ${isOwn ? 'bg-teal-600/10 border-teal-500/30 text-white' : 'bg-[#251D2F] border-white/5'}`}>
                  <p className="text-slate-200 text-sm leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-[9px] text-slate-700 mt-2 px-1 uppercase">{format(new Date(msg.created_date), 'h:mm a')}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-[#251D2F]/50 border-t border-white/5">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share something with the Hearth..."
            className="w-full bg-[#1A1423] border border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-teal-500/50 placeholder:text-slate-700"
          />
          <button onClick={handleSend} disabled={!input.trim() || sending} className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50">
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-tighter mt-4 italic">{TOS_TEXT}</p>
      </div>
    </div>
  );
}