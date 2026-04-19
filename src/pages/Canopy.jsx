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
  ExternalLink, Globe, Search, Sparkles, RefreshCw,
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
    setTimeout(() => setIsRefreshing(false), 800);
  };

  useEffect(() => { fetchJobs(); }, [activeLocation, isRemoteOnly]);

  const handleAnalyze = (job) => {
    if (userTier === "Seedling") {
       // Future: Trigger a beautiful upgrade modal
       return;
    }
    setIsAnalyzing(job.id);
    // Simulating the "Calculation"
    setTimeout(() => {
      setAnalysisResult({
        jobId: job.id,
        score: vault?.isAligned ? 94 : 72,
        message: "Alignment calculated."
      });
      setIsAnalyzing(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-white font-sans selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto py-12 px-6 space-y-16">
        
        {/* REFRESH CONTROL */}
        <div className="flex justify-center h-12">
          <button 
            onClick={handleManualRefresh}
            className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-teal-500/40 hover:text-teal-400 hover:border-teal-500/20 transition-all hover:scale-110 active:scale-90"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
          </button>
        </div>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 text-teal-500/80">
              <Compass size={22} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">The Horizon Board</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
              Survey the <span className="text-zinc-700 font-sans not-italic font-extralight uppercase">Terrain</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-md italic font-light border-l border-white/10 pl-4 leading-relaxed">
              Live opportunities from across the global forest, calibrated for your career migration.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-teal-500 transition-colors" size={14} />
              <Input 
                placeholder="Search by City..." 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveLocation(locationQuery)}
                className="pl-12 bg-white/5 border-white/10 text-white rounded-2xl text-xs h-14 focus:ring-2 focus:ring-teal-500/20 transition-all placeholder:text-zinc-800"
              />
            </div>

            <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 h-14 rounded-2xl w-full sm:w-auto justify-between">
              <div className="flex items-center gap-3">
                <Home size={16} className={isRemoteOnly ? "text-teal-400" : "text-zinc-700"} />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Remote Only</span>
              </div>
              <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} className="data-[state=checked]:bg-teal-500" />
            </div>
          </motion.div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center py-32 gap-6">
            <div className="relative">
               <Loader2 className="animate-spin text-teal-500/20" size={64} strokeWidth={1} />
               <RefreshCw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-500 animate-pulse" size={24} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic">Reading the Winds...</p>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32"
          >
            {apiJobs.map((job) => {
              const isMatched = analysisResult?.jobId === job.id;
              const isLocked = userTier === "Seedling";
              
              return (
                <motion.div
                  key={job.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="group relative h-full p-8 bg-[#110E16] border-white/5 hover:border-teal-500/20 transition-all duration-700 rounded-[2.5rem] flex flex-col justify-between shadow-2xl overflow-hidden">
                    {/* Subtle Glow Effect */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/5 blur-[80px] group-hover:bg-teal-500/10 transition-all duration-700" />

                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl group-hover:border-teal-500/30 transition-all">
                          <Briefcase size={20} className="text-zinc-700 group-hover:text-teal-400 group-hover:scale-110 transition-all" />
                        </div>
                        <AnimatePresence>
                          {isMatched && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <Badge className="bg-teal-500 text-black font-black text-[10px] tracking-widest px-4 py-1.5 shadow-[0_0_15px_rgba(20,184,166,0.4)]">
                                {analysisResult.score}% FIT
                              </Badge>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <h3 className="text-xl font-serif italic text-white/90 group-hover:text-white transition-colors line-clamp-2 leading-tight">{job.title}</h3>
                        <p className="text-[10px] text-teal-500/50 font-black uppercase tracking-[0.2em] mt-2 italic flex items-center gap-2">
                          <span className="w-1 h-1 bg-teal-500 rounded-full" />
                          {job.company}
                        </p>
                      </div>
                      
                      <p className="text-xs text-zinc-500 leading-relaxed italic font-light line-clamp-3 group-hover:text-zinc-400 transition-colors">
                        "{job.desc}"
                      </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/5 space-y-6 relative z-10">
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-black italic text-white/80 font-serif tracking-tighter">{job.salary}</div>
                        <div className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">{job.location}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button asChild className="h-14 bg-black/40 border border-white/5 text-zinc-500 hover:text-white hover:bg-black font-black rounded-2xl text-[9px] uppercase tracking-widest transition-all">
                          <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            Inspect <ExternalLink size={14} />
                          </a>
                        </Button>
                        
                        <Button 
                          onClick={() => handleAnalyze(job)} 
                          disabled={isAnalyzing === job.id} 
                          className={`h-14 border font-black rounded-2xl text-[9px] uppercase tracking-widest transition-all ${
                            isLocked 
                            ? 'bg-zinc-900/50 border-white/5 text-zinc-700 cursor-not-allowed' 
                            : 'bg-teal-500/5 hover:bg-teal-500 border-teal-500/20 text-teal-400 hover:text-black'
                          }`}
                        >
                          {isAnalyzing === job.id ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <span className="flex items-center gap-2">
                              {isLocked && <Clock size={12} />}
                              Analyze
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* FOOTER NAV */}
        <footer className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8 pb-12">
          <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-3xl border border-white/5">
            <Globe size={16} className="text-teal-500 animate-pulse" />
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] italic">
              Horizon Survey: <span className="text-zinc-400">Live</span>
            </p>
          </div>
          
          <nav className="flex gap-12">
            {[
              { label: 'The Library', path: '/library' },
              { label: 'The Hearth', path: '/hearth' }
            ].map((link) => (
              <button 
                key={link.path}
                className="group relative text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] hover:text-teal-400 transition-colors italic py-2" 
                onClick={() => navigate(link.path)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-500 group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}