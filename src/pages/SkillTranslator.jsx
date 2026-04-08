import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { 
  ArrowRightLeft, Save, RefreshCw, CheckCircle2, 
  Sparkles, Search, Flame, Zap, Database, Info
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const translateSkill = (skill, category) => {
  const dictionary = {
    'Customer Service': 'Optimized client-facing engagement protocols and conflict resolution.',
    'Project Planning': 'Strategic lifecycle management and cross-functional resource allocation.',
    'Budgeting': 'Fiscal oversight, overhead optimization, and financial reporting.',
    'Operations': 'Streamlined organizational workflows and cross-departmental coordination.',
  };
  return dictionary[category] || `${skill} analyzed through a professional lens.`;
};

export default function SkillTranslator() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [inputSkill, setInputSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Customer Service');
  const [translation, setTranslation] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const handleTranslate = () => {
    if (!inputSkill) return;
    setTranslation(translateSkill(inputSkill, selectedCategory));
    setHasSynced(false);
  };

  const handleSyncToEcosystem = async () => {
    if (!translation || !user) return;
    setIsSyncing(true);
    try {
      await base44.entities.RootwerkLog.create({
        user_id: user.id,
        user_email: user.email,
        entry_body: `Forge Result: [${selectedCategory}] -> ${translation}`,
        sentiment_tag: 'Growth',
        is_private: true,
      });
      queryClient.invalidateQueries(['rootwerkLogs']);
      setHasSynced(true);
      setTimeout(() => setHasSynced(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] text-white p-6 lg:p-12 max-w-7xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <ArrowRightLeft className="w-5 h-5 text-teal-400" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">The Linguistic Bridge</h1>
        </div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] ml-1">Refining your narrative for the path ahead</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        {/* INPUT: THE SOURCE */}
        <Card className="p-10 bg-white/[0.02] border-white/5 rounded-[3rem] flex flex-col justify-between space-y-8 relative overflow-hidden group">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-400/80">Raw Experience</label>
              <Zap className="w-4 h-4 text-slate-800" />
            </div>
            <textarea 
              value={inputSkill}
              onChange={(e) => setInputSkill(e.target.value)}
              placeholder="Describe a task or responsibility in your own words..."
              className="w-full bg-[#251D2F]/50 border border-white/10 rounded-[2rem] p-8 text-base font-medium focus:outline-none focus:border-teal-500/50 transition-all min-h-[180px] placeholder:text-slate-700 leading-relaxed"
            />
          </div>

          <div className="space-y-6 relative z-10">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-400/80">Target Domain</label>
            <div className="grid grid-cols-2 gap-3">
              {['Customer Service', 'Project Planning', 'Budgeting', 'Operations'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                    selectedCategory === cat 
                    ? 'bg-teal-500/20 border-teal-500 text-teal-400' 
                    : 'bg-white/5 border-transparent text-slate-500 hover:bg-white/10 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleTranslate}
            className="w-full py-10 bg-teal-600 hover:bg-teal-500 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-teal-950/40 border-b-4 border-teal-800 active:translate-y-1 active:border-b-0 transition-all text-white"
          >
            Refine Experience <Sparkles className="ml-3 w-5 h-5" />
          </Button>
        </Card>

        {/* OUTPUT: THE FORGE */}
        <Card className={`p-10 rounded-[3rem] flex flex-col transition-all duration-1000 relative overflow-hidden ${
          translation ? 'bg-[#251D2F] border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.05)]' : 'bg-white/[0.01] border-white/5'
        }`}>
          <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${translation ? 'bg-orange-500/20' : 'bg-white/5'}`}>
                <Flame className={`w-4 h-4 ${translation ? 'text-orange-500 animate-pulse' : 'text-slate-700'}`} />
              </div>
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">The Forge</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black uppercase tracking-widest ${translation ? 'text-teal-400' : 'text-slate-700'}`}>
                {translation ? 'Refinement Ready' : 'Awaiting Input'}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!translation ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-24 h-24 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-800" />
                </div>
                <p className="text-sm text-slate-600 font-bold uppercase tracking-widest leading-loose max-w-[280px]">
                  Place your experience in the forge to begin the transformation.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col space-y-10"
              >
                <div className="p-10 bg-black/40 border-l-4 border-teal-500 rounded-r-[2rem] rounded-l-md relative shadow-2xl">
                  <p className="text-2xl font-black italic leading-tight text-white/90 tracking-tight">
                    "{translation}"
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleSyncToEcosystem}
                    disabled={isSyncing || hasSynced}
                    className={`w-full py-10 rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 ${
                      hasSynced 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-[#3D2B4A] hover:bg-[#4D3B5A] text-white border border-white/5 shadow-xl'
                    }`}
                  >
                    {isSyncing ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : hasSynced ? (
                      <><CheckCircle2 className="w-5 h-5 text-white" /> Ecosystem Updated</>
                    ) : (
                      <><Database className="w-5 h-5 text-teal-400" /> Sync to Ecosystem</>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 py-4 bg-white/5 rounded-2xl border border-white/5">
                    <Info className="w-3 h-3 text-slate-600" />
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">
                      This insight will be logged in your hearth history
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}