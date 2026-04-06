import React from 'react';

const PricingSection = () => {
  const mintTeal = '#2dd4bf';
  const brandTeal = '#0d9488';
  const glassBg = 'rgba(255, 255, 255, 0.05)';
  const borderStyle = '1px solid rgba(255, 255, 255, 0.1)';

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '40px 20px',
    fontFamily: 'sans-serif'
  };

  const cardStyle = {
    background: glassBg,
    border: borderStyle,
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    backdropFilter: 'blur(10px)',
    flex: '1',
    minWidth: '280px',
    maxWidth: '350px',
    color: 'white'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    marginTop: '20px',
    lineHeight: '1.8',
    fontSize: '0.95rem'
  };

  const checkStyle = {
    color: mintTeal,
    marginRight: '8px',
    fontSize: '1rem'
  };

  return (
    <div style={containerStyle}>
      
      {/* SEEDLING CARD */}
      <div style={cardStyle}>
        <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>🌱 The Seedling</div>
        <h2 style={{ margin: '0 0 10px 0' }}>The Grove</h2>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$0 <span style={{ fontSize: '1rem', opacity: 0.5 }}>/mo</span></div>
        
        <ul style={listStyle}>
          <li><span style={checkStyle}>✓</span> Access to <b>The Embers</b> chat</li>
          <li><span style={checkStyle}>✓</span> 2 Bridge Builder crossings / mo</li>
          <li><span style={checkStyle}>✓</span> Foundational resources</li>
          <li><span style={checkStyle}>✓</span> 🌱 Seedling profile badge</li>
        </ul>
        
        <button style={{ marginTop: 'auto', padding: '12px', borderRadius: '30px', border: borderStyle, background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Enter the Grove
        </button>
      </div>

      {/* HEARTHKEEPER CARD */}
      <div style={{ ...cardStyle, border: `1px solid ${brandTeal}`, boxShadow: `0 0 20px rgba(13, 148, 136, 0.2)` }}>
        <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>🔥 The Hearthkeeper</div>
        <h2 style={{ margin: '0 0 10px 0' }}>The Fire</h2>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$3 <span style={{ fontSize: '1rem', opacity: 0.5 }}>/mo</span></div>
        
        <ul style={listStyle}>
          <li><span style={checkStyle}>✓</span> Everything in <b>Seedling</b></li>
          <li style={{ color: mintTeal, fontWeight: 'bold' }}><span style={checkStyle}>✓</span> UNLIMITED Bridge crossings</li>
          <li style={{ color: mintTeal, fontWeight: 'bold' }}><span style={checkStyle}>✓</span> Insight: Teaching to Tech Guide</li>
          <li><span style={checkStyle}>✓</span> Priority processing speed</li>
          <li><span style={checkStyle}>✓</span> 🔥 Hearthkeeper profile badge</li>
        </ul>
        
        <button style={{ marginTop: 'auto', padding: '12px', borderRadius: '30px', border: 'none', background: brandTeal, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Select
        </button>
      </div>

      {/* STEWARD CARD */}
      <div style={cardStyle}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0, top: 0, background: 'rgba(45, 212, 191, 0.2)', color: mintTeal, padding: '2px 10px', borderRadius: '10px', fontSize: '0.7rem' }}>Reciprocity</div>
          <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>🛡️ The Steward</div>
        </div>
        <h2 style={{ margin: '0 0 10px 0' }}>The Protector</h2>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$5 <span style={{ fontSize: '1rem', opacity: 0.5 }}>/mo</span></div>
        
        <ul style={listStyle}>
          <li><span style={checkStyle}>✓</span> Everything in <b>Hearthkeeper</b></li>
          <li style={{ color: mintTeal, fontWeight: 'bold' }}><span style={checkStyle}>✓</span> The Steward's Vote (Roadmap)</li>
          <li style={{ color: mintTeal, fontWeight: 'bold' }}><span style={checkStyle}>✓</span> Sponsor a peer seat</li>
          <li><span style={checkStyle}>✓</span> Community Voting rights</li>
          <li><span style={checkStyle}>✓</span> 🛡️ Steward profile badge</li>
        </ul>
        
        <button style={{ marginTop: 'auto', padding: '12px', borderRadius: '30px', border: 'none', background: brandTeal, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          Select
        </button>
      </div>

    </div>
  );
};

export default PricingSection;