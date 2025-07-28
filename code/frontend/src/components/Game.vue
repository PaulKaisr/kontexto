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
        @click="gameStore.getHint"
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
import GuessItem from "@/components/GuessHistory/GuessItem.vue";

const gameStore = useGameStore()

onMounted(async () => {
  await gameStore.fetchAndSetRecentGame()
})
</script>
