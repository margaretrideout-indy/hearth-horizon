import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Sprout, Flame, Mountain, Heart, Send, CheckCircle, Lock } from 'lucide-react';

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
      icon: <Sprout className="w-6 h-6 text-teal-500" />,
      features: [
        'Linguistic Bridge: Gallery Access',
        '2 Resume Scans Per Month',
        '2 Library Downloads Per Month',
        'Community View-only Access'
      ],
      buttonText: 'Current Path',
      active: user?.subscription_tier === 'Free' || !user
    },
    {
      name: 'Hearthkeeper',
      price: '$5',
      unit: '/mo',
      description: 'Active transition tools to fuel your career pivot.',
      icon: <Flame className="w-6 h-6 text-orange-400" />,
      features: [
        'Unlimited Linguistic Bridge',
        'Unlimited Resume Analysis',
        'Full Library Access',
        'Active Community Participation'
      ],
      buttonText: 'Step into the Hearth',
      active: user?.subscription_tier === 'Hearthkeeper'
    },
    {
      name: 'Steward',
      price: '$8',
      unit: '/mo',
      description: 'Guard the forest and support fellow dwellers.',
      icon: <Mountain className="w-6 h-6 text-indigo-400" />,
      features: [
        'Everything in Hearthkeeper',
        'Ecosystem Alignment Tools',
        'Sponsor 1 Hearthkeeper Seat',
        'Steward Badge & Recognition'
      ],
      buttonText: 'Become a Steward',
      active: user?.subscription_tier === 'Steward'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="text-[10px] font-black text-teal-500 uppercase tracking-[0.4em]">Membership Tiers</span>
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mt-4">The Grove</h1>
        <p className="text-slate-400 font-light italic mt-4 max-w-xl mx-auto">
          Choose your pace. Whether you are seeking shelter or guarding the path, there is a place for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative bg-[#251D2F] border ${tier.active ? 'border-teal-500/50' : 'border-white/5'} rounded-[3rem] p-10 flex flex-col transition-all hover:border-white/20`}
          >
            {tier.active && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-[#1A1423] text-[8px] font-black uppercase px-4 py-1 rounded-full tracking-widest">
                Your Current Path
              </div>
            )}
            
            <div className="mb-8">
              <div className="p-4 bg-white/5 w-fit rounded-2xl mb-6">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-black text-white">{tier.price}</span>
                {tier.unit && <span className="text-slate-500 text-xs font-bold uppercase">{tier.unit}</span>}
              </div>
              <p className="text-slate-400 text-xs italic mt-4 leading-relaxed">{tier.description}</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[11px] text-slate-300 font-medium uppercase tracking-tight">
                  <Check className="w-4 h-4 text-teal-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              disabled={tier.active}
              className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
                tier.active 
                ? 'bg-white/5 text-slate-500 cursor-default' 
                : 'bg-white text-[#1A1423] hover:bg-teal-400 hover:scale-[1.02]'
              }`}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* The Sprout Clearing */}
      <div className="mt-24 mb-12 max-w-3xl mx-auto">
        <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-[3rem] p-12 text-center overflow-hidden group">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-500/5 blur-[100px] rounded-full" />
          
          {!isSubmitted ? (
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="p-4 bg-teal-500/10 rounded-full transition-transform group-hover:scale-110 duration-500">
                <Heart className="w-6 h-6 text-teal-400" />
              </div>
              
              <div className="space-y-3">
                <p className="text-slate-200 text-sm font-light italic leading-relaxed max-w-lg mx-auto">
                  "The forest grows together. If you are currently navigating a challenging transition and need a hand crossing the bridge, our Steward pool provides sponsored Hearthkeeper seats."
                </p>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-2 text-teal-400 font-black text-[10px] uppercase tracking-[0.4em] hover:text-teal-300 transition-all border-b border-teal-400/20 pb-2 flex items-center gap-3"
              >
                Request to Sprout a Seat
              </button>
            </div>
          ) : (
            <div className="relative z-10 animate-in fade-in zoom-in duration-700 py-4">
              <CheckCircle className="w-10 h-10 text-teal-400 mx-auto mb-6" />
              <h3 className="text-white font-black uppercase text-xs tracking-[0.3em]">Intention Cast Into the Embers</h3>
              <p className="text-slate-500 text-sm italic mt-3">We will reach out as soon as a sponsored path opens for you.</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#1A1423]/90 backdrop-blur-md">
          <div className="bg-[#251D2F] border border-white/10 w-full max-w-md rounded-[3rem] p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-12">
            <div className="flex items-center gap-4 mb-8">
              <Sprout className="w-6 h-6 text-teal-400" />
              <h2 className="text-white font-black uppercase text-xs tracking-[0.3em]">Seedling Intention</h2>
            </div>
            
            <p className="text-slate-400 text-xs italic mb-8 leading-relaxed">
              Share a brief note about the career bridge you are building. Your intention will be shared with the Steward pool.
            </p>

            <textarea 
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full h-40 bg-black/30 border border-white/5 rounded-3xl p-6 text-slate-200 text-sm focus:ring-1 focus:ring-teal-500/50 transition-all resize-none mb-8 outline-none"
              placeholder="Example: Transitioning from curriculum management into language data..."
            />

            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 text-slate-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  requestMutation.mutate(intention);
                  setIsModalOpen(false);
                }}
                disabled={!intention || requestMutation.isPending}
                className="flex-[2] py-4 bg-teal-500 text-[#1A1423] rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-teal-400 disabled:opacity-30 transition-all flex items-center justify-center gap-2"
              >
                {requestMutation.isPending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Request</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroveTiers;