<script setup lang="ts">
import type {Similarity} from '@/types/similarity'

defineProps<{ guess: string, similarity: Similarity | null }>()
</script>

<template>
  <v-card variant="outlined" class="mb-2">
    <div class="flex items-center justify-between px-4 py-2">
      <span>{{ guess }}</span>
      <span v-if="similarity">{{ similarity.similarity }}</span>
    </div>
  </v-card>
</template>

<style scoped>

</style>
