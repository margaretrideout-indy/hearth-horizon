import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Target, Loader2, Sparkles, Search, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GapResults from '../components/gap/GapResults';
import ResumeUploader from '../components/gap/ResumeUploader';
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from '@/components/ui/alert-dialog';
import { Link } from 'react-router-dom';

const ROLE_SUGGESTIONS = [
  'Product Manager', 'Program Manager', 'UX Researcher', 'Learning & Development Manager',
  'Corporate Trainer', 'Curriculum Designer', 'EdTech Specialist', 'HR Business Partner',
  'Change Management Consultant', 'Operations Manager', 'Policy Analyst', 'Data Analyst',
  'Customer Success Manager', 'Community Manager', 'DEI Consultant',
];

const PAID_TIERS = ['Hearthkeeper', 'Steward', 'Patron'];
const SEEDLING_MONTHLY_LIMIT = 2;

export default function HorizonScan() {
  const [dreamRole, setDreamRole] = useState('');
  const [currentSector, setCurrentSector] = useState('education');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const userTier = user?.subscription_tier || 'Seedling';
  const isPaid = PAID_TIERS.includes(userTier);
  const uploadCount = user?.seedling_upload_count || 0;
  const seedlingHasUploadsLeft = uploadCount < SEEDLING_MONTHLY_LIMIT;
  const hasAccess = isPaid || seedlingHasUploadsLeft;

  const handleAnalyze = async () => {
    if (!dreamRole.trim()) return;
    setIsAnalyzing(true);

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a career transition expert. Analyse the skill gap for someone from the ${currentSector} sector who wants to become a "${dreamRole}" in the private sector.

Provide:
1. Top 8 required skills with current and required proficiency levels
2. Top 3 recommended certifications
3. Overall readiness score (0-100)

For each skill, assess what level a ${currentSector} professional typically has and what the target role requires.`,
      response_json_schema: {
        type: "object",
        properties: {
          target_role: { type: "string" },
          readiness_score: { type: "number" },
          required_skills: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                current_level: { type: "string", enum: ["none", "beginner", "intermediate", "advanced"] },
                required_level: { type: "string", enum: ["beginner", "intermediate", "advanced", "expert"] },
                is_gap: { type: "boolean" }
              }
            }
          },
          recommended_certs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                provider: { type: "string" },
                duration: { type: "string" },
                priority: { type: "string", enum: ["high", "medium", "low"] }
              }
            }
          }
        }
      }
    });

    setAnalysis(result);

    await base44.entities.GapAnalysis.create({
      target_role: dreamRole,
      required_skills: result.required_skills,
      recommended_certs: result.recommended_certs,
      readiness_score: result.readiness_score,
    });

    queryClient.invalidateQueries({ queryKey: ['gapAnalyses'] });
    setIsAnalyzing(false);
  };

  const { data: pastAnalyses } = useQuery({
    queryKey: ['gapAnalyses'],
    queryFn: () => base44.entities.GapAnalysis.list('-created_date', 5),
    initialData: [],
  });

  const { data: profiles } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => base44.entities.UserProfile.list(),
    initialData: [],
  });
  const profile = profiles[0] || null;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
          <Flame className="w-7 h-7 text-secondary" />
        </div>
        <div>
          <h1 className="font-heading text-2xl font-semibold mb-2">The Horizon Scan</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The Horizon Scan's complex alignment tools require a Hearthkeeper's flame to operate. Seedling tiers receive two complimentary scans per month. To continue mapping your path, please upgrade your tier.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/support">Upgrade my tier</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
    <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hearthkeeper's flame required</AlertDialogTitle>
          <AlertDialogDescription>
            The Horizon Scan requires a Hearthkeeper's flame to operate. Would you like to upgrade your tier?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not yet</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link to="/support">Upgrade my tier</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium uppercase tracking-wider">Skill gap analysis</p>
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2 italic">The Horizon Scan</h1>
        <p className="text-muted-foreground max-w-2xl">
          Analyse the path between your current roots and your new horizon.
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Current Sector</label>
            <Select value={currentSector} onValueChange={setCurrentSector}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="nonprofit">Non-Profit</SelectItem>
                <SelectItem value="healthcare">Public Healthcare</SelectItem>
                <SelectItem value="social_services">Social Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Your Dream Role</label>
            <Input
              placeholder="e.g., Product Manager"
              value={dreamRole}
              onChange={e => setDreamRole(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            />
          </div>
          <Button onClick={handleAnalyze} disabled={!dreamRole.trim() || isAnalyzing} className="gap-2">
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Initiate Scan
          </Button>
        </div>

        {/* Role suggestions */}
        <div className="mt-4">
          <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-tighter">Popular transitions:</p>
          <div className="flex flex-wrap gap-2">
            {ROLE_SUGGESTIONS.slice(0, 6).map(role => (
              <button
                key={role}
                onClick={() => setDreamRole(role)}
                className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results */}
      {isAnalyzing && (
        <Card className="p-12 rounded-2xl text-center border-dashed border-2">
          <Loader2 className="w-8 h-8 animate-spin text-secondary mx-auto mb-4" />
          <p className="font-heading font-semibold text-lg">Scanning your career horizon...</p>
          <p className="text-sm text-muted-foreground mt-1">Mapping skills, certifications, and readiness</p>
        </Card>
      )}

      {analysis && !isAnalyzing && (
        <GapResults analysis={analysis} />
      )}

      {/* Resume Upload */}
      <Card className="p-6 rounded-2xl border-secondary/20">
        <div className="mb-4">
            <h3 className="font-heading font-semibold text-lg">Upload Legacy Resume</h3>
            <p className="text-xs text-muted-foreground">Scan your current documents to surface embedded corporate language.</p>
        </div>
        <ResumeUploader
          profileId={profile?.id}
          isPaid={isPaid}
          uploadCount={uploadCount}
          onUploadSuccess={() => queryClient.invalidateQueries({ queryKey: ['me'] })}
        />
        {!isPaid && (
          <p className="text-xs text-muted-foreground mt-3">
            {SEEDLING_MONTHLY_LIMIT - uploadCount} Horizon Scan{SEEDLING_MONTHLY_LIMIT - uploadCount !== 1 ? 's' : ''} remaining this month.
          </p>
        )}
      </Card>

      {/* Past Analyses */}
      {pastAnalyses.length > 0 && !analysis && (
        <div className="pt-4">
          <h2 className="font-heading font-semibold text-xl mb-4">Past scans</h2>
          <div className="grid gap-3">
            {pastAnalyses.map(a => (
              <Card
                key={a.id}
                className="p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow border-white/5 bg-white/5"
                onClick={() => setAnalysis(a)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{a.target_role}</p>
                    <p className="text-sm text-muted-foreground">
                      {a.required_skills?.filter(s => s.is_gap).length || 0} gaps identified
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading font-bold text-secondary">{a.readiness_score}%</p>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Readiness</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}