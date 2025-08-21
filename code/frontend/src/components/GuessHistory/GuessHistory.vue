<template>
  <div
    class="flex flex-col gap-3 w-full"
    data-testid="guess-history"
  >
    <GuessItem
      v-for="(entry, idx) in sortedGuesses"
      :key="idx"
      :guess="entry.guess"
      :similarity="entry.similarity"
      :highlight="entry.guess === lastGuess?.guess && entry.similarity === lastGuess?.similarity"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import GuessItem from "./GuessItem.vue";

const props = defineProps<{
  guesses: { guess: string, similarity: number }[],
  lastGuess?: { guess: string, similarity: number } | null
}>();

const sortedGuesses = computed(() => {
  return [...props.guesses].sort((a, b) => a.similarity - b.similarity);
});

</script>


