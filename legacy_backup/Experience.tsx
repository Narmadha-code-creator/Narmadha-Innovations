import React from 'react';
import {
  Briefcase,
  Users,
  Trophy,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Professional & Leadership Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Experience & Leadership
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Hands-on business development, team leadership in state-wide hackathons, and departmental technology initiatives.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-purple-brand before:via-cyan-brand before:to-slate-200">
          {experienceData.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-0`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-purple-brand shadow-md flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-purple-brand"></div>
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-glass-hover transition-all duration-300 border border-purple-100/90">
                    
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 border border-purple-100">
                        {exp.type}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{exp.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-navy-900 mb-1">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-purple-700 mb-4 flex items-center gap-2">
                      <span>{exp.organization}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-xs flex items-center gap-1 font-normal">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && (
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
