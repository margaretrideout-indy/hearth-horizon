import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Flame, Send, Loader2, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break. Protect the peace of the Hearth.";

const PINNED_STARTERS = [
  {
    author_name: 'Margaret (Founder)',
    content: "Welcome to the Hearth. I'm Margaret, and I built this after 13 years in education because I know how hard the 'translation' is. You aren't alone here.",
    is_pinned: true,
    is_bot: false,
  },
  {
    author_name: 'The Hearth',
    content: "Post your small wins here — whether it's finally hitting 'send' on a resume or just identifying one corporate skill you didn't know you had!",
    is_pinned: true,
    is_bot: false,
  },
  {
    author_name: 'The Hearth',
    content: "What field are you coming from, and what is the one thing you're most looking forward to in your new horizon?",
    is_pinned: true,
    is_bot: false,
  },
];

function PostBubble({ post, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}
    >
      <div className="flex items-center gap-2 px-1">
        {post.is_pinned && <Pin className="w-3 h-3 text-secondary" />}
        {post.is_bot && <Badge className="text-[10px] bg-secondary/15 text-secondary border-none py-0">✦ Daily Spark</Badge>}
        <span className="text-xs text-muted-foreground font-medium">{post.author_name}</span>
      </div>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
          post.is_pinned
            ? 'bg-secondary/10 border border-secondary/20 text-foreground'
            : isOwn
            ? 'text-white'
            : 'bg-card border border-border/50 text-foreground'
        }`}
        style={isOwn && !post.is_pinned ? { background: '#006D77' } : {}}
      >
        {post.content}
      </div>
    </motion.div>
  );
}

export default function Embers() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const bottomRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['emberPosts'],
    queryFn: () => base44.entities.EmberPost.list('created_date', 100),
    refetchInterval: 15000,
  });

  // Seed pinned starter posts if none exist yet
  useEffect(() => {
    if (posts.length === 0 && !seeding) {
      setSeeding(true);
      base44.entities.EmberPost.bulkCreate(PINNED_STARTERS).then(() => {
        queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
        setSeeding(false);
      });
    }
  }, [posts.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts]);

  const handleSend = async () => {
    if (!message.trim() || !user) return;
    setSending(true);
    await base44.entities.EmberPost.create({
      author_name: user.full_name || user.email.split('@')[0],
      author_email: user.email,
      content: message.trim(),
      is_pinned: false,
      is_bot: false,
    });
    queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
    setMessage('');
    setSending(false);
  };

  // Deduplicate all posts by ID
  const uniquePosts = posts.filter((post, idx, arr) => arr.findIndex(p => p.id === post.id) === idx);

  // Pinned: keep only one per unique content (most recent), from "The Hearth" author
  const pinnedSeen = new Set();
  const pinned = uniquePosts
    .filter(p => p.is_pinned)
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
    .filter(p => {
      const key = p.content.trim().toLowerCase().slice(0, 60);
      if (pinnedSeen.has(key)) return false;
      pinnedSeen.add(key);
      return true;
    })
    .reverse(); // restore chronological order for display

  // Feed: non-pinned, deduplicated by ID
  const feed = uniquePosts.filter(p => !p.is_pinned);

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-4 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Community space</p>
        </div>
        <h1 className="font-heading text-3xl mb-1" style={{ fontWeight: 600 }}>The Embers</h1>
        <p className="text-muted-foreground text-sm">A warm, open circle for public service professionals on the move.</p>
      </div>

      {/* Pinned Posts */}
      {pinned.length > 0 && (
        <div className="space-y-3 mb-4 shrink-0">
          {pinned.map((post, i) => (
            <PostBubble key={i} post={post} isOwn={false} />
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">Community thread</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}
        <AnimatePresence>
          {feed.map((post, i) => (
            <PostBubble key={post.id || i} post={post} isOwn={post.author_email === user?.email} />
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-4 shrink-0 space-y-2">
        <div className="flex gap-2 items-end">
          <Textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
            placeholder="Share something with the Hearth…"
            className="resize-none min-h-[60px] bg-card/60"
            rows={2}
          />
          <Button onClick={handleSend} disabled={!message.trim() || sending} className="h-full px-4 gap-2">
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-center text-muted-foreground/40 leading-relaxed" style={{ fontSize: '10px', fontStyle: 'italic' }}>
          {TOS_TEXT}
        </p>
      </div>
    </div>
  );
}