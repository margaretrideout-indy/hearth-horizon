import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Trash2, 
  Check, 
  RefreshCw, 
  Shield, 
  Target,
  ArrowRight,
  Smile,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

export default function YourHearth({ vault, onRefresh }) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // --- HANDLERS ---
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await base44.entities.Vault.update(vault.id, {
        resume: {
          name: file.name,
          uploaded_at: new Date().toISOString()
        }
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      await base44.entities.Vault.update(vault.id, { resume: null });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleWipeAccount = async () => {
    try {
      // Wipes the Vault and User entities from the server
      await base44.entities.Vault.delete(vault.id);
      // Logic for logging out/deleting user would go here
      window.location.href = "/"; 
    } catch (err) {
      console.error("Wipe failed:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-8 bg-[#08070B] min-h-screen selection:bg-purple-500/30">
      
      {/* HEADER */}
      <header className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-purple-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Your Hearth</span>
        </div>
        <h1 className="text-6xl font-serif italic text-white mb-6">Personal Synthesis</h1>
      </header>

      <div className="grid gap-12">
        
        {/* 1. EMOJI CHECK-IN SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Smile size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Daily Frequency</h3>
          </div>
          <div className="flex gap-4">
            {['🌑', '🌒', '🌓', '🌔', '🌕'].map((emoji, i) => (
              <button key={i} className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl hover:border-purple-500/40 hover:bg-white/10 transition-all">
                {emoji}
              </button>
            ))}
          </div>
        </section>

        {/* 2. REFLECTION SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Current Reflection</h3>
          </div>
          <textarea 
            placeholder="How is the migration feeling today?"
            className="w-full h-32 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-zinc-300 focus:border-purple-500/30 outline-none transition-all placeholder:text-zinc-700"
          />
        </section>

        {/* 3. RESUME SECTION (With Delete/Replace) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Old World Artifacts</h3>
          </div>
          
          <div className="group relative p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <FileText className="text-purple-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-serif italic text-xl">Professional Resume</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                    {vault?.resume ? (
                      <span className="text-teal-400 flex items-center gap-1 font-bold">
                        <Check size={12} /> {vault.resume.name}
                      </span>
                    ) : 'No file synced to the Vault'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {vault?.resume ? (
                  <>
                    <button 
                      onClick={() => document.getElementById('resume-input').click()}
                      className="p-3 bg-white/5 rounded-xl text-zinc-500 hover:text-teal-400 hover:bg-white/10 transition-all"
                    >
                      <RefreshCw size={18} className={isUploading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                      onClick={handleDeleteResume}
                      className="p-3 bg-red-500/5 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                ) : (
                  <Button 
                    onClick={() => document.getElementById('resume-input').click()}
                    className="bg-white/5 text-zinc-400 hover:bg-purple-600 hover:text-white rounded-2xl border border-white/10 px-8"
                  >
                    {isUploading ? <RefreshCw className="animate-spin" size={16} /> : 'Sync Resume'}
                  </Button>
                )}
              </div>
            </div>
            <input id="resume-input" type="file" className="hidden" onChange={handleUpload} />
          </div>
        </section>

        {/* 4. IDENTITY ALIGNMENT CARD */}
        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] mt-4">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Shield className="text-teal-400" size={20} />
                <h3 className="text-2xl font-serif italic text-white">Identity Alignment</h3>
              </div>
              <p className="text-zinc-500 text-sm">Calibration status for the Horizon Board.</p>
            </div>
            <Button 
              onClick={() => navigate("/cultural-fit")}
              className="bg-teal-500 text-black hover:bg-teal-400 font-black uppercase tracking-widest px-8 rounded-2xl h-14"
            >
              {vault?.alignment_complete ? 'Re-calibrate' : 'Start'} <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        {/* 5. DANGER ZONE (Delete Account) */}
        <section className="mt-20 pt-10 border-t border-white/5">
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <AlertTriangle size={12} /> Purge Identity & Vault
            </button>
          ) : (
            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] flex flex-col items-center gap-4">
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                This action is irreversible. All data will be wiped from the server.
              </p>
              <div className="flex gap-4">
                <Button onClick={handleWipeAccount} className="bg-red-500 text-white hover:bg-red-600 px-8 rounded-xl">Confirm Purge</Button>
                <Button onClick={() => setShowDeleteConfirm(false)} className="bg-white/5 text-zinc-400 hover:bg-white/10 px-8 rounded-xl">Cancel</Button>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}