import React, { useState } from 'react';

const AdminDashboard = () => {
  // Mock data for the ForestAdmin/Hearthkeeper view
  const [users, setUsers] = useState([
    { id: 1, email: 'seeker@example.com', standing: 'Seeker', joined: '2026-03-15' },
    { id: 2, email: 'migration_expert@hhorizon.com', standing: 'Steward', joined: '2026-04-02' },
  ]);

  return (
    <div className="min-h-screen bg-grey-950 p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-3xl font-serif italic text-teal-400">Forest Admin</h1>
        <p className="text-grey-500 uppercase tracking-widest text-xs mt-2">Hearthkeeper Dashboard</p>
      </header>

      <div className="grid gap-6">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="p-6 rounded-2xl border border-dark-purple-900 bg-grey-900/40 backdrop-blur-sm flex justify-between items-center"
          >
            <div>
              <p className="text-grey-400 text-sm mb-1">User Identifier</p>
              <h3 className="text-teal-100 font-bold">{user.email}</h3>
              <p className="text-grey-500 text-xs mt-2">Joined: {user.joined}</p>
            </div>

            <div className="text-right">
              <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                user.standing === 'Steward' 
                ? 'bg-teal-900/30 text-teal-400 border border-teal-500/50' 
                : 'bg-dark-purple-900/30 text-dark-purple-300 border border-dark-purple-500/50'
              }`}>
                {user.standing}
              </span>
              
              <div className="mt-4 space-x-4">
                <button className="text-teal-500 text-xs hover:underline uppercase tracking-widest">
                  Promote
                </button>
                <button className="text-grey-500 text-xs hover:underline uppercase tracking-widest">
                  Audit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;