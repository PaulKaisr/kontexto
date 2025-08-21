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
                    Werden für personalisierte Werbung verwendet, einschließlich
                    Google AdSense. Helfen bei der Finanzierung des kostenlosen Spiels.
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
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import {
  useCookiesStore,
  type CookiePreferences,
} from "@/stores/cookies.store";

const cookiesStore = useCookiesStore();
const showDetails = ref(false);

// Local preferences for the banner form
const localPreferences = reactive<CookiePreferences>({
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

.cookie-banner .v-dialog {
  margin: 16px;
}

@media (max-width: 600px) {
  .cookie-banner .v-dialog {
    margin: 8px;
  }
}
</style>
