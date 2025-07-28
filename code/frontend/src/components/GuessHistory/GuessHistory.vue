<script setup lang="ts">
import GuessItem from './GuessItem.vue'

defineProps<{
  guesses: { guess: string, similarity: number }[],
  lastGuess?: { guess: string, similarity: number } | null
}>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <GuessItem
      v-for="(entry, idx) in guesses.sort()"
      :key="idx"
      :guess="entry.guess"
      :similarity="entry.similarity"
      :highlight="entry.guess === lastGuess.guess"
    />
  </div>
</template>

<style scoped>

</style>
