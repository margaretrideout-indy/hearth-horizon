import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Heart, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Mail, 
  Send, 
  Check, 
  ClipboardList, 
  FileText, 
  ChevronDown, 
  GraduationCap, 
  Compass,
  TreePine
} from 'lucide-react';
import { base44 } from '@/api/base44Client';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';
import ExpertiseBadge from '../components/ExpertiseBadge';

const ADVISORY_SERVICES = [
  {
    icon: ClipboardList,
    title: "Curriculum Audits",
    description: "A structured review of institutional learning frameworks. Identifies gaps and translates legacy curriculum into market-ready competencies. Delivered as a written report, no ongoing engagement required.",
    bullets: ["Gap analysis against private-sector benchmarks", "Competency translation matrix", "Actionable recommendations document"],
  },
  {
    icon: Users,
    title: "Cultural Alignment Reviews",
    description: "Deep-dive assessments that map organizational culture against private-sector expectations. Surfaces misalignments before they cost you time or talent. Ideal for teams mid-transition.",
    bullets: ["Culture gap scorecard", "Leadership readiness profile", "30-day alignment roadmap"],
  },
  {
    icon: FileText,
    title: "Digital Transition SOPs",
    description: "Custom standard operating procedures that bridge institutional processes with modern digital workflows. Built to implement on day one, no handholding required.",
    bullets: ["Role-specific SOP templates", "Digital tool mapping", "Onboarding checklist package"],
  },
];

