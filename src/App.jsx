import React, { useState } from 'react';

// --- 1. THE TIER BADGE (Restored Glow) ---
const TierBadge = ({ userTier = 'seedling' }) => {
  const tiers = {
    founder: { label: 'Founder', icon: '🕯️', color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.15)', description: 'The Hearth Builder' },
    steward: { label: 'Steward', icon: '🛡️', color: '#fde047', bg: 'rgba(253, 224, 71, 0.1)', description: 'Protector of the Grove' },
    hearthkeeper: { label: 'Hearthkeeper', icon: '🔥', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)', description: 'Nurturer of the Fire' },
    seedling: { label: 'Seedling', icon: '🌱', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.1)', description: 'New Growth' }
  };
  const current = tiers[userTier.toLowerCase()] || tiers.seedling;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '15px', padding: '15px 25px',
      background: 'rgba(255, 255, 255, 0.03)', borderRadius: '20px',
      border: `1px solid ${current.bg}`, boxShadow: `0 0 20px ${current.bg}`,
      backdropFilter: 'blur(10px)', marginTop: '15px'
    }}>
      <span style={{ fontSize: '1.8rem', filter: `drop-shadow(0 0 10px ${current.color})` }}>{current.icon}</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: current.color, fontWeight: '800', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{current.label}</span>
        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{current.description}</span>
      </div>
    </div>
  );
};

// --- 2. DASHBOARD (Restored High-End Styling) ---
const Dashboard = ({ user }) => (
  <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', animation: 'fadeIn 0.5s ease-in' }}>
    <div style={{
      background: 'linear-gradient(145deg, rgba(20, 184, 166, 0.15) 0%, rgba(2, 6, 23, 0) 60%)',
      padding: '60px 40px', borderRadius: '32px', border: '1px solid rgba(20, 184, 166, 0.2)',
      marginBottom: '40px', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 15px 0', fontWeight: '900', letterSpacing: '-0.02em' }}>Welcome to the Horizon</h1>
        <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', lineHeight: '1.7' }}>The path forward is clear, Margaret. Your transition to tech is illuminated by 13 years of wisdom.</p>
        <TierBadge userTier={user.tier} />
      </div>
    </div>

    <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
      <div style={{ flex: 2, background: 'rgba(255,255,255,0.02)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ marginTop: 0, color: '#2dd4bf' }}>Ready for your next crossing?</h3>
        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Upload your CV to <b>The Bridge Builder</b>. We'll translate your educational leadership into tech-sector data narratives.</p>
        <button style={{ 
          background: '#14b8a6', color: 'white', border: 'none', padding: '12px 28px', 
          borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '10px',
          boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)'
        }}>Start Translation →</button>
      </div>
    </div>
  </div>
);

// --- 3. INSIGHTS (The Knowledge Grove) ---
const HearthInsights = () => (
  <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Hearth Insights</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
      {[
        { title: "Teacher-to-Tech Dictionary", tag: "Strategy", icon: "📖", color: "#2dd4bf" },
        { title: "Linguistic Bridge Guide", tag: "Data Quality", icon: "🌉", color: "#8b5cf6" },
        { title: "The Founder's Circle", tag: "Live", icon: "🕯️", color: "#fde047" }
      ].map((card, i) => (
        <div key={i} style={{ 
          background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: '0.3s'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{card.icon}</div>
          <div style={{ fontSize: '0.7rem', color: card.color, fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>{card.tag}</div>
          <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{card.title}</h4>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP ENGINE ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const user = { name: 'Margaret', tier: 'founder' };

  const navStyle = {
    display: 'flex', gap: '30px', padding: '25px 40px', background: 'rgba(2, 6, 23, 0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(15px)'
  };

  const navLink = (id) => ({
    background: 'none', border: 'none', color: currentPage === id ? '#2dd4bf' : '#94a3b8',
    fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', textTransform: 'uppercase',
    letterSpacing: '0.1em', transition: '0.3s', borderBottom: currentPage === id ? '2px solid #2dd4bf' : '2px solid transparent', paddingBottom: '5px'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={navStyle}>
        <div style={{ marginRight: 'auto', fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-0.03em' }}>
          Hearth <span style={{ color: '#2dd4bf' }}>&</span> Horizon
        </div>
        <button onClick={() => setCurrentPage('dashboard')} style={navLink('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentPage('resources')} style={navLink('resources')}>Insights</button>
        <button onClick={() => setCurrentPage('join')} style={navLink('join')}>Membership</button>
      </nav>

      {currentPage === 'dashboard' && <Dashboard user={user} />}
      {currentPage === 'resources' && <HearthInsights />}
      {currentPage === 'join' && <div style={{ padding: '100px', textAlign: 'center' }}><h1 style={{ fontSize: '3rem' }}>The Grove is Growing</h1><p style={{ color: '#94a3b8' }}>Tier selection coming soon.</p></div>}
    </div>
  );
}