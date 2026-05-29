// Imagine this as a narrow, vertical "hearthstone"
// centered in the screen, textured with a very subtle noise pattern
<div className="max-w-[400px] mx-auto pt-20 px-4">
  {/* The Hearth Title - smaller, more intimate */}
  <h2 className="font-serif text-sm text-amber-700 tracking-widest uppercase mb-12 text-center">
    The Embers
  </h2>
  
  {/* The "Echoes" - a few lines of wisdom to show this place has history */}
  <div className="space-y-12 mb-20 font-serif text-zinc-500 italic text-sm">
    <p>— "The transition is rarely a straight line. It is a slow turning, like the seasons."</p>
    <p>— "We are not leaving our past behind; we are carrying it forward in a new language."</p>
  </div>

  {/* The Input - no big box, just a simple prompt line */}
  <div className="text-center">
    <input 
      className="bg-transparent border-b border-zinc-800 w-full py-4 text-center text-zinc-300 italic focus:border-amber-700 outline-none transition-colors"
      placeholder="What spark will you add to the fire today, Steward?"
    />
  </div>
</div>