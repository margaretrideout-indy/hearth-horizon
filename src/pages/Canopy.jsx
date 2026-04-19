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
  ExternalLink, Globe, Search, RefreshCw,
  Compass 
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

  // FIX: Use Environment Variables
  const appId = import.meta.env.VITE_ADZUNA_APP_ID || "fdbe8139";
  const appKey = import.meta.env.VITE_ADZUNA_APP_KEY || "bc73ecdb23eacf99b7cf1739dcaec883";

  const fetchJobs = async () => {
    if (!appId || !appKey) return;
    setIsLoading(true);
    try {
      const what = isRemoteOnly ? "Remote" : "Professional";
      const where = activeLocation ? `&where=${encodeURIComponent(activeLocation)}` : "";
      // Note: Change '/ca/' to your target country code if needed
      const url = `https://api.adzuna.com/v1/api/jobs/ca/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=15&what=${what}${where}&content-type=application/json`;

      const response = await fetch(url);
      const data = await response.json();

      const formatted = data.results.map((job) => ({
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
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => { fetchJobs(); }, [activeLocation, isRemoteOnly]);

  const handleAnalyze = (job) => {
    if (userTier === "Seedling") {
      alert("This analysis requires a Hearthkeeper or Steward tier.");
      return;
    }
    setIsAnalyzing(job.id);
    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: Math.floor(Math.random() * (98 - 70 + 1)) + 70, // Simulating a dynamic score
        message: "Alignment calculated."
      });
      setIsAnalyzing(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-white font-sans selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto py-12 px-6 space-y-16">
        
        <div className="flex justify-center h-12">
          <button onClick={handleManualRefresh} className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-teal-500/40 hover:text-teal-400 transition-all">
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
          </button>
        </div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="flex items-center gap-3 text-teal-500/80">
              <Compass size={22} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">The Horizon Board</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
              Survey the <span className="text-zinc-700 font-sans not-italic font-extralight uppercase">Terrain</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={14} />
              <Input 
                placeholder="Search by City..." 
                value={locationQuery} 
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveLocation(locationQuery)}
                className="pl-12 bg-white/5 border-white/10"
              />
            </div>
            <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 h-14 rounded-2xl">
              <span className="text-[10px] font-black text-zinc-500 uppercase italic">Remote Only</span>
              <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} />
            </div>
          </motion.div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center py-32 gap-6">
            <Loader2 className="animate-spin text-teal-500/20" size={64} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Reading the Winds...</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden" animate="show" 
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32"
          >
            {apiJobs.map((job) => {
              const isMatched = analysisResult?.jobId === job.id;
              const isLocked = userTier === "Seedling";
              return (
                <motion.div key={job.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Card className="group relative h-full p-8 bg-[#110E16] border-white/5 rounded-[2.5rem] flex flex-col justify-between overflow-hidden">
                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl">
                          <Briefcase size={20} className="text-zinc-700 group-hover:text-teal-400 transition-all" />
                        </div>
                        {isMatched && (
                          <Badge className="bg-teal-500 text-black font-black text-[10px]">{analysisResult.score}% FIT</Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-serif italic text-white/90 line-clamp-2">{job.title}</h3>
                        <p className="text-[10px] text-teal-500/50 font-black uppercase tracking-widest mt-2">{job.company}</p>
                      </div>
                      <p className="text-xs text-zinc-500 italic line-clamp-3">"{job.desc}"</p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/5 space-y-6 relative z-10">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-black italic text-white/80 font-serif">{job.salary}</div>
                        <div className="text-[9px] font-black text-zinc-700 uppercase">{job.location}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button asChild variant="outline" className="rounded-2xl text-[9px] uppercase font-black">
                          <a href={job.link} target="_blank" rel="noopener noreferrer">Inspect <ExternalLink size={14} className="ml-1" /></a>
                        </Button>
                        <Button 
                          onClick={() => handleAnalyze(job)} 
                          disabled={isAnalyzing === job.id}
                          className={`rounded-2xl text-[9px] uppercase font-black ${isLocked ? 'opacity-50' : ''}`}
                        >
                          {isAnalyzing === job.id ? <Loader2 className="animate-spin" size={14} /> : (isLocked ? <Clock size={12} className="mr-1" /> : null)}
                          Analyze
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}