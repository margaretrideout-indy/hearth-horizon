import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Search, 
  RefreshCw,
  Clock,
  Plus,
  X,
  ShieldAlert,
  ChevronRight,
  Zap,
  ArrowLeft,
  Wind,
  Trees
} from 'lucide-react';

export default function RootSystem({ vault, onSync, isAdmin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', tier: 'Tester' });

  // SOVEREIGNTY LOGIC: Only the Founder/Admin can access the Roots
  const isFounder = isAdmin || vault?.isAdmin;
  
  const B44_PROJECT_ID = window.BASE44_PROJECT_ID || ''; 
  const B44_TOKEN = window.BASE44_API_TOKEN || '';

  // MOMENTUM LOGIC: Tracking the "heat" of the migration
  const getMomentum = (lastDate) => {
    if (!lastDate) return { label: 'New Seed', color: 'text-zinc-500', glow: 'bg-zinc-500' };
    const diff = (new Date() - new Date(lastDate)) / (1000 * 60 * 60 * 24);
    if (diff < 2) return { label: 'Burning Bright', color: 'text-[#39FFCA]', glow: 'bg-[#39FFCA] shadow-[0_0_8px_#39FFCA]' };
    if (diff < 7) return { label: 'Warm Embers', color: 'text-orange-400', glow: 'bg-orange-400' };
    return { label: 'Cooling', color: 'text-zinc-700', glow: 'bg-zinc-800' };
  };

  const syncBase44 = async () => {
    if (!B44_PROJECT_ID || !B44_TOKEN || !isFounder) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [msgRes, dwellerRes] = await Promise.all([
        fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
          headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
        }),
        fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/dwellers/documents`, {
          headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
        })
      ]);

      if (msgRes.ok) {
        const data = await msgRes.json();
        setIntentions(data.documents || []);
      }
      if (dwellerRes.ok) {
        const data = await dwellerRes.json();
        setMembers(data.documents || []);
      }
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncBase44();
  }, [isFounder]);

  // Authorization Guard
  if (!isFounder) {
    return (
      <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 max-w-sm"
        >
          <div className="w-20 h-20 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500/40 mx-auto">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-serif italic text-white">Deep Roots</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            These grounds are reserved for the Founder. <br/>Stewards belong in the Canopy.
          </p>
          <button 
            onClick={() => navigate('/hearth', { replace: true })} 
            className="w-full h-11 flex items-center justify-center text-[#39FFCA] text-[10px] font-black uppercase tracking-widest border-b border-[#39FFCA]/20"
          >
            Return to Hearth
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/dwellers/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${B44_TOKEN}`
        },
        body: JSON.stringify({ 
          ...newUser, 
          isAligned: false, 
          joinedAt: new Date().toISOString(),
          lastPulse: new Date().toISOString()
        })
      });
      if (response.ok) {
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', tier: 'Tester' });
        syncBase44();
      }
    } catch (err) {
      console.error("Addition Error:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0D0B14] text-white font-sans p-4 md:p-12 pb-32 selection:bg-[#39FFCA] selection:text-black"
    >
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div className="text-left">
          <button 
            onClick={() => navigate('/hearth')}
            className="w-11 h-11 -ml-3 mb-6 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-[#39FFCA] hover:bg-[#39FFCA]/10 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Founder's Sovereignty</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic tracking-tighter">
            The Root <span className="text-zinc-700 font-sans not-italic font-extralight uppercase tracking-widest text-4xl ml-2">System</span>
          </h1>
          <p className="text-zinc-600 text-sm mt-4 italic font-serif max-w-md border-l border-white/5 pl-4 leading-relaxed">
            Tending to the invisible connections and seasonal health of the Founding Forest.
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
            <input 
              type="text"
              placeholder="Locate a dweller..."
              className="bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 text-xs focus:ring-1 focus:ring-[#39FFCA]/20 transition-all outline-none placeholder:text-zinc-800"
            />
          </div>
          <button 
            onClick={syncBase44} 
            className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all border border-white/5 group"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
          </button>
        </div>
      </header>

      {/* VITALITY STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <VitalityCard label="Registry Size" value={members.length} icon={<Users size={20}/>} />
        <VitalityCard label="Active Migrations" value={members.filter(m => m.isAligned).length} icon={<Zap size={20}/>} highlight />
        <VitalityCard label="Stewards" value={members.filter(m => m.tier?.toLowerCase() === 'steward').length} icon={<Trees size={20}/>} />
        <VitalityCard label="Whispers" value={intentions.length} icon={<Wind size={20}/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* REGISTRY TABLE */}
        <div className="lg:col-span-8 bg-[#1C1622]/50 p-8 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10 relative z-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-11 flex items-center gap-3 bg-[#39FFCA] text-[#0D0B14] px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#39FFCA]/10"
            >
              <Plus size={14} strokeWidth={3} /> Plant Seed
            </button>
          </div>
          
          <div className="overflow-x-auto relative z-10">
            <table className="w-full">
                <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-white/5">
                    <th className="pb-6 text-left">Dweller</th>
                    <th className="pb-6 text-left">Momentum</th>
                    <th className="pb-6 text-left">Tier</th>
                    <th className="pb-6 text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                {members.map((m, idx) => {
                  const momentum = getMomentum(m.lastPulse || m.joinedAt);
                  return (
                    <motion.tr 
                      key={idx} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="group hover:bg-white/[0.01] transition-colors"
                    >
                    <td className="py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{m.name || 'Unknown'}</span>
                          <span className="text-[10px] text-zinc-600 font-mono tracking-tighter italic">{m.email}</span>
                        </div>
                    </td>
                    <td className="py-6">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${momentum.color}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${momentum.glow}`} />
                            {momentum.label}
                        </div>
                    </td>
                    <td className="py-6">
                        <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-zinc-500 border border-white/5 uppercase tracking-widest">
                          {m.tier || 'Traveler'}
                        </span>
                    </td>
                    <td className="py-6 text-right">
                        <button className="w-10 h-10 inline-flex items-center justify-center text-zinc-700 hover:text-[#39FFCA] transition-all">
                          <ChevronRight size={18} />
                        </button>
                    </td>
                    </motion.tr>
                  )
                })}
                </tbody>
            </table>
          </div>
        </div>

        {/* FEED */}
        <div className="lg:col-span-4">
            <div className="bg-[#1C1622]/50 p-10 rounded-[3rem] h-full border border-white/5 flex flex-col backdrop-blur-sm">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Wind size={18} />
                  <h2 className="text-[10px] font-black uppercase tracking-widest">Whispering Winds</h2>
                </div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                {intentions.map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-black/20 p-6 rounded-[2rem] border border-white/5 hover:border-[#39FFCA]/10 transition-colors group"
                    >
                      <p className="text-[9px] font-black text-zinc-700 mb-3 uppercase tracking-widest group-hover:text-zinc-500">{item.email || 'Anonymous'}</p>
                      <p className="text-xs text-zinc-500 italic font-serif leading-relaxed line-clamp-4 group-hover:text-zinc-300">"{item.message || item.content}"</p>
                    </motion.div>
                ))}
            </div>
            </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D0B14]/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1C1622] w-full max-w-md rounded-[3rem] p-10 border border-white/10 relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8 text-left">
                  <h2 className="text-3xl font-serif mb-2 italic text-white">New Dweller</h2>
                  <p className="text-emerald-500/60 text-[10px] uppercase font-black tracking-widest">Add to the Root System</p>
              </div>
              
              <form onSubmit={handleAddUser} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700 ml-2">Display Name</label>
                  <input 
                    required
                    type="text" 
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-1 focus:ring-[#39FFCA]/20 transition-all"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-700 ml-2">Email Identity</label>
                  <input 
                    required
                    type="email" 
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white outline-none focus:ring-1 focus:ring-[#39FFCA]/20 transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] hover:bg-[#39FFCA] transition-all"
                >
                  Seal Identity
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function VitalityCard({ label, value, highlight, icon }) {
  return (
    <div className={`bg-[#1C1622]/40 p-6 rounded-[2rem] border transition-all duration-500 ${highlight ? 'border-emerald-500/20' : 'border-white/5'}`}>
      <div className="flex justify-between items-start mb-4 text-zinc-700">
        <p className={`text-[9px] font-black uppercase tracking-widest ${highlight ? 'text-emerald-500/50' : ''}`}>{label}</p>
        {icon}
      </div>
      <p className={`text-5xl font-bold tracking-tighter ${highlight ? 'text-[#39FFCA]' : 'text-zinc-200'}`}>{value}</p>
    </div>
  );
}