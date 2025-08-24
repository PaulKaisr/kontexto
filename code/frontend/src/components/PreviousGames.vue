<template>
  <v-card class="d-flex flex-column">
    <v-card-title class="text-center py-3 sm:py-4 flex-shrink-0">
      <div class="d-flex align-center justify-center">
        <v-icon
          icon="mdi-calendar"
          class="mr-2"
          :size="$vuetify.display.smAndUp ? 'large' : 'default'"
        />
        <span class="text-h6 sm:text-h4 font-bold">Frühere Spiele</span>
      </div>
    </v-card-title>

    <v-card-text
      class="pa-0 flex-grow-1"
      style="overflow-y: auto"
    >
      <div
        v-if="loading"
        class="text-center py-6 sm:py-8"
      >
        <v-skeleton-loader
          type="heading, list-item@5"
          class="mx-auto"
          max-width="600"
        />
      </div>

      <div
        v-else-if="error"
        class="text-center py-6 sm:py-8 px-3"
      >
        <v-icon
          icon="mdi-alert-circle"
          color="error"
          :size="$vuetify.display.smAndUp ? '64' : '48'"
          class="mb-3 sm:mb-4"
        />
        <p class="text-body-2 sm:text-body-1 text-error">
          Fehler beim Laden der Spiele. Bitte versuche es erneut.
        </p>
      </div>

      <div
        v-else-if="games.length === 0"
        class="text-center py-6 sm:py-8 px-3"
      >
        <v-icon
          icon="mdi-calendar-blank"
          color="grey"
          :size="$vuetify.display.smAndUp ? '64' : '48'"
          class="mb-3 sm:mb-4"
        />
        <p class="text-body-2 sm:text-body-1">
          Keine früheren Spiele gefunden.
        </p>
      </div>

      <div v-else>
        <div class="pa-3 sm:pa-4">
          <p class="text-body-2 sm:text-body-1 text-center mb-2 sm:mb-3">
            Wähle ein Spiel aus, um es zu spielen:
          </p>
        </div>

        <v-list
          class="pa-0"
          density="comfortable"
        >
          <template
            v-for="(game, index) in gamesWithProgress"
            :key="game.gameId"
          >
            <v-list-item
              class="px-3 sm:px-4 py-2 sm:py-3"
              :class="{
                'bg-primary-lighten-5': game.gameId === currentGameId,
              }"
              :disabled="switchingGame"
              min-height="auto"
              @click="selectGame(game)"
            >
              <template #prepend>
                <v-avatar
                  :color="
                    game.gameId === currentGameId
                      ? 'primary'
                      : getGameStateColor(game.state)
                  "
                  :size="$vuetify.display.smAndUp ? '40' : '32'"
                  class="mr-2 sm:mr-3"
                >
                  <v-icon
                    :icon="getGameStateIcon(game.state)"
                    :color="game.gameId === currentGameId ? 'white' : 'white'"
                    :size="$vuetify.display.smAndUp ? 'default' : 'small'"
                  />
                </v-avatar>
              </template>

              <div class="d-flex flex-column align-start">
                <v-list-item-title
                  class="font-weight-medium text-body-2 sm:text-body-1"
                >
                  Spiel #{{ game.gameId }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption sm:text-body-2">
                  {{ formatDate(getGameDate(game.gameId)) }}
                </v-list-item-subtitle>

                <!-- Game progress info -->
                <div class="d-flex align-center mt-1 gap-2">
                  <v-chip
                    :color="getGameStateColor(game.state)"
                    variant="outlined"
                    :size="$vuetify.display.smAndUp ? 'x-small' : 'x-small'"
                  >
                    {{ game.state }}
                  </v-chip>

                  <div
                    v-if="game.guessCount > 0"
                    class="text-caption text-grey-darken-1"
                  >
                    {{ game.guessCount }} Versuche
                    <span v-if="game.hintsUsed > 0">• {{ game.hintsUsed }} Hinweise</span>
                  </div>
                </div>

                <!-- Show solution if available -->
                <div
                  v-if="game.solution"
                  class="text-caption text-success mt-1 font-weight-bold"
                >
                  Lösung: {{ game.solution }}
                </div>
              </div>

              <template #append>
                <div class="d-flex align-center">
                  <v-chip
                    v-if="game.gameId === currentGameId"
                    color="primary"
                    variant="flat"
                    :size="$vuetify.display.smAndUp ? 'small' : 'x-small'"
                    class="mr-1 sm:mr-2"
                  >
                    <span class="text-caption">Aktuell</span>
                  </v-chip>
                  <v-icon
                    :icon="
                      switchingGame && selectedGameId === game.gameId
                        ? 'mdi-loading mdi-spin'
                        : 'mdi-play'
                    "
                    :color="game.gameId === currentGameId ? 'primary' : 'grey'"
                    :size="$vuetify.display.smAndUp ? 'default' : 'small'"
                  />
                </div>
              </template>
            </v-list-item>

            <v-divider
              v-if="index < gamesWithProgress.length - 1"
              class="mx-3 sm:mx-4"
            />
          </template>
        </v-list>
      </div>
    </v-card-text>

    <v-card-actions class="pa-2 sm:pa-4 pt-0 flex-shrink-0">
      <v-spacer />
      <v-btn
        variant="outlined"
        prepend-icon="mdi-close"
        :size="$vuetify.display.smAndUp ? 'large' : 'default'"
        class="px-3 sm:px-6"
        :disabled="switchingGame"
        @click="$emit('close')"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getAllGames, getGameById } from "@/services/supabase";
