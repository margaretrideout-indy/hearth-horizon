import React, { useState, useEffect, useRef } from 'react';
// Assuming you have your Base44 hooks or Supabase client here
// import { useChatData } from './your-data-provider'; 

const EmbersChat = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  // 1. Auto-scroll to bottom whenever messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 2. Logic to fetch and listen for new messages would go here
  // For now, ensure your data is sorted by 'created_at' ASCENDING

  return (
    <div className="embers-container" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '80vh' }}>
      
      {/* Welcome Banner - Hardcoded so it's always there */}
      <div className="welcome-banner" style={{ background: '#1a202c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', borderLeft: '4px solid #63b3ed' }}>
        <h4 style={{ margin: 0, color: '#63b3ed' }}>Welcome to the Hearth, Seedling! 🌲</h4>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#a0aec0' }}>
          Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and say hello.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        className="chat-window" 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', // This enables the scroll!
          padding: '10px',
          background: '#2d3748',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              alignSelf: msg.user_id === currentUser.id ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: '15px',
              background: msg.user_id === currentUser.id ? '#3182ce' : '#4a5568',
              color: 'white',
              position: 'relative'
            }}
          >
            <span style={{ fontSize: '0.7rem', opacity: 0.8, display: 'block', marginBottom: '4px' }}>
              {msg.user_name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share a spark..."
          style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#1a202c', color: 'white' }}
        />
        <button 
          onClick={handleSendMessage}
          style={{ padding: '0 20px', borderRadius: '8px', background: '#63b3ed', border: 'none', color: '#1a202c', fontWeight: 'bold' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;