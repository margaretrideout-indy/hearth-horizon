import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Search, RefreshCw, Plus, X,
  ArrowLeft, Wind, Activity, Check
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FOUNDER_EMAIL = 'margaretpardy@gmail.com';

const ACTION_COLORS = {
  'Resume Uploaded':   'text-teal-400',
  'Lexicon Alchemized':  'text-purple-400',
  'Job Clicked':        'text-amber-400',
  'Alignment Synced':    'text-blue-400',
};

// ── Sub-Components ───────────────────────────────────────────────────────────

function VitalityCard({ label, value, icon }) {
  return (
    <div className="bg-[#1C1622]/40 p-6 rounded-[2rem] border border-white/5">
      <div className="flex justify-between items-start mb-4 text-zinc-700">
        <p className="text-[9px] font-black uppercase tracking-widest">{label}</p>
        {icon}
      </div>
      <p className="text-5xl font-bold tracking-tighter text-zinc-200">{value}</p>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [posts, setPosts] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

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

  const displayMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return members.filter(m => 
      m.full_name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q)
    );
  }, [members, searchQuery]);

  if (!authChecked || !isAuthorized) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0D0B14] text-white p-4 md:p-12 pb-32">
      
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

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 text-xs focus:ring-1 focus:ring-[#39FFCA]/20 transition-all outline-none" />
        </div>
      </header>

      {/* ── Vitality Strip ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        <VitalityCard label="Total Registry" value={members.length} icon={<Users size={18} />} />
        <VitalityCard label="Logs" value={logs.length} icon={<Activity size={18} />} />
        <VitalityCard label="Posts" value={posts.length} icon={<Wind size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ── Main Registry ── */}
        <div className="lg:col-span-8 bg-[#1C1622]/50 p-6 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <button onClick={syncData} className="w-11 h-11 bg-white/5 flex items-center justify-center rounded-xl border border-white/5 hover:text-[#39FFCA] transition-colors">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-white/5">
                  <th className="pb-6 w-10">
                    <input type="checkbox" className="accent-[#39FFCA]" onChange={(e) => setSelectedIds(e.target.checked ? displayMembers.map(m => m.id) : [])} />
                  </th>
                  <th className="pb-6">Dweller</th>
                  <th className="pb-6">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {displayMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.015] transition-colors">
                    <td className="py-5"><input type="checkbox" className="accent-[#39FFCA]" checked={selectedIds.includes(m.id)} onChange={() => setSelectedIds(prev => prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id])} /></td>
                    <td className="py-5">
                      <p className="text-sm font-bold text-zinc-200">{m.full_name || 'Anonymous'}</p>
                      <p className="text-[10px] text-zinc-600 font-mono">{m.email}</p>
                    </td>
                    <td className="py-5 text-[10px] text-zinc-500 font-mono">{m.created_date ? new Date(m.created_date).toLocaleDateString('en-CA') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Sidebar: Live Pulse ── */}
        <div className="lg:col-span-4 bg-[#1C1622]/50 p-8 rounded-[3rem] border border-white/5">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-[#39FFCA] mb-8 flex items-center gap-2">
            <Activity size={14} /> Live Pulse
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
    </motion.div>
  );
}