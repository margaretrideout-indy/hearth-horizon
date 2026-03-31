import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, ShieldCheck, ShieldAlert, FileText } from 'lucide-react';

export default function CultureTranslator() {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a career culture expert helping public-sector professionals evaluate private-sector job descriptions.

Analyze this job description and identify cultural signals:

"${jobDescription}"

Provide:
1. Green Flags: Positive cultural signals that align with public-sector values (community, balance, ethics, growth)
2. Red Flags: Warning signals that might conflict with public-sector ethics
3. Culture Summary: A brief assessment of the company culture based on the language used
4. Decoded Phrases: Translate 3-5 corporate phrases from the description into plain language

Be honest and specific. Don't sugarcoat red flags.`,
      response_json_schema: {
        type: "object",
        properties: {
          green_flags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                signal: { type: "string" },
                meaning: { type: "string" }
              }
            }
          },
          red_flags: {
            type: "array",
            items: {
              type: "object",
              properties: {
                signal: { type: "string" },
                meaning: { type: "string" }
              }
            }
          },
          culture_summary: { type: "string" },
          decoded_phrases: {
            type: "array",
            items: {
              type: "object",
              properties: {
                original: { type: "string" },
                decoded: { type: "string" }
              }
            }
          }
        }
      }
    });

    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary" />
          <h2 className="font-heading font-semibold text-lg">Culture Translator</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Paste a job description and we'll decode the cultural signals — identifying green flags and red flags that matter to you.
        </p>
        <Textarea
          placeholder="Paste a job description here..."
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          className="min-h-[150px] text-sm"
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleAnalyze} disabled={!jobDescription.trim() || isAnalyzing} className="gap-2">
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Analyze Culture
          </Button>
        </div>
      </Card>

      {isAnalyzing && (
        <Card className="p-12 rounded-2xl text-center">
          <Loader2 className="w-8 h-8 animate-spin text-secondary mx-auto mb-4" />
          <p className="font-heading font-semibold">Reading between the lines...</p>
        </Card>
      )}

      {analysis && !isAnalyzing && (
        <div className="space-y-6">
          {/* Culture Summary */}
          <Card className="p-5 rounded-2xl bg-accent/50">
            <h3 className="font-heading font-semibold mb-2">Culture Assessment</h3>
            <p className="text-sm text-foreground leading-relaxed">{analysis.culture_summary}</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Green Flags */}
            <Card className="p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <h3 className="font-heading font-semibold">Green Flags</h3>
                <Badge className="ml-auto bg-secondary/10 text-secondary">{analysis.green_flags?.length || 0}</Badge>
              </div>
              <div className="space-y-3">
                {analysis.green_flags?.map((flag, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                    <p className="text-sm font-medium text-secondary">{flag.signal}</p>
                    <p className="text-xs text-muted-foreground mt-1">{flag.meaning}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Red Flags */}
            <Card className="p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                <h3 className="font-heading font-semibold">Red Flags</h3>
                <Badge className="ml-auto bg-destructive/10 text-destructive">{analysis.red_flags?.length || 0}</Badge>
              </div>
              <div className="space-y-3">
                {analysis.red_flags?.map((flag, i) => (
                  <div key={i} className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                    <p className="text-sm font-medium text-destructive">{flag.signal}</p>
                    <p className="text-xs text-muted-foreground mt-1">{flag.meaning}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Decoded Phrases */}
          <Card className="p-5 rounded-2xl">
            <h3 className="font-heading font-semibold mb-4">Decoded Corporate Phrases</h3>
            <div className="space-y-3">
              {analysis.decoded_phrases?.map((phrase, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-accent/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium">"{phrase.original}"</p>
                  </div>
                  <div className="w-6 flex items-center justify-center text-muted-foreground">→</div>
                  <div className="flex-1">
                    <p className="text-sm text-secondary font-medium">{phrase.decoded}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}