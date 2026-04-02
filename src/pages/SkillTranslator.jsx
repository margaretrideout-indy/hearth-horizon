import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Plus, Sparkles, Loader2, Building2, Briefcase, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TranslationCard from '../components/translator/TranslationCard';

const SECTOR_OPTIONS = [
  { value: 'education', label: 'Education' },
  { value: 'government', label: 'Government' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'healthcare', label: 'Public Healthcare' },
  { value: 'social_services', label: 'Social Services' },
];

export default function SkillTranslator() {
  const [sector, setSector] = useState('education');
  const [taskInput, setTaskInput] = useState('');
  const [translations, setTranslations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!taskInput.trim()) return;
    setIsLoading(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a career transition expert specializing in helping ${sector} professionals move to the private sector.

Translate this public-sector task/skill into private-sector market-ready language:
Task: "${taskInput}"
Sector: ${sector}

Provide 3 different translations that would resonate with corporate recruiters. For each, explain the value it communicates.`,
      response_json_schema: {
        type: "object",
        properties: {
          translations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                original: { type: "string" },
                translated: { type: "string" },
                corporate_value: { type: "string" },
                best_for_roles: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      }
    });

    setTranslations(prev => [
      { id: Date.now(), input: taskInput, results: result.translations },
      ...prev
    ]);
    setTaskInput('');
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Jargon-to-value engine</p>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">The linguistic bridge</h1>
        <p className="text-muted-foreground max-w-2xl">
          Thirteen years of institutional wisdom doesn't disappear — it transforms. Here is how your sector speaks, and what the private world hears.
        </p>
      </div>

      {/* Translation Input */}
      <Card className="p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
          {/* Left: Public Sector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-medium">Your Public-Sector Task</label>
            </div>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="mb-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTOR_OPTIONS.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder='e.g., "IEP development and implementation"'
              value={taskInput}
              onChange={e => setTaskInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTranslate()}
              className="text-base"
            />
          </div>

          {/* Center: Arrow */}
          <div className="hidden md:flex items-center justify-center pb-2">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Right: Private Sector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-medium">Market-Ready Translation</label>
            </div>
            <div className="h-[88px] rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground/50 text-sm">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating your expertise...
                </div>
              ) : translations.length > 0 ? (
                <p className="px-4 text-center text-secondary font-medium">
                  {translations[0].results[0]?.translated}
                </p>
              ) : (
                'Your translated skills appear here'
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            onClick={handleTranslate}
            disabled={!taskInput.trim() || isLoading}
            className="gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Translate skill
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-xs"
            onClick={() => setTaskInput('Classroom Management')}
          >
            Try an example
          </Button>
        </div>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {translations.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: i * 0.05 }}
          >
            <TranslationCard
              input={t.input}
              results={t.results}
              onRemove={() => setTranslations(prev => prev.filter(item => item.id !== t.id))}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}