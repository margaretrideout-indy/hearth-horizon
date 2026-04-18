import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  Activity, 
  Search, 
  RefreshCw,
  Clock,
  Plus,
  X,
  ShieldAlert,
  ChevronRight,
  Zap,
  ArrowLeft
} from 'lucide-react';

export default function AdminDashboard({ vault, onSync, isAdmin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', tier: 'Tester' });

  // FIXED LOGIC: More robust check for Steward or Admin status
  const isSteward = vault?.tier?.toLowerCase() === 'steward';
  const isAuthorized = isAdmin || isSteward || vault?.isAdmin;

  const B44_PROJECT_ID = window.BASE44_PROJECT_ID || ''; 
  const B44_TOKEN = window.BASE44_API_TOKEN || '';

  const syncBase44 = async () => {
    // Only block if we are SURE they aren't authorized
    if (!B44_PROJECT_ID || !B44_TOKEN || !isAuthorized) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const msgRes = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/messages/documents`, {
        headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
      });
      const dwellerRes = await fetch(`https://api.base44.io/v1/projects/${B44_PROJECT_ID}/collections/dwellers/documents`, {
        headers: { 'Authorization': `Bearer ${B44_TOKEN}` }
      });

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
  }, [isAuthorized]);

  // Authorization Guard
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0D0B14] flex items-center justify-center p-6 text-center">
        <div className="space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center justify-center text-red-500 mx-auto">
            <ShieldAlert size={40} />
          </div>
          <h2 className="text-3xl font-serif italic text-white">Restricted Access</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">Only Steward-level clearance may oversee the Forest Registry.</p>
          <button 
            onClick={() => navigate('/hearth', { replace: true })} 
            className="w-full h-11 flex items-center justify-center text-[#39FFCA] text-[10px] font-black uppercase tracking-widest border-b border-[#39FFCA]/20"
          >
            Return to Hearth
          </button>
        </div>
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
        body: JSON.stringify({ ...newUser, isAligned: false, joinedAt: new Date().toISOString() })
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
    <div className="min-h-screen bg-[#0D0B14] text-white font-sans p-4 md:p-12 pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
        <div className="text-left">
          <button 
            onClick={() => navigate('/hearth')}
            className="w-11 h-11 -ml-3 mb-4 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#39FFCA] animate-pulse" />
            <p className="text-[#39FFCA] text-[10px] font-black uppercase tracking-[0.3em]">System Oversight</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-white italic tracking-tight">Forest Admin</h1>
        </div>

        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input 
              type="text"
              placeholder="Search dwellers..."
              className="bg-[#1C1622] border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-80 text-xs focus:ring-1 focus:ring-[#39FFCA]/30 transition-all outline-none"
            />
          </div>
          <button 
            onClick={syncBase44} 
            className="w-14 h-14 bg-[#1C1622] flex items-center justify-center rounded-2xl hover:bg-white/5 transition-colors border border-white/5 group"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin text-[#39FFCA]' : 'text-zinc-500 group-hover:text-white'} />
          </button>
        </div>
      </header>

      {/* STATS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#1C1622] p-8 rounded-[2.5rem] border border-white/5 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Dwellers</p>
            <span className="text-6xl font-bold tracking-tighter">{members.length}</span>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-500"><Users size={28} /></div>
        </div>

        <div className="bg-[#1C1622] p-8 rounded-[2.5rem] border border-white/5 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Active Scans</p>
            <span className="text-6xl font-bold tracking-tighter text-[#39FFCA]">
                {members.filter(m => m.isAligned).length}
            </span>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-[#39FFCA]/10 rounded-2xl text-[#39FFCA]"><Zap size={28} /></div>
        </div>

        <div className="bg-[#1C1622] p-8 rounded-[2.5rem] border border-[#39FFCA]/10 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[#39FFCA] text-[10px] font-black uppercase tracking-widest">Intentions</p>
            <span className="text-6xl font-bold tracking-tighter leading-none">{intentions.length}</span>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-white/5 rounded-2xl text-zinc-500"><Mail size={28} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        <div className="lg:col-span-8 bg-[#1C1622] p-8 md:p-10 rounded-[3rem] border border-white/5 overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-serif italic">Dweller Registry</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="h-11 flex items-center gap-3 bg-[#39FFCA] text-[#0D0B14] px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              <Plus size={14} strokeWidth={3} /> Invite
            </button>
          </div>
          
          <div className="overflow-x-auto embers-scroll">
            <table className="w-full">
                <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 border-b border-white/5">
                    <th className="pb-6 text-left">Dweller</th>
                    <th className="pb-6 text-left">Pulse</th>
                    <th className="pb-6 text-left">Tier</th>
                    <th className="pb-6 text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                {members.map((m, idx) => (
                    <tr key={idx} className="group">
                    <td className="py-6">
                        <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-200">{m.name || 'Unknown'}</span>
                        <span className="text-[10px] text-zinc-600 font-mono">{m.email}</span>
                        </div>
                    </td>
                    <td className="py-6">
                        {m.isAligned ? (
                        <div className="flex items-center gap-2 text-[#39FFCA] text-[10px] font-black italic">
                            <Zap size={12} /> ALIGNED
                        </div>
                        ) : (
                        <span className="text-zinc-700 text-[10px] font-bold uppercase">Dormant</span>
                        )}
                    </td>
                    <td className="py-6">
                        <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black text-zinc-400 border border-white/5">
                        {m.tier || 'Traveler'}
                        </span>
                    </td>
                    <td className="py-6 text-right">
                        <button className="w-11 h-11 inline-flex items-center justify-center text-zinc-700 hover:text-white transition-colors">
                        <ChevronRight size={18} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4">
            <div className="bg-[#1C1622] p-10 rounded-[3rem] h-full border border-white/5 flex flex-col">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#9D79FF]" />
                <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Intentions Feed</h2>
                </div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px] pr-2 embers-scroll">
                {intentions.map((item, idx) => (
                    <div key={idx} className="bg-black/20 p-6 rounded-[2rem] border border-white/5">
                    <p className="text-[10px] font-black text-zinc-500 mb-3 uppercase tracking-tighter truncate">{item.email || 'Anonymous'}</p>
                    <p className="text-xs text-zinc-400 italic font-serif leading-relaxed line-clamp-4">"{item.message || item.content}"</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
      </div>

      {/* INVITE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0D0B14]/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
          <div className="bg-[#1C1622] w-full max-w-md rounded-[3rem] p-10 border border-white/10 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 w-11 h-11 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8 text-left">
                <h2 className="text-3xl font-serif mb-2 italic text-white">New Dweller</h2>
                <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">Add to registry</p>
            </div>
            
            <form onSubmit={handleAddUser} className="space-y-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Display Name</label>
                <input 
                  required
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white outline-none"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 ml-2">Email Identity</label>
                <input 
                  required
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full h-14 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] hover:bg-[#39FFCA] transition-all"
              >
                Seal Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}