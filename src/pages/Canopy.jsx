import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
Compass, Briefcase, Globe, Search,
ArrowRight, MapPin, Building2, Clock,
Filter, ChevronRight, ExternalLink, Sparkles
} from 'lucide-react';

const HorizonJobBoard = () => {
const navigate = useNavigate();
const [searchTerm, setSearchTerm] = useState('');

const jobs = [
{
id: 1,
role: "Curriculum Designer (Remote)",
company: "EdTech Innovations",
location: "Toronto, ON (Remote)",
type: "Full-time",
salary: "$85k - $110k",
tags: ["Education", "Remote", "LMS"],
link: "#"
},
{
id: 2,
role: "Indigenous Relations Lead",
company: "North Star Tech",
location: "Vancouver, BC (Hybrid)",
type: "Contract",
salary: "$90k - $120k",
tags: ["Leadership", "Policy", "Impact"],
link: "#"
},
{
id: 3,
role: "Learning Data Analyst",
company: "Horizon Analytics",
location: "Canada (Remote)",
type: "Full-time",
salary: "$75k - $95k",
tags: ["Data", "Analysis", "Remote"],
link: "#"
}
];

return (
<div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/30">
{/* HEADER */}
<div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
<header className="mb-16">
<div className="flex items-center gap-4 mb-6">
<div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 shadow-[0_0_20px_rgba(20,184,166,0.1)]">
<Compass size={24} />
</div>
<div>
<h1 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight">The Horizon</h1>
<p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">National Job Board & Market Topography</p>
</div>
</div>

      <div className="relative max-w-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
        <input 
          type="text"
          placeholder="Search by role, company, or keyword..."
          className="w-full bg-[#110E16] border border-zinc-800 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:border-teal-500/50 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>

    {/* JOB LIST */}
    <div className="space-y-4 mb-24">
      <div className="flex items-center justify-between mb-8 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Featured Openings</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            <Filter size={12} /> Filter
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="group bg-[#110E16]/60 border border-zinc-800/50 p-8 rounded-[2.5rem] hover:border-teal-500/30 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles size={40} className="text-teal-500/5" />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-teal-500/5 text-teal-400 border border-teal-500/10 text-[9px] font-black uppercase tracking-widest">{job.type}</span>
                <span className="text-zinc-600 text-[10px] font-medium">•</span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{job.salary}</span>
              </div>
              
              <div>
                <h4 className="text-xl text-white font-serif italic mb-1 group-hover:text-teal-400 transition-colors">{job.role}</h4>
                <div className="flex flex-wrap items-center gap-4 text-zinc-500">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Building2 size={14} /> {job.company}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <MapPin size={14} /> {job.location}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[9px] text-zinc-600 font-black uppercase tracking-tighter border border-zinc-800 px-2 py-0.5 rounded-md">{tag}</span>
                ))}
              </div>
            </div>

            <button className="relative z-10 h-14 px-8 bg-zinc-800 group-hover:bg-teal-500 group-hover:text-black text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all uppercase text-[10px] tracking-widest">
              View Opportunity <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* BOTTOM NAV / FOOTER */}
    <footer className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
        <div className="flex items-center gap-2">
            <Compass size={14} className="text-teal-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white">Hearth & Horizon 2026</span>
        </div>
        <div className="flex gap-8">
            <button onClick={() => navigate('/library')} className="text-[9px] font-black uppercase tracking-widest hover:text-teal-400 transition-colors">The Library</button>
            <button onClick={() => navigate('/grove')} className="text-[9px] font-black uppercase tracking-widest hover:text-teal-400 transition-colors">The Grove</button>
            <button onClick={() => navigate('/hearth')} className="text-[9px] font-black uppercase tracking-widest hover:text-teal-400 transition-colors">Exit</button>
        </div>
    </footer>
  </div>
</div>
);
};

export default HorizonJobBoard;