import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function DeleteAccountDialog() {
  const [step, setStep] = useState('idle'); // idle | confirm | deleting | done

  const handleDelete = async () => {
    setStep('deleting');
    try {
      // Delete all user-owned entity records
      const [profiles, checkIns, logs, gaps] = await Promise.allSettled([
        base44.entities.UserProfile.list(),
        base44.entities.DailyCheckIn.list(),
        base44.entities.RootwerkLog.list(),
        base44.entities.GapAnalysis.list(),
      ]);

      const deleteAll = async (result, entity) => {
        if (result.status === 'fulfilled') {
          await Promise.allSettled(result.value.map(r => base44.entities[entity].delete(r.id)));
        }
      };

      await Promise.allSettled([
        deleteAll(profiles, 'UserProfile'),
        deleteAll(checkIns, 'DailyCheckIn'),
        deleteAll(logs, 'RootwerkLog'),
        deleteAll(gaps, 'GapAnalysis'),
      ]);

      localStorage.clear();
      setStep('done');
      setTimeout(() => base44.auth.logout('/grove'), 2000);
    } catch {
      setStep('confirm'); // fall back
    }
  };

  if (step === 'done') {
    return (
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center space-y-2">
        <p className="text-sm font-serif italic text-zinc-400">Your data has been cleared. Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {step === 'idle' && (
        <button
          onClick={() => setStep('confirm')}
          className="flex items-center gap-3 px-5 py-4 min-h-[48px] w-full rounded-2xl bg-rose-500/5 border border-rose-500/15 text-rose-400 text-xs font-black uppercase tracking-widest hover:bg-rose-500/10 active:bg-rose-500/15 transition-all"
        >
          <Trash2 size={14} />
          Delete My Account & Data
        </button>
      )}

      {step === 'confirm' && (
        <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-black text-rose-300 uppercase tracking-widest">Are you sure?</p>
              <p className="text-xs font-serif italic text-zinc-500 leading-relaxed">
                This will permanently delete all your Hearth data — profile, journal entries, check-ins, and gap analyses. This cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('idle')}
              className="flex-1 py-3 min-h-[44px] rounded-xl bg-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest hover:bg-zinc-700 active:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3 min-h-[44px] rounded-xl bg-rose-500 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-400 active:bg-rose-400 transition-all"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      )}

      {step === 'deleting' && (
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500 animate-pulse">Clearing your data…</p>
        </div>
      )}
    </div>
  );
}