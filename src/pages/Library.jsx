import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Database,
  Search,
  Copy
} from 'lucide-react';

const Library = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [tier, setTier] = useState('Steward'); // Logic should ideally pull from user context

  // Placeholder for Identity Reframing Data
  const reframingData = [
    { from: "Curriculum Design", to: "Program Architecture", context: "Operations & Tech" },
    { from: "Classroom Management", to: "Stakeholder Alignment", context: "Project Management" },
    { from: "Differentiated Instruction", to: "User-Centric Solutioning", context: "Product/UX" },
  ];

  const kindlingScripts = [
    {
      title: "The Mutual Connect",
      desc: "For when you have a contact in common.",
      text: "Hi [Name], I saw we are both connected to [Contact]. I'm currently pivoting from Education into [Industry] and would love to hear about your journey at [Company]."
    },
    {
      title: "The Project Deep-Dive",
      desc: "Highlighting a specific piece of their work.",
      text: "Hi [Name], I recently followed your work on [Project]. As I transition into [Industry], your approach to [Specific Skill] really resonated with my background in curriculum architecture."
    },
    {
      title: "The Reconnection",
      desc: "For someone you haven't spoken to in years.",
      text: "Hi [Name], it's been a while! I've been watching your growth in [Industry] from afar. I'm stepping away from the classroom this year and would love to catch up for 15 minutes."
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#0A090D] text-zinc-300 p-8 font-sans selection:bg-purple-500/30">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-purple-500/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Archive 01</span>
        </div>
        <h1 className="text-5xl font-serif italic text-white mb-4">The Library</h1>
        <p className="text-zinc-500 max-w-md text-xs leading-relaxed uppercase tracking-widest font-bold">
          Curated provisions for the professional migration.
        </p>
      </header>

      {/* CANOPY HUB: NAVIGATION GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        
        {/* HEARTHKEEPER PROVISIONS */}
        <div className="p-8 rounded-[2.5rem] bg-[#110F15] border border-teal-500/10 hover:border-teal-500/20 transition-all group">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-teal-500/5 text-teal-400 border border-teal-500/10">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Hearthkeeper</h2>
              <p className="text-[10px] text-teal-500/50 font-bold uppercase">Tactical Foundations</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setActiveTool('reframing')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeTool === 'reframing' ? 'bg-teal-500/10 border-teal-500/40 text-white' : 'bg-black/40 border-white/5 text-zinc-400 hover:border-teal-500/30'}`}
            >
              <div className="flex items-center gap-3">
                <Layers size={14} className="text-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Identity Reframing Engine</span>
              </div>
              <ArrowRight size={12} className={activeTool === 'reframing' ? 'opacity-100' : 'opacity-0'} />
            </button>

            <button 
              onClick={() => setActiveTool('kindling')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeTool === 'kindling' ? 'bg-teal-500/10 border-teal-500/40 text-white' : 'bg-black/40 border-white/5 text-zinc-400 hover:border-teal-500/30'}`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={14} className="text-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Kindling: Outreach Library</span>
              </div>
              <ArrowRight size={12} className={activeTool === 'kindling' ? 'opacity-100' : 'opacity-0'} />
            </button>
          </div>
        </div>

        {/* STEWARD PROVISIONS */}
        <div className="p-8 rounded-[2.5rem] bg-[#110F15] border border-purple-500/10 hover:border-purple-500/20 transition-all group">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-purple-500/5 text-purple-400 border border-purple-500/10">
              <Compass size={20} />
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Steward</h2>
              <p className="text-[10px] text-purple-500/50 font-bold uppercase">Strategic Intelligence</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              disabled={tier !== 'Steward'}
              onClick={() => setActiveTool('architect')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeTool === 'architect' ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-black/40 border-white/5 text-zinc-400 hover:border-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-3">
                <Zap size={14} className="text-purple-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">The Script Architect</span>
              </div>
              <ArrowRight size={12} className={activeTool === 'architect' ? 'opacity-100' : 'opacity-0'} />
            </button>

            <button 
              disabled={tier !== 'Steward'}
              onClick={() => setActiveTool('sponsorship')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeTool === 'sponsorship' ? 'bg-purple-500/10 border-purple-500/40 text-white' : 'bg-black/40 border-white/5 text-zinc-400 hover:border-purple-500/30 disabled:opacity-30 disabled:cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={14} className="text-purple-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Sponsorship Framework</span>
              </div>
              <ArrowRight size={12} className={activeTool === 'sponsorship' ? 'opacity-100' : 'opacity-0'} />
            </button>
          </div>
        </div>
      </div>

      {/* THE ACTIVE TOOL STAGE */}
      <main className="max-w-6xl mx-auto">
        {activeTool ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-12">
              <button 
                onClick={() => setActiveTool(null)}
                className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                  <ArrowRight size={12} className="rotate-180" />
                </div>
                Return to Canopy
              </button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeTool === 'reframing' || activeTool === 'kindling' ? 'bg-teal-500' : 'bg-purple-500'}`} />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">System Active</span>
              </div>
            </div>

            {/* IDENTITY REFRAMING ENGINE VIEW */}
            {activeTool === 'reframing' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {reframingData.map((item, i) => (
                    <div key={i} className="group bg-[#110F15] border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-teal-500/30 transition-all">
                      <div className="flex-1">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-500/50 mb-2 block">Legacy Skill</span>
                        <h4 className="text-lg font-serif italic text-zinc-300">{item.from}</h4>
                      </div>
                      <div className="flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="text-teal-500" />
                      </div>
                      <div className="flex-1 text-right">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-500/50 mb-2 block">Pivot Narrative</span>
                        <h4 className="text-lg font-serif italic text-white">{item.to}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KINDLING LIBRARY VIEW */}
            {activeTool === 'kindling' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kindlingScripts.map((script, i) => (
                  <div key={i} className="bg-[#110F15] border border-teal-500/10 p-8 rounded-[2rem] flex flex-col hover:border-teal-500/40 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2 rounded-xl bg-teal-500/5 text-teal-500/40 group-hover:text-teal-500 transition-colors">
                        <MessageSquare size={16} />
                      </div>
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Script {i + 1}</span>
                    </div>
                    <h4 className="text-sm font-serif italic text-white mb-2">{script.title}</h4>
                    <p className="text-[10px] text-zinc-500 mb-8 leading-relaxed">{script.desc}</p>
                    <button 
                      onClick={() => handleCopy(script.text)}
                      className="mt-auto w-full py-4 rounded-xl bg-teal-500/5 border border-teal-500/20 text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-2"
                    >
                      <Copy size={12} />
                      Copy Kindling
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* PLACEHOLDERS FOR STEWARD TOOLS */}
            {activeTool === 'architect' && (
              <div className="text-center py-20 bg-[#110F15] rounded-[3rem] border border-purple-500/10">
                <Zap size={32} className="text-purple-500/20 mx-auto mb-6" />
                <h3 className="text-xl font-serif italic text-white mb-2">The Script Architect</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Dynamic Generation Interface Loading...</p>
              </div>
            )}

            {activeTool === 'sponsorship' && (
              <div className="text-center py-20 bg-[#110F15] rounded-[3rem] border border-purple-500/10">
                <BookOpen size={32} className="text-purple-500/20 mx-auto mb-6" />
                <h3 className="text-xl font-serif italic text-white mb-2">Sponsorship Framework</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Advanced Strategy Modules Coming Soon</p>
              </div>
            )}

          </div>
        ) : (
          /* EMPTY STATE / WELCOME */
          <div className="py-32 text-center border border-dashed border-white/5 rounded-[3rem] animate-pulse">
            <Database size={24} className="text-zinc-800 mx-auto mb-6" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Select a provision above to populate the hearth</p>
          </div>
        )}
      </main>

      {/* FOOTER DECOR */}
      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center opacity-30">
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Steward Management System // v1.04</span>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-teal-500/50" />
          <div className="w-2 h-2 rounded-full bg-purple-500/50" />
        </div>
      </footer>
    </div>
  );
};

export default Library;