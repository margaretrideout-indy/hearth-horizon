import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import BrigidMessage from '../components/hearth/BrigidMessage';
import HearthJournal from '../components/hearth/HearthJournal';
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
      <div className="space-y-8">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-secondary font-medium mb-1">Welcome to</p>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-3">Hearth & Horizon</h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
              A sanctuary and toolkit for public-sector professionals grounding their history and mapping their horizon. Find your footing, translate your value, and build a bridge to your new horizon — without losing who you are.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <Button onClick={navigateToLogin} className="gap-2">
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
            <Button onClick={navigateToLogin} variant="outline">
              Create Account
            </Button>
          </div>
        </div>

        <Card className="p-6 rounded-2xl border-border/50 bg-card/50">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold">Join the Founding Forest</h2>
            <p className="text-muted-foreground">
              Be part of a community building a new way forward. Limited founding member spots at legacy rates.
            </p>
            <Button onClick={navigateToLogin} size="lg" className="w-full gap-2">
              <Heart className="w-4 h-4" />
              Join the Founding Forest
            </Button>
          </div>
        </Card>
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