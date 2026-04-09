import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Sprout, Flame, Mountain, Heart, Send, CheckCircle } from 'lucide-react';

const GroveTiers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      setIsSubmitted(true);
    }
  });

  const tiers = [
    {
      name: 'Seedling',
      price: 'Free',
      description: 'Foundational access for those starting their journey.',
      icon: <Sprout className="w-5 h-5 text-teal-400" />,
      features: ['Linguistic Bridge: Gallery Access', '2 Resume Scans Per Month', '2 Library Downloads Per Month', 'Community View-only Access'],
      buttonText: 'Current Path',
      active: user?.subscription_tier === 'Free' || !user
    },
    {
      name: 'Hearthkeeper',
      price: '$5',
      unit: '/mo',
      description: 'Active transition tools to fuel your career pivot.',
      icon: <Flame className="w-5 h-5 text-orange-400" />,
      features: ['Unlimited Linguistic Bridge', 'Unlimited Resume Analysis', 'Full Library Access', 'Active Community Participation'],
      buttonText: 'Step into the Hearth',
      active: user?.subscription_tier === 'Hearthkeeper'
    },
    {
      name: 'Steward',
      price: '$8',
      unit: '/mo',
      description: 'Guard the forest and support fellow dwellers.',
      icon: <Mountain className="w-5 h-5 text-indigo-400" />,
      features: ['Everything in Hearthkeeper', 'Ecosystem Alignment Tools', 'Sponsor 1 Hearthkeeper Seat', 'Steward Badge & Recognition'],
      buttonText: 'Become a Steward',
      active: user?.subscription_tier === 'Steward'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-[#1A1423]">
      {/* Header - Muted Teal and Slates */}
      <div className="text-center mb-20">
        <span className="text-[10px] font-black text-teal-500/40 uppercase tracking-[0.5em]">Membership Tiers</span>
        <h1 className="text-6xl font-black text-teal-500/80 italic tracking-tighter uppercase mt-4">The Grove</h1>
        <p className="text-slate-500 font-light italic mt-4 max-w-xl mx-auto text-sm">
          Choose your pace. Whether you are seeking shelter or guarding the path, there is a place for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative bg-[#251D2F] border ${tier.active ? 'border-teal-500/30 shadow-[0_0_30px_rgba(45,212,191,0.05)]' : 'border-white/5'} rounded-[2.5rem] p-10 flex flex-col transition-all duration-500`}
          >
            {tier.active && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[8px] font-black uppercase px-4 py-1 rounded-full tracking-widest backdrop-blur-md">
                Your Current Path
              </div>
            )}
            
            <div className="mb-10">
              <div className="p-3 bg-white/5 w-fit rounded-xl mb-6">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-300 italic uppercase tracking-tighter">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-black text-slate-200">{tier.price}</span>
                {tier.unit && <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest ml-1">{tier.unit}</span>}
              </div>
              <p className="text-slate-500 text-xs italic mt-4 leading-relaxed font-light">{tier.description}</p>
            </div>

            <ul className="space-y-4 mb-12 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-tight">
                  <Check className="w-3.5 h-3.5 text-teal-500/40 shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.active}
              className={`w-full py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all duration-300 ${
                tier.active 
                ? 'bg-white/5 text-slate-600 cursor-default border border-white/5' 
                : 'bg-teal-500/80 text-[#1A1423] hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]'
              }`}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* The Sprout Clearing - Low White / High Atmosphere */}
      <div className="mt-32 max-w-3xl mx-auto">
        <div className="relative bg-white/[0.01] border border-white/5 backdrop-blur-sm rounded-[3rem] p-12 text-center overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/5 blur-[100px] rounded-full" />
          
          {!isSubmitted ? (
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="p-4 bg-teal-500/10 rounded-full transition-transform group-hover:scale-110 duration-700">
                <Heart className="w-6 h-6 text-teal-500/50" />
              </div>
              
              <p className="text-slate-400 text-sm font-light italic leading-relaxed max-w-lg mx-auto">
                "The forest grows together. If you are currently navigating a challenging transition and need a hand crossing the bridge, our Steward pool provides sponsored Hearthkeeper seats."
              </p>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-teal-500/70 font-black text-[10px] uppercase tracking-[0.4em] hover:text-teal-300 transition-all border-b border-teal-500/20 pb-2"
              >
                Request to Sprout a Seat
              </button>
            </div>
          ) : (
            <div className="relative z-10 animate-in fade-in zoom-in duration-700 py-4">
              <CheckCircle className="w-10 h-10 text-teal-500/40 mx-auto mb-6" />
              <h3 className="text-slate-300 font-black uppercase text-xs tracking-[0.3em]">Intention Received</h3>
              <p className="text-slate-500 text-sm italic mt-3">The forest will reach out as soon as a path opens.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Darkened with Blur */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1A1423]/95 backdrop-blur-xl">
          <div className="bg-[#251D2F] border border-white/10 w-full max-w-md rounded-[2.5rem] p-12 shadow-2xl">
            <h2 className="text-teal-500/80 font-black uppercase text-[10px] tracking-[0.3em] mb-8">Seedling Intention</h2>
            <textarea 
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full h-40 bg-black/40 border border-white/5 rounded-2xl p-6 text-slate-300 text-sm focus:ring-1 focus:ring-teal-500/30 transition-all resize-none mb-8 outline-none placeholder:text-slate-700"
              placeholder="Briefly share your mission..."
            />
            <div className="flex gap-4 font-black uppercase text-[10px] tracking-widest">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 text-slate-600 hover:text-slate-300 transition-all text-left">Cancel</button>
              <button 
                onClick={() => { if(intention) { requestMutation.mutate(intention); setIsModalOpen(false); } }}
                className="flex-[2] py-4 bg-teal-500/80 text-[#1A1423] rounded-xl hover:bg-teal-400 transition-all"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroveTiers;