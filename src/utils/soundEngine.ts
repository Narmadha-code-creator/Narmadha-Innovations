// Synthesized Web Audio API sound engine for Diwali Magic AI
// Completely autonomous with zero network/CORS dependencies

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private currentVolume: number = 0.65;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.currentVolume, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  // Play auspicious Temple Bell / Ghanti
  public playTempleBell() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const baseFreqs = [1200, 2400, 3600, 4800];
    const decays = [2.2, 1.6, 1.2, 0.8];
    const gains = [0.4, 0.25, 0.15, 0.08];

    baseFreqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      // Bell strike quick attack, exponential ring
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(gains[i], t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + decays[i]);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + decays[i]);
    });
  }

  // Play realistic Firework burst: Rocket lift whistle -> boom -> crackle
  public playFireworkBurst(intensity: number = 1.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;

    // 1. Low Thud / Deep Boom
    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boomOsc.type = 'triangle';
    boomOsc.frequency.setValueAtTime(140, t);
    boomOsc.frequency.exponentialRampToValueAtTime(32, t + 0.45);

    boomGain.gain.setValueAtTime(0.6 * intensity, t);
    boomGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    boomOsc.connect(boomGain);
    boomGain.connect(this.masterGain);

    boomOsc.start(t);
    boomOsc.stop(t + 0.6);

    // 2. White noise blast with lowpass filter sweep
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.6);
    filter.Q.setValueAtTime(3, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4 * intensity, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.65);

    // 3. Crackling sparkle tails
    const crackleCount = Math.floor(6 + Math.random() * 8);
    for (let i = 0; i < crackleCount; i++) {
      const delay = 0.15 + Math.random() * 0.5;
      const popOsc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(1800 + Math.random() * 2200, t + delay);

      popGain.gain.setValueAtTime(0.08 * intensity, t + delay);
      popGain.gain.exponentialRampToValueAtTime(0.0001, t + delay + 0.05);

      popOsc.connect(popGain);
      popGain.connect(this.masterGain);

      popOsc.start(t + delay);
      popOsc.stop(t + delay + 0.06);
    }
  }

  // Diya Ignition Magic Swell
  public playDiyaIgnite() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880]; // Auspicious A major chord

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      gain.gain.setValueAtTime(0, t + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, t + idx * 0.08 + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 1.3);
    });
  }

  // Magic Gift Box Open / Sparkle
  public playMagicChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C Major arpeggio sparkle

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.07);

      gain.gain.setValueAtTime(0, t + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.2, t + idx * 0.07 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.07 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t + idx * 0.07);
      osc.stop(t + idx * 0.07 + 0.85);
    });
  }

  // Ambient Indian Festive Melody (Tanpura drone + Raag Bhupali pentatonic chimes)
  public toggleMusic(start?: boolean): boolean {
    this.initContext();
    const shouldPlay = start !== undefined ? start : !this.isMusicPlaying;

    if (!shouldPlay) {
      if (this.musicTimer) {
        clearInterval(this.musicTimer);
        this.musicTimer = null;
      }
      this.isMusicPlaying = false;
      return false;
    }

    if (this.isMusicPlaying) return true;
    this.isMusicPlaying = true;

    // Raag Bhupali scale notes (Sa, Re, Ga, Pa, Dha, Sa')
    // C4, D4, E4, G4, A4, C5, D5, E5
    const raagNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let step = 0;

    const playAmbientNote = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Drone base note
      if (step % 4 === 0) {
        const drone = this.ctx.createOscillator();
        const droneGain = this.ctx.createGain();
        drone.type = 'triangle';
        drone.frequency.setValueAtTime(130.81, t); // C3 fundamental drone
        droneGain.gain.setValueAtTime(0, t);
        droneGain.gain.linearRampToValueAtTime(0.12, t + 0.5);
        droneGain.gain.exponentialRampToValueAtTime(0.001, t + 3.8);

        drone.connect(droneGain);
        droneGain.connect(this.masterGain);
        drone.start(t);
        drone.stop(t + 4.0);
      }

      // Melodic chime
      const noteFreq = raagNotes[Math.floor(Math.random() * raagNotes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 2.0);

      step++;
    };

    // Play immediate first note
    playAmbientNote();
    this.musicTimer = window.setInterval(playAmbientNote, 950);
    return true;
  }

  public getMusicStatus(): boolean {
    return this.isMusicPlaying;
  }
}

export const soundEngine = new SoundEngine();
