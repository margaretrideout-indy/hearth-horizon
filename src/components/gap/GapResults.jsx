import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelValues = { none: 0, beginner: 25, intermediate: 50, advanced: 75, expert: 100 };

const priorityColors = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  low: 'bg-secondary/10 text-secondary border-secondary/20',
};

export default function GapResults({ analysis }) {
  const gaps = analysis.required_skills?.filter(s => s.is_gap) || [];
  const strengths = analysis.required_skills?.filter(s => !s.is_gap) || [];

  return (
    <div className="space-y-6">
      {/* Readiness Score */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-heading text-2xl font-bold">{analysis.target_role}</h2>
            <p className="text-muted-foreground">Transition Readiness Assessment</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-heading font-bold text-secondary">{analysis.readiness_score}%</p>
            <p className="text-xs text-muted-foreground">Ready</p>
          </div>
        </div>
        <Progress value={analysis.readiness_score} className="h-2" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gaps */}
        <Card className="p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <h3 className="font-heading font-semibold">Skills to Develop</h3>
            <Badge variant="secondary" className="ml-auto">{gaps.length}</Badge>
          </div>
          <div className="space-y-3">
            {gaps.map((skill, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.current_level} → {skill.required_level}
                  </span>
                </div>
                <div className="flex gap-1 h-1.5">
                  <div
                    className="rounded-full bg-destructive/30"
                    style={{ width: `${levelValues[skill.current_level]}%` }}
                  />
                  <div
                    className="rounded-full bg-secondary/30"
                    style={{ width: `${levelValues[skill.required_level] - levelValues[skill.current_level]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Strengths */}
        <Card className="p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <h3 className="font-heading font-semibold">Your Strengths</h3>
            <Badge variant="secondary" className="ml-auto">{strengths.length}</Badge>
          </div>
          <div className="space-y-3">
            {strengths.map((skill, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-accent/50">
                <span className="text-sm font-medium">{skill.skill}</span>
                <Badge variant="outline" className="capitalize text-xs">{skill.current_level}</Badge>
              </div>
            ))}
            {strengths.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Strengths will appear as you assess skills</p>
            )}
          </div>
        </Card>
      </div>

      {/* Certifications */}
      <Card className="p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-primary" />
          <h3 className="font-heading font-semibold">Recommended Certifications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.recommended_certs?.map((cert, i) => (
            <div key={i} className="p-4 rounded-xl border border-border hover:shadow-md transition-shadow">
              <Badge className={cn('mb-2', priorityColors[cert.priority])}>
                {cert.priority} priority
              </Badge>
              <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
              <p className="text-xs text-muted-foreground">{cert.provider}</p>
              <p className="text-xs text-muted-foreground mt-1">{cert.duration}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}