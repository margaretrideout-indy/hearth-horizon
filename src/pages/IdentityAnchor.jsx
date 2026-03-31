import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Heart, Loader2, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import MoodSelector from '../components/anchor/MoodSelector';
import PromptCard from '../components/anchor/PromptCard';
import CheckInHistory from '../components/anchor/CheckInHistory';

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

    // Get supportive AI response
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a compassionate career transition coach. A public-sector professional is going through a career change and just did a check-in.

Their mood: ${selectedMood}
The prompt they reflected on: "${currentPrompt}"
Their reflection: "${reflection}"

Provide a brief (2-3 sentences), warm, and encouraging response that validates their feelings and gently guides them forward. Be specific to their words. Do not use generic platitudes.`,
    });

    setAiResponse(response);

    await base44.entities.DailyCheckIn.create({
      mood: selectedMood,
      reflection: reflection,
      prompt_used: currentPrompt,
      gratitude_note: '',
    });

    queryClient.invalidateQueries({ queryKey: ['checkIns'] });
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setReflection('');
    setAiResponse('');
    shufflePrompt();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Psychology-Led Support</p>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Identity Anchor</h1>
        <p className="text-muted-foreground max-w-2xl">
          Career transitions aren't just professional — they're deeply personal. Take a moment to ground yourself in who you are and who you're becoming.
        </p>
      </div>

      {/* Mood Check */}
      <Card className="p-6 rounded-2xl">
        <h2 className="font-heading font-semibold text-lg mb-4">How are you feeling today?</h2>
        <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
      </Card>

      {/* Prompt & Reflection */}
      <PromptCard prompt={currentPrompt} onShuffle={shufflePrompt} />

      <Card className="p-6 rounded-2xl">
        <label className="text-sm font-medium mb-3 block">Your Reflection</label>
        <Textarea
          placeholder="Take your time. There are no wrong answers here..."
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          className="min-h-[120px] text-base resize-none"
        />
        <div className="flex justify-end mt-4 gap-3">
          {aiResponse && (
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCw className="w-4 h-4" /> New Check-In
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood || isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Check-In
          </Button>
        </div>
      </Card>

      {/* AI Response */}
      {aiResponse && (
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-secondary/5 to-accent/50 border-secondary/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <Heart className="w-4 h-4 text-secondary" />
            </div>
            <p className="font-heading font-semibold">Your Anchor Response</p>
          </div>
          <p className="text-foreground leading-relaxed">{aiResponse}</p>
        </Card>
      )}

      {/* History */}
      <CheckInHistory checkIns={checkIns} />
    </div>
  );
}