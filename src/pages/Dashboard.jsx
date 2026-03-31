import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import RoadmapProgress from '../components/dashboard/RoadmapProgress';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Card } from '@/components/ui/card';

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

      <RecentActivity checkIns={checkIns} />
    </div>
  );
}