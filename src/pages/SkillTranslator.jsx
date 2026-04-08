import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { 
  ArrowRightLeft, Save, RefreshCw, CheckCircle2, 
  Sparkles, ChevronRight, BookOpen, Search, Flame
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    const result = translateSkill(inputSkill, selectedCategory);
    setTranslation(result);
    setHasSynced(false);
  };

  const handleSyncToEcosystem = async () => {
    if (!translation || !user) return;
    setIsSyncing(true);

    try {
      await base44.entities.RootwerkLog.create({
        user_id: user.id,
        user_email: user.email,
        entry_body: `Skill Translated: [${inputSkill}] mapped to [${selectedCategory}]. Result: ${translation}`,
        sentiment_tag: 'Growth',
        is_private: true,
      });

      queryClient.invalidateQueries(['rootwerkLogs']);
      
      setHasSynced(true);
      setTimeout(() => setHasSynced(false), 3000);
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] text-white p-6 lg:p-12 space-y-12">
      <header className="max-w-4xl space-y-2">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase">The Linguistic Bridge</h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em]">Refining your narrative for the path ahead</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="p-8 bg-white/[0.02] border-white/5 rounded-[2.5rem] space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-teal-400">Raw Experience</label>
            <textarea 
              value={inputSkill}
              onChange={(e) => setInputSkill(e.target.value)}
              placeholder="Describe a task or responsibility in your own words..."
              className="w-full bg-[#1A1423] border border-white/10 rounded-2xl p-6 text-sm focus:outline-none focus:border-teal-500 transition-all min-h-[150px]"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-teal-400">Target Domain</label>
            <div className="grid grid-cols-2 gap-2">
              {['Customer Service', 'Project Planning', 'Budgeting', 'Operations'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-3 px-4 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                    selectedCategory === cat 
                    ? 'bg-teal-500/10 border-teal-500 text-teal-400' 
                    : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleTranslate}
            className="w-full py-8 bg-[#FF6B35] hover:bg-[#ff7b4d] rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-950/20"
          >
            Refine Experience <Sparkles className="ml-2 w-4 h-4" />
          </Button>
        </Card>

        <Card className="p-8 bg-[#251D2F] border-white/10 rounded-[2.5rem] min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-orange-400">The Forge</h2>
            <div className="flex items-center gap-2">
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase text-slate-500">Active Refinement</span>
            </div>
          </div>

          {!translation ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-6 h-6 text-slate-700" />
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-[200px]">
                Place your experience in the forge to begin the transformation.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="p-8 bg-[#1A1423] border border-orange-500/20 rounded-[2rem] relative">
                <p className="text-lg font-medium leading-relaxed italic text-orange-50">
                  "{translation}"
                </p>
                <div className="absolute -top-3 left-8 px-3 py-1 bg-orange-500 rounded-full text-[9px] font-black uppercase">
                  Forged Insight
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button 
                  onClick={handleSyncToEcosystem}
                  disabled={isSyncing || hasSynced}
                  className={`py-7 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                    hasSynced 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {isSyncing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : hasSynced ? (
                    <><CheckCircle2 className="mr-2 w-4 h-4" /> Synced to Ecosystem</>
                  ) : (
                    <><Save className="mr-2 w-4 h-4" /> Sync to Ecosystem</>
                  )}
                </Button>
                
                <p className="text-[9px] text-center text-slate-500 uppercase font-bold tracking-tighter">
                  This refined insight has been added to your Hearth Logbook
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}