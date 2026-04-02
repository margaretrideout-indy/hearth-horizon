import React from 'react';
import { Trees } from 'lucide-react';
import CanopyJobBoard from '../components/canopy/CanopyJobBoard';

export default function Canopy() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Trees className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">The canopy</p>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Curated pathways</h1>
        <p className="text-muted-foreground max-w-xl">
          Roles handpicked for professionals with deep institutional experience. Every listing here values what you've built — not just where you built it.
        </p>
      </div>
      <CanopyJobBoard />
    </div>
  );
}