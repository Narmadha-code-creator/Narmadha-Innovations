import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Copy, Check, Share2, Volume2, Wand2, Key, RefreshCw, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

type Relationship =
  | 'Family'
  | 'Mother'
  | 'Father'
  | 'Brother'
  | 'Sister'
  | 'Best Friend'
  | 'Friend'
  | 'Teacher'
  | 'Colleague'
  | 'Special Person'
  | 'Everyone';

type MessageStyle =
  | 'Heart-touching'
  | 'Emotional'
  | 'Funny'
  | 'Cute'
  | 'Romantic'
  | 'Traditional'
  | 'Inspirational'
  | 'Professional';

type Language = 'English' | 'Tamil' | 'Hindi';

const RELATIONSHIPS: Relationship[] = [
  'Family',
  'Mother',
  'Father',
  'Brother',
  'Sister',
  'Best Friend',
  'Friend',
  'Teacher',
  'Colleague',
  'Special Person',
  'Everyone',
];

const STYLES: MessageStyle[] = [
  'Heart-touching',
  'Emotional',
  'Funny',
  'Cute',
  'Romantic',
  'Traditional',
  'Inspirational',
  'Professional',
];

const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'English', label: 'English', native: 'English' },
  { code: 'Tamil', label: 'Tamil', native: 'தமிழ்' },
  { code: 'Hindi', label: 'Hindi', native: 'हिन्दी' },
];

