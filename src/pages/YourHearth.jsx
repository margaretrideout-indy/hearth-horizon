import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import BrigidMessage from '../components/hearth/BrigidMessage';
import HearthJournal from '../components/hearth/HearthJournal';
import HeroSection from '../components/landing/HeroSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YourHearth() {
  const { isAuthenticated, navigateToLogin } = useAuth();

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

  if (!isAuthenticated) {
    return (
      <div className="space-y-0">
        {/* Hero Section */}
        <HeroSection onCTA={navigateToLogin} />

        {/* The Forest — public preview of dashboard features */}
        <div className="bg-background px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Explore the Forest</h2>
              <p className="text-muted-foreground">Get a glimpse of what awaits inside</p>
            </div>

            {/* Forest Sections Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* The Grove */}
              <Card className="p-6 rounded-2xl border-border/50 hover:border-secondary/30 transition-all cursor-pointer" onClick={navigateToLogin}>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">The Grove</h3>
                  <p className="text-sm text-muted-foreground">A reciprocity model where your contribution sponsors a peer seat. No one gets left behind.</p>
                </div>
              </Card>

              {/* The Canopy */}
              <Card className="p-6 rounded-2xl border-border/50 hover:border-primary/30 transition-all cursor-pointer" onClick={navigateToLogin}>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">The Canopy</h3>
                  <p className="text-sm text-muted-foreground">Curated job board and pathways for experienced professionals seeking autonomy and impact.</p>
                </div>
              </Card>

              {/* The Embers */}
              <Card className="p-6 rounded-2xl border-border/50 hover:border-accent/30 transition-all cursor-pointer" onClick={navigateToLogin}>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">The Embers</h3>
                  <p className="text-sm text-muted-foreground">A community campfire where members share reflections, lessons, and support on their journeys.</p>
                </div>
              </Card>
            </div>

            <div className="text-center text-sm text-muted-foreground/70">
              Click any section above to explore (login required)
            </div>
          </div>
        </div>

        {/* Founding Forest CTA */}
        <div className="bg-background px-4 py-12 md:py-16">
          <Card className="p-8 rounded-2xl border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="max-w-2xl mx-auto space-y-4 text-center">
              <h2 className="font-heading text-3xl font-semibold text-foreground">Join the Founding Forest</h2>
              <p className="text-muted-foreground text-lg">
                Be among the first to access Hearth & Horizon at our legacy founding member rate. Limited to the first 25 members.
              </p>
              <Button onClick={navigateToLogin} size="lg" className="w-full sm:w-auto gap-2 mt-2">
                <Heart className="w-4 h-4" />
                Join the Founding Forest
              </Button>
              <p className="text-xs text-muted-foreground/70 italic">
                Founding rate locked for the first 25 members. After that, standard pricing applies.
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <WelcomeHeader profile={profile} />

      {profile?.brigid_checkin_message && (
        <BrigidMessage message={profile.brigid_checkin_message} profileId={profile.id} />
      )}

      <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
        <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
      </Card>

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