import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Mail, Activity, Search, Check, X, Clock } from 'lucide-react';

const ForestAdmin = () => {
  const queryClient = useQueryClient();

  // Pulling in our dwellers (users)
  const { data: dwellers, isLoading: dwellersLoading } = useQuery({
    queryKey: ['dwellers'],
    queryFn: () => window.base44.entities.User.list()
  });

  // Pulling in the seat requests
  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['seat-requests'],
    queryFn: () => window.base44.entities.SeatRequest.list()
  });

  // The "Grant Seat" magic logic
  const approveRequest = useMutation({
    mutationFn: async ({ requestId, userId }) => {
      await window.base44.entities.SeatRequest.update(requestId, { status: 'approved' });
      return await window.base44.entities.User.update(userId, { subscription_tier: 'Hearthkeeper' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seat-requests']);
      queryClient.invalidateQueries(['dwellers']);
    }
  });

  if (dwellersLoading || requestsLoading) {
    return (
      <div className="min-h-screen bg-[#1A1423] flex items-center justify-center">
        <div className="text-teal-500/50 animate-pulse font-black uppercase text-[10px] tracking-[0.5em]">
          Gathering Forest Data...
        </div>
      </div>
    );
  }

  const pendingRequests = requests?.filter(r => r.status === 'pending') || [];

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 font-sans text-slate-200">
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-2">System Oversight</div>
          <h1 className="text-5xl font-serif text-white tracking-tight">Forest Admin</h1>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search dwellers..." 
            className="bg-[#241B2E] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm outline-none focus:border-teal-500/30 transition-all w-full md:w-64 placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Dwellers" value={dwellers?.length || 0} icon={<Users />} />
        <StatCard title="Seat Requests" value={pendingRequests.length} icon={<Mail />} />
        <StatCard title="Active Tiers" value="3 Levels" icon={<Activity />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Members Table */}
        <div className="lg:col-span-2 bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-xl text-white">Recent Members</h3>
            <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-teal-400 transition-all">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4 px-2">Dweller Email</th>
                  <th className="pb-4 px-2">Current Tier</th>
                  <th className="pb-4 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {dwellers?.slice(0, 8).map(dweller => (
                  <tr key={dweller.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                    <td className="py-6 px-2 text-slate-300">{dweller.email}</td>
                    <td className="py-6 px-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-black tracking-tighter ${
                        dweller.subscription_tier === 'Steward' ? 'bg-purple-500/10 text-purple-400' :
                        dweller.subscription_tier === 'Hearthkeeper' ? 'bg-teal-500/10 text-teal-400' :
                        'bg-white/5 text-slate-500'
                      }`}>
                        {dweller.subscription_tier || 'Seedling'}
                      </span>
                    </td>
                    <td className="py-6 px-2 text-right">
                      <button className="text-slate-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seat Requests Detail View */}
        <div className="bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-10 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-4 h-4 text-purple-400" />
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-white">Pending Intentions</h3>
            <span className="ml-auto bg-purple-500/20 text-purple-400 text-[10px] font-black px-2 py-0.5 rounded-full">
              {pendingRequests.length}
            </span>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {pendingRequests.map(request => (
              <div key={request.id} className="group p-6 bg-black/20 rounded-3xl border border-white/5 hover:border-teal-500/20 transition-all">
                <div className="text-[10px] font-bold text-teal-500/60 mb-2 truncate">{request.userEmail}</div>
                <p className="text-xs italic font-light text-slate-400 leading-relaxed mb-6">
                  "{request.intention}"
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => approveRequest.mutate({ requestId: request.id, userId: request.userId })}
                    className="flex-grow py-3 bg-teal-500/10 text-teal-400 rounded-xl hover:bg-teal-500 hover:text-[#1A1423] transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    Grant Seat
                  </button>
                  <button className="px-4 py-3 bg-white/5 text-slate-500 rounded-xl hover:text-rose-500 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <div className="text-center py-20 text-slate-600 italic text-sm font-light">
                The clearing is quiet. <br/> No new intentions yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-10 flex items-center justify-between group hover:border-teal-500/10 transition-all shadow-lg">
    <div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{title}</div>
      <div className="text-4xl font-black text-white">{value}</div>
    </div>
    <div className="p-4 bg-white/5 rounded-2xl text-slate-600 group-hover:text-teal-400 group-hover:bg-teal-400/5 transition-all">
      {React.cloneElement(icon, { className: 'w-6 h-6' })}
    </div>
  </div>
);

export default ForestAdmin;