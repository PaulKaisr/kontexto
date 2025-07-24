<template>
  <v-text-field
    color="primary"
    clearable
    label="Schreibe ein Wort"
    class="w-50"
    variant="outlined"
    v-model="gameStore.currentGuess"
    @keyup.enter="gameStore.submitGuess"
  ></v-text-field>
  <div>
    {{ gameStore.currentGuess }}
  </div>
  <div v-if="gameStore.recentGame">
    <strong>Most Recent Game:</strong> {{ gameStore.recentGame }}
  </div>
  <div v-if="similarityResult">
    <strong>Similarity Result:</strong> {{ similarityResult }}
  </div>
  <div v-if="gameStore.pastGuesses.length">
    <strong>Vergangene Versuche:</strong>
    <ul>
      <li v-for="(entry, idx) in gameStore.pastGuesses" :key="idx">
        {{ entry.guess }} - {{ entry.similarity }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {useGameStore} from '@/stores/game.store'
import {onMounted, ref} from 'vue'
import {getSimilarityByGameIdAndWord} from '@/services/supabase'
import type {Tables} from '@/generated-sources/database.types'

const gameStore = useGameStore()
const similarityResult = ref<Tables<'similarity'> | null>(null)

onMounted(async () => {
  if (!gameStore.recentGame) {
    await gameStore.fetchAndSetRecentGame()
  }
})

async function onSubmit() {
  if (gameStore.recentGame && gameStore.currentGuess) {
    similarityResult.value = await getSimilarityByGameIdAndWord(
      gameStore.recentGame.game_id,
      gameStore.currentGuess
    )
  }
}
</script>
