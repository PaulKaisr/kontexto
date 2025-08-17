<template>
  <v-menu location="bottom start" data-testid="context-menu">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-dots-vertical"
        variant="text"
        v-bind="activatorProps"
        data-testid="context-menu-trigger"
      ></v-btn>
    </template>

    <v-list>
      <v-list-item
        @click="$emit('getHint')"
        :disabled="loading || gameOver"
        data-testid="hint-button"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-lightbulb-outline"></v-icon>
        </template>
        <v-list-item-title>Hinweis erhalten</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="showGiveUpConfirm = true"
        :disabled="loading || gameOver"
        data-testid="give-up-button"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-flag-outline"></v-icon>
        </template>
        <v-list-item-title>Aufgeben</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        @click="showPreviousGames = true"
        data-testid="previous-games-button"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-calendar"></v-icon>
        </template>
        <v-list-item-title>Frühere Spiele</v-list-item-title>
      </v-list-item>

      <v-list-item
        @click="showHowToPlay = true"
        data-testid="how-to-play-button"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-help-circle-outline"></v-icon>
        </template>
        <v-list-item-title>Wie spielt man?</v-list-item-title>
      </v-list-item>

      <v-list-item @click="showSettings = true" data-testid="settings-button">
        <template v-slot:prepend>
          <v-icon icon="mdi-cog-outline"></v-icon>
        </template>
        <v-list-item-title>Einstellungen</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- Previous Games Dialog -->
  <v-dialog
    v-model="showPreviousGames"
    :max-width="$vuetify.display.smAndUp ? '800' : '100%'"
    :fullscreen="$vuetify.display.xs"
    scrollable
    max-height="90vh"
    class="ma-1 sm:ma-2"
  >
    <PreviousGames @close="showPreviousGames = false" />
  </v-dialog>

  <!-- How to Play Dialog -->
  <v-dialog
    v-model="showHowToPlay"
    :max-width="$vuetify.display.smAndUp ? '800' : '100%'"
    :fullscreen="$vuetify.display.xs"
    scrollable
    max-height="90vh"
    class="ma-1 sm:ma-2"
  >
    <HowToPlay @close="showHowToPlay = false" />
  </v-dialog>

  <!-- Give Up Confirmation Dialog -->
  <ConfirmDialog
    v-model="showGiveUpConfirm"
    title="Spiel aufgeben?"
    message="Bist du sicher, dass du das aktuelle Spiel aufgeben möchtest? Das Lösungswort wird angezeigt und das Spiel ist beendet."
    confirm-text="Aufgeben"
    cancel-text="Weiter spielen"
    confirm-color="error"
    confirm-variant="flat"
    :loading="giveUpLoading"
    @confirm="handleGiveUpConfirm"
  />

  <!-- Settings Dialog -->
  <v-dialog
    v-model="showSettings"
    :max-width="$vuetify.display.smAndUp ? '600' : '100%'"
    :fullscreen="$vuetify.display.xs"
    scrollable
    max-height="90vh"
    class="ma-1 sm:ma-2"
  >
    <Settings @close="showSettings = false" />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSettingsStore } from "@/stores/settings.store.ts";
import { useTheme } from "vuetify/framework";
import HowToPlay from "./HowToPlay.vue";
import PreviousGames from "./PreviousGames.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
import Settings from "./Settings.vue";

defineProps<{
  loading?: boolean;
  gameOver?: boolean;
}>();

const emit = defineEmits<{
  getHint: [];
  giveUp: [];
}>();

const showHowToPlay = ref(false);
const showSettings = ref(false);
const showPreviousGames = ref(false);
const showGiveUpConfirm = ref(false);
const giveUpLoading = ref(false);
const settingsStore = useSettingsStore();
const theme = useTheme();

async function handleGiveUpConfirm() {
  try {
    giveUpLoading.value = true;
    emit("giveUp");
    // Close the dialog after emitting
    showGiveUpConfirm.value = false;
  } finally {
    giveUpLoading.value = false;
  }
}

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
