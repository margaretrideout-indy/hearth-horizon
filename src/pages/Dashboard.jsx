import React from 'react';

const TierBadge = ({ userTier = 'seedling' }) => {
  // --- TIER CONFIGURATION ---
  const tiers = {
    founder: {
      label: 'Founder',
      icon: '🕯️',
      color: '#2dd4bf', // Mint
      bg: 'rgba(45, 212, 191, 0.15)',
      description: 'The Hearth Builder'
    },
    steward: {
      label: 'Steward',
      icon: '🛡️',
      color: '#fde047', // Gold/Yellow
      bg: 'rgba(253, 224, 71, 0.1)',
      description: 'Protector of the Grove'
    },
    hearthkeeper: {
      label: 'Hearthkeeper',
      icon: '🔥',
      color: '#fb923c', // Orange/Flame
      bg: 'rgba(251, 146, 60, 0.1)',
      description: 'Nurturer of the Fire'
    },
    seedling: {
      label: 'Seedling',
      icon: '🌱',
      color: '#4ade80', // Soft Green
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
      {/* Icon with Glow */}
      <span style={{ 
        fontSize: '1.5rem', 
        filter: `drop-shadow(0 0 8px ${current.color})` 
      }}>
        {current.icon}
      </span>

      {/* Label and Description */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          color: current.color, 
          fontWeight: 'bold', 
          fontSize: '0.9rem', 
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {current.label}
        </span>
        <span style={{ 
          color: '#e2e8f0', 
          fontSize: '0.75rem', 
          opacity: 0.7 
        }}>
          {current.description}
        </span>
      </div>
    </div>
  );
};

export default TierBadge;