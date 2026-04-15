import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Users, Mail, Activity, Check, X, Clock, Send, Zap, BarChart3, TrendingUp, Inbox, Trash2 } from 'lucide-react';

const ForestAdmin = ({ vault, onSync, isAdmin }) => {
  const queryClient = useQueryClient();
  const [grantEmail, setGrantEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dwellers');

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

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const res = await window.base44?.entities?.ContactMessages?.list();
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
      if (variables.email.toLowerCase() === vault?.name?.toLowerCase() || isAdmin) {
        onSync({ tier: variables.tier });
      }
    }
  });

  const deleteMessage = useMutation({
    mutationFn: async (id) => {
      return await window.base44.entities.ContactMessages.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-messages']);
    }
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
    }
  });

  if (dwellersLoading || requestsLoading || messagesLoading) {
    return (
      <div className="min-h-screen bg-[#0A080D] flex items-center justify-center">
        <div className="text-teal-500/50 animate-pulse font-black uppercase text-[10px] tracking-[0.5em]">
          Gathering Forest Data...
        </div>
      </div>
    );
  }

  const safeDwellers = Array.isArray(dwellers) ? dwellers : [];
  const pendingRequests = (Array.isArray(requests) ? requests : []).filter(r => r.status === 'available');
  const safeMessages = Array.isArray(messages) ? messages : [];

  const getProgress = (dweller) => {
    try {
      return dweller.progress_data ? JSON.parse(dweller.progress_data) : { status: 'Unknown', last_activity: null };
    } catch {
      return { status: 'Legacy', last_activity: null };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A080D] p-4 sm:p-8 font-sans text-slate-200 selection:bg-teal-500/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="text-[10px] font-black text-teal-500 uppercase tracking-[0.3em] mb-2">System Oversight</div>
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight italic">Forest Admin</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="email" 
              value={grantEmail}
              onChange={(e) => setGrantEmail(e.target.value)}
              placeholder="Grant access by email..." 
              className="bg-[#16121D] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm outline-none focus:border-teal-500/30 w-full md:w-64 placeholder:text-slate-600 shadow-inner"
            />
          </div>
          <button 
            onClick={() => manualGrant.mutate({ email: grantEmail, tier: 'Hearthkeeper' })}
            disabled={!grantEmail || manualGrant.isPending}
            className="px-6 py-3 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-[#0A080D] transition-all disabled:opacity-50"
          >
            + Hearthkeeper
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Dwellers" value={safeDwellers.length} icon={<Users />} />
        <StatCard title="Seat Requests" value={pendingRequests.length} icon={<Mail />} />
        <StatCard title="Inbox" value={safeMessages.length} icon={<Inbox />} />
        <StatCard title="System Pulse" value="Healthy" icon={<Activity />} />
      </div>

      <div className="flex gap-8 mb-8 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('dwellers')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'dwellers' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500'}`}
        >
          Dweller List
        </button>
        <button 
          onClick={() => setActiveTab('inbox')}
          className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'inbox' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-slate-500'}`}
        >
          Sanctuary Inbox ({safeMessages.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'dwellers' ? (
            <div className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5">
                      <th className="pb-4 px-2">Dweller Email</th>
                      <th className="pb-4 px-2">Current Tier</th>
                      <th className="pb-4 px-2 text-right">Last Active</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[...safeDwellers].reverse().map(dweller => {
                      const progress = getProgress(dweller);
                      return (
                        <tr key={dweller.id} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                          <td className="py-6 px-2 text-slate-300 text-xs md:text-sm">{dweller.email}</td>
                          <td className="py-6 px-2">
                            <span className={`px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-tighter ${
                              dweller.subscription_tier === 'Steward' ? 'bg-purple-500/10 text-purple-400' :
                              dweller.subscription_tier === 'Hearthkeeper' ? 'bg-teal-500/10 text-teal-400' :
                              'bg-white/5 text-slate-500'
                            }`}>
                              {dweller.subscription_tier || 'Seedling'}
                            </span>
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
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {safeMessages.length > 0 ? [...safeMessages].reverse().map(msg => (
                <div key={msg.id} className="bg-[#110E16] border border-white/5 rounded-3xl p-6 shadow-xl relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-bold text-sm">{msg.sender_name}</h4>
                      <p className="text-teal-500 text-[10px] font-medium">{msg.sender_email}</p>
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm italic font-light leading-relaxed mb-6">
                    "{msg.message}"
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={`mailto:${msg.sender_email}?subject=Re: Hearth & Horizon Inquiry`}
                      className="px-4 py-2 bg-teal-500/10 text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-[#0A080D] transition-all"
                    >
                      Reply via Email
                    </a>
                    <button 
                      onClick={() => deleteMessage.mutate(msg.id)}
                      className="p-2 text-slate-600 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="bg-[#110E16]/30 border border-white/5 border-dashed rounded-[2.5rem] py-20 text-center">
                  <Inbox className="mx-auto w-8 h-8 text-slate-700 mb-4" />
                  <p className="text-slate-500 italic text-sm">No new messages from the forest.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-10">
            <Clock className="w-4 h-4 text-purple-400" />
            <h3 className="font-black text-[10px] uppercase tracking-[0.3em] text-white">Pending Requests</h3>
          </div>
          <div className="space-y-6">
            {pendingRequests.map(request => (
              <div key={request.id} className="p-6 bg-black/40 rounded-3xl border border-white/5">
                <div className="text-[10px] font-bold text-teal-500/60 mb-2 truncate">{request.claimed_by}</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => approveRequest.mutate({ requestId: request.id, email: request.claimed_by })}
                    className="flex-grow py-3 bg-teal-500/10 text-teal-400 rounded-xl hover:bg-teal-500 hover:text-[#0A080D] transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    Grant Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#110E16] border border-white/5 rounded-[2.5rem] p-8 flex items-center justify-between group hover:border-teal-500/10 transition-all shadow-xl">
    <div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{title}</div>
      <div className="text-3xl font-black text-white">{value}</div>
    </div>
    <div className="p-4 bg-black/40 rounded-2xl text-slate-600 group-hover:text-teal-400 group-hover:bg-teal-400/5 transition-all shadow-inner">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
  </div>
);

export default ForestAdmin;