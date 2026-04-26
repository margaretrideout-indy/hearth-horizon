import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SanctuaryTransition from '../components/SanctuaryTransition';
import {
  Flame, Heart, Sprout, Globe, ShieldCheck, Check, Leaf, Mountain, UserPlus,
  Smartphone, Share2, PlusSquare, Sparkles, Send, Zap, FileText, Map, MessageSquare, Briefcase,
  MoreVertical, Star, Library as LibraryIcon, Compass, ArrowRight, LogIn, ChevronRight,
  Coffee // Added Coffee icon
} from 'lucide-react';
import { base44 } from '@/api/base44Client';

// ... (Keep your LEGACY_MAP and mapLegacyToHorizon function exactly as they are)

// ... (Keep your BrigidSampler component exactly as it is)

const GroveTiers = ({ vault, onSync }) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showTransition, setShowTransition] = useState(false);

  // KO-FI WIDGET INJECTION
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/widget/Widget_2.js';
    script.async = true;
    script.onload = () => {
      if (window.kofiwidget2) {
        window.kofiwidget2.init('Support the Smithy', '#14b8a6', 'I2I51EFK95');
        window.kofiwidget2.draw();
      }
    };
    document.body.appendChild(script);

    return () => {
      // Clean up the widget float if navigating away
      const kofiWidget = document.getElementById('kofi-widget-overlay');
      if (kofiWidget) kofiWidget.remove();
      document.body.removeChild(script);
    };
  }, []);

  // ... (Keep your handlers: handleBrigidSave, navigateToHearth, handlePaid, etc. as they are)

  return (
    <div className="relative min-h-screen bg-[#0A080D] text-slate-300 font-sans selection:bg-teal-500/30 overflow-x-hidden pb-20 text-left">
      <AnimatePresence>
        {showTransition && <SanctuaryTransition onComplete={() => navigate('/hearth')} />}
      </AnimatePresence>
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[100vh] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.1),rgba(147,51,234,0.03)_40%,transparent_80%)] pointer-events-none" />

      {/* NAVIGATION BAR - Keep existing code */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#0A080D]/90 backdrop-blur-xl border-b border-white/5" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
         {/* ... nav content ... */}
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-28 md:pt-36 pb-12 relative z-10">
        
        {/* HEADER & FEATURE GRID - Keep existing code */}

        {/* BRIGID SAMPLER - Keep existing code */}
        <BrigidSampler onSave={handleBrigidSave} />

        {/* PRICING GRID - Keep existing code */}

        {/* LUMINARY REGISTRY - Keep existing code */}

        {/* NEW: KO-FI "FUEL THE FORGE" SECTION */}
        <section className="mb-32 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[#110E16] to-[#0D0B12] border border-teal-500/10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Coffee size={20} className="text-teal-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-400/70">Fuel the Forge</span>
              </div>
              <h3 className="text-xl font-serif italic text-white mb-2">Buy the Architect a Coffee</h3>
              <p className="text-sm text-zinc-500 font-light max-w-sm">
                I build in solitude to keep the vision pure. Your support keeps the lights on and the ideas flowing.
              </p>
            </div>
            <div id="kofi-widget-container" className="shrink-0">
               {/* The widget draw() will target the floating button, 
                   but having this container helps spacing */}
               <a href='https://ko-fi.com/I2I51EFK95' target='_blank' rel='noreferrer' className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-black transition-all">
                 Visit my Ko-fi
               </a>
            </div>
          </motion.div>
        </section>

        {/* CONTACT SECTION - Keep existing code */}

        {/* MOBILE APP INSTRUCTIONS - Keep existing code */}

      </div>
    </div>
  );
};

export default GroveTiers;