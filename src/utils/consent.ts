export type ConsentChoice = "granted" | "denied";

const KEY = "colorflick.consent";
export const CONSENT_EVENT = "colorflick:open-consent";

type Gtag = (...args: unknown[]) => void;
const gtag = (): Gtag | undefined =>
  typeof window !== "undefined"
    ? (window as unknown as { gtag?: Gtag }).gtag
    : undefined;

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // storage unavailable: the choice applies to this visit only
  }
  gtag()?.("consent", "update", { analytics_storage: choice });
}

/** Re-open the consent banner (used by the "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/**
 * Pushes a custom event to the Google Tag Manager data layer, e.g.
 * { event: 'game_completed', mode: 'hex-guess', score: 1200 }.
 * In GTM, use a "Custom Event" trigger with the event name to forward it to
 * Google Analytics or any other tag. Consent Mode still applies.
 */
export function sendToAnalytics(
  event: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
