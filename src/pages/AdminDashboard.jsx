import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ShieldCheck, MessageSquare, Users, UserPlus, CheckCircle, Trash2, ExternalLink } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0A080D] text-slate-300 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif italic text-white flex items-center gap-3">
              <ShieldCheck className="text-teal-400" /> Sanctuary Oversight
            </h1>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
              Founder's Command Center
            </p>
          </div>
        </header>

        <div className="flex gap-4 mb-8 bg-black/20 p-1 rounded-2xl border border-white/5 max-w-md">
          {['inbox', 'users', 'vouchers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <main className="bg-[#110E16]/60 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] p-8 min-h-[500px]">
          {activeTab === 'inbox' && (
            <div>
              <h2 className="text-white font-serif italic text-2xl mb-8 flex items-center gap-2">
                <MessageSquare size={20} className="text-teal-400" /> Recent Inquiries
              </h2>
              <div className="grid gap-4">
                {messages.map(msg => (
                  <div key={msg.id} className="p-6 rounded-3xl bg-black/20 border border-white/5 relative group">
                    <div className="flex justify-between mb-4">
                      <div>
                        <h3 className="text-white font-bold">{msg.name}</h3>
                        <p className="text-xs text-zinc-500">{msg.email}</p>
                      </div>
                      <button onClick={() => deleteEntry('messages', msg.id)} className="text-zinc-700 hover:text-red-400 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{msg.message || msg.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-white font-serif italic text-2xl mb-8 flex items-center gap-2">
                <Users size={20} className="text-teal-400" /> Wayfarer Progress
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Resume</th>
                    <th className="pb-4 text-center">Check-in</th>
                    <th className="pb-4">Reflection</th>
                    <th className="pb-4 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(u => (
                    <tr key={u.id} className="group">
                      <td className="py-6">
                        <p className="text-white font-bold">{u.name || 'Anonymous'}</p>
                        <p className="text-[10px] text-zinc-600">{u.email}</p>
                      </td>
                      <td className="py-6">
                        {u.resumeUrl ? (
                          <a href={u.resumeUrl} target="_blank" rel="noreferrer" className="text-teal-400 hover:text-teal-300 flex items-center gap-1 text-xs">
                            View <ExternalLink size={12} />
                          </a>
                        ) : <span className="text-zinc-800 text-xs">Missing</span>}
                      </td>
                      <td className="py-6 text-center text-xl">{u.emoji || '—'}</td>
                      <td className="py-6 text-zinc-400 text-xs italic">{u.reflection || 'No reflection yet'}</td>
                      <td className="py-6 text-right">
                        <button onClick={() => deleteEntry('users', u.id)} className="text-zinc-800 hover:text-red-400">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'vouchers' && (
            <div>
              <h2 className="text-white font-serif italic text-2xl mb-8 flex items-center gap-2">
                <UserPlus size={20} className="text-teal-400" /> Scholarship Requests
              </h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-zinc-600 uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4">Applicant</th>
                    <th className="pb-4">Reason</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Approve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vouchers.map(v => (
                    <tr key={v.id}>
                      <td className="py-6">
                        <p className="text-white font-bold">{v.name}</p>
                        <p className="text-[10px] text-zinc-600">{v.email}</p>
                      </td>
                      <td className="py-6 text-zinc-400 text-xs italic max-w-xs">{v.reason}</td>
                      <td className="py-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${v.status === 'approved' ? 'text-teal-400 bg-teal-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                          {v.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button onClick={() => toggleVoucherStatus(v.id, v.status)} className="text-zinc-700 hover:text-teal-400">
                          <CheckCircle size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}