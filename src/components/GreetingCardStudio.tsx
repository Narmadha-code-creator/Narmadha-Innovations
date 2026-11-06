import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Copy, Check, Sparkles, RefreshCw, Palette, Type, Heart } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { soundEngine } from '../utils/soundEngine';

interface CardTemplate {
  id: number;
  name: string;
  themeStyle: string;
  borderColor: string;
  bgGradient: string;
  accentBadge: string;
  titleFont: string;
  textColor: string;
}

const TEMPLATES: CardTemplate[] = [
  {
    id: 1,
    name: 'Royal Gold Palace',
    themeStyle: 'royal-gold',
    borderColor: 'border-amber-400',
    bgGradient: 'from-[#2b0800] via-[#4d1600] to-[#170300]',
    accentBadge: '👑 Imperial Blessing',
    titleFont: 'font-cinzel',
    textColor: 'text-amber-100',
  },
  {
    id: 2,
    name: 'Celestial Midnight Star',
    themeStyle: 'celestial-star',
    borderColor: 'border-sky-400',
    bgGradient: 'from-[#050c26] via-[#0e1f4f] to-[#030614]',
    accentBadge: '✨ Starlight Wonder',
    titleFont: 'font-cinzel',
    textColor: 'text-sky-100',
  },
  {
    id: 3,
    name: 'Vibrant Rangoli Mandala',
    themeStyle: 'rangoli-mandala',
    borderColor: 'border-pink-500',
    bgGradient: 'from-[#330026] via-[#540843] to-[#1c0015]',
    accentBadge: '🌸 Sacred Mandala',
    titleFont: 'font-rozha',
    textColor: 'text-pink-100',
  },
  {
    id: 4,
    name: 'Traditional Saffron Deepam',
    themeStyle: 'traditional-saffron',
    borderColor: 'border-orange-500',
    bgGradient: 'from-[#361300] via-[#662800] to-[#1f0a00]',
    accentBadge: '🪔 Holy Diya',
    titleFont: 'font-rozha',
    textColor: 'text-amber-100',
  },
  {
    id: 5,
    name: 'Majestic Peacock Radiance',
    themeStyle: 'peacock-radiance',
    borderColor: 'border-emerald-400',
    bgGradient: 'from-[#02241f] via-[#05453b] to-[#011411]',
    accentBadge: '🦚 Peacock Grace',
    titleFont: 'font-cinzel',
    textColor: 'text-emerald-100',
  },
  {
    id: 6,
    name: 'Emerald Lotus Garden',
    themeStyle: 'lotus-garden',
    borderColor: 'border-teal-400',
    bgGradient: 'from-[#03241b] via-[#074737] to-[#01140f]',
    accentBadge: '🌺 Lotus Bloom',
    titleFont: 'font-script',
    textColor: 'text-teal-100',
  },
  {
    id: 7,
    name: 'Electric Neon Festival',
    themeStyle: 'electric-neon',
    borderColor: 'border-fuchsia-500',
    bgGradient: 'from-[#210238] via-[#450770] to-[#120020]',
    accentBadge: '⚡ Neon Cyber Diwali',
    titleFont: 'font-sans',
    textColor: 'text-purple-100',
  },
  {
    id: 8,
    name: 'Divine Lakshmi Blessings',
    themeStyle: 'divine-lakshmi',
    borderColor: 'border-yellow-300',
    bgGradient: 'from-[#380e00] via-[#5c1d02] to-[#210700]',
    accentBadge: '🙏 Divine Grace',
    titleFont: 'font-rozha',
    textColor: 'text-yellow-100',
  },
  {
    id: 9,
    name: 'Romantic Starlight Diya',
    themeStyle: 'romantic-diya',
    borderColor: 'border-rose-400',
    bgGradient: 'from-[#300517] via-[#540c2b] to-[#1f020e]',
    accentBadge: '💖 Eternal Love',
    titleFont: 'font-script',
    textColor: 'text-rose-100',
  },
  {
    id: 10,
    name: 'Modern Minimalist Gold Foil',
    themeStyle: 'minimalist-gold',
    borderColor: 'border-amber-300',
    bgGradient: 'from-[#0d0d0d] via-[#1a1712] to-[#050505]',
    accentBadge: '✨ Pure Gold Elegance',
    titleFont: 'font-cinzel',
    textColor: 'text-amber-50',
  },
];

