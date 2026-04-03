import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const FOUNDING_LIMIT = 25;

export function useFoundingCount() {
  const { data: users = [] } = useQuery({
    queryKey: ['foundingCount'],
    queryFn: () => base44.entities.User.list(),
    staleTime: 60_000,
  });
  const count = users.filter(u => u.is_founding_member).length;
  return { count, spotsLeft: Math.max(0, FOUNDING_LIMIT - count), isFoundingActive: count < FOUNDING_LIMIT };
}

export default function FoundingCounter() {
  const { count, spotsLeft, isFoundingActive } = useFoundingCount();
  if (!isFoundingActive) return null;

  return (
    <div className="text-center">
      <p className="text-xs font-medium" style={{ color: 'hsl(152, 60%, 48%)' }}>
        🍃 Founding Forest Status: <span className="font-bold">{spotsLeft}</span> spot{spotsLeft !== 1 ? 's' : ''} remaining at our legacy rate.
      </p>
    </div>
  );
}