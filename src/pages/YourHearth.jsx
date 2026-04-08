import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, X, Lock, Heart, ShieldCheck, 
  MessageSquare, Activity, Zap 
} from 'lucide-react';

// UI Components
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Hearth Components
import InstallBanner from '../components/hearth/InstallBanner';
import HearthWelcome from '../components/hearth/HearthWelcome';
import BrigidMessage from '../components/hearth/BrigidMessage';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import HearthJournal from '../components/hearth/HearthJournal';

// --- SUB-COMPONENT: MYCELIUM MAP ---
const MyceliumMap = ({ checkIns, onClose }) => {
  const moodColors = {
    hopeful: '#2DD4BF', anxious: '#60A5FA', motivated: '#F97316',
    grieving: '#94A3B8', confident: '#FACC15', uncertain: '#A78BFA',
  };

  const nodes = useMemo(() => {
    return (checkIns || []).slice(0, 14).map((checkIn, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 120 + (i % 3) * 20;
      return { ...checkIn, x: Math.cos(angle) * radius + 250, y: Math.sin(angle) * radius + 250 };
    });
  }, [checkIns]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#1A1423]/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 overflow-hidden">
      <button onClick={onClose} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-colors">
        <X className="w-8 h-8" />
      </button>
      <div className="max-w-3xl w-full text-center space-y-8">
        <h2 className="text-4xl font-black text-white italic tracking-tighter">Your Mycelium Map</h2>
        <div className="relative aspect-square w-full max-w-lg mx-auto bg-white/[0.01] rounded-full border border-white/5 flex items-center justify-center">
          <svg viewBox="0 0 500 500" className="w-full h-full p-8">
            {nodes.map((node, i) => (
              <motion.line key={`l-${i}`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="250" y1="250" x2={node.x} y2={node.y} stroke={moodColors[node.mood] || '#fff'} strokeWidth="1.5" className="opacity-20" />
            ))}
            {nodes.map((node, i) => (
              <circle key={`c-${i}`} cx={node.x} cy={node.y} r="7" fill={moodColors[node.mood] || '#555'} />
            ))}
            <motion.circle cx="250" cy="250" r="5" className="fill-orange-500" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function YourHearth() {
  const { isAuthenticated } = useAuth();
  const [showMap, setShowMap] = useState(false);

  // Data Fetching
  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me(), enabled: isAuthenticated });
  const { data: profiles } = useQuery({ queryKey: ['userProfile'], queryFn: () => base44.entities.UserProfile.list(), initialData: [], enabled: isAuthenticated });
  
  // Fetching the user's logs/check-ins from the database
  const { data: logs } = useQuery({ 
    queryKey: ['rootwerkLogs'], 
    queryFn: () => base44.entities.RootwerkLog.list({ sort: '-created_at' }), 
    initialData: [],
    enabled: isAuthenticated 
  });

  const profile = profiles[0] || null;
  const isMapUnlocked = logs.length >= 14;
  const progressPercent = Math.min((logs.length / 14) * 100, 100);

  // Seedling Welcome Logic
  useEffect(() => {
    if (!user) return;
    const welcomeKey = `hearth_welcomed_${user.id}`;
    if (localStorage.getItem(welcomeKey)) return;
    const firstName = user.full_name?.split(' ')[0] || user.email.split('@')[0];
    base44.entities.RootwerkLog.create({
      user_id: user.id,
      user_email: user.email,
      entry_body: `Welcome to the forest, ${firstName}. You have 2 bridge crossings (PDF uploads) available this month. Your first step is to visit The Rootwork and tell us what you're leaving behind.`,
      sentiment_tag: 'Rooted',
      is_private: true,
    }).then(() => localStorage.setItem(welcomeKey, '1'));
  }, [user]);

  return (
    <div className="relative min-h-screen bg-[#1A1423] text-white p-6 lg:p-12 space-y-12">
      <InstallBanner />
      
      <header className="space-y-1">
        <HearthWelcome user={user} />
        <p className="text-gray-500 text-sm font-medium">Every pulse feeds the network.</p>
      </header>

      {profile?.brigid_checkin_message && (
        <BrigidMessage message={profile.brigid_checkin_message} profileId={profile.id} />
      )}

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-12">
          
          <Card className="p-6 rounded-2xl border-border/50 bg-white/[0.02]">
            <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
          </Card>

          {/* This component handles the actual typing/emoji selection */}
          {user && <HearthJournal user={user} />}

          {/* Displaying the recent history fetched from base44 */}
          <div className="space-y-6">
            <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Recent Reflections</h2>
            <div className="space-y-4">
              {logs.slice(0, 3).map((log) => (
                <Card key={log.id} className="p-5 bg-white/[0.03] border-white/5 rounded-3xl">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-teal-400 uppercase">{log.sentiment_tag}</span>
                      <p className="text-sm text-gray-300 italic">{log.entry_body}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Logic */}
        <aside className="space-y-6 lg:sticky lg:top-12">
          <Card className={`p-6 rounded-[2.5rem] border ${isMapUnlocked ? 'bg-teal-500/5 border-teal-500/20' : 'bg-white/5 border-white/10'}`}>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                {isMapUnlocked ? <Network className="text-teal-400 animate-pulse" /> : <Lock className="text-gray-500" />}
                <span className="font-black text-[11px] uppercase tracking-widest">{isMapUnlocked ? 'Network Mapped' : 'Maturing'}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">
                {isMapUnlocked 
                  ? "Your 14-day cycle is complete. View your growth patterns."
                  : `Complete ${14 - logs.length} more pulses to unlock your Mycelium Map.`}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase">
                  <span>{logs.length} / 14 Pulses</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500/60" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
              {isMapUnlocked && (
                <Button onClick={() => setShowMap(true)} className="w-full bg-teal-600 hover:bg-teal-500 rounded-2xl py-6 font-bold text-xs uppercase tracking-widest">
                  Enter The Mycelium Map
                </Button>
              )}
            </div>
          </Card>

          {/* Seedling / Reciprocity Banner */}
          <Card className="p-6 rounded-[2rem] border-secondary/30 bg-secondary/5 space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-secondary" />
              <span className="font-bold text-[11px] uppercase tracking-widest text-secondary">Reciprocity Model</span>
            </div>
            <p className="text-xs text-muted-foreground">One seat purchased sponsors a peer in financial transition.</p>
            <Button asChild size="sm" variant="outline" className="w-full border-secondary/40 text-secondary">
              <Link to="/support">Enter The Grove</Link>
            </Button>
          </Card>
        </aside>
      </div>

      <AnimatePresence>
        {showMap && <MyceliumMap checkIns={logs} onClose={() => setShowMap(false)} />}
      </AnimatePresence>
    </div>
  );
}