import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Trash2, 
  Check, 
  RefreshCw, 
  Shield, 
  ArrowRight,
  Smile,
  MessageSquare,
  AlertTriangle,
  Cloud,
  Zap,
  Wind,
  Sun,
  Sunrise
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';

const MOOD_STATES = [
  { label: 'Inspired', emoji: '✨', color: 'text-teal-400', bg: 'hover:bg-teal-500/10' },
  { label: 'Resilient', emoji: '🌿', color: 'text-purple-400', bg: 'hover:bg-purple-500/10' },
  { label: 'Cloudy', emoji: '☁️', color: 'text-zinc-400', bg: 'hover:bg-zinc-500/10' },
  { label: 'Electric', emoji: '⚡', color: 'text-yellow-400', bg: 'hover:bg-yellow-500/10' },
  { label: 'Grounded', emoji: '🏔️', color: 'text-emerald-400', bg: 'hover:bg-emerald-500/10' }
];

export default function YourHearth({ vault, onRefresh }) {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMood, setSelectedMood] = useState(vault?.current_mood || null);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    try {
      await base44.entities.Vault.update(vault.id, { current_mood: mood });
    } catch (err) { console.error(err); }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await base44.entities.Vault.update(vault.id, {
        resume: { name: file.name, uploaded_at: new Date().toISOString() }
      });
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); } finally { setIsUploading(false); }
  };

  const handleDeleteResume = async () => {
    try {
      await base44.entities.Vault.update(vault.id, { resume: null });
      if (onRefresh) onRefresh();
    } catch (err) { console.error(err); }
  };

  const handleWipeAccount = async () => {
    try {
      await base44.entities.Vault.delete(vault.id);
      window.location.href = "/"; 
    } catch (err) { console.error(err); }
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-8 bg-[#08070B] min-h-screen selection:bg-purple-500/30">
      
      <header className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-purple-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Vault Interior</span>
        </div>
        <h1 className="text-6xl font-serif italic text-white mb-6 leading-tight">Personal Synthesis</h1>
      </header>

      <div className="grid gap-16">
        
        {/* 1. ATMOSPHERIC CHECK-IN */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <Sunrise size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Atmospheric State</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {MOOD_STATES.map((state) => (
              <button 
                key={state.label}
                onClick={() => handleMoodSelect(state.label)}
                className={`flex flex-col items-center justify-center w-24 h-28 rounded-3xl border transition-all duration-500 ${
                  selectedMood === state.label 
                  ? `bg-white/10 border-purple-500/50 scale-105 shadow-xl` 
                  : `bg-white/[0.02] border-white/5 ${state.bg} grayscale hover:grayscale-0`
                }`}
              >
                <span className="text-3xl mb-2">{state.emoji}</span>
                <span className={`text-[9px] font-black uppercase tracking-widest ${state.color}`}>{state.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. REFLECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <MessageSquare size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Current Reflection</h3>
          </div>
          <textarea 
            placeholder="How is the migration feeling today?"
            className="w-full h-40 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 text-zinc-300 focus:border-purple-500/30 outline-none transition-all placeholder:text-zinc-800 text-lg font-light italic"
          />
        </section>

        {/* 3. RESUME SECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-zinc-600" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Old World Artifacts</h3>
          </div>
          
          <div className="group relative p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <FileText className="text-purple-400" size={28} />
                </div>
                <div>
                  <h4 className="text-white font-serif italic text-2xl">Professional Resume</h4>
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
                    <button onClick={() => document.getElementById('resume-input').click()} className="p-4 bg-white/5 rounded-2xl text-zinc-500 hover:text-teal-400 hover:bg-white/10 transition-all">
                      <RefreshCw size={20} className={isUploading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={handleDeleteResume} className="p-4 bg-red-500/5 rounded-2xl text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={20} />
                    </button>
                  </>
                ) : (
                  <Button onClick={() => document.getElementById('resume-input').click()} className="bg-white/5 text-zinc-400 hover:bg-purple-600 hover:text-white rounded-2xl border border-white/10 px-10 h-14">
                    {isUploading ? <RefreshCw className="animate-spin" size={18} /> : 'Sync Resume'}
                  </Button>
                )}
              </div>
            </div>
            <input id="resume-input" type="file" className="hidden" onChange={handleUpload} />
          </div>
        </section>

        {/* 4. ALIGNMENT CARD */}
        <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] mt-4 relative overflow-hidden group">
          <div className="flex justify-between items-center relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="text-teal-400" size={24} />
                <h3 className="text-3xl font-serif italic text-white leading-tight">Identity Alignment</h3>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">Translate your artifacts into a professional legacy for the Horizon Board.</p>
            </div>
            <Button 
              onClick={() => navigate("/cultural-fit")}
              className="bg-teal-500 text-black hover:bg-teal-400 font-black uppercase tracking-widest px-10 rounded-2xl h-16 shadow-lg shadow-teal-500/20"
            >
              {vault?.alignment_complete ? 'Re-calibrate' : 'Begin Synthesis'} <ArrowRight className="ml-3" size={20} />
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[100px] rounded-full group-hover:bg-teal-500/10 transition-all" />
        </div>

        {/* 5. PURGE SECTION */}
        <section className="mt-32 pt-12 border-t border-white/5">
          {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-800 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <AlertTriangle size={14} /> Purge Identity & Vault
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/5 border border-red-500/20 p-10 rounded-[3rem] text-center space-y-6">
              <p className="text-red-400 text-xs font-black uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
                Warning: This will permanently wipe all artifacts, lexicons, and profile data from the server.
              </p>
              <div className="flex justify-center gap-6">
                <Button onClick={handleWipeAccount} className="bg-red-500 text-white hover:bg-red-600 px-10 rounded-2xl h-12 shadow-lg shadow-red-500/20 font-bold uppercase tracking-widest text-[10px]">Confirm Purge</Button>
                <Button onClick={() => setShowDeleteConfirm(false)} className="bg-white/5 text-zinc-400 hover:bg-white/10 px-10 rounded-2xl h-12 font-bold uppercase tracking-widest text-[10px]">Cancel</Button>
              </div>
            </motion.div>
          )}
        </section>

      </div>
    </div>
  );
}