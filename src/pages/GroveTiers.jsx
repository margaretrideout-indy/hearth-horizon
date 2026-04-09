import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CheckCircle2, Sprout, Flame, Mountain, Heart, Send, CheckCircle } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intention, setIntention] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: user } = useQuery({ 
    queryKey: ['me'], 
    queryFn: () => window.base44.auth.me() 
  });

  const requestMutation = useMutation({
    mutationFn: async (text) => {
      return await window.base44.entities.SeatRequest.create({
        userId: user?.id,
        userEmail: user?.email,
        intention: text,
        status: 'pending',
        requestDate: new Date().toISOString(),
      });
    },
    onSuccess: () => setIsSubmitted(true)
  });

  const tiers = [
    {
      name: 'Seedling',
      price: 'FREE',
      subtext: 'ALWAYS OPEN',
      description: '"Foundational access for those starting their journey."',
      icon: <Sprout className="w-5 h-5 text-teal-400" />,
      features: ['Foundational Badge', '2 Free PDFs/mo', 'Access to Library', 'Embers Chat'],
      buttonText: 'CURRENT PATH',
      active: user?.subscription_tier === 'Free' || !user,
    },
    {
      name: 'Hearthkeeper',
      price: '$3',
      subtext: '$5/MO AFTER FIRST MONTH',
      description: '"Removing limits to keep the fires burning bright."',
      icon: <Flame className="w-5 h-5 text-teal-400" />,
      features: ['Everything in Seedling', 'Unlimited PDF uploads', 'Hearthkeeper Badge'],
      buttonText: 'SELECT PLAN',
      active: user?.subscription_tier === 'Hearthkeeper',
    },
    {
      name: 'Steward',
      price: '$5',
      subtext: '$8/MO AFTER FIRST MONTH',
      description: '"Full oversight and total access to the entire Grove."',
      icon: <Mountain className="w-5 h-5 text-teal-400" />,
      features: ['Everything in Hearthkeeper', 'Ecosystem Alignment', 'The Canopy Hub'],
      buttonText: 'SELECT PLAN',
      active: user?.subscription_tier === 'Steward',
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1423] py-20 px-6 font-sans selection:bg-teal-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-[#241B2E] rounded-[2.5rem] p-10 flex flex-col border border-white/5 transition-all duration-500 hover:border-teal-500/20 shadow-2xl">
              <div className="mb-8 text-left">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-10">
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-1">{tier.name}</h3>
                <div className="text-4xl font-black text-white mb-1">{tier.price}</div>
                <div className="text-[10px] font-black text-teal-400 tracking-widest uppercase mb-6">{tier.subtext}</div>
                <p className="text-slate-400 text-sm italic font-light leading-relaxed">{tier.description}</p>
              </div>

              <div className="h-px bg-white/5 w-full mb-8" />

              <ul className="space-y-5 mb-12 flex-grow">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-4 text-xs font-medium text-slate-200 tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-teal-500/60" />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] transition-all duration-300 ${
                  tier.active 
                  ? 'bg-white/[0.03] text-slate-600 cursor-default border border-white/5' 
                  : 'bg-[#2DD4BF] text-[#1A1423] hover:bg-[#26bba8] hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]'
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}

          {/* Plant A Seed Card */}
          <div className="bg-[#241B2E] rounded-[2.5rem] p-10 flex flex-col border border-rose-500/10 shadow-2xl">
            <div className="mb-8 text-left">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-10 text-rose-500">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-1">Plant A Seed</h3>
              <div className="text-4xl font-black text-white mb-1">DONATE</div>
              <div className="text-[10px] font-black text-rose-500 tracking-widest uppercase mb-6">SUPPORT THE GROVE</div>
              <p className="text-slate-400 text-sm italic font-light leading-relaxed">"Pay it forward to keep the Hearth accessible."</p>
            </div>
            <div className="h-px bg-white/5 w-full mb-8" />
            <ul className="space-y-5 mb-12 flex-grow">
              {['Sponsor Badge', 'Supports Open Access', 'Warm Fuzzies'].map((f) => (
                <li key={f} className="flex items-center gap-4 text-xs font-medium text-slate-200 tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-rose-500/60" />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-5 bg-[#F43F5E] text-white rounded-2xl font-black text-[11px] tracking-[0.2em] hover:bg-[#e11d48] transition-all shadow-lg shadow-rose-500/20 uppercase">
              GIVE A SEED
            </button>
          </div>
        </div>

        {/* The Sprout Clearing */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="relative bg-white/[0.01] border border-white/5 backdrop-blur-sm rounded-[3rem] p-16 text-center overflow-hidden group">
            {!isSubmitted ? (
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="p-5 bg-teal-500/5 rounded-full border border-teal-500/10">
                  <Heart className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-slate-300 text-base font-light italic leading-relaxed max-w-xl mx-auto">
                  "The forest grows together. If you are currently navigating a challenging transition and need a hand crossing the bridge, our Steward pool provides sponsored Hearthkeeper seats."
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-teal-400 font-black text-[11px] uppercase tracking-[0.4em] hover:text-teal-300 transition-all border-b border-teal-400/20 pb-2"
                >
                  REQUEST TO SPROUT A SEAT
                </button>
              </div>
            ) : (
              <div className="relative z-10 animate-in fade-in zoom-in duration-1000">
                <CheckCircle className="w-12 h-12 text-teal-400/40 mx-auto mb-6" />
                <h3 className="text-slate-200 font-black uppercase text-xs tracking-[0.4em]">Intention Received</h3>
                <p className="text-slate-500 text-sm italic mt-4 tracking-wide">The forest will reach out as soon as a path opens.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-20 opacity-30">
          <p className="text-[10px] font-black text-slate-500 tracking-[0.5em] uppercase">Hearth & Horizon Ecosystem Tiers</p>
        </div>
      </div>

      {/* Sprout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1A1423]/95 backdrop-blur-xl">
          <div className="bg-[#241B2E] border border-white/10 w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-12">
            <h2 className="text-teal-500/80 font-black uppercase text-[10px] tracking-[0.3em] mb-10 text-left">Seedling Intention</h2>
            <textarea 
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full h-44 bg-black/40 border border-white/5 rounded-3xl p-6 text-slate-300 text-sm focus:ring-1 focus:ring-teal-500/30 transition-all resize-none mb-10 outline-none placeholder:text-slate-700 font-light italic"
              placeholder="Briefly share your mission..."
            />
            <div className="flex gap-8 font-black uppercase text-[10px] tracking-widest items-center">
              <button onClick={() => setIsModalOpen(false)} className="text-slate-600 hover:text-slate-300 transition-all">CANCEL</button>
              <button 
                onClick={() => { if(intention) { requestMutation.mutate(intention); setIsModalOpen(false); } }}
                className="flex-grow py-5 bg-[#2DD4BF] text-[#1A1423] rounded-2xl hover:bg-[#26bba8] transition-all"
              >
                SEND REQUEST
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroveTiers;