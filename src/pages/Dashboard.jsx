import React from 'react';
import { HeartIcon, GiftIcon, CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    id: 'tier-hearthkeeper',
    name: 'The Hearthkeeper',
    icon: HeartIcon,
    price_intro: '3',
    price_standard: '5',
    features: [
      'Everything in Seedling',
      'Unlimited PDF uploads & deep-dive analysis',
      'Support this sanctuary\'s ecosystem',
      'Founding Member status',
    ],
    highlight: false,
  },
  {
    id: 'tier-steward',
    name: 'The Steward',
    icon: GiftIcon,
    price_intro: '5',
    price_standard: '8',
    features: [
      'Everything in Hearthkeeper',
      'Sponsor a peer seat in transition',
      'Community Voting rights',
    ],
    highlight: true,
    label: 'Reciprocity',
  },
];

export default function DashboardPricing() {
  return (
    <div className="bg-[#1C1622] rounded-3xl py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Support the Grove</h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Choose a tier to unlock deep-dive analysis and support fellow educators.
          </p>
        </div>
        
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={
                tier.highlight
                  ? 'rounded-3xl p-8 bg-[#2D2438] ring-2 ring-[#008080] flex flex-col justify-between'
                  : 'rounded-3xl p-8 bg-[#1C1622] ring-1 ring-gray-800 flex flex-col justify-between'
              }
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-xl font-semibold leading-8 text-white">{tier.name}</h3>
                  {tier.label && (
                    <span className="rounded-full bg-[#008080]/10 px-3 py-1 text-xs font-semibold leading-5 text-[#008080]">
                      {tier.label}
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-[#008080]">${tier.price_intro}</span>
                    <span className="text-sm font-semibold leading-6 text-gray-400">/ mo</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    (Introductory offer, then ${tier.price_standard}/mo)
                  </p>
                </div>

                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-[#008080]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                type="button"
                className="mt-10 block w-full rounded-full bg-[#008080] px-4 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-[#006666] transition-colors"
              >
                Upgrade to {tier.name.replace('The ', '')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}