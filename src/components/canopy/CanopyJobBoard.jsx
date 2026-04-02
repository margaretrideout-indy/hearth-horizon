import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, ArrowUpRight, Trees, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const JOBS = [
  {
    id: 1,
    title: 'Linguistic Data Analyst',
    org: 'Duolingo Canada',
    location: 'Remote (Canada)',
    type: 'Full-time',
    tags: ['Data & Language', 'EdTech'],
    description: 'Analyse linguistic datasets to improve adaptive learning models. Ideal for educators with assessment design experience.',
    salary: '$72,000 – $88,000 CAD',
  },
  {
    id: 2,
    title: 'EdTech Programme Manager',
    org: 'D2L (Brightspace)',
    location: 'Remote (Canada)',
    type: 'Full-time',
    tags: ['Programme Management', 'Education'],
    description: 'Lead cross-functional delivery of digital learning programmes. Curriculum strategists and school administrators are strongly encouraged to apply.',
    salary: '$85,000 – $105,000 CAD',
  },
  {
    id: 3,
    title: 'Learning & Development Lead',
    org: 'Shopify',
    location: 'Remote (Canada)',
    type: 'Full-time',
    tags: ['L&D', 'People Operations'],
    description: 'Design and scale internal learning experiences for 10,000+ employees. Public-sector training specialists bring a rare systems perspective to this role.',
    salary: '$95,000 – $120,000 CAD',
  },
];

export default function CanopyJobBoard() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <Trees className="w-4 h-4 text-secondary" />
        <p className="text-sm text-secondary font-medium">The canopy — curated roles</p>
      </div>
      <p className="text-xs text-muted-foreground -mt-3">
        Roles selected for alignment with public-sector expertise. Remote (Canada) only.
      </p>

      <div className="space-y-4">
        {JOBS.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onHoverStart={() => setHovered(job.id)}
            onHoverEnd={() => setHovered(null)}
            className="relative rounded-2xl border border-border/40 p-5 transition-all duration-300 overflow-hidden"
            style={{
              background: hovered === job.id
                ? 'hsl(280 22% 20% / 0.95)'
                : 'hsl(280 20% 18% / 0.7)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Subtle glow on hover */}
            {hovered === job.id && (
              <div className="absolute inset-0 rounded-2xl border border-secondary/20 pointer-events-none" />
            )}

            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground text-base leading-tight">{job.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{job.org}</p>
              </div>
              <a
                href="#"
                className="shrink-0 w-8 h-8 rounded-lg bg-secondary/10 hover:bg-secondary/20 flex items-center justify-center transition-colors"
                title="View listing"
              >
                <ArrowUpRight className="w-4 h-4 text-secondary" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{job.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-xs border-border/50 gap-1 py-0.5">
                <MapPin className="w-3 h-3" />
                {job.location}
              </Badge>
              <Badge variant="outline" className="text-xs border-border/50 gap-1 py-0.5">
                <Briefcase className="w-3 h-3" />
                {job.type}
              </Badge>
              {job.tags.map(tag => (
                <Badge key={tag} className="text-xs bg-secondary/10 text-secondary border-none py-0.5">
                  {tag}
                </Badge>
              ))}
              <Badge className="ml-auto text-xs bg-secondary/15 text-secondary border-secondary/20 gap-1 py-0.5 shrink-0">
                <DollarSign className="w-3 h-3" />
                {job.salary}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}