import { useGameStore, GameState } from "@/stores/game.store";

interface GameData {
  game_id: number;
  date: string | null;
}

interface GameWithProgress {
  gameId: number;
  state: GameState;
  guessCount: number;
  hintsUsed: number;
  lastPlayed: string | null;
  solution: string | null;
}

const emit = defineEmits<{
  close: [];
}>();

const gameStore = useGameStore();
const games = ref<GameData[]>([]);
const loading = ref(true);
const error = ref(false);
const switchingGame = ref(false);
const selectedGameId = ref<number | null>(null);

const currentGameId = computed(() => gameStore.recentGame?.game_id);

// Create a map of games with their dates for quick lookup
const gamesDatesMap = computed(() => {
  const map: Record<number, string | null> = {};
  games.value.forEach((game) => {
    map[game.game_id] = game.date;
  });
  return map;
});

// Combine available games with their progress data
const gamesWithProgress = computed(() => {
  const result: GameWithProgress[] = [];
  const progressGames = gameStore.allGamesWithProgress;

  // First, add all games from the database
  games.value.forEach((game) => {
    const progressGame = progressGames.find((p) => p.gameId === game.game_id);
    if (progressGame) {
      result.push({
        gameId: game.game_id,
        state: progressGame.state,
        guessCount: progressGame.guessCount,
        hintsUsed: progressGame.hintsUsed,
        lastPlayed: progressGame.lastPlayed,
        solution: progressGame.solution,
      });
    } else {
      // Game exists but no progress yet
      result.push({
        gameId: game.game_id,
        state: GameState.NOT_STARTED,
        guessCount: 0,
        hintsUsed: 0,
        lastPlayed: null,
        solution: null,
      });
    }
  });

  // Sort by game ID descending (newest first)
  return result.sort((a, b) => b.gameId - a.gameId);
});

function getGameDate(gameId: number): string | null {
  return gamesDatesMap.value[gameId] || null;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "Datum unbekannt";

  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getGameStateColor(state: GameState): string {
  switch (state) {
  case GameState.NOT_STARTED:
    return "grey-lighten-1";
  case GameState.IN_PROGRESS:
    return "orange";
  case GameState.SOLVED:
    return "success";
  case GameState.GIVEN_UP:
    return "error";
  default:
    return "grey-lighten-1";
  }
}

function getGameStateIcon(state: GameState): string {
  switch (state) {
  case GameState.NOT_STARTED:
    return "mdi-play-circle-outline";
  case GameState.IN_PROGRESS:
    return "mdi-progress-clock";
  case GameState.SOLVED:
    return "mdi-check-circle";
  case GameState.GIVEN_UP:
    return "mdi-close-circle";
  default:
    return "mdi-play-circle-outline";
  }
}

async function selectGame(game: GameWithProgress) {
  if (switchingGame.value || game.gameId === currentGameId.value) return;

  try {
    switchingGame.value = true;
    selectedGameId.value = game.gameId;

    // Fetch the selected game data
    const selectedGame = await getGameById(game.gameId);

    if (selectedGame) {
      // Set the new game without resetting the entire store
      gameStore.recentGame = selectedGame;
      gameStore.currentGuess = "";

      // Initialize progress for this game and update switch tracking
      await gameStore.switchToGame(game.gameId);

      // Emit close to close the dialog
      emit("close");
    } else {
      console.error("Failed to fetch selected game");
    }
  } catch (err) {
    console.error("Error switching to game:", err);
  } finally {
    switchingGame.value = false;
    selectedGameId.value = null;
  }
}

onMounted(async() => {
  try {
    loading.value = true;
    error.value = false;

    const result = await getAllGames();

    if (result) {
      games.value = result;
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error("Error loading games:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.mdi-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
