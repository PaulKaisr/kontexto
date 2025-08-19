<template>
  <v-dialog
    :model-value="cookiesStore.showBanner"
    persistent
    no-click-animation
    max-width="600"
    class="cookie-banner"
  >
    <v-card class="cookie-consent-card">
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" class="me-2">mdi-cookie</v-icon>
        <span>Cookie-Einstellungen</span>
      </v-card-title>

      <v-card-text>
        <p class="mb-4">
          Wir verwenden Cookies, um Ihre Erfahrung auf Kontexto zu verbessern.
          Sie können Ihre Präferenzen anpassen oder alle Cookies akzeptieren.
        </p>

        <v-expansion-panels v-if="showDetails" variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center justify-space-between w-100 pe-4">
                <span>Cookie-Details</span>
                <v-icon>mdi-information</v-icon>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="cookie-categories">
                <!-- Necessary Cookies -->
                <div class="mb-4">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="d-flex align-center">
                      <v-icon color="success" class="me-2"
                        >mdi-shield-check</v-icon
                      >
                      <span class="font-weight-medium">Notwendige Cookies</span>
                    </div>
                    <v-switch
                      :model-value="true"
                      disabled
                      color="success"
                      hide-details
                    />
                  </div>
                  <p class="text-caption text-grey">
                    Diese Cookies sind für das Funktionieren der Website
                    unerlässlich. Sie speichern Ihre Spielfortschritte und
                    Einstellungen.
                  </p>
                </div>

                <!-- Analytics Cookies -->
                <div class="mb-4">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="d-flex align-center">
                      <v-icon color="info" class="me-2">mdi-chart-line</v-icon>
                      <span class="font-weight-medium">Analyse-Cookies</span>
                    </div>
                    <v-switch
                      v-model="localPreferences.analytics"
                      color="info"
                      hide-details
                    />
                  </div>
                  <p class="text-caption text-grey">
                    Helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                    Alle Daten sind anonymisiert. (Google Analytics)
                  </p>
                </div>

                <!-- Marketing Cookies -->
                <div class="mb-4">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <div class="d-flex align-center">
                      <v-icon color="warning" class="me-2">mdi-bullhorn</v-icon>
                      <span class="font-weight-medium">Marketing-Cookies</span>
                    </div>
                    <v-switch
                      v-model="localPreferences.marketing"
                      color="warning"
                      hide-details
                    />
                  </div>
                  <p class="text-caption text-grey">
                    Derzeit verwenden wir keine Marketing-Cookies. Diese
                    Einstellung ist für zukünftige Features vorgesehen.
                  </p>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>

      <v-card-actions class="justify-space-between flex-wrap pa-4">
        <div class="d-flex flex-wrap gap-2">
          <v-btn
            @click="handleAcceptAll"
            color="success"
            variant="elevated"
            prepend-icon="mdi-check-all"
          >
            Alle akzeptieren
          </v-btn>

          <v-btn
            @click="handleAcceptNecessary"
            color="grey"
            variant="outlined"
            prepend-icon="mdi-shield-check"
          >
            Nur notwendige
          </v-btn>

          <v-btn
            v-if="showDetails"
            @click="handleSaveCustom"
            color="primary"
            variant="outlined"
            prepend-icon="mdi-content-save"
          >
            Auswahl speichern
          </v-btn>
        </div>

        <div class="d-flex gap-2">
          <v-btn
            @click="showDetails = !showDetails"
            variant="text"
            size="small"
            :prepend-icon="showDetails ? 'mdi-chevron-up' : 'mdi-cog'"
          >
            {{ showDetails ? "Weniger" : "Anpassen" }}
          </v-btn>

          <v-btn
            to="/data-protection"
            variant="text"
            size="small"
            prepend-icon="mdi-information-outline"
          >
            Datenschutz
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Settings FAB (floating action button) when banner is not shown -->
  <v-fab
    v-if="cookiesStore.hasConsented && !cookiesStore.showBanner"
    icon="mdi-cookie-settings"
    location="bottom end"
    size="small"
    color="primary"
    class="cookie-settings-fab"
    @click="openSettings"
  />

  <!-- Cookie Settings Dialog -->
  <v-dialog v-model="showSettingsDialog" max-width="500">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon color="primary" class="me-2">mdi-cookie-settings</v-icon>
        <span>Cookie-Einstellungen ändern</span>
      </v-card-title>

      <v-card-text>
        <div class="cookie-categories">
          <!-- Necessary Cookies -->
          <div class="mb-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="success" class="me-2">mdi-shield-check</v-icon>
                <span class="font-weight-medium">Notwendige Cookies</span>
              </div>
              <v-switch
                :model-value="true"
                disabled
                color="success"
                hide-details
              />
            </div>
            <p class="text-caption text-grey mb-2">
              Immer aktiv - für das Funktionieren der Website erforderlich.
            </p>
          </div>

          <!-- Analytics Cookies -->
          <div class="mb-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="info" class="me-2">mdi-chart-line</v-icon>
                <span class="font-weight-medium">Analyse-Cookies</span>
              </div>
              <v-switch
                v-model="settingsPreferences.analytics"
                color="info"
                hide-details
              />
            </div>
            <p class="text-caption text-grey mb-2">
              Aktuell:
              {{ settingsPreferences.analytics ? "Aktiviert" : "Deaktiviert" }}
            </p>
          </div>

          <!-- Marketing Cookies -->
          <div class="mb-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="warning" class="me-2">mdi-bullhorn</v-icon>
                <span class="font-weight-medium">Marketing-Cookies</span>
              </div>
              <v-switch
                v-model="settingsPreferences.marketing"
                color="warning"
                hide-details
              />
            </div>
            <p class="text-caption text-grey mb-2">
              Aktuell:
              {{ settingsPreferences.marketing ? "Aktiviert" : "Deaktiviert" }}
            </p>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="showSettingsDialog = false" variant="text">
          Abbrechen
        </v-btn>
        <v-btn @click="handleSaveSettings" color="primary" variant="elevated">
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import {
  useCookiesStore,
  type CookiePreferences,
} from "@/stores/cookies.store";

