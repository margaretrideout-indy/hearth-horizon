import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Flame, Send, Sparkles, Loader2, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break.";

export default function EmbersChat() {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();

  // 1. Fetch Auth User
  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => base44.auth.me() 
  });

  // 2. Fetch Live Database Posts
  const { data: remotePosts = [], isLoading } = useQuery({
    queryKey: ['emberPosts'],
    queryFn: () => base44.entities.EmberPost.list('created_date', 50),
    refetchInterval: 10000,
  });

  // 3. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [remotePosts]);

  const handleSend = async () => {
    if (!input.trim() || !user || sending) return;
    setSending(true);
    
    try {
      await base44.entities.EmberPost.create({
        author_name: user.full_name || user.email.split('@')[0],
        author_email: user.email,
        content: input.trim(),
        is_pinned: false,
        subscription_tier: user.subscription_tier || 'Seedling',
        is_founding_member: user.is_founding_member || false,
      });
      queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
      setInput('');
    } catch (e) {
      console.error("Failed to send spark:", e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1423] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      {/* Header Area */}
      <div className="px-6 py-4 border-b border-white/5 bg-[#251D2F]/30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-teal-400" />
          <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">The Embers</h2>
        </div>
        <span className="text-[9px] font-black text-teal-500/50 uppercase tracking-widest animate-pulse">
          Live Fire
        </span>
      </div>

      {/* Message Feed */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {remotePosts.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20"
            >
              <Flame className="w-10 h-10 text-slate-500 mb-4" />
              <p className="text-sm font-medium uppercase tracking-widest italic">
                Waiting for the first spark to land...
              </p>
            </motion.div>
          ) : (
            remotePosts.map((msg) => {
              const isOwn = msg.author_email === user?.email;
              const isFounder = msg.author_name?.toLowerCase().includes('margaret') || msg.subscription_tier === 'Founder';

              return (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      {msg.author_name}
                    </span>
                    {isFounder && (
                      <span className="bg-purple-900/30 text-purple-300 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Founder
                      </span>
                    )}
                    {!isFounder && (
                      <span className="bg-teal-900/20 text-teal-500 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-teal-500/20">
                        {msg.subscription_tier || 'Seedling'}
                      </span>
                    )}
                  </div>
                  
                  <div className={`max-w-[85%] p-4 rounded-2xl border transition-all ${
                    isFounder 
                    ? 'bg-[#2D243A] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.05)]' 
                    : isOwn
                    ? 'bg-teal-600/10 border-teal-500/30 text-white'
                    : 'bg-[#251D2F] border-white/5 shadow-md'
                  }`}>
                    <p className="text-slate-200 text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  
                  <span className="text-[9px] text-slate-600 mt-2 px-1 uppercase tracking-tighter">
                    {msg.created_date ? format(new Date(msg.created_date), 'MMM d, h:mm a') : 'Just now'}
                  </span>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#251D2F]/50 border-t border-white/5">
        <div className="relative flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share something with the Hearth..."
            className="w-full bg-[#1A1423] border border-white/10 rounded-2xl px-5 py-4 text-sm text-slate-200 focus:outline-none focus:border-teal-500/50 transition-all placeholder:text-slate-700"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex flex-col items-center mt-4 space-y-1">
          <span className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">Sending to the Fire</span>
          <p className="text-[8px] text-slate-700 italic">{TOS_TEXT}</p>
        </div>
      </div>
    </div>
  );
}