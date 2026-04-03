import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Flame, Loader2, Pin, SendHorizonal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import SubscriptionBadge from '../components/ui/SubscriptionBadge';

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

const SENTIMENT_COLORS = {
  Rooted: 'hsl(152, 55%, 45%)',
  Reaching: 'hsl(200, 70%, 55%)',
  Weathering: 'hsl(38, 80%, 60%)',
  Blooming: 'hsl(330, 65%, 65%)',
};

function isFounderPost(post) {
  return post.author_name?.toLowerCase().includes('margaret');
}

function ChatBubble({ post, isOwn, currentUserTier, currentUserIsFoundingSeedling }) {
  const founder = isFounderPost(post);
  const sentiment = post.sentiment_tag;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-1 ${isOwn ? 'items-end' : 'items-start'}`}
    >
      {/* Name + badge row */}
      <div className="flex items-center gap-1 px-2">
        {post.is_pinned && <Pin className="w-2.5 h-2.5 text-secondary shrink-0" />}
        <span className="text-[10px] font-medium text-muted-foreground/70">
          {post.author_name}
          {post.is_founding_member && <span className="ml-1">🍃</span>}
        </span>
        {isOwn && currentUserTier && (
          <SubscriptionBadge tier={currentUserTier} isFounder={founder} isFoundingSeedling={currentUserIsFoundingSeedling} />
        )}
        {!isOwn && (
          <SubscriptionBadge tier={post.subscription_tier || 'Seedling'} isFounder={founder} isFoundingSeedling={post.is_founding_member} />
        )}
        {sentiment && (
          <span
            className="text-[10px] ml-1"
            style={{ color: SENTIMENT_COLORS[sentiment] || 'hsl(270, 15%, 60%)' }}
          >
            · {sentiment}
          </span>
        )}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[75%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={
          post.is_pinned
            ? {
                background: 'hsla(183, 80%, 38%, 0.08)',
                border: '1px solid hsla(183, 80%, 38%, 0.2)',
                color: 'hsl(270, 20%, 88%)',
              }
            : isOwn
            ? {
                background: 'hsla(280, 40%, 28%, 0.55)',
                border: '1px solid hsla(280, 40%, 50%, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'hsl(270, 20%, 92%)',
                borderBottomRightRadius: '4px',
              }
            : {
                background: 'hsla(183, 60%, 25%, 0.22)',
                border: founder
                  ? '1px solid hsla(280, 65%, 65%, 0.45)'
                  : '1px solid hsla(183, 60%, 40%, 0.18)',
                backdropFilter: 'blur(10px)',
                color: 'hsl(270, 20%, 88%)',
                borderBottomLeftRadius: '4px',
                boxShadow: founder ? '0 0 10px 0 hsla(280, 65%, 65%, 0.2)' : 'none',
              }
        }
      >
        {post.content}
      </div>

      <span className="text-[9px] text-muted-foreground/30 px-2">
        {post.created_date ? format(new Date(post.created_date), 'MMM d, h:mm a') : ''}
      </span>
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
    queryFn: () => base44.entities.EmberPost.list('created_date', 50),
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

  // Auto-scroll to bottom on new posts
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
      subscription_tier: user.subscription_tier || 'Seedling',
      is_founding_member: user.is_founding_member || false,
    });
    queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
    setMessage('');
    setSending(false);
  };

  // Deduplicate all posts by ID
  const uniquePosts = posts.filter((post, idx, arr) => arr.findIndex(p => p.id === post.id) === idx);

  // Pinned: deduplicate by content
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
    .reverse();

  // Feed: non-pinned, chronological (oldest first → newest at bottom)
  const feed = uniquePosts.filter(p => !p.is_pinned);

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 6rem)', paddingBottom: '0' }}>
      {/* Header */}
      <div className="mb-3 shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Community space</p>
        </div>
        <h1 className="font-heading text-3xl mb-1" style={{ fontWeight: 600 }}>The Embers</h1>
        <p className="text-muted-foreground text-sm">A warm, open circle for public service professionals on the move.</p>
      </div>

      {/* Pinned Posts */}
      {pinned.length > 0 && (
        <div className="space-y-2 mb-3 shrink-0 pb-3 border-b border-border/30">
          {pinned.map((post, i) => (
            <ChatBubble key={`pinned-${i}`} post={post} isOwn={false} currentUserTier={user?.subscription_tier} />
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 mb-3 shrink-0">
        <div className="flex-1 h-px bg-border/30" />
        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">Campfire chat</span>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      {/* Scrollable feed — newest at bottom */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
        {isLoading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}
        {!isLoading && feed.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <Flame className="w-8 h-8 text-secondary/40 mb-3" />
            <p className="text-muted-foreground/60 text-sm italic">
              The fire is just being lit. Be the first to share a spark.
            </p>
          </div>
        )}
        <AnimatePresence>
          {feed.map((post, i) => (
            <ChatBubble
              key={post.id || i}
              post={post}
              isOwn={post.author_email === user?.email}
              currentUserTier={user?.subscription_tier}
              currentUserIsFoundingSeedling={user?.is_founding_member}
            />
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Sticky Input Bar */}
      <div className="mt-3 shrink-0">
        <div
          className="flex gap-2 items-center rounded-2xl px-4 py-2"
          style={{
            background: 'hsla(280, 30%, 14%, 0.7)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid hsla(280, 30%, 40%, 0.18)',
          }}
        >
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
            placeholder="Share something with the Hearth…"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm placeholder:text-muted-foreground/40"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            size="sm"
            className="gap-2 rounded-xl"
            style={{ background: 'hsla(183, 80%, 38%, 0.85)' }}
          >
            {sending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <SendHorizonal className="w-4 h-4" />
            }
            <span className="hidden sm:inline text-xs">Send to the Fire</span>
          </Button>
        </div>
        <p className="text-center text-muted-foreground/30 mt-1.5" style={{ fontSize: '10px', fontStyle: 'italic' }}>
          {TOS_TEXT}
        </p>
      </div>
    </div>
  );
}