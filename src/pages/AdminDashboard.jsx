import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Settings, 
  Users, 
  Search, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  Mail, 
  Calendar,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState({ type: null, message: '' });

  const [config, setConfig] = useState({
    projectId: 'b44-proj-88219',
    apiKey: '',
    collection: 'contact_entries'
  });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const mockData = [
        { id: '1', name: 'Sarah Chen', email: 'sarah@tech.co', message: 'Interested in enterprise pricing for our team.', date: '2023-10-24T14:22:00Z', status: 'new' },
        { id: '2', name: 'Marcus Miller', email: 'm.miller@gmail.com', message: 'Do you offer custom integrations for Base44 backends?', date: '2023-10-23T09:15:00Z', status: 'replied' },
        { id: '3', name: 'Elena Rodriguez', email: 'elena@startup.io', message: 'Bug report regarding the API response headers.', date: '2023-10-22T18:45:00Z', status: 'urgent' },
      ];
      setMessages(mockData);
      showStatus('success', 'Data synced');
    } catch (err) {
      showStatus('error', 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [config.projectId]);

  const showStatus = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: null, message: '' }), 3000);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">B4</div>
          <span className="font-bold text-lg tracking-tight">Base44 Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')} 
          />
          <SidebarItem 
            icon={<MessageSquare size={20} />} 
            label="Inbound Messages" 
            active={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')} 
            badge={messages.length}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Customers" 
            active={activeTab === 'customers'} 
            onClick={() => setActiveTab('customers')} 
          />
          <div className="pt-4 mt-4 border-t border-slate-800">
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="B44 Settings" 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')} 
            />
          </div>
        </nav>

        <div className="p-4 bg-slate-800/50 m-4 rounded-xl">
          <p className="text-xs text-slate-400 mb-1 font-medium">PROJECT STATUS</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Active Node</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
            {status.message && (
              <span className={`ml-4 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {status.type === 'success' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                {status.message}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchMessages}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-800">Admin User</p>
                <p className="text-[10px] text-slate-400">ID: {config.projectId}</p>
              </div>
              <div className="w-9 h-9 bg-slate-200 rounded-full overflow-hidden border border-white shadow-sm" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Submissions" value={messages.length} color="blue" />
                <StatCard label="Recent (24h)" value="12" color="indigo" />
                <StatCard label="Pending Response" value="4" color="amber" />
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors">
                    <Filter size={16} /> Filter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-colors">
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Sender</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Message Preview</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMessages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{msg.name}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-1"><Mail size={12}/> {msg.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-sm text-slate-600 truncate">{msg.message}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Calendar size={12} /> {new Date(msg.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                            msg.status === 'urgent' ? 'bg-rose-100 text-rose-600' :
                            msg.status === 'replied' ? 'bg-emerald-100 text-emerald-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {msg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <ExternalLink size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Settings className="text-blue-500" /> Infrastructure Config
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project ID</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={config.projectId}
                      onChange={(e) => setConfig({...config, projectId: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">API Secret Key</label>
                    <input 
                      type="password" 
                      placeholder="sk_b44_••••••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={config.apiKey}
                      onChange={(e) => setConfig({...config, apiKey: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Target Collection</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-500/20"
                      value={config.collection}
                      onChange={(e) => setConfig({...config, collection: e.target.value})}
                    />
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => showStatus('success', 'Configuration updated')}
                      className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                    >
                      Save & Test Connectivity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </div>
    {badge && (
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${active ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-300'}`}>
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ label, value, color }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
  };
  return (
    <div className={`p-6 rounded-2xl border ${colors[color]} shadow-sm`}>
      <p className="text-sm font-semibold opacity-80 uppercase tracking-wider">{label}</p>
      <p className="text-4xl font-black mt-1">{value}</p>
    </div>
  );
};

export default AdminDashboard;