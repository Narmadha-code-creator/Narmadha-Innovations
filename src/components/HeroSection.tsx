import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Play, Volume2, ArrowDown, Gift, Video, Palette } from 'lucide-react';
import { Diwali3DScene } from './Diwali3DScene';
import { soundEngine } from '../utils/soundEngine';

export const HeroSection: React.FC = () => {
  // Countdown to Diwali Celebration
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: Diwali 2026 / festive target
    const targetDate = new Date('2026-11-08T00:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleIgniteCelebration = () => {
    soundEngine.playTempleBell();
    soundEngine.playFireworkBurst(1.2);
    const fwEl = document.getElementById('fireworks');
    if (fwEl) fwEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 md:px-8 overflow-hidden">
      {/* 3D Scene Layer (Absolute Canvas) */}
      <div className="absolute inset-0 z-0">
        <Diwali3DScene />
      </div>

      {/* Subtle Top & Bottom Gradient Vignettes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#070314] via-[#070314]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070314] via-[#070314]/80 to-transparent pointer-events-none z-10" />

      {/* Center Hero Content (Interactive Glassmorphic Hero) */}
      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6 my-auto pt-8">
        {/* Top Auspicious Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel-glow border border-amber-300/40 text-amber-200 shadow-glow-gold"
        >
          <span className="text-xl">🪔</span>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
            शुभ दीपावली • The Festival of Lights & Triumphant Grace
          </span>
          <span className="text-xl">✨</span>
        </motion.div>

        {/* Grand Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-cinzel font-black tracking-wide gold-gradient-text drop-shadow-[0_0_35px_rgba(255,215,0,0.5)] leading-tight">
            DIWALI MAGIC AI
          </h1>
          <p className="text-lg sm:text-2xl text-purple-100 font-light max-w-3xl mx-auto drop-shadow-md">
            Step into a cinematic 3D realm of glowing diyas, kaleidoscopic fireworks, personalized AI greetings,
            and animated festival memories.
          </p>
        </motion.div>

        {/* Auspicious Countdown Clock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center gap-3 sm:gap-6 p-3 sm:p-4 rounded-3xl glass-panel border border-amber-400/40 shadow-2xl"
        >
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Seconds', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center px-2">
              <span className="text-2xl sm:text-4xl font-mono font-bold text-amber-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-purple-300 font-semibold">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={handleIgniteCelebration}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-glow-saffron flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <Flame className="w-5 h-5 text-yellow-200 animate-pulse" />
            <span>Ignite Fireworks Arena</span>
          </button>

          <a
            href="#ai-wishes"
            onClick={() => soundEngine.playDiyaIgnite()}
            className="px-8 py-4 rounded-full glass-panel hover:bg-purple-900/60 border border-amber-400/40 text-amber-200 font-bold text-sm sm:text-base tracking-wider uppercase shadow-glow-gold flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Generate AI Wishes</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Floating Feature Highlights */}
      <div className="relative z-20 max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
        {[
          { icon: '🎆', title: 'Interactive Fireworks', desc: 'Click to launch custom shapes & barrages' },
          { icon: '🎬', title: 'Video Studio', desc: 'Render & export animated WebM videos' },
          { icon: '💌', title: '10 Greeting Cards', desc: 'Download high-res gold foil PNG cards' },
          { icon: '🎁', title: 'Enchanted 3D Gift', desc: 'Multi-tiered surprises & confetti' },
        ].map((feat, i) => (
          <div
            key={i}
            className="p-3.5 sm:p-4 rounded-2xl glass-panel border border-amber-400/20 flex items-center gap-3 text-left hover:border-amber-400/50 transition-all shadow-md group"
          >
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
              {feat.icon}
            </span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-amber-200">{feat.title}</div>
              <div className="text-[11px] text-purple-300/80 leading-tight">{feat.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
