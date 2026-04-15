import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Briefcase, Filter, ExternalLink, 
  Sparkles, Rocket, ShieldCheck, ArrowRight, Building2,
  Target, Zap, Globe, Navigation, Wifi, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = ({ vault, isAdmin = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Global (All)');
  const [remoteOnly, setRemoteOnly] = useState(false);

  const regions = [
    'Global (All)',
    'Canada (All)',
    'United States',
    'Europe',
    'Asia Pacific',
    'Latin America'
  ];

  const jobLeads = [
    {
      id: 1,
      title: "Senior Program Manager (Public Sector Liaison)",
      company: "TechNorth Solutions",
      location: "Toronto, Ontario, Canada",
      region: "Canada (All)",
      isRemote: true,
      type: "Full-time",
      tags: ["Strategy", "Policy", "Remote Friendly"],
      description: "Seeking a professional who understands government procurement and stakeholder management to lead our new infrastructure initiative.",
      link: "#"
    },
    {
      id: 2,
      title: "Strategy Consultant (GovTech)",
      company: "EuroCivic Partners",
      location: "Berlin, Germany",
      region: "Europe",
      isRemote: false,
      type: "Contract",
      tags: ["Policy", "Digital Transformation"],
      description: "Help European municipalities transition to cloud-based public services. Requires experience in public sector administration.",
      link: "#"
    },
    {
      id: 3,
      title: "Public Health Director",
      company: "HealthCore TX",
      location: "Austin, Texas, USA",
      region: "United States",
      isRemote: false,
      type: "Full-time",
      tags: ["Health", "Leadership", "Government"],
      description: "Oversee regional health initiatives and coordinate with state-level policy makers for community wellness programs.",
      link: "#"
    },
    {
      id: 4,
      title: "Policy Analyst (CSR)",
      company: "FinStream Inc.",
      location: "Remote (Worldwide)",
      region: "Global (All)",
      isRemote: true,
      type: "Full-time",
      tags: ["Policy", "ESG", "Analysis"],
      description: "Apply your analytical skills to help us navigate evolving ESG regulations and corporate transparency globally.",
      link: "#"
    },
    {
      id: 5,
      title: "Systems Architect",
      company: "Ottawa Defense Sys",
      location: "Ottawa, ON",
      region: "Canada (All)",
      isRemote: true,
      type: "Contract",
      tags: ["Defense", "IT", "Security"],
      description: "Architecture role for federal systems. Open to remote candidates across Canada with proper clearance.",
      link: "#"
    }
  ];

  const getMatchScore = (jobTags) => {
    if (!vault || !vault.pivotTarget) return false;
    const userTarget = vault.pivotTarget.toLowerCase();
    return jobTags.some(tag => 
      userTarget.includes(tag.toLowerCase()) || 
      tag.toLowerCase().includes(userTarget)
    );
  };

  const filteredJobs = useMemo(() => {
    return jobLeads.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'Global (All)' || job.region === selectedRegion;
      const matchesLocation = job.location.toLowerCase().includes(locationSearch.toLowerCase()) ||
                             (locationSearch.toLowerCase() === 'remote' && job.isRemote);
      const matchesRemoteToggle = !remoteOnly || job.isRemote;

      return matchesSearch && matchesRegion && matchesLocation && matchesRemoteToggle;
    });
  }, [searchTerm, selectedRegion, locationSearch, remoteOnly]);

  return (
    <div className="min-h-screen bg-transparent pb-20 px-4 max-w-7xl mx-auto">
      <header className="mb-12 pt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Globe size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-serif italic text-white tracking-tight">Canopy</h1>
              <p className="text-[10px] text-teal-500/60 font-black uppercase tracking-[0.3em]">Opportunity Launchpad</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border transition-all duration-300 ${
                remoteOnly 
                ? 'bg-teal-500/10 border-teal-500/40 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.1)]' 
                : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/20'
              }`}
            >
              <Wifi size={16} className={remoteOnly ? 'animate-pulse' : ''} />
              <span className="text-[11px] font-bold uppercase tracking-wider">Remote Only</span>
              <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${remoteOnly ? 'bg-teal-500' : 'bg-zinc-700'}`}>
                <div className={`absolute top-1 w-2 h-2 bg-white rounded-full transition-all duration-300 ${remoteOnly ? 'left-5' : 'left-1'}`} />
              </div>
            </button>

            {vault?.lastSync && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#110E16]/60 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">Synced</span>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-zinc-400 text-sm font-light max-w-2xl leading-relaxed">
          {vault?.userName ? `Welcome back, ${vault.userName.split(' ')[0]}. ` : "Welcome to the Canopy. "}
          We have aggregated high-impact public-to-private pivot opportunities. 
          {vault?.pivotTarget ? ` Filtering roles for ${vault.pivotTarget}.` : " Search global territories or toggle Remote Only to start."}
        </p>
      </header>

      <div className="flex flex-col gap-4 mb-12">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-teal-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search roles, companies, or keywords..."
            className="w-full bg-[#110E16]/40 border border-zinc-800/80 rounded-[1.8rem] py-5 pl-16 pr-6 text-sm text-white focus:border-teal-500/30 outline-none transition-all placeholder:text-zinc-700 shadow-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group">
            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-teal-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="City, State, or Province..."
              className="w-full bg-[#110E16]/40 border border-zinc-800/80 rounded-[1.5rem] py-5 pl-16 pr-6 text-sm text-white focus:border-teal-500/30 outline-none transition-all placeholder:text-zinc-700 shadow-2xl"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <select 
              className="w-full bg-[#110E16]/40 border border-zinc-800/80 rounded-[1.5rem] py-5 pl-16 pr-12 text-sm text-white focus:border-teal-500/30 outline-none appearance-none cursor-pointer shadow-2xl"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(r => <option key={r} value={r} className="bg-[#1A1625]">{r}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
              <Filter size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isMatch = getMatchScore(job.tags);
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group p-8 rounded-[2.5rem] bg-[#110E16]/30 border ${isMatch ? 'border-teal-500/20 shadow-[0_0_50px_rgba(20,184,166,0.03)]' : 'border-zinc-800/40'} hover:border-teal-500/40 transition-all duration-500 relative overflow-hidden`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-teal-400 group-hover:bg-teal-500/10 transition-all duration-500 border border-white/5 shrink-0">
                        <Building2 size={26} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-bold text-lg leading-tight group-hover:text-teal-200 transition-colors mb-1">{job.title}</h3>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{job.company}</p>
                      </div>
                    </div>
                    {isMatch && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-[9px] font-black uppercase tracking-tighter">
                        <Zap size={10} fill="currentColor" /> Pivot Match
                      </div>
                    )}
                  </div>

                  <p className="text-zinc-400 text-sm font-light mb-8 leading-relaxed line-clamp-2 text-left">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.isRemote && (
                      <span className="px-3 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-400 font-bold uppercase flex items-center gap-1.5">
                        <Home size={10} /> Remote
                      </span>
                    )}
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] text-zinc-500 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                      <Navigation size={14} className="text-teal-500/40" />
                      {job.location}
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 hover:text-white transition-all transform group-hover:translate-x-1">
                      View Position <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-40 text-center bg-[#110E16]/10 rounded-[3rem] border border-dashed border-zinc-800/40">
              <div className="relative inline-block mb-6">
                <Globe className="w-16 h-16 text-zinc-800 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-zinc-800 opacity-40 animate-pulse" />
                </div>
              </div>
              <h3 className="text-zinc-500 font-serif italic text-2xl">Signal Lost</h3>
              <p className="text-zinc-700 text-sm mt-3 max-w-xs mx-auto leading-relaxed">Adjust your search parameters or location to re-establish the connection to new opportunities.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {isAdmin && (
        <div className="mt-20 p-16 rounded-[4rem] bg-gradient-to-br from-teal-500/[0.04] to-purple-500/[0.04] border border-white/5 text-center shadow-3xl">
          <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6">Founder's Console</p>
          <h4 className="text-white font-serif italic text-3xl mb-8">Found a new opening?</h4>
          <button className="px-14 py-5 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(20,184,166,0.3)]">
            Log Opportunity
          </button>
        </div>
      )}
    </div>
  );
};

export default App;