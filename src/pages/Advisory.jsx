import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Users, FileText, GraduationCap, ChevronDown } from 'lucide-react';
import ExpertiseBadge from '../components/ExpertiseBadge';
import StickyNav from '@/components/StickyNav';
import SMEFooter from '@/components/SMEFooter';

const SERVICES = [
  {
    icon: ClipboardList,
    title: "Curriculum Audits",
    description: "A structured review of institutional learning frameworks. Identifies gaps and translates legacy curriculum into market-ready competencies. Delivered as a written report — no ongoing engagement required.",
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
    description: "Custom standard operating procedures that bridge institutional processes with modern digital workflows. Built to implement on day one — no handholding required.",
    bullets: ["Role-specific SOP templates", "Digital tool mapping", "Onboarding checklist package"],
  },
];

function ServiceCard({ s, i, navigate }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      key={s.title}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.08 }}
      className="p-8 md:p-10 rounded-[2rem] bg-[#0E0C14] border border-zinc-800 flex flex-col gap-5"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-teal-400 shrink-0 mt-0.5">
          <s.icon size={18} />
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-serif italic text-purple-300">{s.title}</h3>
          <p className="text-[12px] text-zinc-500 leading-relaxed italic">{s.description}</p>
        </div>
      </div>

      {/* Progressive disclosure */}
      <button onClick={() => setExpanded(p => !p)}
        className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-zinc-400 transition-colors w-fit pl-14">
        <ChevronDown size={11} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Less detail' : "What's included"}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-14 space-y-2">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[11px] text-zinc-600">
                <span className="text-teal-500/40 mt-0.5 shrink-0">—</span> {b}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="pl-14">
        <button
          onClick={() => navigate('/')}
          className="py-3 px-8 bg-teal-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20">
          Get the {s.title.split(' ')[0]} Audit →
        </button>
      </div>
    </motion.div>
  );
}

export default function Advisory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-200 font-sans page-fade-in">
      <StickyNav />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-40 space-y-32">

        {/* ── HEADER ── */}
        <header className="space-y-6 pt-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700 mb-5">
              SME Knowledge Products
            </p>
            <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter leading-tight mb-6">
              The Expertise,<br />
              <span className="text-teal-400">Packaged.</span>
            </h1>
            <p className="max-w-xl text-zinc-500 text-sm leading-relaxed italic border-l border-zinc-800 pl-6">
              13 years of curriculum architecture and institutional leadership — distilled into digital products. No meetings. No retainers. Buy the output, use it immediately.
            </p>
          </motion.div>
        </header>

        {/* ── SERVICES ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700">What's Available</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
          </div>

          <div className="space-y-5">
            {SERVICES.map((s, i) => <ServiceCard key={s.title} s={s} i={i} navigate={navigate} />)}
          </div>
        </section>

        {/* ── SME FOOTER ── */}
        <div>
          <SMEFooter />
        </div>
      </div>

      <ExpertiseBadge />
    </div>
  );
}