import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Flame, Sparkles, Map, 
  Loader2, History, Compass, 
  ClipboardCheck, Upload, FileText,
  RefreshCw
} from 'lucide-react';

export default function Hearth({ activeNarrative }) {
  const [checkIn, setCheckIn] = useState(null);
  const [reflection, setReflection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [alignmentStatus, setAlignmentStatus] = useState("Pending");

  const emojis = [
    { icon: "🌱", label: "Grounded" },
    { icon: "🔥", label: "Energized" },
    { icon: "🌪️", label: "Shifting" },
    { icon: "🏔️", label: "Steady" },
    { icon: "✨", label: "Inspired" }
  ];

  const handleResumeUpload = () => {
    setIsUploading(true);
    // Simulate ecosystem synthesis
    setTimeout(() => {
      setIsUploading(false);
      setAlignmentStatus("Aligned");
    }, 2500);
  };

  const displayNarrative = activeNarrative || "Awaiting ecosystem synthesis. Upload your resume to begin.";

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-500 mb-1">
            <Flame size={20} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Hearth</span>
          </div>
          <h1 className="text-4xl font-bold text-white italic tracking-tight">Welcome Home.</h1>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className={`font-black tracking-widest text-[9px] px-3 py-1 italic uppercase ${alignmentStatus === 'Aligned' ? 'text-teal-400 border-teal-500/30' : 'text-gray-500 border-white/10'}`}>
            {alignmentStatus === 'Aligned' ? 'Ecosystem Synced' : 'Awaiting Alignment'}
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* RESUME UPLOAD & SYNTHESIS ZONE */}
          <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-xl border-dashed border-2 hover:border-teal-500/30 transition-all group">
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="p-4 bg-teal-500/5 rounded-full border border-teal-500/10 group-hover:scale-110 transition-transform">
                {isUploading ? <RefreshCw className="w-8 h-8 text-teal-500 animate-spin" /> : <Upload className="w-8 h-8 text-teal-500" />}
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-white font-black text-sm uppercase tracking-widest">Linguistic Intake</h3>
                <p className="text-[10px] text-gray-500 uppercase font-bold italic">Upload your resume for Ecosystem Alignment</p>
              </div>
              <input type="file" id="resume-upload" className="hidden" onChange={handleResumeUpload} />
              <label htmlFor="resume-upload">
                <Button asChild variant="outline" className="mt-2 border-teal-500/20 text-teal-400 hover:bg-teal-500/10 font-black text-[10px] uppercase tracking-widest px-8 cursor-pointer">
                  <span>{isUploading ? "Synthesizing..." : "Select PDF / DOCX"}</span>
                </Button>
              </label>
            </div>
          </Card>

          {/* DYNAMIC NARRATIVE BEACON (The result of the synthesis) */}
          <Card className={`p-10 border-double border-4 transition-all duration-1000 ${alignmentStatus === 'Aligned' ? 'border-teal-500/20 bg-teal-500/[0.02]' : 'border-white/5 bg-transparent opacity-50'}`}>
            <Sparkles className={`absolute -right-4 -top-4 w-24 h-24 text-teal-500/5 rotate-12 ${alignmentStatus === 'Aligned' && 'animate-pulse'}`} />
            <div className="space-y-6 relative z-10">
              <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">Ecosystem Alignment Synthesis</p>
              <h2 className="text-2xl text-gray-100 italic font-medium leading-relaxed max-w-2xl">
                {alignmentStatus === 'Aligned' ? (
                  <>"{activeNarrative || "A strategic architect of human capital with 13 years of expertise in curriculum scaling and educational operations."}"</>
                ) : (
                  <span className="text-gray-600">Please upload a resume to generate your professional beacon...</span>
                )}
              </h2>
            </div>
          </Card>

          {/* EMOJI CHECK-IN */}
          <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-white font-black text-xs uppercase tracking-widest text-teal-400">Current Frequency</h3>
              <p className="text-[10px] text-gray-500 uppercase font-bold italic tracking-tight">How is the user feeling today?</p>
            </div>
            
            <div className="flex justify-between items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5">
              {emojis.map((e) => (
                <button
                  key={e.label}
                  onClick={() => setCheckIn(e.label)}
                  className={`group flex flex-col items-center gap-2 transition-all duration-300 ${
                    checkIn === e.label ? 'scale-110 opacity-100' : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <span className="text-3xl">{e.icon}</span>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${checkIn === e.label ? 'text-teal-400' : 'text-gray-500'}`}>{e.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <Card className="p-8 bg-[#1C1622]/60 border-white/10 shadow-xl space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { label: "Resume Uploaded", time: alignmentStatus === 'Aligned' ? "Just Now" : "Pending", icon: FileText },
                { label: "Trek Report Finalized", time: "1d ago", icon: ClipboardCheck },
                { label: "Narrative Aligned", time: "2d ago", icon: Compass }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                  <div className="p-2 bg-black/40 rounded-lg text-teal-500 group-hover:scale-110 transition-transform">
                    <item.icon size={16} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-300 group-hover:text-white">{item.label}</p>
                    <p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button 
            onClick={() => window.location.href='/mycelium'}
            className="w-full h-24 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-2xl flex flex-col gap-1 uppercase tracking-widest shadow-xl shadow-teal-900/20"
          >
            <Map size={24} />
            <span className="text-xs mt-1">Open Mycelium Map</span>
          </Button>

          {/* REFLECTION LOG (Compact version for sidebar) */}
          <Card className="p-6 bg-[#1C1622]/60 border-white/10 space-y-4">
            <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Daily Log</p>
            <Textarea 
              placeholder="Quick thoughts..."
              className="bg-black/40 border-none text-xs text-gray-300 italic min-h-[80px]"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <Button className="w-full bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase py-0 h-8">Bank Note</Button>
          </Card>
        </div>

      </div>
    </div>
  );
}