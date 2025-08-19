import { analytics } from "@/services/analytics";
import { useCookiesStore } from "@/stores/cookies.store";

/**
 * Composable for GDPR-compliant analytics tracking
 * Only tracks events when user has given analytics consent
 */
export function useAnalytics() {
  const cookiesStore = useCookiesStore();

  /**
   * Track game events with consent check
   */
  const trackGameEvent = (
    event:
      | "game_start"
      | "game_complete"
      | "game_quit"
      | "hint_used"
      | "give_up",
    metadata?: Record<string, any>
  ) => {
    if (cookiesStore.preferences.analytics && analytics.initialized) {
      analytics.trackGameEvent(event, metadata);
    }
  };

  /**
   * Track custom events with consent check
   */
  const trackEvent = (
    eventName: string,
    action: string,
    category: string,
    value?: number
  ) => {
    if (cookiesStore.preferences.analytics && analytics.initialized) {
      analytics.trackEvent(eventName, action, category, value);
    }
  };

  /**
   * Track page views with consent check
   */
  const trackPageView = (pagePath: string, pageTitle?: string) => {
    if (cookiesStore.preferences.analytics && analytics.initialized) {
      analytics.trackPageView(pagePath, pageTitle);
    }
  };

  /**
   * Check if analytics is enabled and user has consented
   */
  const isAnalyticsEnabled = () => {
    return cookiesStore.preferences.analytics && analytics.initialized;
  };

  return {
    trackGameEvent,
    trackEvent,
    trackPageView,
    isAnalyticsEnabled,
  };
}
