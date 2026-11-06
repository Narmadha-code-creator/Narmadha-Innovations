import React, { useState } from 'react';
import {
  Code,
  Sparkles,
  ExternalLink,
  Github,
  Layers,
  ArrowRight,
  Cpu,
  Compass,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { verifiedProjects } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'AI/ML',
    'Ocean Tech & Innovation',
    'Full-Stack Systems',
    'Web Development',
    'Education'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? verifiedProjects
    : verifiedProjects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-brand" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Projects & Technical Innovations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Real software systems, machine learning architectures, and oceanographic concepts engineered with production-ready tools.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-brand border border-slate-200/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Ribbon */}
                <div className={`h-3 bg-gradient-to-r ${project.accentColor}`}></div>
                
                <div className="p-6 sm:p-7">
                  
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
                      {project.category}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : project.status === 'Active Development'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-extrabold text-navy-900 mb-2.5 group-hover:text-purple-brand transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Problem & Solution Snippet */}
                  <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div>
                      <strong className="text-slate-800">Problem: </strong>
                      <span className="line-clamp-2">{project.problemStatement}</span>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-purple-50 text-[11px] font-semibold text-purple-700">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* Bottom Actions Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between pt-4">
                  
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-purple-brand transition-colors"
                  >
                    <span>Inspect Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white bg-purple-brand hover:bg-purple-light rounded-lg transition-colors shadow-sm"
                        title="Live Demonstration"
                        aria-label="Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Inspection Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
