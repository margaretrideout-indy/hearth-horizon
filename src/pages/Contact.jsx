import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ExternalLink, Mail, DollarSign, Download,
  Copy, Check, Presentation, ClipboardList, Package,
  BookOpen, ChevronDown, Zap, Book, ArrowRight, Sparkles
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const MAIN_TAG = "hearthandh0a6-20";
const BOOKSHOP_URL = "https://bookshop.org/shop/hearthandhorizon";
const NOTION_VAULT_URL = "https://margaretpardy.gumroad.com/l/zuyjl";

const AMZ_LISTS = [
  { label: "Horizon Library", id: "3MQJ7V1EQV93P", isFeatured: true },
  { label: "Curiosity Cabinet", id: "3QPCFSBBZX0LS" },
  { label: "Analog Wayfarers", id: "WUQBYPAD7FSN" },
  { label: "Digital Hub", id: "2WS5M8FIVKJBV" },
  { label: "Ergonomic Sanctuary", id: "2BZUUE2ZJL0EL" }
].map(l => ({ ...l, url: `https://www.amazon.ca/hz/wishlist/ls/${l.id}?ref_=wl_share&tag=${MAIN_TAG}` }));

const generateScripts = (vault) => {
  const targetRole = vault?.selectedPath?.domain || "[Target Role]";
  const topSkill = vault?.skills?.find(s => s.status === 'aligned')?.skill || "[Core Expertise]";
  const salaryRange = vault?.selectedPath?.salary || "[Market Range]";
  return {
    outreach: [
      { title: "Phase 1: Soft Curiosity", script: `Hi [Name], I've been following your team's growth in ${targetRole}. As I transition my experience in ${topSkill} toward the private sector, I'm curious: what is the one 'unwritten' skill your team values most right now?` },
      { title: "Phase 2: The Value-Add", script: `Hi [Name], I saw the recent news about [Company Project]. It reminded me of a challenge we solved regarding ${topSkill}. Thought this insight might be useful for your team's current trajectory. No reply needed, just wanted to share!` },
      { title: "Phase 3: Sponsorship Request", script: `Hi [Name], your insights have been instrumental. I'm currently architecting my move into ${targetRole} and would value 15 minutes of your time to ask 3 specific questions about the roadmap at [Company].` },
      { title: "Phase 4: The Closing Loop", script: `Hi [Name], thank you again for the sync. I've applied for the ${targetRole} opening and mentioned our conversation regarding ${topSkill}. I'd value any internal perspective you're able to share with the hiring lead.` }
    ],
    salary: [
      { label: "The 'Anchor' Avoidance", script: `I am looking for a total compensation package that reflects the current market value for a ${targetRole} level of responsibility. Given my expertise in ${topSkill}, I am focusing on positions in the ${salaryRange} range. Does that align with your budget?` },
      { label: "The 'Total Rewards' Pivot", script: `I understand the base is fixed. Given my specialized background in ${topSkill}, can we discuss other levers such as a signing bonus or an accelerated performance review to align total rewards with the seniority of this ${targetRole} position?` },
      { label: "The 'Equity/Bonus' Bridge", script: `If we can't meet the ${salaryRange} base today, I'm open to structured performance bonuses or an equity stake that triggers upon reaching [Specific KPI] within my first 6 months.` }
    ]
  };
};

