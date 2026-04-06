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
    hearthkeeper: "https://buy.stripe.com/your_actual_link_here_3", 
    steward: "https://buy.stripe.com/your_actual_link_here_5",
    plantASeed: "https://donate.stripe.com/your_actual_donation_link"
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'insights', label: 'Hearth Insights', icon: '🕯️' },
    { id: 'membership', label: 'The Grove', icon: '🌲' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const Sidebar = () => (
    <nav style={{ 
      width: '280px', padding: '50px 20px', borderRight: '1px solid rgba(255,255,255,0.05)', 
      display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', background: colors.bg 
    }}>
      <div style={{ fontWeight: '900', fontSize: '1.6rem', marginBottom: '60px', paddingLeft: '15px', color: colors.text }}>
        Hearth <span style={{ color: colors.accent }}>&</span> Horizon
      </div>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 20px',
            borderRadius: '15px', border: 'none', cursor: 'pointer', marginBottom: '10px',
            background: currentPage === item.id ? 'rgba(45, 212, 191, 0.15)' : 'transparent',
            color: currentPage === item.id ? colors.accent : colors.secondary,
            fontWeight: '700', textAlign: 'left', transition: '0.2s'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );

  const Dashboard = () => (
    <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ background: colors.card, padding: '60px 50px', borderRadius: '40px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.05em', margin: '0 0 10px 0', lineHeight: '1', color: colors.text }}>
          Welcome back, <br/>Margaret.
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.secondary, maxWidth: '500px', marginBottom: '25px' }}>
          Your transition to the tech sector is a bridge built on 13 years of expertise.
        </p>
        <div style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
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
        features: ['Access to The Embers chat', '2 Bridge crossings / mo', 'Foundational resources', 'Seedling profile badge']
      },
      {
        name: 'The Hearthkeeper', price: '$3', icon: '🔥', link: stripeLinks.hearthkeeper,
        desc: 'Our core membership for active career transition.',
        features: ['Everything in Seedling', 'UNLIMITED Bridge crossings', 'Teaching to Tech Guide', 'Priority processing speed']
      },
      {
        name: 'The Steward', price: '$5', tag: 'RECIPROCITY', icon: '🛡️', link: stripeLinks.steward,
        desc: 'For those ready to steward and support the forest.',
        features: ["Everything in Hearthkeeper", "The Steward's Roadmap Access", "Sponsor a peer seat", "Direct legacy impact"]
      },
      {
        name: 'Plant a Seed', price: 'Any', icon: '🌿', link: stripeLinks.plantASeed,
        desc: 'A one-time gift to keep the voucher pool growing.',
        features: ['One-time contribution', 'Directly fund the Voucher Pool', 'Legacy Community Support']
      }
    ];

    return (
      <div style={{ maxWidth: '1200px' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px', color: colors.text }}>Welcome to the Horizon</h2>
        <p style={{ textAlign: 'center', color: colors.secondary, marginBottom: '50px' }}>Select a tier to join our community or proceed to our secure Stripe checkout.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{ 
              background: colors.card, padding: '30px', borderRadius: '30px', 
              border: tier.name === 'The Hearthkeeper' ? `2px solid ${colors.accent}` : '1px solid rgba(255,255,255,0.05)', 
              display: 'flex', flexDirection: 'column', position: 'relative' 
            }}>
              {tier.tag && (
                <span style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '0.7rem', fontWeight: '900', color: colors.accent, background: 'rgba(45, 212, 191, 0.1)', padding: '4px 10px', borderRadius: '8px' }}>
                  {tier.tag}
                </span>
              )}
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{tier.icon}</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '900', margin: '0 0 5px 0', color: colors.text }}>{tier.name}</h4>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', margin: '10px 0', color: colors.text }}>
                {tier.price} <span style={{ fontSize: '0.9rem', color: colors.secondary, fontWeight: '400' }}>{tier.price.includes('$') && tier.price !== '$0' ? '/ mo' : ''}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: colors.secondary, marginBottom: '20px', minHeight: '40px' }}>{tier.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flexGrow: 1 }}>
                {tier.features.map((f, idx) => (
                  <li key={idx} style={{ color: colors.secondary, fontSize: '0.8rem', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: colors.accent }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              {tier.isFree ? (
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  style={{ width: '100%', padding: '12px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white', fontWeight: '900', cursor: 'pointer' }}>
                  Enter the Grove
                </button>
              ) : (
                <button 
                  onClick={() => window.open(tier.link, '_blank', 'noopener,noreferrer')}
                  style={{ width: '100%', padding: '12px', borderRadius: '15px', border: 'none', background: tier.name === 'The Hearthkeeper' || tier.name === 'The Steward' ? colors.accent : 'rgba(255,255,255,0.1)', color: tier.name === 'The Hearthkeeper' || tier.name === 'The Steward' ? colors.bg : 'white', fontWeight: '900', cursor: 'pointer' }}>
                  {tier.name === 'Plant a Seed' ? 'Contribute' : 'Select'}
                </button>
              )}
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
        {(currentPage === 'insights' || currentPage === 'settings') && (
          <div style={{ background: colors.card, padding: '40px', borderRadius: '35px' }}>
            <h2 style={{ fontWeight: '900', color: colors.text }}>{currentPage.toUpperCase()}</h2>
            <p style={{ color: colors.secondary }}>Development in progress.</p>
          </div>
        )}
      </main>
    </div>
  );
}