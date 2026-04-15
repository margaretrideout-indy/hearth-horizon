import React from 'react';
import { 
  BookOpen, Compass, Shield, Sparkles, 
  Target, Zap, Coffee, Map 
} from 'lucide-react';

// This file now serves as Volume II of your Digital Library
export const libraryVolumeII = [
  {
    title: "The Emotional Landscape",
    desc: "Mapping the psychological shifts that occur when leaving a long-term career.",
    category: "Mindset",
    icon: <Compass className="w-5 h-5" />,
    link: "#",
    tier: "Seedling"
  },
  {
    title: "Identity Decoupling",
    desc: "Exercises to separate your self-worth from your previous job title.",
    category: "Philosophy",
    icon: <Shield className="w-5 h-5" />,
    link: "#",
    tier: "Hearthkeeper"
  },
  {
    title: "Market Topography",
    desc: "A high-level view of how public sector skills translate to private sector needs.",
    category: "Strategy",
    icon: <Map className="w-5 h-5" />,
    link: "#",
    tier: "Hearthkeeper"
  },
  {
    title: "The Quiet Pivot",
    desc: "How to network and explore new paths without triggering alarm bells in your current role.",
    category: "Tactics",
    icon: <Zap className="w-5 h-5" />,
    link: "#",
    tier: "Steward"
  }
];

// We keep a default export so the app doesn't break if a route still points here
export default function VolumeII() {
  return null; 
}