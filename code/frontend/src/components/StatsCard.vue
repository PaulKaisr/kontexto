<script setup lang="ts">
import { computed, ref } from "vue";
import { useGameStore } from "@/stores/game.store";
import ClosestWords from "./ClosestWords.vue";
import PreviousGames from "./PreviousGames.vue";

const gameStore = useGameStore();
const buttonText = ref("Teilen");
const isCopied = ref(false);
const showClosestWords = ref(false);
const showPreviousGames = ref(false);

async function copyStatsToClipboard() {
  const attempts = gameStore.hasGivenUp
    ? gameStore.pastGuesses.length - gameStore.numHints - 1
    : gameStore.pastGuesses.length - gameStore.numHints;

  const stats = gameStore.hasGivenUp
    ? `Ich habe das Kontexto-Rätsel von Tag ${gameStore.recentGame?.game_id} aufgegeben. 😔\n\n` +
      `Lösungswort: "${gameStore.solution}"\n` +
      `Versuche: ${attempts}\n` +
      `Hinweise: ${gameStore.numHints}\n\n` +
      `${chart.value}\n\n` +
      `Spiele auch mit: https://kontexto.app/`
    : `Ich habe das Kontexto-Rätsel von Tag ${gameStore.recentGame?.game_id} gelöst! 🎉\n\n` +
      `Lösungswort: "${gameStore.solution}"\n` +
      `Versuche: ${attempts}\n` +
      `Hinweise: ${gameStore.numHints}\n\n` +
      `${chart.value}\n\n` +
      `Spiele auch mit: https://kontexto.app/`;

  await navigator.clipboard.writeText(stats);

  // Change button state
  buttonText.value = "Kopiert";
  isCopied.value = true;

  // Reset button after 2 seconds
  setTimeout(() => {
    buttonText.value = "Teilen";
    isCopied.value = false;
  }, 2000);
}

const AppConfiguration = {
  GREEN_RANK: 300,
  YELLOW_RANK: 1500,
  ORANGE_RANK: 3000,
};

const chart = computed(() => {
  let nGreen = 0;
  let nYellow = 0;
  let nOrange = 0;
  let nRed = 0;
  for (const guess of gameStore.pastGuesses) {
    if (guess.similarity <= AppConfiguration.GREEN_RANK) {
      nGreen++;
    } else if (guess.similarity <= AppConfiguration.YELLOW_RANK) {
      nYellow++;
    } else if (guess.similarity <= AppConfiguration.ORANGE_RANK) {
      nOrange++;
    } else {
      nRed++;
    }
  }
  return `🟩 : ${nGreen}\n🟨 : ${nYellow}\n🟧 : ${nOrange}\n🟥 : ${nRed}`;
});
</script>

<template>
  <v-card class="mx-auto mb-6 max-w-md" data-testid="stats-card">
    <v-card-title class="text-center py-4">
      <span class="text-h5 font-bold">{{
        gameStore.hasGivenUp ? "Aufgegeben!" : "Glückwunsch!"
      }}</span>
    </v-card-title>

    <v-card-text class="text-center px-6 pb-6">
      <div class="mb-6">
        <p class="text-body-1 mb-4" v-if="!gameStore.hasGivenUp">
          Du hast das Lösungswort von Tag {{ gameStore.recentGame?.game_id }}
          <strong>"{{ gameStore.solution }}"</strong> mit
          {{ gameStore.pastGuesses.length - gameStore.numHints }} Versuchen und
          {{ gameStore.numHints }} Hinweisen erraten!
        </p>
        <p class="text-body-1 mb-4" v-else>
          Du hast das Spiel von Tag
          {{ gameStore.recentGame?.game_id }} aufgegeben. Das Lösungswort war
          <strong>"{{ gameStore.solution }}"</strong>. Du hattest
          {{ gameStore.pastGuesses.length - gameStore.numHints - 1 }} Versuche
          und {{ gameStore.numHints }} Hinweise verwendet.
        </p>
      </div>

      <div class="mb-6">
        <v-card variant="outlined" class="pa-4 mx-auto max-w-xs">
          <pre class="text-sm">{{ chart }}</pre>
        </v-card>
      </div>

      <div class="flex flex-col gap-4">
        <v-btn
          rounded="pill"
          :prepend-icon="isCopied ? 'mdi-check' : 'mdi-content-copy'"
          @click="copyStatsToClipboard"
          :color="isCopied ? 'success' : 'primary'"
          size="large"
          class="px-8"
          :disabled="isCopied"
        >
          {{ buttonText }}
        </v-btn>

        <v-btn
          rounded="pill"
          prepend-icon="mdi-eye"
          @click="showClosestWords = true"
          color="secondary"
          variant="outlined"
          size="large"
          class="px-8"
        >
          Ähnlichste Wörter
        </v-btn>

        <span class="text-gray-500 text-center"> Weiter spielen? </span>

        <v-btn
          rounded="pill"
          prepend-icon="mdi-calendar"
          @click="showPreviousGames = true"
          color="secondary"
          variant="outlined"
          size="large"
          class="px-8"
        >
          Frühere Spiele
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

  <v-dialog
    v-model="showClosestWords"
    :max-width="$vuetify.display.smAndUp ? '800' : '100%'"
    :fullscreen="$vuetify.display.xs"
    scrollable
    max-height="90vh"
    class="ma-1 sm:ma-2"
  >
    <ClosestWords
      :game-id="gameStore.recentGame?.game_id || 0"
      :solution-word="gameStore.solution || ''"
      @close="showClosestWords = false"
    />
  </v-dialog>

  <v-dialog
    v-model="showPreviousGames"
    class="w-full max-w-3xl"
    max-width="800"
  >
    <PreviousGames @close="showPreviousGames = false" />
  </v-dialog>
</template>

<style scoped></style>
