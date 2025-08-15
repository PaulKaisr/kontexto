<template>
  <v-menu>
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon-btn icon="mdi-dots-vertical" variant="text" v-bind="activatorProps"></v-icon-btn>
    </template>

    <v-list>
      <v-list-item @click="showHowToPlay = true">
        <template v-slot:prepend>
          <v-icon icon="mdi-help-circle-outline"></v-icon>
        </template>
        <v-list-item-title>Wie spielt man?</v-list-item-title>
      </v-list-item>
      
      <v-list-item @click="showSettings = true">
        <template v-slot:prepend>
          <v-icon icon="mdi-cog-outline"></v-icon>
        </template>
        <v-list-item-title>Einstellungen</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- How to Play Dialog -->
  <v-dialog v-model="showHowToPlay" class="w-lg max-w-full" max-width="600">
    <HowToPlay @close="showHowToPlay = false" />
  </v-dialog>

  <!-- Settings Dialog -->
  <v-dialog v-model="showSettings" class="w-lg max-w-full">
    <v-card title="Einstellungen">
      <v-card-text>
        <div class="flex flex-col items-center justify-center">
          <v-radio-group v-model="settingsStore.themePreference">
            <v-radio color="secondary" label="Light Mode" value="light"/>
            <v-radio color="secondary" label="Dark Mode" value="dark"/>
          </v-radio-group>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text="Schließen"
          @click="showSettings = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings.store.ts'
import { useTheme } from 'vuetify/framework'
import HowToPlay from './HowToPlay.vue'

const showHowToPlay = ref(false)
const showSettings = ref(false)
const settingsStore = useSettingsStore()
const theme = useTheme()

watch(
  () => settingsStore.themePreference,
  (themePreference) => {
    if (!themePreference) return
    theme.change(themePreference)
  },
  { immediate: true }
)
</script>

<style scoped>
</style>