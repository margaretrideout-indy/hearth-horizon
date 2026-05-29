import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

export default function ResumeUpload({ onUpload }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="border-2 border-dashed border-zinc-800 hover:border-teal-500/40 rounded-[2rem] p-12 text-center cursor-pointer transition-all group"
    >
      <UploadCloud size={32} className="mx-auto mb-4 text-zinc-700 group-hover:text-teal-500 transition-colors" />
      <p className="text-sm font-serif italic text-zinc-500">Upload your resume to begin the Alchemy</p>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700 mt-2">PDF or Word · Click to browse</p>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleChange} />
    </div>
  );
}