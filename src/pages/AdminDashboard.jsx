import React, { useState, useEffect, useRef } from 'react';

const EmbersChat = ({ messages, onSendMessage, user }) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  // --- BRAND COLORS ---
  const brandTeal = '#0d9488'; 
  const mintTeal = '#2dd4bf';  
  const glassBg = 'rgba(255, 255, 255, 0.05)';
  const borderStyle = '1px solid rgba(255, 255, 255, 0.1)';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', height: '80vh', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Welcome Banner - Cleaner C.T.A. */}
      <div style={{ background: 'rgba(13, 148, 136, 0.15)', borderLeft: `4px solid ${brandTeal}`, padding: '18px', borderRadius: '12px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
        <h3 style={{ margin: 0, color: mintTeal, fontSize: '1.2rem' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '0.95rem', color: '#ccfbf1', lineHeight: '1.4' }}>
          Ready for your next horizon? Head over to the <b>Resume Review</b> tab to upload your PDF and get instant feedback on your transition into tech.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', background: 'transparent', padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={{ alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start', background: msg.user_id === user?.id ? brandTeal : glassBg, color: 'white', padding: '12px 18px', borderRadius: '16px', maxWidth: '80%', border: borderStyle }}>
              <div style={{ fontSize: '0.75rem', color: mintTeal, fontWeight: 'bold' }}>{msg.user_name}</div>
              <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>{msg.content}</div>
            </div>
          ))
        ) : (
          // --- THE FOUNDER'S PINNED WELCOME MESSAGE ---
          // This only appears when the chat is empty.
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
            <div style={{ background: glassBg, padding: '16px 20px', borderRadius: '18px', maxWidth: '85%', border: borderStyle, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '0.8rem', color: mintTeal, fontWeight: 'bold', marginBottom: '6px' }}>
                Hearth Founder 🕯️
              </div>
              <div style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#e2e8f0', letterSpacing: '0.01em' }}>
                "Pull up a seat. I'm the founder of Hearth & Horizon, and after 13 years navigating career pivots, I know exactly what it’s like to stand at that edge, looking toward a new horizon.
                <br /><br />
                I built this grove to be the supportive space I wish I’d had. When you’re ready, share a spark—where are you coming from, and where are you headed?"
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Share a spark with the grove..."
          style={{ flex: 1, padding: '14px', borderRadius: '14px', border: borderStyle, background: 'rgba(0, 0, 0, 0.2)', color: 'white', fontSize: '1rem' }}
        />
        <button 
          onClick={handleSend} 
          style={{ padding: '0 30px', borderRadius: '14px', background: brandTeal, color: 'white', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: `0 4px 14px rgba(13, 148, 136, 0.4)` }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;