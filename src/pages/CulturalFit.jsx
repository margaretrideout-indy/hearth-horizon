import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Compass, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
// TabsList and TabsTrigger replaced with custom responsive nav
import EthicsCompass from '../components/culture/EthicsCompass';
import CompanyMatcher from '../components/culture/CompanyMatcher';
import CultureTranslator from '../components/culture/CultureTranslator';

const TAB_ITEMS = [
  { value: 'compass', label: 'Ethics Compass' },
  { value: 'matcher', label: 'Company Matcher' },
  { value: 'translator', label: 'Culture Translator' },
];

export default function CulturalFit() {
  const queryClient = useQueryClient();

  const { data: valuesProfiles } = useQuery({
    queryKey: ['valuesProfile'],
    queryFn: () => base44.entities.ValuesProfile.list('-created_date', 1),
    initialData: [],
  });

  const valuesProfile = valuesProfiles[0] || null;
  const [activeTab, setActiveTab] = useState(valuesProfile ? 'matcher' : 'compass');

  return (
    <div className="space-y-8" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Mobile/Tablet: vertical stack (under lg) */}
        <div className="flex lg:hidden flex-col gap-3 w-full">
          {TAB_ITEMS.map(item => {
            const isActive = activeTab === item.value;
            return (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className="flex items-center justify-between w-full rounded-xl text-sm font-medium transition-all"
                style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  background: isActive ? 'hsla(280, 50%, 35%, 0.25)' : 'hsla(280, 20%, 18%, 0.5)',
                  boxShadow: isActive ? '0 0 14px 0 hsla(280, 65%, 55%, 0.2)' : 'none',
                  color: isActive ? 'hsl(183, 80%, 70%)' : 'hsl(270, 15%, 70%)',
                  border: isActive ? '1px solid hsla(280, 50%, 55%, 0.3)' : '1px solid hsla(280, 20%, 30%, 0.3)',
                  borderLeftWidth: '3px',
                  borderLeftColor: isActive ? 'hsl(var(--secondary))' : 'transparent',
                }}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Desktop: horizontal scroll tabs */}
        <div
          className="hidden lg:flex [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX: 'scroll',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
          }}
        >
          <div
            className="h-auto p-1 rounded-lg w-max"
            style={{ display: 'flex', gap: '12px', flexWrap: 'nowrap', background: 'hsl(var(--muted))' }}
          >
            {TAB_ITEMS.map(item => {
              const isActive = activeTab === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className="rounded-md text-sm font-medium transition-all"
                  style={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    minWidth: 'max-content',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '6px',
                    paddingBottom: '6px',
                    background: isActive ? 'hsl(var(--background))' : 'transparent',
                    color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div style={{
            position: 'sticky', right: 0, top: 0, bottom: 0, width: '32px',
            background: 'linear-gradient(to right, transparent, hsl(var(--background)))',
            pointerEvents: 'none', flexShrink: 0,
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