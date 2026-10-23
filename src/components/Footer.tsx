import React from 'react';
import { Github, Linkedin, Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-12 border-t border-purple-900/40 relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-brand/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-brand/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-brand to-cyan-brand flex items-center justify-center font-bold text-base shadow-sm">
                N
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                {personalInfo.name}
              </span>
            </div>
            
            <p className="text-sm text-cyan-accent font-medium">
              B.Tech Information Technology | Student Developer | Tech Innovator
            </p>
            
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Student at Sri Sairam Engineering College, Chennai. Maintaining an 8.55/10 CGPA and serving as Business Development Officer at DAKH Edu Solutions.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <a href="#home" className="hover:text-purple-light transition-colors">Home</a>
              <a href="#about" className="hover:text-purple-light transition-colors">About</a>
              <a href="#skills" className="hover:text-purple-light transition-colors">Skills</a>
              <a href="#projects" className="hover:text-purple-light transition-colors">Projects</a>
              <a href="#achievements" className="hover:text-purple-light transition-colors">Achievements</a>
              <a href="#experience" className="hover:text-purple-light transition-colors">Experience</a>
              <a href="#education" className="hover:text-purple-light transition-colors">Education</a>
              <a href="#contact" className="hover:text-purple-light transition-colors">Contact</a>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-3">
                Social Profiles
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-purple-brand text-slate-300 hover:text-white transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 md:mt-0 p-2.5 rounded-xl bg-slate-800 hover:bg-purple-brand text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Narmadha S D. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with React, Vite, TypeScript & Tailwind CSS</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
