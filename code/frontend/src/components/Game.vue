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
      <GuessItem v-if="gameStore.mostRecentGuess" class="mb-4" :guess="gameStore.mostRecentGuess.guess"
                 :similarity="gameStore.mostRecentGuess.similarity" :highlight="true"/>
      <GuessHistory :guesses="gameStore.pastGuesses" :lastGuess="gameStore.mostRecentGuess"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useGameStore} from '@/stores/game.store'
import {onMounted} from 'vue'
import GuessHistory from "@/components/GuessHistory/GuessHistory.vue";
import StatsBar from "@/components/StatsBar.vue";
import {getHintForGame} from '@/services/supabase'
import GuessItem from "@/components/GuessHistory/GuessItem.vue";

const gameStore = useGameStore()

onMounted(async () => {
  await gameStore.fetchAndSetRecentGame()
})

async function getHint() {
  if (!gameStore.recentGame) return;
  // Collect guessed ranks and best rank
  const guessedRanks = gameStore.pastGuesses
    .map(g => g.similarity);
  // Find best rank
  const bestRank = guessedRanks.length > 0 ? Math.min(...guessedRanks) : Infinity;

  let nextHintRank: number;
  if (bestRank <= 1) {
    // Already have rank 1, find next lowest not guessed
    let candidate = 2;
    while (guessedRanks.includes(candidate)) candidate++;
    nextHintRank = candidate;
  } else if (bestRank <= 300) {
    // Halve best rank, find next not guessed
    let candidate = Math.max(2, Math.floor(bestRank / 2));
    while (guessedRanks.includes(candidate)) candidate++;
    nextHintRank = candidate;
  } else {
    // No guess <= 300, use 300 or next not guessed
    let candidate = 300;
    while (guessedRanks.includes(candidate)) candidate++;
    nextHintRank = candidate;
  }

  const hint = await getHintForGame(
    gameStore.recentGame.game_id,
    nextHintRank
  );
  if (hint && hint.word) {
    gameStore.pastGuesses.push({guess: hint.word, similarity: hint.similarity!});
    gameStore.numHints++;
    // Resort guesses after hint
    gameStore.pastGuesses.sort((a, b) => a.similarity - b.similarity);
  }
}
</script>
