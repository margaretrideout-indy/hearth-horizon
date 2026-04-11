import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Library as LibraryIcon, Book, Package, ExternalLink, 
  ShieldCheck, FileText, ArrowRight, ShoppingBag, MessageSquare,
  Search, Languages, Download, Cpu, Wind, Lock, Globe
} from 'lucide-react';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  
  const userTier = "Seedling"; 

  const filteredProvisions = PROVISIONS.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-6 md:p-12 font-sans selection:bg-teal-500/30">
      <div className="max-w-6xl mx-auto">
        {/* ... All your Header, Study, Dialect, and Provisions JSX goes here ... */}
        {/* Use the capitalized names: TRANSLATIONS, PROVISIONS, ECOSYSTEM_LINKS */}
      </div>
    </div>
  );
};

export default Library;

// --- DATA REPOSITORY (Stored at bottom to keep component clean) ---

const TRANSLATIONS = [
  { edu: "Front-line Delivery", ops: "Personalized User Experience (UX) & Scalable Execution" },
  { edu: "Project Individualization", ops: "Custom Stakeholder Requirements & Targeted KPI Development" },
  { edu: "Workflow Planning", ops: "Strategic Product Roadmapping & Lifecycle Management" },
  { edu: "Conflict Resolution", ops: "High-Stakes Stakeholder Facilitation & Resource Optimization" },
  { edu: "Client/Peer Relations", ops: "Cross-Functional Relationship Management (CRM)" },
  { edu: "Continuous Assessment", ops: "Iterative Feedback Loops & Real-time Data Analysis" },
  { edu: "Literary/Social Analysis", ops: "Qualitative Data Synthesis & Sentiment Mapping" }
];

const PROVISIONS = [
  { 
    title: "Community Resilience Guide", 
    tier: "Seedling", 
    type: "PDF", 
    icon: <ShieldCheck size={14}/>,
    description: "Foundational Canadian resources for career transitions."
  },
  { 
    title: "Basic Professional Template", 
    tier: "Seedling", 
    type: "DOCX", 
    icon: <FileText size={14}/>,
    description: "A clean, ATS-friendly baseline for immediate use."
  },
  { 
    title: "Teal HQ Search Tracker", 
    tier: "Seedling", 
    type: "EXT", 
    icon: <Zap size={14}/>,
    description: "External: Managed job application tracking platform."
  },
  { 
    title: "The Tech-Stack Translator", 
    tier: "Hearthkeeper", 
    type: "TOOL", 
    icon: <Cpu size={14}/>,
    description: "Mapping classroom software to industry-standard tools."
  },
  { 
    title: "LinkedIn Outreach Embers", 
    tier: "Hearthkeeper", 
    type: "DOC", 
    icon: <MessageSquare size={14}/>,
    description: "High-conversion scripts for networking across Canada."
  },
  { 
    title: "Jobscan ATS Analyzer", 
    tier: "Hearthkeeper", 
    type: "EXT", 
    icon: <Search size={14}/>,
    description: "External: Audit your resume against specific job IDs."
  },
  { 
    title: "Executive Presence Framework", 
    tier: "Steward", 
    type: "STRATEGY", 
    icon: <Globe size={14}/>,
    description: "Leadership communication for senior corporate pivots."
  }
];

const ECOSYSTEM_LINKS = [
  { name: 'Invest in Canada', url: 'https://www.investcanada.ca' },
  { name: 'Canada Job Bank', url: 'https://www.jobbank.gc.ca' },
  { name: 'MaRS Discovery District', url: 'https://www.marsdd.com' }
];