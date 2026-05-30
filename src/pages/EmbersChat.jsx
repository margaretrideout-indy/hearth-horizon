import React, { useState, useEffect, useRef } from 'react';
import { Flame, Loader2, CornerDownRight, Trash, Edit2, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    const init = async () => {
      try { const me = await base44.auth.me(); setUser(me); } catch (_) {}
      try {
        const data = await base44.entities.EmberPost.list('-created_date', 50);
        setPosts(data.reverse());
      } catch (err) { console.error(err); }
    };
    init();
    const unsub = base44.entities.EmberPost.subscribe((e) => {
      if (e.type === 'create') setPosts(prev => [...prev, e.data]);
      if (e.type === 'delete') setPosts(prev => prev.filter(p => p.id !== e.data.id));
      if (e.type === 'update') setPosts(prev => prev.map(p => p.id === e.data.id ? e.data : p));
    });
    return unsub;
  }, []);

  useEffect(() => { scrollToBottom(); }, [posts]);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    const me = user || vault;
    const parts = (me?.full_name || me?.email || 'Traveler').split(' ');
    const displayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    await base44.entities.EmberPost.create({
      author_name: displayName,
      author_email: me?.email || '',
      content: input,
      reply_to_id: replyTo?.id || null,
      reply_to_author: replyTo?.author_name || null
    });
    setInput('');
    setReplyTo(null);
    setSending(false);
  };

  const handleEdit = async (id) => {
    if (!editInput.trim()) return;
    await base44.entities.EmberPost.update(id, { content: editInput });
    setEditingId(null);
    setEditInput('');
  };

  const deletePost = async (id) => {
    if (window.confirm('Remove this ember from the fire?')) {
      await base44.entities.EmberPost.delete(id);
    }
  };

  const isLoggedIn = !!(user || vault?.email);

  return (
    <div className="embers-bg relative w-full h-full overflow-hidden text-zinc-400 font-sans">
      {/* Campfire glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-20"
          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(245,158,11,0.3), rgba(239,68,68,0.1) 40%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="absolute top-0 inset-x-0 px-6 pt-10 pb-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-2.5">
          <Flame size={12} className="text-amber-700/60" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">The Embers</span>
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="h-full overflow-y-auto pt-28 pb-44 custom-scrollbar">
        <div className="max-w-2xl mx-auto px-6 space-y-1">
          {posts.map((msg) => (
            <motion.article
              layout
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`group relative p-5 rounded-xl transition-all duration-200
                hover:bg-amber-900/5 hover:shadow-[0_0_24px_rgba(245,158,11,0.06)]
                ${msg.reply_to_id ? 'ml-8 border-l-2 border-amber-900/20 pl-6' : ''}`}
            >
              {/* Author row */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-amber-950/30 border border-amber-900/20 flex items-center justify-center text-[10px] text-amber-600 font-bold shrink-0">
                  {msg.author_name.charAt(0)}
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{msg.author_name}</span>
                <span className="text-[9px] text-zinc-800">
                  {msg.created_date && format(new Date(msg.created_date), 'h:mm a')}
                </span>

                {/* Action buttons — revealed on hover */}
                <div className="ml-auto flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {(user?.email === msg.author_email || isAdmin) && (
                    <>
                      <button
                        onClick={() => { setEditingId(msg.id); setEditInput(msg.content); }}
                        className="text-zinc-700 hover:text-amber-500 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        onClick={() => deletePost(msg.id)}
                        className="text-zinc-700 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash size={11} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setReplyTo(msg)}
                    className="text-zinc-700 hover:text-amber-500 transition-colors"
                    title="Reply"
                  >
                    <CornerDownRight size={11} />
                  </button>
                </div>
              </div>

              {/* Message body */}
              <div className="ml-9">
                {msg.reply_to_author && (
                  <div className="text-[9px] text-amber-500 font-serif italic mb-1.5 flex items-center gap-1">
                    <CornerDownRight size={8} /> replying to {msg.reply_to_author}
                  </div>
                )}

                {editingId === msg.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      value={editInput}
                      onChange={e => setEditInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleEdit(msg.id); if (e.key === 'Escape') setEditingId(null); }}
                      autoFocus
                      className="flex-1 bg-zinc-900/80 border border-zinc-700 focus:border-amber-500 rounded-lg px-3 py-1.5 text-sm text-zinc-200 outline-none transition-colors"
                    />
                    <button onClick={() => handleEdit(msg.id)} className="text-teal-500 hover:text-teal-400 transition-colors"><Check size={15} /></button>
                    <button onClick={() => setEditingId(null)} className="text-zinc-600 hover:text-red-400 transition-colors"><X size={15} /></button>
                  </div>
                ) : (
                  <p className="font-serif text-zinc-300 text-[15px] leading-relaxed">{msg.content}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Footer spark bar */}
      <footer className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#08070A] via-[#08070A]/90 to-transparent">
        <div className="max-w-2xl mx-auto bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800 transition-all duration-200 focus-within:border-amber-700/50 focus-within:shadow-[0_0_24px_rgba(245,158,11,0.12)]">
          {isLoggedIn ? (
            <>
              <AnimatePresence>
                {replyTo && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    className="flex justify-between items-center text-[10px] text-amber-700/80 font-serif italic mb-2 pb-2 border-b border-zinc-800"
                  >
                    <span className="flex items-center gap-1"><CornerDownRight size={9} /> replying to {replyTo.author_name}</span>
                    <button onClick={() => setReplyTo(null)} className="hover:text-amber-400 transition-colors">Cancel</button>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-4">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder={replyTo ? "Kindle your reply…" : "Add your spark to the fire…"}
                  className="flex-1 bg-transparent border-none outline-none font-serif text-zinc-300 placeholder:text-zinc-700"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  className="text-amber-600 hover:text-amber-400 disabled:text-zinc-800 transition-colors"
                >
                  {sending ? <Loader2 size={18} className="animate-spin" /> : <Flame size={18} />}
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs font-serif italic text-zinc-700 text-center">
              <button onClick={() => base44.auth.redirectToLogin(window.location.href)} className="text-amber-700 underline hover:text-amber-500 transition-colors">
                Sign in
              </button>{' '}to share a thought with the Forest.
            </p>
          )}
        </div>
      </footer>
    </div>
  );
}