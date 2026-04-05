import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Gift, Sprout, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/00w00jdy0gCz0DWaG6dAk00';
const LINK_STEWARD = 'https://buy.stripe.com/eVq14n2Tm4TR4UcaG6dAk01';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

export default function Gateway() {
  const handleLoginClick = () => {
    import('@/api/base44Client').then(m => {
      m.base44.auth.redirectToLogin('/hearth');
    });
  };

  return (
    <div className="space-y-0 bg-background min-h-screen">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(135deg, hsl(280, 25%, 15%) 0%, hsl(183, 40%, 20%) 50%, hsl(35, 50%, 18%) 100%)`,
          }}
        />
        
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <Link to="/install" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Install App</Link>
          <Button onClick={handleLoginClick} variant="outline" size="sm">Log In</Button>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-24 md:py-32 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Ground your history.<br />
              <span style={{ color: 'hsl(183, 80%, 55%)' }}>Map your horizon.</span>
            </h1>
          </motion.div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
            A sanctuary for public-sector professionals to anchor years of wisdom and find a high-autonomy ecosystem—without losing who they are.
          </p>

          <Button asChild size="lg" className="gap-2 h-12 px-8">
            <a href="#pricing">Join the Founding Forest <ArrowRight className="w-5 h-5" /></a>
          </Button>

          <p className="text-xs text-muted-foreground/60 italic pt-8 border-t border-white/10">
            Founded by Margaret, M.Ed. | 13 Years of Leadership
          </p>
        </div>
      </section>

      <section className="px-4 py-20 bg-background">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-border/50">
            <Heart className="w-5 h-5 text-secondary mb-3" />
            <h3 className="font-semibold mb-2 text-foreground">The Grove</h3>
            <p className="text-sm text-muted-foreground">A reciprocity model where your contribution sponsors a peer seat.</p>
          </Card>
          <Card className="p-6 border-border/50">
            <Heart className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-semibold mb-2 text-foreground">The Canopy</h3>
            <p className="text-sm text-muted-foreground">Curated job board and pathways for experienced professionals.</p>
          </Card>
          <Card className="p-6 border-border/50">
            <Heart className="w-5 h-5 text-accent mb-3" />
            <h3 className="font-semibold mb-2 text-foreground">The Embers</h3>
            <p className="text-sm text-muted-foreground">A community campfire for shared reflections and support.</p>
          </Card>
        </div>
      </section>

      <section id="pricing" className="px-4 py-24 border-t border-border/10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-semibold italic text-foreground">Choose Your Place in the Forest</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Join as a Founding Member to anchor this grove.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <Card className="p-8 flex flex-col justify-between border-border/40 bg-background/30 hover:border-border transition-all">
              <div>
                <div className="flex justify-between items-start">
                  <Sprout className="w-8 h-8 text-muted-foreground mb-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">The Seedling</h3>
                <div className="text-3xl font-bold mt-2 text-muted-foreground">$0</div>
                <p className="text-muted-foreground text-sm mt-6 leading-relaxed">
                  Enter the grove. Access the community campfire and public reflections to begin your journey.
                </p>
              </div>
              <Button asChild variant="outline" className="mt-8 w-full rounded-full h-12 border-border/50">
                <Link to="/hearth">Enter the Grove</Link>
              </Button>
            </Card>

            <Card className="p-8 flex flex-col justify-between border-primary/20 bg-background hover:border-primary/50 transition-all">
              <div>
                <Heart className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold text-foreground">The Hearthkeeper</h3>
                <div className="text-3xl font-bold mt-2 text-primary">$3 <span className="text-sm text-muted-foreground font-normal">/ mo</span></div>
                <p className="text-sm mt-6 text-muted-foreground">Tend the fire. Keeps this sanctuary open for everyone who needs it.</p>
              </div>
              <Button asChild className="mt-8 rounded-full h-12">
                <a href={LINK_HEARTHKEEPER} target="_blank" rel="noopener noreferrer">Select</a>
              </Button>
            </Card>

            <Card className="p-8 flex flex-col justify-between border-primary bg-primary/5 shadow-xl md:-translate-y-2">
              <div>
                <Gift className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold text-foreground">The Steward</h3>
                <div className="text-3xl font-bold mt-2 text-primary">$5 <span className="text-sm text-muted-foreground font-normal">/ mo</span></div>
                <p className="text-sm mt-6 text-muted-foreground">Sponsor a peer seat for someone in a season of financial transition.</p>
              </div>
              <Button asChild className="mt-8 rounded-full h-12 shadow-lg">
                <a href={LINK_STEWARD} target="_blank" rel="noopener noreferrer">Select</a>
              </Button>
            </Card>

            <Card className="p-8 flex flex-col justify-between border-secondary/20 bg-background hover:border-secondary/50 transition-all">
              <div>
                <Sprout className="w-8 h-8 text-secondary mb-6" />
                <h3 className="text-xl font-bold text-foreground">Plant a Seed</h3>
                <div className="text-3xl font-bold mt-2 text-secondary">Custom</div>
                <p className="text-sm mt-6 text-muted-foreground">Help fund the Voucher Pool for others in the community.</p>
              </div>
              <Button asChild variant="outline" className="mt-8 rounded-full h-12 border-secondary/30">
                <a href={LINK_DONATION} target="_blank" rel="noopener noreferrer">Contribute</a>
              </Button>
            </Card>
          </div>

          <div className="text-center text-sm text-muted-foreground/70 mt-8">
            Already a member? <button onClick={handleLoginClick} className="underline hover:text-foreground">Log in here</button>
          </div>
        </div>
      </section>
    </div>
  );
}