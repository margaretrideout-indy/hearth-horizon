import React, { useState, useEffect, useRef } from 'react';
import { Flame, Send, Sparkles } from 'lucide-react';

const EmbersChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "FOUNDER",
      role: "Founder",
      text: "Welcome to the Hearth. This is a space for us to share sparks of insight, questions about our transitions, and support for the journey ahead.",
      time: "APR 3, 3:32 PM"
    },
    {
      id: 2,
      author: "SAM",
      role: "Seedling",
      text: "Really excited to be here! Just finished my first React tutorial and feeling like I've planted a small seed today.",
      time: "APR 3, 4:15 PM"
    }
  ]);

  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      author: "YOU",
      role: "Seedling",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase()
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1A1423] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 embers-scroll space-y-6"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Flame className="w-12 h-12 text-teal-500 mb-4 animate-pulse" />
            <p className="text-slate-400 italic text-sm">
              The fire is just being lit.<br />Be the first to share a spark.
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1.5 ml-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {msg.author}
                </span>
                {msg.role === 'Founder' && (
                  <span className="bg-purple-900/30 text-purple-300 text-[9px] px-2 py-0.5 rounded-full border border-purple-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Founder
                  </span>
                )}
                {msg.role === 'Seedling' && (
                  <span className="bg-teal-900/20 text-teal-500 text-[9px] px-2 py-0.5 rounded-full border border-teal-500/20">
                    Seedling
                  </span>
                )}
              </div>
              
              <div className={`max-w-[85%] p-4 rounded-2xl border transition-all ${
                msg.role === 'Founder' 
                ? 'bg-[#2D243A] border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.08)]' 
                : 'bg-[#251D2F] border-white/5 shadow-md'
              }`}>
                <p className="text-slate-200 text-sm leading-relaxed">{msg.text}</p>
              </div>
              
              <span className="text-[9px] text-slate-600 mt-1.5 ml-2 uppercase tracking-tighter">
                {msg.time}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-[#251D2F]/50 border-t border-white/5">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share something with the Hearth..."
            className="w-full bg-[#1A1423] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600"
          />
          <button 
            onClick={handleSend}
            className="bg-teal-600 hover:bg-teal-500 text-slate-100 p-2.5 rounded-xl transition-all active:scale-95 group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <span className="text-[10px] text-slate-600 italic">Sending to the Fire</span>
        </div>
      </div>
    </div>
  );
};

export default EmbersChat;