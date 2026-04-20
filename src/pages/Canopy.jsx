import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  MapPin, Briefcase,
  Loader2,
  ExternalLink, Globe, RefreshCw,
  Sparkles, Zap, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

const JobCardSkeleton = () => (
  <div className="p-8 bg-[#110E16] border border-white/5 rounded-[2.5rem] animate-pulse space-y-6">
    <div className="w-12 h-12 bg-white/5 rounded-2xl" />
    <div className="space-y-2">
      <div className="h-5 bg-white/5 rounded w-3/4" />
      <div className="h-3 bg-white/5 rounded w-1/3" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-white/5 rounded w-full" />
      <div className="h-3 bg-white/5 rounded w-5/6" />
    </div>
    <div className="h-12 bg-white/5 rounded-xl mt-6" />
  </div>
);

const MatchBar = ({ percent }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-teal-500 to-purple-500 rounded-full" style={{ width: `${percent}%` }} />
    </div>
    <span className="text-[10px] font-black text-teal-400">{percent}%</span>
  </div>
);

export default function Canopy({ vault, onSync, isAdmin }) {
  const [aiJobs, setAiJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState(null); // 'personalized' | 'standalone'
  const [error, setError] = useState(null);

  // Legacy Adzuna fallback state
  const [locationQuery, setLocationQuery] = useState('');
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);
  const [activeLocation, setActiveLocation] = useState('');
  const [countryCode, setCountryCode] = useState('ca');
  const [adzunaJobs, setAdzunaJobs] = useState([]);
  const [adzunaLoading, setAdzunaLoading] = useState(false);

  const appId = import.meta.env.VITE_ADZUNA_APP_ID || "fdbe8139";
  const appKey = import.meta.env.VITE_ADZUNA_APP_KEY || "bc73ecdb23eacf99b7cf1739dcaec883";

  const fetchSmartJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('smartJobSearch', { vault });
      setAiJobs(res.data?.jobs || []);
      setMode(res.data?.mode || 'standalone');
    } catch (err) {
      console.error('Smart job search failed:', err);
      setError('AI search unavailable. Showing live listings.');
      fetchAdzunaJobs();
    } finally {
      setIsLoading(false);
    }
  };

  const updateCountryContext = (query) => {
    const q = query.toLowerCase();
    if (q.includes("usa") || q.includes("new york") || q.includes("california")) return "us";
    if (q.includes("uk") || q.includes("london")) return "gb";
    if (q.includes("australia") || q.includes("sydney")) return "au";
    return "ca";
  };

  const fetchAdzunaJobs = async () => {
    setAdzunaLoading(true);
    try {
      const what = isRemoteOnly ? "Remote" : "Professional";
      const where = activeLocation ? `&where=${encodeURIComponent(activeLocation)}` : "";
      const url = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=15&what=${what}${where}&content-type=application/json`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        setAdzunaJobs(data.results.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company?.display_name || "Confidential",
          location: job.location?.display_name || "Global",
          salary: job.salary_min ? `~$${Math.round(job.salary_min).toLocaleString()}` : "Market Rate",
          link: job.redirect_url,
          desc: job.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 160) + "...",
        })));
      }
    } catch { /* silent */ } finally {
      setAdzunaLoading(false);
    }
  };

  useEffect(() => { fetchSmartJobs(); }, []);
  useEffect(() => { if (error) fetchAdzunaJobs(); }, [activeLocation, isRemoteOnly, countryCode]);

  const handleSearch = () => {
    setCountryCode(updateCountryContext(locationQuery));
    setActiveLocation(locationQuery);
  };

  const showingAI = aiJobs.length > 0 && !error;

  return (
    <div className="min-h-screen bg-[#0A080D] text-white font-sans selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">

        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="flex items-center gap-3 text-teal-500/80">
              <Globe size={20} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Global Horizon</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
              Survey the <span className="text-zinc-400 font-sans not-italic font-extralight uppercase">World</span>
            </h1>
          </motion.div>

          {/* MODE BADGE + REFRESH */}
          <div className="flex items-center gap-4">
            {mode && (
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                mode === 'personalized'
                  ? 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}>
                {mode === 'personalized' ? <Sparkles size={10} /> : <Zap size={10} />}
                {mode === 'personalized' ? 'Personalized for You' : 'Curated Discovery'}
              </div>
            )}
            <button onClick={fetchSmartJobs} className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-teal-500/40 hover:text-teal-400 transition-all">
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
            </button>
          </div>
        </header>

        {/* ERROR / FALLBACK SEARCH BAR */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-black uppercase tracking-widest">
              <AlertCircle size={14} /> {error}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-80">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <Input
                  placeholder="City, State, or Country..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 bg-white/5 border-white/10 h-14 rounded-2xl focus:border-teal-500/50 placeholder:text-zinc-500"
                />
              </div>
              <div className="flex items-center gap-4 bg-white/[0.07] border border-white/20 px-6 h-14 rounded-2xl">
                <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Remote Only</span>
                <Switch checked={isRemoteOnly} onCheckedChange={setIsRemoteOnly} className="data-[state=checked]:bg-teal-500" />
              </div>
            </div>
          </motion.div>
        )}

        {/* JOB GRID */}
        {isLoading || adzunaLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
            {[0,1,2,3,4,5].map(i => <JobCardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32"
          >
            {showingAI ? (
              aiJobs.map((job, idx) => (
                <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Card className="group relative h-full p-8 bg-[#110E16] border-white/5 hover:border-teal-500/20 rounded-[2.5rem] flex flex-col justify-between overflow-hidden transition-all">
                    <div className="space-y-5 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl">
                          <Briefcase size={20} className="text-zinc-500 group-hover:text-teal-400 transition-all" />
                        </div>
                        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 text-[9px]">High Alignment</Badge>
                      </div>
                      <div>
                        <h3 className="text-xl font-serif italic text-white/90 leading-tight">{job.title}</h3>
                        <p className="text-[10px] text-teal-500/50 font-black uppercase tracking-widest mt-1">{job.company}</p>
                      </div>
                      <MatchBar percent={job.match_percent || 85} />
                      {job.hearth_insight && (
                        <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                          <p className="text-[10px] text-purple-300/80 italic leading-relaxed">
                            <span className="text-purple-400 font-black not-italic">Hearth Insight: </span>
                            {job.hearth_insight}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 space-y-4 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] text-zinc-500 uppercase font-black">{job.location}</span>
                      </div>
                      <Button asChild className="w-full h-12 bg-white/5 hover:bg-teal-500 hover:text-black rounded-xl text-[9px] uppercase font-black transition-all">
                        <a href={job.link || '#'} target="_blank" rel="noopener noreferrer">
                          View Deployment <ExternalLink size={12} className="ml-2" />
                        </a>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : adzunaJobs.length > 0 ? (
              adzunaJobs.map((job) => (
                <motion.div key={job.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                  <Card className="group relative h-full p-8 bg-[#110E16] border-white/5 rounded-[2.5rem] flex flex-col justify-between overflow-hidden">
                    <div className="space-y-6 relative z-10">
                      <div className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl">
                        <Briefcase size={20} className="text-zinc-500 group-hover:text-teal-400 transition-all" />
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
                        <div className="text-[9px] font-black text-zinc-400 uppercase">{job.location}</div>
                      </div>
                      <Button asChild className="w-full h-12 bg-white/5 hover:bg-teal-500 hover:text-black rounded-xl text-[9px] uppercase font-black transition-all">
                        <a href={job.link} target="_blank" rel="noopener noreferrer">View Deployment <ExternalLink size={12} className="ml-2" /></a>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-zinc-500 uppercase font-black text-xs tracking-widest">
                No openings found. Try refreshing your terrain.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}