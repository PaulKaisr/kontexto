<template>
  <div class="flex flex-col items-center my-2">
    <div class="max-w-full px-4 w-lg">
      <div class="flex flex-row w-full justify-between items-center my-2">
        <div class="w-6"></div>
        <span class="text-3xl font-bold">Kontexto</span>
        <ContextMenu/>
      </div>
      <StatsCard/>
      <StatsBar
        :game-id="gameStore.recentGame?.game_id ?? null"
        :num-guesses="gameStore.pastGuesses.length"
        :num-hints="gameStore.numHints"
      />
      <v-btn
        color="secondary"
        class="w-full mb-4"
        @click="handleGetHint"
        :loading="loading"
        :disabled="loading"
      >
        Hinweis erhalten
      </v-btn>
      <v-text-field
        color="secondary"
        class="w-full mb-2"
        clearable
        label="Schreibe ein Wort"
        variant="outlined"
        autofocus
        v-model.trim="gameStore.currentGuess"
        @keyup.enter="handleSubmitGuess"
        :loading="loading"
        :error="!!errorMessage"
        :error-messages="errorMessage"
      ></v-text-field>
      <GuessItem v-if="gameStore.mostRecentGuess" class="mb-4" :guess="gameStore.mostRecentGuess.guess"
                 :similarity="gameStore.mostRecentGuess.similarity" :highlight="true"/>
      <GuessHistory :guesses="gameStore.pastGuesses" :lastGuess="gameStore.mostRecentGuess"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useGameStore} from '@/stores/game.store'
import {onMounted, ref} from 'vue'
import GuessHistory from "@/components/GuessHistory/GuessHistory.vue";
import StatsBar from "@/components/StatsBar.vue";
import GuessItem from "@/components/GuessHistory/GuessItem.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import StatsCard from "@/components/StatsCard.vue";

const gameStore = useGameStore()
const loading = ref(false)
const errorMessage = ref('')

async function handleSubmitGuess() {
  loading.value = true
  errorMessage.value = ''
  const result = await gameStore.submitGuess()
  loading.value = false
  if (!result.success) {
    switch (result.error) {
      case 'duplicate':
        errorMessage.value = 'Dieses Wort wurde bereits geraten.'
        break
      case 'not_found':
        errorMessage.value = 'Das Wort konnte nicht gefunden werden oder ist ungültig.'
        break
      case 'empty':
        errorMessage.value = 'Bitte gib ein Wort ein.'
        break
      default:
        errorMessage.value = 'Unbekannter Fehler.'
    }
  }
}

async function handleGetHint() {
  loading.value = true
  await gameStore.getHint()
  loading.value = false
}

onMounted(async () => {
  await gameStore.fetchAndSetRecentGame()
})
</script>
