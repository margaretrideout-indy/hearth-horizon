import React, { useState, useEffect, useRef } from 'react';
import { Flame, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput]     = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts]     = useState([]);
  const [user, setUser]       = useState(null);
  const scrollRef             = useRef(null);

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
      });
      setInput('');
    } catch (err) { console.error(err); } finally { setSending(false); }
  };

  const isLoggedIn = !!(user || vault?.email);

  return (
    <div className="embers-bg relative w-full h-full overflow-hidden text-zinc-400 font-sans">

      {/* Ambient firelight from below */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
      </div>

      {/* Page header */}
      <header className="absolute top-0 inset-x-0 px-6 pt-10 pb-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-2.5">
          <Flame size={12} className="text-amber-800/50" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">The Embers</span>
        </div>
      </header>

      {/* Feed */}
      <div ref={scrollRef} className="h-full overflow-y-auto pt-28 pb-36 custom-scrollbar">
        <div className="max-w-2xl mx-auto px-6 space-y-12">

          {/* Static welcome entry */}
          <article className="border-b border-zinc-900/60 pb-12">
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600">Margaret</span>
              <span className="text-[9px] text-zinc-800">Founding Hearthkeeper</span>
            </div>
            <p className="font-serif italic text-zinc-500 leading-relaxed text-[15px]">
              Welcome to the Embers. This is our shared space to navigate the shifting winds of career migration. How are you arriving today?
            </p>
          </article>

          {/* Dynamic posts */}
          {posts.map((msg, idx) => (
            <motion.article
              key={msg.id || idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600">
                  {msg.author_name}
                </span>
                {msg.created_date && (
                  <span className="text-[9px] text-zinc-800">
                    {format(new Date(msg.created_date), 'MMM d · h:mm a')}
                  </span>
                )}
              </div>
              <p className="font-serif italic text-zinc-400 leading-relaxed text-[15px]">
                {msg.content}
              </p>
            </motion.article>
          ))}

        </div>
      </div>

      {/* Fixed Spark Bar */}
      <footer
        className="absolute bottom-0 inset-x-0 bg-[#08070A]/95 backdrop-blur-md border-t border-zinc-900/60"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="max-w-2xl mx-auto px-6 py-4">
          {!isLoggedIn ? (
            <p className="text-xs font-serif italic text-zinc-700 text-center">
              <button
                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                className="text-amber-700 hover:text-amber-500 transition-colors underline underline-offset-2"
              >
                Sign in
              </button>
              {' '}to share a thought with the Forest.
            </p>
          ) : (
            <div className="spark-bar flex items-center gap-3 border-b border-zinc-800 pb-2 transition-all duration-300">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Share a thought with the Forest…"
                className="flex-1 bg-transparent border-none outline-none text-sm font-serif italic text-zinc-300 placeholder:text-zinc-700"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || sending}
                className="text-amber-700 hover:text-amber-400 disabled:text-zinc-800 transition-colors"
              >
                {sending ? <Loader2 size={14} className="animate-spin" /> : <Flame size={14} />}
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}