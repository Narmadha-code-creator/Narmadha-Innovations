import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Volume2, Info, Compass, Heart } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface ParadeItem {
  id: string;
  name: string;
  nativeTitle: string;
  icon: string;
  description: string;
  symbolism: string;
  accentColor: string;
  soundType: 'bell' | 'chime' | 'burst' | 'diya';
}

const PARADE_ITEMS: ParadeItem[] = [
  {
    id: 'elephant',
    name: 'Royal Decorated Elephant',
    nativeTitle: 'गजाधिराज • Gajaraj',
    icon: '🐘',
    description: 'Adorned in royal crimson jhool, golden forehead ornaments, and melodious brass ankle bells.',
    symbolism: 'Signifies supreme royal dignity, wisdom, strength, and the vehicle of Goddess Lakshmi (Gaja Lakshmi).',
    accentColor: '#F59E0B',
    soundType: 'bell',
  },
  {
    id: 'peacock',
    name: 'Dancing Mayura (Peacock)',
    nativeTitle: 'मयूर नृत्य • Peacock Grace',
    icon: '🦚',
    description: 'Spreading iridescent emerald and sapphire tail feathers in celebratory festive ecstasy.',
    symbolism: 'Represents beauty, spiritual awakening, victory over darkness, and cosmic protection.',
    accentColor: '#10B981',
    soundType: 'chime',
  },
  {
    id: 'diya',
    name: 'Sacred Akhand Diya',
    nativeTitle: 'अखण्ड दीप • Divine Lamp',
    icon: '🪔',
    description: 'Clay lamp filled with pure ghee and cotton wick radiating warm, golden eternal luminescence.',
    symbolism: 'Dispels ignorance, burns away negative ego, and guides the soul towards truth and righteousness.',
    accentColor: '#FF6B00',
    soundType: 'diya',
  },
  {
    id: 'rangoli',
    name: 'Mandala Rangoli of Welcoming',
    nativeTitle: 'रंगोली • Kolam',
    icon: '🌸',
    description: 'Geometric cosmic patterns crafted with vibrantly colored rice powders, flower petals, and lamps.',
    symbolism: 'Invites Goddess Lakshmi into the sanctum of the home, promoting harmony and generosity.',
    accentColor: '#EC4899',
    soundType: 'chime',
  },
  {
    id: 'kandil',
    name: 'Celestial Akash Kandil',
    nativeTitle: 'आकाश कंदील • Sky Lantern',
    icon: '🏮',
    description: 'Multi-pointed kaleidoscopic paper lantern hung high to guide ancestral souls with love.',
    symbolism: 'A beacon of hope illuminating the heavens, uniting generations in warmth and light.',
    accentColor: '#06B6D4',
    soundType: 'burst',
  },
  {
    id: 'sweets',
    name: 'Auspicious Mithai & Sweets',
    nativeTitle: 'मिठाई • Sacred Prasad',
    icon: '🍬',
    description: 'Golden besan laddus, silver-leafed kaju katli, and warm saffron jalebis shared among neighbors.',
    symbolism: 'Symbolizes sweetness in speech, kindness in relationships, and joyous community sharing.',
    accentColor: '#FFD700',
    soundType: 'chime',
  },
];

export const FestivalParade: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ParadeItem>(PARADE_ITEMS[0]);

  const handleSelect = (item: ParadeItem) => {
    setActiveItem(item);
    if (item.soundType === 'bell') soundEngine.playTempleBell();
    else if (item.soundType === 'burst') soundEngine.playFireworkBurst(0.8);
    else if (item.soundType === 'diya') soundEngine.playDiyaIgnite();
    else soundEngine.playMagicChime();
  };

  return (
    <section id="parade" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-orange-400 animate-spin-slow" />
          <span>Cultural Heritage & Procession</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          ANIMATED DIWALI FESTIVAL PARADE
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Experience the vibrant symbols that bring Diwali to life. Tap any float in the festive parade
          to hear traditional sounds and discover its sacred spiritual significance.
        </p>
      </div>

      {/* Interactive Carousel of Floats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {PARADE_ITEMS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect(item)}
            className={`p-4 rounded-2xl cursor-pointer border transition-all text-center flex flex-col items-center justify-between min-h-[170px] ${
              activeItem.id === item.id
                ? 'bg-gradient-to-b from-purple-900/80 to-indigo-950/90 border-amber-400 shadow-glow-gold'
                : 'glass-panel hover:border-amber-400/40 text-purple-200'
            }`}
          >
            <div className="text-4xl sm:text-5xl my-auto animate-float-slow">{item.icon}</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 truncate w-full">
                {item.name}
              </div>
              <div className="text-[10px] text-purple-400">{item.nativeTitle.split('•')[0]}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Float Spotlight Stage */}
      <motion.div
        key={activeItem.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 md:p-12 rounded-3xl glass-panel-glow border-2 border-amber-400/50 relative overflow-hidden"
      >
        {/* Ambient background aura */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: activeItem.accentColor }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Avatar Animation (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-purple-950 via-indigo-900 to-purple-900 border-4 border-amber-400/60 shadow-2xl flex items-center justify-center text-7xl md:text-8xl shadow-glow-gold">
              <span className="animate-flame-flicker">{activeItem.icon}</span>
            </div>
            <button
              onClick={() => handleSelect(activeItem)}
              className="mt-4 px-4 py-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Replay Audio Chime</span>
            </button>
          </div>

          {/* Right Cultural Description (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest">
              {activeItem.nativeTitle}
            </div>

            <h3 className="text-2xl md:text-4xl font-cinzel font-bold text-amber-200">
              {activeItem.name}
            </h3>

            <p className="text-base md:text-lg text-purple-100/90 font-light leading-relaxed">
              {activeItem.description}
            </p>

            <div className="p-4 rounded-xl bg-purple-950/60 border border-amber-400/20 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Sacred Cultural Symbolism
              </span>
              <p className="text-sm text-purple-200/90 font-light">
                {activeItem.symbolism}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
