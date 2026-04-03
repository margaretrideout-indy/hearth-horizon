import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { format } from 'date-fns';

const SENTIMENT_COLORS = {
  Rooted: 'text-emerald-400 bg-emerald-400/10',
  Reaching: 'text-sky-400 bg-sky-400/10',
  Weathering: 'text-amber-400 bg-amber-400/10',
  Blooming: 'text-pink-400 bg-pink-400/10',
};

export default function LogbookPanel({ user }) {
  const { data: logs = [] } = useQuery({
    queryKey: ['rootwerkLogs', user?.id],
    queryFn: () => base44.entities.RootwerkLog.filter({ user_id: user.id }, '-created_date', 20),
    enabled: !!user?.id,
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-secondary" />
        <h2 className="font-heading font-semibold text-xl">Your Logbook</h2>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">Your journal entries will appear here once you begin writing in The Rootwork.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl p-4"
              style={{
                background: 'hsla(280, 40%, 18%, 0.25)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid hsla(280, 30%, 40%, 0.15)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground/60">
                  {log.created_date ? format(new Date(log.created_date), 'MMM d, yyyy') : ''}
                </span>
                {log.sentiment_tag && (
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${SENTIMENT_COLORS[log.sentiment_tag] || 'text-muted-foreground bg-muted/20'}`}>
                    {log.sentiment_tag}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{log.entry_body}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}