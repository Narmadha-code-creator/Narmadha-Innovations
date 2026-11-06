import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Flame, Volume2, Video, Gift, Image, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', icon: '🪔' },
  { label: 'Fireworks', href: '#fireworks', icon: '🎆' },
  { label: 'AI Wishes', href: '#ai-wishes', icon: '✨' },
  { label: 'Cards Studio', href: '#cards', icon: '💌' },
  { label: 'Video Studio', href: '#video-studio', icon: '🎬' },
  { label: 'Photo Frame', href: '#photo-creator', icon: '🖼️' },
  { label: 'Surprise Gift', href: '#surprise', icon: '🎁' },
  { label: 'Parade', href: '#parade', icon: '🦚' },
  { label: 'Blessings Wall', href: '#blessings', icon: '🙏' },
];

export const Navbar: React.FC<{ onReplayIntro: () => void }> = ({ onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEngine.playDiyaIgnite();
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#070314]/85 backdrop-blur-xl border-b border-amber-400/20 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => soundEngine.playTempleBell()}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-600 flex items-center justify-center text-xl shadow-glow-gold group-hover:scale-105 transition-transform">
            🪔
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg md:text-xl font-black gold-gradient-text tracking-wider">
              DIWALI MAGIC AI
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300/80 -mt-1">
              ✨ The Ultimate Festival Experience
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-full glass-panel border border-amber-400/25">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-glow-saffron'
                    : 'text-purple-200 hover:text-amber-200 hover:bg-purple-900/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA Actions: Replay Intro */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => {
              soundEngine.playTempleBell();
              onReplayIntro();
            }}
            className="px-4 py-2 rounded-full border border-amber-400/30 bg-purple-950/50 hover:bg-purple-900/70 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-all shadow-glow-gold hover:scale-105 active:scale-95"
          >
            Replay Intro 🎬
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-purple-950/80 border border-amber-400/30 text-amber-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] p-6 bg-[#090317]/95 backdrop-blur-2xl border-b border-amber-400/30 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="p-3 rounded-xl glass-panel text-xs font-semibold text-purple-200 hover:text-amber-300 hover:bg-purple-900/60 flex items-center gap-2"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold uppercase tracking-wider"
            >
              Replay Cinematic Intro 🎬
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
