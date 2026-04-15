import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Activity, 
  Search, 
  RefreshCw,
  Clock,
  Plus,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [intentions, setIntentions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', tier: 'Tester' });

  const syncBase44 = async () => {
    setLoading(true);
    try {
      const b44ProjectId = 'YOUR_PROJECT_ID';
      const b44Token = 'YOUR_API_TOKEN';

      const response = await fetch(`https://api.base44.io/v1/projects/${b44ProjectId}/collections/messages/documents`, {
        headers: { 'Authorization': `Bearer ${b44Token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setIntentions(data.documents || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const b44ProjectId = 'YOUR_PROJECT_ID';
      const b44Token = 'YOUR_API_TOKEN';

      const response = await fetch(`https://api.base44.io/v1/projects/${b44ProjectId}/collections/dwellers/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${b44Token}`
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', tier: 'Tester' });
        syncBase44();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    syncBase44();
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1625] text-white font-sans p-8">
      <header className="flex justify-between items-start mb-12">
        <div>
          <p className="text-[#39FFCA] text-[10px] font-black uppercase tracking-[0.2em] mb-1">System Oversight</p>
          <h1 className="text-5xl font-serif text-white">Forest Admin</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="text"
              placeholder="Search dwellers..."
              className="bg-[#241F31] border-none rounded-xl py-3 pl-12 pr-6 w-80 text-sm focus:ring-1 focus:ring-[#39FFCA]/30 transition-all"
            />
          </div>
          <button onClick={syncBase44} className="p-3 bg-[#241F31] rounded-xl hover:bg-[#2d273d] transition-colors">
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-[#241F31] p-8 rounded-[2rem] flex justify-between items-center text-left">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Total Dwellers</p>
            <span className="text-6xl font-bold">{members.length}</span>
          </div>
          <div className="bg-[#2d273d] p-4 rounded-2xl text-zinc-600">
            <Users size={32} />
          </div>
        </div>

        <div className="bg-[#241F31] p-8 rounded-[2rem] flex justify-between items-center text-left">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Seat Requests</p>
            <span className="text-6xl font-bold">0</span>
          </div>
          <div className="bg-[#2d273d] p-4 rounded-2xl text-zinc-600">
            <Mail size={32} />
          </div>
        </div>

        <div className="bg-[#241F31] p-8 rounded-[2rem] flex justify-between items-center text-left">
          <div>
            <p className="text-[#39FFCA] text-[10px] font-black uppercase tracking-widest mb-4">Active Tiers</p>
            <span className="text-6xl font-bold leading-none">3 Levels</span>
          </div>
          <div className="bg-[#2d273d] p-4 rounded-2xl text-zinc-600">
            <Activity size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#241F31] p-10 rounded-[2.5rem] min-h-[400px]">
          <div className="flex justify-between items-center mb-10 text-left">
            <h2 className="text-2xl font-bold">Recent Members</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#39FFCA] text-[#1A1625] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2ee5b5] transition-colors"
            >
              <Plus size={14} strokeWidth={3} /> Invite Dweller
            </button>
          </div>
          
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-zinc-700 border-b border-zinc-800">
                <th className="pb-4">Dweller Email</th>
                <th className="pb-4">Current Tier</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-20 text-center text-zinc-800 italic">No dwellers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-[#241F31] p-10 rounded-[2.5rem] flex flex-col text-left">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-[#9D79FF]" />
              <h2 className="text-[10px] font-black uppercase tracking-widest text-left">Pending Intentions</h2>
            </div>
            <span className="bg-[#9D79FF] text-white text-[10px] font-black px-2 py-1 rounded-lg">{intentions.length}</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
            {intentions.length === 0 ? (
              <>
                <p className="text-zinc-600 font-serif italic text-lg mb-1">The clearing is quiet.</p>
                <p className="text-zinc-800 text-sm">No new intentions yet.</p>
              </>
            ) : (
              <div className="w-full space-y-4 overflow-y-auto max-h-[300px]">
                {intentions.map((item, idx) => (
                  <div key={idx} className="bg-[#2d273d] p-4 rounded-xl text-left border-l-2 border-[#9D79FF]">
                    <p className="text-xs font-bold truncate">{item.email}</p>
                    <p className="text-[10px] text-zinc-500 line-clamp-2">{item.message || item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#241F31] w-full max-w-md rounded-[2.5rem] p-10 border border-white/5 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-serif mb-2">New Dweller</h2>
            <p className="text-zinc-500 text-xs mb-8">Manually add a tester or member to the registry.</p>
            
            <form onSubmit={handleAddUser} className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-[#1A1625] border-none rounded-xl py-4 px-6 text-sm focus:ring-1 focus:ring-[#39FFCA]/30 outline-none"
                  placeholder="e.g. Test User"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block mb-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-[#1A1625] border-none rounded-xl py-4 px-6 text-sm focus:ring-1 focus:ring-[#39FFCA]/30 outline-none"
                  placeholder="dweller@example.com"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#39FFCA] text-[#1A1625] font-black uppercase tracking-[0.2em] py-4 rounded-2xl text-xs hover:bg-[#2ee5b5] transition-all"
              >
                Confirm Invitation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}