export const AIWishGenerator: React.FC = () => {
  const [recipient, setRecipient] = useState<string>('');
  const [relationship, setRelationship] = useState<Relationship>('Family');
  const [style, setStyle] = useState<MessageStyle>('Heart-touching');
  const [language, setLanguage] = useState<Language>('English');
  const [personalNote, setPersonalNote] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedWish, setGeneratedWish] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Deep Cultural AI Generator Engine
  const generateWish = async () => {
    setIsGenerating(true);
    soundEngine.playDiyaIgnite();

    const name = recipient.trim() || (language === 'Tamil' ? 'அன்பிற்குரியவரே' : language === 'Hindi' ? 'प्रियजन' : 'Dear One');

    // Simulate smart AI thinking with brief delay
    await new Promise((resolve) => setTimeout(resolve, 1100));

    let result = '';

    // If custom API key provided, attempt Gemini API fetch
    if (apiKey.trim()) {
      try {
        const prompt = `Write a Diwali greeting for ${name} who is my ${relationship}. The tone should be ${style}, in the ${language} language. Personal note: "${personalNote}". Keep it poetic, culturally rich, and between 3 to 5 sentences. Include warm emoji like 🪔✨🎆.`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          result = text.trim();
        }
      } catch (e) {
        console.warn('API fetch failed, falling back to built-in generator', e);
      }
    }

    // Built-in intelligent generator if API not used or failed
    if (!result) {
      if (language === 'Tamil') {
        if (style === 'Emotional' || style === 'Heart-touching') {
          result = `அன்பார்ந்த ${name}, இந்த தீப ஒளித் திருநாளில் உங்கள் இல்லத்திலும் உள்ளத்திலும் அளவற்ற மகிழ்ச்சியும் நிம்மதியும் பெருகட்டும். ஏற்றப்படும் ஒவ்வொரு அகல் விளக்கும் உங்கள் வாழ்வில் புதிய நம்பிக்கையையும், ஆரோக்கியத்தையும், ஒளிமயமான எதிர்காலத்தையும் கொண்டு சேர்க்கட்டும்! இனிய தீபாவளி நல்வாழ்த்துகள்! 🪔✨`;
        } else if (style === 'Funny') {
          result = `ஹேய் ${name}! இந்த தீபாவளிக்கு வெடி சத்தத்தை விட உங்க சிரிப்பு சத்தம் அதிகமா கேட்கட்டும்! லட்டு, ஜிலேபி எல்லாம் சாப்பிட்டு வெயிட் கூடினாலும் பரவால்ல, மனசுல மகிழ்ச்சி குறையாம இருக்கட்டும்! ஹேப்பி தீபாவளி! 🎆🍬`;
        } else if (style === 'Traditional') {
          result = `மங்கலங்கள் நிறையும் இந்நாளில் அன்னை மகாலட்சுமியின் பேரருளால் ${name} உங்கள் குடும்பத்தார் அனைவரும் சகல சௌபாக்கியங்களும் பெற்று இன்புற்று வாழ எல்லாம் வல்ல இறைவனை வேண்டுகிறேன். மகிழ்ச்சிகரமான தீபாவளி திருநாள் நல்வாழ்த்துகள்! 🪔🙏`;
        } else if (style === 'Romantic') {
          result = `என் இதயத்திற்கு இனியவரே ${name}, இந்த தீபத் திருநாளில் ஒளிரும் ஆயிரக்கணக்கான விளக்குகளை விட உங்கள் அன்புதான் என் உலகத்தை அதிகம் ஒளிரச் செய்கிறது. நம் காதல் என்றும் இத்தீபமாய் சுடர்விடட்டும்! இனிய தீபாவளி வாழ்த்துகள் கண்ணே! ❤️🪔`;
        } else {
          result = `அன்பான ${name}, இருள் நீங்கி ஒளி பிறக்கும் இந்த இனிய தீபாவளித் திருநாளில் உங்கள் வாழ்வு வெற்றிகளாலும் ஆனந்தத்தாலும் பிரகாசிக்கட்டும். இனிய தீபாவளி நல்வாழ்த்துகள்! 🪔✨`;
        }
      } else if (language === 'Hindi') {
        if (style === 'Emotional' || style === 'Heart-touching') {
          result = `प्रिय ${name}, इस पावन दीपावली पर माँ लक्ष्मी और विघ्नहर्ता गणेश आपके जीवन को सुख, शांति और समृद्धि से भर दें। दीपों की यह पावन रोशनी आपके हर दुःख को हर ले और आपके सपनों को नई उड़ान दे। शुभ दीपावली! 🪔✨`;
        } else if (style === 'Funny') {
          result = `अरे ${name}! इस दिवाली मिठाई का डिब्बा सिर्फ फॉरवर्ड मत करना, कभी खुद भी खिलाना! खूब पटाखे फोड़ो, मीठा खाओ और खुशियों से जगमगाओ। हैप्पी दिवाली मेरे दोस्त! 🎆🍬`;
        } else if (style === 'Traditional') {
          result = `दीपज्योतिः परं ब्रह्म दीपज्योतिर्जनार्दनः। ${name} जी, प्रकाश और उल्लास के इस महापर्व पर आपके घर में सुख, शांति, और आरोग्य का वास हो। आपको और आपके समस्त परिवार को दीपावली की हार्दिक शुभकामनाएँ! 🪔🙏`;
        } else if (style === 'Romantic') {
          result = `मेरी जान ${name}, इस दिवाली पर आसमान के सारे पटाखे और दीयों की रोशनी भी आपके चेहरे की मुस्कान के आगे फीकी है। भगवान करे हमारा यह साथ जन्मों-जन्मों तक यूँ ही महकता रहे। हैप्पी दिवाली मेरी मोहब्बत! ❤️🪔`;
        } else {
          result = `स्नेही ${name}, दीपों का यह पावन उत्सव आपके जीवन में सफलता, नई उमंग और अनंत खुशियों का प्रकाश लेकर आए। आपको एवं आपके पूरे परिवार को दीपावली की अनंत शुभकामनाएँ! 🪔✨`;
        }
      } else {
        // English
        if (style === 'Heart-touching' || style === 'Emotional') {
          result = `Dearest ${name}, as the golden glow of diyas illuminates the night sky, I pray that peace, divine health, and unconditional love embrace your home. May every light lit tonight bring an abundance of joy and dispel every whisper of sorrow. Wishing you a blessed, magical Diwali! 🪔✨`;
        } else if (style === 'Funny') {
          result = `Happy Diwali ${name}! May your troubles explode like 1000-wala crackers, your happiness multiply like the calories in kaju katli, and may no one re-gift you that soan papdi box this year! Have a blast! 🎆🍬`;
        } else if (style === 'Romantic') {
          result = `To my beloved ${name}, amid all the glittering fireworks in the sky, nothing shines brighter than your smile in my heart. Lighting every diya with a silent prayer for our eternal love and togetherness. Happy Diwali, my sweetheart! ❤️🪔`;
        } else if (style === 'Traditional') {
          result = `On the auspicious occasion of Deepavali, may Goddess Lakshmi bestow eternal wealth, wisdom, and health upon you, ${name}, and your revered family. May the divine light guide your steps towards righteous prosperity. Shubh Deepavali! 🪔🙏`;
        } else if (style === 'Professional') {
          result = `Warm Diwali greetings to ${name}. May this festival of lights usher in a prosperous new chapter of growth, collaboration, and inspiring milestones for you and your esteemed organization. Wishing you abundant success ahead! 🌟🤝`;
        } else {
          result = `Happy Diwali, dear ${name}! May the radiant flames of countless diyas guide your path to unending triumph, radiant optimism, and harmonious moments with everyone you hold dear. Have a sparkling festival! 🪔✨`;
        }
      }

      if (personalNote.trim()) {
        result += ` "${personalNote.trim()}"`;
      }
    }

    setGeneratedWish(result);
    setIsGenerating(false);
    soundEngine.playMagicChime();
  };

  const copyToClipboard = () => {
    if (!generatedWish) return;
    navigator.clipboard.writeText(generatedWish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!generatedWish) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generatedWish)}`;
    window.open(url, '_blank');
  };

  const speakWish = () => {
    if (!generatedWish || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(generatedWish);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    if (language === 'Tamil') utterance.lang = 'ta-IN';
    else if (language === 'Hindi') utterance.lang = 'hi-IN';
    else utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="ai-wishes" className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Title Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <Wand2 className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>Intelligent Festival AI</span>
        </div>

        <h2 className="text-3xl md:text-6xl font-cinzel font-black tracking-wide gold-gradient-text">
          AI DIWALI WISH GENERATOR
        </h2>
        <p className="text-sm md:text-lg text-purple-200/90 max-w-2xl mx-auto font-light">
          Craft emotionally resonant, culturally authentic Diwali greetings tailored for any loved one.
          Choose from English, Tamil, and Hindi across multiple expressive tones.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setShowKeyModal(true)}
            className="inline-flex items-center gap-1.5 text-xs text-amber-300/80 hover:text-amber-200 underline decoration-dotted"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? 'Custom Gemini API Key active' : 'Configure Custom Gemini API Key (Optional)'}</span>
          </button>
        </div>
      </div>

      {/* Main Generator Form Card */}
      <div className="p-6 md:p-10 rounded-3xl glass-panel-glow max-w-3xl mx-auto relative overflow-hidden">
        {/* Background glow orbs */}
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          {/* Recipient Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Amma, Rohan, Priya, Anand Sir..."
              className="w-full px-4 py-3 rounded-xl bg-purple-950/70 border border-amber-400/30 text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm md:text-base"
            />
          </div>

          {/* Relationship Selection Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Relationship
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {RELATIONSHIPS.map((rel) => (
                <button
                  key={rel}
                  type="button"
                  onClick={() => setRelationship(rel)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    relationship === rel
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-glow-saffron'
                      : 'bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40'
                  }`}
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>

          {/* Message Style Selection Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Message Style / Tone
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STYLES.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStyle(st)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                    style === st
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-glow-pink'
                      : 'bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Preferred Language
            </label>
            <div className="grid grid-cols-3 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold flex flex-col items-center gap-1 transition-all ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-bold shadow-glow-gold'
                      : 'bg-purple-950/50 hover:bg-purple-900/60 text-purple-200 border border-purple-800/40'
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className="text-[11px] opacity-80">{lang.native}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Note (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Personal Note / Special Memory (Optional)
            </label>
            <textarea
              rows={2}
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="e.g. Missing you this Diwali; looking forward to making gulab jamun together!"
              className="w-full px-4 py-3 rounded-xl bg-purple-950/70 border border-amber-400/30 text-white placeholder-purple-400/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateWish}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-600 hover:brightness-110 text-white font-bold text-base md:text-lg tracking-wider uppercase shadow-glow-saffron flex items-center justify-center gap-3 disabled:opacity-60 transition-all active:scale-[0.99]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Crafting Magical Greeting...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-200 animate-spin-slow" />
                <span>Generate Diwali Greeting ✨</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Animated Glowing Popup Modal */}
      <AnimatePresence>
        {generatedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="w-full max-w-xl rounded-3xl glass-panel-glow border-2 border-amber-400/60 p-6 md:p-8 relative shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setGeneratedWish(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl shadow-glow-gold">
                  🪔
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-cinzel font-bold text-amber-200">
                    Auspicious Diwali Wish for {recipient || 'Your Loved One'}
                  </h3>
                  <p className="text-xs text-purple-300">
                    {relationship} • {style} • {language}
                  </p>
                </div>
              </div>

              {/* The Wish Text Card */}
              <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-b from-[#1a0833] to-[#120526] border border-amber-400/40 relative">
                <p className="text-base md:text-lg text-amber-100 font-light leading-relaxed select-text">
                  "{generatedWish}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={copyToClipboard}
                  className="py-3 px-3 rounded-xl bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/60 text-xs md:text-sm font-semibold text-amber-300 flex items-center justify-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Wish'}</span>
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="py-3 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-xs md:text-sm font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow-emerald transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={speakWish}
                  className="py-3 px-3 rounded-xl bg-pink-600/80 hover:bg-pink-600 border border-pink-400/40 text-xs md:text-sm font-semibold text-white flex items-center justify-center gap-1.5 shadow-glow-pink transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Read Aloud</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional Gemini API Key Modal */}
      <AnimatePresence>
        {showKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <div className="w-full max-w-md rounded-2xl glass-panel p-6 border border-amber-400/40 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-cinzel text-lg font-bold text-amber-300">Gemini AI Key</h4>
                <button onClick={() => setShowKeyModal(false)} className="text-purple-300 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-purple-200">
                You can optionally enter a Google Gemini API key for live generative streaming. If left blank,
                our rich built-in intelligent cultural generator operates seamlessly offline!
              </p>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-xl bg-purple-950 border border-purple-700 text-white text-sm"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs uppercase"
                >
                  Save & Return
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
