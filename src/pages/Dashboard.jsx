import React from 'react';

const TierBadge = ({ userTier = 'seedling' }) => {
  const tiers = {
    founder: {
      label: 'Founder',
      icon: '🕯️',
      color: '#2dd4bf', 
      bg: 'rgba(45, 212, 191, 0.15)',
      description: 'The Hearth Builder'
    },
    steward: {
      label: 'Steward',
      icon: '🛡️',
      color: '#fde047', 
      bg: 'rgba(253, 224, 71, 0.1)',
      description: 'Protector of the Grove'
    },
    hearthkeeper: {
      label: 'Hearthkeeper',
      icon: '🔥',
      color: '#fb923c', 
      bg: 'rgba(251, 146, 60, 0.1)',
      description: 'Nurturer of the Fire'
    },
    seedling: {
      label: 'Seedling',
      icon: '🌱',
      color: '#4ade80', 
      bg: 'rgba(74, 222, 128, 0.1)',
      description: 'New Growth'
    }
  };

  const current = tiers[userTier.toLowerCase()] || tiers.seedling;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 20px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      border: `1px solid ${current.bg}`,
      boxShadow: `0 4px 20px ${current.bg}`,
      backdropFilter: 'blur(12px)',
      marginTop: '10px'
    }}>
      <span style={{ fontSize: '1.5rem', filter: `drop-shadow(0 0 8px ${current.color})` }}>
        {current.icon}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: current.color, fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {current.label}
        </span>
        <span style={{ color: '#e2e8f0', fontSize: '0.75rem', opacity: 0.7 }}>
          {current.description}
        </span>
      </div>
    </div>
  );
};

const Dashboard = ({ user }) => {
  const userTier = user?.tier || 'seedling'; 
  
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    flex: '1',
    minWidth: '200px'
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      color: 'white', 
      fontFamily: 'sans-serif' 
    }}>
      
      <div style={{
        background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
        padding: '40px',
        borderRadius: '24px',
        border: '1px solid rgba(13, 148, 136, 0.3)',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', fontWeight: '800' }}>
            Welcome to the Horizon
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: '600px', lineHeight: '1.6' }}>
            The path forward is clear, {user?.name || 'Margaret'}. Use your dashboard to track your progress and access your insights.
          </p>
          <TierBadge userTier={userTier} />
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', marginBottom: '8px' }}>
            Bridge Crossings
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
            {userTier === 'seedling' ? '1 / 2' : 'Unlimited'}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#2dd4bf', marginTop: '4px' }}>
            {userTier === 'seedling' ? 'Resets in 12 days' : 'Priority Processing Active'}
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', marginBottom: '8px' }}>
            Community Sparks
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>12</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '4px' }}>Messages in The Embers</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', marginBottom: '8px' }}>
            Hearth Insights
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2dd4bf' }}>
            {userTier === 'seedling' ? 'Upgrade to Unlock' : 'Teaching to Tech Guide'}
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(13, 148, 136, 0.1)', padding: '25px', borderRadius: '20px', border: '1px solid rgba(13, 148, 136, 0.3)' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Ready for your next crossing?</h3>
        <p style={{ opacity: 0.8, fontSize: '0.95rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Upload your latest CV to <b>The Bridge Builder</b> and let the AI translate your 13 years of experience into tech-ready language.
        </p>
        <button style={{ 
          marginTop: '15px', 
          padding: '12px 24px', 
          background: '#0d9488', 
          color: 'white', 
          border: 'none', 
          borderRadius: '10px', 
          fontWeight: 'bold', 
          cursor: 'pointer' 
        }}>
          Go to The Bridge Builder →
        </button>
      </div>

    </div>
  );
};

export default Dashboard;