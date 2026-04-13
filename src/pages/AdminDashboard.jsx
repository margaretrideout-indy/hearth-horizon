import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Mail, Activity, Check, X, Clock, Send, Zap, BarChart3, TrendingUp } from 'lucide-react';

const ForestAdmin = () => {
  const queryClient = useQueryClient();
  const [grantEmail, setGrantEmail] = useState('');

  const { data: dwellers, isLoading: dwellersLoading } = useQuery({
    queryKey: ['dwellers'],
    queryFn: async () => {
      const res = await window.base44?.entities?.User?.list();
      return Array.isArray(res) ? res : [];
    }
  });

  const { data: requests, isLoading: requestsLoading } = useQuery({
    queryKey: ['seat-requests'],
    queryFn: async () => {
      const res = await window.base44?.entities?.VoucherPool?.list();
      return Array.isArray(res) ? res : [];
    }
  });

  const manualGrant = useMutation({
    mutationFn: async ({ email, tier = 'Hearthkeeper' }) => {
      if (!window.base44?.entities?.User) {
        throw new Error("Database connection not ready. Please refresh and try again.");
      }

      const cleanEmail = email.toLowerCase().trim();
      const dwellerList = dwellers || [];
      const user = dwellerList.find(u => u.email?.toLowerCase() === cleanEmail);
      
      if (user) {
        return await window.base44.entities.User.update(user.id, { subscription_tier: tier });
      } else {
        return await window.base44.entities.User.create({ 
          email: cleanEmail, 
          subscription_tier: tier,
          progress_data: JSON.stringify({ status: 'Joined', last_activity: new Date().toISOString() })
        });
      }
    },
    onSuccess: (data, variables) => {
      setGrantEmail('');
      queryClient.invalidateQueries(['dwellers']);
      alert(`Success: ${variables.email} is now a ${variables.tier}.`);
    },
    onError: (err) => alert(err.message)
  });

  const approveRequest = useMutation({
    mutationFn: async ({ requestId, email }) => {
      const cleanEmail = email.toLowerCase().trim();
      const dwellerList = dwellers || [];
      const user = dwellerList.find(u => u.email?.toLowerCase() === cleanEmail);
      
      if (user) {
        await window.base44.entities.User.update(user.id, { subscription_tier: 'Hearthkeeper' });
      } else {
        await window.base44.entities.User.create({ 
          email: cleanEmail, 
          subscription_tier: 'Hearthkeeper',
          progress_data: JSON.stringify({ status: 'Seat Granted', last_activity: new Date().toISOString() })
        });
      }
      
      return await window.base44.entities.VoucherPool.update(requestId, { 
        status: 'claimed',
        claimed_date: new Date().toISOString(),
        user_email: cleanEmail
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seat-requests']);
      queryClient.invalidateQueries(['dwellers']);
      alert("Seat granted successfully.");
    },
    onError: (err) => alert(err.message)
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

  const safeDwellers = Array.isArray(dwellers) ? dwellers : [];
  const pendingRequests = (Array.isArray(requests) ? requests : []).filter(r => r.status === 'available');

  const getProgress = (dweller) => {
    try {
      return dweller.progress_data ? JSON.parse(dweller.progress_data) : { status: 'Unknown', last_activity: null };
    } catch {
      return { status: 'Legacy', last_activity: null };
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-8 font-sans text-slate-200">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-2">System Oversight</div>
          <h1 className="text-5xl font-serif text-white tracking-tight">Forest Admin</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="email" 
              value={grantEmail}
              onChange={(e) => setGrantEmail(e.target.value)}
              placeholder="Enter ANY email address..." 
              className="bg-[#241B2E] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm outline-none focus:border-purple-500/30 transition-all w-full md:w-64 placeholder:text-slate-600"
            />
          </div>
          <button 
            onClick={() => manualGrant.mutate({ email: grantEmail, tier: 'Hearthkeeper' })}
            disabled={!grantEmail || manualGrant.isPending}
            className="px-6 py-3 bg-teal-600/10 text-teal-400 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-[#1A1423] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            + Hearthkeeper
          </button>
          <button 
            onClick={() => manualGrant.mutate({ email: grantEmail, tier: 'Steward' })}
            disabled={!grantEmail || manualGrant.isPending}
            className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Zap className="w-3 h-3" /> + Steward
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Dwellers" value={safeDwellers.length} icon={<Users />} />
        <StatCard title="Seat Requests" value={pendingRequests.length} icon={<Mail />} />
        <StatCard title="Active Tiers" value="3 Levels" icon={<Activity />} />
        <StatCard title="System Pulse" value="Healthy" icon={<TrendingUp />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-10 shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-bold text-xl text-white flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-teal-500" />
              Dweller Progress
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5">
                  <th className="pb-4 px-2">Dweller Email</th>
                  <th className="pb-4 px-2">Current Tier</th>
                  <th className="pb-4 px-2 text-center">Progress Status</th>
                  <th className="pb-4 px-2 text-right">Last Active</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {[...safeDwellers].reverse().slice(0, 15).map(dweller => {
                  const progress = getProgress(dweller);
                  return (
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
                      <td className="py-6 px-2 text-center">
                        <span className="text-[10px] text-slate-400 italic font-light">{progress.status || 'Active'}</span>
                      </td>
                      <td className="py-6 px-2 text-right text-slate-500 text-[10px] font-mono">
                        {progress.last_activity ? new Date(progress.last_activity).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-10 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-4 h-4 text-purple-400" />
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-white">Pending Requests</h3>
            <span className="ml-auto bg-purple-500/20 text-purple-400 text-[10px] font-black px-2 py-0.5 rounded-full">
              {pendingRequests.length}
            </span>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
            {pendingRequests.map(request => (
              <div key={request.id} className="group p-6 bg-black/20 rounded-3xl border border-white/5 hover:border-teal-500/20 transition-all">
                <div className="text-[10px] font-bold text-teal-500/60 mb-2 truncate">{request.claimed_by}</div>
                <p className="text-xs italic font-light text-slate-400 leading-relaxed mb-6">
                  {request.notes || "Requested a seat in the Sanctuary."}
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => approveRequest.mutate({ requestId: request.id, email: request.claimed_by })}
                    className="flex-grow py-3 bg-teal-500/10 text-teal-400 rounded-xl hover:bg-teal-500 hover:text-[#1A1423] transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    Grant Seat
                  </button>
                  <button 
                    onClick={() => {
                      if(confirm("Clear this request?")) {
                        window.base44.entities.VoucherPool.delete(request.id).then(() => queryClient.invalidateQueries(['seat-requests']))
                      }
                    }}
                    className="px-4 py-3 bg-white/5 text-slate-500 rounded-xl hover:text-rose-500 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <div className="text-center py-20 text-slate-600 italic text-sm font-light">
                The clearing is quiet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#241B2E] border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-teal-500/10 transition-all shadow-lg">
    <div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{title}</div>
      <div className="text-3xl font-black text-white">{value}</div>
    </div>
    <div className="p-3 bg-white/5 rounded-2xl text-slate-600 group-hover:text-teal-400 group-hover:bg-teal-400/5 transition-all">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
  </div>
);

export default ForestAdmin;