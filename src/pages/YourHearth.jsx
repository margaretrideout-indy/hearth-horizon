import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Database, FileText, CheckCircle2, Loader2, ThermometerSun } from 'lucide-react';
import ResumeUploader from '../components/gap/ResumeUploader';

const MOODS = [
  { label: 'GROWING', emoji: '🌱' }, { label: 'ENERGIZED', emoji: '🔥' },
  { label: 'PEACEFUL', emoji: '🍃' }, { label: 'GROUNDED', emoji: '🪵' },
  { label: 'INSPIRED', emoji: '✨' }, { label: 'DREAMY', emoji: '☁️' },
  { label: 'FLUID', emoji: '🌊' }, { label: 'REFLECTIVE', emoji: '🌙' }
];

export default function YourHearth() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const queryClient = useQueryClient();

  const { data: profiles } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list(),
    initialData: [],
  });
  const profile = profiles[0] || null;

  const handleLogHearth = async () => {
    if (!selectedMood) return;
    setIsLogging(true);
    try {
      await base44.entities.DailyCheckIn.create({
        mood: selectedMood,
        reflection,
        timestamp: new Date().toISOString()
      });
      setReflection('');
      setSelectedMood(null);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] text-slate-200 p-6 md:p-12 pb-32">
      <div className="max-w-2xl mx-auto space-y-12">
        
        <section className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4 border border-teal-500/30">
              <ThermometerSun className="text-teal-400 w-6 h-6" />
            </div>
            <h1 className="text-4xl font-serif font-bold italic text-white mb-2">Your Hearth</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/60">Internal Weather Check-In</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-8">
            {MOODS.map((m) => (
              <button
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border ${
                  selectedMood === m.label 
                    ? 'bg-teal-500/20 border-teal-500/50 scale-105 shadow-lg' 
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/5'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{m.label}</span>
              </button>
            ))}
          </div>

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Add a reflection to your log..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-slate-300 placeholder:text-slate-600 focus:ring-1 focus:ring-teal-500/30 min-h-[120px] transition-all"
          />

          <button
            onClick={handleLogHearth}
            disabled={isLogging || !selectedMood}
            className="w-full mt-6 h-14 bg-teal-500 hover:bg-teal-400 text-[#1A1423] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(45,212,191,0.2)] disabled:opacity-50"
          >
            {isLogging ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Log to Hearth'}
          </button>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-4 text-slate-500">
            <Database className="w-3 h-3" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.3em]">The Root System</h2>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:bg-white/[0.03]">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                profile?.resume_url ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : 'bg-white/5 border-white/10 text-slate-600'
              }`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Legacy Document</h3>
                <p className="text-[10px] text-slate-500 italic">Sync your resume to power the Bridge and Horizon Scan.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {profile?.resume_url && (
                <div className="flex items-center gap-2 text-teal-500 bg-teal-500/5 px-4 py-2 rounded-full border border-teal-500/10">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Document Synced</span>
                </div>
              )}
              
              <ResumeUploader 
                profileId={profile?.id}
                onUploadSuccess={() => queryClient.invalidateQueries({ queryKey: ['userProfile'] })} 
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}