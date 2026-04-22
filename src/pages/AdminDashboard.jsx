import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, RefreshCw, Plus, X,
  ChevronUp, ChevronDown, Zap, ArrowLeft, Wind, Trees,
  Activity, Shield, AlertTriangle, Check, Download, Trash2, MoreHorizontal
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
  'Job Clicked':          'text-amber-400',
  'Alignment Synced':    'text-blue-400',
  'Admin: Tier Adjusted':'text-rose-400',
};

// ── Sub-Components ───────────────────────────────────────────────────────────

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

function ActivityGraph({ logs }) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const counts = useMemo(() => {
    const data = new Array(7).fill(0);
    const now = new Date();
    logs.forEach(log => {
      const logDate = new Date(log.created_date);
      const diff = (now - logDate) / 86400000;
      if (diff < 7) data[logDate.getDay()] += 1;
    });
    const max = Math.max(...data, 1);
    return data.map(v => (v / max) * 100);
  }, [logs]);

  return (
    <div className="bg-[#1C1622]/40 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-between">
      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-700 mb-4">7-Day Pulse</p>
      <div className="flex items-end justify-between gap-1.5 h-16">
        {counts.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-white/5 rounded-t-lg relative overflow-hidden h-full">
              <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: `${height}%` }} 
                className="bg-[#39FFCA]/30 w-full absolute bottom-0" 
              />
            </div>
            <span className="text-[8px] font-bold text-zinc-800">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Data State
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [posts, setPosts] = useState([]);
  
  // Interaction State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTierFilter, setActiveTierFilter] = useState('all');
  const [sortKey, setSortKey] = useState('created_date');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals & Toasts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', role: 'user' });
  const [inviteStatus, setInviteStatus] = useState(null);
  const [editingTier, setEditingTier] = useState(null);
  const [tierToast, setTierToast] = useState(null);

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
  }, [navigate]);

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

  // ── Logic: Filtering & Sorting ──────────────────────────────────────────────
  const displayMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let list = members.filter(m => {
      const matchesSearch = (m.full_name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q));
      const matchesTier = activeTierFilter === 'all' || (m.tier || 'traveler').toLowerCase() === activeTierFilter;
      return matchesSearch && matchesTier;
    });

    return [...list].sort((a, b) => {
      let va = a[sortKey] || '';
      let vb = b[sortKey] || '';
      if (sortKey === 'created_date') { va = new Date(va); vb = new Date(vb); }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
  }, [members, searchQuery, activeTierFilter, sortKey, sortDir]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleTierSave = async (userId, tier) => {
    setMembers(prev => prev.map(m => m.id === userId ? { ...m, tier } : m));
    setEditingTier(null);
    try {
      await base44.functions.invoke('setUserTier', { target_user_id: userId, tier });
      setTierToast(`Tier updated to ${tier}`);
      setTimeout(() => setTierToast(null), 3000);
    } catch {
      syncData();
      setTierToast('Update failed — reverted');
    }
  };

  const handleBulkUpdate = async (targetTier) => {
    setTierToast(`Updating ${selectedIds.length} dwellers...`);
    try {
      await Promise.all(selectedIds.map(id => 
        base44.functions.invoke('setUserTier', { target_user_id: id, tier: targetTier })
      ));
      setTierToast('Bulk update complete');
      setSelectedIds([]);
      syncData();
    } catch {
      setTierToast('Bulk update partially failed');
    }
  };

  if (!authChecked || !isAuthorized) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0D0B14] text-white p-4 md:p-12 pb-32">
      
      {/* ── Dynamic Tier Toast ── */}
      <AnimatePresence>
        {tierToast && (
          <motion.div initial={{ y: 50, opacity: 0, x: '-50%' }} animate={{ y: 0, opacity: 1, x: '-50%' }} exit={{ y: 20, opacity: 0, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[400] bg-[#39FFCA] text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-3">
            <Check size={14} /> {tierToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div>
          <button onClick={() => navigate('/hearth')} className="w-11 h-11 -ml-3 mb-6 flex items-center justify-center rounded-full bg-white/5 text-zinc-500 hover:text-[#39FFCA] transition-all">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#39FFCA] shadow-[0_0_8px_#39FFCA] animate-pulse" />
            <p className="text-[#39FFCA]/60 text-[10px] font-black uppercase tracking-[0.4em]">The Root System</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Command <span className="text-zinc-800 font-sans not-italic font-thin uppercase text-4xl">Centre</span></h1>
        </div>

        <div className="flex flex-col w-full md:w-auto gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 text-xs focus:ring-1 focus:ring-[#39FFCA]/20 transition-all outline-none" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['all', ...TIERS].map(t => (
              <button key={t} onClick={() => setActiveTierFilter(t)}
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  activeTierFilter === t ? 'bg-[#39FFCA] text-black border-[#39FFCA]' : 'bg-white/5 text-zinc-600 border-white/5 hover:border-white/10'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Vitality Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        <VitalityCard label="Total Registry" value={members.length} icon={<Users size={18} />} />
        <ActivityGraph logs={logs} />
        <VitalityCard label="Seedlings+" value={members.filter(m => m.tier && m.tier !== 'traveler').length} icon={<Trees size={18} />} highlight />
        <VitalityCard label="Logs" value={logs.length} icon={<Activity size={18} />} />
        <VitalityCard label="Posts" value={posts.length} icon={<Wind size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Main Registry ── */}
        <div className="lg:col-span-8 bg-[#1C1622]/50 p-6 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm relative">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <div className="flex gap-3">
              <button onClick={syncData} className="w-11 h-11 bg-white/5 flex items-center justify-center rounded-xl border border-white/5 hover:text-[#39FFCA] transition-colors">
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </button>
              <button onClick={() => setIsModalOpen(true)} className="h-11 flex items-center gap-3 bg-[#39FFCA] text-[#0D0B14] px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                <Plus size={14} strokeWidth={3} /> Invite
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-white/5">
                  <th className="pb-6 w-10">
                    <input type="checkbox" className="accent-[#39FFCA]" 
                      onChange={(e) => setSelectedIds(e.target.checked ? displayMembers.map(m => m.id) : [])}
                      checked={selectedIds.length === displayMembers.length && displayMembers.length > 0} />
                  </th>
                  <th className="pb-6 cursor-pointer" onClick={() => setSortKey('full_name')}>Dweller</th>
                  <th className="pb-6 cursor-pointer" onClick={() => setSortKey('created_date')}>Joined</th>
                  <th className="pb-6">Tier</th>
                  <th className="pb-6 text-right">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {displayMembers.map((m) => {
                  const isEditing = editingTier?.userId === m.id;
                  const resolvedTier = m.tier ? m.tier.toLowerCase() : (m.role === 'admin' ? 'admin' : 'traveler');
                  return (
                    <tr key={m.id} className={`group hover:bg-white/[0.015] transition-colors ${selectedIds.includes(m.id) ? 'bg-[#39FFCA]/5' : ''}`}>
                      <td className="py-5">
                        <input type="checkbox" className="accent-[#39FFCA]" 
                          checked={selectedIds.includes(m.id)}
                          onChange={() => setSelectedIds(prev => prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id])} />
                      </td>
                      <td className="py-5">
                        <p className="text-sm font-bold text-zinc-200">{m.full_name || 'Anonymous'}</p>
                        <p className="text-[10px] text-zinc-600 font-mono">{m.email}</p>
                      </td>
                      <td className="py-5 text-[10px] text-zinc-500 font-mono">
                        {m.created_date ? new Date(m.created_date).toLocaleDateString('en-CA') : '—'}
                      </td>
                      <td className="py-5">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <select autoFocus value={editingTier.tier} onChange={(e) => setEditingTier({ ...editingTier, tier: e.target.value })}
                              className="bg-black border border-[#39FFCA]/20 rounded-lg px-2 py-1 text-[10px] text-[#39FFCA] outline-none">
                              {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <button onClick={() => handleTierSave(m.id, editingTier.tier)} className="text-[#39FFCA] hover:bg-[#39FFCA]/10 p-1 rounded"><Check size={14}/></button>
                            <button onClick={() => setEditingTier(null)} className="text-zinc-500 hover:text-white p-1"><X size={14}/></button>
                          </div>
                        ) : (
                          <button onClick={() => setEditingTier({ userId: m.id, tier: resolvedTier })} className="hover:opacity-70 transition-opacity">
                            <TierBadge tier={resolvedTier} />
                          </button>
                        )}
                      </td>
                      <td className="py-5 text-right text-[9px] text-zinc-700 font-mono">
                         {m.updated_date ? new Date(m.updated_date).toLocaleDateString('en-CA') : 'Never'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Sidebar: Pulse + Embers ── */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1C1622]/50 p-8 rounded-[3rem] border border-white/5">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#39FFCA] mb-8 flex items-center gap-2">
              <Activity size={14} /> Live Pulse
            </h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((log, idx) => (
                <div key={idx} className="bg-black/30 p-4 rounded-2xl border border-white/[0.04]">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-black uppercase ${ACTION_COLORS[log.action_type] || 'text-zinc-500'}`}>{log.action_type}</span>
                    <span className="text-[8px] text-zinc-800 font-mono">{new Date(log.created_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="text-[10px] text-zinc-600 truncate">{log.user_email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bulk Action Bar ── */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] bg-white text-black px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{selectedIds.length} Selected</span>
              <span className="text-[8px] text-zinc-400 font-bold uppercase">Dweller Actions</span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-100" />
            <div className="flex gap-4">
              {TIERS.map(t => (
                <button key={t} onClick={() => handleBulkUpdate(t)}
                  className="text-[9px] font-black uppercase hover:text-[#39FFCA] transition-colors border border-zinc-100 px-3 py-2 rounded-xl">
                  Set {t}
                </button>
              ))}
              <button onClick={() => setSelectedIds([])} className="text-[9px] font-black uppercase text-rose-500 ml-4">Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Invite Modal ── */}
      {/* (Keep your existing Invite Modal JSX here) */}
      
    </motion.div>
  );
}