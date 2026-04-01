import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function VoucherPoolStatus() {
  const queryClient = useQueryClient();
  const [claiming, setClaiming] = React.useState(false);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => base44.auth.me(),
  });

  const { data: vouchers = [] } = useQuery({
    queryKey: ['vouchers'],
    queryFn: () => base44.entities.VoucherPool.list(),
  });

  const available = vouchers.filter(v => v.status === 'available');
  const claimed = vouchers.filter(v => v.status === 'claimed');
  const alreadyClaimed = vouchers.some(v => v.claimed_by === user?.email);

  const handleClaim = async () => {
    if (!user?.email) return;
    if (available.length === 0) {
      toast.error("No vouchers available right now. Check back soon!");
      return;
    }
    setClaiming(true);
    const voucher = available[0];
    await base44.entities.VoucherPool.update(voucher.id, {
      status: 'claimed',
      claimed_by: user.email,
      claimed_date: new Date().toISOString(),
    });
    queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    toast.success("Access granted. A fellow traveller has covered your seat. You don't walk this path alone.");
    setClaiming(false);
  };

  return (
    <Card className="p-6 rounded-2xl border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-secondary/20 flex items-center justify-center">
          <Heart className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold">The sponsored seat pool</h3>
          <p className="text-xs text-muted-foreground">One seat purchased sponsors a peer in transition. No one walks the path alone.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-secondary/10 rounded-xl p-3 text-center">
          <div className="text-2xl font-heading font-bold text-secondary">{available.length}</div>
          <div className="text-xs text-muted-foreground">Available seats</div>
        </div>
        <div className="bg-muted rounded-xl p-3 text-center">
          <div className="text-2xl font-heading font-bold text-foreground">{claimed.length}</div>
          <div className="text-xs text-muted-foreground">Seats claimed</div>
        </div>
      </div>

      {alreadyClaimed ? (
        <div className="rounded-xl bg-secondary/10 border border-secondary/20 p-3 text-center text-sm text-secondary font-medium">
          ✓ Your seat is sponsored — a peer in the grove has your back
        </div>
      ) : (
        <Button
          onClick={handleClaim}
          disabled={claiming || available.length === 0}
          variant="outline"
          className="w-full gap-2"
        >
          {claiming ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Users className="w-4 h-4" />
          )}
          {available.length === 0 ? "No seats available right now" : "Request a sponsored seat"}
        </Button>
      )}
    </Card>
  );
}