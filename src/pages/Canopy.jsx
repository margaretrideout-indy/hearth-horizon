import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Binoculars, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  Clock,
  Loader2,
  CheckCircle2,
  Flame,
  Leaf,
  Home,
  Users,
  ExternalLink,
  Globe
} from 'lucide-react';

export default function Canopy({ vault, userTier = "Seedling" }) {
  const [isAnalyzing, setIsAnalyzing] = useState(null); 
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiJobs, setApiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- ADZUNA CONFIGURATION ---
  const appId = "fdbe8139"; 
  const appKey = "bc73ecdb23eacf99b7cf1739dcaec883"; 

  // YOUR CURATED LEDGER
  // These are your "manual" picks that will always show up at the top
  const curatedJobs = [
    {
      id: "curated-1",
      title: "Operations Architect",
      company: "EcoStream Systems",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $140k",
      tags: ["eco", "remote"],
      isPublic: true, 
      link: "https://www.linkedin.com/jobs/", 
      desc: "Scaling sustainable infrastructure through optimized workflow protocols."
    }
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      if (!appId || !appKey) return;
      setIsLoading(true);
      try {
        // Fetching Remote roles from Canada (/ca/)
        const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=12&what=Remote&content-type=application/json`;
        const response = await fetch(url);
        const data = await response.json();
        
        const formatted = data.results.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company.display_name,
          location: job.location.display_name,
          type: "Remote",
          salary: job.salary_min ? `~$${Math.round(job.salary_min).toLocaleString()}` : "Market Rate",
          tags: ["remote"], 
          isPublic: true,
          link: job.redirect_url,
          // Cleaning up HTML tags that often come back in Adzuna descriptions
          desc: job.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160) + "..."
        }));
        setApiJobs(formatted);
      } catch (error) {
        console.error("Adzuna Scout failed to reach the forest:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [appId, appKey]);

  // Merge your hand-picked gems with the automated forest scout
  const allJobs = [...curatedJobs, ...apiJobs];

  // Logic: Non-members only see "Public" roles
  const jobs = allJobs.filter(job => {
    if (userTier === "Seedling") return job.isPublic;
    return true; 
  });

  const handleAnalyze = (job) => {
    if (userTier === "Seedling") {
      alert("This deep alignment analysis is reserved for our Founding Forest members. Join the cohort to unlock.");
      return;
    }

    setIsAnalyzing(job.id);
    
    // Check for matches against the vault ethics the user set in Alignment
    const ethicalMatches = vault.ethics?.filter(e => job.tags.includes(e)) || [];
    const hasSkillAlignment = vault.isAligned;

    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: hasSkillAlignment ? 92 : 68,
        message: ethicalMatches.length > 0 
          ? `Matches your standards for ${ethicalMatches.map(m => m.toUpperCase()).join(" & ")}.`
          : "Matches your technical topography, but check the hearth-culture carefully."
      });
      setIsAnalyzing(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-teal-500 mb-2">
            <Binoculars size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Role Scouter</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
            The Canopy
          </h1>
          <p className="text-slate-500 text-sm max-w-md">
            A curated view of the market, filtered through the boundaries of your Grove.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="px-6 py-3 bg-[#1C1622]/60 border border-white/5 rounded-2xl flex items-center gap-3">
            <ShieldCheck size={16} className="text-teal-500" />
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
              Hearth Guard: <span className="text-teal-400">{vault.ethics?.length || 0} Standards Active</span>
            </span>
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="animate-spin text-teal-500" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 animate-pulse">Scouting the Forest...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const isMatched = analysisResult?.jobId === job.id;
            return (
              <Card 
                key={job.id} 
                className="group p-8 bg-[#1C1622]/40 border-white/5 hover:border-teal-500/30 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/10 transition-colors">
                      <Briefcase size={20} className="text-slate-500 group-hover:text-teal-400" />
                    </div>
                    {isMatched ? (
                      <Badge className="bg-teal-500 text-black font-black text-[8px] animate-in zoom-in">
                        {analysisResult.score}% ALIGNED
                      </Badge>
                    ) : !job.isPublic && (
                       <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-black text-[8px]">
                        FOREST EXCLUSIVE
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">{job.title}</h3>
                    <p className="text-xs text-teal-500/60 font-medium uppercase tracking-widest">{job.company}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light italic line-clamp-3">
                    "{job.desc}"
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                      <MapPin size={12} /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                      <Clock size={12} /> {job.type}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black italic text-white/80">{job.salary}</span>
                    <div className="flex gap-1 text-slate-700">
                      {job.tags.includes('eco') && <Leaf size={14} className="text-emerald-500/40" />}
                      {job.tags.includes('remote') && <Home size={14} className="text-blue-500/40" />}
                      {job.tags.includes('equity') && <Users size={14} className="text-purple-500/40" />}
                      {job.tags.includes('balance') && <Flame size={14} className="text-orange-500/40" />}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      asChild
                      className="h-12 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-300 font-black rounded-xl uppercase tracking-widest text-[9px]"
                    >
                      <a href={job.link} target="_blank" rel="noopener noreferrer">
                        View Role <ExternalLink size={12} className="ml-2" />
                      </a>
                    </Button>

                    <Button 
                      onClick={() => handleAnalyze(job)}
                      disabled={isAnalyzing === job.id}
                      className="h-12 bg-teal-600/10 hover:bg-teal-600 border border-teal-500/20 text-teal-400 hover:text-black font-black rounded-xl uppercase tracking-widest text-[9px] transition-all"
                    >
                      {isAnalyzing === job.id ? <Loader2 className="animate-spin" size={14} /> : "Analyze"}
                    </Button>
                  </div>

                  {isMatched && (
                    <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-2xl animate-in slide-in-from-top-2">
                      <div className="flex gap-2 items-start text-teal-400">
                        <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                        <p className="text-[10px] italic leading-tight">{analysisResult.message}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-teal-500/5 blur-3xl rounded-full group-hover:bg-teal-500/10 transition-all" />
              </Card>
            );
          })
        ) : !isLoading && (
          <div className="col-span-full py-24 text-center space-y-6">
            <div className="w-20 h-20 bg-[#1C1622] border border-white/5 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
              <Binoculars size={32} className="text-teal-500/40" />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif italic text-2xl text-white">The mist is still heavy...</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto italic">
                "Your Grove is perfectly guarded. We're still scouting for roles that meet your values."
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
          <Globe size={12} className="text-teal-500" />
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
            Optimized for your location and remote-first roles.
          </p>
        </div>
        <div className="flex gap-6">
          <span className="text-[9px] font-black text-teal-500/40 uppercase tracking-widest cursor-pointer hover:text-teal-500 transition-colors">Request Scout</span>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Update Ledger</span>
        </div>
      </footer>
    </div>
  );
}