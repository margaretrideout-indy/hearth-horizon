import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightLeft, Sparkles, Lightbulb, BookOpen, Download, Plus, Trash2, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EXAMPLES = [
  { legacy: "Designing & Implementing Curricular Frameworks", tech: "Product Lifecycle & Instructional Design: Developing end-to-end information delivery systems." },
  { legacy: "Differentiating Instruction for Diverse Learners", tech: "UX Personalization & Accessibility: Customizing complex content for varying user personas." },
  { legacy: "Leading Program Initiatives", tech: "Project & Program Management: Managing cross-functional projects with strict deadlines." },
  { legacy: "Classroom & Behavioral Management", tech: "Community Operations: Coordinating high-density groups in fast-paced settings." },
];

export default function UnifiedLinguisticBridge() {
  const [input, setInput] = useState('');
  const [role, setRole] = useState('Education');
  const [currentTranslation, setCurrentTranslation] = useState('');
  
  // Persistence: Loads saved items from the browser's local storage on startup
  const [savedTranslations, setSavedTranslations] = useState(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('hearth_bridge_log');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });

  // Syncs the Workspace to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('hearth_bridge_log', JSON.stringify(savedTranslations));
  }, [savedTranslations]);

  const handleTranslate = () => {
    if (!input) return;
    
    // Smart library for high-value educator transitions
    const library = {
      "iep": "Cross-Functional Project Management: Coordinating specialized stakeholders to meet regulatory compliance and personalized user milestones.",
      "lesson planning": "Instructional Design & Product Roadmap Development: Architecting end-to-end content delivery systems.",
      "classroom management": "Operations & Community Management: Scaling engagement protocols and managing high-density user environments.",
      "parent teacher interviews": "Stakeholder Management & Communications: Facilitating high-stakes feedback loops between users and partners.",
      "curriculum": "Instructional Design & Content Strategy: Developing scalable learning frameworks and educational assets."
    };

    const lowercaseInput = input.toLowerCase();
    const matchedKey = Object.keys(library).find(key => lowercaseInput.includes(key));
    
    setCurrentTranslation(matchedKey ? library[matchedKey] : `Project Implementation & Coordination: Managing the end-to-end lifecycle of ${input} with an outcome-driven focus.`);
  };

  const addToWorkspace = () => {
    if (!currentTranslation) return;
    // Moves the result from the "Engine" into the "Summary" list
    setSavedTranslations([{ legacy: input, tech: currentTranslation }, ...savedTranslations]);
    setInput('');
    setCurrentTranslation('');
  };

  const removeFromWorkspace = (index) => {
    setSavedTranslations(savedTranslations.filter((_, i) => i !== index));
  };

  const downloadMasterLog = () => {
    const content = `
HEARTH & HORIZON: MASTER LINGUISTIC BRIDGE SUMMARY
==================================================
This document contains your translated educator expertise,
re-framed for the technology and corporate sectors.
DATE: ${new Date().toLocaleDateString()}

${savedTranslations.map((item, i) => `
${i + 1}. [LEGACY]: ${item.legacy}
   [TECH-SPEAK]: ${item.tech}
--------------------------------------------------`).join('')}

NEXT STEPS:
- Copy these "Tech-Speak" bullets into your Master Resume.
- Use them to update the "About" and "Experience" sections of your LinkedIn.
==================================================
`;
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Hearth-Horizon-Translation-Summary.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-4xl font-bold text-white font-heading italic">The Linguistic Bridge</h1>
            {savedTranslations.length > 0 && (
                <span className="w-fit bg-teal-500/20 text-teal-400 text-[10px] px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                   <Save className="w-3 h-3" /> Auto-saved to Workspace
                </span>
            )}
        </div>
        <p className="text-gray-400 text-lg max-w-2xl">
          Translate your public-sector tasks into market-ready tech language. Add them to your workspace to build your transition summary.
        </p>
      </header>

      {/* The Translator Engine */}
      <Card className="p-8 bg-[#2D2438]/50 border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          
          {/* Input Area */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-teal-500" /> Legacy Experience
            </label>
            <div className="space-y-3">
               <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1C1622] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
              >
                <option>Education</option>
                <option>Public Health</option>
                <option>Non-Profit</option>
              </select>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='e.g., "IEP development"'
                className="w-full bg-[#1C1622] border border-gray-700 rounded-lg p-4 text-white min-h-[120px] focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>
            <Button onClick={handleTranslate} className="w-full bg-teal-600 hover:bg-teal-500 text-white gap-2 py-6 shadow-lg shadow-teal-900/20">
              <Sparkles className="w-4 h-4" /> Bridge the Gap
            </Button>
          </div>

          <div className="hidden md:block text-teal-500/20">
            <ArrowRightLeft className="w-10 h-10" />
          </div>

          {/* Result Output Area */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-teal-500" /> Tech-Speak Result
            </label>
            <div className="w-full bg-[#1C1622]/50 border-2 border-dashed border-gray-700 rounded-lg p-6 min-h-[225px] flex flex-col items-center justify-center text-center">
              {currentTranslation ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <p className="text-teal-100 text-sm italic leading-relaxed px-2">"{currentTranslation}"</p>
                  <Button onClick={addToWorkspace} className="bg-amber-600 hover:bg-amber-500 text-white gap-2 py-2 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-lg shadow-amber-900/20">
                    <Plus className="w-4 h-4" /> Add to Workspace
                  </Button>
                </motion.div>
              ) : (
                <p className="text-gray-500 text-xs italic max-w-[180px]">
                  Professional translations will appear here once you bridge a task.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* The Bridge Summary / Workspace Workspace */}
      <AnimatePresence>
        {savedTranslations.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white italic font-heading">Your Bridge Summary</h2>
                <p className="text-gray-500 text-sm mt-1">Review your collected translations for your resume update.</p>
              </div>
              <Button onClick={downloadMasterLog} variant="outline" className="border-teal-500 text-teal-400 hover:bg-teal-500/10 gap-2 px-6 h-12">
                <Download className="w-4 h-4" /> Export Summary (.txt)
              </Button>
            </div>
            
            <div className="grid gap-4">
              {savedTranslations.map((item, idx) => (
                <motion.div 
                    layout
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 group hover:border-teal-500/30 transition-all"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em]">Legacy</span>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <p className="text-white font-medium">{item.legacy}</p>
                    <div className="pt-2">
                        <span className="text-[10px] text-teal-400 font-black uppercase tracking-[0.2em]">Tech-Speak</span>
                        <p className="text-gray-300 text-sm leading-relaxed mt-1">{item.tech}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromWorkspace(idx)} 
                    className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                    title="Remove from Workspace"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Static Inspiration Gallery */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold text-white/40 italic font-heading">Inspiration Gallery</h2>
            <span className="text-[10px] uppercase text-gray-600 tracking-widest font-bold italic">Reference Points</span>
        </div>
        <div className="grid grid-cols-1 gap-4 opacity-40 grayscale-[0.5] hover:grayscale-0 transition-all">
          {EXAMPLES.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#1C1622] border border-gray-800">
              <div>
                <span className="text-[10px] text-yellow-600 uppercase font-bold">Legacy</span>
                <p className="text-white/80 text-sm">{item.legacy}</p>
              </div>
              <div className="md:border-l border-gray-800 md:pl-6">
                <span className="text-[10px] text-teal-600 uppercase font-bold">Tech</span>
                <p className="text-gray-400 text-sm">{item.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}