import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function VoucherRequestForm({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setLoading(true);
    // Simulate a brief submission delay — replace with real integration if needed
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    toast.success('Your request has been received. We\'ll be in touch shortly.');
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl p-6 text-center space-y-3"
        style={{ background: 'hsl(280 22% 19%)' }}
      >
        <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 text-secondary" />
        </div>
        <h3 className="font-heading font-semibold text-foreground">Your request is in the grove.</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Thank you for trusting us with your story. A sponsored seat may be waiting — we'll reach out within 48 hours.
        </p>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onClose}>
          Close
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border/40 p-5 space-y-4"
      style={{ background: 'hsl(280 22% 19% / 0.85)', backdropFilter: 'blur(10px)' }}
    >
      <div>
        <h3 className="font-heading font-semibold text-foreground text-base">Request a sponsored seat</h3>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          If financial transition is making access difficult, let us know. Every story matters here.
        </p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Your name</label>
          <Input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="bg-background/30 border-border/40"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email address</label>
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
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            How would a voucher help your transition?
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Share a little of your story — your experience, where you're headed, and what support would mean for you right now."
            value={form.message}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border/40 bg-background/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading || !form.name.trim() || !form.email.trim() || !form.message.trim()}
          className="flex-1 gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? 'Sending…' : 'Submit request'}
        </Button>
      </div>
    </motion.form>
  );
}