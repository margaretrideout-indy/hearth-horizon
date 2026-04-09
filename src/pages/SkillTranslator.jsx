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
  BookOpen,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinguisticBridge() {
  const [translation, setTranslation] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Jargon-to-Value State
  const [jargon, setJargon] = useState('');
  const [valueResult, setValueResult] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);

  const { data: profiles } = useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: () => base44.entities.UserProfile.list() 
  });
  const profile = profiles?.[0];

  const handleFullTranslate = async () => {
    if (!profile?.resume_url) return;
    setIsTranslating(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Using the user's legacy document (URL: ${profile.resume_url}), translate their academic and teaching experience into high-impact corporate and technology language. Focus on outcome-oriented verbs, stakeholder management, and scalability. Return as a clean list of bullet points.`,
      });
      setTranslation(result);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleJargonDecode = async () => {
    if (!jargon.trim()) return;
    setIsDecoding(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `The user is transitioning from education/public sector to tech/corporate. Translate this specific phrase: "${jargon}" into 3 different high-value corporate variations (e.g., Project Management, Data Analysis, Operations).`,
      });
      setValueResult(result);
    } finally {
      setIsDecoding(false);
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

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* SECTION 1: JARGON-TO-VALUE (Quick Decode) */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="w-24 h-24 text-teal-500" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-teal-500/80 mb-6 flex items-center gap-2">
              <Zap className="w-3 h-3 fill-teal-500" />
              Jargon-to-Value Generator
            </h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text"
                value={jargon}
                onChange={(e) => setJargon(e.target.value)}
                placeholder="Paste a phrase (e.g., 'Managed a classroom of 30 students')"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 h-14 text-sm focus:outline-none focus:border-teal-500/30 transition-all"
              />
              <button 
                onClick={handleJargonDecode}
                disabled={isDecoding || !jargon}
                className="h-14 px-8 bg-teal-600 hover:bg-teal-500 text-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-30"
              >
                {isDecoding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Decode'}
              </button>
            </div>

            {valueResult && (
              <div className="mt-8 p-6 bg-teal-500/5 border border-teal-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <div className="text-sm leading-relaxed text-slate-300 italic whitespace-pre-wrap">
                  {valueResult}
                </div>
                <button 
                  onClick={() => {setJargon(''); setValueResult('');}}
                  className="mt-4 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-teal-400 flex items-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Clear Generator
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: FULL DOCUMENT TRANSLATION */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 px-4">Legacy Document Translation</h3>
          
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
                      ? 'Your Legacy Document is synced and ready.' 
                      : 'No document found. Connect your roots at the Hearth.'}
                  </p>
                </div>
              </div>

              {profile?.resume_url ? (
                <button 
                  onClick={handleFullTranslate} 
                  disabled={isTranslating} 
                  className="w-full md:w-auto px-10 h-14 bg-white/5 border border-white/10 hover:border-teal-500/40 text-slate-300 hover:text-teal-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95"
                >
                  {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Translate Full Resume
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

          {translation && (
            <div className="bg-[#251D2F] border border-white/5 p-10 rounded-[2.5rem] animate-in fade-in slide-in-from-bottom-4 shadow-2xl">
               <div className="flex items-center gap-2 mb-8 text-teal-500/60">
                  <BookOpen className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-teal-500">Corporate Translation</span>
               </div>
               <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap font-light">
                  {translation}
               </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}