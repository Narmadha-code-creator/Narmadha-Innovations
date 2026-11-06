import React from 'react';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-amber-400/25 bg-[#05010a] py-16 px-4 md:px-8 overflow-hidden text-center">
      {/* Background radial glow */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-purple-950/40 via-amber-500/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl animate-bounce">🪔</span>
          <h3 className="font-cinzel text-2xl md:text-3xl font-black gold-gradient-text tracking-wide">
            DIWALI MAGIC AI
          </h3>
          <span className="text-3xl animate-bounce">✨</span>
        </div>

        <p className="text-sm md:text-base text-purple-200/80 max-w-xl mx-auto font-light leading-relaxed">
          "Asato ma sadgamaya, Tamaso ma jyotirgamaya, Mrityorma amritam gamaya."
          <br />
          <span className="text-xs text-amber-300 italic">
            Lead us from falsehood to truth, from darkness to light, and from mortality to immortality.
          </span>
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-amber-200/90 font-medium uppercase tracking-wider">
          <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
          <a href="#fireworks" className="hover:text-amber-400 transition-colors">Fireworks Playground</a>
          <a href="#ai-wishes" className="hover:text-amber-400 transition-colors">AI Wish Generator</a>
          <a href="#cards" className="hover:text-amber-400 transition-colors">Greeting Cards</a>
          <a href="#video-studio" className="hover:text-amber-400 transition-colors">Video Studio</a>
          <a href="#photo-creator" className="hover:text-amber-400 transition-colors">Photo Frame</a>
          <a href="#surprise" className="hover:text-amber-400 transition-colors">Surprise Gift</a>
          <a href="#parade" className="hover:text-amber-400 transition-colors">Festival Parade</a>
        </div>

        <div className="pt-6 border-t border-purple-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-400 gap-4">
          <div>
            Built with love & devotion for the Global Diwali Festival Celebration ✨
          </div>
          <div className="flex items-center gap-2">
            <span>© 2026 Diwali Magic AI • All Rights Reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
