<script setup lang="ts">
import type {Similarity} from '@/types/similarity'
import {calculateBarFill} from '@/common/maths'

defineProps<{ guess: string, similarity: Similarity | null }>()

const getBarClass = (similarity: Similarity | null) => {
  if (!similarity || similarity.similarity == null) return 'bg-violet-800';
  const rank = similarity.similarity;
  if (rank <= 300) return 'bg-success';
  if (rank <= 1500) return 'bg-orange-400';
  return 'bg-red-500';
}

const getBarFill = (similarity: Similarity | null) => {
  if (!similarity || similarity.similarity == null) return '0%';
  const width = calculateBarFill(similarity.similarity);
  return `${width}%`;
}
</script>

<template>
  <v-card variant="outlined" class="relative w-full overflow-visible">
    <div class="flex justify-between items-center w-full px-4 py-2">
      <span>{{ guess }}</span>
      <span v-if="similarity">{{ similarity.similarity! + 1 }}</span>
    </div>
    <div
      v-if="similarity"
      class="absolute left-0 bottom-0 h-full rounded transition-all duration-500 -z-10"
      :class="getBarClass(similarity)"
      :style="{ width: getBarFill(similarity) }"
    ></div>
  </v-card>
</template>

<style scoped>
</style>
