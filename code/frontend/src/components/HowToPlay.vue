<template>
  <v-card title="Wie spielt man Kontexto?">
    <v-card-text>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold mb-2">Spielziel</h3>
          <p>Errate das geheime Wort des Tages! Du hast unbegrenzte Versuche.</p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Wie funktioniert's?</h3>
          <ul class="list-disc list-inside space-y-1">
            <li>Gib ein deutsches Wort ein und drücke Enter oder klicke auf "Raten"</li>
            <li>Das Wort wird nach seiner semantischen Ähnlichkeit zum Lösungswort bewertet</li>
            <li>Je höher die Ähnlichkeit, desto näher bist du der Lösung</li>
            <li>Die Farbe zeigt dir an, wie nah du bist:</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Farbcode</h3>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-red-500 rounded"></div>
              <span>Weit entfernt (Ähnlichkeit &lt; 20%)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Etwas näher (20% - 40%)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Näher dran (40% - 60%)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-lime-500 rounded"></div>
              <span>Sehr nah (60% - 80%)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-green-500 rounded"></div>
              <span>Extrem nah (80% - 99%)</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-green-700 rounded"></div>
              <span>Gefunden! (100%)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Hinweise</h3>
          <p>Du kannst jederzeit einen Hinweis erhalten, der dir ein Wort mit hoher Ähnlichkeit zum Lösungswort zeigt.</p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Tipps</h3>
          <ul class="list-disc list-inside space-y-1">
            <li>Denke an Synonyme und verwandte Begriffe</li>
            <li>Probiere verschiedene Wortarten aus (Substantive, Verben, Adjektive)</li>
            <li>Nutze die Statistikleiste, um deinen Fortschritt zu verfolgen</li>
            <li>Jedes Wort kann nur einmal geraten werden</li>
          </ul>
        </div>

        <div class="text-sm text-gray-600 mt-4">
          <p><strong>Technischer Hinweis:</strong> Die Ähnlichkeit wird mittels FastText-Worteinbettungen berechnet, die semantische Beziehungen zwischen Wörtern erfassen.</p>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text="Schließen"
        @click="$emit('close')"
      ></v-btn>
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