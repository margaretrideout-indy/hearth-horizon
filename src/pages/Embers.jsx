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

  // --- STYLE CONTROLS ---
  // Change these hex codes to match your specific site brand!
  const brandBlue = '#63b3ed'; // Your accent color
  const glassBackground = 'rgba(255, 255, 255, 0.05)'; // Subtle "glass" look
  const borderStyle = '1px solid rgba(255, 255, 255, 0.1)';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', height: '80vh', display: 'flex', flexDirection: 'column', color: 'inherit', fontFamily: 'inherit' }}>
      
      {/* Welcome Banner - Now using "Glass" style to blend in */}
      <div style={{ background: glassBackground, borderLeft: `4px solid ${brandBlue}`, padding: '15px', borderRadius: '12px', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
        <h3 style={{ margin: 0, color: brandBlue, fontSize: '1.2rem' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '0.95rem' }}>
          Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and share a spark below.
        </p>
      </div>

      {/* Chat Window - Transparent background to show your site theme through it */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', background: 'transparent', padding: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start', 
              background: msg.user_id === user?.id ? brandBlue : glassBackground, 
              color: msg.user_id === user?.id ? '#1a202c' : 'white',
              padding: '12px 16px', 
              borderRadius: '16px', 
              maxWidth: '80%',
              border: msg.user_id === user?.id ? 'none' : borderStyle,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 'bold', marginBottom: '4px' }}>
                {msg.user_name || 'Seedling'}
              </div>
              <div style={{ fontSize: '1rem', lineHeight: '1.5' }}>{msg.content}</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.4, marginTop: '40px', fontStyle: 'italic' }}>
            The hearth is quiet... be the first to share a spark.
          </div>
        )}
      </div>

      {/* Input Area - Matches your site's dark/light mode automatically */}
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
            borderRadius: '12px', 
            border: borderStyle, 
            background: glassBackground, 
            color: 'white',
            outline: 'none'
          }}
        />
        <button 
          onClick={handleSend} 
          style={{ 
            padding: '0 28px', 
            borderRadius: '12px', 
            background: brandBlue, 
            color: '#1a202c', 
            fontWeight: 'bold', 
            border: 'none', 
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;