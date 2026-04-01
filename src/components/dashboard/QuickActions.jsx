import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftRight, Target, Heart, Compass, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
  {
    path: '/translator',
    label: 'Linguistic bridges',
    description: 'Translate your service jargon into private-sector value',
    icon: ArrowLeftRight,
    color: 'bg-primary/8 hover:bg-primary/15 border-primary/10',
    iconColor: 'text-primary'
  },
  {
    path: '/gap-analyzer',
    label: 'View the horizon',
    description: 'Discover what stands between you and your next chapter',
    icon: Target,
    color: 'bg-secondary/8 hover:bg-secondary/15 border-secondary/10',
    iconColor: 'text-secondary'
  },
  {
    path: '/identity-anchor',
    label: 'The rootwork',
    description: 'A quiet space to anchor your identity through transition',
    icon: Heart,
    color: 'bg-orange-500/8 hover:bg-orange-500/15 border-orange-500/10',
    iconColor: 'text-orange-600'
  },
  {
    path: '/cultural-fit',
    label: 'The canopy',
    description: 'Filter for ethics, sovereignty, and schedule freedom',
    icon: Compass,
    color: 'bg-blue-500/8 hover:bg-blue-500/15 border-blue-500/10',
    iconColor: 'text-blue-600'
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {actions.map((action, i) => (
        <motion.div
          key={action.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
        >
          <Link
            to={action.path}
            className={`group block p-5 rounded-2xl border transition-all duration-300 ${action.color}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-card/80 ${action.iconColor}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-1">{action.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}