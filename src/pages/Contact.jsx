import React from 'react';
import { 
  Zap, BookOpen, Target, Shield 
} from 'lucide-react';

export const libraryVolumeII = [
  {
    title: "The Reframing Engine",
    desc: "A deep-dive spreadsheet for translating academic pedagogy into corporate strategy and operations.",
    category: "Tools",
    icon: <Zap className="w-5 h-5" />,
    url: "https://docs.google.com/spreadsheets/d/your-id-here/edit", 
    tier: "Seedling"
  },
  {
    title: "Resume Migration Guide",
    desc: "Step-by-step walkthrough for stripping jargon and optimizing for private-sector ATS systems.",
    category: "Guides",
    icon: <BookOpen className="w-5 h-5" />,
    url: "https://docs.google.com/document/d/your-id-here/view", 
    tier: "Seedling"
  },
  {
    title: "The LinkedIn Ecosystem",
    desc: "Strategies for rebuilding your digital presence to attract recruiters outside of education.",
    category: "Strategy",
    icon: <Target className="w-5 h-5" />,
    url: "https://www.linkedin.com/pulse/your-article-link", 
    tier: "Hearthkeeper"
  },
  {
    title: "Salary Negotiation Protocols",
    desc: "Moving from set pay scales to open-market negotiation. Knowing your worth in the private sector.",
    category: "Financial",
    icon: <Shield className="w-5 h-5" />,
    url: "https://docs.google.com/presentation/d/your-id-here/preview", 
    tier: "Steward"
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0A080D] flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-white font-serif italic text-2xl mb-4">The Expansion Archives</h2>
        <p className="text-zinc-500 text-sm uppercase tracking-widest">
          Data migrated to Library Volume II
        </p>
      </div>
    </div>
  );
};

export default Contact;