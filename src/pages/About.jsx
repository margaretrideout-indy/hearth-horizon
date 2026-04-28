import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, BookOpen, Globe, Users, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans">

      {/* Simple nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors">
            <Flame size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Hearth & Horizon</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-teal-400">About</Link>
            <Link to="/contact-us" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-16">

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
        <section className="space-y-6">
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
              The <strong className="text-white">Library</strong> houses both internal calibration tools — Brigid's
              Counsel, the Soul Compass, and the Rite of Renaming — and external provisions like outreach scripts,
              community resources, and curated reading. The <strong className="text-white">Embers</strong> community
              space connects fellow wayfarers so no one navigates the transition alone. And the <strong className="text-white">Hearth</strong> is
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
        <section className="space-y-6">
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
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart size={18} className="text-rose-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">Who Builds It</h2>
          </div>
          <div className="p-8 md:p-12 bg-gradient-to-b from-[#110E16] to-[#0D0B12] border border-white/5 rounded-[2.5rem] space-y-4">
            <p className="text-zinc-400 leading-relaxed italic font-serif text-lg">
              "As an Indigenous educator with 13 years in the classroom, I've learned that a professional shift
              is more than a move — it's a migration of the self."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Flame size={14} className="text-teal-400" />
              </div>
              <div>
                <p className="text-white font-serif italic">Margaret Pardy</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Founder, Hearth & Horizon</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6">
          <Link to="/"
            className="inline-flex items-center gap-3 h-14 px-10 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 text-[10px] hover:bg-teal-400 transition-all">
            Enter the Sanctuary <ArrowRight size={14} />
          </Link>
          <p className="text-zinc-600 text-xs italic">
            Questions? <Link to="/contact-us" className="text-teal-400 hover:underline">Get in touch →</Link>
          </p>
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