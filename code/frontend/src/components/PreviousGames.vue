<template>
  <v-card class="max-w-2xl mx-auto">
    <v-card-title class="text-center py-6 bg-primary text-white">
      <div class="flex items-center justify-center">
        <v-icon icon="mdi-calendar" class="mr-2" size="large"></v-icon>
        <span class="text-h4 font-bold">Frühere Spiele</span>
      </div>
    </v-card-title>

    <v-card-text class="pa-0">
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="mt-4 text-body-1">Lade Spiele...</p>
      </div>

      <div v-else-if="error" class="text-center py-8">
        <v-icon
          icon="mdi-alert-circle"
          color="error"
          size="64"
          class="mb-4"
        ></v-icon>
        <p class="text-body-1 text-error">
          Fehler beim Laden der Spiele. Bitte versuche es erneut.
        </p>
      </div>

      <div v-else-if="games.length === 0" class="text-center py-8">
        <v-icon
          icon="mdi-calendar-blank"
          color="grey"
          size="64"
          class="mb-4"
        ></v-icon>
        <p class="text-body-1">Keine früheren Spiele gefunden.</p>
      </div>

      <div v-else>
        <div class="pa-6">
          <p class="text-body-1 text-center mb-4">
            Wähle ein Spiel aus, um es zu spielen:
          </p>
        </div>

        <v-list class="pa-0">
          <template v-for="(game, index) in games" :key="game.game_id">
            <v-list-item
              class="px-6 py-4"
              :class="{
                'bg-primary-lighten-5': game.game_id === currentGameId,
              }"
              @click="selectGame(game)"
              :disabled="switchingGame"
            >
              <template v-slot:prepend>
                <v-avatar
                  :color="
                    game.game_id === currentGameId
                      ? 'primary'
                      : 'grey-lighten-1'
                  "
                  size="40"
                >
                  <span class="text-body-1 font-bold text-white">
                    {{ game.game_id }}
                  </span>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium">
                Spiel #{{ game.game_id }}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ formatDate(game.date) }}
              </v-list-item-subtitle>

              <template v-slot:append>
                <div class="flex items-center">
                  <v-chip
                    v-if="game.game_id === currentGameId"
                    color="primary"
                    variant="flat"
                    size="small"
                    class="mr-2"
                  >
                    Aktuell
                  </v-chip>
                  <v-icon
                    :icon="
                      switchingGame && selectedGameId === game.game_id
                        ? 'mdi-loading mdi-spin'
                        : 'mdi-play'
                    "
                    :color="game.game_id === currentGameId ? 'primary' : 'grey'"
                  ></v-icon>
                </div>
              </template>
            </v-list-item>

            <v-divider v-if="index < games.length - 1"></v-divider>
          </template>
        </v-list>
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
        :disabled="switchingGame"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getAllGames, getGameById } from "@/services/supabase";
import { useGameStore } from "@/stores/game.store";

interface GameData {
  game_id: number;
  date: string | null;
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

function formatDate(dateString: string | null): string {
  if (!dateString) return "Datum unbekannt";

  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function selectGame(game: GameData) {
  if (switchingGame.value || game.game_id === currentGameId.value) return;

  try {
    switchingGame.value = true;
    selectedGameId.value = game.game_id;

    // Fetch the selected game data
    const selectedGame = await getGameById(game.game_id);

    if (selectedGame) {
      // Reset the game store and set the new game
      gameStore.resetStore();
      gameStore.recentGame = selectedGame;

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

onMounted(async () => {
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