export const GreetingCardStudio: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('My Beloved Family');
  const [sender, setSender] = useState<string>('With Love, Narmadha');
  const [message, setMessage] = useState<string>(
    'May the divine brilliance of this holy Diwali illuminate your life with infinite health, prosperity, and boundless joy!'
  );
  const [customDiyaEmoji, setCustomDiyaEmoji] = useState<string>('🪔');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId) || TEMPLATES[0];

  // Download Card as PNG via html-to-image
  const downloadCardAsPng = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    soundEngine.playMagicChime();

    try {
      // Small delay to allow fonts and icons to settle
      await new Promise((r) => setTimeout(r, 200));
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        pixelRatio: 3, // High DPI crystal clear output
        quality: 1.0,
      });

      const link = document.createElement('a');
      link.download = `Diwali-Greeting-Card-${recipient.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
      soundEngine.playTempleBell();
    } catch (err) {
      console.error('Failed to export greeting card:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const copyGreetingText = () => {
    const fullText = `🪔 Happy Diwali, ${recipient}! 🪔\n\n"${message}"\n\n- ${sender}\n✨ Sent with Diwali Magic AI ✨`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const fullText = `🪔 *Happy Diwali, ${recipient}!* 🪔\n\n"${message}"\n\n_${sender}_\n✨ Created via Diwali Magic AI ✨`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;
    window.open(url, '_blank');
  };

  const resetCard = () => {
    setRecipient('My Beloved Family');
    setSender('With Love, Narmadha');
    setMessage(
      'May the divine brilliance of this holy Diwali illuminate your life with infinite health, prosperity, and boundless joy!'
    );
    setSelectedTemplateId(1);
    soundEngine.playDiyaIgnite();
  };

  return (
    <section id="cards" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Palette className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>10 Premium Designer Card Templates</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          MAGICAL INTERACTIVE GREETING CARDS
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Customize and download high-resolution festival greeting cards. Featuring embossed gold borders,
          mandala rangolis, glowing diyas, and authentic blessings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Template Picker & Inputs Column (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel space-y-5">
          <h3 className="font-cinzel text-lg font-bold text-amber-200 flex items-center justify-between">
            <span>Select Template ({selectedTemplateId}/10)</span>
            <button
              onClick={resetCard}
              className="text-xs text-purple-300 hover:text-amber-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </h3>

          {/* 10 Template Thumbnails Grid */}
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  setSelectedTemplateId(tpl.id);
                  soundEngine.playDiyaIgnite();
                }}
                className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedTemplateId === tpl.id
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-glow-gold'
                    : 'border-purple-800/50 bg-purple-950/40 text-purple-300 hover:bg-purple-900/40'
                }`}
              >
                <span className="truncate">{tpl.name}</span>
                {selectedTemplateId === tpl.id && <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
              </button>
            ))}
          </div>

          {/* Recipient Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Recipient's Name
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Grandma, My Soulmate..."
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Sender Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Sender's Name / Signature
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. Always Yours, Rahul..."
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Personalized Message */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Personalized Diwali Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Diya / Emblem Icon Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Center Emblem
            </label>
            <div className="flex gap-2">
              {['🪔', '✨', '🌸', '🦚', '👑', '🕉️'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setCustomDiyaEmoji(emoji)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                    customDiyaEmoji === emoji
                      ? 'bg-amber-400 text-amber-950 shadow-glow-gold'
                      : 'bg-purple-950 border border-purple-800 text-purple-200 hover:bg-purple-900'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Download & Share Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={downloadCardAsPng}
              disabled={isExporting}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm uppercase tracking-wider shadow-glow-saffron flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-60"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Crystal PNG...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Card as PNG</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={shareOnWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={copyGreetingText}
                className="py-2.5 px-3 rounded-xl bg-purple-900/70 hover:bg-purple-800 border border-purple-700/60 text-xs font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Card Preview Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="text-xs uppercase tracking-wider text-amber-300/80 mb-3 font-semibold">
            ✨ Interactive 3D Card Preview
          </div>

          {/* The Greeting Card DOM Node to be Captured */}
          <motion.div
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            ref={cardRef}
            className={`w-full max-w-lg aspect-[4/5] rounded-3xl p-8 relative overflow-hidden bg-gradient-to-br ${currentTemplate.bgGradient} border-4 ${currentTemplate.borderColor} shadow-2xl flex flex-col justify-between`}
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 215, 0, 0.25)',
            }}
          >
            {/* Ornate Gold Border Inner Inset */}
            <div className="absolute inset-3 border-2 border-amber-300/40 rounded-2xl pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-amber-400/30 rounded-xl pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-4 left-4 text-amber-400/60 text-lg pointer-events-none">❖</div>
            <div className="absolute top-4 right-4 text-amber-400/60 text-lg pointer-events-none">❖</div>
            <div className="absolute bottom-4 left-4 text-amber-400/60 text-lg pointer-events-none">❖</div>
            <div className="absolute bottom-4 right-4 text-amber-400/60 text-lg pointer-events-none">❖</div>

            {/* Top Card Badge & Greeting Header */}
            <div className="relative z-10 text-center space-y-2 pt-2">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[11px] font-bold uppercase tracking-widest text-amber-200">
                {currentTemplate.accentBadge}
              </div>

              <h4 className="text-xs uppercase tracking-widest text-amber-300/90 font-mono">
                शुभ दीपावली • HAPPY DIWALI
              </h4>

              <h2 className={`text-2xl sm:text-3xl ${currentTemplate.titleFont} font-bold gold-gradient-text tracking-wide drop-shadow-md`}>
                {recipient || 'Dearest One'}
              </h2>
            </div>

            {/* Center Emblem / 3D Diya Illustration */}
            <div className="relative z-10 flex flex-col items-center my-auto py-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400/30 via-orange-500/20 to-pink-500/10 border border-amber-300/50 flex items-center justify-center text-5xl shadow-glow-flame">
                <span className="animate-flame-flicker block">{customDiyaEmoji}</span>
              </div>
              <div className="w-32 h-4 rounded-full bg-amber-500/20 blur-sm mt-1" />
            </div>

            {/* Personalized Heartfelt Message */}
            <div className="relative z-10 text-center px-4 space-y-4 pb-2">
              <p className={`text-sm sm:text-base leading-relaxed ${currentTemplate.textColor} font-light italic drop-shadow-sm`}>
                "{message || 'Wishing you radiant joy, prosperity, and light!'}"
              </p>

              {/* Sender Signature */}
              <div className="pt-2 border-t border-amber-300/30 flex flex-col items-center">
                <span className="text-xs tracking-wider uppercase text-amber-300/80 font-mono">
                  From
                </span>
                <span className="text-lg font-script text-amber-200 font-bold">
                  {sender || 'Your Well-Wisher'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
