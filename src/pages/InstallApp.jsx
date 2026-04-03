import React, { useState } from 'react';
import { Smartphone, Apple, Chrome, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function InstallApp() {
  const [expandedTab, setExpandedTab] = useState('ios');

  const steps = {
    ios: [
      {
        number: 1,
        title: 'Open in Safari',
        description: 'Make sure you\'re using the Safari browser on your iPhone or iPad.'
      },
      {
        number: 2,
        title: 'Tap the Share Button',
        description: 'Tap the Share icon (arrow pointing out of a box) at the bottom of the screen.'
      },
      {
        number: 3,
        title: 'Select "Add to Home Screen"',
        description: 'Scroll down and tap "Add to Home Screen" from the menu.'
      },
      {
        number: 4,
        title: 'Confirm the Name',
        description: 'The app name will appear as "Hearth & Horizon". Tap "Add" to confirm.'
      },
      {
        number: 5,
        title: 'Find on Your Home Screen',
        description: 'The app will now appear on your home screen like a native app. Tap to open.'
      }
    ],
    android: [
      {
        number: 1,
        title: 'Open in Chrome',
        description: 'Make sure you\'re using the Chrome browser on your Android device.'
      },
      {
        number: 2,
        title: 'Tap the Menu Icon',
        description: 'Tap the three dots (⋮) in the top right corner of Chrome.'
      },
      {
        number: 3,
        title: 'Select "Install app" or "Add to Home screen"',
        description: 'Look for an option that says "Install app" or "Add to Home screen".'
      },
      {
        number: 4,
        title: 'Confirm Installation',
        description: 'A dialog will appear asking to confirm. Tap "Install" or "Add".'
      },
      {
        number: 5,
        title: 'Find on Your Home Screen',
        description: 'The app will appear on your home screen. Tap to open anytime.'
      }
    ]
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setExpandedTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        expandedTab === id
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border border-border/30 text-foreground hover:border-border/60'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5 text-primary" />
          <p className="text-sm text-primary font-medium">Mobile Experience</p>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Install the Hearth
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Add Hearth & Horizon to your phone's home screen for quick access. It works like a native app and works offline too.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '⚡', title: 'Lightning Fast', desc: 'Opens instantly from your home screen' },
          { icon: '📴', title: 'Works Offline', desc: 'Access your journal anytime, anywhere' },
          { icon: '🎯', title: 'Full Screen', desc: 'No browser chrome, pure focus' }
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-2 p-4 rounded-lg border border-border/20"
          >
            <div className="text-3xl">{benefit.icon}</div>
            <h3 className="font-medium text-foreground">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tab Selection */}
      <div className="flex gap-2 bg-card/50 p-2 rounded-lg border border-border/20 w-fit mx-auto">
        <TabButton id="ios" label="iPhone" icon={Apple} />
        <TabButton id="android" label="Android" icon={Chrome} />
      </div>

      {/* Instructions */}
      <motion.div
        key={expandedTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {steps[expandedTab].map((step, idx) => (
          <Card key={idx} className="p-5 rounded-xl border-border/30 hover:border-primary/30 transition-all">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{step.number}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <Card className="p-6 rounded-xl border-border/30 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" />
          Common Questions
        </h2>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-foreground mb-1">Does this create a native app?</p>
            <p className="text-muted-foreground">No, it's a web app that behaves like a native app on your home screen. All your data stays secure in the cloud.</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">Can I use it offline?</p>
            <p className="text-muted-foreground">Parts of the app work offline, but you'll need internet to sync journal entries and community features.</p>
          </div>
          <div>
            <p className="font-medium text-foreground mb-1">How do I uninstall it?</p>
            <p className="text-muted-foreground">Simply long-press the app icon on your home screen and select "Remove" or "Delete" — just like any other app.</p>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-3 pt-4">
        <p className="text-sm text-muted-foreground">Ready to take the Hearth with you?</p>
        <p className="text-xs text-muted-foreground/60">Follow the steps above for your device to get started.</p>
      </div>
    </div>
  );
}