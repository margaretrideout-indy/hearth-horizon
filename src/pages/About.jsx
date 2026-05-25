import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, BookOpen, Users, ArrowRight, Mail, Send, Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';

function ReachOutSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await base44.integrations.Core.SendEmail({
        to: 'margaretpardy@gmail.com',
        subject: `Hearth & Horizon Contact: ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reach-out" className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail size={18} className="text-teal-400" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Reach Out</h2>
      </div>
      <p className="text-zinc-500 italic text-sm leading-relaxed border-l border-teal-500/20 pl-6">
        Whether you have a question, a collaboration idea, or just want to share your story, we'd love to hear from you.
      </p>

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
            <p className="text-rose-400 text-xs italic">Something went wrong. Please try again.</p>
          )}
          <button type="submit" disabled={status === 'sending'}
            className="w-full h-14 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            <Send size={14} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans">

      {/* Nav — synced with Grove */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A080D]/95 backdrop-blur-xl border-b border-zinc-900"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-700">Hearth & Horizon</span>
          <div className="flex items-center gap-4">
            <a href="/about#reach-out" className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-300 transition-colors">Contact</a>
            <Link to="/" className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-teal-400 transition-colors">Enter Sanctuary</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-24 pb-20 space-y-14">

        {/* Hero */}
        <header className="space-y-6">
          <div className="flex items-center gap-3 text-teal-500/80">
            <Flame size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none">
            About Hearth & Horizon
          </h1>
          <p className="text-zinc-400 italic text-lg max-w-2xl leading-relaxed border-l border-teal-500/20 pl-6">
            A sanctuary for public-sector professionals ready to write their next chapter.
          </p>
        </header>

        {/* What the app does */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-teal-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">What We Do</h2>
          </div>
          <div className="prose prose-invert max-w-none space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Hearth & Horizon is a career-migration platform built specifically for public-sector professionals —
              teachers, nurses, social workers, government administrators, first responders, and everyone in between
              — who are ready to transition into the private sector. We believe that the skills, values, and depth
              of experience you've built in service deserve to be recognized, translated, and rewarded in a new context.
            </p>
            <p>
              Our platform combines an AI-powered identity engine we call <strong className="text-white">Brigid</strong> with
              a curated set of practical tools: resume analysis, professional lexicon translation, ethical alignment
              calibration, ATS-optimized resume templates, salary negotiation scripts, and a personalized job board
              we call the Horizon. Every feature is designed to honour the whole person, not just their credentials.
            </p>
            <p>
              The <strong className="text-white">Library</strong> houses both internal calibration tools: Brigid's
              Counsel, the Soul Compass, and the Rite of Renaming, alongside external provisions like outreach scripts,
              community resources, and curated reading. The <strong className="text-white">Hearth</strong> is
              your personal sanctuary: a private space to reflect, track your emotional weather, and measure your
              readiness for the road ahead.
            </p>
            <p>
              We are not a job board. We are not a résumé service. We are a full migration support system rooted
              in reciprocity, transparency, and personal sovereignty.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-purple-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Who It's For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Teachers & Educators', 'Nurses & Healthcare Workers', 'Social Workers & Counsellors',
              'Government & Public Administrators', 'First Responders & Veterans', 'Anyone in Public Service Ready for Change'
            ].map((role, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                <span className="text-sm text-zinc-300">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Who builds it */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-rose-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">Who Builds It</h2>
          </div>
          <div className="p-8 bg-gradient-to-b from-[#110E16] to-[#0D0B12] border border-white/5 rounded-[2.5rem] space-y-4">
            <p className="text-zinc-400 leading-relaxed italic font-serif text-lg">
              "As an Indigenous educator with 13 years in the classroom, I've learned that a professional shift
              is more than a move — it's a migration of the self."
            </p>
            <div className="flex items-start gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 mt-1">
                <Flame size={14} className="text-teal-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-white font-serif italic">Margaret Pardy, M.Ed.</p>
                <p className="text-[10px] text-zinc-400 italic font-serif">Master of Education, Indigenous Studies: Curriculum and Pedagogy</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Founder, Hearth & Horizon</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4">
          <Link to="/"
            className="inline-flex items-center gap-3 h-14 px-10 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 text-[10px] hover:bg-teal-400 transition-all">
            Enter the Sanctuary <ArrowRight size={14} />
          </Link>
        </section>

        {/* Reach Out */}
        <ReachOutSection />

      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] uppercase tracking-widest font-black">
          <span>© {new Date().getFullYear()} Hearth & Horizon</span>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-zinc-300 transition-colors">About</Link>
            <a href="/about#reach-out" className="hover:text-zinc-300 transition-colors">Contact</a>
            <Link to="/" className="hover:text-zinc-300 transition-colors">Enter App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}