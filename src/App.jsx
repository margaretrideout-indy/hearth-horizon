import React, { useState } from 'react';

// --- 1. THE TIER BADGE ---
const TierBadge = ({ userTier = 'seedling' }) => {
  const tiers = {
    founder: { label: 'Founder', icon: '🕯️', color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.15)', description: 'The Hearth Builder' },
    steward: { label: 'Steward', icon: '🛡️', color: '#fde047', bg: 'rgba(253, 224, 71, 0.1)', description: 'Protector of the Grove' },
    hearthkeeper: { label: 'Hearthkeeper', icon: '🔥', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)', description: 'Nurturer of the Fire' },
    seedling: { label: 'Seedling', icon: '🌱', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', description: 'New Growth' }
  };
  const current = tiers[userTier.toLowerCase()] || tiers.seedling;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', border: `1px solid ${current.bg}`, marginTop: '10px' }}>
      <span style={{ fontSize: '1.5rem' }}>{current.icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: current.color, fontWeight: 'bold', fontSize: '0.9rem' }}>{current.label}</span>
        <span style={{ color: '#e2e8f0', fontSize: '0.75rem', opacity: 0.7 }}>{current.description}</span>
      </div>
    </div>
  );
};

// --- 2. DASHBOARD PAGE ---
const Dashboard = ({ user }) => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, rgba(0, 0, 0, 0) 100%)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(13, 148, 136, 0.3)', marginBottom: '40px' }}>
      <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>Welcome to the Horizon</h1>
      <p style={{ opacity: 0.8 }}>The path forward is clear, {user?.name}.</p>
      <TierBadge userTier={user.tier} />
    </div>
    <div style={{ background: 'rgba(13, 148, 136, 0.1)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(13, 148, 136, 0.3)' }}>
      <h3>Ready for your next crossing?</h3>
      <p style={{ opacity: 0.7 }}>Upload your CV to The Bridge Builder to begin.</p>
    </div>
  </div>
);

// --- 3. INSIGHTS PAGE ---
const HearthInsights = ({ userTier }) => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ marginBottom: '30px' }}>Hearth Insights</h1>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3>The Teacher-to-Tech Dictionary</h3>
      <p style={{ opacity: 0.7 }}>Coming soon for Hearthkeepers.</p>
    </div>
  </div>
);

// --- 4. MAIN APP ENGINE (No Router Version) ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user] = useState({ name: 'Margaret', tier: 'founder' });

  const navStyle = {
    display: 'flex', gap: '20px', padding: '20px', background: 'rgba(0,0,0,0.5)',
    borderBottom: '1px solid rgba(255,255,255,0.1)', alignItems: 'center'
  };

  const linkStyle = (page) => ({
    color: currentPage === page ? '#2dd4bf' : 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '1rem'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'sans-serif' }}>
      <nav style={navStyle}>
        <div style={{ marginRight: 'auto', fontWeight: 'bold', fontSize: '1.2rem' }}>Hearth & Horizon</div>
        <button onClick={() => setCurrentPage('dashboard')} style={linkStyle('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentPage('resources')} style={linkStyle('resources')}>Insights</button>
        <button onClick={() => setCurrentPage('join')} style={linkStyle('join')}>Membership</button>
      </nav>

      {/* RENDER CONTENT BASED ON STATE */}
      {currentPage === 'dashboard' && <Dashboard user={user} />}
      {currentPage === 'resources' && <HearthInsights userTier={user.tier} />}
      {currentPage === 'join' && <div style={{ padding: '40px', textAlign: 'center' }}><h1>Membership Options</h1></div>}
    </div>
  );
}