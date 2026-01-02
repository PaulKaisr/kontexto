<template>
  <div class="d-flex flex-column justify-start align-center min-h-screen">
    <div class="max-w-full px-4 w-lg">
      <!-- Promo Banner for new game -->
      <v-banner
        v-if="!promoBannerDismissed"
        class="mb-2 mt-2 rounded-lg promo-banner"
        color="secondary"
        lines="two"
        stacked
      >
        <template #prepend>
          <v-avatar size="40" rounded="0">
            <v-img src="/fakeout-logo.png" alt="Fakeout Logo" />
          </v-avatar>
        </template>

        <v-banner-text class="font-medium">
          <span class="font-bold">Mein neuestes Spiel:</span> Fakeout - KI oder Echt? Erkenne, welches Bild
          von einer KI erstellt wurde und schule dein Auge!
        </v-banner-text>

        <template #actions>
          <v-btn
            color="white"
            variant="flat"
            size="small"
            href="https://fakeout.dev"
            target="_blank"
            rel="noopener"
          >
            Jetzt spielen
          </v-btn>
          <v-btn
            variant="text"
            size="small"
            color="white"
            icon="mdi-close"
            @click="dismissPromoBanner"
          />
        </template>
      </v-banner>

      <header class="flex flex-row w-full justify-between items-center my-2">
        <ProgressIndicator @open-progress="openPreviousGames" />
        <div class="flex items-center">
          <img
            :src="logoSrc"
            alt="Kontexto Logo"
            class="kontexto-logo bg-transparent"
            aria-hidden="true"
          />
          <h1 class="text-3xl font-bold"><span class="sr-only">K</span>ontexto</h1>
        </div>
        <ContextMenu
          ref="contextMenuRef"
          :loading="loading"
          :game-over="gameStore.isGameOver"
          @get-hint="handleGetHint"
          @give-up="handleGiveUp"
        />
      </header>

      <!-- Reserve space for StatsCard to prevent layout shift -->
      <div class="stats-card-container">
        <StatsCard v-if="gameStore.isGameOver" />
      </div>
      <StatsBar
        :game-id="gameStore.recentGame?.game_id ?? null"
        :num-guesses="gameStore.pastGuesses.length"
        :num-hints="gameStore.numHints"
      />

      <!-- Game input section -->
      <main>
        <section class="game-input" aria-label="Wort eingeben">
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
          <div id="game-instructions" class="sr-only">
            Gib ein deutsches Wort ein und drücke Enter, um zu sehen, wie ähnlich es dem gesuchten
            Wort ist.
          </div>
        </section>

        <!-- Recent guess highlight with reserved space -->
        <section class="recent-guess-container" aria-label="Letzter Versuch">
          <div v-if="gameStore.mostRecentGuess" class="recent-guess">
            <GuessItem
              :guess="gameStore.mostRecentGuess.guess"
              :similarity="gameStore.mostRecentGuess.similarity"
              :highlight="true"
            />
            <div class="my-4 fade-divider" />
          </div>
        </section>

        <!-- Guess history -->
        <section class="guess-history" aria-label="Bisherige Versuche">
          <GuessHistory :guesses="gameStore.pastGuesses" :last-guess="gameStore.mostRecentGuess" />
        </section>
      </main>

      <!-- SEO-friendly description when game is not started -->
      <section
        v-if="(!gameStore.recentGame || gameStore.pastGuesses.length === 0) && !loading"
        class="mb-4 text-center"
      >
        <h2 class="text-lg font-semibold mb-2">Deutsches Wortspiel - Täglich neue Rätsel</h2>
        <p class="text-sm text-gray-600 mb-3">
          Rate das Zielwort durch clevere Hinweise! Jeder Versuch zeigt dir, wie ähnlich dein Wort
          dem gesuchten Begriff ist. Ähnlich wie Wordle, aber auf Deutsch und mit KI-basierter
          Wortähnlichkeit.
        </p>
        <div class="text-xs text-gray-500">
          <p><v-icon class="text-primary" icon="mdi-target" /> Täglich ein neues Rätsel</p>
          <p><v-icon class="text-primary" icon="mdi-flag" /> Komplett auf Deutsch</p>
          <p>
            <v-icon class="text-primary" icon="mdi-robot" />
            KI-basierte Wortähnlichkeit
          </p>
          <p>
            <v-icon class="text-primary" icon="mdi-cellphone-check" />
            Funktioniert auf allen Geräten
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from "@/components/ContextMenu.vue";
import GuessHistory from "@/components/GuessHistory/GuessHistory.vue";
import GuessItem from "@/components/GuessHistory/GuessItem.vue";
import ProgressIndicator from "@/components/ProgressIndicator.vue";
import StatsBar from "@/components/StatsBar.vue";
import StatsCard from "@/components/StatsCard.vue";
import { useTheme } from "@/composables/useTheme";
import { useGameStore } from "@/stores/game.store";
import { onMounted, ref } from "vue";
const gameStore = useGameStore();
const { logoSrc } = useTheme();
const loading = ref(false);
const errorMessage = ref("");
const contextMenuRef = ref<InstanceType<typeof ContextMenu> | null>(null);

// Promo banner state - persisted in localStorage
const PROMO_BANNER_KEY = "kontexto_promo_banner_dismissed";
const promoBannerDismissed = ref(localStorage.getItem(PROMO_BANNER_KEY) === "true");

function dismissPromoBanner() {
  promoBannerDismissed.value = true;
  localStorage.setItem(PROMO_BANNER_KEY, "true");
}

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
        errorMessage.value = "Das Wort konnte nicht gefunden werden oder ist ungültig.";
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

onMounted(async () => {
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

/* Prevent layout shifts by reserving space for dynamic content */
.stats-card-container {
  /* Reserve space for stats card when game is complete */
  min-height: 0;
  transition: min-height 0.3s ease;
}

.recent-guess-container {
  /* Reserve minimal space for recent guess section */
  min-height: 0;
  transition: min-height 0.2s ease;
}

.recent-guess {
  /* Smooth appearance of recent guess */
  animation: slideInFade 0.3s ease-out;
}

@keyframes slideInFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo styling with transparent background */
.kontexto-logo {
  width: 32px;
  height: 32px;
}
</style>
