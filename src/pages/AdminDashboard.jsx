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

  // --- THE HEARTH TEAL PALETTE ---
  const brandTeal = '#0d9488'; // A rich, deep teal (Tailwind Teal 600)
  const softTeal = 'rgba(20, 184, 166, 0.15)'; // Very soft teal glow for the banner
  const glassBackground = 'rgba(255, 255, 255, 0.03)'; // Barely-there glass
  const borderStyle = '1px solid rgba(255, 255, 255, 0.08)';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', height: '80vh', display: 'flex', flexDirection: 'column', color: 'inherit', fontFamily: 'inherit' }}>
      
      {/* Welcome Banner - Now in Soft Teal */}
      <div style={{ background: softTeal, borderLeft: `4px solid ${brandTeal}`, padding: '15px', borderRadius: '12px', marginBottom: '20px', backdropFilter: 'blur(8px)' }}>
        <h3 style={{ margin: 0, color: '#2dd4bf', fontSize: '1.2rem', letterSpacing: '0.02em' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '0.95rem', color: '#ccfbf1' }}>
          Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and share a spark below.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', background: 'transparent', padding: '10px', display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start', 
              background: msg.user_id === user?.id ? brandTeal : 'rgba(255, 255, 255, 0.07)', 
              color: 'white',
              padding: '12px 18px', 
              borderRadius: msg.user_id === user?.id ? '18px 18px 4px 18px' : '18px 18px 18px 4px', 
              maxWidth: '80%',
              border: msg.user_id === user?.id ? `1px solid ${brandTeal}` : borderStyle,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#99f6e4', fontWeight: 'bold', marginBottom: '4px', opacity: 0.9 }}>
                {msg.user_name || 'Seedling'}
              </div>
              <div style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '400' }}>{msg.content}</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.3, marginTop: '40px', letterSpacing: '0.05em' }}>
            Waiting for the first spark...
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
          placeholder="Share a spark..."
          style={{ 
            flex: 1, 
            padding: '14px', 
            borderRadius: '14px', 
            border: borderStyle, 
            background: 'rgba(0, 0, 0, 0.2)', 
            color: 'white',
            outline: 'none',
            fontSize: '1rem'
          }}
        />
        <button 
          onClick={handleSend} 
          style={{ 
            padding: '0 30px', 
            borderRadius: '14px', 
            background: brandTeal, 
            color: 'white', 
            fontWeight: '600', 
            border: 'none', 
            cursor: 'pointer',
            boxShadow: `0 4px 14px ${brandTeal}44` // Subtle teal glow
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;