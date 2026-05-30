import React, { useState, useEffect, useRef } from 'react';
import { Flame, Loader2, CornerDownRight, MoreVertical, Trash, Edit2, Check, X } from 'lucide-react';
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

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    const me = user || vault;
    const parts = (me?.full_name || me?.email || 'Traveler').split(' ');
    const displayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    await base44.entities.EmberPost.create({ author_name: displayName, author_email: me?.email || '', content: input, reply_to_id: replyTo?.id || null, reply_to_author: replyTo?.author_name || null });
    setInput(''); setReplyTo(null); setSending(false);
  };

  const handleEdit = async (id) => {
    await base44.entities.EmberPost.update(id, { content: editInput });
    setEditingId(null);
  };

  const deletePost = async (id) => {
    if (window.confirm('Are you sure you want to remove this ember?')) {
      await base44.entities.EmberPost.delete(id);
    }
  };

  return (
    <div className="embers-bg relative w-full h-full overflow-hidden text-zinc-400 font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(circle,_rgba(245,158,11,0.15),_transparent_70%)]" />
      </div>

      <div ref={scrollRef} className="h-full overflow-y-auto pt-20 pb-48 custom-scrollbar">
        <div className="max-w-2xl mx-auto px-6 space-y-2">
          {posts.map((msg) => (
            <motion.article layout key={msg.id} className={`group relative p-5 rounded-xl transition-all hover:bg-amber-900/5 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] ${msg.reply_to_id ? 'ml-8 border-l border-amber-900/20' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-amber-950/20 flex items-center justify-center text-[10px] text-amber-700 font-bold">
                  {msg.author_name.charAt(0)}
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{msg.author_name}</span>
                <span className="text-[9px] text-zinc-800">{format(new Date(msg.created_date), 'h:mm a')}</span>
                
                <div className="ml-auto opacity-0 group-hover:opacity-100 flex gap-2">
                  {(user?.email === msg.author_email || isAdmin) && (
                    <>
                      <button onClick={() => { setEditingId(msg.id); setEditInput(msg.content); }}><Edit2 size={10} className="hover:text-amber-500" /></button>
                      <button onClick={() => deletePost(msg.id)}><Trash size={10} className="hover:text-red-500" /></button>
                    </>
                  )}
                  <button onClick={() => setReplyTo(msg)}><CornerDownRight size={10} className="hover:text-amber-500" /></button>
                </div>
              </div>
              
              <div className="ml-9">
                {msg.reply_to_author && <div className="text-[9px] text-amber-700/60 font-serif italic mb-1"><CornerDownRight size={8} className="inline" /> replying to {msg.reply_to_author}</div>}
                {editingId === msg.id ? (
                  <div className="flex gap-2">
                    <input value={editInput} onChange={e => setEditInput(e.target.value)} className="flex-1 bg-zinc-900 p-2 rounded text-sm text-zinc-200" />
                    <button onClick={() => handleEdit(msg.id)}><Check size={16} /></button>
                    <button onClick={() => setEditingId(null)}><X size={16} /></button>
                  </div>
                ) : (
                  <p className="font-serif text-zinc-300 text-[15px]">{msg.content}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#08070A] via-[#08070A] to-transparent">
        <div className="max-w-2xl mx-auto bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800 transition-all focus-within:border-amber-500 focus-within:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          {replyTo && (
            <div className="flex justify-between text-[10px] text-amber-700 mb-2 font-serif italic"><span>Replying to {replyTo.author_name}</span><button onClick={() => setReplyTo(null)}>Cancel</button></div>
          )}
          <div className="flex items-center gap-4">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none font-serif text-zinc-300 placeholder:text-amber-900" placeholder="Add your spark to the fire..." />
            <button onClick={handleSend} className="text-amber-600 hover:text-amber-400">
              {sending ? <Loader2 className="animate-spin" /> : <Flame size={18} />}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}