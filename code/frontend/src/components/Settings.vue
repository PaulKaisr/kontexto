<template>
  <v-card class="d-flex flex-column" data-testid="settings-card">
    <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white flex-shrink-0">
      <div class="d-flex align-center justify-center">
        <v-icon icon="mdi-cog" class="mr-2" :size="$vuetify.display.smAndUp ? 'large' : 'default'" />
        <span class="text-h6 sm:text-h4 font-bold">Einstellungen</span>
      </div>
    </v-card-title>

    <v-card-text class="pa-2 sm:pa-4 flex-grow-1" style="overflow-y: auto">
      <div class="space-y-3 sm:space-y-4">
        <!-- Theme Settings -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-palette" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">
              Design
            </h3>
          </div>
          <p class="text-body-2 mb-3">
            Wähle dein bevorzugtes Farbschema für die App.
          </p>
          <v-radio-group v-model="settingsStore.themePreference" data-testid="theme-radio-group" class="mt-0">
            <v-radio color="primary" label="Systemeinstellung" value="system" data-testid="system-mode-radio"
              class="mb-1" />
            <v-radio color="primary" label="Helles Design" value="light" data-testid="light-mode-radio" class="mb-1" />
            <v-radio color="primary" label="Dunkles Design" value="dark" data-testid="dark-mode-radio" />
          </v-radio-group>
        </v-card>

        <!-- Cookie Settings -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-cookie" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">
              Cookie-Einstellungen
            </h3>
          </div>
          <p class="text-body-2 mb-3">
            Verwalte deine Cookie-Präferenzen für diese Website.
          </p>

          <!-- Necessary Cookies -->
          <div class="mb-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="success" class="me-2" size="small">
                  mdi-shield-check
                </v-icon>
                <span class="text-subtitle-2 font-medium">Notwendige Cookies</span>
              </div>
              <v-switch :model-value="true" disabled color="success" hide-details density="compact" />
            </div>
            <p class="text-caption text-medium-emphasis ml-6">
              Immer aktiv - für das Funktionieren der Website erforderlich.
            </p>
          </div>

          <!-- Analytics Cookies -->
          <div class="mb-4">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="info" class="me-2" size="small">
                  mdi-chart-line
                </v-icon>
                <span class="text-subtitle-2 font-medium">Analyse-Cookies</span>
              </div>
              <v-switch v-model="cookiePreferences.analytics" color="info" hide-details density="compact"
                @update:model-value="handleCookiePreferenceChange" />
            </div>
            <p class="text-caption text-medium-emphasis ml-6">
              Aktuell:
              {{ cookiePreferences.analytics ? "Aktiviert" : "Deaktiviert" }}
            </p>
          </div>

          <!-- Marketing Cookies -->
          <div class="mb-2">
            <div class="d-flex align-center justify-space-between mb-2">
              <div class="d-flex align-center">
                <v-icon color="warning" class="me-2" size="small">
                  mdi-bullhorn
                </v-icon>
                <span class="text-subtitle-2 font-medium">Marketing-Cookies</span>
              </div>
              <v-switch v-model="cookiePreferences.marketing" color="warning" hide-details density="compact"
                @update:model-value="handleCookiePreferenceChange" />
            </div>
            <p class="text-caption text-medium-emphasis ml-6">
              Aktuell:
              {{ cookiePreferences.marketing ? "Aktiviert" : "Deaktiviert" }}
            </p>
          </div>
        </v-card>

        <!-- Info Section -->
        <v-alert type="info" variant="tonal" class="text-body-2">
          <template #prepend>
            <v-icon icon="mdi-information" size="small" />
          </template>
          <div>
            <strong>Hinweis:</strong> Deine Einstellungen werden automatisch
            gespeichert und beim nächsten Besuch wiederhergestellt.
          </div>
        </v-alert>
      </div>
    </v-card-text>

    <v-card-actions class="pa-2 sm:pa-3 pt-0 flex-shrink-0">
      <v-spacer />
      <v-btn variant="outlined" prepend-icon="mdi-close" size="default" class="px-3 sm:px-4"
        data-testid="close-settings-button" @click="$emit('close')">
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {
  useCookiesStore,
  type CookiePreferences,
} from "@/stores/cookies.store";
import { useSettingsStore } from "@/stores/settings.store.ts";
import { onMounted, reactive, watch } from "vue";
import { useTheme } from "vuetify/framework";

const settingsStore = useSettingsStore();
const cookiesStore = useCookiesStore();
const theme = useTheme();

defineEmits<{
  close: [];
}>();

// Cookie preferences state
const cookiePreferences = reactive<CookiePreferences>({
  necessary: true,
  analytics: false,
  marketing: false,
});

// Handle cookie preference changes
const handleCookiePreferenceChange = () => {
  cookiesStore.saveCustomPreferences(cookiePreferences);
};

// Initialize cookie preferences from store
onMounted(() => {
  Object.assign(cookiePreferences, cookiesStore.preferences);
});

// Watch for changes in store preferences to update local state
watch(
  () => cookiesStore.preferences,
  (newPreferences) => {
    Object.assign(cookiePreferences, newPreferences);
  },
  { deep: true },
);

watch(
  () => settingsStore.themePreference,
  (themePreference) => {
    if (!themePreference) return;
    theme.change(themePreference);
  },
  { immediate: true },
);
</script>
