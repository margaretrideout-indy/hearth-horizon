import React, { useState } from 'react';

const TierBadge = () => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px',
    background: '#0a0a0a', borderRadius: '14px', border: '1px solid #14b8a633', marginTop: '20px'
  }}>
    <span style={{ fontSize: '1.4rem' }}>🕯️</span>
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
      <span style={{ color: '#14b8a6', fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.05em' }}>FOUNDER</span>
      <span style={{ color: '#666', fontSize: '0.75rem' }}>The Hearth Builder</span>
    </div>
  </div>
);

const Dashboard = ({ user }) => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{
      background: '#0a0a0a', padding: '60px 50px', borderRadius: '35px', 
      border: '1px solid #14b8a633', marginBottom: '30px', textAlign: 'left'
    }}>
      <h1 style={{ fontSize: '5rem', margin: '0 0 10px 0', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: '0.9', color: 'white' }}>
        Welcome to the Horizon
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '550px', lineHeight: '1.5', margin: '0' }}>
        The path forward is clear, {user.name}. Your transition to tech is illuminated by 13 years of wisdom.
      </p>
      <TierBadge />
    </div>

    <div style={{ background: '#0a0a0a', padding: '40px', borderRadius: '30px', border: '1px solid #ffffff11', textAlign: 'left' }}>
      <p style={{ color: '#14b8a6', fontSize: '0.9rem', fontWeight: '900', marginBottom: '10px', textTransform: 'uppercase' }}>Ready for your next crossing?</p>
      <p style={{ color: '#888', fontSize: '1rem', margin: '0 0 25px 0', lineHeight: '1.6' }}>
        Upload your CV to <b>The Bridge Builder</b>. We'll translate your educational leadership into tech-sector data narratives.
      </p>
      <button style={{ 
        background: '#14b8a6', color: '#050505', border: 'none', padding: '14px 32px', 
        borderRadius: '12px', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem'
      }}>
        Start Translation →
      </button>
    </div>
  </div>
);

const HearthInsights = () => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '30px', letterSpacing: '-0.02em' }}>Hearth Insights</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {['Teacher-to-Tech Dictionary', 'Linguistic Bridge Guide'].map((title, i) => (
        <div key={i} style={{ background: '#0a0a0a', padding: '30px', borderRadius: '25px', border: '1px solid #ffffff11', textAlign: 'left' }}>
          <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{i === 0 ? '📖' : '🌉'}</div>
          <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900' }}>{title}</h4>
          <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>Exclusive Hearthkeeper Resource</p>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navStyle = {
    display: 'flex', gap: '30px', padding: '25px 50px', background: '#050505',
    alignItems: 'center', position: 'sticky', top: 0, zIndex: 100
  };

  const navLink = (id) => ({
    background: 'none', border: 'none', color: currentPage === id ? '#14b8a6' : '#666',
    fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase',
    letterSpacing: '0.15em', borderBottom: currentPage === id ? '2px solid #14b8a6' : '2px solid transparent',
    paddingBottom: '4px'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: 'white', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <nav style={navStyle}>
        <div style={{ marginRight: 'auto', fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-0.04em' }}>
          Hearth <span style={{ color: '#14b8a6' }}>&</span> Horizon
        </div>
        <button onClick={() => setCurrentPage('dashboard')} style={navLink('dashboard')}>DASHBOARD</button>
        <button onClick={() => setCurrentPage('resources')} style={navLink('resources')}>INSIGHTS</button>
        <button onClick={() => setCurrentPage('join')} style={navLink('join')}>MEMBERSHIP</button>
      </nav>

      {currentPage === 'dashboard' && <Dashboard user={{name: 'Margaret'}} />}
      {currentPage === 'resources' && <HearthInsights />}
      {currentPage === 'join' && (
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h1 style={{fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.02em'}}>The Grove</h1>
          <p style={{color: '#666'}}>Membership tiers are being cultivated.</p>
        </div>
      )}
    </div>
  );
}