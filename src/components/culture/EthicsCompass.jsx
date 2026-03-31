import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Loader2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const VALUES = [
  { id: 'community_impact', label: 'Community Impact', emoji: '🌍', description: 'Making a difference in communities' },
  { id: 'diversity_inclusion', label: 'Diversity & Inclusion', emoji: '🤝', description: 'Equitable and diverse workplace' },
  { id: 'work_life_balance', label: 'Work-Life Balance', emoji: '⚖️', description: 'Sustainable pace and boundaries' },
  { id: 'mentorship_culture', label: 'Mentorship Culture', emoji: '🌱', description: 'Growth through guidance' },
  { id: 'flat_hierarchy', label: 'Flat Hierarchy', emoji: '🏛️', description: 'Accessible leadership' },
  { id: 'ethical_practices', label: 'Ethical Practices', emoji: '🛡️', description: 'Transparent and honest business' },
  { id: 'innovation', label: 'Innovation Focus', emoji: '💡', description: 'Creativity and forward thinking' },
  { id: 'mission_driven', label: 'Mission-Driven', emoji: '🎯', description: 'Purpose beyond profit' },
  { id: 'collaborative', label: 'Collaborative Environment', emoji: '👥', description: 'Teamwork over competition' },
  { id: 'professional_dev', label: 'Professional Development', emoji: '📚', description: 'Investment in growth' },
  { id: 'sustainability', label: 'Environmental Sustainability', emoji: '🌿', description: 'Eco-conscious operations' },
  { id: 'remote_flexibility', label: 'Remote Flexibility', emoji: '🏠', description: 'Location independence' },
];

export default function EthicsCompass({ existing, onSave }) {
  const [selected, setSelected] = useState(existing?.non_negotiables || []);
  const [isSaving, setIsSaving] = useState(false);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (selected.length === 0) return;
    setIsSaving(true);

    if (existing) {
      await base44.entities.ValuesProfile.update(existing.id, { non_negotiables: selected });
    } else {
      await base44.entities.ValuesProfile.create({ non_negotiables: selected });
    }

    onSave();
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-semibold text-lg">Your Non-Negotiables</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Select the values you won't compromise on. These will guide your company matching and help you identify red flags in job descriptions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VALUES.map((value, i) => {
            const isSelected = selected.includes(value.id);
            return (
              <motion.button
                key={value.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggle(value.id)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                  isSelected
                    ? "border-secondary bg-secondary/10 shadow-sm"
                    : "border-transparent bg-card hover:border-border"
                )}
              >
                <span className="text-xl">{value.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{value.label}</p>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selected.length} value{selected.length !== 1 ? 's' : ''} selected
          </p>
          <Button onClick={handleSave} disabled={selected.length === 0 || isSaving} className="gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Save Non-Negotiables
          </Button>
        </div>
      </Card>
    </div>
  );
}