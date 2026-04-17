import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, Search, MapPin, Building2, Sparkles, 
  ToggleLeft, ToggleRight, ShieldCheck, Globe
} from 'lucide-react';

const Canopy = ({ vault }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationQuery, setLocationQuery] = useState(''); 
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);

  const hasResume = !!vault?.resumeData;

  const jobs = [
    {
      id: 1,
      role: "Senior Curriculum Developer",
      company: "TechEd Canada",
      location: "Ottawa, ON",
      isRemote: true,
      matchScore: 94,
      ethicsMatch: ["Transparency", "Impact"]
    },
    {
      id: 2,
      role: "Indigenous Education Consultant",
      company: "Unity Systems",
      location: "Winnipeg, MB",
      isRemote: false,
      matchScore: 98,
      ethicsMatch: ["Community", "Equity"]
    },
    {
      id: 3,
      role: "Learning Experience Designer",
      company: "Global Skills Corp",
      location: "London, UK",
      isRemote: true,
      matchScore: 88,
      ethicsMatch: ["Innovation"]
    }
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());
      const matchesRemote = isRemoteOnly ? job.isRemote : true;
      
      return matchesSearch && matchesLocation && matchesRemote;
    });
  }, [searchTerm, locationQuery, isRemoteOnly]);

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]">
              <Compass size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-serif italic text-white tracking-tight">The Horizon</h1>
              <p className="text-sm text-zinc-500 font-light italic mt-1">
                The launchpad for your professional migration. Find where your values and your next chapter align.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-[#110E16] px-4 py-2 rounded-2xl border border-zinc-800 self-end md:self-start">
             <div className={`w-2 h-2 rounded-full ${hasResume ? 'bg-teal-500' : 'bg-zinc-700'}`} />
             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
               {hasResume ? 'Personalized View' : 'Guest View'}
             </span>
          </div>
        </div>

        {/* SEARCH & FILTERS PANEL */}
        <div className="bg-[#110E16]/60 border border-zinc-800/50 p-8 rounded-[3rem] mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* ROLE SEARCH */}
            <div className="md:col-span-5 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Job Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-teal-500/30 transition-all"
                  placeholder="Role, Company, or Skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* LOCATION SEARCH */}
            <div className="md:col-span-4 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-teal-500/30 transition-all"
                  placeholder="Province, State, or City..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
            </div>

            {/* REMOTE TOGGLE */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between bg-black/40 p-3.5 rounded-xl border border-zinc-800">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Remote Only</span>
                <button onClick={() => setIsRemoteOnly(!isRemoteOnly)} className="text-teal-400">
                    {isRemoteOnly ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-zinc-700" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* LISTINGS */}
        <div className="grid gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-[#110E16]/40 border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl text-white font-serif italic group-hover:text-teal-400 transition-colors">{job.role}</h3>
                    {hasResume && job.matchScore > 90 && (
                      <div className="flex items-center gap-1 text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-purple-500/20">
                        <Sparkles size={10} /> High Alignment
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5"><Building2 size={14} /> {job.company}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                    {job.isRemote && <span className="text-teal-500/80 font-bold uppercase text-[9px] tracking-widest">Remote Ready</span>}
                  </div>

                  <div className="flex gap-2">
                    {job.ethicsMatch.map(val => (
                      <span key={val} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-teal-500/5 text-teal-400/60 rounded-md border border-teal-500/10 flex items-center gap-1">
                        <ShieldCheck size={10} /> {val} Match
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full md:w-auto relative z-10">
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-1">
                      {hasResume ? 'Alignment Score' : 'General Match'}
                    </span>
                    <span className="text-2xl font-serif italic text-white">{job.matchScore}%</span>
                  </div>
                  <button className="w-full md:w-48 py-4 bg-zinc-800 group-hover:bg-teal-500 group-hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                    Analyze Role
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-[#110E16]/20 border border-dashed border-zinc-800 rounded-[3rem]">
              <Globe className="mx-auto text-zinc-800 mb-4" size={48} />
              <p className="text-zinc-500 italic font-serif text-lg">The horizon is clear here. Try widening your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canopy;