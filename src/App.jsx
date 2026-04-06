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
      <div style={{ fontWeight: '900', fontSize: '1.6rem', marginBottom: '60px', paddingLeft: '15px' }}>
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
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.05em', margin: '0 0 10px 0', lineHeight: '1' }}>
          Welcome back, <br/>Margaret.
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.secondary, maxWidth: '500px', marginBottom: '25px' }}>
          Your transition to the tech sector is a bridge built on 13 years of expertise.
        </p>
        <div style={{ display: 'inline-block', padding: '10px 24px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
          <span style={{ color: colors.accent, fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.1em' }}>FOUNDER TIER</span>
        </div>
      </div>

      <div style={{ background: colors.card, padding: '40px', borderRadius: '35px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <h3 style={{ color: colors.accent, fontSize: '1.2rem', fontWeight: '900', margin: '0 0 10px 0' }}>Ready to cross the bridge?</h3>
        <p style={{ color: colors.secondary, margin: '0 0 30px 0' }}>Upload your latest CV to begin the linguistic translation into tech data roles.</p>
        <button style={{ background: colors.accent, color: colors.bg, border: 'none', padding: '16px 36px', borderRadius: '15px', fontWeight: '900', cursor: 'pointer' }}>
          Start Translation →
        </button>
      </div>
    </div>
  );

  const TheGrove = () => {
    const tiers = [
      {
        name: 'The Seedling', price: '$0', tag: 'FREE', icon: '🌱',
        features: ['Access to **The Embers** chat', '2 Bridge Builder crossings / mo', 'Foundational resources', 'Seedling profile badge']
      },
      {
        name: 'The Hearthkeeper', price: '$3', icon: '🔥',
        features: ['Everything in **Seedling**', 'UNLIMITED Bridge crossings', 'Insight: Teaching to Tech Guide', 'Priority processing speed', 'Hearthkeeper profile badge']
      },
      {
        name: 'The Steward', price: '$5', tag: 'Reciprocity', icon: '🛡️',
        features: ["Everything in **Hearthkeeper**", "The Steward's Vote (Roadmap)", "Sponsor a peer seat", "Community Voting rights", "Steward profile badge"]
      },
      {
        name: 'Plant a Seed', price: 'Custom', icon: '🌿',
        features: ['Flexible one-time contribution', 'Directly fund the Voucher Pool', 'Legacy Community Support']
      }
    ];

    return (
      <div style={{ maxWidth: '1200px' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', textAlign: 'center', marginBottom: '10px' }}>Welcome to the Horizon</h2>
        <p style={{ textAlign: 'center', color: colors.secondary, marginBottom: '50px' }}>Choose your place in the grove. Whether you're just starting your crossing or ready to steward the forest, there is a seat by the hearth for you.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {tiers.map((tier, i) => (
            <div key={i} style={{ background: colors.card, padding: '30px', borderRadius: '30px', border: tier.name === 'The Hearthkeeper' ? `2px solid ${colors.accent}` : '1px solid rgba(255,255,255,0.05)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {tier.tag && <span style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '0.7rem', fontWeight: '900', color: colors.secondary, background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '8px' }}>{tier.tag}</span>}
              <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{tier.icon} <span style={{ fontSize: '0.8rem', fontWeight: '900', color: colors.secondary, textTransform: 'uppercase', marginLeft: '10px' }}>{tier.name}</span></div>
              <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '10px 0' }}>{tier.price} <span style={{ fontSize: '1rem', color: colors.secondary }}>{tier.price !== 'Custom' && '/ mo'}</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', flexGrow: 1 }}>
                {tier.features.map((f, idx) => (
                  <li key={idx} style={{ color: colors.secondary, fontSize: '0.85rem', marginBottom: '12px', display: 'flex', gap: '10px' }}>
                    <span style={{ color: colors.accent }}>✓</span> {f.replace(/\*\*/g, '')}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '12px', borderRadius: '20px', border: tier.name === 'The Hearthkeeper' || tier.name === 'The Steward' ? 'none' : '1px solid rgba(255,255,255,0.1)', background: tier.name === 'The Hearthkeeper' || tier.name === 'The Steward' ? colors.accent : 'transparent', color: tier.name === 'The Hearthkeeper' || tier.name === 'The Steward' ? colors.bg : 'white', fontWeight: '900', cursor: 'pointer' }}>
                {tier.name === 'Plant a Seed' ? 'Contribute' : tier.name === 'The Seedling' ? 'Enter the Grove' : 'Select'}
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
        {(currentPage === 'insights' || currentPage === 'settings') && <div style={{ background: colors.card, padding: '40px', borderRadius: '35px' }}><h2 style={{ fontWeight: '900' }}>{currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h2><p style={{ color: colors.secondary }}>Coming soon.</p></div>}
      </main>
    </div>
  );
}