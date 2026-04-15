import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Briefcase, Filter, ExternalLink, 
  Sparkles, Rocket, ShieldCheck, ArrowRight, Building2,
  Target, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Canopy = ({ vault, isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Canada');

  // Helper to determine if a job matches the user's synced vault data
  const getMatchScore = (jobTags) => {
    if (!vault || !vault.pivotTarget) return false;
    // Simple matching: does the job tag include keywords from their synced pivot target?
    const userTarget = vault.pivotTarget.toLowerCase();
    return jobTags.some(tag => userTarget.includes(tag.toLowerCase()) || tag.toLowerCase().includes(userTarget));
  };

  const regions = [
    'All Canada', 'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 
    'Newfoundland & Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 
    'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon', 'Remote'
  ];

  const jobLeads = [
    {
      id: 1,
      title: "Senior Program Manager (Public Sector Liaison)",
      company: "TechNorth Solutions",
      location: "Ontario",
      type: "Full-time",
      tags: ["Strategy", "Policy", "Remote Friendly"],
      description: "Seeking a professional who understands government procurement and stakeholder management to lead our new infrastructure initiative.",
      link: "#"
    },
    {
      id: 2,
      title: "Director of Learning & Development",
      company: "Stellar Health Group",
      location: "Alberta",
      type: "Full-time",
      tags: ["Education", "Leadership", "HR"],
      description: "Perfect for a former educator with curriculum management experience. Lead our corporate training division.",
      link: "#"
    },
    {
      id: 3,
      title: "Community Relations Lead",
      company: "EcoReserve Canada",
      location: "British Columbia",
      type: "Contract",
      tags: ["Indigenous Relations", "Communication"],
      description: "Bridge the gap between private enterprise and community stakeholders. Requires deep understanding of Indigenous studies.",
      link: "#"
    },
    {
      id: 4,
      title: "Policy Analyst (Corporate Social Responsibility)",
      company: "FinStream Inc.",
      location: "Remote",
      type: "Full-time",
      tags: ["Policy", "ESG", "Analysis"],
      description: "Apply your analytical skills to help us navigate evolving ESG regulations and corporate transparency.",
      link: "#"
    }
  ];

  const filteredJobs = useMemo(() => {
    return jobLeads.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All Canada' || job.location === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <div className="min-h-screen bg-transparent pb-20">
      {/* Header Area */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Rocket size={20} />
            </div>
            <h1 className="text-3xl font-serif italic text-white">Horizon Job Board</h1>
          </div>
          
          {/* Synced Status Badge */}
          {vault?.lastSync && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Hearth Synced</span>
            </div>
          )}
        </div>
        
        <p className="text-zinc-400 text-sm font-light max-w-2xl leading-relaxed">
          {vault?.userName ? `Welcome back, ${vault.userName.split(' ')[0]}. ` : ""}
          Welcome to the Launchpad! The Horizon Board curates roles where your public-sector background is an advantage. 
          {vault?.pivotTarget ? ` We've highlighted roles matching your path in ${vault.pivotTarget}.` : ""}
        </p>
      </header>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input 
            type="text"
            placeholder="Search roles, companies, or keywords..."
            className="w-full bg-[#110E16]/60 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-teal-500/30 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <select 
            className="w-full bg-[#110E16]/60 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-teal-500/30 outline-none appearance-none transition-all cursor-pointer"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isMatch = getMatchScore(job.tags);
              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`group p-6 rounded-[2rem] bg-[#110E16]/40 border ${isMatch ? 'border-teal-500/40' : 'border-zinc-800/50'} hover:border-teal-500/30 transition-all duration-500 relative overflow-hidden`}
                >
                  {isMatch && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-bl-xl flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> Top Match
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-teal-400 transition-colors">
                        <Building2 size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold group-hover:text-teal-400 transition-colors">{job.title}</h3>
                        <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{job.company}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/10 text-[10px] text-teal-400 font-black uppercase tracking-tighter">
                      {job.type}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm font-light mb-6 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <MapPin size={14} className="text-teal-500/50" />
                      {job.location}
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-colors">
                      View Posting <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <Sparkles className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-zinc-500 font-serif italic text-xl">No paths found in this direction.</h3>
              <p className="text-zinc-700 text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Admin Quick Add */}
      {isAdmin && (
        <div className="mt-16 p-8 rounded-[2.5rem] bg-teal-500/5 border border-teal-500/10 text-center">
          <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Founder's Console</p>
          <h4 className="text-white font-serif italic text-xl mb-4">Found a new lead for the community?</h4>
          <button className="px-8 py-3 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all">
            Add New Job Lead
          </button>
        </div>
      )}
    </div>
  );
};

export default Canopy;