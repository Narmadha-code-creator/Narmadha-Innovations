import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Bell, Flame } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(soundEngine.getMuted());
    setVolume(soundEngine.getVolume());
    setIsPlaying(soundEngine.getMusicStatus());
  }, []);

  const handleToggleMusic = () => {
    const nextState = soundEngine.toggleMusic();
    setIsPlaying(nextState);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  const ringTempleBell = () => {
    soundEngine.playTempleBell();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Temple Bell Shortcut Button */}
      <button
        onClick={ringTempleBell}
        className="p-3 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-amber-950 shadow-glow-gold transition-all hover:scale-110 active:scale-95"
        title="Ring Sacred Temple Bell (Ghanti)"
      >
        <Bell className="w-5 h-5" />
      </button>

      {/* Main Music & Volume Pill */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel-glow border border-amber-400/40 shadow-2xl backdrop-blur-xl">
        {/* Play / Pause Ambient Music */}
        <button
          onClick={handleToggleMusic}
          className={`p-2 rounded-full transition-all flex items-center justify-center ${
            isPlaying
              ? 'bg-amber-400 text-amber-950 shadow-glow-gold animate-pulse'
              : 'bg-purple-900/60 text-purple-300 hover:text-white'
          }`}
          title={isPlaying ? 'Pause Festive Music' : 'Play Festive Music'}
        >
          <Music className="w-4 h-4" />
        </button>

        {/* Ambient Waves graphic when playing */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 px-1">
            <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse" />
            <span className="w-1 h-5 bg-amber-300 rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-amber-400 rounded-full animate-pulse delay-150" />
            <span className="w-1 h-4 bg-amber-300 rounded-full animate-pulse delay-100" />
          </div>
        )}

        {/* Mute Toggle */}
        <button
          onClick={handleToggleMute}
          className="p-2 text-purple-200 hover:text-amber-300 transition-colors"
          title={isMuted ? 'Unmute All Sounds' : 'Mute All Sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume Slider trigger / slider */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <span className="text-[11px] font-mono text-amber-300/80 cursor-pointer select-none">
            {Math.round(volume * 100)}%
          </span>

          {showVolumeSlider && (
            <div className="absolute bottom-10 right-0 p-2 rounded-xl glass-panel shadow-2xl flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-amber-400 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
