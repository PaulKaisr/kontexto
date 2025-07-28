<template>
  <div class="flex flex-col items-center my-2">
    <div class="w-lg">
      <StatsBar
        :game-id="gameStore.recentGame?.game_id ?? null"
        :num-guesses="gameStore.pastGuesses.length"
        :num-hints="gameStore.numHints"
      />
      <v-btn
        color="secondary"
        class="w-full mb-4"
        @click="getHint"
      >
        Hinweis erhalten
      </v-btn>
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
import {getHintForGame} from '@/services/supabase'

const gameStore = useGameStore()

onMounted(async () => {
  if (!gameStore.recentGame) {
    await gameStore.fetchAndSetRecentGame()
  }
})

async function getHint() {
  if (!gameStore.recentGame) return;
  const hint = await getHintForGame(
    gameStore.recentGame.game_id,
    gameStore.pastGuesses
  );
  if (hint && hint.word) {
    gameStore.pastGuesses.push({guess: hint.word, similarity: hint});
    gameStore.numHints++;
    // Resort guesses after hint
    gameStore.pastGuesses.sort((a, b) => {
      if (!a.similarity || a.similarity.similarity == null) return 1;
      if (!b.similarity || b.similarity.similarity == null) return -1;
      return a.similarity.similarity - b.similarity.similarity;
    });
  }
}
</script>
