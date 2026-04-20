import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, RefreshCw, Plus, X,
  ChevronUp, ChevronDown, Zap, ArrowLeft, Wind, Trees,
  Activity, Shield, AlertTriangle, Check
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FOUNDER_EMAIL = 'margaretpardy@gmail.com';

const TIERS = ['traveler', 'seedling', 'hearthkeeper', 'steward'];

const TIER_COLORS = {
  traveler:     'text-zinc-500 bg-zinc-500/10 border-zinc-500/20',
  seedling:     'text-teal-400 bg-teal-500/10 border-teal-500/20',
  hearthkeeper: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  steward:      'text-purple-400 bg-purple-500/10 border-purple-500/20',
  admin:        'text-[#39FFCA] bg-[#39FFCA]/10 border-[#39FFCA]/20',
};

const ACTION_COLORS = {
  'Resume Uploaded':     'text-teal-400',
  'Lexicon Alchemized':  'text-purple-400',
  'Job Clicked':         'text-amber-400',
  'Alignment Synced':    'text-blue-400',
  'Admin: Tier Adjusted':'text-rose-400',
};

function TierBadge({ tier }) {
  const t = (tier || 'traveler').toLowerCase();
  const cls = TIER_COLORS[t] || TIER_COLORS.traveler;
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${cls}`}>
      {t}
    </span>
  );
}

function VitalityCard({ label, value, icon, highlight }) {
  return (
    <div className={`bg-[#1C1622]/40 p-6 rounded-[2rem] border transition-all ${highlight ? 'border-[#39FFCA]/20' : 'border-white/5'}`}>
      <div className="flex justify-between items-start mb-4 text-zinc-700">
        <p className={`text-[9px] font-black uppercase tracking-widest ${highlight ? 'text-[#39FFCA]/50' : ''}`}>{label}</p>
        {icon}
      </div>
      <p className={`text-5xl font-bold tracking-tighter ${highlight ? 'text-[#39FFCA]' : 'text-zinc-200'}`}>{value}</p>
    </div>
  );
}

