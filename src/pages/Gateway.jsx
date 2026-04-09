import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Gift, Sprout, ArrowRight, Check, FileText, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LINK_HEARTHKEEPER = 'https://buy.stripe.com/00w00jdy0gCz0DWaG6dAk00';
const LINK_STEWARD = 'https://buy.stripe.com/eVq14n2Tm4TR4UcaG6dAk01';
const LINK_DONATION = 'https://buy.stripe.com/eVq4gzdy071Z1I0g0qdAk02';

export default function Gateway() {
  const teal = "#2DD4BF";

  const handleLoginClick = () => {
    import('@/api/base44Client').then(m => {
      m.base44.auth.redirectToLogin('/hearth');
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1423] font-sans selection:bg-[#2DD4BF]/30">
      {/* Navigation Overlay */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-6">
        <Link to="/install" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#2DD4BF] transition-colors">Install App</Link>
        <button 
          onClick={handleLoginClick} 
          style={{ borderColor: `${teal}40`, color: teal }}
          className="px-5 py-2 border rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2DD4BF]/10 transition-all"
        >
          Log In
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Glow Effects */}
        <div style={{ backgroundColor: teal }} className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full blur-[150px] opacity-10 bg-purple-600" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-8">
               <TreePine style={{ color: teal }} className="w-6 h-6" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Founded by Margaret, M.Ed.</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-8">
              Ground your history.<br />
              <span style={{ color: teal }}>Map your horizon.</span>
            </h1>
          </motion.div>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-light leading-relaxed mb-10">
            A sanctuary for public-sector professionals to anchor years of wisdom and find a high-autonomy ecosystem—without losing who they are.
          </p>

          <Button 
            asChild 
            style={{ backgroundColor: teal, color: '#1A1423' }}
            className="h-14 px-10 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
          >
            <a href="#pricing">Join the Founding Forest <ArrowRight className="ml-2 w-4 h-4" /></a>
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Choose Your Place in the Forest</h2>
            <p className="text-slate-500 text-sm italic">Join as a Founding Member to anchor this grove.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* TIER 0: THE SEEDLING */}
            <Card className="bg-[#251D2F] p-8 border-white/5 flex flex-col justify-between hover:border-white/10 transition-all group">
              <div>
                <Sprout className="w-6 h-6 text-slate-500 mb-6 group-hover:text-[#2DD4BF] transition-colors" />
                <h3 className="text-white font-bold text-lg mb-2">The Seedling</h3>
                <div className="text-2xl font-bold text-slate-300 mb-6">$0</div>
                <ul className="space-y-4 text-xs text-slate-400">
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span>Access to <strong className="text-white">The Embers</strong> campfire chat</span></li>
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span>2 Bridge Builder crossings (PDFs) / month</span></li>
                </ul>
              </div>
              <Button asChild variant="outline" className="mt-8 border-white/10 text-white hover:bg-white/5 rounded-lg">
                <Link to="/hearth">Enter the Grove</Link>
              </Button>
            </Card>

            {/* TIER 1: THE HEARTHKEEPER */}
            <Card className="bg-[#251D2F] p-8 border-white/5 flex flex-col justify-between hover:border-[#2DD4BF]/30 transition-all">
              <div>
                <Heart style={{ color: teal }} className="w-6 h-6 mb-6" />
                <h3 className="text-white font-bold text-lg mb-2">The Hearthkeeper</h3>
                <div className="text-2xl font-bold text-white mb-1">$3 <span className="text-xs text-slate-500">/ mo</span></div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6">(Early access pricing)</p>
                <ul className="space-y-4 text-xs text-slate-400">
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span>Everything in <strong className="text-white">Seedling</strong></span></li>
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span>Support this sanctuary's ecosystem</span></li>
                </ul>
              </div>
              <Button asChild style={{ backgroundColor: teal, color: '#1A1423' }} className="mt-8 rounded-lg font-bold"><a href={LINK_HEARTHKEEPER}>Select</a></Button>
            </Card>

            {/* TIER 2: THE STEWARD */}
            <Card style={{ borderColor: `${teal}40` }} className="bg-[#251D2F] p-8 border-2 flex flex-col justify-between shadow-2xl shadow-[#2DD4BF]/5 md:-translate-y-4">
              <div>
                <Gift style={{ color: teal }} className="w-6 h-6 mb-6" />
                <h3 className="text-white font-bold text-lg mb-2">The Steward</h3>
                <div className="text-2xl font-bold text-white mb-1">$5 <span className="text-xs text-slate-500">/ mo</span></div>
                <p className="text-[10px] text-[#2DD4BF] uppercase tracking-widest mb-6">Founding Pillar</p>
                <ul className="space-y-4 text-xs text-slate-400">
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span>Everything in <strong className="text-white">Hearthkeeper</strong></span></li>
                  <li className="flex items-start gap-3"><Check style={{ color: teal }} className="w-4 h-4 mt-0.5 shrink-0" /> <span><strong className="text-white">Sponsor a peer seat</strong></span></li>
                </ul>
              </div>
              <Button asChild style={{ backgroundColor: teal, color: '#1A1423' }} className="mt-8 rounded-lg font-bold shadow-lg shadow-[#2DD4BF]/20"><a href={LINK_STEWARD}>Select</a></Button>
            </Card>

            {/* TIER 3: PLANT A SEED */}
            <Card className="bg-[#251D2F] p-8 border-white/5 flex flex-col justify-between hover:border-white/10 transition-all">
              <div>
                <Sprout className="w-6 h-6 text-purple-400 mb-6" />
                <h3 className="text-white font-bold text-lg mb-2">Plant a Seed</h3>
                <div className="text-2xl font-bold text-white mb-6">Custom</div>
                <ul className="space-y-4 text-xs text-slate-400">
                  <li className="flex items-start gap-3"><Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> <span>Flexible one-time contribution</span></li>
                  <li className="flex items-start gap-3"><Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" /> <span>Directly fund the Voucher Pool</span></li>
                </ul>
              </div>
              <Button asChild variant="outline" className="mt-8 border-white/10 text-white hover:bg-white/5 rounded-lg"><a href={LINK_DONATION}>Contribute</a></Button>
            </Card>

          </div>
          
          <div className="text-center mt-20">
            <p className="text-slate-500 text-xs uppercase tracking-widest">
              Already a member? <button onClick={handleLoginClick} style={{ color: teal }} className="font-bold hover:underline ml-2">Log in here</button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}