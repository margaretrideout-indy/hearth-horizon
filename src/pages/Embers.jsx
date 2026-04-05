import React, { useState, useEffect, useRef } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import { useUser } from '@/hooks/useUser';

const EmbersChat = () => {
  // 1. Initialize the tools
  const { user } = useUser(); 
  const { data: messages, add } = useDatabase('messages'); 
  
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  // 2. Auto-scroll to bottom whenever a new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. The logic to actually send the message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await add({
        content: newMessage,
        user_id: user.id,
        user_name: user.name || 'Member',
        created_at: new Date().toISOString(),
      });
      setNewMessage(''); 
    } catch (error) {
      console.error("Hearth Error:", error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', height: '85vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Permanent Welcome Banner */}
      <div style={{ background: 'rgba(99, 179, 237, 0.1)', borderLeft: '4px solid #63b3ed', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#63b3ed', fontSize: '1.1rem' }}>Welcome to The Embers 🌲</h3>
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#cbd5e0' }}>
          Our community campfire. Grab your <b>Free Bridge Builder PDFs</b> in the Resources tab and share a spark below.
        </p>
      </div>

      {/* Chat Window */}
      <div 
        ref={scrollRef}
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          background: '#1a202c', 
          borderRadius: '12px', 
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          border: '1px solid #2d3748'
        }}
      >
        {messages?.map((msg) => (
          <div 
            key={msg.id} 
            style={{ 
              alignSelf: msg.user_id === user?.id ? 'flex-end' : 'flex-start',
              background: msg.user_id === user?.id ? '#3182ce' : '#2d3748',
              padding: '10px 15px',
              borderRadius: '12px',
              maxWidth: '75%',
              color: 'white'
            }}
          >
            <div style={{ fontSize: '0.75rem', marginBottom: '4px', opacity: 0.7, fontWeight: 'bold' }}>
              {msg.user_name}
            </div>
            <div style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Share a thought with the grove..."
          style={{ 
            flex: 1, 
            padding: '12px', 
            borderRadius: '8px', 
            border: '1px solid #4a5568', 
            background: '#2d3748', 
            color: 'white' 
          }}
        />
        <button 
          onClick={handleSendMessage}
          style={{ 
            padding: '0 25px', 
            borderRadius: '8px', 
            background: '#63b3ed', 
            color: '#1a202c', 
            fontWeight: 'bold', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmbersChat;