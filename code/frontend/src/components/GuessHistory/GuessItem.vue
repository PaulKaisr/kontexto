<script setup lang="ts">
import {calculateBarFill} from '@/common/maths'

defineProps<{ guess: string, similarity: number, highlight?: boolean | null }>()

const getBarClass = (rank: number) => {
  if (rank <= 300) return 'bg-success';
  if (rank <= 1500) return 'bg-orange-400';
  return 'bg-red-500';
}

const getBarFill = (similarity: number) => {
  const width = calculateBarFill(similarity);
  return `${width}%`;
}
</script>

<template>
  <v-card
    variant="tonal"
    class="relative w-full overflow-visible"
    :style="highlight ? { border: '2px solid', borderRadius: '0.4rem' } : { border: 'none' }"
  >
    <div class="flex justify-between items-center w-full px-4 py-2" :class="highlight ? 'font-bold' : ''">
      <span>{{ guess }}</span>
      <span v-if="similarity">{{ similarity! }}</span>
    </div>
    <div
      v-if="similarity"
      class="absolute left-0 bottom-0 h-full rounded transition-all duration-100 -z-100"
      :class="getBarClass(similarity)"
      :style="{ width: getBarFill(similarity) }"
    ></div>
  </v-card>
</template>

<style scoped>
</style>
