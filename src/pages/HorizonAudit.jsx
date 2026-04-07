import React, { useState, useEffect } from 'react';
import { Anchor, Sparkles, ChevronRight, PenLine, CheckCircle2, BookOpen, ScrollText } from 'lucide-react';

const HorizonAudit = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [view, setView] = useState('draft'); // 'draft' or 'vault'
  const [responses, setResponses] = useState({
    q1: '', q2: '', q3: '', q4: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('rootwork_logs');
    if (savedData) {
      setResponses(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('rootwork_logs', JSON.stringify(responses));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const reflections = [
    { id: "q1", displayId: "01.", question: "What is your ideal daily rhythm?", hint: "DEEP FOCUS, FLEXIBLE HOURS, OR COLLABORATIVE ENERGY." },
    { id: "q2", displayId: "02.", question: "Which core skills from your 13 years feel most energizing?", hint: "FOCUS ON THE WORK THAT MAKES TIME DISAPPEAR." },
    { id: "q3", displayId: "03.", question: "What technical 'pains' do you actually enjoy solving?", hint: "LOGIC GAPS, WORKFLOW BOTTLENECKS, OR DATA DISARRAY." },
    { id: "q4", displayId: "04.", question: "What does 'impact' look like in your next chapter?", hint: "PRODUCT EFFICIENCY, USER EMPOWERMENT, OR SYSTEM ARCHITECTURE?" }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] p-6 md:p-10 text-white font-sans pb-24">
      
      {/* HEADER & TOGGLE */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-teal-400">
            <Anchor className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">The Rootwork</span>
          </div>
          <h1 className="text-2xl font-serif font-bold tracking-tight mb-2 text-white">Identity Anchors</h1>
          <p className="text-sm text-gray-400 max-w-xl italic">Securing your legacy while building your bridge.</p>
        </div>

        <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
          <button 
            onClick={() => setView('draft')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'draft' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <PenLine className="w-3.5 h-3.5" /> Drafting
          </button>
          <button 
            onClick={() => setView('vault')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${view === 'vault' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ScrollText className="w-3.5 h-3.5" /> The Vault
          </button>
        </div>
      </div>

      {view === 'draft' ? (
        /* DRAFTING VIEW */
        <div className="space-y-5 max-w-4xl">
          {reflections.map((item) => (
            <div key={item.id} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-base font-bold italic text-teal-400">{item.displayId}</span>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-white">{item.question}</h3>
                  <p className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.hint}</p>
                </div>
              </div>
              <textarea 
                value={responses[item.id]}
                onChange={(e) => handleChange(item.id, e.target.value)}
                className="w-full h-32 bg-black/20 border border-white/5 rounded-xl p-5 text-sm text-gray-300 focus:outline-none focus:border-teal-500/20 transition-all resize-none font-light"
                placeholder="Record your reflection..."
              />
            </div>
          ))}
          
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="text-gray-600 italic text-[11px] flex items-center gap-3">
              {isSaved ? <span className="flex items-center gap-2 text-teal-400 animate-pulse"><CheckCircle2 className="w-3.5 h-3.5" /> Vault Updated</span> : "Drafting your bridge..."}
            </div>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6B35]/90 transition-all">
              Lock In Anchors <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* THE VAULT (LOGBOOK) VIEW */
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {reflections.map((item) => (
            <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-white/[0.02] group-hover:text-teal-500/[0.05] transition-colors">
                <BookOpen className="w-24 h-24" />
              </div>
              <p className="text-[8px] font-black text-teal-500/50 uppercase tracking-widest mb-2">{item.question}</p>
              <p className="text-sm text-gray-300 leading-relaxed font-light italic">
                {responses[item.id] || "No entry recorded yet."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizonAudit;