import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, RefreshCw, Plus, X,
  ChevronRight, Zap, ArrowLeft, Wind, Trees
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AdminDashboard({ vault, onSync, isAdmin }) {
  const navigate = useNavigate();
  const isFounder = isAdmin === true || vault?.standing === 'Founder' || vault?.standing === 'Admin';

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', role: 'user' });
  const [inviteStatus, setInviteStatus] = useState(null);

  const getMomentum = (lastDate) => {
    if (!lastDate) return { label: 'New Seed', color: 'text-zinc-500', glow: 'bg-zinc-500' };
    const diff = (new Date() - new Date(lastDate)) / (1000 * 60 * 60 * 24);
    if (diff < 2) return { label: 'Burning Bright', color: 'text-[#39FFCA]', glow: 'bg-[#39FFCA] shadow-[0_0_8px_#39FFCA]' };
    if (diff < 7) return { label: 'Warm Embers', color: 'text-orange-400', glow: 'bg-orange-400' };
    return { label: 'Cooling', color: 'text-zinc-700', glow: 'bg-zinc-800' };
  };

  const syncData = async () => {
    setLoading(true);
    try {
      const [usersData, postsData] = await Promise.all([
        base44.entities.User.list(),
        base44.entities.EmberPost.list('-created_date', 20)
      ]);
      setMembers(usersData || []);
      setPosts(postsData || []);
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFounder) syncData();
  }, [isFounder]);

  const filteredMembers = useMemo(() => {
    return members.filter(m =>
      m.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const handleInviteUser = async (e) => {
    e.preventDefault();
    setInviteStatus('sending');
    try {
      await base44.users.inviteUser(newUser.email, newUser.role);
      setInviteStatus('success');
      setIsModalOpen(false);
      setNewUser({ email: '', role: 'user' });
      syncData();
    } catch (err) {
      console.error("Invite Error:", err);
      setInviteStatus('error');
    }
  };

  if (!isFounder) {
    return (
      <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-zinc-600 font-black uppercase text-[10px] tracking-widest">Access Restricted</p>
          <button onClick={() => navigate('/hearth')} className="text-teal-400 text-sm">Return to Hearth</button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0D0B14] text-white font-sans p-4 md:p-12 pb-32 selection:bg-[#39FFCA] selection:text-black"
    >
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div className="text-left">
          <button onClick={() => navigate('/hearth')} className="w-11 h-11 -ml-3 mb-6 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-[#39FFCA] hover:bg-[#39FFCA]/10 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Founder's Sovereignty</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white italic tracking-tighter">
            The Root <span className="text-zinc-700 font-sans not-italic font-extralight uppercase tracking-widest text-4xl ml-2">System</span>
          </h1>
        </div>

        <div className="flex w-full md:w-auto gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Locate a dweller..."
              className="bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 text-xs focus:ring-1 focus:ring-[#39FFCA]/20 transition-all outline-none"
            />
          </div>
          <button onClick={syncData} className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl border border-white/5 group">
            <RefreshCw size={20} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
          </button>
        </div>
      </header>

      {/* VITALITY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <VitalityCard label="Registry Size" value={members.length} icon={<Users size={20} />} />
        <VitalityCard label="Admins" value={members.filter(m => m.role === 'admin').length} icon={<Zap size={20} />} highlight />
        <VitalityCard label="Members" value={members.filter(m => m.role === 'user').length} icon={<Trees size={20} />} />
        <VitalityCard label="Embers Posts" value={posts.length} icon={<Wind size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* REGISTRY TABLE */}
        <div className="lg:col-span-8 bg-[#1C1622]/50 p-6 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <button onClick={() => setIsModalOpen(true)} className="h-11 flex items-center gap-3 bg-[#39FFCA] text-[#0D0B14] px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105">
              <Plus size={14} strokeWidth={3} /> Invite Seed
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-white/5">
                  <th className="pb-6">Dweller</th>
                  <th className="pb-6">Momentum</th>
                  <th className="pb-6">Role</th>
                  <th className="pb-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {filteredMembers.map((m, idx) => {
                  const momentum = getMomentum(m.updated_date || m.created_date);
                  return (
                    <tr key={m.id || idx} className="group hover:bg-white/[0.01]">
                      <td className="py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-zinc-300">{m.full_name || 'Unknown'}</span>
                          <span className="text-[10px] text-zinc-600 font-mono italic">{m.email}</span>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${momentum.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${momentum.glow}`} />
                          {momentum.label}
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-black text-zinc-500 uppercase">
                          {m.role || 'user'}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button className="w-10 h-10 inline-flex items-center justify-center text-zinc-700 hover:text-[#39FFCA]">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-zinc-700 text-[10px] uppercase font-black">No dwellers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* EMBERS FEED */}
        <div className="lg:col-span-4 bg-[#1C1622]/50 p-6 md:p-10 rounded-[3rem] border border-white/5">
          <div className="flex items-center gap-3 mb-10 text-zinc-500">
            <Wind size={18} />
            <h2 className="text-[10px] font-black uppercase tracking-widest">Recent Embers</h2>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {posts.map((item, idx) => (
              <div key={idx} className="bg-black/20 p-6 rounded-[2rem] border border-white/5">
                <p className="text-[9px] font-black text-zinc-700 mb-2 uppercase">{item.author_name || 'Anonymous'}</p>
                <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">"{item.content}"</p>
              </div>
            ))}
            {posts.length === 0 && <p className="text-[10px] text-zinc-700 uppercase font-black text-center py-8">No posts yet.</p>}
          </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#0D0B14]/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#1C1622] w-full max-w-md rounded-[3rem] p-10 border border-white/10 relative">
              <button onClick={() => { setIsModalOpen(false); setInviteStatus(null); }} className="absolute top-8 right-8 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-serif italic mb-2">Invite Dweller</h2>
              <p className="text-emerald-500/60 text-[10px] uppercase font-black tracking-widest mb-8">Send an invitation</p>
              {inviteStatus === 'success' ? (
                <div className="py-8 text-center text-teal-400 font-serif italic">Invitation sent to the forest.</div>
              ) : (
                <form onSubmit={handleInviteUser} className="space-y-6">
                  <div className="text-left">
                    <label className="text-[10px] font-black uppercase text-zinc-700 ml-2">Email Address</label>
                    <input required type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-[#39FFCA]/20" placeholder="traveler@example.com" />
                  </div>
                  <div className="text-left">
                    <label className="text-[10px] font-black uppercase text-zinc-700 ml-2">Role</label>
                    <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-[#39FFCA]/20">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {inviteStatus === 'error' && <p className="text-rose-400 text-xs text-center">Failed to send invite. Try again.</p>}
                  <button type="submit" className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] hover:bg-[#39FFCA] transition-all">
                    {inviteStatus === 'sending' ? 'Sending...' : 'Send Invitation'}
                  </button>
                </form>
              )}
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