const cookiesStore = useCookiesStore();
const showDetails = ref(false);
const showSettingsDialog = ref(false);

// Local preferences for the banner form
const localPreferences = reactive<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false,
});

// Settings dialog preferences
const settingsPreferences = reactive<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false,
});

// Handle accept all cookies
const handleAcceptAll = () => {
  cookiesStore.acceptAll();
};

// Handle accept only necessary cookies
const handleAcceptNecessary = () => {
  cookiesStore.acceptNecessaryOnly();
};

// Handle save custom preferences from banner
const handleSaveCustom = () => {
  cookiesStore.saveCustomPreferences(localPreferences);
};

// Open settings dialog
const openSettings = () => {
  // Copy current preferences to settings form
  Object.assign(settingsPreferences, cookiesStore.preferences);
  showSettingsDialog.value = true;
};

// Handle save settings from dialog
const handleSaveSettings = () => {
  cookiesStore.saveCustomPreferences(settingsPreferences);
  showSettingsDialog.value = false;
};

// Initialize cookie consent on mount
onMounted(() => {
  cookiesStore.initializeCookieConsent();

  // Initialize local preferences with store values
  Object.assign(localPreferences, cookiesStore.preferences);
});

// Watch for changes in store preferences to update local state
watch(
  () => cookiesStore.preferences,
  (newPreferences) => {
    Object.assign(localPreferences, newPreferences);
  },
  { deep: true }
);
</script>

<style scoped>
.cookie-consent-card {
  border-radius: 12px !important;
}

.cookie-categories {
  max-height: 400px;
  overflow-y: auto;
}

.cookie-settings-fab {
  position: fixed !important;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .cookie-consent-card :deep(.v-card-actions) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .cookie-consent-card :deep(.v-card-actions > div) {
    justify-content: center;
  }

  .cookie-settings-fab {
    bottom: 80px; /* Adjust for mobile navigation */
  }
}

/* Dialog animation improvements */
.cookie-banner :deep(.v-overlay__content) {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
