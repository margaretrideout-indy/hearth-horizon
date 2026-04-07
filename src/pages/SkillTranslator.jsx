import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, BookOpen, MessageSquare, ShieldCheck, RefreshCw } from 'lucide-react';

const industryPrompts = {
  Education: [
    "Managed IEP development and parent communication",
    "Designed and implemented year-long curriculum maps",
    "Led grade-level team meetings and collaborative planning",
    "Facilitated restorative justice circles for conflict resolution"
  ],
  "Service Industry": [
    "Coordinated staff schedules and inventory during peak seasons",
    "Resolved high-stakes customer escalations in real-time",
    "Streamlined front-of-house operations to increase turnover",
    "Trained new hires on POS systems and service standards"
  ],
  Healthcare: [
    "Managed patient care plans and multidisciplinary coordination",
    "Maintained 100% compliance with strict HIPAA regulations",
    "Triaged emergency situations in high-pressure environments",
    "Educated families on complex medical procedures and recovery"
  ],
  Trades: [
    "Estimated project timelines and material resource allocation",
    "Supervised onsite safety protocols and vendor coordination",
    "Interpreted blueprints and technical specifications for builds",
    "Mentored apprentices on technical skills and site standards"
  ],
  "Other / General": [
    "Organized community events with multiple stakeholders",
    "Managed personal freelance projects from scope to delivery",
    "Volunteer coordination for local non-profit initiatives",
    "Cross-functional collaboration on long-term goals"
  ]
};

export default function SkillTranslator() {
  const [sourceIndustry, setSourceIndustry] = useState('Education');
  const [legacyTask, setLegacyTask] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [translation, setTranslation] = useState(null);
  const [promptIndex, setPromptIndex] = useState(0);

  const getNewPrompt = () => {
    const prompts = industryPrompts[sourceIndustry];
    setPromptIndex((prev) => (prev + 1) % prompts.length);
    setLegacyTask(prompts[promptIndex]);
  };

  const handleBridge = () => {
    setIsBridging(true);
    // Simulated translation logic for UI testing
    setTimeout(() => {
      setTranslation({
        value: "Operational Strategy & Stakeholder Management",
        resume: "Spearheaded cross-functional project delivery for 30+ stakeholders, ensuring 100% compliance with regulatory standards while optimizing resource allocation.",
        interview: "In my previous role, I didn't just 'manage a group'—I coordinated complex, multi-layered operations where I had to pivot strategies based on real-time data. That’s exactly how I’ll approach your project management needs."
      });
      setIsBridging(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
      <header className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">The Linguistic Bridge</h1>
        <p className="text-gray-400 text-sm font-medium">Decode your legacy experience into the language of your future.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <section className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">
              Your Background
            </label>
            <select 
              value={sourceIndustry}
              onChange={(e) => {
                setSourceIndustry(e.target.value);
                setLegacyTask('');
              }}
              className="w-full bg-[#2D2438]/40 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-teal-500/50 transition-colors appearance-none cursor-pointer"
            >
              {Object.keys(industryPrompts).map(ind => (
                <option key={ind} value={ind} className="bg-[#2D2438]">{ind}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                Legacy Task
              </label>
              <button 
                onClick={getNewPrompt}
                className="text-[9px] font-bold text-teal-400 uppercase flex items-center gap-1.5 hover:text-teal-300 transition-colors"
              >
                <Sparkles className="w-3 h-3" /> Spark an Idea
              </button>
            </div>
            <textarea
              value={legacyTask}
              onChange={(e) => setLegacyTask(e.target.value)}
              placeholder="What is a task that felt like 'just part of the job'?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500/50 min-h-[160px] resize-none leading-relaxed transition-all"
            />
          </div>

          <Button 
            onClick={handleBridge}
            disabled={!legacyTask || isBridging}
            className="w-full py-7 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-2xl gap-3 shadow-lg shadow-teal-900/20 transition-all active:scale-[0.98]"
          >
            {isBridging ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> 
                Constructing the Span...
              </>
            ) : (
              <>
                Bridge the Gap <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </section>

        {/* The Three-Tier Output */}
        <section className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">
            Professional Translation
          </label>
          
          {translation ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500">
              <Card className="p-5 bg-teal-500/10 border-teal-500/20 rounded-3xl group">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Pillar 1: The Value</span>
                </div>
                <p className="text-white font-bold text-lg leading-tight">{translation.value}</p>
              </Card>

              <Card className="p-5 bg-white/5 border-white/10 rounded-3xl hover:bg-white/[0.07] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pillar 2: Resume Bullet</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed italic">"{translation.resume}"</p>
              </Card>

              <Card className="p-5 bg-white/5 border-white/10 rounded-3xl hover:bg-white/[0.07] transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pillar 3: The Narrative</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                  <span className="text-teal-400/80 font-bold block mb-1 uppercase text-[9px]">How to tell the story:</span>
                  {translation.interview}
                </p>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-white/5 bg-white/[0.02] rounded-[2rem] flex flex-col items-center justify-center p-12 text-center group">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <ArrowRight className="w-8 h-8 text-white/10" />
              </div>
              <p className="text-gray-500 text-sm font-medium max-w-[240px] leading-relaxed">
                Input a legacy task from your previous career to generate your professional bridge.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}