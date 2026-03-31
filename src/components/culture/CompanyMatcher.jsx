import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Building2, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CompanyMatcher({ valuesProfile }) {
  const [matches, setMatches] = useState(valuesProfile?.company_matches || []);
  const [isLoading, setIsLoading] = useState(false);

  const generateMatches = async () => {
    if (!valuesProfile?.non_negotiables?.length) return;
    setIsLoading(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a career culture expert. A public-sector professional has these non-negotiable values: ${valuesProfile.non_negotiables.join(', ')}.

Generate 5 "Company Archetypes" that match their values. Each archetype should represent a type of company, not a specific company.

For each archetype, provide:
- A descriptive archetype name (e.g., "Mission-Driven EdTech", "B-Corp Social Enterprise")
- A match score (70-98)
- A brief description of why this fits
- 3 real-world example companies

Focus on companies that would appeal to someone with public-sector ethics. Steer away from aggressive growth-at-all-costs cultures.`,
      response_json_schema: {
        type: "object",
        properties: {
          archetypes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                archetype: { type: "string" },
                match_score: { type: "number" },
                description: { type: "string" },
                examples: { type: "array", items: { type: "string" } }
              }
            }
          }
        }
      }
    });

    const newMatches = result.archetypes || [];
    setMatches(newMatches);

    await base44.entities.ValuesProfile.update(valuesProfile.id, {
      company_matches: newMatches,
    });

    setIsLoading(false);
  };

  if (!valuesProfile?.non_negotiables?.length) {
    return (
      <Card className="p-8 rounded-2xl text-center border-dashed">
        <Building2 className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
        <p className="font-heading font-semibold text-lg mb-1">Complete Your Ethics Compass First</p>
        <p className="text-sm text-muted-foreground">Select your non-negotiable values to unlock company matching.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading font-semibold text-lg">Company DNA Matcher</h2>
            <p className="text-sm text-muted-foreground">
              Based on your {valuesProfile.non_negotiables.length} non-negotiable values
            </p>
          </div>
          <Button onClick={generateMatches} disabled={isLoading} className="gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {matches.length > 0 ? 'Refresh Matches' : 'Find Matches'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {valuesProfile.non_negotiables.map(v => (
            <Badge key={v} variant="secondary" className="capitalize text-xs">
              {v.replace(/_/g, ' ')}
            </Badge>
          ))}
        </div>
      </Card>

      {isLoading && (
        <Card className="p-12 rounded-2xl text-center">
          <Loader2 className="w-8 h-8 animate-spin text-secondary mx-auto mb-4" />
          <p className="font-heading font-semibold">Finding your ideal company types...</p>
        </Card>
      )}

      {!isLoading && matches.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 rounded-2xl h-full hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-sm">{match.archetype}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-secondary fill-secondary" />
                    <span className="text-sm font-semibold text-secondary">{match.match_score}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{match.description}</p>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">Examples:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {match.examples?.map((ex, j) => (
                      <Badge key={j} variant="outline" className="text-xs font-normal">{ex}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}