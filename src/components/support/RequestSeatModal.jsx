import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, X, Sunrise } from 'lucide-react';

const TOS_TEXT = "This is a sanctuary of reciprocity. We support, we don't vent. We build, we don't break. Protect the peace of the Hearth.";

export default function RequestSeatModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', field: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.field) return;
    setLoading(true);
    await base44.entities.SeatRequest.create({ ...form, status: 'pending' });
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ name: '', email: '', field: '' });
    setSubmitted(false);
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md rounded-3xl border border-border/40 p-6 space-y-5 z-10"
          style={{ background: 'rgba(45,31,52,0.90)', backdropFilter: 'blur(20px)' }}
        >
          <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mx-auto">
                <Sunrise className="w-6 h-6 text-secondary" />
              </div>
              <p className="font-heading font-semibold text-foreground">You're in the queue.</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We'll reach out to the email provided as soon as a seat is ready for you.
              </p>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleClose}>Close</Button>
            </div>
          ) : (
            <>
              <div>
                <h2 className="font-heading text-xl font-semibold text-foreground mb-1" style={{ fontWeight: 600 }}>Join the Queue</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Grove is nurtured by those who have found their footing. If you are currently in a financial transition, enter your details to be notified when a sponsored seat becomes available.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                  <Input
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-background/30 border-border/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-background/30 border-border/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current Field</label>
                  <Select value={form.field} onValueChange={v => setForm(prev => ({ ...prev, field: v }))}>
                    <SelectTrigger className="bg-background/30 border-border/40">
                      <SelectValue placeholder="Select your field…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Social Services">Social Services</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !form.name.trim() || !form.email.trim() || !form.field}
                  className="w-full gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sunrise className="w-4 h-4" />}
                  {loading ? 'Seeking…' : 'Seek the Horizon'}
                </Button>
              </form>

              <p className="text-muted-foreground/40 leading-relaxed text-center" style={{ fontSize: '10px', fontStyle: 'italic' }}>
                {TOS_TEXT}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}