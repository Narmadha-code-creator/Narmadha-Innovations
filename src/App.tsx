import React, { useState } from 'react';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FireworksPlayground } from './components/FireworksPlayground';
import { AIWishGenerator } from './components/AIWishGenerator';
import { GreetingCardStudio } from './components/GreetingCardStudio';
import { VideoStudio } from './components/VideoStudio';
import { PhotoGreetingCreator } from './components/PhotoGreetingCreator';
import { SurpriseGiftSection } from './components/SurpriseGiftSection';
import { FestivalParade } from './components/FestivalParade';
import { BlessingsWall } from './components/BlessingsWall';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';

export function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#070314] text-[#fbf7ee] selection:bg-amber-500 selection:text-purple-950 font-sans relative">
      {/* Cinematic Fullscreen Introduction */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      {/* Main Website Experience */}
      <div className={showIntro ? 'hidden' : 'block'}>
        {/* Navigation Bar */}
        <Navbar onReplayIntro={() => setShowIntro(true)} />

        {/* 1. 3D Magical Home Hero */}
        <HeroSection />

        {/* 2. Interactive Fireworks Playground */}
        <FireworksPlayground />

        {/* 3. AI Diwali Wish Generator */}
        <AIWishGenerator />

        {/* 4. Magical Greeting Cards Studio (10 Templates) */}
        <GreetingCardStudio />

        {/* 5. Animated Diwali Video Studio (WebM Export) */}
        <VideoStudio />

        {/* 6. AI Diwali Photo Greeting Creator */}
        <PhotoGreetingCreator />

        {/* 7. Interactive 3D Gift Box & Popups */}
        <SurpriseGiftSection />

        {/* 8. Animated Diwali Festival Parade */}
        <FestivalParade />

        {/* 9. Share the Celebration & Blessings Wall */}
        <BlessingsWall />

        {/* 10. Grand Footer */}
        <Footer />

        {/* Ambient Festive Audio Player & Temple Bell */}
        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;
