<template>
  <div class="flex flex-col items-center my-2">
    <div class="w-lg">
      <StatsBar
        :game-id="gameStore.recentGame?.game_id ?? null"
        :num-guesses="gameStore.pastGuesses.length"
        :num-hints="gameStore.numHints"
      />
      <v-text-field
        color="primary"
        class="w-full"
        clearable
        label="Schreibe ein Wort"
        variant="outlined"
        v-model="gameStore.currentGuess"
        @keyup.enter="gameStore.submitGuess"
      ></v-text-field>
      <GuessHistory :guesses="gameStore.pastGuesses"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useGameStore} from '@/stores/game.store'
import {onMounted} from 'vue'
import GuessHistory from "@/components/GuessHistory/GuessHistory.vue";
import StatsBar from "@/components/StatsBar.vue";

const gameStore = useGameStore()

onMounted(async () => {
  if (!gameStore.recentGame) {
    await gameStore.fetchAndSetRecentGame()
  }
})
</script>
