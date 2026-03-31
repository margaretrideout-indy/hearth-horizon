import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <XCircle className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">No worries.</h1>
          <p className="text-muted-foreground leading-relaxed">
            Your payment was canceled. Pivot Path will always be here when you're ready — your journey doesn't depend on a transaction.
          </p>
        </div>

        <Card className="p-4 rounded-2xl border-border/50 bg-accent/30 text-left">
          <div className="flex items-start gap-3">
            <Heart className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              If cost is a barrier, visit the <strong>Support page</strong> to request a sponsored seat from the community pool — no payment required.
            </p>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link to="/support">
              <Heart className="w-4 h-4" />
              View Support Options
            </Link>
          </Button>
          <Button asChild className="flex-1 gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}