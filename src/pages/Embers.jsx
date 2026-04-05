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
    onSendMessage(newMessage); // This uses the built-in function from your app
    setNewMessage('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', height: '80vh', display: 'flex', flexDirection: 'column', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Welcome Banner */}
      <div style={{ background: '#2d3748', borderLeft: '4px solid #63b3ed', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#63b3ed' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
          Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and share a spark below.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        ref={scrollRef}
        style={{ flex: 1, overflowY: 'auto', background: '#1a202c', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #2d3748' }}
      >
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} style={{ alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start', background: msg.user_id === user?.id ? '#3182ce' : '#4a5568', padding: '10px', borderRadius: '10px', maxWidth: '80%' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 'bold', marginBottom: '2px' }}>{msg.user_name || 'Member'}</div>
              <div style={{ fontSize: '0.95rem' }}>{msg.content}</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '20px' }}>No sparks shared yet. Be the first!</div>
        )}
      </div>

      {/* Input Area */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Share a spark..."
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #4a5568', background: '#2d3748', color: 'white' }}
        />
        <button 
          onClick={handleSend} 
          style={{ padding: '0 25px', borderRadius: '8px', background: '#63b3ed', color: '#1a202c', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;