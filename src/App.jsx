import React, { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isTranslating, setIsTranslating] = useState(false);

  const colors = {
    bg: '#241f31',
    card: '#2d283e',
    accent: '#2dd4bf',
    text: '#ffffff',
    secondary: '#94a3b8'
  };

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      alert("Bridge Builder: Initializing linguistic data translation...");
      setIsTranslating(false);
    }, 800);
  };

  const cardStyle = {
    background: colors.card,
    borderRadius: '35px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '40px',
    textAlign: 'left',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  };

  const Dashboard = () => (
    <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div style={{ ...cardStyle, padding: '60px 50px', background: 'linear-gradient(145deg, #2d283e, #241f31)' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '900', letterSpacing: '-0.05em', margin: '0 0 10px 0', lineHeight: '0.9', color: colors.text }}>
          Welcome back, <br/>Margaret.
        </h1>
        <p style={{ fontSize: '1.2rem', color: colors.secondary, maxWidth: '500px', marginBottom: '25px' }}>
          Your 13 years of expertise is the bedrock of this transition.
        </p>
        <div style={{ display: 'inline-block', padding: '10px 20px', borderRadius: '12px', background: 'rgba(45, 212, 191, 0.1)', border: '1px solid rgba(45, 212, 191, 0.3)' }}>
          <span style={{ color: colors.accent, fontWeight: '900', fontSize: '0.8rem', letterSpacing: '0.1em' }}>FOUNDER TIER</span>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: colors.accent, fontSize: '1.2rem', fontWeight: '900', margin: '0 0 10px 0' }}>Ready to cross the bridge?</h3>
        <p style={{ color: colors.secondary, margin: '0 0 30px 0' }}>Upload your CV to begin the linguistic translation into tech-sector data narratives.</p>
        <button 
          onClick={handleTranslate}
          style={{ 
            background: colors.accent, color: colors.bg, border: 'none', 
            padding: '16px 36px', borderRadius: '15px', fontWeight: '900', 
            cursor: 'pointer', transition: 'transform 0.1s',
            opacity: isTranslating ? 0.7 : 1
          }}
        >
          {isTranslating ? 'Processing...' : 'Start Translation →'}
        </button>
      </div>
    </div>
  );

  const Membership = () => (
    <div style={{ maxWidth: '1000px' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '40px', color: colors.text }}>The Grove</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {['The Seedling', 'The Hearthkeeper'].map((tier, i) => (
          <div key={i} style={cardStyle}>
            <div style={{fontSize: '2rem', marginBottom: '10px'}}>{i === 0 ? '🌱' : '🔥'}</div>
            <h4 style={{fontSize: '1.5rem', fontWeight: '900', margin: 0, color: colors.text}}>{tier}</h4>
            <p style={{color: colors.secondary, marginTop: '10px'}}>Active membership tier details and community voting rights.</p>
          </div>
        ))}
      </div>
    </div>
  );

  const GenericPage = ({ title }) => (
    <div style={cardStyle}>
      <h2 style={{fontWeight: '900', color: colors.text}}>{title}</h2>
      <p style={{color: colors.secondary}}>This section is currently being cultivated. Resources for your career transition will appear here shortly.</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <nav style={{ width: '280px', padding: '50px 20px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh' }}>
        <div style={{ fontWeight: '900', fontSize: '1.6rem', marginBottom: '60px', paddingLeft: '15px' }}>
          Hearth <span style={{ color: colors.accent }}>&</span> Horizon
        </div>
        
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
          { id: 'insights', label: 'Hearth Insights', icon: '🕯️' },
          { id: 'membership', label: 'The Grove', icon: '🌲' },
          { id: 'settings', label: 'Settings', icon: '⚙️' }
        ].map((link) => (
          <button
            key={link.id}
            onClick={() => setCurrentPage(link.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '15px', padding: '16px 20px',
              borderRadius: '15px', border: 'none', cursor: 'pointer', marginBottom: '10px',
              background: currentPage === link.id ? 'rgba(45, 212, 191, 0.15)' : 'transparent',
              color: currentPage === link.id ? colors.accent : colors.secondary,
              fontWeight: '700', textAlign: 'left', transition: '0.2s'
            }}
          >
            <span style={{fontSize: '1.2rem'}}>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </nav>

      <main style={{ flex: 1, marginLeft: '280px', padding: '80px 60px' }}>
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'membership' && <Membership />}
        {currentPage === 'insights' && <GenericPage title="Hearth Insights" />}
        {currentPage === 'settings' && <GenericPage title="Settings" />}
      </main>
    </div>
  );
}