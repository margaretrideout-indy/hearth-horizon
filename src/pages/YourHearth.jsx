import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import BrigidMessage from '../components/hearth/BrigidMessage';
import HearthJournal from '../components/hearth/HearthJournal';
import InstallBanner from '../components/hearth/InstallBanner';
import HearthWelcome from '../components/hearth/HearthWelcome';
import GroveGrid from '../components/hearth/GroveGrid';
import GrowthPath from '../components/hearth/GrowthPath';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YourHearth() {
  const { isAuthenticated } = useAuth();

  const { data: profiles } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list(),
    initialData: [],
    enabled: isAuthenticated,
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
    enabled: isAuthenticated,
  });

  const profile = profiles[0] || null;

  // Seedling welcome: post to logbook on first sign-up
  useEffect(() => {
    if (!user) return;
    const welcomeKey = `hearth_welcomed_${user.id}`;
    if (localStorage.getItem(welcomeKey)) return;
    const firstName = user.full_name?.split(' ')[0] || user.email.split('@')[0];
    base44.entities.RootwerkLog.create({
      user_id: user.id,
      user_email: user.email,
      entry_body: `Welcome to the forest, ${firstName}. You have 2 bridge crossings (PDF uploads) available this month. Your first step is to visit The Rootwork and tell us what you're leaving behind.`,
      sentiment_tag: 'Rooted',
      is_private: true,
    }).then(() => localStorage.setItem(welcomeKey, '1'));
  }, [user]);

  return (
    <div className="space-y-8">
      <InstallBanner />
      <HearthWelcome user={user} />

      {profile?.brigid_checkin_message && (
        <BrigidMessage message={profile.brigid_checkin_message} profileId={profile.id} />
      )}

      <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
        <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
      </Card>

      {/* The Grove — resource grid */}
      <GroveGrid />

      {/* The Canopy — growth path checklist */}
      <GrowthPath />

      {/* The Hearth — two-column journal interface */}
      {user && <HearthJournal user={user} />}

      {/* Grove Banner */}
      <Card className="p-5 rounded-2xl border-secondary/30 bg-secondary/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">The grove — a reciprocity model</p>
          <p className="text-xs text-muted-foreground mt-0.5">One seat purchased sponsors a peer in financial transition. No one gets left behind.</p>
        </div>
        <Button asChild size="sm" variant="outline" className="shrink-0 border-secondary/40 text-secondary hover:bg-secondary/10">
          <Link to="/support">Enter the grove</Link>
        </Button>
      </Card>
    </div>
  );
}