function ServiceCard({ s, i }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className="p-6 md:p-8 rounded-[2rem] bg-[#0E0C14] border border-zinc-800/60 flex flex-col gap-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 text-teal-400 shrink-0 mt-0.5">
          <s.icon size={18} />
        </div>
        <div className="space-y-1.5 flex-1">
          <h3 className="text-lg font-serif italic text-purple-300">{s.title}</h3>
          <p className="text-[12px] text-zinc-400 leading-relaxed italic">{s.description}</p>
        </div>
      </div>

      <button 
        onClick={() => setExpanded(p => !p)}
        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors w-fit pl-14"
      >
        <ChevronDown size={11} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Less detail' : "What's included"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-14 space-y-2"
          >
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[11px] text-zinc-500">
                <span className="text-teal-500/40 mt-0.5 shrink-0">·</span> {b}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="pl-14 pt-1">
        <a
          href="#reach-out"
          className="inline-block py-2.5 px-5 bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-500/20 transition-all"
        >
          Enquire about {s.title} →
        </a>
      </div>
    </motion.div>
  );
}

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
    <section id="reach-out" className="space-y-6 pt-10 border-t border-zinc-900">
      <div className="flex items-center gap-3">
        <Mail size={16} className="text-teal-400" />
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">Initiate Alignment</h2>
      </div>
      <p className="text-zinc-500 italic text-sm leading-relaxed border-l border-teal-500/20 pl-6">
        Whether you have an inquiry regarding a corporate system audit, or you're looking to anchor your cohort's transition workflows—leave a brief message below. Conversations are handled asynchronously, with grounded intention.
      </p>

      {status === 'success' ? (
        <div className="p-10 text-center bg-teal-500/[0.03] border border-teal-500/15 rounded-[2rem] space-y-3">
          <Check size={24} className="text-teal-400 mx-auto" />
          <p className="text-white font-serif italic text-lg">Message sent to the hearth.</p>
          <p className="text-zinc-500 text-xs italic">We will cross paths in conversation shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required placeholder="Your name"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-500/30 placeholder:text-zinc-700 transition-colors"
            />
            <input
              required type="email" placeholder="Your email"
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-500/30 placeholder:text-zinc-700 transition-colors"
            />
          </div>
          <textarea
            required rows={4} placeholder="Your message or project scope..."
            value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-500/30 placeholder:text-zinc-700 resize-none transition-colors"
          />
          {status === 'error' && (
            <p className="text-rose-400 text-xs italic">Something strayed off path. Please try again.</p>
          )}
          <button type="submit" disabled={status === 'sending'}
            className="w-full h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 font-black uppercase tracking-widest rounded-xl text-[9px] hover:bg-teal-400 hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            <Send size={12} />
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </section>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      <StickyNav />
      
      {/* Soft Glow Ambient Accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-teal-900/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 space-y-20 relative z-10">

        {/* ── HERO HEADER ── */}
        <header className="space-y-6">
          <div className="flex items-center gap-3 text-teal-500/80">
            <TreePine size={14} className="text-amber-500/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">The Paradigm Shift</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
            Decoupling Capacity from the <span className="text-purple-300 italic">Institutional Grid</span>
          </h1>
          <p className="text-zinc-400 italic text-base max-w-2xl leading-relaxed border-l border-teal-500/20 pl-6 font-serif">
            Hearth & Horizon is a digital sanctuary engineered for public-sector professionals preparing to navigate complex career migrations into the technology and language data ecosystems.
          </p>
        </header>

        {/* ── CORE FRAMEWORK EXPOSITION ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen size={16} className="text-teal-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">The Infrastructure</h2>
          </div>
          <div className="prose prose-invert max-w-none space-y-4 text-xs text-zinc-400 leading-relaxed font-sans">
            <p>
              Public service conditioning installs a persistent myth: that your human utility belongs exclusively to the institution. When migrating across the threshold into the private sector, the primary challenge is not a lack of technical expertise—it is a translation deficit. 
            </p>
            <p>
              This environment aggregates structured tooling to return individual sovereignty back to the professional. Through an intuitive identity translation framework we call <strong className="text-zinc-200">Brigid</strong>, we help align, rewrite, and calibrate legacy skill sets against demanding market benchmarks.
            </p>
            <p>
              Members navigate their transition across core components: <strong className="text-zinc-200">The Horizon</strong>, our dedicated curation of high-alignment opportunities; <strong className="text-zinc-200">The Library</strong>, a calibrated repository of behavioral scripts and operational systems; and <strong className="text-zinc-200">The Hearth</strong>, a private dashboard interface where individuals securely anchor data, calculate scores, and track emotional weather patterns away from the noise of typical job hunts.
            </p>
          </div>
        </section>

        {/* ── INTENDED RECIPIENTS ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Users size={16} className="text-purple-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">Sectors in Transition</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Teachers & Education Specialists', 'Nurses & Healthcare Practitioners', 'Social Workers & Human Services Counsellors',
              'Government & Public Administrators', 'First Responders & Field Services', 'System Administrators Ready for Sovereignty'
            ].map((role, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                <div className="w-1 h-1 rounded-full bg-purple-500/60 shrink-0" />
                <span className="text-xs text-zinc-400 font-sans">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERT CONTEXT & CREDENTIALS ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Heart size={16} className="text-rose-400" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-400">The Architect’s Ledger</h2>
          </div>
          <div className="p-6 md:p-8 bg-gradient-to-b from-[#110E16] to-[#0D0B12] border border-white/5 rounded-[2rem] space-y-6">
            <p className="text-zinc-400 leading-relaxed italic font-serif text-base">
              "Operating deep inside institutional education systems for over 13 years taught me that transitioning your life work is never just a job search—it is a total migration of the self. This infrastructure is the map I needed when I walked away to build my own independent footprint."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-white/5 flex gap-3 items-start">
                <GraduationCap size={16} className="text-purple-400 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">Academic Anchor</h4>
                  <p className="text-xs font-serif text-zinc-300">Margaret Pardy, M.Ed.</p>
                  <p className="text-[10px] text-zinc-500 font-sans leading-tight">Indigenous Studies: Curriculum & Pedagogy</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950/40 border border-white/5 flex gap-3 items-start">
                <Compass size={16} className="text-teal-400 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">System Capacity</h4>
                  <p className="text-xs font-serif text-zinc-300">13-Year Framework Record</p>
                  <p className="text-[10px] text-zinc-500 font-sans leading-tight">Programmatic Compliance & Design</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGIC ADVISORY (INTEGRATED PRODUCTS) ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Strategic Advisory</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
          </div>
          <p className="text-xs text-zinc-500 font-sans max-w-xl leading-relaxed">
            For operational ecosystems, enterprise networks, or native startup models looking to intentionally translate public-sector talent pools or build structured digital SOPs.
          </p>
          <div className="space-y-4">
            {ADVISORY_SERVICES.map((s, i) => (
              <ServiceCard key={s.title} s={s} i={i} />
            ))}
          </div>
        </section>

        {/* ── CTA INTERACTION CHANNELS ── */}
        <section className="text-center pt-4">
          <Link to="/"
            className="inline-flex items-center gap-3 h-12 px-8 bg-teal-500 text-black font-black uppercase tracking-widest rounded-xl shadow-xl shadow-teal-500/20 text-[9px] hover:bg-teal-400 transition-all">
            Enter the Sanctuary Workspace <ArrowRight size={12} />
          </Link>
        </section>

        {/* ── CONTACT ENGAGEMENT ENGINE ── */}
        <ReachOutSection />

        {/* ── SME PLATFORM FOOTER ── */}
        <SMEFooter />

      </main>

      <ExpertiseBadge />
    </div>
  );
}