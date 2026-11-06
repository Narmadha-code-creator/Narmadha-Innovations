import React, { useState } from 'react';
import {
  Code,
  Sparkles,
  Brain,
  Rocket,
  ArrowRight,
  Trophy,
  Download,
  Github,
  Linkedin,
  Award,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface HeroProps {
  onOpenPhotoManager: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPhotoManager }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-cyan-200/35 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-blue-100/50 rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Introduction & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 text-purple-900 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-purple-brand -ml-4"></span>
              <GraduationCap className="w-4 h-4 text-purple-brand ml-1" />
              <span>Sri Sairam Engineering College • B.Tech IT (2nd Year)</span>
            </div>

            {/* Candidate Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 mb-4 leading-tight">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
            </h1>

            {/* Professional Headline */}
            <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 leading-snug">
              "{personalInfo.headline}"
            </p>

            {/* Subtitle / Bio summary */}
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
              {personalInfo.subtitle}
            </p>

            {/* Professional Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-purple-200 text-xs sm:text-sm font-semibold text-purple-900 shadow-sm">
                <Code className="w-4 h-4 text-purple-brand" />
                Student Developer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-cyan-200 text-xs sm:text-sm font-semibold text-cyan-900 shadow-sm">
                <Sparkles className="w-4 h-4 text-cyan-brand" />
                Tech Innovator
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-purple-200 text-xs sm:text-sm font-semibold text-purple-900 shadow-sm">
                <Brain className="w-4 h-4 text-purple-brand" />
                AI/ML Enthusiast
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 shadow-sm">
                <Rocket className="w-4 h-4 text-navy-600" />
                Project Builder
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-brand via-purple-700 to-navy-900 hover:from-purple-light hover:to-navy-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-glow-purple transition-all flex items-center justify-center gap-2 group flex-1 sm:flex-initial"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#achievements"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-navy-900 hover:text-purple-brand font-bold text-sm sm:text-base border border-slate-200 hover:border-purple-300 shadow-sm transition-all flex items-center justify-center gap-2 flex-1 sm:flex-initial"
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>View My Achievements</span>
              </a>

              <a
                href="#resume"
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links & Quick Verified Metrics */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Connect:
                </span>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-700 hover:text-purple-brand hover:bg-purple-50 rounded-lg transition-colors border border-slate-200"
                  aria-label="GitHub Profile"
                  title="GitHub: Narmadha-code-creator"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors border border-slate-200"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn: Narmadha S D"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Quick Academic & Role Highlights */}
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>CGPA: 8.55/10</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Award className="w-4 h-4 text-purple-brand" />
                  <span>BDO @ DAKH Edu</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Photograph Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square group">
              
              {/* Outer Decorative Gradient Halo */}
              <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-purple-brand via-cyan-400 to-indigo-600 opacity-70 blur-xl group-hover:opacity-100 transition duration-700 glow-frame"></div>
              
              {/* Secondary Gradient Ring Border */}
              <div className="relative w-full h-full rounded-full p-2 sm:p-2.5 bg-gradient-to-tr from-purple-brand via-navy-900 to-cyan-brand shadow-2xl">
                
                {/* White Inner Mask */}
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative flex items-center justify-center border-2 border-white/40">
                  
                  {!imgError ? (
                    <img
                      src={personalInfo.profilePhoto}
                      alt="Narmadha S D - B.Tech IT, Developer & Tech Innovator"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    /* Graceful Fallback Placeholder */
                    <div className="w-full h-full bg-gradient-to-br from-navy-900 to-purple-brand flex flex-col items-center justify-center p-6 text-center text-white">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-3">
                        <span className="text-4xl font-extrabold text-cyan-accent">N</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">NARMADHA S D</h4>
                      <p className="text-xs text-purple-200 mb-3">Profile Portrait</p>
                      <button
                        onClick={onOpenPhotoManager}
                        className="px-3 py-1.5 text-xs bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all"
                      >
                        Upload Photo
                      </button>
                    </div>
                  )}

                  {/* Gradient Overlay Vignette at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Floating Achievement Badge 1 (Top Right) */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-purple-200/80 flex items-center gap-2 animate-float">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                    SRM Hackathon
                  </div>
                  <div className="text-xs font-extrabold text-navy-900">
                    Best Innovation
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badge 2 (Bottom Left) */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-cyan-200/80 flex items-center gap-2 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                    CASYUM '26
                  </div>
                  <div className="text-xs font-extrabold text-navy-900">
                    1st Prize Gold Medal
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
