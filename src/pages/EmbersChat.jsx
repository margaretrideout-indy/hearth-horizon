// ... (imports remain the same)

export default function EmbersChat() {
  // ... (logic remains the same)

  // Helper to clean up names like "Margaret (Founder)"
  const formatAuthorName = (name) => name.replace(/\s*\(Founder\)\s*/gi, '');

  return (
    <div className="flex flex-col h-[100dvh] md:h-full bg-[#1A1423] md:rounded-[2.5rem] md:border border-white/5 overflow-hidden shadow-2xl relative">
      
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-8 scroll-smooth scrollbar-hide md:custom-scrollbar"
      >
        {FIXED_STARTERS.map((msg) => (
          <div key={msg.id} className="flex flex-col items-start opacity-90">
            <div className="flex items-center gap-2 mb-2 ml-1">
              {/* FIXED: Using formatAuthorName to prevent "Founder Founder" doubling */}
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                {formatAuthorName(msg.author_name)}
              </span>
              <TierBadge tier={msg.subscription_tier} />
            </div>
            {/* ... rest of mapping */}
          </div>
        ))}

        {/* ... (flame separator) */}

        <AnimatePresence initial={false}>
          {remotePosts.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="py-12 text-center flex flex-col items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <Flame className="w-5 h-5 text-slate-600 animate-pulse" />
              </div>
              {/* NEW: More conversational empty state */}
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                The hearth is warm, but it's quiet... be the first to share a thought.
              </p>
            </motion.div>
          ) : (
            remotePosts.map((msg) => {
              const isOwn = msg.author_email === user?.email;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-2 px-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    {/* FIXED: Same cleanup here for remote posts */}
                    {formatAuthorName(msg.author_name)}
                    <TierBadge tier={msg.subscription_tier} />
                  </div>
                  {/* ... rest of message bubble */}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
      {/* ... rest of file */}
    </div>
  );
}