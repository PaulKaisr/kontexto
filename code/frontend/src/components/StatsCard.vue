<script setup lang="ts">
import {computed} from 'vue';
import {useGameStore} from '@/stores/game.store';

const gameStore = useGameStore();

async function copyStatsToClipboard() {
  const stats = `Lösungswort: ${gameStore.solution}\n` +
    `Versuche: ${gameStore.pastGuesses.length - gameStore.numHints}\n` +
    `Hinweise: ${gameStore.numHints}\n` +
    `Spiel-ID: ${gameStore.recentGame?.game_id}`;
  await navigator.clipboard.writeText(stats);
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
  <v-card class="py-4">
    <v-card-title class="text-center">Glückwunsch!</v-card-title>

  </v-card>
  <v-card class="p-4 mb-4">
    <div class="mb-4">
      <p class="text-h6">Glückwunsch!</p>
      Du hast das Lösungswort von Tag {{ gameStore.recentGame?.game_id }} "{{
        gameStore.solution
      }}" mit {{ gameStore.pastGuesses.length - gameStore.numHints }} Versuchen
      und {{ gameStore.numHints }} Hinweisen erraten!
    </div>
    <div>
      <pre>{{ chart }}</pre>
    </div>
    <v-btn
      rounded="pill"
      class="mt-6"
      prepend-icon="mdi-content-copy"
      @click="copyStatsToClipboard"
      color="primary"
    >
      {{ copyButtonText }}
    </v-btn>
  </v-card>
</template>

<style scoped>

</style>
