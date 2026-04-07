import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Sparkles, Lightbulb, BookOpen, Download } from 'lucide-react';
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
  const [translation, setTranslation] = useState('');

  // 1. Logic to handle the "Translation" (Simulated for now)
  const handleTranslate = () => {
    if (!input) return;
    // This is where your AI or logic would go. For now, it shows the "Worksheet" is active.
    setTranslation(`[Translated Tech-Speak for: ${input}]`);
  };

  // 2. Logic to Download the Worksheet
  const downloadWorksheet = () => {
    const content = `
HEARTH & HORIZON: LINGUISTIC BRIDGE WORKSHEET
==========================================
DATE: ${new Date().toLocaleDateString()}
ORIGINAL ROLE: ${role}
EDUCATOR TASK: ${input}
TECH-READY TRANSLATION: ${translation}
==========================================
Keep this for your Master Resume and LinkedIn profile.
    `;
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Linguistic-Bridge-Worksheet.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white font-heading">The Linguistic Bridge</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Thirteen years of institutional wisdom doesn't disappear — it transforms. 
          Use the engine below to bridge the gap between your history and your tech horizon.
        </p>
      </div>

      {/* Primary Engine (Interactive Worksheet) */}
      <Card className="p-8 bg-[#2D2438]/50 border-teal-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-teal-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Input Side */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-teal-500" /> Your Public-Sector Task
            </label>
            <div className="space-y-2">
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#1C1622] border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option>Education</option>
                <option>Public Health</option>
                <option>Non-Profit</option>
              </select>
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='e.g., "IEP development and implementation"'
                className="w-full bg-[#1C1622] border-gray-700 rounded-lg p-4 text-white min-h-[120px] focus:ring-2 focus:ring-teal-500 transition-all outline-none"
              />
            </div>
            <Button 
              onClick={handleTranslate}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white gap-2 py-6 text-base"
            >
              <Sparkles className="w-4 h-4" /> Translate Skill
            </Button>
          </div>

          {/* Icon */}
          <div className="hidden md:flex flex-col items-center justify-center">
             <div className="p-3 rounded-full bg-teal-500/20 text-teal-500">
               <ArrowRightLeft className="w-6 h-6" />
             </div>
          </div>

          {/* Output Side */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-teal-500" /> Market-Ready Translation
            </label>
            <div className="w-full bg-[#1C1622]/50 border-2 border-dashed border-gray-700 rounded-lg p-8 min-h-[220px] flex flex-col items-center justify-center text-center">
              {translation ? (
                <div className="space-y-6">
                  <p className="text-teal-100 leading-relaxed font-medium">
                    {translation}
                  </p>
                  {/* The Download Button: Only shows when a translation exists */}
                  <Button 
                    variant="outline" 
                    onClick={downloadWorksheet}
                    className="border-teal-500/50 text-teal-400 hover:bg-teal-500/10 gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Worksheet
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Your translated skills will appear here once you anchor your legacy language.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Examples Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-white italic font-heading">Common Conversions</h2>
          <span className="text-xs uppercase text-teal-500 tracking-widest font-bold">Shedding light on hidden expertise</span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {EXAMPLES.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-[#1C1622] border border-gray-800 hover:border-teal-500/50 transition-all group"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-yellow-500/70 uppercase font-bold tracking-tighter">Legacy Language</span>
                <p className="text-white font-medium group-hover:text-teal-400 transition-colors">{item.legacy}</p>
              </div>
              <div className="space-y-1 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] text-teal-500 uppercase font-bold tracking-tighter">Tech Language</span>
                <p className="text-gray-300 text-sm leading-relaxed">{item.tech}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center pt-4">
          <p className="text-gray-500 text-sm italic">
            Don't see your specific task? Type it into the engine above.
          </p>
        </div>
      </div>
    </div>
  );
}