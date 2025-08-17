<template>
  <v-card class="d-flex flex-column" data-testid="settings-card">
    <v-card-title
      class="text-center py-3 sm:py-4 bg-primary text-white flex-shrink-0"
    >
      <div class="d-flex align-center justify-center">
        <v-icon
          icon="mdi-cog"
          class="mr-2"
          :size="$vuetify.display.smAndUp ? 'large' : 'default'"
        ></v-icon>
        <span class="text-h6 sm:text-h4 font-bold">Einstellungen</span>
      </div>
    </v-card-title>

    <v-card-text class="pa-2 sm:pa-4 flex-grow-1" style="overflow-y: auto">
      <div class="space-y-3 sm:space-y-4">
        <!-- Theme Settings -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon
              icon="mdi-palette"
              color="primary"
              class="mr-2"
              size="small"
            ></v-icon>
            <h3 class="text-subtitle-1 font-bold text-primary">Design</h3>
          </div>
          <p class="text-body-2 mb-3">
            Wähle dein bevorzugtes Farbschema für die App.
          </p>
          <v-radio-group
            v-model="settingsStore.themePreference"
            data-testid="theme-radio-group"
            class="mt-0"
          >
            <v-radio
              color="primary"
              label="Helles Design"
              value="light"
              data-testid="light-mode-radio"
              class="mb-1"
            />
            <v-radio
              color="primary"
              label="Dunkles Design"
              value="dark"
              data-testid="dark-mode-radio"
            />
          </v-radio-group>
        </v-card>

        <!-- Info Section -->
        <v-alert type="info" variant="tonal" class="text-body-2">
          <template v-slot:prepend>
            <v-icon icon="mdi-information" size="small"></v-icon>
          </template>
          <div>
            <strong>Hinweis:</strong> Deine Einstellungen werden automatisch
            gespeichert und beim nächsten Besuch wiederhergestellt.
          </div>
        </v-alert>
      </div>
    </v-card-text>

    <v-card-actions class="pa-2 sm:pa-3 pt-0 flex-shrink-0">
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-close"
        @click="$emit('close')"
        size="default"
        class="px-3 sm:px-4"
        data-testid="close-settings-button"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings.store.ts";
import { useTheme } from "vuetify/framework";
import { watch } from "vue";

const settingsStore = useSettingsStore();
const theme = useTheme();

defineEmits<{
  close: [];
}>();

watch(
  () => settingsStore.themePreference,
  (themePreference) => {
    if (!themePreference) return;
    theme.change(themePreference);
  },
  { immediate: true }
);
</script>

<style scoped></style>
