import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Trophy,
  Code,
  CheckCircle2,
  Mail,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import { personalInfo, educationData, experienceData, verifiedProjects } from '../data/portfolioData';
import { verifiedAchievements } from '../data/achievementsData';

export const ResumeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'printable'>('preview');

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-purple-brand" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Verified Professional Resume
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Consolidated document detailing academic milestones, technical projects, leadership responsibilities, and hackathon victories.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="/resume.pdf"
              download="Narmadha_S_D_Resume.pdf"
              className="px-6 py-3 rounded-xl bg-purple-brand hover:bg-purple-light text-white font-bold text-sm shadow-md hover:shadow-glow-purple transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Paper Document Preview Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden print:shadow-none print:border-none">
            
            {/* Top Sheet Header */}
            <div className="p-8 sm:p-10 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-purple-900/50">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-sm sm:text-base text-cyan-accent font-semibold mt-1">
                  {personalInfo.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {personalInfo.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    {personalInfo.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center gap-2 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>github.com/Narmadha-code-creator</span>
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>linkedin.com/in/narmadha-s-d</span>
                </a>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-8 sm:p-10 space-y-8 text-slate-800">
              
              {/* Professional Summary */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-700 border-b border-purple-100 pb-1.5 mb-3">
                  Professional Summary
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-700 border-b border-purple-100 pb-1.5 mb-3">
                  Education
                </h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="text-base font-bold text-navy-900">
                    {educationData.institution}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {educationData.duration}
                  </span>
                </div>
                <div className="text-sm font-semibold text-purple-800">
                  {educationData.degree} in {educationData.major} (2nd Year) • CGPA: {educationData.cgpa}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-700 border-b border-purple-100 pb-1.5 mb-4">
                  Professional & Leadership Experience
                </h4>
                <div className="space-y-4">
                  {experienceData.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="text-sm font-bold text-navy-900">
                          {exp.role} — <span className="text-purple-700">{exp.organization}</span>
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {exp.duration}
                        </span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                        {exp.description.map((desc, dIdx) => (
                          <li key={dIdx}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Featured Projects */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-700 border-b border-purple-100 pb-1.5 mb-4">
                  Key Projects & Technical Innovations
                </h4>
                <div className="space-y-4">
                  {verifiedProjects.slice(0, 4).map((proj) => (
                    <div key={proj.id}>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-bold text-navy-900">
                          {proj.title}
                        </span>
                        <span className="text-xs font-mono text-purple-700 font-semibold">
                          {proj.technologies.slice(0, 3).join(', ')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-1">
                        {proj.solutionOverview}
                      </p>
                      <p className="text-xs text-slate-500 italic">
                        Role & Impact: {proj.myContribution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Achievements */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-700 border-b border-purple-100 pb-1.5 mb-3">
                  Verified Honors & Distinctions
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                  {verifiedAchievements.map((ach) => (
                    <li key={ach.id} className="flex items-start gap-2">
                      <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>{ach.badge}:</strong> {ach.eventName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
