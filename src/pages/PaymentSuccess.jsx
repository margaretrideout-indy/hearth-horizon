import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Filter, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';

const premiumFeatures = [
  { icon: Upload, label: 'Unlimited PDF Uploads', desc: 'Upload as many resumes and documents as you need.' },
  { icon: Filter, label: 'Culture Filter', desc: 'Filter job descriptions for cultural alignment signals.' },
  { icon: Sparkles, label: 'Advanced Bridge Access', desc: 'Full access to the Forge and professional translation tools.' }
];

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier'); // 'hearthkeeper' | 'steward' | 'sponsor'
  const queryClient = useQueryClient();

  useEffect(() => {
    const assignTier = async () => {
      // 1. Determine the Role name based on the tier param
      let newRole = null;
      if (tier === 'steward') newRole = 'Steward';
      if (tier === 'hearthkeeper') newRole = 'Hearthkeeper';

      // 2. Define your Launch Window Cutoff
      const launchCutoff = new Date('2026-05-08'); 
      const today = new Date();
      const isFoundingPeriod = today <= launchCutoff;

      // 3. Update User Profile if they bought a tier
      if (newRole) {
        const update = {
          subscription_tier: newRole,
          seedling_upload_count: 0,
          ...(isFoundingPeriod && { is_founding_member: true }),
        };
        await base44.auth.updateMe(update);
      }

      // 4. Handle the Donation (Sponsor) logic separately
      if (tier === 'sponsor') {
        const user = await base44.auth.me();
        if (user?.email) {
          await base44.entities.VoucherPool.create({
            sponsor_email: user.email,
            amount_paid: 5,
            status: 'available',
          });
        }
      }

      // 5. Refresh everything
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    };

    if (tier) assignTier();
  }, [tier, queryClient]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0810] text-stone-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#149184]/10 flex items-center justify-center border border-[#149184]/20">
            <CheckCircle className="w-10 h-10 text-[#149184]" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white italic tracking-tighter uppercase mb-2">
            {tier === 'sponsor' ? "Thank You, Sponsor." : "Welcome to the Hearth."}
          </h1>
          <p className="text-[#149184] font-black text-xs uppercase tracking-[0.3em] mb-4">
            {tier === 'sponsor' ? "You've sparked a new light." : "Your journey into the Horizon starts here."}
          </p>
          <div className="text-stone-400 leading-relaxed font-light italic">
            {tier === 'sponsor' ? (
              <p>"Your donation has added a seat to the pool. An educator in need will now have full access because of you."</p>
            ) : (
              <p>"Your contribution keeps Hearth & Horizon accessible for public-sector professionals everywhere. We're grateful."</p>
            )}
          </div>
        </div>

        {tier !== 'sponsor' && (
          <Card className="p-6 rounded-[2rem] border-stone-800/40 bg-[#130f1c] text-left space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#149184] font-black mb-2">🎉 Premium Features Unlocked</p>
            {premiumFeatures.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0a0810] border border-stone-800/60 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#149184]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-stone-500 font-light leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </Card>
        )}

        {tier === 'sponsor' && (
          <Card className="p-8 rounded-[2rem] border-[#149184]/20 bg-[#149184]/5 text-center">
            <Heart className="w-12 h-12 text-[#149184] mx-auto mb-4 fill-current opacity-50" />
            <p className="text-sm text-stone-300 italic">
              "The hearth is warmer when more people can gather around it."
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-[#149184] font-black">
              Sponsored seat successfully added to the pool
            </p>
          </Card>
        )}

        <Button asChild className="w-full h-14 bg-[#149184] hover:bg-[#1bb0a1] text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all shadow-lg shadow-black/40">
          <Link to="/hearth" className="flex items-center justify-center gap-3">
            {tier === 'sponsor' ? "Return to the Hearth" : "Enter the Hearth"} <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}