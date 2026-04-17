import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Binoculars, MapPin, Briefcase, 
  Clock, Loader2, Home, 
  ExternalLink, Globe, Search, Sparkles
} from 'lucide-react';

export default function Canopy({ vault, userTier = "Seedling" }) {
  const [isAnalyzing, setIsAnalyzing] = useState(null); 
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiJobs, setApiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [locationQuery, setLocationQuery] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);
  const [activeLocation, setActiveLocation] = useState(""); 

  const appId = "fdbe8139"; 
  const appKey = "bc73ecdb23eacf99b7cf1739dcaec883"; 

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
      desc: "Scaling sustainable infrastructure through optimized workflow protocols and legacy translation."
    }
  ];

  const fetchJobs = async () => {
    if (!appId || !appKey) return;
    setIsLoading(true);
    try {
      const what = isRemoteOnly ? "Remote" : "Professional";
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
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchJobs(); }, [activeLocation, isRemoteOnly]);

  const allJobs = [...curatedJobs, ...apiJobs];

  const handleAnalyze = (job) => {
    // 1. Membership Check
    if (userTier === "Seedling") {
      if (window.confirm("Deep alignment analysis is reserved for Stewards and Sentinels. Upgrade your standing?")) {
        window.location.href = "/";
      }
      return;
    }
    // 2. Data Check (The Hearth) - Using the "Résumé" term we established
    if (!vault.resume) {
      if (window.confirm("The Hearth requires your professional legacy to calculate fit. Sync your résumé now?")) {
        window.location.href = "/hearth";
      }
      return;
    }
    // 3. Ethics Check (Ecosystem Alignment)
    if (!vault.ethics || vault.ethics.length === 0) {
      if (window.confirm("Alignment requires your Ecosystem standards. Define your ethics in Alignment?")) {
        window.location.href = "/alignment";
      }
      return;
    }

    setIsAnalyzing(job.id);
    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: vault.isAligned ? 94 : 72,
        message: "Alignment calculated. Your legacy experience translates with high affinity to this role's requirements."
      });
      setIsAnalyzing(null);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700 bg-[#0A080D]">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-teal-500 mb-2">
            <Binoculars size={20} className="drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">The Horizon Board</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">Survey the Terrain</h1>
          <p className="text-zinc-500 text-sm max-w-md italic font-light">
            Global opportunities awaiting your arrival. Sync with the Hearth to translate your fit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <Input 
              placeholder="Filter by Territory (City)..." 
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLocation(locationQuery)}
              className="pl-10 bg-white/5 border-white/5 text-white rounded-xl text-xs h-10 focus:border-teal-500/50 transition-all placeholder:text-zinc-700"
            />
            <button onClick={() => setActiveLocation(locationQuery)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-teal-500">
              <Search size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 px-4 h-10 rounded-xl">
            <Home size={14} className={isRemoteOnly ? "text-teal-400" : "text-zinc-700"} />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">Remote Only</span>
            <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} className="data-[state=checked]:bg-teal-500" />
          </div>
        </div>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="animate-spin text-teal-500" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic animate-pulse">Surveying the vast Horizon...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.map((job) => {
          const isMatched = analysisResult?.jobId === job.id;
          return (
            <Card key={job.id} className="group p-8 bg-[#110E16] border-white/5 hover:border-teal-500/30 transition-all duration-500 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-black border border-white/5 rounded-2xl group-hover:border-teal-500/30 transition-all">
                    <Briefcase size={20} className="text-zinc-600 group-hover:text-teal-400" />
                  </div>
                  {isMatched && (
                    <Badge className="bg-teal-500 text-black font-black text-[8px] tracking-[0.2em] px-3 py-1 animate-in zoom-in">
                      {analysisResult.score}% ALIGNED
                    </Badge>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2 leading-tight">{job.title}</h3>
                  <p className="text-[10px] text-teal-500/60 font-black uppercase tracking-[0.2em] mt-1 italic">{job.company}</p>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-light italic line-clamp-3">"{job.desc}"</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-600 uppercase tracking-widest italic"><MapPin size={12} /> {job.location}</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-600 uppercase tracking-widest italic"><Clock size={12} /> {job.type}</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
                <div className="flex justify-between items-center text-lg font-black italic text-white/90 font-serif">{job.salary}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Button asChild className="h-12 bg-black border border-white/5 text-zinc-400 hover:text-white font-black rounded-xl text-[9px] uppercase tracking-widest transition-all">
                    <a href={job.link} target="_blank" rel="noopener noreferrer">Inspect Role <ExternalLink size={12} className="ml-2" /></a>
                  </Button>
                  <Button 
                    onClick={() => handleAnalyze(job)} 
                    disabled={isAnalyzing === job.id} 
                    className="h-12 bg-teal-500/5 hover:bg-teal-500 border border-teal-500/20 text-teal-400 hover:text-black font-black rounded-xl text-[9px] uppercase tracking-widest transition-all"
                  >
                    {isAnalyzing === job.id ? <Loader2 className="animate-spin" size={14} /> : (
                      <span className="flex items-center gap-2">
                        <Sparkles size={12} /> Translate Fit
                      </span>
                    )}
                  </Button>
                </div>
                {isMatched && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-2xl"
                  >
                    <p className="text-[10px] text-teal-400 italic leading-relaxed">{analysisResult.message}</p>
                  </motion.div>
                )}
              </div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-teal-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          );
        })}
      </div>

      <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 bg-black px-5 py-2.5 rounded-full border border-white/5 shadow-inner">
          <Globe size={12} className="text-teal-500 animate-pulse" />
          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">
            Global Survey Protocol Active
          </p>
        </div>
        <div className="flex gap-8">
          <span className="text-[9px] font-black text-teal-500/30 uppercase tracking-[0.3em] cursor-pointer hover:text-teal-400 transition-colors italic" onClick={() => window.location.href='/library'}>The Sanctuary</span>
          <span className="text-[9px] font-black text-teal-500/30 uppercase tracking-[0.3em] cursor-pointer hover:text-teal-400 transition-colors italic" onClick={() => window.location.href='/hearth'}>Return to Hearth</span>
        </div>
      </footer>
    </div>
  );
}