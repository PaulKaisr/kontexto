<script setup lang="ts">
import {defineProps} from 'vue'

defineProps<{
  gameId: number | null,
  numGuesses: number,
  numHints: number
}>()
</script>

<template>
  <div class="flex flex-row justify-evenly items-center gap-6 w-full py-2">
    <div class="flex flex-col items-center">
      <span class="text-xs text-gray-500">Spiel</span>
      <span class="font-bold text-lg">{{ gameId ?? '-' }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-xs text-gray-500">Versuche</span>
      <span class="font-bold text-lg">{{ numGuesses }}</span>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-xs text-gray-500">Hinweise</span>
      <span class="font-bold text-lg">{{ numHints }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>
