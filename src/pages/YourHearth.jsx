import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Map, 
  Trees, 
  Flame, 
  FileUp, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  CloudRain,
  Sun,
  Cloud,
  Zap,
  Wind,
  Plus,
  History,
  Info
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, doc, updateDoc, setDoc } from 'firebase/firestore';

// --- Firebase Configuration ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Sub-Components ---

const ProtocolMilestone = ({ icon: Icon, title, description, isCompleted }) => (
  <div 
    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-700 ${
      isCompleted 
      ? 'bg-teal-500/5 border-teal-500/20 opacity-60' 
      : 'bg-white/[0.02] border-white/5'
    }`}
  >
    <div className={`mt-1 shrink-0 ${isCompleted ? 'text-teal-500' : 'text-slate-700'}`}>
      {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} className="opacity-20" />}
    </div>
    <div className="flex-1 space-y-1">
      <div className="flex items-center gap-2">
        <Icon size={12} className={isCompleted ? 'text-teal-500' : 'text-slate-500'} />
        <h4 className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-teal-200/50' : 'text-slate-400'}`}>
          {title}
        </h4>
      </div>
      <p className="text-[10px] text-slate-500 font-light italic leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const PathfinderProtocol = ({ vault, pulses }) => {
  const [isOpen, setIsOpen] = useState(true);

  // Auto-completion logic based on actual interaction
  const hasResume = !!vault?.resume;
  const hasPulses = pulses && pulses.length > 0;
  
  const milestones = [
    { 
      id: 'resume', 
      icon: FileUp, 
      isCompleted: hasResume,
      title: "Ground Your Story", 
      description: "Optional: Share your resume to help the ecosystem align its guidance with your path." 
    },
    { 
      id: 'checkin', 
      icon: Compass, 
      isCompleted: hasPulses,
      title: "Take the Pulse", 
      description: "Invitation: Documenting your daily weather helps map your internal trajectory over time." 
    },
    { 
      id: 'alignment', 
      icon: Map, 
      isCompleted: false, 
      title: "Find Your North", 
      description: "Exploration: Visit Ecosystem Alignment to see how your values sync with current opportunities." 
    },
    { 
      id: 'canopy', 
      icon: Trees, 
      isCompleted: false, 
      title: "Take Flight", 
      description: "Vision: Survey the pathways in The Canopy whenever you feel ready for a broader view." 
    },
    { 
      id: 'embers', 
      icon: Flame, 
      isCompleted: false, 
      title: "Share the Spark", 
      description: "Community: Embers Chat is here for reciprocity, but only if and when you're ready to speak." 
    }
  ];

  const completedCount = milestones.filter(m => m.isCompleted).length;
  const progress = Math.round((completedCount / milestones.length) * 100);

  return (
    <div className="w-full mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="bg-[#1A1423] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <Compass size={20} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Pathfinder's Protocol</h3>
              <p className="text-[9px] text-slate-500 italic">No steps are mandatory—just invitations to deepen your integration.</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="w-32 h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500/40 transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[8px] font-black text-teal-500/40 uppercase tracking-widest">Journey Progress</span>
            </div>
            {isOpen ? <ChevronUp size={20} className="text-slate-600" /> : <ChevronDown size={20} className="text-slate-600" />}
          </div>
        </button>

        {isOpen && (
          <div className="p-6 pt-0 space-y-3">
            <div className="h-[1px] w-full bg-white/5 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {milestones.map((m) => (
                <ProtocolMilestone key={m.id} {...m} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 opacity-50">
              <Info size={12} />
              <p className="text-[9px] italic uppercase tracking-tighter">
                Hearth and Horizon honors your pace. There is no right way to migrate, only your way.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PulseCheck = ({ onAddPulse }) => {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');

  const moods = [
    { icon: Sun, label: 'Radiant', color: 'text-yellow-400' },
    { icon: Cloud, label: 'Overcast', color: 'text-slate-400' },
    { icon: CloudRain, label: 'Stormy', color: 'text-blue-400' },
    { icon: Zap, label: 'Electric', color: 'text-purple-400' },
    { icon: Wind, label: 'Drifting', color: 'text-teal-400' },
  ];

  const handleSubmit = () => {
    if (!mood) return;
    onAddPulse({ mood, note, timestamp: new Date() });
    setMood(null);
    setNote('');
  };

  return (
    <div className="bg-[#1A1423] border border-white/5 rounded-[2.5rem] p-8">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles size={18} className="text-teal-400" />
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">The Pulse Check</h3>
      </div>
      
      <div className="space-y-8">
        <div className="flex justify-between gap-4">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${
                mood === m.label 
                ? 'bg-white/5 border-teal-500/50 scale-105' 
                : 'bg-white/[0.02] border-white/5 opacity-40 hover:opacity-100'
              }`}
            >
              <m.icon size={24} className={m.color} />
              <span className="text-[10px] font-medium uppercase tracking-widest">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Capture the current weather of your transition..."
            className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-sm italic placeholder:text-slate-700 focus:outline-none focus:border-teal-500/30 transition-all min-h-[120px]"
          />
          <button
            onClick={handleSubmit}
            disabled={!mood}
            className={`absolute bottom-4 right-4 p-3 rounded-2xl transition-all ${
              mood ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed'
            }`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App({ vault, onSync, onResumeSync }) {
  const [user, setUser] = useState(null);
  const [pulses, setPulses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth error", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const pulsesQuery = query(collection(db, 'artifacts', appId, 'users', user.uid, 'pulses'));
    const unsubscribe = onSnapshot(pulsesQuery, (snapshot) => {
      const p = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPulses(p.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds));
    }, (err) => console.error("Snapshot error", err));

    return () => unsubscribe();
  }, [user]);

  const handleAddPulse = async (pulseData) => {
    if (!user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'pulses'), {
        ...pulseData,
        timestamp: new Date()
      });
    } catch (err) {
      console.error("Error adding pulse", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0A15] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Compass size={40} className="text-teal-500/20" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">Tuning Hearth</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0A15] text-white font-sans pb-20 selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-8 bg-teal-500/50" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">The Core Environment</span>
          </div>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Your Hearth</h1>
          <p className="text-slate-400 text-lg max-w-2xl font-light italic leading-relaxed">
            Welcome back. This is your personal anchor point in the migration. A space to reflect, 
            map your trajectory, and find grounding before stepping into the Canopy.
          </p>
        </header>

        {/* Pathfinder's Protocol */}
        <PathfinderProtocol vault={vault} pulses={pulses} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Pulse Check */}
          <div className="lg:col-span-7 space-y-12">
            <PulseCheck onAddPulse={handleAddPulse} />

            {/* Pulse History */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <History size={16} className="text-slate-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Historical Atmosphere</h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {pulses.length === 0 ? (
                  <div className="p-12 border border-dashed border-white/5 rounded-[2.5rem] text-center">
                    <p className="text-slate-600 italic text-sm font-light">Your internal weather history is clear. Begin when ready.</p>
                  </div>
                ) : (
                  pulses.map((p) => (
                    <div key={p.id} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex gap-6 items-start hover:border-white/10 transition-colors">
                      <div className="p-3 rounded-2xl bg-white/[0.03] text-teal-400">
                        {p.mood === 'Radiant' && <Sun size={20} />}
                        {p.mood === 'Overcast' && <Cloud size={20} />}
                        {p.mood === 'Stormy' && <CloudRain size={20} />}
                        {p.mood === 'Electric' && <Zap size={20} />}
                        {p.mood === 'Drifting' && <Wind size={20} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-teal-500/60">{p.mood}</span>
                          <span className="text-[10px] font-medium text-slate-600 uppercase">
                            {p.timestamp?.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 font-light italic leading-relaxed">"{p.note}"</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Status & Insights */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#1A1423] border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-slate-400">Personal Vault</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-4">
                    <FileUp size={18} className={vault?.resume ? "text-teal-400" : "text-slate-600"} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Resume Integration</span>
                  </div>
                  <span className={`text-[8px] font-bold px-3 py-1 rounded-full uppercase ${vault?.resume ? 'bg-teal-500/10 text-teal-500' : 'bg-slate-800 text-slate-600'}`}>
                    {vault?.resume ? 'Active' : 'Missing'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-4">
                    <Compass size={18} className={pulses.length > 0 ? "text-teal-400" : "text-slate-600"} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Atmospheric Data</span>
                  </div>
                  <span className="text-[8px] font-bold bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase">
                    {pulses.length} Entries
                  </span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-teal-500/5 rounded-3xl border border-teal-500/10">
                <p className="text-[10px] text-teal-200/50 leading-relaxed italic">
                  "The Vault is your private repository. As you add more context, Hearth and Horizon adjusts its gravity to pull you toward the alignments that truly resonate."
                </p>
              </div>
            </div>

            {/* Quick Navigation / Hints */}
            <div className="p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">Next Horizons</h3>
              <div className="space-y-4">
                <a href="#" className="group flex items-center gap-4 text-slate-500 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-teal-500/30">
                    <Map size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Check Alignment</span>
                </a>
                <a href="#" className="group flex items-center gap-4 text-slate-500 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-teal-500/30">
                    <Trees size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Enter the Canopy</span>
                </a>
                <a href="#" className="group flex items-center gap-4 text-slate-500 hover:text-white transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-teal-500/30">
                    <Flame size={14} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Visit the Embers</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}