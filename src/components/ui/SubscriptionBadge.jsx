import React from 'react';

const BADGE_CONFIG = {
  Seedling: {
    emoji: '🌱',
    label: 'Seedling',
    color: 'hsl(183, 80%, 45%)',
    bg: 'hsla(183, 80%, 45%, 0.1)',
    border: 'hsla(183, 80%, 45%, 0.25)',
    style: { textTransform: 'uppercase', fontWeight: 400 },
  },
  Hearthkeeper: {
    emoji: '🔥',
    label: 'Hearthkeeper',
    color: 'hsl(280, 65%, 72%)',
    bg: 'hsla(280, 65%, 72%, 0.1)',
    border: 'hsla(280, 65%, 72%, 0.25)',
    style: { fontWeight: 600 },
  },
  Steward: {
    emoji: '🌳',
    label: 'Steward',
    color: 'hsl(183, 60%, 32%)',
    bg: 'hsla(183, 60%, 32%, 0.1)',
    border: 'hsla(183, 60%, 32%, 0.3)',
    style: { fontWeight: 700 },
  },
  Patron: {
    emoji: '✨',
    label: 'Patron',
    color: 'hsl(45, 85%, 60%)',
    bg: 'hsla(45, 85%, 60%, 0.1)',
    border: 'hsla(45, 85%, 60%, 0.25)',
    style: { fontStyle: 'italic' },
  },
  Founder: {
    emoji: '🕯️',
    label: 'Founder',
    color: 'hsl(280, 65%, 72%)',
    bg: 'hsla(280, 65%, 72%, 0.12)',
    border: 'hsla(280, 65%, 72%, 0.4)',
    style: { fontWeight: 600 },
    glow: '0 0 6px 1px hsla(280, 65%, 72%, 0.45)',
  },
};

export default function SubscriptionBadge({ tier, isFounder }) {
  const config = isFounder ? BADGE_CONFIG.Founder : BADGE_CONFIG[tier] || BADGE_CONFIG.Seedling;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        fontSize: '10px',
        lineHeight: 1,
        marginLeft: '5px',
        padding: '2px 6px',
        borderRadius: '12px',
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.border}`,
        boxShadow: config.glow || 'none',
        backdropFilter: 'blur(4px)',
        ...config.style,
      }}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}