import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Zap, Search, Shield, Sparkles, FlaskConical } from 'lucide-react';

export default function AlignmentWidgets({ vault }) {
  const ethics = vault?.ethics || null;
  const lexicon = vault?.lexicon || [];
  const hasData = ethics || lexicon.length > 0;

  const radarData = ethics ? [
    { axis: 'Reciprocity', value: Number(ethics.reciprocity) },
    { axis: 'Transparency', value: Number(ethics.transparency) },
    { axis: 'Agency', value: Number(ethics.agency) },
  ] : [];

  // ── Empty / awaiting state ──────────────────────────────────────────────────
  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[2.5rem] bg-[#0D0B14] border border-dashed border-white/5 text-center space-y-3"
      >
        <FlaskConical size={28} className="text-zinc-700 mx-auto" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
          Awaiting your Lexicon Alchemy...
        </p>
        <p className="text-xs text-zinc-700 italic">
          Complete the Cultural Fit tool to populate your alignment snapshot.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D0B14] border border-white/5 rounded-[2.5rem] p-8 space-y-8"
      style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
    >
      {/* ── ETHICS COMPASS ── */}
      {ethics && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-purple-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400">Ethics Compass</span>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: '#52525b', fontSize: 9, fontWeight: 700 }}
              />
              <Radar
                dataKey="value"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.15}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>

          <div className="flex justify-around pt-1">
            {[
              { icon: Zap, label: 'Reciprocity', val: ethics.reciprocity, color: 'text-teal-400' },
              { icon: Search, label: 'Transparency', val: ethics.transparency, color: 'text-purple-400' },
              { icon: Shield, label: 'Agency', val: ethics.agency, color: 'text-amber-400' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="text-center">
                <Icon size={12} className={`${color} mx-auto mb-1`} />
                <div className={`text-sm font-black ${color}`}>{val}%</div>
                <div className="text-[8px] text-zinc-600 uppercase font-black">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DIVIDER between sections if both present ── */}
      {ethics && lexicon.length > 0 && (
        <div className="border-t border-white/5" />
      )}

      {/* ── ALCHEMIZED LEXICON ── */}
      {lexicon.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-teal-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-400">
              Alchemized Lexicon
            </span>
            <span className="ml-auto text-[9px] text-zinc-600 font-black">{lexicon.length} phrases</span>
          </div>

          {/* All phrases — no truncation, full wrap */}
          <div className="flex flex-wrap gap-2">
            {lexicon.map((phrase, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-teal-500/[0.07] border border-teal-500/15 text-teal-300 text-[11px] rounded-full font-semibold leading-relaxed"
                style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}