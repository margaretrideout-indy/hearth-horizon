import React, { useState } from 'react';
import { Heart, Calendar, Plus, Send, X, Network } from 'lucide-react';
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
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');

  const { mutate: saveCheckIn, isLoading: isSaving } = useMutation({
    mutationFn: (data) => base44.entities.DailyCheckIn.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentCheckIns'] });
      setSelectedMood(null);
      setReflection('');
    },
  });

  const handleSubmit = () => {
    if (!selectedMood) return;
    saveCheckIn({ mood: selectedMood, reflection: reflection });
  };

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div className="space-y-1 px-1">
          <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
            The Daily Pulse
          </h2>
          <p className="text-gray-400 text-sm font-medium">
            How is your transition feeling today?
          </p>
        </div>
        
        {!selectedMood ? (
          <div className="flex flex-wrap gap-2 animate-in fade-in zoom-in-95">
            {Object.entries(moodEmojis).map(([mood, emoji]) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#2D2438]/40 border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{emoji}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight group-hover:text-orange-400">
                  {mood}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3 animate-in slide-in-from-left-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{moodEmojis[selectedMood]}</span>
                <span className="text-xs font-bold text-white uppercase tracking-widest italic">Tracing the {selectedMood}...</span>
              </div>
              <button onClick={() => setSelectedMood(null)} className="text-gray-500 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="relative">
              <textarea
                autoFocus
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What's happening in your transition that brought this feeling to the surface?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-orange-500/50 min-h-[120px] resize-none leading-relaxed"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-3">
                <span className="text-[10px] text-gray-500 italic font-medium">Your notes are private to your Hearth</span>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving || !reflection.trim()}
                  className="p-2 bg-orange-500 rounded-xl text-white hover:bg-orange-400 disabled:opacity-50 transition-colors shadow-lg shadow-orange-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
            Recent Reflections
          </h2>
          {checkIns.length >= 14 ? (
            <button className="flex items-center gap-1.5 text-[9px] font-bold text-orange-400 uppercase tracking-tighter border border-orange-400/30 px-2 py-1 rounded-lg hover:bg-orange-400/10 transition-all active:scale-95">
              <Network className="w-3 h-3" /> View Mycelium Map
            </button>
          ) : (
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">
                {14 - checkIns.length} pulses until Mycelium Map
              </span>
              <div className="w-16 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-orange-500/40 transition-all duration-1000" 
                  style={{ width: `${(checkIns.length / 14) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {checkIns.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center">
            <Heart className="w-8 h-8 text-white/10 mb-4" />
            <p className="text-gray-400 font-medium mb-1">The pulse is quiet.</p>
            <p className="text-sm text-gray-500 mb-6 px-4">
              Visit <span className="text-orange-400/80 italic font-heading">The Rootwork</span> to anchor your first reflection.
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
              <Card key={checkIn.id} className="p-4 rounded-2xl bg-[#2D2438]/40 border-white/5 backdrop-blur-sm flex items-start gap-4 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                  {moodEmojis[checkIn.mood] || '💭'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-white capitalize tracking-tight">{checkIn.mood}</p>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      <Calendar className="w-3 h-3 text-orange-500/50" />
                      {format(new Date(checkIn.created_date), 'MMM d')}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 font-medium leading-relaxed">
                    {checkIn.reflection || "A pulse check without notes."}
                  </p>
                </div>
              </Card>
            ))}
            <Link 
              to="/audit" 
              className="text-[10px] font-black text-orange-400/60 uppercase tracking-widest text-center py-2 hover:text-orange-400 transition-colors mt-2"
            >
              Open The Rootwork →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}