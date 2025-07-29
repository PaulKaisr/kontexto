<template>
  <v-dialog class="w-lg max-w-full">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon-btn icon="mdi-cog-outline" variant="text" v-bind="activatorProps"></v-icon-btn>
    </template>

    <template v-slot:default="{ isActive }">
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
            @click="isActive.value = false"
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
