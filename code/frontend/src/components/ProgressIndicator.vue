<template>
  <div v-if="progressStats.total > 0" class="d-flex align-center">
    <v-tooltip location="bottom">
      <template #activator="{ props }">
        <div
          v-bind="props"
          class="d-flex align-center cursor-pointer"
          @click="$emit('openProgress')"
        >
          <!-- Progress circle -->
          <div class="progress-circle mr-2">
            <v-progress-circular
              :model-value="progressStats.percentage"
              :size="24"
              :width="3"
              color="primary"
              class="progress-ring"
            >
              <span class="text-caption font-weight-bold">
                {{ progressStats.completed }}
              </span>
            </v-progress-circular>
          </div>

          <!-- Progress text for larger screens -->
          <span v-if="$vuetify.display.smAndUp" class="text-caption text-medium-emphasis">
            {{ progressStats.completed }}/{{ progressStats.total }}
          </span>
        </div>
      </template>
      <span>
        Fortschritt: {{ progressStats.completed }} von {{ progressStats.total }} Spielen
        abgeschlossen ({{ progressStats.percentage }}%)
      </span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useGameStore, GameState } from "@/stores/game.store";
import { getAllGames } from "@/services/supabase";

defineEmits<{
  openProgress: [];
}>();

const gameStore = useGameStore();
const allAvailableGames = ref<Array<{ game_id: number; date: string | null }>>([]);

const progressStats = computed(() => {
  if (allAvailableGames.value.length === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  // Helper function to get game state
  const getGameState = (gameId: number): GameState => {
    const progress = gameStore.gamesProgress[gameId];
    if (!progress || progress.guesses.length === 0) {
      return GameState.NOT_STARTED;
    }

    const solution = progress.guesses.find(
      (g: { guess: string; similarity: number }) => g.similarity === 1,
    );
    if (solution) {
      return progress.hasGivenUp ? GameState.GIVEN_UP : GameState.SOLVED;
    }

    return GameState.IN_PROGRESS;
  };

  // Count completed games (solved or given up)
  const completedGames = allAvailableGames.value.filter((game) => {
    const gameState = getGameState(game.game_id);
    return gameState === GameState.SOLVED || gameState === GameState.GIVEN_UP;
  }).length;

  const totalGames = allAvailableGames.value.length;

  return {
    completed: completedGames,
    total: totalGames,
    percentage: totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0,
  };
});

onMounted(async () => {
  try {
    const games = await getAllGames();
    if (games) {
      allAvailableGames.value = games;
    }
  } catch (error) {
    console.error("Error fetching games for progress indicator:", error);
  }
});
</script>

<style scoped>
.progress-circle {
  position: relative;
}

.progress-ring {
  transition: all 0.3s ease;
}

.progress-circle:hover .progress-ring {
  transform: scale(1.3);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
