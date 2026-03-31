import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function TranslationCard({ input, results, onRemove }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card className="rounded-2xl overflow-hidden">
      <div className="p-4 bg-accent/50 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Original:</span>
          <span className="text-sm font-semibold text-foreground">"{input}"</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onRemove}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div className="divide-y divide-border">
        {results?.map((r, i) => (
          <div key={i} className="p-4 hover:bg-accent/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRight className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                  <p className="font-semibold text-foreground">{r.translated}</p>
                </div>
                <p className="text-sm text-muted-foreground ml-5 mb-2">{r.corporate_value}</p>
                <div className="flex flex-wrap gap-1.5 ml-5">
                  {r.best_for_roles?.map((role, j) => (
                    <Badge key={j} variant="secondary" className="text-xs font-normal">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => handleCopy(r.translated, i)}
              >
                {copiedIndex === i ? (
                  <Check className="w-3.5 h-3.5 text-secondary" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}