export default function AdminDashboard({ vault, onSync, isAdmin }) {
  const navigate = useNavigate();

  // ── Strict email-based access gate ──────────────────────────────────────────
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    base44.auth.me().then((user) => {
      const email = user?.email?.toLowerCase().trim() || '';
      if (email === FOUNDER_EMAIL || user?.role === 'admin') {
        setIsAuthorized(true);
      } else {
        navigate('/', { replace: true });
      }
      setAuthChecked(true);
    }).catch(() => {
      navigate('/', { replace: true });
      setAuthChecked(true);
    });
  }, []);

  // ── Data state ───────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('created_date');
  const [sortDir, setSortDir] = useState('desc');

  // ── Invite modal ─────────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', role: 'user' });
  const [inviteStatus, setInviteStatus] = useState(null);

  // ── Tier editor ──────────────────────────────────────────────────────────────
  const [editingTier, setEditingTier] = useState(null); // { userId, currentTier }
  const [tierSaving, setTierSaving] = useState(false);
  const [tierToast, setTierToast] = useState(null);

  const syncData = async () => {
    setLoading(true);
    try {
      const [usersData, logsData, postsData] = await Promise.all([
        base44.entities.User.list(),
        base44.entities.SystemLog.list('-created_date', 50),
        base44.entities.EmberPost.list('-created_date', 20),
      ]);
      setMembers(usersData || []);
      setLogs(logsData || []);
      setPosts(postsData || []);
    } catch (err) {
      console.error('Sync error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) syncData();
  }, [isAuthorized]);

  // ── Momentum helper ──────────────────────────────────────────────────────────
  const getMomentum = (lastDate) => {
    if (!lastDate) return { label: 'New Seed', color: 'text-zinc-500', dot: 'bg-zinc-600' };
    const diff = (Date.now() - new Date(lastDate)) / 86400000;
    if (diff < 2)  return { label: 'Burning Bright', color: 'text-[#39FFCA]', dot: 'bg-[#39FFCA] shadow-[0_0_6px_#39FFCA]' };
    if (diff < 7)  return { label: 'Warm Embers',    color: 'text-orange-400', dot: 'bg-orange-400' };
    return             { label: 'Cooling',           color: 'text-zinc-600',   dot: 'bg-zinc-700' };
  };

  // ── Sorted + filtered members ─────────────────────────────────────────────────
  const displayMembers = useMemo(() => {
    let list = members.filter(m =>
      m.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      let va = a[sortKey] || '';
      let vb = b[sortKey] || '';
      if (sortKey === 'created_date') { va = new Date(va); vb = new Date(vb); }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return list;
  }, [members, searchQuery, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortIcon = ({ col }) => sortKey === col
    ? (sortDir === 'asc' ? <ChevronUp size={10} className="text-[#39FFCA]" /> : <ChevronDown size={10} className="text-[#39FFCA]" />)
    : null;

  // ── Invite ────────────────────────────────────────────────────────────────────
  const handleInviteUser = async (e) => {
    e.preventDefault();
    setInviteStatus('sending');
    try {
      await base44.users.inviteUser(newUser.email, newUser.role);
      setInviteStatus('success');
      setNewUser({ email: '', role: 'user' });
      syncData();
    } catch {
      setInviteStatus('error');
    }
  };

  // ── Tier change ───────────────────────────────────────────────────────────────
  const handleTierSave = async (userId, tier) => {
    setTierSaving(true);
    try {
      await base44.functions.invoke('setUserTier', { target_user_id: userId, tier });
      setTierToast(`Tier updated to ${tier}`);
      setTimeout(() => setTierToast(null), 3000);
      setEditingTier(null);
      syncData();
    } catch (err) {
      console.error('Tier error:', err);
    } finally {
      setTierSaving(false);
    }
  };

  // ── Loading / auth gate ───────────────────────────────────────────────────────
  if (!authChecked) return null;
  if (!isAuthorized) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0D0B14] text-white font-sans p-4 md:p-12 pb-32 selection:bg-[#39FFCA] selection:text-black"
    >
      {/* ── Tier toast ── */}
      <AnimatePresence>
        {tierToast && (
          <motion.div
            initial={{ y: 40, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 20, opacity: 0, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[300] bg-zinc-100 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3"
          >
            <Check size={14} className="text-teal-600" />
            {tierToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div className="text-left">
          <button onClick={() => navigate('/hearth')} className="w-11 h-11 -ml-3 mb-6 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-[#39FFCA] hover:bg-[#39FFCA]/10 transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
            <p className="text-emerald-500/60 text-[10px] font-black uppercase tracking-[0.4em]">Founder's Command Centre</p>
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
            <RefreshCw size={18} className={loading ? 'animate-spin text-[#39FFCA]' : 'group-hover:rotate-180 transition-transform duration-500'} />
          </button>
        </div>
      </header>

      {/* ── Vitality strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <VitalityCard label="Registry" value={members.length} icon={<Users size={18} />} />
        <VitalityCard label="Admins" value={members.filter(m => m.role === 'admin').length} icon={<Shield size={18} />} highlight />
        <VitalityCard label="Seedlings+" value={members.filter(m => m.tier && m.tier !== 'traveler').length} icon={<Trees size={18} />} />
        <VitalityCard label="Logged Events" value={logs.length} icon={<Activity size={18} />} />
        <VitalityCard label="Embers Posts" value={posts.length} icon={<Wind size={18} />} />
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* DWELLER REGISTRY TABLE */}
        <div className="lg:col-span-8 bg-[#1C1622]/50 p-6 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <button onClick={() => setIsModalOpen(true)} className="h-11 flex items-center gap-3 bg-[#39FFCA] text-[#0D0B14] px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
              <Plus size={14} strokeWidth={3} /> Invite Seed
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-white/5">
                  <th className="pb-6 cursor-pointer hover:text-zinc-400" onClick={() => toggleSort('full_name')}>
                    <span className="flex items-center gap-1">Dweller <SortIcon col="full_name" /></span>
                  </th>
                  <th className="pb-6 cursor-pointer hover:text-zinc-400" onClick={() => toggleSort('created_date')}>
                    <span className="flex items-center gap-1">Joined <SortIcon col="created_date" /></span>
                  </th>
                  <th className="pb-6">Tier</th>
                  <th className="pb-6">Momentum</th>
                  <th className="pb-6 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {displayMembers.map((m) => {
                  const momentum = getMomentum(m.updated_date || m.created_date);
                  const isEditing = editingTier?.userId === m.id;
                  return (
                    <tr key={m.id} className="group hover:bg-white/[0.015] transition-colors">
                      <td className="py-5">
                        <div>
                          <p className="text-sm font-bold text-zinc-200">{m.full_name || 'Unknown'}</p>
                          <p className="text-[10px] text-zinc-600 font-mono">{m.email}</p>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="text-[10px] text-zinc-500 font-black tabular-nums">
                          {m.created_date ? new Date(m.created_date).toLocaleDateString('en-CA') : '—'}
                        </span>
                      </td>
                      <td className="py-5">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={editingTier.tier}
                              onChange={(e) => setEditingTier({ userId: m.id, tier: e.target.value })}
                              className="bg-black/60 border border-[#39FFCA]/20 rounded-xl px-3 py-1.5 text-[10px] font-black text-[#39FFCA] outline-none"
                            >
                              {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <button
                              onClick={() => handleTierSave(m.id, editingTier.tier)}
                              disabled={tierSaving}
                              className="w-8 h-8 bg-[#39FFCA]/10 text-[#39FFCA] rounded-lg flex items-center justify-center hover:bg-[#39FFCA] hover:text-black transition-all"
                            >
                              <Check size={12} />
                            </button>
                            <button onClick={() => setEditingTier(null)} className="w-8 h-8 bg-white/5 text-zinc-500 rounded-lg flex items-center justify-center hover:text-white transition-all">
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingTier({ userId: m.id, tier: (m.tier || 'traveler').toLowerCase() })}
                            className="group/tier"
                            title="Click to change tier"
                          >
                            <TierBadge tier={m.tier || m.role} />
                          </button>
                        )}
                      </td>
                      <td className="py-5">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase ${momentum.color}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${momentum.dot}`} />
                          {momentum.label}
                        </div>
                      </td>
                      <td className="py-5 text-right">
                        <span className="text-[9px] text-zinc-700 font-mono">
                          {m.updated_date ? new Date(m.updated_date).toLocaleDateString('en-CA') : '—'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {displayMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-700 text-[10px] uppercase font-black">No dwellers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN — Pulse Feed + Embers */}
        <div className="lg:col-span-4 space-y-6">

          {/* PULSE FEED */}
          <div className="bg-[#1C1622]/50 p-6 md:p-8 rounded-[3rem] border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#39FFCA] shadow-[0_0_8px_#39FFCA] animate-pulse" />
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#39FFCA]/60">Live Pulse Feed</h2>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[360px] custom-scrollbar pr-1">
              {logs.length > 0 ? logs.slice(0, 20).map((log, idx) => {
                const colorClass = ACTION_COLORS[log.action_type] || 'text-zinc-400';
                return (
                  <div key={idx} className="bg-black/30 p-4 rounded-[1.5rem] border border-white/[0.04] space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${colorClass}`}>
                        {log.action_type}
                      </span>
                      <TierBadge tier={log.tier} />
                    </div>
                    <p className="text-[10px] text-zinc-600 font-mono truncate">{log.user_email}</p>
                    <p className="text-[9px] text-zinc-700 font-black uppercase">
                      {log.created_date ? new Date(log.created_date).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                    </p>
                  </div>
                );
              }) : (
                <div className="py-10 text-center">
                  <AlertTriangle size={22} className="text-zinc-700 mx-auto mb-3" />
                  <p className="text-[10px] text-zinc-700 uppercase font-black">No activity logged yet.</p>
                  <p className="text-[9px] text-zinc-800 italic mt-1">Events will appear as users interact.</p>
                </div>
              )}
            </div>
          </div>

          {/* EMBERS FEED */}
          <div className="bg-[#1C1622]/50 p-6 md:p-8 rounded-[3rem] border border-white/5">
            <div className="flex items-center gap-3 mb-8 text-zinc-500">
              <Wind size={16} />
              <h2 className="text-[10px] font-black uppercase tracking-widest">Recent Embers</h2>
            </div>
            <div className="space-y-3 overflow-y-auto max-h-[280px] custom-scrollbar pr-1">
              {posts.map((item, idx) => (
                <div key={idx} className="bg-black/20 p-5 rounded-[1.5rem] border border-white/5">
                  <p className="text-[9px] font-black text-zinc-700 mb-1.5 uppercase">{item.author_name || 'Anonymous'}</p>
                  <p className="text-xs text-zinc-500 italic font-serif leading-relaxed line-clamp-3">"{item.content}"</p>
                </div>
              ))}
              {posts.length === 0 && <p className="text-[10px] text-zinc-700 uppercase font-black text-center py-8">No posts yet.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0D0B14]/95 backdrop-blur-xl z-[200] flex items-center justify-center p-4"
          >
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#1C1622] w-full max-w-md rounded-[3rem] p-10 border border-white/10 relative"
            >
              <button onClick={() => { setIsModalOpen(false); setInviteStatus(null); }}
                className="absolute top-8 right-8 text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-serif italic mb-2">Invite Dweller</h2>
              <p className="text-emerald-500/60 text-[10px] uppercase font-black tracking-widest mb-8">Send an invitation</p>
              {inviteStatus === 'success' ? (
                <div className="py-8 text-center text-teal-400 font-serif italic">Invitation sent to the forest.</div>
              ) : (
                <form onSubmit={handleInviteUser} className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-700 ml-2 block mb-2">Email Address</label>
                    <input required type="email" value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-[#39FFCA]/20"
                      placeholder="traveler@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-700 ml-2 block mb-2">Role</label>
                    <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:ring-1 focus:ring-[#39FFCA]/20">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  {inviteStatus === 'error' && <p className="text-rose-400 text-xs text-center">Failed to send invite. Try again.</p>}
                  <button type="submit"
                    className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] hover:bg-[#39FFCA] transition-all">
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