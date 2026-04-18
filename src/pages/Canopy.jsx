import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Binoculars, MapPin, Briefcase, 
  Clock, Loader2, Home, 
  ExternalLink, Globe, Search, Sparkles, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Canopy({ vault, onSync, onRefresh, userTier = "Seedling" }) {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(null); 
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiJobs, setApiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [locationQuery, setLocationQuery] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);
  const [activeLocation, setActiveLocation] = useState(""); 

  const appId = "fdbe8139"; 
  const appKey = "bc73ecdb23eacf99b7cf1739dcaec883"; 

  const fetchJobs = async () => {
    if (!appId || !appKey) return;
    setIsLoading(true);
    try {
      const what = isRemoteOnly ? "Remote" : "Professional";
      const where = activeLocation ? `&where=${encodeURIComponent(activeLocation)}` : "";
      const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=15&what=${what}${where}&content-type=application/json`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      const formatted = data.results.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company?.display_name || "Confidential",
        location: job.location?.display_name || "Remote / Global",
        type: job.contract_type === 'full_time' ? "Full-time" : "Contract Role",
        salary: job.salary_min ? `~$${Math.round(job.salary_min).toLocaleString()}` : "Market Rate",
        link: job.redirect_url,
        desc: job.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160) + "..."
      }));
      
      setApiJobs(formatted);
    } catch (error) { 
      console.error("Survey Error:", error); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    if (onRefresh) await onRefresh();
    await fetchJobs();
    setIsRefreshing(false);
  };

  useEffect(() => { fetchJobs(); }, [activeLocation, isRemoteOnly]);

  const handleAnalyze = (job) => {
    if (userTier === "Seedling") {
      alert("Deep alignment analysis is reserved for Stewards.");
      return;
    }
    if (!vault?.resume) {
      alert("The Hearth requires your legacy profile to calculate fit.");
      return;
    }

    setIsAnalyzing(job.id);
    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: vault.isAligned ? 94 : 72,
        message: "Alignment calculated. Your legacy experience translates with high affinity to this role."
      });
      setIsAnalyzing(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-12 animate-in fade-in duration-700 bg-[#0A080D]">
      
      {/* 1. STANDARDIZED REFRESH TARGET (44px) */}
      <div className="flex justify-center h-12">
        <button 
          onClick={handleManualRefresh}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 text-teal-500/50 hover:text-teal-500 transition-all"
        >
          <motion.div 
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={isRefreshing ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
          >
            <RefreshCw size={20} />
          </motion.div>
        </button>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-teal-500 mb-2">
            <Binoculars size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">The Horizon Board</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-white tracking-tight">Survey the Terrain</h1>
          <p className="text-zinc-500 text-sm max-w-md italic font-light">
            Live opportunities from across the global forest, calibrated to your current standing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {/* Enhanced Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <Input 
              placeholder="Search by City..." 
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLocation(locationQuery)}
              className="pl-10 bg-white/5 border-white/5 text-white rounded-xl text-xs h-12 focus:ring-1 focus:ring-teal-500/30 transition-all"
            />
          </div>

          {/* Standardized Switch Target */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 h-12 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <Home size={14} className={isRemoteOnly ? "text-teal-400" : "text-zinc-700"} />
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">Remote</span>
            </div>
            <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} className="data-[state=checked]:bg-teal-500" />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="animate-spin text-teal-500" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic">Syncing with Horizon...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {apiJobs.map((job) => {
            const isMatched = analysisResult?.jobId === job.id;
            return (
              <Card key={job.id} className="group p-8 bg-[#110E16] border-white/5 hover:border-teal-500/30 transition-all duration-500 rounded-[2.5rem] flex flex-col justify-between shadow-2xl">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 flex items-center justify-center bg-black border border-white/5 rounded-2xl">
                      <Briefcase size={20} className="text-zinc-600 group-hover:text-teal-400" />
                    </div>
                    {isMatched && (
                      <Badge className="bg-teal-500 text-black font-black text-[10px] tracking-[0.1em] px-3 py-1">
                        {analysisResult.score}% FIT
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">{job.title}</h3>
                    <p className="text-[10px] text-teal-500/60 font-black uppercase tracking-[0.2em] mt-1 italic">{job.company}</p>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed italic line-clamp-3">"{job.desc}"</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                  <div className="text-lg font-black italic text-white/90 font-serif">{job.salary}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button asChild className="h-12 bg-black border border-white/5 text-zinc-400 hover:text-white font-black rounded-xl text-[10px] uppercase tracking-widest">
                      <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                         Inspect <ExternalLink size={14} />
                      </a>
                    </Button>
                    <Button 
                      onClick={() => handleAnalyze(job)} 
                      disabled={isAnalyzing === job.id} 
                      className="h-12 bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20 text-teal-400 hover:text-black font-black rounded-xl text-[10px] uppercase tracking-widest"
                    >
                      {isAnalyzing === job.id ? <Loader2 className="animate-spin" size={14} /> : "Analyze"}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* 2. STANDARDIZED FOOTER (Unified Nav Fix) */}
      <footer className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 pb-8">
        <div className="flex items-center gap-3 bg-black px-5 py-3 rounded-full border border-white/5">
          <Globe size={14} className="text-teal-500 animate-pulse" />
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">
            Global Survey Live
          </p>
        </div>
        <div className="flex gap-8">
          <button 
            className="text-[10px] font-black text-teal-500/30 uppercase tracking-[0.2em] hover:text-teal-400 transition-colors italic py-2" 
            onClick={() => navigate('/library')}
          >
            The Library
          </button>
          <button 
            className="text-[10px] font-black text-teal-500/30 uppercase tracking-[0.2em] hover:text-teal-400 transition-colors italic py-2" 
            onClick={() => navigate('/hearth')}
          >
            The Hearth
          </button>
        </div>
      </footer>
    </div>
  );
}