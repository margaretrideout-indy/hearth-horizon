import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const moodEmojis = {
  hopeful: '🌱', anxious: '🌊', motivated: '🔥',
  grieving: '🍂', confident: '☀️', uncertain: '🌫️',
};

export default function CheckInHistory({ checkIns = [] }) {
  if (checkIns.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading font-semibold text-xl mb-4">Your Journey</h2>
      <div className="space-y-3">
        {checkIns.map(c => (
          <Card key={c.id} className="p-4 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{moodEmojis[c.mood] || '💭'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="capitalize text-xs">{c.mood}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(c.created_date), 'MMM d, yyyy')}
                  </span>
                </div>
                {c.prompt_used && (
                  <p className="text-xs text-muted-foreground italic mb-1">"{c.prompt_used}"</p>
                )}
                {c.reflection && (
                  <p className="text-sm text-foreground">{c.reflection}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}