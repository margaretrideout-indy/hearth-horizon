import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Gift, Loader2, CheckCircle, Upload, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import VoucherPoolStatus from '../components/support/VoucherPoolStatus';

const TIERS = [
  {
    id: 'supporter',
    label: 'The hearthkeeper',
    price: '$3 / month',
    amount: 3,
    icon: Heart,
    color: 'border-secondary bg-secondary/8',
    activeColor: 'border-secondary bg-secondary/15',
    iconColor: 'text-secondary',
    description: 'Tend the fire. A monthly contribution that keeps this sanctuary open for every public-sector professional who needs it.',
    perks: ['Unlimited PDF uploads', 'Culture filter (schedule sovereignty)'],
  },
  {
    id: 'sponsor',
    label: 'The grove',
    price: '$5 / month',
    amount: 5,
    icon: Gift,
    color: 'border-border bg-card',
    activeColor: 'border-secondary bg-secondary/15',
    iconColor: 'text-muted-foreground',
    description: 'Reciprocity model — one seat purchased sponsors a peer in financial transition. No one gets left behind.',
    perks: ['Everything in The hearthkeeper', 'Sponsors 1 peer seat monthly'],
    badge: 'Reciprocity',
  },
];

const PERK_ICONS = {
  'Unlimited PDF Uploads': Upload,
  'Culture Filter': Filter,
};

export default function Support() {
  const [selectedTier, setSelectedTier] = useState('supporter');
  const [loading, setLoading] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const handleCheckout = async () => {
    setLoading(true);
    const origin = window.location.origin;
    const res = await base44.functions.createCheckout({
      tier: selectedTier,
      userEmail: user?.email,
      successUrl: `${origin}/payment/success?tier=${selectedTier}`,
      cancelUrl: `${origin}/payment/cancel`,
    });
    if (res.url) {
      window.location.href = res.url;
    } else {
      setLoading(false);
    }
  };

  const tier = TIERS.find(t => t.id === selectedTier);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-1">Enter the grove</h1>
        <p className="text-muted-foreground">This is a sanctuary, not a subscription service. Contribute what feels right, and help a colleague find their footing too.</p>
      </div>

      {/* Tier Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TIERS.map((t) => {
          const TierIcon = t.icon;
          const isActive = selectedTier === t.id;
          return (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTier(t.id)}
              className={`p-5 rounded-2xl border-2 text-left transition-all w-full ${
                isActive ? t.activeColor : t.color
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <TierIcon className={`w-5 h-5 ${isActive ? 'text-secondary' : t.iconColor}`} />
                {t.badge && (
                  <Badge className="bg-secondary/20 text-secondary border-none text-xs">{t.badge}</Badge>
                )}
              </div>
              <div className="font-heading font-semibold text-foreground">{t.label}</div>
              <div className="text-xl font-semibold text-secondary mt-0.5 mb-2">{t.price}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Checkout Card */}
      <Card className="p-6 rounded-2xl border-border/50 shadow-sm space-y-5">
        <div>
          <h2 className="font-heading font-semibold text-lg">{tier?.label} — {tier?.price}</h2>
          <p className="text-sm text-muted-foreground mt-1">{tier?.description}</p>
        </div>

        {/* Perks */}
        <div className="space-y-2">
          {tier?.perks.map(perk => {
            const PerkIcon = PERK_ICONS[perk] || CheckCircle;
            return (
              <div key={perk} className="flex items-center gap-2 text-sm">
                <PerkIcon className="w-4 h-4 text-secondary shrink-0" />
                <span>{perk}</span>
              </div>
            );
          })}
        </div>

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full h-11 text-base gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          {loading ? 'Opening the path…' : `Tend the fire — ${tier?.price}`}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Secured by Stripe · Cancel anytime · No pressure, ever
        </p>
      </Card>

      {/* Community Pool */}
      <VoucherPoolStatus />
    </div>
  );
}