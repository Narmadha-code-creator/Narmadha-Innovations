import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Award,
  Calendar,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { Achievement } from '../types';

interface LightboxProps {
  items: Achievement[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1); // Reset zoom on image switch
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handleNext = () => onNavigate((currentIndex + 1) % items.length);
  const handlePrev = () => onNavigate((currentIndex - 1 + items.length) % items.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 backdrop-blur-md transition-opacity">
      
      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-navy-900/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Authentic Record</span>
          </span>
        </div>

        {/* Zoom & Close Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(s => Math.min(s + 0.25, 2.5))}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(s => Math.max(s - 0.25, 0.75))}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setScale(1)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Reset Zoom"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-rose-500/80 text-white transition-colors ml-2"
            title="Close Lightbox (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20 backdrop-blur-md"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20 backdrop-blur-md"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image Frame */}
      <div className="relative max-w-5xl max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={currentItem.image}
          alt={currentItem.title}
          style={{ transform: `scale(${scale})` }}
          className="max-h-[65vh] sm:max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-200 cursor-grab active:cursor-grabbing"
        />
      </div>

      {/* Bottom Info Sheet */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-navy-900 via-navy-900/90 to-transparent z-20">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-brand/60 text-purple-200 text-xs font-semibold">
              {currentItem.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              <span>{currentItem.badge}</span>
            </span>
            {currentItem.date && (
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{currentItem.date}</span>
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
            {currentItem.description}
          </p>
        </div>
      </div>

    </div>
  );
};
