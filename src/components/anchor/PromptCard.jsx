import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Quote } from 'lucide-react';

export default function PromptCard({ prompt, onShuffle }) {
  return (
    <Card className="p-6 rounded-2xl bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-16 h-16" />
      </div>
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-widest opacity-70 mb-3">Today's Reflection Prompt</p>
        <p className="font-heading text-xl font-semibold leading-relaxed mb-4 max-w-lg">
          {prompt}
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={onShuffle}
          className="gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> New Prompt
        </Button>
      </div>
    </Card>
  );
}