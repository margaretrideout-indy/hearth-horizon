import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle, Loader2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const ADMIN_EMAILS = ['margaret@hearthandhorizon.ca']; // Replace with your actual admin email

export default function AdminDashboard() {
  const queryClient = useQueryClient();
  const [approving, setApproving] = React.useState(null);

  const { data: user } = useQuery({ queryKey: ['me'], queryFn: () => base44.auth.me() });
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['seatRequests'],
    queryFn: () => base44.entities.SeatRequest.list('-created_date', 100),
  });
  const { data: vouchers = [] } = useQuery({
    queryKey: ['vouchers'],
    queryFn: () => base44.entities.VoucherPool.list(),
  });

  const isAdmin = user?.role === 'admin' || ADMIN_EMAILS.includes(user?.email);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-2">
          <ShieldCheck className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground text-sm">Access restricted to administrators.</p>
        </div>
      </div>
    );
  }

  const handleApprove = async (request) => {
    setApproving(request.id);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Grant approved status on request
    await base44.entities.SeatRequest.update(request.id, {
      status: 'approved',
      approved_date: now.toISOString(),
      approved_until: expiresAt.toISOString(),
    });

    // Also add a voucher to the pool for them
    await base44.entities.VoucherPool.create({
      sponsor_email: 'admin@hearthandhorizon.ca',
      amount_paid: 0,
      status: 'claimed',
      claimed_by: request.email,
      claimed_date: now.toISOString(),
    });

    queryClient.invalidateQueries({ queryKey: ['seatRequests'] });
    queryClient.invalidateQueries({ queryKey: ['vouchers'] });
    toast.success(`Seat approved for ${request.name}. Access granted for 30 days.`);
    setApproving(null);
  };

  const pending = requests.filter(r => r.status === 'pending');
  const approved = requests.filter(r => r.status === 'approved');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Admin only</p>
        </div>
        <h1 className="font-heading text-3xl mb-1" style={{ fontWeight: 600 }}>Voucher Queue Manager</h1>
        <p className="text-muted-foreground text-sm">Review and approve sponsored seat requests from the Seedling queue.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', value: pending.length, color: 'text-yellow-400' },
          { label: 'Approved', value: approved.length, color: 'text-secondary' },
          { label: 'Available Vouchers', value: vouchers.filter(v => v.status === 'available').length, color: 'text-foreground' },
        ].map(s => (
          <Card key={s.label} className="p-4 rounded-2xl text-center">
            <div className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Pending Requests */}
      <div>
        <h2 className="font-heading font-semibold mb-3 flex items-center gap-2" style={{ fontWeight: 600 }}>
          <Users className="w-4 h-4 text-secondary" /> Pending Requests
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>
        ) : pending.length === 0 ? (
          <Card className="p-6 rounded-2xl text-center text-muted-foreground text-sm">No pending requests.</Card>
        ) : (
          <div className="space-y-3">
            {pending.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/50 p-4 flex items-center justify-between gap-4"
                style={{ background: 'rgba(45,31,52,0.60)', backdropFilter: 'blur(10px)' }}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{req.name}</div>
                  <div className="text-xs text-muted-foreground">{req.email}</div>
                  <Badge className="mt-1 text-[10px] bg-card border-border/50 text-muted-foreground">{req.field}</Badge>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleApprove(req)}
                  disabled={approving === req.id}
                  className="gap-2 shrink-0"
                >
                  {approving === req.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                  Approve Seat
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Approved */}
      {approved.length > 0 && (
        <div>
          <h2 className="font-heading font-semibold mb-3" style={{ fontWeight: 600 }}>Approved</h2>
          <div className="space-y-2">
            {approved.map(req => (
              <div key={req.id} className="rounded-xl border border-secondary/20 bg-secondary/5 p-3 flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">{req.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{req.email}</span>
                </div>
                <div className="text-right">
                  <Badge className="bg-secondary/15 text-secondary border-none text-xs">Approved</Badge>
                  {req.approved_until && (
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      Until {new Date(req.approved_until).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}