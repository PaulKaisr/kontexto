<script setup lang="ts">
import GuessItem from './GuessItem.vue'
import type {Similarity} from '@/types/similarity'

defineProps<{ guesses: { guess: string, similarity: Similarity | null }[] }>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <GuessItem
      v-for="(entry, idx) in guesses"
      :key="idx"
      :guess="entry.guess"
      :similarity="entry.similarity"
    />
  </div>
</template>

<style scoped>

</style>
