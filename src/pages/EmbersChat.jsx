import React, { useState, useEffect, useRef } from 'react';
import { Flame, Loader2, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      try { const me = await base44.auth.me(); setUser(me); } catch (_) {}
      try {
        const data = await base44.entities.EmberPost.list('-created_date', 50);
        setPosts(data.reverse());
      } catch (err) { console.error(err); }
    };
    init();

    try {
      const unsubscribe = base44.entities.EmberPost.subscribe((e) => {
        if (e.type === 'create') setPosts(prev => [...prev, e.data]);
      });
      return unsubscribe;
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [posts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      const me = user || vault;
      const parts = (me?.full_name || me?.email || 'Traveler').split(' ');
      const displayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
      
      await base44.entities.EmberPost.create({
        author_name: displayName,
        author_email: me?.email || '',
        content: input,
        reply_to_id: replyTo?.id || null,
        // Ensure the author name is saved to the record for public display
        reply_to_author: replyTo?.author_name || null
      });
      setInput('');
      setReplyTo(null);
    } catch (err) { console.error(err); } finally { setSending(false); }
  };

  const isLoggedIn = !!(user || vault?.email);

  return (
    <div className="embers-bg relative w-full h-full overflow-hidden text-zinc-400 font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      <header className="absolute top-0 inset-x-0 px-6 pt-10 pb-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-2.5">
          <Flame size={12} className="text-amber-800/50" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">The Embers</span>
        </div>
      </header>

      <div ref={scrollRef} className="h-full overflow-y-auto pt-28 pb-48 custom-scrollbar">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          {posts.map((msg, idx) => (
            <motion.article
              key={msg.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative p-6 rounded-2xl transition-all ${
                msg.reply_to_id ? 'bg-zinc-900/20 border border-amber-900/5 ml-10' : 'bg-transparent'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-amber-700">
                  {msg.author_name.charAt(0)}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                  {msg.author_name}
                </span>
                <span className="text-[9px] text-zinc-700">
                  {msg.created_date && format(new Date(msg.created_date), 'MMM d, h:mm a')}
                </span>
                <button 
                  onClick={() => setReplyTo(msg)}
                  className="ml-auto opacity-0 group-hover:opacity-100 text-[9px] text-amber-800 hover:text-amber-400 transition-opacity"
                >
                  Reply
                </button>
              </div>
              
              <div className="ml-9">
                {/* Always visible to all users */}
                {msg.reply_to_author && (
                  <div className="text-[9px] text-amber-800/70 mb-2 flex items-center gap-1 font-serif italic bg-black/20 w-fit px-2 py-0.5 rounded border border-amber-900/10">
                    <CornerDownRight size={8} /> replying to {msg.reply_to_author}
                  </div>
                )}
                <p className="font-serif italic text-zinc-300 leading-relaxed text-sm">
                  {msg.content}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-0 inset-x-0 bg-[#08070A]/95 backdrop-blur-md border-t border-zinc-900/60 p-4">
        <div className="max-w-2xl mx-auto px-6">
          {!isLoggedIn ? (
            <p className="text-xs font-serif italic text-zinc-700 text-center">
              <button onClick={() => base44.auth.redirectToLogin(window.location.href)} className="text-amber-700 underline">Sign in</button> to share a thought.
            </p>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {replyTo && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[10px] text-amber-900/70 flex justify-between items-center bg-zinc-900/30 p-2 rounded">
                    <span>Replying to {replyTo.author_name}</span>
                    <button onClick={() => setReplyTo(null)} className="hover:text-amber-500">×</button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder={replyTo ? "Share your reply..." : "Share a thought with the Forest…"}
                  className="flex-1 bg-transparent border-none outline-none text-sm font-serif italic text-zinc-300 placeholder:text-zinc-700"
                />
                <button onClick={handleSend} disabled={!input.trim() || sending} className="text-amber-700 hover:text-amber-400 disabled:text-zinc-800">
                  {sending ? <Loader2 size={14} className="animate-spin" /> : <Flame size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}