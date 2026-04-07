import React from 'react';
import { HeartIcon, GiftIcon, CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
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

export default function PricingSection() {
  return (
    <div className="bg-[#1C1622] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 xl:p-10 ${
                tier.highlight
                  ? 'bg-transparent ring-2 ring-[#008080]'
                  : 'bg-[#1C1622] ring-1 ring-gray-800'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-2xl font-semibold leading-8 text-white">
                  {tier.name}
                </h3>
                {tier.label && (
                  <span className="rounded-full bg-gray-700/50 px-3 py-1 text-xs font-semibold leading-5 text-[#008080]">
                    {tier.label}
                  </span>
                )}
                <tier.icon className="h-7 w-7 text-gray-400" aria-hidden="true" />
              </div>
              
              <div className="mt-6">
                <div className="flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-[#008080]">
                    ${tier.price_intro}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-400">
                    / mo
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  (Introductory offer, then ${tier.price_standard}/mo)
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-[#008080]" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className="mt-10 block w-full rounded-full bg-[#008080] px-4 py-2 text-center text-sm font-semibold leading-6 text-white hover:bg-[#006666] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008080]"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}