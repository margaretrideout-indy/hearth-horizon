import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Binoculars, ShieldCheck, MapPin, Briefcase, 
  Clock, Loader2, CheckCircle2, Flame, 
  Leaf, Home, Users, ExternalLink, Globe, Search
} from 'lucide-react';

export default function Canopy({ vault, userTier = "Seedling" }) {
  const [isAnalyzing, setIsAnalyzing] = useState(null); 
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiJobs, setApiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // FILTER STATES
  const [locationQuery, setLocationQuery] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);
  const [activeLocation, setActiveLocation] = useState(""); 

  // --- ADZUNA CONFIGURATION ---
  const appId = "fdbe8139"; 
  const appKey = "bc73ecdb23eacf99b7cf1739dcaec883"; 

  // YOUR CURATED LEDGER (Hand-picked "Gems")
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

  const fetchJobs = async () => {
    if (!appId || !appKey) return;
    setIsLoading(true);
    try {
      const what = isRemoteOnly ? "Remote" : "Work";
      const where = activeLocation ? `&where=${encodeURIComponent(activeLocation)}` : "";
      
      const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=12&what=${what}${where}&content-type=application/json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const formatted = data.results.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company.display_name,
        location: job.location.display_name,
        type: "Direct Role",
        salary: job.salary_min ? `~$${Math.round(job.salary_min).toLocaleString()}` : "Market Rate",
        tags: [isRemoteOnly ? "remote" : "onsite"], 
        isPublic: true,
        link: job.redirect_url,
        desc: job.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160) + "..."
      }));
      setApiJobs(formatted);
    } catch (error) {
      console.error("Adzuna Scout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [activeLocation, isRemoteOnly]);

  const allJobs = [...curatedJobs, ...apiJobs];
  const jobs = allJobs.filter(job => userTier === "Seedling" ? job.isPublic : true);

  const handleAnalyze = (job) => {
    // 1. Membership Check
    if (userTier === "Seedling") {
      const confirmJoin = window.confirm(
        "Deep alignment analysis is a feature of the Founding Forest. Would you like to return to the Grove to see membership options?"
      );
      if (confirmJoin) window.location.href = "/"; 
      return;
    }

    // 2. Data Sync Check (The Hearth)
    if (!vault.resumeData) {
      const confirmHearth = window.confirm(
        "To analyze this role, your Hearth must be fueled with your professional data. Go to The Hearth to upload your resume?"
      );
      if (confirmHearth) window.location.href = "/hearth"; 
      return;
    }

    // 3. Ethics Check (Ecosystem Alignment)
    if (!vault.ethics || vault.ethics.length === 0) {
      const confirmAlign = window.confirm(
        "Alignment requires your Ecosystem standards. Would you like to set your ethics in Cultural Fit now?"
      );
      if (confirmAlign) window.location.href = "/alignment"; 
      return;
    }

    setIsAnalyzing(job.id);
    const ethicalMatches = vault.ethics?.filter(e => job.tags.includes(e)) || [];

    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: vault.isAligned ? 94 : 72,
        message: ethicalMatches.length > 0 
          ? `Matches your Ecosystem standards for ${ethicalMatches.map(m => m.toUpperCase()).join(" & ")}.`
          : "Matches your technical topography, but check the hearth-culture carefully."
      });
      setIsAnalyzing(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-teal-500 mb-2">
            <Binoculars size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Role Scouter</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">The Horizon</h1>
          <p className="text-slate-500 text-sm max-w-md">Global opportunities filtered through your Hearth and Ecosystem Alignment.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <Input 
              placeholder="Search City..." 
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLocation(locationQuery)}
              className="pl-10 bg-white/5 border-white/10 text-white rounded-xl text-xs h-10 focus:border-teal-500/50 transition-all"
            />
            <button onClick={() => setActiveLocation(locationQuery)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-teal-500">
              <Search size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 h-10 rounded-xl">
            <Home size={14} className={isRemoteOnly ? "text-teal-400" : "text-slate-600"} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remote Only</span>
            <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} className="data-[state=checked]:bg-teal-500" />
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="animate-spin text-teal-500" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Scouting the Forest...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => {
          const isMatched = analysisResult?.jobId === job.id;
          return (
            <Card key={job.id} className="group p-8 bg-[#1C1622]/40 border-white/5 hover:border-teal-500/30 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/10 transition-colors">
                    <Briefcase size={20} className="text-slate-500 group-hover:text-teal-400" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isMatched && <Badge className="bg-teal-500 text-black font-black text-[8px] animate-in zoom-in">{analysisResult.score}% ALIGNED</Badge>}
                    {!job.isPublic && <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-black text-[8px]">FOREST EXCLUSIVE</Badge>}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">{job.title}</h3>
                  <p className="text-xs text-teal-500/60 font-medium uppercase tracking-widest">{job.company}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light italic line-clamp-3">"{job.desc}"</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter"><MapPin size={12} /> {job.location}</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-tighter"><Clock size={12} /> {job.type}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black italic text-white/80">{job.salary}</span>
                  <div className="flex gap-1">
                    {job.tags.includes('eco') && <Leaf size={14} className="text-emerald-500/40" />}
                    {job.tags.includes('remote') && <Home size={14} className="text-blue-500/40" />}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild className="h-12 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-300 font-black rounded-xl text-[9px]">
                    <a href={job.link} target="_blank" rel="noopener noreferrer">View Role <ExternalLink size={12} className="ml-2" /></a>
                  </Button>
                  <Button onClick={() => handleAnalyze(job)} disabled={isAnalyzing === job.id} className="h-12 bg-teal-600/10 hover:bg-teal-600 border border-teal-500/20 text-teal-400 hover:text-black font-black rounded-xl text-[9px]">
                    {isAnalyzing === job.id ? <Loader2 className="animate-spin" size={14} /> : "Analyze"}
                  </Button>
                </div>
                {isMatched && (
                  <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-2xl animate-in slide-in-from-top-2">
                    <p className="text-[10px] text-teal-400 italic leading-tight">{analysisResult.message}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-full border border-white/5">
          <Globe size={12} className="text-teal-500" />
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
            Currently scouting: {activeLocation || "Global Forest"} {isRemoteOnly ? "(Remote Only)" : "(Include Onsite)"}
          </p>
        </div>
        <div className="flex gap-6">
          <span className="text-[9px] font-black text-teal-500/40 uppercase tracking-widest cursor-pointer hover:text-teal-500 transition-colors" onClick={() => window.location.href='/library'}>The Library</span>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest cursor-pointer hover:text-slate-300" onClick={() => window.location.href='/embers'}>The Embers</span>
        </div>
      </footer>
    </div>
  );
}