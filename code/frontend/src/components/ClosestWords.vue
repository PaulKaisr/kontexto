<template>
  <v-card class="max-w-4xl mx-auto">
    <v-card-text class="pa-0">
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="mt-4 text-body-1">Lade ähnlichste Wörter...</p>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <v-icon
          icon="mdi-alert-circle"
          color="error"
          size="64"
          class="mb-4"
        ></v-icon>
        <p class="text-body-1 text-error">
          Fehler beim Laden der Wörter. Bitte versuche es erneut.
        </p>
      </div>

      <div v-else-if="guessData.length === 0" class="text-center py-8">
        <p class="text-body-1">Keine Wörter gefunden.</p>
      </div>

      <div v-else>
        <v-sheet class="pa-6">
          <p class="text-center mb-2">
            <strong>Das heutige Wort (#{{ props.gameId }}) war:</strong>
          </p>
          <p class="text-h5 text-center font-bold text-primary">
            {{ props.solutionWord }}
          </p>
          <p class="text-body-2 text-center mt-2">
            Das waren die {{ guessData.length }} ähnlichsten Wörter:
          </p>
        </v-sheet>

        <v-container class="pa-6 max-h-[500px] overflow-y-auto">
          <GuessHistory :guesses="guessData" />
        </v-container>
      </div>
    </v-card-text>

    <v-card-actions class="pa-6 pt-4">
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-close"
        @click="$emit('close')"
        size="large"
        class="px-8"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTopWordsByGame } from "@/services/supabase";
import GuessHistory from "./GuessHistory/GuessHistory.vue";

const props = defineProps<{
  gameId: number;
  solutionWord: string;
}>();

defineEmits<{
  close: [];
}>();

// Transform API data to match GuessHistory expected format
const guessData = ref<{ guess: string; similarity: number }[]>([]);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    loading.value = true;
    error.value = false;
    const result = await getTopWordsByGame(props.gameId, 500);

    if (result && result.length > 0) {
      // Transform data to match GuessHistory format
      // Use rank as similarity since GuessItem uses similarity for ranking/colors
      guessData.value = result
        .filter((item) => item.word != null && item.similarity != null)
        .map((item) => ({
          guess: item.word!,
          similarity: item.rank, // Use rank as similarity for proper coloring
        }));
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error("Error loading closest words:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
