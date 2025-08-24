<template>
  <v-card
    variant="tonal"
    class="relative w-full overflow-visible"
    :style="highlight ? { border: '2px solid', borderRadius: '0.4rem' } : { border: 'none' }"
    data-testid="guess-item"
  >
    <div
      class="flex justify-between items-center w-full px-4 py-2"
      :class="highlight ? 'font-bold' : ''"
    >
      <span>{{ guess }}</span>
      <span v-if="similarity">{{ similarity! }}</span>
    </div>
    <div
      v-if="similarity"
      class="absolute left-0 bottom-0 h-full rounded progress-bar -z-100"
      :class="getBarClass(similarity)"
      :style="{ width: getBarFill(similarity) }"
    />
  </v-card>
</template>

<script setup lang="ts">
import { calculateBarFill } from "@/common/maths";

defineProps<{ guess: string, similarity: number, highlight?: boolean | null }>();

const getBarClass = (rank: number) => {
  if (rank <= 300) return "bg-success";
  if (rank <= 1500) return "bg-orange-400";
  return "bg-red-500";
};

const getBarFill = (similarity: number) => {
  const width = calculateBarFill(similarity);
  return `${width}%`;
};
</script>

<style scoped>
.progress-bar {
  /* Use transform instead of width for smoother animations that don't cause layout shift */
  transform-origin: left center;
  transition: transform 0.2s ease-out, background-color 0.2s ease-out;
}

/* Ensure consistent card height */
.v-card {
  min-height: 48px;
}
</style>


