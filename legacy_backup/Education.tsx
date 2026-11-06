import React from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  BookOpen,
  MapPin,
  Sparkles
} from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-28 bg-lavender-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-purple-brand" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Education & Academic Metrics
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Rigorous undergraduate foundation in Information Technology at Sri Sairam Engineering College.
          </p>
        </div>

        {/* Education Highlight Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Subtle glow border */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-brand/20 via-cyan-brand/20 to-purple-brand/20 rounded-3xl blur-xl"></div>

            <div className="relative glass-card rounded-3xl p-8 sm:p-10 shadow-glass border border-purple-100">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-brand to-navy-900 text-white flex items-center justify-center shrink-0 shadow-md">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md inline-block mb-1">
                      {educationData.currentYear} • Full-Time
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                      {educationData.degree} in {educationData.major}
                    </h3>
                    <p className="text-base font-bold text-purple-900 mt-1">
                      {educationData.institution}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{educationData.location}</span>
                    </p>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="flex flex-col sm:items-end justify-center p-4 rounded-2xl bg-gradient-to-br from-purple-brand/10 to-cyan-brand/10 border border-purple-200 shrink-0">
                  <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                    Cumulative CGPA
                  </span>
                  <span className="text-3xl font-black text-navy-900">
                    {educationData.cgpa}
                  </span>
                  <span className="text-xs font-semibold text-purple-700 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    Graduation: {educationData.duration}
                  </span>
                </div>
              </div>

              {/* Highlights & Coursework */}
              <div className="pt-8">
                <h4 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-brand" />
                  <span>Academic Distinctions & Focus Areas</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educationData.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
