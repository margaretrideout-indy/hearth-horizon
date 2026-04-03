import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Loader2, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ResumeUploader({ profileId, isPaid, uploadCount, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file.');
      return;
    }

    setUploading(true);
    setAnalysis('');

    // Upload the file
    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    // AI analysis
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a compassionate career transition expert. Review this resume PDF and identify all transferable skills from public-sector backgrounds (education, healthcare, government, social services) that translate directly to corporate terminology.

For each skill found:
- Name the public-sector skill
- Provide its corporate equivalent
- Briefly explain the business value

Focus on strategic, operational, and leadership competencies. Write in a warm, affirming tone that helps the professional see their true worth in the private sector. Format as a readable, flowing analysis — not bullet points.`,
      file_urls: [file_url],
    });

    setAnalysis(result);

    // Persist to profile
    if (profileId) {
      await base44.entities.UserProfile.update(profileId, {
        resume_file: file_url,
        bridge_analysis: result,
      });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    }

    // If Seedling, increment their upload count
    if (!isPaid) {
      await base44.auth.updateMe({ seedling_upload_count: (uploadCount || 0) + 1 });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      if (onUploadSuccess) onUploadSuccess();
    }

    setUploading(false);
    toast.success('Your resume has been translated.');
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium mb-2">Upload Your Resume for Translation</p>
        <p className="text-xs text-muted-foreground mb-4">
          Share your resume and let the bridge help surface the corporate language already embedded in your public-sector experience.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFile}
        />
        <Button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          variant="outline"
          className="gap-2 border-secondary/30 text-secondary hover:bg-secondary/10"
        >
          {uploading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Constructing your bridge… please stay by the hearth.</>
          ) : (
            <><Upload className="w-4 h-4" /> Cross the Bridge — Upload PDF</>
          )}
        </Button>
        {!isPaid && (
          <p className="text-xs text-muted-foreground/60 mt-2">
            Seedling Status: <span className="text-secondary font-medium">{uploadCount || 0} / 2</span> Crossings used this month.
          </p>
        )}
      </div>

      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5"
            style={{
              background: 'hsla(280, 40%, 18%, 0.3)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid hsla(183, 80%, 38%, 0.2)',
              boxShadow: '0 0 18px hsla(183, 80%, 38%, 0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'hsla(280, 60%, 72%, 0.8)', fontSize: '0.65rem' }}>Bridge Analysis</p>
                <p className="text-sm font-heading font-semibold">Your Transferable Skills</p>
              </div>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{analysis}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}