import React, { useState, useRef } from 'react';
import { Upload, Download, ZoomIn, ZoomOut, RotateCw, Image as ImageIcon, Sparkles, RefreshCw, Check } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { soundEngine } from '../utils/soundEngine';

interface PhotoFrame {
  id: string;
  name: string;
  borderStyle: string;
  cornerStyle: string;
  themeColor: string;
  badge: string;
  decorTop: string;
}

const FRAMES: PhotoFrame[] = [
  {
    id: 'gold-arch',
    name: 'Imperial Gold Arch',
    borderStyle: 'border-8 border-amber-400 shadow-glow-gold',
    cornerStyle: 'rounded-t-[80px] rounded-b-3xl',
    themeColor: '#FFD700',
    badge: '👑 Royal Arch',
    decorTop: '🪔 ✨ 🪔',
  },
  {
    id: 'marigold-garland',
    name: 'Marigold & Rose Garland',
    borderStyle: 'border-8 border-orange-500 shadow-glow-saffron',
    cornerStyle: 'rounded-3xl',
    themeColor: '#FF6B00',
    badge: '🌼 Floral Garland',
    decorTop: '🌼 🌸 🌼',
  },
  {
    id: 'peacock-feather',
    name: 'Royal Peacock Radiance',
    borderStyle: 'border-8 border-emerald-400 shadow-glow-emerald',
    cornerStyle: 'rounded-3xl',
    themeColor: '#10B981',
    badge: '🦚 Peacock Border',
    decorTop: '🦚 ✨ 🦚',
  },
  {
    id: 'midnight-lantern',
    name: 'Sparkling Midnight Lantern',
    borderStyle: 'border-8 border-purple-500 shadow-glow-violet',
    cornerStyle: 'rounded-3xl',
    themeColor: '#A855F7',
    badge: '🏮 Lantern Night',
    decorTop: '🏮 🌟 🏮',
  },
  {
    id: 'rangoli-mandala',
    name: 'Mandala Rangoli Border',
    borderStyle: 'border-8 border-pink-500 shadow-glow-pink',
    cornerStyle: 'rounded-3xl',
    themeColor: '#EC4899',
    badge: '🌸 Rangoli Magic',
    decorTop: '🌺 🪔 🌺',
  },
  {
    id: 'sacred-lotus',
    name: 'Sacred Lotus & Deepam',
    borderStyle: 'border-8 border-yellow-300 shadow-glow-gold',
    cornerStyle: 'rounded-3xl',
    themeColor: '#FACC15',
    badge: '🪷 Sacred Lotus',
    decorTop: '🪷 🕉️ 🪷',
  },
];

