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
        <TabsList className="bg-muted w-full sm:w-auto grid grid-cols-3 sm:flex">
          <TabsTrigger value="compass">Ethics Compass</TabsTrigger>
          <TabsTrigger value="matcher">Company Matcher</TabsTrigger>
          <TabsTrigger value="translator">Culture Translator</TabsTrigger>
        </TabsList>

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