import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Zap, Search, Shield, Sparkles } from 'lucide-react';

export default function AlignmentWidgets({ vault }) {
  const ethics = vault?.ethics || { reciprocity: 50, transparency: 50, agency: 50 };
  const lexicon = vault?.lexicon || [];

  const radarData = [
    { axis: 'Reciprocity', value: Number(ethics.reciprocity) },
    { axis: 'Transparency', value: Number(ethics.transparency) },
    { axis: 'Agency', value: Number(ethics.agency) },
  ];

  if (lexicon.length === 0 && !vault?.ethics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ETHICS RADAR */}
      {vault?.ethics && (
        <div className="bg-[#0D0B14] border border-purple-500/10 rounded-[2.5rem] p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-purple-400">Ethics Compass</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
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
          <div className="flex justify-around pt-2">
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

      {/* LEXICON LIST */}
      {lexicon.length > 0 && (
        <div className="bg-[#0D0B14] border border-teal-500/10 rounded-[2.5rem] p-8 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-teal-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-400">Alchemized Lexicon</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {lexicon.slice(0, 12).map((word, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-teal-500/[0.07] border border-teal-500/20 text-teal-300 text-[10px] rounded-full font-bold leading-tight"
              >
                {word.length > 35 ? word.substring(0, 35) + '…' : word}
              </span>
            ))}
          </div>
          {lexicon.length > 12 && (
            <p className="text-[9px] text-zinc-600 uppercase font-black">+{lexicon.length - 12} more in your lexicon</p>
          )}
        </div>
      )}
    </div>
  );
}