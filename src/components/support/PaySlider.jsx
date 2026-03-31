import React from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const presets = [1, 2, 3, 5];

export default function PaySlider({ value, onChange }) {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-center gap-1">
        <span className="text-3xl font-heading font-semibold text-foreground">${value}</span>
        <span className="text-muted-foreground mb-1 text-sm">/ one-time</span>
      </div>

      <Slider
        min={1}
        max={5}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />

      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>$1 min</span>
        <span>$5 max</span>
      </div>

      <div className="flex gap-2 justify-center">
        {presets.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
              value === p
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "border-border text-muted-foreground hover:border-secondary/60"
            )}
          >
            ${p}
          </button>
        ))}
      </div>
    </div>
  );
}