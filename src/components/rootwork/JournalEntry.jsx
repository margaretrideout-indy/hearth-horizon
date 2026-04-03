import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Flame, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const SENTIMENT_TAGS = ['Rooted', 'Reaching', 'Weathering', 'Blooming'];

export default function JournalEntry({ user }) {
  const [entryBody, setEntryBody] = useState('');
  const [sentimentTag, setSentimentTag] = useState('Rooted');
  const [isPrivate, setIsPrivate] = useState(true);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleOffer = async () => {
    if (!entryBody.trim() || !user) return;
    setSaving(true);

    // Save to Rootwerk Logs as public
    await base44.entities.RootwerkLog.create({
      user_id: user.id,
      user_email: user.email,
      entry_body: entryBody.trim(),
      sentiment_tag: sentimentTag,
      is_private: false,
    });

    // Also post to Embers community feed
    await base44.entities.EmberPost.create({
      author_name: user.full_name || user.email.split('@')[0],
      author_email: user.email,
      content: entryBody.trim(),
      is_pinned: false,
      is_bot: false,
    });

    queryClient.invalidateQueries({ queryKey: ['rootwerkLogs', user.id] });
    queryClient.invalidateQueries({ queryKey: ['emberPosts'] });
    toast.success('Your words have been offered to the Embers.');
    setEntryBody('');
    setSaving(false);
  };

  const handleSavePrivate = async () => {
    if (!entryBody.trim() || !user) return;
    setSaving(true);

    await base44.entities.RootwerkLog.create({
      user_id: user.id,
      user_email: user.email,
      entry_body: entryBody.trim(),
      sentiment_tag: sentimentTag,
      is_private: true,
    });

    queryClient.invalidateQueries({ queryKey: ['rootwerkLogs', user.id] });
    toast.success('Your entry has been held in the Hearth.');
    setEntryBody('');
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Your Reflection</label>
        <Textarea
          placeholder="Take your time. There are no wrong answers here…"
          value={entryBody}
          onChange={e => setEntryBody(e.target.value)}
          className="min-h-[120px] text-base resize-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-muted-foreground mb-1.5 block">How does this feel?</label>
          <Select value={sentimentTag} onValueChange={setSentimentTag}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SENTIMENT_TAGS.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 pt-4">
          <Switch
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
            id="private-toggle"
          />
          <label htmlFor="private-toggle" className="text-xs text-muted-foreground cursor-pointer">
            Keep Private in Your Hearth
          </label>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {isPrivate ? (
          <Button
            onClick={handleSavePrivate}
            disabled={!entryBody.trim() || saving}
            className="gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
            Ignite the Hearth
          </Button>
        ) : (
          <Button
            onClick={handleOffer}
            disabled={!entryBody.trim() || saving}
            className="gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flame className="w-4 h-4" />}
            Offer to the Embers
          </Button>
        )}
      </div>
    </div>
  );
}