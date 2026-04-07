import React from 'react';
import { Heart, Calendar, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const moodEmojis = {
  hopeful: '🌱',
  anxious: '🌊',
  motivated: '🔥',
  grieving: '🍂',
  confident: '☀️',
  uncertain: '🌫️',
};

export default function RecentActivity({ checkIns = [] }) {
  const queryClient = useQueryClient();

  const { mutate: saveMood, isLoading: isSaving } = useMutation({
    mutationFn: (mood) => base44.entities.DailyCheckIn.create({ mood }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentCheckIns'] });
    },
  });

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">
          Daily Pulse
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(moodEmojis).map(([mood, emoji]) => (
            <button
              key={mood}
              disabled={isSaving}
              onClick={() => saveMood(mood)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2D2438]/40 border border-white/5 transition-all group ${
                isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-500/50 hover:bg-orange-500/10'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{emoji}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight group-hover:text-orange-400">
                {mood}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">
          Recent Reflections
        </h2>
        
        {checkIns.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center">
            <Heart className="w-8 h-8 text-white/10 mb-4" />
            <p className="text-gray-400 font-medium mb-1">No reflections yet.</p>
            <p className="text-sm text-gray-500 mb-6 px-4">
              Visit <span className="text-orange-400/80 italic font-heading">The Rootwork</span> to anchor your first set of reflections.
            </p>
            <Link 
              to="/audit" 
              className="px-6 py-2 rounded-xl bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest hover:bg-orange-500/20 transition-all border border-orange-500/20 flex items-center gap-2"
            >
              <Plus className="w-3 h-3" /> Go to Rootwork
            </Link>
          </Card>
        ) : (
          <div className="grid gap-3">
            {checkIns.slice(0, 3).map(checkIn => (
              <Card key={checkIn.id} className="p-4 rounded-2xl bg-[#2D2438]/40 border-white/5 backdrop-blur-sm flex items-center gap-4 animate-in fade-in slide-in-from-top-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">
                  {moodEmojis[checkIn.mood] || '💭'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white capitalize tracking-tight">{checkIn.mood}</p>
                  {checkIn.reflection && (
                    <p className="text-xs text-gray-400 truncate mt-0.5 font-medium">{checkIn.reflection}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <Calendar className="w-3 h-3 text-orange-500/50" />
                  {format(new Date(checkIn.created_date), 'MMM d')}
                </div>
              </Card>
            ))}
            <Link 
              to="/audit" 
              className="text-[10px] font-black text-orange-400/60 uppercase tracking-widest text-center py-2 hover:text-orange-400 transition-colors"
            >
              Open The Rootwork →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}