export const PhotoGreetingCreator: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedFrameId, setSelectedFrameId] = useState<string>('gold-arch');
  const [name, setName] = useState<string>('Our Family');
  const [greeting, setGreeting] = useState<string>('Wishing you a Diwali full of boundless joy, glowing laughter, and sweet memories!');
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const activeFrame = FRAMES.find((f) => f.id === selectedFrameId) || FRAMES[0];

  // Handle local photo upload (preserved without altering identity or faces)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setZoom(1);
      setRotation(0);
      soundEngine.playMagicChime();
    }
  };

  // Download high-res customized frame image
  const handleDownload = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    soundEngine.playDiyaIgnite();

    try {
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        pixelRatio: 3,
        quality: 1.0,
      });

      const link = document.createElement('a');
      link.download = `Diwali-Photo-Greeting-${name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
      soundEngine.playTempleBell();
    } catch (err) {
      console.error('Failed to download photo greeting:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="photo-creator" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Personal Portrait & Memory Studio</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          AI DIWALI PHOTO GREETING CREATOR
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Upload your portrait or family photo to embed into ornate hand-crafted Diwali frames.
          Your authentic photo and identity are strictly preserved with high-resolution export.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel space-y-5">
          {/* Upload Button */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Upload Family or Personal Photo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-amber-400/40 hover:border-amber-400 bg-purple-950/40 hover:bg-purple-900/50 flex flex-col items-center justify-center gap-2 text-purple-200 hover:text-white transition-all group"
            >
              <Upload className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-semibold">
                {photoUrl ? 'Click to Change Photo' : 'Select Photo from Device'}
              </span>
              <span className="text-[11px] text-purple-400">PNG, JPG, WebP supported</span>
            </button>
          </div>

          {/* Adjustments (Zoom / Rotate) if photo uploaded */}
          {photoUrl && (
            <div className="space-y-3 p-3.5 rounded-xl bg-purple-950/60 border border-purple-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Adjust & Position Photo
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                  className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center text-xs text-purple-300 font-mono">
                  Zoom: {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
                  className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-2 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 ml-2"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Frame Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Choose Decorative Festival Frame
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FRAMES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setSelectedFrameId(f.id);
                    soundEngine.playDiyaIgnite();
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                    selectedFrameId === f.id
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-glow-gold'
                      : 'border-purple-800/40 bg-purple-950/40 text-purple-300 hover:bg-purple-900/40'
                  }`}
                >
                  <div className="truncate">{f.name}</div>
                  <div className="text-[10px] text-amber-300/70">{f.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Custom Wish */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Family or Individual Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh & Family"
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Custom Festive Message
            </label>
            <textarea
              rows={2}
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Enter greeting..."
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider shadow-glow-saffron flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Exporting High-Res Portrait...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Photo Greeting Image</span>
              </>
            )}
          </button>
        </div>

        {/* Live Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="text-xs uppercase tracking-wider text-amber-300/80 mb-3 font-semibold">
            🖼️ Live Framed Portrait Preview
          </div>

          {/* The Framed Greeting to be exported */}
          <div
            ref={previewRef}
            className={`w-full max-w-md aspect-[4/5] ${activeFrame.cornerStyle} ${activeFrame.borderStyle} p-6 relative overflow-hidden bg-gradient-to-b from-[#190733] via-[#0e031f] to-[#06010d] flex flex-col justify-between`}
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Top Frame Festive Ornaments */}
            <div className="text-center relative z-20 space-y-1">
              <div className="text-xl tracking-widest">{activeFrame.decorTop}</div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
                ✨ SHUBH DEEPAVALI 2026 ✨
              </h4>
            </div>

            {/* Central Photo Viewport */}
            <div className="relative w-full aspect-square my-auto rounded-2xl overflow-hidden border-2 border-amber-300/40 bg-purple-950/70 flex items-center justify-center">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Personal Diwali Portrait"
                  className="w-full h-full object-cover transition-transform duration-100"
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center text-purple-300">
                  <ImageIcon className="w-12 h-12 text-amber-400/70 animate-pulse" />
                  <span className="text-sm font-medium">No photo uploaded yet</span>
                  <span className="text-xs text-purple-400">
                    Use the upload button on the left to add your personal portrait
                  </span>
                </div>
              )}

              {/* Decorative Corner Filigrees on Photo */}
              <div className="absolute top-2 left-2 text-amber-400 text-sm pointer-events-none">❖</div>
              <div className="absolute top-2 right-2 text-amber-400 text-sm pointer-events-none">❖</div>
              <div className="absolute bottom-2 left-2 text-amber-400 text-sm pointer-events-none">❖</div>
              <div className="absolute bottom-2 right-2 text-amber-400 text-sm pointer-events-none">❖</div>
            </div>

            {/* Bottom Personalized Greeting */}
            <div className="text-center relative z-20 space-y-1.5 pt-2">
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold gold-gradient-text drop-shadow-md">
                {name || 'The Blessed Family'}
              </h3>
              <p className="text-xs sm:text-sm text-purple-100/90 font-light italic leading-snug px-3">
                "{greeting}"
              </p>
              <div className="text-[10px] text-amber-300/70 font-mono tracking-wider pt-1">
                🪔 WITH LOVE & PROSPEROUS WISHES 🪔
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
