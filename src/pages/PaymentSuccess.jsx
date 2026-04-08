import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Upload, Filter, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';

const premiumFeatures = [
  { icon: Upload, label: 'Unlimited PDF Uploads', desc: 'Upload as many resumes and documents as you need.' },
  { icon: Filter, label: 'Culture Filter', desc: 'Filter job descriptions for cultural alignment signals.' },
  { icon: Sparkles, label: 'Advanced Bridge Access', desc: 'Full access to the Forge and professional translation tools.' }
];

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier');
  const queryClient = useQueryClient();

  useEffect(() => {
    const assignTier = async () => {
      let newRole = null;
      if (tier === 'steward') newRole = 'Steward';
      if (tier === 'hearthkeeper') newRole = 'Hearthkeeper';

      const launchCutoff = new Date('2026-05-08'); 
      const today = new Date();
      const isFoundingPeriod = today <= launchCutoff;

      if (newRole) {
        try {
          await base44.auth.updateMe({
            subscription_tier: newRole,
            seedling_upload_count: 0,
            ...(isFoundingPeriod && { is_founding_member: true }),
          });
        } catch (e) { console.error("Update failed", e); }
      }

      if (tier === 'sponsor') {
        try {
          const user = await base44.auth.me();
          if (user?.email) {
            await base44.entities.VoucherPool.create({
              sponsor_email: user.email,
              amount_paid: 5,
              status: 'available',
            });
          }
        } catch (e) { console.error("Sponsor update failed", e); }
      }

      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    };

    if (tier) assignTier();
  }, [tier, queryClient]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#1A1423] text-stone-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
            <CheckCircle className="w-10 h-10 text-teal-500" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white italic uppercase mb-2">
            {tier === 'sponsor' ? "Thank You, Sponsor." : "Welcome to the Hearth."}
          </h1>
          <p className="text-teal-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            {tier === 'sponsor' ? "You've sparked a new light." : "Your journey into the Horizon starts here."}
          </p>
          <div className="text-slate-400 italic font-light">
            {tier === 'sponsor' ? (
              <p>"Your donation has added a seat to the pool. An educator in need now has access because of you."</p>
            ) : (
              <p>"Your contribution keeps Hearth & Horizon accessible for public-sector professionals everywhere."</p>
            )}
          </div>
        </div>

        {tier !== 'sponsor' && (
          <div className="p-6 rounded-[2rem] border border-white/5 bg-[#251D2F] text-left space-y-4">
            <p className="text-[10px] uppercase tracking-widest text-teal-500 font-black">🎉 Features Unlocked</p>
            {premiumFeatures.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A1423] border border-white/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-xs text-slate-500 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tier === 'sponsor' && (
          <div className="p-8 rounded-[2rem] border border-teal-500/20 bg-teal-500/5">
            <Heart className="w-12 h-12 text-teal-500 mx-auto mb-4 fill-current opacity-50" />
            <p className="text-sm text-slate-300 italic">"The hearth is warmer when more people can gather around it."</p>
          </div>
        )}

        <Link 
          to="/hearth" 
          className="flex items-center justify-center gap-3 w-full h-14 bg-teal-500 hover:bg-teal-400 text-[#1A1423] font-black text-[10px] tracking-widest uppercase rounded-xl transition-all shadow-xl"
        >
          {tier === 'sponsor' ? "Return to the Hearth" : "Enter the Hearth"} <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}