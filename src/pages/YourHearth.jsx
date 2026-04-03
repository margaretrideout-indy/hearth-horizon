import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import LogbookPanel from '../components/hearth/LogbookPanel';
import BrigidMessage from '../components/hearth/BrigidMessage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function YourHearth() {
  const { data: profiles } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list(),
    initialData: [],
  });

  const { data: checkIns } = useQuery({
    queryKey: ['recentCheckIns'],
    queryFn: () => base44.entities.DailyCheckIn.list('-created_date', 5),
    initialData: [],
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const profile = profiles[0] || null;

  return (
    <div className="space-y-8">
      <WelcomeHeader profile={profile} />

      {/* Brigid's check-in message if present */}
      {profile?.brigid_checkin_message && (
        <BrigidMessage message={profile.brigid_checkin_message} profileId={profile.id} />
      )}

      <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
        <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
      </Card>

      <div>
        <h2 className="font-heading font-semibold text-xl mb-4">Tend the fire</h2>
        <QuickActions />
      </div>

      {/* Logbook */}
      {user && <LogbookPanel user={user} />}

      <RecentActivity checkIns={checkIns} />

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