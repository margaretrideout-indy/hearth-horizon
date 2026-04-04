import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const QUESTIONS = [
  { id: 1, label: 'What is your ideal daily rhythm? (e.g., deep focus blocks, flexible hours, collaborative mornings)' },
  { id: 2, label: 'Which of your 13-year skills feels most energizing to you right now?' },
  { id: 3, label: 'What kind of impact do you most want your work to have in the world?' },
  { id: 4, label: 'What does financial and professional autonomy look like for you in 3 years?' },
  { id: 5, label: 'What is one thing you are ready to leave behind as you step into your new horizon?' },
];

export default function HorizonAudit() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }));

  const handleSubmit = () => setSubmitted(true);

  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background: `linear-gradient(135deg, hsl(280, 25%, 11%) 0%, hsl(183, 35%, 14%) 60%, hsl(35, 40%, 13%) 100%)`,
      }}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Back button */}
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
          <Link to="/hearth">
            <ArrowLeft className="w-4 h-4" />
            Return to The Grove
          </Link>
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="font-heading text-4xl font-bold text-foreground">🔭 The Horizon Audit</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Align your values with your next career move. Take a moment to reflect honestly.
          </p>
        </motion.div>

        {/* Form */}
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-sm"
            style={{ background: 'hsla(280, 25%, 12%, 0.82)' }}
          >
            {QUESTIONS.map((q, i) => (
              <div key={q.id} className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  <span className="text-amber-400 mr-2">{i + 1}.</span>{q.label}
                </label>
                <textarea
                  rows={3}
                  value={answers[q.id] || ''}
                  onChange={e => handleChange(q.id, e.target.value)}
                  placeholder="Your reflection..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none transition-all"
                />
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-background font-semibold mt-2"
            >
              Submit to Hearth
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 p-10 text-center space-y-4 shadow-2xl backdrop-blur-sm"
            style={{ background: 'hsla(280, 25%, 12%, 0.82)' }}
          >
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
            <h2 className="font-heading text-2xl font-semibold text-foreground">Your reflections are planted.</h2>
            <p className="text-muted-foreground text-sm">The forest holds your words. Return to The Grove to continue your journey.</p>
            <Button asChild variant="outline" className="border-white/20 text-foreground hover:bg-white/5">
              <Link to="/hearth">Return to The Grove</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}