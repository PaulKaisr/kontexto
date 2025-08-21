<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-6">
        <nav class="mb-4">
          <router-link
            to="/"
            class="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← Zurück zum Spiel
          </router-link>
        </nav>
        <h1 class="text-3xl font-bold text-gray-900">
          Häufig gestellte Fragen (FAQ)
        </h1>
        <p class="text-lg text-gray-600 mt-2">
          Antworten auf die wichtigsten Fragen zu Kontexto
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <!-- Game Basics -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          🎮 Grundlagen des Spiels
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Wie funktioniert Kontexto?
            </h3>
            <p class="text-gray-600">
              Kontexto ist ein tägliches Wortspiel, bei dem Sie ein verstecktes
              deutsches Wort erraten müssen. Das Besondere: Sie erhalten eine
              Ähnlichkeitsbewertung basierend auf der semantischen Bedeutung Ihrer
              Eingabe. Je höher die Ähnlichkeit, desto näher sind Sie der Lösung.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Wie oft erscheinen neue Rätsel?
            </h3>
            <p class="text-gray-600">
              Jeden Tag um Mitternacht (MEZ) wird ein neues Rätsel freigeschaltet.
              Sie haben den ganzen Tag Zeit, das Wort zu erraten.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Gibt es eine Begrenzung der Versuche?
            </h3>
            <p class="text-gray-600">
              Nein! Sie können unbegrenzt viele Wörter eingeben, bis Sie die
              Lösung gefunden haben. Nutzen Sie diese Freiheit, um verschiedene
              Strategien auszuprobieren.
            </p>
          </div>
        </div>
      </section>

      <!-- Technical Questions -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          🔧 Technische Fragen
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Auf welchen Geräten funktioniert Kontexto?
            </h3>
            <p class="text-gray-600">
              Kontexto funktioniert auf allen modernen Webbrowsern - egal ob
              Desktop, Tablet oder Smartphone. Eine App-Installation ist nicht
              erforderlich.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Werden meine Spielstände gespeichert?
            </h3>
            <p class="text-gray-600">
              Ja, Ihre aktuellen Spielstände werden lokal in Ihrem Browser
              gespeichert. So können Sie das Spiel unterbrechen und später
              weitermachen. Eine Registrierung ist nicht erforderlich.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Warum erkennt Kontexto mein Wort nicht?
            </h3>
            <p class="text-gray-600">
              Kontexto erkennt nur korrekt geschriebene deutsche Wörter aus
              seinem Wörterbuch. Achten Sie auf die richtige Schreibweise
              inklusive Umlaute (ä, ö, ü) und ß.
            </p>
          </div>
        </div>
      </section>

      <!-- Strategy Questions -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          💡 Strategie & Tipps
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Mit welchen Wörtern sollte ich beginnen?
            </h3>
            <p class="text-gray-600">
              Starten Sie mit häufigen deutschen Wörtern wie "Haus", "Zeit",
              "Leben" oder "Arbeit". Diese geben Ihnen eine gute Grundlage,
              um die thematische Richtung zu erkennen.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Was bedeuten die verschiedenen Ähnlichkeitswerte?
            </h3>
            <div class="text-gray-600">
              <p class="mb-2">
                Die Farbcodierung hilft bei der Orientierung:
              </p>
              <ul class="list-disc list-inside space-y-1">
                <li><strong class="text-green-600">Grün (sehr nah):</strong> Rang ≤ 300 - Sie sind sehr nah dran!</li>
                <li><strong class="text-yellow-600">Gelb (nah):</strong> Rang 300-1500 - Gute Richtung</li>
                <li><strong class="text-orange-600">Orange (warm):</strong> Rang 1500-3000 - Sie kommen näher</li>
                <li><strong class="text-red-600">Rot (fern):</strong> Rang > 3000 - Andere Richtung versuchen</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Wie kann ich meine Erfolgsrate verbessern?
            </h3>
            <p class="text-gray-600">
              Besuchen Sie unsere
              <router-link
                to="/spieltipps"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                Spieltipps-Seite
              </router-link>
              für detaillierte Strategien und Expertentipps von erfahrenen Spielern.
            </p>
          </div>
        </div>
      </section>

      <!-- Privacy & Legal -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          🔒 Datenschutz & Rechtliches
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Ist Kontexto wirklich kostenlos?
            </h3>
            <p class="text-gray-600">
              Ja, Kontexto ist komplett kostenlos nutzbar. Die Finanzierung
              erfolgt durch nutzerfreundliche Werbung, die das Spielerlebnis
              nicht beeinträchtigt.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Welche Daten werden gesammelt?
            </h3>
            <p class="text-gray-600">
              Wir sammeln nur minimal notwendige Daten für das Funktionieren
              des Spiels und anonyme Nutzungsstatistiken. Detaillierte
              Informationen finden Sie in unserer
              <router-link
                to="/data-protection"
                class="text-blue-600 hover:text-blue-800 underline"
              >
                Datenschutzerklärung
              </router-link>.
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Kann ich meine Cookie-Einstellungen ändern?
            </h3>
            <p class="text-gray-600">
              Ja, Sie können Ihre Cookie-Präferenzen jederzeit über das
              Cookie-Symbol am unteren rechten Bildschirmrand anpassen.
            </p>
          </div>
        </div>
      </section>

      <!-- Support -->
      <section class="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          📧 Weitere Fragen?
        </h2>
        <p class="text-gray-600 mb-4">
          Haben Sie eine Frage, die hier nicht beantwortet wurde?
          Kontaktieren Sie uns gerne!
        </p>
        <router-link
          to="/contact"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
        >
          Kontakt aufnehmen
        </router-link>
      </section>

      <!-- Back to Game -->
      <section class="text-center py-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Bereit zum Spielen?
        </h2>
        <p class="text-gray-600 mb-6">
          Testen Sie Ihr Wissen mit dem heutigen Kontexto-Rätsel!
        </p>
        <router-link
          to="/"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Zum Spiel
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// FAQ page component
</script>
