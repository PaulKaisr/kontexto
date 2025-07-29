<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon-btn icon="mdi-cog-outline" variant="text" v-bind="activatorProps"></v-icon-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Einstellungen">
        <v-card-text>
          <v-radio-group v-model="settingsStore.themePreference" inline>
            <v-radio color="secondary" label="Light" value="light"/>
            <v-radio color="secondary" label="Dark" value="dark"/>
          </v-radio-group>
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
