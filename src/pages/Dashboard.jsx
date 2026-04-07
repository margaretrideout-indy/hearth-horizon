import React, { useState, useMemo } from 'react';
import { 
  Network, X, Info, Lock, ArrowRight, 
  ShieldCheck, RefreshCw, MessageSquare, 
  Calendar, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// --- Sub-Component 1: The Mycelium Map Overlay ---
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

// --- Sub-Component 2: Inline Recent Activity (Replacing the import) ---
const RecentActivityList = ({ checkIns = [] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">Recent Reflections</h2>
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">Past 3 Pulses</span>
      </div>
      
      <div className="space-y-4">
        {checkIns.length > 0 ? (
          checkIns.slice(0, 3).map((checkIn, i) => (
            <Card key={checkIn.id || i} className="p-5 bg-white/[0.03] border-white/5 rounded-3xl hover:bg-white/[0.05] transition-all group">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{checkIn.emoji || '🌱'}</span>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">{checkIn.mood}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-2 italic">
                    {checkIn.reflection || "No reflection added for this pulse."}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">{checkIn.date || 'Today'}</div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="h-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <MessageSquare className="w-5 h-5 text-white/10 mb-2" />
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">No pulses recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---
export default function Dashboard({ checkIns = [] }) {
  const [showMap, setShowMap] = useState(false);
  const isMapUnlocked = checkIns.length >= 14;
  const progressPercent = Math.min((checkIns.length / 14) * 100, 100);

  return (
    <div className="relative min-h-screen bg-[#1A1423] text-white">
      <div className="max-w-6xl mx-auto p-6 lg:p-12 space-y-12">
        
        <header className="space-y-1">
          <h1 className="text-3xl font-black italic tracking-tighter">The Hearth</h1>
          <p className="text-gray-500 text-sm font-medium">Every pulse feeds the network.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            <RecentActivityList checkIns={checkIns} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-12">
            <section className="space-y-4">
              <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] px-1">
                Ecosystem Status
              </h2>
              
              <Card className={`p-6 rounded-[2.5rem] border transition-all duration-700 ${
                isMapUnlocked 
                ? 'bg-teal-500/5 border-teal-500/20 shadow-[0_0_30px_rgba(45,212,191,0.05)]' 
                : 'bg-white/5 border border-white/10'
              }`}>
                {isMapUnlocked ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 text-teal-400">
                      <Network className="w-6 h-6 animate-pulse" />
                      <span className="font-black text-[11px] uppercase tracking-widest">Network Mapped</span>
                    </div>
                    <p className="text-sm text-gray-300 font-medium leading-relaxed">
                      Your 14-day cycle is complete. Your hidden growth is ready to be viewed.
                    </p>
                    <Button 
                      onClick={() => setShowMap(true)}
                      className="w-full bg-teal-600 hover:bg-teal-500 text-white rounded-2xl py-7 font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-900/40"
                    >
                      Enter The Mycelium Map
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 text-gray-500">
                      <Lock className="w-5 h-5" />
                      <span className="font-black text-[11px] uppercase tracking-widest px-1">Maturing</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">
                      Complete <span className="text-white font-bold">{Math.max(0, 14 - checkIns.length)}</span> more pulses to visualize your professional ecosystem.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-tighter">
                        <span>{checkIns.length} / 14 Pulses</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          className="h-full bg-orange-500/60 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </section>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {showMap && (
          <MyceliumMap 
            checkIns={checkIns} 
            onClose={() => setShowMap(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}