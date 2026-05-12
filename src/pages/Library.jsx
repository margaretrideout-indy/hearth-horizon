import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, ExternalLink, Heart, Mic2, FileText, ShieldAlert,
  Package, Compass, Lock, ArrowRight, PhoneCall, Hammer,
  CheckCircle2, Flame, Package2, Upload, Loader2, RefreshCw,
  Trash2, ChevronDown, Zap, Search, Sparkles
} from 'lucide-react';
import WayfarersCache from './Contact';
import { base44 } from '@/api/base44Client';
import ExpertiseBadge from '../components/ExpertiseBadge';
import SMEFooter from '@/components/SMEFooter';

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const STRATEGY_DECK_URL = "https://docs.google.com/presentation/d/1fVgZKmxGaGh9GrqW3lFM_SMA0b9v60WLf533LdYv6ns/edit?slide=id.p1#slide=id.p1";

const VERB_MAP = [
  { legacy: "Taught", horizon: "Facilitated" }, { legacy: "Managed", horizon: "Spearheaded" },
  { legacy: "Helped", horizon: "Advocated" }, { legacy: "Led", horizon: "Championed" },
  { legacy: "Fixed", horizon: "Remediated" }, { legacy: "Organized", horizon: "Orchestrated" },
  { legacy: "Started", horizon: "Pioneered" }, { legacy: "Built", horizon: "Engineered" },
  { legacy: "Changed", horizon: "Transformed" }, { legacy: "Checked", horizon: "Audited" },
  { legacy: "Made", horizon: "Architected" }, { legacy: "Planned", horizon: "Strategized" },
  { legacy: "Wrote", horizon: "Authored" }, { legacy: "Ran", horizon: "Directed" },
  { legacy: "Saved", horizon: "Conserved" }, { legacy: "Expanded", horizon: "Amplified" },
];

const VALUE_DIMENSIONS = [
  { id: 'reciprocity', label: 'Reciprocity', description: 'Balancing extraction with contribution.' },
  { id: 'luminescence', label: 'Luminescence', description: 'Radical honesty in process and culture.' },
  { id: 'sovereignty', label: 'Sovereignty', description: 'Autonomy over the migration path.' },
];

const sanctuaryResources = [
  {
    title: "Sanctuary Lifeline", type: "Priority Access", icon: PhoneCall, color: "text-rose-400",
    description: "A CMHA resource for nurturing mental health through adult life, paired with immediate crisis support.",
    link: "https://cmha.ca/wp-content/uploads/2016/02/MH-for-Life-NTNL-brochure-2014-web.pdf",
    crisis: { line: "9-8-8", label: "Suicide Crisis Helpline — Call or text anytime" }
  },
  {
    title: "Burnout to Balance", type: "PDF Guide", icon: FileText, color: "text-orange-400",
    description: "A comprehensive guide to reclaiming your energy and setting sustainable boundaries.",
    link: "https://static1.squarespace.com/static/5d3080f196bac8000148b997/t/664cfc0539541d281b05c587/1716321288694/GKYMH+From+Burnout+to+Balance.pdf"
  },
  {
    title: "Your Inner Advocate", type: "Podcast", icon: Mic2, color: "text-teal-400",
    description: "A podcast dedicated to changing the internal narrative and advocating for your own mental well-being.",
    link: "https://podcasts.apple.com/ca/podcast/your-inner-advocate/id1722984987"
  }
];

