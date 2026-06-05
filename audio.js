/**
 * audio.js - Synthesized game-like positive sound effects using Web Audio API
 */

export class TickOffAudio {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
  }

  init() {
    // Lazy initialize to bypass browser autoplay policies
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setMuted(muted) {
    this.isMuted = !!muted;
  }

  playChime() {
    if (this.isMuted) return;
    this.init();

    const now = this.audioCtx.currentTime;
    
    // Create oscillator, gain node, and filter node for warm tone
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc1.type = 'triangle'; // Warm, soft wave
    osc2.type = 'sine';     // Clean, fundamental wave
    
    filter.type = 'lowpass';
    filter.frequency.value = 1200; // Filter out high harshness

    // Warm pentatonic rising chord (C5 -> E5 -> G5)
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.08); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.16); // G5

    osc2.frequency.setValueAtTime(523.25, now);
    osc2.frequency.setValueAtTime(659.25, now + 0.08);
    osc2.frequency.setValueAtTime(783.99, now + 0.16);

    // Dynamic Volume Envelope (Attack, Decay, Sustain, Release)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.04); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6); // Smooth decay

    // Connections
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    // Play and Stop
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  playPerfectDay() {
    if (this.isMuted) return;
    this.init();

    const now = this.audioCtx.currentTime;
    
    // Notes: C5 -> E5 -> G5 -> C6 -> E6 -> G6 -> C7 arpeggio (Joyous, sparkly cascade)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    const duration = 0.07; // speed of notes

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      
      filter.type = 'lowpass';
      filter.frequency.value = 2000;

      const noteTime = now + (idx * duration);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.2, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.6);
    });
  }

  playLevelUp() {
    if (this.isMuted) return;
    this.init();

    const now = this.audioCtx.currentTime;
    
    // Level Up: Powerful rising major chord arpeggio with high reverb-like release
    const baseFreqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    
    baseFreqs.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const subOsc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      subOsc.type = 'sine';
      
      osc.frequency.setValueAtTime(freq, now + idx * 0.15);
      osc.frequency.linearRampToValueAtTime(freq * 2, now + idx * 0.15 + 0.3); // upward sweep
      
      subOsc.frequency.setValueAtTime(freq, now + idx * 0.15);

      const noteTime = now + (idx * 0.15);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.8);

      osc.connect(gain);
      subOsc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(noteTime);
      subOsc.start(noteTime);
      
      osc.stop(noteTime + 0.85);
      subOsc.stop(noteTime + 0.85);
    });
  }

  playAchievement() {
    if (this.isMuted) return;
    this.init();

    const now = this.audioCtx.currentTime;
    
    // Sparkly chime cascading downwards and upwards (magical feeling)
    const notes = [880.00, 987.77, 1046.50, 1318.51, 1567.98, 1318.51, 2093.00];
    
    notes.forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const noteTime = now + (idx * 0.05);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.15, noteTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }
}
