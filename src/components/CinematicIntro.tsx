import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, Flame, ChevronRight, SkipForward } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Scene transition timers
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentScene(2);
      soundEngine.playDiyaIgnite();
    }, 4500);

    const timer2 = setTimeout(() => {
      setCurrentScene(3);
      soundEngine.playFireworkBurst(1.2);
      setTimeout(() => soundEngine.playFireworkBurst(0.9), 600);
      setTimeout(() => soundEngine.playFireworkBurst(1.1), 1200);
    }, 9500);

    const timer3 = setTimeout(() => {
      setCurrentScene(4);
      soundEngine.playTempleBell();
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Canvas particle animation (Stars, Petals, Lanterns, Fireworks)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    const stars = Array.from({ length: 180 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.75,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Flower petals (Scene 2+)
    const petals = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 10 + 6,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1.2 - 0.6,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 2 - 1,
      color: Math.random() > 0.4 ? '#FF9900' : '#E91E63', // Marigold & Rose
    }));

    // Fireworks bursts (Scene 3+)
    type Particle = { x: number; y: number; vx: number; vy: number; color: string; alpha: number; life: number };
    let fireworks: Particle[] = [];

    const triggerBurst = (bx: number, by: number, colorArr: string[]) => {
      for (let i = 0; i < 45; i++) {
        const angle = (Math.PI * 2 * i) / 45;
        const speed = Math.random() * 4 + 2;
        fireworks.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colorArr[Math.floor(Math.random() * colorArr.length)],
          alpha: 1,
          life: 0.98,
        });
      }
    };

    let lastBurst = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw starry sky
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 235, 150, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Petals in Scene 2+
      if (currentScene >= 2) {
        petals.forEach((p) => {
          p.y += p.speedY;
          p.x += Math.sin(p.y * 0.02) * 1.2;
          p.rotation += p.rotSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Fireworks in Scene 3+
      if (currentScene >= 3) {
        if (time - lastBurst > 1800) {
          lastBurst = time;
          const colors = [
            ['#FFD700', '#FF4500', '#FF1493'],
            ['#00FFFF', '#00FF7F', '#FFFF00'],
            ['#FF00FF', '#FF69B4', '#FFA500'],
          ];
          const chosen = colors[Math.floor(Math.random() * colors.length)];
          triggerBurst(
            width * 0.2 + Math.random() * width * 0.6,
            height * 0.15 + Math.random() * height * 0.35,
            chosen
          );
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
          const p = fireworks[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // gravity
          p.alpha *= p.life;

          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          if (p.alpha < 0.05) fireworks.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentScene]);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEngine.setMuted(nextState);
  };

  const handleEnter = () => {
    soundEngine.playTempleBell();
    soundEngine.playFireworkBurst(1.0);
    // Start ambient festive music upon user interaction
    soundEngine.toggleMusic(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-[#0b031c] via-[#14062f] to-[#05010c] text-white flex flex-col justify-between">
      {/* Canvas for stars, petals and fireworks */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Top Header controls: Skip Intro & Audio toggle */}
      <header className="relative z-30 flex justify-between items-center p-6 md:p-8">
        <div className="flex items-center gap-2 bg-purple-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-400/30">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-amber-200">
            Diwali Magic AI Experience
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-3 rounded-full bg-purple-900/60 hover:bg-purple-800/80 backdrop-blur-md border border-amber-400/40 text-amber-300 transition-all hover:scale-110 active:scale-95 shadow-glow-gold"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={handleEnter}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/40 hover:to-orange-500/40 border border-amber-400/40 text-amber-200 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-glow-saffron"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </header>

      {/* Central Cinematic Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          {/* SCENE 1: Mystical Night Sky */}
          {currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="max-w-3xl space-y-6"
            >
              <div className="inline-block p-4 rounded-full bg-amber-400/10 border border-amber-300/30 backdrop-blur-md animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-amber-300 mx-auto" />
              </div>
              <h2 className="text-3xl md:text-5xl font-cinzel tracking-wider text-amber-200 font-bold drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">
                A Sacred Festival Night Unfolds...
              </h2>
              <p className="text-base md:text-xl text-purple-200/90 font-light max-w-xl mx-auto leading-relaxed">
                Beneath a celestial canopy of infinite golden stars, the auspicious spirit of Diwali awakens.
              </p>
              <button
                onClick={() => setCurrentScene(2)}
                className="mt-4 px-6 py-2 rounded-full border border-amber-400/30 bg-purple-900/40 hover:bg-purple-800/60 text-amber-300 text-sm tracking-widest inline-flex items-center gap-2 transition-all"
              >
                <span>LIGHT THE FIRST DIYA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* SCENE 2: The Sacred Glowing Diya */}
          {currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.4 }}
              className="flex flex-col items-center space-y-6 max-w-2xl"
            >
              {/* Glowing Diya Graphics */}
              <div className="relative group cursor-pointer" onClick={() => soundEngine.playDiyaIgnite()}>
                {/* Outer radiating aura */}
                <div className="absolute -inset-10 rounded-full bg-gradient-to-r from-amber-500/30 via-orange-500/40 to-pink-500/20 blur-3xl animate-pulse-glow" />

                <div className="relative flex flex-col items-center">
                  {/* Diya Flame */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 0.95, 1.1, 1],
                      rotate: [-2, 3, -3, 2, -2],
                      filter: [
                        'drop-shadow(0 0 20px #FF9900)',
                        'drop-shadow(0 0 35px #FFD700)',
                        'drop-shadow(0 0 25px #FF5500)',
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="w-14 h-24 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 rounded-full blur-[1px] -mb-4 flex items-center justify-center shadow-glow-flame"
                  >
                    <div className="w-5 h-12 bg-white rounded-full blur-[1px] opacity-80" />
                  </motion.div>

                  {/* Diya Clay Base */}
                  <div className="w-36 h-14 bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#78350F] rounded-b-full border-t-4 border-amber-300 shadow-2xl relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 opacity-70" />
                    <span className="text-[10px] text-amber-200/80 font-bold tracking-widest uppercase">
                      शुभ दीपावली
                    </span>
                  </div>
                  {/* Golden reflection plate */}
                  <div className="w-52 h-6 rounded-full bg-amber-500/20 blur-md -mt-2" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <h3 className="text-2xl md:text-4xl font-cinzel font-bold text-amber-300 drop-shadow-md">
                  From Darkness into Radiant Light
                </h3>
                <p className="text-sm md:text-lg text-amber-100/90 font-light max-w-lg mx-auto">
                  As the holy flame blossoms, prosperity, peace, and eternal joy cascade into every home.
                </p>
              </motion.div>

              <button
                onClick={() => {
                  setCurrentScene(3);
                  soundEngine.playFireworkBurst(1.2);
                }}
                className="px-6 py-2 rounded-full border border-orange-400/40 bg-orange-950/40 hover:bg-orange-900/60 text-amber-300 text-sm tracking-wider inline-flex items-center gap-2 transition-all shadow-glow-saffron"
              >
                <span>IGNITE THE HEAVENS</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* SCENE 3: Festive Haveli & Sky Explosions */}
          {currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center space-y-6 max-w-3xl"
            >
              {/* Palace Architecture Silhouette with Glowing Windows */}
              <div className="relative w-full max-w-xl py-6 px-8 rounded-3xl bg-gradient-to-b from-purple-950/40 via-purple-900/50 to-indigo-950/80 backdrop-blur-xl border border-amber-400/40 shadow-glow-gold">
                {/* Hanging Lanterns Row */}
                <div className="flex justify-around items-center mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8, 0], rotate: [i % 2 === 0 ? 3 : -3, i % 2 === 0 ? -3 : 3] }}
                      transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-[1px] h-8 bg-amber-400/60" />
                      <div className="w-8 h-10 rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-pink-600 shadow-glow-saffron flex items-center justify-center border border-amber-200/50">
                        <Flame className="w-4 h-4 text-amber-100" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h3 className="text-2xl md:text-4xl font-rozha text-amber-200 tracking-wide">
                  The Royal Palace of Illumination
                </h3>
                <p className="text-sm md:text-base text-purple-200/90 mt-2 font-light">
                  A symphony of colorful fireworks and sacred lamps reverberate across joyful streets.
                </p>

                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={() => soundEngine.playFireworkBurst(1.3)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-xs font-semibold tracking-wider uppercase text-white shadow-glow-pink transition-all"
                  >
                    🎆 Launch Sparkle
                  </button>
                  <button
                    onClick={() => soundEngine.playTempleBell()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-xs font-semibold tracking-wider uppercase text-amber-950 shadow-glow-gold transition-all"
                  >
                    🔔 Ring Sacred Bell
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentScene(4);
                  soundEngine.playTempleBell();
                }}
                className="px-7 py-2.5 rounded-full border border-amber-400/50 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-sm font-semibold tracking-widest inline-flex items-center gap-2 transition-all shadow-glow-gold"
              >
                <span>OPEN THE FESTIVAL GATES</span>
                <ChevronRight className="w-5 h-5 text-amber-300" />
              </button>
            </motion.div>
          )}

          {/* SCENE 4: Grand Finale Announcement & Enter Button */}
          {currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="flex flex-col items-center space-y-8 max-w-3xl"
            >
              {/* Grand Title Banner */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-300/40 backdrop-blur-md">
                  <span className="text-xl">🪔</span>
                  <span className="text-xs md:text-sm font-bold tracking-widest text-amber-200 uppercase font-sans">
                    Auspicious Celebration • Happy Diwali 2026
                  </span>
                  <span className="text-xl">✨</span>
                </div>

                <h1 className="text-4xl md:text-7xl font-cinzel font-black tracking-wide gold-gradient-text drop-shadow-[0_0_35px_rgba(255,215,0,0.6)] leading-tight">
                  ✨ THE MAGIC OF DIWALI BEGINS ✨
                </h1>

                <p className="text-lg md:text-2xl text-purple-100 font-light max-w-xl mx-auto italic">
                  "Let's celebrate love, happiness and togetherness."
                </p>
              </motion.div>

              {/* Enter The Celebration CTA Button */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="relative group pt-4"
              >
                {/* Pulsing glow underlay */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse-glow" />

                <button
                  onClick={handleEnter}
                  className="relative px-10 md:px-14 py-4 md:py-5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 text-white font-bold text-lg md:text-xl tracking-wider uppercase border border-amber-200/50 shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
                >
                  <Sparkles className="w-6 h-6 text-amber-200 animate-spin-slow" />
                  <span>ENTER THE CELEBRATION</span>
                  <ChevronRight className="w-6 h-6 text-amber-200 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Scene Indicators */}
      <footer className="relative z-30 flex justify-center items-center gap-3 pb-8">
        {[1, 2, 3, 4].map((step) => (
          <button
            key={step}
            onClick={() => {
              setCurrentScene(step);
              if (step === 2) soundEngine.playDiyaIgnite();
              if (step === 3) soundEngine.playFireworkBurst(1.0);
              if (step === 4) soundEngine.playTempleBell();
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentScene === step ? 'w-10 bg-amber-400 shadow-glow-gold' : 'w-2 bg-purple-900/80 hover:bg-purple-700'
            }`}
            title={`Scene ${step}`}
          />
        ))}
      </footer>
    </div>
  );
};
