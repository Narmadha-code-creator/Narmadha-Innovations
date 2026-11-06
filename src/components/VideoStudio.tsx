import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Video, Play, Pause, RotateCcw, Download, Sparkles, Film, Clock, Palette, Check, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

type VideoTheme =
  | 'Royal Golden Diwali'
  | 'Colorful Fireworks'
  | 'Magical Purple Night'
  | 'Traditional Indian Diwali'
  | 'Floral Celebration'
  | 'Romantic Golden Lights'
  | 'Family Celebration';

interface ThemeConfig {
  name: VideoTheme;
  bgColor: [string, string, string];
  primaryColor: string;
  particleType: 'gold' | 'fireworks' | 'petals' | 'lanterns' | 'hearts';
  icon: string;
}

const THEMES: ThemeConfig[] = [
  {
    name: 'Royal Golden Diwali',
    bgColor: ['#1A0B00', '#3D1A00', '#000000'],
    primaryColor: '#FFD700',
    particleType: 'gold',
    icon: '👑',
  },
  {
    name: 'Colorful Fireworks',
    bgColor: ['#0A031F', '#18073B', '#03000A'],
    primaryColor: '#00FFFF',
    particleType: 'fireworks',
    icon: '🎆',
  },
  {
    name: 'Magical Purple Night',
    bgColor: ['#17052C', '#320B5E', '#090114'],
    primaryColor: '#D946EF',
    particleType: 'lanterns',
    icon: '🔮',
  },
  {
    name: 'Traditional Indian Diwali',
    bgColor: ['#2B0703', '#5E1308', '#0D0202'],
    primaryColor: '#FF6B00',
    particleType: 'petals',
    icon: '🪔',
  },
  {
    name: 'Floral Celebration',
    bgColor: ['#042618', '#0B472E', '#01120B'],
    primaryColor: '#34D399',
    particleType: 'petals',
    icon: '🌸',
  },
  {
    name: 'Romantic Golden Lights',
    bgColor: ['#280516', '#4F0C2C', '#0F0108'],
    primaryColor: '#FB7185',
    particleType: 'hearts',
    icon: '💖',
  },
  {
    name: 'Family Celebration',
    bgColor: ['#1A0C2B', '#3E1E66', '#09040F'],
    primaryColor: '#F59E0B',
    particleType: 'gold',
    icon: '👨‍👩‍👧‍👦',
  },
];

