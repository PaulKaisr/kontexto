<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <nav class="mb-4">
          <router-link to="/" class="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Spiel
          </router-link>
        </nav>
        <h1 class="text-3xl font-bold text-gray-900">Kontexto Spieltipps & Strategien</h1>
        <p class="text-lg text-gray-600 mt-2">
          Meistere das deutsche Wortspiel mit bewährten Strategien und Expertentipps
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Quick Start Guide -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          🚀 Schnellstart-Guide für Anfänger
        </h2>
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold text-gray-800">1. Starte mit häufigen Wörtern</h3>
            <p class="text-gray-600">
              Beginne mit alltäglichen deutschen Wörtern wie "Haus", "Auto", "Arbeit" oder
              "Familie". Diese geben dir eine gute Grundlage für die Ähnlichkeitsbewertung.
            </p>
          </div>

          <div class="border-l-4 border-green-500 pl-4">
            <h3 class="font-semibold text-gray-800">2. Nutze die Ähnlichkeitswerte strategisch</h3>
            <p class="text-gray-600">
              Hohe Ähnlichkeitswerte (über 30%) bedeuten, dass du auf dem richtigen Weg bist.
              Niedrige Werte (unter 10%) zeigen, dass dein Wort thematisch weit entfernt ist.
            </p>
          </div>

          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="font-semibold text-gray-800">3. Denke in Kategorien</h3>
            <p class="text-gray-600">
              Wenn ein Wort eine mittlere Ähnlichkeit zeigt, versuche verwandte Begriffe aus
              derselben Kategorie: Tiere, Berufe, Farben, Emotionen, etc.
            </p>
          </div>
        </div>
      </section>

      <!-- Advanced Strategies -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          🎯 Erweiterte Strategien für Fortgeschrittene
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-900 mb-3">Semantische Felder erkunden</h3>
            <ul class="space-y-2 text-blue-800 text-sm">
              <li>
                • Wenn "Hund" mittlere Ähnlichkeit zeigt, probiere: Katze, Tier, Haustier, Welpe
              </li>
              <li>• Bei "Rot" teste: Farbe, Blau, Grün, bunt, färben</li>
              <li>• Nach "Schule" versuche: Lehrer, lernen, Bildung, Universität</li>
            </ul>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-green-900 mb-3">Wortarten systematisch testen</h3>
            <ul class="space-y-2 text-green-800 text-sm">
              <li>• <strong>Substantive:</strong> konkrete und abstrakte Begriffe</li>
              <li>• <strong>Verben:</strong> Handlungen und Tätigkeiten</li>
              <li>• <strong>Adjektive:</strong> Eigenschaften und Beschreibungen</li>
              <li>• <strong>Zusammensetzungen:</strong> deutsche Kompositawörter</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h4 class="font-semibold text-yellow-800 mb-2">💡 Pro-Tipp: Die 5-Wort-Regel</h4>
          <p class="text-yellow-700 text-sm">
            Verwende deine ersten 5 Versuche, um verschiedene Themenbereiche abzudecken. So findest
            du schnell heraus, in welcher Richtung das Zielwort liegt!
          </p>
        </div>
      </section>

      <!-- Common Mistakes -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">⚠️ Häufige Fehler vermeiden</h2>

        <div class="space-y-4">
          <div class="flex items-start">
            <div class="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">
                Zu früh aufgeben bei niedrigen Werten
              </h3>
              <p class="text-gray-600 text-sm">
                Auch Wörter mit 5-15% Ähnlichkeit können wertvolle Hinweise geben. Sie zeigen dir,
                welche Richtungen du
                <em>nicht</em> verfolgen solltest.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">
                Dieselbe Kategorie zu lange verfolgen
              </h3>
              <p class="text-gray-600 text-sm">
                Wenn mehrere Wörter aus einer Kategorie (z.B. Tiere) alle niedrige Werte zeigen,
                wechsle zu einer anderen Kategorie.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-red-100 text-red-600 rounded-full p-2 mr-4 mt-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-1">Rechtschreibfehler ignorieren</h3>
              <p class="text-gray-600 text-sm">
                Kontexto erkennt nur korrekt geschriebene deutsche Wörter. Achte auf Umlaute und
                richtige Schreibweise!
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Word Categories -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          📚 Beliebte Wort-Kategorien in Kontexto
        </h2>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-900 mb-2">Alltägliche Begriffe</h3>
            <p class="text-blue-800 text-sm mb-2">Häufig verwendete Startwörter:</p>
            <div class="text-xs text-blue-700 space-x-2">
              <span class="bg-blue-200 px-2 py-1 rounded">Haus</span>
              <span class="bg-blue-200 px-2 py-1 rounded">Zeit</span>
              <span class="bg-blue-200 px-2 py-1 rounded">Leben</span>
              <span class="bg-blue-200 px-2 py-1 rounded">Welt</span>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-900 mb-2">Emotionen & Gefühle</h3>
            <p class="text-green-800 text-sm mb-2">Für abstrakte Zielwörter:</p>
            <div class="text-xs text-green-700 space-x-2">
              <span class="bg-green-200 px-2 py-1 rounded">Liebe</span>
              <span class="bg-green-200 px-2 py-1 rounded">Freude</span>
              <span class="bg-green-200 px-2 py-1 rounded">Angst</span>
              <span class="bg-green-200 px-2 py-1 rounded">Hoffnung</span>
            </div>
          </div>

          <div class="bg-purple-50 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-900 mb-2">Tätigkeiten & Verben</h3>
            <p class="text-purple-800 text-sm mb-2">Action-orientierte Begriffe:</p>
            <div class="text-xs text-purple-700 space-x-2">
              <span class="bg-purple-200 px-2 py-1 rounded">arbeiten</span>
              <span class="bg-purple-200 px-2 py-1 rounded">spielen</span>
              <span class="bg-purple-200 px-2 py-1 rounded">lernen</span>
              <span class="bg-purple-200 px-2 py-1 rounded">reisen</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Expert Tips -->
      <section
        class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">🏆 Experten-Tipps von Kontexto-Profis</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">⚡ Speed-Strategien</h3>
            <ul class="space-y-2 text-sm opacity-90">
              <li>• Nutze Synonyme systematisch (groß → riesig → winzig)</li>
              <li>• Teste Gegensätze bei mittlerer Ähnlichkeit</li>
              <li>• Verwende Oberbegriffe (Tier → Hund → Golden Retriever)</li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">🧠 Denkmuster</h3>
            <ul class="space-y-2 text-sm opacity-90">
              <li>• Assoziationsketten: Was fällt dir zu diesem Wort ein?</li>
              <li>• Kontextdenken: In welcher Situation verwendest du dieses Wort?</li>
              <li>• Wortfamilien: Wörter mit gleichem Stamm testen</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Daily Practice -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          📅 Tägliches Training für bessere Ergebnisse
        </h2>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-800 mb-3">7-Tage Kontexto-Challenge</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p class="font-medium text-gray-700 mb-2">Woche 1-2: Grundlagen</p>
              <ul class="space-y-1 text-gray-600">
                <li>• Tag 1-3: Starte immer mit denselben 3 Testwörtern</li>
                <li>• Tag 4-7: Experimentiere mit verschiedenen Kategorien</li>
                <li>• Ziel: Verstehe die Ähnlichkeitsskala</li>
              </ul>
            </div>
            <div>
              <p class="font-medium text-gray-700 mb-2">Woche 3-4: Verfeinerung</p>
              <ul class="space-y-1 text-gray-600">
                <li>• Tag 8-10: Fokus auf schnelle Themenerkennung</li>
                <li>• Tag 11-14: Übe systematische Wortvariation</li>
                <li>• Ziel: Löse Rätsel in unter 20 Versuchen</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center py-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bereit für das nächste Rätsel?</h2>
        <p class="text-gray-600 mb-6">
          Wende deine neuen Strategien an und werde zum Kontexto-Meister!
        </p>
        <router-link
          to="/"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Jetzt spielen
        </router-link>
      </section>
    </main>

    <!-- Footer with additional SEO keywords -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <p class="text-sm text-gray-400">
          Weitere Suchbegriffe: deutsche wortspiele online, wordle alternative deutsch, wort rätsel
          strategien, kontexto tipps, semantische wortspiele, ki wortspiele deutsch
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped>
/* Custom styling for the tips page */
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>
