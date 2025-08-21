<template>
  <div class="d-flex flex-column justify-start align-center min-h-screen">
    <div class="max-w-full px-4 w-lg">
      <header class="flex flex-row w-full justify-between items-center my-2">
        <ProgressIndicator @open-progress="openPreviousGames" />
        <h1 class="text-3xl font-bold">
          Kontexto
        </h1>
        <ContextMenu
          ref="contextMenuRef"
          :loading="loading"
          :game-over="gameStore.isGameOver"
          @get-hint="handleGetHint"
          @give-up="handleGiveUp"
        />
      </header>

      <StatsCard v-if="gameStore.isGameOver" />
      <StatsBar
        :game-id="gameStore.recentGame?.game_id ?? null"
        :num-guesses="gameStore.pastGuesses.length"
        :num-hints="gameStore.numHints"
      />

      <!-- Game input section -->
      <main>
        <section
          class="game-input"
          aria-label="Wort eingeben"
        >
          <v-text-field
            v-model.trim="gameStore.currentGuess"
            color="secondary"
            class="w-full mb-2"
            clearable
            label="Schreibe ein Wort"
            variant="outlined"
            autofocus
            autocomplete="off"
            spellcheck="false"
            :loading="loading"
            :error="!!errorMessage"
            :error-messages="errorMessage"
            aria-describedby="game-instructions"
            @keyup.enter="handleSubmitGuess"
          />
          <div
            id="game-instructions"
            class="sr-only"
          >
            Gib ein deutsches Wort ein und drücke Enter, um zu sehen, wie
            ähnlich es dem gesuchten Wort ist.
          </div>
        </section>

        <!-- Recent guess highlight -->
        <section
          v-if="gameStore.mostRecentGuess"
          class="recent-guess"
          aria-label="Letzter Versuch"
        >
          <GuessItem
            :guess="gameStore.mostRecentGuess.guess"
            :similarity="gameStore.mostRecentGuess.similarity"
            :highlight="true"
          />
          <div class="my-4 fade-divider" />
        </section>

        <!-- Guess history -->
        <section
          class="guess-history"
          aria-label="Bisherige Versuche"
        >
          <GuessHistory
            :guesses="gameStore.pastGuesses"
            :last-guess="gameStore.mostRecentGuess"
          />
        </section>
      </main>

      <!-- SEO-friendly description when game is not started -->
      <section
        v-if="
          (!gameStore.recentGame || gameStore.pastGuesses.length === 0) &&
            !loading
        "
        class="mb-4 text-center"
      >
        <h2 class="text-lg font-semibold mb-2">
          Deutsches Wortspiel - Täglich neue Rätsel
        </h2>
        <p class="text-sm text-gray-600 mb-3">
          Rate das Zielwort durch clevere Hinweise! Jeder Versuch zeigt dir, wie
          ähnlich dein Wort dem gesuchten Begriff ist. Ähnlich wie Wordle, aber
          auf Deutsch und mit KI-basierter Wortähnlichkeit.
        </p>
        <div class="text-xs text-gray-500">
          <p>
            <v-icon
              class="text-primary"
              icon="mdi-target"
            /> Täglich ein
            neues Rätsel
          </p>
          <p>
            <v-icon
              class="text-primary"
              icon="mdi-flag"
            /> Komplett auf
            Deutsch
          </p>
          <p>
            <v-icon
              class="text-primary"
              icon="mdi-robot"
            />
            KI-basierte Wortähnlichkeit
          </p>
          <p>
            <v-icon
              class="text-primary"
              icon="mdi-cellphone-check"
            />
            Funktioniert auf allen Geräten
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/stores/game.store";
import { onMounted, ref } from "vue";
import GuessHistory from "@/components/GuessHistory/GuessHistory.vue";
import StatsBar from "@/components/StatsBar.vue";
import GuessItem from "@/components/GuessHistory/GuessItem.vue";
import ContextMenu from "@/components/ContextMenu.vue";
import StatsCard from "@/components/StatsCard.vue";
import ProgressIndicator from "@/components/ProgressIndicator.vue";

const gameStore = useGameStore();
const loading = ref(false);
const errorMessage = ref("");
const contextMenuRef = ref<InstanceType<typeof ContextMenu> | null>(null);

function openPreviousGames() {
  // Call the exposed method from ContextMenu to open the previous games dialog
  contextMenuRef.value?.openPreviousGamesDialog();
}

async function handleSubmitGuess() {
  loading.value = true;
  errorMessage.value = "";
  const result = await gameStore.submitGuess();
  loading.value = false;
  if (!result.success) {
    switch (result.error) {
    case "duplicate":
      errorMessage.value = "Dieses Wort wurde bereits geraten.";
      break;
    case "not_found":
      errorMessage.value =
          "Das Wort konnte nicht gefunden werden oder ist ungültig.";
      break;
    case "empty":
      errorMessage.value = "Bitte gib ein Wort ein.";
      break;
    default:
      errorMessage.value = "Unbekannter Fehler.";
    }
  }
}

async function handleGetHint() {
  loading.value = true;
  await gameStore.getHint();
  loading.value = false;
}

async function handleGiveUp() {
  loading.value = true;
  await gameStore.giveUp();
  loading.value = false;
}

onMounted(async() => {
  await gameStore.fetchAndSetRecentGame();
});
</script>

<style scoped>
.fade-divider {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgb(var(--v-border-color)) 20%,
    rgb(var(--v-border-color)) 80%,
    transparent 100%
  );
}
</style>
