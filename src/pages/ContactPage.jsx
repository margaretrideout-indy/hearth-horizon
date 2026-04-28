import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Mail, Globe, Heart, Send, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await base44.entities.SeatRequest.create({
        name: formData.name,
        email: formData.email,
        field: 'Other',
        status: 'pending'
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
            <Flame size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Hearth & Horizon</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">About</Link>
            <Link to="/contact-us" className="text-[10px] font-black uppercase tracking-widest text-teal-400">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24 space-y-12">

        {/* Header */}
        <header className="space-y-5">
          <div className="flex items-center gap-3 text-teal-500/80">
            <Mail size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Reach Out</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-white tracking-tighter leading-none">
            Contact Us
          </h1>
          <p className="text-zinc-500 italic leading-relaxed border-l border-teal-500/20 pl-6">
            Whether you have a question, a collaboration idea, or just want to share your story — we'd love to hear from you.
          </p>
        </header>

        {/* Direct email */}
        <section className="p-6 bg-teal-500/[0.04] border border-teal-500/15 rounded-[2rem] flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center shrink-0">
            <Mail size={18} className="text-teal-400" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1">Direct Email</p>
            <a href="mailto:hello@hearthandhorizon.ca"
              className="text-teal-400 font-serif italic hover:underline">
              hello@hearthandhorizon.ca
            </a>
          </div>
        </section>

        {/* Social links */}
        <section className="space-y-3">
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Find Us Online</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://bookshop.org/shop/hearthandhorizon" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <Globe size={13} /> Bookshop
            </a>
            <a href="https://margaretpardy.gumroad.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <Heart size={13} /> Gumroad
            </a>
            <a href="https://ko-fi.com/I2I51EFK95" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all">
              <Flame size={13} /> Ko-fi
            </a>
          </div>
        </section>

        {/* Contact form */}
        <section className="space-y-6">
          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Send a Message</p>

          {status === 'success' ? (
            <div className="p-10 text-center bg-teal-500/[0.04] border border-teal-500/15 rounded-[2rem] space-y-3">
              <Check size={28} className="text-teal-400 mx-auto" />
              <p className="text-white font-serif italic text-xl">Message received.</p>
              <p className="text-zinc-500 text-sm italic">We'll be in touch soon. Thank you for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  required placeholder="Your name"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 placeholder:text-zinc-700"
                />
                <input
                  required type="email" placeholder="Your email"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 placeholder:text-zinc-700"
                />
              </div>
              <textarea
                required rows={5} placeholder="Your message..."
                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500/50 placeholder:text-zinc-700 resize-none"
              />
              {status === 'error' && (
                <p className="text-rose-400 text-xs italic">Something went wrong. Try emailing us directly.</p>
              )}
              <button type="submit" disabled={status === 'sending'}
                className="w-full h-14 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <Send size={14} />
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </section>

      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] uppercase tracking-widest font-black">
          <span>© {new Date().getFullYear()} Hearth & Horizon</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-zinc-300 transition-colors">About</Link>
            <Link to="/contact-us" className="hover:text-zinc-300 transition-colors">Contact</Link>
            <Link to="/" className="hover:text-zinc-300 transition-colors">Enter App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}