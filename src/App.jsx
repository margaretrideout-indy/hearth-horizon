import React, { useState } from 'react';

const TierBadge = () => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
    background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', 
    border: '1px solid rgba(45, 212, 191, 0.25)', marginTop: '20px'
  }}>
    <span style={{ fontSize: '1.4rem' }}>🕯️</span>
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <span style={{ color: '#2dd4bf', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.05em' }}>FOUNDER</span>
      <span style={{ color: '#a0aec0', fontSize: '0.75rem' }}>The Hearth Builder</span>
    </div>
  </div>
);

const Dashboard = ({ user }) => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{
      background: 'rgba(42, 34, 51, 0.7)', padding: '60px 50px', borderRadius: '40px', 
      border: '1px solid rgba(45, 212, 191, 0.2)', marginBottom: '30px', textAlign: 'left',
      backdropFilter: 'blur(12px)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
    }}>
      <h1 style={{ fontSize: '5rem', margin: '0 0 15px 0', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: '1', color: 'white' }}>
        Welcome to the Horizon
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '550px', lineHeight: '1.5', margin: '0' }}>
        The path forward is clear, {user.name}. Your transition to tech is illuminated by 13 years of wisdom.
      </p>
      <TierBadge />
    </div>

    <div style={{ 
      background: 'rgba(42, 34, 51, 0.6)', padding: '40px', borderRadius: '35px', 
      border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left', backdropFilter: 'blur(10px)' 
    }}>
      <p style={{ color: '#2dd4bf', fontSize: '0.9rem', fontWeight: '900', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Ready for your next crossing?
      </p>
      <p style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: '0 0 25px 0', lineHeight: '1.6' }}>
        Upload your CV to <b>The Bridge Builder</b>. We'll translate your educational leadership into tech-sector data narratives.
      </p>
      <button style={{ 
        background: '#14b8a6', color: '#1e1b29', border: 'none', padding: '16px 36px', 
        borderRadius: '15px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem', transition: '0.2s'
      }}>
        Start Translation →
      </button>
    </div>
  </div>
);

const HearthInsights = () => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px', letterSpacing: '-0.02em', color: 'white' }}>Hearth Insights</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
      {['Teacher-to-Tech Dictionary', 'Linguistic Bridge Guide'].map((title, i) => (
        <div key={i} style={{ 
          background: 'rgba(42, 34, 51, 0.6)', padding: '30px', borderRadius: '30px', 
          border: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'left', backdropFilter: 'blur(10px)' 
        }}>
          <div style={{ fontSize: '2.3rem', marginBottom: '15px' }}>{i === 0 ? '📖' : '🌉'}</div>
          <h4 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>{title}</h4>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '10px' }}>Exclusive Hearthkeeper Resource</p>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const user = { name: 'Margaret' };

  // --- STYLING ---
  const bgPlum = '#1e1b29'; // The Deep Sanctuary Plum
  
  const navStyle = {
    display: 'flex', gap: '40px', padding: '30px 60px', background: bgPlum,
    alignItems: 'center', position: 'sticky', top: 0, zIndex: 100
  };

  const navLink = (id) => ({
    background: 'none', border: 'none', color: currentPage === id ? '#2dd4bf' : '#94a3b8',
    fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase',
    letterSpacing: '0.2em', borderBottom: currentPage === id ? '2px solid #2dd4bf' : '2px solid transparent',
    paddingBottom: '6px', transition: '0.3s'
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: bgPlum, 
      color: 'white', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <nav style={navStyle}>
        <div style={{ marginRight: 'auto', fontWeight: '900', fontSize: '1.5rem', letterSpacing: '-0.04em' }}>
          Hearth <span style={{ color: '#2dd4bf' }}>&</span> Horizon
        </div>
        <button onClick={() => setCurrentPage('dashboard')} style={navLink('dashboard')}>DASHBOARD</button>
        <button onClick={() => setCurrentPage('resources')} style={navLink('resources')}>INSIGHTS</button>
        <button onClick={() => setCurrentPage('join')} style={navLink('join')}>MEMBERSHIP</button>
      </nav>

      <main>
        {currentPage === 'dashboard' && <Dashboard user={user} />}
        {currentPage === 'resources' && <HearthInsights />}
        {currentPage === 'join' && (
          <div style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-0.02em', color: 'white' }}>The Grove</h1>
            <p style={{ color: '#94a3b8' }}>Cultivating new tiers for our community.</p>
          </div>
        )}
      </main>
    </div>
  );
}