export const VideoStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Video State
  const [recipient, setRecipient] = useState<string>('Grandma & Grandpa');
  const [message, setMessage] = useState<string>('May your lives be blessed with eternal health and endless joy!');
  const [selectedTheme, setSelectedTheme] = useState<VideoTheme>('Royal Golden Diwali');
  const [duration, setDuration] = useState<number>(8); // 5, 8, 12 seconds
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const pausedTimeOffsetRef = useRef<number>(0);

  const activeThemeConfig = THEMES.find((t) => t.name === selectedTheme) || THEMES[0];

  // Draw scene at timestamp `t` (seconds)
  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, t: number) => {
      const progress = Math.min(1, t / duration);
      const theme = activeThemeConfig;

      // 1. Camera Zoom / Pan effect
      const zoom = 1.0 + progress * 0.12;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-width / 2, -height / 2);

      // 2. Background Gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.6,
        50,
        width / 2,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, theme.bgColor[1]);
      grad.addColorStop(0.6, theme.bgColor[0]);
      grad.addColorStop(1, theme.bgColor[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating Background Particles
      const particleCount = 45;
      for (let i = 0; i < particleCount; i++) {
        const seed = i * 133.7;
        const px = (Math.sin(seed + t * 0.3) * 0.5 + 0.5) * width;
        const py = ((seed * 10 - t * 45) % (height + 50)) + (height + 50) % (height + 50);

        if (theme.particleType === 'petals') {
          // Marigold / rose petals
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate((t * 2 + seed) % (Math.PI * 2));
          ctx.fillStyle = i % 2 === 0 ? '#FF9900' : '#EC4899';
          ctx.beginPath();
          ctx.ellipse(0, 0, 7, 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (theme.particleType === 'hearts') {
          // Soft glowing hearts
          ctx.save();
          ctx.translate(px, py);
          ctx.fillStyle = '#FB7185';
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.arc(-2, 0, 3, 0, Math.PI * 2);
          ctx.arc(2, 0, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Golden stardust sparkles
          ctx.fillStyle = theme.primaryColor;
          ctx.globalAlpha = 0.4 + Math.sin(t * 3 + seed) * 0.4;
          ctx.beginPath();
          ctx.arc(px, py, (i % 3) + 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // 4. Periodic Firework Bursts in background
      const burstIndex = Math.floor(t / 2.2);
      const burstTime = (t % 2.2);
      if (burstTime < 1.4) {
        const bx = width * (0.2 + ((burstIndex * 37) % 60) / 100);
        const by = height * 0.25;
        const bProgress = burstTime / 1.4;
        const burstRadius = bProgress * 90;
        const bAlpha = 1 - bProgress;

        ctx.save();
        for (let ray = 0; ray < 16; ray++) {
          const ang = (Math.PI * 2 * ray) / 16;
          const rx = bx + Math.cos(ang) * burstRadius;
          const ry = by + Math.sin(ang) * burstRadius;
          ctx.fillStyle = theme.primaryColor;
          ctx.globalAlpha = bAlpha;
          ctx.beginPath();
          ctx.arc(rx, ry, 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 5. Center Golden Glowing Diya
      const diyaY = height * 0.65;
      const diyaX = width / 2;

      // Outer Diya aura
      const aura = ctx.createRadialGradient(diyaX, diyaY - 20, 5, diyaX, diyaY - 20, 110);
      aura.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
      aura.addColorStop(0.4, 'rgba(255, 107, 0, 0.2)');
      aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(diyaX, diyaY - 20, 110, 0, Math.PI * 2);
      ctx.fill();

      // Diya Base
      ctx.fillStyle = '#853205';
      ctx.beginPath();
      ctx.ellipse(diyaX, diyaY, 48, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Flickering Flame
      const flameHeight = 38 + Math.sin(t * 14) * 5;
      const flameSway = Math.cos(t * 8) * 3;
      const flameGrad = ctx.createLinearGradient(diyaX, diyaY, diyaX, diyaY - flameHeight);
      flameGrad.addColorStop(0, '#FF4500');
      flameGrad.addColorStop(0.6, '#FFD700');
      flameGrad.addColorStop(1, '#FFFFFF');

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(diyaX - 12, diyaY - 4);
      ctx.quadraticCurveTo(diyaX + flameSway, diyaY - flameHeight * 0.8, diyaX, diyaY - flameHeight);
      ctx.quadraticCurveTo(diyaX + 12, diyaY - flameHeight * 0.5, diyaX + 12, diyaY - 4);
      ctx.closePath();
      ctx.fill();

      // Restore camera transform
      ctx.restore();

      // 6. Cinematic Screen Borders & Decorative Corners
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, width - 40, height - 40);

      // Corner ornaments
      const corners = [
        [20, 20],
        [width - 20, 20],
        [20, height - 20],
        [width - 20, height - 20],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 7. Cinematic Dynamic Typography
      ctx.textAlign = 'center';

      // Top Tagline
      ctx.font = 'bold 14px Outfit, sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.letterSpacing = '4px';
      ctx.fillText('✨ SHUBH DEEPAVALI CELEBRATION ✨', width / 2, 60);

      // Recipient Name (with shimmer)
      ctx.font = '900 36px "Cinzel Decorative", serif';
      const textGrad = ctx.createLinearGradient(width / 2 - 150, 0, width / 2 + 150, 0);
      textGrad.addColorStop(0, '#FFE899');
      textGrad.addColorStop(0.5, '#FFD700');
      textGrad.addColorStop(1, '#FF9900');
      ctx.fillStyle = textGrad;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fillText(recipient || 'Our Loved Ones', width / 2, 120);
      ctx.shadowBlur = 0; // reset

      // Personalized Wish Subtitle
      ctx.font = '300 16px Outfit, sans-serif';
      ctx.fillStyle = '#F3E8FF';

      // Simple text wrap for message
      const words = (message || 'Wishing you happiness and light!').split(' ');
      let line = '';
      let lineY = height - 100;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 100 && n > 0) {
          ctx.fillText(line, width / 2, lineY);
          line = words[n] + ' ';
          lineY += 24;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, lineY);

      // Bottom Signature
      ctx.font = 'italic 12px Outfit, sans-serif';
      ctx.fillStyle = 'rgba(255, 215, 0, 0.7)';
      ctx.fillText('Sent with Love & Endless Blessings • Diwali Magic AI', width / 2, height - 35);
    },
    [activeThemeConfig, duration, recipient, message]
  );

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 360;

    let localAnimId: number;

    const render = () => {
      if (isPlaying && !isRecording) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000 + pausedTimeOffsetRef.current;
        const loopedTime = elapsed % duration;
        setCurrentTime(loopedTime);
        drawFrame(ctx, canvas.width, canvas.height, loopedTime);
      } else if (!isRecording) {
        drawFrame(ctx, canvas.width, canvas.height, currentTime);
      }
      localAnimId = requestAnimationFrame(render);
    };

    localAnimId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(localAnimId);
    };
  }, [isPlaying, isRecording, duration, currentTime, drawFrame]);

  // Handle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      pausedTimeOffsetRef.current = currentTime;
      setIsPlaying(false);
    } else {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
    }
  };

  // Restart video playback
  const restart = () => {
    pausedTimeOffsetRef.current = 0;
    startTimeRef.current = Date.now();
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // True WebM Video Export via MediaRecorder
  const handleExportVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsRecording(true);
    setIsPlaying(false);
    setRecordProgress(0);
    setDownloadUrl(null);
    soundEngine.playDiyaIgnite();

    try {
      // Capture 30 FPS stream from the Canvas element
      const stream = canvas.captureStream(30);
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm',
      ];
      let selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

      const recorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 3500000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setIsRecording(false);
        soundEngine.playTempleBell();
      };

      recorder.start();

      // Render frames sequentially at 30 fps
      const fps = 30;
      const totalFrames = duration * fps;
      let frame = 0;

      const recordStep = () => {
        if (frame <= totalFrames) {
          const t = frame / fps;
          setCurrentTime(t);
          setRecordProgress(Math.round((frame / totalFrames) * 100));
          drawFrame(ctx, canvas.width, canvas.height, t);
          frame++;
          setTimeout(recordStep, 1000 / fps);
        } else {
          recorder.stop();
        }
      };

      recordStep();
    } catch (err) {
      console.error('Error generating video:', err);
      setIsRecording(false);
    }
  };

  return (
    <section id="video-studio" className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-400/30 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Film className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Cinematic Production Studio</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          CREATE YOUR MAGICAL DIWALI VIDEO 🎬
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Produce an animated cinematic Diwali video with camera pans, blooming diyas, falling petals,
          and golden typography. Export directly to downloadable WebM video!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Video Controls & Form (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel space-y-5">
          <h3 className="font-cinzel text-lg font-bold text-amber-200 flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-400" />
            <span>Customize Video</span>
          </h3>

          {/* Recipient Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Recipient / Family Name
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Sharma Family, Amma & Appa..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Personalized Greeting
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter heartfelt wish..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Select Video Theme ({THEMES.length} Themes)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {THEMES.map((thm) => (
                <button
                  key={thm.name}
                  type="button"
                  onClick={() => setSelectedTheme(thm.name)}
                  className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 text-left transition-all ${
                    selectedTheme === thm.name
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-glow-saffron'
                      : 'bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40'
                  }`}
                >
                  <span className="text-base">{thm.icon}</span>
                  <span className="truncate">{thm.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Video Duration</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 8, 12].map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDuration(dur)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    duration === dur
                      ? 'bg-amber-400 text-amber-950 shadow-glow-gold'
                      : 'bg-purple-950/60 text-purple-200 border border-purple-800/60 hover:bg-purple-900'
                  }`}
                >
                  {dur} Seconds
                </button>
              ))}
            </div>
          </div>

          {/* Export Video CTA Button */}
          <button
            onClick={handleExportVideo}
            disabled={isRecording}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm tracking-wider uppercase shadow-glow-saffron flex items-center justify-center gap-2 disabled:opacity-60 transition-all active:scale-[0.99]"
          >
            {isRecording ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Rendering Video ({recordProgress}%)...</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>Export Animated WebM Video 🎬</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Video Stage & Player Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl glass-panel-glow p-4 relative overflow-hidden">
            {/* The Canvas Video Screen */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-amber-400/30">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Live recording indicator */}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>Recording Frame: {recordProgress}%</span>
                </div>
              )}
            </div>

            {/* Video Timeline & Scrub Bar */}
            <div className="mt-4 px-2 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                <span>{currentTime.toFixed(1)}s</span>
                <span>{duration}.0s</span>
              </div>
              <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-500 transition-all duration-75"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    disabled={isRecording}
                    className="p-2.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-amber-300 transition-all"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={restart}
                    disabled={isRecording}
                    className="p-2.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-amber-300 transition-all"
                    title="Restart"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>

                  <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
                    {selectedTheme}
                  </span>
                </div>

                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    download={`Diwali-Magical-Video-${recipient.replace(/\s+/g, '_')}.webm`}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-glow-emerald transition-all animate-bounce"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download WebM Video</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
