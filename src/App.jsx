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

  // --- SUB-COMPONENTS ---

  const Sidebar = () => (
    <nav style={{ 
      width: '280px', 
      padding: '50px 20px', 
      borderRight: '1px solid rgba(255,255,255,0.05)', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'fixed', 
      height: '100vh',
      background: colors.bg 
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
      <div style={{ 
        background: colors.card, padding: '60px 50px', borderRadius: '40px', 
        border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'left' 
      }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.05em', margin: '0 0 10px 0', lineHeight: '1' }}>
          Welcome back, <br/>Margaret.
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.secondary, maxWidth: '500px', marginBottom: '25px' }}>
          Your transition to the tech sector is a bridge built on 13 years of expertise.
        </p>
        <div style={{ 
          display: 'inline-block', padding: '10px 24px', borderRadius: '12px', 
          background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)' 
        }}>
          <span style={{ color: colors.accent, fontWeight: '900', fontSize: '0.85rem', letterSpacing: '0.1em' }}>FOUNDER TIER</span>
        </div>
      </div>

      <div style={{ 
        background: colors.card, padding: '40px', borderRadius: '35px', 
        border: '1px solid rgba(255, 255, 255, 0.05)' 
      }}>
        <h3 style={{ color: colors.accent, fontSize: '1.2rem', fontWeight: '900', margin: '0 0 10px 0' }}>Ready to cross the bridge?</h3>
        <p style={{ color: colors.secondary, margin: '0 0 30px 0' }}>Upload your latest CV to begin the linguistic translation into tech data roles.</p>
        <button 
          onClick={() => alert("Initializing Bridge Builder...")}
          style={{ 
            background: colors.accent, color: colors.bg, border: 'none', 
            padding: '16px 36px', borderRadius: '15px', fontWeight: '900', cursor: 'pointer' 
          }}
        >
          Start Translation →
        </button>
      </div>
    </div>
  );

  const TheGrove = () => (
    <div style={{ maxWidth: '1000px' }}>
      <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '40px' }}>The Grove</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        {[
          { title: 'The Seedling', icon: '🌱' },
          { title: 'The Hearthkeeper', icon: '🔥' }
        ].map((tier, i) => (
          <div key={i} style={{ 
            background: colors.card, padding: '40px', borderRadius: '35px', 
            border: '1px solid rgba(255, 255, 255, 0.05)' 
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{tier.icon}</div>
            <h4 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>{tier.title}</h4>
            <p style={{ color: colors.secondary, marginTop: '15px', lineHeight: '1.6' }}>
              Active membership tier details and community voting rights.
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const Insights = () => (
    <div style={{ maxWidth: '1000px' }}>
      <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '40px' }}>Hearth Insights</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        {[
          { title: 'Teacher-to-Tech Dictionary', icon: '📖' },
          { title: 'Linguistic Bridge Guide', icon: '🌉' }
        ].map((item, i) => (
          <div key={i} style={{ 
            background: colors.card, padding: '40px', borderRadius: '35px', 
            border: '1px solid rgba(255, 255, 255, 0.05)' 
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{item.icon}</div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: '900', margin: 0 }}>{item.title}</h4>
            <p style={{ color: colors.secondary, marginTop: '10px' }}>Exclusive Hearthkeeper Resource</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', minHeight: '100vh', background: colors.bg, 
      color: colors.text, fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '280px', padding: '80px 60px' }}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'membership' && <TheGrove />}
        {currentPage === 'insights' && <Insights />}
        {currentPage === 'settings' && (
          <div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900' }}>Settings</h2>
            <p style={{ color: colors.secondary }}>Manage your sanctuary preferences and account details.</p>
          </div>
        )}
      </main>
    </div>
  );
}