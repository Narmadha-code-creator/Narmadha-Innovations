import React from 'react';
import {
  Sparkles,
  BookOpen,
  Target,
  Users,
  Compass,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-brand" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Passionate Developer, Innovator & Lifelong Learner
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Bridging theoretical computer science with practical, high-impact digital products and competitive innovation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-purple-brand/20 to-cyan-brand/20 blur-xl"></div>
              
              <div className="relative glass-card rounded-3xl p-6 sm:p-8 shadow-glass border border-purple-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-purple-brand to-cyan-brand">
                    <img
                      src={personalInfo.profilePhoto}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-xl">{personalInfo.name}</h3>
                    <p className="text-xs text-purple-700 font-semibold">{personalInfo.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{personalInfo.college}</p>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-3.5 text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100/80">
                    <GraduationCap className="w-5 h-5 text-purple-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy-900 block">B.Tech Information Technology</span>
                      <span className="text-xs text-slate-600">2nd Year (2025–2029) • CGPA: 8.55/10</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-cyan-50/60 border border-cyan-100/80">
                    <Briefcase className="w-5 h-5 text-cyan-brand shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy-900 block">Business Development Officer</span>
                      <span className="text-xs text-slate-600">DAKH Edu Solutions — Digital Learning & Strategy</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100/80">
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy-900 block">Multi-Award Hackathon Winner</span>
                      <span className="text-xs text-slate-600">SRM Bharat Build Best Innovation & CASYUM Gold</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Link */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Explore built works:</span>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-brand hover:text-purple-700 transition-colors"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative and Strategic Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="prose prose-slate max-w-none">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                I am <span className="font-bold text-navy-900">Narmadha S D</span>, a B.Tech Information Technology student at <span className="font-semibold text-purple-900">Sri Sairam Engineering College</span>. I enjoy transforming ideas into practical digital solutions through software development, technology innovation, and collaborative problem-solving. My core interests include AI/ML, full-stack engineering, and architecting systems that address real-world challenges.
              </p>
              
              <p className="text-slate-600 leading-relaxed mt-4">
                Whether deploying machine learning prospectivity models for mineral exploration in <strong className="text-navy-900">MANGANEX AI</strong>, visualizing deep-sea acoustic anomalies in <strong className="text-navy-900">VARUNA06</strong>, or providing empathetic AI wellness interactions through <strong className="text-navy-900">TherapyJoy</strong>, I focus on clean software architecture, intuitive user experiences, and verifiable real-world value.
              </p>
            </div>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              <div className="p-4 rounded-2xl bg-lavender-50 border border-purple-100">
                <div className="w-9 h-9 rounded-xl bg-purple-brand/10 flex items-center justify-center text-purple-brand mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-sm mb-1">Pragmatic Engineering</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Building stable, maintainable systems using React, TypeScript, Node.js, and structured relational/document databases.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-100">
                <div className="w-9 h-9 rounded-xl bg-cyan-brand/10 flex items-center justify-center text-cyan-brand mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-sm mb-1">Applied AI & Machine Learning</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Integrating Random Forest classification, LLM prompt engineering, and risk prediction workflows into production apps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-sm mb-1">Academic Rigor</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consistent high academic performance (8.55/10 CGPA) reinforced with continuous technical exploration and workshop training.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="w-9 h-9 rounded-xl bg-purple-brand/10 flex items-center justify-center text-purple-brand mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-900 text-sm mb-1">Collaborative Leadership</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Driving student teams to podium finishes in prestigious hackathons and guiding educational partnerships at DAKH Edu Solutions.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
