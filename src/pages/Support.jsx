import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Gift, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import PaySlider from '../components/support/PaySlider';
import VoucherPoolStatus from '../components/support/VoucherPoolStatus';

export default function Support() {
  const [mode, setMode] = React.useState('self'); // 'self' | 'sponsor'
  const [amount, setAmount] = React.useState(3);
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  // Handle success/cancel redirects from Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const canceled = params.get('canceled');
    const returnMode = params.get('mode');

    if (success === 'true') {
      toast.success(
        returnMode === 'sponsor'
          ? "Thank you! You've sponsored a seat for someone in need. 💚"
          : "Thank you for your support! Your journey continues. 🌱"
      );
      // If sponsor, create a voucher record
      if (returnMode === 'sponsor' && user?.email) {
        base44.entities.VoucherPool.create({
          sponsor_email: user.email,
          amount_paid: 0, // amount not available post-redirect; Stripe webhook would handle in production
          status: 'available',
        }).then(() => {
          queryClient.invalidateQueries({ queryKey: ['vouchers'] });
        });
      }
      // Clean URL
      window.history.replaceState({}, '', '/support');
    } else if (canceled === 'true') {
      toast.error("Payment was canceled.");
      window.history.replaceState({}, '', '/support');
    }
  }, [user]);

  const handleCheckout = async () => {
    setLoading(true);
    const origin = window.location.origin;
    const res = await base44.functions.createCheckout({
      amount,
      mode,
      userEmail: user?.email,
      successUrl: `${origin}/support?success=true&mode=${mode}`,
      cancelUrl: `${origin}/support?canceled=true`,
    });
    if (res.url) {
      window.location.href = res.url;
    } else {
      toast.error(res.error || "Could not start checkout. Please try again.");
      setLoading(false);
    }
  };

  const sponsorAmounts = [5, 10, 20];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-1">Support Pivot Path</h1>
        <p className="text-muted-foreground">Pay what you can. Every contribution keeps this platform accessible.</p>
      </div>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'self', icon: Heart, label: 'Support My Journey', desc: 'Pay what feels right for you' },
          { id: 'sponsor', icon: Gift, label: 'Sponsor a Seat', desc: 'Fund access for someone else' },
        ].map(({ id, icon: Icon, label, desc }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setMode(id); if (id === 'sponsor') setAmount(5); else setAmount(3); }}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              mode === id
                ? 'border-secondary bg-secondary/10'
                : 'border-border bg-card hover:border-border/80'
            }`}
          >
            <Icon className={`w-5 h-5 mb-2 ${mode === id ? 'text-secondary' : 'text-muted-foreground'}`} />
            <div className="font-medium text-sm">{label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Checkout Card */}
      <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
        {mode === 'self' ? (
          <div className="space-y-6">
            <div>
              <h2 className="font-heading font-semibold text-lg mb-1">Choose your contribution</h2>
              <p className="text-sm text-muted-foreground">There's no wrong amount. Give what you can.</p>
            </div>
            <PaySlider value={amount} onChange={setAmount} />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-heading font-semibold text-lg">Sponsor a Seat</h2>
                <Badge className="bg-secondary/20 text-secondary border-none text-xs">Community</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your payment adds a voucher to the community pool. A user who clicks "Request Assistance" will automatically receive sponsored access.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-3xl font-heading font-semibold">${amount}</span>
                <span className="text-muted-foreground text-sm ml-1">/ seat</span>
              </div>
              <div className="flex gap-2 justify-center">
                {sponsorAmounts.map(a => (
                  <button
                    key={a}
                    onClick={() => setAmount(a)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                      amount === a
                        ? 'bg-secondary text-secondary-foreground border-secondary'
                        : 'border-border text-muted-foreground hover:border-secondary/60'
                    }`}
                  >
                    ${a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full mt-6 h-11 text-base gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : mode === 'sponsor' ? (
            <Gift className="w-4 h-4" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
          {loading ? 'Redirecting…' : mode === 'sponsor' ? `Sponsor a Seat — $${amount}` : `Continue — $${amount}`}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-3">
          Secured by Stripe · No subscription · Cancel anytime is not applicable
        </p>
      </Card>

      {/* Voucher Pool Status */}
      <VoucherPoolStatus />
    </div>
  );
}