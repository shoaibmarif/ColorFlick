// Web Audio API lightweight sound synthesizer
// Zero external assets, zero download latency, respects user settings

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  public playTone(freq: number, type: OscillatorType, duration: number, delay: number = 0) {
    if (!this.enabled || this.volume <= 0) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      const targetVol = this.volume * 0.15;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(targetVol, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // AudioContext error fail gracefully
    }
  }

  public playClick() {
    this.playTone(800, 'sine', 0.05);
  }

  public playCorrect() {
    // Pleasant 2-note ascending chime (E5 -> G5)
    this.playTone(659.25, 'triangle', 0.12, 0);
    this.playTone(783.99, 'triangle', 0.22, 0.08);
  }

  public playIncorrect() {
    // Soft low buzz
    this.playTone(220, 'sawtooth', 0.18, 0);
    this.playTone(196, 'sawtooth', 0.24, 0.05);
  }

  public playStreak() {
    // 3-note bright arpeggio (C5 -> E5 -> G5)
    this.playTone(523.25, 'sine', 0.1, 0);
    this.playTone(659.25, 'sine', 0.1, 0.07);
    this.playTone(783.99, 'sine', 0.2, 0.14);
  }

  public playAchievement() {
    // Fanfare shimmer (C5 -> G5 -> C6)
    this.playTone(523.25, 'triangle', 0.15, 0);
    this.playTone(783.99, 'triangle', 0.18, 0.1);
    this.playTone(1046.5, 'sine', 0.35, 0.2);
  }

  public playGameComplete() {
    // Celebration progression
    this.playTone(523.25, 'triangle', 0.12, 0);
    this.playTone(659.25, 'triangle', 0.12, 0.1);
    this.playTone(783.99, 'triangle', 0.15, 0.2);
    this.playTone(1046.5, 'sine', 0.4, 0.3);
  }
}

export const soundManager = new SoundManager();
