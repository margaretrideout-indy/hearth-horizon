import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Check, 
  RefreshCw, 
  Zap, 
  Shield, 
  Target,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function YourHearth({ vault, onRefresh }) {
  const [isUploading, setIsUploading] = useState(null); // track which file is uploading

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(type);
    try {
      // Logic for Base44 file upload usually involves converting to a URL or Blob
      // For this example, we update the vault entity directly
      await base44.entities.Vault.update(vault.id, {
        [type]: {
          name: file.name,
          url: URL.createObjectURL(file), // Placeholder for actual upload URL
          uploaded_at: new Date().toISOString()
        }
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(null);
    }
  };

  const handleDelete = async (type) => {
    try {
      await base44.entities.Vault.update(vault.id, {
        [type]: null
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const FileSection = ({ title, icon: Icon, type }) => {
    const fileData = vault?.[type];
    const isLoading = isUploading === type;

    return (
      <div className="group relative p-8 bg-[#0D0B14] border border-white/5 rounded-[2.5rem] hover:border-purple-500/30 transition-all">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
              <Icon className="text-purple-400" size={24} />
            </div>
            <div>
              <h4 className="text-white font-serif italic text-xl">{title}</h4>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                {fileData ? (
                  <span className="text-teal-400 flex items-center gap-1 font-bold">
                    <Check size={12} /> {fileData.name}
                  </span>
                ) : (
                  'No file synced to the Vault'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {fileData ? (
              <>
                {/* Replace Button */}
                <button 
                  onClick={() => document.getElementById(`${type}-input`).click()}
                  className="p-3 bg-white/5 rounded-xl text-zinc-500 hover:text-teal-400 hover:bg-white/10 transition-all"
                  title="Replace File"
                >
                  <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                </button>
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(type)}
                  className="p-3 bg-red-500/5 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  title="Delete File"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <Button 
                onClick={() => document.getElementById(`${type}-input`).click()}
                disabled={isLoading}
                className="bg-white/5 text-zinc-400 hover:bg-purple-600 hover:text-white rounded-2xl border border-white/10 px-6"
              >
                {isLoading ? <RefreshCw className="animate-spin" size={16} /> : 'Upload'}
              </Button>
            )}
          </div>
        </div>

        {/* Hidden File Input */}
        <input 
          id={`${type}-input`}
          type="file" 
          className="hidden" 
          onChange={(e) => handleUpload(e, type)} 
        />
        
        {/* Subtle Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-16 px-8 bg-[#08070B] min-h-screen">
      <header className="mb-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-purple-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Your Hearth</span>
        </div>
        <h1 className="text-6xl font-serif italic text-white mb-6">Personal Synthesis</h1>
        <p className="text-zinc-500 text-lg font-light max-w-xl leading-relaxed">
          The Vault stores your old-world artifacts and translates them into your new legacy.
        </p>
      </header>

      <div className="grid gap-8">
        <FileSection title="Professional Resume" icon={FileText} type="resume" />
        <FileSection title="Supporting Artifacts" icon={Zap} type="artifacts" />
        
        {/* Cultural Fit / Lexicon Status Card */}
        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] mt-8">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-teal-400" size={20} />
                <h3 className="text-2xl font-serif italic text-white">Identity Alignment</h3>
              </div>
              <p className="text-zinc-500 text-sm max-w-md">
                {vault?.alignment_complete 
                  ? "Your lexicon and ethics are synced to the Horizon Board." 
                  : "Your professional frequency has not been calibrated yet."}
              </p>
              
              {vault?.lexicon && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {vault.lexicon.slice(0, 3).map((word, i) => (
                    <span key={i} className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] rounded-full uppercase font-bold tracking-tighter">
                      {word}
                    </span>
                  ))}
                  {vault.lexicon.length > 3 && <span className="text-zinc-600 text-[10px] flex items-center">+{vault.lexicon.length - 3} more</span>}
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              className="border-white/10 text-white hover:bg-teal-500 hover:text-black rounded-2xl px-8 h-14"
              onClick={() => window.location.href = "/cultural-fit"}
            >
              {vault?.alignment_complete ? 'Re-calibrate' : 'Start Alignment'} <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}