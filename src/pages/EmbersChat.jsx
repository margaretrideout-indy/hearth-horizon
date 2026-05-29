import React, { useState, useEffect, useRef } from 'react';
import { Send, Flame, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function EmbersChat({ vault, isAdmin }) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [posts, setPosts] = useState([]);
  const scrollRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const data = await base44.entities.EmberPost.list('-created_date', 50);
      setPosts(data.reverse());
    } catch (err) { console.error("Connection error:", err); }
  };

  useEffect(() => {
    fetchPosts();
    try {
      const unsubscribe = base44.entities.EmberPost.subscribe((e) => {
        if (e.type === 'create') setPosts(prev => [...prev, e.data]);
      });
      return unsubscribe;
    } catch (err) { console.error(err); }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || sending) return;
    setSending(true);
    try {
      await base44.entities.EmberPost.create({
        author_name: vault?.email?.split('@')[0] || 'Traveler',
        content: input,
      });
      setInput('');
    } catch (err) { console.error(err); } finally { setSending(false); }
  };

  return (
    <div className="relative w-full h-full bg-[#050403] overflow-hidden">
      {/* Ambient Firelight Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent" />
      </div>

      {/* The Journal Feed */}
      <div ref={scrollRef} className="h-full overflow-y-auto px-6 py-20 pb-40">
        <div className="max-w-2xl mx-auto space-y-16">
          
          {/* Static Welcome Entry */}
          <div className="border-b border-zinc-900 pb-12">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700">Margaret</span>
            <p className="mt-2 font-serif text-lg text-zinc-400 italic leading-relaxed">
              "Welcome to the Embers. This is our shared space to navigate the shifting winds of career migration. How are you arriving today?"
            </p>
          </div>

          {/* Dynamic Posts */}
          {posts.map((msg, idx) => (
            <motion.div key={msg.id || idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">{msg.author_name}</span>
              <p className="font-serif text-lg text-zinc-300 italic leading-relaxed">"{msg.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Spark Bar */}
      <footer className="absolute bottom-0 w-full bg-[#050406]/90 backdrop-blur-md border-t border-zinc-900">
        <div className="max-w-2xl mx-auto px-6 py-6 flex gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Add your light to the fire..."
            className="w-full bg-transparent italic text-zinc-500 placeholder:text-zinc-800 focus:outline-none focus:text-amber-100 transition-all"
          />
          <button onClick={handleSend} disabled={sending} className="text-zinc-700 hover:text-amber-600 transition-colors">
            {sending ? <Loader2 className="animate-spin" size={16} /> : <Flame size={16} />}
          </button>
        </div>
      </footer>
    </div>
  );
}