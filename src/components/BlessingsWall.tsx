import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, Flame, MessageCircle, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

interface Blessing {
  id: string;
  author: string;
  city: string;
  message: string;
  diyasCount: number;
  timestamp: string;
}

const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: '1',
    author: 'Aarav & Meera',
    city: 'Chennai',
    message: 'May this Diwali bring boundless peace and new opportunities to every family across India and the world! 🪔✨',
    diyasCount: 42,
    timestamp: 'Just now',
  },
  {
    id: '2',
    author: 'Ananya Sharma',
    city: 'Bengaluru',
    message: 'Lighting an extra diya for the brave hearts keeping our borders and streets safe tonight. Shubh Deepavali! 🇮🇳🙏',
    diyasCount: 68,
    timestamp: '5m ago',
  },
  {
    id: '3',
    author: 'Dr. Rajesh Patel',
    city: 'Ahmedabad',
    message: 'May Goddess Lakshmi bestow radiant health and prosperity on all our elders and children. Happy Diwali! 🌸',
    diyasCount: 35,
    timestamp: '12m ago',
  },
  {
    id: '4',
    author: 'Kavitha & Anand',
    city: 'Madurai',
    message: 'இந்த தீப ஒளி திருநாளில் அனைவருக்கும் சகல சௌபாக்கியங்களும் பெருகட்டும்! இனிய தீபாவளி நல்வாழ்த்துகள்! 🪔',
    diyasCount: 51,
    timestamp: '25m ago',
  },
];

export const BlessingsWall: React.FC = () => {
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [author, setAuthor] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handlePostBlessing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    soundEngine.playDiyaIgnite();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FFD700', '#FF6B00', '#EC4899'],
    });

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      author: author.trim() || 'Anonymous Devotee',
      city: city.trim() || 'World',
      message: message.trim(),
      diyasCount: 1,
      timestamp: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setMessage('');
    setAuthor('');
    setCity('');
  };

  const handleLightDiya = (id: string) => {
    soundEngine.playMagicChime();
    setBlessings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, diyasCount: b.diyasCount + 1 } : b))
    );
  };

  return (
    <section id="blessings" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Global Festive Wall of Lights</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          SHARE THE CELEBRATION & BLESSINGS
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Post your heartfelt wishes to the global Diwali community wall and light diyas for others' prayers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Post Form Column (4 cols) */}
        <form
          onSubmit={handlePostBlessing}
          className="lg:col-span-4 p-6 rounded-3xl glass-panel-glow border border-amber-400/40 space-y-4 sticky top-24"
        >
          <h3 className="font-cinzel text-lg font-bold text-amber-200 flex items-center gap-2">
            <span>Light a Diya on the Wall</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Priya & Rahul"
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              City / Country
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Coimbatore, London, Singapore"
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              Your Prayer or Festive Blessing
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share joy, light, and love with the world..."
              className="w-full px-3.5 py-2 rounded-xl bg-purple-950/80 border border-purple-700 text-white text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-sm tracking-wider uppercase shadow-glow-saffron flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            <span>Post Blessing to Wall</span>
          </button>
        </form>

        {/* Blessings Grid (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {blessings.map((b) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                layout
                className="p-5 rounded-2xl glass-panel border border-amber-400/30 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-amber-400/60 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <div className="font-semibold text-amber-200">
                    {b.author}{' '}
                    <span className="text-[11px] text-purple-400 font-normal">
                      from {b.city}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-75">{b.timestamp}</span>
                </div>

                <p className="text-sm text-purple-100 font-light leading-relaxed">
                  "{b.message}"
                </p>

                <div className="pt-2 border-t border-purple-800/40 flex items-center justify-between">
                  <button
                    onClick={() => handleLightDiya(b.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                  >
                    <span>🪔</span>
                    <span>Light Diya</span>
                    <span className="font-mono text-amber-200 ml-0.5">({b.diyasCount})</span>
                  </button>

                  <span className="text-[11px] text-purple-400/80 font-mono">
                    #DiwaliMagicAI
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
