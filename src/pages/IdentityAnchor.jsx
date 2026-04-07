import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, Loader2, Send, RefreshCw, Anchor, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

// Import your sub-components (Ensure these paths are correct!)
import MoodSelector from '../components/anchor/MoodSelector';
import PromptCard from '../components/anchor/PromptCard';
import CheckInHistory from '../components/anchor/CheckInHistory';
import JournalEntry from '../components/rootwork/JournalEntry';

const PROMPTS = [
  "What's one value from your current role that you want to carry into your next chapter?",
  "Describe a moment when you made a real difference in someone's life through your work.",
  "What would you tell your future self about why this transition matters?",
  "Your title doesn't define your worth. What does?",
  "What skill from your public-sector work would surprise a corporate recruiter?",
  "Name three things you're grateful for about your professional journey so far.",
  "It's okay to grieve the identity you're leaving. What will you miss most?",
  "What does 'success' look like to you — beyond salary and title?",
  "Your experience with diverse communities is a superpower. How has it shaped you?",
  "Write a letter to the professional you're becoming.",
];

export default function IdentityAnchor() {
  const [user, setUser] = useState(null);
  useEffect(() => { base44.auth.me().then(setUser).catch(() => {}); }, []);

  const [selectedMood, setSelectedMood] = useState(null);
  const [reflection, setReflection] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(
    PROMPTS[Math.floor(Math.random() * PROMPTS.length)]
  );
  const [aiResponse, setAiResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const { data: checkIns } = useQuery({
    queryKey: ['checkIns'],
    queryFn: () => base44.entities.DailyCheckIn.list('-created_date', 10),
    initialData: [],
  });

  const shufflePrompt = () => {
    const newPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setCurrentPrompt(newPrompt);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    setIsSubmitting(true);

    try {
      const response = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a compassionate career transition coach. A professional is transitioning after 13 years in education. 
        Mood: ${selectedMood}
        Prompt: "${currentPrompt}"
        Reflection: "${reflection}"
        Provide a 2-3 sentence, warm, encouraging response.`,
      });

      setAiResponse(response);

      await base44.entities.DailyCheckIn.create({
        mood: selectedMood,
        reflection: reflection,
        prompt_used: currentPrompt,
        gratitude_note: '',
      });

      queryClient.invalidateQueries({ queryKey: ['checkIns'] });
    } catch (error) {
      console.error("Submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedMood(null);
    setReflection('');
    setAiResponse('');
    shufflePrompt();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 pt-4 px-4">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-orange-400">
          <Anchor className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">The Rootwork</span>
        </div>
        <h1 className="text-4xl font-bold text-white font-heading italic leading-tight">
          Identity Anchors
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          Take a moment to ground yourself. Your value is independent of your title.
        </p>
      </header>

      {/* Main Container */}
      <div className="space-y-6">
        {/* Mood Section */}
        <Card className="p-8 bg-[#1C1622]/60 border-white/5 rounded-3xl backdrop-blur-md">
          <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            How are you feeling today?
          </h2>
          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
        </Card>

        {/* Prompt Section */}
        <PromptCard prompt={currentPrompt} onShuffle={shufflePrompt} />

        {/* Input Section */}
        <Card className="p-8 bg-[#1C1622]/60 border-white/5 rounded-3xl">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 block">
            Your Reflection
          </label>
          <Textarea
            placeholder="There are no wrong answers here..."
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-2xl focus:border-orange-500/50 transition-all text-lg italic"
          />
          <div className="flex justify-end mt-6 gap-3">
            {aiResponse && (
              <Button variant="ghost" onClick={handleReset} className="text-gray-400 hover:text-white gap-2">
                <RefreshCw className="w-4 h-4" /> New Check-In
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={!selectedMood || isSubmitting}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 rounded-xl gap-2 h-12"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Anchor My Reflection
            </Button>
          </div>
        </Card>

        {/* AI Response Area */}
        {aiResponse && (
          <Card className="p-8 bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-orange-400 fill-orange-400/20" />
              </div>
              <h3 className="font-bold text-white">Coach's Reflection</h3>
            </div>
            <p className="text-orange-100/90 text-lg leading-relaxed italic">
              "{aiResponse}"
            </p>
          </Card>
        )}

        {/* Journal and History */}
        {user && <JournalEntry user={user} />}
        <CheckInHistory checkIns={checkIns} />
      </div>
    </div>
  );
}