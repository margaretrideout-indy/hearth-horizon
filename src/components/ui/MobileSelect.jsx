import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

/**
 * MobileSelect — renders a native-feel bottom sheet on mobile,
 * and a standard dropdown-style list on desktop.
 *
 * Props:
 *   value: string         — currently selected value
 *   onChange: fn(value)   — called with the new value
 *   options: [{value, label}]
 *   placeholder: string
 *   label: string         — optional section label
 *   className: string     — extra classes for the trigger button
 */
export default function MobileSelect({ value, onChange, options = [], placeholder = 'Select…', label, className = '' }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`flex items-center justify-between gap-2 w-full bg-[#0E0C14] border border-zinc-800 rounded-2xl px-5 py-4 text-sm font-serif italic text-left transition-all focus:outline-none focus:border-zinc-600 min-h-[48px] ${className}`}
      >
        <span className={selected ? 'text-zinc-300' : 'text-zinc-600'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={14} className="text-zinc-600 shrink-0" />
      </button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="bg-[#0F0D14] border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
          {label && (
            <DrawerHeader className="px-6 pt-4 pb-2">
              <DrawerTitle className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600">
                {label}
              </DrawerTitle>
            </DrawerHeader>
          )}
          <div className="px-4 pb-6 space-y-1 max-h-[60vh] overflow-y-auto">
            {options.map((opt) => {
              const isActive = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl min-h-[52px] text-sm font-serif italic text-left transition-all active:opacity-70 ${
                    isActive
                      ? 'bg-teal-500/10 border border-teal-500/20 text-teal-300'
                      : 'text-zinc-400 hover:bg-white/5'
                  }`}
                >
                  {opt.label}
                  {isActive && <Check size={14} className="text-teal-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}