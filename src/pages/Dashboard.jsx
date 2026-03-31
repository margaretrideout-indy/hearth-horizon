import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import TargetUsers from '../components/dashboard/TargetUsers';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
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

  const profile = profiles[0] || null;

  return (
    <div className="space-y-8">
      <WelcomeHeader profile={profile} />

      <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
        <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
      </Card>

      <div>
        <h2 className="font-heading font-semibold text-xl mb-4">Continue Your Journey</h2>
        <QuickActions />
      </div>

      <TargetUsers />

      <RecentActivity checkIns={checkIns} />

      {/* Support Banner */}
      <Card className="p-5 rounded-2xl border-secondary/30 bg-secondary/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
          <Heart className="w-4 h-4 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">Keep Pivot Path accessible</p>
          <p className="text-xs text-muted-foreground mt-0.5">Pay what you can, or sponsor a seat for someone who can't.</p>
        </div>
        <Button asChild size="sm" variant="outline" className="shrink-0 border-secondary/40 text-secondary hover:bg-secondary/10">
          <Link to="/support">Support us</Link>
        </Button>
      </Card>
    </div>
  );
}