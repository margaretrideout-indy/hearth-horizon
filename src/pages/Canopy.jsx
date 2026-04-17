import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, Briefcase, Globe, Search, 
  MapPin, Building2, Sparkles, Filter, 
  ToggleLeft, ToggleRight, ShieldCheck, CheckCircle2
} from 'lucide-react';

const Canopy = ({ vault }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRemoteOnly, setIsRemoteOnly] = useState(true);
  const [locationScope, setLocationScope] = useState('Domestic'); // Domestic or Global

  // This mimics the connection to CulturalFit.jsx/Alignment logic
  const userAlignment = vault?.alignment || {}; 
  const hasResume = !!vault?.resumeData;

  const jobs = [
    {
      id: 1,
      role: "Senior Curriculum Developer",
      company: "TechEd Canada",
      location: "Ottawa, ON",
      isRemote: true,
      scope: "Domestic",
      matchScore: 94,
      ethicsMatch: ["Transparency", "Impact"],
      link: "#"
    },
    {
      id: 2,
      role: "Learning Experience Designer",
      company: "Global Skills Corp",
      location: "London, UK",
      isRemote: true,
      scope: "Global",
      matchScore: 88,
      ethicsMatch: ["Innovation"],
      link: "#"
    },
    {
      id: 3,
      role: "Indigenous Education Consultant",
      company: "Unity Systems",
      location: "Winnipeg, MB",
      isRemote: false,
      scope: "Domestic",
      matchScore: 98,
      ethicsMatch: ["Community", "Equity"],
      link: "#"
    }
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRemote = isRemoteOnly ? job.isRemote : true;
      const matchesScope = job.scope === locationScope;
      return matchesSearch && matchesRemote && matchesScope;
    });
  }, [searchTerm, isRemoteOnly, locationScope]);

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 p-6 md:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP NAV / STATUS */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20">
              <Compass size={20} />
            </div>
            <h1 className="text-2xl font-serif italic text-white">The Horizon</h1>
          </div>
          
          <div className="flex items-center gap-3 bg-[#110E16] px-4 py-2 rounded-2xl border border-zinc-800">
             <div className={`w-2 h-2 rounded-full ${hasResume ? 'bg-teal-500' : 'bg-zinc-700'}`} />
             <span className="text-[9px] font-black uppercase tracking-widest">
               {hasResume ? 'Resume Synced' : 'Resume Missing'}
             </span>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="bg-[#110E16]/60 border border-zinc-800/50 p-8 rounded-[3rem] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            
            <div className="lg:col-span-1 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Job Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="text" 
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-teal-500/30"
                  placeholder="Role or Keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Scope</label>
               <div className="flex bg-black/40 p-1 rounded-xl border border-zinc-800">
                  <button 
                    onClick={() => setLocationScope('Domestic')}
                    className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${locationScope === 'Domestic' ? 'bg-teal-500 text-black' : 'text-zinc-500'}`}
                  >Canada</button>
                  <button 
                    onClick={() => setLocationScope('Global')}
                    className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${locationScope === 'Global' ? 'bg-teal-500 text-black' : 'text-zinc-500'}`}
                  >Global</button>
               </div>
            </div>

            <div className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-zinc-800 h-[50px]">
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Remote Only</span>
               <button onClick={() => setIsRemoteOnly(!isRemoteOnly)} className="text-teal-400">
                  {isRemoteOnly ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-zinc-700" />}
               </button>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="grid gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-[#110E16]/40 border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl text-white font-serif italic group-hover:text-teal-400 transition-colors">{job.role}</h3>
                  {job.matchScore > 90 && (
                    <div className="flex items-center gap-1 text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-purple-500/20">
                      <Sparkles size={10} /> High Alignment
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5"><Building2 size={14} /> {job.company}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                </div>

                <div className="flex gap-2">
                  {job.ethicsMatch.map(val => (
                    <span key={val} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-teal-500/5 text-teal-500/60 rounded-md border border-teal-500/10 flex items-center gap-1">
                      <ShieldCheck size={10} /> {val} Match
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 block mb-1">Alignment Score</span>
                  <span className="text-2xl font-serif italic text-white">{job.matchScore}%</span>
                </div>
                <button className="w-full md:w-48 py-4 bg-zinc-800 group-hover:bg-teal-500 group-hover:text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Analyze Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canopy;