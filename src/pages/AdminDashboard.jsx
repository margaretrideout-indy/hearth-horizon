import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  Users, 
  UserPlus, 
  Trash2, 
  Search,
  RefreshCw,
  AlertCircle,
  Compass,
  Tent,
  Mountain
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [vouchers, setVouchers] = useState([]);

  const loadBase44Data = async () => {
    setLoading(true);
    setError(null);
    try {
      const b44ProjectId = 'YOUR_PROJECT_ID';
      const b44Token = 'YOUR_API_TOKEN';

      const response = await fetch(`https://api.base44.io/v1/projects/${b44ProjectId}/collections/messages/documents`, {
        headers: { 'Authorization': `Bearer ${b44Token}` }
      });
      
      if (!response.ok) throw new Error('Sanctuary node unreachable');
      
      const data = await response.json();
      setMessages(data.documents || []);
      setLoading(false);
    } catch (err) {
      setError("The mist is too thick. Connection lost.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBase44Data();
  }, []);

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const currentData = activeTab === 'inbox' ? messages : activeTab === 'users' ? users : vouchers;
    return currentData.filter(item => 
      item.name?.toLowerCase().includes(term) || 
      item.email?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term) ||
      item.content?.toLowerCase().includes(term)
    );
  }, [activeTab, messages, users, vouchers, searchTerm]);

  return (
    <div className="min-h-screen bg-[#120F1A] text-slate-300 font-sans p-4 md:p-8 selection:bg-teal-500/30 selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-900/40 to-teal-900/40 border border-purple-500/20 rounded-2xl shadow-inner">
              <Mountain className="text-teal-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-serif italic text-slate-100 tracking-tight">Sanctuary Oversight</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <p className="text-purple-300/50 text-[10px] font-black uppercase tracking-[0.3em]">
                  Encrypted Base44 Node
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/40" size={16} />
              <input 
                type="text"
                placeholder="Search the archives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-purple-950/20 border border-purple-500/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-teal-500/40 focus:bg-purple-900/10 transition-all placeholder:text-purple-300/20"
              />
            </div>
            <button 
              onClick={loadBase44Data}
              className="p-3 bg-purple-950/30 border border-purple-500/10 rounded-2xl hover:bg-teal-500/10 hover:border-teal-500/20 transition-all text-purple-400 hover:text-teal-400 shadow-lg"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-3 mb-8 bg-black/20 p-2 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-sm">
          {[
            { id: 'inbox', label: 'Transmissions', icon: <MessageSquare size={16} /> },
            { id: 'users', label: 'Wayfarers', icon: <Compass size={16} /> },
            { id: 'vouchers', label: 'Invitations', icon: <Tent size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                activeTab === tab.id 
                ? 'bg-gradient-to-r from-purple-600/20 to-teal-600/20 text-teal-300 border border-teal-500/30 shadow-[0_0_30px_rgba(20,184,166,0.1)]' 
                : 'text-slate-500 hover:text-purple-300 hover:bg-white/5'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <main className="bg-gradient-to-b from-purple-950/20 to-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden min-h-[550px] shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          
          {error ? (
            <div className="h-full flex flex-col items-center justify-center py-40 text-center">
              <div className="p-6 bg-red-500/5 rounded-full mb-6">
                <AlertCircle size={48} className="text-red-500/40" />
              </div>
              <h3 className="text-slate-100 font-serif italic text-2xl mb-2">Signal Blocked</h3>
              <p className="text-purple-300/40 text-sm max-w-xs font-medium">{error}</p>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-teal-500/10 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-teal-400 rounded-full animate-spin" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400/40">Consulting the Registry</p>
            </div>
          ) : (
            <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              
              {activeTab === 'inbox' && (
                <div className="space-y-6">
                  <header className="flex justify-between items-end mb-10">
                    <div>
                      <h2 className="text-slate-100 font-serif italic text-3xl">Inbound Whispers</h2>
                      <p className="text-purple-300/30 text-[10px] font-bold uppercase tracking-widest mt-1">Logs stored on Base44</p>
                    </div>
                  </header>
                  
                  {filteredData.length === 0 ? (
                    <div className="py-20 text-center text-slate-600 font-serif italic">The silence is absolute.</div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredData.map(msg => (
                        <div key={msg.id} className="group relative p-8 rounded-[2rem] bg-purple-900/5 border border-white/5 hover:border-teal-500/20 transition-all hover:bg-purple-900/10">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 flex items-center justify-center text-teal-300 font-serif italic text-xl border border-white/5">
                                {msg.name?.[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <span className="text-slate-100 font-bold text-base">{msg.name}</span>
                                  <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Verified</span>
                                </div>
                                <span className="text-xs text-purple-300/40 block mb-4">{msg.email}</span>
                                <p className="text-sm text-slate-400 leading-relaxed font-light max-w-2xl">{msg.content || msg.message}</p>
                              </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-3 rounded-xl bg-red-500/5 text-red-400/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-slate-100 font-serif italic text-3xl mb-10">Wayfarer Registry</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="pb-8 text-[10px] font-black text-purple-300/20 uppercase tracking-[0.2em]">Traveler</th>
                          <th className="pb-8 text-[10px] font-black text-purple-300/20 uppercase tracking-[0.2em] text-center">Spirit</th>
                          <th className="pb-8 text-[10px] font-black text-purple-300/20 uppercase tracking-[0.2em] text-right">Removal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredData.map(u => (
                          <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-8">
                              <p className="text-base font-bold text-slate-100">{u.name}</p>
                              <p className="text-xs text-purple-300/40 mt-1">{u.email}</p>
                            </td>
                            <td className="py-8 text-center text-3xl grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">{u.emoji || '🌲'}</td>
                            <td className="py-8 text-right">
                              <button className="p-3 text-purple-300/10 hover:text-red-400 transition-colors">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        <footer className="mt-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-4 opacity-10">
             <div className="h-[1px] w-12 bg-teal-500" />
             <Tent size={12} className="text-teal-500" />
             <div className="h-[1px] w-12 bg-teal-500" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-purple-300/20">
            Sanctuary Management • Deep Wood Protocol
          </p>
        </footer>
      </div>
    </div>
  );
}