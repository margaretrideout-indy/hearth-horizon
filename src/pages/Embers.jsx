import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function Embers() {
  const [posts, setPosts]     = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const feedRef               = useRef(null);

  useEffect(() => {
    const init = async () => {
      try { const me = await base44.auth.me(); setUser(me); } catch (_) {}
      try {
        const data = await base44.entities.EmberPost.list('-created_date', 50);
        setPosts(data.reverse());
      } catch (_) {}
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [posts]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || !user) return;
    const parts = (user.full_name || user.email || 'Anonymous').split(' ');
    const displayName = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : parts[0];
    const newPost = await base44.entities.EmberPost.create({
      author_name: displayName,
      author_email: user.email,
      content: trimmed,
    });
    setPosts(prev => [...prev, newPost]);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="embers-bg min-h-screen flex flex-col text-zinc-300 font-sans selection:bg-amber-500/20">

      {/* Header */}
      <header className="w-full max-w-2xl mx-auto px-6 pt-12 pb-4 flex items-center gap-3">
        <Flame size={14} className="text-amber-700/60" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">The Embers</span>
      </header>

      {/* Feed — scrollable middle */}
      <main
        ref={feedRef}
        className="flex-1 w-full max-w-2xl mx-auto px-6 overflow-y-auto space-y-10 py-6 pb-32 custom-scrollbar"
      >
        {loading && (
          <p className="text-zinc-700 text-sm font-serif italic text-center pt-24">Stoking the embers…</p>
        )}
        {!loading && posts.length === 0 && (
          <p className="text-zinc-700 text-sm font-serif italic text-center pt-24">
            The hearth is quiet. Be the first to share a thought.
          </p>
        )}
        {posts.map((post) => (
          <article key={post.id} className="space-y-1.5">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-600">
                {post.author_name}
              </span>
              <span className="text-[9px] text-zinc-800">
                {post.created_date ? format(new Date(post.created_date), 'MMM d · h:mm a') : ''}
              </span>
            </div>
            <p className="font-serif italic text-zinc-400 leading-relaxed text-[15px]">
              {post.content}
            </p>
          </article>
        ))}
      </main>

      {/* Spark Bar — fixed to bottom */}
      <footer className="fixed bottom-0 inset-x-0 bg-[#08070A]/95 backdrop-blur-md border-t border-zinc-900/60"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-2xl mx-auto px-6 py-4">
          {!user ? (
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share a thought with the Forest…"
                className="flex-1 bg-transparent border-none outline-none text-sm font-serif italic text-zinc-300 placeholder:text-zinc-700"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="text-amber-700 hover:text-amber-400 disabled:text-zinc-800 transition-colors"
              >
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}