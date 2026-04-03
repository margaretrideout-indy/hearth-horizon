import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Compass } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EthicsCompass from '../components/culture/EthicsCompass';
import CompanyMatcher from '../components/culture/CompanyMatcher';
import CultureTranslator from '../components/culture/CultureTranslator';

export default function CulturalFit() {
  const queryClient = useQueryClient();

  const { data: valuesProfiles } = useQuery({
    queryKey: ['valuesProfile'],
    queryFn: () => base44.entities.ValuesProfile.list('-created_date', 1),
    initialData: [],
  });

  const valuesProfile = valuesProfiles[0] || null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Ecosystem alignment</p>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Ecosystem alignment</h1>
        <p className="text-muted-foreground max-w-2xl">
          Your next role should feel like home, not just a hustle. Define your values, discover matching organisations, and learn to read between the lines of job postings.
        </p>
      </div>

      <Tabs defaultValue={valuesProfile ? "matcher" : "compass"} className="space-y-6">
        <div
          style={{
            overflowX: 'scroll',
            display: 'flex',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          <TabsList className="bg-muted h-auto p-1 w-max" style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap' }}>
            <TabsTrigger value="compass" style={{ flexShrink: 0, whiteSpace: 'nowrap', minWidth: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}>Ethics Compass</TabsTrigger>
            <TabsTrigger value="matcher" style={{ flexShrink: 0, whiteSpace: 'nowrap', minWidth: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}>Company Matcher</TabsTrigger>
            <TabsTrigger value="translator" style={{ flexShrink: 0, whiteSpace: 'nowrap', minWidth: 'max-content', paddingLeft: '16px', paddingRight: '16px' }}>Culture Translator</TabsTrigger>
          </TabsList>
          {/* Gradient fade hint */}
          <div style={{
            position: 'sticky',
            right: 0,
            top: 0,
            bottom: 0,
            width: '32px',
            background: 'linear-gradient(to right, transparent, hsl(var(--background)))',
            pointerEvents: 'none',
            flexShrink: 0,
          }} />
        </div>

        <TabsContent value="compass">
          <EthicsCompass
            existing={valuesProfile}
            onSave={() => queryClient.invalidateQueries({ queryKey: ['valuesProfile'] })}
          />
        </TabsContent>

        <TabsContent value="matcher">
          <CompanyMatcher valuesProfile={valuesProfile} />
        </TabsContent>

        <TabsContent value="translator">
          <CultureTranslator />
        </TabsContent>
      </Tabs>
    </div>
  );
}