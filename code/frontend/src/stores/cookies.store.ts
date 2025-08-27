import { defineStore } from "pinia";
import { ref } from "vue";
import { analytics } from "@/services/analytics";

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const useCookiesStore = defineStore(
  "cookies",
  () => {
    const hasConsented = ref<boolean>(false);
    const showBanner = ref<boolean>(false);
    const preferences = ref<CookiePreferences>({
      necessary: true, // Always true, cannot be disabled
      analytics: false,
      marketing: false,
    });

    // Check if user has already made a choice
    const initializeCookieConsent = () => {
      const storedConsent = localStorage.getItem("kontexto-cookie-consent");
      const storedPreferences = localStorage.getItem("kontexto-cookie-preferences");

      if (storedConsent && storedPreferences) {
        hasConsented.value = JSON.parse(storedConsent);
        preferences.value = {
          ...preferences.value,
          ...JSON.parse(storedPreferences),
        };
        showBanner.value = false;

        // Apply preferences
        applyAnalyticsSettings();
      } else {
        // Show banner after a short delay to avoid blocking initial page load
        setTimeout(() => {
          showBanner.value = true;
        }, 1000);
      }
    };

    // Accept all cookies
    const acceptAll = () => {
      preferences.value = {
        necessary: true,
        analytics: true,
        marketing: true,
      };
      savePreferences();
      applyAnalyticsSettings();
    };

    // Accept only necessary cookies
    const acceptNecessaryOnly = () => {
      preferences.value = {
        necessary: true,
        analytics: false,
        marketing: false,
      };
      savePreferences();
      applyAnalyticsSettings();
    };

    // Save custom preferences
    const saveCustomPreferences = (customPreferences: Partial<CookiePreferences>) => {
      preferences.value = {
        ...preferences.value,
        ...customPreferences,
        necessary: true, // Always true, ensure it stays true
      };
      savePreferences();
      applyAnalyticsSettings();
    };

    // Internal function to save preferences
    const savePreferences = () => {
      hasConsented.value = true;
      showBanner.value = false;

      localStorage.setItem("kontexto-cookie-consent", JSON.stringify(true));
      localStorage.setItem("kontexto-cookie-preferences", JSON.stringify(preferences.value));
    };

    // Apply analytics settings based on preferences
    const applyAnalyticsSettings = () => {
      // Initialize analytics service with current consent state
      analytics.initializeWithConsent(preferences.value.analytics);
    };

    // Reset cookie preferences (for testing or user request)
    const resetPreferences = () => {
      localStorage.removeItem("kontexto-cookie-consent");
      localStorage.removeItem("kontexto-cookie-preferences");
      hasConsented.value = false;
      showBanner.value = true;
      preferences.value = {
        necessary: true,
        analytics: false,
        marketing: false,
      };
    };

    return {
      hasConsented,
      showBanner,
      preferences,
      initializeCookieConsent,
      acceptAll,
      acceptNecessaryOnly,
      saveCustomPreferences,
      resetPreferences,
    };
  },
  {
    persist: false, // We handle persistence manually for better control
  },
);
