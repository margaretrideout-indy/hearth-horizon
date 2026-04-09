import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowRightLeft, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinguisticBridge() {
  const [translation, setTranslation] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list() 
  });
  const profile = profiles?.[0];

  const handleTranslate = async () => {
    if (!profile?.resume_url) return;
    setIsTranslating(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Using the user's legacy document (URL: ${profile.resume_url}), translate their academic and teaching experience into high-impact corporate and technology language. Focus on outcome-oriented verbs, stakeholder management, data-driven results, and scalability. Return the response as a clean, formatted list of bullet points.`,
      });
      setTranslation(result);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] text-slate-200 p-6 md:p-12 pb-32">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 text-teal-500 mb-2">
          <ArrowRightLeft className="w-4 h-4 shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Translation Layer</span>
        </div>
        <h1 className="text-4xl font-serif font-bold italic text-white">The Bridge</h1>
        <p className="text-slate-500 text-sm mt-3 italic font-light max-w-xl leading-relaxed">
          Recoding your legacy experience into the dialect of the next landscape.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${
          profile?.resume_url ? 'bg-white/[0.02] border-white/5' : 'bg-amber-500/5 border-amber-500/20'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${
                profile?.resume_url ? 'bg-teal-500/10 border-teal-500/20 text-teal-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
              }`}>
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Root Connection</h3>
                <p className="text-[10px] text-slate-500 italic max-w-[280px]">
                  {profile?.resume_url 
                    ? 'Your Legacy Document is synced and ready for translation.' 
                    : 'No document found. The Bridge requires your roots to function.'}
                </p>
              </div>
            </div>

            {profile?.resume_url ? (
              <button 
                onClick={handleTranslate} 
                disabled={isTranslating} 
                className="w-full md:w-auto px-10 h-14 bg-teal-600 hover:bg-teal-500 text-slate-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-lg shadow-teal-900/20 active:scale-95"
              >
                {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Translate Roots
              </button>
            ) : (
              <Link 
                to="/hearth" 
                className="w-full md:w-auto px-10 h-14 border border-amber-500/50 text-amber-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:bg-amber-500/10 transition-all"
              >
                Go to Hearth
              </Link>
            )}
          </div>
        </div>

        {translation ? (
          <div className="bg-white/[0.01] border border-white/5 p-10 rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <div className="flex items-center gap-2 mb-8 text-teal-500/60">
                <BookOpen className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">Decoded Narrative</span>
             </div>
             <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-light">
                {translation}
             </div>
          </div>
        ) : (
          <div className="py-20 text-center opacity-20">
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Signal</p>
          </div>
        )}
      </div>
    </div>
  );
}