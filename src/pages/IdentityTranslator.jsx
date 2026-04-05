import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TRANSLATIONS = [
 
  { 
    legacy: "Designing & Implementing Curricular Frameworks", 
    tech: "Product Lifecycle & Instructional Design: Developing end-to-end information delivery systems." 
  },
  { 
    legacy: "Differentiating Instruction for Diverse Learners", 
    tech: "UX Personalization & Accessibility: Customizing complex content for varying user personas." 
  },
  { 
    legacy: "Leading Program Initiatives", 
    tech: "Project & Program Management: Managing cross-functional projects with strict deadlines." 
  },
  { 
    legacy: "Culturally Responsive Teaching & Advocacy", 
    tech: "Inclusivity & Localization (L10n): Adapting content for diverse global standards." 
  },
  { 
    legacy: "Classroom & Behavioral Management", 
    tech: "Community Operations: Coordinating high-density groups in fast-paced settings." 
  },
  { 
    legacy: "Assessing Student Growth & Data Analysis", 
    tech: "QA (Quality Assurance): Analyzing performance data to ensure quality standards." 
  },
  { 
    legacy: "Facilitating High-Stakes Parent/Staff Meetings", 
    tech: "Client Success: Translating technical progress into clear, actionable terms for stakeholders." 
  },
  { 
    legacy: "Managing Rapid-Fire Instructional Objectives", 
    tech: "Agile Execution & Sprint Planning: Executing deliverables in constantly changing environments." 
  }
];

export default function IdentityTranslator() {
  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background: `linear-gradient(135deg, hsl(280, 25%, 11%) 0%, hsl(183, 35%, 14%) 60%, hsl(35, 40%, 13%) 100%)`,
      }}
    >
      <div className="max-w-3xl mx-auto space-y-8">
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
          <h1 className="font-heading text-4xl font-bold text-foreground">🕯️ The Identity Translator</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Shedding light on your hidden expertise. Use these translations to bridge the gap between your career history and your tech horizon.
          </p>
        </motion.div>

        {/* Translation Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl backdrop-blur-sm"
          style={{ background: 'hsla(280, 25%, 12%, 0.82)' }}
        >
          {/* Table header */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <div className="px-4 py-3 bg-white/5">
              <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Legacy Language</p>
              <p className="text-xs text-muted-foreground mt-0.5">Public / Education</p>
            </div>
            <div className="px-4 py-3 bg-white/5 border-l border-white/10">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">Tech Language</p>
              <p className="text-xs text-muted-foreground mt-0.5">Corporate / Data</p>
            </div>
          </div>

          {/* Rows */}
          {TRANSLATIONS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-b border-white/5 last:border-0 transition-colors"
            >
              <div className="px-4 py-4 flex items-start">
                <span className="text-sm text-amber-300/90 font-medium leading-relaxed">"{row.legacy}"</span>
              </div>
              <div className="px-4 py-4 flex items-start border-l border-white/5">
                <span className="text-sm text-foreground/85 leading-relaxed">"{row.tech}"</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}