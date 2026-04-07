import React from 'react';
import { 
  ArrowLeftRight, 
  Binoculars, 
  Heart, 
  Compass, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const ACTIONS = [
  {
    title: "The Linguistic Bridge",
    desc: "Translate your institutional wisdom into private-sector value.",
    icon: ArrowLeftRight,
    path: "/translator",
    color: "text-teal-400",
    bg: "bg-teal-500/10"
  },
  {
    title: "Horizon Scan",
    desc: "Analyse the path between your current roots and your new horizon.",
    icon: Binoculars,
    path: "/gap-analyzer",
    color: "text-sky-400",
    bg: "bg-sky-500/10"
  },
  {
    title: "The Rootwork",
    desc: "A quiet space to anchor your identity through transition.",
    icon: Heart,
    path: "/identity-anchor", // This line is the key fix
    color: "text-orange-400",
    bg: "bg-orange-500/10"
  },
  {
    title: "Ecosystem Alignment",
    desc: "Filter for ethics, schedule sovereignty, and organisational values.",
    icon: Compass,
    path: "/cultural-fit",
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ACTIONS.map((action) => (
        <Link key={action.title} to={action.path} className="group no-underline">
          <Card className="p-6 h-full bg-[#2D2438]/40 border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 relative overflow-hidden">
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center shrink-0`}>
                <action.icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white group-hover:text-teal-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {action.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-500 uppercase tracking-widest pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Path <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}