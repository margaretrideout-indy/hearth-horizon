import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ClipboardList, Users, FileText, ArrowRight, Sparkles } from 'lucide-react';

const CALENDLY_URL = "https://calendly.com"; // Replace with your actual Calendly/booking link
const DISCOVERY_PAYMENT_URL = "https://margaretpardy.gumroad.com"; // Replace with your actual payment link

const SERVICES = [
  {
    icon: ClipboardList,
    color: "text-teal-400",
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    title: "Curriculum Audits",
    description: "A structured review of institutional learning frameworks, identifying gaps and translating legacy curriculum into market-ready competencies.",
  },
  {
    icon: Users,
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    title: "Cultural Alignment Reviews",
    description: "Deep-dive assessments that map organizational culture against private-sector expectations, surfacing misalignments before they cost you.",
  },
  {
    icon: FileText,
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    title: "Digital Transition SOPs",
    description: "Custom standard operating procedures that bridge institutional processes with modern digital workflows — ready to implement on day one.",
  },
];

export default function Advisory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-200 font-sans page-fade-in">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-32 space-y-20">

        {/* ── HEADER ── */}
        <header className="space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-teal-500/70 mb-4">
              Corporate & Educational Advisory
            </p>
            <h1 className="text-5xl md:text-7xl font-serif italic text-white tracking-tighter leading-none mb-6">
              Transitioning Professionals{' '}
              <span className="text-zinc-600 font-sans not-italic font-extralight uppercase">
                from Institutions to the Digital Frontier.
              </span>
            </h1>
            <p className="max-w-2xl text-zinc-500 text-sm leading-relaxed italic border-l border-teal-500/20 pl-6">
              Specialized SME advisory for organizations and professionals navigating the shift from public-sector legacy to private-sector impact. Strategic. Measured. Human.
            </p>
          </motion.div>
        </header>

        {/* ── SERVICES GRID ── */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500">Services</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-teal-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-[2rem] border ${s.border} ${s.bg} flex flex-col gap-5`}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 ${s.color}`}>
                  <s.icon size={18} />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-serif italic text-white">{s.title}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed italic">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DISCOVERY SESSION CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-10 md:p-14 bg-gradient-to-br from-[#0F1A16] to-[#0A080D] border border-teal-500/20 rounded-[3rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.06),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-lg">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-teal-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-500/70">Discovery Session</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-snug">
                Ready to map the terrain?
              </h3>
              <p className="text-zinc-500 text-sm italic leading-relaxed">
                A focused 60-minute advisory session to assess your current position and chart a precise route forward.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <a
                href={DISCOVERY_PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 h-14 px-10 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 text-[10px] hover:bg-teal-400 transition-all"
              >
                Book Discovery Session <ExternalLink size={13} />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-12 px-8 bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:border-teal-500/30 hover:text-zinc-200 transition-all"
              >
                View Availability <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </motion.section>

        {/* ── BACK LINK ── */}
        <div className="text-center">
          <button
            onClick={() => navigate('/grove')}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            ← Return to the Grove
          </button>
        </div>
      </div>
    </div>
  );
}