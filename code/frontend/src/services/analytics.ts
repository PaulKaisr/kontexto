/**
 * Analytics service for GDPR-compliant Google Analytics
 * Only initializes GA when user has given consent
 */

export class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;
  private readonly GA_ID = "G-LHFSL7CVEB";

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Initialize Google Analytics with user consent
   */
  initializeWithConsent(hasAnalyticsConsent: boolean): void {
    if (typeof window === "undefined" || !window.gtag) {
      console.warn("Google Analytics not available");
      return;
    }

    if (hasAnalyticsConsent && !this.isInitialized) {
      // User has given consent, configure GA
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });

      window.gtag("config", this.GA_ID, {
        anonymize_ip: true,
        cookie_flags: "secure;samesite=lax",
        custom_map: { custom_dimension_1: "user_consent" },
      });

      this.isInitialized = true;
      console.log("Google Analytics initialized with consent");

      // Track consent acceptance
      this.trackEvent("cookie_consent", "accept", "analytics");
    } else if (!hasAnalyticsConsent && this.isInitialized) {
      // User has withdrawn consent
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });

      console.log("Google Analytics disabled due to withdrawn consent");
    }
  }

  /**
   * Track custom event (only if user has consented)
   */
  trackEvent(
    eventName: string,
    action: string,
    category: string,
    value?: number,
  ): void {
    if (!this.isInitialized || typeof window === "undefined" || !window.gtag) {
      return;
    }

    window.gtag("event", action, {
      event_category: category,
      event_label: eventName,
      value: value,
    });
  }

  /**
   * Track page view (only if user has consented)
   */
  trackPageView(pagePath: string, pageTitle?: string): void {
    if (!this.isInitialized || typeof window === "undefined" || !window.gtag) {
      return;
    }

    window.gtag("config", this.GA_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }

  /**
   * Track game-specific events
   */
  trackGameEvent(
    event:
      | "game_start"
      | "game_complete"
      | "game_quit"
      | "hint_used"
      | "give_up",
    metadata?: Record<string, any>,
  ): void {
    if (!this.isInitialized) return;

    const eventData: Record<string, any> = {
      event_category: "game",
      ...metadata,
    };

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, eventData);
    }
  }

  /**
   * Check if analytics is currently initialized
   */
  get initialized(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const analytics = AnalyticsService.getInstance();

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
