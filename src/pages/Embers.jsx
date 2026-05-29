import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';

export default function Embers() {
  const [posts, setPosts]       = useState([]);
  const [message, setMessage]   = useState('');
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const feedRef                  = useRef(null);

  // Load current user + posts
  useEffect(() => {
    const init = async () => {
      try {
        const me = await base44.auth.me();
        setUser(me);
      } catch (_) {}

      try {
        const data = await base44.entities.EmberPost.list('-created_date', 50);
        setPosts(data.reverse());
      } catch (_) {}

      setLoading(false);
    };
    init();
  }, []);

  // Scroll to bottom when feed grows
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [posts]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || !user) return;

    const nameParts = (user.full_name || user.email || 'Anonymous').split(' ');
    const displayName = nameParts.length > 1
      ? `${nameParts[0]} ${nameParts[1][0]}.`
      : nameParts[0];

    const newPost = await base44.entities.EmberPost.create({
      author_name: displayName,
      author_email: user.email,
      content: trimmed,
    });

    setPosts(prev => [...prev, newPost]);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="embers-bg min-h-screen text-zinc-300 font-sans selection:bg-amber-500/20 flex flex-col">

      {/* Header */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-10 pb-6 flex items-center gap-3">
        <Flame size={18} className="text-amber-700/70" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600">The Embers</span>
        <span className="text-zinc-800 mx-1">·</span>
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Founding Forest</span>
      </header>

      {/* Feed */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 overflow-hidden flex flex-col pb-4">
        <div
          ref={feedRef}
          className="flex-1 overflow-y-auto space-y-10 py-4 custom-scrollbar"
        >
          {loading && (
            <p className="text-zinc-700 text-sm font-serif italic text-center pt-20">
              Stoking the embers…
            </p>
          )}

          {!loading && posts.length === 0 && (
            <p className="text-zinc-700 text-sm font-serif italic text-center pt-20">
              The hearth is quiet. Be the first to share a thought.
            </p>
          )}

          {posts.map((post) => (
            <article key={post.id} className="space-y-1.5 max-w-2xl">
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-zinc-600">
                  {post.author_name}
                </span>
                <span className="text-[9px] text-zinc-700">
                  {post.created_date
                    ? format(new Date(post.created_date), 'MMM d · h:mm a')
                    : ''}
                </span>
              </div>
              <p className="font-serif italic text-zinc-300 leading-relaxed text-[15px]">
                {post.content}
              </p>
            </article>
          ))}
        </div>

        {/* Spark Bar */}
        <div className="pt-4 border-t border-zinc-800/60">
          {!user ? (
            <p className="text-xs font-serif italic text-zinc-600 text-center py-3">
              <button
                onClick={() => base44.auth.redirectToLogin(window.location.href)}
                className="text-amber-600 hover:text-amber-400 transition-colors underline underline-offset-2"
              >
                Sign in
              </button>
              {' '}to share a thought with the Forest.
            </p>
          ) : (
            <div className="spark-bar flex items-center gap-3 px-1 py-3 border-b border-zinc-800 transition-all duration-300">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share a thought with the Forest…"
                className="flex-1 bg-transparent border-none outline-none text-sm font-serif italic text-zinc-200 placeholder:text-zinc-700 focus:placeholder:text-zinc-600 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="text-amber-700 hover:text-amber-400 disabled:text-zinc-800 transition-colors p-1"
              >
                <Send size={15} />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}