<template>
  <v-card class="d-flex flex-column" data-testid="how-to-play">
    <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white flex-shrink-0">
      <div class="d-flex align-center justify-center">
        <v-icon
          icon="mdi-help-circle"
          class="mr-2"
          :size="$vuetify.display.smAndUp ? 'large' : 'default'"
        />
        <span class="text-h6 sm:text-h4 font-bold">Wie spielt man Kontexto?</span>
      </div>
    </v-card-title>

    <v-card-text class="pa-2 sm:pa-4 flex-grow-1" style="overflow-y: auto">
      <div class="space-y-3 sm:space-y-4">
        <!-- Spielziel -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-target" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">Spielziel</h3>
          </div>
          <p class="text-body-2 mb-0">
            Errate das geheime Wort des Tages! Du hast unbegrenzte Versuche.
          </p>
        </v-card>

        <!-- Wie funktioniert's -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-cog" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">Wie funktioniert's?</h3>
          </div>
          <v-list class="pa-0" density="compact">
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-keyboard" size="x-small" color="grey-darken-1" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Gib ein deutsches Wort ein und drücke Enter
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-brain" size="x-small" color="grey-darken-1" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Das Wort wird nach semantischer Ähnlichkeit bewertet
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-chart-line" size="x-small" color="grey-darken-1" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Je höher die Ähnlichkeit, desto näher die Lösung
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-palette" size="x-small" color="grey-darken-1" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Die Farbe zeigt dir an, wie nah du bist
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Farbcode -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-palette" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">Farbcode</h3>
          </div>
          <div class="d-flex flex-column ga-1">
            <v-chip
              color="red"
              variant="flat"
              size="small"
              class="align-start justify-start text-start"
              style="width: 100%; height: auto; white-space: normal"
            >
              <v-icon icon="mdi-circle" class="mr-1" size="x-small" />
              <span class="text-caption">Weit entfernt (Rang > 3000)</span>
            </v-chip>
            <v-chip
              color="orange"
              variant="flat"
              size="small"
              class="align-start justify-start text-start"
              style="width: 100%; height: auto; white-space: normal"
            >
              <v-icon icon="mdi-circle" class="mr-1" size="x-small" />
              <span class="text-caption">Etwas näher (1500 - 3000)</span>
            </v-chip>
            <v-chip
              color="yellow"
              variant="flat"
              size="small"
              class="align-start justify-start text-start"
              style="width: 100%; height: auto; white-space: normal"
            >
              <v-icon icon="mdi-circle" class="mr-1" size="x-small" />
              <span class="text-caption">Näher dran (300 - 1500)</span>
            </v-chip>
            <v-chip
              color="green"
              variant="flat"
              size="small"
              class="align-start justify-start text-start"
              style="width: 100%; height: auto; white-space: normal"
            >
              <v-icon icon="mdi-circle" class="mr-1" size="x-small" />
              <span class="text-caption">Sehr nah (Rang ≤ 300)</span>
            </v-chip>
            <v-chip
              color="success"
              variant="flat"
              size="small"
              class="align-start justify-start text-start"
              style="width: 100%; height: auto; white-space: normal"
            >
              <v-icon icon="mdi-star" class="mr-1" size="x-small" />
              <span class="text-caption">Gefunden! (Rang 1)</span>
            </v-chip>
          </div>
        </v-card>

        <!-- Hinweise -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-lightbulb" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">Hinweise</h3>
          </div>
          <p class="text-body-2 mb-0">
            Du kannst jederzeit einen Hinweis erhalten, der dir ein Wort mit hoher Ähnlichkeit zum
            Lösungswort zeigt.
          </p>
        </v-card>

        <!-- Tipps -->
        <v-card variant="outlined" class="pa-2 sm:pa-3">
          <div class="d-flex align-center mb-2">
            <v-icon icon="mdi-star-outline" color="primary" class="mr-2" size="small" />
            <h3 class="text-subtitle-1 font-bold text-primary">Tipps</h3>
          </div>
          <v-list class="pa-0" density="compact">
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-book-open-variant" size="x-small" color="success" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Denke an Synonyme und verwandte Begriffe
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-format-text" size="x-small" color="success" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Probiere verschiedene Wortarten aus
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-chart-bar" size="x-small" color="success" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Nutze die Statistikleiste für den Fortschritt
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0 py-1 min-height-auto">
              <template #prepend>
                <v-icon icon="mdi-check-circle" size="x-small" color="success" class="mt-1" />
              </template>
              <v-list-item-title class="text-body-2 text-wrap">
                Jedes Wort kann nur einmal geraten werden
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Technischer Hinweis -->
        <v-alert type="info" variant="tonal" class="text-body-2">
          <template #prepend>
            <v-icon icon="mdi-information" size="small" />
          </template>
          <div>
            <strong>Technischer Hinweis:</strong> Die Ähnlichkeit wird mittels
            FastText-Worteinbettungen berechnet, die semantische Beziehungen zwischen Wörtern
            erfassen.
          </div>
        </v-alert>
      </div>
    </v-card-text>

    <v-card-actions class="pa-2 sm:pa-3 pt-0 flex-shrink-0">
      <v-spacer />
      <v-btn
        variant="outlined"
        prepend-icon="mdi-close"
        size="default"
        class="px-3 sm:px-4"
        data-testid="close-button"
        @click="$emit('close')"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineEmits<{
  close: [];
}>();
</script>
