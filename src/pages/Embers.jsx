import React, { useState, useEffect, useRef } from 'react';

const EmbersChat = ({ messages, onSendMessage, user }) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change
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

  // --- BRAND COLORS (HEARTH TEAL) ---
  const brandTeal = '#0d9488'; // Deep, grounding teal
  const mintTeal = '#2dd4bf';  // Bright, minty accent
  const glassBg = 'rgba(255, 255, 255, 0.05)';
  const borderStyle = '1px solid rgba(255, 255, 255, 0.1)';

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      height: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      color: 'white', 
      fontFamily: 'sans-serif' 
    }}>
      
      {/* Welcome Banner */}
      <div style={{ 
        background: 'rgba(13, 148, 136, 0.15)', 
        borderLeft: `4px solid ${brandTeal}`, 
        padding: '15px', 
        borderRadius: '12px', 
        marginBottom: '20px', 
        backdropFilter: 'blur(10px)' 
      }}>
        <h3 style={{ margin: 0, color: mintTeal, fontSize: '1.2rem' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '0.95rem', color: '#ccfbf1' }}>
          Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and share a spark below.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: 'transparent', 
          padding: '10px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px' 
        }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start', 
              background: msg.user_id === user?.id ? brandTeal : glassBg, 
              color: 'white',
              padding: '12px 18px', 
              borderRadius: msg.user_id === user?.id ? '18px 18px 4px 18px' : '18px 18px 18px 4px', 
              maxWidth: '80%',
              border: msg.user_id === user?.id ? `1px solid ${brandTeal}` : borderStyle,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: mintTeal, 
                fontWeight: 'bold', 
                marginBottom: '4px' 
              }}>
                {msg.user_name || 'Seedling'}
              </div>
              <div style={{ fontSize: '1rem', lineHeight: '1.6' }}>{msg.content}</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.4, marginTop: '40px', fontStyle: 'italic' }}>
            The hearth is quiet... be the first to share a spark.
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
            boxShadow: `0 4px 14px rgba(13, 148, 136, 0.4)`
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;