/**
 * Lightweight, privacy-first analytics abstraction.
 * Disabled by default. Zero external tracking requests unless configured.
 */

export type AnalyticsEvent =
  | 'game_started'
  | 'game_completed'
  | 'answer_submitted'
  | 'daily_challenge_completed'
  | 'achievement_unlocked'
  | 'settings_changed'
  | 'result_shared';

export interface AnalyticsPayload {
  mode?: string;
  format?: string;
  difficulty?: string;
  score?: number;
  accuracy?: number;
  streak?: number;
  [key: string]: unknown;
}

type AnalyticsProvider = (event: AnalyticsEvent, payload?: AnalyticsPayload) => void;

class AnalyticsManager {
  private enabled: boolean = false;
  private provider: AnalyticsProvider | null = null;

  public init(provider?: AnalyticsProvider, enabled: boolean = false) {
    this.provider = provider || null;
    this.enabled = enabled;
  }

  public track(event: AnalyticsEvent, payload?: AnalyticsPayload) {
    if (!this.enabled || !this.provider) {
      return;
    }
    try {
      this.provider(event, payload);
    } catch {
      // Graceful error fallback
    }
  }
}

export const analytics = new AnalyticsManager();

export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload) {
  analytics.track(event, payload);
}
