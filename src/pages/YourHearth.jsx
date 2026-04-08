import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, X, Lock, Heart, ShieldCheck, 
  MessageSquare, Activity, Zap, Info, Save,
  Calendar, FileText, ArrowRight
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import InstallBanner from '../components/hearth/InstallBanner';
import HearthWelcome from '../components/hearth/HearthWelcome';
import BrigidMessage from '../components/hearth/BrigidMessage';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import HearthJournal from '../components/hearth/HearthJournal';

const MyceliumMap = ({ checkIns, onClose }) => {
  const moodColors = {
    hopeful: '#2DD4BF',
    anxious: '#60A5FA',
    motivated: '#F97316',
    grieving: '#94A3B8',
    confident: '#FACC15',
    uncertain: '#A78BFA',
  };

  const nodes = useMemo(() => {
    return (checkIns || []).slice(0, 14).map((checkIn, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 120 + (i % 3) * 20;
      return {
        ...checkIn,
        x: Math.cos(angle) * radius + 250,
        y: Math.sin(angle) * radius + 250,
      };
    });
  }, [checkIns]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#1A1423]/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      <button onClick={onClose} className="absolute top-10 right-10 text-gray-500 hover:text-white transition-colors z-10">
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-3xl w-full text-center space-y-8 relative">
        <header className="space-y-2">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl font-black text-white italic tracking-tighter">
            Your Mycelium Map
          </motion.h2>
          <p className="text-gray-400 font-medium">A visualization of your transition's hidden network.</p>
        </header>

        <div className="relative aspect-square w-full max-w-lg mx-auto bg-white/[0.01] rounded-full border border-white/5 flex items-center justify-center">
          <svg viewBox="0 0 500 500" className="w-full h-full p-8">
            {nodes.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.15 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                x1="250" y1="250" x2={node.x} y2={node.y}
                stroke={moodColors[node.mood] || '#ffffff'}
                strokeWidth="1.5"
              />
            ))}
            <circle cx="250" cy="250" r="15" className="fill-white/5 stroke-white/10" />
            <motion.circle cx="250" cy="250" r="5" className="fill-orange-500" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 4 }} />
            {nodes.map((node, i) => (
              <motion.g key={node.id || i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: i * 0.1 }}>
                <circle cx={node.x} cy={node.y} r="7" fill={moodColors[node.mood] || '#555'} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                <circle cx={node.x} cy={node.y} r="14" stroke={moodColors[node.mood]} strokeWidth="1" fill="none" className="opacity-20" />
              </motion.g>
            ))}
          </svg>
        </div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.5 }}>
          <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-left flex gap-4 max-w-md mx-auto">
            <ShieldCheck className="w-6 h-6 text-teal-400 shrink-0" />
            <div className="space-y-1">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Ecosystem Insight</span>
              <p className="text-xs text-gray-400 leading-relaxed font-medium">
                Your network is showing significant density in <span className="text-white font-bold">resilient clusters</span>. Your patterns suggest a healthy, adaptive growth journey.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function YourHearth() {
  const { isAuthenticated } = useAuth();
  const [showMap, setShowMap] = useState(false);

  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => base44.auth.me(), 
    enabled: isAuthenticated 
  });

  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list(), 
    initialData: [], 
    enabled: isAuthenticated 
  });

  const { data: logs } = useQuery({ 
    queryKey: ['rootwerkLogs'], 
    queryFn: () => base44.entities.RootwerkLog.list({ sort: '-created_at' }), 
    initialData: [],
    enabled: isAuthenticated 
  });

  const profile = profiles[0] || null;
  const isMapUnlocked = logs.length >= 14;
  const progressPercent = Math.min((logs.length / 14) * 100, 100);

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
          <Card className="p-6 rounded-2xl border-border/50 bg-white/[0.02] shadow-sm">
            <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
          </Card>

          {user && <HearthJournal user={user} />}

          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Recent Reflections</h2>
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">The Logbook</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logs.length > 0 ? (
                logs.slice(0, 4).map((log) => (
                  <Card key={log.id} className="p-5 bg-white/[0.03] border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all group">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">{log.sentiment_tag || 'Pulse'}</span>
                        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">
                          {new Date(log.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed italic line-clamp-3">
                        "{log.entry_body}"
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-2 h-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">No pulses recorded yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-12">
          <Card className={`p-6 rounded-[2.5rem] border transition-all duration-700 ${
            isMapUnlocked 
            ? 'bg-teal-500/5 border-teal-500/20 shadow-[0_0_30px_rgba(45,212,191,0.05)]' 
            : 'bg-white/5 border border-white/10'
          }`}>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 ${isMapUnlocked ? 'text-teal-400' : 'text-gray-500'}`}>
                  {isMapUnlocked ? <Network className="w-5 h-5 animate-pulse" /> : <Lock className="w-5 h-5" />}
                  <span className="font-black text-[11px] uppercase tracking-widest">
                    {isMapUnlocked ? 'Network Visible' : 'Rooting'}
                  </span>
                </div>
                
                {!isMapUnlocked && (
                  <div className="group relative">
                    <Info className="w-3.5 h-3.5 text-gray-600 cursor-help hover:text-gray-400 transition-colors" />
                    <div className="absolute right-0 bottom-6 w-48 p-3 bg-[#2D243A] border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                      <p className="text-[10px] leading-relaxed text-slate-300 font-medium">
                        Every pulse you record nourishes the network, helping your professional connections and inner resilience become visible in the Mycelium Map.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {isMapUnlocked ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    The undergrowth has surfaced. Your growth patterns are ready to be explored.
                  </p>
                  <Button 
                    onClick={() => setShowMap(true)}
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white rounded-2xl py-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-900/40"
                  >
                    Explore Mycelium Map
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    Feed the hearth <span className="text-white font-bold">{14 - logs.length} more times</span> to visualize your transition's hidden network.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-tighter">
                      <span>{logs.length} / 14 Pulses</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        className="h-full bg-orange-500/60 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-8 rounded-[2.5rem] border border-white/5 bg-[#251D2F]">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-6">Seedling Credits</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#1A1423] rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-orange-400" />
                  <div>
                    <span className="text-[10px] font-black block uppercase">Bridge Crossings</span>
                    <span className="text-[9px] text-slate-500 uppercase">2 per month</span>
                  </div>
                </div>
                <span className="text-xs font-black">2/2</span>
              </div>
              <Button asChild className="w-full flex items-center justify-center gap-2 py-6 bg-[#3D2B4A] rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#4D3B5A] transition-all border-none">
                <Link to="/bridge">Go to The Bridge <ArrowRight className="w-3 h-3" /></Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 rounded-[2rem] border-secondary/30 bg-secondary/5 space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-secondary" />
              <span className="font-bold text-[11px] uppercase tracking-widest text-secondary">Reciprocity Model</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">One seat purchased sponsors a peer in financial transition. No one gets left behind.</p>
            <Button asChild size="sm" variant="outline" className="w-full border-secondary/40 text-secondary hover:bg-secondary/10">
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