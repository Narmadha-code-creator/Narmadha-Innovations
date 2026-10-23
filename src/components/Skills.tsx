import React from 'react';
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6 text-purple-brand" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-brand" />;
      case 'Server':
        return <Server className="w-6 h-6 text-indigo-600" />;
      case 'Database':
        return <Database className="w-6 h-6 text-emerald-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-pink-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-purple-brand" />;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 bg-lavender-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5 text-cyan-brand" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            Skills & Technical Toolset
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Organized across core engineering foundations, full-stack development, database architecture, and applied AI systems.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 border border-purple-100 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-900 text-lg leading-tight">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-brand"></span>
                      <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                      {skill.level && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md ml-1">
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Tag */}
              <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Verified in active projects</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
