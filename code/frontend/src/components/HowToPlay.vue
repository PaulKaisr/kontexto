<template>
  <v-card class="max-w-2xl mx-auto" data-testid="how-to-play">
    <v-card-title class="text-center py-6 bg-primary text-white">
      <div>
        <v-icon icon="mdi-help-circle" class="mr-2" size="large"></v-icon>
        <span class="text-h4 font-bold">Wie spielt man Kontexto?</span>
      </div>
    </v-card-title>
    
    <v-card-text class="pa-6">
      <div class="space-y-6">
        <!-- Spielziel -->
        <v-card variant="outlined" class="pa-4">
          <div class="flex items-center mb-3">
            <v-icon icon="mdi-target" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-bold text-primary">Spielziel</h3>
          </div>
          <p class="text-body-1">Errate das geheime Wort des Tages! Du hast unbegrenzte Versuche.</p>
        </v-card>

        <!-- Wie funktioniert's -->
        <v-card variant="outlined" class="pa-4">
          <div class="flex items-center mb-3">
            <v-icon icon="mdi-cog" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-bold text-primary">Wie funktioniert's?</h3>
          </div>
          <v-list class="pa-0">
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-keyboard" size="small" color="grey-darken-1"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Gib ein deutsches Wort ein und drücke Enter</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-brain" size="small" color="grey-darken-1"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Das Wort wird nach semantischer Ähnlichkeit bewertet</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-chart-line" size="small" color="grey-darken-1"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Je höher die Ähnlichkeit, desto näher die Lösung</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-palette" size="small" color="grey-darken-1"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Die Farbe zeigt dir an, wie nah du bist</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Farbcode -->
        <v-card variant="outlined" class="pa-4">
          <div class="flex items-center mb-3">
            <v-icon icon="mdi-palette" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-bold text-primary">Farbcode</h3>
          </div>
          <div class="space-y-3">
            <v-chip color="red" variant="flat" class="mr-2 mb-2">
              <v-icon icon="mdi-circle" class="mr-2"></v-icon>
              Weit entfernt (Rang > 3000)
            </v-chip>
            <v-chip color="orange" variant="flat" class="mr-2 mb-2">
              <v-icon icon="mdi-circle" class="mr-2"></v-icon>
              Etwas näher (1500 - 3000)
            </v-chip>
            <v-chip color="yellow" variant="flat" class="mr-2 mb-2">
              <v-icon icon="mdi-circle" class="mr-2"></v-icon>
              Näher dran (300 - 1500)
            </v-chip>
            <v-chip color="green" variant="flat" class="mr-2 mb-2">
              <v-icon icon="mdi-circle" class="mr-2"></v-icon>
              Sehr nah (Rang ≤ 300)
            </v-chip>
            <v-chip color="success" variant="flat" class="mr-2 mb-2">
              <v-icon icon="mdi-star" class="mr-2"></v-icon>
              Gefunden! (Rang 1)
            </v-chip>
          </div>
        </v-card>

        <!-- Hinweise -->
        <v-card variant="outlined" class="pa-4">
          <div class="flex items-center mb-3">
            <v-icon icon="mdi-lightbulb" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-bold text-primary">Hinweise</h3>
          </div>
          <p class="text-body-1">Du kannst jederzeit einen Hinweis erhalten, der dir ein Wort mit hoher Ähnlichkeit zum Lösungswort zeigt.</p>
        </v-card>

        <!-- Tipps -->
        <v-card variant="outlined" class="pa-4">
          <div class="flex items-center mb-3">
            <v-icon icon="mdi-star-outline" color="primary" class="mr-2"></v-icon>
            <h3 class="text-h6 font-bold text-primary">Tipps</h3>
          </div>
          <v-list class="pa-0">
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-book-open-variant" size="small" color="success"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Denke an Synonyme und verwandte Begriffe</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-format-text" size="small" color="success"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Probiere verschiedene Wortarten aus</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-chart-bar" size="small" color="success"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Nutze die Statistikleiste für den Fortschritt</v-list-item-title>
            </v-list-item>
            <v-list-item class="px-0">
              <template v-slot:prepend>
                <v-icon icon="mdi-check-circle" size="small" color="success"></v-icon>
              </template>
              <v-list-item-title class="text-body-2">Jedes Wort kann nur einmal geraten werden</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <!-- Technischer Hinweis -->
        <v-alert type="info" variant="tonal" class="mt-4">
          <template v-slot:prepend>
            <v-icon icon="mdi-information"></v-icon>
          </template>
          <div class="text-body-2">
            <strong>Technischer Hinweis:</strong> Die Ähnlichkeit wird mittels FastText-Worteinbettungen berechnet, die semantische Beziehungen zwischen Wörtern erfassen.
          </div>
        </v-alert>
      </div>
    </v-card-text>
    
    <v-card-actions class="pa-6 pt-0">
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-close"
        @click="$emit('close')"
        size="large"
        class="px-8"
        data-testid="close-button"
      >
        Schließen
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineEmits<{
  close: []
}>()
</script>

<style scoped>
</style>