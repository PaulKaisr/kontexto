<template>
  <div
    class="flex flex-row justify-evenly items-center gap-4 w-full py-2"
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
    <div
      class="flex flex-col items-center"
      data-testid="streak-stat"
    >
      <span class="text-xs text-gray-500">Serie</span>
      <span class="font-bold text-lg text-orange-600">{{ streakStore.currentStreak }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStreakStore } from "@/stores/streak.store";

defineProps<{
  gameId: number | null;
  numGuesses: number;
  numHints: number;
}>();

const streakStore = useStreakStore();

// Calculate streak when component mounts
onMounted(() => {
  streakStore.calculateStreak();
});
</script>


