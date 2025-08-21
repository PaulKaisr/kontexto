<template>
  <div
    class="flex flex-row justify-evenly items-center gap-6 w-full py-2"
    data-testid="stats-bar"
  >
    <div
      class="flex flex-col items-center"
      data-testid="game-id-stat"
    >
      <span class="text-xs text-gray-500">Spiel</span>
      <span class="font-bold text-lg">{{ gameId ?? "-" }}</span>
    </div>
    <div
      class="flex flex-col items-center"
      data-testid="guesses-stat"
    >
      <span class="text-xs text-gray-500">Versuche</span>
      <span class="font-bold text-lg">{{ numGuesses }}</span>
    </div>
    <div
      class="flex flex-col items-center"
      data-testid="hints-stat"
    >
      <span class="text-xs text-gray-500">Hinweise</span>
      <span class="font-bold text-lg">{{ numHints }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  gameId: number | null;
  numGuesses: number;
  numHints: number;
}>();
</script>


