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
    <div className="space-y-10 pb-10">
      <WelcomeHeader profile={profile} />

      <Card className="p-8 bg-[#2D2438]/40 border-white/5 rounded-3xl backdrop-blur-sm">
        <RoadmapProgress currentStage={profile?.roadmap_stage || 'discovery'} />
      </Card>

      <section>
        <h2 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6 px-1">
          Tend the fire
        </h2>
        <QuickActions />
      </section>

      <TargetUsers />

      <RecentActivity checkIns={checkIns} />

      <Card className="p-6 rounded-3xl border-white/5 bg-gradient-to-r from-orange-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center shrink-0">
          <Heart className="w-5 h-5 text-orange-400" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-white tracking-tight">The grove — a reciprocity model</p>
          <p className="text-xs text-gray-400 mt-1">One seat purchased sponsors a peer in financial transition. No one gets left behind.</p>
        </div>
        <Button asChild variant="outline" className="shrink-0 border-white/10 hover:bg-white/5 text-white rounded-xl">
          <Link to="/support">Enter the grove</Link>
        </Button>
      </Card>
    </div>
  );
}