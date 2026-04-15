import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ShieldCheck, MessageSquare, Users, UserPlus, CheckCircle, Trash2, ExternalLink, ArrowLeft } from 'lucide-react';

const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('inbox');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth error:", err);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const messagesQuery = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const usersQuery = collection(db, 'artifacts', appId, 'public', 'data', 'users');
    const vouchersQuery = collection(db, 'artifacts', appId, 'public', 'data', 'vouchers');

    const unsubMessages = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error(err));

    const unsubUsers = onSnapshot(usersQuery, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error(err));

    const unsubVouchers = onSnapshot(vouchersQuery, (snapshot) => {
      setVouchers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error(err));

    return () => {
      unsubMessages();
      unsubUsers();
      unsubVouchers();
    };
  }, [user]);

  const toggleVoucherStatus = async (id, currentStatus) => {
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'vouchers', id);
    await updateDoc(docRef, { status: currentStatus === 'pending' ? 'approved' : 'pending' });
  };

  const deleteEntry = async (collectionName, id) => {
    const docRef = doc(db, 'artifacts', appId, 'public', 'data', collectionName, id);
    await deleteDoc(docRef);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A080D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A080D] text-slate-300 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-serif italic text-white flex items-center gap-3">
              <ShieldCheck className="text-teal-400" /> Sanctuary Oversight
            </h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Founder's Command Center
            </p>
          </div>
          <button 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 border border-zinc-800 rounded-full hover:bg-white/5 hover:border-zinc-600 transition-all"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> 
            Return to Hearth
          </button>
        </header>

        <nav className="flex flex-wrap gap-2 mb-8 bg-black/20 p-1.5 rounded-2xl border border-white/5">
          {[
            { id: 'inbox', label: 'Inbox', icon: <MessageSquare size={14} /> },
            { id: 'users', label: 'Wayfarers', icon: <Users size={14} /> },
            { id: 'vouchers', label: 'Requests', icon: <UserPlus size={14} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <main className="bg-[#110E16]/60 backdrop-blur-xl border border-zinc-800/50 rounded-[2rem] overflow-hidden min-h-[400px]">
          {activeTab === 'inbox' && (
            <div className="p-6 md:p-8">
              <h2 className="text-white font-serif italic text-xl mb-6">Recent Inquiries</h2>
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <p className="text-zinc-600 italic text-sm py-12 text-center">No messages received yet.</p>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="group relative p-5 rounded-2xl bg-black/20 border border-white/5 hover:border-teal-500/30 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-teal-400 font-bold text-xs block">{msg.name}</span>
                          <span className="text-xs text-zinc-500">{msg.email}</span>
                        </div>
                        <button 
                          onClick={() => deleteEntry('messages', msg.id)}
                          className="text-zinc-700 hover:text-red-400 p-2 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6 md:p-8">
              <h2 className="text-white font-serif italic text-xl mb-6">Wayfarer Progress</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Name</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Resume</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Check-in</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Reflection</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.length === 0 ? (
                      <tr><td colSpan="5" className="py-12 text-center text-zinc-600 italic text-sm">No user data available.</td></tr>
                    ) : (
                      users.map(u => (
                        <tr key={u.id} className="group hover:bg-white/[0.02]">
                          <td className="py-4 pr-4">
                            <p className="text-sm font-bold text-white">{u.name || 'Anonymous'}</p>
                            <p className="text-[10px] text-zinc-600">{u.email}</p>
                          </td>
                          <td className="py-4 pr-4">
                            {u.resumeUrl ? (
                              <a href={u.resumeUrl} target="_blank" rel="noreferrer" className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-xs">
                                View <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="text-zinc-700 text-xs italic">Missing</span>
                            )}
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-xl">{u.emoji || '—'}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <p className="text-xs text-zinc-400 line-clamp-1 max-w-[200px]">{u.reflection || 'None'}</p>
                          </td>
                          <td className="py-4 text-right">
                            <button onClick={() => deleteEntry('users', u.id)} className="text-zinc-700 hover:text-red-400 p-2 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'vouchers' && (
            <div className="p-6 md:p-8">
              <h2 className="text-white font-serif italic text-xl mb-6">Scholarship Waitlist</h2>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Applicant</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Reason</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Status</th>
                      <th className="pb-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {vouchers.length === 0 ? (
                      <tr><td colSpan="4" className="py-12 text-center text-zinc-600 italic text-sm">No seat requests pending.</td></tr>
                    ) : (
                      vouchers.map(v => (
                        <tr key={v.id} className="group hover:bg-white/[0.02]">
                          <td className="py-4 pr-4">
                            <p className="text-sm font-bold text-white">{v.name}</p>
                            <p className="text-[10px] text-zinc-600">{v.email}</p>
                          </td>
                          <td className="py-4 pr-4">
                            <p className="text-xs text-zinc-400 italic max-w-xs">{v.reason}</p>
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              v.status === 'approved' ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {v.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-4 text-right flex justify-end gap-2">
                            <button 
                              onClick={() => toggleVoucherStatus(v.id, v.status)}
                              className={`p-2 rounded-lg transition-colors ${v.status === 'approved' ? 'text-zinc-600 hover:text-amber-500' : 'text-zinc-600 hover:text-teal-400'}`}
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => deleteEntry('vouchers', v.id)} className="text-zinc-700 hover:text-red-400 p-2 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}