// ── ACCORDION SECTION ─────────────────────────────────────────────────────────
function CacheSection({ id, title, desc, icon, isOpen, onToggle, children }) {
  return (
    <div className="flex flex-col">
      <button onClick={onToggle}
        className={`w-full text-left bg-[#16121D]/40 border transition-all duration-300 ${isOpen ? 'rounded-t-[2rem] border-teal-500/30 bg-[#1C1622]' : 'rounded-[2rem] border-white/5 hover:border-white/10'}`}>
        <div className="p-6 md:p-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/40 border border-white/10">{icon}</div>
            <div>
              <h3 className="text-lg font-serif italic text-white">{title}</h3>
              <p className="text-[10px] text-zinc-600 italic mt-0.5">{desc}</p>
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
            className="overflow-hidden bg-[#1C1622] border-x border-b border-teal-500/30 rounded-b-[2rem]">
            <div className="p-6 md:p-10 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN WAYFARER'S CACHE ─────────────────────────────────────────────────────
export default function WayfarersCache({ vault, onSync, isAdmin, isSeedlingPlus }) {
  const [openSection, setOpenSection] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [provisionsTab, setProvisionsTab] = useState('vault'); // Default to your new product!

  const toggle = (id) => setOpenSection(prev => prev === id ? null : id);
  const scripts = generateScripts(vault);

  const normalizedTier = vault?.tier?.toLowerCase() || 'none';
  
  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-16 pb-48">

      {/* NARRATIVE BANNER */}
      <div className="p-5 rounded-[1.5rem] bg-purple-500/[0.03] border border-purple-500/10 flex items-center gap-4">
        <Package size={18} className="text-purple-500/60 shrink-0" />
        <p className="text-[11px] font-serif italic text-purple-200/50 leading-relaxed">
          "Your provisions are laid out. Reference literature, communication kits, and tools — everything for the road ahead."
        </p>
      </div>

      <div className="space-y-3">

        {/* THE IDENTITY LEDGER */}
        <CacheSection id="ledger" title="The Identity Ledger" desc="Worksheet PDF & Identity Slides — decouple your worth."
          icon={<ClipboardList className="text-teal-400" size={20} />}
          isOpen={openSection === 'ledger'} onToggle={() => toggle('ledger')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://docs.google.com/presentation/d/1GBzN0ClbJGQf0YGk405AecSRkQ_VaXQyaq_aRK1PyxM/edit?usp=drive_link" target="_blank" rel="noopener noreferrer"
              className="bg-black/40 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-teal-500/30 transition-all">
              <div className="mb-8">
                <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-500 mb-5"><Presentation size={18} /></div>
                <h4 className="text-white font-serif italic text-xl mb-1">Identity Slides</h4>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Master Class Slide Deck</p>
              </div>
              <div className="w-full h-12 bg-teal-500 text-black text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2">Open Deck <ExternalLink size={12} /></div>
            </a>
            <a href="https://drive.google.com/file/d/1_OchgdOvWFJ6vBWanoSNwSiwUvo6-dmp/view?usp=drive_link" target="_blank" rel="noopener noreferrer"
              className="bg-black/40 border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between hover:border-white/10 transition-all">
              <div className="mb-8">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-zinc-500 mb-5"><FileText size={18} /></div>
                <h4 className="text-white font-serif italic text-xl mb-1">Implementation Worksheet</h4>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Personal Workbook (PDF)</p>
              </div>
              <div className="w-full h-12 border border-zinc-800 text-white text-[9px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2"><Download size={12} /> Download Worksheet</div>
            </a>
          </div>
        </CacheSection>

        {/* THE BLUEPRINT */}
        <CacheSection id="blueprint" title="The Blueprint" desc="ATS-optimized resume template — ready to deploy."
          icon={<FileText className="text-purple-400" size={20} />}
          isOpen={openSection === 'blueprint'} onToggle={() => toggle('blueprint')}>
          <div className="bg-black/40 border border-white/5 p-12 rounded-[2.5rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 blur-[100px]" />
            <div className="relative z-10 space-y-4">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-black">Trailblazer's Blueprint</p>
              <h4 className="text-2xl font-serif italic text-white">ATS-Optimized Resume Template</h4>
              <a href="https://docs.google.com/document/d/1aEFtrexdb3deVUrvbnNX2kC69KPyrQoQF7o-rgYo5nw/edit?usp=sharing" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 h-14 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 transition-all">
                <FileText size={14} /> Secure Blueprint
              </a>
            </div>
          </div>
        </CacheSection>

        {/* SPONSORSHIP OUTREACH */}
        <CacheSection id="outreach" title="Sponsorship Outreach" desc="4-phase copy-paste scripts to turn contacts into advocates."
          icon={<Mail className="text-teal-400" size={20} />}
          isOpen={openSection === 'outreach'} onToggle={() => toggle('outreach')}>
          <div className="space-y-4">
            {scripts.outreach.map((item, i) => (
              <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{item.title}</span>
                  </div>
                  <button onClick={() => handleCopy(item.script, `out-${i}`)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-zinc-600 hover:text-teal-400 transition-all">
                    {copiedIndex === `out-${i}` ? <Check size={14} className="text-teal-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="font-mono text-[12px] text-zinc-400 italic leading-relaxed pl-4 border-l border-teal-500/20">"{item.script}"</p>
              </div>
            ))}
          </div>
        </CacheSection>

        {/* SALARY NEGOTIATIONS */}
        <CacheSection id="salary" title="Salary Negotiations" desc="Word-for-word tactical scripts for the negotiation table."
          icon={<DollarSign className="text-amber-400" size={20} />}
          isOpen={openSection === 'salary'} onToggle={() => toggle('salary')}>
          <div className="space-y-4">
            {scripts.salary.map((item, i) => (
              <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-[1.5rem]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{item.label}</span>
                  </div>
                  <button onClick={() => handleCopy(item.script, `sal-${i}`)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl text-zinc-600 hover:text-amber-400 transition-all">
                    {copiedIndex === `sal-${i}` ? <Check size={14} className="text-amber-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="font-mono text-[12px] text-zinc-400 italic leading-relaxed pl-4 border-l border-amber-500/20">"{item.script}"</p>
              </div>
            ))}
          </div>
        </CacheSection>

        {/* PROVISIONS FOR THE PATH */}
        <CacheSection id="provisions" title="Provisions for the Path" desc="Curated gear, tools & literature for the professional migrant."
          icon={<Package className="text-zinc-400" size={20} />}
          isOpen={openSection === 'provisions'} onToggle={() => toggle('provisions')}>
          <div className="space-y-6">
            {/* Tab switcher */}
            <div className="flex bg-white/[0.04] border border-white/10 rounded-xl p-1 gap-1 w-fit overflow-x-auto">
              {[
                { id: 'vault', label: 'Archetype Vault', icon: Sparkles },
                { id: 'amazon', label: 'Tools & Tech', icon: Package }, 
                { id: 'books', label: 'The Bookshop', icon: Book }
              ].map(tab => (
                <button key={tab.id} onClick={() => setProvisionsTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${provisionsTab === tab.id ? 'bg-teal-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}>
                  <tab.icon size={12} /> {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {provisionsTab === 'vault' ? (
                <motion.div key="vault" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                  <div className="p-8 bg-gradient-to-br from-[#1A1216] to-[#0D0B10] border border-pink-500/20 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Sparkles size={80} className="text-pink-400" />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase text-pink-500 tracking-[0.3em]">Identity System</span>
                      </div>
                      <h4 className="text-2xl font-serif italic text-white leading-tight">The Archetype Vault (Oracle Edition)</h4>
                      <p className="text-zinc-400 italic text-sm leading-relaxed max-w-md">
                        A digital divination deck and embodiment system for the modern sovereign. Draw your daily spirit and track your internal resonance.
                      </p>
                      <a href={NOTION_VAULT_URL} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 h-12 px-8 bg-pink-500 text-black font-black uppercase tracking-widest rounded-xl text-[9px] hover:bg-pink-400 transition-all shadow-lg shadow-pink-500/10">
                        Secure the Vault <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : provisionsTab === 'amazon' ? (
                <motion.div key="amz" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {AMZ_LISTS.map((list) => (
                      <a key={list.label} href={list.url} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center justify-between gap-3 bg-black/40 border border-white/10 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:border-teal-500/40 hover:text-teal-400 transition-all ${list.isFeatured ? 'sm:col-span-2 border-teal-500/30 bg-teal-500/5 py-5' : ''}`}>
                        <span className="flex items-center gap-2">
                          {list.isFeatured ? <BookOpen size={13} className="text-teal-500" /> : <Package size={11} className="text-zinc-500" />}
                          {list.label}
                        </span>
                        <ExternalLink size={11} />
                      </a>
                    ))}
                  </div>
                  <p className="text-[8px] text-zinc-700 uppercase italic font-bold tracking-widest">As an Amazon Associate I earn from qualifying purchases.</p>
                </motion.div>
              ) : (
                <motion.div key="books" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                  <p className="text-zinc-500 italic text-sm">Literature and deep-dives into industry culture, ethics, and transition strategy.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={BOOKSHOP_URL} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 transition-all">
                      Bookshop.org <ArrowRight size={13} />
                    </a>
                    <button disabled className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-zinc-600 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest opacity-50 cursor-not-allowed">
                      Indigo — Coming Soon
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CacheSection>
      </div>
    </motion.div>
  );
}