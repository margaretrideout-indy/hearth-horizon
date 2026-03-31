import React from 'react';
import { Heart, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

const moodEmojis = {
  hopeful: '🌱',
  anxious: '🌊',
  motivated: '🔥',
  grieving: '🍂',
  confident: '☀️',
  uncertain: '🌫️',
};

export default function RecentActivity({ checkIns = [] }) {
  if (checkIns.length === 0) {
    return (
      <div>
        <h2 className="font-heading font-semibold text-xl mb-4">Recent Reflections</h2>
        <Card className="p-8 text-center rounded-2xl border-dashed">
          <Heart className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No check-ins yet.</p>
          <p className="text-sm text-muted-foreground/70">Visit the Identity Anchor to start your first reflection.</p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading font-semibold text-xl mb-4">Recent Reflections</h2>
      <div className="space-y-3">
        {checkIns.slice(0, 3).map(checkIn => (
          <Card key={checkIn.id} className="p-4 rounded-xl flex items-center gap-4">
            <span className="text-2xl">{moodEmojis[checkIn.mood] || '💭'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium capitalize">{checkIn.mood}</p>
              {checkIn.reflection && (
                <p className="text-sm text-muted-foreground truncate">{checkIn.reflection}</p>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(new Date(checkIn.created_date), 'MMM d')}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}