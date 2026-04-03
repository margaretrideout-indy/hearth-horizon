import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Filter, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';

const premiumFeatures = [
  { icon: Upload, label: 'Unlimited PDF Uploads', desc: 'Upload as many resumes and documents as you need.' },
  { icon: Filter, label: 'Culture Filter', desc: 'Filter job descriptions for cultural alignment signals.' },
];

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier'); // 'supporter' | 'sponsor'
  const queryClient = useQueryClient();

  useEffect(() => {
    // Update subscription tier based on tier param and unlock full Bridge Builder access
    const newTier = tier === 'sponsor' ? 'Steward' : 'Hearthkeeper';
    base44.auth.updateMe({
      subscription_tier: newTier,
      seedling_upload_count: 0, // reset on upgrade
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    });

    // If sponsor, add a voucher to the pool
    if (tier === 'sponsor') {
      base44.auth.me().then(user => {
        if (user?.email) {
          base44.entities.VoucherPool.create({
            sponsor_email: user.email,
            amount_paid: 5,
            status: 'available',
          }).then(() => {
            queryClient.invalidateQueries({ queryKey: ['vouchers'] });
          });
        }
      });
    }
  }, [tier]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full space-y-6 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">
            {tier === 'sponsor' ? "You're a Hero. 💚" : 'Thank You! 🌱'}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {tier === 'sponsor'
              ? "Your $5/month sponsors a seat for an educator who couldn't otherwise afford access. You've changed someone's trajectory."
              : "Your $3/month contribution keeps Pivot Path accessible for public-sector professionals everywhere. We're grateful."}
          </p>
        </div>

        {/* Unlocked Features */}
        <Card className="p-5 rounded-2xl border-secondary/20 bg-secondary/5 text-left space-y-4">
          <p className="text-sm font-semibold text-foreground">🎉 You've unlocked Premium features:</p>
          {premiumFeatures.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </Card>

        {tier === 'sponsor' && (
          <Card className="p-4 rounded-2xl border-border/50 text-left">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Sponsored seat added to the pool</span>
            </div>
            <p className="text-xs text-muted-foreground">
              An educator in need can now claim free access on the Support page. You'll see the community impact grow there.
            </p>
          </Card>
        )}

        <Button asChild className="w-full h-11 gap-2">
          <Link to="/">
            Continue Your Journey
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}