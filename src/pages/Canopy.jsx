import React, { useState } from 'react';
import { 
  Rocket, Search, MapPin, Zap, ArrowUpRight, Anchor, Sparkles, Target, Flame
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CANADIAN_HUBS = [
  "All Canada",
  "Remote (Canada)", 
  "Halifax, NS", 
  "Fredericton, NB", 
  "Toronto, ON",
  "Kitchener-Waterloo, ON",
  "Ottawa, ON",
  "Montreal, QC",
  "Calgary, AB", 
  "Vancouver, BC"
];

export default function Launch({ vault }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHub, setSelectedHub] = useState('All Canada');
  
  const hasUploadedResume = vault?.isAligned || !!vault?.resume; 

  const allJobs = [
    { 
      id: 1, 
      title: "Learning & Development Specialist", 
      company: "Volta Health Tech", 
      location: "Halifax, NS", 
      alignment: 96, 
      tags: ["L&D", "Public Sector Pivot"],
      salary: "$80k - $105k",
      url: "https://www.linkedin.com/jobs/search/?keywords=Learning%20Development%20Specialist",
      translation: "Matches your 13 years of Curriculum Development and Program Management experience."
    },
    { 
      id: 2, 
      title: "Project Coordinator (Cybersecurity)", 
      company: "CyberNB", 
      location: "Fredericton, NB", 
      alignment: 91, 
      tags: ["Project Management", "Gov-Tech"],
      salary: "$75k - $95k",
      url: "https://www.careerbeacon.com/en/search/project-coordinator",
      translation: "Your 'Conflict Resolution' and 'Stakeholder Engagement' skills map to high-stakes project coordination."
    },
    { 
      id: 3, 
      title: "Program Manager, AI Data", 
      company: "Vector Institute", 
      location: "Toronto, ON", 
      alignment: 93, 
      tags: ["AI Operations", "Strategy"],
      salary: "$110k - $145k",
      url: "https://www.linkedin.com/jobs/search/?keywords=AI%20Program%20Manager",
      translation: "Your Master of Education in Indigenous Studies provides the unique qualitative data synthesis required here."
    },
    { 
      id: 4, 
      title: "Customer Success Lead", 
      company: "Benevity", 
      location: "Calgary, AB", 
      alignment: 87, 
      tags: ["Social Impact", "SaaS"],
      salary: "$90k - $120k",
      url: "https://www.linkedin.com/jobs/search/?keywords=Customer%20Success%20Lead",
      translation: "Your legacy in front-line delivery translates to high-tier Customer Experience (CX) management."
    }
  ];

  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesHub = selectedHub === 'All Canada' || job.location.includes(selectedHub.split(',')[0]);
    return matchesSearch && matchesHub;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20 p-6">
      {/* 1. Reciprocity Banner (The Stripe Hook) */}
      {!vault?.isVip && (
        <Card className="bg-teal-500/10 border-teal-500/20 p-4 rounded-2xl flex items-center justify-between group cursor-pointer" 
              onClick={() => window.open('YOUR_STRIPE_LINK_HERE', '_blank')}>
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/20 p-2 rounded-lg">
              <Flame className="w-5 h-5 text-teal-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider">Join the Embers Community</p>
              <p className="text-xs text-teal-300/70">Plant a seed to unlock real-time peer networking & exclusive career pulses.</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-teal-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Card>
      )}

      <header className="space-y-4">
        <div className="flex items-center gap-2 text-teal-400">
          <Rocket className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Stage Four: The Launch</span>
        </div>
        <h1 className="text-4xl font-bold text-white font-heading italic">Propulsion & Opportunities</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          {hasUploadedResume 
            ? "Your launchpad into the Canadian tech ecosystem, calibrated to your legacy expertise."
            : "Survey the landscape. These high-ground roles are selected for their alignment with professional educators transitioning to tech."}
        </p>
      </header>

      {hasUploadedResume && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
          {/* Main Stat Card - Dark Purple / Teal */}
          <Card className="bg-gradient-to-br from-[#1C1622] to-teal-500/10 border-teal-500/20 p-6 rounded-[2rem] relative overflow-hidden group shadow-xl">
            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-teal-500/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
            <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500 mb-2">Market Readiness</p>
              <h3 className="text-2xl font-serif italic text-white">94% Aligned</h3>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Your linguistic dialect matches your target sector.</p>
            </div>
          </Card>
          
          {/* Keyword Card */}
          <Card className="bg-[#1C1622]/40 border-white/5 p-6 rounded-[2rem] flex flex-col justify-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-500/60 mb-2">Top Keyword Match</p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Program Design</h3>
            <p className="text-[10px] text-slate-500 mt-1">Found in your most compatible postings.</p>
          </Card>

          {/* Pulse Card */}
          <Card className="bg-[#1C1622]/40 border-white/5 p-6 rounded-[2rem] flex flex-col justify-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Market Pulse</p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Atlantic Tech Expansion</h3>
            <p className="text-[10px] text-slate-500 mt-1">Surge detected in Halifax & Fredericton hubs.</p>
          </Card>
        </section>
      )}

      {/* Search Bar - Darkened to Grey/Teal Theme */}
      <Card className="p-4 bg-[#1C1622]/80 border-white/5 backdrop-blur-md shadow-2xl rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input 
              placeholder="Search by role or skill..." 
              className="pl-10 bg-[#0A080D] border-gray-800 text-white focus:border-teal-500 transition-colors rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select 
              className="w-full h-10 pl-10 pr-4 bg-[#0A080D] border-gray-800 text-sm text-white rounded-xl appearance-none focus:ring-1 focus:ring-teal-500 outline-none cursor-pointer"
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
            >
              {CANADIAN_HUBS.map(hub => <option key={hub} value={hub}>{hub}</option>)}
            </select>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] rounded-xl uppercase text-[10px] tracking-widest">
            Refine Launch
          </Button>
        </div>
      </Card>

      {/* Job Cards */}
      <div className="grid gap-4 min-h-[400px]">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id} 
            className="group p-6 bg-[#1C1622]/60 border-white/5 hover:border-teal-500/30 transition-all relative overflow-hidden rounded-[2rem]"
          >
            {(hasUploadedResume && job.alignment > 90) && (
              <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
            )}
            
            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors font-serif italic">
                      {job.title}
                    </h3>
                    {(hasUploadedResume && job.alignment > 95) && <Zap className="w-4 h-4 text-teal-400 fill-teal-400/20" />}
                  </div>
                  <p className="text-gray-400 font-medium mt-1">
                    {job.company} • <span className="text-gray-500 text-sm">{job.location}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-teal-500/10 text-teal-300 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-tighter">
                      {tag}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-gray-500 border-gray-800 px-3 py-1 text-[10px] font-bold uppercase">
                    {job.salary}
                  </Badge>
                </div>

                {hasUploadedResume && (
                  <div className="bg-[#2D2438]/20 border border-white/5 p-4 rounded-2xl animate-in fade-in duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={12} className="text-teal-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-teal-500">Transcoding Logic</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light italic">
                      "{job.translation}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-8">
                <div className="text-right">
                  {hasUploadedResume ? (
                    <>
                      <span className="text-3xl font-black text-teal-500 block leading-none">{job.alignment}%</span>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Alignment Score</p>
                    </>
                  ) : (
                    <Link to="/hearth">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-teal-500/30 text-teal-400 text-[10px] font-black uppercase hover:bg-teal-500/10 rounded-xl"
                      >
                        <Zap className="w-3 h-3 mr-1" /> Calibrate
                      </Button>
                    </Link>
                  )}
                </div>
                
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 gap-2 group/btn px-4 h-12 rounded-xl">
                    View Path <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center py-12 space-y-4 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02]">
        <div className="flex justify-center gap-4">
           <Anchor className="w-8 h-8 text-slate-700 opacity-50" />
           <Rocket className="w-8 h-8 text-slate-700 opacity-50" />
        </div>
        <div className="space-y-1">
          <h3 className="text-white font-medium italic">Scanning across the Hubs...</h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Monitoring the Canadian tech pulse to find roles where your 13-year legacy is the missing piece.
          </p>
        </div>
      </div>
    </div>
  );
}