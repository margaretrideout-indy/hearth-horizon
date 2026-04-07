import React, { useState, useEffect, useMemo } from 'react';
import { 
  Anchor, Sparkles, ChevronRight, PenLine, 
  CheckCircle2, ScrollText, Lightbulb, 
  BarChart3, Layers, ArrowUpRight, Hash
} from 'lucide-react';

const HorizonAudit = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [view, setView] = useState('draft'); 
  const [activePhase, setActivePhase] = useState('excavation');
  const [responses, setResponses] = useState({
    q1: '', q2: '', q3: '', q4: '', q5: '', q6: ''
  });

  // SEMANTIC ENGINE MAP
  const themeMap = {
    '#Leadership': ['lead', 'manage', 'team', 'strategy', 'direction', 'stakeholder', 'program'],
    '#Agile': ['agile', 'scrum', 'sprint', 'iteration', 'workflow', 'process', 'kanban'],
    '#Data': ['data', 'analysis', 'metric', 'research', 'pattern', 'evidence', 'stats'],
    '#Product': ['user', 'product', 'design', 'roadmap', 'impact', 'solution', 'owner'],
    '#Education': ['curriculum', 'learning', 'teaching', 'student', 'instructional', 'school']
  };

  // LOAD DATA
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('rootwork_logs_v3');
      if (savedData) {
        setResponses(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load local storage:", error);
    }
  }, []);

  // SEMANTIC CALCULATION
  const activeThemes = useMemo(() => {
    const allText = Object.values(responses).join(' ').toLowerCase();
    return Object.keys(themeMap).filter(theme => 
      themeMap[theme].some(keyword => allText.includes(keyword))
    );
  }, [responses]);

  const handleSave = () => {
    localStorage.setItem('rootwork_logs_v3', JSON.stringify(responses));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const phases = {
    excavation: {
      title: "Phase 01: Excavation",
      description: "Unearthing the constants from your 13-year legacy.",
      questions: [
        { id: "q1", displayId: "01.", question: "What is your ideal daily rhythm?", nudge: "Consider deep focus blocks vs. collaborative energy." },
        { id: "q2", displayId: "02.", question: "Which core skills feel most energizing?", nudge: "What work makes time 'disappear' for you?" },
        { id: "q3", displayId: "03.", question: "What are your 'Non-Negotiables'?", nudge: "What values must exist to prevent burnout?" }
      ]
    },
    architecting: {
      title: "Phase 02: Architecting",
      description: "Building the bridge toward tech and data leadership.",
      questions: [
        { id: "q4", displayId: "04.", question: "Which technical 'pains' do you enjoy?", nudge: "Logic gaps, workflow bottlenecks, or data disarray?" },
        { id: "q5", displayId: "05.", question: "What does 'Impact' look like now?", nudge: "System efficiency, user empowerment, or roadmap clarity?" },
        { id: "q6", displayId: "06.", question: "The 5-Year Syntax", nudge: "What is the high-level roadmap for your professional identity?" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-32">
      
      {/* HEADER & NAV */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <Layers className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">The recursive Audit</span>
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white">The Rootwork</h1>
        </div>

        <div className="flex bg-black/30 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          <button 
            onClick={() => setView('draft')} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'draft' ? 'bg-[#FF6B35] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <PenLine className="w-3.5 h-3.5" /> Workspace
          </button>
          <button 
            onClick={() => setView('vault')} 
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'vault' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ScrollText className="w-3.5 h-3.5" /> The Vault
          </button>
        </div>
      </div>

      {view === 'draft' ? (
        /* WORKSPACE VIEW */
        <div className="max-w-5xl">
          <div className="flex gap-8 border-b border-white/5 mb-10">
            {Object.keys(phases).map(key => (
              <button 
                key={key} 
                onClick={() => setActivePhase(key)} 
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${activePhase === key ? 'text-teal-400' : 'text-gray-600 hover:text-gray-400'}`}
              >
                {phases[key].title}
                {activePhase === key && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {phases[activePhase].questions.map((item) => (
              <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-serif italic text-teal-400/50">{item.displayId}</span>
                    <h3 className="text-lg font-bold tracking-tight text-white">{item.question}</h3>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-teal-500/5 text-teal-400 text-[9px] font-bold uppercase tracking-wider border border-teal-500/10">
                    <Lightbulb className="w-3 h-3 inline mr-1.5" /> Context Prompt
                  </div>
                </div>
                
                <textarea 
                  value={responses[item.id] || ''}
                  onChange={(e) => setResponses({...responses, [item.id]: e.target.value})}
                  className="w-full h-36 bg-black/20 border border-white/5 rounded-2xl p-6 text-sm text-gray-300 placeholder:text-gray-800 focus:outline-none focus:border-teal-500/20 transition-all resize-none font-light leading-relaxed"
                  placeholder="Analyze and record..."
                />
                <p className="mt-3 text-[9px] text-gray-600 italic uppercase tracking-widest">{item.nudge}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
            <div className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">
              {isSaved ? <span className="text-teal-400 animate-pulse flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Vault Updated</span> : "Pending Changes"}
            </div>
            <button onClick={handleSave} className="flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all">
              Lock In Anchors <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* VAULT VIEW */
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Theme Header */}
            <div className="md:col-span-3 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Active Semantic Themes</span>
                <div className="flex gap-2 flex-wrap">
                  {activeThemes.length > 0 ? activeThemes.map(tag => (
                    <span key={tag} className="text-[9px] bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full text-teal-400 font-bold flex items-center gap-1.5">
                      <Hash className="w-2.5 h-2.5" /> {tag.replace('#', '')}
                    </span>
                  )) : <span className="text-[9px] text-gray-700 italic">No patterns detected yet.</span>}
                </div>
              </div>
              <BarChart3 className="w-5 h-5 text-gray-800" />
            </div>

            {/* Entry Cards */}
            {Object.keys(phases).flatMap(key => phases[key].questions).map((item) => (
              <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group hover:border-teal-500/20 transition-all">
                <div className="relative z-10">
                  <span className="text-[9px] font-black text-teal-500/40 uppercase tracking-[0.2em] mb-4 block">Anchor {item.displayId}</span>
                  <h4 className="text-sm font-bold text-white mb-4 leading-tight">{item.question}</h4>
                  <p className="text-xs text-gray-400 font-light italic leading-relaxed">
                    {responses[item.id] || "Reflection pending..."}
                  </p>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-white/5 group-hover:text-teal-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HorizonAudit;