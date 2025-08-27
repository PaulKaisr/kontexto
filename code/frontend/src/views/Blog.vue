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
        <h1 class="text-3xl font-bold text-gray-900">
          Kontexto Blog
        </h1>
        <p class="text-lg text-gray-600 mt-2">
          Neueste Updates, Strategien und Wortspiel-Insights
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Featured Article -->
      <article class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-8 mb-8">
        <div class="flex items-center mb-4">
          <span class="bg-white/20 text-xs font-semibold px-3 py-1 rounded-full">
            Hauptartikel
          </span>
          <span class="ml-3 text-sm opacity-75">
            15. März 2024
          </span>
        </div>
        <h2 class="text-3xl font-bold mb-4">
          Die Psychologie des Wortratens: Wie KI unser Sprachverständnis revolutioniert
        </h2>
        <p class="text-lg opacity-90 mb-6 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
        <button class="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          Weiterlesen →
        </button>
      </article>

      <!-- Recent Articles Grid -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          Aktuelle Artikel
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Article 1 -->
          <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <span>12. März 2024</span>
                <span class="mx-2">•</span>
                <span>5 Min. Lesezeit</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                10 Profi-Strategien für Kontexto-Meister
              </h3>
              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
              </p>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Artikel lesen →
              </button>
            </div>
          </article>

          <!-- Article 2 -->
          <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <span>8. März 2024</span>
                <span class="mx-2">•</span>
                <span>3 Min. Lesezeit</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Neue Features: Statistiken und Erfolge
              </h3>
              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
              </p>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Artikel lesen →
              </button>
            </div>
          </article>

          <!-- Article 3 -->
          <article class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div class="h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <span>5. März 2024</span>
                <span class="mx-2">•</span>
                <span>7 Min. Lesezeit</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">
                Wie FastText die deutsche Sprache versteht
              </h3>
              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
              </p>
              <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Artikel lesen →
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          Kategorien
        </h2>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-3xl mb-3">🎯</div>
            <h3 class="font-semibold text-gray-800 mb-2">Strategien</h3>
            <p class="text-sm text-gray-600">Tips und Tricks für bessere Ergebnisse</p>
            <span class="text-xs text-blue-600 font-medium">12 Artikel</span>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-3xl mb-3">🤖</div>
            <h3 class="font-semibold text-gray-800 mb-2">Technologie</h3>
            <p class="text-sm text-gray-600">Wie KI und NLP Kontexto antreiben</p>
            <span class="text-xs text-blue-600 font-medium">8 Artikel</span>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-3xl mb-3">📈</div>
            <h3 class="font-semibold text-gray-800 mb-2">Updates</h3>
            <p class="text-sm text-gray-600">Neue Features und Verbesserungen</p>
            <span class="text-xs text-blue-600 font-medium">15 Artikel</span>
          </div>
          
          <div class="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div class="text-3xl mb-3">🌟</div>
            <h3 class="font-semibold text-gray-800 mb-2">Community</h3>
            <p class="text-sm text-gray-600">Spieler-Geschichten und Highlights</p>
            <span class="text-xs text-blue-600 font-medium">6 Artikel</span>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup -->
      <section class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-8">
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            📧 Kontexto Newsletter
          </h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bleibe auf dem Laufenden mit den neuesten Kontexto-Updates, Strategien und exklusiven Inhalten. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="deine@email.de"
              class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Abonnieren
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-3">
            Keine Spam-Mails. Jederzeit abbestellbar.
          </p>
        </div>
      </section>

      <!-- Archive Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          📚 Archiv
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-4">März 2024</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Die Evolution der deutschen Wortspiele
                  </h4>
                  <p class="text-xs text-gray-500">2. März 2024</p>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Kontexto vs. traditionelle Kreuzworträtsel
                  </h4>
                  <p class="text-xs text-gray-500">28. Februar 2024</p>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Machine Learning in der Sprachverarbeitung
                  </h4>
                  <p class="text-xs text-gray-500">25. Februar 2024</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Februar 2024</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Semantic Search: Die Zukunft der Wortsuche
                  </h4>
                  <p class="text-xs text-gray-500">20. Februar 2024</p>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Kontexto Community: Die ersten 1000 Spieler
                  </h4>
                  <p class="text-xs text-gray-500">15. Februar 2024</p>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-sm font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                    Warum Deutsch perfekt für KI-Wortspiele ist
                  </h4>
                  <p class="text-xs text-gray-500">10. Februar 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="max-w-4xl mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-semibold mb-3">
              Kontexto Blog
            </h3>
            <p class="text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Insights, Strategien und Updates rund um das innovative deutsche Wortspiel.
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-3">
              Beliebte Themen
            </h3>
            <div class="text-xs text-gray-400 space-y-1">
              <p>kontexto strategien</p>
              <p>wortspiel tipps deutsch</p>
              <p>ki sprachverarbeitung</p>
              <p>semantische ähnlichkeit</p>
            </div>
          </div>
          <div>
            <h3 class="font-semibold mb-3">
              Navigation
            </h3>
            <div class="text-xs text-gray-400 space-y-1">
              <router-link to="/" class="hover:text-white transition-colors block">Spiel starten</router-link>
              <router-link to="/about" class="hover:text-white transition-colors block">Über Kontexto</router-link>
              <router-link to="/spieltipps" class="hover:text-white transition-colors block">Spieltipps</router-link>
              <router-link to="/faq" class="hover:text-white transition-colors block">FAQ</router-link>
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
/* Custom styles for blog-specific elements */
.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>