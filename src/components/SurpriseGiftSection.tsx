import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart, ChevronRight, X, Flame, Award, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface SurpriseLevel {
  level: number;
  title: string;
  badge: string;
  message: string;
  blessing: string;
  icon: string;
  color: string;
}

const SURPRISES: SurpriseLevel[] = [
  {
    level: 1,
    title: 'Bronze Diya Radiance',
    badge: 'Level 1 Surprise',
    message: 'Someone special is sending you endless happiness and pure love! ❤️',
    blessing: 'May peace and sweet laughter blossom in your heart today and always.',
    icon: '🪔',
    color: '#FF6B00',
  },
  {
    level: 2,
    title: 'Golden Starlight Wonder',
    badge: 'Level 2 Surprise',
    message: 'May your life shine brighter than a thousand stars in the midnight sky! ✨',
    blessing: 'Every dream you have nurtured will find its wings of light this festival.',
    icon: '⭐',
    color: '#FFD700',
  },
  {
    level: 3,
    title: 'Sacred Hope & Prosperity',
    badge: 'Level 3 Surprise',
    message: 'May every diya lit across the world bring new hope, vigor, and prosperity into your home!',
    blessing: 'Goddess Mahalakshmi grants boundless abundance to you and your lineage.',
    icon: '🌺',
    color: '#EC4899',
  },
  {
    level: 4,
    title: 'The Light of Smiles',
    badge: 'Level 4 Surprise',
    message: 'Your smile is the brightest light of this entire Diwali festival! 🌟',
    blessing: 'Your joy is a contagious sanctuary of warmth for all those who cherish you.',
    icon: '💖',
    color: '#06B6D4',
  },
  {
    level: 5,
    title: 'Royal Emperor Blessing',
    badge: 'Level 5 Surprise',
    message: 'Infinite festive magic unlocked! Health, supreme wealth, and divine triumph are yours!',
    blessing: 'May this year be remembered as the beginning of your greatest milestones.',
    icon: '👑',
    color: '#10B981',
  },
];

export const SurpriseGiftSection: React.FC = () => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const activeSurprise = SURPRISES[currentLevelIdx % SURPRISES.length];

  // Open Gift Box & Trigger Multi-Layer Celebration
  const handleOpenGift = () => {
    setIsShaking(true);
    soundEngine.playDiyaIgnite();

    setTimeout(() => {
      setIsShaking(false);
      setIsBoxOpen(true);
      soundEngine.playMagicChime();
      soundEngine.playFireworkBurst(1.2);

      // Canvas Confetti multi-burst
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF6B00', '#EC4899', '#06B6D4', '#10B981'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FF69B4', '#FFF'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#00FFFF', '#FF4500'],
        });
      }, 350);
    }, 700);
  };

  const nextSurprise = () => {
    setIsBoxOpen(false);
    setCurrentLevelIdx((prev) => prev + 1);
    setTimeout(() => {
      handleOpenGift();
    }, 300);
  };

  return (
    <section id="surprise" className="relative py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Gift className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Surprise Diwali Gift Vault</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          INTERACTIVE 3D GIFT BOX & POPUPS
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Tap the enchanted 3D Diwali Gift Box below to crack open multi-tiered festival surprises,
          confetti showers, and heartwarming secret blessings.
        </p>
      </div>

      {/* The Central 3D Interactive Gift Box */}
      <div className="flex flex-col items-center justify-center py-10 relative">
        {/* Glow halo behind box */}
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-amber-500/25 via-pink-500/20 to-purple-600/20 blur-3xl pointer-events-none animate-pulse-glow" />

        {/* 3D Gift Box Component */}
        <motion.div
          animate={
            isShaking
              ? {
                  rotate: [-8, 8, -6, 6, -4, 4, 0],
                  scale: [1, 1.1, 1, 1.15, 1],
                }
              : {
                  y: [0, -10, 0],
                }
          }
          transition={
            isShaking
              ? { duration: 0.65, ease: 'easeInOut' }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
          }
          onClick={handleOpenGift}
          className="relative cursor-pointer group select-none"
        >
          {/* Ribbon Bow on top */}
          <div className="relative z-20 flex justify-center -mb-4">
            <div className="w-14 h-10 rounded-full border-4 border-amber-300 bg-amber-400 -rotate-12 shadow-glow-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-950 animate-spin-slow" />
            </div>
            <div className="w-14 h-10 rounded-full border-4 border-amber-300 bg-amber-400 rotate-12 shadow-glow-gold -ml-3 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-950 animate-spin-slow" />
            </div>
          </div>

          {/* Lid */}
          <div className="w-48 sm:w-56 h-12 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 border-2 border-amber-300 shadow-2xl relative z-10 flex items-center justify-center">
            {/* Golden cross ribbon */}
            <div className="w-8 h-full bg-amber-400 border-x border-amber-200" />
          </div>

          {/* Box Body */}
          <div className="w-44 sm:w-52 h-44 sm:h-52 mx-auto rounded-b-3xl bg-gradient-to-b from-purple-900 via-indigo-950 to-[#120325] border-2 border-t-0 border-amber-400/80 shadow-2xl relative overflow-hidden flex items-center justify-center -mt-2">
            {/* Golden vertical ribbon */}
            <div className="absolute inset-y-0 w-8 bg-amber-400 border-x border-amber-200" />
            {/* Golden horizontal ribbon */}
            <div className="absolute inset-x-0 h-8 bg-amber-400 border-y border-amber-200" />

            {/* Floating Emblem */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-amber-400 text-amber-950 font-bold flex items-center justify-center text-2xl shadow-glow-gold border-2 border-amber-100">
              {activeSurprise.icon}
            </div>
          </div>

          {/* Base Shadow */}
          <div className="w-56 h-8 rounded-full bg-black/60 blur-md mx-auto -mt-3" />
        </motion.div>

        {/* Click CTA Prompt */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-xs uppercase font-bold tracking-widest text-amber-300 animate-pulse">
            👆 CLICK THE GIFT BOX TO UNWRAP SURPRISE
          </p>
          <p className="text-xs text-purple-300/80">
            Current Tier: <span className="text-amber-200 font-bold">{activeSurprise.title}</span> (Level {activeSurprise.level}/5)
          </p>
        </div>
      </div>

      {/* Magical Surprise Popup Modal */}
      <AnimatePresence>
        {isBoxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: 'spring', damping: 20 }}
              className="w-full max-w-lg rounded-3xl glass-panel-glow border-2 border-amber-400 p-6 sm:p-8 relative shadow-2xl text-center space-y-6 overflow-hidden"
            >
              {/* Floating Background Sparkles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsBoxOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Award className="w-4 h-4 text-amber-300" />
                <span>{activeSurprise.badge}</span>
              </div>

              {/* Central Glowing Icon */}
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 mx-auto flex items-center justify-center text-4xl shadow-glow-gold border border-amber-200">
                <span className="animate-bounce">{activeSurprise.icon}</span>
              </div>

              {/* Surprise Title & Message */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200">
                  {activeSurprise.title}
                </h3>
                <p className="text-lg sm:text-xl text-white font-medium leading-snug px-2">
                  "{activeSurprise.message}"
                </p>
                <p className="text-sm text-purple-200/90 font-light italic max-w-md mx-auto">
                  {activeSurprise.blessing}
                </p>
              </div>

              {/* Buttons: Next Surprise & Close */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={nextSurprise}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm tracking-wider uppercase shadow-glow-saffron flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>NEXT SURPRISE ({((currentLevelIdx + 1) % 5) + 1}/5)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsBoxOpen(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700 text-sm font-semibold transition-all"
                >
                  Close Vault
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
