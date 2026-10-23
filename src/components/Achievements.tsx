import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  PlusCircle
} from 'lucide-react';
import { verifiedAchievements } from '../data/achievementsData';
import { Achievement, AchievementCategory, UploadedPhoto } from '../types';
import { Lightbox } from './Lightbox';

interface AchievementsProps {
  customPhotos: UploadedPhoto[];
  onOpenPhotoManager: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({
  customPhotos,
  onOpenPhotoManager
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: AchievementCategory[] = [
    'All',
    'Hackathons',
    'Awards',
    'Symposiums',
    'Workshops'
  ];

  // Merge default verified achievements with any custom photos uploaded in this session/localStorage
  const customAchievements: Achievement[] = customPhotos.map((p) => ({
    id: p.id,
    title: p.title,
    award: p.title,
    eventName: p.eventName,
    organizer: 'Verified Event',
    date: p.date,
    category: (categories.includes(p.category as AchievementCategory)
      ? p.category
      : 'Awards') as AchievementCategory,
    description: p.description,
    image: p.dataUrl,
    verified: true,
    badge: 'Uploaded Photo'
  }));

  const allAchievements = [...verifiedAchievements, ...customAchievements];

  const filteredItems = selectedCategory === 'All'
    ? allAchievements
    : allAchievements.filter(a => a.category === selectedCategory);

  const handleCardClick = (achievement: Achievement) => {
    const idx = allAchievements.findIndex(a => a.id === achievement.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  return (
    <section id="achievements" className="py-20 lg:py-28 bg-lavender-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honors & Distinctions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            MY JOURNEY & ACHIEVEMENTS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Documented competitive victories, technical symposium championships, and hands-on masterclass honors supported by authentic certificates and ceremony photographs.
          </p>
        </div>

        {/* Filter Bar & Photo Manager Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-brand text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-brand border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenPhotoManager}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-purple-brand" />
            <span>Add / Manage Photos</span>
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden shadow-sm hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 border border-purple-100 flex flex-col justify-between group cursor-pointer"
              onClick={() => handleCardClick(item)}
            >
              <div>
                {/* Image Container with Zoom Overlay */}
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-navy-900/80 text-white text-[11px] font-bold backdrop-blur-md border border-white/20">
                      {item.category}
                    </span>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold backdrop-blur-md shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Lightbox Trigger Hint */}
                  <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Prize / Medal Ribbon */}
                  {item.prize && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-navy-900 text-xs font-black shadow-md flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{item.prize}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-purple-brand" />
                    <span>{item.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="truncate">{item.eventName}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-navy-900 mb-2 group-hover:text-purple-brand transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-brand">
                  <span>Click to view certificate & photo</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        items={allAchievements}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
