import React, { useEffect } from 'react';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  Cpu
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-purple-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 animate-fadeIn">
        
        {/* Header Ribbon */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${project.accentColor} text-white rounded-t-3xl relative overflow-hidden`}>
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>{project.category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {project.title}
              </h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-semibold">
              Status: {project.status}
            </span>
            {project.stats?.map((stat, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-semibold">
                {stat.label}: {stat.value}
              </span>
            ))}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Problem Statement */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-navy-900 font-bold text-sm mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Problem Statement</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution & Implementation */}
          <div>
            <div className="flex items-center gap-2 text-navy-900 font-bold text-sm mb-2">
              <Cpu className="w-4 h-4 text-purple-brand" />
              <span>Solution Overview</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.solutionOverview}
            </p>
          </div>

          {/* Candidate's Contribution */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <h4 className="font-bold text-purple-900 text-sm mb-1.5">My Key Contribution:</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.myContribution}
            </p>
          </div>

          {/* Key Implemented Features */}
          <div>
            <h4 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Verified Implemented Features</span>
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Technologies */}
          <div>
            <h4 className="font-bold text-navy-900 text-sm mb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Verified Tech Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3 justify-end">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repo</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-brand to-cyan-brand hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Project</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
