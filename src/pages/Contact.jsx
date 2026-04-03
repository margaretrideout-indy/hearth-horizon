import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);

    await base44.integrations.Core.SendEmail({
      to: 'margaretpardy@gmail.com',
      from_name: 'Hearth & Horizon Contact Form',
      subject: `New message from ${form.name} via Hearth & Horizon`,
      body: `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    });

    setSent(true);
    setSending(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <MessageCircle className="w-4 h-4 text-secondary" />
          <p className="text-sm text-secondary font-medium">Get in touch</p>
        </div>
        <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">Contact the Hearth</h1>
        <p className="text-muted-foreground">Have a question or need support? We're here for you.</p>
      </div>

      <Card className="p-6 rounded-2xl border-border/50">
        {sent ? (
          <div className="text-center py-8 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <p className="text-foreground leading-relaxed text-sm max-w-md mx-auto">
              Your message has reached the Hearth. We aim to respond to all Wayfarers (our community of transitioning professionals) within 24–48 hours. Thank you for your patience as our forest grows.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">Name</label>
              <Input
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1.5 block">Your Message</label>
              <Textarea
                placeholder="How can we help you?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="min-h-[140px] resize-none"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={sending || !form.name.trim() || !form.email.trim() || !form.message.trim()}
              className="w-full h-11 gap-2"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
              {sending ? 'Sending to the Hearth…' : 'Send Message'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}