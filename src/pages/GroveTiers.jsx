import React from 'react';
import { 
  Flame, 
  Wind, 
  Zap, 
  BookOpen, 
  Lock,
  ChevronRight,
  TrendingUp,
  MessagesSquare,
  Compass
} from 'lucide-react';

const GroveTiers = () => {
  // Navigation items with their "locked" status based on user tier
  const navigationItems = [
    {
      title: "Your Hearth",
      desc: "Your personal sanctuary. Profile, journey tracking, and private reflections.",
      icon: <Flame className="w-6 h-6" />,
      status: "unlocked",
      path: "/hearth"
    },
    {
      title: "The Bridge",
      desc: "Blueprints for the transition. Mapping your classroom expertise to the tech landscape.",
      icon: <Wind className="w-6 h-6" />,
      status: "locked",
      path: "/bridge"
    },
    {
      title: "The Library",
      desc: "Provisions for the journey: essential kits, vetted tools, and mental health sanctuaries.",
      icon: <BookOpen className="w-6 h-6" />,
      status: "unlocked",
      path: "/library"
    },
    {
      title: "Horizon Scan",
      desc: "Forward-looking analysis of tech trends, language data, and the future of work.",
      icon: <TrendingUp className="w-6 h-6" />,
      status: "locked",
      path: "/horizon"
    },
    {
      title: "Embers Chat",
      desc: "Community dialogues and real-time support from fellow guides and pivoters.",
      icon: <MessagesSquare className="w-6 h-6" />,
      status: "locked",
      path: "/embers"
    },
    {
      title: "The Canopy",
      desc: "The bird's-eye view. Resource index, site-wide search, and archival materials.",
      icon: <Compass className="w-6 h-6" />,
      status: "unlocked",
      path: "/canopy"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0A15] text-slate-300 p-8 md:p-12 lg:p-16 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* THE GUIDE'S NOTE (The "Why") */}
        <header className="mb-32 text-center animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500/80">
              Welcome to the Grove
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif italic text-white mb-10 leading-tight">
            A migration of the self.
          </h1>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-10 italic">
              "After thirteen years in the classroom and a Master’s spent studying the deep roots of community and identity, I realized that a career pivot is more than a strategy—it’s a migration of the self. Hearth & Horizon is the sanctuary I wish I had when I stepped away from the chalkboard. We bring editorial rigor and psychological depth to the space between your past expertise and your future horizon."
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-serif italic text-xl">— Margaret</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Founder</span>
          </div>
        </header>

        {/* TIERS / NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`group relative p-8 rounded-[2rem] border transition-all duration-500 ${
                item.status === 'unlocked' 
                ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] cursor-pointer' 
                : 'bg-black/20 border-white/[0.02] opacity-60'
              }`}
            >
              {/* Lock Icon for Sub-Tiers */}
              {item.status === 'locked' && (
                <div className="absolute top-6 right-6 text-slate-700">
                  <Lock className="w-4 h-4" />
                </div>
              )}

              <div className="flex justify-between items-start mb-12">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                  item.status === 'unlocked' 
                  ? 'bg-teal-500/5 border-teal-500/10 text-teal-400 group-hover:scale-110' 
                  : 'bg-white/5 border-white/5 text-slate-600'
                }`}>
                  {item.icon}
                </div>
                {item.status === 'unlocked' && (
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:translate-x-1 transition-transform" />
                )}
              </div>

              <h3 className={`font-bold text-lg mb-2 ${item.status === 'unlocked' ? 'text-white' : 'text-slate-500'}`}>
                {item.title}
              </h3>
              <p className={`text-[11px] leading-relaxed font-light ${item.status === 'unlocked' ? 'text-slate-500' : 'text-slate-700'}`}>
                {item.desc}
              </p>

              {/* Status Indicator */}
              {item.status === 'locked' && (
                <div className="mt-6 pt-4 border-t border-white/[0.03]">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-800">Requires Canopy Access</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SITE MAP FLOW FOOTER */}
        <footer className="mt-32 py-12 border-t border-white/5 text-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.6em] text-slate-700">
            Grove &bull; Hearth &bull; Bridge &bull; Library &bull; Scan &bull; Embers &bull; Canopy
          </p>
        </footer>

      </div>
    </div>
  );
};

export default GroveTiers;