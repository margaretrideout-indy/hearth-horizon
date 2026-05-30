// 1. Add state for reply context
const [replyTo, setReplyTo] = useState(null);

// 2. Updated handleSend to include reply metadata
const handleSend = async () => {
  if (!input.trim() || sending) return;
  setSending(true);
  try {
    await base44.entities.EmberPost.create({
      author_name: displayName,
      content: input,
      reply_to_id: replyTo?.id || null // This links the messages
    });
    setInput('');
    setReplyTo(null); // Clear context after send
  } finally { setSending(false); }
};

// 3. UI Update for posts: Add an "interaction hover zone"
<motion.article 
  className={`group relative ${msg.reply_to_id ? 'ml-8 border-l border-zinc-900 pl-4' : ''}`}
>
  {/* The content... */}
  <button 
    onClick={() => setReplyTo(msg)}
    className="absolute right-0 opacity-0 group-hover:opacity-100 text-[9px] text-zinc-700 hover:text-amber-700"
  >
    Reply
  </button>
</motion.article>

// 4. UI Update for footer: Show the "tether"
{replyTo && (
  <div className="text-[10px] text-amber-900/70 mb-2 flex justify-between">
    <span>Replying to {replyTo.author_name}</span>
    <button onClick={() => setReplyTo(null)}>×</button>
  </div>
)}