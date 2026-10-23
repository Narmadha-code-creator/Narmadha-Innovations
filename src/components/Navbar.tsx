import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPhotoManager: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPhotoManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-purple-100/70 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 via-purple-brand to-cyan-brand flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              N
            </div>
            <div>
              <span className="font-extrabold text-navy-900 tracking-tight text-lg group-hover:text-purple-brand transition-colors block">
                NARMADHA S D
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase block">
                Tech Innovator & Dev
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-purple-brand hover:bg-purple-surface/70 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenPhotoManager}
              className="text-xs font-semibold px-3 py-2 text-slate-600 hover:text-purple-brand bg-slate-100 hover:bg-purple-50 rounded-lg border border-slate-200 hover:border-purple-200 transition-all flex items-center gap-1.5"
              title="Manage verified photos and certificates"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-brand" />
              <span>Photo Vault</span>
            </button>

            <a
              href="#resume"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-brand to-navy-900 hover:from-purple-light hover:to-navy-800 rounded-lg shadow-sm hover:shadow-glow-purple transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-purple-brand hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-purple-100 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-purple-brand hover:bg-purple-surface rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPhotoManager();
                  }}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-purple-50 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-brand" />
                  <span>Manage Portfolio Photos</span>
                </button>
                <a
                  href="#resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-brand to-navy-900 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
