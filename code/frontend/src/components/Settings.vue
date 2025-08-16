<template>
  <v-dialog class="w-lg max-w-full" data-testid="settings-dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon="mdi-cog-outline" variant="text" v-bind="activatorProps" data-testid="settings-trigger"></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Einstellungen" data-testid="settings-card">
        <v-card-text>
          <div class="flex flex-col items-center justify-center">
            <v-radio-group v-model="settingsStore.themePreference" data-testid="theme-radio-group">
              <v-radio color="secondary" label="Light Mode" value="light" data-testid="light-mode-radio"/>
              <v-radio color="secondary" label="Dark Mode" value="dark" data-testid="dark-mode-radio"/>
            </v-radio-group>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Schließen"
            @click="isActive.value = false"
            data-testid="close-settings-button"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {useSettingsStore} from "@/stores/settings.store.ts";
import {useTheme} from "vuetify/framework";
import {watch} from "vue";

const settingsStore = useSettingsStore()
const theme = useTheme()

watch(
  () => settingsStore.themePreference,
  (themePreference) => {
    if (!themePreference) return
    theme.change(themePreference)
  },
  {immediate: true}
)
</script>

<style scoped>
</style>