// ── BRIGID'S COUNSEL ─────────────────────────────────────────────────────────
function BrigidsCounsel({ vault, onSync }) {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !onSync) return;
    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const resumeData = { name: file.name, url: file_url, lastModified: new Date().toISOString() };
      setIsAnalyzing(true);
      let hearthRecord = null, resonance = null, bridgeAnalysis = null;
      try {
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `You are Brigid. Analyze this resume. Return JSON with: horizon_title (corporate title), power_verbs (array of 3 corporate action verbs), archetype (one-sentence identity), key_strengths (array of 3 transferable competencies), bridge_analysis (2-sentence private-sector summary). Resume: ${file.name}`,
          file_urls: [file_url],
          response_json_schema: {
            type: "object",
            properties: {
              horizon_title: { type: "string" },
              power_verbs: { type: "array", items: { type: "string" } },
              archetype: { type: "string" },
              key_strengths: { type: "array", items: { type: "string" } },
              bridge_analysis: { type: "string" }
            }
          }
        });
        hearthRecord = { horizon_title: res.horizon_title, power_verbs: res.power_verbs || [], archetype: res.archetype };
        resonance = res.key_strengths || [];
        bridgeAnalysis = res.bridge_analysis;
      } catch { /* silent */ }
      await base44.auth.updateMe({ resume_metadata: resumeData });
      onSync({ ...vault, resume: resumeData, bridge_analysis: bridgeAnalysis, currentDraft: resumeData, legacyResume: resumeData, hearthRecord, resonance, archetype: hearthRecord?.archetype || vault?.archetype });
      showToast("Legacy archived & analyzed.");
    } catch { showToast("Upload failed. Try again."); }
    finally { setIsUploading(false); setIsAnalyzing(false); }
  };

  const handleDelete = async () => {
    await base44.auth.updateMe({ resume_metadata: null });
    onSync({ ...vault, resume: null, bridge_analysis: null, legacyResume: null, hearthRecord: null });
    showToast("Resume cleared.");
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-xl text-[10px] font-black uppercase text-teal-400 tracking-widest text-center">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      {!vault?.resume ? (
        <label className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-[2rem] bg-black/40 cursor-pointer group transition-all ${isUploading || isAnalyzing ? 'border-teal-500/40' : 'border-white/5 hover:border-teal-500/20'}`}>
          {isAnalyzing ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="text-purple-400 animate-spin" size={24} />
              <span className="text-[10px] font-black uppercase text-purple-400 animate-pulse">Brigid is reading your legacy...</span>
            </div>
          ) : isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="text-teal-500 animate-spin" size={24} />
              <span className="text-[10px] font-black uppercase text-teal-500 animate-pulse">Archiving...</span>
            </div>
          ) : (
            <>
              <Upload className="text-zinc-600 mb-2 group-hover:text-teal-500 transition-colors" size={22} />
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest text-center px-4">Upload Resume / CV</span>
              <p className="text-[8px] text-zinc-600 uppercase mt-2 font-black">PDF, DOCX · Brigid will translate it</p>
            </>
          )}
          <input type="file" className="hidden" onChange={handleFileChange} disabled={isUploading || isAnalyzing} accept=".pdf,.doc,.docx" />
        </label>
      ) : (
        <div className="p-6 rounded-[2rem] bg-teal-500/5 border border-teal-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-teal-500" size={20} />
              <div>
                <p className="text-[10px] font-black uppercase text-teal-400 tracking-widest">Legacy Secured</p>
                <p className="text-[9px] text-zinc-500 italic mt-0.5 truncate max-w-[200px]">{vault.resume.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <label className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-zinc-400 hover:text-white cursor-pointer border border-white/10 px-3 py-1.5 rounded-full transition-colors">
                <RefreshCw size={9} /> Replace
                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
              </label>
              <button onClick={handleDelete} className="inline-flex items-center gap-1 text-[8px] font-black uppercase text-zinc-600 hover:text-rose-400 border border-white/5 px-3 py-1.5 rounded-full transition-colors">
                <Trash2 size={9} />
              </button>
            </div>
          </div>
          {vault?.hearthRecord?.horizon_title && (
            <div className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-teal-400/60 flex items-center gap-1"><Zap size={9} /> Horizon Title</p>
              <p className="text-sm font-serif italic text-teal-300">{vault.hearthRecord.horizon_title}</p>
              {vault.hearthRecord.power_verbs?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {vault.hearthRecord.power_verbs.map((v, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-black rounded-full">{v}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── SOUL COMPASS ─────────────────────────────────────────────────────────────
function SoulCompass({ vault, onSync }) {
  const [ethics, setEthics] = useState(vault?.ethics || { reciprocity: 50, luminescence: 50, sovereignty: 50 });
  const [isSaving, setIsSaving] = useState(false);
  const saveTimer = useRef(null);

  const handleChange = (id, val) => {
    const next = { ...ethics, [id]: val };
    setEthics(next);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      if (!onSync) return;
      setIsSaving(true);
      try { await base44.auth.updateMe({ ethics: next }); onSync({ ...vault, ethics: next }); }
      finally { setIsSaving(false); }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <p className="text-[10px] text-zinc-600 italic">
        {isSaving ? <span className="text-teal-500/60 animate-pulse">Syncing to Horizon...</span> : "Your calibration updates the Alignment badges in the Horizon in real-time."}
      </p>
      {VALUE_DIMENSIONS.map((dim) => (
        <div key={dim.id} className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm font-black uppercase tracking-widest text-zinc-200 block">{dim.label}</span>
              <span className="text-[10px] text-zinc-600 italic">{dim.description}</span>
            </div>
            <span className="text-xs font-mono text-purple-400 shrink-0 tabular-nums">{ethics[dim.id]}%</span>
          </div>
          <input type="range" min="0" max="100" value={ethics[dim.id]}
            onChange={(e) => handleChange(dim.id, Number(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none accent-purple-500 cursor-pointer" />
        </div>
      ))}
    </div>
  );
}

// ── RITE OF RENAMING ─────────────────────────────────────────────────────────
function RiteOfRenaming({ vault, onSync }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTransform = async () => {
    if (!query.trim()) return;
    const local = VERB_MAP.find(v => v.legacy.toLowerCase() === query.trim().toLowerCase());
    if (local) { setResult({ legacy: local.legacy, horizon: local.horizon, source: 'local' }); return; }
    setIsLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are Brigid. Transform this public-sector legacy task/verb into a single powerful corporate private-sector power verb or short phrase (max 3 words). Legacy task: "${query}". Return JSON with: legacy (the input), horizon (the transformation), rationale (one sentence why).`,
        response_json_schema: {
          type: "object",
          properties: { legacy: { type: "string" }, horizon: { type: "string" }, rationale: { type: "string" } }
        }
      });
      setResult({ ...res, source: 'brigid' });
      if (onSync && res.horizon) {
        const lexicon = [...(vault?.lexicon || [])];
        if (!lexicon.includes(res.horizon)) onSync({ ...vault, lexicon: [res.horizon, ...lexicon] });
      }
    } catch { setResult({ legacy: query, horizon: "Orchestrated", rationale: "Brigid could not reach the fire. Try again.", source: 'fallback' }); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="space-y-6">
      <p className="text-[10px] text-zinc-600 italic">Enter a legacy task or verb. Brigid will return your Horizon Power Verb.</p>
      <div className="flex gap-3">
        <input
          type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTransform()}
          placeholder="e.g. 'Supervised students' or 'Taught'"
          className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:outline-none focus:border-teal-500/40 placeholder:text-zinc-700 font-serif italic"
        />
        <button onClick={handleTransform} disabled={isLoading || !query.trim()}
          className="px-5 py-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-teal-500/20 transition-all disabled:opacity-40">
          {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
        </button>
      </div>
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-zinc-600 line-through uppercase tracking-widest">{result.legacy}</span>
              <ArrowRight size={12} className="text-purple-400 shrink-0" />
              <span className="text-lg font-serif italic text-purple-300">{result.horizon}</span>
              {result.source === 'brigid' && <Sparkles size={12} className="text-purple-400/60" />}
            </div>
            {result.rationale && <p className="text-[10px] text-zinc-600 italic border-l border-white/5 pl-3">"{result.rationale}"</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── ACCORDION TOOL ────────────────────────────────────────────────────────────
function SmithyTool({ tool, isOpen, onToggle, children }) {
  return (
    <div className="flex flex-col">
      <button onClick={onToggle}
        className={`relative w-full text-left bg-[#16121D]/40 border transition-all duration-300 ${isOpen ? 'rounded-t-[2rem] border-teal-500/40 bg-[#1C1622]' : 'rounded-[2rem] border-white/5 hover:border-teal-500/20'}`}>
        <div className="p-6 md:p-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 border border-white/10">
              {tool.icon}
            </div>
            <div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-500/50 block mb-1">{tool.type}</span>
              <h3 className="text-lg md:text-xl text-white font-serif italic">{tool.title}</h3>
              <p className="text-[10px] text-zinc-600 italic mt-0.5">{tool.desc}</p>
            </div>
          </div>
          <div className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-teal-500' : 'text-zinc-700'}`}>
            <ChevronDown size={22} strokeWidth={1.5} />
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#1C1622] border-x border-b border-teal-500/40 rounded-b-[2rem]">
            <div className="p-6 md:p-10 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── HIGH FORGE ────────────────────────────────────────────────────────────────
function HighForge({ vault, onSync, isAdmin, isSeedlingPlus, navigate }) {
  const [openTool, setOpenTool] = useState(null);
  const toggle = (id) => setOpenTool(prev => prev === id ? null : id);

  const smithyTools = [
    { id: 'brigid', title: "Brigid's Counsel", desc: "Upload your CV. Brigid translates your legacy.", type: "All Pilgrims", icon: <Upload className="text-teal-400" size={20} /> },
    { id: 'compass', title: "The Soul Compass", desc: "Calibrate Reciprocity, Luminescence & Sovereignty.", type: "All Pilgrims", icon: <Compass className="text-purple-400" size={20} /> },
    { id: 'rename', title: "The Rite of Renaming", desc: "Enter a legacy task. Receive your Horizon Power Verb.", type: "All Pilgrims", icon: <Zap className="text-amber-400" size={20} /> },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-32 pb-56">

      {/* QUICK-START GUIDE */}
      <section>
        <div className="bg-[#110E16]/60 border border-white/5 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
            <Compass size={120} />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">The Wayfarer’s Quick-Start Guide</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-[10px] text-teal-400 font-black">1</div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-white uppercase tracking-tighter">Internalize:</strong> Enter <span className="text-teal-400 font-bold">Your Hearth</span> to complete your optional Emoji Check-in and record your daily Reflection.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-[10px] text-teal-400 font-black">2</div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-white uppercase tracking-tighter">Translate:</strong> Stay here in the <span className="text-teal-400 font-bold">Library</span> to upload your resume for analysis and download specialized scripts.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-[10px] text-teal-400 font-black">3</div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-white uppercase tracking-tighter">Provisions:</strong> Check the <span className="text-teal-400 font-bold">Provisions</span> section (Volume II below) for resources curated for your journey.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-[10px] text-teal-400 font-black">4</div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-white uppercase tracking-tighter">Navigate:</strong> Visit the <span className="text-teal-400 font-bold">Horizon</span> board to see where your new corporate title can take you.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0 text-[10px] text-teal-400 font-black">5</div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    <strong className="text-white uppercase tracking-tighter">Connect:</strong> Join the <span className="text-teal-400 font-bold">Embers chat</span> to say hi and share the trail with fellow travelers!
                  </p>
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10 flex items-center gap-3">
                  <Heart size={16} className="text-pink-500 animate-pulse" />
                  <p className="text-[9px] text-zinc-500 italic">"Honor the person before the professional."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NARRATIVE BANNER */}
      <div className="p-5 rounded-[1.5rem] bg-amber-500/[0.03] border border-amber-500/10 flex items-center gap-4">
        <Flame size={18} className="text-amber-500/60 shrink-0" />
        <p className="text-[11px] font-serif italic text-amber-200/50 leading-relaxed">
          "The work begins here. Your legacy is being forged; your progress is safe by the fire."
        </p>
      </div>

      {/* STRATEGY DECK HERO */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">The Grand Map</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
        </div>
        <div className="p-10 md:p-14 bg-gradient-to-br from-[#16121D] to-[#0D0B10] border border-teal-500/20 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Compass size={140} />
          </div>
          <div className="relative z-10 space-y-5">
            <Badge className="bg-teal-500/10 text-teal-400 uppercase font-black px-4 py-1 border-teal-500/20 text-[9px]">The Grand Map of the Pilgrimage</Badge>
            <h4 className="text-3xl md:text-4xl text-white font-serif italic leading-tight max-w-lg">Master Strategy Deck</h4>
            <p className="text-zinc-400 italic max-w-md text-sm leading-relaxed">The complete architectural blueprint for career migration and resignation protocols.</p>
            {isSeedlingPlus ? (
              <a href={STRATEGY_DECK_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 h-14 px-10 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 text-[10px] hover:bg-teal-400 transition-all">
                Open Blueprint <ExternalLink size={14} />
              </a>
            ) : (
              <button onClick={() => navigate('/grove')}
                className="inline-flex items-center gap-3 h-14 px-10 bg-white/5 border border-white/10 text-zinc-400 font-black uppercase tracking-widest rounded-2xl text-[10px] hover:border-teal-500/20 transition-all">
                <Lock size={14} /> Unlock Blueprint
              </button>
            )}
          </div>
        </div>
      </section>

      {/* THE SMITHY — accordion tools */}
      <section>
        <div className="mb-6 flex items-center gap-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">The Smithy — Active Tools</h3>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/20 to-transparent" />
        </div>
        <div className="space-y-3">
          {smithyTools.map((tool) => (
            <SmithyTool key={tool.id} tool={tool} isOpen={openTool === tool.id} onToggle={() => toggle(tool.id)}>
              {tool.id === 'brigid' && <BrigidsCounsel vault={vault} onSync={onSync} />}
              {tool.id === 'compass' && <SoulCompass vault={vault} onSync={onSync} />}
              {tool.id === 'rename' && <RiteOfRenaming vault={vault} onSync={onSync} />}
            </SmithyTool>
          ))}
        </div>
      </section>

      {/* THE SANCTUARY */}
      <section className="space-y-10">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500"><Heart size={22} /></div>
          <div>
            <h2 className="text-2xl font-serif italic text-white">The Sanctuary</h2>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Mental Health & Resilience</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sanctuaryResources.map((item, idx) => (
            <Card key={idx} className={`group p-8 bg-[#0E0C14] border border-zinc-800 rounded-[2rem] flex flex-col justify-between h-full ${item.crisis ? 'ring-1 ring-rose-500/20' : ''}`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 ${item.color}`}><item.icon size={20} /></div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.crisis ? 'bg-rose-500 text-white border-rose-500' : 'text-zinc-600 bg-transparent border-zinc-800'}`}>{item.type}</span>
                </div>
                <h3 className="text-lg font-serif italic text-purple-300">{item.title}</h3>
                <p className="text-[12px] leading-relaxed text-zinc-500 italic">{item.description}</p>
                {item.crisis && (
                  <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <span className="text-xl font-black text-rose-500">{item.crisis.line}</span>
                    <span className="text-[9px] text-rose-200/70 font-bold uppercase tracking-widest">{item.crisis.label}</span>
                  </div>
                )}
              </div>
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${item.crisis ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-teal-500 text-black hover:bg-teal-400 shadow-md shadow-teal-500/20'}`}>
                Open Resource <ExternalLink size={12} />
              </a>
            </Card>
          ))}
        </div>
        <div className="p-6 rounded-[2rem] bg-teal-500/[0.02] border border-teal-500/10 flex items-center gap-5">
          <ShieldAlert size={28} className="text-teal-500 shrink-0" />
          <p className="text-xs text-zinc-500 italic font-serif leading-relaxed">
            "The Hearth is a tool for navigation, but your internal compass is the final authority. If the weight feels too heavy, please seek direct support from a licensed professional."
          </p>
        </div>
      </section>

      {/* HORIZON PORTAL CTA */}
      <section>
        <div className="p-10 md:p-14 bg-gradient-to-br from-[#0F1A16] to-[#08070B] border border-teal-500/20 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,184,166,0.05),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-teal-500/60">The Portal</p>
            <h3 className="text-2xl md:text-3xl font-serif italic text-white leading-snug max-w-lg mx-auto">
              Your identity is forged.<br />
              <span className="text-teal-400">The mists have cleared.</span>
            </h3>
            <p className="text-zinc-500 text-sm italic">Step into the Horizon.</p>
            <button onClick={() => navigate('/horizon')}
              className="inline-flex items-center gap-3 h-14 px-10 bg-teal-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-teal-500/20 text-[10px] hover:bg-teal-400 transition-all">
              Enter the Horizon <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ── MAIN LIBRARY ──────────────────────────────────────────────────────────────
export default function Library({ vault, onRefresh, onSync, isAdmin }) {
  const navigate = useNavigate();
  const [currentVolume, setCurrentVolume] = useState(1);

  const currentTier = vault?.tier?.toLowerCase() || 'none';
  const isRegistered = currentTier !== 'none' && currentTier !== 'traveler';
  const isSeedlingPlus = isAdmin || isRegistered || currentTier === 'admin' || currentTier === 'steward';
  const forgeComplete = !!(vault?.hearthRecord || vault?.legacyResume);

  const handleSync = onSync || onRefresh;

  const VOLUME_LABELS = {
    1: { tag: 'Volume I — The High Forge', subtitle: "Internal calibration. The source of your transformation." },
    2: { tag: "Volume II — The Wayfarer's Cache", subtitle: "External action. Everything provisioned for the road ahead." }
  };

  return (
    <div className="min-h-screen bg-[#0A080D] text-zinc-300 font-sans selection:bg-teal-500/30 overflow-x-hidden relative page-fade-in">
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-48 relative z-10">

        {/* HEADER */}
        <header className="mb-16 text-left">
          <div className="flex items-center gap-3 text-purple-400/70 mb-5">
            <BookOpen size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">
              {VOLUME_LABELS[currentVolume].tag}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none mb-6">
            The <span className="text-zinc-800 font-sans not-italic font-extralight uppercase">Library</span>
          </h1>
          <p className="max-w-xl text-zinc-500 text-sm leading-relaxed italic border-l border-purple-500/20 pl-6">
            {VOLUME_LABELS[currentVolume].subtitle}
          </p>
        </header>

        {currentVolume === 1
          ? <HighForge vault={vault} onSync={handleSync} isAdmin={isAdmin} isSeedlingPlus={isSeedlingPlus} navigate={navigate} />
          : <WayfarersCache vault={vault} onSync={handleSync} isAdmin={isAdmin} isSeedlingPlus={isSeedlingPlus} />
        }
      </div>

      {/* SME Footer */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <SMEFooter />
      </div>

      <ExpertiseBadge />

      {/* VOLUME NAV */}
      <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[110] w-fit px-4 max-w-[calc(100vw-2rem)]">
        <div className="bg-[#16121D]/90 backdrop-blur-xl rounded-full border border-white/10 p-2 shadow-2xl flex gap-2">
          <button onClick={() => setCurrentVolume(1)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 1 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Hammer size={12} /> High Forge
            {forgeComplete && <CheckCircle2 size={11} className={currentVolume === 1 ? 'text-black/60' : 'text-teal-500'} />}
          </button>
          <button onClick={() => setCurrentVolume(2)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentVolume === 2 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Package size={12} /> Wayfarer's Cache
          </button>
        </div>
      </div>
    </div>
  );
}