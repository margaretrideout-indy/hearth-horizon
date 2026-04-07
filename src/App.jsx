import React, { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const colors = {
    bg: '#1c1921',
    card: '#241f2a',
    accent: '#2dd4bf',
    text: '#ffffff',
    secondary: '#94a3b8'
  };

  const stripeLinks = {
    hearthkeeper: "https://buy.stripe.com/your_actual_link_3", 
    steward: "https://buy.stripe.com/your_actual_link_5",
    plantASeed: "https://donate.stripe.com/your_donation_link"
  };

  const Sidebar = () => (
    <nav style={{ 
      width: '280px', padding: '50px 20px', borderRight: '1px solid rgba(255,255,255,0.05)', 
      display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', background: colors.bg 
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.6rem', marginBottom: '40px', paddingLeft: '15px', color: colors.text }}>
        Hearth <span style={{ color: colors.accent }}>&</span> Horizon
      </div>
      
      <div style={{ fontSize: '0.7rem', fontWeight: '900', color: colors.secondary, letterSpacing: '0.1em', marginBottom: '15px', paddingLeft: '20px' }}>YOUR HEARTH</div>
      <button onClick={() => setCurrentPage('dashboard')} style={navButtonStyle(currentPage === 'dashboard')}>
        <span>🏠</span> Dashboard
      </button>
      <button onClick={() => setCurrentPage('insights')} style={navButtonStyle(currentPage === 'insights')}>
        <span>🕯️</span> Hearth Insights
      </button>

      <div style={{ fontSize: '0.7rem', fontWeight: '900', color: colors.secondary, letterSpacing: '0.1em', marginTop: '30px', marginBottom: '15px', paddingLeft: '20px' }}>COMMUNITY</div>
      <button onClick={() => setCurrentPage('membership')} style={navButtonStyle(currentPage === 'membership')}>
        <span>🌲</span> The Grove
      </button>
      
      <div style={{ marginTop: 'auto' }}>
        <button onClick={() => setCurrentPage('settings')} style={navButtonStyle(currentPage === 'settings')}>
          <span>⚙️</span> Settings
        </button>
      </div>
    </nav>
  );

  const navButtonStyle = (isActive) => ({
    display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 20px', width: '100%',
    borderRadius: '15px', border: 'none', cursor: 'pointer', marginBottom: '8px',
    background: isActive ? 'rgba(45, 212, 191, 0.12)' : 'transparent',
    color: isActive ? colors.accent : colors.secondary,
    fontWeight: '700', textAlign: 'left', transition: '0.2s'
  });

  const Dashboard = () => (
    <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ background: colors.card, padding: '60px 50px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', letterSpacing: '-0.05em', margin: '0 0 10px 0', lineHeight: '1', color: colors.text }}>
          Welcome back, <br/>Margaret.
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.secondary, maxWidth: '500px', marginBottom: '25px' }}>
          Your transition to the tech sector is a bridge built on 13 years of expertise.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
          <span>🕯️</span>
          <span style={{ color: colors.accent, fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.1em' }}>FOUNDER TIER</span>
        </div>
      </div>
    </div>
  );

  const TheGrove = () => {
    const tiers = [
      {
        name: 'The Seedling', price: '$0', tag: 'FREE', icon: '🌱', isFree: true,
        desc: 'For those just beginning to explore the crossing.',
        features: ['Access to The Embers chat', '2 Bridge crossings / mo', 'Seedling profile badge']
      },
      {
        name: 'The Hearthkeeper', price: '$3', icon: '🔥', link: stripeLinks.hearthkeeper,
        desc: 'Our core membership for active career transition.',
        features: ['Everything in Seedling', 'UNLIMITED Bridge crossings', 'Teaching to Tech Guide']
      },
      {
        name: 'The Steward', price: '$5', tag: 'RECIPROCITY', icon: '🛡️', link: stripeLinks.steward,
        desc: 'For those ready to steward and support the forest.',
        features: ["Everything in Hearthkeeper", "Sponsor a peer seat", "Direct legacy impact"]
      },
      {
        name: 'Plant a Seed', price: 'Any', icon: '🌿', link: stripeLinks.plantASeed,
        desc: 'A one-time gift to keep the voucher pool growing.',
        features: ['One-time contribution', 'Directly fund the Voucher Pool', 'Community Support']
      }
    ];

    return (
      <div style={{ maxWidth: '1200px' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '10px', color: colors.text }}>The Grove</h2>
        <p style={{ color: colors.secondary, marginBottom: '50px' }}>Cultivating new tiers for our community.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{ 
              background: colors.card, padding: '30px', borderRadius: '30px', 
              border: tier.name === 'The Hearthkeeper' ? `2px solid ${colors.accent}` : '1px solid rgba(255,255,255,0.05)', 
              display: 'flex', flexDirection: 'column', position: 'relative' 
            }}>
              {tier.tag && (
                <span style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '0.65rem', fontWeight: '900', color: colors.accent, background: 'rgba(45, 212, 191, 0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                  {tier.tag}
                </span>
              )}
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{tier.icon}</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '900', margin: '0 0 5px 0', color: colors.text }}>{tier.name}</h4>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', margin: '10px 0', color: colors.text }}>
                {tier.price} <span style={{ fontSize: '0.8rem', color: colors.secondary, fontWeight: '400' }}>{tier.price.includes('$') && !tier.isFree ? '/ mo' : ''}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: colors.secondary, marginBottom: '20px', minHeight: '40px', lineHeight: '1.5' }}>{tier.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1 }}>
                {tier.features.map((f, idx) => (
                  <li key={idx} style={{ color: colors.secondary, fontSize: '0.8rem', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: colors.accent }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => tier.isFree ? setCurrentPage('dashboard') : window.open(tier.link, '_blank', 'noopener,noreferrer')}
                style={{ 
                  width: '100%', padding: '12px', borderRadius: '15px', border: 'none', 
                  background: tier.isFree ? 'rgba(255,255,255,0.05)' : colors.accent, 
                  color: tier.isFree ? 'white' : colors.bg, 
                  fontWeight: '900', cursor: 'pointer', transition: '0.2s' 
                }}>
                {tier.isFree ? 'Enter Grove' : tier.name === 'Plant a Seed' ? 'Contribute' : 'Select Tier'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: 'system-ui, sans-serif' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '280px', padding: '80px 60px' }}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'membership' && <TheGrove />}
        {currentPage === 'insights' && (
          <div style={{ maxWidth: '900px' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: colors.text, marginBottom: '10px' }}>Hearth Insights</h2>
            <p style={{ color: colors.secondary, marginBottom: '40px' }}>Exclusive resources for our community members.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div style={{ background: colors.card, padding: '30px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '2rem' }}>📖</span>
                <h3 style={{ margin: '15px 0 5px 0' }}>Teacher-to-Tech Dictionary</h3>
                <p style={{ color: colors.secondary, fontSize: '0.9rem' }}>Translate your pedagogical skills into industry-standard tech terminology.</p>
              </div>
              <div style={{ background: colors.card, padding: '30px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '2rem' }}>🌉</span>
                <h3 style={{ margin: '15px 0 5px 0' }}>Linguistic Bridge Guide</h3>
                <p style={{ color: colors.secondary, fontSize: '0.9rem' }}>A deep dive into language model safety and data annotation quality.</p>
              </div>
            </div>
          </div>
        )}
        {currentPage === 'settings' && (
          <div style={{ background: colors.card, padding: '40px', borderRadius: '35px' }}>
            <h2 style={{ fontWeight: '900', color: colors.text }}>SETTINGS</h2>
            <p style={{ color: colors.secondary }}>Profile and preferences management.</p>
          </div>
        )}
      </main>
    </div>
  );
}