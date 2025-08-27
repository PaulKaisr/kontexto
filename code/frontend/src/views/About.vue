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
        <h1 class="text-3xl font-bold text-gray-900">Über Kontexto</h1>
        <p class="text-lg text-gray-600 mt-2">
          Das innovative deutsche Wortspiel mit KI-basierter Ähnlichkeit
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- What is Kontexto -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Was ist Kontexto?</h2>
        <div class="prose prose-lg text-gray-700">
          <p class="mb-4">
            <strong>Kontexto</strong> ist ein innovatives deutsches Wortspiel, das die Kraft der
            künstlichen Intelligenz nutzt, um ein völlig neues Spielerlebnis zu schaffen. Anders als
            traditionelle Wortspiele basiert Kontexto auf <em>semantischer Ähnlichkeit</em>
            – das bedeutet, es bewertet nicht nur Buchstaben oder Wortlängen, sondern die
            tatsächliche
            <strong>Bedeutung</strong> und den <strong>Kontext</strong> der Wörter.
          </p>

          <p class="mb-4">
            Jeden Tag um Mitternacht erscheint ein neues Rätsel mit einem versteckten Zielwort.
            Deine Aufgabe: Rate das Wort durch clevere Hinweise und nutze dabei die KI-gestützte
            Ähnlichkeitsbewertung, um dich Schritt für Schritt der Lösung zu nähern.
          </p>

          <p>
            Das Besondere an Kontexto: Es ist
            <strong>komplett kostenlos</strong>, funktioniert in jedem Webbrowser und wurde speziell
            für die deutsche Sprache entwickelt.
          </p>
        </div>
      </section>

      <!-- How it works -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          🤖 Wie funktioniert die KI-Technologie?
        </h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Semantische Vektorräume</h3>
            <p class="text-gray-600 text-sm mb-4">
              Kontexto verwendet moderne Machine Learning-Modelle, die Wörter als Punkte in einem
              hochdimensionalen Raum darstellen. Wörter mit ähnlicher Bedeutung liegen dabei näher
              beieinander.
            </p>

            <div class="bg-blue-50 p-3 rounded-lg text-sm">
              <strong class="text-blue-900">Beispiel:</strong>
              <p class="text-blue-800 mt-1">
                "Hund" und "Katze" haben eine hohe Ähnlichkeit, weil beide Haustiere sind. "Hund"
                und "Automobil" haben eine niedrige Ähnlichkeit, weil sie thematisch völlig
                verschiedene Bereiche abdecken.
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Kontextuelle Bedeutung</h3>
            <p class="text-gray-600 text-sm mb-4">
              Die KI versteht nicht nur einzelne Wörter, sondern auch deren Verwendung in
              verschiedenen Kontexten. Dadurch entstehen überraschende und intuitive
              Ähnlichkeitsverbindungen.
            </p>

            <div class="bg-green-50 p-3 rounded-lg text-sm">
              <strong class="text-green-900">Beispiel:</strong>
              <p class="text-green-800 mt-1">
                "Schule" ist nicht nur ähnlich zu "lernen", sondern auch zu "Kindheit", "Freunde"
                oder "Pausenhof" – weil diese Begriffe im gleichen Lebenskontext stehen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Kontexto -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🎯 Warum Kontexto anders ist</h2>

        <div class="space-y-6">
          <div class="flex items-start">
            <div class="bg-blue-100 text-blue-600 rounded-full p-3 mr-4 mt-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Innovatives Spielprinzip</h3>
              <p class="text-gray-600">
                Während andere Wortspiele auf Buchstabenpositionen oder Wortlängen setzen,
                revolutioniert Kontexto das Genre durch bedeutungsbasierte Ähnlichkeit.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-green-100 text-green-600 rounded-full p-3 mr-4 mt-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Pädagogisch wertvoll</h3>
              <p class="text-gray-600">
                Kontexto erweitert nicht nur den Wortschatz, sondern schärft auch das Verständnis
                für Wortbeziehungen, Synonyme und semantische Zusammenhänge in der deutschen
                Sprache.
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="bg-purple-100 text-purple-600 rounded-full p-3 mr-4 mt-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Für alle zugänglich</h3>
              <p class="text-gray-600">
                Keine App-Installation nötig, keine Registrierung erforderlich, komplett kostenlos.
                Kontexto funktioniert auf jedem Gerät mit Internetverbindung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison with other games -->
      <section class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">📊 Kontexto vs. andere Wortspiele</h2>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 font-semibold text-gray-800">Feature</th>
                <th class="text-center py-2 font-semibold text-blue-800">Kontexto</th>
                <th class="text-center py-2 font-semibold text-gray-600">Wordle</th>
                <th class="text-center py-2 font-semibold text-gray-600">Kreuzworträtsel</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr class="border-b border-gray-100">
                <td class="py-2">KI-basierte Ähnlichkeit</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">❌</td>
                <td class="text-center py-2">❌</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Auf Deutsch optimiert</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">⚠️</td>
                <td class="text-center py-2">✅</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Täglich neues Rätsel</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">⚠️</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Kostenlos verfügbar</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">⚠️</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-2">Flexible Wortlängen</td>
                <td class="text-center py-2">✅</td>
                <td class="text-center py-2">❌</td>
                <td class="text-center py-2">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section
        class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-6 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4">🌟 Unsere Mission</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Sprache spielerisch erleben</h3>
            <p class="text-sm opacity-90">
              Wir möchten zeigen, wie schön und vielfältig die deutsche Sprache ist. Durch
              KI-gestützte Technologie machen wir Wortbeziehungen sichtbar und schaffen ein
              intuitives Spielerlebnis.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-3">Kostenlose Bildung für alle</h3>
            <p class="text-sm opacity-90">
              Bildung sollte für jeden zugänglich sein. Deshalb ist Kontexto kostenlos verfügbar.
              Die Finanzierung erfolgt durch nutzerfreundliche Werbung, die das Spielerlebnis nicht
              beeinträchtigt.
            </p>
          </div>
        </div>
      </section>

      <!-- Future Plans -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">🚀 Geplante Features</h2>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="border border-gray-200 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-2">Statistiken & Erfolge</h3>
            <p class="text-sm text-gray-600">
              Detaillierte Spielstatistiken, Erfolgs-Badges und Fortschrittsverfolgung.
            </p>
          </div>

          <div class="border border-gray-200 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-2">Thematische Modi</h3>
            <p class="text-sm text-gray-600">
              Spezielle Rätselmodi zu bestimmten Themen wie Sport, Musik oder Geschichte.
            </p>
          </div>

          <div class="border border-gray-200 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-2">Mehrspieler-Modus</h3>
            <p class="text-sm text-gray-600">
              Rate zusammen mit Freunden oder tritt in wöchentlichen Turnieren gegen andere an.
            </p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center py-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Bereit für das Abenteuer?</h2>
        <p class="text-gray-600 mb-6">
          Entdecke die faszinierende Welt der deutschen Wortspiele mit KI-Power!
        </p>
        <div class="space-x-4">
          <router-link
            to="/"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            Jetzt spielen
          </router-link>
          <router-link
            to="/spieltipps"
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            Spieltipps lesen
          </router-link>
        </div>
      </section>
    </main>

    <!-- SEO Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-4xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-semibold mb-3">Kontexto</h3>
            <p class="text-sm text-gray-400">
              Das innovative deutsche Wortspiel mit KI-basierter Wortähnlichkeit. Täglich neue
              Rätsel, komplett kostenlos.
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-3">Beliebte Suchbegriffe</h3>
            <div class="text-xs text-gray-400 space-y-1">
              <p>deutsches wortspiel online</p>
              <p>wordle deutsch alternative</p>
              <p>ki wortspiel kostenlos</p>
              <p>semantische ähnlichkeit spiel</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-3">Technologie</h3>
            <div class="text-xs text-gray-400 space-y-1">
              <p>Vue.js Progressive Web App</p>
              <p>KI-basierte Ähnlichkeitsberechnung</p>
              <p>Deutsche Sprachmodelle</p>
              <p>Responsive Design</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style scoped>
.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.prose strong {
  font-weight: 600;
  color: #374151;
}

.prose em {
  font-style: italic;
  color: #6366f1;
}
</style>
