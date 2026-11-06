import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Flame, Zap, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

type FireworkShape = 'random' | 'circle' | 'heart' | 'star' | 'shower';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  gravity: number;
  trail: { x: number; y: number }[];
  isSparkler?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  shape: FireworkShape;
}

const PALETTES = [
  ['#FFD700', '#FFA500', '#FF4500'], // Golden Saffron
  ['#EC4899', '#D946EF', '#8B5CF6'], // Magenta Violet
  ['#06B6D4', '#3B82F6', '#60A5FA'], // Electric Blue
  ['#10B981', '#34D399', '#A7F3D0'], // Emerald Green
  ['#F43F5E', '#FB7185', '#FDA4AF'], // Rose Crimson
  ['#FFD700', '#FFFFFF', '#FEF08A'], // Pure Gold Sparkle
];

export const FireworksPlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedShape, setSelectedShape] = useState<FireworkShape>('random');
  const [isFinaleRunning, setIsFinaleRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [fireworkCount, setFireworkCount] = useState<number>(0);

  const rocketsRef = useRef<Rocket[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseTrailRef = useRef<{ x: number; y: number; alpha: number; color: string }[]>([]);

  // Explode rocket into designated shape
  const explode = useCallback((x: number, y: number, shape: FireworkShape, palette: string[]) => {
    const particles: Particle[] = [];
    const baseColor = palette[Math.floor(Math.random() * palette.length)];

    let actualShape = shape;
    if (shape === 'random') {
      const choices: FireworkShape[] = ['circle', 'heart', 'star', 'shower'];
      actualShape = choices[Math.floor(Math.random() * choices.length)];
    }

    if (actualShape === 'heart') {
      const count = 75;
      for (let i = 0; i < count; i++) {
        const t = (Math.PI * 2 * i) / count;
        // Heart curve
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.22;
        particles.push({
          x,
          y,
          vx: hx * speed + (Math.random() - 0.5) * 0.4,
          vy: hy * speed + (Math.random() - 0.5) * 0.4,
          color: palette[i % palette.length],
          alpha: 1,
          decay: 0.014 + Math.random() * 0.006,
          size: 3.2,
          gravity: 0.03,
          trail: [],
        });
      }
    } else if (actualShape === 'star') {
      const points = 5;
      const count = 80;
      for (let i = 0; i < count; i++) {
        const theta = (Math.PI * 2 * i) / count;
        // Modulate radius for 5 pointed star
        const r = 2.8 + Math.cos(points * theta) * 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(theta) * r + (Math.random() - 0.5) * 0.3,
          vy: Math.sin(theta) * r + (Math.random() - 0.5) * 0.3,
          color: palette[i % palette.length],
          alpha: 1,
          decay: 0.015,
          size: 3,
          gravity: 0.035,
          trail: [],
        });
      }
    } else if (actualShape === 'shower') {
      // Golden Weeping Willow
      const count = 100;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          color: '#FFD700',
          alpha: 1,
          decay: 0.008 + Math.random() * 0.005, // longer life
          size: 2.4,
          gravity: 0.06,
          trail: [],
        });
      }
    } else {
      // Circle / Peony burst
      const count = 90;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1,
          decay: 0.016 + Math.random() * 0.008,
          size: 3,
          gravity: 0.045,
          trail: [],
        });
      }
    }

    particlesRef.current.push(...particles);
    setFireworkCount((prev) => prev + 1);

    if (soundEnabled) {
      soundEngine.playFireworkBurst(1.0);
    }
  }, [soundEnabled]);

  // Launch a rocket to target
  const launchRocket = useCallback((targetX: number, targetY: number, shape: FireworkShape = selectedShape) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = targetX + (Math.random() - 0.5) * 60;
    const startY = canvas.height;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.hypot(dx, dy);
    const speed = 14;

    const chosenPalette = PALETTES[Math.floor(Math.random() * PALETTES.length)];

    rocketsRef.current.push({
      x: startX,
      y: startY,
      targetX,
      targetY,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      color: chosenPalette[0],
      shape,
    });
  }, [selectedShape]);

  // Click on canvas to launch
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    launchRocket(x, y);
  };

  // Touch on canvas
  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    launchRocket(x, y);
  };

  // Mouse move sparkle reactive trail
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseTrailRef.current.push({
      x,
      y,
      alpha: 1,
      color: ['#FFD700', '#EC4899', '#06B6D4', '#10B981'][Math.floor(Math.random() * 4)],
    });

    if (mouseTrailRef.current.length > 30) {
      mouseTrailRef.current.shift();
    }
  };

  // Multiple fireworks celebration button
  const triggerCelebrationBarrage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
        const y = canvas.height * 0.15 + Math.random() * canvas.height * 0.35;
        launchRocket(x, y);
      }, i * 280);
    }
  };

  // Grand Finale
  const triggerGrandFinale = () => {
    if (isFinaleRunning) return;
    setIsFinaleRunning(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    let count = 0;
    const interval = setInterval(() => {
      count++;
      const x = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
      const y = canvas.height * 0.1 + Math.random() * canvas.height * 0.4;
      const shapes: FireworkShape[] = ['heart', 'star', 'circle', 'shower'];
      launchRocket(x, y, shapes[Math.floor(Math.random() * shapes.length)]);

      if (count > 28) {
        clearInterval(interval);
        setIsFinaleRunning(false);
      }
    }, 180);
  };

  // Main canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      // Semi-transparent overlay to create authentic glowing motion blur trails
      ctx.fillStyle = 'rgba(7, 3, 20, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render Mouse Trail
      for (let i = mouseTrailRef.current.length - 1; i >= 0; i--) {
        const t = mouseTrailRef.current[i];
        t.alpha *= 0.92;
        ctx.fillStyle = t.color;
        ctx.globalAlpha = t.alpha;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        if (t.alpha < 0.05) mouseTrailRef.current.splice(i, 1);
      }

      // Update & Draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        // Sparkle tail behind rocket
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x - r.vx * 0.5, r.y - r.vy * 0.5, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Check if reached target
        if (r.y <= r.targetY || Math.abs(r.x - r.targetX) < 10) {
          const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
          explode(r.x, r.y, r.shape, palette);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update & Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.vx *= 0.98; // air resistance
        p.vy *= 0.98;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 4) p.trail.shift();

        // Draw particle trail
        if (p.trail.length > 1) {
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.lineWidth = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let k = 1; k < p.trail.length; k++) {
            ctx.lineTo(p.trail[k].x, p.trail[k].y);
          }
          ctx.stroke();
        }

        // Draw head
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [explode]);

  return (
    <section id="fireworks" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>Interactive Sky Arena</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text drop-shadow-md">
          LIGHT UP THE SKY WITH HAPPINESS!
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Tap or click anywhere in the night sky to launch vibrant fireworks. Experience celestial hearts,
          shimmering stars, and cascading golden showers with authentic explosive sound effects!
        </p>
      </div>

      {/* Control Panel Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel mb-4">
        {/* Shape Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-amber-300 font-bold mr-1">Burst Shape:</span>
          {(['random', 'heart', 'star', 'shower', 'circle'] as FireworkShape[]).map((shape) => (
            <button
              key={shape}
              onClick={() => setSelectedShape(shape)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedShape === shape
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-glow-saffron'
                  : 'bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-800/60'
              }`}
            >
              {shape === 'random' && '🎲 Surprise'}
              {shape === 'heart' && '❤️ Heart'}
              {shape === 'star' && '⭐ Star'}
              {shape === 'shower' && '✨ Gold Shower'}
              {shape === 'circle' && '💥 Peony'}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-purple-950 border-purple-800 text-purple-400'
            }`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'FX On' : 'FX Off'}</span>
          </button>

          <button
            onClick={triggerCelebrationBarrage}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-400 hover:to-pink-400 text-white font-bold text-xs uppercase tracking-wider shadow-glow-pink flex items-center gap-2 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 text-yellow-200" />
            <span>Launch Barrage</span>
          </button>

          <button
            onClick={triggerGrandFinale}
            disabled={isFinaleRunning}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 hover:brightness-110 text-white font-extrabold text-xs uppercase tracking-wider shadow-glow-gold flex items-center gap-2 disabled:opacity-50 active:scale-95 transition-all animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{isFinaleRunning ? 'Exploding Finale...' : '✨ Grand Finale'}</span>
          </button>
        </div>
      </div>

      {/* Canvas Interactive Sky Container */}
      <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl bg-[#090317]">
        {/* Subtle Palace Skyline Silhouette Background */}
        <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none opacity-40 bg-gradient-to-t from-purple-950 via-purple-950/20 to-transparent flex items-end justify-around">
          <div className="w-24 h-28 bg-[#180932] rounded-t-full border-t border-amber-400/30" />
          <div className="w-36 h-36 bg-[#1a0b36] rounded-t-full border-t border-amber-400/40 relative">
            <div className="w-4 h-8 bg-amber-400/80 rounded-full mx-auto mt-4 blur-[1px] animate-pulse" />
          </div>
          <div className="w-28 h-32 bg-[#180932] rounded-t-full border-t border-amber-400/30" />
        </div>

        {/* The Fireworks Canvas */}
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onTouchStart={handleTouch}
          onMouseMove={handleMouseMove}
          className="w-full h-full cursor-crosshair relative z-10"
        />

        {/* Hint Overlay */}
        <div className="absolute bottom-4 left-6 z-20 pointer-events-none text-xs text-amber-200/70 font-light flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Click anywhere to ignite • Fireworks detonated: <b className="text-amber-300 font-mono">{fireworkCount}</b></span>
        </div>
      </div>
    </section>
  );
};
