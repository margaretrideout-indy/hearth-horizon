import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Stripe Payment Links
// const LINK_HEARTHKEEPER = 'https://buy.stripe.com/00w00jdy0gCz0DWaG6dAk00';
const LINK_STEWARD = 'https://buy.stripe.com/eVq14n2Tm4TR4UcaG6dAk01';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

export default function Gateway() {
  const handleLoginClick = () => {
    import('@/api/base44Client').then(m => {
      m.base44.auth.redirectToLogin('/hearth');
    });
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient background with forest/earth tones */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, 
              hsl(280, 25%, 15%) 0%,
              hsl(183, 40%, 20%) 50%,
              hsl(35, 50%, 18%) 100%)`,
          }}
        />

        {/* Subtle organic shapes for depth */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(183, 80%, 38%)' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'hsl(35, 85%, 65%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-32 space-y-8">
          {/* Header Navigation - Fixed at top right */}
          <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
            <Link to="/install" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Install App
            </Link>
            <Button onClick={handleLoginClick} variant="outline" size="sm">
              Log In
            </Button>
          </div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Ground your history.
              <br />
              <span style={{ color: 'hsl(183, 80%, 55%)' }}>Map your horizon.</span>
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl"
          >
            A sanctuary for public-sector professionals to anchor years of wisdom and find a high-autonomy ecosystem—without losing who they are.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4"
          >
            <Button asChild size="lg" className="gap-2 h-12 px-8 text-base font-medium">
              <a href={LINK_STEWARD} target="_blank" rel="noopener noreferrer">
                Join the Founding Forest
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>

          {/* Founder Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs text-muted-foreground/60 italic pt-8"
            style={{ borderTop: '1px solid hsl(280, 15%, 26%)' }}
          >
            Founded by Margaret, M.Ed. | 13 Years of Leadership
          </motion.p>
        </div>
      </div>

      {/* The Forest — public preview of dashboard features */}
      <div className="bg-background px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">Explore the Forest</h2>
            <p className="text-muted-foreground">Get a glimpse of what awaits inside</p>
          </div>

          {/* Forest Sections Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The Grove */}
            <Card className="p-6 rounded-2xl border-border/50 hover:border-secondary/30 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">The Grove</h3>
                <p className="text-sm text-muted-foreground">A reciprocity model where your contribution sponsors a peer seat. No one gets left behind.</p>
              </div>
            </Card>

            {/* The Canopy */}
            <Card className="p-6 rounded-2xl border-border/50 hover:border-primary/30 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">The Canopy</h3>
                <p className="text-sm text-muted-foreground">Curated job board and pathways for experienced professionals seeking autonomy and impact.</p>
              </div>
            </Card>

            {/* The Embers */}
            <Card className="p-6 rounded-2xl border-border/50 hover:border-accent/30 transition-all">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">The Embers</h3>
                <p className="text-sm text-muted-foreground">A community campfire where members share reflections, lessons, and support on their journeys.</p>
              </div>
            </Card>
          </div>

          <div className="text-center text-sm text-muted-foreground/70">
            Already a member? <button onClick={handleLoginClick} className="underline hover:text-foreground transition-colors">Log in here</button>
          </div>
        </div>
      </div>

      {/* Founding Forest CTA */}
      <div className="bg-background px-4 py-12 md:py-16">
        <Card className="p-8 rounded-2xl border-secondary/30 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            <h2 className="font-heading text-3xl font-semibold text-foreground">Join the Founding Forest</h2>
            <p className="text-muted-foreground text-lg">
              Be among the first to access Hearth & Horizon at our legacy founding member rate. Limited to the first 25 members.
            </p>
            <Button asChild size="lg" className="gap-2 h-12 px-8 text-base font-medium">
  <a href="#pricing">  {/* <--- Change this line right here! */}
    Join the Founding Forest
    <ArrowRight className="w-5 h-5" />
  </a>
</Button>
            <p className="text-xs text-muted-foreground/70 italic">
              Founding rate locked for the first 25 members. After that, standard pricing applies.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}