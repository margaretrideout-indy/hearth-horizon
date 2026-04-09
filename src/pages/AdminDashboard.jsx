import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Crown, 
  Activity, 
  Search, 
  Settings, 
  ShieldCheck, 
  Mail, 
  Clock 
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [seatRequests, setSeatRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const teal = "#2DD4BF";

  useEffect(() => {
    const fetchForestData = async () => {
      try {
        const m = await import('@/api/base44Client');
        
        // Fetching Users and Sponsorship Requests simultaneously
        const [userRes, seatRes] = await Promise.all([
          m.base44.entities.UserProfile.list(),
          m.base44.entities.SeatRequest.list()
        ]);

        setUsers(userRes.data || []);
        setSeatRequests(seatRes.data || []);
      } catch (error) {
        console.error("Failed to sync with the mycelium network:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForestData();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1423] text-slate-200 p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck style={{ color: teal }} className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">System Oversight</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Forest Admin</h1>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search dwellers..." 
            className="w-full bg-[#251D2F] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:border-[#2DD4BF]/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Dwellers', value: users.length, icon: Users, color: teal },
          { label: 'Seat Requests', value: seatRequests.length, icon: Mail, color: '#A855F7' },
          { label: 'Active Tiers', value: 'Found Founding', icon: Activity, color: '#F43F5E' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#251D2F] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl">
            <stat.icon style={{ color: stat.color }} className="absolute right-[-10px] bottom-[-10px] w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-2">{stat.label}</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Table (Main Section) */}
        <div className="lg:col-span-2 bg-[#251D2F] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              Recent Members
            </h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="px-8 py-4 text-[9px] uppercase tracking-widest text-slate-500 font-black">Dwellers</th>
                  <th className="px-8 py-4 text-[9px] uppercase tracking-widest text-slate-500 font-black">Tier</th>
                  <th className="px-8 py-4 text-right text-[9px] uppercase tracking-widest text-slate-500 font-black">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="3" className="p-12 text-center italic text-slate-500 text-sm">Scanning the mycelium network...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="3" className="p-12 text-center text-slate-500 text-sm">No dwellers found yet.</td></tr>
                ) : users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-white text-sm">{u.name || u.email}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{u.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span 
                        style={{ backgroundColor: u.tier === 'Steward' ? `${teal}15` : 'rgba(255,255,255,0.05)', color: u.tier === 'Steward' ? teal : '#94a3b8' }} 
                        className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border border-white/5"
                      >
                        {u.tier || 'Seedling'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-600 hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Requests & Logs */}
        <div className="space-y-8">
          <div className="bg-[#251D2F] rounded-[2rem] p-8 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                Seat Requests
              </h3>
              <span className="bg-purple-500/20 text-purple-400 text-[9px] font-black px-2 py-0.5 rounded-full">
                {seatRequests.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {seatRequests.length === 0 ? (
                <p className="text-slate-600 text-xs italic">No pending sponsorships.</p>
              ) : seatRequests.map(req => (
                <div key={req.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <p className="text-white text-xs font-bold">{req.requesterName}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1 italic">"{req.reason}"</p>
                  <button className="mt-3 w-full py-2 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest text-slate-300 rounded-lg transition-all">
                    Review Request
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;