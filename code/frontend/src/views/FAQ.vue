<template>
  <v-container class="pa-0" fluid>
    <!-- Header Section -->
    <v-card class="mb-8" flat>
      <v-card-text class="pa-8">
        <v-btn
          :to="{ name: 'home' }"
          color="primary"
          variant="text"
          size="small"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Zurück zum Spiel
        </v-btn>

        <h1 class="text-h3 font-weight-bold text-primary mb-2">Häufig gestellte Fragen (FAQ)</h1>
        <p class="text-h6 text-medium-emphasis">
          Antworten auf die wichtigsten Fragen zu Kontexto
        </p>
      </v-card-text>
    </v-card>

    <v-container class="max-w-6xl mx-auto">
      <!-- Game Basics Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-gamepad-variant" class="mr-3" color="primary" />
          Grundlagen des Spiels
        </h2>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-help-circle" class="mr-3" color="info" />
                <span class="text-h6 font-weight-medium">Wie funktioniert Kontexto?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Kontexto ist ein tägliches Wortspiel, bei dem Sie ein verstecktes deutsches Wort
              erraten müssen. Das Besondere: Sie erhalten eine Ähnlichkeitsbewertung basierend auf
              der semantischen Bedeutung Ihrer Eingabe. Je höher die Ähnlichkeit, desto näher sind
              Sie der Lösung.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-calendar-clock" class="mr-3" color="success" />
                <span class="text-h6 font-weight-medium">Wie oft erscheinen neue Rätsel?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Jeden Tag um Mitternacht (MEZ) wird ein neues Rätsel freigeschaltet. Sie haben den
              ganzen Tag Zeit, das Wort zu erraten.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-infinity" class="mr-3" color="warning" />
                <span class="text-h6 font-weight-medium">Gibt es eine Begrenzung der Versuche?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Nein! Sie können unbegrenzt viele Wörter eingeben, bis Sie die Lösung gefunden haben.
              Nutzen Sie diese Freiheit, um verschiedene Strategien auszuprobieren.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Technical Questions Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-cog" class="mr-3" color="primary" />
          Technische Fragen
        </h2>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-devices" class="mr-3" color="info" />
                <span class="text-h6 font-weight-medium">Auf welchen Geräten funktioniert Kontexto?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Kontexto funktioniert auf allen modernen Webbrowsern - egal ob Desktop, Tablet oder
              Smartphone. Eine App-Installation ist nicht erforderlich.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-content-save" class="mr-3" color="success" />
                <span class="text-h6 font-weight-medium">Werden meine Spielstände gespeichert?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Ja, Ihre aktuellen Spielstände werden lokal in Ihrem Browser gespeichert. So können
              Sie das Spiel unterbrechen und später weitermachen. Eine Registrierung ist nicht
              erforderlich.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-spellcheck" class="mr-3" color="warning" />
                <span class="text-h6 font-weight-medium">Warum erkennt Kontexto mein Wort nicht?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Kontexto erkennt nur korrekt geschriebene deutsche Wörter aus seinem Wörterbuch.
              Achten Sie auf die richtige Schreibweise inklusive Umlaute (ä, ö, ü) und ß.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Strategy Questions Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-lightbulb" class="mr-3" color="primary" />
          Strategie & Tipps
        </h2>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-play" class="mr-3" color="success" />
                <span class="text-h6 font-weight-medium">Mit welchen Wörtern sollte ich beginnen?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Starten Sie mit häufigen deutschen Wörtern wie "Haus", "Zeit", "Leben" oder "Arbeit".
              Diese geben Ihnen eine gute Grundlage, um die thematische Richtung zu erkennen.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-palette" class="mr-3" color="info" />
                <span class="text-h6 font-weight-medium">Was bedeuten die verschiedenen Ähnlichkeitswerte?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="pa-6">
              <p class="text-body-1 mb-4">Die Farbcodierung hilft bei der Orientierung:</p>
              <v-list class="pa-0">
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-chip color="success" size="small" class="mr-3">Grün</v-chip>
                  </template>
                  <v-list-item-title class="text-body-1">
                    <strong>Sehr nah:</strong> Rang ≤ 300 - Sie sind sehr nah dran!
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-chip color="warning" size="small" class="mr-3">Gelb</v-chip>
                  </template>
                  <v-list-item-title class="text-body-1">
                    <strong>Nah:</strong> Rang 300-1500 - Gute Richtung
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-chip color="orange" size="small" class="mr-3">Orange</v-chip>
                  </template>
                  <v-list-item-title class="text-body-1">
                    <strong>Warm:</strong> Rang 1500-3000 - Sie kommen näher
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-chip color="error" size="small" class="mr-3">Rot</v-chip>
                  </template>
                  <v-list-item-title class="text-body-1">
                    <strong>Fern:</strong> Rang > 3000 - Andere Richtung versuchen
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-trending-up" class="mr-3" color="secondary" />
                <span class="text-h6 font-weight-medium">Wie kann ich meine Erfolgsrate verbessern?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Besuchen Sie unsere
              <router-link to="/spieltipps" class="text-primary text-decoration-underline">
                Spieltipps-Seite
              </router-link>
              für detaillierte Strategien und Expertentipps von erfahrenen Spielern.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Privacy & Legal Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-shield-check" class="mr-3" color="primary" />
          Datenschutz & Rechtliches
        </h2>

        <v-expansion-panels variant="accordion">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-currency-eur-off" class="mr-3" color="success" />
                <span class="text-h6 font-weight-medium">Ist Kontexto wirklich kostenlos?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Ja, Kontexto ist komplett kostenlos nutzbar. Die Finanzierung erfolgt durch
              nutzerfreundliche Werbung, die das Spielerlebnis nicht beeinträchtigt.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-database" class="mr-3" color="info" />
                <span class="text-h6 font-weight-medium">Welche Daten werden gesammelt?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Wir sammeln nur minimal notwendige Daten für das Funktionieren des Spiels und anonyme
              Nutzungsstatistiken. Detaillierte Informationen finden Sie in unserer
              <router-link to="/data-protection" class="text-primary text-decoration-underline">
                Datenschutzerklärung
              </router-link>.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-cookie" class="mr-3" color="warning" />
                <span class="text-h6 font-weight-medium">Kann ich meine Cookie-Einstellungen ändern?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1 pa-6">
              Ja, Sie können Ihre Cookie-Präferenzen jederzeit über das Cookie-Symbol am unteren
              rechten Bildschirmrand anpassen.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Support Section -->
      <section class="mb-12">
        <v-card variant="flat" color="info" class="text-white">
          <v-card-text class="pa-8 text-center">
            <v-icon icon="mdi-help-circle" size="48" class="mb-4" />
            <h2 class="text-h4 font-weight-bold mb-4">Weitere Fragen?</h2>
            <p class="text-h6 mb-6">
              Haben Sie eine Frage, die hier nicht beantwortet wurde? Kontaktieren Sie uns gerne!
            </p>
            <v-btn
              :to="{ name: 'contact' }"
              color="white"
              variant="flat"
              size="large"
              rounded="lg"
            >
              Kontakt aufnehmen
            </v-btn>
          </v-card-text>
        </v-card>
      </section>

      <!-- Back to Game CTA -->
      <section class="mb-12">
        <v-card variant="flat" color="primary" class="text-white">
          <v-card-text class="pa-8 text-center">
            <v-icon icon="mdi-gamepad-variant" size="48" class="mb-4" />
            <h2 class="text-h4 font-weight-bold mb-4">Bereit zum Spielen?</h2>
            <p class="text-h6 mb-6">Testen Sie Ihr Wissen mit dem heutigen Kontexto-Rätsel!</p>
            <v-btn
              :to="{ name: 'home' }"
              color="white"
              variant="flat"
              size="large"
              rounded="lg"
            >
              Jetzt spielen
            </v-btn>
          </v-card-text>
        </v-card>
      </section>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
// FAQ page component
</script>
